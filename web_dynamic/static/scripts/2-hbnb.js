let selected = {};
let listofAm = {};

$(document).ready(function () {
    // We want a statement that declares if the box gets checked
    // THEN, store the amenity ID in variable named checked
    // Else, delete data in checked
    // Will need to use $(this) a lot
    $('input:checkbox').change(function () {
        if ($(this).is(':selected')) {
            selected[$(this).data('id') = $(this).data('name');
        } else {
            delete selected[$(this).data('id')];
        }
        $('DIV.amenities h4').html(function () {
            selected.pop($(this).attr('data-name'));
            listofAm.pop($(this).attr('data-id'));
        }
});

$(document).ready(function () {
    $.get('http://92f02c22596f.4fd667c2.hbtn-cod.io:5001', function (data) {
	if (data.status === 'OK') {
	    $('DIV#api_status').addClass('available');
	} else {
	    $('DIV#api_status').removeClass('available');
	}
});
