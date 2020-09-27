#!/usr/bin/node
$(document).ready(function () {
  const dict = {};
  /*
if the checkbox is checked, store Amenity ID in dict
if the checkbox is unchecked, remove Amenity ID from dict
*/
  $('INPUT:checkbox').change(function () {
    const k = $(this).attr('data-id');
    const v = $(this).attr('data-name');
    if ((this).checked) {
      if (!dict[k]) {
        dict[k] = v;
      }
    } else if (!(this).checked) {
      delete dict[k];
    }
    // update the H4 tag with the list of Amenities checked
    $('.amenities h4').empty();
    const vals = Object.values(dict);
    const length = vals.length;
    vals.forEach((val, index) => {
      $('.amenities h4').append(val);
      console.log(dict);
      if (index < length - 1) {
        $('.amenities h4').append(', ');
      }
    });
    if (length === 0) {
      console.log('dict is empty');
      $('.amenities h4').append('&nbsp;');
    }
  });
  // Gets status of API
  $.getJSON('http://192.168.33.10:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      // Display red circle
      $('#api_status').addClass('available');
    } else {
      // Display gray circle
      $('#api_status').removeClass('available');
    }
  });
  // Setup dict for POST request to load places into <articles>
  const ajaxDict = {
    method: 'POST',
    url: 'http://192.168.33.10:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      const title = "<article><div class='title_box'><h2></h2><div class='price_by_night'></div></div>";
      const info = "<div class='information'><div class='max_guest'></div><div class='number_rooms'></div>";
      const baths = "<div class='number_bathrooms'></div></div><div class='description'></div></article>";
      const article = title + info + baths;
      response.forEach((val, index) => {
        $('section.places').append(article);
        $('.title_box h2').last().html(val.name);
        $('.price_by_night').last().html('$' + val.price_by_night);
        $('.max_guest').last().html(val.max_guest);
        $('.number_rooms').last().html(val.number_rooms);
        $('.number_bathrooms').last().html(val.number_bathrooms);
        $('.description').last().html(val.description);
      });
    }
  };
  // Pass dict to ajaxSetup and call ajax
  $.ajaxSetup(ajaxDict);
  $.ajax();
  // Filters places by amenities when search button clicked
  $('button').click(function () {
    // Create k/v pair to pass as data to ajax dict, v is a list of amenity ids
    const newDict = { amenities: Object.keys(dict) };
    ajaxDict.data = JSON.stringify(newDict);
    $.ajaxSetup(ajaxDict);
    $('section.places').empty();
    $.ajax();
  });
});
