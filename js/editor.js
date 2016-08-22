

var rendererOptions = {
  antialiasing: false,
  transparent: false,
  resolution: window.devicePixelRatio,
  autoResize: true,
}

var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,rendererOptions);

// Put the renderer on screen in the corner
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";

// create the root of the scene graph
var stage = new PIXI.Container();

function resize(){
  // Determine which screen dimension is most constrained
  ratio = Math.min(window.innerWidth/GAME_WIDTH,
                   window.innerHeight/GAME_HEIGHT);
 
  // Scale the view appropriately to fill that dimension
  stage.scale.x = stage.scale.y = ratio;
  renderer.view.style.left = (window.innerWidth-GAME_WIDTH*ratio)/2+"px";
  renderer.view.style.top = (window.innerHeight-GAME_HEIGHT*ratio)/2+"px";
  
  // Update the renderer dimensions
  renderer.resize(Math.ceil(GAME_WIDTH * ratio),
                  Math.ceil(GAME_HEIGHT * ratio));
}

resize();

document.body.appendChild(renderer.view);

window.onresize = resize;



stage.interactive = false;

var navButtons=[];

/*
https://material.google.com/style/color.html#color-color-palette
*/

var TAB_DOWN_COL=0xFFCDD2;
var TAB_SELECTED_COL=0xEF9A9A;
var TAB_REGULAR_COL=0xF44336;
var TAB_HOVER_COL=0xEF5350;
var TAB_TEXT_COL=0x000000;

function onTabButtonClick(_setPage,buttons,index){
	return function(){
		for (var i=0;i<buttons.length;i++){		
			buttons[i].button.interactive=true;
			buttons[i].mainCol=TAB_REGULAR_COL;
			buttons[i].button.tint=TAB_REGULAR_COL;
		}
		buttons[index].button.interactive=false;
		buttons[index].mainCol=TAB_SELECTED_COL;
		buttons[index].button.tint=TAB_SELECTED_COL;
		_setPage(index);
	}
}

var colDat = {
	regular:TAB_REGULAR_COL,
	selected:TAB_SELECTED_COL,
	hover:TAB_HOVER_COL,
	down:TAB_DOWN_COL,
	text:TAB_TEXT_COL,
}

var pages = [];

function onKeyPress(e) {

	var ctrlPressed=0;
	var altPressed=0;
	var shiftPressed=0;

	var evt = (e==null ? event:e);

	shiftPressed=evt.shiftKey;
	altPressed  =evt.altKey;
	ctrlPressed =evt.ctrlKey || e.metaKey ;
	if (ctrlPressed || altPressed){
		return;
	}

	if (activePage===1){
		SE_KeyPress(e);
	}
}

document.addEventListener('keypress', onKeyPress);

function setPage(index){
	activePage=index;
	for (var i=0;i<pages.length;i++){
		var enable = i===index;
		var widgets=pages[i];
		for (var j=0;j<widgets.length;j++){
			widgets[j].visible=enable;
		}
	}
}

var offsetX = 1;
navButtons.push(makeButton(offsetX,1,126,30,"Outline",colDat,onTabButtonClick(setPage,navButtons,0)));
offsetX+=128;
navButtons.push(makeButton(offsetX,1,126,30,"Scene",colDat,onTabButtonClick(setPage,navButtons,1)));
offsetX+=128;
navButtons.push(makeButton(offsetX,1,126,30,"Events",colDat,onTabButtonClick(setPage,navButtons,2)));
offsetX+=128;
navButtons.push(makeButton(offsetX,1,126,30,"Sprites",colDat,onTabButtonClick(setPage,navButtons,3)));
offsetX+=128;
navButtons.push(makeButton(offsetX,1,126,30,"Music",colDat,onTabButtonClick(setPage,navButtons,4)));
offsetX+=128;
navButtons.push(makeButton(offsetX,1,126,30,"Sfx",colDat,onTabButtonClick(setPage,navButtons,5)));
offsetX+=128;
navButtons.push(makeButton(offsetX,1,126,30,"Run",colDat,onTabButtonClick(setPage,navButtons,6)));
offsetX+=128;
navButtons.push(makeButton(offsetX,1,126,30,"Options",colDat,onTabButtonClick(setPage,navButtons,7)));

pages.push(makeScenesEditor());
pages.push([]);//scene
pages.push([]);//events
pages.push(makeSpriteEditor());//sprites
pages.push([]);//music
pages.push([]);//sfx
pages.push([]);//options
pages.push([]);//help
pages[1]=makeSceneEditor();

// start animating
animate();

function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    //bunny.rotation += 0.1;
    //bunny.scale.x=Math.sin(bunny.rotation);

    // render the container
    renderer.render(stage);
}

onTabButtonClick(setPage,navButtons,0)();
