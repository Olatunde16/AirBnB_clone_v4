console.log('1-hbnb.js loaded');
const $ = window.$;
$(document).ready(function () {
    const amenities = {};
    $('input[type=checkbox]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        if (Object.values(amenities).length > 0) {
            $('div.amenities h4').text(Object.values(amenities).join(', '));
        } else {
            $('div.amenities h4').html('&nbsp;');
        }
    });
});