#!/usr/bin/python3
""" Script that starts a Flask web application """

import uuid
from flask import Flask, render_template, url_for
from models import storage


app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'

def teardown_db(exception):
    """after each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session"""
    storage.close()


@app.route('/1-hbnb')
def hbnb_filters(the_id=None):
    """handles request to custom template with states, cities & amentities"""
    stt_objct = storage.all('State').values()
    states = dict([state.name, state] for state in stt_objct)
    amenitys = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    stash_id = (str(uuid.uuid4()))
    return render_template('1-hbnb.html', states=states,
                           amenitys=amenitys, places=places,
                           users=users, stash_id=stash_id)


if __name__ == "__main__":
    app.run(host=host, port=port)
