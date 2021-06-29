$(document).ready(function () {
    const amdict = {};

    // Attach a change event handler to the checkboxes.
    $("input").click(function() {
	$(":input").each(function() {
            if (this.checked===true) {
		amdict[$(this).data('name')] = $(this).data('id');
            } else {
		delete amdict[$(this).data('name')];
	    }
	});
	const arr = [];
	for (const key in amdict) {
	    arr.push(key);
	}
	$(".amenities h4").html(arr.join(', '));
    });
});
