$(function () {
  const AmenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      AmenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete AmenitiesChecked[$(this).data('id')];
    }
    const Objs = Object.values(AmenitiesChecked);
    console.log(Object.values(AmenitiesChecked));
    if (Objs) {
      $('.amenities > h4').text(Object.values(AmenitiesChecked).join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
  });
});
