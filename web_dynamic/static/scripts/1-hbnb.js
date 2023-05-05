$(function () {
  function addToSelectedAmenities () {
    const selectedAmenity = [];
    $.each($('input:checked'), function (i, input) {
      selectedAmenity.push($(input).data('name'));
    });
    $('div.amenities h4').empty();
    if (selectedAmenity.length) {
      $('div.amenities h4').append(selectedAmenity.join(', '));
    }
  }
  $('input[type=checkbox]').on('change', addToSelectedAmenities);
});
