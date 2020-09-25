const amenities = {};

$(document).ready(function () {
  $('input').each(function () {
    checkAndAppend(this);
  });
});

function checkAndAppend (inp) {
  $(inp).click(function () {
    if ($(inp).prop('checked')) {
      amenities[$(inp).data('id')] = $(inp).data('name');
      console.log(amenities);
    } else {
      delete amenities[$(inp).data('id')];
    }
    $('div.amenities h4').html(Object.values(amenities).join(', '));
    if (Object.values(amenities).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    }
  });
}
