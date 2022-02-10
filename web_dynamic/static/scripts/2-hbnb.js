const $ = window.jQuery;
const listAmenities = {};
window.onload = function () {
  select_amenities();
  api_availabe();
};

function select_amenities() {
    $('div.amenities input[type=checkbox]').change(function () {
        const id = $(this).attr('data-id');
        if ($(this).is(':checked')) {
          listAmenities[id] = $(this).attr('data-name');
        } else {
          delete listAmenities[id];
        }
        $('.amenities h4').text(Object.values(listAmenities).join(', '));
      });
    
}

async function api_availabe() {
  try{
  const data = await fetch("http://0.0.0.0:5001/api/v1/status/")
  if (!data.ok) {
    
  }
  
  } catch{console.log("No connection")}
};