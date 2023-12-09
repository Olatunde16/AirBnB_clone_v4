$('document').ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  })
  .catch(error => console.error('Error checking API status:', error));


  let amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities).length === 0) {
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    }
  });
});

function placesSearch () {}
fetch('http://0.0.0.0:5001/api/v1/places_search/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
})
  .then(response => response.json())
  .then(data => {
    const placesSection = document.querySelector('.places');
    data.forEach(place => {
      const article = document.createElement('article');
      article.innerHTML = `<h2>${place.name}</h2><p>${place.description}</p>`;
      placesSection.appendChild(article);
    })
    .catch(error => console.error('Error fetching places:', error))
  });

$(function () {
  $('button').click(function () {

  })
})
