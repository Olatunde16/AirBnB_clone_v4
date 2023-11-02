$(document).ready(function() {
    let amenitiesChecked = {};
     $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenitiesChecked[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenitiesChecked[$(this).data('id')];
        }
        let amenitiesList = Object.values(amenitiesChecked).join(', ');
        $('div.amenities h4').text(amenitiesList);
     })
})