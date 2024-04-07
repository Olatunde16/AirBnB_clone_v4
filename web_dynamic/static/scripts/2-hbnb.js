$(document).ready(function() {
	const checkedAmenities = {};

	$('input[type="checkbox"]').change(function() {
		const amenityId = $(this).attr('data-id');
		const amenityName = $(this).attr('data-name');

		if ($(this).prop('checked')) {
			checkedAmenities[amenityId] = amenityName;
		} else {
			delete checkedAmenities[amenityId];
		}
	const amenitiesList = Object.values(checkedAmenities).join(', ');
	$('.amenities h4').text(amenitiesList);
	$('#checkedAmenitiesList').text("Checked amenities:" + amenitiesList);
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