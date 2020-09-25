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
			$('.amenitites h4').append(dict[k]);
    } else {
			delete dict[k];
			$('.amenitites h4').remove(dict[k]);
    }
    console.log(dict);
    $('.amenitites h4').append(dict[k]);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data, textstatus) {
    if (textstatus === 'success') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
});

