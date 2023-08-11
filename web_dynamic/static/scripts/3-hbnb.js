$(document).ready(function () {
    const request = require('request');
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    request.get(url, (err, response, body) => {
        if (err) {
        console.log(err);
        }
    
        if (response.statusCode === 200) {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    let listAmenities = []
    $('input').change(function() {
        const amenityName = $(this).attr("data-name");

        if (this.checked) {
            listAmenities.push(amenityName);
        }
        else {
            listOfCheckedAmenities = listOfCheckedAmenities.filter((item) => item !== amenityName);
        }
        $('div.amenities h4').text(listOfCheckedAmenities.join(', '));
    });
  });