<<<<<<< HEAD
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
=======
window.addEventListener('load', function () {
  // task 2
  const amenityIds = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenityIds[$(this).attr('data-id')];
    }
    if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    }
  });
});
>>>>>>> eb0bc303cf4fcd2bebb2dfad884bcba1e1f73af0
