from faker import Faker
from app import app
from flask_sqlalchemy import SQLAlchemy
from config import db
from models import User, Listing, Cart, Carted_Item, Order, Order_Item

fake = Faker()


def create_data():
    with app.app_context():
        Order_Item.query.delete()
        User.query.delete()
        Listing.query.delete()
        Cart.query.delete()
        Carted_Item.query.delete()
        db.session.commit()

    with app.app_context():
        password = "password1!"
        main = User(email="djones@gmail.com", name="David", pfp="https://placekitten.com/150/150")
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
            user = User(
                email = fake.email(),
                name = fake.name(),
                pfp = "https://placekitten.com/150/150",
            )
            user.password_hash = password
            users.append(user)
        db.session.add_all(users)
        db.session.commit()
    

    with app.app_context():
        # Create listings   
        listings = []
        for i in range(100):
            listing = Listing(
                name = fake.word(),
                quality = fake.word(),
                price = fake.random_number(digits=2),
                picture = "https://placekitten.com/150/150",
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