from flask import Blueprint


app_views = Blueprint(__name__, 'app_views', url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.states import *
<<<<<<< HEAD
from api.v1.views.places_reviews import*
=======
from api.v1.views.cities import *
from api.v1.views.amenities import *


>>>>>>> 0f0f98e78b7ab5c6c111191df277f7cecdcb82d5
