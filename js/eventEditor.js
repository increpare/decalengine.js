var modal = false;

var EE_MARGINX=5;
var EE_MARGINY=5;

var YSCROLL=0;

var NUMROWS=10;
var ROWMARGIN=5;
var COLMARGIN=5;

var ROWCOL1=[0x555555,0x888888];

var SCROLLBARWIDTH=40;
var SCROLLBARBUTTONHEIGHT=40;

var EE_PANELHEIGHT = PANEL_HEIGHT-2*EE_MARGINY;


var ROWHEIGHT=(EE_PANELHEIGHT+ROWMARGIN)/NUMROWS-ROWMARGIN;

var cellWidths = [0.05,0.45,0.45,0.05];

var ee_GUI_modalbackdrop;
var ee_GUI_scrollbuttons = [];
var ee_UI_Widgets_cols = [[],[],[],[]];
var ee_UI_AddNewButtons = [];
var ee_spriteDialog;

	//bg panel sprite text panel sprite


function showModalContainer(){
	ee_GUI_modalbackdrop.visible=true;
	ee_spriteDialog.visible=true;
}

function hideModalContainer(){
	ee_GUI_modalbackdrop.visible=false;
	ee_spriteDialog.visible=false;
}

function updateEventEditor(){
	//1: update scroll position

	var numRows = ee_contents.length+1;
	var pageCount = Math.ceil(numRows/NUMROWS);
	var nubCount = Math.max(pageCount,6);
	
	var startRow = ee_scrollpos*NUMROWS;
	var rowsToDisplay = Math.min(NUMROWS,ee_contents.length-startRow);

	for (var i=0;i<ee_GUI_scrollbuttons.length;i++){
		var button = ee_GUI_scrollbuttons[i];
		if (i>=pageCount){
			button.visible=false;
			continue;
		}
		button.visible=true;
		if (i===ee_scrollpos){
			button.tint = 0xffffff;
			button.interactive = false;
			button.buttonMode = false;
		} else {
			button.tint = 0x000000;
			button.interactive = true;
			button.buttonMode = true;
		}
	}

	//2: update row contents

	var offset = ee_scrollpos
	for (var i=0;i<ee_UI_Widgets_cols.length;i++){
			//column
		var col = ee_UI_Widgets_cols[i];
		for (var j=0;j<col.length;j++){
			var row = col[j];				
			//row
			for (var k=0;k<row.length;k++){
				var w = row[k];
				w.visible=j<rowsToDisplay;		
			}			
		}		
	}

	for (var i=0;i<rowsToDisplay;i++){
		ee_UI_Widgets_cols[0][i][1].text=ee_contents[i][0];


		var col1dat = ee_contents[i][1];
		//0bg 1panel 2sprite 3text 4panel 5sprite

		var img1 = col1dat.length===3?col1dat[1]:-2;
		var img2 = col1dat.length===3?col1dat[2]:(col1dat.length===2?col1dat	[1]:-2);

		ee_UI_Widgets_cols[1][i][3].text = col1dat[0];
		
		var RowWidth = PANEL_WIDTH-2*EE_MARGINX-SCROLLBARWIDTH-COLMARGIN;
		var xoffset=PANEL_LEFT+EE_MARGINX;
		var ypos=PANEL_TOP+EE_MARGINY;
		var h = ROWHEIGHT;
		ypos+=i*(h+ROWMARGIN);

		xoffset+=cellWidths[0]*RowWidth;

		window.console.log("img1 " + img1+","+img2);
		if (img2>=-1)
		{
			xoffset+=COLMARGIN;
			if (img1>=-1)
			{
				xoffset+=ROWHEIGHT+COLMARGIN;
			} 
			ee_UI_Widgets_cols[1][i][3].position.x=xoffset;
			ee_UI_Widgets_cols[1][i][4].position.x = ee_UI_Widgets_cols[1][i][3].position.x + ee_UI_Widgets_cols[1][i][3].width+2*COLMARGIN;
			ee_UI_Widgets_cols[1][i][5].position.x = ee_UI_Widgets_cols[1][i][3].position.x + ee_UI_Widgets_cols[1][i][3].width+2*COLMARGIN;
		} else {
			if (img1>=-1){
				xoffset+=ROWHEIGHT;				
			}
			ee_UI_Widgets_cols[1][i][3].position.x=xoffset;
		}

		if (img1===-2){
			ee_UI_Widgets_cols[1][i][1].visible=false;
			ee_UI_Widgets_cols[1][i][2].visible=false;
		} else {
			ee_UI_Widgets_cols[1][i][1].visible=true;
			ee_UI_Widgets_cols[1][i][2].visible=true;
		}
		if (img2===-2){
			ee_UI_Widgets_cols[1][i][4].visible=false;
			ee_UI_Widgets_cols[1][i][5].visible=false;
		} else {
			ee_UI_Widgets_cols[1][i][4].visible=true;
			ee_UI_Widgets_cols[1][i][5].visible=true;
		}

	}

	for (var i=0;i<ee_UI_AddNewButtons.length;i++){
		var btn = ee_UI_AddNewButtons[i];
		if(rowsToDisplay===i){
			btn.visible=true;
		} else {
			btn.visible=false;
		}
	}
}


function EE_DeleteRow(row){
	window.console.log("yo yo" + row);
	ee_contents.splice(row,1);
	updateEventEditor();
}

function EE_AddRow(){
	window.console.log("yo yo");
	ee_contents.push([ 1,  ["WANTS",2,1], ["DESTROY",2],"X"]);
	updateEventEditor();
}

function makeEventEditor(){

	var removeItemTex = PIXI.Texture.fromImage("gfx/ui/remove.png",null,PIXI.SCALE_MODES.NEAREST);
	var addItemTex = PIXI.Texture.fromImage("gfx/ui/additem.png",null,PIXI.SCALE_MODES.NEAREST);

	var widgets = [];

	var RowWidth = PANEL_WIDTH-2*EE_MARGINX-SCROLLBARWIDTH-COLMARGIN;

	var tableContainer = new PIXI.Container();

	function _clickIconButton(rowNumber,cellNumber,imgNumber){
		return function(){
			window.console.log(rowNumber +", "+cellNumber+", "+imgNumber);
			showModalContainer();
		}
	}
	//draw cells
	for (var i=0;i<NUMROWS;i++)
	{
		var ypos=PANEL_TOP+EE_MARGINY;
		var h = ROWHEIGHT;
		ypos+=i*(h+ROWMARGIN);

		var xoffset=PANEL_LEFT+EE_MARGINX;
		for (var j=0;j<cellWidths.length;j++){	
			var rowdat = [];

			var xpos=xoffset;
			var w = cellWidths[j]*RowWidth;
			if (j<cellWidths.length-1){
				w-=COLMARGIN;
			}

			if (j!==3){
				var panel = new PIXI.Graphics();
				panel.lineStyle(0);
				panel.beginFill(ROWCOL1[i%2], 1);
				
				panel.drawRect(
					xpos,
					ypos,
					w,
					h
				);
				tableContainer.addChild(panel);	
				rowdat.push(panel);
			}

			xoffset+=cellWidths[j]*RowWidth;

			if (j===1||j===2){
				var panel = new PIXI.Graphics();
				var ph = ROWHEIGHT-2*COLMARGIN;
				var pw = ROWHEIGHT-2*COLMARGIN;
				var pxpos = xpos+COLMARGIN;
				var pypos = ypos+COLMARGIN;
				panel.lineStyle(1,0xffffff);
				panel.beginFill(0x000000, 1);

				panel.drawRect(
					0,
					0,
					pw,
					ph
				);
				panel.position.x=pxpos;
				panel.position.y=pypos;
				tableContainer.addChild(panel);	
				rowdat.push(panel);

				panel.interactive = true;
				panel.buttonMode = true;	

				OnButtonClick(panel, _clickIconButton(i,j,0));

				var preview = new PIXI.Sprite(spriteTextures[0]);
				preview.position.x=xpos+COLMARGIN;
				preview.position.y=ypos+COLMARGIN;
				preview.width=ROWHEIGHT-2*COLMARGIN;
				preview.height=ROWHEIGHT-2*COLMARGIN;
				preview.hitArea = NO_HIT_AREA;
				tableContainer.addChild(preview);	
				rowdat.push(preview);
				
			

				var basicText = new PIXI.Text("does");
				basicText.interactive = false;
				basicText.hitArea = NO_HIT_AREA;
				basicText.x = xpos+COLMARGIN*3+ROWHEIGHT-2*COLMARGIN;
				basicText.y = ypos+(ROWHEIGHT)/2-basicText.height/2;	
				tableContainer.addChild(basicText);	
				rowdat.push(basicText);
					


				var panel = new PIXI.Graphics();
				var ph = ROWHEIGHT-2*COLMARGIN;
				var pw = ROWHEIGHT-2*COLMARGIN;
				var pxpos = basicText.x+basicText.width+2*COLMARGIN;
				var pypos = ypos+COLMARGIN;
				panel.lineStyle(1,0xffffff);
				panel.beginFill(0x000000, 1);

				panel.drawRect(
					0,
					0,
					pw,
					ph
				);
				panel.position.x=pxpos;
				panel.position.y=pypos;
				tableContainer.addChild(panel);	
				rowdat.push(panel);
					
				
				panel.interactive = true;
				panel.buttonMode = true;	

				OnButtonClick(panel, _clickIconButton(i,j,1));;

				var preview = new PIXI.Sprite(spriteTextures[0]);
				preview.position.x=basicText.x+basicText.width+2*COLMARGIN;
				preview.position.y=ypos+COLMARGIN;
				preview.width=ROWHEIGHT-2*COLMARGIN;
				preview.height=ROWHEIGHT-2*COLMARGIN;
				preview.hitArea = NO_HIT_AREA;
				tableContainer.addChild(preview);
				rowdat.push(preview);
					

			} else if (j===3){

				var closeIcon = new PIXI.Sprite(removeItemTex);
				closeIcon.position.x=xpos+COLMARGIN;
				closeIcon.position.y=ypos+COLMARGIN;
				closeIcon.width=w-2*COLMARGIN;
				closeIcon.height=h-2*COLMARGIN;
				closeIcon.tint=0x888888;
				closeIcon.interactive=true;
				closeIcon.buttonMode=true;

				function _downClick(idx){
					return function(){
						EE_DeleteRow(idx);
					}
				}

				window.console.log("EE_DeleteRow "+i);

				OnButtonClick(closeIcon, _downClick(i));

				tableContainer.addChild(closeIcon);
				rowdat.push(closeIcon);


				var addIcon = new PIXI.Sprite(addItemTex);
				addIcon.position.x=xpos+COLMARGIN;
				addIcon.position.y=ypos+COLMARGIN;
				addIcon.width=w-2*COLMARGIN;
				addIcon.height=h-2*COLMARGIN;
				//addIcon.tint=0x888888;
				addIcon.interactive=true;
				addIcon.buttonMode=true;
				addIcon.visible=false;

				OnButtonClick(addIcon, EE_AddRow);

				ee_UI_AddNewButtons.push(addIcon);
				tableContainer.addChild(addIcon);



			} else {
				var basicText = new PIXI.Text("1");
				basicText.interactive = false;
				basicText.hitArea = NO_HIT_AREA;
				basicText.x = xpos;
				basicText.y = ypos;	
				tableContainer.addChild(basicText);	
				rowdat.push(basicText);					
			}


		
			ee_UI_Widgets_cols[j].push(rowdat);
		
		}



	}
	stage.addChild(tableContainer);
	widgets.push(tableContainer);
	{		
		var panel = new PIXI.Graphics();
		var h = PANEL_HEIGHT-EE_MARGINY*2;
		var w = SCROLLBARWIDTH;
		var xpos = PANEL_LEFT+PANEL_WIDTH-SCROLLBARWIDTH-EE_MARGINX;		
		var ypos = PANEL_TOP+EE_MARGINY;
		panel.lineStyle(0);
		panel.beginFill(0x333333, 1);

		panel.drawRect(
			xpos,
			ypos,
			w,
			h
		);
		stage.addChild(panel);				
		widgets.push(panel);	
	}

	{
		var scrollContainer = new PIXI.Container();
		var scrollbarHeight = PANEL_HEIGHT-EE_MARGINY*2;
		var numRows = ee_contents.length+1;
		var pageCount = Math.ceil(numRows/NUMROWS);
		var nubCount = 6;//Math.max(pageCount,6);
		var nubWidth = SCROLLBARWIDTH-2*COLMARGIN;
		var nubHeight = (scrollbarHeight-ROWMARGIN)/nubCount-ROWMARGIN;

		function _scrollbarNubClick(row){
			return function(){
				ee_scrollpos=row;
				updateEventEditor();
			}
		}

		for (var i=0;i<nubCount/*pageCount*/;i++){			
			var panel = new PIXI.Graphics();
			var h = nubHeight;
			var w = SCROLLBARWIDTH-2*ROWMARGIN;
			var xpos = PANEL_LEFT+PANEL_WIDTH-SCROLLBARWIDTH-EE_MARGINX+ROWMARGIN;		
			var ypos = PANEL_TOP+EE_MARGINY+ROWMARGIN+i*(nubHeight+ROWMARGIN);
			panel.lineStyle(0);
			panel.beginFill(0xffffff, 1);

			panel.drawRect(
				xpos,
				ypos,
				w,
				h
			);


			OnButtonClick(panel, _scrollbarNubClick(i));
			
			ee_GUI_scrollbuttons.push(panel);			
			scrollContainer.addChild(panel);
		}

		stage.addChild(scrollContainer);
		widgets.push(scrollContainer);
	}

	{		
		var modalContainer = new PIXI.Container();
		var meshtex = PIXI.Texture.fromImage("gfx/ui/bgmesh.png",null,PIXI.SCALE_MODES.NEAREST);

		ee_GUI_modalbackdrop = new PIXI.extras.TilingSprite(meshtex,GAME_WIDTH,GAME_HEIGHT);
		modalContainer.addChild(ee_GUI_modalbackdrop);
		ee_GUI_modalbackdrop.interactive=true;
		OnButtonClick(ee_GUI_modalbackdrop, hideModalContainer);
		ee_spriteDialog = new PIXI.Graphics();
		var spriteDialogCenterX = PANEL_LEFT + PANEL_WIDTH / 2;
		var spriteDialogCenterY = PANEL_TOP + PANEL_HEIGHT / 2;
		var spriteDialogWidth = 8*(ROWHEIGHT+COLMARGIN)+COLMARGIN;
		var spriteDialogHeight = 4*(ROWHEIGHT+COLMARGIN)+COLMARGIN;

		ee_spriteDialog.lineStyle(2,0xEF5350);
		ee_spriteDialog.beginFill(ROWCOL1[i%2], 1);

		var spx = spriteDialogCenterX - spriteDialogWidth / 2;
		var spy = spriteDialogCenterY - spriteDialogHeight / 2;
		ee_spriteDialog.drawRect(
			spx,
			spy,
			spriteDialogWidth,
			spriteDialogHeight
		);
		ee_spriteDialog.interactive=true;

		for (var i=0;i<8;i++){
			for (var j=0;j<4;j++){
				var bx = spx + ROWMARGIN + (ROWMARGIN + ROWHEIGHT) * i;
				var by = spy + ROWMARGIN + (ROWMARGIN + ROWHEIGHT) * j;

				var panel2 = new PIXI.Graphics();
				var ph = ROWHEIGHT;
				var pw = ROWHEIGHT;
				var pxpos = bx;
				var pypos = by;
				panel2.lineStyle(0);
				panel2.beginFill(0x000000, 1);

				panel2.drawRect(
					pxpos,
					pypos,
					ROWHEIGHT,
					ROWHEIGHT
				);
				ee_spriteDialog.addChild(panel2);				
				widgets.push(panel2);	
				

				if (i<4){				
					var preview = new PIXI.Sprite(spriteTextures[i+4*j]);
					preview.position.x=pxpos;
					preview.position.y=pypos;
					preview.width=ROWHEIGHT;
					preview.height=ROWHEIGHT;
					preview.hitArea = NO_HIT_AREA;
					panel2.addChild(preview);				
					widgets.push(preview);	
				} else {
					var text = ((i-4)+4*j+1).toString();
					window.console.log(text);
					var basicText = new PIXI.Text(text,
						{fill : 0xffffff});
					basicText.interactive = false;
					basicText.hitArea = NO_HIT_AREA;
					basicText.x = pxpos+ROWHEIGHT/2-basicText.width/2;
					basicText.y = pypos+ROWHEIGHT/2-basicText.height/2;	
					panel2.addChild(basicText);				
					widgets.push(basicText);

				}
			}
		}

		modalContainer.addChild(ee_spriteDialog);
	}


	ee_spriteDialog.visible=false;
	ee_GUI_modalbackdrop.visible=false;
	stage.addChild(modalContainer);	
	widgets.push(modalContainer)
	

	updateEventEditor();

	return widgets;
}