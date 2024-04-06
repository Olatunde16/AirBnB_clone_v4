$(function () {
  const checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');

    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = $(this).data('name');
    } else {
      delete checkedAmenities[amenityId];
    }
    const amenitiesList = Object.values(checkedAmenities).join(', ');

    $('.amenities h4').text('checked amenities: ' + amenitiesList);
  });
});
