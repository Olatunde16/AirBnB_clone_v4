$(document).ready(function () {
  let amenities = [];
  if ($('input').attr('checked')) {
    amenities.append($('input').data('id'));
  } else {
    amenities.pop($('input').data('id'));
  }
  $('div.amenities h4').html(amenities);
});

