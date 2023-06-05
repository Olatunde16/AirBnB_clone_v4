const items = {};
let aList = [];

$('.amenities UL LI INPUT').css('margin-right', '10px');
function listAppend () {
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      aList.push($(this).parent().text());
      items[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      aList.pop($(this).parent().text());
      delete items[$(this).attr('data-name')];
    }
    console.log(items);
    $('.amenities h4').text(aList.join(', '));
  });
  checkStatus();
}

function checkStatus () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      if (data['status'] === 'OK') {
        $('DIV#api_status').addClass('available');
      }
    }
  });
}

function listing () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/JSON',
    data: JSON.stringify({ amenities: Object.values(items) }),
    success: function (res) {
      $.each(res, function (index, place){
	$('SECTION.places').append(
	  '<article>' +
           '<div class="tittle">' +
		'<div class="price_by_night">' +
                  place.price_by_night +
              '</div>' +
              '<h2>' + place.name +
	     '</h2>' +
            '</div>' +
            '<div class="information">' +
	      '<div class="max_guest">' +
		'<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
		'<br />' +
		   place.max_guest + ' Guests' +
	     '</div>' +
	      '<div class="number_rooms">' +
		'<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
		'<br />' +
		place.number_rooms + ' Bedrooms' +
	     ' </div>' +
	      '<div class="number_bathrooms">' +
		'<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
		'<br />'+
		place.number_bathrooms + ' Bathroom' +
	      '</div>' +
            '</div>' +
	   '<div class="description">' +
	      place.description +
	   '</div>' +
          '</article>'
	);
      });
    }
  });
}

$(document).ready(listAppend);
