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
  });