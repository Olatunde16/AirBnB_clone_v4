let amen = [];
$(document).ready(function () {
  $('INPUT[type=checkbox]').click(function () {
    if (this.checked) {
      amen.push($(this).data('name'));
    } else {
      amen.splice(amen.indexOf($(this).data('name')), 1);
    }
    console.log($(this).data('name'));
    $('.amenities h4').text(amen.join(', '));
  });
});
