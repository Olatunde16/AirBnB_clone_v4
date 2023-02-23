let amen = [];
$(document).ready(function () {
  $('INPUT[type=checkbox]').click(function () {
    if (this.checked) {
      amen.push($(this).data('name'));
    } else {
      amen.splice(amen.indexOf($(this).data('name')), 1);
    }
    $('.amenities h4').text(amen.join(', '));
  });
});

$.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});


$(function () {
  $.ajax({
    'type': 'POST',
    'url': 'http://0.0.0.0:5001/api/v1/places_search/',
    'Content-Type': 'application/json',
    'dataType': 'json',
    'data': JSON.stringify({}),
    'success': function (places) {
      for (let i = 0; i < places.length; i++ ) {
	let article = '<article> <h2>' + places[i].name + '</h2><div class="price_by_night"><p>' + places[i].price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +  places[i].max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + places[i].number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + places[i].number_bathrooms + '</p></div></div><div class="description"><p>' + places[i].description + '</p></div> </article>';
	$('.places').append(article)
      };
    }
  });
});
