#!/usr/bin/node


$(document).ready(function(){
  let amenities = {};
  $('.amenities li input').click(function (){
    let res;
    if (this.checked === true) {
      amenities[$(this).attr("data-name")] = $(this).attr("data-id");
      res = Object.keys(amenities);
      $('.amenities h4').text(res.join(', '));
    } else {
      delete amenities[$(this).attr("data-name")];
      res = Object.keys(amenities);
      $('.amenities h4').text(res.join(', '));
    }
  });
  $(function() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function(data) {
        for (const place of data.results) {
          $('.places').append(
            '<article>' +
            '<div class="title_box">' +
            '<h2>' + place.name + '</h2>' +
            '<div class="price_by_night">' + place.price_by_night + '</div>' +
            '</div>' +
            '<div class="information">' +
            '<h2>hello</h2>' +
            '</div>' +
            '</article>');
        }
      }
    });
  });
});
