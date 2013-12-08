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
		sizer : function(sizeRow, sizeCol, elm, action){
			switch(action){
			case action = 0: 
				for (var i=0; i<=sizeCol; i++){
					$('[data-col = '+(elm.data("col")+i)+'][data-row = '+(elm.data("row"))+']').attr("data-isOccupied",'true');
				}
				for (var i=0; i<=sizeRow; i++){
					$('[data-row = '+(elm.data("row")+i)+'][data-col = '+(elm.data("col"))+']').attr("data-isOccupied",'true');
				}
			case action = 1: 
				for (var i=0; i<=sizeCol; i++){
//NOTER:: question of interest, why did elm.data("col") not work here?					
					var dropper = $('[data-col = '+(grid.dropOut.data("col")+i)+'][data-row = '+(grid.dropOut.data("row"))+']');
				}
				for (var i=0; i<=sizeRow; i++){
					$('[data-row = '+(grid.dropOut.data("row")+i)+'][data-col = '+(grid.dropOut.data("col"))+']').attr("data-isOccupied",'false');
				}
			case action = 2: 
				var isOccupied = false;
				for (var i=0; i<=sizeCol; i++){
					if ($('[data-col = '+(elm.data("col")+i)+'][data-row = '+(elm.data("row"))+']').attr("data-isOccupied",'true')){
						isOccupied = true;
					}
				}
				for (var i=0; i<=sizeRow; i++){
					if ($('[data-row = '+(elm.data("row")+i)+'][data-col = '+(elm.data("col"))+']').attr("data-isOccupied",'true')){
						isOccupied = true;
					}
				}
				return isOccupied;
			}
		},
		dropOut : $(),
		lastBlock : $(),
		dropInit: function(){
			$(".gridded").droppable({
		 		drop: function(e,ui){
		 			var dragged = ui.helper;
					if (dragged.hasClass("unknownFun")){
						dragged.remove();
						$(".unknownFun").remove();
						dragged = $("<fieldset class='object'><legend class='fieldLeg' style='width:" +
						100 + "px;'>" + //NOTER:: 50 is a dummy number
		        		"name" + //NOTER:: take name out of unknownFun
		        		//"<img src='images/newCloseWhite40.png' id='removeCat'/>" +
		        		//"<img src='images/newPlusWhite.png' id='addLinkNew' class='ctl'/>" +
		        		"</legend>" +
		        		"<ul class='sortable'></ul></fieldset>");
						dragged.attr("data-size-Row", 0);
						dragged.attr("data-size-Col", 0);
						dragged.attr("data-cur-row", -1);
						dragged.attr("data-cur-col", -1);
						dragged.css({
							"height": "30px",
							"width" : "210px",
							"margin" : "auto",
							"font-size" : "18px",
						});
						dragged.droppable({
							accept: function(e,ui){
								
							},
							drop: function(e,ui){
								alert("hello");
								var linkDragged = ui.helper;
								linkDragged.remove();
								linkDragged = $("<li class='link'><a class='uurl' target ='_blank' href='" + name +
										  "' >" + name + "</a>" +
										  //"<img src='images/close.png' id='removeLink'/>" +
										  //"<img src='images/toolBoxOne.png' id='linkToolBox'>" +
										  "</li>");
								$(this).append(linkDragged);
								//$(this).attr("data-size-row", $(this).attr("data-size-row")+1);
								//$(this).attr("data-size-col", $(this).attr("data-size-col")+1);
							},
						});
						dragged.draggable({
							revert: "invalid",
							start: function(e,ui){
								
							}
						});
					}
		 			if ($(this).attr("data-isOccupied")=='false'){
		 				dragged.css({
							"top" : "0px",
							"left": "0px",
						});
			 			$(this).append(dragged);
			 			grid.sizer(dragged.data("sizeRow"), dragged.data("sizeCol"), grid.dropOut, 1);
			 			dragged.attr("data-cur-col", $(this).attr("data-col"));
			 			dragged.attr("data-cur-row", $(this).attr("data-row"));
			 			grid.sizer(dragged.data("sizeRow"), dragged.data("sizeCol"), $(this), 0);
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
		var elmName = "col"+colIndex+"row"+rowIndex;
		cell.attr("data-id", elmName);
		cell.attr("data-col", colIndex);
		cell.attr("data-row", rowIndex);
		cell.attr("data-isOccupied", false);
		cell.on("click", function(e){
			if ($("#mouseFollow").css('opacity') != 0 && isEmpty){
				var name = $("#mouseFollow").attr("data-name");
				$("#mouseFollow").css('opacity','0');
				$("#mouseFollow").attr("data-name", "");
				alert(name);
			}
			/*
			if (cell.attr("data-isOccupied")==false){
				
				var dragged = $("<fieldset class='object'><legend class='fieldLeg' style='width:" +
						100 + "px;'>" + //NOTER:: 50 is a dummy number
		        		name + //NOTER:: take name out of unknownFun
		        		//"<img src='images/newCloseWhite40.png' id='removeCat'/>" +
		        		//"<img src='images/newPlusWhite.png' id='addLinkNew' class='ctl'/>" +
		        		"</legend>" +
		        		"<ul class='sortable'></ul></fieldset>");
				dragged.attr("data-size-Row", 0);
				dragged.attr("data-size-Col", 0);
				dragged.attr("data-cur-row", -1);
				dragged.attr("data-cur-col", -1);
				dragged.css({
					"height": "30px",
					"width" : "210px",
					"margin" : "auto",
					"font-size" : "18px",
				});
				dragged.draggable({
					revert: "invalid",
					start: function(e,ui){
						
					}
				});
				dragged.onClick(function(){
//NOTER:: DO THIS NEXT								
				});
				$(this).append(dragged);
				$("#mouseFollow").empty();
				$(this).attr("data-isOccupied", "true");
			}*/
		});
		return cell;
	}
	grid.init();
	grid.dropInit();
});