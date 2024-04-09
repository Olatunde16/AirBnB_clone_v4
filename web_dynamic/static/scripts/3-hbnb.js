// Simple JS Script to change state of checkboxes.

$(document).ready(function(){
  let amenitiesChecked = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
    // Join the names of the checked amenities and update the h4 tag
    $('.amenities h4').text(Object.values(amenitiesChecked).join(', '));
  });

//Get API Status
$.get('http://localhost:5001/api/v1/status/', (response) => {
  if (response.status === "OK") {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
}).fail(() => {
  $('div#api_status').removeClass('available');
});

// Request for places search
// Kind of low key want to change this to localhost rather than 0.0.0.0 ???
$(function (){
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    success: function(result){
      for (const data of result) {
        $('#places_please_be_right').text(data)
        // console.log(data)
      }
    }
  })
})

});

