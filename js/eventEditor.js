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

var cellWidths = [0.05,0.05,0.45,0.45];

var ee_contents = [
//	flag	flag	condition text		action text
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
	[ 1, 0, ["TOUCHES",1,3], ["SAY","hellooo is anyone here?"]],
	[ 1, 0, ["WANTS",2,1], ["DESTROY",2]],
	[ 1, 0, ["LEAVES AREA",2], ["DESTROY",2]],
];


function makeEventEditor(){
	var widgets = [];

	var RowWidth = PANEL_WIDTH-2*EE_MARGINX-SCROLLBARWIDTH-COLMARGIN;

	//draw cells
	for (var i=0;i<NUMROWS;i++)
	{
		var ypos=PANEL_TOP+EE_MARGINY;
		var h = ROWHEIGHT;
		ypos+=i*(h+ROWMARGIN);

		var xoffset=PANEL_LEFT+EE_MARGINX;
		for (var j=0;j<cellWidths.length;j++){		
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill(ROWCOL1[i%2], 1);
			
			var xpos=xoffset;
			var w = cellWidths[j]*RowWidth;
			if (j<cellWidths.length-1){
				w-=COLMARGIN;
			}

			panel.drawRect(
				xpos,
				ypos,
				w,
				h
			);
			stage.addChild(panel);				
			widgets.push(panel);


			xoffset+=cellWidths[j]*RowWidth;

			if(i<ee_contents.length){

				if (j===2){
					if (ee_contents[i][j].length>1){
						var panel = new PIXI.Graphics();
						var ph = ROWHEIGHT-2*COLMARGIN;
						var pw = ROWHEIGHT-2*COLMARGIN;
						var pxpos = xpos+COLMARGIN;
						var pypos = ypos+COLMARGIN;
						panel.lineStyle(1,0xffffff);
						panel.beginFill(0x000000, 1);

						panel.drawRect(
							pxpos,
							pypos,
							pw,
							ph
						);
						stage.addChild(panel);				
						widgets.push(panel);

						panel.interactive = true;
						panel.buttonMode = true;	

						var preview = new PIXI.Sprite(spriteTextures[0]);
						preview.position.x=xpos+COLMARGIN;
						preview.position.y=ypos+COLMARGIN;
						preview.width=ROWHEIGHT-2*COLMARGIN;
						preview.height=ROWHEIGHT-2*COLMARGIN;
						preview.hitArea = NO_HIT_AREA;
						stage.addChild(preview);				
						widgets.push(preview);	
					}

					var basicText = new PIXI.Text(ee_contents[i][j][0]);
					basicText.interactive = false;
					basicText.hitArea = NO_HIT_AREA;
					basicText.x = xpos+COLMARGIN*3+ROWHEIGHT-2*COLMARGIN;
					basicText.y = ypos+(ROWHEIGHT)/2-basicText.height/2;	
					stage.addChild(basicText);				
					widgets.push(basicText);


					if (ee_contents[i][j].length>0){
						var panel = new PIXI.Graphics();
						var ph = ROWHEIGHT-2*COLMARGIN;
						var pw = ROWHEIGHT-2*COLMARGIN;
						var pxpos = basicText.x+basicText.width+2*COLMARGIN;
						var pypos = ypos+COLMARGIN;
						panel.lineStyle(1,0xffffff);
						panel.beginFill(0x000000, 1);

						panel.drawRect(
							pxpos,
							pypos,
							pw,
							ph
						);
						stage.addChild(panel);				
						widgets.push(panel);	
						
						panel.interactive = true;
						panel.buttonMode = true;	

						var preview = new PIXI.Sprite(spriteTextures[0]);
						preview.position.x=basicText.x+basicText.width+2*COLMARGIN;
						preview.position.y=ypos+COLMARGIN;
						preview.width=ROWHEIGHT-2*COLMARGIN;
						preview.height=ROWHEIGHT-2*COLMARGIN;
						preview.hitArea = NO_HIT_AREA;
						stage.addChild(preview);				
						widgets.push(preview);	
					}

				} else {
					var basicText = new PIXI.Text(ee_contents[i][j]);
					basicText.interactive = false;
					basicText.hitArea = NO_HIT_AREA;
					basicText.x = xpos;
					basicText.y = ypos;	
					stage.addChild(basicText);				
					widgets.push(basicText);						
				}

	
			}

		
		}



	}

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
		var scrollbarHeight = PANEL_HEIGHT-EE_MARGINY*2;
		var numRows = ee_contents.length+1;
		var pageCount = Math.ceil(numRows/NUMROWS);
		var nubCount = Math.max(pageCount,6);
		var nubWidth = SCROLLBARWIDTH-2*COLMARGIN;
		var nubHeight = (scrollbarHeight-ROWMARGIN)/nubCount-ROWMARGIN;
		for (var i=0;i<pageCount;i++){			
			var panel = new PIXI.Graphics();
			var h = nubHeight;
			var w = SCROLLBARWIDTH-2*ROWMARGIN;
			var xpos = PANEL_LEFT+PANEL_WIDTH-SCROLLBARWIDTH-EE_MARGINX+ROWMARGIN;		
			var ypos = PANEL_TOP+EE_MARGINY+ROWMARGIN+i*(nubHeight+ROWMARGIN);
			panel.lineStyle(0);
			panel.beginFill(i===3?0x999999:0x000000, 1);

			panel.drawRect(
				xpos,
				ypos,
				w,
				h
			);
			stage.addChild(panel);				
			widgets.push(panel);
		}
	}
/*
	var numRows = ee_contents.length+1;
	var pcDisplayable = numRows/NUMROWS;
	if (pcDisplayable>1){
		//draw scrollbar
		{		
			var panel = new PIXI.Graphics();
			var h = PANEL_HEIGHT-EE_MARGINY*2-(SCROLLBARBUTTONHEIGHT+EE_MARGINY)*2;
			var w = SCROLLBARWIDTH;
			var xpos = PANEL_LEFT+PANEL_WIDTH-SCROLLBARWIDTH-EE_MARGINX;		
			var ypos = PANEL_TOP+EE_MARGINY+SCROLLBARBUTTONHEIGHT+EE_MARGINY;
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

		//draw handle
		{
			var panel = new PIXI.Graphics();
			var h = PANEL_HEIGHT-EE_MARGINY * 2-(SCROLLBARBUTTONHEIGHT+EE_MARGINY)*2;
			h/=pcDisplayable;
			var w = SCROLLBARWIDTH - COLMARGIN;
			var xpos = PANEL_LEFT+PANEL_WIDTH-SCROLLBARWIDTH-EE_MARGINX+COLMARGIN/2;		
			var ypos = PANEL_TOP+EE_MARGINY+SCROLLBARBUTTONHEIGHT+EE_MARGINY;
			panel.lineStyle(0);
			panel.beginFill(0x666666, 1);

			panel.drawRect(
				xpos,
				ypos,
				w,
				h
			);
			stage.addChild(panel);				
			widgets.push(panel);	
		}

		
	}

	{
		var panel = new PIXI.Graphics();
		var h = SCROLLBARBUTTONHEIGHT;
		var w = SCROLLBARWIDTH;
		var xpos = PANEL_LEFT+PANEL_WIDTH-SCROLLBARWIDTH-EE_MARGINX;		
		var ypos = PANEL_TOP+EE_MARGINY;
		panel.lineStyle(0);
		panel.beginFill(0x555555, 1);

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

		var panel = new PIXI.Graphics();
		var h = SCROLLBARBUTTONHEIGHT;
		var w = SCROLLBARWIDTH;
		var xpos = PANEL_LEFT+PANEL_WIDTH-SCROLLBARWIDTH-EE_MARGINX;		
		var ypos = PANEL_TOP+EE_MARGINY+PANEL_HEIGHT-EE_MARGINY*2-(SCROLLBARBUTTONHEIGHT);
		panel.lineStyle(0);
		panel.beginFill(0x555555, 1);

		panel.drawRect(
			xpos,
			ypos,
			w,
			h
		);
		stage.addChild(panel);				
		widgets.push(panel);	
	}*/

	{
		var meshtex = PIXI.Texture.fromImage("gfx/ui/bgmesh.png",null,PIXI.SCALE_MODES.NEAREST);

		var modalGrey = new PIXI.extras.TilingSprite(meshtex,GAME_WIDTH,GAME_HEIGHT);
		widgets.push(modalGrey);
		stage.addChild(modalGrey);

		var spriteDialog = new PIXI.Graphics();
		var spriteDialogCenterX = PANEL_LEFT + PANEL_WIDTH / 2;
		var spriteDialogCenterY = PANEL_TOP + PANEL_HEIGHT / 2;
		var spriteDialogWidth = 8*(ROWHEIGHT+COLMARGIN)+COLMARGIN;
		var spriteDialogHeight = 4*(ROWHEIGHT+COLMARGIN)+COLMARGIN;

		spriteDialog.lineStyle(2,0xEF5350);
		spriteDialog.beginFill(ROWCOL1[i%2], 1);

		var spx = spriteDialogCenterX - spriteDialogWidth / 2;
		var spy = spriteDialogCenterY - spriteDialogHeight / 2;
		spriteDialog.drawRect(
			spx,
			spy,
			spriteDialogWidth,
			spriteDialogHeight
		);

		for (var i=0;i<8;i++){
			for (var j=0;j<4;j++){
				var bx = spx + ROWMARGIN + (ROWMARGIN + ROWHEIGHT) * i;
				var by = spy + ROWMARGIN + (ROWMARGIN + ROWHEIGHT) * j;

				var panel = new PIXI.Graphics();
				var ph = ROWHEIGHT;
				var pw = ROWHEIGHT;
				var pxpos = bx;
				var pypos = by;
				panel.lineStyle(0);
				panel.beginFill(0x000000, 1);

				panel.drawRect(
					pxpos,
					pypos,
					ROWHEIGHT,
					ROWHEIGHT
				);
				spriteDialog.addChild(panel);				
				widgets.push(panel);	
				

				if (i<4){				
					var preview = new PIXI.Sprite(spriteTextures[i+4*j]);
					preview.position.x=pxpos;
					preview.position.y=pypos;
					preview.width=ROWHEIGHT;
					preview.height=ROWHEIGHT;
					preview.hitArea = NO_HIT_AREA;
					panel.addChild(preview);				
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
					panel.addChild(basicText);				
					widgets.push(basicText);

				}
			}
		}

		stage.addChild(spriteDialog);
		widgets.push(spriteDialog);
	}


	stage.addChild(panel);	
	widgets.push(panel)
	


	return widgets;
}