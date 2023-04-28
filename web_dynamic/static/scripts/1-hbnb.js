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
