$(function () {
    const amenityDict = {};

    $(input[type="checkbox"]).change(function () {
        if (this.checked) {
            amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
        }
        else {
            delete amenityDict[$(this).attr('data-id')];
        }
        let amenityList = Object.values(amenityDict);
        if (amenityList.length > 0) {
            $('div.amenities  h4').text(Object.values(amenityDict).join(', '));
        }
        else {
            $('div.amenities  h4').html('&nbsp;');
        }
    });
})