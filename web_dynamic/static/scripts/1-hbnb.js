$(document).ready(() => {
  const checkedAmenities = {};
  const checkboxes = $('input#amenity_checkbox');
  $.each(checkboxes, (index, checkbox) => {
    $(checkbox).on('change', () => {
      if ($(checkbox).is(':checked')) {
        checkedAmenities[$(checkbox).data('name')] = $(checkbox).data('id');
      } else {
        delete checkedAmenities[$(checkbox).data('name')];
      }
      console.log(checkedAmenities);
    });
  });
});
