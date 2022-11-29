#!/usr/bin/python3
from models.base_model import BaseModel
from models import storage
from models.user import User
from models.place import Place
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.review import Review


classes = {
    "User": User,
    "State": State,
    "City": City,
    "Place": Place,
    "Amenity": Amenity,
    "Review": Review,
}

for cls in classes.values():
    if cls == User:
        my_model = User()
        user_id = my_model.id
        my_model.first_name = "Gold"
        my_model.last_name = "Roger"
        my_model.email = "gol.d.roger@impeldown.com"
        my_model.password = "89131231234342"
    elif cls == State:
        my_model = State()
        state_id = my_model.id
        my_model.name = "California"
    elif cls == City:
        my_model = City()
        city_id = my_model.id
        my_model.state_id = state_id
        my_model.name = "San Francisco"
    elif cls == Place:
        my_model = Place()
        place_id = my_model.id
        my_model.user_id = user_id
        my_model.city_id = city_id
        my_model.name = "Sabaody Archipelago"
        my_model.description = "Mangrove Island"
        my_model.number_rooms = 14
        my_model.number_bathrooms = 2
        my_model.max_guest = 9
        my_model.price_by_night = 200
        my_model.latitude = 89.34
        my_model.longitude = -1.45
    elif cls == Amenity:
        my_model = Amenity()
        my_model.name = "Rayleigh's Coating shop"
    elif cls == Review:
        my_model = Review()
        my_model.user_id = user_id
        my_model.place_id = place_id
        my_model.text = "Most favorite Arc!"
    else:
        my_model = BaseModel()
        my_model.name = "Dragon"
        my_model.my_number = 45
    my_model.save()

    print('\n<---->')
    print(my_model)

    print('\n<---->')
    my_model_json = my_model.to_dict()
    print(my_model_json)

    print('\n<---->')
    print("JSON of my_model:")
    for key in my_model_json.keys():
        print("\t{}: ({}) - {}".format(key,
                                       type(my_model_json[key]),
                                       my_model_json[key]))

    print('\n<---->')
    print("All objects: {}".format(storage.count()))
    print("{} objects: {}".format(cls.__name__, storage.count(cls)))

    print('\n<---->')
    first_cls_id = list(storage.all(cls).values())[0].id
    print("First {}: {}".format(str(cls.__name__).lower(),
                                str(storage.get(cls, first_cls_id))))

    # print('\n<---->')
    # my_model.delete()
    # print(storage.all().get(
    #     f"{my_model.__class__.__name__}.{my_model.id}"))
