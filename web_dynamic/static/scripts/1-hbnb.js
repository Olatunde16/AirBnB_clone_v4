$(document).ready(function() {
  // Initialize an empty array to store checked Amenity IDs
  var checkedAmenities = [];

  // Function to update the <h4> tag with the list of checked amenities
  function updateAmenitiesList() {
    var amenitiesList = checkedAmenities.join(', ');
    $('.amenities h4').text('Selected Amenities: ' + amenitiesList);
  }

  // Listen for changes on each input checkbox
  $('input[type="checkbox"]').on('change', function() {
    var checkbox = $(this);
    var amenityId = checkbox.data('id');

    // Check if the checkbox is checked
    if (checkbox.is(':checked')) {
      // Add the Amenity ID to the array if it's not already there
      if (checkedAmenities.indexOf(amenityId) === -1) {
        checkedAmenities.push(amenityId);
      }
    } else {
      // Remove the Amenity ID from the array if it's already there
      var index = checkedAmenities.indexOf(amenityId);
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
      }
    }

    // Update the <h4> tag with the list of checked amenities
    updateAmenitiesList();
  });
});
  