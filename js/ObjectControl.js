$(document).ready(function(){
	
	var ctrlControl = {
			start : function(){
				var needCtrl = true;
				var catFormOpen = (function(e){
					$("#catForm").fadeIn();
					$("#catName").focus();
				});
				var catFormClose = (function(){
					$("#catForm").fadeOut(400).delay(400).queue(function(n) {
						$("#catName").val("");
					    n();
					});
				});
					
				$(document).keydown(function(e){
					  if (e.ctrlKey) {
						  catFormOpen();
						  if (e.keyCode != 86 && e.keyCode != 16){
							  e.preventDefault();
						  }
						  if (e.keyCode == 16) {
							  if (needCtrl){
								  needCtrl = false;
							  }
							  else{
								  needCtrl = true;
							  }
						  }
					  }
					  if (e.keyCode == 13){
						  $(":focus").each(function() {
							    if (this.id == "catName"){
							    	ctrlControl.newLink($("#catName").val());
							    }
						  });
					  }
				});
				
				$(document).keyup(function(e){
					if (e.which == 17 && needCtrl){
						catFormClose();
					}
				});	
			},
			
			
			
			newLink: function(name){
				$("#catForm").fadeOut().delay(400).queue(function(n) {
					$("#catName").val("");
				    n();
				});
				/*var $element = $("<div class= 'unknownFun'> ==NAME== </div>");
				$element.css({
					"height": 15,
					"width":170,
					"position":"absolute",
					"top": 0,
					"left": 0,
					"padding": "10px",
				    "font-size": "18px",
					"text-align": "center",
					"background": "rgba(0,0,0,0)",
				});
				$element.draggable({
					revert: "invalid",
					start: function(e,ui){
						
					}
				});
				$element.attr("data-size-Row", 0);
				$element.attr("data-size-Col", 0);
				$element.attr("data-cur-row", -1);
				$element.attr("data-cur-col", -1);
				$(".da-slide").append($element);*/
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