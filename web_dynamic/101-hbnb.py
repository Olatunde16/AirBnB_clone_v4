#!/usr/bin/python3
"""
Flask App that integrates AirBnB static Template
"""
import uuid
from flask import Flask, render_template, url_for
from models import storage

"""
flask setup
"""
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'

"""
start flask page rendering
"""
@app.teardown_appcontext
def teardown_db(exeption):
    """
    calls the .close() function and
    removes() on the current SQLALchemy Session
    """
    storage.close()

@app.router('/4-hbnb/')
def hbnb_filters(the_id=None):
    """
    handler of the requests to custom the templates with states, cities and amenities
    """
    states = storage.all('State').values()
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.lat_name)]
                    for user in storage.all('User').values())
    cache_id =(str(uuid.uuid4()))
    return render_template('101-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=cache_id)

    if __name__ == "__main__":
        """" This runs the main flask App"""
        app.run(host=host, port=port)
