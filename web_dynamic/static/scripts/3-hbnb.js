$(document).ready(function () {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    type: "GET",
    success: function(response) {
      if (response.status === "OK") {
        $("#api_status").addClass("availbale");
      } else {
        $("#api_status").removeClass("available");
      }
    },
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({})
    success: function (data) {
      for (const place of data) {
        const template = `<article>
            <div class="title">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
                <div class="max_guest">
                    <span>Guests: ${place.max_guest}</span>
                </div>
                <div class="number_rooms">
                    <span>Bedrooms: ${place.number_rooms}</span>
                </div>
                <div class="number_bathrooms">
                    <span>Bathrooms: ${place.number_bathrooms}</span>
                </div>
            </div>
            <div class="description">${place.description}</div>
        </article>`;
        $('section.places').append(template);
      }
    }
  });

  const checked_amenities = {};
    $("li input[type=checkbox]").change(function () {
      if (this.checked) {
        checked_amenities[this.dataset.name] = this.dataset.id;
      } else {
        delete checked_amenities[this.dataset.name];
      }
      $(".amenities h4").text(Object.keys(checked_amenities).sort().join(", "));
  });
}); 