#!/usr/bin/node
$(document).ready(() => {

  var checkAmenities = {};

  $(':checkbox').click(function(){
    if($(this).prop("checked") == true){
      checkAmenities[$(this).data('id')] = $(this).data('name');
      $('.amenities h4').text(Object.values(checkAmenities).join(', '));
    }
    else if($(this).prop("checked") == false){
      delete checkAmenities[$(this).data('id')]
      $('.amenities h4').text(Object.values(checkAmenities).join(', '));
    }
});
});

