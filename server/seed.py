from faker import Faker
import random
from app import app
from flask_sqlalchemy import SQLAlchemy
from config import db
from models import User, Listing, Cart, Carted_Item, Order, Order_Item

fake = Faker()


def create_data():
    with app.app_context():
        Order.query.delete()
        Order_Item.query.delete()
        User.query.delete()
        Listing.query.delete()
        Cart.query.delete()
        Carted_Item.query.delete()
        db.session.commit()

    with app.app_context():
        password = "password1!"
        main = User(email="djones@gmail.com", name="David", pfp="https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGNhciUyMHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60")
        main.password_hash = password
        db.session.add(main)
        db.session.commit()
        # Create users
        users = []
        for i in range(50):
            password = fake.password(
                length=10,
                special_chars=True,
                upper_case=True,
                lower_case=True,
                digits=True
            )
            pfps = [
                "https://images.unsplash.com/photo-1541443131876-44b03de101c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                "https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGNhciUyMHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60",
                "https://images.unsplash.com/photo-1484136063621-1acbc3b4ec98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1353&q=80",
                "https://images.unsplash.com/photo-1533416784636-2b0ccfea6b97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            ]
            user = User(
                email = fake.email(),
                name = fake.name(),
                pfp = random.choice(pfps),
            )
            user.password_hash = password
            users.append(user)
        db.session.add_all(users)
        db.session.commit()
    

    with app.app_context():
        # Create listings   
        listings = []
        qualities = ["New", "Slightly Used", "Heavily Used"]
        quality_price_ranges = {
                "New": (10, 50),
                "Slightly Used": (5,30),
                "Heavily Used": (1,10)
            }
        pictures = ["https://www.firestonecompleteautocare.com/content/dam/bsro-sites/global/images/tires/full-180/PotenzaRE980AS+.png", "https://www.beleestore.com/331812/wp-content/uploads/images14/images/products/2/17/xqkgt1b2x1.jpg", "https://5.imimg.com/data5/IOS/Default/2022/6/XV/EY/ML/12838969/product-jpeg-500x500.png", "https://i.pinimg.com/originals/8e/9d/ee/8e9deeccba7b54b1b37b91b1d55a98f7.png"]
        picture_names = ["Tire", "Battery", "Headlight", "Steering Wheel"]
        picture_name_relations = {
            "https://www.firestonecompleteautocare.com/content/dam/bsro-sites/global/images/tires/full-180/PotenzaRE980AS+.png": "Tire",
            "https://www.beleestore.com/331812/wp-content/uploads/images14/images/products/2/17/xqkgt1b2x1.jpg": "Battery",
            "https://5.imimg.com/data5/IOS/Default/2022/6/XV/EY/ML/12838969/product-jpeg-500x500.png": "Headlight",
            "https://i.pinimg.com/originals/8e/9d/ee/8e9deeccba7b54b1b37b91b1d55a98f7.png": "Steering Wheel"
        }
        for i in range(100):
            quality = random.choice(qualities)
            price_range = quality_price_ranges[quality]
            price = random.randint(price_range[0], price_range[1])
            picture = random.choice(pictures)
            picture_relationship = picture_name_relations[picture]
            listing = Listing(
                name = picture_relationship,
                quality = quality,
                price = price,
                picture = picture,
                description = fake.paragraph(nb_sentences=3, variable_nb_sentences=True),
                amount = fake.random_int(min=10, max=50),
                user_id = fake.random_int(min=0, max=49)
            )
            listings.append(listing)
        db.session.add_all(listings)
        db.session.commit()
    
    with app.app_context():
        # Create carts and carted items
        for user in users:
            cart = Cart(user=user)
            db.session.add(cart)
            db.session.commit()
            
            for i in range(fake.random_int(min=1, max=5)):
                listing = fake.random_element(listings)
                amount = fake.random_int(min=1, max=10)
                carted_item = Carted_Item(cart=cart, listing=listing, amount=amount)
                db.session.add(carted_item)
        
        db.session.commit()

    with app.app_context():
        # Create orders and order items
        for user in users:
            order = Order(user=user)
            db.session.add(order)
            db.session.commit()
            carted_items = Carted_Item.query.filter(Carted_Item.cart_id.in_(cart.id for cart in user.cart)).all()
            for carted_item in carted_items:
                price = carted_item.listing.price * carted_item.amount
                order_item = Order_Item(
                    order=order,
                    listing=carted_item.listing,
                    amount=carted_item.amount,
                    price=price
                )
                db.session.add(order_item)
            db.session.commit()

    return users, listings

if __name__ == '__main__':
    print("loading data")
    create_data()
    print("done")