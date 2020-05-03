//  Copyright (c) 2019 Hugo Amiard hugo.amiard@laposte.net
//  This software is provided 'as-is' under the zlib License, see the LICENSE.txt file.
//  This notice and the license may not be removed or altered from any source distribution.

#ifdef TWO_CPP_20
module;
#include <infra/Cpp20.h>
#endif

#ifdef TWO_MODULES
module two.infra;
#else
#include <infra/Log.h>
#endif

#if defined _WIN32
#include <windows.h>
#endif

namespace two
{
	void init_console()
	{
#if defined _WIN32
		HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
		DWORD mode = 0;
		GetConsoleMode(handle, &mode);
		mode |= ENABLE_VIRTUAL_TERMINAL_PROCESSING;
		SetConsoleMode(handle, mode);
#endif
	}
}
