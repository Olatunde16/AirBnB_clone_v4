$(document).ready(function () {
    let checkboxes = $("input[type=checkbox][data-name=':amenity_name']")
    let enabled = [];

    checkboxes.change(function() {
	enabled = checkboxes
	    .filter(":checked") // Filter out unchecked boxes
	    .map(function() { // Extract values using jQuery map
		return this.value;
	    }) 
	    .get() // Get array
	console.log(enabled);
    });
});
