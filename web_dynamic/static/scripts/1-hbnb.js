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
    console.log(enabled);
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
