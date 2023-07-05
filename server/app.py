import os

from flask import (
    Flask,
    jsonify,
    make_response,
    render_template,
    send_from_directory,
    request,
)
from flask_migrate import Migrate
from flask_restful import Api, Resource
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(
    __name__,
    static_url_path="",
    static_folder="../client/dist",
    template_folder="../client/dist",
)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///car.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)
# CORS(app)
api = Api(app)


if __name__ == "__main__":
    app.run(port=5555, debug=True)