var NO_HIT_AREA = new PIXI.Rectangle(-100, -100, 0, 0);

function makeButton(x,y,w,h,label,colDat, onClick){

	var button = new PIXI.Graphics();

	var dat = {};
	dat.button=button;
	dat.mainCol=colDat.regular;
	dat.textCol=colDat.text;
	dat.hoverCol=colDat.hover;
	dat.downCol=colDat.down;

	button.interactive = true;

	// set a fill and a line style again and draw a rectangle
	button.lineStyle(2, 0x888888, 1);
	button.beginFill(0xffffff, 1);
	button.drawRect(x, y, w, h);

	button.hitArea = new PIXI.Rectangle(x, y, w, h);

	button.interactive = true;
	button.buttonMode = true;

	function _hover(){
		this.tint=dat.hoverCol;
	}
	function _regular(){
		this.tint=dat.mainCol;
	}
	function _down(){
		this.tint=dat.downCol;
		onClick();
	}

	button
	    // set the mousedown and touchstart callback...
	    .on('mousedown', _down)
	    .on('touchstart', _down)

	    // set the mouseup and touchend callback...
	    .on('mouseup', _regular)
	    .on('touchend', _regular)
	    .on('mouseupoutside', _regular)
	    .on('touchendoutside', _regular)

	    // set the mouseover callback...
	    .on('mouseover', _hover)

	    // set the mouseout callback...
	    .on('mouseout', _regular);

	stage.addChild(button);
	button.tint=dat.mainCol;


	var basicText = new PIXI.Text(label);
	basicText.interactive=false;
	basicText.hitArea = NO_HIT_AREA;

	basicText.x = x+w/2-basicText.width/2;
	basicText.y = y;
	stage.addChild(basicText);

	return dat;
}
