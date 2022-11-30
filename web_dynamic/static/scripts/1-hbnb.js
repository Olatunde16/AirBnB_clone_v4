let myList = []

$(document).ready(
	function() {
		$('input:checkbox').change(
			function(){
				if ($(this).is(':checked')) {
					myList.push($(this).attr('data-name'));
				}
				else {
					myList.pop($(this).attr('data-name'));
				}
				$('.selected-input')
					.text(myList.join(', '));
			}
		);
	}
);
