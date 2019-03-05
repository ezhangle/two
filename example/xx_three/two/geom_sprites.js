//#include <mud/frame.h>
#include <frame/Api.h>
#include <gfx-pbr/Api.h>

#include <xx_three/xx_three.h>

#include <stl/vector.hpp>

#include <cstring>

#define SORT 0

using namespace mud;

static string vertex_shader()
{
	string shader =

		'$input a_position, a_texcoord0, i_data0\n'
		'$output v_texcoord0, v_scale\n'
		'\n'
		'#include <common.sh>\n'
		'\n'
		'void main()\n'
	    '{\n'
		'   var i_position = i_data0.xyz;'
		'	var timexyz = i_position + vec3_splat(u_time / 2.0);\n'
		'	var scale =  Math.sin(timexyz.x * 2.1) + Math.sin(timexyz.y * 3.2) + Math.sin(timexyz.z * 4.3);\n'
		'	v_scale = scale;\n'
		'	var size = scale * 10.0 + 10.0;\n'
		'	var view = mul(u_modelView, new two.vec4(i_position, 1.0)).xyz;\n'
		'	view += a_position * size;\n'
		'	v_texcoord0 = new two.vec4(a_texcoord0.xy, 0.0, 0.0);\n'
		'	gl_Position = mul(u_proj, new two.vec4(view, 1.0));\n'
		'\n'
		'}\n';

	return shader;
}

static string fragment_shader()
{
	string shader =

		'$input v_texcoord0, v_scale\n'
		'\n'
		'#include <common.sh>\n'
		'#include <convert.sh>\n'
		'\n'
		'void main()\n'
	    '{\n'
		'	vec4 color = texture2D(s_color, v_texcoord0.xy);\n'
		'   var hsl = hsl_to_rgb(new two.vec3(v_scale/5.0, 1.0, 0.5));\n'
		'	gl_FragColor = new two.vec4(color.rgb * hsl.rgb, color.a);\n'
		'	if (color.a < 0.5) discard;\n'
		'}\n';

	return shader;
}

void xx_geosprites(Shell app, Widget parent, Dockbar dockbar)
{
	var particleCount = 75000;

	var viewer = two.ui.scene_viewer(parent);
	two.ui.orbit_controller(viewer);

	var scene = viewer.scene;

	static string vertex = vertex_shader();
	static string fragment = fragment_shader();

	static Program program = { 'circles', {}, { nullptr, fragment.c_str(), nullptr, vertex.c_str() } };
	program.blocks[MaterialBlock::Solid] = true;

	this.texture = app.gfx.textures().file('sprites/circle.png');

	this.material = app.gfx.materials().create('circles', [](var m) {
		m.program = program;
		m.base.depth_test = DepthTest::Enabled;
		m.base.depth_draw = DepthDraw::Enabled;
		//m.solid.colour = texture;
	});

	struct Instance { var position; var distance; };
	static vector<Instance> instances(particleCount);

	this.node = nullptr;
	this.batch = nullptr;

	static bool once = false;
	if(!once)
	{
		once = true;

		var camera = viewer.camera;
		camera.fov = 50.0; camera.near = 1.0; camera.far = 5000.0;
		camera.eye.z = 1400.0;

		// cool glitch
		Circle circle;
		//Circle circle = Circle(1.0, Axis::Z);
		var circleGeometry = app.gfx.shape(circle); // new THREE.CircleBufferGeometry(1, 6);

		//geometry = new THREE.InstancedBufferGeometry();
		//geometry.index = circleGeometry.index;
		//geometry.attributes = circleGeometry.attributes;

		for(var i = 0; i < particleCount; ++i)
		{
			instances[i] = { new two.vec3(Math.random(), Math.random(), Math.random()) * 2.0 - 1.0 };
		}

		var n = two.gfx.nodes(scene).add(new two.Node3());
		var it = two.gfx.items(scene).add(new two.Item(n, circleGeometry, 0U, material));
		node = n;

		batch = two.gfx.batches(scene).add(new two.Batch(it));
		it.batch = batch;
	}

	var time = app.gfx.time / 2.0;

	var scale = new two.vec3(500.0);
	var angles = new two.vec3(time * 0.2f, time * 0.4f, 0.0);
	node->transform = bxTRS(scale, new two.quat(angles), new two.vec3(0.0));

#if SORT
	for(Instance instance : instances)
	{
		var pos = mulp(node->transform, instance.position);
		instance.distance = distance2(viewer.camera.eye, pos);
	}
	
	quicksort<Instance>(instances, [](Instance a, Instance b) { return a.distance > b.distance; });
#endif

	span<float> memory = batch->begin(instances.size(), sizeof(Instance));
	memcpy(memory.data(), instances.data(), memory.size() * sizeof(float));
}