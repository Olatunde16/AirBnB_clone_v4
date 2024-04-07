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
});