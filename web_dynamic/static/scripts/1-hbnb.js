$(document).ready(function () {
  const checkedAmenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete checkedAmenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });
});
