$(document).ready(function () {
  const amenitiesNames = [];
  const amenitiesIds = [];

  $('input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        const dataID = ($(this).parent().parent().attr('data-id'));
        const name = ($(this).parents('li').attr('data-name'));
        amenitiesIds.push(dataID);
        amenitiesNames.push(name);
      } else {
        amenitiesIds.pop('data-id');
        amenitiesNames.pop('data-name');
      }
      if (amenitiesNames.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').text(amenitiesNames.join(', '));
      }
    });
});

$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') {
      $('.apistatus').addClass('available');
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        dataType: 'json',
        data: JSON.stringify({ amenities: {} }),
        complete: function (data) {
          const placesWithAms = data.responseJSON;
          for (const place of placesWithAms) {
            const html =
                            `<article> \
                                <div class="title_box"> \
                                    <h2> ${place.name} </h2> \
                                    <div class="price_by_night"> $${place.price_by_night} </div> \
                                </div> \
                                <div class="information"> \
                                    <div class="max_guest"> ${place.max_guest} Guest</div> \
                                    <div class="number_rooms"> ${place.number_rooms} Bedroom</div> \
                                    <div class="number_bathrooms"> ${place.number_bathrooms} Bathroom</div> \
                                </div> \
                                <div class="description"> \
                                    ${place.description} \
                                </div> \
                            </article>`;
            $('.places').append(jQuery.parseHTML(html));
          }
        }
      });
    } else {
      $('.apistatus').removeClass('available');
    }
  });
});
