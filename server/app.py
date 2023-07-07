from flask import (
    Flask,
    jsonify,
    request,
    session,
    abort,
    flash,
    redirect,
    url_for,
)
from flask_migrate import Migrate
from flask_login import (
    LoginManager,
    login_user,
    logout_user,
    login_required,
    current_user
)
from flask_bcrypt import generate_password_hash
from config import (
    app, 
    db, 
    api, 
    Resource
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


migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()


if __name__ == "__main__":
    app.run(port=5555, debug=True)