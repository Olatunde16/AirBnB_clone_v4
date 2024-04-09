$(document).ready(function () {
  const checkingAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkingAmenities[this.dataset.id] = this.dataset.name;
    } else {
      delete checkingAmenities[this.dataset.id];
    }

    const amenityNames = Object.values(checkingAmenities);
    $('div.amenities h4').text(amenityNames.join(', '));
  });
});
