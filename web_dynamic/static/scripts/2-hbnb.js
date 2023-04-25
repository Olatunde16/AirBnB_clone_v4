$('document').ready(function () {
    let amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
      $('.amenities H4').text(Object.values(amenities).join(', '));
    });
    $.get("http://localhost:5001/api/v1/status", (data) => {
        if (data.status == 'OK') {
            $('div#api_status').addClass('available');
        }
    })

})