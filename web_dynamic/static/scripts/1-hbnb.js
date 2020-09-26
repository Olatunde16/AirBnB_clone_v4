$(document).ready(init);

function init () {
  const ListAmenity = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      ListAmenity[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete ListAmenity[$(this).attr('data-name')];
    }
    const names = Object.keys(ListAmenity);
    $('.amenities h4').text(names.sort().join(', '));
  });
}