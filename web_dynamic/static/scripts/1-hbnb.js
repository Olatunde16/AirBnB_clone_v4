$(document).ready(function() {
    $('#data-id').change(function() {
        if ($(this).is(':checked')) {
        let data_id = amenity.id;
        } else {
            data_id = "";
        }
    })
});