package
{
	import Box2D.Dynamics.*;
	import Box2D.Collision.*;
	import Box2D.Collision.Shapes.*;
	import Box2D.Common.Math.*;
    import flash.utils.Dictionary;

    public class PhysicsData extends Object
	{
		// ptm ratio
        public var ptm_ratio:Number = 32;
		
		// the physcis data 
		var dict:Dictionary;
		
        //
        // bodytype:
        //  b2_staticBody
        //  b2_kinematicBody
        //  b2_dynamicBody

        public function createBody(name:String, world:b2World, bodyType:uint, userData:*):b2Body
        {
            var fixtures:Array = dict[name];

            var body:b2Body;
            var f:Number;

            // prepare body def
            var bodyDef:b2BodyDef = new b2BodyDef();
            bodyDef.type = bodyType;
            bodyDef.userData = userData;

            // create the body
            body = world.CreateBody(bodyDef);

            // prepare fixtures
            for(f=0; f<fixtures.length; f++)
            {
                var fixture:Array = fixtures[f];

                var fixtureDef:b2FixtureDef = new b2FixtureDef();

                fixtureDef.density=fixture[0];
                fixtureDef.friction=fixture[1];
                fixtureDef.restitution=fixture[2];

                fixtureDef.filter.categoryBits = fixture[3];
                fixtureDef.filter.maskBits = fixture[4];
                fixtureDef.filter.groupIndex = fixture[5];
                fixtureDef.isSensor = fixture[6];

                if(fixture[7] == "POLYGON")
                {                    
                    var p:Number;
                    var polygons:Array = fixture[8];
                    for(p=0; p<polygons.length; p++)
                    {
                        var polygonShape:b2PolygonShape = new b2PolygonShape();
                        polygonShape.SetAsArray(polygons[p], polygons[p].length);
                        fixtureDef.shape=polygonShape;

                        body.CreateFixture(fixtureDef);
                    }
                }
                else if(fixture[7] == "CIRCLE")
                {
                    var circleShape:b2CircleShape = new b2CircleShape(fixture[9]);                    
                    circleShape.SetLocalPosition(fixture[8]);
                    fixtureDef.shape=circleShape;
                    body.CreateFixture(fixtureDef);                    
                }                
            }

            return body;
        }

		
        public function PhysicsData(): void
		{
			dict = new Dictionary();
			

			dict["decal1"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(207/ptm_ratio, 32/ptm_ratio)  ,  new b2Vec2(250/ptm_ratio, 111/ptm_ratio)  ,  new b2Vec2(250/ptm_ratio, 143/ptm_ratio)  ,  new b2Vec2(68/ptm_ratio, 236/ptm_ratio)  ,  new b2Vec2(18/ptm_ratio, 68/ptm_ratio)  ,  new b2Vec2(46/ptm_ratio, 33/ptm_ratio)  ,  new b2Vec2(95/ptm_ratio, 8/ptm_ratio)  ,  new b2Vec2(143/ptm_ratio, 4/ptm_ratio)  ] ,
                                                [   new b2Vec2(68/ptm_ratio, 236/ptm_ratio)  ,  new b2Vec2(250/ptm_ratio, 143/ptm_ratio)  ,  new b2Vec2(236/ptm_ratio, 186/ptm_ratio)  ,  new b2Vec2(208/ptm_ratio, 221/ptm_ratio)  ,  new b2Vec2(159/ptm_ratio, 246/ptm_ratio)  ,  new b2Vec2(111/ptm_ratio, 250/ptm_ratio)  ] ,
                                                [   new b2Vec2(18/ptm_ratio, 68/ptm_ratio)  ,  new b2Vec2(68/ptm_ratio, 236/ptm_ratio)  ,  new b2Vec2(33/ptm_ratio, 208/ptm_ratio)  ,  new b2Vec2(8/ptm_ratio, 159/ptm_ratio)  ,  new b2Vec2(4/ptm_ratio, 111/ptm_ratio)  ] ,
                                                [   new b2Vec2(250/ptm_ratio, 111/ptm_ratio)  ,  new b2Vec2(207/ptm_ratio, 32/ptm_ratio)  ,  new b2Vec2(233/ptm_ratio, 62/ptm_ratio)  ]
											]

										]

									];

			dict["decal2"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(4/ptm_ratio, 252/ptm_ratio)  ,  new b2Vec2(4/ptm_ratio, 4/ptm_ratio)  ,  new b2Vec2(252/ptm_ratio, 4/ptm_ratio)  ,  new b2Vec2(252/ptm_ratio, 252/ptm_ratio)  ]
											]

										]

									];

			dict["decal8"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(194/ptm_ratio, 23/ptm_ratio)  ,  new b2Vec2(254/ptm_ratio, 129/ptm_ratio)  ,  new b2Vec2(191/ptm_ratio, 237/ptm_ratio)  ,  new b2Vec2(65/ptm_ratio, 237/ptm_ratio)  ,  new b2Vec2(2/ptm_ratio, 127/ptm_ratio)  ,  new b2Vec2(65/ptm_ratio, 19/ptm_ratio)  ]
											]

										]

									];

			dict["decal7"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(254/ptm_ratio, 228/ptm_ratio)  ,  new b2Vec2(2/ptm_ratio, 228/ptm_ratio)  ,  new b2Vec2(127/ptm_ratio, 10/ptm_ratio)  ]
											]

										]

									];

			dict["decal6"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(252/ptm_ratio, 96/ptm_ratio)  ,  new b2Vec2(205/ptm_ratio, 244/ptm_ratio)  ,  new b2Vec2(51/ptm_ratio, 243/ptm_ratio)  ,  new b2Vec2(5/ptm_ratio, 98/ptm_ratio)  ,  new b2Vec2(128/ptm_ratio, 7/ptm_ratio)  ]
											]

										]
 ,
										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(252/ptm_ratio, 96/ptm_ratio)  ,  new b2Vec2(205/ptm_ratio, 244/ptm_ratio)  ,  new b2Vec2(51/ptm_ratio, 243/ptm_ratio)  ,  new b2Vec2(5/ptm_ratio, 98/ptm_ratio)  ,  new b2Vec2(128/ptm_ratio, 7/ptm_ratio)  ]
											]

										]

									];

			dict["decal5"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(196/ptm_ratio, 240/ptm_ratio)  ,  new b2Vec2(161/ptm_ratio, 250/ptm_ratio)  ,  new b2Vec2(60/ptm_ratio, 16/ptm_ratio)  ,  new b2Vec2(95/ptm_ratio, 6/ptm_ratio)  ,  new b2Vec2(245/ptm_ratio, 69/ptm_ratio)  ,  new b2Vec2(251/ptm_ratio, 95/ptm_ratio)  ,  new b2Vec2(251/ptm_ratio, 161/ptm_ratio)  ,  new b2Vec2(235/ptm_ratio, 206/ptm_ratio)  ] ,
                                                [   new b2Vec2(60/ptm_ratio, 16/ptm_ratio)  ,  new b2Vec2(161/ptm_ratio, 250/ptm_ratio)  ,  new b2Vec2(75/ptm_ratio, 247/ptm_ratio)  ,  new b2Vec2(11/ptm_ratio, 187/ptm_ratio)  ,  new b2Vec2(5/ptm_ratio, 95/ptm_ratio)  ,  new b2Vec2(21/ptm_ratio, 50/ptm_ratio)  ] ,
                                                [   new b2Vec2(245/ptm_ratio, 69/ptm_ratio)  ,  new b2Vec2(95/ptm_ratio, 6/ptm_ratio)  ,  new b2Vec2(161/ptm_ratio, 5/ptm_ratio)  ,  new b2Vec2(218/ptm_ratio, 30/ptm_ratio)  ] ,
                                                [   new b2Vec2(11/ptm_ratio, 187/ptm_ratio)  ,  new b2Vec2(75/ptm_ratio, 247/ptm_ratio)  ,  new b2Vec2(38/ptm_ratio, 226/ptm_ratio)  ]
											]

										]

									];

			dict["decal4"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(199/ptm_ratio, 250/ptm_ratio)  ,  new b2Vec2(57/ptm_ratio, 251/ptm_ratio)  ,  new b2Vec2(6/ptm_ratio, 199/ptm_ratio)  ,  new b2Vec2(52/ptm_ratio, 7/ptm_ratio)  ,  new b2Vec2(199/ptm_ratio, 5/ptm_ratio)  ,  new b2Vec2(251/ptm_ratio, 57/ptm_ratio)  ,  new b2Vec2(251/ptm_ratio, 199/ptm_ratio)  ,  new b2Vec2(231/ptm_ratio, 236/ptm_ratio)  ] ,
                                                [   new b2Vec2(52/ptm_ratio, 7/ptm_ratio)  ,  new b2Vec2(6/ptm_ratio, 199/ptm_ratio)  ,  new b2Vec2(5/ptm_ratio, 57/ptm_ratio)  ,  new b2Vec2(18/ptm_ratio, 27/ptm_ratio)  ] ,
                                                [   new b2Vec2(251/ptm_ratio, 57/ptm_ratio)  ,  new b2Vec2(199/ptm_ratio, 5/ptm_ratio)  ,  new b2Vec2(229/ptm_ratio, 18/ptm_ratio)  ] ,
                                                [   new b2Vec2(31/ptm_ratio, 241/ptm_ratio)  ,  new b2Vec2(11/ptm_ratio, 218/ptm_ratio)  ,  new b2Vec2(6/ptm_ratio, 199/ptm_ratio)  ,  new b2Vec2(57/ptm_ratio, 251/ptm_ratio)  ]
											]

										]

									];

			dict["decal3"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(252/ptm_ratio, 30/ptm_ratio)  ,  new b2Vec2(252/ptm_ratio, 227/ptm_ratio)  ,  new b2Vec2(30/ptm_ratio, 252/ptm_ratio)  ,  new b2Vec2(11/ptm_ratio, 241/ptm_ratio)  ,  new b2Vec2(5/ptm_ratio, 30/ptm_ratio)  ,  new b2Vec2(26/ptm_ratio, 7/ptm_ratio)  ,  new b2Vec2(227/ptm_ratio, 5/ptm_ratio)  ,  new b2Vec2(246/ptm_ratio, 16/ptm_ratio)  ] ,
                                                [   new b2Vec2(30/ptm_ratio, 252/ptm_ratio)  ,  new b2Vec2(252/ptm_ratio, 227/ptm_ratio)  ,  new b2Vec2(231/ptm_ratio, 250/ptm_ratio)  ]
											]

										]

									];

			dict["decal9"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(163/ptm_ratio, 47/ptm_ratio)  ,  new b2Vec2(141/ptm_ratio, 66/ptm_ratio)  ,  new b2Vec2(113/ptm_ratio, 66/ptm_ratio)  ,  new b2Vec2(87/ptm_ratio, 53/ptm_ratio)  ,  new b2Vec2(126/ptm_ratio, 8/ptm_ratio)  ] ,
                                                [   new b2Vec2(141/ptm_ratio, 66/ptm_ratio)  ,  new b2Vec2(163/ptm_ratio, 47/ptm_ratio)  ,  new b2Vec2(210/ptm_ratio, 79/ptm_ratio)  ] ,
                                                [   new b2Vec2(87/ptm_ratio, 53/ptm_ratio)  ,  new b2Vec2(113/ptm_ratio, 66/ptm_ratio)  ,  new b2Vec2(46/ptm_ratio, 79/ptm_ratio)  ] ,
                                                [   new b2Vec2(113/ptm_ratio, 244/ptm_ratio)  ,  new b2Vec2(113/ptm_ratio, 66/ptm_ratio)  ,  new b2Vec2(141/ptm_ratio, 66/ptm_ratio)  ,  new b2Vec2(141/ptm_ratio, 244/ptm_ratio)  ]
											]

										]

									];

			dict["decal10"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(146/ptm_ratio, 73/ptm_ratio)  ,  new b2Vec2(131/ptm_ratio, 10/ptm_ratio)  ,  new b2Vec2(213/ptm_ratio, 89/ptm_ratio)  ,  new b2Vec2(216/ptm_ratio, 138/ptm_ratio)  ] ,
                                                [   new b2Vec2(40/ptm_ratio, 91/ptm_ratio)  ,  new b2Vec2(131/ptm_ratio, 10/ptm_ratio)  ,  new b2Vec2(110/ptm_ratio, 73/ptm_ratio)  ,  new b2Vec2(41/ptm_ratio, 138/ptm_ratio)  ] ,
                                                [   new b2Vec2(146/ptm_ratio, 73/ptm_ratio)  ,  new b2Vec2(146/ptm_ratio, 248/ptm_ratio)  ,  new b2Vec2(110/ptm_ratio, 248/ptm_ratio)  ,  new b2Vec2(110/ptm_ratio, 73/ptm_ratio)  ,  new b2Vec2(131/ptm_ratio, 10/ptm_ratio)  ]
											]

										]

									];

			dict["decal16"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(173/ptm_ratio, 222/ptm_ratio)  ,  new b2Vec2(228/ptm_ratio, 139/ptm_ratio)  ,  new b2Vec2(242/ptm_ratio, 241/ptm_ratio)  ] ,
                                                [   new b2Vec2(82/ptm_ratio, 33/ptm_ratio)  ,  new b2Vec2(27/ptm_ratio, 116/ptm_ratio)  ,  new b2Vec2(13/ptm_ratio, 14/ptm_ratio)  ] ,
                                                [   new b2Vec2(228/ptm_ratio, 116/ptm_ratio)  ,  new b2Vec2(199/ptm_ratio, 28/ptm_ratio)  ,  new b2Vec2(242/ptm_ratio, 11/ptm_ratio)  ] ,
                                                [   new b2Vec2(228/ptm_ratio, 116/ptm_ratio)  ,  new b2Vec2(228/ptm_ratio, 139/ptm_ratio)  ,  new b2Vec2(56/ptm_ratio, 227/ptm_ratio)  ,  new b2Vec2(13/ptm_ratio, 244/ptm_ratio)  ,  new b2Vec2(27/ptm_ratio, 116/ptm_ratio)  ,  new b2Vec2(137/ptm_ratio, 38/ptm_ratio)  ,  new b2Vec2(199/ptm_ratio, 28/ptm_ratio)  ] ,
                                                [   new b2Vec2(118/ptm_ratio, 217/ptm_ratio)  ,  new b2Vec2(228/ptm_ratio, 139/ptm_ratio)  ,  new b2Vec2(173/ptm_ratio, 222/ptm_ratio)  ] ,
                                                [   new b2Vec2(137/ptm_ratio, 38/ptm_ratio)  ,  new b2Vec2(27/ptm_ratio, 116/ptm_ratio)  ,  new b2Vec2(82/ptm_ratio, 33/ptm_ratio)  ] ,
                                                [   new b2Vec2(56/ptm_ratio, 227/ptm_ratio)  ,  new b2Vec2(228/ptm_ratio, 139/ptm_ratio)  ,  new b2Vec2(118/ptm_ratio, 217/ptm_ratio)  ]
											]

										]

									];

			dict["decal15"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(145/ptm_ratio, 67/ptm_ratio)  ,  new b2Vec2(115/ptm_ratio, 170/ptm_ratio)  ,  new b2Vec2(119/ptm_ratio, 71/ptm_ratio)  ,  new b2Vec2(128/ptm_ratio, 34/ptm_ratio)  ] ,
                                                [   new b2Vec2(178/ptm_ratio, 163/ptm_ratio)  ,  new b2Vec2(195/ptm_ratio, 136/ptm_ratio)  ,  new b2Vec2(228/ptm_ratio, 167/ptm_ratio)  ] ,
                                                [   new b2Vec2(195/ptm_ratio, 136/ptm_ratio)  ,  new b2Vec2(190/ptm_ratio, 101/ptm_ratio)  ,  new b2Vec2(243/ptm_ratio, 110/ptm_ratio)  ] ,
                                                [   new b2Vec2(181/ptm_ratio, 76/ptm_ratio)  ,  new b2Vec2(145/ptm_ratio, 67/ptm_ratio)  ,  new b2Vec2(190/ptm_ratio, 12/ptm_ratio)  ] ,
                                                [   new b2Vec2(144/ptm_ratio, 182/ptm_ratio)  ,  new b2Vec2(178/ptm_ratio, 163/ptm_ratio)  ,  new b2Vec2(209/ptm_ratio, 228/ptm_ratio)  ] ,
                                                [   new b2Vec2(190/ptm_ratio, 101/ptm_ratio)  ,  new b2Vec2(181/ptm_ratio, 76/ptm_ratio)  ,  new b2Vec2(232/ptm_ratio, 65/ptm_ratio)  ] ,
                                                [   new b2Vec2(83/ptm_ratio, 88/ptm_ratio)  ,  new b2Vec2(95/ptm_ratio, 89/ptm_ratio)  ,  new b2Vec2(81/ptm_ratio, 121/ptm_ratio)  ,  new b2Vec2(46/ptm_ratio, 88/ptm_ratio)  ] ,
                                                [   new b2Vec2(115/ptm_ratio, 170/ptm_ratio)  ,  new b2Vec2(144/ptm_ratio, 182/ptm_ratio)  ,  new b2Vec2(95/ptm_ratio, 241/ptm_ratio)  ] ,
                                                [   new b2Vec2(119/ptm_ratio, 71/ptm_ratio)  ,  new b2Vec2(95/ptm_ratio, 89/ptm_ratio)  ,  new b2Vec2(57/ptm_ratio, 30/ptm_ratio)  ] ,
                                                [   new b2Vec2(190/ptm_ratio, 101/ptm_ratio)  ,  new b2Vec2(178/ptm_ratio, 163/ptm_ratio)  ,  new b2Vec2(115/ptm_ratio, 170/ptm_ratio)  ,  new b2Vec2(145/ptm_ratio, 67/ptm_ratio)  ,  new b2Vec2(181/ptm_ratio, 76/ptm_ratio)  ] ,
                                                [   new b2Vec2(115/ptm_ratio, 170/ptm_ratio)  ,  new b2Vec2(178/ptm_ratio, 163/ptm_ratio)  ,  new b2Vec2(144/ptm_ratio, 182/ptm_ratio)  ] ,
                                                [   new b2Vec2(81/ptm_ratio, 121/ptm_ratio)  ,  new b2Vec2(91/ptm_ratio, 150/ptm_ratio)  ,  new b2Vec2(13/ptm_ratio, 136/ptm_ratio)  ] ,
                                                [   new b2Vec2(95/ptm_ratio, 89/ptm_ratio)  ,  new b2Vec2(119/ptm_ratio, 71/ptm_ratio)  ,  new b2Vec2(115/ptm_ratio, 170/ptm_ratio)  ,  new b2Vec2(109/ptm_ratio, 169/ptm_ratio)  ,  new b2Vec2(91/ptm_ratio, 150/ptm_ratio)  ,  new b2Vec2(81/ptm_ratio, 121/ptm_ratio)  ] ,
                                                [   new b2Vec2(91/ptm_ratio, 150/ptm_ratio)  ,  new b2Vec2(109/ptm_ratio, 169/ptm_ratio)  ,  new b2Vec2(41/ptm_ratio, 205/ptm_ratio)  ] ,
                                                [   new b2Vec2(178/ptm_ratio, 163/ptm_ratio)  ,  new b2Vec2(190/ptm_ratio, 101/ptm_ratio)  ,  new b2Vec2(195/ptm_ratio, 136/ptm_ratio)  ]
											]

										]

									];

			dict["decal14"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(93/ptm_ratio, 198/ptm_ratio)  ,  new b2Vec2(166/ptm_ratio, 194/ptm_ratio)  ,  new b2Vec2(128/ptm_ratio, 243/ptm_ratio)  ] ,
                                                [   new b2Vec2(231/ptm_ratio, 37/ptm_ratio)  ,  new b2Vec2(245/ptm_ratio, 82/ptm_ratio)  ,  new b2Vec2(245/ptm_ratio, 103/ptm_ratio)  ,  new b2Vec2(126/ptm_ratio, 59/ptm_ratio)  ,  new b2Vec2(164/ptm_ratio, 17/ptm_ratio)  ,  new b2Vec2(204/ptm_ratio, 14/ptm_ratio)  ] ,
                                                [   new b2Vec2(30/ptm_ratio, 148/ptm_ratio)  ,  new b2Vec2(14/ptm_ratio, 119/ptm_ratio)  ,  new b2Vec2(10/ptm_ratio, 83/ptm_ratio)  ,  new b2Vec2(126/ptm_ratio, 59/ptm_ratio)  ,  new b2Vec2(245/ptm_ratio, 103/ptm_ratio)  ,  new b2Vec2(228/ptm_ratio, 144/ptm_ratio)  ,  new b2Vec2(166/ptm_ratio, 194/ptm_ratio)  ,  new b2Vec2(93/ptm_ratio, 198/ptm_ratio)  ] ,
                                                [   new b2Vec2(104/ptm_ratio, 24/ptm_ratio)  ,  new b2Vec2(126/ptm_ratio, 59/ptm_ratio)  ,  new b2Vec2(10/ptm_ratio, 83/ptm_ratio)  ,  new b2Vec2(18/ptm_ratio, 48/ptm_ratio)  ,  new b2Vec2(32/ptm_ratio, 27/ptm_ratio)  ,  new b2Vec2(43/ptm_ratio, 17/ptm_ratio)  ,  new b2Vec2(75/ptm_ratio, 10/ptm_ratio)  ]
											]

										]

									];

			dict["decal13"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(26/ptm_ratio, 34/ptm_ratio)  ,  new b2Vec2(229/ptm_ratio, 131/ptm_ratio)  ,  new b2Vec2(198/ptm_ratio, 171/ptm_ratio)  ,  new b2Vec2(156/ptm_ratio, 206/ptm_ratio)  ,  new b2Vec2(60/ptm_ratio, 181/ptm_ratio)  ,  new b2Vec2(20/ptm_ratio, 126/ptm_ratio)  ,  new b2Vec2(4/ptm_ratio, 83/ptm_ratio)  ,  new b2Vec2(4/ptm_ratio, 55/ptm_ratio)  ] ,
                                                [   new b2Vec2(100/ptm_ratio, 211/ptm_ratio)  ,  new b2Vec2(60/ptm_ratio, 181/ptm_ratio)  ,  new b2Vec2(156/ptm_ratio, 206/ptm_ratio)  ,  new b2Vec2(130/ptm_ratio, 215/ptm_ratio)  ] ,
                                                [   new b2Vec2(26/ptm_ratio, 34/ptm_ratio)  ,  new b2Vec2(45/ptm_ratio, 28/ptm_ratio)  ,  new b2Vec2(122/ptm_ratio, 44/ptm_ratio)  ,  new b2Vec2(252/ptm_ratio, 81/ptm_ratio)  ,  new b2Vec2(229/ptm_ratio, 131/ptm_ratio)  ] ,
                                                [   new b2Vec2(253/ptm_ratio, 57/ptm_ratio)  ,  new b2Vec2(252/ptm_ratio, 81/ptm_ratio)  ,  new b2Vec2(122/ptm_ratio, 44/ptm_ratio)  ,  new b2Vec2(191/ptm_ratio, 28/ptm_ratio)  ,  new b2Vec2(215/ptm_ratio, 28/ptm_ratio)  ,  new b2Vec2(249/ptm_ratio, 45/ptm_ratio)  ]
											]

										]

									];

			dict["decal12"] = [

										[
											// density, friction, restitution
                                            2, 0.69999999999999996, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(75/ptm_ratio, 101/ptm_ratio)  ,  new b2Vec2(47/ptm_ratio, 138/ptm_ratio)  ,  new b2Vec2(10/ptm_ratio, 24/ptm_ratio)  ,  new b2Vec2(50/ptm_ratio, 9/ptm_ratio)  ] ,
                                                [   new b2Vec2(75/ptm_ratio, 101/ptm_ratio)  ,  new b2Vec2(159/ptm_ratio, 80/ptm_ratio)  ,  new b2Vec2(127/ptm_ratio, 110/ptm_ratio)  ,  new b2Vec2(47/ptm_ratio, 138/ptm_ratio)  ] ,
                                                [   new b2Vec2(177/ptm_ratio, 161/ptm_ratio)  ,  new b2Vec2(149/ptm_ratio, 188/ptm_ratio)  ,  new b2Vec2(127/ptm_ratio, 110/ptm_ratio)  ,  new b2Vec2(159/ptm_ratio, 80/ptm_ratio)  ] ,
                                                [   new b2Vec2(177/ptm_ratio, 161/ptm_ratio)  ,  new b2Vec2(239/ptm_ratio, 143/ptm_ratio)  ,  new b2Vec2(241/ptm_ratio, 162/ptm_ratio)  ,  new b2Vec2(215/ptm_ratio, 176/ptm_ratio)  ,  new b2Vec2(149/ptm_ratio, 188/ptm_ratio)  ] ,
                                                [   new b2Vec2(241/ptm_ratio, 174/ptm_ratio)  ,  new b2Vec2(215/ptm_ratio, 176/ptm_ratio)  ,  new b2Vec2(241/ptm_ratio, 162/ptm_ratio)  ] ,
                                                [   new b2Vec2(215/ptm_ratio, 176/ptm_ratio)  ,  new b2Vec2(241/ptm_ratio, 174/ptm_ratio)  ,  new b2Vec2(248/ptm_ratio, 247/ptm_ratio)  ]
											]

										]

									];

			dict["decal11"] = [

										[
											// density, friction, restitution
                                            2, 0, 0,
                                            // categoryBits, maskBits, groupIndex, isSensor
											1, 65535, 0, false,
											'POLYGON',

                                            // vertexes of decomposed polygons
                                            [

                                                [   new b2Vec2(214/ptm_ratio, 119/ptm_ratio)  ,  new b2Vec2(170/ptm_ratio, 123/ptm_ratio)  ,  new b2Vec2(40/ptm_ratio, 122/ptm_ratio)  ,  new b2Vec2(131/ptm_ratio, 11/ptm_ratio)  ] ,
                                                [   new b2Vec2(86/ptm_ratio, 248/ptm_ratio)  ,  new b2Vec2(86/ptm_ratio, 123/ptm_ratio)  ,  new b2Vec2(170/ptm_ratio, 123/ptm_ratio)  ,  new b2Vec2(170/ptm_ratio, 248/ptm_ratio)  ]
											]

										]

									];

		}
	}
}
