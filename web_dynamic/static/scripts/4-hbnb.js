const $ = window.$;
$(document).ready(function () {
  const myAmenities = {};
  let myList = [];
  const checkbox = $('.amenities input[type="checkbox"]');
  checkbox.prop('checked', false);
  checkbox.change(function () {
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');
    if (this.checked) {
      myAmenities[dataId] = dataName;
    } else {
      delete myAmenities[dataId];
    }
    for (const key in myAmenities) {
      myList.push(myAmenities[key]);
    }
    const output = myList.join(', ');
    $('div.amenities > h4').text(output);
      myList = [];
  });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	if (data.status === "OK") {
	    $("div#api_status").addClass('available');
	} else {
	    $("div#api_status").removeClass('available');
	}
    });

    $('.filters button').click(function () {
	$.ajax({
	    type: 'POST',
	    url: 'http://0.0.0.0:5001/api/v1/places_search/',
	    contentType: 'application/json',
	    data: JSON.stringify({ amenities: Object.keys(myAmenities) })
	}).done(function (data) {
	    $('section.places').empty();
	    $('section.places').append('<h1>Places</h1>');
	    for (const place of data) {
		const template = `<article>
                <div class="title">
                <h2>${place.name}</h2>
                <div class="price_by_night">
              $${place.price_by_night}
              </div>
                </div>
                <div class="information">
                <div class="max_guest">

                <br />

              ${place.max_guest} Guests

              </div>
                <div class="number_rooms">

                <br />

              ${place.number_rooms} Bedrooms
              </div>
                <div class="number_bathrooms">

                <br />

              ${place.number_bathrooms} Bathroom
              </div>
                </div>
                <div class="description">

              ${place.description}
              </div>
              </article>

                $('section.places').append(template);
              }
            });
          });
        });
