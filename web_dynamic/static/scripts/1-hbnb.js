$(document).ready(function() {
  $('.amenities-checkboxes :checkbox').click(function() {
    var checkedAmenitiesNames = [];
    var checkedCheckboxes = $('.amenities-checkboxes :checkbox:checked');
    checkedCheckboxes.each(function() {
        var amenityName = $(this).attr('data-name');
        checkedAmenitiesNames.push(amenityName);
    });
    var resultString = checkedAmenitiesNames.join(', ');
    console.log(resultString);
    $('#amenity_list').text(resultString);
  });
});