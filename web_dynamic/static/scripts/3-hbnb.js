console.log('3-hbnb.js loaded');
const $ = window.$;
$(document).ready(function () {
    const amenities = {};
    $('input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        if (Object.values(amenities).length > 0) {
            $('div.amenities h4').text(Object.values(amenities).join(', '));
        } else {
            $('div.amenities h4').html('&nbsp;');
        }
    });
    $.get('http://localhost:5001/api/v1/status/', function (data, status) {
        if (status === 'success') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: '{}',
        success: function (data) {
            for (const place of data) {
                const titleElement = $('<div class="title_box"></div>');
                const articleElement = $('<article>fsfdsdf</article>');
                const placePrice = $('<div class="price_by_night"></div>').text('$' + place.price_by_night);
                const placeName = $('<h2></h2>').text(place.name);
                titleElement.append(placeName, placePrice);
                const placeInfo = $('<div class="information"></div>');
                const placeMaxGuest = $('<div class="max_guest"></div>').text(place.max_guest + ' Guest' + (place.max_guest === 1 ? '' : 's'));
                const placeNumberRooms = $('<div class="number_rooms"></div>').text(place.number_rooms + ' Bedroom' + (place.number_rooms === 1 ? '' : 's'));
                const placeNumberBathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms === 1 ? '' : 's'));
                placeInfo.append(placeMaxGuest, placeNumberRooms, placeNumberBathrooms);
                const placeDescription = $('<div class="description"></div>').text(place.description);
                articleElement.append(titleElement, placeInfo, placeDescription);
                $('section.places').append(articleElement);
            }
        }
    })
});
