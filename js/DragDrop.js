$(document).ready(function(){	
	
});
//NOTER:: this is mostly irrelevant right now...Most of this logic is 
//in the grid class


	/*
	function createObj(height, width, background, top, left, isDrag, id, className){
		this.height = height;
		this.width = width;
		this.background = background;
		this.top = top;
		this.left = left;
		this.isDrag = isDrag;
		this.id = id;
		this.className = className;
		
		this.create = function(){
			var newDiv = $("<div>", {class: className});
			newDiv.css({"width": this.width,
				"height": this.height,
				"background-color" : this.background,
				"position": "absolute",
				"top" : this.top,
				"left" : this.left
				/*"border": "1px solid #FFFFFF"*//*
			});
			
			if (this.isDrag == -1){}
			if (this.isDrag == 0){
				newDiv.draggable();
			}
			if (this.isDrag == 1){
				newDiv.droppable({
			 		drop: function(e,ui) {
			 			var dragged = ui.helper;
			 			dragged.css({
							"background-color" : "#AAAAAA",
							"top" : "0px",
							"left": "0px"
						});
			 			$(this).append(dragged);			    		
			  		}
				});
			}
			$(".da-slide").append(newDiv);
		};
	}
	
	//$( ".selector" ).on( "dropover", function( event, ui ) {} );
	$(function (){;
		var firstElm = new createObj(10, 10, "black", 10, 10, 0);
		var secondElm = new createObj(100,100,"#FFFFFF",200,200,1);
		secondElm.create();
		firstElm.create();
		
	});
});*/
