#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


# vvv updated route as per instructions
# - Ace
@app.route('/2-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('2-hbnb.html',
                           # ^^^ Went ahead and updated '100-hbnb.html' to '0-hbnb.html'
                           # -Ace
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())
                           # ^^^ Pretty sure I did the uuid right
                           # But I'm still getting yellow squiggles
                           #    I definitely did that wrong
                           # No actually, it is working.


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
