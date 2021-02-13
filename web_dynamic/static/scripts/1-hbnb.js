$(document).ready( () => {
    let names = {};
    $('input').change(function() {
	let string = '';
	let amenh4 = $("body > div > section.filters > div.amenities > h4");
	if ($(this).is(':checked')) {
          names[$(this).data('id')] = $(this).data('name');
          console.log(names);
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
