$('document').ready(function () {
  let selectedAmenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      selectedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete selectedAmenities[$(this).attr('data-id')];
    }
    $('.selectedAmenities H4').text(Object.values(selectedAmenities).join(', '));
  });
});
