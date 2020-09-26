#!/usr/bin/node
$(document).ready(() => {
//   let dictio = {};
  $('input[type=checkbox]').click(
    function () {
      if (this.checked) {
        window.alert('hello');
      } else {
        window.alert('false');
      }
    });
});


var checkbox = document.querySelector("input[name=checkbox]");

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        // Checkbox is checked..
    } else {
        // Checkbox is not checked..
    }
});