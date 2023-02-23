let amen = [];
$(document).ready(function () {
  $('INPUT[type=checkbox]').click(function () {
    if (this.checked) {
      amen.push($(this).data('name'));
    } else {
      amen.splice(amen.indexOf($(this).data('name')), 1);
    }
    $('.amenities h4').text(amen.join(', '));
  });
});

$('button').click(function () {
//  let url = 'http://0.0.0.0:5001/api/v1/places_search/';

  $.ajax({
    'type': 'POST',
    'url': 'http://0.0.0.0:5001/api/v1/places_search/',
    'Content-Type': 'application/json',
    'dataType': 'json',
    'data': {}})
    .done(function (places) {
      places.forEach(function (place) {
        let article = `<article>
                 <h2>${place.name}</h2>
                 <div class="price_by_night">
                   <p>$${place.price_by_night}</p>
                 </div>
                 <div class="information">
                   <div class="max_guest">
                     <div class="guest_image"></div>
                     <p>${place.max_guest}</p>
                   </div>
                   <div class="number_rooms">
                     <div class="bed_image"></div>
                     <p>${place.number_rooms}</p>
                   <div class="number_bathrooms">
                     <div class="bath_image"></div>
                     <p>${place.number_bathrooms}</p>
                   </div>
                 </div>
               </div>
                 <div class="description">
                   <p>${place.description}</p>
             </div>
             </article>`;
        $('SECTION.places').append(article);
      });
    });
});
