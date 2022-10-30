$( document ).ready(() => {
    let x = [];
    let amen = [];
      $.getJSON("http://0.0.0.0:5001/api/v1/status/", function(data) {
      if(data["status"] == "OK") {
          $('#api_status').addClass('available');
      } else {
          if($('DIV#api_status available')) {
          $('DIV#api_status').removeClass('available');
          }
      }
      });
  
      $("input[type='checkbox']").change(function(){
      if(this.checked){
          x.push($(this).attr("data-id"));
          amen.push($(this).attr("data-name"));
          $(".amenities h4").text(amen);
      }
      else {
          let index = x.indexOf($(this).attr("data-id"));
          x.splice(index, 1);
          amen.splice(index, 1);
          if (amen.length > 0) {
          $(".amenities h4").text(amen);
          } else {
          $(".amenities h4").html('&nbsp;');  
          }
      }
      });
  
      $('button').click(() => {
          console.log(x);
          $('article').remove();
          let request = $.ajax({
          url: "http://0.0.0.0:5001/api/v1/places_search/",
          method: "POST",
          data: JSON.stringify({"amenities": x}),
          contentType: "application/json",
          dataType: "json"
      }).done((data) => {
          console.log(data);
          data.forEach(data => {
          $('section.places').append('<article> <div class="title"><h2>'+ data.name +'</h2><div class="price_by_night">' + data.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i></br>'+ data.max_guest +' Guests </div> <div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />'+ data.number_rooms + 'Bedrooms </div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data.number_bathrooms +' Bathroom </div></div><div class="user"><strong>Owner: ' + '</strong></div><div class="description">'+ data.description +'</div></article>');
          });
      });
      });
  
      let request = $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      method: "POST",
      data: JSON.stringify({}),
      contentType: "application/json",
      dataType: "json"
      })
      .done(function (data) {
          data.forEach(data => {
          $('section.places').append('<article> <div class="title"><h2>'+ data.name +'</h2><div class="price_by_night">' + data.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i></br>'+ data.max_guest +' Guests </div> <div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />'+ data.number_rooms + 'Bedrooms </div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data.number_bathrooms +' Bathroom </div></div><div class="user"></div><div class="description">'+ data.description +'</div></article>');
          });
      });
  });