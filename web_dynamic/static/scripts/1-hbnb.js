$(document).ready(function () {
  $('.amenities UL LI INPUT').css('margin-right', '10px');
  const aList = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      aList.push($(this).parent().text());
    } else if ($(this).is(':not(:checked)')) {
      aList.pop($(this).parent().text());
    }
    console.log(aList);
    $('.amenities h4').text(aList.join(', '));
  });
});
