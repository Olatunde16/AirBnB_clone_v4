$(document).ready(function () {
    let checkedAmenities = {};
    $("input[type=checkbox]").change(function () {
        if (this.checked) {
            checkedAmenities[$(this).data("id")] = $(this).data("name");
        } else {
            delete checkedAmenities[$(this).data("id")];
        }
        const amenities = Object.values(checkedAmenities);
        $("div.amenities > h4").text(amenities.join(", "));
    });
});
const url = 'http://0.0.0.0:5001/api/v1/status/'

$.get(url, function(response){
    if (response.status == 'OK') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available')
    }
})

$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
        for (let i = 0; i < data.length; i++) {
            let place = data[i];
            $('.places ').append(
                <article>
                    <div class="title_box">
                        <h2>{ place.name }</h2>
                        <div class="price_by_night">
                            ${ place.price_by_night }
                        </div>
                    </div>
                    <div class="information">
                        <div class="max_guest">
                            {{ place.max_guest }} Guest{% if place.max_guest !=
                            1 %}s{% endif %}
                        </div>
                        <div class="number_rooms">
                            { place.number_rooms } Bedroom{% if
                            place.number_rooms != 1 %}s{% endif %}
                        </div>
                        <div class="number_bathrooms">
                            { place.number_bathrooms } Bathroom{% if
                            place.number_bathrooms != 1 %}s{% endif %}
                        </div>
                    </div>
                    <div class="user">
                        <b>Owner:</b> { place.user.first_name } {
                        place.user.last_name }
                    </div>
                    <div class="description">
                        {place.description | safe }
                    </div>
                </article>
            )
        }
    }
})