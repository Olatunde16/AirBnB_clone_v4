$('document').ready(function () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      const objs = JSON.parse(data);

      for (let i = 0; i < objs.length; i++) {
        $('<article></article>').appendTo('section.places');
        const jsObj = objs[i];
        const nameP = jsObj.name;
        const priceByn = jsObj.price_by_night;
        const maxG = jsObj.max_guest;
        const numR = jsObj.number_rooms;
        const numB = jsObj.number_bathrooms;
        const descP = jsObj.description;
        $('section.places article').html(`<div><h2>${nameP}</h2><div>${priceByn}</div></div>`);
        $('section.places article').html(`<div><div>${maxG}</div><div>${numR}</div><div>${numB}</div></div>`);
        $('section.places article').html(`<div>${descP}</div>`);
      }
    }
  });
});
