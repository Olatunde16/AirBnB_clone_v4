// script to deal with checkboxes on amentiy list
$(document).ready(function () {
  let tmp_dic = {};
  $('input').click(function () {
    $(':input').each(function () {
      if (this.checked === true) {
        tmp_dic[$(this).data('name')] = $(this).data('id');
      } else {
        delete tmp_dic[$(this).data('name')];
      }
    });
    let amen_lst = [];
    for (const k in tmp_dic) {
      amen_lst.push(k);
    }
  $('DIV.amenities h4').html(amen_lst.join(', '));
  });
});

