$(document).ready(function () {
let dict = {}
$().change(
        function(){
                if ($(this).is(':checked')) {
                dict.push[$(this).data('id')] = $(this).data('name');
                }
                else
                {
                delete dict[$(this).data('id')];
                }
		$('div.amenities > h4').text(Object.values(dict).join(', '));
        }
) 
}
