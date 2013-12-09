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
		 		drop: function(e,ui){
		 			var dragged = ui.helper;
		 			if ($(this).attr("data-isOccupied")=='false'){
		 				dragged.css({
							"top" : "0px",
							"left": "0px",
						});
			 			$('.gridded[data-row="'+dragged.attr("data-cur-row")+'"]'+
			 				'[data-col="'+dragged.attr("data-cur-col")+'"]').attr("data-isOccupied", "false");
			 			dragged.attr("data-cur-col", $(this).attr("data-col"));
			 			dragged.attr("data-cur-row", $(this).attr("data-row"));
			 			
			 			$(this).append(dragged);
			 			$(this).attr("data-isOccupied", "true");
		 			}
		 			else{
		 				var lastBlock = $('.gridded[data-col = '+(dragged.attr("data-cur-Col"))+']'+
		 						'[data-row = '+(dragged.attr("data-cur-Row"))+']');
		 				lastBlock.append(dragged);
		 				lastBlock.attr("data-isOccupied", "true");
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
	
	
	function Cat(rowIndex, colIndex, rowSize, colSize, url){
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.rowSize = rowSize;
		this.colSize = colSize;
		this.url = url;
		var cat = $("<fieldset class='object'><legend class='fieldLeg' style='width:" +
				100 + "px;'>" +
        		"name" +
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
				height = 60 + 100 * (rowSize-1);
				$(cat).css({"height" : height+"%"});
			}
		});

		return cat;
	}
	
	//NOTER:: Sizing of internal elements?
	function Link(name, rowSize, colSize){
		this.name = name;

		alert (rowSize);
		
		colSize = 90 / colSize;
		rowSize = 30 / rowSize;
		
		var link = $("<div>", {class: "link"});
		link.css({
			"height" : rowSize + "%",
			"width" : colSize + "%",
			"margin" : "3px",
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
				cell.attr("data-isOccupied", true);
				isEmpty = false;
			}
		});
		return cell;
	}
	
	
	grid.init();
	grid.dropInit();
});