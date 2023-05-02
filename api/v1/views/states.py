#!/usr/bin/python3
from api.v1.views import app_views
from models import storage
from api.v1.views import app_views
from flask import jsonify, abort, make_response, request

states = storage.all(State).values()
"""List all states"""
@app_views.route("/api/v1/states", methods=["GET"])
def get_states():
    all_states = []
    for state in states:
        all_states.append(state.to_dict())
    return jsonify(all_states)
"""Get state by ID"""
@app_views.route('/api/v1/states/<int:state_id>', methods=["GET"])
def get_state(state_id):
    state = storage.get(state, state_id)
    if not state:
        abort(404)
    return jsonify(state)
"""Delete state function"""
@app_views.route('/api/v1/states/<int:state_id>', methods=["GET"])
def delete_state(state_id):
    state = storage.get(state, state_id)
    if not state:
        abort(404)
    storage.delete(state)
    storage.save()
    return make_response(jsonify({}, 200))
@app_views.route('POST /api/v1/states', methods=["POST"])
def create_state():
    """Create a new state object"""
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'name' not in request.get_json():
         abort(400, description="Missing name")
    imput = request.get_json()
    new_state = State(**imput)
    new_state.save()
    return make_response(jsonify(new_state.to_dict()), 201)

"""PUT method"""
@app_views.route('/states/<int:state_id>', methods=['PUT'], strict_slashes=False)
def update_state(state_id):
    """Update a state using id"""
    state = storage.get(State, state_id)
    if not state:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    imput = request.get_json()
    ig = ['id', 'created_at', 'updated_at']
    for k, v in imput.items():
        if k not in ig:
            setattr(state, k, v)
    storage.save()
    return make_response(jsonify(state.to_dict()), 200)