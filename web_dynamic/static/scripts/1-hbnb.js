function DocumentReady() {
  const amenityList = [];
  $('li input:checkbox').change(function () {
      const amenityObj = { id: $(this).data('id'), name: $(this).data('name') };
      if (this.checked) {
          amenityList.push(amenityObj);
      } else {
          amenityList = amenityList.filter(item => item.id !== amenityObj.id);
      }
      updateSelectedAmenities(amenityList);
  });
}

function updateSelectedAmenities(amenityList) {
  const selectedAmenitiesList = amenityList.map(item => item.name).join(', ');
  $('#selected-amenities').text(selectedAmenitiesList);
}

$(document).ready(DocumentReady);
