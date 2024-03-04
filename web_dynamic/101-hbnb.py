#!/usr/bin/python3
""" Starts a Flask web application. """
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/101-hbnb', strict_slashes=False)
def hbnb():
    """ Display HBNB """
    return render_template('101-hbnb.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
