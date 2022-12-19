
const dict = {};

$(document).ready(function () {
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      dict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete dict[$(this).attr('data-id')];
    }
  });
});
