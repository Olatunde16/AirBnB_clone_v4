let myList = []

$(document).ready(
	function() {
		$('input:checkbox').change(
			function(){
				if ($(this).is(':checked')) {
					myList.push($(this).attr('data-name'));
				}
				else {
					myList.pop($(this).attr('data-name'));
				}
				$('.selected-input')
					.text(myList.join(', '));
			}
		);
		$.get(
			'http://localhost:5001/api/v1/status/',
			function(data, textStatus) {
				if (data.status === 'OK') {
					$('div #api_status').addClass('available');
				}
				else {
					$('div #api_status').removeClass('available');
				}
			}
		);
		$.post(
			'http://localhost:5001/api/v1/places_search/',
			{},
			function(data, textStatus) {
				console.log(textStatus);
				if (textStatus === 'success') {
					for (item in data) {
						$('section.places').wrapinner(`<article></article>`);
						$('section.places article').wrapinner(`<div class="title_box"></div>`);
						$('section.places.title_box').wrapinner(`<h2>${data.name}</h2>`);
						$('section.places.title_box').wrapinner(`<div class="price_by_night">${data.price_by_night}</div>`);
						$('section.places article').wrapinner(`<div class="information"></div>`);
						$('section.places.information').wrapinner(`<div class="max_guest">${data.max_guest}</div>`);
						$('section.places.information').wrapinner(`<div class="number_rooms">${data.number_rooms}</div>`);
						$('section.places.information').wrapinner(`<div class="number_bathrooms">${data.number_bathrooms}</div>`);
						$('section.places article').wrapinner(`<div class="description">${data.description}</div>`);
					}
				}
			},
			"json"
		);
	}
);
