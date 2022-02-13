const $ = window.jQuery;
const listAmenities = {};
window.onload = function () {
  $('div.amenities input[type=checkbox]').change(function () {
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      listAmenities[id] = $(this).attr('data-name');
    } else {
      delete listAmenities[id];
    }
    $('.amenities h4').text(Object.values(listAmenities).join(', '));
  });
};
