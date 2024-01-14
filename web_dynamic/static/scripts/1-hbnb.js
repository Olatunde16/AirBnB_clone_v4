$(function () {
  const amenityDict = {};

  $('input').click(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });
});
