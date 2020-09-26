#!/usr/bin/node
$(document).ready(function () {
	const dict = {};
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
  $.getJSON('http://192.168.33.10:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
  });
	$.ajax({
		method: "POST",
		url: 'http://192.168.33.10:5001/api/v1/places_search/',
		data: JSON.stringify({}),
		dataType: 'json',
		contentType: 'application/json',
		success: function (response) {
			response.forEach((val, index) => {
			const foo = $('section.places').add('article').add('div').addClass('title_box').add('h2').html(val.name);
      $('section.places').after(foo);
      /*$('section.places article').add('div').addClass('title_box');
      $('div.title_box').add('h2');
      $('div.title_box h2').html(val.name);
      $('div.title_box').add('div').addClass('price_by_night');
      $('div.price_by_night').add(val.price_by_night);
      $('section.places').add('div').addClass('information');
      $('div.information').add('div').addClass('max_guest');
      $('div.max_guest').html(val.max_guest);
      $('div.information').add('div').addClass('number_rooms');
      $('div.number_rooms').add(val.number_rooms);
      $('div.information').add('div').addClass('number_bathrooms');
      $('div.number_bathrooms').html(val.number_bathrooms);
      $('section.places').add('div').addClass('description');
      $('div.description').html(val.description);*/
    });
		}
		});
/*  $.post('http://192.168.33.10:5001/api/v1/places_search/', function(data) {
		console.log("inside get");i*/
/*    data.forEach((val, index) => {
      $('section.places').add('article');
      $('section.places article').add('div').addClass('title_box');
      $('div.title_box').add('h2');
      $('div.title_box h2').add(val.name);
      $('div.title_box').add('div').addClass('price_by_night');
      $('div.price_by_night').add(val.price_by_night);
      $('section.places').add('div').addClass('information');
      $('div.information').add('div').addClass('max_guest');
      $('div.max_guest').add(val.max_guest);
      $('div.information').add('div').addClass('number_rooms');
      $('div.number_rooms').add(val.number_rooms);
      $('div.information').add('div').addClass('number_bathrooms');
      $('div.number_bathrooms').add(val.number_bathrooms);
      $('section.places').add('div').addClass('description');
      $('div.description').add(val.description);
    });*/
});
