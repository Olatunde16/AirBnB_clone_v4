$(document).ready(function () {
  $('input[type=checkbox]').on('click', function () {
    const amenityList = [];
    $('input:checked').each(function () {
      amenityList.push($(this).attr('data-id'));
    });
    $('.amenities h4').text(amenityList.join(', '));
    if (amenityList.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') { $('div#api_status').addClass('available'); } else { $('div#api_status').removeClass('available'); }
  });
	$.ajax({
		url: "http://0.0.0.0:5001/api/v1/places_search",
		type: 'POST',
		data: '{}',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(result) {
			$.each(result, function(index, value) {
				$('.places').append("<article><div class = 'title'><h2>" +
					value.name + "</h2> <div class ='price_by_night'> $" +
					value.price_by_night + '</div> </div>' +
					"<div class = 'information'>" +
					"<div class='max_guest'>" +
					"<i class='fa fa-users fa-3x' aria-hidden='true'>" +
					'</i> <br />' + value.max_guest +
					" Guests </div> <div class='number_rooms'>" +
					"<i class='fa fa-bed fa-3x' aria-hidden='true'></i>" +
					'<br />' + value.number_rooms +
                            		" Bedrooms </div> <div class='number_bathrooms'>" +
                            		"<i class='fa fa-bath fa-3x' aria-hidden='true'>" +
                            		'</i> <br />' + value.number_bathrooms +
                            		" Bathroom </div> </div> <div class='user'>" +
                            		"</div> <div class='description'>" +
                            		value.description + '</div> </article>');
			});
		}
	});
});
