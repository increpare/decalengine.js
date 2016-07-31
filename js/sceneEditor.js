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

var sc_spriteSelectionIcon;

function SE_SpriteSelect(idx){

}

function makeSceneEditor(){
	var widgets = [];

	for (var i=0;i<SC_THUMBNAIL_COLUMNS;i++){
		for (var j=0;j<9;j++){
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


	return widgets;
}