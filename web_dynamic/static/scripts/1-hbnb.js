$(document).ready(function () {
    let amenitiesChecked = []
    $('input ["type=checkbox"]').change(function() {
      if (this.checked) {
        let amenityId = $(this).attr('data-id');
        amenitiesChecked.push(amenityId);
       }
      else {
        amenitiesChecked.splice($.inArray(checked, amenitiesChecked), 1);
      }
      $('.amenities h4').text(amenitiesChecked);
    });
  });