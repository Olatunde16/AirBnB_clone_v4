$(document).ready(function () {
  $('INPUT :checkbox').change(function() {
    const am_id = [];
    if (this).checked) {
        am_id.append($('INPUT :amenity_id'));
    } else {
      let index = am_id.indexOf($('INPUT :amenity_id'));
      if (index > -1) {
        am_id.splice(index, 1);
      }
    }
    $('h4').text(am_id + ', ');
   });
});
