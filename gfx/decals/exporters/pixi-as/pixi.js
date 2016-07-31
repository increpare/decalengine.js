var collisionPolygons = { {% for body in bodies %}
	{{body.name}}: new PIXI.Polygon{% for fixture in body.fixtures %} {% if  forloop.first %} ({% for point in fixture.hull %} {% if not forloop.first %}, {% endif %} {{point.x}}-128, {{point.y}}+128{% endfor %} ),{% endif %}{% endfor %}{% endfor %}
};