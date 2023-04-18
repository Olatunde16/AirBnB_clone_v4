#!usr/bin/python3
"""Flask app"""
from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardowndb(exception):
    """close"""
    storage.close


@app.route('/3-hbnb/')
def hbnb_filters(the_id=None):
    """route to 3-hbnb"""
    stateobjs = storage.all('State').values()
    states = dict([state.name, state] for state in stateobjs)
    amenitee = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cacheid = (str(uuid.uuid4()))
    return render_template('3-hbnb.html', states=states,
                           amenitee=amenitee, places=places,
                           users=users, cacheid=cacheid)


if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
