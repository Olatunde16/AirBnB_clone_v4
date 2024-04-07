$(document).ready(function() {
	const checkedAmenities = {};
	$('input[type="checkbox"]').change(function() {

		if ($(this).is(':checked')) {
			checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete checkedAmenities[$(this).attr('data-id')];
		}
		$('.amenities h4').text(Object.values(checkedAmenities).join(', '));
	});


    $.ajax({
        type: "GET",
        url: "http://0.0.0.0:5001/api/v1/status/",
        success: function(response) {
            if (response.status === 'OK') {
                $('DIV#api_status').addClass('available');
            } else {
                $('DIV#api_status').removeClass('available');
                }
        }
            });
    });