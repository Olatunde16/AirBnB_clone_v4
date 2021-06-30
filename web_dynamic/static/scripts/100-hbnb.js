// Listen for checkbox clicks and store state
function placesSearch(searchParams = {}) {
    // `placesSearch` returns a Promise
    // Waits for something async to happen, then calls resolve/reject
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search",
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(searchParams),
            success: (data) => {
                const placesHtml = data.map(place => (`<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 && 's'}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 && 's'}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 && 's'}</div>
                    </div>
                    <div class="description">${place.description}</div>
                </article>`));
                resolve(placesHtml);
            }
        });
    });
}

$(document).ready(() => {
    // Create an object to hold checked amenities (only happens once per load)
    let checkedAmenities = {};
    let checkedStates = {};
    let checkedCities = {};
    // Function to be called when a checkbox is clicked
    function handleCheckAmenityClick(e) {
        // Here e will be the event that was fired when a checkbox was clicked
        // Note: `e` param name does not matter
        // We can access information on the checkbox element with e.target
        const clickedCheckbox = $(e.target);
        // e.target is a DOMElement object. can see by uncommenting next line:
        // console.log(e.target);
        // B/c we called e.target w/ $(), clickedCheckbox is a jQuery obj
        // console.log(clickedCheckbox);
        // Converting to jquery obj gives us shortcuts to stuff we need to do
        if (clickedCheckbox.is(':checked')) {
            // Amenity has been checked-- add to checkedAmenities
            // format: {[data-id1]: "data-name1", [data-id2]: "data-name2", ...}
            checkedAmenities[clickedCheckbox.attr('data-id')] = clickedCheckbox.attr('data-name');
        } else {
            // Amenity has been unchecked-- remove from checkedAmenities
            delete checkedAmenities[clickedCheckbox.attr('data-id')]
        }
        // Uncomment next line to log checkedAmenities on every checkbox click:
        // console.log(checkedAmenities);

        // Get new text to go in 'DIV.amenities h4'
        // Object.values equivalent to python `for val in somedict.values()`
        // Here it gives us the names of each amenity in checkedAmenities
        const amenitiesTxt = Object.values(checkedAmenities)
            // Sort the list of amenity names ASC
            .sort((a, b) => a > b)
            // Join the list of amenities into a string separated by ', '
            .join(', ');
        // Set text in 'DIV.amenities h4'
        $('DIV.amenities h4').text(amenitiesTxt);
    }
    function handleCheckStateClick(e) {
        // See comments for handleCheckAmenityClick-- basically the same thing
        const clickedCheckbox = $(e.target);
        console.log("State check clicked", clickedCheckbox.attr('data-name'));
        if (clickedCheckbox.is(':checked')) {
            checkedStates[clickedCheckbox.attr('data-id')] = clickedCheckbox.attr('data-name');
        } else {
            delete checkedStates[clickedCheckbox.attr('data-id')]
        }
        const statesText = Object.values(checkedStates)
            .sort((a, b) => a > b)
            .join(', ');
        $('DIV.states h4').text(statesText);
    }
    function handleCheckCityClick(e) {
        // See comments for handleCheckAmenityClick-- basically the same thing
        const clickedCheckbox = $(e.target);
        console.log("City check clicked", clickedCheckbox.attr('data-name'));
        if (clickedCheckbox.is(':checked')) {
            checkedCities[clickedCheckbox.attr('data-id')] = clickedCheckbox.attr('data-name');
        } else {
            delete checkedCities[clickedCheckbox.attr('data-id')]
        }
        const citiesText = Object.values(checkedCities)
            .sort((a, b) => a > b)
            .join(', ');
        $('DIV.cities h4').text(citiesText);
    }
    // Connect handleCheckAmenityClick to click events from all checkboxes
    // Logic in handleCheckAmenityClick takes care of the rest!
    $('DIV.amenities input[type="checkbox"]').click(handleCheckAmenityClick);
    $('input.state-chk').click(handleCheckStateClick);
    $('input.city-chk').click(handleCheckCityClick);
    // check status
    // Changed to use $.ajax
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/status",
        type: 'GET',
        crossDomain: true,
        success: (data) => {
            if (data['status'] && data['status'] == "OK") {
                $("div#api_status").addClass("available");
            } else {
                $("div#api_status").removeClass("available");
            }
        }
    });
    // Call places search and update DOM with results
    placesSearch().then((placesHtml) => $('section.places').html(placesHtml))
    // Search for checked amenities on button click
    $('button').click(() => {
        placesSearch({
            amenities: Object.keys(checkedAmenities),
            states: Object.keys(checkedStates),
            cities: Object.keys(checkedCities)
        }).then((placesHtml) => {
            $('section.places').html(placesHtml);
        });
    });
});