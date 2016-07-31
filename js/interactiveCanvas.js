function dot(p1,p2){
	return p1.x*p2.x+p1.y*p2.y;
}

function CreateInteractiveCanvas(x,y,w,h,source_container,source_container_FG){

	var handleTex_rotations = [
		PIXI.Texture.fromImage("gfx/ui/handle_rotate0.png",null,PIXI.SCALE_MODES.NEAREST),
		PIXI.Texture.fromImage("gfx/ui/handle_rotate1.png",null,PIXI.SCALE_MODES.NEAREST),
		PIXI.Texture.fromImage("gfx/ui/handle_rotate2.png",null,PIXI.SCALE_MODES.NEAREST),
		PIXI.Texture.fromImage("gfx/ui/handle_rotate3.png",null,PIXI.SCALE_MODES.NEAREST),
	];

	var handleTex_scales = [
		PIXI.Texture.fromImage("gfx/ui/handle_resize0.png",null,PIXI.SCALE_MODES.NEAREST),
		PIXI.Texture.fromImage("gfx/ui/handle_resize1.png",null,PIXI.SCALE_MODES.NEAREST)
	];

	var manipulatorWidget = new PIXI.Container();	
	manipulatorWidget.visible = false;
	source_container_FG.addChild(manipulatorWidget);

	/*var handleOutline = new PIXI.Graphics();
	handleOutline.lineStyle(1,0x00ffff,0.5);
	handleOutline.drawRect(
		-128,-128,256,256
	);
	handleOutline.moveTo(
		0,-128
	);
	handleOutline.lineTo(
		0,-128-50
	);
	manipulatorWidget.addChild(handleOutline);*/

	var handleSprites = [];
	var draggingTarget=-1;
	var anchorsx = [0.0,0.0,1.0,1.0,0.5,0.0,0.5,1.0];
	var anchorsy = [0.0,1.0,1.0,0.0,0.0,0.5,1.0,0.5];
	for (var i=0;i<8;i++){

		var handleSprite = new PIXI.Sprite(i<4?handleTex_rotations[(3-i+3)%4]:handleTex_scales[i%2]);
		handleSprite.position.x=PANEL_WIDTH/2;
		handleSprite.position.y=PANEL_HEIGHT/2;
		handleSprite.anchor.x = anchorsx[i];
		handleSprite.anchor.y = anchorsy[i];
		handleSprite.scale.x=0.5;
		handleSprite.scale.y=0.5;
		handleSprite.tint=i<4?0x00ffff:0xffff00;
		handleSprite.interactive=true;
		handleSprite.buttonMode=true;
		manipulatorWidget.addChild(handleSprite);
		handleSprites.push(handleSprite);

		function handleGrabStart(idx){
			return function(event){
				draggingTarget=idx;
				window.console.log("start" + idx);
			}
		}
		
		function handleGrabEnd(idx){
			return function(event){
				draggingTarget=-1;
				window.console.log("end" + idx);

			}
		}

		function rescaleHandles(){
			var s = manipulatorWidget.scale;
			for (var i=0;i<8;i++){
				h = handleSprites[i];
				h.scale.x=0.5/Math.abs(s.x);
				h.scale.y=0.5/Math.abs(s.y);
			}
		}

		function handleGrabMove(idx){
			return function(event){
				if (draggingTarget===idx){
					switch(idx){
						case 0:
						case 1:
						case 2:
						case 3:{//rotation
							//get screen position
	    					var mousePos = source_container.toLocal(event.data.global);
	    					var dx = mousePos.x-manipulatorWidget.position.x;
	    					var dy = mousePos.y-manipulatorWidget.position.y;
	    					var handle = handleSprites[idx];
	    					var ratio = manipulatorWidget.scale.x/manipulatorWidget.scale.y;
	    					var sourceangle = Math.atan2(handle.position.x*ratio,-handle.position.y);
	    					var angle = Math.atan2(dx,-dy);
	    					var t = dat.contents[dat.target];

	    					var radius = Math.sqrt(dx*dx+dy*dy);
	    					//if no change, should be t.scale.y*128+50
	    					//should try preserve ratio!
	    					var dR = radius/(Math.sqrt(128*128+128*128*ratio*ratio));
	    					t.scale.x=dR*ratio;
	    					t.scale.y=dR;
							t.rotation = angle-sourceangle;

							manipulatorWidget.scale = t.scale;
							manipulatorWidget.rotation = t.rotation;

							rescaleHandles();
							break;
						}
						case 4:
						case 5:
						case 6:
						case 7:{
							var mousePos = source_container.toLocal(event.data.global);
							var dx = mousePos.x-manipulatorWidget.position.x;
	    					var dy = mousePos.y-manipulatorWidget.position.y;
	    					
	    					var handle = handleSprites[idx];
	    					var localMousePos = manipulatorWidget.toLocal(event.data.global);

	    					var sourceangle = Math.atan2(handle.position.x,-handle.position.y);
	    					var angle = Math.atan2(dx,-dy);
	    					var t = dat.contents[dat.target];

	    					var dotP=dot(localMousePos,handle.position);

	    					var r = Math.sqrt(dx*dx+dy*dy);
	    					//if no change, should be t.scale.y*128+50
	    					var dR = r/(128);

	    					if (handle.position.x!==0){
	    						t.scale.x=dR*Math.sign(localMousePos.x*handle.position.x*t.scale.x);
	    					} else {
	    						t.scale.y=dR*Math.sign(localMousePos.y*handle.position.y*t.scale.y);
	    					}
	    					window.console.log(t.scale);
							//t.rotation = angle-sourceangle;

							manipulatorWidget.scale = t.scale;
							manipulatorWidget.rotation = t.rotation;
							rescaleHandles();
							break;
						}
					}
					window.console.log("move" + idx);
				}
			}
		}
		
		handleSprite
		    .on('mousedown', handleGrabStart(i))
		    .on('touchstart', handleGrabStart(i))
		    .on('mouseup', handleGrabEnd(i))
		    .on('mouseupoutside', handleGrabEnd(i))
		    .on('touchend', handleGrabEnd(i))
		    .on('touchendoutside', handleGrabEnd(i))
		    .on('mousemove', handleGrabMove(i))
		    .on('touchmove', handleGrabMove(i));


	}

	handleSprites[0].position.x=128;
	handleSprites[0].position.y=128;

	handleSprites[1].position.x=128;
	handleSprites[1].position.y=-128;

	handleSprites[2].position.x=-128;
	handleSprites[2].position.y=-128;

	handleSprites[3].position.x=-128;
	handleSprites[3].position.y=128;

	handleSprites[4].position.x=0;
	handleSprites[4].position.y=128;

	handleSprites[5].position.x=128;
	handleSprites[5].position.y=0;

	handleSprites[6].position.x=0;
	handleSprites[6].position.y=-128;

	handleSprites[7].position.x=-128;
	handleSprites[7].position.y=0;

	var dat = {			
		contents:[],
		textures:[],
		x:x,
		y:y,
		w:w,
		h:h,
		dragging:false,
		target:-1,
		offx:0,
		offy:0,
		selectObject:null,
	};

	function setHandles(){
		
		manipulatorWidget.visible = dat.target>=0;

		if (dat.target>=0){
			var t = dat.contents[dat.target];

			manipulatorWidget.position = t.position;
			manipulatorWidget.rotation = t.rotation;
			manipulatorWidget.scale = t.scale;
			manipulatorWidget.skew = t.skew;
		}

		rescaleHandles();
		//t.rotation=Math.random();

	}

	//add hitbox to source container

	//add callbacks
	source_container.hitArea = new PIXI.Rectangle(x, y, w, h);
	source_container.interactive=true;
	source_container.interactiveChildren=false;

	source_container
	    .on('mousedown', onDragStart)
	    .on('touchstart', onDragStart)
	    .on('mouseup', onDragEnd)
	    .on('mouseupoutside', onDragEnd)
	    .on('touchend', onDragEnd)
	    .on('touchendoutside', onDragEnd)
	    .on('mousemove', onDragMove)
	    .on('touchmove', onDragMove);

	var _tempPoint = new PIXI.Point(0,0);

	function selectObject(idx){
		dat.target=idx;
		for (var i=dat.contents.length-1;i>=0;i--){
			var e = dat.contents[i];
			if (i===idx){
				i.tint = 0.5;
			} else {
				i.tint = 1.0;
			}
		}
		setHandles();
	}


	dat.selectObject = selectObject;

	function onDragStart(event){	
		dat.target=-1;		
		setHandles();
		for (var i=dat.contents.length-1;i>=0;i--){
			var e = dat.contents[i];		
	    	e.worldTransform.applyInverse(event.data.global,  _tempPoint);	
			if (e.hitArea.contains(_tempPoint.x,_tempPoint.y)){
				window.console.log({
					globalPos:event.data.global,
					localPos:_tempPoint,
					epos:e.position,
					esize:[e.width,e.height]
				});
				selectObject(i);
				dat.contents[dat.target].alpha=0.5;
	    		var mousePos = source_container.toLocal(event.data.global);
				dat.dragging=true;
				dat.offx=e.position.x-mousePos.x;
				dat.offy=e.position.y-mousePos.y;
				break;
			}	
		}
	}
	function onDragEnd(){
		if (dat.target===-1){
			return;
		}
		dat.contents[dat.target].alpha=1.0;
		dat.dragging=false;
		setHandles();			
	}

	function onDragMove(event){
		
	    if (dat.dragging)
	    {
	        var newPosition = event.data.getLocalPosition(source_container);
	        var t = dat.contents[dat.target];
	        t.alpha=0.5;
	        t.position.x = newPosition.x+dat.offx;
	        t.position.y = newPosition.y+dat.offy;

			manipulatorWidget.position = t.position;
			manipulatorWidget.rotation = t.rotation;
			manipulatorWidget.scale = t.scale;
			manipulatorWidget.skew = t.skew;
	    }
	}
	return dat;
}