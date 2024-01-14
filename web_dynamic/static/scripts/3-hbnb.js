#!/usr/bin/node
$(function () {
  $('input[type=checkbox]').click(function () {
    const listNames = []
    const myId = []
    $('input[type=checkbox]:checked').each(function () {
      listNames.push($(this).attr('data-name'));
      myId.push($(this).attr('data-id'));
    });
    if (listNames.length === 0) {
      $('. amenities h4').html('&nbsp;');
    } else {
      $('. amenities h4').text(listNames.join(', '));
    }
    console.log(myId);
  });
});
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  type: 'POST',
  dataType: 'json',
  data: '{}',
  contentType: 'application/json; charset=utf-8',
  success: function (places) {
    $('#api_status').addClass('available');
     for (let i = 0; i < places.length; i++) {
      $('.places').append(`<article>
<div class="title_box">
<h2> ${places[i].name}</h2>
<div class="price_by_night"> ${places[i].price_by_night} </div>
</div>
<div class="information">
<div class="max_guest">${places[i].max_guest}
${places[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
<div class="number_rooms">${places[i].number_rooms}
${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
<div class="number_bathrooms">${places[i].number_bathrooms}
${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
</div>
<div class="user">
</div>
<div class="description">
${places[i].description}
</div>
</article>
`);
    }
  },
  error: function (xhr, status) {
    console.log('error ' + status);
  }
});
