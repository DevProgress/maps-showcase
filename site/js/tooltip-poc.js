$(function(){ 
	
	$('svg g').each(function() {
  		var title = $(this).attr("data-attr");
  		
  		$(this).tooltip({title: "title"});
  		//alert(title);
	
	});


});