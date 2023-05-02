#!/usr/bin/python3
from api.v1.views import app_views
from models.amenity import Amenity
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import jsonify

states = storage.all(State).values()

@app_views.route("/api/v1/states", methods=["GET"])
def get_states():
    