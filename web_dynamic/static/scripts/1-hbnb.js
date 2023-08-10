$(document).ready(function () {
    let listAmenities = []
    $('input').change(function() {
        const amenityName = $(this).attr("data-name");
        if (this.checked) {
            listAmenities.push(amenityName);
        } else {
            listOfCheckedAmenities = listOfCheckedAmenities.filter((item) => item !== amenityName);
        }
        $('div.amenities h4').text(listOfCheckedAmenities.join(', '));
    });
});
