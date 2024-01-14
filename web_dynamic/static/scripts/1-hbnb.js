#!/usr/bin/node
$(function () {
  $('input[type=checkbox]').click(function () {
    const listNames = []
    const myId = []
    $('input[type=checkbox]:checked').each(function () {
      listNames.push($(this).attr('data-name'));
      myId.push($(this).attr('data-id'));
    });
    if (listNames.length === 0) {
      $('. amenities h4').html('&nbsp;');
    } else {
      $('. amenities h4').text(listNames.join(', '));
    }
    console.log(myId);
  });
});
