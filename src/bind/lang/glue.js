
// Bindings utilities
function WrapperObject() {
}
// Interpreter
function Interpreter() { throw "cannot construct a Interpreter, no constructor in IDL" }
Interpreter.prototype = Object.create(WrapperObject.prototype);
Interpreter.prototype.constructor = Interpreter;
Interpreter.prototype.__class__ = Interpreter;
Interpreter.__cache__ = {};
Module['Interpreter'] = Interpreter;
Interpreter.prototype["__destroy__"] = Interpreter.prototype.__destroy__ = function() {
    var self = this.ptr;
    _Interpreter___destroy__(self);
};
// Pipe
function Pipe() { throw "cannot construct a Pipe, no constructor in IDL" }
Pipe.prototype = Object.create(WrapperObject.prototype);
Pipe.prototype.constructor = Pipe;
Pipe.prototype.__class__ = Pipe;
Pipe.__cache__ = {};
Module['Pipe'] = Pipe;
Pipe.prototype["__destroy__"] = Pipe.prototype.__destroy__ = function() {
    var self = this.ptr;
    _Pipe___destroy__(self);
};
// Process
function Process() { throw "cannot construct a Process, no constructor in IDL" }
Process.prototype = Object.create(WrapperObject.prototype);
Process.prototype.constructor = Process;
Process.prototype.__class__ = Process;
Process.__cache__ = {};
Module['Process'] = Process;
Object.defineProperty(Process.prototype, "type", {
    get: function() {
        var self = this.ptr;
        return _Process_get_type(self);
    },
    set: function(type) {
        var self = this.ptr;
        /* type <Type> [] */
        _Process_set_type(self, type);
    }
});
Process.prototype["__destroy__"] = Process.prototype.__destroy__ = function() {
    var self = this.ptr;
    _Process___destroy__(self);
};
// ScriptClass
function ScriptClass(name, parts) {
    var self = this.ptr;
    ensureCache.prepare();
    /* name <std::string> [] */
    if (name && typeof name === "object") name = name.ptr;
    else name = ensureString(name);
    /* parts <std::vector<mud::Type*>> [] */
    this.ptr = _ScriptClass_ScriptClass_2(self, name, parts); getCache(ScriptClass)[this.ptr] = this;
};
ScriptClass.prototype = Object.create(WrapperObject.prototype);
ScriptClass.prototype.constructor = ScriptClass;
ScriptClass.prototype.__class__ = ScriptClass;
ScriptClass.__cache__ = {};
Module['ScriptClass'] = ScriptClass;
Object.defineProperty(ScriptClass.prototype, "name", {
    get: function() {
        var self = this.ptr;
        return Pointer_stringify(_ScriptClass_get_name(self));
    },
    set: function(name) {
        var self = this.ptr;
        /* name <std::string> [] */
        if (name && typeof name === "object") name = name.ptr;
        else name = ensureString(name);
        _ScriptClass_set_name(self, name);
    }
});
Object.defineProperty(ScriptClass.prototype, "class_type", {
    get: function() {
        var self = this.ptr;
        return _ScriptClass_get_class_type(self);
    },
    set: function(class_type) {
        var self = this.ptr;
        /* class_type <Type> [] */
        _ScriptClass_set_class_type(self, class_type);
    }
});
Object.defineProperty(ScriptClass.prototype, "class", {
    get: function() {
        var self = this.ptr;
        return _ScriptClass_get_class(self);
    },
    set: function(class) {
        var self = this.ptr;
        /* class <Class> [] */
        _ScriptClass_set_class(self, class);
    }
});
ScriptClass.prototype["__destroy__"] = ScriptClass.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ScriptClass___destroy__(self);
};
// ScriptError
function ScriptError() {
    var self = this.ptr;
    this.ptr = _ScriptError_ScriptError_0(self); getCache(ScriptError)[this.ptr] = this;
};
ScriptError.prototype = Object.create(WrapperObject.prototype);
ScriptError.prototype.constructor = ScriptError;
ScriptError.prototype.__class__ = ScriptError;
ScriptError.__cache__ = {};
Module['ScriptError'] = ScriptError;
ScriptError.prototype["__destroy__"] = ScriptError.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ScriptError___destroy__(self);
};
// StreamBranch
function StreamBranch() { throw "cannot construct a StreamBranch, no constructor in IDL" }
StreamBranch.prototype = Object.create(WrapperObject.prototype);
StreamBranch.prototype.constructor = StreamBranch;
StreamBranch.prototype.__class__ = StreamBranch;
StreamBranch.__cache__ = {};
Module['StreamBranch'] = StreamBranch;
StreamBranch.prototype["__destroy__"] = StreamBranch.prototype.__destroy__ = function() {
    var self = this.ptr;
    _StreamBranch___destroy__(self);
};
// Valve
function Valve() { throw "cannot construct a Valve, no constructor in IDL" }
Valve.prototype = Object.create(WrapperObject.prototype);
Valve.prototype.constructor = Valve;
Valve.prototype.__class__ = Valve;
Valve.__cache__ = {};
Module['Valve'] = Valve;
Valve.prototype["__destroy__"] = Valve.prototype.__destroy__ = function() {
    var self = this.ptr;
    _Valve___destroy__(self);
};
// LuaInterpreter
function LuaInterpreter() { throw "cannot construct a LuaInterpreter, no constructor in IDL" }
LuaInterpreter.prototype = Object.create(WrapperObject.prototype);
LuaInterpreter.prototype.constructor = LuaInterpreter;
LuaInterpreter.prototype.__class__ = LuaInterpreter;
LuaInterpreter.__cache__ = {};
Module['LuaInterpreter'] = LuaInterpreter;
LuaInterpreter.prototype["__destroy__"] = LuaInterpreter.prototype.__destroy__ = function() {
    var self = this.ptr;
    _LuaInterpreter___destroy__(self);
};
// ProcessCallable
function ProcessCallable(script, callable) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* callable <Callable> [] */
    this.ptr = _ProcessCallable_ProcessCallable_2(self, script, callable); getCache(ProcessCallable)[this.ptr] = this;
};
ProcessCallable.prototype = Object.create(WrapperObject.prototype);
ProcessCallable.prototype.constructor = ProcessCallable;
ProcessCallable.prototype.__class__ = ProcessCallable;
ProcessCallable.__cache__ = {};
Module['ProcessCallable'] = ProcessCallable;
ProcessCallable.prototype["__destroy__"] = ProcessCallable.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessCallable___destroy__(self);
};
// ProcessCreate
function ProcessCreate(script, type, constructor) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* type <Type> [] */
    /* constructor <Constructor> [] */
    this.ptr = _ProcessCreate_ProcessCreate_3(self, script, type, constructor); getCache(ProcessCreate)[this.ptr] = this;
};
ProcessCreate.prototype = Object.create(WrapperObject.prototype);
ProcessCreate.prototype.constructor = ProcessCreate;
ProcessCreate.prototype.__class__ = ProcessCreate;
ProcessCreate.__cache__ = {};
Module['ProcessCreate'] = ProcessCreate;
ProcessCreate.prototype["__destroy__"] = ProcessCreate.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessCreate___destroy__(self);
};
// ProcessDisplay
function ProcessDisplay() { throw "cannot construct a ProcessDisplay, no constructor in IDL" }
ProcessDisplay.prototype = Object.create(WrapperObject.prototype);
ProcessDisplay.prototype.constructor = ProcessDisplay;
ProcessDisplay.prototype.__class__ = ProcessDisplay;
ProcessDisplay.__cache__ = {};
Module['ProcessDisplay'] = ProcessDisplay;
ProcessDisplay.prototype["__destroy__"] = ProcessDisplay.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessDisplay___destroy__(self);
};
// ProcessFunction
function ProcessFunction(script, function) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* function <Function> [] */
    this.ptr = _ProcessFunction_ProcessFunction_2(self, script, function); getCache(ProcessFunction)[this.ptr] = this;
};
ProcessFunction.prototype = Object.create(WrapperObject.prototype);
ProcessFunction.prototype.constructor = ProcessFunction;
ProcessFunction.prototype.__class__ = ProcessFunction;
ProcessFunction.__cache__ = {};
Module['ProcessFunction'] = ProcessFunction;
ProcessFunction.prototype["__destroy__"] = ProcessFunction.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessFunction___destroy__(self);
};
// ProcessGetMember
function ProcessGetMember(script, member) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* member <Member> [] */
    this.ptr = _ProcessGetMember_ProcessGetMember_2(self, script, member); getCache(ProcessGetMember)[this.ptr] = this;
};
ProcessGetMember.prototype = Object.create(WrapperObject.prototype);
ProcessGetMember.prototype.constructor = ProcessGetMember;
ProcessGetMember.prototype.__class__ = ProcessGetMember;
ProcessGetMember.__cache__ = {};
Module['ProcessGetMember'] = ProcessGetMember;
ProcessGetMember.prototype["__destroy__"] = ProcessGetMember.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessGetMember___destroy__(self);
};
// ProcessInput
function ProcessInput() { throw "cannot construct a ProcessInput, no constructor in IDL" }
ProcessInput.prototype = Object.create(WrapperObject.prototype);
ProcessInput.prototype.constructor = ProcessInput;
ProcessInput.prototype.__class__ = ProcessInput;
ProcessInput.__cache__ = {};
Module['ProcessInput'] = ProcessInput;
ProcessInput.prototype["__destroy__"] = ProcessInput.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessInput___destroy__(self);
};
// ProcessMethod
function ProcessMethod(script, method) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* method <Method> [] */
    this.ptr = _ProcessMethod_ProcessMethod_2(self, script, method); getCache(ProcessMethod)[this.ptr] = this;
};
ProcessMethod.prototype = Object.create(WrapperObject.prototype);
ProcessMethod.prototype.constructor = ProcessMethod;
ProcessMethod.prototype.__class__ = ProcessMethod;
ProcessMethod.__cache__ = {};
Module['ProcessMethod'] = ProcessMethod;
ProcessMethod.prototype["__destroy__"] = ProcessMethod.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessMethod___destroy__(self);
};
// ProcessOutput
function ProcessOutput() { throw "cannot construct a ProcessOutput, no constructor in IDL" }
ProcessOutput.prototype = Object.create(WrapperObject.prototype);
ProcessOutput.prototype.constructor = ProcessOutput;
ProcessOutput.prototype.__class__ = ProcessOutput;
ProcessOutput.__cache__ = {};
Module['ProcessOutput'] = ProcessOutput;
ProcessOutput.prototype["__destroy__"] = ProcessOutput.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessOutput___destroy__(self);
};
// ProcessScript
function ProcessScript(script, target) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* target <VisualScript> [] */
    this.ptr = _ProcessScript_ProcessScript_2(self, script, target); getCache(ProcessScript)[this.ptr] = this;
};
ProcessScript.prototype = Object.create(WrapperObject.prototype);
ProcessScript.prototype.constructor = ProcessScript;
ProcessScript.prototype.__class__ = ProcessScript;
ProcessScript.__cache__ = {};
Module['ProcessScript'] = ProcessScript;
ProcessScript.prototype["__destroy__"] = ProcessScript.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessScript___destroy__(self);
};
// ProcessSetMember
function ProcessSetMember(script, member) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* member <Member> [] */
    this.ptr = _ProcessSetMember_ProcessSetMember_2(self, script, member); getCache(ProcessSetMember)[this.ptr] = this;
};
ProcessSetMember.prototype = Object.create(WrapperObject.prototype);
ProcessSetMember.prototype.constructor = ProcessSetMember;
ProcessSetMember.prototype.__class__ = ProcessSetMember;
ProcessSetMember.__cache__ = {};
Module['ProcessSetMember'] = ProcessSetMember;
ProcessSetMember.prototype["__destroy__"] = ProcessSetMember.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessSetMember___destroy__(self);
};
// ProcessValue
function ProcessValue(script, value) {
    var self = this.ptr;
    /* script <VisualScript> [] */
    /* value <Var> [] */
    this.ptr = _ProcessValue_ProcessValue_2(self, script, value); getCache(ProcessValue)[this.ptr] = this;
};
ProcessValue.prototype = Object.create(WrapperObject.prototype);
ProcessValue.prototype.constructor = ProcessValue;
ProcessValue.prototype.__class__ = ProcessValue;
ProcessValue.__cache__ = {};
Module['ProcessValue'] = ProcessValue;
ProcessValue.prototype["__destroy__"] = ProcessValue.prototype.__destroy__ = function() {
    var self = this.ptr;
    _ProcessValue___destroy__(self);
};
// Script
function Script() { throw "cannot construct a Script, no constructor in IDL" }
Script.prototype = Object.create(WrapperObject.prototype);
Script.prototype.constructor = Script;
Script.prototype.__class__ = Script;
Script.__cache__ = {};
Module['Script'] = Script;
Object.defineProperty(Script.prototype, "index", {
    get: function() {
        var self = this.ptr;
        return _Script_get_index(self);
    },
    set: function(index) {
        var self = this.ptr;
        /* index <uint32_t> [] */
        _Script_set_index(self, index);
    }
});
Object.defineProperty(Script.prototype, "type", {
    get: function() {
        var self = this.ptr;
        return _Script_get_type(self);
    },
    set: function(type) {
        var self = this.ptr;
        /* type <Type> [] */
        _Script_set_type(self, type);
    }
});
Object.defineProperty(Script.prototype, "name", {
    get: function() {
        var self = this.ptr;
        return Pointer_stringify(_Script_get_name(self));
    },
    set: function(name) {
        var self = this.ptr;
        /* name <std::string> [] */
        if (name && typeof name === "object") name = name.ptr;
        else name = ensureString(name);
        _Script_set_name(self, name);
    }
});
Object.defineProperty(Script.prototype, "locked", {
    get: function() {
        var self = this.ptr;
        return !!(_Script_get_locked(self));
    },
    set: function(locked) {
        var self = this.ptr;
        /* locked <bool> [] */
        _Script_set_locked(self, locked);
    }
});
Script.prototype["__destroy__"] = Script.prototype.__destroy__ = function() {
    var self = this.ptr;
    _Script___destroy__(self);
};
// Stream
function Stream() { throw "cannot construct a Stream, no constructor in IDL" }
Stream.prototype = Object.create(WrapperObject.prototype);
Stream.prototype.constructor = Stream;
Stream.prototype.__class__ = Stream;
Stream.__cache__ = {};
Module['Stream'] = Stream;
Stream.prototype["__destroy__"] = Stream.prototype.__destroy__ = function() {
    var self = this.ptr;
    _Stream___destroy__(self);
};
// TextScript
function TextScript(name, language, signature) {
    var self = this.ptr;
    ensureCache.prepare();
    /* name <const char*> [] */
    if (name && typeof name === "object") name = name.ptr;
    else name = ensureString(name);
    /* language <Language> [] */
    /* signature <Signature> [] */
    if (signature === undefined) { this.ptr = _TextScript_TextScript_2(self, name, language); getCache(TextScript)[this.ptr] = this; return; }
    this.ptr = _TextScript_TextScript_3(self, name, language, signature); getCache(TextScript)[this.ptr] = this;
};
TextScript.prototype = Object.create(WrapperObject.prototype);
TextScript.prototype.constructor = TextScript;
TextScript.prototype.__class__ = TextScript;
TextScript.__cache__ = {};
Module['TextScript'] = TextScript;
Object.defineProperty(TextScript.prototype, "language", {
    get: function() {
        var self = this.ptr;
        return _TextScript_get_language(self);
    },
    set: function(language) {
        var self = this.ptr;
        /* language <Language> [] */
        _TextScript_set_language(self, language);
    }
});
Object.defineProperty(TextScript.prototype, "script", {
    get: function() {
        var self = this.ptr;
        return Pointer_stringify(_TextScript_get_script(self));
    },
    set: function(script) {
        var self = this.ptr;
        /* script <std::string> [] */
        if (script && typeof script === "object") script = script.ptr;
        else script = ensureString(script);
        _TextScript_set_script(self, script);
    }
});
Object.defineProperty(TextScript.prototype, "dirty", {
    get: function() {
        var self = this.ptr;
        return !!(_TextScript_get_dirty(self));
    },
    set: function(dirty) {
        var self = this.ptr;
        /* dirty <bool> [] */
        _TextScript_set_dirty(self, dirty);
    }
});
TextScript.prototype["__destroy__"] = TextScript.prototype.__destroy__ = function() {
    var self = this.ptr;
    _TextScript___destroy__(self);
};
// VisualScript
function VisualScript(name, signature) {
    var self = this.ptr;
    ensureCache.prepare();
    /* name <const char*> [] */
    if (name && typeof name === "object") name = name.ptr;
    else name = ensureString(name);
    /* signature <Signature> [] */
    if (signature === undefined) { this.ptr = _VisualScript_VisualScript_1(self, name); getCache(VisualScript)[this.ptr] = this; return; }
    this.ptr = _VisualScript_VisualScript_2(self, name, signature); getCache(VisualScript)[this.ptr] = this;
};
VisualScript.prototype = Object.create(WrapperObject.prototype);
VisualScript.prototype.constructor = VisualScript;
VisualScript.prototype.__class__ = VisualScript;
VisualScript.__cache__ = {};
Module['VisualScript'] = VisualScript;
VisualScript.prototype["__destroy__"] = VisualScript.prototype.__destroy__ = function() {
    var self = this.ptr;
    _VisualScript___destroy__(self);
};
// WrenInterpreter
function WrenInterpreter() { throw "cannot construct a WrenInterpreter, no constructor in IDL" }
WrenInterpreter.prototype = Object.create(WrapperObject.prototype);
WrenInterpreter.prototype.constructor = WrenInterpreter;
WrenInterpreter.prototype.__class__ = WrenInterpreter;
WrenInterpreter.__cache__ = {};
Module['WrenInterpreter'] = WrenInterpreter;
WrenInterpreter.prototype["__destroy__"] = WrenInterpreter.prototype.__destroy__ = function() {
    var self = this.ptr;
    _WrenInterpreter___destroy__(self);
};

(function() {
    function setupEnums() {
        
        // 'Language'
        Module['Language']['Cpp'] = _emscripten_enum_Language_Cpp();
        Module['Language']['Lua'] = _emscripten_enum_Language_Lua();
        Module['Language']['Wren'] = _emscripten_enum_Language_Wren();
    }
    if (Module['calledRun']) setupEnums();
    else addOnPreMain(setupEnums);
})();
