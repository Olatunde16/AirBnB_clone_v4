let amenities = [];

window.addEventListener('load', () => {
  $('div.amenities input:checkbox ').on('click', (event) => {
    const target = event.target;
    if (!target.checked) {
      amenities = amenities.filter(item => item.id !== target.dataset.id);
    } else {
      amenities.push({ id: target.dataset.id, name: target.dataset.name });
    }
    const nameList = [];
    amenities.forEach((val) => { nameList.push(val.name); });
    $('div.amenities h4').text(nameList.join(', '));
  });
});
