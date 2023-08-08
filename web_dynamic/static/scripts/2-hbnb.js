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
    if (Object.values(amenIdNames).length < 3){
      h4Tagg.text(Object.values(amenIdNames).join(","));
    }
    else{
      // adding ellipsis(...)
      const amenText = Object.values(amenIdNames).slice(0, 2).join(",") + "...";
      h4Tagg.text(amenText);
    }
	});
});

$(function(){
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data)
    {
      if (data.status == 'OK'){
        $('div#api_status').addClass('available');
      }
      else{
        $('div#api_status').removeClass('available');
      }
    });
});
