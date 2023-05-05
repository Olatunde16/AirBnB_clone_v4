$('document').ready(function () {
  const amenities = {};

  $('input[type="checkbox"]').on('change', function () {
    const amId = $(this).data('id');

    if ($(this).is(':checked')) {
      amenities[amId] = $(this).attr('data-name');
    } else {
      delete amenities[amId];
    }

    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
});
