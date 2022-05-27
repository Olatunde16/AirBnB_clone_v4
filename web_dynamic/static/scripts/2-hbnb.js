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
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data){
        if (data.status){
            console.log(data.status)
            $("#api_status").addClass("available")
        } else {
            $("#api_status").removeClass("available")
        }
    })
  })
  