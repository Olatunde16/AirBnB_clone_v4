$(document).ready(function () {
    let listAmenities = []
    $('input').change(function() {
        const amenityName = $(this).attr("data-name");

        if (this.checked) {
            listAmenities.push(amenityName);
        }
        else {
            listAmenities = listAmenities.filter((item) => item !== amenityName);
        }
        $('div.amenities h4').text(listAmenities.join(', '));
    });
  });