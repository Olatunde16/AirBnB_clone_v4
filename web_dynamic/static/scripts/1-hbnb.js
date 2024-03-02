$(document).ready(function () {
	console.log('Document loaded successfully!');

	const amenityStorage = {};

	$('li :checkbox').change(function () {
		let amenityId = $(this).attr('data-id');
		let amenityName = $(this).attr('data-name');

		if(this.checked){
			amenityStorage[amenityId] = amenityName;
		} else {
			delete amentityStorage[amenityId]
		}

		$('div.amenities h4').empty();

		let newText =  $.map(amenityStorage, function (v) {
			return v;
		}).join(', ');

		$('div,amenities h4').text(newText);
	});
});
