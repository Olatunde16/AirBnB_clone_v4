function DocumentReady () {
  const amenityList = [];
  $('li input:checkbox').change(function () {
    const amenityObj = {id: this.attribute('data-id'), name: this.attribute('data-name')};
    if (this.checked) {
      amenityList.push(amenityObj);
    } else {
      amenityList.pop(amenityObj)
    }
  });
}

$(document).ready(DocumentReady);
