$(document).ready(function() {
    let amenities = {};

    $('.amenities input[type="checkbox"]').change(function() {
        if ($(this).is(':checked')) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }

        let amenitiesList = Object.values(amenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });
});
