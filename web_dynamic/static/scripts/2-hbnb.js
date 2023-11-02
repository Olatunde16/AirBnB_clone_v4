$(document).ready(function() {
    let amenitiesChecked = {};
     $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenitiesChecked[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenitiesChecked[$(this).data('id')];
        }
        let amenitiesList = Object.values(amenitiesChecked).join(', ');
        $('div.amenities h4').text(amenitiesList);
     })
     $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        }
        else {
            $('#api_status').removeClass('available');
        }
     })
})