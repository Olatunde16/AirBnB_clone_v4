// Script that is executed only when DOM is loaded with jQuery

$('document').ready(function () {
    const amenityIds = {};
    $('input[type=checkbox]').change(function () {
        if ($(this).prop('checked')) {
            amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
        } else if (!$(this).prop('checked')) {
            delete amenityIds[$(this).attr('data-id')];
        }
        if (Object.keys(amenityIds).length === 0) {
            $('div.amenities h4').html('&nbsp');
        } else {
            $('div.amenities h4').text(Object.values(amenityIds).join(', '));
        }
    });

    const apiStatus = $('DIV#api_status');
    $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
        if (data.status === 'OK') {
        apiStatus.addClass('available');
        } else {
        apiStatus.removeClass('available');
        }
    });
});
