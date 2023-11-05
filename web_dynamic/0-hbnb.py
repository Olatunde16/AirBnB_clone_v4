#!/usr/bin/python3
""" Starts a Flask Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid

app = Flask(__name)


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/0-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k.name)

    # Generate a UUID using uuid.uuid4()
    cache_id = uuid.uuid4()

    return render_template('100-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)  # Pass cache_id to the template

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
