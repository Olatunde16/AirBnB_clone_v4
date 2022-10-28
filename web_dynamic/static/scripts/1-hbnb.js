window.addEventListener('load', function () {
  // Select some Amenities to be comfortable!
  const amenity = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      amenity[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
	    delete amenity[$(this).attr('data-id')];
    }
    if (Object.keys(amenity).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
	    $('div.amenities h4').text(Object.values(amenity).join(', '));
    }
  });
});
