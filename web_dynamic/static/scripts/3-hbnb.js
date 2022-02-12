$(function () {
  const AmenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      AmenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete AmenitiesChecked[$(this).data('id')];
    }
    const Objs = Object.values(AmenitiesChecked);
    console.log(Object.values(AmenitiesChecked));
    if (Objs) {
      $('.amenities > h4').text(Object.values(AmenitiesChecked).join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
    console.log(AmenitiesChecked);
  });
  $.getJSON(`http://${window.location.hostname}:5001/api/v1/status`, (data) => {

    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  const users = {};
  $.getJSON(`http://${window.location.hostname}:5001/api/v1/users`, (data) => {
    for (const usr of data) {
      users[usr.id] = usr.first_name + ' ' + usr.last_name;
      console.log(users);
    }
  });
  $.ajax({
    type: 'POST',
    data: JSON.stringify({}),
    url: `http://${window.location.hostname}:5001/api/v1/places_search`,
    contentType: 'application/json',
    success: data => {
      console.log("I AM DATA");
      console.log(data);
      for (const place of data) {
        const template = `<article>
      <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">
    $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
          <div class="image_guest"></div>
    <br />
    ${place.max_guest} Guests
        </div>
          <div class="number_rooms">
          <div class="img_room"></div>
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br />
    ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
        <div class="img_bathrooms"></div>
    <br />
    ${place.number_bathrooms} Bathroom
        </div>
      </div>
    <!-- USER -->
    <div class="user">
    <p><b>Owner: </b>${users[place.user_id]}</p>
    </div>
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 PLACE Article -->`;
        $('.places').append(template);
      }
    }
  });

  // const GetPlaces = async () => {
  //   // makes a request to the api to get the places
  //   const url = `http://${window.location.hostname}:5001/api/v1/places_search`;
  //   const places = await $.ajax({
  //     type: 'post',
  //     url: url,
  //     data: '{}',
  //     datatype: 'json',
  //     contenttype: 'application/json'
  //   });
  //   return places;
  // };
  // const drawplaces = async () => {
  //   // print places in the html tag
  //   const places = await GetPlaces();
  //   let toprint = '';
  //   places.map((place, _) => {
  //     toprint += 
  //     `<article>
  //       <h2>${place.name}</h2>
  //       <div class = 'price_by_night'>
  //         <p>$${place.price_by_night}</p>
  //       </div>
  //       <div class='information'>
  //         <div class='max_guest'>
  //           <div class='guest_image'>
  //           </div>
  //           <p>${place.max_guest}</p>
  //         </div>
  //         <div class='number_rooms'>
  //           <div class='bed_image'></div>
  //           <p>${place.number_rooms}</p>
  //         </div>
  //         <div class='number_bathrooms'>
  //           <div class='bath_image'></div>
  //           <p>${place.number_bathrooms}</p>
  //         </div>
  //       </div>
  //       <div class='description'>
  //         <p>${place.description}</p>
  //       </div>
  //     </article>`
  //     ;
  //     return 1;
  //   });
  //   $('.places').html(toprint);
  // };
  // drawplaces();
});

