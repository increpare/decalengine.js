var SC_THUMBNAIL_HEIGHT = 60;
var SC_THUMBNAIL_WIDTH = 60;
var SC_THUMBNAIL_H_MARGIN = 5;
var SC_THUMBNAIL_V_MARGIN = 5;

var SC_THUMBNAIL_COLUMNS = 2;
var SC_THUMBNAIL_ROWS = 8;
var SC_THUMBNAIL_H_OFFSET = PANEL_WIDTH-(SC_THUMBNAIL_COLUMNS-1)*(SC_THUMBNAIL_WIDTH+SC_THUMBNAIL_H_MARGIN);
var SC_THUMBNAIL_V_OFFSET = PANEL_TOP+SC_THUMBNAIL_V_MARGIN;

var SPRITE_CANVAS_SIZE = PANEL_WIDTH-4*SC_THUMBNAIL_WIDTH-6*SC_THUMBNAIL_H_MARGIN-200;
var SPRITE_CANVAS_LEFT = PANEL_WIDTH-SPRITE_CANVAS_SIZE-3*SC_THUMBNAIL_WIDTH-4*SC_THUMBNAIL_H_MARGIN;
var SPRITE_CANVAS_TOP = SC_THUMBNAIL_V_OFFSET+2;
	
var SC_RENDER_TEXTURE_SIZE=SPRITE_CANVAS_SIZE;

var se_spriteCanvasContents;
var sc_spriteSelectionIcon;

var scene_editor_container_container;
var scene_editor_container;
var scene_editor_container_FG;

var SE_CANVAS_LEFT = 2*SC_THUMBNAIL_H_MARGIN;
var SE_CANVAS_TOP = SC_THUMBNAIL_V_OFFSET;
var SE_CANVAS_R = SC_THUMBNAIL_H_OFFSET+(SC_THUMBNAIL_WIDTH+SC_THUMBNAIL_H_MARGIN)*(-2)-SC_THUMBNAIL_H_MARGIN*2;
var SE_CANVAS_B = GAME_HEIGHT-SC_THUMBNAIL_V_MARGIN*2;
var SE_CANVAS_WIDTH = SE_CANVAS_R - SE_CANVAS_LEFT;
var SE_CANVAS_HEIGHT = SE_CANVAS_B - SE_CANVAS_TOP;


var textIcon = PIXI.Texture.fromImage("gfx/ui/textbutton.png");

var se_colorSelected = 0;

function SE_KeyPress(event){
	var target_index = se_spriteCanvasContents.target;
	if (target_index<0){
		return;
	}

	var target = se_spriteCanvasContents.contents[target_index];
	var isText = 'text' in target;
	if (isText){
		var key = event.keyCode;
		var t = target.text;
	    if( key == 8 || key == 46 ){	    	
	    	if (t.length>0){
	    		target.text = t.substring(0,target.text.length-1);
	    	}
	    } else {
			var keyt = String.fromCharCode(key);
			target.text = target.text + keyt;
	    }
	}
}

function SE_AddText(
					text,
					colIndex,
					x,
					y,
					rotation,
					scalex,
					scaley)
{	

	var icon = new PIXI.Text(text,{font : '425px Arial', fill : COLORS[colIndex], align : 'center'});	
	icon.interactive=true;
	icon.anchor.x=0.5;
	icon.anchor.y=0.5;
	icon.scale.x=scalex;
	icon.scale.y=scaley;
	icon.position.x=x;
	icon.position.y=y;
	icon.rotation=rotation;
	//icon.tint=Math.floor(Math.random()*0xffffff);				
	scene_editor_container.addChild(icon);
	icon.hitArea = new PIXI.Rectangle(
								-SC_RENDER_TEXTURE_SIZE/2,
								-SC_RENDER_TEXTURE_SIZE/2,
								SC_RENDER_TEXTURE_SIZE,
								SC_RENDER_TEXTURE_SIZE);
	se_spriteCanvasContents.contents.push(icon);				
}

function SE_NewText()
{	
	window.console.log("newtext");
	SE_AddText(
				"TEXT",
				0,
				SE_CANVAS_LEFT+SE_CANVAS_WIDTH/2,
				SE_CANVAS_TOP+SE_CANVAS_HEIGHT/2,
				0,
				.25,
				.25
				)
	se_spriteCanvasContents.selectObject(se_spriteCanvasContents.contents.length-1);
	SE_OnModified(
		se_spriteCanvasContents.contents.length-1,
		-1,
		colorSelected,
		maskSelected);
}

function SE_AddSprite(
					shapeIndex,
					colIndex,
					maskIndex,
					x,
					y,
					rotation,
					scalex,
					scaley)
{				
	var icon = new PIXI.Sprite(spriteTextures[shapeIndex]);
	icon.interactive=true;
	icon.anchor.x=0.5;
	icon.anchor.y=0.5;
	icon.scale.x=scalex;
	icon.scale.y=scaley;
	icon.position.x=x;
	icon.position.y=y;
	icon.rotation=rotation;
	//icon.tint=Math.floor(Math.random()*0xffffff);				
	scene_editor_container.addChild(icon);
	icon.hitArea = new PIXI.Rectangle(
								-SC_RENDER_TEXTURE_SIZE/2,
								-SC_RENDER_TEXTURE_SIZE/2,
								SC_RENDER_TEXTURE_SIZE,
								SC_RENDER_TEXTURE_SIZE);
	se_spriteCanvasContents.contents.push(icon);				
}

function SE_OnModified(){

}

function SE_SpriteSelect(idx){
	window.console.log(idx);
	SE_AddSprite(
				idx,
				colorSelected,
				maskSelected,
				SE_CANVAS_LEFT+SE_CANVAS_WIDTH/2,
				SE_CANVAS_TOP+SE_CANVAS_HEIGHT/2,
				0,
				.25,
				.25
				);
	se_spriteCanvasContents.selectObject(se_spriteCanvasContents.contents.length-1);
	SE_OnModified(
		se_spriteCanvasContents.contents.length-1,
		idx,
		se_colorSelected,
		maskSelected);
}

function onSelectColor(col){
	se_colorSelected=col;

	if (se_spriteCanvasContents.target>=0){
		var t = se_spriteCanvasContents.contents[se_spriteCanvasContents.target];
		t.tint=COLORS[col];

		SE_OnModified(
			se_spriteCanvasContents.target,
			undefined,
			se_colorSelected,
			maskSelected);
	}
	SetPalleteSelections();
}
function makeSceneEditor(){
	var widgets = [];


	//text button icon
	{
		var panel = new PIXI.Graphics();
		panel.lineStyle(0);
		panel.beginFill(0x555555, 1);
		var i=0;
		var j=0;
		var xpos = SC_THUMBNAIL_H_OFFSET+(SC_THUMBNAIL_WIDTH+SC_THUMBNAIL_H_MARGIN)*(i-2);
		var ypos = SC_THUMBNAIL_V_OFFSET+(SC_THUMBNAIL_HEIGHT+SC_THUMBNAIL_V_MARGIN)*j;
		panel.drawRect(
			xpos,
			ypos,
			SC_THUMBNAIL_WIDTH,
			SC_THUMBNAIL_HEIGHT
		);
		stage.addChild(panel);				
		widgets.push(panel);	


		var pmargin=2;
		var icon = new PIXI.Sprite(textIcon);
		panel.addChild(icon);
		icon.anchor.x=0;
		icon.anchor.y=0;			
		icon.width=SC_THUMBNAIL_WIDTH;
		icon.height=SC_THUMBNAIL_HEIGHT;
		icon.position.x=xpos+pmargin;
		icon.position.y=ypos+pmargin;
		icon.interactive = true;
		icon.buttonMode = true;

		icon
		    // set the mousedown and touchstart callback...
		    .on('mousedown', SE_NewText)
		    .on('touchstart', SE_NewText)

		widgets.push(icon);	
	}

	//color palette selection
	{
		for (var i=0;i<2;i++){
			for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){
				var di=10.5;
				var dj=2;
				var index=i*8+j;
				//COLOR PALETTE SELECTOR
				var panel = new PIXI.Graphics();
				panel.lineStyle(0);
				panel.beginFill(COLORS[index], 1);
				panel.drawRect(
					SPR_THUMBNAIL_H_MARGIN*2+(SPR_THUMBNAIL_H_MARGIN+SPR_THUMBNAIL_WIDTH)*(i/2+di+2)+6,
					SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT/2+SPR_THUMBNAIL_V_MARGIN/2)*(j+dj),
					SPR_THUMBNAIL_WIDTH/2,
					SPR_THUMBNAIL_HEIGHT/2-SPR_THUMBNAIL_V_MARGIN/2
				);


				panel.interactive = true;
				panel.buttonMode = true;			


				function _down(idx){
					return function(){
						onSelectColor(idx);
					}
				}

				panel
					// set the mousedown and touchstart callback...
					.on('mousedown', _down(index))
					.on('touchstart', _down(index));

				stage.addChild(panel);

				widgets.push(panel);			
			}
		}
	}

	for (var i=0;i<SC_THUMBNAIL_COLUMNS;i++){
		for (var j=0;j<8;j++){
			var index = i*SC_THUMBNAIL_ROWS+j;
			//RIGHT COLUMN
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill(0x555555, 1);
			var xpos = SC_THUMBNAIL_H_OFFSET+(SC_THUMBNAIL_WIDTH+SC_THUMBNAIL_H_MARGIN)*(i-1);
			var ypos = SC_THUMBNAIL_V_OFFSET+(SC_THUMBNAIL_HEIGHT+SC_THUMBNAIL_V_MARGIN)*j;
			panel.drawRect(
				xpos,
				ypos,
				SC_THUMBNAIL_WIDTH,
				SC_THUMBNAIL_HEIGHT
			);
			stage.addChild(panel);				
			widgets.push(panel);	

			var preview = new PIXI.Sprite(spriteTextures[i*8+j]);
			preview.position.x=xpos;
			preview.position.y=ypos;
			preview.width=SC_THUMBNAIL_WIDTH;
			preview.height=SC_THUMBNAIL_HEIGHT;
			preview.hitArea = NO_HIT_AREA;


			panel.interactive = true;
			panel.buttonMode = true;

			function _sprselecthover(){
//				this.tint=dat.hoverCol;
			}

			function _sprselectregular(){
//				this.tint=dat.mainCol;
			}


			function _sprselectdown(idx){
				return function(){
//					this.tint=dat.downCol;
					SE_SpriteSelect(idx);
				}
			}

			panel
			    // set the mousedown and touchstart callback...
			    .on('mousedown', _sprselectdown(index))
			    .on('touchstart', _sprselectdown(index))

			    // set the mouseup and touchend callback...
			    .on('mouseup', _sprselectregular)
			    .on('touchend', _sprselectregular)
			    .on('mouseupoutside', _sprselectregular)
			    .on('touchendoutside', _sprselectregular)


			stage.addChild(preview);
			widgets.push(preview);			
		}
	}

 	scene_editor_container_container = new PIXI.Container();	
 	scene_editor_container_container.position.x=0;
 	scene_editor_container_container.position.y=0;


 	scene_editor_container = new PIXI.Container();	
 	scene_editor_container.position.x=0;
 	scene_editor_container.position.y=0;

 	scene_editor_container_FG = new PIXI.Container();	
 	scene_editor_container_FG.position.x=0;
 	scene_editor_container_FG.position.y=0;

	var canvaspanel = new PIXI.Graphics();
	var bg_panel_ypos = SPR_THUMBNAIL_V_OFFSET+2;
	canvaspanel.lineStyle(0);
	canvaspanel.beginFill(0x555555, 1);
	canvaspanel.drawRect(
		SE_CANVAS_LEFT,
		SE_CANVAS_TOP,
		SE_CANVAS_WIDTH,
		SE_CANVAS_HEIGHT
	);


	var canvaspanel2 = new PIXI.Graphics();
	var bg_panel_ypos = SPR_THUMBNAIL_V_OFFSET+2;
	canvaspanel2.lineStyle(0);
	canvaspanel2.beginFill(0x555555, 1);
	canvaspanel2.drawRect(
		SE_CANVAS_LEFT,
		SE_CANVAS_TOP,
		SE_CANVAS_WIDTH,
		SE_CANVAS_HEIGHT
	);

	stage.addChild(scene_editor_container_container)
	scene_editor_container_container.addChild(scene_editor_container);
	scene_editor_container_container.addChild(scene_editor_container_FG);
	
	scene_editor_container_container.mask = canvaspanel;
	scene_editor_container.addChild(canvaspanel);
	scene_editor_container.addChild(canvaspanel2);
	
	se_spriteCanvasContents = CreateInteractiveCanvas(
								SE_CANVAS_LEFT,
								SE_CANVAS_TOP,
								SE_CANVAS_WIDTH,
								SE_CANVAS_HEIGHT,
								scene_editor_container,
								scene_editor_container_FG,
								SE_OnModified,
								SC_RENDER_TEXTURE_SIZE
								);

	widgets.push(scene_editor_container_container);
	widgets.push(scene_editor_container);
	widgets.push(scene_editor_container_FG);
	widgets.push(canvaspanel);	

	return widgets;
}