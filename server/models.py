from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin
from datetime import datetime
from config import db, bcrypt

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    pfp = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    cart = db.relationship("Cart", back_populates="user", cascade="all,delete-orphan")
    orders = db.relationship("Order", back_populates="user", cascade="all,delete-orphan")
    listings = association_proxy("cart", "listing")

    serialize_rules = ("-cart", "-listings", "-orders")

    @validates("email")
    def validate_email(self, key, email):
        if not email or "@" not in email:
            raise ValueError("Email must be a valid email address")
        return email
    
    @validates("name")
    def validate_name(self, key, name):
        if len(name) < 1:
            raise ValueError("Name must be at least 1 character")
        return name
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Can't look at password hashes")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
        )
    

class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    quality = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    picture = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    carted_items = db.relationship("Carted_Item", back_populates="listing", cascade="all,delete-orphan")
    order_items = db.relationship("Order_Item", back_populates="listing", cascade="all,delete-orphan")
    users = association_proxy("cart", "user")

    serialize_rules = ("-carted_items", "-order_items", "-users")




class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship("User", back_populates="cart")
    carted_items = db.relationship("Carted_Item", back_populates="cart")

    serialize_rules = ("-user", "-carted_items")

class Carted_Item(db.Model, SerializerMixin):
    __tablename__ = 'carted_items'
    
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    amount = db.Column(db.Integer)

    cart = db.relationship("Cart", back_populates="carted_items")
    listing = db.relationship("Listing", back_populates="carted_items")

    serialize_rules = ("-cart", "-listing")

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship("User", back_populates="orders")
    order_items = db.relationship("Order_Item", back_populates="order")
    
    serialize_rules = ("-user", "-order_items")

class Order_Item(db.Model, SerializerMixin):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"))
    amount = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order = db.relationship("Order", back_populates="order_items")
    listing = db.relationship("Listing", back_populates="order_items")

    serialize_rules = ("-order", "-listing")
