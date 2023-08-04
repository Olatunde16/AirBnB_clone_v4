$(document).ready( function() {
  let amenity_array = [];
  $('.popover :checkbox').change( function() {
    if($(this).is(':checked')) {
      amenity_array.push(this.amenity_id);
    } else {
      amenity_array = amenity_array.filter((item) => item !== this.amenity_id);
    }
  $('DIV#amenities h4').text(amenity_array);
  });
});
