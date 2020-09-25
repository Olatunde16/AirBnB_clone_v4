$(document).ready(function () {
  const amenDict = {};

  $('input[type="checkbox"]').click(function () {
    $(this).each(function () {
      if (this.checked === true) {
        amenDict[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenDict[($(this).data('id'))];
      }
    });
    if (Object.values(amenDict).lenght > 0) {
      $('.amenities h4').text(Object.values(amenDict).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }
  });
});
