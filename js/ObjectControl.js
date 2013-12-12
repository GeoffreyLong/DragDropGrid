$(document).ready(function(){
	
	var ctrlControl = {
			start : function(){
				var isForm = false;
				
				var catFormOpen = (function(e){
					$("#catForm").fadeIn();
					$("#catName").focus();
				});
				var catFormClose = (function(){
					$("#catForm").fadeOut(400).delay(400).queue(function(n) {
						$("#catName").val("");
						//I don't know what this does...
					    n();
					});
				});
					
				$(document).keydown(function(e){
					console.log(e.which);
					  if (e.ctrlKey) {
						  $("#catName").focus();
						  if(e.keyCode == 86){
							  $(":focus").each(function() {
								    if (this.id == "catName"){
								    	ctrlControl.newLink($("#catName").val());
								    	isForm = false;
								    }
							  });
						  }
						  if (e.keyCode == 16) {
							  catFormOpen();
							  isForm = true;
						  }
					  }
					  if (e.keyCode == 13 && isForm){
						  $(":focus").each(function() {
							    if (this.id == "catName"){
							    	ctrlControl.newLink($("#catName").val());
							    	isForm = false;
							    }
						  });
					  }
				});
			},
			
			
			
			newLink: function(name){
				$("#catForm").fadeOut().delay(400).queue(function(n) {
					$("#catName").val("");
				    n();
				});
				$('#mouseFollow').empty();
				$('#mouseFollow').css({
					opacity: 1,
					background: "rgba(255,255,255,0.5)",
				});
				var nameParts = name.split('.');
				var faviconUrl = '/img/defaultFavicon.png';
				if (nameParts.length >= 2){
					faviconUrl = name.replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';	
				}
//NOTER:: NEED CASE WHERE NO FAVICO.ICO
				var favicon = $('<img src="' + faviconUrl + '" alt="" id="favicon"/>');
				$('#mouseFollow').append(favicon);
				$('#mouseFollow').attr("data-name", name);
			},
	};
	$(document).on("keydown", ctrlControl.start());
	//$(document).off("keydown", ctrlControl.start());

});


//NOTER:: may want to bind and unbind, this might waste processors	
$(document).bind('mousemove', function(e){
	$('#mouseFollow').css({
	       left:  e.pageX + 11,
	       top:   e.pageY + 11
	    });
});

//Fix for the scrolling when the div is dragged off the edge
//NOTER:: fix the jerkiness of it
$(document).on('scroll', function() {
	  $(document).scrollLeft(0);
	  $(document).scrollTop(0);
});