$(document).ready(function() {
  const amenities = [];
  const amenitiesName = [];
  $('li :checkbox').change(function() {
    if (this.checked) {
      amenities.push($(this).attr('data-id'));
      amenitiesName.push($(this).attr('data-name'));
    } else {
      amenities.splice($.inArray($(this).attr('data-id'), amenities), 1);
      amenitiesName.splice($.inArray($(this).attr('data-name'), amenitiesName), 1);
    }
    $('.amenities h4').html(amenitiesName.join(', '));
  });
});
