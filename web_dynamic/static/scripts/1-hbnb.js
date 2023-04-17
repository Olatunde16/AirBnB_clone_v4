$(document).ready(function () {
  const amenityIds = {};

  $('input[type="checkbox"]').on('change', function () {
    if ($(this).is(':checked')) {
      amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityIds[$(this).attr('data-id')];
    }

    const amenityNames = Object.values(amenityIds).sort();
    $('.amenities h4').text(amenityNames.join(', ') || '&nbsp;');
  });
});
