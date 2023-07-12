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
    
class Listings(Resource):
    method_decorate = [login_required]
    def get(self):
        page = int(request.args.get("page", 1))
        per_page = 20
        total = Listing.query.count()
        listings = Listing.query.order_by(Listing.created_at.desc())
        listings = listings.paginate()
        return {
            "listings": [
                listing.to_dict(
                    only=(
                        "id",
                        "name",
                        "quality",
                        "price",
                        "picture",
                        "description",
                        "user_id",
                        "created_at"
                    )
                )
                for listing in listings.items
            ],
            "total": listings.total,
            "has_next": listings.has_next,
            "has_prev": listings.has_prev,
            "page": page,
            "per_page": per_page,
        }, 200
    def post(self):
        data = request.get_json()
        try:
            new_listing = Listing(
                name=data.get("name"),
                quality=data.get("quality"),
                price=data.get("price"),
                picture=data.get("picture"),
                description=data.get("description"),
                user_id=session.get("user_id"),
            )
            db.session.add(new_listing)
            db.session.commit()
            return new_listing.to_dict(), 201
        except:
            return {"error": "Validation Error"}, 400
        
class ListingById(Resource):
    method_decorators = [login_required]
    def get(self, id):
        listing = Listing.query.filter_by(id=id).first()
        if not listing:
            return {"error": "Listing not found"}, 404
        return listing.to_dict(), 200
    def patch(self, id):
        data = request.get_json()
        listing = Listing.query.filter_by(id=id).first()
        if not listing:
            return {"error": "Listing not found"}, 404
        if listing.user_id != current_user.id:
            return {"error": "Unauthorized to edit this listing"}, 401
        for attr in data:
            if attr == "created_at":
                setattr(
                    listing,
                    attr,
                    data.get("updated_at")
                )
            else:
                setattr(listing, attr, data.get(attr))
        try:
            db.session.add(listing)
            db.session.commit()
            return (
                listing.to_dict(
                    only=(
                        "id",
                        "name",
                        "quality",
                        "price",
                        "picture",
                        "description",
                        "user_id",
                        "created_at",
                        "updated_at",
                    )
                ), 201
            )
        except:
            return {"error": "Unable to update listing"}, 400
    def delete(self, id):
        listing = Listing.query.filter_by(id=id).first()
        if not listing:
            return {"error": "Listing not found"}, 404
        if listing.user_id != current_user.id:
            return {"error": "Unauthorized to delete this listing"}, 401
        db.session.delete(listing)
        db.session.commit()
        return {}, 204
    
class Users(Resource):
    method_decorators = [login_required]
    def get(self):
        page = int(request.args.get("page", 1))
        per_page = 20
        total = User.query.count()
        users = User.query.order_by(User.created_at.desc())
        users = users.paginate()
        return {
            "users": [
                user.to_dict() for user in users.items
            ],
            "total": users.total,
            "has_next": users.has_next,
            "has_prev": users.has_prev,
            "page": page,
            "per_page": per_page,
        }, 200
    
class UserById(Resource):
    method_decorators = [login_required]
    def get(self, id): 
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"error": "User not found"}, 404
        return user.to_dict(), 200
    def patch(self, id):
        data = request.get_json()
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"error": "User not found"}, 404
        if user.id != current_user.id:
            return {"error": "Unauthorized to edit this user"}, 401
        for attr in data:
            setattr(user, attr, data.get(attr))
        try:
            db.session.add(user)
            db.session.commit()
            return user.to_dict(
                only=(
                    "id",
                    "email",
                    "_password_hash",
                    "name",
                    "pfp",
                    "created_at",
                    "updated_at",
                )
            ), 201
        except:
            return {"error": "Unable to update user"}, 400
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"error": "User not found"}, 404
        if user.id != current_user.id:
            return {"error": "Unauthorized to delete this user"}, 401
        db.session.delete(user)
        db.session.commit()
        return {}, 204
    
class Carts(Resource):
    method_decorators = [login_required]
    def get(self):
        carts = [cart.to_dict() for cart in Cart.query.all()]
        return carts, 200
    def post(self):
        carts = [cart for cart in Cart.query.all()]
        if current_user.id not in carts:
            try:
                new_cart = Cart(
                    user_id=session.get("user_id"),
                )
                db.session.add(new_cart)
                db.session.commit()
                print(new_cart)
                return new_cart.to_dict(), 201
            except:
                return {"error": "Unable to create new cart"}, 400
        return {"error": "Cart already exists"}

class CartById(Resource):
    method_decorators = [login_required]
    def get(self, id):
        cart = Cart.query.filter_by(id=id).first()
        if not cart:
            return {"error": "Cart not found"}, 404
        return cart.to_dict(), 200
    def delete(self, id):
        cart = Cart.query.filter_by(id=id).first()
        if not cart:
            return {"error": "Cart not found"}, 404
        if cart.user_id != current_user.id:
            return {"error": "Unauthorized to delete this cart"}, 401
        db.session.delete(cart)
        db.session.commit()
        return {}, 204
        

class CartedItems(Resource):
    method_decorators = [login_required]
    def get(self):
        carted_items = [carted_item.to_dict() for carted_item in Carted_Item.query.all()]
        return carted_items, 200
    def post(self):
        data = request.get_json()
        cart = Cart.query.filter_by(id=current_user.id).first()
        if not cart:
            return {"error": "Cart not found"}, 404
        listing_id = data.get("listing_id")
        existing_item = Carted_Item.query.filter_by(cart_id=cart.id, listing_id=listing_id).first()
        if existing_item:
            return {"error": "Item already exists in cart"}, 400
        try:
            new_carted_item = Carted_Item(
                cart_id=cart.id,
                listing_id=listing_id,
                amount=data.get('amount')
            )
            db.session.add(new_carted_item)
            db.session.commit()
            print(new_carted_item)
            return new_carted_item.to_dict(), 201
        except:
            return {"error": "Unable to add to cart"}, 400
        
class CartedItemById(Resource):
    method_decorators = [login_required]
    def get(self, id):
        carted_item = Carted_Item.query.filter_by(id=id).first()
        if not carted_item:
            return {"error": "Carted Item not found"}, 404
        return carted_item.to_dict(), 200
    def patch(self, id):
        data = request.get_json()
        carted_item = Carted_Item.query.filter_by(id=id).first()
        if not carted_item:
            return {"error": "Carted Item not found"}, 404
        if carted_item.cart.user_id != current_user.id:
            return {"error": "Unauthorized to edit this carted item"}, 401
        for attr in data:
            setattr(carted_item, attr, data.get(attr))
        try:
            db.session.add(carted_item)
            db.session.commit()
            return (
                carted_item.to_dict(
                    only=(
                        "id",
                        "cart_id",
                        "listing_id",
                        "amount",
                    )
                ), 201
            )
        except:
            return {"error": "Unable to update Carted Item"}, 400
    def delete(self, id):
        carted_item = Carted_Item.query.filter_by(id=id).first()
        if not carted_item:
            return {"error": "Carted Item not found"}, 404
        if carted_item.cart.user_id != current_user.id:
            return {"error": "Unauthorized to delete this carted item"}, 401
        db.session.delete(carted_item)
        db.session.commit()
        return {}, 204
    
class Orders(Resource):
    method_decorators = [login_required]
    def get(self):
        orders = [order.to_dict() for order in Order.query.all()]
        return orders, 200
    def post(self):
        data = request.get_json()
        order_id = data.get("order_id")
        existing_order = Order.query.filter_by(id=order_id).first()
        if existing_order:
            return {"error": "Order already exists"}, 400
        try:
            new_order = Order(
                user_id=session.get('user_id')
            )
            db.session.add(new_order)
            db.session.commit()
            print(new_order)
            return new_order.to_dict(), 201
        except:
            return {"error": "Unable to create order"}, 400

class OrderById(Resource):
    method_decorators = [login_required]
    def get(self, id):
        order = Order.query.filter_by(id=id).first()
        if not order:
            return {"error": "Order not found"}, 404
        return order.to_dict(), 200
    def delete(self, id):
        order = Order.query.filter_by(id=id).first()
        if not order:
            return {"error": "Order not found"}, 404
        if order.user_id != current_user.id:
            return {"error": "Unauthorized to delete order"}, 401
        db.session.delete(order)
        db.session.commit()
        return {}, 204

class OrderItems(Resource):
    method_decorators = [login_required]
    def get(self):
        order_items = [order_items.to_dict() for order_items in Order_Item.query.all()]
        return order_items, 200
    def post(self):
        data = request.get_json()
        try:
            order = Order.query.filter_by(user_id=current_user.id).order_by(Order.id.desc()).first()
            if not order:
                return {"error": "Order not found"}, 404
            listing_id = data.get("listing_id")
            amount=data.get("amount")
            price = Listing.query.filter_by(id=listing_id).first().price * amount
            new_order_item = Order_Item(
                order_id=order.id,
                listing_id=listing_id,
                amount=amount,
                price=price
            )
            db.session.add(new_order_item)
            db.session.commit()
            return new_order_item.to_dict(), 201
        except:
            return {"error": "Unable to create order item"}, 400
        
class OrderItemById(Resource):
    method_decorators = [login_required]
    def get(self, id):
        order_item = Order_Item.query.filter_by(id=id).first()
        if not order_item:
            return {"error": "Order item not found"}, 404
        return order_item.to_dict(), 200
    def patch(self, id):
        data = request.get_json()
        order_item = Order_Item.query.filter_by(id=id).first()
        if not order_item:
            return {"error": "Order item not found"}, 404
        if order_item.order.user_id != current_user.id:
            return {"error": "Unauthorized to edit order item"}, 401
        for attr in data:
            setattr(order_item, attr, data.get(attr))
        try:
            db.session.add(order_item)
            db.session.commit()
            return (
                order_item.to_dict(
                    only=(
                        "id",
                        "order_id",
                        "listing_id",
                        "amount",
                        "price",
                        "created_at",
                        "updated_at",
                    )
                ), 201
            )
        except:
            return {"error": "Unable to update order item"}, 400
    def delete(self, id):
        order_item = Order_Item.query.filter_by(id=id).first()
        if not order_item:
            return {"error": "Order item not found"}, 404
        if order_item.order.user_id != current_user.id:
            return {"error": "Unauthorized to delete order item"}, 400
        db.session.delete(order_item)
        db.session.commit()
        return {}, 204

api.add_resource(Login, "/api/login", endpoint="login")
api.add_resource(Logout, "/api/logout", endpoint="logout")
api.add_resource(Signup, "/api/signup", endpoint="signup")
api.add_resource(CheckSession, "/api/check_session", endpoint="check_session")
api.add_resource(Listings, "/api/listings", endpoint="listings")
api.add_resource(ListingById, "/api/listings/<int:id>")
api.add_resource(Users, "/api/users")
api.add_resource(UserById, "/api/users/<int:id>")
api.add_resource(Carts, "/api/carts")
api.add_resource(CartById, "/api/carts/<int:id>")
api.add_resource(CartedItems, "/api/carted_items")
api.add_resource(CartedItemById, "/api/carted_items/<int:id>")
api.add_resource(Orders, "/api/orders")
api.add_resource(OrderById, "/api/orders/<int:id>")
api.add_resource(OrderItems, "/api/order_items")
api.add_resource(OrderItemById, "/api/order_items/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)