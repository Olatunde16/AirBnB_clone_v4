$(document).ready(function () {
  $.get('http://localhost:5001/api/v1/status/',
    function (response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
  });
  const amenList = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenList[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenList[$(this).attr('data-id')];
    }
    let text = Object.values(amenList).join(', ');
    if (text.length > 37) {
        text = text.slice(0, 37) + '...';
      }
    if (text) {
      $('.amenities > h4').text(text);
    } else {
      $('.amenities > h4').text("\xa0");
    }
  });
  
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(response) {
      for (let place of response) {
        let article = $('<article>').addClass('place');
	let titleBox = $('<div>').addClass('title_box');
	let title = $('<h2>').text(place.name);
	let price = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
	titleBox.append(title).append(price);
	let info = $('<div>').addClass('information');
	let maxGuest = $('<div>').addClass('max_guest').html(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
	let numRooms = $('<div>').addClass('number_rooms').html(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
	let numBaths = $('<div>').addClass('number_bathrooms').html(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
	info.append(maxGuest).append(numRooms).append(numBaths);
	let desc = $('<div>').addClass('description').text(place.description);
	article.append(titleBox).append(info).append(desc);
	$('section.places').append(article);
      }
    }
  });
});
