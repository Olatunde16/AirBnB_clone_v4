#!/usr/bin/node

let amenitiesChecked = [];

function appendAmenity(amenity) {
    amenitiesChecked.push(amenity);
}

$(document).ready(
    function () {
        /*
        makes jquery listen for change in all
        the amenity checkboxes,
        and to append the amenity
        to 'amenitiesChecked'
        when they are checked.
        */
        amenitiesCheckboxes = $('.amenities .popover').children('li input:checkbox');
        for (const amenityCheckbox of amenitiesCheckboxes) {
            amenityCheckbox.change(appendAmenity);
        }
    }
);