console.log('2-hbnb.js loaded');
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
    $.get('http://localhost:5001/api/v1/status/', function (data, status) {
        if (status === 'success') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });
});
