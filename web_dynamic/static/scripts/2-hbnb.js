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
      if (index < length - 1) {
        $('.amenities h4').append(', ');
      }
    });
    // Lines up text in h4 tag and shifts popover flush with filter element
    $('.filters h4').css({ 'margin-top': '4%', 'margin-left': '3.7%' });
    $('.filters h4').addClass('clicked');
    $('.amenities div.popover').css('margin-top', '14%');
    if (length === 0) {
      // Removes clicked class, resets .popover, adds whitespace back
      $('.filters h4').css({ 'margin-top': '0', 'margin-left': '15%' });
      $('.filters h4').removeClass('clicked');
      $('.amenities div.popover').css('margin-top', '0');
      $('.amenities h4').append('&nbsp;');
    }
  });
  $.getJSON('http://192.168.33.10:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
