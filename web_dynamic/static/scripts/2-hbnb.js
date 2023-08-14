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
    requestAPI('http://127.0.0.1:5001/api/v1/status/');
  });

function requestAPI (url) {
    $.get(url, (data) => {    
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });
}
