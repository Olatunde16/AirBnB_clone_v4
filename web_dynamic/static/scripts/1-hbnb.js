$(document).ready(function () {
    let checkboxes = $("input[type=checkbox][data-name]")
    let enabled = [];
    let names = [];

    checkboxes.change(function() {
	enabled = checkboxes
	    .filter(":checked")
	    .map(function() {
		return this.dataset.id
	    })
	    .get()
	names = checkboxes
            .filter(":checked")
            .map(function() {
		    return this.nextSibling.wholeText
            })
            .get()
	console.log(enabled);
	text = ""
	for (name in names) {
	    text += names[name]
	    if (name < names.length - 1) {
		text += ', '
	    }
	}
	$('.amenities h4').html(text)
    });
});
