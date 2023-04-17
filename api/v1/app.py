#!/usr/bin/python3
"""appy appers"""
from flask import Flask, make_response
from models import storage
from api.v1.views import app_views
import os
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(404)
def handle_404(exception):
    """handles 404 scenario (page not found)"""
    code = exception.__str__().split()[0]
    message = {"error": "Not found"}
    return make_response(message, code)


@app.teardown_appcontext
def close_storage(exception):
    """close storage instance"""
    storage.close()


if __name__ == "__main__":
    host = os.environ.get("HBNB_API_HOST", "0.0.0.0")
    port = os.environ.get("HBNB_API_PORT", "5000")
    app.run(host=host, port=port, threaded=True)