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
		$.get(
			'http://localhost:5001/api/v1/status/',
			function(data, textStatus) {
				if (data.status === 'OK') {
					$('div #api_status').addClass('available');
				}
				else {
					$('div #api_status').removeClass('available');
				}
			}
		);
	}
);
