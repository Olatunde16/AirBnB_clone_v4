$(function () {
  $('input[type=checkbox]').on('click', function () {
    const amenity_list = [];
    $('input:checked').each(function () {
      amenity_list.push($(this).attr('data-id'));
    });
    $('.amenities h4').text(amenity_list.join(', '));
    if (amenity_list.length == 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
