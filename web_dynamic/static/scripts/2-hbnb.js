$(document).ready(function() {
		// Make an API request to check the status
		$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
		if (data.status === "OK") {
		// If the status is "OK," add the class "available"
		$('#api_status').addClass('available');
		} else {
		// Otherwise, remove the class "available"
		$('#api_status').removeClass('available')
		}
	});
});

