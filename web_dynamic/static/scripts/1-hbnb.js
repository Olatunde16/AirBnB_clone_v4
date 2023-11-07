$(document).ready(function () {
	const checkedAmenity = [];
	$('input:checkbox').click(function () {
	  if ($(this).is(":checked")) {
		checkedAmenity.push($(this).attr('data-name'));
	  } else {
		const nameIndex = checkedAmenity.indexOf($(this).attr('data-name'));
		checkedAmenity.splice(nameIndex, 1);
	  }
	  $('.amenities h4').text(checkedAmenity.join(', '));
	});
  });
