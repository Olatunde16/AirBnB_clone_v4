$(document).ready(function () {
  let dict = {};
  $(document).on('change', ":checkbox", function () {
    if (this.checked) {
      dict[$(this).data('id')] = $(this).data('name');
    } else {
      delete dict[$(this).data('id')];
    }
    let lst = Object.values(dict);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(dict).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
