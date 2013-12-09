$(document).ready(function() {
	var grid = {
		init: function(){
			var rowIndex = 0;
			var colIndex = 0;
			for (rowIndex = 0; rowIndex<12; rowIndex++){
				for (colIndex = 0; colIndex<5; colIndex++){
					var cell = new Cell(rowIndex, colIndex);
					$("#grid").append(cell);
				}
			}
			
		},
		dropOut : $(),
		lastBlock : $(),
		dropInit: function(){
			$(".gridded").droppable({
		 		drop: function(e,ui){
		 			var dragged = ui.helper;
		 			if ($(this).attr("data-isOccupied")=='false'){
		 				dragged.css({
							"top" : "0px",
							"left": "0px",
						});
			 			$(this).append(dragged);
			 			dragged.attr("data-cur-col", $(this).attr("data-col"));
			 			dragged.attr("data-cur-row", $(this).attr("data-row"));
			 			grid.dropOut = $(this);
			 			grid.lastBlock.attr("data-isOccupied", "false");
		 			}
		 			else{
//For some reason this returns a new object
//When first run with var lastBlock = ... I wouldn't be able 
//to reset that block on drop cause it is different than $(this) in drop
//If this is found out please tell me why it is!!!  It's really bothering me
		 				
//Might be because I don't do the .droppable in the same method as they are declared
		 				
//NOTER :: may have to do a switch case for this for larger items
		 				grid.lastBlock = $('[data-col = '+(dragged.attr("data-cur-Col"))+'][data-row = '+(dragged.attr("data-cur-Row"))+']');
		 				grid.lastBlock.append(dragged);
		 				grid.lastBlock.attr("data-isOccupied", "true");
		 				//grid.sizer(dragged.data("sizeRow"), dragged.data("sizeCol"), lastBlock, 0);
		 				dragged.css({
							"top" : "0px",
							"left": "0px",
						});
		 			}
		  		},
				accept: function (e) {
					return true;
			    },
			});
		}
	};
	
	function Cat(rowIndex, colIndex, url){
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		rowSize = 1;
		colSize = 1;
		this.url = url;
		var cat = $("<fieldset class='object'><legend class='fieldLeg' style='width:" +
				100 + "px;'>" + //NOTER:: 50 is a dummy number
        		"name" + //NOTER:: take name out of unknownFun
        		//"<img src='images/newCloseWhite40.png' id='removeCat'/>" +
        		//"<img src='images/newPlusWhite.png' id='addLinkNew' class='ctl'/>" +
        		"</legend>" +
        		"<ul class='sortable'></ul></fieldset>");
		cat.attr("data-size-Row", rowSize);
		cat.attr("data-size-Col", colSize);
		cat.attr("data-cur-row", rowIndex);
		cat.attr("data-cur-col", colIndex);
		cat.css({
			"width": "85%",
			"height": "60%",
			"background-color": "#123456",
			"z-index":"2",
			"font-size" : "18px",
			"border-radius" : "5px",
			"color" : "#FFFFFF",
			"border" : "2px solid #FFFFFF",
			"margin" : "auto",
			"padding" : "5px",
		});
		cat.draggable({
			revert: "invalid",
			start: function(e,ui){
				
			}
		});
		/*
		cat.onClick(function(){
//NOTER:: DO THIS NEXT								
		});*/
		return cat;
	}
	
	function Cell(rowIndex, colIndex, isEmpty){
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		isEmpty = true;
		var cat = null;
		var cell = $("<div>", {class: "gridded"});
		cell.css({"width": "20%",
			"height": "8.3%",
			"position": "absolute",
			"top" : rowIndex*8.3+"%",
			"left" : colIndex*20+"%",
			"background-color": "", 
			"border": "2px solid #FFFFFF"});
		cell.attr("data-col", colIndex);
		cell.attr("data-row", rowIndex);
		cell.attr("data-isOccupied", false);
		cell.on("click", function(e){
			if ($("#mouseFollow").css('opacity') != 0 && isEmpty){
				var name = $("#mouseFollow").attr("data-name");
				$("#mouseFollow").css('opacity','0');
				$("#mouseFollow").attr("data-name", "");
				//NOTER:: may want to do this instead
				//$("#mouseFollow").empty();
				cat = new Cat(rowIndex, colIndex, name);
				$(cell).append(cat);
				cell.attr("data-isOccupied", true);
				isEmpty = false;
			}
		});
		return cell;
	}
	
	
	grid.init();
	grid.dropInit();
});