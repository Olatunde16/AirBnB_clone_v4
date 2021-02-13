
$(document).ready( () => {
    let names = {};
    $.get('http://0.0.0.0:5001/api/v1/status/', (data,status) => {
	if(data.status === 'OK') {
	    $('#api_status').addClass("available");
	}
    });

    $('input').change(function() {
	let string = '';
	let amenh4 = $("body > div > section.filters > div.amenities > h4");
	if ($(this).is(':checked')) {
          names[$(this).data('id')] = $(this).data('name');
	} else if (!$(this).is(':checked')) {
          delete names[$(this).data('id')];
	}
	for ( let key in names) {
          string += names[key] + ", ";
	}
	if (string === '') {
          amenh4.html('&nbsp;');
	} else {
          amenh4.text(string);
	}
    })
});
