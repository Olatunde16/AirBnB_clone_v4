from flask import Flask, render_template, url_for
from models import storage
import uuid
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True

app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session  after each request """
    storage.close()

@app.route('/1-hbnb/')
def filters_hbnb(the_id=None):
    """ for custom filter requests for states, cities and amenities modules"""
    states = {state.name: state for state in storage.all('State').values()}
    amenities = list(storage.all('Amenity').values())
    places = list(storage.all('Place').values())
    users = {user.id: f"{user.first_name} {user.last_name}" for user in storage.all('User').values()}

    return render_template('1-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           users=users,
                           cache_id=uuid.uuid4())

if __name__ == "__main__":
    """the Main app"""
    app.run(host=host, port=port)