//  Copyright (c) 2019 Hugo Amiard hugo.amiard@laposte.net
//  This software is provided 'as-is' under the zlib License, see the LICENSE.txt file.
//  This notice and the license may not be removed or altered from any source distribution.

#include <gfx/Cpp20.h>

#ifdef MUD_MODULES
module mud.gfx;
#else
#include <stl/map.h>
#include <stl/table.h>
#include <stl/algorithm.h>
#include <math/Vec.hpp>
#include <geom/Primitive.hpp>
#include <geom/Geometry.h>
#include <gfx/Mesh.h>
#include <gfx/Node3.h>
#endif

#include <meshoptimizer.h>

#include <cstdio>
#include <cstring>

namespace mud
{
	bgfx::VertexDecl create_vertex_decl(uint32_t vertex_format)
	{
		bgfx::VertexDecl decl;

		bool half_support = (bgfx::getCaps()->supported & BGFX_CAPS_VERTEX_ATTRIB_HALF) != 0;
		bool needs_half = (vertex_format & VertexAttribute::QTexCoord0) != 0
					   || (vertex_format & VertexAttribute::QTexCoord1) != 0;
		if(needs_half && !half_support)
			printf("WARNING: half vertex attribute not supported but used by texcoords\n");

		bool normalize_indices = false;
#ifdef MUD_PLATFORM_EMSCRIPTEN
		normalize_indices = true;
#endif

		decl.begin();

		if((vertex_format & VertexAttribute::Position) != 0)
			decl.add(bgfx::Attrib::Position, 3, bgfx::AttribType::Float);
		if((vertex_format & VertexAttribute::QPosition) != 0)
			decl.add(bgfx::Attrib::Position, 3, bgfx::AttribType::Half);
		if((vertex_format & VertexAttribute::Normal) != 0)
			decl.add(bgfx::Attrib::Normal, 3, bgfx::AttribType::Float);
		if((vertex_format & VertexAttribute::QNormal) != 0)
			decl.add(bgfx::Attrib::Normal, 4, bgfx::AttribType::Uint8);
		if((vertex_format & VertexAttribute::Colour) != 0)
			decl.add(bgfx::Attrib::Color0, 4, bgfx::AttribType::Uint8, true);
		if((vertex_format & VertexAttribute::Tangent) != 0)
			decl.add(bgfx::Attrib::Tangent, 4, bgfx::AttribType::Float);
		if((vertex_format & VertexAttribute::QTangent) != 0)
			decl.add(bgfx::Attrib::Tangent, 4, bgfx::AttribType::Uint8);
		if((vertex_format & VertexAttribute::Bitangent) != 0)
			decl.add(bgfx::Attrib::Bitangent, 3, bgfx::AttribType::Float);
		if((vertex_format & VertexAttribute::TexCoord0) != 0)
			decl.add(bgfx::Attrib::TexCoord0, 2, bgfx::AttribType::Float);
		if((vertex_format & VertexAttribute::QTexCoord0) != 0)
			decl.add(bgfx::Attrib::TexCoord0, 2, bgfx::AttribType::Half);
		if((vertex_format & VertexAttribute::TexCoord1) != 0)
			decl.add(bgfx::Attrib::TexCoord1, 2, bgfx::AttribType::Float);
		if((vertex_format & VertexAttribute::QTexCoord1) != 0)
			decl.add(bgfx::Attrib::TexCoord1, 2, bgfx::AttribType::Half);
		if((vertex_format & VertexAttribute::Joints) != 0)
			decl.add(bgfx::Attrib::Indices, 4, bgfx::AttribType::Uint8, normalize_indices);
		if((vertex_format & VertexAttribute::Weights) != 0)
			decl.add(bgfx::Attrib::Weight, 4, bgfx::AttribType::Float);

		decl.end();

		return decl;
	}

	const bgfx::VertexDecl& vertex_decl(uint32_t vertex_format)
	{
		static map<uint32_t, bgfx::VertexDecl> decls;
		if(decls.find(vertex_format) == decls.end())
			decls[vertex_format] = create_vertex_decl(vertex_format);
		return decls[vertex_format];
	}

	GpuMesh alloc_mesh(PrimitiveType primitive, uint32_t vertex_format, uint32_t vertex_count, uint32_t index_count, bool index32)
	{
		GpuMesh gpu_mesh = { primitive, vertex_count, index_count };

		gpu_mesh.m_vertex_memory = bgfx::alloc(vertex_count * vertex_size(vertex_format));
		if(index_count > 0)
			gpu_mesh.m_index_memory = bgfx::alloc(index_count * (index32 ? sizeof(uint32_t) : sizeof(uint16_t)));
		gpu_mesh.m_index32 = index32;

		gpu_mesh.m_vertices = { gpu_mesh.m_vertex_memory->data, vertex_count };
		if(index_count > 0)
			gpu_mesh.m_indices = { gpu_mesh.m_index_memory->data, index_count };

		gpu_mesh.m_vertex_format = vertex_format;
		gpu_mesh.m_writer = MeshAdapter(vertex_format, gpu_mesh.m_vertices, gpu_mesh.m_indices, index32);

		return gpu_mesh;
	}

	GpuMesh alloc_mesh(PrimitiveType primitive, uint32_t vertex_format, uint32_t vertex_count, uint32_t index_count)
	{
		return alloc_mesh(primitive, vertex_format, vertex_count, index_count, vertex_count > UINT16_MAX);
	}

	GpuMesh alloc_mesh(uint32_t vertex_format, uint32_t vertex_count, uint32_t index_count)
	{
		return alloc_mesh(PrimitiveType::Triangles, vertex_format, vertex_count, index_count, vertex_count > UINT16_MAX);
	}

	static uint16_t s_mesh_index = 0;

	Mesh::Mesh(const string& name, bool readback)
		: m_name(name)
		, m_index(++s_mesh_index)
		, m_readback(readback)
		//, m_material(&gfx.debug_material())
		, m_material(nullptr)
	{}

	Mesh::~Mesh()
	{
		this->clear();
	}

	void Mesh::clear()
	{
		if(m_is_dynamic)
		{
			if(bgfx::isValid(m_dynamic.m_vertices)) bgfx::destroy(m_dynamic.m_vertices);
			if(bgfx::isValid(m_dynamic.m_indices)) bgfx::destroy(m_dynamic.m_indices);
		}
		else
		{
			if(bgfx::isValid(m_vertices)) bgfx::destroy(m_vertices);
			if(bgfx::isValid(m_indices)) bgfx::destroy(m_indices);
		}
	}

	void Mesh::read(MeshAdapter& writer, const mat4& transform) const
	{
		MeshAdapter reader = m_cache.read();

		for(size_t i = 0; i < reader.m_vertices.size(); ++i)
		{
			writer.position(mulp(transform, reader.position()));
			if(writer.m_cursor.m_normal)
				writer.normal(muln(transform, reader.normal()));
			if(writer.m_cursor.m_uv0)
				writer.uv0(reader.uv0());
		}

		for(size_t i = 0; i < reader.m_indices.size(); ++i)
		{
			uint32_t index = m_index32 ? reader.index32() : reader.index();
			assert(index <= writer.m_vertices.size());
			writer.index(index);
		}

		writer.next();
	}

	void Mesh::read(MeshPacker& packer, const mat4& transform) const
	{
		MeshAdapter reader = m_cache.read();

		for(size_t i = 0; i < reader.m_vertices.size(); ++i)
		{
			packer.m_positions.push_back(mulp(transform, reader.position()));
			if((m_vertex_format & VertexAttribute::Normal) != 0)
				packer.m_normals.push_back(muln(transform, reader.normal()));
			if((m_vertex_format & VertexAttribute::Colour) != 0)
				packer.m_colours.push_back(reader.colour());
			if((m_vertex_format & VertexAttribute::Tangent) != 0)
				packer.m_tangents.push_back(mult(transform, reader.tangent()));
			if((m_vertex_format & VertexAttribute::TexCoord0) != 0)
				packer.m_uv0s.push_back(reader.uv0());
			if((m_vertex_format & VertexAttribute::TexCoord1) != 0)
				packer.m_uv1s.push_back(reader.uv1());
			//packer.m_bones.push_back(source.bones());
			//packer.m_weights.push_back(source.weights());
		}

		for(size_t i = 0; i < reader.m_indices.size(); ++i)
		{
			packer.m_indices.push_back(m_index32 ? reader.index32() : reader.index());
		}
	}

	void Mesh::upload(const GpuMesh& gpu_mesh)
	{
		this->clear();

		m_primitive = gpu_mesh.m_primitive;
		//m_draw_mode = draw_mode;
		m_vertex_format = gpu_mesh.m_vertex_format;
		m_vertex_count = gpu_mesh.m_vertex_count;
		m_index_count = gpu_mesh.m_index_count;
		m_index32 = gpu_mesh.m_index32;
		m_is_dynamic = gpu_mesh.m_dynamic;

		if(gpu_mesh.m_dynamic)
		{
			m_dynamic.m_vertices = bgfx::createDynamicVertexBuffer(gpu_mesh.m_vertex_memory, vertex_decl(gpu_mesh.m_vertex_format));
			if(gpu_mesh.m_index_count > 0)
				m_dynamic.m_indices = bgfx::createDynamicIndexBuffer(gpu_mesh.m_index_memory, m_index32 ? BGFX_BUFFER_INDEX32 : 0);
		}
		else
		{
			m_vertices = bgfx::createVertexBuffer(gpu_mesh.m_vertex_memory, vertex_decl(gpu_mesh.m_vertex_format));
			if(gpu_mesh.m_index_count > 0)
				m_indices = bgfx::createIndexBuffer(gpu_mesh.m_index_memory, m_index32 ? BGFX_BUFFER_INDEX32 : 0);
		}

		m_aabb = aabb(gpu_mesh.m_writer.m_aabb.lo, gpu_mesh.m_writer.m_aabb.hi);
		m_uv0_rect = { gpu_mesh.m_writer.m_uv0_rect.lo, gpu_mesh.m_writer.m_uv0_rect.hi };
		m_uv1_rect = { gpu_mesh.m_writer.m_uv1_rect.lo, gpu_mesh.m_writer.m_uv1_rect.hi };

		MeshAdapter reader = gpu_mesh.m_writer.read();
		m_radius = 0.f;
		for(size_t i = 0; i < reader.m_vertices.size(); ++i)
			m_radius = max(m_radius, length(reader.position() - m_aabb.m_center));

		m_origin = m_aabb.m_center;

		if(m_readback)
			this->cache(gpu_mesh);
	}

	template <class T>
	void optimize_mesh(const GpuMesh& mesh, GpuMesh& optmesh)
	{
		size_t vertex_stride = vertex_size(mesh.m_vertex_format);

		vector<unsigned int> remap(mesh.m_vertex_count);
		uint32_t index_count = mesh.m_index_count;
		size_t vertex_count = meshopt_generateVertexRemap(remap.data(), (T*)mesh.m_indices.data(), index_count, mesh.m_vertices.data(), mesh.m_vertex_count, vertex_stride);

		// we can't allocate a new mesh with different index size because meshoptimizer remap functions don't allow for different types of indices
		optmesh = alloc_mesh(mesh.m_primitive, mesh.m_vertex_format, uint32_t(vertex_count), index_count, mesh.m_index32);

		optmesh.m_writer.m_aabb = mesh.m_writer.m_aabb;
		optmesh.m_writer.m_uv0_rect = mesh.m_writer.m_uv0_rect;
		optmesh.m_writer.m_uv1_rect = mesh.m_writer.m_uv1_rect;

		meshopt_remapIndexBuffer((T*)optmesh.m_indices.data(), (T*)mesh.m_indices.data(), index_count, remap.data());

		meshopt_remapVertexBuffer(optmesh.m_vertices.data(), mesh.m_vertices.data(), mesh.m_vertex_count, vertex_stride, remap.data());

		meshopt_optimizeVertexCache((T*)optmesh.m_indices.data(), (T*)optmesh.m_indices.data(), index_count, vertex_count);

		meshopt_optimizeOverdraw((T*)optmesh.m_indices.data(), (T*)optmesh.m_indices.data(), index_count, (float*)optmesh.m_vertices.data(), vertex_count, vertex_stride, 1.05f);

		meshopt_optimizeVertexFetch(optmesh.m_vertices.data(), (T*)optmesh.m_indices.data(), index_count, optmesh.m_vertices.data(), vertex_count, vertex_stride);

		//meshopt_simplify(optmesh.m_indices, optmesh.m_indices, index_count, optmesh.m_vertices, vertex_count, vertex_stride);
	}

	void Mesh::upload(const GpuMesh& mesh, bool optimize)
	{
		if(!optimize)
			this->upload(mesh);
		else
		{
			GpuMesh optmesh;

			if(mesh.m_index32)
				optimize_mesh<uint32_t>(mesh, optmesh);
			else
				optimize_mesh<uint16_t>(mesh, optmesh);

			//printf("optimized mesh %s from %i to %i vertices\n", m_name.c_str(), mesh.m_vertex_count, optmesh.m_vertex_count);

			this->upload(optmesh);
		}
	}

	void Mesh::write(const MeshPacker& packer, bool optimize, bool dynamic)
	{
		m_qnormals = packer.m_quantize;

		GpuMesh gpu_mesh = alloc_mesh(packer.m_primitive, packer.vertex_format(), packer.vertex_count(), packer.index_count());
		packer.pack_vertices(gpu_mesh.m_writer, bxidentity());
		gpu_mesh.m_writer.rewind();
		gpu_mesh.m_writer.bound();
		gpu_mesh.m_dynamic = dynamic;

		this->upload(gpu_mesh, optimize);
	}

	void Mesh::cache(const GpuMesh& gpu_mesh)
	{
		m_cached_vertices.resize(gpu_mesh.m_vertex_memory->size);
		if(gpu_mesh.m_index_count)
			m_cached_indices.resize(gpu_mesh.m_index_memory->size);

		memcpy(m_cached_vertices.data(), gpu_mesh.m_vertex_memory->data, gpu_mesh.m_vertex_memory->size);
		if(gpu_mesh.m_index_count)
			memcpy(m_cached_indices.data(), gpu_mesh.m_index_memory->data, gpu_mesh.m_index_memory->size);

		m_cache = MeshAdapter(gpu_mesh.m_vertex_format, { m_cached_vertices.data(), m_vertex_count }, { m_cached_indices.data(), m_index_count }, m_index32);
		m_cache.rewind();
	}

	GpuMesh Mesh::begin()
	{
		return alloc_mesh(m_primitive, m_vertex_format, m_vertex_count, m_index_count, m_index32);
	}

	void Mesh::update(const GpuMesh& gpu_mesh)
	{
		bgfx::update(m_dynamic.m_vertices, 0U, gpu_mesh.m_vertex_memory);
		if(gpu_mesh.m_index_count > 0)
			bgfx::update(m_dynamic.m_indices, 0U, gpu_mesh.m_index_memory);
	}

	Mesh::Direct& Mesh::direct(uint32_t vertex_format, uint32_t vertex_count, uint32_t index_count, bool index32)
	{
		const bgfx::VertexDecl& decl = vertex_decl(vertex_format);
		bgfx::allocTransientVertexBuffer(&m_direct.m_vertices, vertex_count, decl);
		if(index_count)
			bgfx::allocTransientIndexBuffer(&m_direct.m_indices, index_count);
		return m_direct;
	}

	uint64_t Mesh::submit(bgfx::Encoder& encoder) const
	{
		if(m_is_dynamic)
			encoder.setVertexBuffer(0, m_dynamic.m_vertices);
		else if(m_is_direct)
			encoder.setVertexBuffer(0, &m_direct.m_vertices);
		else
			encoder.setVertexBuffer(0, m_vertices);

		if(m_index_count > 0)
		{
			if(m_is_dynamic)
				encoder.setIndexBuffer(m_dynamic.m_indices, m_range.m_start, m_range.m_count);
			else if(m_is_direct)
				encoder.setIndexBuffer(&m_direct.m_indices);
			else
				encoder.setIndexBuffer(m_indices);
		}

		constexpr table<PrimitiveType, uint64_t> bgfx_primitive =
		{
			BGFX_STATE_PT_POINTS,
			BGFX_STATE_PT_LINES,
			BGFX_STATE_PT_LINESTRIP,
			0, // default,
			BGFX_STATE_PT_TRISTRIP,
			0, // unsupported
		};

		uint64_t flags = bgfx_primitive[m_primitive];
		if(m_primitive == PrimitiveType::Lines || m_primitive == PrimitiveType::LineStrip)
			flags |= BGFX_STATE_LINEAA;
		return flags;
	}
}
