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
const url = 'http://0.0.0.0:5001/api/v1/status/'

$.get(url, function(response){
    if (response.status == 'OK') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available')
    }
})