$(document).ready(function() {
  let amenityObject = {};

  $('input[type="checkbox"]').click(function(){
    if ($(this).is(":checked")) {
      amenityObject[$(this).data('id')] = $(this).data('name');
      $('div.amenities h4').text(Object.values(amenityObject).join(', '));
    } else if ($(this).is(":not(:checked)")) {
      delete amenityObject[$(this).data('id')];
      $('div.amenities h4').text(Object.values(amenityObject).join(', '));
    }
    console.log(amenityObject)
  });
});
