const $ = window.jQuery;
const listAmenities = {};
window.onload = function () {
  selectAmenities();
  apiAvailabe();
};

function selectAmenities () {
  $('div.amenities input[type=checkbox]').change(function () {
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      listAmenities[id] = $(this).attr('data-name');
    } else {
      delete listAmenities[id];
    }
    $('.amenities h4').text(Object.values(listAmenities).join(', '));
  });
}

async function apiAvailabe () {
  $.get('http://172.24.191.151:5001/api/v1/status/', function (data, status) {
    console.log(data);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
}
