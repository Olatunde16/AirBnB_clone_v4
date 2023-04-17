$(document).ready(function () {
  const dict = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      dict[$(this).data('id')] = $(this).data('name');
    } else {
      delete dict[$(this).data('id')];
    }
    const amenList = [];
    for (const key in dict) {
      amenList.push(dict[key]);
    }
    $('.amenities h4').text(amenList.join(', '));
  });
});
