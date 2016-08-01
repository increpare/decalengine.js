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
	spriteCanvasContents.selectObject(spriteCanvasContents.contents.length-1);
	SE_OnModified(
		spriteCanvasContents.contents.length-1,
		idx,
		colorSelected,
		maskSelected);
}

function makeSceneEditor(){
	var widgets = [];

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