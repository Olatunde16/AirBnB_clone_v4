$(document).ready(function() { 
  let amenitiesId = [];
  let amenitiesName = [];
  console.log(amenitiesName );
  $("#amenitiesBox").click(function() { 
    if ($(this).prop("checked")) {
      amenitiesId.push($("#amenitiesBox").data('id'));
      amenitiesName.push($(this).parents('li').html());
      console.log(amenitiesId);
      console.log(amenitiesName);
    } else {
      amenitiesId.pop($("#amenitiesBox").data('id'));
      amenitiesName.pop($(this).parents('li').html());
    }
  });
  console.log(amenitiesName);
});
