$(document).ready(function () {
  let selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    let amenityId = $(this).data("id");
    let amenityName = $(this).data("name");

    if ($(this).is(":checked")) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    let amenitiesList = Object.values(selectedAmenities).join(", ");
    $(".amenities h4").text(amenitiesList);
  });
});
