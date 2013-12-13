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
		
		dropInit: function(){
			$(".gridded").droppable({
	 			tolerance: "pointer",
				
		 		drop: function(e,ui){
		 			var dragged = ui.helper;
		 			
		 			if (grid.checkArea($(this), dragged)){
		 				dragged.css({
							"top" : "0px",
							"left": "4%",
						});

			 			grid.changeArea(dragged, false);
			 			
			 			dragged.attr("data-cur-col", $(this).attr("data-col"));
			 			dragged.attr("data-cur-row", $(this).attr("data-row"));
			 			
			 			grid.changeArea(dragged, true);
			 			
			 			$(this).append(dragged);
		 			}
		 			else{
		 				var lastBlock = $('.gridded[data-col = '+(dragged.attr("data-cur-Col"))+']'+
		 						'[data-row = '+(dragged.attr("data-cur-Row"))+']');
		 				lastBlock.append(dragged);
		 				grid.changeArea(dragged, true);
		 				dragged.css({
							"top" : "0px",
							"left": "4%",
						});
		 			}
		  		},
		  		out: function(e, ui){
		  			var dragged = ui.helper;
		 			grid.changeArea(dragged, false);
		  		},
				accept: function (e) {
					return true;
			    },
			});
		},
		checkArea : function(cell, element){
			var lastCellRow = parseInt(cell.attr("data-row"));
			var rowSize = parseInt(element.attr("data-size-row"));
			var lastCellCol = parseInt(cell.attr("data-col"));
			var colSize = parseInt(element.attr("data-size-col"));
			
			var isEmpty = true;
			
			//TODO add a check for out of bounds
			
			for (var i = lastCellRow; i<lastCellRow+rowSize; i++){
				for (var j = lastCellCol; j<lastCellCol+colSize; j++){
					var cell = $('.gridded[data-row="'+ i +'"]'+
			 				'[data-col="'+ j +'"]');
					if (cell.attr("data-isOccupied")=='true'){
						isEmpty = false;
					}
				}
			}
			return isEmpty;
		},
		changeArea : function(element, isFull){
			var cellRow = parseInt(element.attr("data-cur-row"));
			var cellCol = parseInt(element.attr("data-cur-col"));
			var rowSize = parseInt(element.attr("data-size-row"));
			var colSize = parseInt(element.attr("data-size-col"));

			for (var i = cellRow; i<cellRow+rowSize; i++){
				for (var j = cellCol; j<cellCol+colSize; j++){
					var cell = $('.gridded[data-row="'+ i +'"]'+
			 				'[data-col="'+ j +'"]');
					cell.attr("data-isOccupied", isFull);
				}
			}
		},
	};

	/*
	 * why doesn't this work? gridSizing.bodyHeight never changes from 0
	 * 
	var gridSizing = {
		bodyHeight : 0,
		bodyWidth : 0,
		cellHeight : 0,
		cellWidth : 0,
		
		calibrate : function(){
			bodyHeight = $("body").height();
			bodyWidth = $("body").width();
			cellHeight = bodyHeight * .2;
			cellWidth = bodyWidth * .083;
			alert(bodyHeight);
		},
	};
	gridSizing.calibrate();
	alert(gridSizing.bodyHeight);
	*/
	
	var gridSizing = {
		calibrate : function(){
			var gridHeight = $(".gridded").height();
			var gridWidth = $(".gridded").width();
			
			$(".link").css({
				"height" : gridHeight*.85,
				//"width" : $(".gridded").width(),
			});
			//Standard height, for which the body font size is correct
			
			var preferredHeight = 768;  

			var displayHeight = $(window).height();
			var percentage = displayHeight / preferredHeight;
			var newFontSize = Math.floor(30 * percentage) - 1;
			$(".object").css("font-size", newFontSize);
			
			$(".object").resizable("option", "grid", [gridWidth, gridHeight]);
		}
	};
	
	gridSizing.calibrate();
	
    $(window).bind('resize', function(){
    	gridSizing.calibrate();
    }).trigger('resize');
	
	function Cat(rowIndex, colIndex, rowSize, colSize, url){
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.rowSize = rowSize;
		this.colSize = colSize;
		this.url = url;
		var cat = $("<fieldset class='object'><legend class='fieldLeg' style='width:" +
				100 + "px; padding-top:0; padding-bottom:0;margin:0;'>" +
        		"name" +
        		"</legend>" +
        		"</fieldset>");
		cat.attr("data-size-Row", rowSize);
		cat.attr("data-size-Col", colSize);
		cat.attr("data-cur-row", rowIndex);
		cat.attr("data-cur-col", colIndex);
		
		cat.draggable({
			revert: "invalid",
			cursorAt: {top:20},
			start: function(e,ui){
				$(this).css({
					"z-index" : "20",
				});
			},
			stop: function(e,ui){
				$(this).css({
					"z-index" : "2",
				});
			},
		});
		
		cat.resizable({
			start: function(e,ui){
				
			},
			stop: function(e, ui){
				var gridHeight = $(".gridded").height();
				var gridWidth = $(".gridded").width();
				
			},
		});
		
		cat.on("click", function(e){
			if ($("#mouseFollow").css('opacity') != 0){
				var name = $("#mouseFollow").attr("data-name");
				$("#mouseFollow").css('opacity','0');
				$("#mouseFollow").attr("data-name", "");
				//NOTER:: may want to do this instead
				//$("#mouseFollow").empty();

				var link = new Link(name, rowSize, colSize);
				$(cat).append(link);
				
				rowSize += 1;
				
				cat.attr("data-size-Row", rowSize);
				cat.attr("data-size-Col", colSize);
				
                height = 60 + 100 * (rowSize-1);
                $(cat).css({
                	"height" : height+"%",
                	"padding-top" : "0",
                });
			}
		});

		return cat;
	}
	
	//NOTER:: Sizing of internal elements?
	function Link(name, rowSize, colSize){
		this.name = name;
		
		colSize = 90 / colSize;
		rowSize = 30 / rowSize;
		
		var link = $("<div>", {class: "link"});
		link.css({
			"width" : "95%",
			"height" : $(".gridded").height()*.85,
			"margin" : "5px",
			"background-color": "#019001",
			"z-index" : "3",
		});
		return link;
	}
	
	function Cell(rowIndex, colIndex, isEmpty){
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		isEmpty = true;
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
				var cat = new Cat(rowIndex, colIndex, 1, 1, name);
				$(cell).append(cat);
				gridSizing.calibrate();
				cell.attr("data-isOccupied", true);
				isEmpty = false;
			}
		});
		return cell;
	}
	
	
	grid.init();
	grid.dropInit();
});