var S_THUMBNAIL_HEIGHT = 100;
var S_THUMBNAIL_WIDTH = S_THUMBNAIL_HEIGHT*ASPECT_RATIO;
var S_THUMBNAIL_H_MARGIN = 16;
var S_THUMBNAIL_V_MARGIN = 16;

var S_THUMBNAIL_COLUMNS = 0;
var S_THUMBNAIL_ROWS = 0;
var S_THUMBNAIL_H_OFFSET = 0;
var S_THUMBNAIL_V_OFFSET = 0;

function makeScenesEditor(){
	var count=0;
	for (var right=0;right<PANEL_WIDTH;right++){
		if (right>0){
			right+=S_THUMBNAIL_H_MARGIN;			
		}
		right+=S_THUMBNAIL_WIDTH;
		count++;
	}
	count--;

	S_THUMBNAIL_COLUMNS=count;
	S_THUMBNAIL_H_OFFSET = (PANEL_WIDTH-(count*S_THUMBNAIL_WIDTH+(count-1)*S_THUMBNAIL_H_MARGIN))/2;

	count=0;
	for (var top=PANEL_TOP;top<PANEL_HEIGHT;top++){
		if (top>0){
			top+=S_THUMBNAIL_V_MARGIN;			
		}
		top+=S_THUMBNAIL_HEIGHT;
		count++;
	}
	count--;

	S_THUMBNAIL_ROWS=count;
	S_THUMBNAIL_V_OFFSET = PANEL_TOP+(PANEL_HEIGHT-30-(count*S_THUMBNAIL_HEIGHT+(count-1)*S_THUMBNAIL_V_MARGIN))/2;


	var widgets = [];

	for (var i=0;i<S_THUMBNAIL_COLUMNS;i++){
		for (var j=0;j<S_THUMBNAIL_ROWS;j++){
			var panel = new PIXI.Graphics();
			panel.lineStyle(0);
			panel.beginFill((i%2)*0xff0000+(j%2)*0x00ff00+0x0000ff, 1);
			panel.drawRect(
				S_THUMBNAIL_H_OFFSET+(S_THUMBNAIL_WIDTH+S_THUMBNAIL_H_MARGIN)*i,
				S_THUMBNAIL_V_OFFSET+(S_THUMBNAIL_HEIGHT+S_THUMBNAIL_V_MARGIN)*j,
				S_THUMBNAIL_WIDTH,
				S_THUMBNAIL_HEIGHT
			);
			stage.addChild(panel);

			widgets.push(panel);			
		}
	}

	//draw left/rigth buttons at bottom	
	return widgets;
}