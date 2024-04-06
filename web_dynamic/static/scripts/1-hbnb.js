$(document).ready(function (){
  let amenitiesChecked = [];
  $('input[type="checkbox"]').change(function() {
      let amenityId = $(this).attr('data-id');
      if (this.checked) {
          amenitiesChecked.push(amenityId);
      } else {
          amenitiesChecked.splice($.inArray(amenityId, amenitiesChecked), 1);
      }
      $('.amenities h4').text(amenitiesChecked.join(', '));
  });
});