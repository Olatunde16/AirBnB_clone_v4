#!/usr/bin/node
/*
JavaScript script
*/
let amenitiesChecked = []
document.addEventListener('DOMContentLoaded', (event) => {
    window.$('input:checkbox').change(function() {
        cbName = $(this).attr("data-name")
        if(window.$(this).is(':checked')) {
            amenitiesChecked.push(cbName)
        } else {
            delete amenitiesChecked.pop(cbName)
        }
        $('.amenities h4').html(amenitiesChecked.join(", "));
    });
});
