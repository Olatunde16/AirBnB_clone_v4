$(document).ready(function() {
	let amenIdNames = {};
	// Listen for changes on each input checkbox tag
	$(".amenities input[type=checkbox]").change(function() {
		const amenityId = $(this).data("id");
		const amenityName = $(this).data("name");
		// If the checkbox is checked, store the Amenity ID in the dictionary
		if (this.checked) {
			amenIdNames[amenityId] = amenityName;
		} else {
			delete amenIdNames[amenityId];
		}
		 // Updates the h4 tag inside the div Amenities with the list of Amenities checked
		const h4Tagg = $(".amenities h4");
		const amenText = Object.values(amenIdNames).join(", ");
		h4Tagg.text(amenText)
	});
});
