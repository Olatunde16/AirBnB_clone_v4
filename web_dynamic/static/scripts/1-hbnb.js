$(function () {
	const amendict = {};

	$('div.amenities li input').change(
		function () {
			if ($(this).is(':checked')) {
				amendict[($(this).attr('data-id'))] = $(this).attr('data-name');
			} else {
				delete amendict[($(this).attr('data-id'))]
		}
		if (Object.values(amendict).length > 0) {
			$('.amenities h4').text(Object.values(amendict).join(', '));
		} else {
			$('.amenities h4').html('&nbsp');
		}
	});
});
