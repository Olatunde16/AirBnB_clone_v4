#!/usr/bin/node
$('document').ready(function () {
  const listAmenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      listAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listAmenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(listAmenities).join(', '));
  });
});
