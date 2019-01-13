#pragma once

#include <infra/Config.h>

#include <infra/Forward.h>
#include <type/Forward.h>
#include <math/Forward.h>
#include <geom/Forward.h>

#ifndef MUD_FRACT_EXPORT
#define MUD_FRACT_EXPORT MUD_IMPORT
#endif

namespace mud
{
    enum class PatternSampling : unsigned int;

    class Pixircle;
    class Circlifier;
    struct Pattern;
    struct FractTab;
    class Fract;
    class FractSample;
}
