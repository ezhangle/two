#pragma once

#include <stl/vector.h>
#include <infra/Api.h>

namespace mud
{
	export_ extern template class vector<string>;
	export_ extern template class vector<uchar>;
}