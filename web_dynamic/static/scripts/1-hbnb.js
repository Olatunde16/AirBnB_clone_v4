// Simple JS Script to change state of checkboxes.

$(document).ready(function(){
  let amenitiesChecked = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
      // Join the names of the checked amenities and update the h4 tag
      $('.amenities h4').text(Object.values(amenitiesChecked).join(', '));
  });
});
