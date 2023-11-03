/* eslint-env jquery */ // => (we are using jQuery)
/* Adding a listener that adds/removes amenities in an object */

$(document).ready(function () {
  const amenityObj = {};

  $('.amenities .popover input').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenityObj[amenityId] = amenityName;
    } else {
      delete amenityObj[amenityId];
    }
    const selectedAmenities = Object.values(amenityObj).sort().join(', ');
    $('.amenities h4').text(selectedAmenities);
  });
});
