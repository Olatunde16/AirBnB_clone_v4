const $ = window.$;
$(function () {
  const selectedAmenities = {};
  function check () {
    $('.amenities .popover input').map(function () {
      if ($(this).is(':checked')) {
        selectedAmenities[($(this).attr('data-id'))] = $(this).attr('data-name');
      } else {
        delete selectedAmenities[($(this).attr('data-id'))];
      }
      $('div.amenities h4').html(Object.values(SelectedAmenities).join(', ') || ' ');
    });
  }
  check();
  $('.amenities .popover input').change(function () {
    check();
  });
});
