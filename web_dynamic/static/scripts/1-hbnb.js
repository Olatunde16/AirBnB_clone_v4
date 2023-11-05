$(document).ready(function () {
  const amenities = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenities[this.dataset.name] = this.dataset.id;
      $('.amenities h4').text(Object.keys(amenities).join(', '));
    } else {
      delete amenities[this.dataset.name];
    }
    if (Object.keys(amenities).length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
    }
  });
});
