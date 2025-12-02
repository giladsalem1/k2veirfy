function _mergeNamespaces(n2, m2) {
  m2.forEach(function(e) {
    e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach(function(k3) {
      if (k3 !== "default" && !(k3 in n2)) {
        var d = Object.getOwnPropertyDescriptor(e, k3);
        Object.defineProperty(n2, k3, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k3];
          }
        });
      }
    });
  });
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
const p$3 = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p$3();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getDefaultExportFromNamespaceIfPresent(n2) {
  return n2 && Object.prototype.hasOwnProperty.call(n2, "default") ? n2["default"] : n2;
}
function getDefaultExportFromNamespaceIfNotNamed(n2) {
  return n2 && Object.prototype.hasOwnProperty.call(n2, "default") && Object.keys(n2).length === 1 ? n2["default"] : n2;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k3) {
    var d = Object.getOwnPropertyDescriptor(n2, k3);
    Object.defineProperty(a, k3, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k3];
      }
    });
  });
  return a;
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r$1 = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k3 = null, h = null;
  if (null != b)
    for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k3 = "" + b.key), b)
      J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g)
    c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++)
      f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps)
    for (d in g = a.defaultProps, g)
      void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k3, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k3 = typeof a;
  if ("undefined" === k3 || "boolean" === k3)
    a = null;
  var h = false;
  if (null === a)
    h = true;
  else
    switch (k3) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l$1:
          case n$1:
            h = true;
        }
    }
  if (h)
    return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a))
    for (var g = 0; g < a.length; g++) {
      k3 = a[g];
      var f2 = d + Q$1(k3, g);
      h += R$1(k3, b, e, f2, c);
    }
  else if (f2 = A$1(a), "function" === typeof f2)
    for (a = f2.call(a), g = 0; !(k3 = a.next()).done; )
      k3 = k3.value, f2 = d + Q$1(k3, g++), h += R$1(k3, b, e, f2, c);
  else if ("object" === k3)
    throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a)
    return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status)
    return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
var Children = react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
var Component = react_production_min.Component = E$1;
var Fragment$2 = react_production_min.Fragment = p$2;
var Profiler = react_production_min.Profiler = r$1;
var PureComponent = react_production_min.PureComponent = G$1;
var StrictMode = react_production_min.StrictMode = q$1;
var Suspense = react_production_min.Suspense = w;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED$1 = react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
var act = react_production_min.act = X$1;
var cloneElement = react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k3 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k3 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g = a.type.defaultProps;
    for (f2 in b)
      J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k3, props: d, _owner: h };
};
var createContext = react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
var createElement = react_production_min.createElement = M$1;
var createFactory = react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
var createRef = react_production_min.createRef = function() {
  return { current: null };
};
var forwardRef = react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
var isValidElement = react_production_min.isValidElement = O$1;
var lazy$1 = react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
var memo = react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
var startTransition = react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
var unstable_act = react_production_min.unstable_act = X$1;
var useCallback = react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
var useContext = react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
var useDebugValue = react_production_min.useDebugValue = function() {
};
var useDeferredValue = react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
var useEffect = react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
var useId = react_production_min.useId = function() {
  return U$1.current.useId();
};
var useImperativeHandle = react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
var useInsertionEffect = react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
var useLayoutEffect = react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
var useMemo = react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
var useReducer = react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
var useRef = react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
var useState = react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
var useSyncExternalStore = react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
var useTransition = react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
var version$1 = react_production_min.version = "18.3.1";
"use strict";
if (true) {
  react.exports = react_production_min;
} else {
  module.exports = require("./cjs/react.development.js");
}
var React = react.exports;
var React$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": React
}, [react.exports]);
var client = {};
var reactDom$1 = { exports: {} };
var reactDom_production_min = {};
var scheduler$1 = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports2) {
  "use strict";
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a:
      for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b))
          a[d] = b, a[c] = e, c = d;
        else
          break a;
      }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k3(a) {
    if (0 === a.length)
      return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a:
        for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
          var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
          if (0 > g(C2, c))
            n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
          else if (n2 < e && 0 > g(x2, c))
            a[d] = x2, a[n2] = c, d = n2;
          else
            break a;
        }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports2.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports2.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback)
        k3(t2);
      else if (b.startTime <= a)
        k3(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else
        break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2)
      if (null !== h(r2))
        A2 = true, I2(J2);
      else {
        var b = h(t2);
        null !== b && K2(H2, b.startTime - a);
      }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports2.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k3(r2);
          G2(b);
        } else
          k3(r2);
        v2 = h(r2);
      }
      if (null !== v2)
        var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports2.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports2.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if ("function" === typeof F2)
    S2 = function() {
      F2(R2);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports2.unstable_now());
    }, b);
  }
  exports2.unstable_IdlePriority = 5;
  exports2.unstable_ImmediatePriority = 1;
  exports2.unstable_LowPriority = 4;
  exports2.unstable_NormalPriority = 3;
  exports2.unstable_Profiling = null;
  exports2.unstable_UserBlockingPriority = 2;
  exports2.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports2.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports2.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports2.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports2.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports2.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports2.unstable_pauseExecution = function() {
  };
  exports2.unstable_requestPaint = function() {
  };
  exports2.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports2.unstable_scheduleCallback = function(a, b, c) {
    var d = exports2.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports2.unstable_shouldYield = M2;
  exports2.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
"use strict";
if (true) {
  scheduler$1.exports = scheduler_production_min;
} else {
  module.exports = require("./cjs/scheduler.development.js");
}
var scheduler = scheduler$1.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
var aa = react.exports, ca = scheduler$1.exports;
function p$1(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++)
    da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a))
    return true;
  if (ja.call(la, a))
    return false;
  if (ka.test(a))
    return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type)
    return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (null !== c)
        return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d))
    return true;
  if (d)
    return false;
  if (null !== c)
    switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1])
    qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
Symbol.for("react.scope");
Symbol.for("react.debug_trace_mode");
var Ia = Symbol.for("react.offscreen");
Symbol.for("react.legacy_hidden");
Symbol.for("react.cache");
Symbol.for("react.tracing_marker");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La)
    try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na)
    return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b)
      if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d = l2;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d = l2;
        }
        a.call(b.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; )
        h--;
      for (; 1 <= g && 0 <= h; g--, h--)
        if (e[g] !== f2[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f2[h]) {
                var k3 = "\n" + e[g].replace(" at new ", " at ");
                a.displayName && k3.includes("<anonymous>") && (k3 = k3.replace("<anonymous>", a.displayName));
                return k3;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a)
    return null;
  if ("function" === typeof a)
    return a.displayName || a.name || null;
  if ("string" === typeof a)
    return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a)
    switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
      case Ha:
        b = a._payload;
        a = a._init;
        try {
          return Qa(a(b));
        } catch (c) {
        }
    }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b)
        return b.displayName || b.name || null;
      if ("string" === typeof b)
        return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a)
    return false;
  var b = a._valueTracker;
  if (!b)
    return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a)
    return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c)
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c)
        a.value = "" + c;
    } else
      a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
      return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a)
    null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++)
      b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++)
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML)
    throw Error(p$1(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b)
        throw Error(p$1(92));
      if (eb(c)) {
        if (1 < c.length)
          throw Error(p$1(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a)
    a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; )
      a.removeChild(a.firstChild);
    for (; b.firstChild; )
      a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b)
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
      throw Error(p$1(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children)
        throw Error(p$1(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML))
        throw Error(p$1(61));
    }
    if (null != b.style && "object" !== typeof b.style)
      throw Error(p$1(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-"))
    return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb)
      throw Error(p$1(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b)
      for (a = 0; a < b.length; a++)
        Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib)
    return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab)
      Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c)
    return null;
  var d = Db(c);
  if (null === d)
    return null;
  c = d[b];
  a:
    switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
  if (a)
    return null;
  if (c && "function" !== typeof c)
    throw Error(p$1(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
function Nb(a, b, c, d, e, f2, g, h, k3) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k3) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k3) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else
      throw Error(p$1(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate)
    for (; b.return; )
      b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b)
      return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a)
    throw Error(p$1(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b)
      throw Error(p$1(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e)
      break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c)
          return Xb(e), a;
        if (f2 === d)
          return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p$1(188));
    }
    if (c.return !== d.return)
      c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g)
          throw Error(p$1(189));
      }
    }
    if (c.alternate !== d)
      throw Error(p$1(190));
  }
  if (3 !== c.tag)
    throw Error(p$1(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag)
    return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b)
      return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot)
    try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c)
    return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else
    g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d)
    return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240)))
    return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b)
    for (a = a.entanglements, b &= d; 0 < b; )
      c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k3 = e[g];
    if (-1 === k3) {
      if (0 === (h & c) || 0 !== (h & d))
        e[g] = vc(h, b);
    } else
      k3 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++)
    b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2)
    return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn)
    return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else
      return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++)
    d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); )
    Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e)
      hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d))
      d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e)
          break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else
      hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a)
    if (b = Vb(a), null === b)
      a = null;
    else if (c = b.tag, 13 === c) {
      a = Wb(b);
      if (null !== a)
        return a;
      a = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated)
        return 3 === b.tag ? b.stateNode.containerInfo : null;
      a = null;
    } else
      b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++)
    ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++)
    ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a)
      a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a)
    return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b)
      return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie)
    return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length)
          return b.char;
        if (b.which)
          return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b))
    return a;
}
function ve(a, b) {
  if ("change" === a)
    return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a)
    return te(qe);
}
function Ee(a, b) {
  if ("click" === a)
    return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a)
    return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b))
    return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
    return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length)
    return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e]))
      return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; )
    a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b)
        return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c)
      a = b.contentWindow;
    else
      break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c)
        c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; )
      1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++)
      a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a])
    return Xe[a];
  if (!We[a])
    return a;
  var b = We[a], c;
  for (c in b)
    if (b.hasOwnProperty(c) && c in Ye)
      return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b)
        for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k3 = h.instance, l2 = h.currentTarget;
          h = h.listener;
          if (k3 !== f2 && e.isPropagationStopped())
            break a;
          nf(e, h, l2);
          f2 = k3;
        }
      else
        for (g = 0; g < d.length; g++) {
          h = d[g];
          k3 = h.instance;
          l2 = h.currentTarget;
          h = h.listener;
          if (k3 !== f2 && e.isPropagationStopped())
            break a;
          nf(e, h, l2);
          f2 = k3;
        }
    }
  }
  if (Qb)
    throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d)
    a:
      for (; ; ) {
        if (null === d)
          return;
        var g = d.tag;
        if (3 === g || 4 === g) {
          var h = d.stateNode.containerInfo;
          if (h === e || 8 === h.nodeType && h.parentNode === e)
            break;
          if (4 === g)
            for (g = d.return; null !== g; ) {
              var k3 = g.tag;
              if (3 === k3 || 4 === k3) {
                if (k3 = g.stateNode.containerInfo, k3 === e || 8 === k3.nodeType && k3.parentNode === e)
                  return;
              }
              g = g.return;
            }
          for (; null !== h; ) {
            g = Wc(h);
            if (null === g)
              return;
            k3 = g.tag;
            if (5 === k3 || 6 === k3) {
              d = f2 = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k4 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c))
              break a;
          case "keydown":
          case "keyup":
            k4 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k4 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k4 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k4 = Fd;
            break;
          case "click":
            if (2 === c.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k4 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k4 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k4 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k4 = Hd;
            break;
          case cf:
            k4 = Xd;
            break;
          case "scroll":
            k4 = vd;
            break;
          case "wheel":
            k4 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k4 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k4 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2)
            break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k4(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k4 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf]))
          break a;
        if (k4 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k4) {
            if (n2 = c.relatedTarget || c.toElement, k4 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag))
              n2 = null;
          } else
            k4 = null, n2 = d2;
          if (k4 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a)
              t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k4 ? h2 : ue(k4);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k4, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k4 && n2)
              b: {
                t2 = k4;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2))
                  w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2))
                  u2++;
                for (; 0 < w2 - u2; )
                  t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; )
                  x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate)
                    break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
            else
              t2 = null;
            null !== k4 && wf(g2, h2, k4, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k4 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k4 || "input" === k4 && "file" === h2.type)
          var na = ve;
        else if (me(h2))
          if (we)
            na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
        else
          (k4 = h2.nodeName) && "input" === k4.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable)
            Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae)
        b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
      else
        ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c))
        d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a)
    return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k3 = h.alternate, l2 = h.stateNode;
    if (null !== k3 && k3 === d)
      break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k3 = Kb(c, f2), null != k3 && g.unshift(tf(c, k3, h))) : e || (k3 = Kb(c, f2), null != k3 && g.push(tf(c, k3, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c)
    throw Error(p$1(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType)
      if (c = e.data, "/$" === c) {
        if (0 === d) {
          a.removeChild(e);
          bd(b);
          return;
        }
        d--;
      } else
        "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b)
      break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b)
        break;
      if ("/$" === b)
        return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b)
          return a;
        b--;
      } else
        "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b)
    return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child)
        for (a = Mf(a); null !== a; ) {
          if (c = a[Of])
            return c;
          a = Mf(a);
        }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag)
    return a.stateNode;
  throw Error(p$1(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c)
    return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c)
    e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf)
    throw Error(p$1(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext)
    return c;
  d = d.getChildContext();
  for (var e in d)
    if (!(e in b))
      throw Error(p$1(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d)
    throw Error(p$1(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else
    rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a))
          throw Error(p$1(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a))
        throw Error(p$1(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
    a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg)
    return false;
  if (!I)
    return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a))
      throw Hg(), Error(p$1(418));
    for (; b; )
      Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a)
      throw Error(p$1(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else
            "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; )
    a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag)
          throw Error(p$1(309));
        var d = c.stateNode;
      }
      if (!d)
        throw Error(p$1(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2)
        return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a)
      throw Error(p$1(284));
    if (!c._owner)
      throw Error(p$1(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p$1(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a)
      return null;
    for (; null !== d2; )
      b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
      null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a)
      return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2)
      return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag)
      return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k3(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya)
      return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type))
      return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
      return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag)
      return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2)
      return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2))
        return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2)
      return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k3(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2))
        return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
      return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k3(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2))
        return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k4) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k4);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length)
      return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++)
        u2 = q2(e2, h2[w2], k4), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++)
      x2 = y2(u2, e2, w2, h2[w2], k4), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k4) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3)
      throw Error(p$1(150));
    h2 = l3.call(h2);
    if (null == h2)
      throw Error(p$1(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k4);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done)
      return c(
        e2,
        m3
      ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next())
        n3 = q2(e2, n3.value, k4), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next())
      n3 = y2(m3, e2, w2, n3.value, k4), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k4 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k4) {
                k4 = f3.type;
                if (k4 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k4 || "object" === typeof k4 && null !== k4 && k4.$$typeof === Ha && Ng(k4) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else
                b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3)
                if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
              else
                b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3))
        return n2(a2, d2, f3, h2);
      if (Ka(f3))
        return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c)
      break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a)
    if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg)
        throw Error(p$1(308));
      Yg = a;
      Xg.dependencies = { lanes: 0, firstContext: a };
    } else
      Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; )
    a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d)
    return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else
      e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k3 = h, l2 = k3.next;
    k3.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k3;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k3));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k3 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2)
                break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else
        y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k3 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h)
        if (h = e.shared.pending, null === h)
          break;
        else
          r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k3 = q2);
    e.baseState = k3;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else
      null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a)
    for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e)
          throw Error(p$1(191, e));
        e.call(d);
      }
    }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th)
    throw Error(p$1(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
        return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128))
        return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a)
      break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a)
        return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++)
    Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p$1(321));
}
function Mh(a, b) {
  if (null === b)
    return false;
  for (var c = 0; c < b.length && c < a.length; c++)
    if (!He(a[c], b[c]))
      return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2)
        throw Error(p$1(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b)
    throw Error(p$1(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else
    a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b)
    O = b, N = a;
  else {
    if (null === a)
      throw Error(p$1(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c)
    throw Error(p$1(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k3 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2)
        null !== k3 && (k3 = k3.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k3 ? (h = k3 = q2, g = d) : k3 = k3.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k3 ? g = d : k3.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k3;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else
    null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c)
    throw Error(p$1(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q)
      throw Error(p$1(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b)
    return a = a(), b(a), function() {
      b(null);
    };
  if (null !== b && void 0 !== b)
    return a = a(), b.current = a, function() {
      b.current = null;
    };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1]))
    return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1]))
    return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21))
    return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a))
    Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a))
    Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2))
      try {
        var g = b.lastRenderedState, h = f2(g, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g)) {
          var k3 = b.interleaved;
          null === k3 ? (e.next = e, gh(b)) : (e.next = k3.next, k3.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l2) {
      } finally {
      }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c)
      throw Error(p$1(407));
    c = c();
  } else {
    c = b();
    if (null === Q)
      throw Error(p$1(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else
    c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a)
      void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else
    e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag)
      b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b)
      return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1))
    return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps)
      return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref)
      return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref)
      if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e))
        0 !== (a.flags & 131072) && (dh = true);
      else
        return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode)
    if (0 === (b.mode & 1))
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
    else {
      if (0 === (c & 1073741824))
        return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f2 ? f2.baseLanes : c;
      G(ej, fj);
      fj |= d;
    }
  else
    null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c)
    b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else
    f2 = false;
  ch(b, e);
  if (null === b.stateNode)
    ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k3 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k3 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k3 = b.memoizedState;
    h !== d || r2 !== k3 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k3 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k3, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k3), g.props = d, g.state = k3, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k3 = c.contextType;
    "object" === typeof k3 && null !== k3 ? k3 = eh(k3) : (k3 = Zf(c) ? Xf : H.current, k3 = Yf(b, k3));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k3) && Hi(b, g, d, k3);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k3) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k3), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k3)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k3, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g)
    return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h)
    f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState)
    e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a))
      return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h))
    return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k3 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k3, b.deletions = null) : (d = Pg(e, k3), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256)
      return b.flags &= -257, d = Ki(Error(p$1(422))), sj(a, b, g, d);
    if (null !== b.memoizedState)
      return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1))
    return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d)
      var h = d.dgst;
    d = h;
    f2 = Error(p$1(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p$1(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data)
    return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2))
    d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128))
      a:
        for (a = b.child; null !== a; ) {
          if (13 === a.tag)
            null !== a.memoizedState && vj(a, c, b);
          else if (19 === a.tag)
            vj(a, c, b);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b)
            break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b)
              break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1))
    b.memoizedState = null;
  else
    switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; )
          a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        wj(b, false, e, c, f2);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Ch(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        wj(b, true, c, null, f2);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes))
    return null;
  if (null !== a && b.child !== a.child)
    throw Error(p$1(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; )
      a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated)
          return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes))
          return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d)
          return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d)
        break;
      else
        return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag)
      a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e)
      if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2])
        if ("style" === l2) {
          var h = e[l2];
          for (g in h)
            h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
        } else
          "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k3 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k3 !== h && (null != k3 || null != h))
        if ("style" === l2)
          if (h) {
            for (g in h)
              !h.hasOwnProperty(g) || k3 && k3.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
            for (g in k3)
              k3.hasOwnProperty(g) && h[g] !== k3[g] && (c || (c = {}), c[g] = k3[g]);
          } else
            c || (f2 || (f2 = []), f2.push(
              l2,
              c
            )), c = k3;
        else
          "dangerouslySetInnerHTML" === l2 ? (k3 = k3 ? k3.__html : void 0, h = h ? h.__html : void 0, null != k3 && h !== k3 && (f2 = f2 || []).push(l2, k3)) : "children" === l2 ? "string" !== typeof k3 && "number" !== typeof k3 || (f2 = f2 || []).push(l2, "" + k3) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k3 && "onScroll" === l2 && D("scroll", a), f2 || h === k3 || (f2 = [])) : (f2 = f2 || []).push(l2, k3));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2)
      b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I)
    switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; )
          null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; )
          null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b)
    for (var e = a.child; null !== e; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else
    for (e = a.child; null !== e; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child)
        Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode)
        Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode)
            throw Error(p$1(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++)
                D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2)
            if (f2.hasOwnProperty(g)) {
              var h = f2[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
            }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++)
                  D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h)
              if (h.hasOwnProperty(f2)) {
                var k3 = h[f2];
                "style" === f2 ? sb(a, k3) : "dangerouslySetInnerHTML" === f2 ? (k3 = k3 ? k3.__html : void 0, null != k3 && nb(a, k3)) : "children" === f2 ? "string" === typeof k3 ? ("textarea" !== c || "" !== k3) && ob(a, k3) : "number" === typeof k3 && ob(a, "" + k3) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k3 && "onScroll" === f2 && D("scroll", a) : null != k3 && ta(a, f2, k3, g));
              }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode)
        Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode)
          throw Error(p$1(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a)
              switch (a.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
              }
          }
          f2 && (b.flags |= 4);
        } else
          d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128))
          Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2)
              throw Error(p$1(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2)
              throw Error(p$1(317));
            f2[Of] = b;
          } else
            Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else
          null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2)
          return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128))
        return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2)
        return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g)
        if (d)
          Dj(f2, false);
        else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128))
            for (a = b.child; null !== a; ) {
              g = Ch(a);
              if (null !== g) {
                b.flags |= 128;
                Dj(f2, false);
                d = g.updateQueue;
                null !== d && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c;
                for (c = b.child; null !== c; )
                  f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                G(L, L.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
          null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        }
      else {
        if (!d)
          if (a = Ch(g), null !== a) {
            if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I)
              return S(b), null;
          } else
            2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail)
        return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$1(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate)
          throw Error(p$1(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c)
    if ("function" === typeof c)
      try {
        c(null);
      } catch (d) {
        W(a, b, d);
      }
    else
      c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a)
      var c = { start: a.selectionStart, end: a.selectionEnd };
    else
      a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f2.nodeType;
          } catch (F2) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k3 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
                q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k3 = g + d);
                3 === q2.nodeType && (g += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild))
                  break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a)
                  break b;
                r2 === c && ++l2 === e && (h = g);
                r2 === f2 && ++m2 === d && (k3 = g);
                if (null !== (y2 = q2.nextSibling))
                  break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
          c = -1 === h || -1 === k3 ? null : { start: h, end: k3 };
        } else
          c = null;
      }
    c = c || { start: 0, end: 0 };
  } else
    c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; )
    if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a)
      a.return = b, V = a;
    else
      for (; null !== V; ) {
        b = V;
        try {
          var n2 = b.alternate;
          if (0 !== (b.flags & 1024))
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n2) {
                  var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u2 = b.stateNode.containerInfo;
                1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$1(163));
            }
        } catch (F2) {
          W(b, b.return, F2);
        }
        a = b.sibling;
        if (null !== a) {
          a.return = b.return;
          V = a;
          break;
        }
        V = b.return;
      }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a:
    for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Tj(a.return))
          return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2)
          continue a;
        if (null === a.child || 4 === a.tag)
          continue a;
        else
          a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2))
        return a.stateNode;
    }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d)
    a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a))
    for (Vj(a, b, c), a = a.sibling; null !== a; )
      Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d)
    a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a))
    for (Wj(a, b, c), a = a.sibling; null !== a; )
      Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; )
    Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount)
    try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount))
        try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W(c, b, h);
        }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c)
    for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f2 = a, g = b, h = g;
        a:
          for (; null !== h; ) {
            switch (h.tag) {
              case 5:
                X = h.stateNode;
                Xj = false;
                break a;
              case 3:
                X = h.stateNode.containerInfo;
                Xj = true;
                break a;
              case 4:
                X = h.stateNode.containerInfo;
                Xj = true;
                break a;
            }
            h = h.return;
          }
        if (null === X)
          throw Error(p$1(160));
        Zj(f2, g, e);
        X = null;
        Xj = false;
        var k3 = e.alternate;
        null !== k3 && (k3.return = null);
        e.return = null;
      } catch (l2) {
        W(e, b, l2);
      }
    }
  if (b.subtreeFlags & 12854)
    for (b = b.child; null !== b; )
      dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k3 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k3)
          try {
            "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
            vb(h, g);
            var l2 = vb(h, f2);
            for (g = 0; g < k3.length; g += 2) {
              var m2 = k3[g], q2 = k3[g + 1];
              "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
            }
            switch (h) {
              case "input":
                bb(e, f2);
                break;
              case "textarea":
                ib(e, f2);
                break;
              case "select":
                var r2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t2) {
            W(a, a.return, t2);
          }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode)
          throw Error(p$1(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated)
        try {
          bd(b.containerInfo);
        } catch (t2) {
          W(a, a.return, t2);
        }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1))
          for (V = a, m2 = a.child; null !== m2; ) {
            for (q2 = V = m2; null !== V; ) {
              r2 = V;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r2, r2.return);
                  break;
                case 1:
                  Lj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d = r2;
                    c = r2.return;
                    try {
                      b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d, c, t2);
                    }
                  }
                  break;
                case 5:
                  Lj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    gk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
            }
            m2 = m2.sibling;
          }
        a:
          for (m2 = null, q2 = a; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k3 = q2.memoizedProps.style, g = void 0 !== k3 && null !== k3 && k3.hasOwnProperty("display") ? k3.display : null, h.style.display = rb("display", g));
                } catch (t2) {
                  W(a, a.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2)
                try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t2) {
                  W(a, a.return, t2);
                }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a)
              break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a)
                break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p$1(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p$1(161));
      }
    } catch (k3) {
      W(a, a.return, k3);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a, b, c);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k3 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k3) && !l2)
          for (V = e; null !== V; )
            g = V, k3 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k3 ? (k3.return = g, V = k3) : jk(e);
        for (; null !== f2; )
          V = f2, ik(f2, b, c), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a, b, c);
    } else
      0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a, b, c);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772))
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Qj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U)
                if (null === c)
                  d.componentDidMount();
                else {
                  var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                  d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b.updateQueue;
              null !== f2 && sh(b, f2, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child)
                  switch (b.child.tag) {
                    case 5:
                      c = b.child.stateNode;
                      break;
                    case 1:
                      c = b.child.stateNode;
                  }
                sh(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k3 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k3.autoFocus && c.focus();
                    break;
                  case "img":
                    k3.src && (c.src = k3.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l2 = b.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$1(163));
          }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k3) {
            W(b, c, k3);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k3) {
              W(b, e, k3);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k3) {
            W(b, f2, k3);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k3) {
            W(b, g, k3);
          }
      }
    } catch (k3) {
      W(b, b.return, k3);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1))
    return 1;
  if (0 !== (K & 2) && 0 !== Z)
    return Z & -Z;
  if (null !== Kg.transition)
    return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a)
    return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk)
    throw yk = 0, zk = null, Error(p$1(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q)
    a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d)
    null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b)
      0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
        0 === (K & 6) && jg();
      }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6))
    throw Error(p$1(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c)
    return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d)
    return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b)
    b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b)
      uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b)
      throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b)
      Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b))
        throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p$1(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0))
              break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d)
            break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p$1(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c))
        for (var d = 0; d < c.length; d++) {
          var e = c[d], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f2(), e))
              return false;
          } catch (g) {
            return false;
          }
        }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c)
      c.return = b, b = c;
    else {
      if (b === a)
        break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a)
          return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6))
    throw Error(p$1(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1))
    return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c)
    throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c)
    throw Error(p$1(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a)
      return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y)
    for (c = Y.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          zh();
          E(Wf);
          E(H);
          Eh();
          break;
        case 5:
          Bh(d);
          break;
        case 4:
          zh();
          break;
        case 13:
          E(L);
          break;
        case 19:
          E(L);
          break;
        case 10:
          ah(d.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c = c.return;
    }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++)
      if (c = fh[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e = d.next, f2 = c.pending;
        if (null !== f2) {
          var g = f2.next;
          f2.next = e;
          d.next = g;
        }
        c.pending = d;
      }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k3 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k3 && "object" === typeof k3 && "function" === typeof k3.then) {
          var l2 = k3, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k3 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k3);
              b.updateQueue = t2;
            } else
              n2.add(k3);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k3 = Error(p$1(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k3, h));
            break a;
          }
        }
        f2 = k3 = Ji(k3, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k3, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k3;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T)
    T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b)
    uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y)
    throw Error(p$1(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; )
    Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); )
    Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a)
        a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6))
    throw Error(p$1(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c)
    return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current)
    throw Error(p$1(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c, a, e);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else
    a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode, d);
  Dk(a, B());
  if (null !== b)
    for (d = a.onRecoverableError, c = 0; c < b.length; c++)
      e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi)
    throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk)
        var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6))
          throw Error(p$1(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k3 = 0; k3 < h.length; k3++) {
                var l2 = h[k3];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2)
                    q2.return = m2, V = q2;
                  else
                    for (; null !== V; ) {
                      m2 = V;
                      var r2 = m2.sibling, y2 = m2.return;
                      Sj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V = r2;
                        break;
                      }
                      V = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g)
            g.return = f2, V = g;
          else
            b:
              for (; null !== V; ) {
                f2 = V;
                if (0 !== (f2.flags & 2048))
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f2, f2.return);
                  }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V = x2;
                  break b;
                }
                V = f2.return;
              }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2)
            u2.return = g, V = u2;
          else
            b:
              for (g = w2; null !== V; ) {
                h = V;
                if (0 !== (h.flags & 2048))
                  try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                if (h === g) {
                  V = null;
                  break b;
                }
                var F2 = h.sibling;
                if (null !== F2) {
                  F2.return = h.return;
                  V = F2;
                  break b;
                }
                V = h.return;
              }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot)
          try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag)
    Xk(a, a, c);
  else
    for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
          a = Ji(c, a);
          a = Qi(b, a, 1);
          b = nh(b, a, 1);
          a = R();
          null !== b && (Ac(b, 1, a), Dk(b, a));
          break;
        }
      }
      b = b.return;
    }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p$1(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a)
    if (a.memoizedProps !== b.pendingProps || Wf.current)
      dh = true;
    else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128))
        return dh = false, yj(a, b, c);
      dh = 0 !== (a.flags & 131072) ? true : false;
    }
  else
    dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p$1(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a)
          throw Error(p$1(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated)
          if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e = Ji(Error(p$1(423)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ji(Error(p$1(424)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else
            for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; )
              c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2)
          if (He(f2.value, g)) {
            if (f2.children === e.children && !Wf.current) {
              b = Zi(a, b, c);
              break a;
            }
          } else
            for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
              var h = f2.dependencies;
              if (null !== h) {
                g = f2.child;
                for (var k3 = h.firstContext; null !== k3; ) {
                  if (k3.context === d) {
                    if (1 === f2.tag) {
                      k3 = mh(-1, c & -c);
                      k3.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k3.next = k3 : (k3.next = m2.next, m2.next = k3);
                        l2.pending = k3;
                      }
                    }
                    f2.lanes |= c;
                    k3 = f2.alternate;
                    null !== k3 && (k3.lanes |= c);
                    bh(
                      f2.return,
                      c,
                      b
                    );
                    h.lanes |= c;
                    break;
                  }
                  k3 = k3.next;
                }
              } else if (10 === f2.tag)
                g = f2.type === b.type ? null : f2.child;
              else if (18 === f2.tag) {
                g = f2.return;
                if (null === g)
                  throw Error(p$1(341));
                g.lanes |= c;
                h = g.alternate;
                null !== h && (h.lanes |= c);
                bh(g, c, b);
                g = f2.sibling;
              } else
                g = f2.child;
              if (null !== g)
                g.return = f2;
              else
                for (g = f2; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f2 = g.sibling;
                  if (null !== f2) {
                    f2.return = g.return;
                    g = f2;
                    break;
                  }
                  g = g.return;
                }
              f2 = g;
            }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p$1(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a)
    return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da)
      return 11;
    if (a === Ga)
      return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a)
    aj(a) && (g = 1);
  else if ("string" === typeof a)
    g = 5;
  else
    a:
      switch (a) {
        case ya:
          return Tg(c.children, e, f2, b);
        case za:
          g = 8;
          e |= 8;
          break;
        case Aa:
          return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
        case Ea:
          return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
        case Fa:
          return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
        case Ia:
          return pj(c, e, f2, b);
        default:
          if ("object" === typeof a && null !== a)
            switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
          throw Error(p$1(130, null == a ? a : typeof a, ""));
      }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k3) {
  a = new al(a, b, c, h, k3);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a)
    return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag)
      throw Error(p$1(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p$1(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c))
      return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k3) {
  a = bl(c, d, true, a, e, f2, g, h, k3);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child)
    return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b)
    throw Error(p$1(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++)
      ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; )
    a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k3);
      h.call(a2);
    };
  }
  var k3 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k3;
  a[uf] = k3.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k3, c, d);
  });
  return k3;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else
    g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; )
          c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e)
              throw Error(p$1(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber)
    try {
      kc = vl.inject(ul), lc = vl;
    } catch (a) {
    }
}
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
var createPortal = reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b))
    throw Error(p$1(200));
  return cl(a, b, null, c);
};
var createRoot$1 = reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a))
    throw Error(p$1(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
var findDOMNode = reactDom_production_min.findDOMNode = function(a) {
  if (null == a)
    return null;
  if (1 === a.nodeType)
    return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render)
      throw Error(p$1(188));
    a = Object.keys(a).join(",");
    throw Error(p$1(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
var flushSync = reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
var hydrate = reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b))
    throw Error(p$1(200));
  return rl(null, a, b, true, c);
};
var hydrateRoot$1 = reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a))
    throw Error(p$1(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d)
    for (a = 0; a < d.length; a++)
      c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
        c,
        e
      );
  return new ml(b);
};
var render = reactDom_production_min.render = function(a, b, c) {
  if (!ol(b))
    throw Error(p$1(200));
  return rl(null, a, b, false, c);
};
var unmountComponentAtNode = reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a))
    throw Error(p$1(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
var unstable_batchedUpdates = reactDom_production_min.unstable_batchedUpdates = Qk;
var unstable_renderSubtreeIntoContainer = reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c))
    throw Error(p$1(200));
  if (null == a || void 0 === a._reactInternals)
    throw Error(p$1(38));
  return rl(a, b, c, false, d);
};
var version = reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
"use strict";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  if (false) {
    throw new Error("^_^");
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
if (true) {
  checkDCE();
  reactDom$1.exports = reactDom_production_min;
} else {
  module.exports = require("./cjs/react-dom.development.js");
}
var reactDom = reactDom$1.exports;
var ReactDOM = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  "default": reactDom
}, [reactDom$1.exports]);
var hydrateRoot;
var createRoot;
"use strict";
var m$1 = reactDom$1.exports;
if (true) {
  createRoot = client.createRoot = m$1.createRoot;
  hydrateRoot = client.hydrateRoot = m$1.hydrateRoot;
} else {
  var i = m$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m$1.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m$1.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries;
  entries = initialEntries.map((entry, index2) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index2 === 0 ? "default" : void 0));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;
  function clampIndex(n2) {
    return Math.min(Math.max(n2, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$3({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    key: to && to.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends$3({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace2(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
const immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties2, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id2 = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id2], 'Found a route id collision on id "' + id2 + `".  Route id's must be globally unique within Data Router usages`);
    if (isIndexRoute(route)) {
      let indexRoute = _extends$3({}, route, mapRouteProperties2(route), {
        id: id2
      });
      manifest[id2] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends$3({}, route, mapRouteProperties2(route), {
        id: id2,
        children: void 0
      });
      manifest[id2] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i2], decoded, allowPartial);
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n2, i2) => n2 === b[i2]);
  return siblings ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
    path = path.replace(/\*$/, "/*");
  }
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify = (p2) => p2 == null ? "" : typeof p2 === "string" ? p2 : String(p2);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    if (isLastSegment && segment === "*") {
      const star = "*";
      return stringify(params[star]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, 'Missing ":' + key + '" param');
      return stringify(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo2, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo2[paramName] = void 0;
    } else {
      memo2[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo2;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$3({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
const json = function json2(data2, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data2), _extends$3({}, responseInit, {
    headers
  }));
};
class DataWithResponseInit {
  constructor(data2, init) {
    this.type = "DataWithResponseInit";
    this.data = data2;
    this.init = init || null;
  }
}
function data(data2, init) {
  return new DataWithResponseInit(data2, typeof init === "number" ? {
    status: init
  } : init);
}
class AbortedDeferredError extends Error {
}
class DeferredData {
  constructor(data2, responseInit) {
    this.pendingKeysSet = /* @__PURE__ */ new Set();
    this.subscribers = /* @__PURE__ */ new Set();
    this.deferredKeys = [];
    invariant(data2 && typeof data2 === "object" && !Array.isArray(data2), "defer() only accepts plain objects");
    let reject;
    this.abortPromise = new Promise((_, r2) => reject = r2);
    this.controller = new AbortController();
    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data2).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
    if (this.done) {
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }
    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key);
    let promise = Promise.race([value, this.abortPromise]).then((data2) => this.onSettle(promise, key, void 0, data2), (error) => this.onSettle(promise, key, error));
    promise.catch(() => {
    });
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }
  onSettle(promise, key, error, data2) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }
    this.pendingKeysSet.delete(key);
    if (this.done) {
      this.unlistenAbortSignal();
    }
    if (error === void 0 && data2 === void 0) {
      let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
      Object.defineProperty(promise, "_error", {
        get: () => undefinedError
      });
      this.emit(false, key);
      return Promise.reject(undefinedError);
    }
    if (data2 === void 0) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }
    Object.defineProperty(promise, "_data", {
      get: () => data2
    });
    this.emit(false, key);
    return data2;
  }
  emit(aborted, settledKey) {
    this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
  }
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v2, k3) => this.pendingKeysSet.delete(k3));
    this.emit(true);
  }
  async resolveData(signal) {
    let aborted = false;
    if (!this.done) {
      let onAbort = () => this.cancel();
      signal.addEventListener("abort", onAbort);
      aborted = await new Promise((resolve) => {
        this.subscribe((aborted2) => {
          signal.removeEventListener("abort", onAbort);
          if (aborted2 || this.done) {
            resolve(aborted2);
          }
        });
      });
    }
    return aborted;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref3) => {
      let [key, value] = _ref3;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
const defer = function defer2(data2, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data2, responseInit);
};
const redirect = function redirect2(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends$3({}, responseInit, {
    headers
  }));
};
const redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
const replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
class ErrorResponseImpl {
  constructor(status, statusText, data2, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
const ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
const TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
  const isBrowser2 = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  const isServer = !isBrowser2;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties2;
  if (init.mapRouteProperties) {
    mapRouteProperties2 = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties2 = defaultMapRouteProperties;
  }
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategy;
  let patchRoutesOnNavigationImpl = init.patchRoutesOnNavigation;
  let future = _extends$3({
    v7_fetcherPersist: false,
    v7_normalizeFormMethod: false,
    v7_partialHydration: false,
    v7_prependBasename: false,
    v7_relativeSplatPath: false,
    v7_skipActionErrorRevalidation: false
  }, init.future);
  let unlistenHistory = null;
  let subscribers = /* @__PURE__ */ new Set();
  let savedScrollPositions2 = null;
  let getScrollRestorationKey = null;
  let getScrollPosition = null;
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  if (initialMatches == null && !patchRoutesOnNavigationImpl) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  if (initialMatches && !init.hydrationData) {
    let fogOfWar = checkFogOfWar(initialMatches, dataRoutes, init.history.location.pathname);
    if (fogOfWar.active) {
      initialMatches = null;
    }
  }
  let initialized;
  if (!initialMatches) {
    initialized = false;
    initialMatches = [];
    if (future.v7_partialHydration) {
      let fogOfWar = checkFogOfWar(null, dataRoutes, init.history.location.pathname);
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatchesIsFOW = true;
        initialMatches = fogOfWar.matches;
      }
    }
  } else if (initialMatches.some((m2) => m2.route.lazy)) {
    initialized = false;
  } else if (!initialMatches.some((m2) => m2.route.loader)) {
    initialized = true;
  } else if (future.v7_partialHydration) {
    let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
    let errors = init.hydrationData ? init.hydrationData.errors : null;
    if (errors) {
      let idx = initialMatches.findIndex((m2) => errors[m2.route.id] !== void 0);
      initialized = initialMatches.slice(0, idx + 1).every((m2) => !shouldLoadRouteOnHydration(m2.route, loaderData, errors));
    } else {
      initialized = initialMatches.every((m2) => !shouldLoadRouteOnHydration(m2.route, loaderData, errors));
    }
  } else {
    initialized = init.hydrationData != null;
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  };
  let pendingAction = Action.Pop;
  let pendingPreventScrollReset = false;
  let pendingNavigationController;
  let pendingViewTransitionEnabled = false;
  let appliedViewTransitions = /* @__PURE__ */ new Map();
  let removePageHideEventListener = null;
  let isUninterruptedRevalidation = false;
  let isRevalidationRequired = false;
  let cancelledDeferredRoutes = [];
  let cancelledFetcherLoads = /* @__PURE__ */ new Set();
  let fetchControllers = /* @__PURE__ */ new Map();
  let incrementingLoadId = 0;
  let pendingNavigationLoadId = -1;
  let fetchReloadIds = /* @__PURE__ */ new Map();
  let fetchRedirectIds = /* @__PURE__ */ new Set();
  let fetchLoadMatches = /* @__PURE__ */ new Map();
  let activeFetchers = /* @__PURE__ */ new Map();
  let deletedFetchers = /* @__PURE__ */ new Set();
  let activeDeferreds = /* @__PURE__ */ new Map();
  let blockerFunctions = /* @__PURE__ */ new Map();
  let unblockBlockerHistoryUpdate = void 0;
  function initialize() {
    unlistenHistory = init.history.listen((_ref) => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      if (unblockBlockerHistoryUpdate) {
        unblockBlockerHistoryUpdate();
        unblockBlockerHistoryUpdate = void 0;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        let nextHistoryUpdatePromise = new Promise((resolve) => {
          unblockBlockerHistoryUpdate = resolve;
        });
        init.history.go(delta * -1);
        updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location
            });
            nextHistoryUpdatePromise.then(() => init.history.go(delta));
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER);
            updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    });
    if (isBrowser2) {
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    if (!state.initialized) {
      startNavigation(Action.Pop, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  function updateState(newState, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state = _extends$3({}, state, newState);
    let completedFetchers = [];
    let deletedFetchersKeys = [];
    if (future.v7_fetcherPersist) {
      state.fetchers.forEach((fetcher, key) => {
        if (fetcher.state === "idle") {
          if (deletedFetchers.has(key)) {
            deletedFetchersKeys.push(key);
          } else {
            completedFetchers.push(key);
          }
        }
      });
    }
    deletedFetchers.forEach((key) => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        deletedFetchersKeys.push(key);
      }
    });
    [...subscribers].forEach((subscriber) => subscriber(state, {
      deletedFetchers: deletedFetchersKeys,
      viewTransitionOpts: opts.viewTransitionOpts,
      flushSync: opts.flushSync === true
    }));
    if (future.v7_fetcherPersist) {
      completedFetchers.forEach((key) => state.fetchers.delete(key));
      deletedFetchersKeys.forEach((key) => deleteFetcher(key));
    } else {
      deletedFetchersKeys.forEach((key) => deletedFetchers.delete(key));
    }
  }
  function completeNavigation(location, newState, _temp) {
    var _location$state, _location$state2;
    let {
      flushSync: flushSync2
    } = _temp === void 0 ? {} : _temp;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        actionData = null;
      }
    } else if (isActionReload) {
      actionData = state.actionData;
    } else {
      actionData = null;
    }
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k3) => blockers.set(k3, IDLE_BLOCKER));
    }
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = void 0;
    }
    if (isUninterruptedRevalidation)
      ;
    else if (pendingAction === Action.Pop)
      ;
    else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    if (pendingAction === Action.Pop) {
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = /* @__PURE__ */ new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(_extends$3({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers
    }), {
      viewTransitionOpts,
      flushSync: flushSync2 === true
    });
    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
  }
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    nextLocation = _extends$3({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false)
      ;
    else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
    let flushSync2 = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          });
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync: flushSync2
    });
  }
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    });
    if (state.navigation.state === "submitting") {
      return;
    }
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    }
    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation,
      enableViewTransition: pendingViewTransitionEnabled === true
    });
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = opts != null && opts.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? state.matches : matchRoutes(routesToUse, location, basename);
    let flushSync2 = (opts && opts.flushSync) === true;
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      }, {
        flushSync: flushSync2
      });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      let {
        error,
        notFoundMatches,
        route
      } = handleNavigational404(location.pathname);
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      }, {
        flushSync: flushSync2
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionResult;
    if (opts && opts.pendingError) {
      pendingActionResult = [findNearestBoundary(matches).route.id, {
        type: ResultType.error,
        error: opts.pendingError
      }];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionResult = await handleAction(request, location, opts.submission, matches, fogOfWar.active, {
        replace: opts.replace,
        flushSync: flushSync2
      });
      if (actionResult.shortCircuited) {
        return;
      }
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync2 = false;
      fogOfWar.active = false;
      request = createClientSideRequest(init.history, request.url, request.signal);
    }
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync2, pendingActionResult);
    if (shortCircuited) {
      return;
    }
    pendingNavigationController = null;
    completeNavigation(location, _extends$3({
      matches: updatedMatches || matches
    }, getActionDataForCommit(pendingActionResult), {
      loaderData,
      errors
    }));
  }
  async function handleAction(request, location, submission, matches, isFogOfWar, opts) {
    if (opts === void 0) {
      opts = {};
    }
    interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({
      navigation
    }, {
      flushSync: opts.flushSync === true
    });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [boundaryId, {
            type: ResultType.error,
            error: discoverResult.error
          }]
        };
      } else if (!discoverResult.matches) {
        let {
          notFoundMatches,
          error,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          pendingActionResult: [route.id, {
            type: ResultType.error,
            error
          }]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let results = await callDataStrategy("action", state, request, [actionMatch], matches, null);
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace2;
      if (opts && opts.replace != null) {
        replace2 = opts.replace;
      } else {
        let location2 = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
        replace2 = location2 === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace: replace2
      });
      return {
        shortCircuited: true
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        matches,
        pendingActionResult: [boundaryMatch.route.id, result]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  async function handleLoaders(request, location, matches, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace2, initialHydration, flushSync2, pendingActionResult) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration);
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(_extends$3({
          navigation: loadingNavigation
        }, actionData !== void 0 ? {
          actionData
        } : {}), {
          flushSync: flushSync2
        });
      }
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let {
          error,
          notFoundMatches,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
    cancelActiveDeferreds((routeId) => !(matches && matches.some((m2) => m2.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m2) => m2.route.id === routeId));
    pendingNavigationLoadId = ++incrementingLoadId;
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      completeNavigation(location, _extends$3({
        matches,
        loaderData: {},
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null
      }, getActionDataForCommit(pendingActionResult), updatedFetchers2 ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync: flushSync2
      });
      return {
        shortCircuited: true
      };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== void 0) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, {
        flushSync: flushSync2
      });
    }
    revalidatingFetchers.forEach((rf2) => {
      abortFetcher(rf2.key);
      if (rf2.controller) {
        fetchControllers.set(rf2.key, rf2.controller);
      }
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f2) => abortFetcher(f2.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    }
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }
    revalidatingFetchers.forEach((rf2) => fetchControllers.delete(rf2.key));
    let redirect3 = findRedirect(loaderResults);
    if (redirect3) {
      await startRedirectNavigation(request, redirect3.result, true, {
        replace: replace2
      });
      return {
        shortCircuited: true
      };
    }
    redirect3 = findRedirect(fetcherResults);
    if (redirect3) {
      fetchRedirectIds.add(redirect3.key);
      await startRedirectNavigation(request, redirect3.result, true, {
        replace: replace2
      });
      return {
        shortCircuited: true
      };
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe((aborted) => {
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    if (future.v7_partialHydration && initialHydration && state.errors) {
      errors = _extends$3({}, state.errors, errors);
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends$3({
      matches,
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach((rf2) => {
      let fetcher = state.fetchers.get(rf2.key);
      let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
      state.fetchers.set(rf2.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  function fetch2(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    }
    abortFetcher(key);
    let flushSync2 = (opts && opts.flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }), {
        flushSync: flushSync2
      });
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error, {
        flushSync: flushSync2
      });
      return;
    }
    let match = getTargetMatch(matches, path);
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, fogOfWar.active, flushSync2, preventScrollReset, submission);
      return;
    }
    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, fogOfWar.active, flushSync2, preventScrollReset, submission);
  }
  async function handleFetcherAction(key, routeId, path, match, requestMatches, isFogOfWar, flushSync2, preventScrollReset, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    function detectAndHandle405Error(m2) {
      if (!m2.route.action && !m2.route.lazy) {
        let error = getInternalRouterError(405, {
          method: submission.formMethod,
          pathname: path,
          routeId
        });
        setFetcherError(key, routeId, error, {
          flushSync: flushSync2
        });
        return true;
      }
      return false;
    }
    if (!isFogOfWar && detectAndHandle405Error(match)) {
      return;
    }
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync: flushSync2
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(requestMatches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, {
          flushSync: flushSync2
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync: flushSync2
        });
        return;
      } else {
        requestMatches = discoverResult.matches;
        match = getTargetMatch(requestMatches, path);
        if (detectAndHandle405Error(match)) {
          return;
        }
      }
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let actionResults = await callDataStrategy("action", state, fetchRequest, [match], requestMatches, key);
    let actionResult = actionResults[match.route.id];
    if (fetchRequest.signal.aborted) {
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
    revalidatingFetchers.filter((rf2) => rf2.key !== key).forEach((rf2) => {
      let staleKey = rf2.key;
      let existingFetcher2 = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
      state.fetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf2.controller) {
        fetchControllers.set(staleKey, rf2.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf2) => abortFetcher(rf2.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach((r2) => fetchControllers.delete(r2.key));
    let redirect3 = findRedirect(loaderResults);
    if (redirect3) {
      return startRedirectNavigation(revalidationRequest, redirect3.result, false, {
        preventScrollReset
      });
    }
    redirect3 = findRedirect(fetcherResults);
    if (redirect3) {
      fetchRedirectIds.add(redirect3.key);
      return startRedirectNavigation(revalidationRequest, redirect3.result, false, {
        preventScrollReset
      });
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    abortStaleFetchLoads(loadId);
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      updateState({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  async function handleFetcherLoader(key, routeId, path, match, matches, isFogOfWar, flushSync2, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
      flushSync: flushSync2
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, {
          flushSync: flushSync2
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync: flushSync2
        });
        return;
      } else {
        matches = discoverResult.matches;
        match = getTargetMatch(matches, path);
      }
    }
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let results = await callDataStrategy("loader", state, fetchRequest, [match], matches, key);
    let result = results[match.route.id];
    if (isDeferredResult(result)) {
      result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
    }
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    if (deletedFetchers.has(key)) {
      updateFetcherState(key, getDoneFetcher(void 0));
      return;
    }
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  async function startRedirectNavigation(request, redirect3, isNavigation, _temp2) {
    let {
      submission,
      fetcherSubmission,
      preventScrollReset,
      replace: replace2
    } = _temp2 === void 0 ? {} : _temp2;
    if (redirect3.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect3.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(location, new URL(request.url), basename);
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser2) {
      let isDocumentReload = false;
      if (redirect3.response.headers.has("X-Remix-Reload-Document")) {
        isDocumentReload = true;
      } else if (ABSOLUTE_URL_REGEX$1.test(location)) {
        const url = init.history.createURL(location);
        isDocumentReload = url.origin !== routerWindow.location.origin || stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace2) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace2 === true || redirect3.response.headers.has("X-Remix-Replace") ? Action.Replace : Action.Push;
    let {
      formMethod,
      formAction,
      formEncType
    } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect3.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends$3({}, activeSubmission, {
          formAction: location
        }),
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    } else {
      let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        fetcherSubmission,
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
      });
    }
  }
  async function callDataStrategy(type, state2, request, matchesToLoad, matches, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(dataStrategyImpl, type, state2, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties2);
    } catch (e) {
      matchesToLoad.forEach((m2) => {
        dataResults[m2.route.id] = {
          type: ResultType.error,
          error: e
        };
      });
      return dataResults;
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResultResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: ResultType.redirect,
          response: normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, future.v7_relativeSplatPath)
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(state2, matches, matchesToLoad, fetchersToLoad, request) {
    let currentMatches = state2.matches;
    let loaderResultsPromise = callDataStrategy("loader", state2, request, matchesToLoad, matches, null);
    let fetcherResultsPromise = Promise.all(fetchersToLoad.map(async (f2) => {
      if (f2.matches && f2.match && f2.controller) {
        let results = await callDataStrategy("loader", state2, createClientSideRequest(init.history, f2.path, f2.controller.signal), [f2.match], f2.matches, f2.key);
        let result = results[f2.match.route.id];
        return {
          [f2.key]: result
        };
      } else {
        return Promise.resolve({
          [f2.key]: {
            type: ResultType.error,
            error: getInternalRouterError(404, {
              pathname: f2.path
            })
          }
        });
      }
    }));
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce((acc, r2) => Object.assign(acc, r2), {});
    await Promise.all([resolveNavigationDeferredResults(matches, loaderResults, request.signal, currentMatches, state2.loaderData), resolveFetcherDeferredResults(matches, fetcherResults, fetchersToLoad)]);
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = true;
    cancelledDeferredRoutes.push(...cancelActiveDeferreds());
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function setFetcherError(key, routeId, error, opts) {
    if (opts === void 0) {
      opts = {};
    }
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    if (deletedFetchers.has(key)) {
      deletedFetchers.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    if (future.v7_fetcherPersist) {
      deletedFetchers.delete(key);
    }
    cancelledFetcherLoads.delete(key);
    state.fetchers.delete(key);
  }
  function deleteFetcherAndUpdateState(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      deletedFetchers.add(key);
      if (!future.v7_fetcherPersist) {
        deleteFetcher(key);
      }
    } else {
      activeFetchers.set(key, count);
    }
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort();
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id2] of fetchReloadIds) {
      if (id2 < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (blockerFunctions.size === 0) {
      return;
    }
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      return;
    }
    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, {
      pathname
    });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let {
      matches,
      route
    } = getShortCircuitMatches(routesToUse);
    cancelActiveDeferreds();
    return {
      notFoundMatches: matches,
      route,
      error
    };
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions2 = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || null;
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y2 = getSavedScrollPosition(state.location, state.matches);
      if (y2 != null) {
        updateState({
          restoreScrollPosition: y2
        });
      }
    }
    return () => {
      savedScrollPositions2 = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey) {
      let key = getScrollRestorationKey(location, matches.map((m2) => convertRouteMatchToUiMatch(m2, state.loaderData)));
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location, matches);
      let y2 = savedScrollPositions2[key];
      if (typeof y2 === "number") {
        return y2;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (patchRoutesOnNavigationImpl) {
      if (!matches) {
        let fogMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
        return {
          active: true,
          matches: fogMatches || []
        };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          let partialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
          return {
            active: true,
            matches: partialMatches
          };
        }
      }
    }
    return {
      active: false,
      matches: null
    };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!patchRoutesOnNavigationImpl) {
      return {
        type: "success",
        matches
      };
    }
    let partialMatches = matches;
    while (true) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let localManifest = manifest;
      try {
        await patchRoutesOnNavigationImpl({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted)
              return;
            patchRoutesImpl(routeId, children, routesToUse, localManifest, mapRouteProperties2);
          }
        });
      } catch (e) {
        return {
          type: "error",
          error: e,
          partialMatches
        };
      } finally {
        if (isNonHMR && !signal.aborted) {
          dataRoutes = [...dataRoutes];
        }
      }
      if (signal.aborted) {
        return {
          type: "aborted"
        };
      }
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      if (newMatches) {
        return {
          type: "success",
          matches: newMatches
        };
      }
      let newPartialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
      if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every((m2, i2) => m2.route.id === newPartialMatches[i2].route.id)) {
        return {
          type: "success",
          matches: null
        };
      }
      partialMatches = newPartialMatches;
    }
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest);
  }
  function patchRoutes(routeId, children) {
    let isNonHMR = inFlightDataRoutes == null;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties2);
    if (isNonHMR) {
      dataRoutes = [...dataRoutes];
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch: fetch2,
    revalidate,
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: deleteFetcherAndUpdateState,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    _internalSetRoutes
  };
  return router;
}
const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties2;
  if (opts != null && opts.mapRouteProperties) {
    mapRouteProperties2 = opts.mapRouteProperties;
  } else if (opts != null && opts.detectErrorBoundary) {
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties2 = defaultMapRouteProperties;
  }
  let future = _extends$3({
    v7_relativeSplatPath: false,
    v7_throwAbortReason: false
  }, opts ? opts.future : null);
  let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties2, void 0, manifest);
  async function query(request, _temp3) {
    let {
      requestContext,
      skipLoaderErrorBubbling,
      dataStrategy
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext, dataStrategy || null, skipLoaderErrorBubbling === true, null);
    if (isResponse(result)) {
      return result;
    }
    return _extends$3({
      location,
      basename
    }, result);
  }
  async function queryRoute(request, _temp4) {
    let {
      routeId,
      requestContext,
      dataStrategy
    } = _temp4 === void 0 ? {} : _temp4;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let match = routeId ? matches.find((m2) => m2.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let result = await queryImpl(request, location, matches, requestContext, dataStrategy || null, false, match);
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0) {
      throw error;
    }
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      var _result$activeDeferre;
      let data2 = Object.values(result.loaderData)[0];
      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data2[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }
      return data2;
    }
    return void 0;
  }
  async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result2 = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch != null);
        return result2;
      }
      let result = await loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch);
      return isResponse(result) ? result : _extends$3({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === ResultType.error) {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches, isRouteRequest, requestContext, dataStrategy);
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest, future);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let context2 = await loadRouteData(loaderRequest, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, null, [boundaryMatch.route.id, result]);
      return _extends$3({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: _extends$3({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let context = await loadRouteData(loaderRequest, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, null);
    return _extends$3({}, context, {
      actionData: {
        [actionMatch.route.id]: result.data
      }
    }, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionHeaders: result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {}
    });
  }
  async function loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
    let matchesToLoad = requestMatches.filter((m2) => m2.route.loader || m2.route.lazy);
    if (matchesToLoad.length === 0) {
      return {
        matches,
        loaderData: matches.reduce((acc, m2) => Object.assign(acc, {
          [m2.route.id]: null
        }), {}),
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }
    let results = await callDataStrategy("loader", request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy);
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest, future);
    }
    let activeDeferreds = /* @__PURE__ */ new Map();
    let context = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling);
    let executedLoaders = new Set(matchesToLoad.map((match) => match.route.id));
    matches.forEach((match) => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends$3({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(dataStrategy || defaultDataStrategy, type, null, request, matchesToLoad, matches, null, manifest, mapRouteProperties2, requestContext);
    let dataResults = {};
    await Promise.all(matches.map(async (match) => {
      if (!(match.route.id in results)) {
        return;
      }
      let result = results[match.route.id];
      if (isRedirectDataStrategyResultResult(result)) {
        let response = result.result;
        throw normalizeRelativeRoutingRedirectResponse(response, request, match.route.id, matches, basename, future.v7_relativeSplatPath);
      }
      if (isResponse(result.result) && isRouteRequest) {
        throw result;
      }
      dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
    }));
    return dataResults;
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes, context, error) {
  let newContext = _extends$3({}, context, {
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });
  return newContext;
}
function throwStaticHandlerAbortedError(request, isRouteRequest, future) {
  if (future.v7_throwAbortReason && request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(method + "() call aborted: " + request.method + " " + request.url);
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v2) => v2).forEach((v2) => params.append("index", v2));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  });
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? Array.from(opts.body.entries()).reduce((acc, _ref3) => {
        let [name, value] = _ref3;
        return "" + acc + name + "=" + value + "\n";
      }, "") : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json3 = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json: json3,
            text: void 0
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData === "function", "FormData is not available in this environment");
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod)) {
    return {
      path,
      submission
    };
  }
  let parsedPath = parsePath(path);
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId, includeBoundary) {
  if (includeBoundary === void 0) {
    includeBoundary = false;
  }
  let index = matches.findIndex((m2) => m2.route.id === boundaryId);
  if (index >= 0) {
    return matches.slice(0, includeBoundary ? index + 1 : index);
  }
  return matches;
}
function getMatchesToLoad(history, state, matches, submission, location, initialHydration, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let boundaryMatches = matches;
  if (initialHydration && state.errors) {
    boundaryMatches = getLoaderMatchesUntilBoundary(matches, Object.keys(state.errors)[0], true);
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    boundaryMatches = getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]);
  }
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
  let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
  let navigationMatches = boundaryMatches.filter((match, index) => {
    let {
      route
    } = match;
    if (route.lazy) {
      return true;
    }
    if (route.loader == null) {
      return false;
    }
    if (initialHydration) {
      return shouldLoadRouteOnHydration(route, state.loaderData, state.errors);
    }
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id2) => id2 === match.route.id)) {
      return true;
    }
    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends$3({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      actionStatus,
      defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  });
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f2, key) => {
    if (initialHydration || !matches.some((m2) => m2.route.id === f2.routeId) || deletedFetchers.has(key)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f2.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f2.routeId,
        path: f2.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key);
    let fetcherMatch = getTargetMatch(fetcherMatches, f2.path);
    let shouldRevalidate = false;
    if (fetchRedirectIds.has(key)) {
      shouldRevalidate = false;
    } else if (cancelledFetcherLoads.has(key)) {
      cancelledFetcherLoads.delete(key);
      shouldRevalidate = true;
    } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
      shouldRevalidate = isRevalidationRequired;
    } else {
      shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends$3({
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params
      }, submission, {
        actionResult,
        actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      }));
    }
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f2.routeId,
        path: f2.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function shouldLoadRouteOnHydration(route, loaderData, errors) {
  if (route.lazy) {
    return true;
  }
  if (!route.loader) {
    return false;
  }
  let hasData = loaderData != null && loaderData[route.id] !== void 0;
  let hasError = errors != null && errors[route.id] !== void 0;
  if (!hasData && hasError) {
    return false;
  }
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return true;
  }
  return !hasData && !hasError;
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = !currentMatch || match.route.id !== currentMatch.route.id;
  let isMissingData = currentLoaderData[match.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return currentMatch.pathname !== match.pathname || currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"];
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties2) {
  var _childrenToPatch;
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(route, "No route found to patch children into: routeId = " + routeId);
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = routesToUse;
  }
  let uniqueChildren = children.filter((newRoute) => !childrenToPatch.some((existingRoute) => isSameRoute(newRoute, existingRoute)));
  let newRoutes = convertRoutesToDataRoutes(uniqueChildren, mapRouteProperties2, [routeId || "_", "patch", String(((_childrenToPatch = childrenToPatch) == null ? void 0 : _childrenToPatch.length) || "0")], manifest);
  childrenToPatch.push(...newRoutes);
}
function isSameRoute(newRoute, existingRoute) {
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  return newRoute.children.every((aChild, i2) => {
    var _existingRoute$childr;
    return (_existingRoute$childr = existingRoute.children) == null ? void 0 : _existingRoute$childr.some((bChild) => isSameRoute(aChild, bChild));
  });
}
async function loadLazyRouteModule(route, mapRouteProperties2, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== void 0 && lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  Object.assign(routeToUpdate, routeUpdates);
  Object.assign(routeToUpdate, _extends$3({}, mapRouteProperties2(routeToUpdate), {
    lazy: void 0
  }));
}
async function defaultDataStrategy(_ref4) {
  let {
    matches
  } = _ref4;
  let matchesToLoad = matches.filter((m2) => m2.shouldLoad);
  let results = await Promise.all(matchesToLoad.map((m2) => m2.resolve()));
  return results.reduce((acc, result, i2) => Object.assign(acc, {
    [matchesToLoad[i2].route.id]: result
  }), {});
}
async function callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties2, requestContext) {
  let loadRouteDefinitionsPromises = matches.map((m2) => m2.route.lazy ? loadLazyRouteModule(m2.route, mapRouteProperties2, manifest) : void 0);
  let dsMatches = matches.map((match, i2) => {
    let loadRoutePromise = loadRouteDefinitionsPromises[i2];
    let shouldLoad = matchesToLoad.some((m2) => m2.route.id === match.route.id);
    let resolve = async (handlerOverride) => {
      if (handlerOverride && request.method === "GET" && (match.route.lazy || match.route.loader)) {
        shouldLoad = true;
      }
      return shouldLoad ? callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, requestContext) : Promise.resolve({
        type: ResultType.data,
        result: void 0
      });
    };
    return _extends$3({}, match, {
      shouldLoad,
      resolve
    });
  });
  let results = await dataStrategyImpl({
    matches: dsMatches,
    request,
    params: matches[0].params,
    fetcherKey,
    context: requestContext
  });
  try {
    await Promise.all(loadRouteDefinitionsPromises);
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, staticContext) {
  let result;
  let onReject;
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r2) => reject = r2);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + type + '" [routeId: ' + match.route.id + "]")));
      }
      return handler({
        request,
        params: match.params,
        context: staticContext
      }, ...ctx !== void 0 ? [ctx] : []);
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return {
          type: "data",
          result: val
        };
      } catch (e) {
        return {
          type: "error",
          result: e
        };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (loadRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          loadRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await loadRoutePromise;
        handler = match.route[type];
        if (handler) {
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return {
            type: ResultType.data,
            result: void 0
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
    invariant(result.result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    return {
      type: ResultType.error,
      result: e
    };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let {
    result,
    type
  } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      let contentType = result.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data2 = null;
        } else {
          data2 = await result.json();
        }
      } else {
        data2 = await result.text();
      }
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
    if (type === ResultType.error) {
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === ResultType.error) {
    if (isDataWithResponseInit(result)) {
      var _result$init3, _result$init4;
      if (result.data instanceof Error) {
        var _result$init, _result$init2;
        return {
          type: ResultType.error,
          error: result.data,
          statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
          headers: (_result$init2 = result.init) != null && _result$init2.headers ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(((_result$init3 = result.init) == null ? void 0 : _result$init3.status) || 500, void 0, result.data),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: (_result$init4 = result.init) != null && _result$init4.headers ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: ResultType.error,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDeferredData(result)) {
    var _result$init5, _result$init6;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init5 = result.init) == null ? void 0 : _result$init5.status,
      headers: ((_result$init6 = result.init) == null ? void 0 : _result$init6.headers) && new Headers(result.init.headers)
    };
  }
  if (isDataWithResponseInit(result)) {
    var _result$init7, _result$init8;
    return {
      type: ResultType.data,
      data: result.data,
      statusCode: (_result$init7 = result.init) == null ? void 0 : _result$init7.status,
      headers: (_result$init8 = result.init) != null && _result$init8.headers ? new Headers(result.init.headers) : void 0
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
  let location = response.headers.get("Location");
  invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
  if (!ABSOLUTE_URL_REGEX$1.test(location)) {
    let trimmedMatches = matches.slice(0, matches.findIndex((m2) => m2.route.id === routeId) + 1);
    location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (ABSOLUTE_URL_REGEX$1.test(location)) {
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({
        "Content-Type": formEncType
      });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id2 = match.route.id;
    let result = results[id2];
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id2] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id2);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      loaderData[id2] = void 0;
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id2] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id2, result.deferredData);
        loaderData[id2] = result.deferredData.data;
        if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id2] = result.headers;
        }
      } else {
        loaderData[id2] = result.data;
        if (result.statusCode && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id2] = result.headers;
        }
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = {
      [pendingActionResult[0]]: pendingError
    };
    loaderData[pendingActionResult[0]] = void 0;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(
    matches,
    results,
    pendingActionResult,
    activeDeferreds,
    false
  );
  revalidatingFetchers.forEach((rf2) => {
    let {
      key,
      match,
      controller
    } = rf2;
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    if (controller && controller.signal.aborted) {
      return;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends$3({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  });
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends$3({}, newLoaderData);
  for (let match of matches) {
    let id2 = match.route.id;
    if (newLoaderData.hasOwnProperty(id2)) {
      if (newLoaderData[id2] !== void 0) {
        mergedLoaderData[id2] = newLoaderData[id2];
      }
    } else if (loaderData[id2] !== void 0 && match.route.loader) {
      mergedLoaderData[id2] = loaderData[id2];
    }
    if (errors && errors.hasOwnProperty(id2)) {
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m2) => m2.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m2) => m2.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  let route = routes.length === 1 ? routes[0] : routes.find((r2) => r2.index || !r2.path || r2.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp5) {
  let {
    pathname,
    routeId,
    method,
    type,
    message
  } = _temp5 === void 0 ? {} : _temp5;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = 'No route matches URL "' + pathname + '"';
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
    }
  }
  return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i2 = entries.length - 1; i2 >= 0; i2--) {
    let [key, result] = entries[i2];
    if (isRedirectResult(result)) {
      return {
        key,
        result
      };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends$3({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    return true;
  } else if (b.hash !== "") {
    return true;
  }
  return false;
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === ResultType.data || result.type === ResultType.error);
}
function isRedirectDataStrategyResultResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }
  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveNavigationDeferredResults(matches, results, signal, currentMatches, currentLoaderData) {
  let entries = Object.entries(results);
  for (let index = 0; index < entries.length; index++) {
    let [routeId, result] = entries[index];
    let match = matches.find((m2) => (m2 == null ? void 0 : m2.route.id) === routeId);
    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find((m2) => m2.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
    if (isDeferredResult(result) && isRevalidatingLoader) {
      await resolveDeferredData(result, signal, false).then((result2) => {
        if (result2) {
          results[routeId] = result2;
        }
      });
    }
  }
}
async function resolveFetcherDeferredResults(matches, results, revalidatingFetchers) {
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      routeId,
      controller
    } = revalidatingFetchers[index];
    let result = results[key];
    let match = matches.find((m2) => (m2 == null ? void 0 : m2.route.id) === routeId);
    if (!match) {
      continue;
    }
    if (isDeferredResult(result)) {
      invariant(controller, "Expected an AbortController for revalidating fetcher deferred result");
      await resolveDeferredData(result, controller.signal, true).then((result2) => {
        if (result2) {
          results[key] = result2;
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v2) => v2 === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json: json3
  } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: void 0,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: void 0,
      text: void 0
    };
  } else if (json3 !== void 0) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: void 0,
      json: json3,
      text: void 0
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data2) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: data2
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0
  };
  return fetcher;
}
function getDoneFetcher(data2) {
  let fetcher = {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: data2
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
    if (sessionPositions) {
      let json3 = JSON.parse(sessionPositions);
      for (let [k3, v2] of Object.entries(json3 || {})) {
        if (v2 && Array.isArray(v2)) {
          transitions.set(k3, new Set(v2 || []));
        }
      }
    }
  } catch (e) {
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json3 = {};
    for (let [k3, v2] of transitions) {
      json3[k3] = [...v2];
    }
    try {
      _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json3));
    } catch (error) {
      warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
    }
  }
}
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ react.exports.createContext(null);
if (false) {
  DataRouterContext.displayName = "DataRouter";
}
const DataRouterStateContext = /* @__PURE__ */ react.exports.createContext(null);
if (false) {
  DataRouterStateContext.displayName = "DataRouterState";
}
const AwaitContext = /* @__PURE__ */ react.exports.createContext(null);
if (false) {
  AwaitContext.displayName = "Await";
}
const NavigationContext = /* @__PURE__ */ react.exports.createContext(null);
if (false) {
  NavigationContext.displayName = "Navigation";
}
const LocationContext = /* @__PURE__ */ react.exports.createContext(null);
if (false) {
  LocationContext.displayName = "Location";
}
const RouteContext = /* @__PURE__ */ react.exports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (false) {
  RouteContext.displayName = "Route";
}
const RouteErrorContext = /* @__PURE__ */ react.exports.createContext(null);
if (false) {
  RouteErrorContext.displayName = "RouteError";
}
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? false ? invariant(
    false,
    "useHref() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = react.exports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return react.exports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? false ? invariant(
    false,
    "useLocation() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  return react.exports.useContext(LocationContext).location;
}
function useNavigationType() {
  return react.exports.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  !useInRouterContext() ? false ? invariant(
    false,
    "useMatch() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    pathname
  } = useLocation();
  return react.exports.useMemo(() => matchPath(pattern, decodePath(pathname)), [pathname, pattern]);
}
const navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function useIsomorphicLayoutEffect(cb2) {
  let isStatic = react.exports.useContext(NavigationContext).static;
  if (!isStatic) {
    react.exports.useLayoutEffect(cb2);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = react.exports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? false ? invariant(
    false,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let dataRouterContext = react.exports.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator: navigator2
  } = react.exports.useContext(NavigationContext);
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = react.exports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react.exports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    false ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
const OutletContext = /* @__PURE__ */ react.exports.createContext(null);
function useOutletContext() {
  return react.exports.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = react.exports.useContext(RouteContext).outlet;
  if (outlet) {
    return /* @__PURE__ */ react.exports.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}
function useParams() {
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = react.exports.useContext(NavigationContext);
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  return react.exports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? false ? invariant(
    false,
    "useRoutes() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    navigator: navigator2
  } = react.exports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = react.exports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (false) {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? false ? invariant(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')) : invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  if (false) {
    false ? warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" ') : void 0;
    false ? warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.') : void 0;
  }
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ react.exports.createElement(LocationContext.Provider, {
      value: {
        location: _extends$2({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  if (false) {
    console.error("Error handled by React Router default ErrorBoundary:", error);
    devInfo = /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ react.exports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ react.exports.createElement("code", {
      style: codeStyles
    }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ react.exports.createElement("code", {
      style: codeStyles
    }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ react.exports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ react.exports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /* @__PURE__ */ react.exports.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends react.exports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ react.exports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ react.exports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = react.exports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ react.exports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? false ? invariant(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ react.exports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ react.exports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ react.exports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function getDataRouterConsoleError$1(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext$1(hookName) {
  let ctx = react.exports.useContext(DataRouterContext);
  !ctx ? false ? invariant(false, getDataRouterConsoleError$1(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useDataRouterState$1(hookName) {
  let state = react.exports.useContext(DataRouterStateContext);
  !state ? false ? invariant(false, getDataRouterConsoleError$1(hookName)) : invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = react.exports.useContext(RouteContext);
  !route ? false ? invariant(false, getDataRouterConsoleError$1(hookName)) : invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? false ? invariant(false, hookName + ' can only be used on routes that contain a unique "id"') : invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook$1.UseRouteId);
}
function useNavigation() {
  let state = useDataRouterState$1(DataRouterStateHook$1.UseNavigation);
  return state.navigation;
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext$1(DataRouterHook$1.UseRevalidator);
  let state = useDataRouterState$1(DataRouterStateHook$1.UseRevalidator);
  return react.exports.useMemo(() => ({
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  }), [dataRouterContext.router.revalidate, state.revalidation]);
}
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState$1(DataRouterStateHook$1.UseMatches);
  return react.exports.useMemo(() => matches.map((m2) => convertRouteMatchToUiMatch(m2, loaderData)), [matches, loaderData]);
}
function useLoaderData() {
  let state = useDataRouterState$1(DataRouterStateHook$1.UseLoaderData);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return void 0;
  }
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  let state = useDataRouterState$1(DataRouterStateHook$1.UseRouteLoaderData);
  return state.loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState$1(DataRouterStateHook$1.UseActionData);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseLoaderData);
  return state.actionData ? state.actionData[routeId] : void 0;
}
function useRouteError() {
  var _state$errors;
  let error = react.exports.useContext(RouteErrorContext);
  let state = useDataRouterState$1(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
function useAsyncValue() {
  let value = react.exports.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
function useAsyncError() {
  let value = react.exports.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
let blockerId = 0;
function useBlocker(shouldBlock) {
  let {
    router,
    basename
  } = useDataRouterContext$1(DataRouterHook$1.UseBlocker);
  let state = useDataRouterState$1(DataRouterStateHook$1.UseBlocker);
  let [blockerKey, setBlockerKey] = react.exports.useState("");
  let blockerFunction = react.exports.useCallback((arg) => {
    if (typeof shouldBlock !== "function") {
      return !!shouldBlock;
    }
    if (basename === "/") {
      return shouldBlock(arg);
    }
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = arg;
    return shouldBlock({
      currentLocation: _extends$2({}, currentLocation, {
        pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
      }),
      nextLocation: _extends$2({}, nextLocation, {
        pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
      }),
      historyAction
    });
  }, [basename, shouldBlock]);
  react.exports.useEffect(() => {
    let key = String(++blockerId);
    setBlockerKey(key);
    return () => router.deleteBlocker(key);
  }, [router]);
  react.exports.useEffect(() => {
    if (blockerKey !== "") {
      router.getBlocker(blockerKey, blockerFunction);
    }
  }, [router, blockerKey, blockerFunction]);
  return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext$1(DataRouterHook$1.UseNavigateStable);
  let id2 = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = react.exports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react.exports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    false ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends$2({
        fromRouteId: id2
      }, options));
    }
  }, [router, id2]);
  return navigate;
}
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
    false ? warning(false, message) : void 0;
  }
}
const alreadyWarned = {};
function warnOnce(key, message) {
  if (false) {
    alreadyWarned[message] = true;
    console.warn(message);
  }
}
const logDeprecation = (flag, msg, link) => warnOnce(flag, "\u26A0\uFE0F React Router Future Flag Warning: " + msg + ". " + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."));
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) {
    logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
  }
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0)) {
    logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
  }
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === void 0) {
      logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
    }
    if (routerFuture.v7_normalizeFormMethod === void 0) {
      logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
    }
    if (routerFuture.v7_partialHydration === void 0) {
      logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
    }
    if (routerFuture.v7_skipActionErrorRevalidation === void 0) {
      logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
    }
  }
}
const START_TRANSITION$1 = "startTransition";
const startTransitionImpl$1 = React$1[START_TRANSITION$1];
function RouterProvider$1(_ref) {
  let {
    fallbackElement,
    router,
    future
  } = _ref;
  let [state, setStateImpl] = react.exports.useState(router.state);
  let {
    v7_startTransition
  } = future || {};
  let setState = react.exports.useCallback((newState) => {
    if (v7_startTransition && startTransitionImpl$1) {
      startTransitionImpl$1(() => setStateImpl(newState));
    } else {
      setStateImpl(newState);
    }
  }, [setStateImpl, v7_startTransition]);
  react.exports.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  react.exports.useEffect(() => {
    false ? warning(fallbackElement == null || !router.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using `v7_partialHydration`, use a `HydrateFallback` component instead") : void 0;
  }, []);
  let navigator2 = react.exports.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n2) => router.navigate(n2),
      push: (to, state2, opts) => router.navigate(to, {
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state2, opts) => router.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react.exports.useMemo(() => ({
    router,
    navigator: navigator2,
    static: false,
    basename
  }), [router, navigator2, basename]);
  react.exports.useEffect(() => logV6DeprecationWarnings(future, router.future), [router, future]);
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ react.exports.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator2,
    future: {
      v7_relativeSplatPath: router.future.v7_relativeSplatPath
    }
  }, state.initialized || router.future.v7_partialHydration ? /* @__PURE__ */ react.exports.createElement(DataRoutes$1, {
    routes: router.routes,
    future: router.future,
    state
  }) : fallbackElement))), null);
}
function DataRoutes$1(_ref2) {
  let {
    routes,
    future,
    state
  } = _ref2;
  return useRoutesImpl(routes, void 0, state, future);
}
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex,
    future
  } = _ref3;
  let historyRef = react.exports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createMemoryHistory({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react.exports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl$1 ? startTransitionImpl$1(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react.exports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react.exports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
function Navigate(_ref4) {
  let {
    to,
    replace: replace2,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? false ? invariant(
    false,
    "<Navigate> may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    future,
    static: isStatic
  } = react.exports.useContext(NavigationContext);
  false ? warning(!isStatic, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.") : void 0;
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  react.exports.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace: replace2,
    state,
    relative
  }), [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  false ? invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : invariant(false);
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? false ? invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react.exports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp,
    future: _extends$2({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = react.exports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  false ? warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.") : void 0;
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ react.exports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ react.exports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /* @__PURE__ */ react.exports.createElement(AwaitErrorBoundary, {
    resolve,
    errorElement
  }, /* @__PURE__ */ react.exports.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus = /* @__PURE__ */ function(AwaitRenderStatus2) {
  AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
  AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
  AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
  return AwaitRenderStatus2;
}(AwaitRenderStatus || {});
const neverSettledPromise = new Promise(() => {
});
class AwaitErrorBoundary extends react.exports.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }
  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;
    if (!(resolve instanceof Promise)) {
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? AwaitRenderStatus.error : "_data" in promise ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then((data2) => Object.defineProperty(resolve, "_data", {
        get: () => data2
      }), (error) => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }
    if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError) {
      throw neverSettledPromise;
    }
    if (status === AwaitRenderStatus.error && !errorElement) {
      throw promise._error;
    }
    if (status === AwaitRenderStatus.error) {
      return /* @__PURE__ */ react.exports.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }
    if (status === AwaitRenderStatus.success) {
      return /* @__PURE__ */ react.exports.createElement(AwaitContext.Provider, {
        value: promise,
        children
      });
    }
    throw promise;
  }
}
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8;
  let data2 = useAsyncValue();
  let toRender = typeof children === "function" ? children(data2) : children;
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  react.exports.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === react.exports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? false ? invariant(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? false ? invariant(false, "An index route cannot have child routes.") : invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
function renderMatches(matches) {
  return _renderMatches(matches);
}
function mapRouteProperties(route) {
  let updates = {
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (false) {
      if (route.element) {
        false ? warning(false, "You should not include both `Component` and `element` on your route - `Component` will be used.") : void 0;
      }
    }
    Object.assign(updates, {
      element: /* @__PURE__ */ react.exports.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    if (false) {
      if (route.hydrateFallbackElement) {
        false ? warning(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.") : void 0;
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: /* @__PURE__ */ react.exports.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    if (false) {
      if (route.errorElement) {
        false ? warning(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.") : void 0;
      }
    }
    Object.assign(updates, {
      errorElement: /* @__PURE__ */ react.exports.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
function createMemoryRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends$2({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: createMemoryHistory({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes,
    mapRouteProperties,
    dataStrategy: opts == null ? void 0 : opts.dataStrategy,
    patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation
  }).initialize();
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event);
}
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
    let value = init[key];
    return memo2.concat(Array.isArray(value) ? value.map((v2) => [key, v2]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
let _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
const supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    false ? warning(false, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"')) : void 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"];
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
function createBrowserRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends$1({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: createBrowserHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties,
    dataStrategy: opts == null ? void 0 : opts.dataStrategy,
    patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
    window: opts == null ? void 0 : opts.window
  }).initialize();
}
function createHashRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends$1({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: createHashHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties,
    dataStrategy: opts == null ? void 0 : opts.dataStrategy,
    patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
    window: opts == null ? void 0 : opts.window
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  if (state && state.errors) {
    state = _extends$1({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors)
    return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
const ViewTransitionContext = /* @__PURE__ */ react.exports.createContext({
  isTransitioning: false
});
if (false) {
  ViewTransitionContext.displayName = "ViewTransition";
}
const FetchersContext = /* @__PURE__ */ react.exports.createContext(/* @__PURE__ */ new Map());
if (false) {
  FetchersContext.displayName = "Fetchers";
}
const START_TRANSITION = "startTransition";
const startTransitionImpl = React$1[START_TRANSITION];
const FLUSH_SYNC = "flushSync";
const flushSyncImpl = ReactDOM[FLUSH_SYNC];
const USE_ID = "useId";
const useIdImpl = React$1[USE_ID];
function startTransitionSafe(cb2) {
  if (startTransitionImpl) {
    startTransitionImpl(cb2);
  } else {
    cb2();
  }
}
function flushSyncSafe(cb2) {
  if (flushSyncImpl) {
    flushSyncImpl(cb2);
  } else {
    cb2();
  }
}
class Deferred {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (value) => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
}
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future
  } = _ref;
  let [state, setStateImpl] = react.exports.useState(router.state);
  let [pendingState, setPendingState] = react.exports.useState();
  let [vtContext, setVtContext] = react.exports.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = react.exports.useState();
  let [transition, setTransition] = react.exports.useState();
  let [interruption, setInterruption] = react.exports.useState();
  let fetcherData = react.exports.useRef(/* @__PURE__ */ new Map());
  let {
    v7_startTransition
  } = future || {};
  let optInStartTransition = react.exports.useCallback((cb2) => {
    if (v7_startTransition) {
      startTransitionSafe(cb2);
    } else {
      cb2();
    }
  }, [v7_startTransition]);
  let setState = react.exports.useCallback((newState, _ref2) => {
    let {
      deletedFetchers,
      flushSync: flushSync2,
      viewTransitionOpts
    } = _ref2;
    newState.fetchers.forEach((fetcher, key) => {
      if (fetcher.data !== void 0) {
        fetcherData.current.set(key, fetcher.data);
      }
    });
    deletedFetchers.forEach((key) => fetcherData.current.delete(key));
    let isViewTransitionUnavailable = router.window == null || router.window.document == null || typeof router.window.document.startViewTransition !== "function";
    if (!viewTransitionOpts || isViewTransitionUnavailable) {
      if (flushSync2) {
        flushSyncSafe(() => setStateImpl(newState));
      } else {
        optInStartTransition(() => setStateImpl(newState));
      }
      return;
    }
    if (flushSync2) {
      flushSyncSafe(() => {
        if (transition) {
          renderDfd && renderDfd.resolve();
          transition.skipTransition();
        }
        setVtContext({
          isTransitioning: true,
          flushSync: true,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      });
      let t2 = router.window.document.startViewTransition(() => {
        flushSyncSafe(() => setStateImpl(newState));
      });
      t2.finished.finally(() => {
        flushSyncSafe(() => {
          setRenderDfd(void 0);
          setTransition(void 0);
          setPendingState(void 0);
          setVtContext({
            isTransitioning: false
          });
        });
      });
      flushSyncSafe(() => setTransition(t2));
      return;
    }
    if (transition) {
      renderDfd && renderDfd.resolve();
      transition.skipTransition();
      setInterruption({
        state: newState,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    } else {
      setPendingState(newState);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    }
  }, [router.window, transition, renderDfd, fetcherData, optInStartTransition]);
  react.exports.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  react.exports.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  react.exports.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition2 = router.window.document.startViewTransition(async () => {
        optInStartTransition(() => setStateImpl(newState));
        await renderPromise;
      });
      transition2.finished.finally(() => {
        setRenderDfd(void 0);
        setTransition(void 0);
        setPendingState(void 0);
        setVtContext({
          isTransitioning: false
        });
      });
      setTransition(transition2);
    }
  }, [optInStartTransition, pendingState, renderDfd, router.window]);
  react.exports.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  react.exports.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(void 0);
    }
  }, [vtContext.isTransitioning, interruption]);
  react.exports.useEffect(() => {
    false ? warning(fallbackElement == null || !router.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using `v7_partialHydration`, use a `HydrateFallback` component instead") : void 0;
  }, []);
  let navigator2 = react.exports.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: (n2) => router.navigate(n2),
      push: (to, state2, opts) => router.navigate(to, {
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state2, opts) => router.navigate(to, {
        replace: true,
        state: state2,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react.exports.useMemo(() => ({
    router,
    navigator: navigator2,
    static: false,
    basename
  }), [router, navigator2, basename]);
  let routerFuture = react.exports.useMemo(() => ({
    v7_relativeSplatPath: router.future.v7_relativeSplatPath
  }), [router.future.v7_relativeSplatPath]);
  react.exports.useEffect(() => logV6DeprecationWarnings(future, router.future), [future, router.future]);
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ react.exports.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ react.exports.createElement(FetchersContext.Provider, {
    value: fetcherData.current
  }, /* @__PURE__ */ react.exports.createElement(ViewTransitionContext.Provider, {
    value: vtContext
  }, /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator2,
    future: routerFuture
  }, state.initialized || router.future.v7_partialHydration ? /* @__PURE__ */ react.exports.createElement(MemoizedDataRoutes, {
    routes: router.routes,
    future: router.future,
    state
  }) : fallbackElement))))), null);
}
const MemoizedDataRoutes = /* @__PURE__ */ react.exports.memo(DataRoutes);
function DataRoutes(_ref3) {
  let {
    routes,
    future,
    state
  } = _ref3;
  return useRoutesImpl(routes, void 0, state, future);
}
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = react.exports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react.exports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react.exports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react.exports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
function HashRouter(_ref5) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref5;
  let historyRef = react.exports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react.exports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react.exports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react.exports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
function HistoryRouter(_ref6) {
  let {
    basename,
    children,
    future,
    history
  } = _ref6;
  let [state, setStateImpl] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react.exports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react.exports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react.exports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
if (false) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ react.exports.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose$1(_ref7, _excluded);
  let {
    basename
  } = react.exports.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        false ? warning(false, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.') : void 0;
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace: replace2,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return /* @__PURE__ */ react.exports.createElement("a", _extends$1({}, rest, {
    href: absoluteHref || href,
    onClick: isExternal || reloadDocument ? onClick : handleClick,
    ref,
    target
  }));
});
if (false) {
  Link.displayName = "Link";
}
const NavLink = /* @__PURE__ */ react.exports.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children
  } = _ref8, rest = _objectWithoutPropertiesLoose$1(_ref8, _excluded2);
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = react.exports.useContext(DataRouterStateContext);
  let {
    navigator: navigator2,
    basename
  } = react.exports.useContext(NavigationContext);
  let isTransitioning = routerState != null && useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */ react.exports.createElement(Link, _extends$1({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to,
    viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (false) {
  NavLink.displayName = "NavLink";
}
const Form = /* @__PURE__ */ react.exports.forwardRef((_ref9, forwardedRef) => {
  let {
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition
  } = _ref9, props = _objectWithoutPropertiesLoose$1(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = (event) => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented)
      return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace: replace2,
      state,
      relative,
      preventScrollReset,
      viewTransition
    });
  };
  return /* @__PURE__ */ react.exports.createElement("form", _extends$1({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (false) {
  Form.displayName = "Form";
}
function ScrollRestoration(_ref10) {
  let {
    getKey,
    storageKey
  } = _ref10;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}
if (false) {
  ScrollRestoration.displayName = "ScrollRestoration";
}
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = react.exports.useContext(DataRouterContext);
  !ctx ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react.exports.useContext(DataRouterStateContext);
  !state ? false ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return state;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return react.exports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace: replace2,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
function useSearchParams(defaultInit) {
  false ? warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.") : void 0;
  let defaultSearchParamsRef = react.exports.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react.exports.useRef(false);
  let location = useLocation();
  let searchParams = react.exports.useMemo(() => getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
  let navigate = useNavigate();
  let setSearchParams = react.exports.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
  }
}
let fetcherId = 0;
let getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
function useSubmit() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmit);
  let {
    basename
  } = react.exports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return react.exports.useCallback(function(target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        flushSync: options.flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        flushSync: options.flushSync,
        viewTransition: options.viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = react.exports.useContext(NavigationContext);
  let routeContext = react.exports.useContext(RouteContext);
  !routeContext ? false ? invariant(false, "useFormAction must be used inside a RouteContext") : invariant(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  let path = _extends$1({}, useResolvedPath(action ? action : ".", {
    relative
  }));
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v2) => v2 === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v2) => v2).forEach((v2) => params.append("index", v2));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useFetcher(_temp3) {
  var _route$matches;
  let {
    key
  } = _temp3 === void 0 ? {} : _temp3;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseFetcher);
  let state = useDataRouterState(DataRouterStateHook.UseFetcher);
  let fetcherData = react.exports.useContext(FetchersContext);
  let route = react.exports.useContext(RouteContext);
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !fetcherData ? false ? invariant(false, "useFetcher must be used inside a FetchersContext") : invariant(false) : void 0;
  !route ? false ? invariant(false, "useFetcher must be used inside a RouteContext") : invariant(false) : void 0;
  !(routeId != null) ? false ? invariant(false, 'useFetcher can only be used on routes that contain a unique "id"') : invariant(false) : void 0;
  let defaultKey = useIdImpl ? useIdImpl() : "";
  let [fetcherKey, setFetcherKey] = react.exports.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  } else if (!fetcherKey) {
    setFetcherKey(getUniqueFetcherId());
  }
  react.exports.useEffect(() => {
    router.getFetcher(fetcherKey);
    return () => {
      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  let load = react.exports.useCallback((href, opts) => {
    !routeId ? false ? invariant(false, "No routeId available for fetcher.load()") : invariant(false) : void 0;
    router.fetch(fetcherKey, routeId, href, opts);
  }, [fetcherKey, routeId, router]);
  let submitImpl = useSubmit();
  let submit = react.exports.useCallback((target, opts) => {
    submitImpl(target, _extends$1({}, opts, {
      navigate: false,
      fetcherKey
    }));
  }, [fetcherKey, submitImpl]);
  let FetcherForm = react.exports.useMemo(() => {
    let FetcherForm2 = /* @__PURE__ */ react.exports.forwardRef((props, ref) => {
      return /* @__PURE__ */ react.exports.createElement(Form, _extends$1({}, props, {
        navigate: false,
        fetcherKey,
        ref
      }));
    });
    if (false) {
      FetcherForm2.displayName = "fetcher.Form";
    }
    return FetcherForm2;
  }, [fetcherKey]);
  let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
  let data2 = fetcherData.get(fetcherKey);
  let fetcherWithComponents = react.exports.useMemo(() => _extends$1({
    Form: FetcherForm,
    submit,
    load
  }, fetcher, {
    data: data2
  }), [FetcherForm, submit, load, fetcher, data2]);
  return fetcherWithComponents;
}
function useFetchers() {
  let state = useDataRouterState(DataRouterStateHook.UseFetchers);
  return Array.from(state.fetchers.entries()).map((_ref11) => {
    let [key, fetcher] = _ref11;
    return _extends$1({}, fetcher, {
      key
    });
  });
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
function useScrollRestoration(_temp4) {
  let {
    getKey,
    storageKey
  } = _temp4 === void 0 ? {} : _temp4;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
  let {
    basename
  } = react.exports.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  react.exports.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(react.exports.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    try {
      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    } catch (error) {
      false ? warning(false, "Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (" + error + ").") : void 0;
    }
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches]));
  if (typeof document !== "undefined") {
    react.exports.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    react.exports.useLayoutEffect(() => {
      let getKeyWithoutBasename = getKey && basename !== "/" ? (location2, matches2) => getKey(
        _extends$1({}, location2, {
          pathname: stripBasename(location2.pathname, basename) || location2.pathname
        }),
        matches2
      ) : getKey;
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    react.exports.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el2 = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el2) {
          el2.scrollIntoView();
          return;
        }
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  react.exports.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  react.exports.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt(_ref12) {
  let {
    when,
    message
  } = _ref12;
  let blocker = useBlocker(when);
  react.exports.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
  react.exports.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
}
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = react.exports.useContext(ViewTransitionContext);
  !(vtContext != null) ? false ? invariant(false, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : invariant(false) : void 0;
  let {
    basename
  } = useDataRouterContext(DataRouterHook.useViewTransitionState);
  let path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
function useFetchData(url, options = {}) {
  const [loading, setLoading] = react.exports.useState(false);
  const [error, setError] = react.exports.useState(null);
  const abortRef = react.exports.useRef(null);
  const fetchData = react.exports.useCallback(async () => {
    if (!url) {
      setLoading(false);
      return null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers || {}
        },
        ...options.body != null ? {
          body: JSON.stringify(options.body)
        } : {},
        signal: ctrl.signal
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(`${res.status} ${result}`);
      return result.schemas || result;
    } catch (err) {
      setError(err);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [url, options.method, options.headers, options.body]);
  react.exports.useEffect(() => {
    return () => {
      if (abortRef.current)
        abortRef.current.abort();
    };
  }, []);
  return {
    fetchData,
    loading,
    error
  };
}
var all_min = "";
var jsxRuntime$1 = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
var f = react.exports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
var Fragment$1 = reactJsxRuntime_production_min.Fragment = l;
var jsx$1 = reactJsxRuntime_production_min.jsx = q;
var jsxs$1 = reactJsxRuntime_production_min.jsxs = q;
"use strict";
if (true) {
  jsxRuntime$1.exports = reactJsxRuntime_production_min;
} else {
  module.exports = require("./cjs/react-jsx-runtime.development.js");
}
var jsxRuntime = jsxRuntime$1.exports;
const jsx = jsxRuntime$1.exports.jsx;
const jsxs = jsxRuntime$1.exports.jsxs;
const Fragment = jsxRuntime$1.exports.Fragment;
function DeleteConfirmModal({
  taskId,
  onConfirm,
  onCancel
}) {
  if (!taskId)
    return null;
  return /* @__PURE__ */ jsx("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    },
    children: /* @__PURE__ */ jsxs("div", {
      style: {
        background: "white",
        borderRadius: "8px",
        padding: "16px 20px",
        minWidth: "340px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        fontSize: "14px"
      },
      children: [/* @__PURE__ */ jsxs("div", {
        style: {
          marginBottom: "12px"
        },
        children: ["Are you sure you want to delete task id", " ", /* @__PURE__ */ jsx("strong", {
          children: taskId
        }), " ?"]
      }), /* @__PURE__ */ jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px"
        },
        children: [/* @__PURE__ */ jsxs("button", {
          type: "button",
          onClick: onConfirm,
          style: {
            background: "#2e7d32",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px"
          },
          children: [/* @__PURE__ */ jsx("i", {
            className: "fa fa-check"
          }), /* @__PURE__ */ jsx("span", {
            children: "Yes"
          })]
        }), /* @__PURE__ */ jsxs("button", {
          type: "button",
          onClick: onCancel,
          style: {
            background: "#c62828",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px"
          },
          children: [/* @__PURE__ */ jsx("i", {
            className: "fa fa-times"
          }), /* @__PURE__ */ jsx("span", {
            children: "No"
          })]
        })]
      })]
    })
  });
}
function useActiveTasksPolling(intervalMs = 3e3) {
  const [activeTasks, setActiveTasks] = react.exports.useState([]);
  const { fetchData: fetchActiveTasks } = useFetchData(
    "/api/fabric-command?command=broadway%20K2Verify.bwK2VerifyRunningTasks%20RESULT_STRUCTURE=CURSOR"
  );
  react.exports.useEffect(() => {
    let isMounted = true;
    const fetchActive = async () => {
      try {
        const data2 = await fetchActiveTasks();
        if (isMounted) {
          setActiveTasks((prevTasks) => {
            const newData = data2 || [];
            if (JSON.stringify(prevTasks) === JSON.stringify(newData)) {
              return prevTasks;
            }
            return newData;
          });
        }
      } catch (err) {
        console.error("Error fetching active tasks:", err);
      }
    };
    fetchActive();
    const interval = setInterval(fetchActive, intervalMs);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchActiveTasks, intervalMs]);
  const activeTaskIds = react.exports.useMemo(() => {
    const tasks = activeTasks || [];
    if (!Array.isArray(tasks))
      return /* @__PURE__ */ new Set();
    return new Set(tasks.map((task) => task.task_id));
  }, [activeTasks]);
  const taskExecutionMap = react.exports.useMemo(() => {
    const tasks = activeTasks || [];
    if (!Array.isArray(tasks))
      return /* @__PURE__ */ new Map();
    return new Map(tasks.map((task) => [task.task_id, task.execution_id]));
  }, [activeTasks]);
  return {
    activeTasks,
    activeTaskIds,
    taskExecutionMap
  };
}
async function runFabricCommand(command) {
  var _a;
  const encoded = encodeURIComponent(command);
  const res = await fetch(`/api/fabric-command?command=${encoded}`);
  let data2 = null;
  try {
    data2 = await res.json();
  } catch {
  }
  if (!res.ok) {
    const msg = ((_a = data2 == null ? void 0 : data2.error) == null ? void 0 : _a.message) || (data2 == null ? void 0 : data2.message) || (typeof data2 === "string" ? data2 : null) || "Execution failed";
    const err = new Error(msg);
    err.response = data2;
    throw err;
  }
  return data2;
}
var reactTable$1 = { exports: {} };
var reactTable_production_min$1 = { exports: {} };
(function(module2, exports2) {
  !function(e, t2) {
    true ? t2(exports2, react.exports) : false ? (void 0)(["exports", "react"], t2) : t2((e = e || self).ReactTable = {}, e.React);
  }(commonjsGlobal, function(e, t2) {
    "use strict";
    function n2(e2, t3, n3, o2, r3, i3, u3) {
      try {
        var l3 = e2[i3](u3), s2 = l3.value;
      } catch (e3) {
        return void n3(e3);
      }
      l3.done ? t3(s2) : Promise.resolve(s2).then(o2, r3);
    }
    function o(e2) {
      return function() {
        var t3 = this, o2 = arguments;
        return new Promise(function(r3, i3) {
          var u3 = e2.apply(t3, o2);
          function l3(e3) {
            n2(u3, r3, i3, l3, s2, "next", e3);
          }
          function s2(e3) {
            n2(u3, r3, i3, l3, s2, "throw", e3);
          }
          l3(void 0);
        });
      };
    }
    function r2() {
      return (r2 = Object.assign || function(e2) {
        for (var t3 = 1; t3 < arguments.length; t3++) {
          var n3 = arguments[t3];
          for (var o2 in n3)
            Object.prototype.hasOwnProperty.call(n3, o2) && (e2[o2] = n3[o2]);
        }
        return e2;
      }).apply(this, arguments);
    }
    function i2(e2, t3) {
      if (null == e2)
        return {};
      var n3, o2, r3 = {}, i3 = Object.keys(e2);
      for (o2 = 0; o2 < i3.length; o2++)
        n3 = i3[o2], t3.indexOf(n3) >= 0 || (r3[n3] = e2[n3]);
      return r3;
    }
    function u2(e2) {
      var t3 = function(e3, t4) {
        if ("object" != typeof e3 || null === e3)
          return e3;
        var n3 = e3[Symbol.toPrimitive];
        if (void 0 !== n3) {
          var o2 = n3.call(e3, t4 || "default");
          if ("object" != typeof o2)
            return o2;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t4 ? String : Number)(e3);
      }(e2, "string");
      return "symbol" == typeof t3 ? t3 : String(t3);
    }
    t2 = t2 && Object.prototype.hasOwnProperty.call(t2, "default") ? t2.default : t2;
    var l2 = { init: "init" }, s = function(e2) {
      var t3 = e2.value;
      return void 0 === t3 ? "" : t3;
    }, a = function() {
      return t2.createElement(t2.Fragment, null, "\xA0");
    }, c = { Cell: s, width: 150, minWidth: 0, maxWidth: Number.MAX_SAFE_INTEGER };
    function d() {
      for (var e2 = arguments.length, t3 = new Array(e2), n3 = 0; n3 < e2; n3++)
        t3[n3] = arguments[n3];
      return t3.reduce(function(e3, t4) {
        var n4 = t4.style, o2 = t4.className;
        return e3 = r2({}, e3, {}, i2(t4, ["style", "className"])), n4 && (e3.style = e3.style ? r2({}, e3.style || {}, {}, n4 || {}) : n4), o2 && (e3.className = e3.className ? e3.className + " " + o2 : o2), "" === e3.className && delete e3.className, e3;
      }, {});
    }
    var f2 = function(e2, t3) {
      return void 0 === t3 && (t3 = {}), function(n3) {
        return void 0 === n3 && (n3 = {}), [].concat(e2, [n3]).reduce(function(e3, o2) {
          return function e4(t4, n4, o3) {
            return "function" == typeof n4 ? e4({}, n4(t4, o3)) : Array.isArray(n4) ? d.apply(void 0, [t4].concat(n4)) : d(t4, n4);
          }(e3, o2, r2({}, t3, { userProps: n3 }));
        }, {});
      };
    }, p2 = function(e2, t3, n3, o2) {
      return void 0 === n3 && (n3 = {}), e2.reduce(function(e3, t4) {
        return t4(e3, n3);
      }, t3);
    }, g = function(e2, t3, n3) {
      return void 0 === n3 && (n3 = {}), e2.forEach(function(e3) {
        e3(t3, n3);
      });
    };
    function v2(e2, t3, n3, o2) {
      e2.findIndex(function(e3) {
        return e3.pluginName === n3;
      });
      t3.forEach(function(t4) {
        e2.findIndex(function(e3) {
          return e3.pluginName === t4;
        });
      });
    }
    function m2(e2, t3) {
      return "function" == typeof e2 ? e2(t3) : e2;
    }
    function h(e2) {
      var n3 = t2.useRef();
      return n3.current = e2, t2.useCallback(function() {
        return n3.current;
      }, []);
    }
    var y2 = "undefined" != typeof document ? t2.useLayoutEffect : t2.useEffect;
    function w2(e2, n3) {
      var o2 = t2.useRef(false);
      y2(function() {
        o2.current && e2(), o2.current = true;
      }, n3);
    }
    function R2(e2, t3, n3) {
      return void 0 === n3 && (n3 = {}), function(o2, i3) {
        void 0 === i3 && (i3 = {});
        var u3 = "string" == typeof o2 ? t3[o2] : o2;
        if (void 0 === u3)
          throw console.info(t3), new Error("Renderer Error \u261D\uFE0F");
        return b(u3, r2({}, e2, { column: t3 }, n3, {}, i3));
      };
    }
    function b(e2, n3) {
      return function(e3) {
        return "function" == typeof e3 && ((t3 = Object.getPrototypeOf(e3)).prototype && t3.prototype.isReactComponent);
        var t3;
      }(o2 = e2) || "function" == typeof o2 || function(e3) {
        return "object" == typeof e3 && "symbol" == typeof e3.$$typeof && ["react.memo", "react.forward_ref"].includes(e3.$$typeof.description);
      }(o2) ? t2.createElement(e2, n3) : e2;
      var o2;
    }
    function S2(e2, t3, n3) {
      return void 0 === n3 && (n3 = 0), e2.map(function(e3) {
        return x2(e3 = r2({}, e3, { parent: t3, depth: n3 })), e3.columns && (e3.columns = S2(e3.columns, e3, n3 + 1)), e3;
      });
    }
    function C2(e2) {
      return G2(e2, "columns");
    }
    function x2(e2) {
      var t3 = e2.id, n3 = e2.accessor, o2 = e2.Header;
      if ("string" == typeof n3) {
        t3 = t3 || n3;
        var r3 = n3.split(".");
        n3 = function(e3) {
          return function(e4, t4, n4) {
            if (!t4)
              return e4;
            var o3, r4 = "function" == typeof t4 ? t4 : JSON.stringify(t4), i3 = E2.get(r4) || function() {
              var e5 = function(e6) {
                return function e7(t5, n5) {
                  void 0 === n5 && (n5 = []);
                  if (Array.isArray(t5))
                    for (var o4 = 0; o4 < t5.length; o4 += 1)
                      e7(t5[o4], n5);
                  else
                    n5.push(t5);
                  return n5;
                }(e6).map(function(e7) {
                  return String(e7).replace(".", "_");
                }).join(".").replace(T2, ".").replace(O2, "").split(".");
              }(t4);
              return E2.set(r4, e5), e5;
            }();
            try {
              o3 = i3.reduce(function(e5, t5) {
                return e5[t5];
              }, e4);
            } catch (e5) {
            }
            return void 0 !== o3 ? o3 : n4;
          }(e3, r3);
        };
      }
      if (!t3 && "string" == typeof o2 && o2 && (t3 = o2), !t3 && e2.columns)
        throw console.error(e2), new Error('A column ID (or unique "Header" value) is required!');
      if (!t3)
        throw console.error(e2), new Error("A column ID (or string accessor) is required!");
      return Object.assign(e2, { id: t3, accessor: n3 }), e2;
    }
    function P2(e2, t3) {
      if (!t3)
        throw new Error();
      return Object.assign(e2, r2({ Header: a, Footer: a }, c, {}, t3, {}, e2)), Object.assign(e2, { originalWidth: e2.width }), e2;
    }
    function B2(e2, t3, n3) {
      void 0 === n3 && (n3 = function() {
        return {};
      });
      for (var o2 = [], i3 = e2, u3 = 0, l3 = function() {
        return u3++;
      }, s2 = function() {
        var e3 = { headers: [] }, u4 = [], s3 = i3.some(function(e4) {
          return e4.parent;
        });
        i3.forEach(function(o3) {
          var i4, a2 = [].concat(u4).reverse()[0];
          if (s3) {
            if (o3.parent)
              i4 = r2({}, o3.parent, { originalId: o3.parent.id, id: o3.parent.id + "_" + l3(), headers: [o3] }, n3(o3));
            else
              i4 = P2(r2({ originalId: o3.id + "_placeholder", id: o3.id + "_placeholder_" + l3(), placeholderOf: o3, headers: [o3] }, n3(o3)), t3);
            a2 && a2.originalId === i4.originalId ? a2.headers.push(o3) : u4.push(i4);
          }
          e3.headers.push(o3);
        }), o2.push(e3), i3 = u4;
      }; i3.length; )
        s2();
      return o2.reverse();
    }
    var E2 = /* @__PURE__ */ new Map();
    function I2() {
      for (var e2 = arguments.length, t3 = new Array(e2), n3 = 0; n3 < e2; n3++)
        t3[n3] = arguments[n3];
      for (var o2 = 0; o2 < t3.length; o2 += 1)
        if (void 0 !== t3[o2])
          return t3[o2];
    }
    function F2(e2) {
      if ("function" == typeof e2)
        return e2;
    }
    function G2(e2, t3) {
      var n3 = [];
      return function e3(o2) {
        o2.forEach(function(o3) {
          o3[t3] ? e3(o3[t3]) : n3.push(o3);
        });
      }(e2), n3;
    }
    function A2(e2, t3) {
      var n3 = t3.manualExpandedKey, o2 = t3.expanded, r3 = t3.expandSubRows, i3 = void 0 === r3 || r3, u3 = [];
      return e2.forEach(function(e3) {
        return function e4(t4, r4) {
          void 0 === r4 && (r4 = true), t4.isExpanded = t4.original && t4.original[n3] || o2[t4.id], t4.canExpand = t4.subRows && !!t4.subRows.length, r4 && u3.push(t4), t4.subRows && t4.subRows.length && t4.isExpanded && t4.subRows.forEach(function(t5) {
            return e4(t5, i3);
          });
        }(e3);
      }), u3;
    }
    function k3(e2, t3, n3) {
      return F2(e2) || t3[e2] || n3[e2] || n3.text;
    }
    function H2(e2, t3, n3) {
      return e2 ? e2(t3, n3) : void 0 === t3;
    }
    function W2() {
      throw new Error("React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.");
    }
    var z2 = null;
    var T2 = /\[/g, O2 = /\]/g;
    var M2 = function(e2) {
      return r2({ role: "table" }, e2);
    }, j = function(e2) {
      return r2({ role: "rowgroup" }, e2);
    }, L2 = function(e2, t3) {
      var n3 = t3.column;
      return r2({ key: "header_" + n3.id, colSpan: n3.totalVisibleHeaderCount, role: "columnheader" }, e2);
    }, N2 = function(e2, t3) {
      var n3 = t3.column;
      return r2({ key: "footer_" + n3.id, colSpan: n3.totalVisibleHeaderCount }, e2);
    }, D2 = function(e2, t3) {
      return r2({ key: "headerGroup_" + t3.index, role: "row" }, e2);
    }, V2 = function(e2, t3) {
      return r2({ key: "footerGroup_" + t3.index }, e2);
    }, _ = function(e2, t3) {
      return r2({ key: "row_" + t3.row.id, role: "row" }, e2);
    }, X2 = function(e2, t3) {
      var n3 = t3.cell;
      return r2({ key: "cell_" + n3.row.id + "_" + n3.column.id, role: "cell" }, e2);
    };
    function q2() {
      return { useOptions: [], stateReducers: [], useControlledState: [], columns: [], columnsDeps: [], allColumns: [], allColumnsDeps: [], accessValue: [], materializedColumns: [], materializedColumnsDeps: [], useInstanceAfterData: [], visibleColumns: [], visibleColumnsDeps: [], headerGroups: [], headerGroupsDeps: [], useInstanceBeforeDimensions: [], useInstance: [], prepareRow: [], getTableProps: [M2], getTableBodyProps: [j], getHeaderGroupProps: [D2], getFooterGroupProps: [V2], getHeaderProps: [L2], getFooterProps: [N2], getRowProps: [_], getCellProps: [X2], useFinalInstance: [] };
    }
    l2.resetHiddenColumns = "resetHiddenColumns", l2.toggleHideColumn = "toggleHideColumn", l2.setHiddenColumns = "setHiddenColumns", l2.toggleHideAllColumns = "toggleHideAllColumns";
    var K2 = function(e2) {
      e2.getToggleHiddenProps = [U2], e2.getToggleHideAllColumnsProps = [$], e2.stateReducers.push(J2), e2.useInstanceBeforeDimensions.push(Y2), e2.headerGroupsDeps.push(function(e3, t3) {
        var n3 = t3.instance;
        return [].concat(e3, [n3.state.hiddenColumns]);
      }), e2.useInstance.push(Q2);
    };
    K2.pluginName = "useColumnVisibility";
    var U2 = function(e2, t3) {
      var n3 = t3.column;
      return [e2, { onChange: function(e3) {
        n3.toggleHidden(!e3.target.checked);
      }, style: { cursor: "pointer" }, checked: n3.isVisible, title: "Toggle Column Visible" }];
    }, $ = function(e2, t3) {
      var n3 = t3.instance;
      return [e2, { onChange: function(e3) {
        n3.toggleHideAllColumns(!e3.target.checked);
      }, style: { cursor: "pointer" }, checked: !n3.allColumnsHidden && !n3.state.hiddenColumns.length, title: "Toggle All Columns Hidden", indeterminate: !n3.allColumnsHidden && n3.state.hiddenColumns.length }];
    };
    function J2(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ hiddenColumns: [] }, e2);
      if (t3.type === l2.resetHiddenColumns)
        return r2({}, e2, { hiddenColumns: o2.initialState.hiddenColumns || [] });
      if (t3.type === l2.toggleHideColumn) {
        var i3 = (void 0 !== t3.value ? t3.value : !e2.hiddenColumns.includes(t3.columnId)) ? [].concat(e2.hiddenColumns, [t3.columnId]) : e2.hiddenColumns.filter(function(e3) {
          return e3 !== t3.columnId;
        });
        return r2({}, e2, { hiddenColumns: i3 });
      }
      return t3.type === l2.setHiddenColumns ? r2({}, e2, { hiddenColumns: m2(t3.value, e2.hiddenColumns) }) : t3.type === l2.toggleHideAllColumns ? r2({}, e2, { hiddenColumns: (void 0 !== t3.value ? t3.value : !e2.hiddenColumns.length) ? o2.allColumns.map(function(e3) {
        return e3.id;
      }) : [] }) : void 0;
    }
    function Y2(e2) {
      var n3 = e2.headers, o2 = e2.state.hiddenColumns;
      t2.useRef(false).current;
      var r3 = 0;
      n3.forEach(function(e3) {
        return r3 += function e4(t3, n4) {
          t3.isVisible = n4 && !o2.includes(t3.id);
          var r4 = 0;
          return t3.headers && t3.headers.length ? t3.headers.forEach(function(n5) {
            return r4 += e4(n5, t3.isVisible);
          }) : r4 = t3.isVisible ? 1 : 0, t3.totalVisibleHeaderCount = r4, r4;
        }(e3, true);
      });
    }
    function Q2(e2) {
      var n3 = e2.columns, o2 = e2.flatHeaders, r3 = e2.dispatch, i3 = e2.allColumns, u3 = e2.getHooks, s2 = e2.state.hiddenColumns, a2 = e2.autoResetHiddenColumns, c2 = void 0 === a2 || a2, d2 = h(e2), p3 = i3.length === s2.length, g2 = t2.useCallback(function(e3, t3) {
        return r3({ type: l2.toggleHideColumn, columnId: e3, value: t3 });
      }, [r3]), v3 = t2.useCallback(function(e3) {
        return r3({ type: l2.setHiddenColumns, value: e3 });
      }, [r3]), m3 = t2.useCallback(function(e3) {
        return r3({ type: l2.toggleHideAllColumns, value: e3 });
      }, [r3]), y3 = f2(u3().getToggleHideAllColumnsProps, { instance: d2() });
      o2.forEach(function(e3) {
        e3.toggleHidden = function(t3) {
          r3({ type: l2.toggleHideColumn, columnId: e3.id, value: t3 });
        }, e3.getToggleHiddenProps = f2(u3().getToggleHiddenProps, { instance: d2(), column: e3 });
      });
      var R3 = h(c2);
      w2(function() {
        R3() && r3({ type: l2.resetHiddenColumns });
      }, [r3, n3]), Object.assign(e2, { allColumnsHidden: p3, toggleHideColumn: g2, setHiddenColumns: v3, toggleHideAllColumns: m3, getToggleHideAllColumnsProps: y3 });
    }
    var Z2 = {}, ee2 = {}, te2 = function(e2, t3, n3) {
      return e2;
    }, ne2 = function(e2, t3) {
      return e2.subRows || [];
    }, oe2 = function(e2, t3, n3) {
      return "" + (n3 ? [n3.id, t3].join(".") : t3);
    }, re2 = function(e2) {
      return e2;
    };
    function ie2(e2) {
      var t3 = e2.initialState, n3 = void 0 === t3 ? Z2 : t3, o2 = e2.defaultColumn, u3 = void 0 === o2 ? ee2 : o2, l3 = e2.getSubRows, s2 = void 0 === l3 ? ne2 : l3, a2 = e2.getRowId, c2 = void 0 === a2 ? oe2 : a2, d2 = e2.stateReducer, f3 = void 0 === d2 ? te2 : d2, p3 = e2.useControlledState, g2 = void 0 === p3 ? re2 : p3;
      return r2({}, i2(e2, ["initialState", "defaultColumn", "getSubRows", "getRowId", "stateReducer", "useControlledState"]), { initialState: n3, defaultColumn: u3, getSubRows: s2, getRowId: c2, stateReducer: f3, useControlledState: g2 });
    }
    function ue2(e2, t3) {
      void 0 === t3 && (t3 = 0);
      var n3 = 0, o2 = 0, r3 = 0, i3 = 0;
      return e2.forEach(function(e3) {
        var u3 = e3.headers;
        if (e3.totalLeft = t3, u3 && u3.length) {
          var l3 = ue2(u3, t3), s2 = l3[0], a2 = l3[1], c2 = l3[2], d2 = l3[3];
          e3.totalMinWidth = s2, e3.totalWidth = a2, e3.totalMaxWidth = c2, e3.totalFlexWidth = d2;
        } else
          e3.totalMinWidth = e3.minWidth, e3.totalWidth = Math.min(Math.max(e3.minWidth, e3.width), e3.maxWidth), e3.totalMaxWidth = e3.maxWidth, e3.totalFlexWidth = e3.canResize ? e3.totalWidth : 0;
        e3.isVisible && (t3 += e3.totalWidth, n3 += e3.totalMinWidth, o2 += e3.totalWidth, r3 += e3.totalMaxWidth, i3 += e3.totalFlexWidth);
      }), [n3, o2, r3, i3];
    }
    function le2(e2) {
      var t3 = e2.data, n3 = e2.rows, o2 = e2.flatRows, r3 = e2.rowsById, i3 = e2.column, u3 = e2.getRowId, l3 = e2.getSubRows, s2 = e2.accessValueHooks, a2 = e2.getInstance;
      t3.forEach(function(e3, c2) {
        return function e4(n4, c3, d2, f3, g2) {
          void 0 === d2 && (d2 = 0);
          var v3 = n4, m3 = u3(n4, c3, f3), h2 = r3[m3];
          if (h2)
            h2.subRows && h2.originalSubRows.forEach(function(t4, n5) {
              return e4(t4, n5, d2 + 1, h2);
            });
          else if ((h2 = { id: m3, original: v3, index: c3, depth: d2, cells: [{}] }).cells.map = W2, h2.cells.filter = W2, h2.cells.forEach = W2, h2.cells[0].getCellProps = W2, h2.values = {}, g2.push(h2), o2.push(h2), r3[m3] = h2, h2.originalSubRows = l3(n4, c3), h2.originalSubRows) {
            var y3 = [];
            h2.originalSubRows.forEach(function(t4, n5) {
              return e4(t4, n5, d2 + 1, h2, y3);
            }), h2.subRows = y3;
          }
          i3.accessor && (h2.values[i3.id] = i3.accessor(n4, c3, h2, g2, t3)), h2.values[i3.id] = p2(s2, h2.values[i3.id], { row: h2, column: i3, instance: a2() });
        }(e3, c2, 0, void 0, n3);
      });
    }
    l2.resetExpanded = "resetExpanded", l2.toggleRowExpanded = "toggleRowExpanded", l2.toggleAllRowsExpanded = "toggleAllRowsExpanded";
    var se2 = function(e2) {
      e2.getToggleAllRowsExpandedProps = [ae2], e2.getToggleRowExpandedProps = [ce2], e2.stateReducers.push(de2), e2.useInstance.push(fe2), e2.prepareRow.push(pe2);
    };
    se2.pluginName = "useExpanded";
    var ae2 = function(e2, t3) {
      var n3 = t3.instance;
      return [e2, { onClick: function(e3) {
        n3.toggleAllRowsExpanded();
      }, style: { cursor: "pointer" }, title: "Toggle All Rows Expanded" }];
    }, ce2 = function(e2, t3) {
      var n3 = t3.row;
      return [e2, { onClick: function() {
        n3.toggleRowExpanded();
      }, style: { cursor: "pointer" }, title: "Toggle Row Expanded" }];
    };
    function de2(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ expanded: {} }, e2);
      if (t3.type === l2.resetExpanded)
        return r2({}, e2, { expanded: o2.initialState.expanded || {} });
      if (t3.type === l2.toggleAllRowsExpanded) {
        var s2 = t3.value, a2 = o2.rowsById, c2 = Object.keys(a2).length === Object.keys(e2.expanded).length;
        if (void 0 !== s2 ? s2 : !c2) {
          var d2 = {};
          return Object.keys(a2).forEach(function(e3) {
            d2[e3] = true;
          }), r2({}, e2, { expanded: d2 });
        }
        return r2({}, e2, { expanded: {} });
      }
      if (t3.type === l2.toggleRowExpanded) {
        var f3, p3 = t3.id, g2 = t3.value, v3 = e2.expanded[p3], m3 = void 0 !== g2 ? g2 : !v3;
        if (!v3 && m3)
          return r2({}, e2, { expanded: r2({}, e2.expanded, (f3 = {}, f3[p3] = true, f3)) });
        if (v3 && !m3) {
          var h2 = e2.expanded;
          h2[p3];
          return r2({}, e2, { expanded: i2(h2, [p3].map(u2)) });
        }
        return e2;
      }
    }
    function fe2(e2) {
      var n3 = e2.data, o2 = e2.rows, r3 = e2.rowsById, i3 = e2.manualExpandedKey, u3 = void 0 === i3 ? "expanded" : i3, s2 = e2.paginateExpandedRows, a2 = void 0 === s2 || s2, c2 = e2.expandSubRows, d2 = void 0 === c2 || c2, p3 = e2.autoResetExpanded, g2 = void 0 === p3 || p3, m3 = e2.getHooks, y3 = e2.plugins, R3 = e2.state.expanded, b2 = e2.dispatch;
      v2(y3, ["useSortBy", "useGroupBy", "usePivotColumns", "useGlobalFilter"], "useExpanded");
      var S3 = h(g2), C3 = Boolean(Object.keys(r3).length && Object.keys(R3).length);
      C3 && Object.keys(r3).some(function(e3) {
        return !R3[e3];
      }) && (C3 = false), w2(function() {
        S3() && b2({ type: l2.resetExpanded });
      }, [b2, n3]);
      var x3 = t2.useCallback(function(e3, t3) {
        b2({ type: l2.toggleRowExpanded, id: e3, value: t3 });
      }, [b2]), P3 = t2.useCallback(function(e3) {
        return b2({ type: l2.toggleAllRowsExpanded, value: e3 });
      }, [b2]), B3 = t2.useMemo(function() {
        return a2 ? A2(o2, { manualExpandedKey: u3, expanded: R3, expandSubRows: d2 }) : o2;
      }, [a2, o2, u3, R3, d2]), E3 = t2.useMemo(function() {
        return function(e3) {
          var t3 = 0;
          return Object.keys(e3).forEach(function(e4) {
            var n4 = e4.split(".");
            t3 = Math.max(t3, n4.length);
          }), t3;
        }(R3);
      }, [R3]), I3 = h(e2), F3 = f2(m3().getToggleAllRowsExpandedProps, { instance: I3() });
      Object.assign(e2, { preExpandedRows: o2, expandedRows: B3, rows: B3, expandedDepth: E3, isAllRowsExpanded: C3, toggleRowExpanded: x3, toggleAllRowsExpanded: P3, getToggleAllRowsExpandedProps: F3 });
    }
    function pe2(e2, t3) {
      var n3 = t3.instance.getHooks, o2 = t3.instance;
      e2.toggleRowExpanded = function(t4) {
        return o2.toggleRowExpanded(e2.id, t4);
      }, e2.getToggleRowExpandedProps = f2(n3().getToggleRowExpandedProps, { instance: o2, row: e2 });
    }
    var ge2 = function(e2, t3, n3) {
      return e2 = e2.filter(function(e3) {
        return t3.some(function(t4) {
          var o2 = e3.values[t4];
          return String(o2).toLowerCase().includes(String(n3).toLowerCase());
        });
      });
    };
    ge2.autoRemove = function(e2) {
      return !e2;
    };
    var ve2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          var o2 = e3.values[t4];
          return void 0 === o2 || String(o2).toLowerCase() === String(n3).toLowerCase();
        });
      });
    };
    ve2.autoRemove = function(e2) {
      return !e2;
    };
    var me2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          var o2 = e3.values[t4];
          return void 0 === o2 || String(o2) === String(n3);
        });
      });
    };
    me2.autoRemove = function(e2) {
      return !e2;
    };
    var he2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          return e3.values[t4].includes(n3);
        });
      });
    };
    he2.autoRemove = function(e2) {
      return !e2 || !e2.length;
    };
    var ye2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          var o2 = e3.values[t4];
          return o2 && o2.length && n3.every(function(e4) {
            return o2.includes(e4);
          });
        });
      });
    };
    ye2.autoRemove = function(e2) {
      return !e2 || !e2.length;
    };
    var we2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          var o2 = e3.values[t4];
          return o2 && o2.length && n3.some(function(e4) {
            return o2.includes(e4);
          });
        });
      });
    };
    we2.autoRemove = function(e2) {
      return !e2 || !e2.length;
    };
    var Re2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          var o2 = e3.values[t4];
          return n3.includes(o2);
        });
      });
    };
    Re2.autoRemove = function(e2) {
      return !e2 || !e2.length;
    };
    var be2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          return e3.values[t4] === n3;
        });
      });
    };
    be2.autoRemove = function(e2) {
      return void 0 === e2;
    };
    var Se2 = function(e2, t3, n3) {
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          return e3.values[t4] == n3;
        });
      });
    };
    Se2.autoRemove = function(e2) {
      return null == e2;
    };
    var Ce2 = function(e2, t3, n3) {
      var o2 = n3 || [], r3 = o2[0], i3 = o2[1];
      if ((r3 = "number" == typeof r3 ? r3 : -1 / 0) > (i3 = "number" == typeof i3 ? i3 : 1 / 0)) {
        var u3 = r3;
        r3 = i3, i3 = u3;
      }
      return e2.filter(function(e3) {
        return t3.some(function(t4) {
          var n4 = e3.values[t4];
          return n4 >= r3 && n4 <= i3;
        });
      });
    };
    Ce2.autoRemove = function(e2) {
      return !e2 || "number" != typeof e2[0] && "number" != typeof e2[1];
    };
    var xe2 = Object.freeze({ __proto__: null, text: ge2, exactText: ve2, exactTextCase: me2, includes: he2, includesAll: ye2, includesSome: we2, includesValue: Re2, exact: be2, equals: Se2, between: Ce2 });
    l2.resetFilters = "resetFilters", l2.setFilter = "setFilter", l2.setAllFilters = "setAllFilters";
    var Pe2 = function(e2) {
      e2.stateReducers.push(Be2), e2.useInstance.push(Ee2);
    };
    function Be2(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ filters: [] }, e2);
      if (t3.type === l2.resetFilters)
        return r2({}, e2, { filters: o2.initialState.filters || [] });
      if (t3.type === l2.setFilter) {
        var i3 = t3.columnId, u3 = t3.filterValue, s2 = o2.allColumns, a2 = o2.filterTypes, c2 = s2.find(function(e3) {
          return e3.id === i3;
        });
        if (!c2)
          throw new Error("React-Table: Could not find a column with id: " + i3);
        var d2 = k3(c2.filter, a2 || {}, xe2), f3 = e2.filters.find(function(e3) {
          return e3.id === i3;
        }), p3 = m2(u3, f3 && f3.value);
        return H2(d2.autoRemove, p3, c2) ? r2({}, e2, { filters: e2.filters.filter(function(e3) {
          return e3.id !== i3;
        }) }) : r2({}, e2, f3 ? { filters: e2.filters.map(function(e3) {
          return e3.id === i3 ? { id: i3, value: p3 } : e3;
        }) } : { filters: [].concat(e2.filters, [{ id: i3, value: p3 }]) });
      }
      if (t3.type === l2.setAllFilters) {
        var g2 = t3.filters, v3 = o2.allColumns, h2 = o2.filterTypes;
        return r2({}, e2, { filters: m2(g2, e2.filters).filter(function(e3) {
          var t4 = v3.find(function(t5) {
            return t5.id === e3.id;
          });
          return !H2(k3(t4.filter, h2 || {}, xe2).autoRemove, e3.value, t4);
        }) });
      }
    }
    function Ee2(e2) {
      var n3 = e2.data, o2 = e2.rows, r3 = e2.flatRows, i3 = e2.rowsById, u3 = e2.allColumns, s2 = e2.filterTypes, a2 = e2.manualFilters, c2 = e2.defaultCanFilter, d2 = void 0 !== c2 && c2, f3 = e2.disableFilters, p3 = e2.state.filters, g2 = e2.dispatch, v3 = e2.autoResetFilters, m3 = void 0 === v3 || v3, y3 = t2.useCallback(function(e3, t3) {
        g2({ type: l2.setFilter, columnId: e3, filterValue: t3 });
      }, [g2]), R3 = t2.useCallback(function(e3) {
        g2({ type: l2.setAllFilters, filters: e3 });
      }, [g2]);
      u3.forEach(function(e3) {
        var t3 = e3.id, n4 = e3.accessor, o3 = e3.defaultCanFilter, r4 = e3.disableFilters;
        e3.canFilter = n4 ? I2(true !== r4 && void 0, true !== f3 && void 0, true) : I2(o3, d2, false), e3.setFilter = function(t4) {
          return y3(e3.id, t4);
        };
        var i4 = p3.find(function(e4) {
          return e4.id === t3;
        });
        e3.filterValue = i4 && i4.value;
      });
      var b2 = t2.useMemo(function() {
        if (a2 || !p3.length)
          return [o2, r3, i3];
        var e3 = [], t3 = {};
        return [function n4(o3, r4) {
          void 0 === r4 && (r4 = 0);
          var i4 = o3;
          return (i4 = p3.reduce(function(e4, t4) {
            var n5 = t4.id, o4 = t4.value, i5 = u3.find(function(e5) {
              return e5.id === n5;
            });
            if (!i5)
              return e4;
            0 === r4 && (i5.preFilteredRows = e4);
            var l3 = k3(i5.filter, s2 || {}, xe2);
            return l3 ? (i5.filteredRows = l3(e4, [n5], o4), i5.filteredRows) : (console.warn("Could not find a valid 'column.filter' for column with the ID: " + i5.id + "."), e4);
          }, o3)).forEach(function(o4) {
            e3.push(o4), t3[o4.id] = o4, o4.subRows && (o4.subRows = o4.subRows && o4.subRows.length > 0 ? n4(o4.subRows, r4 + 1) : o4.subRows);
          }), i4;
        }(o2), e3, t3];
      }, [a2, p3, o2, r3, i3, u3, s2]), S3 = b2[0], C3 = b2[1], x3 = b2[2];
      t2.useMemo(function() {
        u3.filter(function(e3) {
          return !p3.find(function(t3) {
            return t3.id === e3.id;
          });
        }).forEach(function(e3) {
          e3.preFilteredRows = S3, e3.filteredRows = S3;
        });
      }, [S3, p3, u3]);
      var P3 = h(m3);
      w2(function() {
        P3() && g2({ type: l2.resetFilters });
      }, [g2, a2 ? null : n3]), Object.assign(e2, { preFilteredRows: o2, preFilteredFlatRows: r3, preFilteredRowsById: i3, filteredRows: S3, filteredFlatRows: C3, filteredRowsById: x3, rows: S3, flatRows: C3, rowsById: x3, setFilter: y3, setAllFilters: R3 });
    }
    Pe2.pluginName = "useFilters", l2.resetGlobalFilter = "resetGlobalFilter", l2.setGlobalFilter = "setGlobalFilter";
    var Ie2 = function(e2) {
      e2.stateReducers.push(Fe2), e2.useInstance.push(Ge2);
    };
    function Fe2(e2, t3, n3, o2) {
      if (t3.type === l2.resetGlobalFilter)
        return r2({}, e2, { globalFilter: o2.initialState.globalFilter || void 0 });
      if (t3.type === l2.setGlobalFilter) {
        var u3 = t3.filterValue, s2 = o2.userFilterTypes, a2 = k3(o2.globalFilter, s2 || {}, xe2), c2 = m2(u3, e2.globalFilter);
        if (H2(a2.autoRemove, c2)) {
          e2.globalFilter;
          return i2(e2, ["globalFilter"]);
        }
        return r2({}, e2, { globalFilter: c2 });
      }
    }
    function Ge2(e2) {
      var n3 = e2.data, o2 = e2.rows, r3 = e2.flatRows, i3 = e2.rowsById, u3 = e2.allColumns, s2 = e2.filterTypes, a2 = e2.globalFilter, c2 = e2.manualGlobalFilter, d2 = e2.state.globalFilter, f3 = e2.dispatch, p3 = e2.autoResetGlobalFilter, g2 = void 0 === p3 || p3, v3 = e2.disableGlobalFilter, m3 = t2.useCallback(function(e3) {
        f3({ type: l2.setGlobalFilter, filterValue: e3 });
      }, [f3]), y3 = t2.useMemo(function() {
        if (c2 || void 0 === d2)
          return [o2, r3, i3];
        var e3 = [], t3 = {}, n4 = k3(a2, s2 || {}, xe2);
        if (!n4)
          return console.warn("Could not find a valid 'globalFilter' option."), o2;
        u3.forEach(function(e4) {
          var t4 = e4.disableGlobalFilter;
          e4.canFilter = I2(true !== t4 && void 0, true !== v3 && void 0, true);
        });
        var l3 = u3.filter(function(e4) {
          return true === e4.canFilter;
        });
        return [function o3(r4) {
          return (r4 = n4(r4, l3.map(function(e4) {
            return e4.id;
          }), d2)).forEach(function(n5) {
            e3.push(n5), t3[n5.id] = n5, n5.subRows = n5.subRows && n5.subRows.length ? o3(n5.subRows) : n5.subRows;
          }), r4;
        }(o2), e3, t3];
      }, [c2, d2, a2, s2, u3, o2, r3, i3, v3]), R3 = y3[0], b2 = y3[1], S3 = y3[2], C3 = h(g2);
      w2(function() {
        C3() && f3({ type: l2.resetGlobalFilter });
      }, [f3, c2 ? null : n3]), Object.assign(e2, { preGlobalFilteredRows: o2, preGlobalFilteredFlatRows: r3, preGlobalFilteredRowsById: i3, globalFilteredRows: R3, globalFilteredFlatRows: b2, globalFilteredRowsById: S3, rows: R3, flatRows: b2, rowsById: S3, setGlobalFilter: m3, disableGlobalFilter: v3 });
    }
    function Ae2(e2, t3) {
      return t3.reduce(function(e3, t4) {
        return e3 + ("number" == typeof t4 ? t4 : 0);
      }, 0);
    }
    Ie2.pluginName = "useGlobalFilter";
    var ke2 = Object.freeze({ __proto__: null, sum: Ae2, min: function(e2) {
      var t3 = e2[0] || 0;
      return e2.forEach(function(e3) {
        "number" == typeof e3 && (t3 = Math.min(t3, e3));
      }), t3;
    }, max: function(e2) {
      var t3 = e2[0] || 0;
      return e2.forEach(function(e3) {
        "number" == typeof e3 && (t3 = Math.max(t3, e3));
      }), t3;
    }, minMax: function(e2) {
      var t3 = e2[0] || 0, n3 = e2[0] || 0;
      return e2.forEach(function(e3) {
        "number" == typeof e3 && (t3 = Math.min(t3, e3), n3 = Math.max(n3, e3));
      }), t3 + ".." + n3;
    }, average: function(e2) {
      return Ae2(0, e2) / e2.length;
    }, median: function(e2) {
      if (!e2.length)
        return null;
      var t3 = Math.floor(e2.length / 2), n3 = [].concat(e2).sort(function(e3, t4) {
        return e3 - t4;
      });
      return e2.length % 2 != 0 ? n3[t3] : (n3[t3 - 1] + n3[t3]) / 2;
    }, unique: function(e2) {
      return Array.from(new Set(e2).values());
    }, uniqueCount: function(e2) {
      return new Set(e2).size;
    }, count: function(e2) {
      return e2.length;
    } }), He2 = [], We2 = {};
    l2.resetGroupBy = "resetGroupBy", l2.setGroupBy = "setGroupBy", l2.toggleGroupBy = "toggleGroupBy";
    var ze2 = function(e2) {
      e2.getGroupByToggleProps = [Te2], e2.stateReducers.push(Oe2), e2.visibleColumnsDeps.push(function(e3, t3) {
        var n3 = t3.instance;
        return [].concat(e3, [n3.state.groupBy]);
      }), e2.visibleColumns.push(Me2), e2.useInstance.push(Le2), e2.prepareRow.push(Ne2);
    };
    ze2.pluginName = "useGroupBy";
    var Te2 = function(e2, t3) {
      var n3 = t3.header;
      return [e2, { onClick: n3.canGroupBy ? function(e3) {
        e3.persist(), n3.toggleGroupBy();
      } : void 0, style: { cursor: n3.canGroupBy ? "pointer" : void 0 }, title: "Toggle GroupBy" }];
    };
    function Oe2(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ groupBy: [] }, e2);
      if (t3.type === l2.resetGroupBy)
        return r2({}, e2, { groupBy: o2.initialState.groupBy || [] });
      if (t3.type === l2.setGroupBy)
        return r2({}, e2, { groupBy: t3.value });
      if (t3.type === l2.toggleGroupBy) {
        var i3 = t3.columnId, u3 = t3.value, s2 = void 0 !== u3 ? u3 : !e2.groupBy.includes(i3);
        return r2({}, e2, s2 ? { groupBy: [].concat(e2.groupBy, [i3]) } : { groupBy: e2.groupBy.filter(function(e3) {
          return e3 !== i3;
        }) });
      }
    }
    function Me2(e2, t3) {
      var n3 = t3.instance.state.groupBy, o2 = n3.map(function(t4) {
        return e2.find(function(e3) {
          return e3.id === t4;
        });
      }).filter(Boolean), r3 = e2.filter(function(e3) {
        return !n3.includes(e3.id);
      });
      return (e2 = [].concat(o2, r3)).forEach(function(e3) {
        e3.isGrouped = n3.includes(e3.id), e3.groupedIndex = n3.indexOf(e3.id);
      }), e2;
    }
    var je2 = {};
    function Le2(e2) {
      var n3 = e2.data, o2 = e2.rows, i3 = e2.flatRows, u3 = e2.rowsById, s2 = e2.allColumns, a2 = e2.flatHeaders, c2 = e2.groupByFn, d2 = void 0 === c2 ? De2 : c2, p3 = e2.manualGroupBy, g2 = e2.aggregations, m3 = void 0 === g2 ? je2 : g2, y3 = e2.plugins, R3 = e2.state.groupBy, b2 = e2.dispatch, S3 = e2.autoResetGroupBy, C3 = void 0 === S3 || S3, x3 = e2.disableGroupBy, P3 = e2.defaultCanGroupBy, B3 = e2.getHooks;
      v2(y3, ["useColumnOrder", "useFilters"], "useGroupBy");
      var E3 = h(e2);
      s2.forEach(function(t3) {
        var n4 = t3.accessor, o3 = t3.defaultGroupBy, r3 = t3.disableGroupBy;
        t3.canGroupBy = n4 ? I2(t3.canGroupBy, true !== r3 && void 0, true !== x3 && void 0, true) : I2(t3.canGroupBy, o3, P3, false), t3.canGroupBy && (t3.toggleGroupBy = function() {
          return e2.toggleGroupBy(t3.id);
        }), t3.Aggregated = t3.Aggregated || t3.Cell;
      });
      var F3 = t2.useCallback(function(e3, t3) {
        b2({ type: l2.toggleGroupBy, columnId: e3, value: t3 });
      }, [b2]), A3 = t2.useCallback(function(e3) {
        b2({ type: l2.setGroupBy, value: e3 });
      }, [b2]);
      a2.forEach(function(e3) {
        e3.getGroupByToggleProps = f2(B3().getGroupByToggleProps, { instance: E3(), header: e3 });
      });
      var k4 = t2.useMemo(function() {
        if (p3 || !R3.length)
          return [o2, i3, u3, He2, We2, i3, u3];
        var e3 = R3.filter(function(e4) {
          return s2.find(function(t4) {
            return t4.id === e4;
          });
        }), t3 = [], n4 = {}, l3 = [], a3 = {}, c3 = [], f3 = {}, g3 = function o3(i4, u4, p4) {
          if (void 0 === u4 && (u4 = 0), u4 === e3.length)
            return i4.map(function(e4) {
              return r2({}, e4, { depth: u4 });
            });
          var g4 = e3[u4], v3 = d2(i4, g4);
          return Object.entries(v3).map(function(r3, i5) {
            var d3 = r3[0], v4 = r3[1], h2 = g4 + ":" + d3, y4 = o3(v4, u4 + 1, h2 = p4 ? p4 + ">" + h2 : h2), w3 = u4 ? G2(v4, "leafRows") : v4, R4 = function(t4, n5, o4) {
              var r4 = {};
              return s2.forEach(function(i6) {
                if (e3.includes(i6.id))
                  r4[i6.id] = n5[0] ? n5[0].values[i6.id] : null;
                else {
                  var u5 = "function" == typeof i6.aggregate ? i6.aggregate : m3[i6.aggregate] || ke2[i6.aggregate];
                  if (u5) {
                    var l4 = n5.map(function(e4) {
                      return e4.values[i6.id];
                    }), s3 = t4.map(function(e4) {
                      var t5 = e4.values[i6.id];
                      if (!o4 && i6.aggregateValue) {
                        var n6 = "function" == typeof i6.aggregateValue ? i6.aggregateValue : m3[i6.aggregateValue] || ke2[i6.aggregateValue];
                        if (!n6)
                          throw console.info({ column: i6 }), new Error("React Table: Invalid column.aggregateValue option for column listed above");
                        t5 = n6(t5, e4, i6);
                      }
                      return t5;
                    });
                    r4[i6.id] = u5(s3, l4);
                  } else {
                    if (i6.aggregate)
                      throw console.info({ column: i6 }), new Error("React Table: Invalid column.aggregate option for column listed above");
                    r4[i6.id] = null;
                  }
                }
              }), r4;
            }(w3, v4, u4), b3 = { id: h2, isGrouped: true, groupByID: g4, groupByVal: d3, values: R4, subRows: y4, leafRows: w3, depth: u4, index: i5 };
            return y4.forEach(function(e4) {
              t3.push(e4), n4[e4.id] = e4, e4.isGrouped ? (l3.push(e4), a3[e4.id] = e4) : (c3.push(e4), f3[e4.id] = e4);
            }), b3;
          });
        }(o2);
        return g3.forEach(function(e4) {
          t3.push(e4), n4[e4.id] = e4, e4.isGrouped ? (l3.push(e4), a3[e4.id] = e4) : (c3.push(e4), f3[e4.id] = e4);
        }), [g3, t3, n4, l3, a3, c3, f3];
      }, [p3, R3, o2, i3, u3, s2, m3, d2]), H3 = k4[0], W3 = k4[1], z3 = k4[2], T3 = k4[3], O3 = k4[4], M3 = k4[5], j2 = k4[6], L3 = h(C3);
      w2(function() {
        L3() && b2({ type: l2.resetGroupBy });
      }, [b2, p3 ? null : n3]), Object.assign(e2, { preGroupedRows: o2, preGroupedFlatRow: i3, preGroupedRowsById: u3, groupedRows: H3, groupedFlatRows: W3, groupedRowsById: z3, onlyGroupedFlatRows: T3, onlyGroupedRowsById: O3, nonGroupedFlatRows: M3, nonGroupedRowsById: j2, rows: H3, flatRows: W3, rowsById: z3, toggleGroupBy: F3, setGroupBy: A3 });
    }
    function Ne2(e2) {
      e2.allCells.forEach(function(t3) {
        var n3;
        t3.isGrouped = t3.column.isGrouped && t3.column.id === e2.groupByID, t3.isPlaceholder = !t3.isGrouped && t3.column.isGrouped, t3.isAggregated = !t3.isGrouped && !t3.isPlaceholder && (null == (n3 = e2.subRows) ? void 0 : n3.length);
      });
    }
    function De2(e2, t3) {
      return e2.reduce(function(e3, n3, o2) {
        var r3 = "" + n3.values[t3];
        return e3[r3] = Array.isArray(e3[r3]) ? e3[r3] : [], e3[r3].push(n3), e3;
      }, {});
    }
    var Ve2 = /([0-9]+)/gm;
    function _e(e2, t3) {
      return e2 === t3 ? 0 : e2 > t3 ? 1 : -1;
    }
    function Xe2(e2, t3, n3) {
      return [e2.values[n3], t3.values[n3]];
    }
    function qe2(e2) {
      return "number" == typeof e2 ? isNaN(e2) || e2 === 1 / 0 || e2 === -1 / 0 ? "" : String(e2) : "string" == typeof e2 ? e2 : "";
    }
    var Ke2 = Object.freeze({ __proto__: null, alphanumeric: function(e2, t3, n3) {
      var o2 = Xe2(e2, t3, n3), r3 = o2[0], i3 = o2[1];
      for (r3 = qe2(r3), i3 = qe2(i3), r3 = r3.split(Ve2).filter(Boolean), i3 = i3.split(Ve2).filter(Boolean); r3.length && i3.length; ) {
        var u3 = r3.shift(), l3 = i3.shift(), s2 = parseInt(u3, 10), a2 = parseInt(l3, 10), c2 = [s2, a2].sort();
        if (isNaN(c2[0])) {
          if (u3 > l3)
            return 1;
          if (l3 > u3)
            return -1;
        } else {
          if (isNaN(c2[1]))
            return isNaN(s2) ? -1 : 1;
          if (s2 > a2)
            return 1;
          if (a2 > s2)
            return -1;
        }
      }
      return r3.length - i3.length;
    }, datetime: function(e2, t3, n3) {
      var o2 = Xe2(e2, t3, n3), r3 = o2[0], i3 = o2[1];
      return _e(r3 = r3.getTime(), i3 = i3.getTime());
    }, basic: function(e2, t3, n3) {
      var o2 = Xe2(e2, t3, n3);
      return _e(o2[0], o2[1]);
    }, string: function(e2, t3, n3) {
      var o2 = Xe2(e2, t3, n3), r3 = o2[0], i3 = o2[1];
      for (r3 = r3.split("").filter(Boolean), i3 = i3.split("").filter(Boolean); r3.length && i3.length; ) {
        var u3 = r3.shift(), l3 = i3.shift(), s2 = u3.toLowerCase(), a2 = l3.toLowerCase();
        if (s2 > a2)
          return 1;
        if (a2 > s2)
          return -1;
        if (u3 > l3)
          return 1;
        if (l3 > u3)
          return -1;
      }
      return r3.length - i3.length;
    }, number: function(e2, t3, n3) {
      var o2 = Xe2(e2, t3, n3), r3 = o2[0], i3 = o2[1], u3 = /[^0-9.]/gi;
      return _e(r3 = Number(String(r3).replace(u3, "")), i3 = Number(String(i3).replace(u3, "")));
    } });
    l2.resetSortBy = "resetSortBy", l2.setSortBy = "setSortBy", l2.toggleSortBy = "toggleSortBy", l2.clearSortBy = "clearSortBy", c.sortType = "alphanumeric", c.sortDescFirst = false;
    var Ue2 = function(e2) {
      e2.getSortByToggleProps = [$e2], e2.stateReducers.push(Je2), e2.useInstance.push(Ye2);
    };
    Ue2.pluginName = "useSortBy";
    var $e2 = function(e2, t3) {
      var n3 = t3.instance, o2 = t3.column, r3 = n3.isMultiSortEvent, i3 = void 0 === r3 ? function(e3) {
        return e3.shiftKey;
      } : r3;
      return [e2, { onClick: o2.canSort ? function(e3) {
        e3.persist(), o2.toggleSortBy(void 0, !n3.disableMultiSort && i3(e3));
      } : void 0, style: { cursor: o2.canSort ? "pointer" : void 0 }, title: o2.canSort ? "Toggle SortBy" : void 0 }];
    };
    function Je2(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ sortBy: [] }, e2);
      if (t3.type === l2.resetSortBy)
        return r2({}, e2, { sortBy: o2.initialState.sortBy || [] });
      if (t3.type === l2.clearSortBy)
        return r2({}, e2, { sortBy: e2.sortBy.filter(function(e3) {
          return e3.id !== t3.columnId;
        }) });
      if (t3.type === l2.setSortBy)
        return r2({}, e2, { sortBy: t3.sortBy });
      if (t3.type === l2.toggleSortBy) {
        var i3, u3 = t3.columnId, s2 = t3.desc, a2 = t3.multi, c2 = o2.allColumns, d2 = o2.disableMultiSort, f3 = o2.disableSortRemove, p3 = o2.disableMultiRemove, g2 = o2.maxMultiSortColCount, v3 = void 0 === g2 ? Number.MAX_SAFE_INTEGER : g2, m3 = e2.sortBy, h2 = c2.find(function(e3) {
          return e3.id === u3;
        }).sortDescFirst, y3 = m3.find(function(e3) {
          return e3.id === u3;
        }), w3 = m3.findIndex(function(e3) {
          return e3.id === u3;
        }), R3 = null != s2, b2 = [];
        return "toggle" !== (i3 = !d2 && a2 ? y3 ? "toggle" : "add" : w3 !== m3.length - 1 || 1 !== m3.length ? "replace" : y3 ? "toggle" : "replace") || f3 || R3 || a2 && p3 || !(y3 && y3.desc && !h2 || !y3.desc && h2) || (i3 = "remove"), "replace" === i3 ? b2 = [{ id: u3, desc: R3 ? s2 : h2 }] : "add" === i3 ? (b2 = [].concat(m3, [{ id: u3, desc: R3 ? s2 : h2 }])).splice(0, b2.length - v3) : "toggle" === i3 ? b2 = m3.map(function(e3) {
          return e3.id === u3 ? r2({}, e3, { desc: R3 ? s2 : !y3.desc }) : e3;
        }) : "remove" === i3 && (b2 = m3.filter(function(e3) {
          return e3.id !== u3;
        })), r2({}, e2, { sortBy: b2 });
      }
    }
    function Ye2(e2) {
      var n3 = e2.data, o2 = e2.rows, r3 = e2.flatRows, i3 = e2.allColumns, u3 = e2.orderByFn, s2 = void 0 === u3 ? Qe2 : u3, a2 = e2.sortTypes, c2 = e2.manualSortBy, d2 = e2.defaultCanSort, p3 = e2.disableSortBy, g2 = e2.flatHeaders, m3 = e2.state.sortBy, y3 = e2.dispatch, R3 = e2.plugins, b2 = e2.getHooks, S3 = e2.autoResetSortBy, C3 = void 0 === S3 || S3;
      v2(R3, ["useFilters", "useGlobalFilter", "useGroupBy", "usePivotColumns"], "useSortBy");
      var x3 = t2.useCallback(function(e3) {
        y3({ type: l2.setSortBy, sortBy: e3 });
      }, [y3]), P3 = t2.useCallback(function(e3, t3, n4) {
        y3({ type: l2.toggleSortBy, columnId: e3, desc: t3, multi: n4 });
      }, [y3]), B3 = h(e2);
      g2.forEach(function(e3) {
        var t3 = e3.accessor, n4 = e3.canSort, o3 = e3.disableSortBy, r4 = e3.id, i4 = t3 ? I2(true !== o3 && void 0, true !== p3 && void 0, true) : I2(d2, n4, false);
        e3.canSort = i4, e3.canSort && (e3.toggleSortBy = function(t4, n5) {
          return P3(e3.id, t4, n5);
        }, e3.clearSortBy = function() {
          y3({ type: l2.clearSortBy, columnId: e3.id });
        }), e3.getSortByToggleProps = f2(b2().getSortByToggleProps, { instance: B3(), column: e3 });
        var u4 = m3.find(function(e4) {
          return e4.id === r4;
        });
        e3.isSorted = !!u4, e3.sortedIndex = m3.findIndex(function(e4) {
          return e4.id === r4;
        }), e3.isSortedDesc = e3.isSorted ? u4.desc : void 0;
      });
      var E3 = t2.useMemo(function() {
        if (c2 || !m3.length)
          return [o2, r3];
        var e3 = [], t3 = m3.filter(function(e4) {
          return i3.find(function(t4) {
            return t4.id === e4.id;
          });
        });
        return [function n4(o3) {
          var r4 = s2(o3, t3.map(function(e4) {
            var t4 = i3.find(function(t5) {
              return t5.id === e4.id;
            });
            if (!t4)
              throw new Error("React-Table: Could not find a column with id: " + e4.id + " while sorting");
            var n5 = t4.sortType, o4 = F2(n5) || (a2 || {})[n5] || Ke2[n5];
            if (!o4)
              throw new Error("React-Table: Could not find a valid sortType of '" + n5 + "' for column '" + e4.id + "'.");
            return function(t5, n6) {
              return o4(t5, n6, e4.id, e4.desc);
            };
          }), t3.map(function(e4) {
            var t4 = i3.find(function(t5) {
              return t5.id === e4.id;
            });
            return t4 && t4.sortInverted ? e4.desc : !e4.desc;
          }));
          return r4.forEach(function(t4) {
            e3.push(t4), t4.subRows && 0 !== t4.subRows.length && (t4.subRows = n4(t4.subRows));
          }), r4;
        }(o2), e3];
      }, [c2, m3, o2, r3, i3, s2, a2]), G3 = E3[0], A3 = E3[1], k4 = h(C3);
      w2(function() {
        k4() && y3({ type: l2.resetSortBy });
      }, [c2 ? null : n3]), Object.assign(e2, { preSortedRows: o2, preSortedFlatRows: r3, sortedRows: G3, sortedFlatRows: A3, rows: G3, flatRows: A3, setSortBy: x3, toggleSortBy: P3 });
    }
    function Qe2(e2, t3, n3) {
      return [].concat(e2).sort(function(e3, o2) {
        for (var r3 = 0; r3 < t3.length; r3 += 1) {
          var i3 = t3[r3], u3 = false === n3[r3] || "desc" === n3[r3], l3 = i3(e3, o2);
          if (0 !== l3)
            return u3 ? -l3 : l3;
        }
        return n3[0] ? e3.index - o2.index : o2.index - e3.index;
      });
    }
    l2.resetPage = "resetPage", l2.gotoPage = "gotoPage", l2.setPageSize = "setPageSize";
    var Ze2 = function(e2) {
      e2.stateReducers.push(et), e2.useInstance.push(tt);
    };
    function et(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ pageSize: 10, pageIndex: 0 }, e2);
      if (t3.type === l2.resetPage)
        return r2({}, e2, { pageIndex: o2.initialState.pageIndex || 0 });
      if (t3.type === l2.gotoPage) {
        var i3 = o2.pageCount, u3 = o2.page, s2 = m2(t3.pageIndex, e2.pageIndex), a2 = false;
        return s2 > e2.pageIndex ? a2 = -1 === i3 ? u3.length >= e2.pageSize : s2 < i3 : s2 < e2.pageIndex && (a2 = s2 > -1), a2 ? r2({}, e2, { pageIndex: s2 }) : e2;
      }
      if (t3.type === l2.setPageSize) {
        var c2 = t3.pageSize, d2 = e2.pageSize * e2.pageIndex;
        return r2({}, e2, { pageIndex: Math.floor(d2 / c2), pageSize: c2 });
      }
    }
    function tt(e2) {
      var n3 = e2.rows, o2 = e2.autoResetPage, r3 = void 0 === o2 || o2, i3 = e2.manualExpandedKey, u3 = void 0 === i3 ? "expanded" : i3, s2 = e2.plugins, a2 = e2.pageCount, c2 = e2.paginateExpandedRows, d2 = void 0 === c2 || c2, f3 = e2.expandSubRows, p3 = void 0 === f3 || f3, g2 = e2.state, m3 = g2.pageSize, y3 = g2.pageIndex, R3 = g2.expanded, b2 = g2.globalFilter, S3 = g2.filters, C3 = g2.groupBy, x3 = g2.sortBy, P3 = e2.dispatch, B3 = e2.data, E3 = e2.manualPagination;
      v2(s2, ["useGlobalFilter", "useFilters", "useGroupBy", "useSortBy", "useExpanded"], "usePagination");
      var I3 = h(r3);
      w2(function() {
        I3() && P3({ type: l2.resetPage });
      }, [P3, E3 ? null : B3, b2, S3, C3, x3]);
      var F3 = E3 ? a2 : Math.ceil(n3.length / m3), G3 = t2.useMemo(function() {
        return F3 > 0 ? [].concat(new Array(F3)).fill(null).map(function(e3, t3) {
          return t3;
        }) : [];
      }, [F3]), k4 = t2.useMemo(function() {
        var e3;
        if (E3)
          e3 = n3;
        else {
          var t3 = m3 * y3, o3 = t3 + m3;
          e3 = n3.slice(t3, o3);
        }
        return d2 ? e3 : A2(e3, { manualExpandedKey: u3, expanded: R3, expandSubRows: p3 });
      }, [p3, R3, u3, E3, y3, m3, d2, n3]), H3 = y3 > 0, W3 = -1 === F3 ? k4.length >= m3 : y3 < F3 - 1, z3 = t2.useCallback(function(e3) {
        P3({ type: l2.gotoPage, pageIndex: e3 });
      }, [P3]), T3 = t2.useCallback(function() {
        return z3(function(e3) {
          return e3 - 1;
        });
      }, [z3]), O3 = t2.useCallback(function() {
        return z3(function(e3) {
          return e3 + 1;
        });
      }, [z3]), M3 = t2.useCallback(function(e3) {
        P3({ type: l2.setPageSize, pageSize: e3 });
      }, [P3]);
      Object.assign(e2, { pageOptions: G3, pageCount: F3, page: k4, canPreviousPage: H3, canNextPage: W3, gotoPage: z3, previousPage: T3, nextPage: O3, setPageSize: M3 });
    }
    Ze2.pluginName = "usePagination", l2.resetPivot = "resetPivot", l2.togglePivot = "togglePivot";
    var nt = function(e2) {
      e2.getPivotToggleProps = [rt], e2.stateReducers.push(it), e2.useInstanceAfterData.push(ut), e2.allColumns.push(lt), e2.accessValue.push(st), e2.materializedColumns.push(at), e2.materializedColumnsDeps.push(ct), e2.visibleColumns.push(dt), e2.visibleColumnsDeps.push(ft), e2.useInstance.push(pt), e2.prepareRow.push(gt);
    };
    nt.pluginName = "usePivotColumns";
    var ot = [], rt = function(e2, t3) {
      var n3 = t3.header;
      return [e2, { onClick: n3.canPivot ? function(e3) {
        e3.persist(), n3.togglePivot();
      } : void 0, style: { cursor: n3.canPivot ? "pointer" : void 0 }, title: "Toggle Pivot" }];
    };
    function it(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ pivotColumns: ot }, e2);
      if (t3.type === l2.resetPivot)
        return r2({}, e2, { pivotColumns: o2.initialState.pivotColumns || ot });
      if (t3.type === l2.togglePivot) {
        var i3 = t3.columnId, u3 = t3.value, s2 = void 0 !== u3 ? u3 : !e2.pivotColumns.includes(i3);
        return r2({}, e2, s2 ? { pivotColumns: [].concat(e2.pivotColumns, [i3]) } : { pivotColumns: e2.pivotColumns.filter(function(e3) {
          return e3 !== i3;
        }) });
      }
    }
    function ut(e2) {
      e2.allColumns.forEach(function(t3) {
        t3.isPivotSource = e2.state.pivotColumns.includes(t3.id);
      });
    }
    function lt(e2, t3) {
      var n3 = t3.instance;
      return e2.forEach(function(e3) {
        e3.isPivotSource = n3.state.pivotColumns.includes(e3.id), e3.uniqueValues = /* @__PURE__ */ new Set();
      }), e2;
    }
    function st(e2, t3) {
      var n3 = t3.column;
      return n3.uniqueValues && void 0 !== e2 && n3.uniqueValues.add(e2), e2;
    }
    function at(e2, t3) {
      var n3 = t3.instance, o2 = n3.allColumns, i3 = n3.state;
      if (!i3.pivotColumns.length || !i3.groupBy || !i3.groupBy.length)
        return e2;
      var u3 = i3.pivotColumns.map(function(e3) {
        return o2.find(function(t4) {
          return t4.id === e3;
        });
      }).filter(Boolean), l3 = o2.filter(function(e3) {
        return !e3.isPivotSource && !i3.groupBy.includes(e3.id) && !i3.pivotColumns.includes(e3.id);
      }), s2 = C2(function e3(t4, n4, o3) {
        void 0 === t4 && (t4 = 0), void 0 === o3 && (o3 = []);
        var i4 = u3[t4];
        return i4 ? Array.from(i4.uniqueValues).sort().map(function(u4) {
          var l4 = r2({}, i4, { Header: i4.PivotHeader || "string" == typeof i4.header ? i4.Header + ": " + u4 : u4, isPivotGroup: true, parent: n4, depth: t4, id: n4 ? n4.id + "." + i4.id + "." + u4 : i4.id + "." + u4, pivotValue: u4 });
          return l4.columns = e3(t4 + 1, l4, [].concat(o3, [function(e4) {
            return e4.values[i4.id] === u4;
          }])), l4;
        }) : l3.map(function(e4) {
          return r2({}, e4, { canPivot: false, isPivoted: true, parent: n4, depth: t4, id: "" + (n4 ? n4.id + "." + e4.id : e4.id), accessor: function(t5, n5, r3) {
            if (o3.every(function(e5) {
              return e5(r3);
            }))
              return r3.values[e4.id];
          } });
        });
      }());
      return [].concat(e2, s2);
    }
    function ct(e2, t3) {
      var n3 = t3.instance.state, o2 = n3.pivotColumns, r3 = n3.groupBy;
      return [].concat(e2, [o2, r3]);
    }
    function dt(e2, t3) {
      var n3 = t3.instance.state;
      return e2 = e2.filter(function(e3) {
        return !e3.isPivotSource;
      }), n3.pivotColumns.length && n3.groupBy && n3.groupBy.length && (e2 = e2.filter(function(e3) {
        return e3.isGrouped || e3.isPivoted;
      })), e2;
    }
    function ft(e2, t3) {
      var n3 = t3.instance;
      return [].concat(e2, [n3.state.pivotColumns, n3.state.groupBy]);
    }
    function pt(e2) {
      var t3 = e2.columns, n3 = e2.allColumns, o2 = e2.flatHeaders, r3 = e2.getHooks, i3 = e2.plugins, u3 = e2.dispatch, s2 = e2.autoResetPivot, a2 = void 0 === s2 || s2, c2 = e2.manaulPivot, d2 = e2.disablePivot, p3 = e2.defaultCanPivot;
      v2(i3, ["useGroupBy"], "usePivotColumns");
      var g2 = h(e2);
      n3.forEach(function(t4) {
        var n4 = t4.accessor, o3 = t4.defaultPivot, r4 = t4.disablePivot;
        t4.canPivot = n4 ? I2(t4.canPivot, true !== r4 && void 0, true !== d2 && void 0, true) : I2(t4.canPivot, o3, p3, false), t4.canPivot && (t4.togglePivot = function() {
          return e2.togglePivot(t4.id);
        }), t4.Aggregated = t4.Aggregated || t4.Cell;
      });
      o2.forEach(function(e3) {
        e3.getPivotToggleProps = f2(r3().getPivotToggleProps, { instance: g2(), header: e3 });
      });
      var m3 = h(a2);
      w2(function() {
        m3() && u3({ type: l2.resetPivot });
      }, [u3, c2 ? null : t3]), Object.assign(e2, { togglePivot: function(e3, t4) {
        u3({ type: l2.togglePivot, columnId: e3, value: t4 });
      } });
    }
    function gt(e2) {
      e2.allCells.forEach(function(e3) {
        e3.isPivoted = e3.column.isPivoted;
      });
    }
    l2.resetSelectedRows = "resetSelectedRows", l2.toggleAllRowsSelected = "toggleAllRowsSelected", l2.toggleRowSelected = "toggleRowSelected", l2.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";
    var vt = function(e2) {
      e2.getToggleRowSelectedProps = [mt], e2.getToggleAllRowsSelectedProps = [ht], e2.getToggleAllPageRowsSelectedProps = [yt], e2.stateReducers.push(wt), e2.useInstance.push(Rt), e2.prepareRow.push(bt);
    };
    vt.pluginName = "useRowSelect";
    var mt = function(e2, t3) {
      var n3 = t3.instance, o2 = t3.row, r3 = n3.manualRowSelectedKey, i3 = void 0 === r3 ? "isSelected" : r3;
      return [e2, { onChange: function(e3) {
        o2.toggleRowSelected(e3.target.checked);
      }, style: { cursor: "pointer" }, checked: !(!o2.original || !o2.original[i3]) || o2.isSelected, title: "Toggle Row Selected", indeterminate: o2.isSomeSelected }];
    }, ht = function(e2, t3) {
      var n3 = t3.instance;
      return [e2, { onChange: function(e3) {
        n3.toggleAllRowsSelected(e3.target.checked);
      }, style: { cursor: "pointer" }, checked: n3.isAllRowsSelected, title: "Toggle All Rows Selected", indeterminate: Boolean(!n3.isAllRowsSelected && Object.keys(n3.state.selectedRowIds).length) }];
    }, yt = function(e2, t3) {
      var n3 = t3.instance;
      return [e2, { onChange: function(e3) {
        n3.toggleAllPageRowsSelected(e3.target.checked);
      }, style: { cursor: "pointer" }, checked: n3.isAllPageRowsSelected, title: "Toggle All Current Page Rows Selected", indeterminate: Boolean(!n3.isAllPageRowsSelected && n3.page.some(function(e3) {
        var t4 = e3.id;
        return n3.state.selectedRowIds[t4];
      })) }];
    };
    function wt(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ selectedRowIds: {} }, e2);
      if (t3.type === l2.resetSelectedRows)
        return r2({}, e2, { selectedRowIds: o2.initialState.selectedRowIds || {} });
      if (t3.type === l2.toggleAllRowsSelected) {
        var i3 = t3.value, u3 = o2.isAllRowsSelected, s2 = o2.rowsById, a2 = o2.nonGroupedRowsById, c2 = void 0 === a2 ? s2 : a2, d2 = void 0 !== i3 ? i3 : !u3, f3 = Object.assign({}, e2.selectedRowIds);
        return d2 ? Object.keys(c2).forEach(function(e3) {
          f3[e3] = true;
        }) : Object.keys(c2).forEach(function(e3) {
          delete f3[e3];
        }), r2({}, e2, { selectedRowIds: f3 });
      }
      if (t3.type === l2.toggleRowSelected) {
        var p3 = t3.id, g2 = t3.value, v3 = o2.rowsById, m3 = o2.selectSubRows, h2 = void 0 === m3 || m3, y3 = o2.getSubRows, w3 = e2.selectedRowIds[p3], R3 = void 0 !== g2 ? g2 : !w3;
        if (w3 === R3)
          return e2;
        var b2 = r2({}, e2.selectedRowIds);
        return function e3(t4) {
          var n4 = v3[t4];
          if (n4 && (n4.isGrouped || (R3 ? b2[t4] = true : delete b2[t4]), h2 && y3(n4)))
            return y3(n4).forEach(function(t5) {
              return e3(t5.id);
            });
        }(p3), r2({}, e2, { selectedRowIds: b2 });
      }
      if (t3.type === l2.toggleAllPageRowsSelected) {
        var S3 = t3.value, C3 = o2.page, x3 = o2.rowsById, P3 = o2.selectSubRows, B3 = void 0 === P3 || P3, E3 = o2.isAllPageRowsSelected, I3 = o2.getSubRows, F3 = void 0 !== S3 ? S3 : !E3, G3 = r2({}, e2.selectedRowIds);
        return C3.forEach(function(e3) {
          return function e4(t4) {
            var n4 = x3[t4];
            if (n4.isGrouped || (F3 ? G3[t4] = true : delete G3[t4]), B3 && I3(n4))
              return I3(n4).forEach(function(t5) {
                return e4(t5.id);
              });
          }(e3.id);
        }), r2({}, e2, { selectedRowIds: G3 });
      }
      return e2;
    }
    function Rt(e2) {
      var n3 = e2.data, o2 = e2.rows, r3 = e2.getHooks, i3 = e2.plugins, u3 = e2.rowsById, s2 = e2.nonGroupedRowsById, a2 = void 0 === s2 ? u3 : s2, c2 = e2.autoResetSelectedRows, d2 = void 0 === c2 || c2, p3 = e2.state.selectedRowIds, g2 = e2.selectSubRows, m3 = void 0 === g2 || g2, y3 = e2.dispatch, R3 = e2.page, b2 = e2.getSubRows;
      v2(i3, ["useFilters", "useGroupBy", "useSortBy", "useExpanded", "usePagination"], "useRowSelect");
      var S3 = t2.useMemo(function() {
        var e3 = [];
        return o2.forEach(function(t3) {
          var n4 = m3 ? function e4(t4, n5, o3) {
            if (n5[t4.id])
              return true;
            var r4 = o3(t4);
            if (r4 && r4.length) {
              var i4 = true, u4 = false;
              return r4.forEach(function(t5) {
                u4 && !i4 || (e4(t5, n5, o3) ? u4 = true : i4 = false);
              }), !!i4 || !!u4 && null;
            }
            return false;
          }(t3, p3, b2) : !!p3[t3.id];
          t3.isSelected = !!n4, t3.isSomeSelected = null === n4, n4 && e3.push(t3);
        }), e3;
      }, [o2, m3, p3, b2]), C3 = Boolean(Object.keys(a2).length && Object.keys(p3).length), x3 = C3;
      C3 && Object.keys(a2).some(function(e3) {
        return !p3[e3];
      }) && (C3 = false), C3 || R3 && R3.length && R3.some(function(e3) {
        var t3 = e3.id;
        return !p3[t3];
      }) && (x3 = false);
      var P3 = h(d2);
      w2(function() {
        P3() && y3({ type: l2.resetSelectedRows });
      }, [y3, n3]);
      var B3 = t2.useCallback(function(e3) {
        return y3({ type: l2.toggleAllRowsSelected, value: e3 });
      }, [y3]), E3 = t2.useCallback(function(e3) {
        return y3({ type: l2.toggleAllPageRowsSelected, value: e3 });
      }, [y3]), I3 = t2.useCallback(function(e3, t3) {
        return y3({ type: l2.toggleRowSelected, id: e3, value: t3 });
      }, [y3]), F3 = h(e2), G3 = f2(r3().getToggleAllRowsSelectedProps, { instance: F3() }), A3 = f2(r3().getToggleAllPageRowsSelectedProps, { instance: F3() });
      Object.assign(e2, { selectedFlatRows: S3, isAllRowsSelected: C3, isAllPageRowsSelected: x3, toggleRowSelected: I3, toggleAllRowsSelected: B3, getToggleAllRowsSelectedProps: G3, getToggleAllPageRowsSelectedProps: A3, toggleAllPageRowsSelected: E3 });
    }
    function bt(e2, t3) {
      var n3 = t3.instance;
      e2.toggleRowSelected = function(t4) {
        return n3.toggleRowSelected(e2.id, t4);
      }, e2.getToggleRowSelectedProps = f2(n3.getHooks().getToggleRowSelectedProps, { instance: n3, row: e2 });
    }
    var St = function(e2) {
      return {};
    }, Ct = function(e2) {
      return {};
    };
    l2.setRowState = "setRowState", l2.setCellState = "setCellState", l2.resetRowState = "resetRowState";
    var xt = function(e2) {
      e2.stateReducers.push(Pt), e2.useInstance.push(Bt), e2.prepareRow.push(Et);
    };
    function Pt(e2, t3, n3, o2) {
      var i3 = o2.initialRowStateAccessor, u3 = void 0 === i3 ? St : i3, s2 = o2.initialCellStateAccessor, a2 = void 0 === s2 ? Ct : s2, c2 = o2.rowsById;
      if (t3.type === l2.init)
        return r2({ rowState: {} }, e2);
      if (t3.type === l2.resetRowState)
        return r2({}, e2, { rowState: o2.initialState.rowState || {} });
      if (t3.type === l2.setRowState) {
        var d2, f3 = t3.rowId, p3 = t3.value, g2 = void 0 !== e2.rowState[f3] ? e2.rowState[f3] : u3(c2[f3]);
        return r2({}, e2, { rowState: r2({}, e2.rowState, (d2 = {}, d2[f3] = m2(p3, g2), d2)) });
      }
      if (t3.type === l2.setCellState) {
        var v3, h2, y3, w3, R3, b2 = t3.rowId, S3 = t3.columnId, C3 = t3.value, x3 = void 0 !== e2.rowState[b2] ? e2.rowState[b2] : u3(c2[b2]), P3 = void 0 !== (null == x3 ? void 0 : null == (v3 = x3.cellState) ? void 0 : v3[S3]) ? x3.cellState[S3] : a2(null == (h2 = c2[b2]) ? void 0 : null == (y3 = h2.cells) ? void 0 : y3.find(function(e3) {
          return e3.column.id === S3;
        }));
        return r2({}, e2, { rowState: r2({}, e2.rowState, (R3 = {}, R3[b2] = r2({}, x3, { cellState: r2({}, x3.cellState || {}, (w3 = {}, w3[S3] = m2(C3, P3), w3)) }), R3)) });
      }
    }
    function Bt(e2) {
      var n3 = e2.autoResetRowState, o2 = void 0 === n3 || n3, r3 = e2.data, i3 = e2.dispatch, u3 = t2.useCallback(function(e3, t3) {
        return i3({ type: l2.setRowState, rowId: e3, value: t3 });
      }, [i3]), s2 = t2.useCallback(function(e3, t3, n4) {
        return i3({ type: l2.setCellState, rowId: e3, columnId: t3, value: n4 });
      }, [i3]), a2 = h(o2);
      w2(function() {
        a2() && i3({ type: l2.resetRowState });
      }, [r3]), Object.assign(e2, { setRowState: u3, setCellState: s2 });
    }
    function Et(e2, t3) {
      var n3 = t3.instance, o2 = n3.initialRowStateAccessor, r3 = void 0 === o2 ? St : o2, i3 = n3.initialCellStateAccessor, u3 = void 0 === i3 ? Ct : i3, l3 = n3.state.rowState;
      e2 && (e2.state = void 0 !== l3[e2.id] ? l3[e2.id] : r3(e2), e2.setState = function(t4) {
        return n3.setRowState(e2.id, t4);
      }, e2.cells.forEach(function(t4) {
        e2.state.cellState || (e2.state.cellState = {}), t4.state = void 0 !== e2.state.cellState[t4.column.id] ? e2.state.cellState[t4.column.id] : u3(t4), t4.setState = function(o3) {
          return n3.setCellState(e2.id, t4.column.id, o3);
        };
      }));
    }
    xt.pluginName = "useRowState", l2.resetColumnOrder = "resetColumnOrder", l2.setColumnOrder = "setColumnOrder";
    var It = function(e2) {
      e2.stateReducers.push(Ft), e2.visibleColumnsDeps.push(function(e3, t3) {
        var n3 = t3.instance;
        return [].concat(e3, [n3.state.columnOrder]);
      }), e2.visibleColumns.push(Gt), e2.useInstance.push(At);
    };
    function Ft(e2, t3, n3, o2) {
      return t3.type === l2.init ? r2({ columnOrder: [] }, e2) : t3.type === l2.resetColumnOrder ? r2({}, e2, { columnOrder: o2.initialState.columnOrder || [] }) : t3.type === l2.setColumnOrder ? r2({}, e2, { columnOrder: m2(t3.columnOrder, e2.columnOrder) }) : void 0;
    }
    function Gt(e2, t3) {
      var n3 = t3.instance.state.columnOrder;
      if (!n3 || !n3.length)
        return e2;
      for (var o2 = [].concat(n3), r3 = [].concat(e2), i3 = [], u3 = function() {
        var e3 = o2.shift(), t4 = r3.findIndex(function(t5) {
          return t5.id === e3;
        });
        t4 > -1 && i3.push(r3.splice(t4, 1)[0]);
      }; r3.length && o2.length; )
        u3();
      return [].concat(i3, r3);
    }
    function At(e2) {
      var n3 = e2.dispatch;
      e2.setColumnOrder = t2.useCallback(function(e3) {
        return n3({ type: l2.setColumnOrder, columnOrder: e3 });
      }, [n3]);
    }
    It.pluginName = "useColumnOrder", c.canResize = true, l2.columnStartResizing = "columnStartResizing", l2.columnResizing = "columnResizing", l2.columnDoneResizing = "columnDoneResizing", l2.resetResize = "resetResize";
    var kt = function(e2) {
      e2.getResizerProps = [Ht], e2.getHeaderProps.push({ style: { position: "relative" } }), e2.stateReducers.push(Wt), e2.useInstance.push(Tt), e2.useInstanceBeforeDimensions.push(zt);
    }, Ht = function(e2, t3) {
      var n3 = t3.instance, o2 = t3.header, r3 = n3.dispatch, i3 = function(e3, t4) {
        var n4 = false;
        if ("touchstart" === e3.type) {
          if (e3.touches && e3.touches.length > 1)
            return;
          n4 = true;
        }
        var o3, i4, u3 = function(e4) {
          var t5 = [];
          return function e5(n5) {
            n5.columns && n5.columns.length && n5.columns.map(e5);
            t5.push(n5);
          }(e4), t5;
        }(t4).map(function(e4) {
          return [e4.id, e4.totalWidth];
        }), s2 = n4 ? Math.round(e3.touches[0].clientX) : e3.clientX, a2 = function() {
          window.cancelAnimationFrame(o3), o3 = null, r3({ type: l2.columnDoneResizing });
        }, c2 = function() {
          window.cancelAnimationFrame(o3), o3 = null, r3({ type: l2.columnResizing, clientX: i4 });
        }, d2 = function(e4) {
          i4 = e4, o3 || (o3 = window.requestAnimationFrame(c2));
        }, f3 = { mouse: { moveEvent: "mousemove", moveHandler: function(e4) {
          return d2(e4.clientX);
        }, upEvent: "mouseup", upHandler: function(e4) {
          document.removeEventListener("mousemove", f3.mouse.moveHandler), document.removeEventListener("mouseup", f3.mouse.upHandler), a2();
        } }, touch: { moveEvent: "touchmove", moveHandler: function(e4) {
          return e4.cancelable && (e4.preventDefault(), e4.stopPropagation()), d2(e4.touches[0].clientX), false;
        }, upEvent: "touchend", upHandler: function(e4) {
          document.removeEventListener(f3.touch.moveEvent, f3.touch.moveHandler), document.removeEventListener(f3.touch.upEvent, f3.touch.moveHandler), a2();
        } } }, p3 = n4 ? f3.touch : f3.mouse, g2 = !!function() {
          if ("boolean" == typeof z2)
            return z2;
          var e4 = false;
          try {
            var t5 = { get passive() {
              return e4 = true, false;
            } };
            window.addEventListener("test", null, t5), window.removeEventListener("test", null, t5);
          } catch (t6) {
            e4 = false;
          }
          return z2 = e4;
        }() && { passive: false };
        document.addEventListener(p3.moveEvent, p3.moveHandler, g2), document.addEventListener(p3.upEvent, p3.upHandler, g2), r3({ type: l2.columnStartResizing, columnId: t4.id, columnWidth: t4.totalWidth, headerIdWidths: u3, clientX: s2 });
      };
      return [e2, { onMouseDown: function(e3) {
        return e3.persist() || i3(e3, o2);
      }, onTouchStart: function(e3) {
        return e3.persist() || i3(e3, o2);
      }, style: { cursor: "col-resize" }, draggable: false, role: "separator" }];
    };
    function Wt(e2, t3) {
      if (t3.type === l2.init)
        return r2({ columnResizing: { columnWidths: {} } }, e2);
      if (t3.type === l2.resetResize)
        return r2({}, e2, { columnResizing: { columnWidths: {} } });
      if (t3.type === l2.columnStartResizing) {
        var n3 = t3.clientX, o2 = t3.columnId, i3 = t3.columnWidth, u3 = t3.headerIdWidths;
        return r2({}, e2, { columnResizing: r2({}, e2.columnResizing, { startX: n3, headerIdWidths: u3, columnWidth: i3, isResizingColumn: o2 }) });
      }
      if (t3.type === l2.columnResizing) {
        var s2 = t3.clientX, a2 = e2.columnResizing, c2 = a2.startX, d2 = a2.columnWidth, f3 = a2.headerIdWidths, p3 = (s2 - c2) / d2, g2 = {};
        return (void 0 === f3 ? [] : f3).forEach(function(e3) {
          var t4 = e3[0], n4 = e3[1];
          g2[t4] = Math.max(n4 + n4 * p3, 0);
        }), r2({}, e2, { columnResizing: r2({}, e2.columnResizing, { columnWidths: r2({}, e2.columnResizing.columnWidths, {}, g2) }) });
      }
      return t3.type === l2.columnDoneResizing ? r2({}, e2, { columnResizing: r2({}, e2.columnResizing, { startX: null, isResizingColumn: null }) }) : void 0;
    }
    kt.pluginName = "useResizeColumns";
    var zt = function(e2) {
      var t3 = e2.flatHeaders, n3 = e2.disableResizing, o2 = e2.getHooks, r3 = e2.state.columnResizing, i3 = h(e2);
      t3.forEach(function(e3) {
        var t4 = I2(true !== e3.disableResizing && void 0, true !== n3 && void 0, true);
        e3.canResize = t4, e3.width = r3.columnWidths[e3.id] || e3.originalWidth || e3.width, e3.isResizing = r3.isResizingColumn === e3.id, t4 && (e3.getResizerProps = f2(o2().getResizerProps, { instance: i3(), header: e3 }));
      });
    };
    function Tt(e2) {
      var n3 = e2.plugins, o2 = e2.dispatch, r3 = e2.autoResetResize, i3 = void 0 === r3 || r3, u3 = e2.columns;
      v2(n3, ["useAbsoluteLayout"], "useResizeColumns");
      var s2 = h(i3);
      w2(function() {
        s2() && o2({ type: l2.resetResize });
      }, [u3]);
      var a2 = t2.useCallback(function() {
        return o2({ type: l2.resetResize });
      }, [o2]);
      Object.assign(e2, { resetResizing: a2 });
    }
    var Ot = { position: "absolute", top: 0 }, Mt = function(e2) {
      e2.getTableBodyProps.push(jt), e2.getRowProps.push(jt), e2.getHeaderGroupProps.push(jt), e2.getFooterGroupProps.push(jt), e2.getHeaderProps.push(function(e3, t3) {
        var n3 = t3.column;
        return [e3, { style: r2({}, Ot, { left: n3.totalLeft + "px", width: n3.totalWidth + "px" }) }];
      }), e2.getCellProps.push(function(e3, t3) {
        var n3 = t3.cell;
        return [e3, { style: r2({}, Ot, { left: n3.column.totalLeft + "px", width: n3.column.totalWidth + "px" }) }];
      }), e2.getFooterProps.push(function(e3, t3) {
        var n3 = t3.column;
        return [e3, { style: r2({}, Ot, { left: n3.totalLeft + "px", width: n3.totalWidth + "px" }) }];
      });
    };
    Mt.pluginName = "useAbsoluteLayout";
    var jt = function(e2, t3) {
      return [e2, { style: { position: "relative", width: t3.instance.totalColumnsWidth + "px" } }];
    }, Lt = { display: "inline-block", boxSizing: "border-box" }, Nt = function(e2, t3) {
      return [e2, { style: { display: "flex", width: t3.instance.totalColumnsWidth + "px" } }];
    }, Dt = function(e2) {
      e2.getRowProps.push(Nt), e2.getHeaderGroupProps.push(Nt), e2.getFooterGroupProps.push(Nt), e2.getHeaderProps.push(function(e3, t3) {
        var n3 = t3.column;
        return [e3, { style: r2({}, Lt, { width: n3.totalWidth + "px" }) }];
      }), e2.getCellProps.push(function(e3, t3) {
        var n3 = t3.cell;
        return [e3, { style: r2({}, Lt, { width: n3.column.totalWidth + "px" }) }];
      }), e2.getFooterProps.push(function(e3, t3) {
        var n3 = t3.column;
        return [e3, { style: r2({}, Lt, { width: n3.totalWidth + "px" }) }];
      });
    };
    function Vt(e2) {
      e2.getTableProps.push(_t), e2.getRowProps.push(Xt), e2.getHeaderGroupProps.push(Xt), e2.getFooterGroupProps.push(Xt), e2.getHeaderProps.push(qt), e2.getCellProps.push(Kt), e2.getFooterProps.push(Ut);
    }
    Dt.pluginName = "useBlockLayout", Vt.pluginName = "useFlexLayout";
    var _t = function(e2, t3) {
      return [e2, { style: { minWidth: t3.instance.totalColumnsMinWidth + "px" } }];
    }, Xt = function(e2, t3) {
      return [e2, { style: { display: "flex", flex: "1 0 auto", minWidth: t3.instance.totalColumnsMinWidth + "px" } }];
    }, qt = function(e2, t3) {
      var n3 = t3.column;
      return [e2, { style: { boxSizing: "border-box", flex: n3.totalFlexWidth ? n3.totalFlexWidth + " 0 auto" : void 0, minWidth: n3.totalMinWidth + "px", width: n3.totalWidth + "px" } }];
    }, Kt = function(e2, t3) {
      var n3 = t3.cell;
      return [e2, { style: { boxSizing: "border-box", flex: n3.column.totalFlexWidth + " 0 auto", minWidth: n3.column.totalMinWidth + "px", width: n3.column.totalWidth + "px" } }];
    }, Ut = function(e2, t3) {
      var n3 = t3.column;
      return [e2, { style: { boxSizing: "border-box", flex: n3.totalFlexWidth ? n3.totalFlexWidth + " 0 auto" : void 0, minWidth: n3.totalMinWidth + "px", width: n3.totalWidth + "px" } }];
    };
    function $t(e2) {
      e2.stateReducers.push(Zt), e2.getTableProps.push(Jt), e2.getHeaderProps.push(Yt), e2.getRowProps.push(Qt);
    }
    l2.columnStartResizing = "columnStartResizing", l2.columnResizing = "columnResizing", l2.columnDoneResizing = "columnDoneResizing", l2.resetResize = "resetResize", $t.pluginName = "useGridLayout";
    var Jt = function(e2, t3) {
      var n3 = t3.instance;
      return [e2, { style: { display: "grid", gridTemplateColumns: n3.visibleColumns.map(function(e3) {
        var t4;
        return n3.state.gridLayout.columnWidths[e3.id] ? n3.state.gridLayout.columnWidths[e3.id] + "px" : (null == (t4 = n3.state.columnResizing) ? void 0 : t4.isResizingColumn) ? n3.state.gridLayout.startWidths[e3.id] + "px" : "number" == typeof e3.width ? e3.width + "px" : e3.width;
      }).join(" ") } }];
    }, Yt = function(e2, t3) {
      var n3 = t3.column;
      return [e2, { id: "header-cell-" + n3.id, style: { position: "sticky", gridColumn: "span " + n3.totalVisibleHeaderCount } }];
    }, Qt = function(e2, t3) {
      var n3 = t3.row;
      return n3.isExpanded ? [e2, { style: { gridColumn: "1 / " + (n3.cells.length + 1) } }] : [e2, {}];
    };
    function Zt(e2, t3, n3, o2) {
      if (t3.type === l2.init)
        return r2({ gridLayout: { columnWidths: {} } }, e2);
      if (t3.type === l2.resetResize)
        return r2({}, e2, { gridLayout: { columnWidths: {} } });
      if (t3.type === l2.columnStartResizing) {
        var i3 = t3.columnId, u3 = t3.headerIdWidths, s2 = en(i3);
        if (void 0 !== s2) {
          var a2 = o2.visibleColumns.reduce(function(e3, t4) {
            var n4;
            return r2({}, e3, ((n4 = {})[t4.id] = en(t4.id), n4));
          }, {}), c2 = o2.visibleColumns.reduce(function(e3, t4) {
            var n4;
            return r2({}, e3, ((n4 = {})[t4.id] = t4.minWidth, n4));
          }, {}), d2 = o2.visibleColumns.reduce(function(e3, t4) {
            var n4;
            return r2({}, e3, ((n4 = {})[t4.id] = t4.maxWidth, n4));
          }, {}), f3 = u3.map(function(e3) {
            var t4 = e3[0];
            return [t4, en(t4)];
          });
          return r2({}, e2, { gridLayout: r2({}, e2.gridLayout, { startWidths: a2, minWidths: c2, maxWidths: d2, headerIdGridWidths: f3, columnWidth: s2 }) });
        }
        return e2;
      }
      if (t3.type === l2.columnResizing) {
        var p3 = t3.clientX, g2 = e2.columnResizing.startX, v3 = e2.gridLayout, m3 = v3.columnWidth, h2 = v3.minWidths, y3 = v3.maxWidths, w3 = v3.headerIdGridWidths, R3 = (p3 - g2) / m3, b2 = {};
        return (void 0 === w3 ? [] : w3).forEach(function(e3) {
          var t4 = e3[0], n4 = e3[1];
          b2[t4] = Math.min(Math.max(h2[t4], n4 + n4 * R3), y3[t4]);
        }), r2({}, e2, { gridLayout: r2({}, e2.gridLayout, { columnWidths: r2({}, e2.gridLayout.columnWidths, {}, b2) }) });
      }
      return t3.type === l2.columnDoneResizing ? r2({}, e2, { gridLayout: r2({}, e2.gridLayout, { startWidths: {}, minWidths: {}, maxWidths: {} }) }) : void 0;
    }
    function en(e2) {
      var t3, n3 = null == (t3 = document.getElementById("header-cell-" + e2)) ? void 0 : t3.offsetWidth;
      if (void 0 !== n3)
        return n3;
    }
    e._UNSTABLE_usePivotColumns = nt, e.actions = l2, e.defaultColumn = c, e.defaultGroupByFn = De2, e.defaultOrderByFn = Qe2, e.defaultRenderer = s, e.emptyRenderer = a, e.ensurePluginOrder = v2, e.flexRender = b, e.functionalUpdate = m2, e.loopHooks = g, e.makePropGetter = f2, e.makeRenderer = R2, e.reduceHooks = p2, e.safeUseLayoutEffect = y2, e.useAbsoluteLayout = Mt, e.useAsyncDebounce = function(e2, n3) {
      void 0 === n3 && (n3 = 0);
      var r3 = t2.useRef({}), i3 = h(e2), u3 = h(n3);
      return t2.useCallback(function() {
        var e3 = o(regeneratorRuntime.mark(function e4() {
          var t3, n4, l3, s2 = arguments;
          return regeneratorRuntime.wrap(function(e5) {
            for (; ; )
              switch (e5.prev = e5.next) {
                case 0:
                  for (t3 = s2.length, n4 = new Array(t3), l3 = 0; l3 < t3; l3++)
                    n4[l3] = s2[l3];
                  return r3.current.promise || (r3.current.promise = new Promise(function(e6, t4) {
                    r3.current.resolve = e6, r3.current.reject = t4;
                  })), r3.current.timeout && clearTimeout(r3.current.timeout), r3.current.timeout = setTimeout(o(regeneratorRuntime.mark(function e6() {
                    return regeneratorRuntime.wrap(function(e7) {
                      for (; ; )
                        switch (e7.prev = e7.next) {
                          case 0:
                            return delete r3.current.timeout, e7.prev = 1, e7.t0 = r3.current, e7.next = 5, i3().apply(void 0, n4);
                          case 5:
                            e7.t1 = e7.sent, e7.t0.resolve.call(e7.t0, e7.t1), e7.next = 12;
                            break;
                          case 9:
                            e7.prev = 9, e7.t2 = e7.catch(1), r3.current.reject(e7.t2);
                          case 12:
                            return e7.prev = 12, delete r3.current.promise, e7.finish(12);
                          case 15:
                          case "end":
                            return e7.stop();
                        }
                    }, e6, null, [[1, 9, 12, 15]]);
                  })), u3()), e5.abrupt("return", r3.current.promise);
                case 5:
                case "end":
                  return e5.stop();
              }
          }, e4);
        }));
        return function() {
          return e3.apply(this, arguments);
        };
      }(), [i3, u3]);
    }, e.useBlockLayout = Dt, e.useColumnOrder = It, e.useExpanded = se2, e.useFilters = Pe2, e.useFlexLayout = Vt, e.useGetLatest = h, e.useGlobalFilter = Ie2, e.useGridLayout = $t, e.useGroupBy = ze2, e.useMountedLayoutEffect = w2, e.usePagination = Ze2, e.useResizeColumns = kt, e.useRowSelect = vt, e.useRowState = xt, e.useSortBy = Ue2, e.useTable = function(e2) {
      for (var n3 = arguments.length, o2 = new Array(n3 > 1 ? n3 - 1 : 0), i3 = 1; i3 < n3; i3++)
        o2[i3 - 1] = arguments[i3];
      e2 = ie2(e2), o2 = [K2].concat(o2);
      var u3 = t2.useRef({}), s2 = h(u3.current);
      Object.assign(s2(), r2({}, e2, { plugins: o2, hooks: q2() })), o2.filter(Boolean).forEach(function(e3) {
        e3(s2().hooks);
      });
      var a2 = h(s2().hooks);
      s2().getHooks = a2, delete s2().hooks, Object.assign(s2(), p2(a2().useOptions, ie2(e2)));
      var c2 = s2(), d2 = c2.data, v3 = c2.columns, m3 = c2.initialState, y3 = c2.defaultColumn, w3 = c2.getSubRows, b2 = c2.getRowId, E3 = c2.stateReducer, I3 = c2.useControlledState, F3 = h(E3), G3 = t2.useCallback(function(e3, t3) {
        if (!t3.type)
          throw console.info({ action: t3 }), new Error("Unknown Action \u{1F446}");
        return [].concat(a2().stateReducers, Array.isArray(F3()) ? F3() : [F3()]).reduce(function(n4, o3) {
          return o3(n4, t3, e3, s2()) || n4;
        }, e3);
      }, [a2, F3, s2]), A3 = t2.useReducer(G3, void 0, function() {
        return G3(m3, { type: l2.init });
      }), k4 = A3[0], H3 = A3[1], W3 = p2([].concat(a2().useControlledState, [I3]), k4, { instance: s2() });
      Object.assign(s2(), { state: W3, dispatch: H3 });
      var z3 = t2.useMemo(function() {
        return S2(p2(a2().columns, v3, { instance: s2() }));
      }, [a2, s2, v3].concat(p2(a2().columnsDeps, [], { instance: s2() })));
      s2().columns = z3;
      var T3 = t2.useMemo(function() {
        return p2(a2().allColumns, C2(z3), { instance: s2() }).map(x2);
      }, [z3, a2, s2].concat(p2(a2().allColumnsDeps, [], { instance: s2() })));
      s2().allColumns = T3;
      var O3 = t2.useMemo(function() {
        for (var e3 = [], t3 = [], n4 = {}, o3 = [].concat(T3); o3.length; ) {
          var r3 = o3.shift();
          le2({ data: d2, rows: e3, flatRows: t3, rowsById: n4, column: r3, getRowId: b2, getSubRows: w3, accessValueHooks: a2().accessValue, getInstance: s2 });
        }
        return [e3, t3, n4];
      }, [T3, d2, b2, w3, a2, s2]), M3 = O3[0], j2 = O3[1], L3 = O3[2];
      Object.assign(s2(), { rows: M3, initialRows: [].concat(M3), flatRows: j2, rowsById: L3 }), g(a2().useInstanceAfterData, s2());
      var N3 = t2.useMemo(function() {
        return p2(a2().visibleColumns, T3, { instance: s2() }).map(function(e3) {
          return P2(e3, y3);
        });
      }, [a2, T3, s2, y3].concat(p2(a2().visibleColumnsDeps, [], { instance: s2() })));
      T3 = t2.useMemo(function() {
        var e3 = [].concat(N3);
        return T3.forEach(function(t3) {
          e3.find(function(e4) {
            return e4.id === t3.id;
          }) || e3.push(t3);
        }), e3;
      }, [T3, N3]), s2().allColumns = T3;
      var D3 = t2.useMemo(function() {
        return p2(a2().headerGroups, B2(N3, y3), s2());
      }, [a2, N3, y3, s2].concat(p2(a2().headerGroupsDeps, [], { instance: s2() })));
      s2().headerGroups = D3;
      var V3 = t2.useMemo(function() {
        return D3.length ? D3[0].headers : [];
      }, [D3]);
      s2().headers = V3, s2().flatHeaders = D3.reduce(function(e3, t3) {
        return [].concat(e3, t3.headers);
      }, []), g(a2().useInstanceBeforeDimensions, s2());
      var _2 = N3.filter(function(e3) {
        return e3.isVisible;
      }).map(function(e3) {
        return e3.id;
      }).sort().join("_");
      N3 = t2.useMemo(function() {
        return N3.filter(function(e3) {
          return e3.isVisible;
        });
      }, [N3, _2]), s2().visibleColumns = N3;
      var X3 = ue2(V3), U3 = X3[0], $2 = X3[1], J3 = X3[2];
      return s2().totalColumnsMinWidth = U3, s2().totalColumnsWidth = $2, s2().totalColumnsMaxWidth = J3, g(a2().useInstance, s2()), [].concat(s2().flatHeaders, s2().allColumns).forEach(function(e3) {
        e3.render = R2(s2(), e3), e3.getHeaderProps = f2(a2().getHeaderProps, { instance: s2(), column: e3 }), e3.getFooterProps = f2(a2().getFooterProps, { instance: s2(), column: e3 });
      }), s2().headerGroups = t2.useMemo(function() {
        return D3.filter(function(e3, t3) {
          return e3.headers = e3.headers.filter(function(e4) {
            return e4.headers ? function e5(t4) {
              return t4.filter(function(t5) {
                return t5.headers ? e5(t5.headers) : t5.isVisible;
              }).length;
            }(e4.headers) : e4.isVisible;
          }), !!e3.headers.length && (e3.getHeaderGroupProps = f2(a2().getHeaderGroupProps, { instance: s2(), headerGroup: e3, index: t3 }), e3.getFooterGroupProps = f2(a2().getFooterGroupProps, { instance: s2(), headerGroup: e3, index: t3 }), true);
        });
      }, [D3, s2, a2]), s2().footerGroups = [].concat(s2().headerGroups).reverse(), s2().prepareRow = t2.useCallback(function(e3) {
        e3.getRowProps = f2(a2().getRowProps, { instance: s2(), row: e3 }), e3.allCells = T3.map(function(t3) {
          var n4 = e3.values[t3.id], o3 = { column: t3, row: e3, value: n4 };
          return o3.getCellProps = f2(a2().getCellProps, { instance: s2(), cell: o3 }), o3.render = R2(s2(), t3, { row: e3, cell: o3, value: n4 }), o3;
        }), e3.cells = N3.map(function(t3) {
          return e3.allCells.find(function(e4) {
            return e4.column.id === t3.id;
          });
        }), g(a2().prepareRow, e3, { instance: s2() });
      }, [a2, s2, T3, N3]), s2().getTableProps = f2(a2().getTableProps, { instance: s2() }), s2().getTableBodyProps = f2(a2().getTableBodyProps, { instance: s2() }), g(a2().useFinalInstance, s2()), s2();
    }, Object.defineProperty(e, "__esModule", { value: true });
  });
})(reactTable_production_min$1, reactTable_production_min$1.exports);
var reactTable_production_min = /* @__PURE__ */ getDefaultExportFromCjs(reactTable_production_min$1.exports);
if (true) {
  reactTable$1.exports = reactTable_production_min$1.exports;
} else {
  module.exports = require("./dist/react-table.development.js");
}
var reactTable = reactTable$1.exports;
var Menu = "";
var Table = "";
var filterOff = "/static/K2Verify/assets/filter_off.3d9ea484.svg";
var filterOn = "/static/K2Verify/assets/filter_on.6b5cc2ac.svg";
var sortArrow = "/static/K2Verify/assets/sort_arrows.cb2e47ea.svg";
var sortArrowUp = "/static/K2Verify/assets/sort_arrows_up.9ee7f9dd.svg";
var sortArrowDown = "/static/K2Verify/assets/sort_arrows_down.de425f0f.svg";
var playOffIcon = "/static/K2Verify/assets/play-off.68ab7835.svg";
var playIcon = "/static/K2Verify/assets/play.8b700136.svg";
var stopcircleIcon = "/static/K2Verify/assets/stop-circle.6a652e0f.svg";
var stopcircleIconDisabled = "/static/K2Verify/assets/stop-circle-disabled.30c62ec7.svg";
var historyIcon = "/static/K2Verify/assets/history.5f9764ca.svg";
var deleteIcon = "/static/K2Verify/assets/delete-icon.2b6e22b6.svg";
var deleteIconDisabled = "/static/K2Verify/assets/delete-icon-disabled.78d7fa3a.svg";
var infoIcon = "/static/K2Verify/assets/info.ea6a721a.svg";
function useOutsideAlerter(ref, callback, isOn) {
  react.exports.useEffect(() => {
    function handleClickOutside(event) {
      if (!isOn) {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOn, callback]);
}
function MenuActions({
  children,
  handleClose,
  show,
  x: x2,
  y: y2
}) {
  const menuRef = react.exports.useRef(null);
  useOutsideAlerter(menuRef, handleClose, show);
  const menuStyle = {
    display: show ? "block" : "none",
    left: x2,
    position: "absolute",
    top: y2,
    zIndex: 10,
    background: "white"
  };
  return /* @__PURE__ */ jsx("div", {
    ref: menuRef,
    style: menuStyle,
    children
  });
}
function MenuItem({
  item,
  actionClick
}) {
  const t2 = window.k2api.i18n.translate;
  const seperator = item && item.seperator;
  return /* @__PURE__ */ jsx("li", {
    style: {
      borderTop: !seperator ? "" : "1px solid var(--light-border-color)"
    },
    onClick: () => actionClick(item),
    children: t2(item.title)
  });
}
function DefaultColumnFilter({
  column: {
    filterValue,
    preFilteredRows,
    setFilter
  }
}) {
  const count = preFilteredRows.length;
  return /* @__PURE__ */ jsx("input", {
    value: filterValue || "",
    onChange: (e) => setFilter(e.target.value || void 0),
    placeholder: `Search ${count} records...`,
    autoFocus: true
  });
}
function SelectColumnFilter({
  column: {
    preFilteredRows,
    id: id2,
    setFilter,
    filterValue
  }
}) {
  const options = react.exports.useMemo(() => {
    const s = /* @__PURE__ */ new Set();
    preFilteredRows.forEach((row) => s.add(row.values[id2]));
    return Array.from(s);
  }, [preFilteredRows, id2]);
  return /* @__PURE__ */ jsxs("select", {
    value: filterValue || "",
    onChange: (e) => setFilter(e.target.value || void 0),
    children: [/* @__PURE__ */ jsx("option", {
      value: "",
      children: "All"
    }), options.map((o) => /* @__PURE__ */ jsx("option", {
      value: o != null ? o : "",
      children: String(o != null ? o : "")
    }, String(o)))]
  });
}
const HeaderResizer = ({
  column
}) => {
  if (!(column == null ? void 0 : column.getResizerProps) || !(column == null ? void 0 : column.canResize))
    return null;
  const resizerProps = column.getResizerProps();
  return /* @__PURE__ */ jsx("div", {
    ...resizerProps,
    className: `resizer ${column.isResizing ? "isResizing" : ""}`,
    onMouseDown: (e) => {
      e.stopPropagation();
      resizerProps.onMouseDown && resizerProps.onMouseDown(e);
    },
    onTouchStart: (e) => {
      e.stopPropagation();
      resizerProps.onTouchStart && resizerProps.onTouchStart(e);
    }
  });
};
function ReactTable({
  data: data2,
  title,
  loading,
  getActions,
  callback,
  selectedRow,
  columnDef,
  staticWidth,
  pageSizeOptions = [5, 10, 20, 50],
  initialPageSize = 50,
  maxBodyHeight = 800,
  taskParams = false,
  onPlay = () => {
  },
  onStop = () => {
  },
  onHistory = () => {
  },
  onSave = () => {
  },
  onDelete = () => {
  },
  activeTaskIds = /* @__PURE__ */ new Set(),
  infoParams = false,
  onInfoClick = () => {
  },
  columns: userColumns,
  linkRouting = true
}) {
  var _a;
  const navigate = useNavigate();
  const [allData, setAllData] = react.exports.useState([]);
  const [rowMenuOpen, setRowMenuOpen] = react.exports.useState(null);
  const [rowActions, setRowActions] = react.exports.useState([]);
  const [x2, setX] = react.exports.useState(0);
  const [y2, setY] = react.exports.useState(0);
  const [filterColumnsId, setFilterColumnsId] = react.exports.useState({});
  const columnsWidthRef = react.exports.useRef({});
  const computedFitWidthsRef = react.exports.useRef({});
  const containerRef = react.exports.useRef(null);
  const explicitSizeIdsRef = react.exports.useRef(/* @__PURE__ */ new Set());
  const [fitTick, setFitTick] = react.exports.useState(0);
  const isEmpty = !Array.isArray(data2) || data2.length === 0;
  const filterTypes = react.exports.useMemo(() => ({
    text: (rows2, id2, filterValue) => {
      if (filterValue == null || filterValue === "")
        return rows2;
      return rows2.filter((row) => {
        const rowValue = row.values[id2];
        return String(rowValue != null ? rowValue : "").toLowerCase().includes(String(filterValue != null ? filterValue : "").toLowerCase());
      });
    },
    equals: (rows2, id2, filterValue) => {
      if (filterValue == null || filterValue === "")
        return rows2;
      return rows2.filter((row) => {
        const rowValue = row.values[id2];
        return String(rowValue != null ? rowValue : "").toLowerCase() === String(filterValue != null ? filterValue : "").toLowerCase();
      });
    }
  }), []);
  const t2 = (k3) => {
    var _a2, _b;
    if ((_b = (_a2 = window == null ? void 0 : window.k2api) == null ? void 0 : _a2.i18n) == null ? void 0 : _b.translate)
      return window.k2api.i18n.translate(k3);
    if (k3 === "table.loading")
      return "Loading\u2026";
    if (k3 === "table.empty")
      return "No data";
    return k3;
  };
  const isTaskActive = react.exports.useCallback((taskId) => {
    return activeTaskIds.has(taskId);
  }, [activeTaskIds]);
  const columnNames = react.exports.useMemo(() => {
    if (!Array.isArray(data2) || data2.length === 0)
      return [];
    const columns = [];
    const seen = /* @__PURE__ */ new Set();
    for (const row of data2) {
      if (row && typeof row === "object") {
        for (const key of Object.keys(row)) {
          if (key === "taskParams" || key === "actions")
            continue;
          if (!seen.has(key)) {
            seen.add(key);
            columns.push(key);
          }
        }
      }
    }
    return columns;
  }, [data2]);
  const convertDataToTable = react.exports.useCallback((payload) => {
    if (!Array.isArray(payload))
      return [];
    return payload.map((row) => {
      const obj = {
        ...row
      };
      if (getActions) {
        obj["actions"] = /* @__PURE__ */ jsx("div", {
          onClick: (e) => showMenu(e, row),
          className: "k2-context-btn"
        });
      }
      if (taskParams) {
        const taskId = row.task_id;
        const isActive = isTaskActive(taskId);
        const hasStatus = row.task_status !== void 0 && row.task_status !== null;
        const isInactiveStatus = hasStatus && row.task_status.toLowerCase() === "inactive";
        obj["taskParams"] = /* @__PURE__ */ jsxs("div", {
          className: "taskparams-icons",
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "2px 6px"
          },
          children: [!isInactiveStatus && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx("img", {
              src: isActive ? playOffIcon : playIcon,
              alt: isActive ? "Play Off" : "Play",
              title: isActive ? "Task Running" : "Play",
              className: "icons",
              style: {
                cursor: isActive ? "not-allowed" : "pointer",
                opacity: isActive ? 0.5 : 1
              },
              onClick: (e) => {
                if (!isActive) {
                  onPlay(obj, e);
                }
              }
            }), /* @__PURE__ */ jsx("img", {
              src: isActive ? stopcircleIcon : stopcircleIconDisabled,
              alt: "Stop Task",
              title: isActive ? "Stop Task" : "",
              className: "icons",
              style: {
                cursor: isActive ? "pointer" : "not-allowed",
                opacity: isActive ? 1 : 0.4
              },
              onClick: (e) => {
                if (isActive) {
                  onStop(obj, e);
                }
              }
            })]
          }), /* @__PURE__ */ jsx("img", {
            src: historyIcon,
            alt: isActive ? "Monitor" : "History",
            title: isActive ? "Monitor" : "History",
            className: "icons",
            style: {
              cursor: "pointer",
              opacity: 1
            },
            onClick: (e) => {
              e.stopPropagation();
              const taskId2 = row.task_id || obj.task_id;
              if (isActive) {
                navigate(`/execution/${encodeURIComponent(taskId2)}`);
              } else {
                navigate(`/history/${encodeURIComponent(taskId2)}`);
              }
            }
          }), /* @__PURE__ */ jsx("img", {
            src: isActive ? deleteIconDisabled : deleteIcon,
            alt: "Delete",
            title: isActive ? "" : "Delete Task",
            className: "icons",
            style: {
              cursor: isActive ? "not-allowed" : "pointer",
              opacity: isActive ? 0.5 : 1
            },
            onClick: (e) => {
              if (!isActive) {
                onDelete(obj, e);
              }
            }
          })]
        });
      }
      if (infoParams) {
        obj["infoParams"] = /* @__PURE__ */ jsx("div", {
          className: "infoparams-icons",
          style: {
            display: "flex",
            alignItems: "center",
            padding: "2px 6px"
          },
          children: /* @__PURE__ */ jsx("img", {
            src: infoIcon,
            alt: "Info",
            title: "Info",
            className: "icons",
            style: {
              cursor: "pointer",
              transition: "transform 0.2s ease",
              width: "20px",
              height: "20px"
            },
            onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.2)",
            onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)",
            onClick: (e) => {
              e.stopPropagation();
              onInfoClick(obj, e);
            }
          })
        });
      }
      return obj;
    });
  }, [getActions, taskParams, onPlay, onStop, onHistory, onSave, onDelete, isTaskActive, infoParams, onInfoClick]);
  const getRows = react.exports.useMemo(() => allData != null ? allData : [], [allData]);
  const defaultColumn = react.exports.useMemo(() => ({
    Filter: DefaultColumnFilter,
    minWidth: 80,
    width: 300,
    maxWidth: Number.MAX_SAFE_INTEGER
  }), []);
  const hiddenColumns = react.exports.useMemo(() => {
    if (!Array.isArray(userColumns))
      return [];
    return userColumns.filter((c) => {
      var _a2;
      return ((_a2 = c == null ? void 0 : c.meta) == null ? void 0 : _a2.isVisible) === false;
    }).map((c) => c.id || c.accessorKey || c.header).filter(Boolean);
  }, [userColumns]);
  const mappedUserColumns = react.exports.useMemo(() => {
    explicitSizeIdsRef.current = /* @__PURE__ */ new Set();
    if (!Array.isArray(userColumns) || userColumns.length === 0)
      return [];
    return userColumns.map((uc2) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      const id2 = uc2.id || uc2.accessorKey || String(uc2.header || "");
      const accessor = uc2.accessorKey || uc2.accessor || id2;
      const hasExplicitSize = uc2.size != null;
      if (hasExplicitSize)
        explicitSizeIdsRef.current.add(id2);
      const persisted = (_a2 = columnsWidthRef.current) == null ? void 0 : _a2[id2];
      const fitted = (_b = computedFitWidthsRef.current) == null ? void 0 : _b[id2];
      const filterVariant = (_c = uc2.meta) == null ? void 0 : _c.filterVariant;
      const Filter = uc2.enableColumnFilter === false ? () => null : filterVariant === "select" ? SelectColumnFilter : DefaultColumnFilter;
      const userCell = uc2.cell;
      const RoutedCell = (cellProps) => {
        var _a3;
        const value = cellProps.value;
        if (userCell)
          return userCell({
            ...cellProps,
            value
          });
        const to = (_a3 = uc2.meta) == null ? void 0 : _a3.routingLink;
        if (linkRouting && to && value != null) {
          return /* @__PURE__ */ jsx(Link, {
            to: `${to}/${encodeURIComponent(String(value))}`,
            style: {
              color: "#1483F3",
              textDecoration: "none"
            },
            children: String(value)
          });
        }
        return /* @__PURE__ */ jsx("span", {
          children: String(value != null ? value : "")
        });
      };
      const baseWidth = staticWidth ? 380 : hasExplicitSize ? uc2.size : (_d = persisted != null ? persisted : fitted) != null ? _d : 300;
      return {
        id: id2,
        Header: (_e = uc2.header) != null ? _e : id2,
        accessor,
        width: baseWidth,
        minWidth: (_f = uc2.minSize) != null ? _f : hasExplicitSize ? uc2.size : 80,
        maxWidth: (_g = uc2.maxSize) != null ? _g : Number.MAX_SAFE_INTEGER,
        disableResizing: ((_h = uc2.meta) == null ? void 0 : _h.fixed) === true,
        disableFilters: uc2.enableColumnFilter === false,
        disableSortBy: uc2.enableSorting === false,
        Filter,
        Cell: RoutedCell,
        meta: {
          ...uc2.meta || {},
          hasExplicitSize
        }
      };
    });
  }, [userColumns, staticWidth, linkRouting]);
  const getColumns = react.exports.useMemo(() => {
    const cols = [];
    if (getActions) {
      cols.push({
        id: "actions",
        Header: "",
        accessor: "actions",
        width: 40,
        disableResizing: true,
        disableSortBy: true,
        disableFilters: true
      });
    }
    if (taskParams) {
      cols.push({
        id: "taskParams",
        Header: "",
        accessor: "taskParams",
        width: 150,
        minWidth: 140,
        disableResizing: true,
        disableSortBy: true,
        disableFilters: true
      });
    }
    if (infoParams) {
      cols.push({
        id: "infoParams",
        Header: "",
        accessor: "infoParams",
        width: 60,
        minWidth: 50,
        disableResizing: true,
        disableSortBy: true,
        disableFilters: true
      });
    }
    if (mappedUserColumns.length > 0) {
      const updated = mappedUserColumns.map((col) => {
        var _a2, _b, _c;
        const persisted = (_a2 = columnsWidthRef.current) == null ? void 0 : _a2[col.id];
        const fitted = (_b = computedFitWidthsRef.current) == null ? void 0 : _b[col.id];
        const hasExplicit = explicitSizeIdsRef.current.has(col.id);
        return {
          ...col,
          width: staticWidth ? 380 : hasExplicit ? col.width : (_c = persisted != null ? persisted : fitted) != null ? _c : col.width
        };
      });
      cols.push(...updated);
    } else if (columnNames.length > 0) {
      columnNames.forEach((col) => {
        var _a2, _b, _c;
        const persisted = (_a2 = columnsWidthRef.current) == null ? void 0 : _a2[col];
        const fitted = (_b = computedFitWidthsRef.current) == null ? void 0 : _b[col];
        cols.push({
          Header: col,
          accessor: col,
          width: staticWidth ? 380 : (_c = persisted != null ? persisted : fitted) != null ? _c : 300,
          minWidth: 80
        });
      });
    }
    return cols;
  }, [mappedUserColumns, columnNames, getActions, staticWidth, taskParams, infoParams, fitTick]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    pageOptions,
    pageCount,
    prepareRow,
    preFilteredRows,
    state: {
      sortBy,
      globalFilter,
      pageIndex,
      pageSize,
      columnResizing: {
        columnWidths
      }
    },
    setFilter,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    totalColumnsWidth
  } = reactTable$1.exports.useTable({
    columns: getColumns,
    data: getRows,
    defaultColumn,
    filterTypes,
    autoResetPage: false,
    autoResetSortBy: false,
    autoResetFilters: false,
    autoResetGlobalFilter: false,
    autoResetSelectedRows: false,
    autoResetGroupBy: false,
    autoResetExpanded: false,
    autoResetRowState: false,
    manualSortBy: true,
    initialState: {
      pageIndex: 0,
      pageSize: initialPageSize,
      hiddenColumns
    }
  }, reactTable$1.exports.useFilters, reactTable$1.exports.useGlobalFilter, reactTable$1.exports.useSortBy, reactTable$1.exports.useBlockLayout, reactTable$1.exports.useResizeColumns, reactTable$1.exports.usePagination);
  react.exports.useEffect(() => {
    if (JSON.stringify(columnsWidthRef.current) !== JSON.stringify(columnWidths) && columnWidths && Object.keys(columnWidths).length > 0) {
      const prev = columnsWidthRef.current;
      columnsWidthRef.current = {
        ...prev,
        ...columnWidths
      };
    }
  }, [columnWidths]);
  react.exports.useLayoutEffect(() => {
    var _a2, _b;
    if (staticWidth)
      return;
    const wrapper = containerRef.current;
    if (!wrapper)
      return;
    const keys = mappedUserColumns.length > 0 ? mappedUserColumns.map((c) => c.id) : columnNames;
    if (!keys.length)
      return;
    const current = computedFitWidthsRef.current || {};
    const explicitIds = explicitSizeIdsRef.current;
    const keysNeedingFit = keys.filter((k3) => !explicitIds.has(k3));
    const missing = keysNeedingFit.filter((k3) => current[k3] == null);
    if (missing.length === 0)
      return;
    const scrollBarFudge = 2;
    const available = Math.max(0, wrapper.clientWidth - scrollBarFudge);
    const fixedUtility = (getActions ? 40 : 0) + (taskParams ? 150 : 0) + (infoParams ? 60 : 0);
    let explicitTotal = 0;
    if (mappedUserColumns.length > 0) {
      for (const col of mappedUserColumns) {
        if (explicitIds.has(col.id)) {
          explicitTotal += (_b = (_a2 = col.width) != null ? _a2 : col.minWidth) != null ? _b : 0;
        }
      }
    }
    const remaining = Math.max(0, available - fixedUtility - explicitTotal);
    const even = Math.max(80, Math.floor(remaining / Math.max(1, keysNeedingFit.length)));
    const next = {
      ...current
    };
    for (const k3 of missing)
      next[k3] = even;
    const changed = missing.some((k3) => current[k3] !== next[k3]);
    if (!changed)
      return;
    computedFitWidthsRef.current = next;
    setFitTick((t22) => t22 + 1);
  }, [columnNames, mappedUserColumns.length, getActions, taskParams, staticWidth]);
  const showMenu = react.exports.useCallback((e, rowObj) => {
    let actions = [];
    if (getActions)
      actions = getActions(rowObj);
    if (!actions || actions.length === 0)
      return;
    setRowActions(actions);
    setRowMenuOpen(null);
    const innerHeight = window.innerHeight;
    const menuHeight = (actions.length + 1) * 30;
    setY(e.clientY + menuHeight > innerHeight ? e.clientY - menuHeight - 10 : e.clientY);
    setX(e.clientX);
    setRowMenuOpen(rowObj);
  }, [getActions]);
  const hideMenu = () => setRowMenuOpen(null);
  const actionClick = (action) => {
    action.callback(rowMenuOpen);
    setRowMenuOpen(null);
  };
  const mapActionsToElements = () => /* @__PURE__ */ jsx(MenuActions, {
    show: rowMenuOpen,
    handleClose: hideMenu,
    x: x2,
    y: y2,
    children: /* @__PURE__ */ jsx("ul", {
      className: "k2-context-menu",
      children: rowActions.map((action, idx) => /* @__PURE__ */ jsx(MenuItem, {
        item: action,
        actionClick
      }, idx))
    })
  });
  react.exports.useEffect(() => {
    const converted = convertDataToTable(data2);
    setAllData(converted);
  }, [convertDataToTable, data2]);
  const handleClickOnTD = (e, column, value, idx) => {
    if (!callback)
      return;
    callback(e, column, value, idx);
  };
  const getTDClassName = (row, aKey) => {
    var _a2;
    let classNames = "";
    if (columnDef && columnDef[aKey] && columnDef[aKey].cellBorder && selectedRow === row[aKey]) {
      classNames = columnDef[aKey].cellBorder;
    }
    if (columnDef && columnDef[aKey] && columnDef[aKey].cellColoring) {
      const key = typeof row[aKey] === "string" ? row[aKey].toLowerCase() : String((_a2 = row[aKey]) != null ? _a2 : "").toLowerCase();
      if (columnDef[aKey].cellColoring[key]) {
        classNames += columnDef[aKey].cellColoring[key];
      } else {
        classNames += "failed";
      }
    }
    return classNames;
  };
  const handleFilterClick = react.exports.useCallback((column) => {
    const next = {
      ...filterColumnsId
    };
    if (next[column.id]) {
      delete next[column.id];
      setFilterColumnsId(next);
      setFilter(column.id, void 0);
    } else {
      next[column.id] = column.id;
      setFilterColumnsId(next);
    }
  }, [filterColumnsId, setFilter]);
  const getSortIcon = react.exports.useCallback((column) => {
    return /* @__PURE__ */ jsx("span", {
      ...column.getSortByToggleProps(),
      children: column.isSorted ? column.isSortedDesc ? /* @__PURE__ */ jsx("img", {
        src: sortArrowUp,
        className: "icons",
        alt: "Arrow Up"
      }) : /* @__PURE__ */ jsx("img", {
        src: sortArrowDown,
        className: "icons",
        alt: "Arrow Down"
      }) : /* @__PURE__ */ jsx("img", {
        src: sortArrow,
        className: "icons",
        alt: "Arrow"
      })
    });
  }, []);
  const getFilterIcon = react.exports.useCallback((column) => /* @__PURE__ */ jsx("img", {
    alt: filterColumnsId[column.id] ? "Filter On" : "Filter Off",
    className: "icons",
    src: filterColumnsId[column.id] ? filterOn : filterOff,
    onClick: () => handleFilterClick(column),
    style: {
      cursor: "pointer"
    }
  }), [filterColumnsId, handleFilterClick]);
  const getProgressBar = react.exports.useCallback((row, cell) => {
    return /* @__PURE__ */ jsxs("div", {
      className: "completion",
      children: [/* @__PURE__ */ jsx("div", {
        className: "progress-bar",
        children: /* @__PURE__ */ jsx("div", {
          className: "progress",
          style: {
            width: `${row.original[cell.column.Header]}%`
          }
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "progress-percentage",
        children: [cell.render("Cell"), "%"]
      })]
    });
  }, []);
  const getCellData = react.exports.useCallback((row, cell) => {
    var _a2, _b;
    const header = cell.column.Header;
    if (cell.column.id === "taskParams" || cell.column.id === "infoParams") {
      return cell.value;
    }
    if (columnDef && ((_a2 = columnDef[header]) == null ? void 0 : _a2.progress)) {
      return getProgressBar(row, cell);
    }
    if (columnDef && ((_b = columnDef[header]) == null ? void 0 : _b.progress) === false) {
      return /* @__PURE__ */ jsxs("span", {
        children: [cell.render("Cell"), "%"]
      });
    }
    if (row.original.highlight) {
      return /* @__PURE__ */ jsx("span", {
        style: {
          fontWeight: "bold"
        },
        children: cell.render("Cell")
      });
    }
    if (typeof cell.value === "boolean") {
      return /* @__PURE__ */ jsx("span", {
        children: `${cell.value}`
      });
    }
    if (typeof cell.value === "object" && header !== "") {
      const v2 = JSON.stringify(cell.value).split('"').join("");
      return /* @__PURE__ */ jsx("span", {
        children: v2
      });
    }
    return /* @__PURE__ */ jsx("span", {
      children: cell.render("Cell")
    });
  }, [columnDef, getProgressBar]);
  const handleSort = react.exports.useCallback((sortByArr) => {
    const prevAllData = convertDataToTable(data2);
    if (prevAllData && sortByArr && sortByArr.length > 0) {
      const sortedData = prevAllData.sort((a, b) => {
        const id2 = sortByArr[0]["id"];
        const desc = sortByArr[0]["desc"];
        const av = a[id2];
        const bv = b[id2];
        const cmp = (x22, y22) => (x22 == null) - (y22 == null) || (x22 > y22) - (x22 < y22);
        return desc ? cmp(bv, av) : cmp(av, bv);
      });
      setAllData([...sortedData]);
    } else if (prevAllData && sortByArr && sortByArr.length === 0) {
      setAllData(prevAllData);
    }
  }, [convertDataToTable, data2]);
  const cancelSorting = react.exports.useCallback((column) => {
    const prevAllData = convertDataToTable(data2);
    setAllData(prevAllData);
    column.clearSortBy();
  }, [convertDataToTable, data2]);
  react.exports.useEffect(() => {
    handleSort(sortBy);
  }, [handleSort, sortBy]);
  const hasBackendError = getRows && getRows.length > 0 && ((_a = getRows[0]) == null ? void 0 : _a.error) && typeof getRows[0].error === "string";
  const totalFilteredEntries = rows.length;
  return /* @__PURE__ */ jsxs("div", {
    className: "table-container",
    children: [rowActions && rowActions.length > 0 ? mapActionsToElements() : null, title ? /* @__PURE__ */ jsx("h3", {
      children: title
    }) : null, isEmpty && !loading ? /* @__PURE__ */ jsx("h3", {
      children: "No tasks run yet"
    }) : /* @__PURE__ */ jsxs(react.exports.Fragment, {
      children: [/* @__PURE__ */ jsxs("div", {
        className: "hybrid-toolbar",
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: "6px 0",
          flexWrap: "wrap"
        },
        children: [/* @__PURE__ */ jsxs("div", {
          children: ["Show", " ", /* @__PURE__ */ jsx("select", {
            value: pageSize,
            onChange: (e) => {
              setPageSize(Number(e.target.value));
              gotoPage(0);
            },
            children: pageSizeOptions.map((ps) => /* @__PURE__ */ jsx("option", {
              value: ps,
              children: ps
            }, ps))
          }), " ", "entries"]
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsxs("span", {
            children: ["Search:", " ", /* @__PURE__ */ jsx("input", {
              type: "text",
              value: globalFilter || "",
              onChange: (e) => setGlobalFilter(e.target.value),
              placeholder: "Search all columns\u2026"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsxs("span", {
            children: ["Showing ", /* @__PURE__ */ jsx("strong", {
              children: pageIndex + 1
            }), " of", " ", /* @__PURE__ */ jsx("strong", {
              children: pageOptions.length || 1
            }), " pages for", " ", /* @__PURE__ */ jsx("strong", {
              children: totalFilteredEntries
            }), " entries"]
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        ref: containerRef,
        style: {
          overflowY: "auto",
          maxHeight: `${maxBodyHeight}px`
        },
        children: /* @__PURE__ */ jsxs("table", {
          className: "k2-table k2-refresh-fadeIn",
          ...getTableProps(),
          style: {
            width: "100%",
            borderCollapse: "separate",
            tableLayout: "fixed"
          },
          children: [headerGroups.length > 0 ? /* @__PURE__ */ jsx("colgroup", {
            children: headerGroups[0].headers.map((column) => {
              var _a2, _b, _c, _d, _e;
              const headerProps = column.getHeaderProps();
              const colWidth = (_e = (_d = (_c = (_b = (_a2 = headerProps.style) == null ? void 0 : _a2.width) != null ? _b : column.totalWidth) != null ? _c : column.width) != null ? _d : column.minWidth) != null ? _e : 120;
              return /* @__PURE__ */ jsx("col", {
                style: {
                  width: colWidth
                }
              }, column.id);
            })
          }) : null, /* @__PURE__ */ jsx("thead", {
            style: {
              position: "sticky",
              top: 0,
              zIndex: 1,
              background: "white"
            },
            children: headerGroups.map((headerGroup) => {
              const hgProps = headerGroup.getHeaderGroupProps();
              return /* @__PURE__ */ react.exports.createElement("tr", {
                ...hgProps,
                key: hgProps.key
              }, headerGroup.headers.map((column) => {
                const headerProps = column.getHeaderProps();
                return /* @__PURE__ */ react.exports.createElement("th", {
                  ...headerProps,
                  key: headerProps.key,
                  style: {
                    ...headerProps.style,
                    boxSizing: "border-box",
                    padding: "8px"
                  }
                }, /* @__PURE__ */ jsxs("div", {
                  className: "header-cell",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 4,
                    width: "100%"
                  },
                  children: [/* @__PURE__ */ jsx("span", {
                    onDoubleClick: () => cancelSorting(column),
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      flex: 1,
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    children: column.render("Header")
                  }), (column == null ? void 0 : column.id) !== "actions" && (column == null ? void 0 : column.id) !== "taskParams" ? /* @__PURE__ */ jsxs("span", {
                    className: "icons-wrapper",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      flexShrink: 0
                    },
                    children: [!column.disableFilters && getFilterIcon(column), getSortIcon(column)]
                  }) : null, /* @__PURE__ */ jsx(HeaderResizer, {
                    column
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  style: {
                    marginTop: 6
                  },
                  children: (column == null ? void 0 : column.id) !== "actions" && (column == null ? void 0 : column.id) !== "taskParams" && !column.disableFilters && filterColumnsId[column.id] ? column.render("Filter") : null
                }));
              }));
            })
          }), /* @__PURE__ */ jsxs("tbody", {
            ...getTableBodyProps(),
            children: [hasBackendError && /* @__PURE__ */ jsx("tr", {
              children: /* @__PURE__ */ jsx("td", {
                colSpan: columnNames.length || 1,
                style: {
                  color: "red",
                  padding: 8
                },
                children: getRows[0].error
              })
            }), page.length > 0 ? page.map((row) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return /* @__PURE__ */ react.exports.createElement("tr", {
                ...rowProps,
                key: rowProps.key
              }, row.cells.map((cell) => {
                const cellProps = cell.getCellProps();
                const headerLabel = cell.column.Header;
                return /* @__PURE__ */ react.exports.createElement("td", {
                  ...cellProps,
                  key: cellProps.key,
                  title: cell.column.id === "taskParams" || cell.column.id === "actions" || cell.column.id === "infoParams" ? void 0 : typeof row.original[headerLabel] === "string" || typeof row.original[headerLabel] === "number" ? row.original[headerLabel] : void 0,
                  className: `${getTDClassName(row.original, headerLabel)} cell`,
                  onClick: cell.column.id === "taskParams" || cell.column.id === "actions" || cell.column.id === "infoParams" ? void 0 : (e) => handleClickOnTD(e, headerLabel, row.original[headerLabel], row.index),
                  style: {
                    ...cellProps.style,
                    cursor: callback ? "pointer" : "auto",
                    boxSizing: "border-box",
                    padding: "8px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }
                }, getCellData(row, cell));
              }));
            }) : /* @__PURE__ */ jsx("tr", {
              children: /* @__PURE__ */ jsx("td", {
                colSpan: columnNames.length || 1,
                style: {
                  textAlign: "center",
                  padding: 12
                },
                children: (preFilteredRows == null ? void 0 : preFilteredRows.length) ? "There are no rows that match your criteria" : ""
              })
            })]
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        style: {
          display: "flex",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "table-buttons",
          style: {
            marginTop: 10
          },
          children: [/* @__PURE__ */ jsx("button", {
            onClick: () => gotoPage(0),
            disabled: !canPreviousPage,
            children: "First Page"
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => previousPage(),
            disabled: !canPreviousPage,
            children: "Previous"
          }), /* @__PURE__ */ jsx("span", {
            style: {
              padding: 10
            },
            children: pageIndex + 1
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => nextPage(),
            disabled: !canNextPage,
            children: "Next"
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => gotoPage(pageCount - 1),
            disabled: !canNextPage,
            children: "Last"
          })]
        })
      })]
    })]
  });
}
var taskdef = "";
function r(e) {
  var t2, f2, n2 = "";
  if ("string" == typeof e || "number" == typeof e)
    n2 += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t2 = 0; t2 < e.length; t2++)
        e[t2] && (f2 = r(e[t2])) && (n2 && (n2 += " "), n2 += f2);
    else
      for (t2 in e)
        e[t2] && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function clsx() {
  for (var e, t2, f2 = 0, n2 = ""; f2 < arguments.length; )
    (e = arguments[f2++]) && (t2 = r(e)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function isNum(v2) {
  return typeof v2 === "number" && !isNaN(v2);
}
function isBool(v2) {
  return typeof v2 === "boolean";
}
function isStr(v2) {
  return typeof v2 === "string";
}
function isFn(v2) {
  return typeof v2 === "function";
}
function parseClassName(v2) {
  return isStr(v2) || isFn(v2) ? v2 : null;
}
function isToastIdValid(toastId) {
  return toastId === 0 || toastId;
}
function getAutoCloseDelay(toastAutoClose, containerAutoClose) {
  return toastAutoClose === false || isNum(toastAutoClose) && toastAutoClose > 0 ? toastAutoClose : containerAutoClose;
}
var canUseDom = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function canBeRendered(content) {
  return react.exports.isValidElement(content) || isStr(content) || isFn(content) || isNum(content);
}
var POSITION = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center"
};
var TYPE = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  DEFAULT: "default",
  DARK: "dark"
};
function collapseToast(node, done, duration) {
  if (duration === void 0) {
    duration = 300;
  }
  var height = node.scrollHeight;
  var style = node.style;
  requestAnimationFrame(function() {
    style.minHeight = "initial";
    style.height = height + "px";
    style.transition = "all " + duration + "ms";
    requestAnimationFrame(function() {
      style.height = "0";
      style.padding = "0";
      style.margin = "0";
      setTimeout(done, duration);
    });
  });
}
function cssTransition(_ref) {
  var enter = _ref.enter, exit = _ref.exit, _ref$appendPosition = _ref.appendPosition, appendPosition = _ref$appendPosition === void 0 ? false : _ref$appendPosition, _ref$collapse = _ref.collapse, collapse = _ref$collapse === void 0 ? true : _ref$collapse, _ref$collapseDuration = _ref.collapseDuration, collapseDuration = _ref$collapseDuration === void 0 ? 300 : _ref$collapseDuration;
  return function ToastTransition(_ref2) {
    var children = _ref2.children, position = _ref2.position, preventExitTransition = _ref2.preventExitTransition, done = _ref2.done, nodeRef = _ref2.nodeRef, isIn = _ref2.isIn;
    var enterClassName = appendPosition ? enter + "--" + position : enter;
    var exitClassName = appendPosition ? exit + "--" + position : exit;
    var baseClassName = react.exports.useRef();
    var animationStep = react.exports.useRef(
      0
    );
    react.exports.useLayoutEffect(function() {
      onEnter();
    }, []);
    react.exports.useEffect(function() {
      if (!isIn)
        preventExitTransition ? onExited() : onExit();
    }, [isIn]);
    function onEnter() {
      var node = nodeRef.current;
      baseClassName.current = node.className;
      node.className += " " + enterClassName;
      node.addEventListener("animationend", onEntered);
    }
    function onEntered() {
      var node = nodeRef.current;
      node.removeEventListener("animationend", onEntered);
      if (animationStep.current === 0) {
        node.className = baseClassName.current;
      }
    }
    function onExit() {
      animationStep.current = 1;
      var node = nodeRef.current;
      node.className += " " + exitClassName;
      node.addEventListener("animationend", onExited);
    }
    function onExited() {
      var node = nodeRef.current;
      node.removeEventListener("animationend", onExited);
      collapse ? collapseToast(node, done, collapseDuration) : done();
    }
    return /* @__PURE__ */ jsx(Fragment, {
      children
    });
  };
}
var eventManager = {
  list: /* @__PURE__ */ new Map(),
  emitQueue: /* @__PURE__ */ new Map(),
  on: function on(event, callback) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event).push(callback);
    return this;
  },
  off: function off(event, callback) {
    if (callback) {
      var cb2 = this.list.get(event).filter(function(cb3) {
        return cb3 !== callback;
      });
      this.list.set(event, cb2);
      return this;
    }
    this.list["delete"](event);
    return this;
  },
  cancelEmit: function cancelEmit(event) {
    var timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(clearTimeout);
      this.emitQueue["delete"](event);
    }
    return this;
  },
  emit: function emit(event) {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    this.list.has(event) && this.list.get(event).forEach(function(callback) {
      var timer = setTimeout(function() {
        callback.apply(void 0, args);
      }, 0);
      _this.emitQueue.has(event) || _this.emitQueue.set(event, []);
      _this.emitQueue.get(event).push(timer);
    });
  }
};
function useKeeper(arg, refresh) {
  if (refresh === void 0) {
    refresh = false;
  }
  var ref = react.exports.useRef(arg);
  react.exports.useEffect(function() {
    if (refresh)
      ref.current = arg;
  });
  return ref.current;
}
function reducer(state, action) {
  switch (action.type) {
    case 0:
      return [].concat(state, [action.toastId]).filter(function(id2) {
        return id2 !== action.staleId;
      });
    case 1:
      return isToastIdValid(action.toastId) ? state.filter(function(id2) {
        return id2 !== action.toastId;
      }) : [];
  }
}
function useToastContainer(props) {
  var _useReducer = react.exports.useReducer(function(x2) {
    return x2 + 1;
  }, 0), forceUpdate = _useReducer[1];
  var _useReducer2 = react.exports.useReducer(reducer, []), toast3 = _useReducer2[0], dispatch = _useReducer2[1];
  var containerRef = react.exports.useRef(null);
  var toastCount = useKeeper(0);
  var queue2 = useKeeper([]);
  var collection = useKeeper({});
  var instance = useKeeper({
    toastKey: 1,
    displayedToast: 0,
    props,
    containerId: null,
    isToastActive,
    getToast: function getToast2(id2) {
      return collection[id2] || null;
    }
  });
  react.exports.useEffect(function() {
    instance.containerId = props.containerId;
    eventManager.cancelEmit(
      3
    ).on(
      0,
      buildToast
    ).on(
      1,
      function(toastId) {
        return containerRef.current && removeToast(toastId);
      }
    ).on(
      5,
      clearWaitingQueue
    ).emit(
      2,
      instance
    );
    return function() {
      return eventManager.emit(
        3,
        instance
      );
    };
  }, []);
  react.exports.useEffect(function() {
    instance.isToastActive = isToastActive;
    instance.displayedToast = toast3.length;
    eventManager.emit(
      4,
      toast3.length,
      props.containerId
    );
  }, [toast3]);
  react.exports.useEffect(function() {
    instance.props = props;
  });
  function isToastActive(id2) {
    return toast3.indexOf(id2) !== -1;
  }
  function clearWaitingQueue(_ref) {
    var containerId = _ref.containerId;
    var limit = instance.props.limit;
    if (limit && (!containerId || instance.containerId === containerId)) {
      toastCount -= queue2.length;
      queue2 = [];
    }
  }
  function removeToast(toastId) {
    dispatch({
      type: 1,
      toastId
    });
  }
  function dequeueToast() {
    var _queue$shift = queue2.shift(), toastContent = _queue$shift.toastContent, toastProps = _queue$shift.toastProps, staleId = _queue$shift.staleId;
    appendToast(toastContent, toastProps, staleId);
  }
  function isNotValid(_ref2) {
    var containerId = _ref2.containerId, toastId = _ref2.toastId, updateId = _ref2.updateId;
    return !containerRef.current || instance.props.enableMultiContainer && containerId !== instance.props.containerId || collection[toastId] && updateId == null ? true : false;
  }
  function buildToast(content, _ref3) {
    var delay = _ref3.delay, staleId = _ref3.staleId, options = _objectWithoutPropertiesLoose(_ref3, ["delay", "staleId"]);
    if (!canBeRendered(content) || isNotValid(options))
      return;
    var toastId = options.toastId, updateId = options.updateId;
    var props2 = instance.props;
    var closeToast = function closeToast2() {
      return removeToast(toastId);
    };
    var isNotAnUpdate = options.updateId == null;
    if (isNotAnUpdate)
      toastCount++;
    var toastProps = {
      toastId,
      updateId,
      isIn: false,
      key: options.key || instance.toastKey++,
      type: options.type,
      closeToast,
      closeButton: options.closeButton,
      rtl: props2.rtl,
      position: options.position || props2.position,
      transition: options.transition || props2.transition,
      className: parseClassName(options.className || props2.toastClassName),
      bodyClassName: parseClassName(options.bodyClassName || props2.bodyClassName),
      style: options.style || props2.toastStyle,
      bodyStyle: options.bodyStyle || props2.bodyStyle,
      onClick: options.onClick || props2.onClick,
      pauseOnHover: isBool(options.pauseOnHover) ? options.pauseOnHover : props2.pauseOnHover,
      pauseOnFocusLoss: isBool(options.pauseOnFocusLoss) ? options.pauseOnFocusLoss : props2.pauseOnFocusLoss,
      draggable: isBool(options.draggable) ? options.draggable : props2.draggable,
      draggablePercent: isNum(options.draggablePercent) ? options.draggablePercent : props2.draggablePercent,
      draggableDirection: options.draggableDirection || props2.draggableDirection,
      closeOnClick: isBool(options.closeOnClick) ? options.closeOnClick : props2.closeOnClick,
      progressClassName: parseClassName(options.progressClassName || props2.progressClassName),
      progressStyle: options.progressStyle || props2.progressStyle,
      autoClose: getAutoCloseDelay(options.autoClose, props2.autoClose),
      hideProgressBar: isBool(options.hideProgressBar) ? options.hideProgressBar : props2.hideProgressBar,
      progress: options.progress,
      role: isStr(options.role) ? options.role : props2.role,
      deleteToast: function deleteToast() {
        removeFromCollection(toastId);
      }
    };
    if (isFn(options.onOpen))
      toastProps.onOpen = options.onOpen;
    if (isFn(options.onClose))
      toastProps.onClose = options.onClose;
    if (toastProps.draggableDirection === "y" && toastProps.draggablePercent === 80) {
      toastProps.draggablePercent *= 1.5;
    }
    var closeButton = props2.closeButton;
    if (options.closeButton === false || canBeRendered(options.closeButton)) {
      closeButton = options.closeButton;
    } else if (options.closeButton === true) {
      closeButton = canBeRendered(props2.closeButton) ? props2.closeButton : true;
    }
    toastProps.closeButton = closeButton;
    var toastContent = content;
    if (react.exports.isValidElement(content) && !isStr(content.type)) {
      toastContent = react.exports.cloneElement(content, {
        closeToast,
        toastProps
      });
    } else if (isFn(content)) {
      toastContent = content({
        closeToast,
        toastProps
      });
    }
    if (props2.limit && props2.limit > 0 && toastCount > props2.limit && isNotAnUpdate) {
      queue2.push({
        toastContent,
        toastProps,
        staleId
      });
    } else if (isNum(delay) && delay > 0) {
      setTimeout(function() {
        appendToast(toastContent, toastProps, staleId);
      }, delay);
    } else {
      appendToast(toastContent, toastProps, staleId);
    }
  }
  function appendToast(content, toastProps, staleId) {
    var toastId = toastProps.toastId;
    if (staleId)
      delete collection[staleId];
    collection[toastId] = {
      content,
      props: toastProps
    };
    dispatch({
      type: 0,
      toastId,
      staleId
    });
  }
  function removeFromCollection(toastId) {
    delete collection[toastId];
    var queueLen = queue2.length;
    toastCount = isToastIdValid(toastId) ? toastCount - 1 : toastCount - instance.displayedToast;
    if (toastCount < 0)
      toastCount = 0;
    if (queueLen > 0) {
      var freeSlot = isToastIdValid(toastId) ? 1 : instance.props.limit;
      if (queueLen === 1 || freeSlot === 1) {
        instance.displayedToast++;
        dequeueToast();
      } else {
        var toDequeue = freeSlot > queueLen ? queueLen : freeSlot;
        instance.displayedToast = toDequeue;
        for (var i2 = 0; i2 < toDequeue; i2++) {
          dequeueToast();
        }
      }
    } else {
      forceUpdate();
    }
  }
  function getToastToRender(cb2) {
    var toastToRender = {};
    var toastList = props.newestOnTop ? Object.keys(collection).reverse() : Object.keys(collection);
    for (var i2 = 0; i2 < toastList.length; i2++) {
      var _toast = collection[toastList[i2]];
      var position = _toast.props.position;
      toastToRender[position] || (toastToRender[position] = []);
      toastToRender[position].push(_toast);
    }
    return Object.keys(toastToRender).map(function(p2) {
      return cb2(p2, toastToRender[p2]);
    });
  }
  return {
    getToastToRender,
    collection,
    containerRef,
    isToastActive
  };
}
function getX(e) {
  return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientX : e.clientX;
}
function getY(e) {
  return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientY : e.clientY;
}
function useToast(props) {
  var _useState = react.exports.useState(true), isRunning = _useState[0], setIsRunning = _useState[1];
  var _useState2 = react.exports.useState(false), preventExitTransition = _useState2[0], setPreventExitTransition = _useState2[1];
  var toastRef = react.exports.useRef(null);
  var drag = useKeeper({
    start: 0,
    x: 0,
    y: 0,
    delta: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    boundingRect: null
  });
  var syncProps = useKeeper(props, true);
  var autoClose = props.autoClose, pauseOnHover = props.pauseOnHover, closeToast = props.closeToast, onClick = props.onClick, closeOnClick = props.closeOnClick;
  react.exports.useEffect(function() {
    if (isFn(props.onOpen))
      props.onOpen(react.exports.isValidElement(props.children) && props.children.props);
    return function() {
      if (isFn(syncProps.onClose))
        syncProps.onClose(react.exports.isValidElement(syncProps.children) && syncProps.children.props);
    };
  }, []);
  react.exports.useEffect(function() {
    props.draggable && bindDragEvents();
    return function() {
      props.draggable && unbindDragEvents();
    };
  }, [props.draggable]);
  react.exports.useEffect(function() {
    props.pauseOnFocusLoss && bindFocusEvents();
    return function() {
      props.pauseOnFocusLoss && unbindFocusEvents();
    };
  }, [props.pauseOnFocusLoss]);
  function onDragStart(e) {
    if (props.draggable) {
      var toast3 = toastRef.current;
      drag.canCloseOnClick = true;
      drag.canDrag = true;
      drag.boundingRect = toast3.getBoundingClientRect();
      toast3.style.transition = "";
      drag.x = getX(e.nativeEvent);
      drag.y = getY(e.nativeEvent);
      if (props.draggableDirection === "x") {
        drag.start = drag.x;
        drag.removalDistance = toast3.offsetWidth * (props.draggablePercent / 100);
      } else {
        drag.start = drag.y;
        drag.removalDistance = toast3.offsetHeight * (props.draggablePercent / 100);
      }
    }
  }
  function onDragTransitionEnd() {
    if (drag.boundingRect) {
      var _drag$boundingRect = drag.boundingRect, top = _drag$boundingRect.top, bottom = _drag$boundingRect.bottom, left = _drag$boundingRect.left, right = _drag$boundingRect.right;
      if (props.pauseOnHover && drag.x >= left && drag.x <= right && drag.y >= top && drag.y <= bottom) {
        pauseToast();
      } else {
        playToast();
      }
    }
  }
  function playToast() {
    setIsRunning(true);
  }
  function pauseToast() {
    setIsRunning(false);
  }
  function bindFocusEvents() {
    if (!document.hasFocus())
      pauseToast();
    window.addEventListener("focus", playToast);
    window.addEventListener("blur", pauseToast);
  }
  function unbindFocusEvents() {
    window.removeEventListener("focus", playToast);
    window.removeEventListener("blur", pauseToast);
  }
  function bindDragEvents() {
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragEnd);
  }
  function unbindDragEvents() {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);
  }
  function onDragMove(e) {
    if (drag.canDrag) {
      e.preventDefault();
      var toast3 = toastRef.current;
      if (isRunning)
        pauseToast();
      drag.x = getX(e);
      drag.y = getY(e);
      if (props.draggableDirection === "x") {
        drag.delta = drag.x - drag.start;
      } else {
        drag.delta = drag.y - drag.start;
      }
      if (drag.start !== drag.x)
        drag.canCloseOnClick = false;
      toast3.style.transform = "translate" + props.draggableDirection + "(" + drag.delta + "px)";
      toast3.style.opacity = "" + (1 - Math.abs(drag.delta / drag.removalDistance));
    }
  }
  function onDragEnd() {
    var toast3 = toastRef.current;
    if (drag.canDrag) {
      drag.canDrag = false;
      if (Math.abs(drag.delta) > drag.removalDistance) {
        setPreventExitTransition(true);
        props.closeToast();
        return;
      }
      toast3.style.transition = "transform 0.2s, opacity 0.2s";
      toast3.style.transform = "translate" + props.draggableDirection + "(0)";
      toast3.style.opacity = "1";
    }
  }
  var eventHandlers = {
    onMouseDown: onDragStart,
    onTouchStart: onDragStart,
    onMouseUp: onDragTransitionEnd,
    onTouchEnd: onDragTransitionEnd
  };
  if (autoClose && pauseOnHover) {
    eventHandlers.onMouseEnter = pauseToast;
    eventHandlers.onMouseLeave = playToast;
  }
  if (closeOnClick) {
    eventHandlers.onClick = function(e) {
      onClick && onClick(e);
      drag.canCloseOnClick && closeToast();
    };
  }
  return {
    playToast,
    pauseToast,
    isRunning,
    preventExitTransition,
    toastRef,
    eventHandlers
  };
}
function CloseButton(_ref) {
  var closeToast = _ref.closeToast, type = _ref.type, _ref$ariaLabel = _ref.ariaLabel, ariaLabel = _ref$ariaLabel === void 0 ? "close" : _ref$ariaLabel;
  return react.exports.createElement("button", {
    className: "Toastify__close-button Toastify__close-button--" + type,
    type: "button",
    onClick: function onClick(e) {
      e.stopPropagation();
      closeToast(e);
    },
    "aria-label": ariaLabel
  }, react.exports.createElement("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 14 16"
  }, react.exports.createElement("path", {
    fillRule: "evenodd",
    d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
  })));
}
function ProgressBar(_ref) {
  var _cx, _animationEvent;
  var delay = _ref.delay, isRunning = _ref.isRunning, closeToast = _ref.closeToast, type = _ref.type, hide = _ref.hide, className = _ref.className, userStyle = _ref.style, controlledProgress = _ref.controlledProgress, progress = _ref.progress, rtl = _ref.rtl, isIn = _ref.isIn;
  var style = _extends({}, userStyle, {
    animationDuration: delay + "ms",
    animationPlayState: isRunning ? "running" : "paused",
    opacity: hide ? 0 : 1
  });
  if (controlledProgress)
    style.transform = "scaleX(" + progress + ")";
  var defaultClassName = clsx("Toastify__progress-bar", controlledProgress ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", "Toastify__progress-bar--" + type, (_cx = {}, _cx["Toastify__progress-bar--rtl"] = rtl, _cx));
  var classNames = isFn(className) ? className({
    rtl,
    type,
    defaultClassName
  }) : clsx(defaultClassName, className);
  var animationEvent = (_animationEvent = {}, _animationEvent[controlledProgress && progress >= 1 ? "onTransitionEnd" : "onAnimationEnd"] = controlledProgress && progress < 1 ? null : function() {
    isIn && closeToast();
  }, _animationEvent);
  return react.exports.createElement("div", Object.assign({
    role: "progressbar",
    "aria-hidden": hide ? "true" : "false",
    "aria-label": "notification timer",
    className: classNames,
    style
  }, animationEvent));
}
ProgressBar.defaultProps = {
  type: TYPE.DEFAULT,
  hide: false
};
var Toast = function Toast2(props) {
  var _cx;
  var _useToast = useToast(props), isRunning = _useToast.isRunning, preventExitTransition = _useToast.preventExitTransition, toastRef = _useToast.toastRef, eventHandlers = _useToast.eventHandlers;
  var closeButton = props.closeButton, children = props.children, autoClose = props.autoClose, onClick = props.onClick, type = props.type, hideProgressBar = props.hideProgressBar, closeToast = props.closeToast, Transition = props.transition, position = props.position, className = props.className, style = props.style, bodyClassName = props.bodyClassName, bodyStyle = props.bodyStyle, progressClassName = props.progressClassName, progressStyle = props.progressStyle, updateId = props.updateId, role = props.role, progress = props.progress, rtl = props.rtl, toastId = props.toastId, deleteToast = props.deleteToast, isIn = props.isIn;
  var defaultClassName = clsx("Toastify__toast", "Toastify__toast--" + type, (_cx = {}, _cx["Toastify__toast--rtl"] = rtl, _cx));
  var cssClasses = isFn(className) ? className({
    rtl,
    position,
    type,
    defaultClassName
  }) : clsx(defaultClassName, className);
  var isProgressControlled = !!progress;
  function renderCloseButton(closeButton2) {
    if (!closeButton2)
      return;
    var props2 = {
      closeToast,
      type
    };
    if (isFn(closeButton2))
      return closeButton2(props2);
    if (react.exports.isValidElement(closeButton2))
      return react.exports.cloneElement(closeButton2, props2);
  }
  return react.exports.createElement(Transition, {
    isIn,
    done: deleteToast,
    position,
    preventExitTransition,
    nodeRef: toastRef
  }, react.exports.createElement("div", Object.assign({
    id: toastId,
    onClick,
    className: cssClasses
  }, eventHandlers, {
    style,
    ref: toastRef
  }), react.exports.createElement("div", Object.assign({}, isIn && {
    role
  }, {
    className: isFn(bodyClassName) ? bodyClassName({
      type
    }) : clsx("Toastify__toast-body", bodyClassName),
    style: bodyStyle
  }), children), renderCloseButton(closeButton), (autoClose || isProgressControlled) && react.exports.createElement(ProgressBar, Object.assign({}, updateId && !isProgressControlled ? {
    key: "pb-" + updateId
  } : {}, {
    rtl,
    delay: autoClose,
    isRunning,
    isIn,
    closeToast,
    hide: hideProgressBar,
    type,
    style: progressStyle,
    className: progressClassName,
    controlledProgress: isProgressControlled,
    progress
  }))));
};
var Bounce = /* @__PURE__ */ cssTransition({
  enter: "Toastify--animate Toastify__bounce-enter",
  exit: "Toastify--animate Toastify__bounce-exit",
  appendPosition: true
});
var Slide = /* @__PURE__ */ cssTransition({
  enter: "Toastify--animate Toastify__slide-enter",
  exit: "Toastify--animate Toastify__slide-exit",
  appendPosition: true
});
var Zoom = /* @__PURE__ */ cssTransition({
  enter: "Toastify--animate Toastify__zoom-enter",
  exit: "Toastify--animate Toastify__zoom-exit"
});
var Flip = /* @__PURE__ */ cssTransition({
  enter: "Toastify--animate Toastify__flip-enter",
  exit: "Toastify--animate Toastify__flip-exit"
});
var ToastContainer = function ToastContainer2(props) {
  var _useToastContainer = useToastContainer(props), getToastToRender = _useToastContainer.getToastToRender, containerRef = _useToastContainer.containerRef, isToastActive = _useToastContainer.isToastActive;
  var className = props.className, style = props.style, rtl = props.rtl, containerId = props.containerId;
  function getClassName(position) {
    var _cx;
    var defaultClassName = clsx("Toastify__toast-container", "Toastify__toast-container--" + position, (_cx = {}, _cx["Toastify__toast-container--rtl"] = rtl, _cx));
    return isFn(className) ? className({
      position,
      rtl,
      defaultClassName
    }) : clsx(defaultClassName, parseClassName(className));
  }
  return react.exports.createElement("div", {
    ref: containerRef,
    className: "Toastify",
    id: containerId
  }, getToastToRender(function(position, toastList) {
    var containerStyle = toastList.length === 0 ? _extends({}, style, {
      pointerEvents: "none"
    }) : _extends({}, style);
    return react.exports.createElement("div", {
      className: getClassName(position),
      style: containerStyle,
      key: "container-" + position
    }, toastList.map(function(_ref) {
      var content = _ref.content, toastProps = _ref.props;
      return react.exports.createElement(Toast, Object.assign({}, toastProps, {
        isIn: isToastActive(toastProps.toastId),
        key: "toast-" + toastProps.key,
        closeButton: toastProps.closeButton === true ? CloseButton : toastProps.closeButton
      }), content);
    }));
  }));
};
ToastContainer.defaultProps = {
  position: POSITION.TOP_RIGHT,
  transition: Bounce,
  rtl: false,
  autoClose: 5e3,
  hideProgressBar: false,
  closeButton: CloseButton,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  newestOnTop: false,
  draggable: true,
  draggablePercent: 80,
  draggableDirection: "x",
  role: "alert"
};
var containers = /* @__PURE__ */ new Map();
var latestInstance;
var containerDomNode;
var containerConfig;
var queue = [];
var lazy = false;
function isAnyContainerMounted() {
  return containers.size > 0;
}
function getToast(toastId, _ref) {
  var containerId = _ref.containerId;
  var container = containers.get(containerId || latestInstance);
  if (!container)
    return null;
  return container.getToast(toastId);
}
function generateToastId() {
  return Math.random().toString(36).substr(2, 9);
}
function getToastId(options) {
  if (options && (isStr(options.toastId) || isNum(options.toastId))) {
    return options.toastId;
  }
  return generateToastId();
}
function dispatchToast(content, options) {
  if (isAnyContainerMounted()) {
    eventManager.emit(
      0,
      content,
      options
    );
  } else {
    queue.push({
      content,
      options
    });
    if (lazy && canUseDom) {
      lazy = false;
      containerDomNode = document.createElement("div");
      document.body.appendChild(containerDomNode);
      reactDom$1.exports.render(react.exports.createElement(ToastContainer, Object.assign({}, containerConfig)), containerDomNode);
    }
  }
  return options.toastId;
}
function mergeOptions(type, options) {
  return _extends({}, options, {
    type: options && options.type || type,
    toastId: getToastId(options)
  });
}
var createToastByType = function createToastByType2(type) {
  return function(content, options) {
    return dispatchToast(content, mergeOptions(type, options));
  };
};
var toast = function toast2(content, options) {
  return dispatchToast(content, mergeOptions(TYPE.DEFAULT, options));
};
toast.success = /* @__PURE__ */ createToastByType(TYPE.SUCCESS);
toast.info = /* @__PURE__ */ createToastByType(TYPE.INFO);
toast.error = /* @__PURE__ */ createToastByType(TYPE.ERROR);
toast.warning = /* @__PURE__ */ createToastByType(TYPE.WARNING);
toast.dark = /* @__PURE__ */ createToastByType(TYPE.DARK);
toast.warn = toast.warning;
toast.dismiss = function(id2) {
  return eventManager.emit(
    1,
    id2
  );
};
toast.clearWaitingQueue = function(params) {
  if (params === void 0) {
    params = {};
  }
  return eventManager.emit(
    5,
    params
  );
};
toast.isActive = function(id2) {
  var isToastActive = false;
  containers.forEach(function(container) {
    if (container.isToastActive && container.isToastActive(id2)) {
      isToastActive = true;
    }
  });
  return isToastActive;
};
toast.update = function(toastId, options) {
  if (options === void 0) {
    options = {};
  }
  setTimeout(function() {
    var toast3 = getToast(toastId, options);
    if (toast3) {
      var oldOptions = toast3.props, oldContent = toast3.content;
      var nextOptions = _extends({}, oldOptions, options, {
        toastId: options.toastId || toastId,
        updateId: generateToastId()
      });
      if (nextOptions.toastId !== toastId)
        nextOptions.staleId = toastId;
      var content = nextOptions.render || oldContent;
      delete nextOptions.render;
      dispatchToast(content, nextOptions);
    }
  }, 0);
};
toast.done = function(id2) {
  toast.update(id2, {
    progress: 1
  });
};
toast.onChange = function(callback) {
  if (isFn(callback)) {
    eventManager.on(
      4,
      callback
    );
  }
  return function() {
    isFn(callback) && eventManager.off(
      4,
      callback
    );
  };
};
toast.configure = function(config) {
  if (config === void 0) {
    config = {};
  }
  lazy = true;
  containerConfig = config;
};
toast.POSITION = POSITION;
toast.TYPE = TYPE;
eventManager.on(
  2,
  function(containerInstance) {
    latestInstance = containerInstance.containerId || containerInstance;
    containers.set(latestInstance, containerInstance);
    queue.forEach(function(item) {
      eventManager.emit(
        0,
        item.content,
        item.options
      );
    });
    queue = [];
  }
).on(
  3,
  function(containerInstance) {
    containers["delete"](containerInstance.containerId || containerInstance);
    if (containers.size === 0) {
      eventManager.off(
        0
      ).off(
        1
      ).off(
        5
      );
    }
    if (canUseDom && containerDomNode) {
      document.body.removeChild(containerDomNode);
    }
  }
);
var ReactToastify = "";
function K2VerifyHomePage() {
  const navigate = useNavigate();
  const [taskRows, setTaskRows] = react.exports.useState([]);
  const [deleteCandidate, setDeleteCandidate] = react.exports.useState(null);
  const {
    fetchData: fetchTaskData,
    loading: fetchLoading,
    error: fetchError
  } = useFetchData("/api/fabric-command?command=broadway%20K2Verify.bwK2VerifyTasks%20mode%20=%20'Active'%20RESULT_STRUCTURE=CURSOR");
  const {
    activeTaskIds
  } = useActiveTasksPolling(3e3);
  react.exports.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data2 = await fetchTaskData();
        if (isMounted)
          setTaskRows(data2);
      } catch (err) {
        toast.error((err == null ? void 0 : err.message) || "Failed to load tasks");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [fetchTaskData]);
  react.exports.useEffect(() => {
    if (fetchError) {
      toast.error((fetchError == null ? void 0 : fetchError.message) || "Failed to load tasks");
    }
  }, [fetchError]);
  const columns = [{
    header: "Task Id",
    accessorKey: "task_id",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      row,
      value
    }) => /* @__PURE__ */ jsx(Link, {
      to: "/task",
      state: {
        task_id: value,
        properties: row.original.properties
      },
      style: {
        color: "#1483F3",
        textDecoration: "none"
      },
      children: value
    })
  }, {
    header: "Task Title",
    accessorKey: "task_title",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      row,
      value
    }) => /* @__PURE__ */ jsx(Link, {
      to: "/task",
      state: {
        task_id: row.original.task_id,
        properties: row.original.properties
      },
      style: {
        color: "#1483F3",
        textDecoration: "none"
      },
      children: value
    })
  }, {
    header: "Source Interface",
    accessorKey: "source_interface",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Target Interface",
    accessorKey: "target_interface",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Created By",
    accessorKey: "created_by",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Created At",
    accessorKey: "created_at",
    enableSorting: true,
    enableColumnFilter: true
  }];
  const handleExecution = react.exports.useCallback(async (row) => {
    try {
      const task_id = row == null ? void 0 : row["task_id"];
      if (!task_id) {
        toast.error("Missing task id");
        return;
      }
      const argsStr = JSON.stringify({
        task_id
      });
      const command = `startjob BROADWAY_JOB name='K2Verify.bwHandleTaskExecution' args='${argsStr}';`;
      await runFabricCommand(command);
      navigate(`/execution/${encodeURIComponent(task_id)}`, {
        state: {
          task_id
        }
      });
    } catch (err) {
      toast.error((err == null ? void 0 : err.message) || "Execution failed");
      console.error(err);
    }
  }, [navigate]);
  const handleStopExecution = react.exports.useCallback(async (row) => {
    try {
      const task_id = row == null ? void 0 : row["task_id"];
      if (!task_id) {
        toast.error("Missing task id");
        return;
      }
      const command = `broadway K2Verify.bwK2VerifyCancelTask task_id='${task_id}';`;
      await runFabricCommand(command);
    } catch (err) {
      toast.error((err == null ? void 0 : err.message) || "Failed to stop execution");
      console.error(err);
    }
  }, []);
  const handleDeleteTask = react.exports.useCallback(async (row) => {
    try {
      const task_id = row == null ? void 0 : row["task_id"];
      if (!task_id) {
        toast.error("Missing task id");
        return;
      }
      const command = `broadway K2Verify.bwK2VerifyDeleteTask task_id='${task_id}';`;
      await runFabricCommand(command);
      setTaskRows((prev) => prev.filter((t2) => t2.task_id !== task_id));
      toast.success(`Task ${task_id} deleted`);
    } catch (err) {
      toast.error((err == null ? void 0 : err.message) || "Failed to delete task");
      console.error(err);
    }
  }, []);
  const handleRequestDelete = (row) => {
    setDeleteCandidate(row);
  };
  const handleConfirmDelete = async () => {
    if (deleteCandidate) {
      await handleDeleteTask(deleteCandidate);
      setDeleteCandidate(null);
    }
  };
  const handleCancelDelete = () => {
    setDeleteCandidate(null);
  };
  return /* @__PURE__ */ jsxs("div", {
    style: {
      marginBottom: "45px",
      marginLeft: "30px",
      marginRight: "30px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "24px",
      position: "relative"
    },
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      position: "top-right",
      autoClose: 5e3,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      children: [/* @__PURE__ */ jsx("h1", {
        children: "K2Verify Tasks"
      }), /* @__PURE__ */ jsxs("button", {
        type: "button",
        className: "new-task-btn",
        onClick: () => navigate("/task"),
        children: [/* @__PURE__ */ jsx("span", {
          children: "New Task"
        }), /* @__PURE__ */ jsx("i", {
          className: "fa fa-plus"
        })]
      })]
    }), /* @__PURE__ */ jsx("hr", {
      style: {
        margin: "15px 0",
        border: "1px solid #EAEAEA"
      }
    }), /* @__PURE__ */ jsx(ReactTable, {
      data: taskRows,
      columns,
      taskParams: true,
      loading: fetchLoading,
      onPlay: (row) => handleExecution(row),
      onStop: (row) => handleStopExecution(row),
      onDelete: (row) => handleRequestDelete(row),
      initialPageSize: 10,
      activeTaskIds
    }), /* @__PURE__ */ jsx(DeleteConfirmModal, {
      taskId: deleteCandidate == null ? void 0 : deleteCandidate.task_id,
      onConfirm: handleConfirmDelete,
      onCancel: handleCancelDelete
    })]
  });
}
function TableMappingMultiSelect({
  params,
  mtableData,
  mtableLoading,
  mtableError,
  handleInputChange,
  className = "group2",
  title = "Tables"
}) {
  const srcIF = ((params == null ? void 0 : params.K2VERIFY_INTERFACE_SRC) || "").trim();
  const tarIF = ((params == null ? void 0 : params.K2VERIFY_INTERFACE_TAR) || "").trim();
  const srcSC = ((params == null ? void 0 : params.K2VERIFY_SCHEMA_SRC) || "").trim();
  const tarSC = ((params == null ? void 0 : params.K2VERIFY_SCHEMA_TAR) || "").trim();
  const currentList = Array.isArray(params == null ? void 0 : params.K2VERIFY_TABLE_LIST) ? params.K2VERIFY_TABLE_LIST : [];
  const haveFilters = !!(srcIF && tarIF && srcSC && tarSC);
  const mrows = Array.isArray(mtableData) ? mtableData : [];
  const mkKey = (s, t2) => `${s}__\u2192__${t2}`;
  const listHas = (list, pair) => list.some((p2) => p2.src === pair.src && p2.tar === pair.tar);
  const tablePairs = react.exports.useMemo(() => {
    if (!haveFilters)
      return [];
    const pairs = mrows.filter((r2) => r2.Source_Interface === srcIF && r2.Target_Interface === tarIF && r2.Source_Schema === srcSC && r2.Target_Schema === tarSC).map((r2) => ({
      src: r2.Source_Table_Name,
      tar: r2.Target_Table_Name,
      key: mkKey(r2.Source_Table_Name, r2.Target_Table_Name)
    }));
    const seen = /* @__PURE__ */ new Set();
    return pairs.filter((p2) => {
      if (seen.has(p2.key))
        return false;
      seen.add(p2.key);
      return true;
    });
  }, [mrows, srcIF, tarIF, srcSC, tarSC, haveFilters]);
  const [showSelectedOnly, setShowSelectedOnly] = react.exports.useState(false);
  const [filterOpen, setFilterOpen] = react.exports.useState({
    src: false,
    tar: false
  });
  const [filters, setFilters] = react.exports.useState({
    src: "",
    tar: ""
  });
  const toggleFilter = react.exports.useCallback((col) => {
    setFilterOpen((prev) => ({
      ...prev,
      [col]: !prev[col]
    }));
  }, []);
  const setFilterValue = react.exports.useCallback((col, val) => {
    setFilters((prev) => ({
      ...prev,
      [col]: val
    }));
  }, []);
  react.exports.useEffect(() => {
    if (!haveFilters)
      return;
    if (!currentList.length)
      return;
    const validKeys = new Set(tablePairs.map((p2) => p2.key));
    const pruned = currentList.filter((p2) => validKeys.has(mkKey(p2.src, p2.tar)));
    if (pruned.length !== currentList.length) {
      handleInputChange({
        target: {
          name: "K2VERIFY_TABLE_LIST",
          value: pruned
        }
      });
    }
  }, [tablePairs, haveFilters]);
  const updateList = react.exports.useCallback((nextList) => {
    handleInputChange({
      target: {
        name: "K2VERIFY_TABLE_LIST",
        value: nextList
      }
    });
  }, [handleInputChange]);
  const togglePair = (pair) => {
    if (listHas(currentList, pair)) {
      updateList(currentList.filter((p2) => !(p2.src === pair.src && p2.tar === pair.tar)));
    } else {
      updateList([...currentList, {
        src: pair.src,
        tar: pair.tar
      }]);
    }
  };
  const selectAll = () => {
    const all = tablePairs.map((p2) => ({
      src: p2.src,
      tar: p2.tar
    }));
    updateList(all);
  };
  const clearAll = () => updateList([]);
  const filteredPairs = react.exports.useMemo(() => {
    const srcNeedle = filters.src.trim().toLowerCase();
    const tarNeedle = filters.tar.trim().toLowerCase();
    return tablePairs.filter((p2) => {
      var _a, _b;
      const srcOk = srcNeedle ? (_a = p2.src) == null ? void 0 : _a.toLowerCase().includes(srcNeedle) : true;
      const tarOk = tarNeedle ? (_b = p2.tar) == null ? void 0 : _b.toLowerCase().includes(tarNeedle) : true;
      return srcOk && tarOk;
    });
  }, [tablePairs, filters.src, filters.tar]);
  const visiblePairs = react.exports.useMemo(() => {
    if (!showSelectedOnly)
      return filteredPairs;
    const selectedKeys = new Set(currentList.map((p2) => mkKey(p2.src, p2.tar)));
    return filteredPairs.filter((p2) => selectedKeys.has(p2.key));
  }, [showSelectedOnly, filteredPairs, currentList]);
  const checkedCount = currentList.length;
  if (!haveFilters)
    return null;
  return /* @__PURE__ */ jsxs("div", {
    className,
    children: [/* @__PURE__ */ jsxs("label", {
      className: "label",
      children: [title, /* @__PURE__ */ jsx("span", {
        className: "required",
        children: "*"
      })]
    }), mtableLoading ? /* @__PURE__ */ jsx("div", {
      className: "note",
      children: "Loading table mappings\u2026"
    }) : mtableError ? /* @__PURE__ */ jsx("div", {
      className: "error",
      children: "Error loading table mappings"
    }) : tablePairs.length === 0 ? /* @__PURE__ */ jsx("div", {
      className: "note",
      children: "No table pairs found for the chosen interface + schema combination."
    }) : /* @__PURE__ */ jsxs("div", {
      className: "miniTableBox",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "miniTableActions",
        style: {
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 8,
          flexWrap: "nowrap",
          whiteSpace: "nowrap"
        },
        children: [/* @__PURE__ */ jsx("button", {
          type: "button",
          className: "btn btnAll",
          onClick: selectAll,
          children: "Select all"
        }), /* @__PURE__ */ jsx("button", {
          type: "button",
          className: "btn btnClearAll",
          onClick: clearAll,
          children: "Clear all"
        }), /* @__PURE__ */ jsxs("label", {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 8,
            cursor: "pointer",
            userSelect: "none",
            fontSize: "0.9rem",
            color: "#374151",
            whiteSpace: "nowrap"
          },
          title: "Show only selected table pairs",
          children: [/* @__PURE__ */ jsx("input", {
            type: "checkbox",
            checked: showSelectedOnly,
            onChange: () => setShowSelectedOnly((v2) => !v2)
          }), "Show selected only"]
        }), /* @__PURE__ */ jsxs("span", {
          style: {
            marginLeft: "auto",
            fontSize: "0.9rem",
            whiteSpace: "nowrap"
          },
          children: ["Selected: ", /* @__PURE__ */ jsx("strong", {
            children: checkedCount
          }), " / ", tablePairs.length]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "miniTableWrap",
        children: /* @__PURE__ */ jsxs("table", {
          className: "miniTable",
          children: [/* @__PURE__ */ jsx("thead", {
            children: /* @__PURE__ */ jsxs("tr", {
              children: [/* @__PURE__ */ jsx("th", {
                style: {
                  width: 36
                }
              }), /* @__PURE__ */ jsxs("th", {
                children: [/* @__PURE__ */ jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6
                  },
                  children: [/* @__PURE__ */ jsx("span", {
                    style: {
                      whiteSpace: "nowrap"
                    },
                    children: "Source table"
                  }), /* @__PURE__ */ jsx("img", {
                    src: filterOpen.src ? filterOn : filterOff,
                    alt: filterOpen.src ? "Filter On" : "Filter Off",
                    title: "Filter Source",
                    className: "icons",
                    style: {
                      cursor: "pointer",
                      width: 16,
                      height: 16,
                      flexShrink: 0
                    },
                    onClick: () => toggleFilter("src")
                  })]
                }), filterOpen.src && /* @__PURE__ */ jsx("div", {
                  style: {
                    marginTop: 6
                  },
                  children: /* @__PURE__ */ jsx("input", {
                    className: "k2-table-input",
                    placeholder: "Search source\u2026",
                    value: filters.src,
                    onChange: (e) => setFilterValue("src", e.target.value),
                    autoFocus: true
                  })
                })]
              }), /* @__PURE__ */ jsxs("th", {
                children: [/* @__PURE__ */ jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6
                  },
                  children: [/* @__PURE__ */ jsx("span", {
                    style: {
                      whiteSpace: "nowrap"
                    },
                    children: "Target table"
                  }), /* @__PURE__ */ jsx("img", {
                    src: filterOpen.tar ? filterOn : filterOff,
                    alt: filterOpen.tar ? "Filter On" : "Filter Off",
                    className: "icons",
                    title: "Filter Target",
                    style: {
                      cursor: "pointer",
                      width: 16,
                      height: 16,
                      flexShrink: 0
                    },
                    onClick: () => toggleFilter("tar")
                  })]
                }), filterOpen.tar && /* @__PURE__ */ jsx("div", {
                  style: {
                    marginTop: 6
                  },
                  children: /* @__PURE__ */ jsx("input", {
                    className: "k2-table-input",
                    placeholder: "Search target\u2026",
                    value: filters.tar,
                    onChange: (e) => setFilterValue("tar", e.target.value)
                  })
                })]
              })]
            })
          }), /* @__PURE__ */ jsxs("tbody", {
            children: [visiblePairs.map((p2) => {
              const checked = listHas(currentList, p2);
              return /* @__PURE__ */ jsxs("tr", {
                children: [/* @__PURE__ */ jsx("td", {
                  children: /* @__PURE__ */ jsx("input", {
                    type: "checkbox",
                    name: `pair-${p2.key}`,
                    checked,
                    onChange: () => togglePair(p2)
                  })
                }), /* @__PURE__ */ jsx("td", {
                  children: p2.src
                }), /* @__PURE__ */ jsx("td", {
                  children: p2.tar
                })]
              }, p2.key);
            }), visiblePairs.length === 0 && /* @__PURE__ */ jsx("tr", {
              children: /* @__PURE__ */ jsx("td", {
                colSpan: 3,
                style: {
                  padding: 12,
                  color: "#6b7280"
                },
                children: showSelectedOnly ? "No selected pairs to display." : "No pairs match your filter(s)."
              })
            })]
          })]
        })
      })]
    })]
  });
}
function K2VerifyTaskOptions({
  params,
  mtableData,
  mtableLoading,
  mtableError,
  handleInputChange,
  handleReset,
  handleCancel,
  handleExecution
}) {
  var _a;
  const handleRunProcess = () => {
    const form = document.querySelector("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    handleExecution();
  };
  const tablesRequiredRef = react.exports.useRef(null);
  const selectedSrc = (params.K2VERIFY_INTERFACE_SRC || "").trim();
  const selectedTar = (params.K2VERIFY_INTERFACE_TAR || "").trim();
  const selectedSrcSchema = (params.K2VERIFY_SCHEMA_SRC || "").trim();
  const selectedTarSchema = (params.K2VERIFY_SCHEMA_TAR || "").trim();
  const tablePickerVisible = !!(selectedSrc && selectedTar && selectedSrcSchema && selectedTarSchema);
  const tablesChosenCount = Array.isArray(params.K2VERIFY_TABLE_LIST) ? params.K2VERIFY_TABLE_LIST.length : 0;
  react.exports.useEffect(() => {
    if (!tablesRequiredRef.current)
      return;
    if (!tablePickerVisible) {
      tablesRequiredRef.current.required = false;
      tablesRequiredRef.current.setCustomValidity("");
      return;
    }
    tablesRequiredRef.current.required = true;
    if (tablesChosenCount === 0) {
      tablesRequiredRef.current.setCustomValidity("Please select at least one source-target table pair.");
    } else {
      tablesRequiredRef.current.setCustomValidity("");
    }
  }, [tablePickerVisible, tablesChosenCount]);
  const preventFormSubmission = (e) => e.preventDefault();
  const preventEnterSubmission = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA")
      e.preventDefault();
  };
  const allowedSourceSet = selectedTar ? new Set(mtableData.filter((row) => row.Target_Interface === selectedTar).map((row) => row.Source_Interface)) : null;
  const allowedTargetSet = selectedSrc ? new Set(mtableData.filter((row) => row.Source_Interface === selectedSrc).map((row) => row.Target_Interface)) : null;
  const allSourceInterfaces = React.useMemo(() => {
    if (!Array.isArray(mtableData))
      return [];
    return Array.from(new Set(mtableData.map((r2) => r2.Source_Interface).filter((v2) => typeof v2 === "string" && v2.trim() !== ""))).sort();
  }, [mtableData]);
  const allTargetInterfaces = React.useMemo(() => {
    if (!Array.isArray(mtableData))
      return [];
    return Array.from(new Set(mtableData.map((r2) => r2.Target_Interface).filter((v2) => typeof v2 === "string" && v2.trim() !== ""))).sort();
  }, [mtableData]);
  const filteredSourceInterfaces = React.useMemo(() => {
    if (!allowedSourceSet)
      return allSourceInterfaces;
    return allSourceInterfaces.filter((iface) => allowedSourceSet.has(iface));
  }, [allSourceInterfaces, allowedSourceSet]);
  const filteredTargetInterfaces = React.useMemo(() => {
    if (!allowedTargetSet)
      return allTargetInterfaces;
    return allTargetInterfaces.filter((iface) => allowedTargetSet.has(iface));
  }, [allTargetInterfaces, allowedTargetSet]);
  return /* @__PURE__ */ jsxs("form", {
    className: "card",
    onSubmit: preventFormSubmission,
    onKeyDown: preventEnterSubmission,
    noValidate: false,
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Create K2Verify Task"
    }), /* @__PURE__ */ jsxs("div", {
      className: "group2",
      children: [/* @__PURE__ */ jsxs("label", {
        className: "label",
        htmlFor: "K2VERIFY_TASK_TITLE",
        children: ["Task title", /* @__PURE__ */ jsx("span", {
          className: "required",
          children: "*"
        })]
      }), /* @__PURE__ */ jsx("input", {
        id: "K2VERIFY_TASK_TITLE",
        name: "K2VERIFY_TASK_TITLE",
        className: "input",
        type: "text",
        value: params.K2VERIFY_TASK_TITLE,
        onChange: handleInputChange,
        placeholder: "e.g., Customer Table Assurance",
        required: true
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "group2",
      children: [/* @__PURE__ */ jsx("label", {
        className: "label",
        htmlFor: "K2VERIFY_TASK_DESCRIPTION",
        children: "Task description"
      }), /* @__PURE__ */ jsx("textarea", {
        id: "K2VERIFY_TASK_DESCRIPTION",
        name: "K2VERIFY_TASK_DESCRIPTION",
        className: "textarea",
        value: params.K2VERIFY_TASK_DESCRIPTION,
        onChange: handleInputChange,
        placeholder: "Describe what the task is going to do."
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid2",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "group",
        children: [/* @__PURE__ */ jsxs("label", {
          className: "label",
          children: ["Source interface", /* @__PURE__ */ jsx("span", {
            className: "required",
            children: "*"
          })]
        }), /* @__PURE__ */ jsxs("select", {
          name: "K2VERIFY_INTERFACE_SRC",
          value: params.K2VERIFY_INTERFACE_SRC,
          onChange: handleInputChange,
          className: "select",
          required: true,
          children: [/* @__PURE__ */ jsx("option", {
            value: "",
            disabled: true,
            hidden: true,
            children: "Select source interface"
          }), mtableLoading ? /* @__PURE__ */ jsx("option", {
            children: "Loading..."
          }) : mtableError ? /* @__PURE__ */ jsx("option", {
            children: "Error loading interfaces"
          }) : (() => {
            const options = filteredSourceInterfaces;
            if (selectedTar && options.length === 0) {
              return /* @__PURE__ */ jsx("option", {
                disabled: true,
                value: "",
                children: "No compatible source interfaces for the selected target"
              });
            }
            if (!selectedTar && options.length === 0) {
              return /* @__PURE__ */ jsx("option", {
                disabled: true,
                value: "",
                children: "No source interfaces found in mapping table"
              });
            }
            return options.map((iface) => /* @__PURE__ */ jsx("option", {
              value: iface,
              children: iface
            }, `src-${iface}`));
          })()]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "group",
        children: [/* @__PURE__ */ jsxs("label", {
          className: "label",
          children: ["Target interface", /* @__PURE__ */ jsx("span", {
            className: "required",
            children: "*"
          })]
        }), /* @__PURE__ */ jsxs("select", {
          name: "K2VERIFY_INTERFACE_TAR",
          value: params.K2VERIFY_INTERFACE_TAR,
          onChange: handleInputChange,
          className: "select",
          required: true,
          children: [/* @__PURE__ */ jsx("option", {
            value: "",
            disabled: true,
            hidden: true,
            children: "Select target interface"
          }), mtableLoading ? /* @__PURE__ */ jsx("option", {
            children: "Loading..."
          }) : mtableError ? /* @__PURE__ */ jsx("option", {
            children: "Error loading interfaces"
          }) : (() => {
            const options = filteredTargetInterfaces;
            if (selectedSrc && options.length === 0) {
              return /* @__PURE__ */ jsx("option", {
                disabled: true,
                value: "",
                children: "No compatible target interfaces for the selected source"
              });
            }
            if (!selectedSrc && options.length === 0) {
              return /* @__PURE__ */ jsx("option", {
                disabled: true,
                value: "",
                children: "No target interfaces found in mapping table"
              });
            }
            return options.map((iface) => /* @__PURE__ */ jsx("option", {
              value: iface,
              children: iface
            }, `tar-${iface}`));
          })()]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "group",
        children: [/* @__PURE__ */ jsxs("label", {
          className: "label",
          children: ["Source schema", /* @__PURE__ */ jsx("span", {
            className: "required",
            children: "*"
          })]
        }), /* @__PURE__ */ jsxs("select", {
          name: "K2VERIFY_SCHEMA_SRC",
          value: params.K2VERIFY_SCHEMA_SRC,
          onChange: handleInputChange,
          className: "select",
          required: true,
          children: [/* @__PURE__ */ jsx("option", {
            value: "",
            disabled: true,
            hidden: true,
            children: "Select source schema"
          }), mtableLoading ? /* @__PURE__ */ jsx("option", {
            children: "Loading..."
          }) : mtableError ? /* @__PURE__ */ jsx("option", {
            children: "Error loading schemas"
          }) : params.K2VERIFY_INTERFACE_SRC && params.K2VERIFY_INTERFACE_SRC.trim() !== "" ? (() => {
            const filteredSchemas = [...new Set(mtableData.filter((item) => item.Source_Interface === params.K2VERIFY_INTERFACE_SRC.trim()).map((item) => item.Source_Schema))];
            if (filteredSchemas.length === 0) {
              return /* @__PURE__ */ jsx("option", {
                disabled: true,
                value: "",
                children: "No source schema for the selected source interface"
              });
            }
            return filteredSchemas.map((schema, i2) => /* @__PURE__ */ jsx("option", {
              value: schema,
              children: schema
            }, `src-schema-${i2}`));
          })() : /* @__PURE__ */ jsx("option", {
            disabled: true,
            value: "",
            children: "Select Source Interface First"
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "group",
        children: [/* @__PURE__ */ jsxs("label", {
          className: "label",
          children: ["Target schema", /* @__PURE__ */ jsx("span", {
            className: "required",
            children: "*"
          })]
        }), /* @__PURE__ */ jsxs("select", {
          name: "K2VERIFY_SCHEMA_TAR",
          value: params.K2VERIFY_SCHEMA_TAR,
          onChange: handleInputChange,
          className: "select",
          required: true,
          children: [/* @__PURE__ */ jsx("option", {
            value: "",
            disabled: true,
            hidden: true,
            children: "Select target schema"
          }), mtableLoading ? /* @__PURE__ */ jsx("option", {
            children: "Loading..."
          }) : mtableError ? /* @__PURE__ */ jsx("option", {
            children: "Error loading schemas"
          }) : params.K2VERIFY_INTERFACE_TAR && params.K2VERIFY_INTERFACE_TAR.trim() !== "" ? (() => {
            const filteredSchemas = [...new Set(mtableData.filter((item) => item.Target_Interface === params.K2VERIFY_INTERFACE_TAR.trim()).map((item) => item.Target_Schema))];
            if (filteredSchemas.length === 0) {
              return /* @__PURE__ */ jsx("option", {
                disabled: true,
                value: "",
                children: "No target schema for the selected target interface"
              });
            }
            return filteredSchemas.map((schema, i2) => /* @__PURE__ */ jsx("option", {
              value: schema,
              children: schema
            }, `tar-schema-${i2}`));
          })() : /* @__PURE__ */ jsx("option", {
            disabled: true,
            value: "",
            children: "Select Target Interface First"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(TableMappingMultiSelect, {
      params,
      mtableData,
      mtableLoading,
      mtableError,
      handleInputChange
    }), /* @__PURE__ */ jsx("input", {
      ref: tablesRequiredRef,
      name: "__required_table_selection",
      value: tablesChosenCount > 0 ? "has-tables" : "",
      onChange: () => {
      },
      style: {
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0,
        pointerEvents: "none"
      },
      "aria-hidden": "true",
      tabIndex: -1
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid2",
      style: {
        marginTop: 16
      },
      children: [/* @__PURE__ */ jsxs("div", {
        className: "group",
        style: {
          display: "flex",
          marginTop: "auto"
        },
        children: [/* @__PURE__ */ jsx("label", {
          className: "label",
          htmlFor: "K2VERIFY_PII_ONLY_COMPARISON",
          style: {
            marginRight: 8
          },
          children: "Verify PII fields only"
        }), /* @__PURE__ */ jsx("input", {
          id: "K2VERIFY_PII_ONLY_COMPARISON",
          name: "K2VERIFY_PII_ONLY_COMPARISON",
          type: "checkbox",
          checked: !!params.K2VERIFY_PII_ONLY_COMPARISON,
          onChange: handleInputChange,
          style: {
            transform: "scale(0.7)"
          }
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "group",
        style: {
          display: "flex",
          marginTop: "auto"
        },
        children: [/* @__PURE__ */ jsx("label", {
          className: "label",
          htmlFor: "K2VERIFY_LOGPASS",
          style: {
            marginRight: 8
          },
          children: "Include passed verifications in the Report"
        }), /* @__PURE__ */ jsx("input", {
          id: "K2VERIFY_LOGPASS",
          name: "K2VERIFY_LOGPASS",
          type: "checkbox",
          checked: !!params.K2VERIFY_LOGPASS,
          onChange: handleInputChange,
          style: {
            transform: "scale(0.7)"
          }
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "group",
        children: [/* @__PURE__ */ jsx("label", {
          className: "label",
          htmlFor: "K2VERIFY_MAXWORKERSPERNODE",
          children: "Concurrency threads per node"
        }), /* @__PURE__ */ jsx("input", {
          id: "K2VERIFY_MAXWORKERSPERNODE",
          name: "K2VERIFY_MAXWORKERSPERNODE",
          className: "input",
          type: "number",
          min: "1",
          step: "1",
          placeholder: "e.g., 4. Leave blank to use system default.",
          value: (_a = params.K2VERIFY_MAXWORKERSPERNODE) != null ? _a : "",
          onChange: handleInputChange
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "buttons",
      children: [/* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: handleRunProcess,
        className: "btn btnPrimary",
        children: "Save"
      }), /* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: handleReset,
        className: "btn btnSecondary",
        children: "Reset"
      }), /* @__PURE__ */ jsx("button", {
        type: "button",
        onClick: handleCancel,
        className: "btn btnCancel",
        children: "Cancel"
      })]
    })]
  });
}
function K2VerifyTaskCreation() {
  var _a, _b;
  const navigate = useNavigate();
  const location = useLocation();
  const taskId = ((_a = location.state) == null ? void 0 : _a.task_id) || "";
  const properties = react.exports.useMemo(() => {
    var _a2;
    const raw = (_a2 = location.state) == null ? void 0 : _a2.properties;
    if (!raw)
      return null;
    if (typeof raw === "object")
      return raw;
    if (typeof raw === "string") {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Failed to parse properties:", e);
        return null;
      }
    }
    return null;
  }, [(_b = location.state) == null ? void 0 : _b.properties]);
  const defaultParams = {
    K2VERIFY_TASK_TITLE: "",
    K2VERIFY_TASK_DESCRIPTION: "",
    K2VERIFY_INTERFACE_SRC: "",
    K2VERIFY_INTERFACE_TAR: "",
    K2VERIFY_SCHEMA_SRC: "",
    K2VERIFY_SCHEMA_TAR: "",
    K2VERIFY_TABLE_LIST: [],
    K2VERIFY_MAXWORKERSPERNODE: null,
    K2VERIFY_LOGPASS: false,
    K2VERIFY_PII_ONLY_COMPARISON: false
  };
  const initialParams = react.exports.useMemo(() => {
    if (properties)
      return {
        ...defaultParams,
        ...properties
      };
    return defaultParams;
  }, [properties]);
  const [params, setParams] = react.exports.useState(initialParams);
  const [encodedCommand, setEncodedCommand] = react.exports.useState(null);
  const [mtableData, setmtableData] = react.exports.useState([]);
  const [execError, setExecError] = react.exports.useState("");
  react.exports.useEffect(() => {
    setParams(initialParams);
  }, [initialParams]);
  const {
    fetchData: fetchmtableData,
    loading: mtableLoading,
    error: mtableError
  } = useFetchData("/api/fabric-command?command=broadway%20K2Verify.bwLookupTableNames%20RESULT_STRUCTURE=CURSOR");
  react.exports.useEffect(() => {
    if (mtableError) {
      toast.error((mtableError == null ? void 0 : mtableError.message) || "Failed to bring the mtable data");
    }
  }, [mtableError]);
  react.exports.useEffect(() => {
    (async () => setmtableData(await fetchmtableData()))();
  }, [fetchmtableData]);
  const handleInputChange = (e) => {
    const {
      name,
      type,
      value,
      checked
    } = e.target;
    let newValue;
    if (type === "number")
      newValue = value === "" ? null : Number(value);
    else if (type === "checkbox")
      newValue = !!checked;
    else
      newValue = value;
    setParams((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };
  const handleReset = () => setParams(initialParams);
  const handleCancel = () => {
    setParams(initialParams);
    navigate("/cli-process");
  };
  const handleExecution = async () => {
    console.log("Executing with params:", params);
    const cmds = [];
    const paramsString = JSON.stringify(params);
    cmds.push(`broadway K2Verify.bwK2VerifyTaskCreation task_params='${paramsString}' old_task_id='${taskId}';`);
    const command = cmds.join("\n");
    const encoded = encodeURIComponent(command);
    setEncodedCommand(encoded);
    try {
      setExecError("");
      const res = await fetch(`/api/fabric-command?command=${encoded}&allResultSets=false`);
      const body = await res.json();
      if (!res.ok) {
        const match = body.match(/"([^"]+)"/);
        const msg = match ? match[1] : body;
        throw new Error(msg);
      }
      navigate("/cli-process");
    } catch (err) {
      toast.error(err.message || "Execution failed");
      console.error(err);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      position: "top-right",
      autoClose: 5e3,
      theme: "colored"
    }), /* @__PURE__ */ jsx(K2VerifyTaskOptions, {
      params,
      mtableData,
      mtableLoading,
      mtableError,
      handleInputChange,
      handleReset,
      handleCancel,
      handleExecution
    }), execError && /* @__PURE__ */ jsx("div", {
      className: "alert alertError mt4",
      children: execError
    })]
  });
}
function K2VerifyTaskHistory() {
  const navigate = useNavigate();
  const {
    taskId
  } = useParams();
  const decodedTaskId = react.exports.useMemo(() => {
    try {
      return taskId ? decodeURIComponent(taskId) : "";
    } catch {
      return taskId || "";
    }
  }, [taskId]);
  const columns = [{
    header: "Execution ID",
    accessorKey: "execution_id",
    size: 150,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      value
    }) => /* @__PURE__ */ jsx(Link, {
      to: `detailed/${value}`,
      style: {
        color: "#1483F3",
        textDecoration: "none"
      },
      children: value
    })
  }, {
    header: "Task Id",
    accessorKey: "task_id",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Execution Status",
    accessorKey: "execution_status",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Table Completion Summary",
    accessorKey: "table_completion_summary",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Started By",
    accessorKey: "started_by",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Start Time",
    accessorKey: "start_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "End Time",
    accessorKey: "end_time",
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      value
    }) => value ? value : "\u2014"
  }];
  const [taskHistoryData, setTaskHistoryData] = react.exports.useState([]);
  const {
    fetchData: fetchTaskHistoryData,
    loading: taskHistoryLoading,
    error: taskHistoryError
  } = useFetchData(`/api/fabric-command?command=${encodeURIComponent(`broadway K2Verify.bwK2VerifyExecutionHistory task_id='${decodedTaskId}' RESULT_STRUCTURE=CURSOR`)}`);
  react.exports.useEffect(() => {
    if (!decodedTaskId)
      return;
    let alive = true;
    (async () => {
      try {
        const rows = await fetchTaskHistoryData();
        if (!alive)
          return;
        if (Array.isArray(rows)) {
          setTaskHistoryData(rows);
        } else {
          setTaskHistoryData([]);
        }
      } catch (err) {
        toast.error((err == null ? void 0 : err.message) || "Failed to load task execution history");
      }
    })();
    return () => {
      alive = false;
    };
  }, [fetchTaskHistoryData, decodedTaskId]);
  react.exports.useEffect(() => {
    if (taskHistoryError) {
      toast.error(taskHistoryError.message || "Failed to load task execution history");
    }
  }, [taskHistoryError]);
  if (!decodedTaskId) {
    return /* @__PURE__ */ jsxs("div", {
      style: {
        padding: 24
      },
      children: [/* @__PURE__ */ jsx(ToastContainer, {
        position: "top-right",
        autoClose: 5e3,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      }), /* @__PURE__ */ jsx("h1", {
        children: "Task History"
      }), /* @__PURE__ */ jsx("p", {
        children: "Missing task id in the URL."
      }), /* @__PURE__ */ jsx("button", {
        onClick: () => navigate(-1),
        children: "Go Back"
      })]
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    style: {
      marginBottom: "45px",
      marginLeft: "30px",
      marginRight: "30px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "24px"
    },
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      position: "top-right",
      autoClose: 5e3,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      children: /* @__PURE__ */ jsxs("h1", {
        children: ["K2Verify Task Execution Summary for Task Id: ", decodedTaskId]
      })
    }), /* @__PURE__ */ jsx("hr", {
      style: {
        margin: "15px 0",
        border: "1px solid #EAEAEA",
        color: "#EAEAEA"
      }
    }), /* @__PURE__ */ jsx(ReactTable, {
      data: taskHistoryData,
      columns,
      initialPageSize: 10,
      loading: taskHistoryLoading
    })]
  });
}
function K2VerifyExecution() {
  var _a, _b;
  const {
    taskId: taskIdParam
  } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const rawTaskId = (_b = (_a = location.state && location.state.task_id) != null ? _a : taskIdParam) != null ? _b : "";
  const decodedTaskId = react.exports.useMemo(() => {
    try {
      return rawTaskId ? decodeURIComponent(String(rawTaskId)) : "";
    } catch {
      return String(rawTaskId || "");
    }
  }, [rawTaskId]);
  const {
    taskExecutionMap
  } = useActiveTasksPolling(3e3);
  const executionId = react.exports.useMemo(() => {
    var _a2, _b2;
    if (!decodedTaskId || !taskExecutionMap)
      return "";
    const numId = Number(decodedTaskId);
    return (_b2 = (_a2 = taskExecutionMap.get(numId)) != null ? _a2 : taskExecutionMap.get(String(decodedTaskId))) != null ? _b2 : "";
  }, [decodedTaskId, taskExecutionMap]);
  const prevExecutionIdRef = react.exports.useRef(executionId);
  react.exports.useEffect(() => {
    const prev = prevExecutionIdRef.current;
    if (executionId) {
      prevExecutionIdRef.current = executionId;
      return;
    }
    if (!executionId && prev) {
      const toTask = encodeURIComponent(String(decodedTaskId));
      const toExec = encodeURIComponent(String(prev));
      const target = `/history/${toTask}/detailed/${toExec}`;
      if (location.pathname !== target) {
        navigate(target, {
          replace: true
        });
      }
      prevExecutionIdRef.current = "";
    }
  }, [executionId, decodedTaskId, navigate, location.pathname]);
  const endpoint = react.exports.useMemo(() => {
    if (!decodedTaskId || !executionId)
      return null;
    return `/api/fabric-command?command=${encodeURIComponent(`broadway K2Verify.bwK2VerifyExecutionDetails task_id='${decodedTaskId}' execution_id='${executionId}' RESULT_STRUCTURE=CURSOR`)}`;
  }, [decodedTaskId, executionId]);
  const {
    fetchData: fetchTaskHistoryData,
    error: detailError
  } = useFetchData(endpoint);
  const [taskHistoryData, setTaskHistoryData] = react.exports.useState([]);
  const inFlightRef = react.exports.useRef(false);
  const intervalRef = react.exports.useRef(null);
  const [tableName, setTableName] = react.exports.useState("");
  const [infoData, setInfoData] = react.exports.useState([]);
  const infoInFlightRef = react.exports.useRef(false);
  const infoIntervalRef = react.exports.useRef(null);
  const handleStopExecution = react.exports.useCallback(async () => {
    var _a2;
    try {
      if (!decodedTaskId) {
        toast.error("Missing task id");
        return;
      }
      const command = `broadway K2Verify.bwK2VerifyCancelTask task_id='${decodedTaskId}';`;
      const encoded = encodeURIComponent(command);
      const res = await fetch(`/api/fabric-command?command=${encoded}`);
      const result = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = ((_a2 = result == null ? void 0 : result.error) == null ? void 0 : _a2.message) || (result == null ? void 0 : result.message) || (typeof result === "string" ? result : null) || "Execution failed";
        toast.error(`Failed to stop Task #${decodedTaskId}: ${msg}`);
        return;
      }
      toast.success(`Cancellation requested for Task #${decodedTaskId}`);
    } catch (err) {
      toast.error((err == null ? void 0 : err.message) || "Execution failed");
      console.error(err);
    }
  }, [decodedTaskId]);
  const handleInfoClick = react.exports.useCallback((row) => {
    var _a2, _b2, _c;
    const name = (_c = (_b2 = (_a2 = row == null ? void 0 : row.original) == null ? void 0 : _a2.table_name) != null ? _b2 : row == null ? void 0 : row.table_name) != null ? _c : "";
    if (!name) {
      toast.error("No table_name found for this row");
      return;
    }
    if (name === tableName) {
      setTableName("");
      setInfoData([]);
      if (infoIntervalRef.current) {
        window.clearInterval(infoIntervalRef.current);
        infoIntervalRef.current = null;
      }
      return;
    }
    setTableName(name);
    setInfoData([]);
  }, [tableName]);
  react.exports.useEffect(() => {
    if (!endpoint)
      return;
    let isActive = true;
    const tick = async () => {
      if (inFlightRef.current)
        return;
      inFlightRef.current = true;
      try {
        const rows = await fetchTaskHistoryData();
        if (isActive)
          setTaskHistoryData(rows || []);
      } catch (err) {
        toast.error(detailError || "Failed to fetch the execution data.");
        console.error("execution details fetch error:", err);
      } finally {
        inFlightRef.current = false;
      }
    };
    tick();
    intervalRef.current = window.setInterval(() => {
      if (!document.hidden)
        tick();
    }, 3e3);
    return () => {
      isActive = false;
      if (intervalRef.current)
        window.clearInterval(intervalRef.current);
    };
  }, [endpoint, fetchTaskHistoryData, detailError]);
  const endpoint2 = react.exports.useMemo(() => {
    if (!decodedTaskId || !executionId || !tableName)
      return null;
    return `/api/fabric-command?command=${encodeURIComponent(`broadway K2Verify.bwK2VerifyBucketDetails task_id='${decodedTaskId}' execution_id='${executionId}' table_name='${tableName}' RESULT_STRUCTURE=CURSOR`)}`;
  }, [decodedTaskId, executionId, tableName]);
  const {
    fetchData: fetchBucketDetailsData
  } = useFetchData(endpoint2);
  react.exports.useEffect(() => {
    if (infoIntervalRef.current) {
      window.clearInterval(infoIntervalRef.current);
      infoIntervalRef.current = null;
    }
    if (!endpoint2)
      return;
    let isActive = true;
    const tick = async () => {
      if (infoInFlightRef.current)
        return;
      infoInFlightRef.current = true;
      try {
        const rows = await fetchBucketDetailsData();
        if (isActive)
          setInfoData(rows || []);
      } catch (err) {
        toast.error("Failed to fetch bucket details for the selected table.");
        console.error("bucket details fetch error:", err);
      } finally {
        infoInFlightRef.current = false;
      }
    };
    tick();
    infoIntervalRef.current = window.setInterval(() => {
      if (!document.hidden)
        tick();
    }, 3e3);
    return () => {
      isActive = false;
      if (infoIntervalRef.current)
        window.clearInterval(infoIntervalRef.current);
    };
  }, [endpoint2, fetchBucketDetailsData]);
  const columns = react.exports.useMemo(() => [{
    header: "Table Name",
    accessorKey: "table_name",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Batch ID",
    accessorKey: "batch_id",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Start Time",
    accessorKey: "start_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "End Time",
    accessorKey: "end_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Bucket Completion Summary",
    accessorKey: "bucket_completion_summary",
    enableSorting: true,
    enableColumnFilter: true,
    size: 260
  }, {
    header: "Processed Records",
    accessorKey: "processed_records",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Failed Records",
    accessorKey: "failed_records",
    enableSorting: true,
    enableColumnFilter: true
  }], []);
  const infoColumns = react.exports.useMemo(() => [{
    header: "Bucket Id",
    accessorKey: "bucket_id",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Start Time",
    accessorKey: "start_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "End Time",
    accessorKey: "end_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Total Records",
    accessorKey: "total_records",
    enableSorting: true,
    enableColumnFilter: true,
    size: 202
  }, {
    header: "Processed Records",
    accessorKey: "processed_records",
    enableSorting: true,
    enableColumnFilter: true,
    size: 202
  }, {
    header: "Failed Records",
    accessorKey: "failed_records",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Error Info",
    accessorKey: "error_info",
    enableSorting: true,
    enableColumnFilter: true
  }], []);
  return /* @__PURE__ */ jsxs("div", {
    style: {
      marginBottom: "45px",
      marginLeft: "30px",
      marginRight: "30px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "24px"
    },
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      position: "top-right",
      autoClose: 5e3,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    }), /* @__PURE__ */ jsxs("h1", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      },
      children: [/* @__PURE__ */ jsxs("span", {
        children: ["K2Verify Execution Details \u2014 Task ID: ", decodedTaskId, executionId && /* @__PURE__ */ jsxs(Fragment, {
          children: [" | Execution ID: ", executionId]
        })]
      }), executionId && /* @__PURE__ */ jsx("img", {
        src: stopcircleIcon,
        alt: "Stop",
        title: "Trigger execution",
        onClick: handleStopExecution,
        style: {
          width: "24px",
          height: "24px",
          cursor: "pointer"
        }
      })]
    }), /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx("hr", {
        style: {
          margin: "15px 0"
        }
      }), /* @__PURE__ */ jsx(ReactTable, {
        data: taskHistoryData,
        columns,
        initialPageSize: 5,
        infoParams: true,
        onInfoClick: handleInfoClick
      })]
    }), executionId && /* @__PURE__ */ jsxs("div", {
      style: {
        marginTop: "24px",
        padding: "16px"
      },
      children: [tableName ? /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsxs("h2", {
          style: {
            marginTop: 0
          },
          children: ["Bucket Details for ", tableName ? `- Table: ${tableName}` : "(select a row to view details)"]
        }), /* @__PURE__ */ jsx("hr", {
          style: {
            margin: "15px 0"
          }
        })]
      }) : /* @__PURE__ */ jsx("h2", {
        children: "* Select the info icon to view bucket details of each table."
      }), tableName && /* @__PURE__ */ jsx(Fragment, {
        children: infoData.length ? /* @__PURE__ */ jsx(ReactTable, {
          data: infoData,
          columns: infoColumns,
          initialPageSize: 10,
          infoParams: false
        }) : /* @__PURE__ */ jsx("div", {})
      })]
    })]
  });
}
function K2VerifyTaskHistoryDetailed() {
  var _a, _b, _c, _d;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    taskId: taskIdParam,
    executionId: executionIdParam
  } = useParams();
  const rawTaskId = (_b = (_a = location.state && location.state.task_id) != null ? _a : taskIdParam) != null ? _b : "";
  const rawExecutionId = (_d = (_c = location.state && location.state.execution_id) != null ? _c : executionIdParam) != null ? _d : "";
  const decodedTaskId = react.exports.useMemo(() => {
    try {
      return rawTaskId ? decodeURIComponent(String(rawTaskId)) : "";
    } catch {
      return String(rawTaskId || "");
    }
  }, [rawTaskId]);
  const decodedExecutionId = react.exports.useMemo(() => {
    try {
      return rawExecutionId ? decodeURIComponent(String(rawExecutionId)) : "";
    } catch {
      return String(rawExecutionId || "");
    }
  }, [rawExecutionId]);
  const columns = [{
    header: "Table Name",
    accessorKey: "table_name",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Batch ID",
    accessorKey: "batch_id",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Start Time",
    accessorKey: "start_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "End Time",
    accessorKey: "end_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Bucket Completion Summary",
    accessorKey: "bucket_completion_summary",
    enableSorting: true,
    enableColumnFilter: true,
    size: 260
  }, {
    header: "Processed Records",
    accessorKey: "processed_records",
    enableSorting: true,
    enableColumnFilter: true,
    size: 202
  }, {
    header: "Failed Records",
    accessorKey: "failed_records",
    enableSorting: true,
    enableColumnFilter: true
  }];
  const infoColumns = react.exports.useMemo(() => [{
    header: "Bucket Id",
    accessorKey: "bucket_id",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Start Time",
    accessorKey: "start_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "End Time",
    accessorKey: "end_time",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Total Records",
    accessorKey: "total_records",
    enableSorting: true,
    enableColumnFilter: true,
    size: 202
  }, {
    header: "Processed Records",
    accessorKey: "processed_records",
    enableSorting: true,
    enableColumnFilter: true,
    size: 202
  }, {
    header: "Failed Records",
    accessorKey: "failed_records",
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Error Info",
    accessorKey: "error_info",
    enableSorting: true,
    enableColumnFilter: true
  }], []);
  const [taskHistoryData, setTaskHistoryData] = react.exports.useState([]);
  const [tableName, setTableName] = react.exports.useState("");
  const [infoData, setInfoData] = react.exports.useState([]);
  const [infoLoading, setInfoLoading] = react.exports.useState(false);
  const {
    fetchData: fetchTaskHistoryData,
    loading: fetchTaskHistoryLoading,
    error: taskHistoryError
  } = useFetchData(`/api/fabric-command?command=${encodeURIComponent(`broadway K2Verify.bwK2VerifyExecutionDetails task_id='${decodedTaskId}' execution_id='${decodedExecutionId}' RESULT_STRUCTURE=CURSOR`)}`);
  const bucketEndpoint = react.exports.useMemo(() => {
    if (!decodedTaskId || !decodedExecutionId || !tableName)
      return null;
    const safeTable = String(tableName).replace(/'/g, "''");
    return `/api/fabric-command?command=${encodeURIComponent(`broadway K2Verify.bwK2VerifyBucketDetails task_id='${decodedTaskId}' execution_id='${decodedExecutionId}' table_name='${safeTable}' RESULT_STRUCTURE=CURSOR`)}`;
  }, [decodedTaskId, decodedExecutionId, tableName]);
  const {
    fetchData: fetchBucketDetailsData,
    error: bucketError
  } = useFetchData(bucketEndpoint);
  react.exports.useEffect(() => {
    if (taskHistoryError) {
      toast.error(taskHistoryError.message || "Failed to load task execution history");
    }
  }, [taskHistoryError]);
  react.exports.useEffect(() => {
    (async () => {
      if (!decodedTaskId || !decodedExecutionId)
        return;
      const rows = await fetchTaskHistoryData();
      setTaskHistoryData(rows || []);
    })();
  }, [fetchTaskHistoryData, decodedTaskId, decodedExecutionId]);
  react.exports.useEffect(() => {
    if (bucketError) {
      toast.error(bucketError.message || "Failed to load bucket details");
    }
  }, [bucketError]);
  react.exports.useEffect(() => {
    let cancel = false;
    const run = async () => {
      if (!bucketEndpoint)
        return;
      setInfoLoading(true);
      try {
        const rows = await fetchBucketDetailsData();
        if (!cancel)
          setInfoData(rows || []);
      } catch (err) {
        if (!cancel)
          toast.error((err == null ? void 0 : err.message) || "Failed to load bucket details");
      } finally {
        if (!cancel)
          setInfoLoading(false);
      }
    };
    run();
    return () => {
      cancel = true;
    };
  }, [bucketEndpoint, fetchBucketDetailsData]);
  const handleInfoClick = react.exports.useCallback((row) => {
    var _a2, _b2, _c2;
    const name = (_c2 = (_b2 = (_a2 = row == null ? void 0 : row.original) == null ? void 0 : _a2.table_name) != null ? _b2 : row == null ? void 0 : row.table_name) != null ? _c2 : "";
    if (!name) {
      toast.error("No table_name found for this row");
      return;
    }
    if (name === tableName) {
      setTableName("");
      setInfoData([]);
      return;
    }
    setTableName(name);
    setInfoData([]);
  }, [tableName]);
  if (!decodedTaskId || !decodedExecutionId) {
    return /* @__PURE__ */ jsxs("div", {
      style: {
        padding: 24
      },
      children: [/* @__PURE__ */ jsx("h1", {
        children: "Task Execution Details"
      }), !decodedTaskId && /* @__PURE__ */ jsx("p", {
        children: "Missing task id."
      }), !decodedExecutionId && /* @__PURE__ */ jsx("p", {
        children: "Missing execution id."
      }), /* @__PURE__ */ jsx("button", {
        onClick: () => navigate(-1),
        children: "Go Back"
      })]
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    style: {
      marginBottom: "45px",
      marginLeft: "30px",
      marginRight: "30px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "24px"
    },
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      position: "top-right",
      autoClose: 5e3,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      children: /* @__PURE__ */ jsxs("h1", {
        children: ["K2Verify Execution Details \u2014 Task ID: ", decodedTaskId, ", Execution ID: ", decodedExecutionId]
      })
    }), /* @__PURE__ */ jsx("hr", {
      style: {
        margin: "15px 0",
        border: "1px solid #EAEAEA",
        color: "#EAEAEA"
      }
    }), /* @__PURE__ */ jsx(ReactTable, {
      data: taskHistoryData,
      columns,
      loading: fetchTaskHistoryLoading,
      initialPageSize: 10,
      infoParams: true,
      onInfoClick: handleInfoClick
    }), /* @__PURE__ */ jsx("div", {
      style: {
        marginTop: "24px",
        padding: "16px"
      },
      children: tableName ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsxs("h2", {
          style: {
            marginTop: 0
          },
          children: ["Bucket Details \u2014 Table: ", tableName]
        }), /* @__PURE__ */ jsx("hr", {
          style: {
            margin: "15px 0"
          }
        }), infoLoading ? /* @__PURE__ */ jsx("div", {}) : infoData.length ? /* @__PURE__ */ jsx(ReactTable, {
          data: infoData,
          columns: infoColumns,
          initialPageSize: 10,
          infoParams: false
        }) : /* @__PURE__ */ jsx("div", {
          style: {
            fontSize: 14,
            color: "#777"
          },
          children: "No bucket rows found."
        })]
      }) : /* @__PURE__ */ jsx("h2", {
        style: {
          marginTop: 0
        },
        children: "* Select the info icon to view bucket details of each table."
      })
    })]
  });
}
function K2VerifyTaskResults() {
  const navigate = useNavigate();
  const columns = [{
    header: "Execution Id",
    accessorKey: "execution_id",
    size: 151,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      row,
      value
    }) => /* @__PURE__ */ jsx(Link, {
      to: `/results/${value}`,
      style: {
        color: "#1483F3",
        textDecoration: "none"
      },
      state: row.original,
      children: value
    })
  }, {
    header: "Task Id",
    accessorKey: "task_id",
    size: 120,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Task Name",
    accessorKey: "task_name",
    size: 195,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Execution Result",
    accessorKey: "execution_result",
    size: 117,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      value
    }) => /* @__PURE__ */ jsx("span", {
      style: {
        color: (value == null ? void 0 : value.toLowerCase()) === "failed" ? "red" : (value == null ? void 0 : value.toLowerCase()) === "completed" ? "green" : "black",
        fontWeight: 500
      },
      children: value
    })
  }, {
    header: "Start Time",
    accessorKey: "start_time",
    size: 200,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "End Time",
    accessorKey: "end_time",
    size: 200,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Source Interface",
    accessorKey: "source_interface",
    size: 186,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Target Interface",
    accessorKey: "target_interface",
    size: 183,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Total Tables",
    accessorKey: "total_tables",
    size: 148,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Total Tables Failed",
    accessorKey: "total_tables_failed",
    size: 188,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      value
    }) => /* @__PURE__ */ jsx("span", {
      style: {
        color: value > 0 ? "red" : "inherit"
      },
      children: value
    })
  }, {
    header: "Non-Pass Count",
    accessorKey: "non_pass_count",
    size: 180,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Non-Pass Rate (%)",
    accessorKey: "percent_records_failed",
    size: 187,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      value
    }) => value != null ? /* @__PURE__ */ jsxs("span", {
      style: {
        color: value > 0 ? "red" : "inherit"
      },
      children: [value, "%"]
    }) : ""
  }];
  const [taskHistoryData, setTaskHistoryData] = react.exports.useState([]);
  const {
    fetchData: fetchTaskHistoryData,
    loading: taskHistoryLoading,
    error: taskHistoryError
  } = useFetchData(`/api/fabric-command?command=${encodeURIComponent(`broadway K2Verify.bwK2VerifyExecutionHistoryAll RESULT_STRUCTURE=CURSOR`)}`);
  react.exports.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await fetchTaskHistoryData();
        if (!alive)
          return;
        if (Array.isArray(rows)) {
          setTaskHistoryData(rows);
        } else {
          setTaskHistoryData([]);
        }
      } catch (err) {
        toast.error((err == null ? void 0 : err.message) || "Failed to load task execution history");
      }
    })();
    return () => {
      alive = false;
    };
  }, [fetchTaskHistoryData]);
  react.exports.useEffect(() => {
    if (taskHistoryError) {
      toast.error(taskHistoryError.message || "Failed to load task execution history");
    }
  }, [taskHistoryError]);
  return /* @__PURE__ */ jsxs("div", {
    style: {
      marginBottom: "45px",
      marginLeft: "30px",
      marginRight: "30px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "24px"
    },
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      position: "top-right",
      autoClose: 5e3,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      children: /* @__PURE__ */ jsx("h1", {
        children: "K2Verify Task Execution Results "
      })
    }), /* @__PURE__ */ jsx("hr", {
      style: {
        margin: "15px 0",
        border: "1px solid #EAEAEA",
        color: "#EAEAEA"
      }
    }), /* @__PURE__ */ jsx(ReactTable, {
      data: taskHistoryData,
      columns,
      initialPageSize: 10,
      loading: taskHistoryLoading
    })]
  });
}
function ResultsHeader({
  executionResult,
  statusColor,
  taskId,
  taskName,
  executionId,
  startTime,
  endTime,
  totalTables,
  failedTables,
  percentFailed
}) {
  return /* @__PURE__ */ jsx("div", {
    style: {
      marginBottom: "45px",
      marginLeft: "30px",
      marginRight: "30px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "24px"
    },
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          alignItems: "center",
          marginBottom: "8px"
        },
        children: [/* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("h1", {
            style: {
              color: statusColor,
              margin: 0
            },
            children: executionResult
          })
        }), /* @__PURE__ */ jsx("div", {
          style: {
            textAlign: "center"
          },
          children: /* @__PURE__ */ jsxs("h2", {
            style: {
              margin: 0
            },
            children: ["Task #", taskId, " ", taskName, " - execution #", executionId]
          })
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            textAlign: "center",
            color: "#555"
          },
          children: ["Start Time: ", startTime, ", End Time: ", endTime || "Not available"]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        style: {
          display: "flex",
          gap: "20px",
          marginTop: "40px"
        },
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h3", {
            style: {
              display: "inline-block"
            },
            children: "Total Tables:"
          }), " ", totalTables]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h3", {
            style: {
              display: "inline-block"
            },
            children: "Failed Tables:"
          }), " ", failedTables]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h3", {
            style: {
              display: "inline-block"
            },
            children: "Total records failed %:"
          }), " ", /* @__PURE__ */ jsxs("span", {
            style: {
              color: percentFailed > 0 ? "red" : "inherit"
            },
            children: [percentFailed, "%"]
          })]
        })]
      })]
    })
  });
}
function K2VerifyResultsDetailed() {
  var _a;
  const {
    state
  } = useLocation();
  console.log(state);
  if (!state) {
    return /* @__PURE__ */ jsxs("div", {
      style: {
        margin: "30px",
        padding: "24px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */ jsx("h2", {
        children: "No data available"
      }), /* @__PURE__ */ jsx("p", {
        children: "This page was opened without execution context."
      })]
    });
  }
  const executionId = state.execution_id;
  const failedTables = state.total_tables_failed;
  const statusColor = ((_a = state.execution_result) == null ? void 0 : _a.toLowerCase()) === "failed" ? "red" : "green";
  const [selectedRow, setSelectedRow] = react.exports.useState({
    rowIndex: null,
    metricKeys: []
  });
  const [tableSummaryData, setTableSummaryData] = react.exports.useState([]);
  const {
    fetchData: fetchTableSummaryData,
    loading: tableSummaryLoading,
    error: tableSummaryError
  } = useFetchData(`/api/fabric-command?command=${encodeURIComponent(`broadway K2Verify.bwK2VerifyResultTables execution_id=${executionId} RESULT_STRUCTURE=CURSOR`)}`);
  const [columnLevelData, setColumnLevelData] = react.exports.useState([]);
  const [columnLevelLoading, setColumnLevelLoading] = react.exports.useState(false);
  const [columnLevelError, setColumnLevelError] = react.exports.useState(null);
  const fetchColumnLevelData = async (sourceTableName) => {
    setColumnLevelLoading(true);
    setColumnLevelError(null);
    try {
      const command = `broadway K2Verify.bwK2VerifyResultColumns source_table_name=${sourceTableName} execution_id=${executionId} RESULT_STRUCTURE=CURSOR`;
      const url = `/api/fabric-command?command=${encodeURIComponent(command)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data2 = await response.json();
      setColumnLevelData(Array.isArray(data2) ? data2 : []);
    } catch (err) {
      const errorMsg = (err == null ? void 0 : err.message) || "Failed to load column level data";
      setColumnLevelError(errorMsg);
      toast.error(errorMsg);
      setColumnLevelData([]);
    } finally {
      setColumnLevelLoading(false);
    }
  };
  const [recordDetailsData, setRecordDetailsData] = react.exports.useState([]);
  const [recordDetailsLoading, setRecordDetailsLoading] = react.exports.useState(false);
  const [recordDetailsError, setRecordDetailsError] = react.exports.useState(null);
  const fetchRecordDetails = async (sourceTableName, metricKeys) => {
    if (!sourceTableName || !metricKeys || metricKeys.length === 0) {
      setRecordDetailsData([]);
      return;
    }
    setRecordDetailsLoading(true);
    setRecordDetailsError(null);
    try {
      const metricsParam = metricKeys.join(",");
      const command = `broadway K2Verify.bwK2VerifyResultRecordDetails source_table_name='${sourceTableName}' execution_id='${executionId}' selected_metrics='${metricsParam}' RESULT_STRUCTURE=CURSOR`;
      const url = `/api/fabric-command?command=${encodeURIComponent(command)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data2 = await response.json();
      setRecordDetailsData(Array.isArray(data2) ? data2 : []);
    } catch (err) {
      const errorMsg = (err == null ? void 0 : err.message) || "Failed to load record details";
      setRecordDetailsError(errorMsg);
      toast.error(errorMsg);
      setRecordDetailsData([]);
    } finally {
      setRecordDetailsLoading(false);
    }
  };
  const handleCellClick = (rowIndex, metricKey) => {
    setSelectedRow((prev) => {
      let nextState;
      if (prev.rowIndex !== rowIndex) {
        nextState = {
          rowIndex,
          metricKeys: [metricKey]
        };
        const rowData = tableSummaryData[rowIndex];
        if (rowData == null ? void 0 : rowData.source_table_name) {
          fetchColumnLevelData(rowData.source_table_name);
          fetchRecordDetails(rowData.source_table_name, [metricKey]);
        }
      } else {
        const alreadySelected = prev.metricKeys.includes(metricKey);
        if (alreadySelected) {
          const newMetrics = prev.metricKeys.filter((m2) => m2 !== metricKey);
          if (newMetrics.length === 0) {
            nextState = {
              rowIndex: null,
              metricKeys: []
            };
            setColumnLevelData([]);
            setRecordDetailsData([]);
          } else {
            nextState = {
              rowIndex,
              metricKeys: newMetrics
            };
            const rowData = tableSummaryData[rowIndex];
            if (rowData == null ? void 0 : rowData.source_table_name) {
              fetchRecordDetails(rowData.source_table_name, newMetrics);
            }
          }
        } else {
          nextState = {
            rowIndex,
            metricKeys: [...prev.metricKeys, metricKey]
          };
          const rowData = tableSummaryData[rowIndex];
          if (rowData == null ? void 0 : rowData.source_table_name) {
            fetchRecordDetails(rowData.source_table_name, nextState.metricKeys);
          }
        }
      }
      console.log("Button clicked:", {
        clickedRowIndex: rowIndex,
        clickedMetric: metricKey,
        selectedState: nextState
      });
      return nextState;
    });
  };
  react.exports.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await fetchTableSummaryData();
        if (!alive)
          return;
        setTableSummaryData(Array.isArray(rows) ? rows : []);
      } catch (err) {
        toast.error((err == null ? void 0 : err.message) || "Failed to load table level summary");
      }
    })();
    return () => {
      alive = false;
    };
  }, [fetchTableSummaryData]);
  react.exports.useEffect(() => {
    if (tableSummaryError) {
      toast.error(tableSummaryError.message || "Failed to load table level summary");
    }
  }, [tableSummaryError]);
  const columnLevelColumns = [{
    header: "Column Name",
    accessorKey: "column_name",
    size: 200,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Total Failed",
    accessorKey: "total_failed",
    size: 150,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      value
    }) => /* @__PURE__ */ jsx("span", {
      style: {
        color: value > 0 ? "red" : "green",
        fontWeight: 500
      },
      children: value
    })
  }];
  const recordDetailsColumns = [{
    header: "Customized Key",
    accessorKey: "customized_key",
    size: 250,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Column Name",
    accessorKey: "column_name",
    size: 180,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Match Result",
    accessorKey: "match_result",
    size: 150,
    enableSorting: true,
    enableColumnFilter: true,
    cell: ({
      value
    }) => /* @__PURE__ */ jsx("span", {
      style: {
        color: (value == null ? void 0 : value.toLowerCase()) === "passed" ? "green" : "red",
        fontWeight: 500
      },
      children: value
    })
  }, {
    header: "Source Column Value",
    accessorKey: "source_column_value",
    size: 200,
    enableSorting: true,
    enableColumnFilter: true
  }, {
    header: "Target Column Value",
    accessorKey: "target_column_value",
    size: 200,
    enableSorting: true,
    enableColumnFilter: true
  }];
  const tableColumns = [
    {
      header: "Source Table",
      accessorKey: "source_table_name",
      size: 150,
      enableSorting: true,
      enableColumnFilter: true
    },
    {
      header: "Target Table",
      accessorKey: "target_table_name",
      size: 150,
      enableSorting: true,
      enableColumnFilter: true
    },
    {
      header: "Result",
      accessorKey: "result",
      size: 150,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({
        value
      }) => /* @__PURE__ */ jsx("span", {
        style: {
          color: (value == null ? void 0 : value.toLowerCase()) === "passed" ? "green" : "red",
          fontWeight: 500
        },
        children: value
      })
    },
    {
      header: "Start Time",
      accessorKey: "start_time",
      size: 150,
      enableSorting: true,
      enableColumnFilter: true
    },
    {
      header: "End Time",
      accessorKey: "end_time",
      size: 150,
      enableSorting: true,
      enableColumnFilter: true
    },
    {
      header: "Total Records",
      accessorKey: "total_records",
      size: 178,
      enableSorting: true,
      enableColumnFilter: true
    },
    {
      header: "Records Passed %",
      accessorKey: "records_passed_pct",
      size: 211,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({
        value
      }) => value != null ? /* @__PURE__ */ jsxs("span", {
        style: {
          color: value > 0 ? "green" : "inherit"
        },
        children: [value, "%"]
      }) : ""
    },
    {
      header: "Records Only in Source",
      accessorKey: "records_only_in_source",
      size: 219,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({
        value,
        row
      }) => {
        const isSelected = selectedRow.rowIndex === row.index && selectedRow.metricKeys.includes("records_only_in_source");
        return /* @__PURE__ */ jsx("button", {
          type: "button",
          onClick: () => handleCellClick(row.index, "records_only_in_source"),
          style: {
            padding: "4px 10px",
            borderRadius: "4px",
            border: isSelected ? "2px solid #cc5500" : "1px solid #e69500",
            backgroundColor: isSelected ? "#ffb347" : "#FF5C00",
            color: "white",
            cursor: "pointer"
          },
          children: value
        });
      }
    },
    {
      header: "Records Only in Target",
      accessorKey: "records_only_in_target",
      size: 212,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({
        value,
        row
      }) => {
        const isSelected = selectedRow.rowIndex === row.index && selectedRow.metricKeys.includes("records_only_in_target");
        return /* @__PURE__ */ jsx("button", {
          type: "button",
          onClick: () => handleCellClick(row.index, "records_only_in_target"),
          style: {
            padding: "4px 10px",
            borderRadius: "4px",
            border: isSelected ? "2px solid #cc5500" : "1px solid #e69500",
            backgroundColor: isSelected ? "#ffb347" : "#FF5C00",
            color: "white",
            cursor: "pointer"
          },
          children: value
        });
      }
    },
    {
      header: "Mismatched Records",
      accessorKey: "mismatched_records",
      size: 212,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({
        value,
        row
      }) => {
        const isSelected = selectedRow.rowIndex === row.index && selectedRow.metricKeys.includes("mismatched_records");
        return /* @__PURE__ */ jsx("button", {
          type: "button",
          onClick: () => handleCellClick(row.index, "mismatched_records"),
          style: {
            padding: "4px 10px",
            borderRadius: "4px",
            border: isSelected ? "2px solid #cc5500" : "1px solid #e69500",
            backgroundColor: isSelected ? "#ffb347" : "#FF5C00",
            color: "white",
            cursor: "pointer"
          },
          children: value
        });
      }
    },
    {
      header: "Total Fields",
      accessorKey: "total_fields",
      size: 138,
      enableSorting: true,
      enableColumnFilter: true
    },
    {
      header: "Fields Passed %",
      accessorKey: "fields_passed_pct",
      size: 203,
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({
        value
      }) => value != null ? /* @__PURE__ */ jsxs("span", {
        style: {
          color: value > 0 ? "green" : "inherit"
        },
        children: [value, "%"]
      }) : ""
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(ToastContainer, {
      position: "top-right",
      autoClose: 5e3,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    }), /* @__PURE__ */ jsx(ResultsHeader, {
      executionResult: state.execution_result,
      statusColor,
      taskId: state.task_id,
      taskName: state.task_name,
      executionId: state.execution_id,
      startTime: state.start_time,
      endTime: state.end_time,
      totalTables: state.total_tables,
      failedTables,
      percentFailed: state.percent_records_failed
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        marginBottom: "45px",
        marginLeft: "30px",
        marginRight: "30px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "24px"
      },
      children: [/* @__PURE__ */ jsx("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: /* @__PURE__ */ jsx("h1", {
          children: "Table Level Summary"
        })
      }), /* @__PURE__ */ jsx("hr", {
        style: {
          margin: "15px 0",
          border: "1px solid #EAEAEA",
          color: "#EAEAEA"
        }
      }), /* @__PURE__ */ jsx(ReactTable, {
        data: tableSummaryData,
        columns: tableColumns,
        initialPageSize: 10,
        loading: tableSummaryLoading
      })]
    }), /* @__PURE__ */ jsx("div", {
      style: {
        marginBottom: "45px",
        marginLeft: "30px",
        marginRight: "30px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "24px"
      },
      children: /* @__PURE__ */ jsxs("div", {
        style: {
          display: "flex",
          gap: "20px"
        },
        children: [/* @__PURE__ */ jsxs("div", {
          style: {
            width: "30%",
            padding: "12px"
          },
          children: [/* @__PURE__ */ jsx("h3", {
            style: {
              marginBottom: "15px"
            },
            children: "Column Level Summary"
          }), selectedRow.rowIndex !== null && tableSummaryData[selectedRow.rowIndex] ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsxs("p", {
              style: {
                fontSize: "14px",
                color: "#666",
                marginBottom: "10px"
              },
              children: ["Table: ", /* @__PURE__ */ jsx("strong", {
                children: tableSummaryData[selectedRow.rowIndex].source_table_name
              })]
            }), /* @__PURE__ */ jsx("hr", {
              style: {
                margin: "10px 0",
                border: "0.5px solid #ddd"
              }
            }), /* @__PURE__ */ jsx(ReactTable, {
              data: columnLevelData,
              columns: columnLevelColumns,
              initialPageSize: 5,
              loading: columnLevelLoading
            })]
          }) : /* @__PURE__ */ jsx("p", {
            style: {
              fontSize: "14px",
              color: "#999",
              fontStyle: "italic"
            },
            children: "Click on a metric button in the table above to view column-level details"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            width: "70%",
            padding: "12px"
          },
          children: [/* @__PURE__ */ jsx("h3", {
            style: {
              marginBottom: "15px"
            },
            children: "Record Details"
          }), selectedRow.rowIndex !== null && selectedRow.metricKeys.length > 0 && tableSummaryData[selectedRow.rowIndex] ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsxs("p", {
              style: {
                fontSize: "14px",
                color: "#666",
                marginBottom: "10px"
              },
              children: ["Table: ", /* @__PURE__ */ jsx("strong", {
                children: tableSummaryData[selectedRow.rowIndex].source_table_name
              }), /* @__PURE__ */ jsx("br", {})]
            }), /* @__PURE__ */ jsx("hr", {
              style: {
                margin: "10px 0",
                border: "0.5px solid #ddd"
              }
            }), /* @__PURE__ */ jsx(ReactTable, {
              data: recordDetailsData,
              columns: recordDetailsColumns,
              initialPageSize: 5,
              loading: recordDetailsLoading
            })]
          }) : /* @__PURE__ */ jsx("p", {
            style: {
              fontSize: "14px",
              color: "#999",
              fontStyle: "italic"
            },
            children: "Select metrics from the table above to view detailed records"
          })]
        })]
      })
    })]
  });
}
function Breadcrumb({
  homeTo = "/tasks",
  homeLabel = "Home"
}) {
  const {
    pathname
  } = useLocation();
  const [searchParams] = useSearchParams();
  const segments = react.exports.useMemo(() => pathname.split("/").filter(Boolean), [pathname]);
  const crumbs = react.exports.useMemo(() => {
    const c = [];
    if (segments.length === 1 && segments[0] === "tasks") {
      c.push({
        to: "/tasks",
        label: "Tasks"
      });
    } else if (segments.length === 2 && segments[0] === "history") {
      const taskId = decodeURIComponent(segments[1]);
      c.push({
        to: "/tasks",
        label: "Tasks"
      });
      c.push({
        to: `/history/${taskId}`,
        label: `Task Execution History: Task Id ${taskId}`
      });
    } else if (segments.length === 4 && segments[0] === "history" && segments[2] === "detailed") {
      const taskId = decodeURIComponent(segments[1]);
      const executionId = decodeURIComponent(segments[3]);
      c.push({
        to: "/tasks",
        label: "Tasks"
      });
      c.push({
        to: `/history/${taskId}`,
        label: `Task Execution History: Task Id ${taskId}`
      });
      c.push({
        to: `/history/${taskId}/detailed/${executionId}`,
        label: `Task Execution History Detailed: Execution Id ${executionId}`
      });
    } else if (segments.length === 2 && segments[0] === "execution") {
      const taskId = decodeURIComponent(segments[1]);
      c.push({
        to: "/tasks",
        label: "Tasks"
      });
      c.push({
        to: `/execution/${taskId}`,
        label: `Active Task Execution: Task Id ${taskId}`
      });
    } else if (segments.length === 1 && segments[0] === "results") {
      c.push({
        to: "/results",
        label: "Results"
      });
    } else if (segments.length === 2 && segments[0] === "results") {
      const executionId = decodeURIComponent(segments[1]);
      c.push({
        to: "/results",
        label: "Results"
      });
      c.push({
        to: `/results/${executionId}`,
        label: `Results for Task Execution Id ${executionId}`
      });
    } else {
      if (segments[0])
        c.push({
          to: "/tasks",
          label: "Tasks"
        });
    }
    if (c.length)
      c[c.length - 1].isLast = true;
    return c;
  }, [segments]);
  const hasSearch = !searchParams.entries().next().done;
  return /* @__PURE__ */ jsx("div", {
    className: "breadcrumb-custom",
    style: {
      padding: "0 30px"
    },
    children: /* @__PURE__ */ jsxs("ul", {
      className: "k2-breadcrumb",
      children: [/* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: homeTo,
          children: homeLabel
        })
      }, "home"), crumbs.map(({
        to,
        label,
        isLast
      }) => /* @__PURE__ */ jsx("li", {
        children: isLast ? /* @__PURE__ */ jsx("span", {
          "aria-current": "page",
          children: label
        }) : /* @__PURE__ */ jsx(Link, {
          to,
          children: label
        })
      }, `${to}-${label}`)), hasSearch && /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx("span", {
          children: "Results"
        })
      }, "results")]
    })
  });
}
var App$1 = "";
var k2 = "";
function App() {
  const navigate = useNavigate();
  react.exports.useEffect(() => {
    window.k2api = window.k2api || window.parent.k2api;
    window.k2api.registerNavigateTo((path) => {
      navigate(path);
      return true;
    });
    window.k2api.setNavigationMenu([{
      name: "Tasks",
      path: "/tasks"
    }, {
      name: "Results",
      path: "/results"
    }]);
  }, [navigate]);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-[#cccccc] pt-[30px] px-[30px] pb-[45px]",
    children: [/* @__PURE__ */ jsx(Breadcrumb, {}), /* @__PURE__ */ jsxs(Routes, {
      children: [/* @__PURE__ */ jsx(Route, {
        path: "/",
        element: /* @__PURE__ */ jsx(Navigate, {
          to: "/tasks",
          replace: true
        })
      }), /* @__PURE__ */ jsx(Route, {
        path: "/tasks",
        element: /* @__PURE__ */ jsx(K2VerifyHomePage, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/task",
        element: /* @__PURE__ */ jsx(K2VerifyTaskCreation, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/history/:taskId",
        element: /* @__PURE__ */ jsx(K2VerifyTaskHistory, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/execution/:taskId",
        element: /* @__PURE__ */ jsx(K2VerifyExecution, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/results",
        element: /* @__PURE__ */ jsx(K2VerifyTaskResults, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/results/:executionId",
        element: /* @__PURE__ */ jsx(K2VerifyResultsDetailed, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "/history/:taskId/detailed/:executionId",
        element: /* @__PURE__ */ jsx(K2VerifyTaskHistoryDetailed, {})
      }), /* @__PURE__ */ jsx(Route, {
        path: "*",
        element: /* @__PURE__ */ jsx(K2VerifyHomePage, {})
      })]
    })]
  });
}
client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx(React.StrictMode, {
  children: /* @__PURE__ */ jsx(BrowserRouter, {
    children: /* @__PURE__ */ jsx(App, {})
  })
}));
