from flask import (
    Flask,
    jsonify,
    request,
    session,
    abort,
    flash,
    redirect,
    url_for,
    Blueprint
)
from sqlalchemy import or_
from flask_restful import Resource
from flask_login import (
    UserMixin,
    login_user,
    logout_user,
    login_required,
    current_user,
    login_fresh
)
from flask_bcrypt import generate_password_hash
from werkzeug import exceptions
from config import (
    app, 
    db, 
    api, 
    login
)
from models import (
    db,
    User,
    Listing,
    Cart,
    Carted_Item,
    Order,
    Order_Item,
)

bp_name = "exceptions"
bp = Blueprint(bp_name, __name__)

@bp.app_errorhandler(exceptions.InternalServerError)
def _handle_internal_server_error(ex):
    if request.path.startswith("/api/"):
        return jsonidy(message=str(ex)), ex.code
    else:
        return ex

@login.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

@login_required
def create_session():
    login_user(user)

@login_required
def logout():
    logout_user()

class Login(Resource):
    def post(self):
        email = request.get_json()["email"]
        password = request.get_json()["password"]
        user = User.query.filter(User.email == email).first()
        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                login_user(user, remember=True)
                return user.to_dict(), 200
        return {"error": "invalid login"}, 401
    
class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            session["user_id"] = None
            logout_user()
            return {"message": "logged out"}, 204
        return {"error": "unauthorized"}, 401
    
    def post(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            session["user_id"] = None
            logout_user()
            return {"message": "logged out"}, 204
        return {"error": "unauthorized"}, 401
    
@app.route("/api/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()
    if not login_fresh():
        login_user(user, remember=True)
    print("user logged in")
    return user.to_dict(), 200

class Signup(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        pfp = data.get("pfp")
        name = data.get("name")
        user_exists = User.query.filter(or_(User.email == email)).first()
        if user_exists:
            return {"error": "User already exists"}, 409
        new_user = User(
            email=email,
            name=name,
            pfp=pfp,
        )
        new_user.password_hash = password
        try:
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
        except:
            return {"error": "unprocessable entry"}, 422
        session["user_id"] = new_user.id
        login_user(new_user)
        return new_user.to_dict(), 201
    
class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            print(session["user_id"])
            user = User.query.filter(User.id == session["user_id"]).first()
            login_user(user)
            return user.to_dict(), 200
        return {"error": "unauthorized"}, 401

api.add_resource(Login, "/api/login", endpoint="login")
api.add_resource(Logout, "/api/logout", endpoint="logout")
api.add_resource(Signup, "/api/signup", endpoint="signup")
api.add_resource(CheckSession, "/api/check_session", endpoint="check_session")

if __name__ == "__main__":
    app.run(port=5555, debug=True)