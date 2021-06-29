// script for checkboxes and API listening
$(document).ready(function () {
  let tmp_dic = {};
  $('input').click(function () {
    $(':input').each(function () {
      if (this.checked === true) {
        tmp_dic[$(this).data('name')] = $(this).data('id');
      } else {
        delete tmp_dic[$(this).data('name')];
      }
    });
    let amen_lst = [];
    for (const k in tmp_dic) {
      amen_lst.push(k);
    }
  $('DIV.amenities h4').html(amen_lst.join(', '));
  });
    $.get('http://810428cc5457.b594c0bb.hbtn-cod.io:5001/api/v1/status/', function (data) {
	if (data.status === 'OK') {
	    $('DIV#api_status').addClass('available');
	} else {
	    $('DIV#api_status').removeClass('available');
	}
    });
});
