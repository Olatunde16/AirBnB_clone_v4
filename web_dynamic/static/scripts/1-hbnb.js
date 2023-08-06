$(document).ready(function () {
  const checkedAmenities = {};

  $('input').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }

    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });
});
