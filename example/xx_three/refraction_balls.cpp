//#include <mud/frame.h>
#include <frame/Api.h>
#include <gfx-pbr/Api.h>

#include <xx_three/xx_three.h>

#include <stl/vector.hpp>

using namespace mud;

void xx_refraction_balls(Shell& app, Widget& parent, Dockbar& dockbar, bool init)
{
	UNUSED(dockbar);
	SceneViewer& viewer = ui::scene_viewer(parent);
	//ui::orbit_controls(viewer);

	Scene& scene = viewer.m_scene;

	struct Node { vec3 p; vec3 s; Node3* node; };
	static vector<Node> spheres;

	if(init)
	{
		Camera& camera = viewer.m_camera;
		camera.m_fov = 60.f; camera.m_near = 1.f; camera.m_far = 100000.f;
		camera.m_eye.z = 3200.f;

		Texture& refraction = *app.m_gfx.textures().file("cube/park.jpg.cube");
		scene.m_env.m_radiance.m_texture = &refraction;
		scene.m_env.m_radiance.m_filter = false;
		scene.m_env.m_background.m_texture = &refraction;
		scene.m_env.m_background.m_mode = BackgroundMode::Panorama;

		Model& sphere = app.m_gfx.shape(Sphere(100.f));

		Program& phong = *app.m_gfx.programs().file("pbr/phong");
		//Program& phong = *app.m_gfx.programs().file("pbr/lambert");

		Material& material = app.m_gfx.materials().create("balls", [&](Material& m) {
			m.m_program = &phong;
			m.m_phong.m_refraction = 0.95f;
		});

		spheres.clear();
		for(size_t i = 0; i < 500; i++)
		{
			vec3 p = vec3(randf(), randf(), randf()) * 10000.f - 5000.f;
			vec3 s = vec3(randf()) * 3.f + 1.f;
			Node3& n = gfx::nodes(scene).add(Node3(p, ZeroQuat, s));
			gfx::items(scene).add(Item(n, sphere, 0U, &material));

			spheres.push_back({ p, s, &n });
		}
	}

	static vec2 mouse = vec2(0.f);
	if(MouseEvent event = viewer.mouse_event(DeviceType::Mouse, EventType::Moved))
	{
		mouse = (event.m_relative - viewer.m_frame.m_size / 2.f) * 10.f;
	}//

	Camera& camera = viewer.m_camera;
	camera.m_eye.x += (mouse.x - camera.m_eye.x) * .05f;
	camera.m_eye.y += (-mouse.y - camera.m_eye.y) * .05f;

	float timer = app.m_gfx.m_time * -0.01f;
	
	for(size_t i = 0; i < spheres.size(); i++)
	{
		vec3 p = spheres[i].p;
		p.x = cos(timer + float(i)) * 5000.f;
		p.y = sin(timer + float(i) * 1.1f) * 5000.f;
		spheres[i].node->apply(p, ZeroQuat, spheres[i].s);
	}

	//camera.lookAt(scene.position);
}