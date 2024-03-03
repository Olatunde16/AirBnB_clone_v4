// script that executes when the DOM is ready
// and adds event listeners on each input checkbox


$(document).ready(function () {
    let amenity_dict = {}
    let id_var = $('input:checkbox').attr('data_id');
    $("input:checkbox").change(function () {
        if ($(this).is(':checked')) {
            amenity_dict[id_var] = true;
        } else {
            delete amenity_dict[id_var];
        }
    });
    $('DIV.amenities h4').empty();
    for (let el of amenity_dict) {
        $(this).append('<li>' + el + '</li>');
    }
});
