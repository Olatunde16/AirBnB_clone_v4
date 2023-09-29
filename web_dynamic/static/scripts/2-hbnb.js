$(document).ready(function () {
    const nameAmenity = [];
  
    $('input:checkbox').click(function () {
      if ($(this).is(":checked")) {
        nameAmenity.push($(this).attr('data-name'));
      } else {
        const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
        nameAmenity.splice(nameIndex, 1);
      }
      $('.amenities h4').text(nameAmenity.join(', '));
    });
  
    // Function to update the API status
    function updateApiStatus() {
      // Send an HTTP GET request to the status API
      $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
          // If the status is "OK," add the "available" class to the div#api_status
          $('#api_status').addClass('available');
        } else {
          // Otherwise, remove the "available" class from the div#api_status
          $('#api_status').removeClass('available');
        }
      });
    }
  
    // Initial update of the API status
    updateApiStatus();
  });  
  