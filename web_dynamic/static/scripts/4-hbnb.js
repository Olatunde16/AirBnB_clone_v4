$(document).ready(function () {
    const listAmenities = []
    const listNameAmenities = []
    const amenitiesText = $('.amenities h4')
  
    $('.amenities input').change(function () {
      if ($(this).is(':checked')) {
        listAmenities.push($(this).parent().data('id'))
        listNameAmenities.push($(this).parent().data('name'))
        amenitiesText.text(listNameAmenities.join(', '))
      } else {
        const indexId = listAmenities.indexOf($(this).parent().data('id'))
        listAmenities.splice(indexId, 1)
        const indexName = listNameAmenities.indexOf($(this).parent().data('name'))
        listNameAmenities.splice(indexName, 1)
        amenitiesText.text(listNameAmenities.join(', '))
      }
    })
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
      if (data.status) {
        $('#api_status').addClass('available')
      } else {
        $('#api_status').removeClass('available')
      }
    })

    fetchPlaces()

    $("button").click(function(){
        fetchPlaces(listAmenities)
    })
  })
  
  function fetchPlaces(array = []){
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5001/api/v1/places_search/',
        data: JSON.stringify({"amenities" : array}),
        contentType: 'application/json',
        success: function (data) {
          $('section.places').empty()
          data.sort((a, b) => a.name.localeCompare(b.name))
          for (const place of data) {
            const article = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night} $</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">
                                ${place.max_guest} Guest
                            </div>
                            <div class="number_rooms">
                                ${place.number_rooms} Bedroom
                            </div>
                            <div class="number_bathrooms">
                                ${place.number_bathrooms} Bathroom
                            </div>
                        </div>
                        <div class="description">${place.description}</div>
                </article>`
            $('section.places').append(article)
          }
        },
      })
  }
