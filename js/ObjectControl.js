$(document).ready(function(){
	
	var ctrlControl = {
			start : function(){
				var isForm = false;
					
				$(document).keydown(function(e){
					  if (e.ctrlKey && !isForm) {
						  $("#catHidden").focus();
						  if(e.keyCode == 86){
							  $(":focus").each(function() {
								    if (this.id == "catHidden"){
								    	//Delay is to make sure that the ctrl-v is 
								    	//Caught, may want to think of a "better" 
								    	//Way to do this
								        setTimeout(function(){
									    	ctrlControl.newLink($("#catHidden").val());
								        }, 100);
								    }
							  });
						  }
						  if (e.keyCode == 16) {
							  ctrlControl.catFormOpen();
							  isForm = true;
							  
							  $("#catName").blur(function(){
									ctrlControl.catFormClose();
									isForm = false;
							  });
						  }
					  }
					  if (e.keyCode == 13 && isForm){
						  $(":focus").each(function() {
							    if (this.id == "catName"){
							    	ctrlControl.newCat($("#catName").val());
							    	isForm = false;
							    }
						  });
					  }
				});
			},
			
			catFormOpen : function(e){
				$("#catForm").fadeIn().delay(10).queue(function(n) {
					$("#catName").focus();
					n();
				});
			},
			
			catFormClose : function(){
				$("#catForm").fadeOut().delay(400).queue(function(n) {
					$("#catName").val("");
					n();
				});
			},
			
			newCat : function(name){
				ctrlControl.clearAll();

				var img = $('<img src="img/plusC.png" alt="" id="newCat"/>');
				$('#mouseFollow').append(img);
				$('#mouseFollow').attr("data-name", name);
			},
			
			newLink: function(name){
				ctrlControl.clearAll();
				
				var faviconUrl = name.replace(/^(http:\/\/[^\/]+).*$/, '$1') + '/favicon.ico';	
				
				var favicon = $('<img src="' + faviconUrl + '" alt="" id="favicon"/>');

				$.ajax($(favicon).attr("src"), {
					statusCode: {
						404: function() {
							favicon = $('<img src="img/questionMark.png" alt="" id="favicon"/>');
						},
					},
					complete: function(){
						$('#mouseFollow').append(favicon);
						$('#mouseFollow').attr("data-name", name);
					},
				});
			},
			
			clearAll : function(){
				$("#catHidden").val("");
				
				ctrlControl.catFormClose();
				
				$('#mouseFollow').empty();
				$('#mouseFollow').css({
					opacity: 1,
					background: "rgba(255,255,255,0.5)",
				});
			}
	};
	$(document).on("keydown", ctrlControl.start());
	
	//How to disable
	//$(document).off("keydown", ctrlControl.start());
});


//NOTER:: may want to bind and unbind, this might waste processors	
$(document).bind('mousemove', function(e){
	$('#mouseFollow').css({
	       left:  e.pageX + 11,
	       top:   e.pageY + 11,
	});
});

//Fix for the scrolling when the div is dragged off the edge
//NOTER:: fix the jerkiness of it
$(document).on('scroll', function() {
	  $(document).scrollLeft(0);
	  $(document).scrollTop(0);
});