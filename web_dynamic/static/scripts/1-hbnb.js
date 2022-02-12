$(document).ready(function () {
    $('.amenities .popover ul li input').click(function () {
	const amenitiesId = [];
	const amenitiesName = [];
	$.each($('.amenities .popover ul li input:checked'), function () {
	    amenitiesId.push(this.dataset.id);
	    amenitiesName.push(this.dataset.name);
	});
	$('.amenities h4').text(amenitiesName.join(', '));
    });
});
