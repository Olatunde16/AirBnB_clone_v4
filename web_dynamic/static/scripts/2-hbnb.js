$(document).ready(function () {
  const checkboxes = $('input[type=checkbox][data-name]');
  let enabled = [];
  let names = [];

  checkboxes.change(function () {
    enabled = checkboxes
      .filter(':checked')
      .map(function () {
        return this.dataset.id;
      })
      .get();
    names = checkboxes
      .filter(':checked')
      .map(function () {
        return this.nextSibling.wholeText;
      })
      .get();
    let text = '';
    for (const nam in names) {
      text += names[nam];
      if (nam < names.length - 1) {
        text += ', ';
      }
    }
    $('.amenities h4').html(text);
  });
});

$(document).ready(function () {
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
