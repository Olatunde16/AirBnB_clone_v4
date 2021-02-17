//render places on the web page using information from the API
const post_api = (dict_data = {}) => {
    console.log(JSON.stringify(dict_data));
    $.ajax({
    method: "POST",
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify(dict_data),
    contentType: "application/json",
    success: function (data) {
	    console.log(data);
	for (let i = 0; i < data.length; i++) {
	    let place = data[i];
	    console.log(i);
	    $('.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guests </div><div class="number_rooms">' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div></div><div class="description">' + place.description +'</div></article>');
	}
    }
    });
}
post_api();
// Request get method to know if the API is functioning well, there is a visual sign on the web page
$.get('http://0.0.0.0:5001/api/v1/status/', (data,status) => {
    if(data.status === 'OK') {
	$('#api_status').addClass("available");
    }
});
// dynamic content for the filters
$(document).ready(() => {
    let names = {};
    $('input').change(function() {
	let string = '';
	let amenh4 = $("body > div > section.filters > div.amenities > h4");
	if ($(this).is(':checked')) {
          names[$(this).data('id')] = $(this).data('name');
	} else if (!$(this).is(':checked')) {
          delete names[$(this).data('id')];
	}
	for (let key in names) {
          string += names[key] + ", ";
	}
	if (string === '') {
          amenh4.html('&nbsp;');
	} else {
          amenh4.text(string);
	}
    })
    $('body > div > section.filters > button').click(() => {
	$('.places > article').remove();
	const amenIds = Object.keys(names);
	if (amenIds.length > 0) {
	    let query_dict = {'amenities': amenIds};
	    post_api(query_dict);
	} else {
	    post_api();
	}
    });
});
