$(document).ready(() => {
  const newDict = {};
  $('input').click(() => {
    $(':input').each(() => {
      if (this.checked === true) {
        newDict[$(this).data('name')] = $(this).data('id');
      } else {
        delete newDict[$(this).data('name')];
      }
    });
    const newList = [];
    for (const key in newDict) {
      newList.push(key);
    }
    $('.amenities h4').html(list.join(', '));
  });
});
