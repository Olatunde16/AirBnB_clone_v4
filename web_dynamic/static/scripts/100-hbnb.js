$(document).ready(function() {
    let amenitiesChecked = {};
    let checkedStates = {};
    let checkedLocations = {};

    $('input[type="checkbox"]').change(function() {
        if ($(this).closest('.amenities').length) {
            if (this.checked) {
                amenitiesChecked[$(this).data('id')] = $(this).data('name');
            } else {
                delete amenitiesChecked[$(this).data('id')];
            }
            let amenitiesList = Object.values(amenitiesChecked).join(', ');
            $('div.amenities > h4').text(amenitiesList);
        }
    });
     $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        }
        else {
            $('#api_status').removeClass('available');
        }
     })

     $.post({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: JSON.stringify({}),
        contentType: 'application/json',
        headers: {
			"Content-Type": "application/json",
		},
        success: function(response) {
            for (let place of response) {
                let article = `
                <article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">${place.description}</div>
                </article>
                `;
                $('section.places').append(article);
            }
        }
    });


    function displayPlaces(places) {
        $('section.places').empty();
        for (let place of places) {
            let article = `
            <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">${place.description}</div>
            </article>
            `;
            $('section.places').append(article);
        }
    }



     $('button').click(function() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            data: JSON.stringify({ amenities: Object.keys(amenitiesChecked) }),
            contentType: 'application/json',
            success: function(response) {
                displayPlaces(response);
            },
            error: function(error) {
                console.error("An error occurred while processing the request.");
            }
        });
    });

    $(".locations .popover input[type='checkbox']").change(
        function () {
    if (this.checked) {
      checkedStates[$(this).data('id')] = $(this).data('name');
      checkedLocations[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedStates[$(this).data('id')];
      delete checkedLocations[$(this).data('id')];
    }

    let cities_list = Object.values(checkedLocations).join(', ');
    $('div.filters h4').text(cities_list)
});


})