$(document).ready(() => {
  const checklist = {}
  $('INPUT:checkbox').change(function() {
    if ($(this).is(':checked')) {
      let key = $(this).attr('data-id')
      let value = $(this).attr('data-name')
      checklist[key] = value
    }
    if (!$(this).is(':checked')) {
      delete checklist[$(this).attr('data-id')]
    }
  })
})
