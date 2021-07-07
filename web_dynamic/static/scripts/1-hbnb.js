const amenitiesDict = {};

$(document).ready(function () {
  $('input').click(function () {
    if ($(this).is(':checked')) {
      amenitiesDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenitiesDict[$(this).attr('data-id')];
    }
    if (Object.keys(amenitiesDict).length > 2) {
      const lista = Object.values(amenitiesDict);
      const mystr = lista[0] + ', ' + lista[1] + ', ' + lista[2] + '...';
      $('.amenities h4').text(mystr);
    } else {
      $('.amenities h4').text(Object.values(amenitiesDict).join(', '));
    }
  });
});
