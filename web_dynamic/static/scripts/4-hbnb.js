$(document).ready(function () {
  let checkedAmenities = {};
  $("input[type=checkbox]").change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data("id")] = $(this).data("name");
    } else {
      delete checkedAmenities[$(this).data("id")];
    }
    const amenities = Object.values(checkedAmenities);
    $("div.amenities > h4").text(amenities.join(", "));
  });
});
const url_status = "http://0.0.0.0:5001/api/v1/status/";

$.get(url_status, function (response) {
  if (response.status == "OK") {
    $("#api_status").addClass("available");
  } else {
    $("#api_status").removeClass("available");
  }
});

$("button").click(function () {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    dataType: "json",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ amenities: Object.values(checkedAmenities) }),
    success: function (response) {
      $(".places").append("<h1>Places</h1>");
      for (const place of response) {
        const article = [
          "<article>",
          '<div class="title_box">',
          `<h2>${place.name}</h2>`,
          `<div class="price_by_night">$${place.price_by_night}</div>`,
          "</div>",
          '<div class="information">',
          `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
          "</div>",
          '<div class="description">',
          `${place.description}`,
          "</div>",
          "</article>",
        ];
        $(".places").append(article);
      }
    },
  });
});
