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
		 			}
		 			
	 				dragged.css({
						"top" : "0px",
						"left": "4%",
					});
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
					if (cell.attr("data-isOccupied")=='true' || cell.length==0){
						isEmpty = false;
						return isEmpty;
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
		
		styleArea : function(element, cell, styling){
			var cellRow = parseInt(cell.attr("data-Row"));
			var cellCol = parseInt(cell.attr("data-Col"));
			var rowSize = parseInt(element.attr("data-size-row"));
			var colSize = parseInt(element.attr("data-size-col"));

			for (var i = cellRow; i<cellRow+rowSize; i++){
				for (var j = cellCol; j<cellCol+colSize; j++){
					var cell = $('.gridded[data-row="'+ i +'"]'+
			 				'[data-col="'+ j +'"]');
					cell.css({
						"background": styling,
					});
				}
			}
		},
	};
	
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
			"background":"rgba(0,0,0,0.4)", 
			"border": "2px solid #FFFFFF"});
		cell.attr("data-col", colIndex);
		cell.attr("data-row", rowIndex);
		cell.attr("data-isOccupied", false);
		cell.on("click", function(e){
			if ($('#mouseFollow > img').attr('id') == "newCat"
				&& cell.attr("data-isOccupied") == "false"){
				var name = $("#mouseFollow").attr("data-name");
				$("#mouseFollow").css('opacity','0');
				$("#mouseFollow").attr("data-name", "");
				//NOTER:: may want to do this instead
				$("#mouseFollow").empty();
				var cat = new Category(rowIndex, colIndex, 1, 1, name);
				$(cell).append(cat);
				gridSizing.calibrate();
				cell.attr("data-isOccupied", true);
				isEmpty = false;
			}
		});
		return cell;
	}
	
	function Category(rowIndex, colIndex, rowSize, colSize, name){
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.rowSize = rowSize;
		this.colSize = colSize;
		this.name = name;
		var cat = $("<fieldset class='object'><legend class='fieldLeg' style='width:" +
				100 + "px; padding-top:0; padding-bottom:0;margin:0;'>" +
        		name +
        		"</legend>" +
        		"</fieldset>");
		cat.attr("data-size-Row", rowSize);
		cat.attr("data-size-Col", colSize);
		cat.attr("data-cur-row", rowIndex);
		cat.attr("data-cur-col", colIndex);
		
		cat.draggable({
			revert: "invalid",
			cursorAt: {top:20, left:30},
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
				
				var heightChange = $(this).height() - ui.originalSize["height"];
				var widthChange = $(this).width() - ui.originalSize["width"];
				
				heightChange /= gridHeight;
				widthChange /= gridWidth;
				
				var newRows = heightChange + parseInt($(this).attr("data-size-Row"));
				var newCols = widthChange + parseInt($(this).attr("data-size-Col"));;
				
				grid.changeArea($(this),false);
				
				$(this).attr("data-size-Row", newRows);
				$(this).attr("data-size-Col", newCols);
				
				grid.changeArea($(this),true);
			},
		});
		
		cat.on("click", function(e){
			if ($('#mouseFollow > img').attr('id') == "favicon"){
				var name = $("#mouseFollow").attr("data-name");
				$("#mouseFollow").css('opacity','0');
				
				$("#mouseFollow").attr("data-name", "");
				//NOTER:: may want to do this instead
				$("#mouseFollow").empty();

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
                
                var linkSpan = new LinkSpan(link);
			}
		});

		return cat;
	}
	
	function LinkSpan(link){
		var linkInput = $('<input type="text" class="linkInput"/>');
		linkInput.css({
			"width":"100%",
			"height":"70%",
			"margin":"auto",
		});
		$(link).append(linkInput);
		linkInput.focus();
		$(linkInput).keydown(function(e){
			if (e.keyCode == 13){
				addLinkSpan();
			}
		});
		$(linkInput).blur(function() {
			addLinkSpan();
		});
		
		function addLinkSpan(){
			var name = $(linkInput).val();
			$(linkInput).remove();
			var linkSpan = $('<span class="linkSpan">'+name+'</span>');;
			$(link).append(linkSpan);
			$(".linkSpan").css({
				"width":"90%",
				"height":"95%",
			});
		}
	}
	
	//NOTER:: Sizing of internal elements?
	function Link(name, rowSize, colSize){
		this.name = name;
		
		colSize = 90 / colSize;
		rowSize = 30 / rowSize;
		
		var link = $("<div>", {class: "link"});
		link.css({
			"width" : $(".gridded").width()*.80,
			"height" : $(".gridded").height()*.85,
			"margin" : "5px",
			"background-color": "#019001",
			"z-index" : "3",
			"text-align":"center",
		});
		return link;
	}
	
	var gridSizing = {
			calibrate : function(){
				var gridHeight = $(".gridded").height();
				var gridWidth = $(".gridded").width();
				
				$(".link").css({
					"height" : gridHeight*.85,
					"width" : gridWidth*.80,
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
	
	grid.init();
	grid.dropInit();
	
	$("#freeze").on("click", function(){
		if($( ".object" ).draggable( "option", "disabled" )){
			$(".object").draggable("enable");
		}
		else{
			$(".object").draggable("disable");
		}
	});
	
	
	/*
	 * NOTER:: as it stands this logic isn't too good,
	 * it is just to show what the final form will look like somewhat.
	 * As a result some of the things don't work as well as they should, 
	 * for intance any cats that are added after the altview is clicked 
	 * will not have the logic shown here as the logic is redeclared as it 
	 * was prevously.
	 */
	$("#altView").on("click", function(){
		$(".gridded").css({
			"background":"rgba(0,0,0,0)",
		});
		$(".gridded").droppable({
			over : function(e, ui){
				$(".gridded").css({
					"background" : "rgba(0,0,0,0)",
				});
				grid.styleArea(ui.helper, $(this), "rgba(0,0,0,0.4)");
			},
		});
		$(".object").draggable({
			stop: function(e,ui){
				$(this).css({
					"z-index" : "2",
				});
				$(".gridded").css({
					"background" : "rgba(0,0,0,0)",
				});
			},
		});
	});
});