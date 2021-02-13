const amenitiesDict = {}

$( document ).ready(function() {
    $('input').click(function() {
        if($(this).is(':checked')) {
            amenitiesDict[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenitiesDict[$(this).attr('data-id')];
        }
        $('.amenities h4').text(Object.values(amenitiesDict));
    });
});