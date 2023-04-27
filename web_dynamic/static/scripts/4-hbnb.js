#!/usr/bin/node

$(document).ready(function() {
    $.ajax(
        {
            url: 'http://0.0.0.0:5001/api/v1/status/',
            success: function (data) {
                console.log("API CHECK")
                if (data.status === 'OK') {
                    console.log("available")
                    $('#api_status').toggleClass('unavailable available');
                } 
            }
        }
    );

    const selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if (this.checked) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        const amenitiesList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });
    const postApi = "http://0.0.0.0:5001/api/v1/places_search/";
    $.ajax({
        method: "POST",
        url: postApi,
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            for (const place of data) {
            $('.places').append(`<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${ place.price_by_night }</div>
            </div>
            <div class="information">
              <div class="max_guest">${ place.max_guest } Guest${place.max_guest != 1 }s</div>
                  <div class="number_rooms">${ place.number_rooms } Bedroom${ place.number_rooms != 1 }s</div>
                  <div class="number_bathrooms">${ place.number_bathrooms } Bathroom${ place.number_bathrooms != 1 }s</div>
            </div>
            <div class="user">
                </div>
                <div class="description">
              ${ place.description }
                </div>
          </article>`);
        }
        }
    
    });
    
    $('button').click(function() {
        $.ajax({
            method: 'GET',
            url: "http://0.0.0.0:5001/api/v1/places_search/",
        });
    })
});