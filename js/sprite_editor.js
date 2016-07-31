var SPR_THUMBNAIL_HEIGHT = 60;
var SPR_THUMBNAIL_WIDTH = 60;
var SPR_THUMBNAIL_H_MARGIN = 5;
var SPR_THUMBNAIL_V_MARGIN = 5;

var SPR_THUMBNAIL_COLUMNS = 2;
var SPR_THUMBNAIL_ROWS = 0;
var SPR_THUMBNAIL_H_OFFSET = 0;
var SPR_THUMBNAIL_V_OFFSET = PANEL_TOP+SPR_THUMBNAIL_V_MARGIN;

var SPRITE_CANVAS_SIZE = PANEL_WIDTH-4*SPR_THUMBNAIL_WIDTH-6*SPR_THUMBNAIL_H_MARGIN-200;
var SPRITE_CANVAS_LEFT = PANEL_WIDTH-SPRITE_CANVAS_SIZE-3*SPR_THUMBNAIL_WIDTH-4*SPR_THUMBNAIL_H_MARGIN;
var SPRITE_CANVAS_TOP = SPR_THUMBNAIL_V_OFFSET+2;
	
var SPR_RENDER_TEXTURE_SIZE=SPRITE_CANVAS_SIZE;

var sprite_editor_container_container;
var sprite_editor_container;
var sprite_editor_container_FG;

var spriteCanvasContents;

var masks = [];

var colorSelected=2;
var maskSelected=0;
var spriteSelected=0;

var paletteSelectionIcons = [new PIXI.Graphics(),new PIXI.Graphics()];
var spriteSelectionIcon = null;

var textures=[];

//	shapeIndex, 
//	colIndex, 
//	maskIndex,
//	spr.position.x,
//	spr.position.y,
//	spr.rotation,
//	spr.scale.x,
//	spr.scale.y						
var SPRITES = [];
for (var i=0;i<SPR_THUMBNAIL_COLUMNS*8;i++){
	SPRITES.push([]);
}


var render_transform = new PIXI.Matrix();	
render_transform.translate(-SPRITE_CANVAS_LEFT,-SPRITE_CANVAS_TOP);

function OnModified(index,shapeIndex,colIndex, maskIndex){
	spriteTextures[spriteSelected].render(
										sprite_editor_container,
										render_transform,
										true,
										true
										);

	var spr = spriteCanvasContents.contents[index];
	if (index>=SPRITES[spriteSelected].length){
		//add new sprite
		var entry = [ 
						shapeIndex, 	//0
						colIndex, 		//1
						maskIndex,		//2
						spr.position.x,	//3
						spr.position.y,	//4
						spr.rotation,	//5
						spr.scale.x,	//6
						spr.scale.y 	//7
					];
		SPRITES[spriteSelected].push(entry);
	} else {
		//modify existing sprite
		var entry = SPRITES[spriteSelected][index];
		if (colIndex!==undefined){
			entry[1]=colIndex;
		}
		if (maskIndex!==undefined){
			entry[2]=maskIndex;
		}
		entry[3]=spr.position.x;
		entry[4]=spr.position.y;
		entry[5]=spr.rotation;
		entry[6]=spr.scale.x;
		entry[7]=spr.scale.y;
	}
}


function SetPalleteSelections(){
	var i = Math.floor(colorSelected/8);
	var j = colorSelected%8;
	var posx = SPR_THUMBNAIL_H_MARGIN*2+(SPR_THUMBNAIL_H_MARGIN+SPR_THUMBNAIL_WIDTH)*(i+2)
	var posy = SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT/2+SPR_THUMBNAIL_V_MARGIN/2)*j;				
	paletteSelectionIcons[0].position.x = posx-2;
	paletteSelectionIcons[0].position.y = posy-2;

	i = Math.floor(maskSelected/8);
	j = maskSelected%8;
	posx = SPR_THUMBNAIL_H_MARGIN*2+(SPR_THUMBNAIL_H_MARGIN+SPR_THUMBNAIL_WIDTH)*(i+2)
	posy = SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT/2+SPR_THUMBNAIL_V_MARGIN/2)*(j+8);				
	paletteSelectionIcons[1].position.x = posx-2;
	paletteSelectionIcons[1].position.y = posy-2;

	i = Math.floor(spriteSelected/8);
	j = spriteSelected%8;	
	xpos = SPR_THUMBNAIL_H_OFFSET+(SPR_THUMBNAIL_WIDTH+SPR_THUMBNAIL_H_MARGIN)*(i-1);
	ypos = SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT+SPR_THUMBNAIL_V_MARGIN)*j;
	spriteSelectionIcon.position.x = xpos-2;
	spriteSelectionIcon.position.y = ypos-2;

}
function AddSprite(
					shapeIndex,
					colIndex,
					maskIndex,
					x,
					y,
					rotation,
					scalex,
					scaley)
{				
	var icon = new PIXI.Sprite(textures[shapeIndex]);
	icon.interactive=true;
	icon.anchor.x=0.5;
	icon.anchor.y=0.5;
	icon.scale.x=scalex;
	icon.scale.y=scaley;
	icon.position.x=x;
	icon.position.y=y;
	icon.rotation=rotation;
	//icon.tint=Math.floor(Math.random()*0xffffff);				
	sprite_editor_container.addChild(icon);
	icon.hitArea = collisionPolygons["decal"+(shapeIndex+1)];
	icon.tint = COLORS[colIndex];
	spriteCanvasContents.contents.push(icon);				

	var mask = new PIXI.Sprite(masks[maskIndex]);
	icon.addChild(mask);
	icon.mask=mask;
	mask.anchor.x=0.5;
	mask.anchor.y=0.5;
	mask.position.x=0;
	mask.position.y=0;
	mask.rotation=0;
	mask.width=256;
	mask.height=256;
}

function SelectSprite(spr_i){
	if (spr_i===spriteSelected){
		return;
	}
	spriteSelected = spr_i;

	var SpriteDat = SPRITES[spr_i];

	spriteCanvasContents.selectObject(-1);
	
	for (var i=0;i<spriteCanvasContents.contents.length;i++){
		var spr = spriteCanvasContents.contents[i];
		sprite_editor_container.removeChild(spr);
	}
	spriteCanvasContents.contents.length=0;


	for (var i=0;i<SpriteDat.length;i++){
		var e = SpriteDat[i];
		AddSprite(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]);
	}

	SetPalleteSelections();
}

function SelectColor(col){
	colorSelected=col;

	if (spriteCanvasContents.target>=0){
		var t = spriteCanvasContents.contents[spriteCanvasContents.target];
		t.tint=COLORS[col];

		OnModified(
			spriteCanvasContents.target,
			undefined,
			colorSelected,
			maskSelected);
	}
	SetPalleteSelections();
}

function SelectMask(idx){
	maskSelected=idx;
	if (spriteCanvasContents.target>=0){
		var t = spriteCanvasContents.contents[spriteCanvasContents.target];
		var c = t.getChildAt(0);
		c.texture=masks[idx];


		OnModified(
			spriteCanvasContents.target,
			undefined,
			colorSelected,
			maskSelected);
	}
	SetPalleteSelections();
}


var currentSpriteWidgets = [];
function makeSpriteEditor(){
	var widgets = [];

	for (var i=0;i<7*3;i++){
		var tex = new PIXI.RenderTexture(renderer, SPR_RENDER_TEXTURE_SIZE, SPR_RENDER_TEXTURE_SIZE, PIXI.SCALE_MODES.LINEAR, 1);
		spriteTextures.push(tex);
	}

	var count=0;
	for (var right=0;right<PANEL_WIDTH;right++){
		if (right>0){
			right+=SPR_THUMBNAIL_H_MARGIN;			
		}
		right+=SPR_THUMBNAIL_WIDTH;
		count++;
	}
	count--;

	SPR_THUMBNAIL_COLUMNS=2;
	SPR_THUMBNAIL_H_OFFSET = PANEL_WIDTH-(SPR_THUMBNAIL_COLUMNS-1)*(SPR_THUMBNAIL_WIDTH+SPR_THUMBNAIL_H_MARGIN);

	count=0;
	for (var top=PANEL_TOP;top<PANEL_HEIGHT;top++){
		if (top>0){
			top+=SPR_THUMBNAIL_V_MARGIN;			
		}
		top+=SPR_THUMBNAIL_HEIGHT;
		count++;
	}
	count--;

	SPR_THUMBNAIL_ROWS=count;


	for (var i=0;i<2;i++){
		var paletteSelectionIcon = paletteSelectionIcons[i];
		paletteSelectionIcon.lineStyle(0);
		paletteSelectionIcon.beginFill(0xff00ff);
		paletteSelectionIcon.drawRect(
				0,
				0,
				SPR_THUMBNAIL_WIDTH+4,
				SPR_THUMBNAIL_HEIGHT/2-SPR_THUMBNAIL_V_MARGIN/2+4
			);
		stage.addChild(paletteSelectionIcon);
		widgets.push(paletteSelectionIcon);
	}

	spriteSelectionIcon = new PIXI.Graphics();
	spriteSelectionIcon.lineStyle(0);
	spriteSelectionIcon.beginFill(0xff00ff);
	spriteSelectionIcon.drawRect(
				0,
				0,
				SPR_THUMBNAIL_WIDTH+4,
				SPR_THUMBNAIL_HEIGHT+4
			);
	stage.addChild(spriteSelectionIcon);
	widgets.push(spriteSelectionIcon);

	SetPalleteSelections();

	for (var i=0;i<2;i++){
		for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){

			var index=i*8+j;
			//COLOR PALETTE SELECTOR
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill(COLORS[index], 1);
			panel.drawRect(
				SPR_THUMBNAIL_H_MARGIN*2+(SPR_THUMBNAIL_H_MARGIN+SPR_THUMBNAIL_WIDTH)*(i+2),
				SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT/2+SPR_THUMBNAIL_V_MARGIN/2)*j,
				SPR_THUMBNAIL_WIDTH,
				SPR_THUMBNAIL_HEIGHT/2-SPR_THUMBNAIL_V_MARGIN/2
			);


			panel.interactive = true;
			panel.buttonMode = true;

			function _palhover(){
//				this.tint=dat.hoverCol;
			}

			function _palregular(){
//				this.tint=dat.mainCol;
			}


			function _paldown(idx){
				return function(){
//					this.tint=dat.downCol;
					SelectColor(idx);
				}
			}

			panel
			    // set the mousedown and touchstart callback...
			    .on('mousedown', _paldown(index))
			    .on('touchstart', _paldown(index))

			    // set the mouseup and touchend callback...
			    .on('mouseup', _palregular)
			    .on('touchend', _palregular)
			    .on('mouseupoutside', _palregular)
			    .on('touchendoutside', _palregular)

			stage.addChild(panel);

			widgets.push(panel);			
		}
	}

	for (var i=0;i<16;i++){
		masks.push(PIXI.Texture.fromImage("gfx/masks/mask"+(i+1)+".png"));
	}
	

	for (var i=0;i<2;i++){
		for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){

			var index=i*8+j;
			//COLOR PALETTE SELECTOR
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill(0x000000, 1);
			var posx = SPR_THUMBNAIL_H_MARGIN*2+(SPR_THUMBNAIL_H_MARGIN+SPR_THUMBNAIL_WIDTH)*(i+2);
			var posy = SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT/2+SPR_THUMBNAIL_V_MARGIN/2)*(j+8);
			var posw = SPR_THUMBNAIL_WIDTH;
			var posh = SPR_THUMBNAIL_HEIGHT/2-SPR_THUMBNAIL_V_MARGIN/2;
			panel.drawRect(
				posx,
				posy,
				posw,
				posh
			);


			stage.addChild(panel);

			widgets.push(panel);	

			var icon = new PIXI.Sprite(masks[index]);
			icon.anchor.x=0;
			icon.anchor.y=0;			
			icon.width=posw;
			icon.height=posh;
			icon.position.x=posx;
			icon.position.y=posy;
			icon.interactive = true;
			icon.buttonMode = true;

			stage.addChild(icon);

			widgets.push(icon);	

			function _maskhover(){
//				this.tint=dat.hoverCol;
			}

			function _maskregular(){
//				this.tint=dat.mainCol;
			}


			function _maskdown(idx){
				return function(){
//					this.tint=dat.downCol;
					SelectMask(idx);
				}
			}

			icon
			    // set the mousedown and touchstart callback...
			    .on('mousedown', _maskdown(index))
			    .on('touchstart', _maskdown(index))

			    // set the mouseup and touchend callback...
			    .on('mouseup', _maskregular)
			    .on('touchend', _maskregular)
			    .on('mouseupoutside', _maskregular)
			    .on('touchendoutside', _maskregular)
		
		}
	}




	for (var i=0;i<SPR_THUMBNAIL_COLUMNS;i++){
		for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){
			var index = 8*i+j;

			
			//LEFT COLUMN
			var iconbutton = new PIXI.Graphics();
			var xpos = SPR_THUMBNAIL_H_MARGIN*2+(SPR_THUMBNAIL_H_MARGIN+SPR_THUMBNAIL_WIDTH)*i;
			var ypos = SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT+SPR_THUMBNAIL_V_MARGIN)*j;
			iconbutton.lineStyle(0);
			iconbutton.beginFill(0x555555, 1);
			iconbutton.drawRect(
				xpos,
				ypos,
				SPR_THUMBNAIL_WIDTH,
				SPR_THUMBNAIL_HEIGHT
			);
			stage.addChild(iconbutton);
			iconbutton.interactive=true;
			iconbutton.buttonMode = true;
			iconbutton.defaultCursor='grab';
			widgets.push(iconbutton);	
			

			var texture = PIXI.Texture.fromImage("gfx/decals/decal"+(index+1)+".png");
			textures.push(texture);
			var icon = new PIXI.Sprite(texture);
			icon.anchor.x = 0;
			icon.anchor.y = 0;
			icon.height = SPR_THUMBNAIL_HEIGHT-4;
			icon.width = SPR_THUMBNAIL_WIDTH-4;
			icon.position.x = xpos+2;
			icon.position.y = ypos+2;
			icon.hitArea = NO_HIT_AREA;

			

			function onClick(idx){
				window.console.log(idx);
				AddSprite(
							idx,
							colorSelected,
							maskSelected,
							SPRITE_CANVAS_LEFT+SPRITE_CANVAS_SIZE/2,
							SPRITE_CANVAS_TOP+SPRITE_CANVAS_SIZE/2,
							0,
							0.8,
							0.8
							);
				spriteCanvasContents.selectObject(spriteCanvasContents.contents.length-1);
				OnModified(
					spriteCanvasContents.contents.length-1,
					idx,
					colorSelected,
					maskSelected);
			}

			function _hover(){
//				this.tint=dat.hoverCol;
			}

			function _regular(){
//				this.tint=dat.mainCol;
			}


			function _down(idx){
				return function(){
//					this.tint=dat.downCol;
					onClick(idx);
				}
			}

			iconbutton
			    // set the mousedown and touchstart callback...
			    .on('mousedown', _down(index))
			    .on('touchstart', _down(index))

			    // set the mouseup and touchend callback...
			    .on('mouseup', _regular)
			    .on('touchend', _regular)
			    .on('mouseupoutside', _regular)
			    .on('touchendoutside', _regular)

			    // set the mouseover callback...
			    .on('mouseover', _hover)

			    // set the mouseout callback...
			    .on('mouseout', _regular);


			stage.addChild(icon);		
			widgets.push(icon);	
		}
	}




	for (var i=0;i<SPR_THUMBNAIL_COLUMNS;i++){
		for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){
			var index = i*SPR_THUMBNAIL_ROWS+j;
			//RIGHT COLUMN
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill(0x555555, 1);
			var xpos = SPR_THUMBNAIL_H_OFFSET+(SPR_THUMBNAIL_WIDTH+SPR_THUMBNAIL_H_MARGIN)*(i-1);
			var ypos = SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT+SPR_THUMBNAIL_V_MARGIN)*j;
			panel.drawRect(
				xpos,
				ypos,
				SPR_THUMBNAIL_WIDTH,
				SPR_THUMBNAIL_HEIGHT
			);
			stage.addChild(panel);				
			widgets.push(panel);	

			var preview = new PIXI.Sprite(spriteTextures[i*8+j]);
			preview.position.x=xpos;
			preview.position.y=ypos;
			preview.width=SPR_THUMBNAIL_WIDTH;
			preview.height=SPR_THUMBNAIL_HEIGHT;
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
					SelectSprite(idx);
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

		
 	sprite_editor_container_container = new PIXI.Container();	
 	sprite_editor_container_container.position.x=0;
 	sprite_editor_container_container.position.y=0;


 	sprite_editor_container = new PIXI.Container();	
 	sprite_editor_container.position.x=0;
 	sprite_editor_container.position.y=0;

 	sprite_editor_container_FG = new PIXI.Container();	
 	sprite_editor_container_FG.position.x=0;
 	sprite_editor_container_FG.position.y=0;

	var canvaspanel = new PIXI.Graphics();
	var bg_panel_ypos = SPR_THUMBNAIL_V_OFFSET+2;
	canvaspanel.lineStyle(0);
	canvaspanel.beginFill(0x555555, 1);
	canvaspanel.drawRect(
		SPRITE_CANVAS_LEFT,
		SPRITE_CANVAS_TOP,
		SPRITE_CANVAS_SIZE,
		SPRITE_CANVAS_SIZE
	);


	var canvaspanel2 = new PIXI.Graphics();
	var bg_panel_ypos = SPR_THUMBNAIL_V_OFFSET+2;
	canvaspanel2.lineStyle(0);
	canvaspanel2.beginFill(0x555555, 1);
	canvaspanel2.drawRect(
		SPRITE_CANVAS_LEFT,
		SPRITE_CANVAS_TOP,
		SPRITE_CANVAS_SIZE,
		SPRITE_CANVAS_SIZE
	);

	
	stage.addChild(sprite_editor_container_container)
	sprite_editor_container_container.addChild(sprite_editor_container);
	sprite_editor_container_container.addChild(sprite_editor_container_FG);
	
	sprite_editor_container_container.mask = canvaspanel;
	sprite_editor_container.addChild(canvaspanel);
	sprite_editor_container.addChild(canvaspanel2);
	
	spriteCanvasContents = CreateInteractiveCanvas(
								SPRITE_CANVAS_LEFT,
								SPRITE_CANVAS_TOP,
								SPRITE_CANVAS_SIZE,
								SPRITE_CANVAS_SIZE,
								sprite_editor_container,
								sprite_editor_container_FG,
								OnModified
								);

	widgets.push(sprite_editor_container_container);
	widgets.push(sprite_editor_container);
	widgets.push(sprite_editor_container_FG);
	widgets.push(canvaspanel);	


	//draw left/rigth buttons at bottom	
	return widgets;
}