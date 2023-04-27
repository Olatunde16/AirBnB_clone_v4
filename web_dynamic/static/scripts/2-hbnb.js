$(document).ready(function () {
  // Add data-name attribute to each amenity list item
  $("ul.amenities li").each(function () {
    var amenityName = $(this).attr("data-amenity");
    $(this).attr("data-name", ":" + amenityName);
  });

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    var checkedAmenities = [];
    $('input[type="checkbox"]:checked').each(function () {
      checkedAmenities.push($(this).attr("data-id"));
    });
    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    $("div.amenities h4").text(checkedAmenities.join(", "));
  });
});

function apiStatus() {
  const API_URL = `http://${HOST}:5001/api/v1/status/`;
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === "success" && data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
}
