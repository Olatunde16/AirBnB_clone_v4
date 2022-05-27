/*
JavaScript script
*/
let amenitiesChecked = []
document.addEventListener('DOMContentLoaded', (event) => {
    window.$('input:checkbox').change(function() {
        cbName = $(this).attr("data-name")
        if(window.$(this).is(':checked')) {
            amenitiesChecked.push(cbName)
        } else {
            delete amenitiesChecked.pop(cbName)
        }
        $('.amenities h4').html(amenitiesChecked.join(", "));
    });

    $.get("http://0.0.0.0:5001/api/v1/status/", function(data, testStatus) {
        if (data['status'] === "OK") {
            $('div#api_status').addClass('available')
        } else {
            $('div#api_status').remove('available')
        }
    });

    $.post("http://0.0.0.0:5001/api/v1/places_search/", {
        "Content-Type": "application/json"
    }, function(result) {
        alert(result)
    });
});
