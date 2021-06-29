#!/usr/bin/node


$(document).ready(function(){
    let amenities = {};
    $('.amenities li input').click(function (){
        let res;
        if (this.checked === true) {
            //$('.amenities h4').text('anthony');
            //$('.amenities h4').html('hello');
            //amenities['key'] = "ant";
            //for (const [key, value] of Object.entries(amenities)) {
            //  res = res.concat(key);
              
            //};
            amenities[$(this).attr("data-name")] = $(this).attr("data-id");
            //amenities['key'] = 'ant';
            //amenities['two'] = 'blah';
            res = Object.keys(amenities);
            //amenities[this.data('name')] = this.data('id');
            $('.amenities h4').text(res.join(', '));
        } else {
            delete amenities[$(this).attr("data-name")];
            //let name = $(this).attr("data-name");
            //let id = $(this).attr("data-id");
            res = Object.keys(amenities);
            $('.amenities h4').text(res.join(', '));
        }
    })
});
