$( document ).ready(() => {
    let x = [];
    let amen = [];
    $("input[type='checkbox']").change(function(){
	if(this.checked){
	    x.push($(this).attr("data-id"));
	    amen.push($(this).attr("data-name"));
	    $(".amenities h4").text(amen);
	}
	else {
	    let index = x.indexOf($(this).attr("data-id"));
	    x.splice(index, 1);
	    amen.splice(index, 1);
	    if (amen.length > 0) {
		$(".amenities h4").text(amen);
	    } else {
		$(".amenities h4").html('&nbsp;');  
	    }
	}
    });
});