$(function() {
    $('ul li input[type="checkbox"]').css("margin-right", '10px');
    const myList = [];

    $('ul li input[type="checkbox"]').change(pushList);

    function pushList() {
        const data_id = $(this).data('id');
        const data_name = $(this).data('name');
        
        // Check if the checkbox is checked
        if ($(this).prop('checked')) {
            let exists = false;

            for (let [index, item] of myList.entries()) {
                if (item[data_name] === data_id) {
                    exists = true;
                    myList.splice(index, 1); // Remove existing entry
                    break;
                }
            }

            if (!exists) {
                const newItem = {};
                newItem[data_name] = data_id;
                myList.push(newItem);
            }
        } else {
            for (let [index, item] of myList.entries()) {
                if (item[data_name] === data_id) {
                    myList.splice(index, 1); // Remove unchecked entry
                    break;
                }
            }
        }

        updateResultDiv();
    }

    function updateResultDiv() {
        let resultHtml = '';
        for (let item of myList) {
            for (let key in item) {
                resultHtml += key+', ';
            }
        }
        $('.amenities h4').html(resultHtml);
    }
});
