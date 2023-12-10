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

if __name__ == "__main__":
    app.run(host=host, port=port)
