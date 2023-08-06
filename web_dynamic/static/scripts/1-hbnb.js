$(document).ready(function () {
  let AmenList = [];
  $('input[type=checkbox]').change(function () {
    const name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      AmenList.push(name);
    } else {
      AmenList = AmenList.filter(amen => amen !== name);
    }
    $('.amenities h4').text(AmenList.join(', '));
  });
});
