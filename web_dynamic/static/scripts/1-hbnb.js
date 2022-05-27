#!/usr/bin/node
/*
JavaScript script
*/
const amenitiesChecked = [];
document.addEventListener('DOMContentLoaded', (event) => {
  window.$('input:checkbox').change(function () {
    const cbName = $(this).attr('data-name');
    if (window.$(this).is(':checked')) {
      amenitiesChecked.push(cbName);
    } else {
      delete amenitiesChecked.pop(cbName);
    }
    if (amenitiesChecked.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').html(amenitiesChecked.join(', '));
    }
  });
});
