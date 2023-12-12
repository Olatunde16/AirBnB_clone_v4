#!/usr/bin/python3
"""
Flask App
"""
import uuid
from flask import Flask, render_template
from models import storage

app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'

@app.teardown_appcontext
def teardown_db(exception):
    """Close the database connection"""
    storage.close()

@app.route('/1-hbnb/')
def hbnb_filters(the_id=None):
    """Display the 1-hbnb page"""
    state_objs = storage.all('State').values()
    states = {state.name: state for state in state_objs}
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = {user.id: f"{user.first_name} {user.last_name}" for user in storage.all('User').values()}
    cache_id = str(uuid.uuid4())

    return render_template('1-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=cache_id)

if __name__ == "__main__":
    app.run(host=host, port=port)
