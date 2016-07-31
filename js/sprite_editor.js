var SPR_THUMBNAIL_HEIGHT = 60;
var SPR_THUMBNAIL_WIDTH = 60;
var SPR_THUMBNAIL_H_MARGIN = 5;
var SPR_THUMBNAIL_V_MARGIN = 5;

var SPR_THUMBNAIL_COLUMNS = 2;
var SPR_THUMBNAIL_ROWS = 0;
var SPR_THUMBNAIL_H_OFFSET = 0;
var SPR_THUMBNAIL_V_OFFSET = 0;

var sprite_editor_container_container;
var sprite_editor_container;
var sprite_editor_container_FG;

var spriteCanvasContents;

var masks = [];

var colorSelected=2;
var maskSelected=0;

var paletteSelectionIcons = [new PIXI.Graphics(),new PIXI.Graphics()];


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

}

function SelectColor(col){
	if (spriteCanvasContents.target>=0){
		var t = spriteCanvasContents.contents[spriteCanvasContents.target];
		t.tint=COLORS[col];
	}
	colorSelected=col;
	SetPalleteSelections();
}

function SelectMask(idx){
	if (spriteCanvasContents.target>=0){
		var t = spriteCanvasContents.contents[spriteCanvasContents.target];
		var c = t.getChildAt(0);
		c.texture=masks[idx];
	}
	maskSelected=idx;
	SetPalleteSelections();
}

var currentSpriteWidgets = [];
function makeSpriteEditor(){
	var widgets = [];

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
	SPR_THUMBNAIL_H_OFFSET = PANEL_WIDTH-2*(SPR_THUMBNAIL_WIDTH+SPR_THUMBNAIL_H_MARGIN);

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
	SPR_THUMBNAIL_V_OFFSET = PANEL_TOP+SPR_THUMBNAIL_V_MARGIN;


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
	SetPalleteSelections();

	for (var i=0;i<3;i++){
		for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){

			//RIGHT COLUMN
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill((i%2)*0xff0000+(j%2)*0x00ff00+0x0000ff, 1);
			panel.drawRect(
				SPR_THUMBNAIL_H_OFFSET+(SPR_THUMBNAIL_WIDTH+SPR_THUMBNAIL_H_MARGIN)*(i-1),
				SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT+SPR_THUMBNAIL_V_MARGIN)*j,
				SPR_THUMBNAIL_WIDTH,
				SPR_THUMBNAIL_HEIGHT
			);
			stage.addChild(panel);

			widgets.push(panel);			
		}
	}

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


	for (var i=0;i<3;i++){
		for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){

			//RIGHT COLUMN
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill((i%2)*0xff0000+(j%2)*0x00ff00+0x0000ff, 1);
			panel.drawRect(
				SPR_THUMBNAIL_H_OFFSET+(SPR_THUMBNAIL_WIDTH+SPR_THUMBNAIL_H_MARGIN)*(i-1),
				SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT+SPR_THUMBNAIL_V_MARGIN)*j,
				SPR_THUMBNAIL_WIDTH,
				SPR_THUMBNAIL_HEIGHT
			);
			stage.addChild(panel);

			widgets.push(panel);			
		}
	}

			
	var textures=[];

	for (var i=0;i<SPR_THUMBNAIL_COLUMNS;i++){
		for (var j=0;j<SPR_THUMBNAIL_ROWS;j++){
			var index = 8*i+j;

			
			//LEFT COLUMN
			var iconbutton = new PIXI.Graphics();
			var xpos = SPR_THUMBNAIL_H_MARGIN*2+(SPR_THUMBNAIL_H_MARGIN+SPR_THUMBNAIL_WIDTH)*i;
			var ypos = SPR_THUMBNAIL_V_OFFSET+(SPR_THUMBNAIL_HEIGHT+SPR_THUMBNAIL_V_MARGIN)*j;
			iconbutton.lineStyle(0);
			iconbutton.beginFill((i%2)*0x660000+(j%2)*0x006600+0x000066, 1);
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
				var icon = new PIXI.Sprite(textures[idx]);
				icon.interactive=true;
				icon.anchor.x=0.5;
				icon.anchor.y=0.5;
				icon.width=200;
				icon.height=200;
				icon.position.x=PANEL_WIDTH/2;
				icon.position.y=PANEL_HEIGHT/2+PANEL_TOP;
				//icon.tint=Math.floor(Math.random()*0xffffff);				
				sprite_editor_container.addChild(icon);
				icon.hitArea = collisionPolygons["decal"+(idx+1)];
				icon.tint = COLORS[colorSelected];
				spriteCanvasContents.contents.push(icon);				

				var mask = new PIXI.Sprite(masks[maskSelected]);
				icon.addChild(mask);
				icon.mask=mask;
				mask.anchor.x=0.5;
				mask.anchor.y=0.5;
				mask.position.x=0;
				mask.position.y=0;
				mask.width=256;
				mask.height=256;
				spriteCanvasContents.selectObject(spriteCanvasContents.contents.length-1);
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
	var s = PANEL_WIDTH-4*SPR_THUMBNAIL_WIDTH-6*SPR_THUMBNAIL_H_MARGIN-200;
	var panelx = PANEL_WIDTH-s-3*SPR_THUMBNAIL_WIDTH-4*SPR_THUMBNAIL_H_MARGIN;
	canvaspanel.drawRect(
		panelx,
		bg_panel_ypos,
		s,
		s
	);


	var canvaspanel2 = new PIXI.Graphics();
	var bg_panel_ypos = SPR_THUMBNAIL_V_OFFSET+2;
	canvaspanel2.lineStyle(0);
	canvaspanel2.beginFill(0x555555, 1);
	canvaspanel2.drawRect(
		panelx,
		bg_panel_ypos,
		s,
		s
	);

	
	stage.addChild(sprite_editor_container_container)
	sprite_editor_container_container.addChild(sprite_editor_container);
	sprite_editor_container_container.addChild(sprite_editor_container_FG);
	
	sprite_editor_container_container.mask = canvaspanel;
	sprite_editor_container.addChild(canvaspanel);
	sprite_editor_container.addChild(canvaspanel2);
	
	spriteCanvasContents = CreateInteractiveCanvas(panelx,bg_panel_ypos,s,s,sprite_editor_container,sprite_editor_container_FG);

	widgets.push(sprite_editor_container_container);
	widgets.push(sprite_editor_container);
	widgets.push(sprite_editor_container_FG);
	widgets.push(canvaspanel);	


	//draw left/rigth buttons at bottom	
	return widgets;
}