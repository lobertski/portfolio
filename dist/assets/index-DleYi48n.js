(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) a(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const s of l.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && a(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function a(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = n(i);
    fetch(i.href, l);
  }
})();
var Wh = { exports: {} },
  qs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Lg = Symbol.for("react.transitional.element"),
  Hg = Symbol.for("react.fragment");
function Ih(t, e, n) {
  var a = null;
  if (
    (n !== void 0 && (a = "" + n),
    e.key !== void 0 && (a = "" + e.key),
    "key" in e)
  ) {
    n = {};
    for (var i in e) i !== "key" && (n[i] = e[i]);
  } else n = e;
  return (
    (e = n.ref),
    { $$typeof: Lg, type: t, key: a, ref: e !== void 0 ? e : null, props: n }
  );
}
qs.Fragment = Hg;
qs.jsx = Ih;
qs.jsxs = Ih;
Wh.exports = qs;
var g = Wh.exports,
  tm = { exports: {} },
  Ys = {},
  em = { exports: {} },
  nm = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (t) {
  function e(z, R) {
    var O = z.length;
    z.push(R);
    t: for (; 0 < O; ) {
      var $ = (O - 1) >>> 1,
        lt = z[$];
      if (0 < i(lt, R)) ((z[$] = R), (z[O] = lt), (O = $));
      else break t;
    }
  }
  function n(z) {
    return z.length === 0 ? null : z[0];
  }
  function a(z) {
    if (z.length === 0) return null;
    var R = z[0],
      O = z.pop();
    if (O !== R) {
      z[0] = O;
      t: for (var $ = 0, lt = z.length, pl = lt >>> 1; $ < pl; ) {
        var yl = 2 * ($ + 1) - 1,
          fu = z[yl],
          En = yl + 1,
          gl = z[En];
        if (0 > i(fu, O))
          En < lt && 0 > i(gl, fu)
            ? ((z[$] = gl), (z[En] = O), ($ = En))
            : ((z[$] = fu), (z[yl] = O), ($ = yl));
        else if (En < lt && 0 > i(gl, O)) ((z[$] = gl), (z[En] = O), ($ = En));
        else break t;
      }
    }
    return R;
  }
  function i(z, R) {
    var O = z.sortIndex - R.sortIndex;
    return O !== 0 ? O : z.id - R.id;
  }
  if (
    ((t.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var l = performance;
    t.unstable_now = function () {
      return l.now();
    };
  } else {
    var s = Date,
      u = s.now();
    t.unstable_now = function () {
      return s.now() - u;
    };
  }
  var o = [],
    r = [],
    c = 1,
    f = null,
    d = 3,
    m = !1,
    b = !1,
    S = !1,
    A = !1,
    p = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    y = typeof setImmediate < "u" ? setImmediate : null;
  function v(z) {
    for (var R = n(r); R !== null; ) {
      if (R.callback === null) a(r);
      else if (R.startTime <= z)
        (a(r), (R.sortIndex = R.expirationTime), e(o, R));
      else break;
      R = n(r);
    }
  }
  function x(z) {
    if (((S = !1), v(z), !b))
      if (n(o) !== null) ((b = !0), C || ((C = !0), yt()));
      else {
        var R = n(r);
        R !== null && ml(x, R.startTime - z);
      }
  }
  var C = !1,
    E = -1,
    D = 5,
    N = -1;
  function j() {
    return A ? !0 : !(t.unstable_now() - N < D);
  }
  function U() {
    if (((A = !1), C)) {
      var z = t.unstable_now();
      N = z;
      var R = !0;
      try {
        t: {
          ((b = !1), S && ((S = !1), h(E), (E = -1)), (m = !0));
          var O = d;
          try {
            e: {
              for (
                v(z), f = n(o);
                f !== null && !(f.expirationTime > z && j());
              ) {
                var $ = f.callback;
                if (typeof $ == "function") {
                  ((f.callback = null), (d = f.priorityLevel));
                  var lt = $(f.expirationTime <= z);
                  if (((z = t.unstable_now()), typeof lt == "function")) {
                    ((f.callback = lt), v(z), (R = !0));
                    break e;
                  }
                  (f === n(o) && a(o), v(z));
                } else a(o);
                f = n(o);
              }
              if (f !== null) R = !0;
              else {
                var pl = n(r);
                (pl !== null && ml(x, pl.startTime - z), (R = !1));
              }
            }
            break t;
          } finally {
            ((f = null), (d = O), (m = !1));
          }
          R = void 0;
        }
      } finally {
        R ? yt() : (C = !1);
      }
    }
  }
  var yt;
  if (typeof y == "function")
    yt = function () {
      y(U);
    };
  else if (typeof MessageChannel < "u") {
    var dl = new MessageChannel(),
      hl = dl.port2;
    ((dl.port1.onmessage = U),
      (yt = function () {
        hl.postMessage(null);
      }));
  } else
    yt = function () {
      p(U, 0);
    };
  function ml(z, R) {
    E = p(function () {
      z(t.unstable_now());
    }, R);
  }
  ((t.unstable_IdlePriority = 5),
    (t.unstable_ImmediatePriority = 1),
    (t.unstable_LowPriority = 4),
    (t.unstable_NormalPriority = 3),
    (t.unstable_Profiling = null),
    (t.unstable_UserBlockingPriority = 2),
    (t.unstable_cancelCallback = function (z) {
      z.callback = null;
    }),
    (t.unstable_forceFrameRate = function (z) {
      0 > z || 125 < z
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (D = 0 < z ? Math.floor(1e3 / z) : 5);
    }),
    (t.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (t.unstable_next = function (z) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = d;
      }
      var O = d;
      d = R;
      try {
        return z();
      } finally {
        d = O;
      }
    }),
    (t.unstable_requestPaint = function () {
      A = !0;
    }),
    (t.unstable_runWithPriority = function (z, R) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var O = d;
      d = z;
      try {
        return R();
      } finally {
        d = O;
      }
    }),
    (t.unstable_scheduleCallback = function (z, R, O) {
      var $ = t.unstable_now();
      switch (
        (typeof O == "object" && O !== null
          ? ((O = O.delay), (O = typeof O == "number" && 0 < O ? $ + O : $))
          : (O = $),
        z)
      ) {
        case 1:
          var lt = -1;
          break;
        case 2:
          lt = 250;
          break;
        case 5:
          lt = 1073741823;
          break;
        case 4:
          lt = 1e4;
          break;
        default:
          lt = 5e3;
      }
      return (
        (lt = O + lt),
        (z = {
          id: c++,
          callback: R,
          priorityLevel: z,
          startTime: O,
          expirationTime: lt,
          sortIndex: -1,
        }),
        O > $
          ? ((z.sortIndex = O),
            e(r, z),
            n(o) === null &&
              z === n(r) &&
              (S ? (h(E), (E = -1)) : (S = !0), ml(x, O - $)))
          : ((z.sortIndex = lt),
            e(o, z),
            b || m || ((b = !0), C || ((C = !0), yt()))),
        z
      );
    }),
    (t.unstable_shouldYield = j),
    (t.unstable_wrapCallback = function (z) {
      var R = d;
      return function () {
        var O = d;
        d = R;
        try {
          return z.apply(this, arguments);
        } finally {
          d = O;
        }
      };
    }));
})(nm);
em.exports = nm;
var qg = em.exports,
  am = { exports: {} },
  V = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tr = Symbol.for("react.transitional.element"),
  Yg = Symbol.for("react.portal"),
  Gg = Symbol.for("react.fragment"),
  Xg = Symbol.for("react.strict_mode"),
  Qg = Symbol.for("react.profiler"),
  Kg = Symbol.for("react.consumer"),
  Zg = Symbol.for("react.context"),
  kg = Symbol.for("react.forward_ref"),
  Jg = Symbol.for("react.suspense"),
  Fg = Symbol.for("react.memo"),
  im = Symbol.for("react.lazy"),
  Pg = Symbol.for("react.activity"),
  lf = Symbol.iterator;
function $g(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (lf && t[lf]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var lm = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  sm = Object.assign,
  um = {};
function qa(t, e, n) {
  ((this.props = t),
    (this.context = e),
    (this.refs = um),
    (this.updater = n || lm));
}
qa.prototype.isReactComponent = {};
qa.prototype.setState = function (t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, t, e, "setState");
};
qa.prototype.forceUpdate = function (t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function om() {}
om.prototype = qa.prototype;
function Ar(t, e, n) {
  ((this.props = t),
    (this.context = e),
    (this.refs = um),
    (this.updater = n || lm));
}
var Er = (Ar.prototype = new om());
Er.constructor = Ar;
sm(Er, qa.prototype);
Er.isPureReactComponent = !0;
var sf = Array.isArray;
function ro() {}
var tt = { H: null, A: null, T: null, S: null },
  rm = Object.prototype.hasOwnProperty;
function Mr(t, e, n) {
  var a = n.ref;
  return {
    $$typeof: Tr,
    type: t,
    key: e,
    ref: a !== void 0 ? a : null,
    props: n,
  };
}
function Wg(t, e) {
  return Mr(t.type, e, t.props);
}
function Dr(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Tr;
}
function Ig(t) {
  var e = { "=": "=0", ":": "=2" };
  return (
    "$" +
    t.replace(/[=:]/g, function (n) {
      return e[n];
    })
  );
}
var uf = /\/+/g;
function du(t, e) {
  return typeof t == "object" && t !== null && t.key != null
    ? Ig("" + t.key)
    : e.toString(36);
}
function tv(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (
        (typeof t.status == "string"
          ? t.then(ro, ro)
          : ((t.status = "pending"),
            t.then(
              function (e) {
                t.status === "pending" &&
                  ((t.status = "fulfilled"), (t.value = e));
              },
              function (e) {
                t.status === "pending" &&
                  ((t.status = "rejected"), (t.reason = e));
              },
            )),
        t.status)
      ) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
      }
  }
  throw t;
}
function In(t, e, n, a, i) {
  var l = typeof t;
  (l === "undefined" || l === "boolean") && (t = null);
  var s = !1;
  if (t === null) s = !0;
  else
    switch (l) {
      case "bigint":
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Tr:
          case Yg:
            s = !0;
            break;
          case im:
            return ((s = t._init), In(s(t._payload), e, n, a, i));
        }
    }
  if (s)
    return (
      (i = i(t)),
      (s = a === "" ? "." + du(t, 0) : a),
      sf(i)
        ? ((n = ""),
          s != null && (n = s.replace(uf, "$&/") + "/"),
          In(i, e, n, "", function (r) {
            return r;
          }))
        : i != null &&
          (Dr(i) &&
            (i = Wg(
              i,
              n +
                (i.key == null || (t && t.key === i.key)
                  ? ""
                  : ("" + i.key).replace(uf, "$&/") + "/") +
                s,
            )),
          e.push(i)),
      1
    );
  s = 0;
  var u = a === "" ? "." : a + ":";
  if (sf(t))
    for (var o = 0; o < t.length; o++)
      ((a = t[o]), (l = u + du(a, o)), (s += In(a, e, n, l, i)));
  else if (((o = $g(t)), typeof o == "function"))
    for (t = o.call(t), o = 0; !(a = t.next()).done; )
      ((a = a.value), (l = u + du(a, o++)), (s += In(a, e, n, l, i)));
  else if (l === "object") {
    if (typeof t.then == "function") return In(tv(t), e, n, a, i);
    throw (
      (e = String(t)),
      Error(
        "Objects are not valid as a React child (found: " +
          (e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  }
  return s;
}
function vl(t, e, n) {
  if (t == null) return t;
  var a = [],
    i = 0;
  return (
    In(t, a, "", "", function (l) {
      return e.call(n, l, i++);
    }),
    a
  );
}
function ev(t) {
  if (t._status === -1) {
    var e = t._result;
    ((e = e()),
      e.then(
        function (n) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 1), (t._result = n));
        },
        function (n) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 2), (t._result = n));
        },
      ),
      t._status === -1 && ((t._status = 0), (t._result = e)));
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var of =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var e = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(e)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        },
  nv = {
    map: vl,
    forEach: function (t, e, n) {
      vl(
        t,
        function () {
          e.apply(this, arguments);
        },
        n,
      );
    },
    count: function (t) {
      var e = 0;
      return (
        vl(t, function () {
          e++;
        }),
        e
      );
    },
    toArray: function (t) {
      return (
        vl(t, function (e) {
          return e;
        }) || []
      );
    },
    only: function (t) {
      if (!Dr(t))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return t;
    },
  };
V.Activity = Pg;
V.Children = nv;
V.Component = qa;
V.Fragment = Gg;
V.Profiler = Qg;
V.PureComponent = Ar;
V.StrictMode = Xg;
V.Suspense = Jg;
V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = tt;
V.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (t) {
    return tt.H.useMemoCache(t);
  },
};
V.cache = function (t) {
  return function () {
    return t.apply(null, arguments);
  };
};
V.cacheSignal = function () {
  return null;
};
V.cloneElement = function (t, e, n) {
  if (t == null)
    throw Error(
      "The argument must be a React element, but you passed " + t + ".",
    );
  var a = sm({}, t.props),
    i = t.key;
  if (e != null)
    for (l in (e.key !== void 0 && (i = "" + e.key), e))
      !rm.call(e, l) ||
        l === "key" ||
        l === "__self" ||
        l === "__source" ||
        (l === "ref" && e.ref === void 0) ||
        (a[l] = e[l]);
  var l = arguments.length - 2;
  if (l === 1) a.children = n;
  else if (1 < l) {
    for (var s = Array(l), u = 0; u < l; u++) s[u] = arguments[u + 2];
    a.children = s;
  }
  return Mr(t.type, i, a);
};
V.createContext = function (t) {
  return (
    (t = {
      $$typeof: Zg,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (t.Provider = t),
    (t.Consumer = { $$typeof: Kg, _context: t }),
    t
  );
};
V.createElement = function (t, e, n) {
  var a,
    i = {},
    l = null;
  if (e != null)
    for (a in (e.key !== void 0 && (l = "" + e.key), e))
      rm.call(e, a) &&
        a !== "key" &&
        a !== "__self" &&
        a !== "__source" &&
        (i[a] = e[a]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var u = Array(s), o = 0; o < s; o++) u[o] = arguments[o + 2];
    i.children = u;
  }
  if (t && t.defaultProps)
    for (a in ((s = t.defaultProps), s)) i[a] === void 0 && (i[a] = s[a]);
  return Mr(t, l, i);
};
V.createRef = function () {
  return { current: null };
};
V.forwardRef = function (t) {
  return { $$typeof: kg, render: t };
};
V.isValidElement = Dr;
V.lazy = function (t) {
  return { $$typeof: im, _payload: { _status: -1, _result: t }, _init: ev };
};
V.memo = function (t, e) {
  return { $$typeof: Fg, type: t, compare: e === void 0 ? null : e };
};
V.startTransition = function (t) {
  var e = tt.T,
    n = {};
  tt.T = n;
  try {
    var a = t(),
      i = tt.S;
    (i !== null && i(n, a),
      typeof a == "object" &&
        a !== null &&
        typeof a.then == "function" &&
        a.then(ro, of));
  } catch (l) {
    of(l);
  } finally {
    (e !== null && n.types !== null && (e.types = n.types), (tt.T = e));
  }
};
V.unstable_useCacheRefresh = function () {
  return tt.H.useCacheRefresh();
};
V.use = function (t) {
  return tt.H.use(t);
};
V.useActionState = function (t, e, n) {
  return tt.H.useActionState(t, e, n);
};
V.useCallback = function (t, e) {
  return tt.H.useCallback(t, e);
};
V.useContext = function (t) {
  return tt.H.useContext(t);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (t, e) {
  return tt.H.useDeferredValue(t, e);
};
V.useEffect = function (t, e) {
  return tt.H.useEffect(t, e);
};
V.useEffectEvent = function (t) {
  return tt.H.useEffectEvent(t);
};
V.useId = function () {
  return tt.H.useId();
};
V.useImperativeHandle = function (t, e, n) {
  return tt.H.useImperativeHandle(t, e, n);
};
V.useInsertionEffect = function (t, e) {
  return tt.H.useInsertionEffect(t, e);
};
V.useLayoutEffect = function (t, e) {
  return tt.H.useLayoutEffect(t, e);
};
V.useMemo = function (t, e) {
  return tt.H.useMemo(t, e);
};
V.useOptimistic = function (t, e) {
  return tt.H.useOptimistic(t, e);
};
V.useReducer = function (t, e, n) {
  return tt.H.useReducer(t, e, n);
};
V.useRef = function (t) {
  return tt.H.useRef(t);
};
V.useState = function (t) {
  return tt.H.useState(t);
};
V.useSyncExternalStore = function (t, e, n) {
  return tt.H.useSyncExternalStore(t, e, n);
};
V.useTransition = function () {
  return tt.H.useTransition();
};
V.version = "19.2.3";
am.exports = V;
var M = am.exports,
  cm = { exports: {} },
  Ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var av = M;
function fm(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n = 2; n < arguments.length; n++)
      e += "&args[]=" + encodeURIComponent(arguments[n]);
  }
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Ze() {}
var _t = {
    d: {
      f: Ze,
      r: function () {
        throw Error(fm(522));
      },
      D: Ze,
      C: Ze,
      L: Ze,
      m: Ze,
      X: Ze,
      S: Ze,
      M: Ze,
    },
    p: 0,
    findDOMNode: null,
  },
  iv = Symbol.for("react.portal");
function lv(t, e, n) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: iv,
    key: a == null ? null : "" + a,
    children: t,
    containerInfo: e,
    implementation: n,
  };
}
var di = av.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Gs(t, e) {
  if (t === "font") return "";
  if (typeof e == "string") return e === "use-credentials" ? e : "";
}
Ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _t;
Ot.createPortal = function (t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
    throw Error(fm(299));
  return lv(t, e, null, n);
};
Ot.flushSync = function (t) {
  var e = di.T,
    n = _t.p;
  try {
    if (((di.T = null), (_t.p = 2), t)) return t();
  } finally {
    ((di.T = e), (_t.p = n), _t.d.f());
  }
};
Ot.preconnect = function (t, e) {
  typeof t == "string" &&
    (e
      ? ((e = e.crossOrigin),
        (e =
          typeof e == "string" ? (e === "use-credentials" ? e : "") : void 0))
      : (e = null),
    _t.d.C(t, e));
};
Ot.prefetchDNS = function (t) {
  typeof t == "string" && _t.d.D(t);
};
Ot.preinit = function (t, e) {
  if (typeof t == "string" && e && typeof e.as == "string") {
    var n = e.as,
      a = Gs(n, e.crossOrigin),
      i = typeof e.integrity == "string" ? e.integrity : void 0,
      l = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
    n === "style"
      ? _t.d.S(t, typeof e.precedence == "string" ? e.precedence : void 0, {
          crossOrigin: a,
          integrity: i,
          fetchPriority: l,
        })
      : n === "script" &&
        _t.d.X(t, {
          crossOrigin: a,
          integrity: i,
          fetchPriority: l,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
        });
  }
};
Ot.preinitModule = function (t, e) {
  if (typeof t == "string")
    if (typeof e == "object" && e !== null) {
      if (e.as == null || e.as === "script") {
        var n = Gs(e.as, e.crossOrigin);
        _t.d.M(t, {
          crossOrigin: n,
          integrity: typeof e.integrity == "string" ? e.integrity : void 0,
          nonce: typeof e.nonce == "string" ? e.nonce : void 0,
        });
      }
    } else e == null && _t.d.M(t);
};
Ot.preload = function (t, e) {
  if (
    typeof t == "string" &&
    typeof e == "object" &&
    e !== null &&
    typeof e.as == "string"
  ) {
    var n = e.as,
      a = Gs(n, e.crossOrigin);
    _t.d.L(t, n, {
      crossOrigin: a,
      integrity: typeof e.integrity == "string" ? e.integrity : void 0,
      nonce: typeof e.nonce == "string" ? e.nonce : void 0,
      type: typeof e.type == "string" ? e.type : void 0,
      fetchPriority:
        typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
      referrerPolicy:
        typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
      imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
      imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
      media: typeof e.media == "string" ? e.media : void 0,
    });
  }
};
Ot.preloadModule = function (t, e) {
  if (typeof t == "string")
    if (e) {
      var n = Gs(e.as, e.crossOrigin);
      _t.d.m(t, {
        as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
        crossOrigin: n,
        integrity: typeof e.integrity == "string" ? e.integrity : void 0,
      });
    } else _t.d.m(t);
};
Ot.requestFormReset = function (t) {
  _t.d.r(t);
};
Ot.unstable_batchedUpdates = function (t, e) {
  return t(e);
};
Ot.useFormState = function (t, e, n) {
  return di.H.useFormState(t, e, n);
};
Ot.useFormStatus = function () {
  return di.H.useHostTransitionStatus();
};
Ot.version = "19.2.3";
function dm() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(dm);
    } catch (t) {
      console.error(t);
    }
}
(dm(), (cm.exports = Ot));
var sv = cm.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vt = qg,
  hm = M,
  uv = sv;
function T(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n = 2; n < arguments.length; n++)
      e += "&args[]=" + encodeURIComponent(arguments[n]);
  }
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function mm(t) {
  return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
}
function Fi(t) {
  var e = t,
    n = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do ((e = t), e.flags & 4098 && (n = e.return), (t = e.return));
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function pm(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (
      (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
      e !== null)
    )
      return e.dehydrated;
  }
  return null;
}
function ym(t) {
  if (t.tag === 31) {
    var e = t.memoizedState;
    if (
      (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
      e !== null)
    )
      return e.dehydrated;
  }
  return null;
}
function rf(t) {
  if (Fi(t) !== t) throw Error(T(188));
}
function ov(t) {
  var e = t.alternate;
  if (!e) {
    if (((e = Fi(t)), e === null)) throw Error(T(188));
    return e !== t ? null : t;
  }
  for (var n = t, a = e; ; ) {
    var i = n.return;
    if (i === null) break;
    var l = i.alternate;
    if (l === null) {
      if (((a = i.return), a !== null)) {
        n = a;
        continue;
      }
      break;
    }
    if (i.child === l.child) {
      for (l = i.child; l; ) {
        if (l === n) return (rf(i), t);
        if (l === a) return (rf(i), e);
        l = l.sibling;
      }
      throw Error(T(188));
    }
    if (n.return !== a.return) ((n = i), (a = l));
    else {
      for (var s = !1, u = i.child; u; ) {
        if (u === n) {
          ((s = !0), (n = i), (a = l));
          break;
        }
        if (u === a) {
          ((s = !0), (a = i), (n = l));
          break;
        }
        u = u.sibling;
      }
      if (!s) {
        for (u = l.child; u; ) {
          if (u === n) {
            ((s = !0), (n = l), (a = i));
            break;
          }
          if (u === a) {
            ((s = !0), (a = l), (n = i));
            break;
          }
          u = u.sibling;
        }
        if (!s) throw Error(T(189));
      }
    }
    if (n.alternate !== a) throw Error(T(190));
  }
  if (n.tag !== 3) throw Error(T(188));
  return n.stateNode.current === n ? t : e;
}
function gm(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t;
  for (t = t.child; t !== null; ) {
    if (((e = gm(t)), e !== null)) return e;
    t = t.sibling;
  }
  return null;
}
var nt = Object.assign,
  rv = Symbol.for("react.element"),
  bl = Symbol.for("react.transitional.element"),
  ii = Symbol.for("react.portal"),
  na = Symbol.for("react.fragment"),
  vm = Symbol.for("react.strict_mode"),
  co = Symbol.for("react.profiler"),
  bm = Symbol.for("react.consumer"),
  Re = Symbol.for("react.context"),
  Cr = Symbol.for("react.forward_ref"),
  fo = Symbol.for("react.suspense"),
  ho = Symbol.for("react.suspense_list"),
  zr = Symbol.for("react.memo"),
  Je = Symbol.for("react.lazy"),
  mo = Symbol.for("react.activity"),
  cv = Symbol.for("react.memo_cache_sentinel"),
  cf = Symbol.iterator;
function Pa(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (cf && t[cf]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var fv = Symbol.for("react.client.reference");
function po(t) {
  if (t == null) return null;
  if (typeof t == "function")
    return t.$$typeof === fv ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case na:
      return "Fragment";
    case co:
      return "Profiler";
    case vm:
      return "StrictMode";
    case fo:
      return "Suspense";
    case ho:
      return "SuspenseList";
    case mo:
      return "Activity";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case ii:
        return "Portal";
      case Re:
        return t.displayName || "Context";
      case bm:
        return (t._context.displayName || "Context") + ".Consumer";
      case Cr:
        var e = t.render;
        return (
          (t = t.displayName),
          t ||
            ((t = e.displayName || e.name || ""),
            (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
          t
        );
      case zr:
        return (
          (e = t.displayName || null),
          e !== null ? e : po(t.type) || "Memo"
        );
      case Je:
        ((e = t._payload), (t = t._init));
        try {
          return po(t(e));
        } catch {}
    }
  return null;
}
var li = Array.isArray,
  w = hm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  X = uv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  wn = { pending: !1, data: null, method: null, action: null },
  yo = [],
  aa = -1;
function Te(t) {
  return { current: t };
}
function xt(t) {
  0 > aa || ((t.current = yo[aa]), (yo[aa] = null), aa--);
}
function P(t, e) {
  (aa++, (yo[aa] = t.current), (t.current = e));
}
var be = Te(null),
  Ni = Te(null),
  sn = Te(null),
  as = Te(null);
function is(t, e) {
  switch ((P(sn, e), P(Ni, t), P(be, null), e.nodeType)) {
    case 9:
    case 11:
      t = (t = e.documentElement) && (t = t.namespaceURI) ? yd(t) : 0;
      break;
    default:
      if (((t = e.tagName), (e = e.namespaceURI)))
        ((e = yd(e)), (t = Hp(e, t)));
      else
        switch (t) {
          case "svg":
            t = 1;
            break;
          case "math":
            t = 2;
            break;
          default:
            t = 0;
        }
  }
  (xt(be), P(be, t));
}
function Da() {
  (xt(be), xt(Ni), xt(sn));
}
function go(t) {
  t.memoizedState !== null && P(as, t);
  var e = be.current,
    n = Hp(e, t.type);
  e !== n && (P(Ni, t), P(be, n));
}
function ls(t) {
  (Ni.current === t && (xt(be), xt(Ni)),
    as.current === t && (xt(as), (Yi._currentValue = wn)));
}
var hu, ff;
function Cn(t) {
  if (hu === void 0)
    try {
      throw Error();
    } catch (n) {
      var e = n.stack.trim().match(/\n( *(at )?)/);
      ((hu = (e && e[1]) || ""),
        (ff =
          -1 <
          n.stack.indexOf(`
    at`)
            ? " (<anonymous>)"
            : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : ""));
    }
  return (
    `
` +
    hu +
    t +
    ff
  );
}
var mu = !1;
function pu(t, e) {
  if (!t || mu) return "";
  mu = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = {
      DetermineComponentFrameRoot: function () {
        try {
          if (e) {
            var f = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(f.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(f, []);
              } catch (m) {
                var d = m;
              }
              Reflect.construct(t, [], f);
            } else {
              try {
                f.call();
              } catch (m) {
                d = m;
              }
              t.call(f.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (m) {
              d = m;
            }
            (f = t()) &&
              typeof f.catch == "function" &&
              f.catch(function () {});
          }
        } catch (m) {
          if (m && d && typeof m.stack == "string") return [m.stack, d.stack];
        }
        return [null, null];
      },
    };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var i = Object.getOwnPropertyDescriptor(
      a.DetermineComponentFrameRoot,
      "name",
    );
    i &&
      i.configurable &&
      Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var l = a.DetermineComponentFrameRoot(),
      s = l[0],
      u = l[1];
    if (s && u) {
      var o = s.split(`
`),
        r = u.split(`
`);
      for (
        i = a = 0;
        a < o.length && !o[a].includes("DetermineComponentFrameRoot");
      )
        a++;
      for (; i < r.length && !r[i].includes("DetermineComponentFrameRoot"); )
        i++;
      if (a === o.length || i === r.length)
        for (
          a = o.length - 1, i = r.length - 1;
          1 <= a && 0 <= i && o[a] !== r[i];
        )
          i--;
      for (; 1 <= a && 0 <= i; a--, i--)
        if (o[a] !== r[i]) {
          if (a !== 1 || i !== 1)
            do
              if ((a--, i--, 0 > i || o[a] !== r[i])) {
                var c =
                  `
` + o[a].replace(" at new ", " at ");
                return (
                  t.displayName &&
                    c.includes("<anonymous>") &&
                    (c = c.replace("<anonymous>", t.displayName)),
                  c
                );
              }
            while (1 <= a && 0 <= i);
          break;
        }
    }
  } finally {
    ((mu = !1), (Error.prepareStackTrace = n));
  }
  return (n = t ? t.displayName || t.name : "") ? Cn(n) : "";
}
function dv(t, e) {
  switch (t.tag) {
    case 26:
    case 27:
    case 5:
      return Cn(t.type);
    case 16:
      return Cn("Lazy");
    case 13:
      return t.child !== e && e !== null
        ? Cn("Suspense Fallback")
        : Cn("Suspense");
    case 19:
      return Cn("SuspenseList");
    case 0:
    case 15:
      return pu(t.type, !1);
    case 11:
      return pu(t.type.render, !1);
    case 1:
      return pu(t.type, !0);
    case 31:
      return Cn("Activity");
    default:
      return "";
  }
}
function df(t) {
  try {
    var e = "",
      n = null;
    do ((e += dv(t, n)), (n = t), (t = t.return));
    while (t);
    return e;
  } catch (a) {
    return (
      `
Error generating stack: ` +
      a.message +
      `
` +
      a.stack
    );
  }
}
var vo = Object.prototype.hasOwnProperty,
  jr = vt.unstable_scheduleCallback,
  yu = vt.unstable_cancelCallback,
  hv = vt.unstable_shouldYield,
  mv = vt.unstable_requestPaint,
  Kt = vt.unstable_now,
  pv = vt.unstable_getCurrentPriorityLevel,
  Sm = vt.unstable_ImmediatePriority,
  xm = vt.unstable_UserBlockingPriority,
  ss = vt.unstable_NormalPriority,
  yv = vt.unstable_LowPriority,
  Tm = vt.unstable_IdlePriority,
  gv = vt.log,
  vv = vt.unstable_setDisableYieldValue,
  Pi = null,
  Zt = null;
function tn(t) {
  if (
    (typeof gv == "function" && vv(t),
    Zt && typeof Zt.setStrictMode == "function")
  )
    try {
      Zt.setStrictMode(Pi, t);
    } catch {}
}
var kt = Math.clz32 ? Math.clz32 : xv,
  bv = Math.log,
  Sv = Math.LN2;
function xv(t) {
  return ((t >>>= 0), t === 0 ? 32 : (31 - ((bv(t) / Sv) | 0)) | 0);
}
var Sl = 256,
  xl = 262144,
  Tl = 4194304;
function zn(t) {
  var e = t & 42;
  if (e !== 0) return e;
  switch (t & -t) {
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
      return 64;
    case 128:
      return 128;
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
      return t & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return t & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return t;
  }
}
function Xs(t, e, n) {
  var a = t.pendingLanes;
  if (a === 0) return 0;
  var i = 0,
    l = t.suspendedLanes,
    s = t.pingedLanes;
  t = t.warmLanes;
  var u = a & 134217727;
  return (
    u !== 0
      ? ((a = u & ~l),
        a !== 0
          ? (i = zn(a))
          : ((s &= u),
            s !== 0
              ? (i = zn(s))
              : n || ((n = u & ~t), n !== 0 && (i = zn(n)))))
      : ((u = a & ~l),
        u !== 0
          ? (i = zn(u))
          : s !== 0
            ? (i = zn(s))
            : n || ((n = a & ~t), n !== 0 && (i = zn(n)))),
    i === 0
      ? 0
      : e !== 0 &&
          e !== i &&
          !(e & l) &&
          ((l = i & -i),
          (n = e & -e),
          l >= n || (l === 32 && (n & 4194048) !== 0))
        ? e
        : i
  );
}
function $i(t, e) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
}
function Tv(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return e + 250;
    case 16:
    case 32:
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
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Am() {
  var t = Tl;
  return ((Tl <<= 1), !(Tl & 62914560) && (Tl = 4194304), t);
}
function gu(t) {
  for (var e = [], n = 0; 31 > n; n++) e.push(t);
  return e;
}
function Wi(t, e) {
  ((t.pendingLanes |= e),
    e !== 268435456 &&
      ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
}
function Av(t, e, n, a, i, l) {
  var s = t.pendingLanes;
  ((t.pendingLanes = n),
    (t.suspendedLanes = 0),
    (t.pingedLanes = 0),
    (t.warmLanes = 0),
    (t.expiredLanes &= n),
    (t.entangledLanes &= n),
    (t.errorRecoveryDisabledLanes &= n),
    (t.shellSuspendCounter = 0));
  var u = t.entanglements,
    o = t.expirationTimes,
    r = t.hiddenUpdates;
  for (n = s & ~n; 0 < n; ) {
    var c = 31 - kt(n),
      f = 1 << c;
    ((u[c] = 0), (o[c] = -1));
    var d = r[c];
    if (d !== null)
      for (r[c] = null, c = 0; c < d.length; c++) {
        var m = d[c];
        m !== null && (m.lane &= -536870913);
      }
    n &= ~f;
  }
  (a !== 0 && Em(t, a, 0),
    l !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= l & ~(s & ~e)));
}
function Em(t, e, n) {
  ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
  var a = 31 - kt(e);
  ((t.entangledLanes |= e),
    (t.entanglements[a] = t.entanglements[a] | 1073741824 | (n & 261930)));
}
function Mm(t, e) {
  var n = (t.entangledLanes |= e);
  for (t = t.entanglements; n; ) {
    var a = 31 - kt(n),
      i = 1 << a;
    ((i & e) | (t[a] & e) && (t[a] |= e), (n &= ~i));
  }
}
function Dm(t, e) {
  var n = e & -e;
  return ((n = n & 42 ? 1 : Nr(n)), n & (t.suspendedLanes | e) ? 0 : n);
}
function Nr(t) {
  switch (t) {
    case 2:
      t = 1;
      break;
    case 8:
      t = 4;
      break;
    case 32:
      t = 16;
      break;
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
      t = 128;
      break;
    case 268435456:
      t = 134217728;
      break;
    default:
      t = 0;
  }
  return t;
}
function Rr(t) {
  return (
    (t &= -t),
    2 < t ? (8 < t ? (t & 134217727 ? 32 : 268435456) : 8) : 2
  );
}
function Cm() {
  var t = X.p;
  return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Pp(t.type));
}
function hf(t, e) {
  var n = X.p;
  try {
    return ((X.p = t), e());
  } finally {
    X.p = n;
  }
}
var xn = Math.random().toString(36).slice(2),
  Mt = "__reactFiber$" + xn,
  Ht = "__reactProps$" + xn,
  Ya = "__reactContainer$" + xn,
  bo = "__reactEvents$" + xn,
  Ev = "__reactListeners$" + xn,
  Mv = "__reactHandles$" + xn,
  mf = "__reactResources$" + xn,
  Ii = "__reactMarker$" + xn;
function _r(t) {
  (delete t[Mt], delete t[Ht], delete t[bo], delete t[Ev], delete t[Mv]);
}
function ia(t) {
  var e = t[Mt];
  if (e) return e;
  for (var n = t.parentNode; n; ) {
    if ((e = n[Ya] || n[Mt])) {
      if (
        ((n = e.alternate),
        e.child !== null || (n !== null && n.child !== null))
      )
        for (t = xd(t); t !== null; ) {
          if ((n = t[Mt])) return n;
          t = xd(t);
        }
      return e;
    }
    ((t = n), (n = t.parentNode));
  }
  return null;
}
function Ga(t) {
  if ((t = t[Mt] || t[Ya])) {
    var e = t.tag;
    if (
      e === 5 ||
      e === 6 ||
      e === 13 ||
      e === 31 ||
      e === 26 ||
      e === 27 ||
      e === 3
    )
      return t;
  }
  return null;
}
function si(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
  throw Error(T(33));
}
function ba(t) {
  var e = t[mf];
  return (
    e ||
      (e = t[mf] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
    e
  );
}
function St(t) {
  t[Ii] = !0;
}
var zm = new Set(),
  jm = {};
function Kn(t, e) {
  (Ca(t, e), Ca(t + "Capture", e));
}
function Ca(t, e) {
  for (jm[t] = e, t = 0; t < e.length; t++) zm.add(e[t]);
}
var Dv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  pf = {},
  yf = {};
function Cv(t) {
  return vo.call(yf, t)
    ? !0
    : vo.call(pf, t)
      ? !1
      : Dv.test(t)
        ? (yf[t] = !0)
        : ((pf[t] = !0), !1);
}
function Hl(t, e, n) {
  if (Cv(e))
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
          t.removeAttribute(e);
          return;
        case "boolean":
          var a = e.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            t.removeAttribute(e);
            return;
          }
      }
      t.setAttribute(e, "" + n);
    }
}
function Al(t, e, n) {
  if (n === null) t.removeAttribute(e);
  else {
    switch (typeof n) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(e);
        return;
    }
    t.setAttribute(e, "" + n);
  }
}
function Ee(t, e, n, a) {
  if (a === null) t.removeAttribute(n);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(n);
        return;
    }
    t.setAttributeNS(e, n, "" + a);
  }
}
function ae(t) {
  switch (typeof t) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function Nm(t) {
  var e = t.type;
  return (
    (t = t.nodeName) &&
    t.toLowerCase() === "input" &&
    (e === "checkbox" || e === "radio")
  );
}
function zv(t, e, n) {
  var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
  if (
    !t.hasOwnProperty(e) &&
    typeof a < "u" &&
    typeof a.get == "function" &&
    typeof a.set == "function"
  ) {
    var i = a.get,
      l = a.set;
    return (
      Object.defineProperty(t, e, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          ((n = "" + s), l.call(this, s));
        },
      }),
      Object.defineProperty(t, e, { enumerable: a.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (s) {
          n = "" + s;
        },
        stopTracking: function () {
          ((t._valueTracker = null), delete t[e]);
        },
      }
    );
  }
}
function So(t) {
  if (!t._valueTracker) {
    var e = Nm(t) ? "checked" : "value";
    t._valueTracker = zv(t, e, "" + t[e]);
  }
}
function Rm(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var n = e.getValue(),
    a = "";
  return (
    t && (a = Nm(t) ? (t.checked ? "true" : "false") : t.value),
    (t = a),
    t !== n ? (e.setValue(t), !0) : !1
  );
}
function us(t) {
  if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u"))
    return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
var jv = /[\n"\\]/g;
function se(t) {
  return t.replace(jv, function (e) {
    return "\\" + e.charCodeAt(0).toString(16) + " ";
  });
}
function xo(t, e, n, a, i, l, s, u) {
  ((t.name = ""),
    s != null &&
    typeof s != "function" &&
    typeof s != "symbol" &&
    typeof s != "boolean"
      ? (t.type = s)
      : t.removeAttribute("type"),
    e != null
      ? s === "number"
        ? ((e === 0 && t.value === "") || t.value != e) &&
          (t.value = "" + ae(e))
        : t.value !== "" + ae(e) && (t.value = "" + ae(e))
      : (s !== "submit" && s !== "reset") || t.removeAttribute("value"),
    e != null
      ? To(t, s, ae(e))
      : n != null
        ? To(t, s, ae(n))
        : a != null && t.removeAttribute("value"),
    i == null && l != null && (t.defaultChecked = !!l),
    i != null &&
      (t.checked = i && typeof i != "function" && typeof i != "symbol"),
    u != null &&
    typeof u != "function" &&
    typeof u != "symbol" &&
    typeof u != "boolean"
      ? (t.name = "" + ae(u))
      : t.removeAttribute("name"));
}
function _m(t, e, n, a, i, l, s, u) {
  if (
    (l != null &&
      typeof l != "function" &&
      typeof l != "symbol" &&
      typeof l != "boolean" &&
      (t.type = l),
    e != null || n != null)
  ) {
    if (!((l !== "submit" && l !== "reset") || e != null)) {
      So(t);
      return;
    }
    ((n = n != null ? "" + ae(n) : ""),
      (e = e != null ? "" + ae(e) : n),
      u || e === t.value || (t.value = e),
      (t.defaultValue = e));
  }
  ((a = a ?? i),
    (a = typeof a != "function" && typeof a != "symbol" && !!a),
    (t.checked = u ? t.checked : !!a),
    (t.defaultChecked = !!a),
    s != null &&
      typeof s != "function" &&
      typeof s != "symbol" &&
      typeof s != "boolean" &&
      (t.name = s),
    So(t));
}
function To(t, e, n) {
  (e === "number" && us(t.ownerDocument) === t) ||
    t.defaultValue === "" + n ||
    (t.defaultValue = "" + n);
}
function Sa(t, e, n, a) {
  if (((t = t.options), e)) {
    e = {};
    for (var i = 0; i < n.length; i++) e["$" + n[i]] = !0;
    for (n = 0; n < t.length; n++)
      ((i = e.hasOwnProperty("$" + t[n].value)),
        t[n].selected !== i && (t[n].selected = i),
        i && a && (t[n].defaultSelected = !0));
  } else {
    for (n = "" + ae(n), e = null, i = 0; i < t.length; i++) {
      if (t[i].value === n) {
        ((t[i].selected = !0), a && (t[i].defaultSelected = !0));
        return;
      }
      e !== null || t[i].disabled || (e = t[i]);
    }
    e !== null && (e.selected = !0);
  }
}
function Om(t, e, n) {
  if (
    e != null &&
    ((e = "" + ae(e)), e !== t.value && (t.value = e), n == null)
  ) {
    t.defaultValue !== e && (t.defaultValue = e);
    return;
  }
  t.defaultValue = n != null ? "" + ae(n) : "";
}
function wm(t, e, n, a) {
  if (e == null) {
    if (a != null) {
      if (n != null) throw Error(T(92));
      if (li(a)) {
        if (1 < a.length) throw Error(T(93));
        a = a[0];
      }
      n = a;
    }
    (n == null && (n = ""), (e = n));
  }
  ((n = ae(e)),
    (t.defaultValue = n),
    (a = t.textContent),
    a === n && a !== "" && a !== null && (t.value = a),
    So(t));
}
function za(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var Nv = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function gf(t, e, n) {
  var a = e.indexOf("--") === 0;
  n == null || typeof n == "boolean" || n === ""
    ? a
      ? t.setProperty(e, "")
      : e === "float"
        ? (t.cssFloat = "")
        : (t[e] = "")
    : a
      ? t.setProperty(e, n)
      : typeof n != "number" || n === 0 || Nv.has(e)
        ? e === "float"
          ? (t.cssFloat = n)
          : (t[e] = ("" + n).trim())
        : (t[e] = n + "px");
}
function Vm(t, e, n) {
  if (e != null && typeof e != "object") throw Error(T(62));
  if (((t = t.style), n != null)) {
    for (var a in n)
      !n.hasOwnProperty(a) ||
        (e != null && e.hasOwnProperty(a)) ||
        (a.indexOf("--") === 0
          ? t.setProperty(a, "")
          : a === "float"
            ? (t.cssFloat = "")
            : (t[a] = ""));
    for (var i in e)
      ((a = e[i]), e.hasOwnProperty(i) && n[i] !== a && gf(t, i, a));
  } else for (var l in e) e.hasOwnProperty(l) && gf(t, l, e[l]);
}
function Or(t) {
  if (t.indexOf("-") === -1) return !1;
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Rv = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  _v =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function ql(t) {
  return _v.test("" + t)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : t;
}
function _e() {}
var Ao = null;
function wr(t) {
  return (
    (t = t.target || t.srcElement || window),
    t.correspondingUseElement && (t = t.correspondingUseElement),
    t.nodeType === 3 ? t.parentNode : t
  );
}
var la = null,
  xa = null;
function vf(t) {
  var e = Ga(t);
  if (e && (t = e.stateNode)) {
    var n = t[Ht] || null;
    t: switch (((t = e.stateNode), e.type)) {
      case "input":
        if (
          (xo(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name,
          ),
          (e = n.name),
          n.type === "radio" && e != null)
        ) {
          for (n = t; n.parentNode; ) n = n.parentNode;
          for (
            n = n.querySelectorAll(
              'input[name="' + se("" + e) + '"][type="radio"]',
            ),
              e = 0;
            e < n.length;
            e++
          ) {
            var a = n[e];
            if (a !== t && a.form === t.form) {
              var i = a[Ht] || null;
              if (!i) throw Error(T(90));
              xo(
                a,
                i.value,
                i.defaultValue,
                i.defaultValue,
                i.checked,
                i.defaultChecked,
                i.type,
                i.name,
              );
            }
          }
          for (e = 0; e < n.length; e++)
            ((a = n[e]), a.form === t.form && Rm(a));
        }
        break t;
      case "textarea":
        Om(t, n.value, n.defaultValue);
        break t;
      case "select":
        ((e = n.value), e != null && Sa(t, !!n.multiple, e, !1));
    }
  }
}
var vu = !1;
function Um(t, e, n) {
  if (vu) return t(e, n);
  vu = !0;
  try {
    var a = t(e);
    return a;
  } finally {
    if (
      ((vu = !1),
      (la !== null || xa !== null) &&
        (eu(), la && ((e = la), (t = xa), (xa = la = null), vf(e), t)))
    )
      for (e = 0; e < t.length; e++) vf(t[e]);
  }
}
function Ri(t, e) {
  var n = t.stateNode;
  if (n === null) return null;
  var a = n[Ht] || null;
  if (a === null) return null;
  n = a[e];
  t: switch (e) {
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
      ((a = !a.disabled) ||
        ((t = t.type),
        (a = !(
          t === "button" ||
          t === "input" ||
          t === "select" ||
          t === "textarea"
        ))),
        (t = !a));
      break t;
    default:
      t = !1;
  }
  if (t) return null;
  if (n && typeof n != "function") throw Error(T(231, e, typeof n));
  return n;
}
var He = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Eo = !1;
if (He)
  try {
    var $a = {};
    (Object.defineProperty($a, "passive", {
      get: function () {
        Eo = !0;
      },
    }),
      window.addEventListener("test", $a, $a),
      window.removeEventListener("test", $a, $a));
  } catch {
    Eo = !1;
  }
var en = null,
  Vr = null,
  Yl = null;
function Bm() {
  if (Yl) return Yl;
  var t,
    e = Vr,
    n = e.length,
    a,
    i = "value" in en ? en.value : en.textContent,
    l = i.length;
  for (t = 0; t < n && e[t] === i[t]; t++);
  var s = n - t;
  for (a = 1; a <= s && e[n - a] === i[l - a]; a++);
  return (Yl = i.slice(t, 1 < a ? 1 - a : void 0));
}
function Gl(t) {
  var e = t.keyCode;
  return (
    "charCode" in t
      ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
      : (t = e),
    t === 10 && (t = 13),
    32 <= t || t === 13 ? t : 0
  );
}
function El() {
  return !0;
}
function bf() {
  return !1;
}
function qt(t) {
  function e(n, a, i, l, s) {
    ((this._reactName = n),
      (this._targetInst = i),
      (this.type = a),
      (this.nativeEvent = l),
      (this.target = s),
      (this.currentTarget = null));
    for (var u in t)
      t.hasOwnProperty(u) && ((n = t[u]), (this[u] = n ? n(l) : l[u]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? El
        : bf),
      (this.isPropagationStopped = bf),
      this
    );
  }
  return (
    nt(e.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = El));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = El));
      },
      persist: function () {},
      isPersistent: El,
    }),
    e
  );
}
var Zn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Qs = qt(Zn),
  tl = nt({}, Zn, { view: 0, detail: 0 }),
  Ov = qt(tl),
  bu,
  Su,
  Wa,
  Ks = nt({}, tl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ur,
    button: 0,
    buttons: 0,
    relatedTarget: function (t) {
      return t.relatedTarget === void 0
        ? t.fromElement === t.srcElement
          ? t.toElement
          : t.fromElement
        : t.relatedTarget;
    },
    movementX: function (t) {
      return "movementX" in t
        ? t.movementX
        : (t !== Wa &&
            (Wa && t.type === "mousemove"
              ? ((bu = t.screenX - Wa.screenX), (Su = t.screenY - Wa.screenY))
              : (Su = bu = 0),
            (Wa = t)),
          bu);
    },
    movementY: function (t) {
      return "movementY" in t ? t.movementY : Su;
    },
  }),
  Sf = qt(Ks),
  wv = nt({}, Ks, { dataTransfer: 0 }),
  Vv = qt(wv),
  Uv = nt({}, tl, { relatedTarget: 0 }),
  xu = qt(Uv),
  Bv = nt({}, Zn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Lv = qt(Bv),
  Hv = nt({}, Zn, {
    clipboardData: function (t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    },
  }),
  qv = qt(Hv),
  Yv = nt({}, Zn, { data: 0 }),
  xf = qt(Yv),
  Gv = {
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
    MozPrintableKey: "Unidentified",
  },
  Xv = {
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
    224: "Meta",
  },
  Qv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Kv(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = Qv[t]) ? !!e[t] : !1;
}
function Ur() {
  return Kv;
}
var Zv = nt({}, tl, {
    key: function (t) {
      if (t.key) {
        var e = Gv[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress"
        ? ((t = Gl(t)), t === 13 ? "Enter" : String.fromCharCode(t))
        : t.type === "keydown" || t.type === "keyup"
          ? Xv[t.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ur,
    charCode: function (t) {
      return t.type === "keypress" ? Gl(t) : 0;
    },
    keyCode: function (t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function (t) {
      return t.type === "keypress"
        ? Gl(t)
        : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
    },
  }),
  kv = qt(Zv),
  Jv = nt({}, Ks, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Tf = qt(Jv),
  Fv = nt({}, tl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ur,
  }),
  Pv = qt(Fv),
  $v = nt({}, Zn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Wv = qt($v),
  Iv = nt({}, Ks, {
    deltaX: function (t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function (t) {
      return "deltaY" in t
        ? t.deltaY
        : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
            ? -t.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  t1 = qt(Iv),
  e1 = nt({}, Zn, { newState: 0, oldState: 0 }),
  n1 = qt(e1),
  a1 = [9, 13, 27, 32],
  Br = He && "CompositionEvent" in window,
  hi = null;
He && "documentMode" in document && (hi = document.documentMode);
var i1 = He && "TextEvent" in window && !hi,
  Lm = He && (!Br || (hi && 8 < hi && 11 >= hi)),
  Af = " ",
  Ef = !1;
function Hm(t, e) {
  switch (t) {
    case "keyup":
      return a1.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function qm(t) {
  return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
}
var sa = !1;
function l1(t, e) {
  switch (t) {
    case "compositionend":
      return qm(e);
    case "keypress":
      return e.which !== 32 ? null : ((Ef = !0), Af);
    case "textInput":
      return ((t = e.data), t === Af && Ef ? null : t);
    default:
      return null;
  }
}
function s1(t, e) {
  if (sa)
    return t === "compositionend" || (!Br && Hm(t, e))
      ? ((t = Bm()), (Yl = Vr = en = null), (sa = !1), t)
      : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return Lm && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var u1 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Mf(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!u1[t.type] : e === "textarea";
}
function Ym(t, e, n, a) {
  (la ? (xa ? xa.push(a) : (xa = [a])) : (la = a),
    (e = Ms(e, "onChange")),
    0 < e.length &&
      ((n = new Qs("onChange", "change", null, n, a)),
      t.push({ event: n, listeners: e })));
}
var mi = null,
  _i = null;
function o1(t) {
  Up(t, 0);
}
function Zs(t) {
  var e = si(t);
  if (Rm(e)) return t;
}
function Df(t, e) {
  if (t === "change") return e;
}
var Gm = !1;
if (He) {
  var Tu;
  if (He) {
    var Au = "oninput" in document;
    if (!Au) {
      var Cf = document.createElement("div");
      (Cf.setAttribute("oninput", "return;"),
        (Au = typeof Cf.oninput == "function"));
    }
    Tu = Au;
  } else Tu = !1;
  Gm = Tu && (!document.documentMode || 9 < document.documentMode);
}
function zf() {
  mi && (mi.detachEvent("onpropertychange", Xm), (_i = mi = null));
}
function Xm(t) {
  if (t.propertyName === "value" && Zs(_i)) {
    var e = [];
    (Ym(e, _i, t, wr(t)), Um(o1, e));
  }
}
function r1(t, e, n) {
  t === "focusin"
    ? (zf(), (mi = e), (_i = n), mi.attachEvent("onpropertychange", Xm))
    : t === "focusout" && zf();
}
function c1(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return Zs(_i);
}
function f1(t, e) {
  if (t === "click") return Zs(e);
}
function d1(t, e) {
  if (t === "input" || t === "change") return Zs(e);
}
function h1(t, e) {
  return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
}
var Pt = typeof Object.is == "function" ? Object.is : h1;
function Oi(t, e) {
  if (Pt(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var n = Object.keys(t),
    a = Object.keys(e);
  if (n.length !== a.length) return !1;
  for (a = 0; a < n.length; a++) {
    var i = n[a];
    if (!vo.call(e, i) || !Pt(t[i], e[i])) return !1;
  }
  return !0;
}
function jf(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function Nf(t, e) {
  var n = jf(t);
  t = 0;
  for (var a; n; ) {
    if (n.nodeType === 3) {
      if (((a = t + n.textContent.length), t <= e && a >= e))
        return { node: n, offset: e - t };
      t = a;
    }
    t: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break t;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = jf(n);
  }
}
function Qm(t, e) {
  return t && e
    ? t === e
      ? !0
      : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
          ? Qm(t, e.parentNode)
          : "contains" in t
            ? t.contains(e)
            : t.compareDocumentPosition
              ? !!(t.compareDocumentPosition(e) & 16)
              : !1
    : !1;
}
function Km(t) {
  t =
    t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
      ? t.ownerDocument.defaultView
      : window;
  for (var e = us(t.document); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) t = e.contentWindow;
    else break;
    e = us(t.document);
  }
  return e;
}
function Lr(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return (
    e &&
    ((e === "input" &&
      (t.type === "text" ||
        t.type === "search" ||
        t.type === "tel" ||
        t.type === "url" ||
        t.type === "password")) ||
      e === "textarea" ||
      t.contentEditable === "true")
  );
}
var m1 = He && "documentMode" in document && 11 >= document.documentMode,
  ua = null,
  Mo = null,
  pi = null,
  Do = !1;
function Rf(t, e, n) {
  var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Do ||
    ua == null ||
    ua !== us(a) ||
    ((a = ua),
    "selectionStart" in a && Lr(a)
      ? (a = { start: a.selectionStart, end: a.selectionEnd })
      : ((a = (
          (a.ownerDocument && a.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (a = {
          anchorNode: a.anchorNode,
          anchorOffset: a.anchorOffset,
          focusNode: a.focusNode,
          focusOffset: a.focusOffset,
        })),
    (pi && Oi(pi, a)) ||
      ((pi = a),
      (a = Ms(Mo, "onSelect")),
      0 < a.length &&
        ((e = new Qs("onSelect", "select", null, e, n)),
        t.push({ event: e, listeners: a }),
        (e.target = ua))));
}
function Mn(t, e) {
  var n = {};
  return (
    (n[t.toLowerCase()] = e.toLowerCase()),
    (n["Webkit" + t] = "webkit" + e),
    (n["Moz" + t] = "moz" + e),
    n
  );
}
var oa = {
    animationend: Mn("Animation", "AnimationEnd"),
    animationiteration: Mn("Animation", "AnimationIteration"),
    animationstart: Mn("Animation", "AnimationStart"),
    transitionrun: Mn("Transition", "TransitionRun"),
    transitionstart: Mn("Transition", "TransitionStart"),
    transitioncancel: Mn("Transition", "TransitionCancel"),
    transitionend: Mn("Transition", "TransitionEnd"),
  },
  Eu = {},
  Zm = {};
He &&
  ((Zm = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete oa.animationend.animation,
    delete oa.animationiteration.animation,
    delete oa.animationstart.animation),
  "TransitionEvent" in window || delete oa.transitionend.transition);
function kn(t) {
  if (Eu[t]) return Eu[t];
  if (!oa[t]) return t;
  var e = oa[t],
    n;
  for (n in e) if (e.hasOwnProperty(n) && n in Zm) return (Eu[t] = e[n]);
  return t;
}
var km = kn("animationend"),
  Jm = kn("animationiteration"),
  Fm = kn("animationstart"),
  p1 = kn("transitionrun"),
  y1 = kn("transitionstart"),
  g1 = kn("transitioncancel"),
  Pm = kn("transitionend"),
  $m = new Map(),
  Co =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
Co.push("scrollEnd");
function pe(t, e) {
  ($m.set(t, e), Kn(e, [t]));
}
var os =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var e = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(e)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        },
  ne = [],
  ra = 0,
  Hr = 0;
function ks() {
  for (var t = ra, e = (Hr = ra = 0); e < t; ) {
    var n = ne[e];
    ne[e++] = null;
    var a = ne[e];
    ne[e++] = null;
    var i = ne[e];
    ne[e++] = null;
    var l = ne[e];
    if (((ne[e++] = null), a !== null && i !== null)) {
      var s = a.pending;
      (s === null ? (i.next = i) : ((i.next = s.next), (s.next = i)),
        (a.pending = i));
    }
    l !== 0 && Wm(n, i, l);
  }
}
function Js(t, e, n, a) {
  ((ne[ra++] = t),
    (ne[ra++] = e),
    (ne[ra++] = n),
    (ne[ra++] = a),
    (Hr |= a),
    (t.lanes |= a),
    (t = t.alternate),
    t !== null && (t.lanes |= a));
}
function qr(t, e, n, a) {
  return (Js(t, e, n, a), rs(t));
}
function Jn(t, e) {
  return (Js(t, null, null, e), rs(t));
}
function Wm(t, e, n) {
  t.lanes |= n;
  var a = t.alternate;
  a !== null && (a.lanes |= n);
  for (var i = !1, l = t.return; l !== null; )
    ((l.childLanes |= n),
      (a = l.alternate),
      a !== null && (a.childLanes |= n),
      l.tag === 22 &&
        ((t = l.stateNode), t === null || t._visibility & 1 || (i = !0)),
      (t = l),
      (l = l.return));
  return t.tag === 3
    ? ((l = t.stateNode),
      i &&
        e !== null &&
        ((i = 31 - kt(n)),
        (t = l.hiddenUpdates),
        (a = t[i]),
        a === null ? (t[i] = [e]) : a.push(e),
        (e.lane = n | 536870912)),
      l)
    : null;
}
function rs(t) {
  if (50 < Ei) throw ((Ei = 0), (Jo = null), Error(T(185)));
  for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
  return t.tag === 3 ? t.stateNode : null;
}
var ca = {};
function v1(t, e, n, a) {
  ((this.tag = t),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = e),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = a),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Xt(t, e, n, a) {
  return new v1(t, e, n, a);
}
function Yr(t) {
  return ((t = t.prototype), !(!t || !t.isReactComponent));
}
function we(t, e) {
  var n = t.alternate;
  return (
    n === null
      ? ((n = Xt(t.tag, e, t.key, t.mode)),
        (n.elementType = t.elementType),
        (n.type = t.type),
        (n.stateNode = t.stateNode),
        (n.alternate = t),
        (t.alternate = n))
      : ((n.pendingProps = e),
        (n.type = t.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = t.flags & 65011712),
    (n.childLanes = t.childLanes),
    (n.lanes = t.lanes),
    (n.child = t.child),
    (n.memoizedProps = t.memoizedProps),
    (n.memoizedState = t.memoizedState),
    (n.updateQueue = t.updateQueue),
    (e = t.dependencies),
    (n.dependencies =
      e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
    (n.sibling = t.sibling),
    (n.index = t.index),
    (n.ref = t.ref),
    (n.refCleanup = t.refCleanup),
    n
  );
}
function Im(t, e) {
  t.flags &= 65011714;
  var n = t.alternate;
  return (
    n === null
      ? ((t.childLanes = 0),
        (t.lanes = e),
        (t.child = null),
        (t.subtreeFlags = 0),
        (t.memoizedProps = null),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.dependencies = null),
        (t.stateNode = null))
      : ((t.childLanes = n.childLanes),
        (t.lanes = n.lanes),
        (t.child = n.child),
        (t.subtreeFlags = 0),
        (t.deletions = null),
        (t.memoizedProps = n.memoizedProps),
        (t.memoizedState = n.memoizedState),
        (t.updateQueue = n.updateQueue),
        (t.type = n.type),
        (e = n.dependencies),
        (t.dependencies =
          e === null
            ? null
            : { lanes: e.lanes, firstContext: e.firstContext })),
    t
  );
}
function Xl(t, e, n, a, i, l) {
  var s = 0;
  if (((a = t), typeof t == "function")) Yr(t) && (s = 1);
  else if (typeof t == "string")
    s = Ab(t, n, be.current)
      ? 26
      : t === "html" || t === "head" || t === "body"
        ? 27
        : 5;
  else
    t: switch (t) {
      case mo:
        return ((t = Xt(31, n, e, i)), (t.elementType = mo), (t.lanes = l), t);
      case na:
        return Vn(n.children, i, l, e);
      case vm:
        ((s = 8), (i |= 24));
        break;
      case co:
        return (
          (t = Xt(12, n, e, i | 2)),
          (t.elementType = co),
          (t.lanes = l),
          t
        );
      case fo:
        return ((t = Xt(13, n, e, i)), (t.elementType = fo), (t.lanes = l), t);
      case ho:
        return ((t = Xt(19, n, e, i)), (t.elementType = ho), (t.lanes = l), t);
      default:
        if (typeof t == "object" && t !== null)
          switch (t.$$typeof) {
            case Re:
              s = 10;
              break t;
            case bm:
              s = 9;
              break t;
            case Cr:
              s = 11;
              break t;
            case zr:
              s = 14;
              break t;
            case Je:
              ((s = 16), (a = null));
              break t;
          }
        ((s = 29),
          (n = Error(T(130, t === null ? "null" : typeof t, ""))),
          (a = null));
    }
  return (
    (e = Xt(s, n, e, i)),
    (e.elementType = t),
    (e.type = a),
    (e.lanes = l),
    e
  );
}
function Vn(t, e, n, a) {
  return ((t = Xt(7, t, a, e)), (t.lanes = n), t);
}
function Mu(t, e, n) {
  return ((t = Xt(6, t, null, e)), (t.lanes = n), t);
}
function t0(t) {
  var e = Xt(18, null, null, 0);
  return ((e.stateNode = t), e);
}
function Du(t, e, n) {
  return (
    (e = Xt(4, t.children !== null ? t.children : [], t.key, e)),
    (e.lanes = n),
    (e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation,
    }),
    e
  );
}
var _f = new WeakMap();
function ue(t, e) {
  if (typeof t == "object" && t !== null) {
    var n = _f.get(t);
    return n !== void 0
      ? n
      : ((e = { value: t, source: e, stack: df(e) }), _f.set(t, e), e);
  }
  return { value: t, source: e, stack: df(e) };
}
var fa = [],
  da = 0,
  cs = null,
  wi = 0,
  ie = [],
  le = 0,
  pn = null,
  ye = 1,
  ge = "";
function je(t, e) {
  ((fa[da++] = wi), (fa[da++] = cs), (cs = t), (wi = e));
}
function e0(t, e, n) {
  ((ie[le++] = ye), (ie[le++] = ge), (ie[le++] = pn), (pn = t));
  var a = ye;
  t = ge;
  var i = 32 - kt(a) - 1;
  ((a &= ~(1 << i)), (n += 1));
  var l = 32 - kt(e) + i;
  if (30 < l) {
    var s = i - (i % 5);
    ((l = (a & ((1 << s) - 1)).toString(32)),
      (a >>= s),
      (i -= s),
      (ye = (1 << (32 - kt(e) + i)) | (n << i) | a),
      (ge = l + t));
  } else ((ye = (1 << l) | (n << i) | a), (ge = t));
}
function Gr(t) {
  t.return !== null && (je(t, 1), e0(t, 1, 0));
}
function Xr(t) {
  for (; t === cs; )
    ((cs = fa[--da]), (fa[da] = null), (wi = fa[--da]), (fa[da] = null));
  for (; t === pn; )
    ((pn = ie[--le]),
      (ie[le] = null),
      (ge = ie[--le]),
      (ie[le] = null),
      (ye = ie[--le]),
      (ie[le] = null));
}
function n0(t, e) {
  ((ie[le++] = ye),
    (ie[le++] = ge),
    (ie[le++] = pn),
    (ye = e.id),
    (ge = e.overflow),
    (pn = t));
}
var Dt = null,
  I = null,
  Y = !1,
  un = null,
  oe = !1,
  zo = Error(T(519));
function yn(t) {
  var e = Error(
    T(
      418,
      1 < arguments.length && arguments[1] !== void 0 && arguments[1]
        ? "text"
        : "HTML",
      "",
    ),
  );
  throw (Vi(ue(e, t)), zo);
}
function Of(t) {
  var e = t.stateNode,
    n = t.type,
    a = t.memoizedProps;
  switch (((e[Mt] = t), (e[Ht] = a), n)) {
    case "dialog":
      (L("cancel", e), L("close", e));
      break;
    case "iframe":
    case "object":
    case "embed":
      L("load", e);
      break;
    case "video":
    case "audio":
      for (n = 0; n < Hi.length; n++) L(Hi[n], e);
      break;
    case "source":
      L("error", e);
      break;
    case "img":
    case "image":
    case "link":
      (L("error", e), L("load", e));
      break;
    case "details":
      L("toggle", e);
      break;
    case "input":
      (L("invalid", e),
        _m(
          e,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0,
        ));
      break;
    case "select":
      L("invalid", e);
      break;
    case "textarea":
      (L("invalid", e), wm(e, a.value, a.defaultValue, a.children));
  }
  ((n = a.children),
    (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
    e.textContent === "" + n ||
    a.suppressHydrationWarning === !0 ||
    Lp(e.textContent, n)
      ? (a.popover != null && (L("beforetoggle", e), L("toggle", e)),
        a.onScroll != null && L("scroll", e),
        a.onScrollEnd != null && L("scrollend", e),
        a.onClick != null && (e.onclick = _e),
        (e = !0))
      : (e = !1),
    e || yn(t, !0));
}
function wf(t) {
  for (Dt = t.return; Dt; )
    switch (Dt.tag) {
      case 5:
      case 31:
      case 13:
        oe = !1;
        return;
      case 27:
      case 3:
        oe = !0;
        return;
      default:
        Dt = Dt.return;
    }
}
function $n(t) {
  if (t !== Dt) return !1;
  if (!Y) return (wf(t), (Y = !0), !1);
  var e = t.tag,
    n;
  if (
    ((n = e !== 3 && e !== 27) &&
      ((n = e === 5) &&
        ((n = t.type),
        (n = !(n !== "form" && n !== "button") || Io(t.type, t.memoizedProps))),
      (n = !n)),
    n && I && yn(t),
    wf(t),
    e === 13)
  ) {
    if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
      throw Error(T(317));
    I = Sd(t);
  } else if (e === 31) {
    if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
      throw Error(T(317));
    I = Sd(t);
  } else
    e === 27
      ? ((e = I), Tn(t.type) ? ((t = ar), (ar = null), (I = t)) : (I = e))
      : (I = Dt ? ce(t.stateNode.nextSibling) : null);
  return !0;
}
function qn() {
  ((I = Dt = null), (Y = !1));
}
function Cu() {
  var t = un;
  return (
    t !== null && (Bt === null ? (Bt = t) : Bt.push.apply(Bt, t), (un = null)),
    t
  );
}
function Vi(t) {
  un === null ? (un = [t]) : un.push(t);
}
var jo = Te(null),
  Fn = null,
  Oe = null;
function Pe(t, e, n) {
  (P(jo, e._currentValue), (e._currentValue = n));
}
function Ve(t) {
  ((t._currentValue = jo.current), xt(jo));
}
function No(t, e, n) {
  for (; t !== null; ) {
    var a = t.alternate;
    if (
      ((t.childLanes & e) !== e
        ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
        : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
      t === n)
    )
      break;
    t = t.return;
  }
}
function Ro(t, e, n, a) {
  var i = t.child;
  for (i !== null && (i.return = t); i !== null; ) {
    var l = i.dependencies;
    if (l !== null) {
      var s = i.child;
      l = l.firstContext;
      t: for (; l !== null; ) {
        var u = l;
        l = i;
        for (var o = 0; o < e.length; o++)
          if (u.context === e[o]) {
            ((l.lanes |= n),
              (u = l.alternate),
              u !== null && (u.lanes |= n),
              No(l.return, n, t),
              a || (s = null));
            break t;
          }
        l = u.next;
      }
    } else if (i.tag === 18) {
      if (((s = i.return), s === null)) throw Error(T(341));
      ((s.lanes |= n),
        (l = s.alternate),
        l !== null && (l.lanes |= n),
        No(s, n, t),
        (s = null));
    } else s = i.child;
    if (s !== null) s.return = i;
    else
      for (s = i; s !== null; ) {
        if (s === t) {
          s = null;
          break;
        }
        if (((i = s.sibling), i !== null)) {
          ((i.return = s.return), (s = i));
          break;
        }
        s = s.return;
      }
    i = s;
  }
}
function Xa(t, e, n, a) {
  t = null;
  for (var i = e, l = !1; i !== null; ) {
    if (!l) {
      if (i.flags & 524288) l = !0;
      else if (i.flags & 262144) break;
    }
    if (i.tag === 10) {
      var s = i.alternate;
      if (s === null) throw Error(T(387));
      if (((s = s.memoizedProps), s !== null)) {
        var u = i.type;
        Pt(i.pendingProps.value, s.value) ||
          (t !== null ? t.push(u) : (t = [u]));
      }
    } else if (i === as.current) {
      if (((s = i.alternate), s === null)) throw Error(T(387));
      s.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
        (t !== null ? t.push(Yi) : (t = [Yi]));
    }
    i = i.return;
  }
  (t !== null && Ro(e, t, n, a), (e.flags |= 262144));
}
function fs(t) {
  for (t = t.firstContext; t !== null; ) {
    if (!Pt(t.context._currentValue, t.memoizedValue)) return !0;
    t = t.next;
  }
  return !1;
}
function Yn(t) {
  ((Fn = t),
    (Oe = null),
    (t = t.dependencies),
    t !== null && (t.firstContext = null));
}
function Ct(t) {
  return a0(Fn, t);
}
function Ml(t, e) {
  return (Fn === null && Yn(t), a0(t, e));
}
function a0(t, e) {
  var n = e._currentValue;
  if (((e = { context: e, memoizedValue: n, next: null }), Oe === null)) {
    if (t === null) throw Error(T(308));
    ((Oe = e),
      (t.dependencies = { lanes: 0, firstContext: e }),
      (t.flags |= 524288));
  } else Oe = Oe.next = e;
  return n;
}
var b1 =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var t = [],
            e = (this.signal = {
              aborted: !1,
              addEventListener: function (n, a) {
                t.push(a);
              },
            });
          this.abort = function () {
            ((e.aborted = !0),
              t.forEach(function (n) {
                return n();
              }));
          };
        },
  S1 = vt.unstable_scheduleCallback,
  x1 = vt.unstable_NormalPriority,
  mt = {
    $$typeof: Re,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function Qr() {
  return { controller: new b1(), data: new Map(), refCount: 0 };
}
function el(t) {
  (t.refCount--,
    t.refCount === 0 &&
      S1(x1, function () {
        t.controller.abort();
      }));
}
var yi = null,
  _o = 0,
  ja = 0,
  Ta = null;
function T1(t, e) {
  if (yi === null) {
    var n = (yi = []);
    ((_o = 0),
      (ja = pc()),
      (Ta = {
        status: "pending",
        value: void 0,
        then: function (a) {
          n.push(a);
        },
      }));
  }
  return (_o++, e.then(Vf, Vf), e);
}
function Vf() {
  if (--_o === 0 && yi !== null) {
    Ta !== null && (Ta.status = "fulfilled");
    var t = yi;
    ((yi = null), (ja = 0), (Ta = null));
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
}
function A1(t, e) {
  var n = [],
    a = {
      status: "pending",
      value: null,
      reason: null,
      then: function (i) {
        n.push(i);
      },
    };
  return (
    t.then(
      function () {
        ((a.status = "fulfilled"), (a.value = e));
        for (var i = 0; i < n.length; i++) (0, n[i])(e);
      },
      function (i) {
        for (a.status = "rejected", a.reason = i, i = 0; i < n.length; i++)
          (0, n[i])(void 0);
      },
    ),
    a
  );
}
var Uf = w.S;
w.S = function (t, e) {
  ((gp = Kt()),
    typeof e == "object" &&
      e !== null &&
      typeof e.then == "function" &&
      T1(t, e),
    Uf !== null && Uf(t, e));
};
var Un = Te(null);
function Kr() {
  var t = Un.current;
  return t !== null ? t : F.pooledCache;
}
function Ql(t, e) {
  e === null ? P(Un, Un.current) : P(Un, e.pool);
}
function i0() {
  var t = Kr();
  return t === null ? null : { parent: mt._currentValue, pool: t };
}
var Qa = Error(T(460)),
  Zr = Error(T(474)),
  Fs = Error(T(542)),
  ds = { then: function () {} };
function Bf(t) {
  return ((t = t.status), t === "fulfilled" || t === "rejected");
}
function l0(t, e, n) {
  switch (
    ((n = t[n]),
    n === void 0 ? t.push(e) : n !== e && (e.then(_e, _e), (e = n)),
    e.status)
  ) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw ((t = e.reason), Hf(t), t);
    default:
      if (typeof e.status == "string") e.then(_e, _e);
      else {
        if (((t = F), t !== null && 100 < t.shellSuspendCounter))
          throw Error(T(482));
        ((t = e),
          (t.status = "pending"),
          t.then(
            function (a) {
              if (e.status === "pending") {
                var i = e;
                ((i.status = "fulfilled"), (i.value = a));
              }
            },
            function (a) {
              if (e.status === "pending") {
                var i = e;
                ((i.status = "rejected"), (i.reason = a));
              }
            },
          ));
      }
      switch (e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw ((t = e.reason), Hf(t), t);
      }
      throw ((Bn = e), Qa);
  }
}
function jn(t) {
  try {
    var e = t._init;
    return e(t._payload);
  } catch (n) {
    throw n !== null && typeof n == "object" && typeof n.then == "function"
      ? ((Bn = n), Qa)
      : n;
  }
}
var Bn = null;
function Lf() {
  if (Bn === null) throw Error(T(459));
  var t = Bn;
  return ((Bn = null), t);
}
function Hf(t) {
  if (t === Qa || t === Fs) throw Error(T(483));
}
var Aa = null,
  Ui = 0;
function Dl(t) {
  var e = Ui;
  return ((Ui += 1), Aa === null && (Aa = []), l0(Aa, t, e));
}
function Ia(t, e) {
  ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
}
function Cl(t, e) {
  throw e.$$typeof === rv
    ? Error(T(525))
    : ((t = Object.prototype.toString.call(e)),
      Error(
        T(
          31,
          t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t,
        ),
      ));
}
function s0(t) {
  function e(p, h) {
    if (t) {
      var y = p.deletions;
      y === null ? ((p.deletions = [h]), (p.flags |= 16)) : y.push(h);
    }
  }
  function n(p, h) {
    if (!t) return null;
    for (; h !== null; ) (e(p, h), (h = h.sibling));
    return null;
  }
  function a(p) {
    for (var h = new Map(); p !== null; )
      (p.key !== null ? h.set(p.key, p) : h.set(p.index, p), (p = p.sibling));
    return h;
  }
  function i(p, h) {
    return ((p = we(p, h)), (p.index = 0), (p.sibling = null), p);
  }
  function l(p, h, y) {
    return (
      (p.index = y),
      t
        ? ((y = p.alternate),
          y !== null
            ? ((y = y.index), y < h ? ((p.flags |= 67108866), h) : y)
            : ((p.flags |= 67108866), h))
        : ((p.flags |= 1048576), h)
    );
  }
  function s(p) {
    return (t && p.alternate === null && (p.flags |= 67108866), p);
  }
  function u(p, h, y, v) {
    return h === null || h.tag !== 6
      ? ((h = Mu(y, p.mode, v)), (h.return = p), h)
      : ((h = i(h, y)), (h.return = p), h);
  }
  function o(p, h, y, v) {
    var x = y.type;
    return x === na
      ? c(p, h, y.props.children, v, y.key)
      : h !== null &&
          (h.elementType === x ||
            (typeof x == "object" &&
              x !== null &&
              x.$$typeof === Je &&
              jn(x) === h.type))
        ? ((h = i(h, y.props)), Ia(h, y), (h.return = p), h)
        : ((h = Xl(y.type, y.key, y.props, null, p.mode, v)),
          Ia(h, y),
          (h.return = p),
          h);
  }
  function r(p, h, y, v) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== y.containerInfo ||
      h.stateNode.implementation !== y.implementation
      ? ((h = Du(y, p.mode, v)), (h.return = p), h)
      : ((h = i(h, y.children || [])), (h.return = p), h);
  }
  function c(p, h, y, v, x) {
    return h === null || h.tag !== 7
      ? ((h = Vn(y, p.mode, v, x)), (h.return = p), h)
      : ((h = i(h, y)), (h.return = p), h);
  }
  function f(p, h, y) {
    if (
      (typeof h == "string" && h !== "") ||
      typeof h == "number" ||
      typeof h == "bigint"
    )
      return ((h = Mu("" + h, p.mode, y)), (h.return = p), h);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case bl:
          return (
            (y = Xl(h.type, h.key, h.props, null, p.mode, y)),
            Ia(y, h),
            (y.return = p),
            y
          );
        case ii:
          return ((h = Du(h, p.mode, y)), (h.return = p), h);
        case Je:
          return ((h = jn(h)), f(p, h, y));
      }
      if (li(h) || Pa(h))
        return ((h = Vn(h, p.mode, y, null)), (h.return = p), h);
      if (typeof h.then == "function") return f(p, Dl(h), y);
      if (h.$$typeof === Re) return f(p, Ml(p, h), y);
      Cl(p, h);
    }
    return null;
  }
  function d(p, h, y, v) {
    var x = h !== null ? h.key : null;
    if (
      (typeof y == "string" && y !== "") ||
      typeof y == "number" ||
      typeof y == "bigint"
    )
      return x !== null ? null : u(p, h, "" + y, v);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case bl:
          return y.key === x ? o(p, h, y, v) : null;
        case ii:
          return y.key === x ? r(p, h, y, v) : null;
        case Je:
          return ((y = jn(y)), d(p, h, y, v));
      }
      if (li(y) || Pa(y)) return x !== null ? null : c(p, h, y, v, null);
      if (typeof y.then == "function") return d(p, h, Dl(y), v);
      if (y.$$typeof === Re) return d(p, h, Ml(p, y), v);
      Cl(p, y);
    }
    return null;
  }
  function m(p, h, y, v, x) {
    if (
      (typeof v == "string" && v !== "") ||
      typeof v == "number" ||
      typeof v == "bigint"
    )
      return ((p = p.get(y) || null), u(h, p, "" + v, x));
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case bl:
          return (
            (p = p.get(v.key === null ? y : v.key) || null),
            o(h, p, v, x)
          );
        case ii:
          return (
            (p = p.get(v.key === null ? y : v.key) || null),
            r(h, p, v, x)
          );
        case Je:
          return ((v = jn(v)), m(p, h, y, v, x));
      }
      if (li(v) || Pa(v)) return ((p = p.get(y) || null), c(h, p, v, x, null));
      if (typeof v.then == "function") return m(p, h, y, Dl(v), x);
      if (v.$$typeof === Re) return m(p, h, y, Ml(h, v), x);
      Cl(h, v);
    }
    return null;
  }
  function b(p, h, y, v) {
    for (
      var x = null, C = null, E = h, D = (h = 0), N = null;
      E !== null && D < y.length;
      D++
    ) {
      E.index > D ? ((N = E), (E = null)) : (N = E.sibling);
      var j = d(p, E, y[D], v);
      if (j === null) {
        E === null && (E = N);
        break;
      }
      (t && E && j.alternate === null && e(p, E),
        (h = l(j, h, D)),
        C === null ? (x = j) : (C.sibling = j),
        (C = j),
        (E = N));
    }
    if (D === y.length) return (n(p, E), Y && je(p, D), x);
    if (E === null) {
      for (; D < y.length; D++)
        ((E = f(p, y[D], v)),
          E !== null &&
            ((h = l(E, h, D)),
            C === null ? (x = E) : (C.sibling = E),
            (C = E)));
      return (Y && je(p, D), x);
    }
    for (E = a(E); D < y.length; D++)
      ((N = m(E, p, D, y[D], v)),
        N !== null &&
          (t && N.alternate !== null && E.delete(N.key === null ? D : N.key),
          (h = l(N, h, D)),
          C === null ? (x = N) : (C.sibling = N),
          (C = N)));
    return (
      t &&
        E.forEach(function (U) {
          return e(p, U);
        }),
      Y && je(p, D),
      x
    );
  }
  function S(p, h, y, v) {
    if (y == null) throw Error(T(151));
    for (
      var x = null, C = null, E = h, D = (h = 0), N = null, j = y.next();
      E !== null && !j.done;
      D++, j = y.next()
    ) {
      E.index > D ? ((N = E), (E = null)) : (N = E.sibling);
      var U = d(p, E, j.value, v);
      if (U === null) {
        E === null && (E = N);
        break;
      }
      (t && E && U.alternate === null && e(p, E),
        (h = l(U, h, D)),
        C === null ? (x = U) : (C.sibling = U),
        (C = U),
        (E = N));
    }
    if (j.done) return (n(p, E), Y && je(p, D), x);
    if (E === null) {
      for (; !j.done; D++, j = y.next())
        ((j = f(p, j.value, v)),
          j !== null &&
            ((h = l(j, h, D)),
            C === null ? (x = j) : (C.sibling = j),
            (C = j)));
      return (Y && je(p, D), x);
    }
    for (E = a(E); !j.done; D++, j = y.next())
      ((j = m(E, p, D, j.value, v)),
        j !== null &&
          (t && j.alternate !== null && E.delete(j.key === null ? D : j.key),
          (h = l(j, h, D)),
          C === null ? (x = j) : (C.sibling = j),
          (C = j)));
    return (
      t &&
        E.forEach(function (yt) {
          return e(p, yt);
        }),
      Y && je(p, D),
      x
    );
  }
  function A(p, h, y, v) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === na &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case bl:
          t: {
            for (var x = y.key; h !== null; ) {
              if (h.key === x) {
                if (((x = y.type), x === na)) {
                  if (h.tag === 7) {
                    (n(p, h.sibling),
                      (v = i(h, y.props.children)),
                      (v.return = p),
                      (p = v));
                    break t;
                  }
                } else if (
                  h.elementType === x ||
                  (typeof x == "object" &&
                    x !== null &&
                    x.$$typeof === Je &&
                    jn(x) === h.type)
                ) {
                  (n(p, h.sibling),
                    (v = i(h, y.props)),
                    Ia(v, y),
                    (v.return = p),
                    (p = v));
                  break t;
                }
                n(p, h);
                break;
              } else e(p, h);
              h = h.sibling;
            }
            y.type === na
              ? ((v = Vn(y.props.children, p.mode, v, y.key)),
                (v.return = p),
                (p = v))
              : ((v = Xl(y.type, y.key, y.props, null, p.mode, v)),
                Ia(v, y),
                (v.return = p),
                (p = v));
          }
          return s(p);
        case ii:
          t: {
            for (x = y.key; h !== null; ) {
              if (h.key === x)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === y.containerInfo &&
                  h.stateNode.implementation === y.implementation
                ) {
                  (n(p, h.sibling),
                    (v = i(h, y.children || [])),
                    (v.return = p),
                    (p = v));
                  break t;
                } else {
                  n(p, h);
                  break;
                }
              else e(p, h);
              h = h.sibling;
            }
            ((v = Du(y, p.mode, v)), (v.return = p), (p = v));
          }
          return s(p);
        case Je:
          return ((y = jn(y)), A(p, h, y, v));
      }
      if (li(y)) return b(p, h, y, v);
      if (Pa(y)) {
        if (((x = Pa(y)), typeof x != "function")) throw Error(T(150));
        return ((y = x.call(y)), S(p, h, y, v));
      }
      if (typeof y.then == "function") return A(p, h, Dl(y), v);
      if (y.$$typeof === Re) return A(p, h, Ml(p, y), v);
      Cl(p, y);
    }
    return (typeof y == "string" && y !== "") ||
      typeof y == "number" ||
      typeof y == "bigint"
      ? ((y = "" + y),
        h !== null && h.tag === 6
          ? (n(p, h.sibling), (v = i(h, y)), (v.return = p), (p = v))
          : (n(p, h), (v = Mu(y, p.mode, v)), (v.return = p), (p = v)),
        s(p))
      : n(p, h);
  }
  return function (p, h, y, v) {
    try {
      Ui = 0;
      var x = A(p, h, y, v);
      return ((Aa = null), x);
    } catch (E) {
      if (E === Qa || E === Fs) throw E;
      var C = Xt(29, E, null, p.mode);
      return ((C.lanes = v), (C.return = p), C);
    } finally {
    }
  };
}
var Gn = s0(!0),
  u0 = s0(!1),
  Fe = !1;
function kr(t) {
  t.updateQueue = {
    baseState: t.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function Oo(t, e) {
  ((t = t.updateQueue),
    e.updateQueue === t &&
      (e.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        callbacks: null,
      }));
}
function on(t) {
  return { lane: t, tag: 0, payload: null, callback: null, next: null };
}
function rn(t, e, n) {
  var a = t.updateQueue;
  if (a === null) return null;
  if (((a = a.shared), G & 2)) {
    var i = a.pending;
    return (
      i === null ? (e.next = e) : ((e.next = i.next), (i.next = e)),
      (a.pending = e),
      (e = rs(t)),
      Wm(t, null, n),
      e
    );
  }
  return (Js(t, a, e, n), rs(t));
}
function gi(t, e, n) {
  if (
    ((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194048) !== 0))
  ) {
    var a = e.lanes;
    ((a &= t.pendingLanes), (n |= a), (e.lanes = n), Mm(t, n));
  }
}
function zu(t, e) {
  var n = t.updateQueue,
    a = t.alternate;
  if (a !== null && ((a = a.updateQueue), n === a)) {
    var i = null,
      l = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: null,
          next: null,
        };
        (l === null ? (i = l = s) : (l = l.next = s), (n = n.next));
      } while (n !== null);
      l === null ? (i = l = e) : (l = l.next = e);
    } else i = l = e;
    ((n = {
      baseState: a.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: l,
      shared: a.shared,
      callbacks: a.callbacks,
    }),
      (t.updateQueue = n));
    return;
  }
  ((t = n.lastBaseUpdate),
    t === null ? (n.firstBaseUpdate = e) : (t.next = e),
    (n.lastBaseUpdate = e));
}
var wo = !1;
function vi() {
  if (wo) {
    var t = Ta;
    if (t !== null) throw t;
  }
}
function bi(t, e, n, a) {
  wo = !1;
  var i = t.updateQueue;
  Fe = !1;
  var l = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    u = i.shared.pending;
  if (u !== null) {
    i.shared.pending = null;
    var o = u,
      r = o.next;
    ((o.next = null), s === null ? (l = r) : (s.next = r), (s = o));
    var c = t.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (u = c.lastBaseUpdate),
      u !== s &&
        (u === null ? (c.firstBaseUpdate = r) : (u.next = r),
        (c.lastBaseUpdate = o)));
  }
  if (l !== null) {
    var f = i.baseState;
    ((s = 0), (c = r = o = null), (u = l));
    do {
      var d = u.lane & -536870913,
        m = d !== u.lane;
      if (m ? (q & d) === d : (a & d) === d) {
        (d !== 0 && d === ja && (wo = !0),
          c !== null &&
            (c = c.next =
              {
                lane: 0,
                tag: u.tag,
                payload: u.payload,
                callback: null,
                next: null,
              }));
        t: {
          var b = t,
            S = u;
          d = e;
          var A = n;
          switch (S.tag) {
            case 1:
              if (((b = S.payload), typeof b == "function")) {
                f = b.call(A, f, d);
                break t;
              }
              f = b;
              break t;
            case 3:
              b.flags = (b.flags & -65537) | 128;
            case 0:
              if (
                ((b = S.payload),
                (d = typeof b == "function" ? b.call(A, f, d) : b),
                d == null)
              )
                break t;
              f = nt({}, f, d);
              break t;
            case 2:
              Fe = !0;
          }
        }
        ((d = u.callback),
          d !== null &&
            ((t.flags |= 64),
            m && (t.flags |= 8192),
            (m = i.callbacks),
            m === null ? (i.callbacks = [d]) : m.push(d)));
      } else
        ((m = {
          lane: d,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          c === null ? ((r = c = m), (o = f)) : (c = c.next = m),
          (s |= d));
      if (((u = u.next), u === null)) {
        if (((u = i.shared.pending), u === null)) break;
        ((m = u),
          (u = m.next),
          (m.next = null),
          (i.lastBaseUpdate = m),
          (i.shared.pending = null));
      }
    } while (!0);
    (c === null && (o = f),
      (i.baseState = o),
      (i.firstBaseUpdate = r),
      (i.lastBaseUpdate = c),
      l === null && (i.shared.lanes = 0),
      (vn |= s),
      (t.lanes = s),
      (t.memoizedState = f));
  }
}
function o0(t, e) {
  if (typeof t != "function") throw Error(T(191, t));
  t.call(e);
}
function r0(t, e) {
  var n = t.callbacks;
  if (n !== null)
    for (t.callbacks = null, t = 0; t < n.length; t++) o0(n[t], e);
}
var Na = Te(null),
  hs = Te(0);
function qf(t, e) {
  ((t = Xe), P(hs, t), P(Na, e), (Xe = t | e.baseLanes));
}
function Vo() {
  (P(hs, Xe), P(Na, Na.current));
}
function Jr() {
  ((Xe = hs.current), xt(Na), xt(hs));
}
var $t = Te(null),
  re = null;
function $e(t) {
  var e = t.alternate;
  (P(ct, ct.current & 1),
    P($t, t),
    re === null &&
      (e === null || Na.current !== null || e.memoizedState !== null) &&
      (re = t));
}
function Uo(t) {
  (P(ct, ct.current), P($t, t), re === null && (re = t));
}
function c0(t) {
  t.tag === 22 ? (P(ct, ct.current), P($t, t), re === null && (re = t)) : We();
}
function We() {
  (P(ct, ct.current), P($t, $t.current));
}
function Gt(t) {
  (xt($t), re === t && (re = null), xt(ct));
}
var ct = Te(0);
function ms(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || er(n) || nr(n)))
        return e;
    } else if (
      e.tag === 19 &&
      (e.memoizedProps.revealOrder === "forwards" ||
        e.memoizedProps.revealOrder === "backwards" ||
        e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
        e.memoizedProps.revealOrder === "together")
    ) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      ((e.child.return = e), (e = e.child));
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    ((e.sibling.return = e.return), (e = e.sibling));
  }
  return null;
}
var qe = 0,
  B = null,
  J = null,
  dt = null,
  ps = !1,
  Ea = !1,
  Xn = !1,
  ys = 0,
  Bi = 0,
  Ma = null,
  E1 = 0;
function st() {
  throw Error(T(321));
}
function Fr(t, e) {
  if (e === null) return !1;
  for (var n = 0; n < e.length && n < t.length; n++)
    if (!Pt(t[n], e[n])) return !1;
  return !0;
}
function Pr(t, e, n, a, i, l) {
  return (
    (qe = l),
    (B = e),
    (e.memoizedState = null),
    (e.updateQueue = null),
    (e.lanes = 0),
    (w.H = t === null || t.memoizedState === null ? Y0 : uc),
    (Xn = !1),
    (l = n(a, i)),
    (Xn = !1),
    Ea && (l = d0(e, n, a, i)),
    f0(t),
    l
  );
}
function f0(t) {
  w.H = Li;
  var e = J !== null && J.next !== null;
  if (((qe = 0), (dt = J = B = null), (ps = !1), (Bi = 0), (Ma = null), e))
    throw Error(T(300));
  t === null || pt || ((t = t.dependencies), t !== null && fs(t) && (pt = !0));
}
function d0(t, e, n, a) {
  B = t;
  var i = 0;
  do {
    if ((Ea && (Ma = null), (Bi = 0), (Ea = !1), 25 <= i)) throw Error(T(301));
    if (((i += 1), (dt = J = null), t.updateQueue != null)) {
      var l = t.updateQueue;
      ((l.lastEffect = null),
        (l.events = null),
        (l.stores = null),
        l.memoCache != null && (l.memoCache.index = 0));
    }
    ((w.H = G0), (l = e(n, a)));
  } while (Ea);
  return l;
}
function M1() {
  var t = w.H,
    e = t.useState()[0];
  return (
    (e = typeof e.then == "function" ? nl(e) : e),
    (t = t.useState()[0]),
    (J !== null ? J.memoizedState : null) !== t && (B.flags |= 1024),
    e
  );
}
function $r() {
  var t = ys !== 0;
  return ((ys = 0), t);
}
function Wr(t, e, n) {
  ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n));
}
function Ir(t) {
  if (ps) {
    for (t = t.memoizedState; t !== null; ) {
      var e = t.queue;
      (e !== null && (e.pending = null), (t = t.next));
    }
    ps = !1;
  }
  ((qe = 0), (dt = J = B = null), (Ea = !1), (Bi = ys = 0), (Ma = null));
}
function Rt() {
  var t = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (dt === null ? (B.memoizedState = dt = t) : (dt = dt.next = t), dt);
}
function ft() {
  if (J === null) {
    var t = B.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = J.next;
  var e = dt === null ? B.memoizedState : dt.next;
  if (e !== null) ((dt = e), (J = t));
  else {
    if (t === null) throw B.alternate === null ? Error(T(467)) : Error(T(310));
    ((J = t),
      (t = {
        memoizedState: J.memoizedState,
        baseState: J.baseState,
        baseQueue: J.baseQueue,
        queue: J.queue,
        next: null,
      }),
      dt === null ? (B.memoizedState = dt = t) : (dt = dt.next = t));
  }
  return dt;
}
function Ps() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function nl(t) {
  var e = Bi;
  return (
    (Bi += 1),
    Ma === null && (Ma = []),
    (t = l0(Ma, t, e)),
    (e = B),
    (dt === null ? e.memoizedState : dt.next) === null &&
      ((e = e.alternate),
      (w.H = e === null || e.memoizedState === null ? Y0 : uc)),
    t
  );
}
function $s(t) {
  if (t !== null && typeof t == "object") {
    if (typeof t.then == "function") return nl(t);
    if (t.$$typeof === Re) return Ct(t);
  }
  throw Error(T(438, String(t)));
}
function tc(t) {
  var e = null,
    n = B.updateQueue;
  if ((n !== null && (e = n.memoCache), e == null)) {
    var a = B.alternate;
    a !== null &&
      ((a = a.updateQueue),
      a !== null &&
        ((a = a.memoCache),
        a != null &&
          (e = {
            data: a.data.map(function (i) {
              return i.slice();
            }),
            index: 0,
          })));
  }
  if (
    (e == null && (e = { data: [], index: 0 }),
    n === null && ((n = Ps()), (B.updateQueue = n)),
    (n.memoCache = e),
    (n = e.data[e.index]),
    n === void 0)
  )
    for (n = e.data[e.index] = Array(t), a = 0; a < t; a++) n[a] = cv;
  return (e.index++, n);
}
function Ye(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Kl(t) {
  var e = ft();
  return ec(e, J, t);
}
function ec(t, e, n) {
  var a = t.queue;
  if (a === null) throw Error(T(311));
  a.lastRenderedReducer = n;
  var i = t.baseQueue,
    l = a.pending;
  if (l !== null) {
    if (i !== null) {
      var s = i.next;
      ((i.next = l.next), (l.next = s));
    }
    ((e.baseQueue = i = l), (a.pending = null));
  }
  if (((l = t.baseState), i === null)) t.memoizedState = l;
  else {
    e = i.next;
    var u = (s = null),
      o = null,
      r = e,
      c = !1;
    do {
      var f = r.lane & -536870913;
      if (f !== r.lane ? (q & f) === f : (qe & f) === f) {
        var d = r.revertLane;
        if (d === 0)
          (o !== null &&
            (o = o.next =
              {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: r.action,
                hasEagerState: r.hasEagerState,
                eagerState: r.eagerState,
                next: null,
              }),
            f === ja && (c = !0));
        else if ((qe & d) === d) {
          ((r = r.next), d === ja && (c = !0));
          continue;
        } else
          ((f = {
            lane: 0,
            revertLane: r.revertLane,
            gesture: null,
            action: r.action,
            hasEagerState: r.hasEagerState,
            eagerState: r.eagerState,
            next: null,
          }),
            o === null ? ((u = o = f), (s = l)) : (o = o.next = f),
            (B.lanes |= d),
            (vn |= d));
        ((f = r.action),
          Xn && n(l, f),
          (l = r.hasEagerState ? r.eagerState : n(l, f)));
      } else
        ((d = {
          lane: f,
          revertLane: r.revertLane,
          gesture: r.gesture,
          action: r.action,
          hasEagerState: r.hasEagerState,
          eagerState: r.eagerState,
          next: null,
        }),
          o === null ? ((u = o = d), (s = l)) : (o = o.next = d),
          (B.lanes |= f),
          (vn |= f));
      r = r.next;
    } while (r !== null && r !== e);
    if (
      (o === null ? (s = l) : (o.next = u),
      !Pt(l, t.memoizedState) && ((pt = !0), c && ((n = Ta), n !== null)))
    )
      throw n;
    ((t.memoizedState = l),
      (t.baseState = s),
      (t.baseQueue = o),
      (a.lastRenderedState = l));
  }
  return (i === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
}
function ju(t) {
  var e = ft(),
    n = e.queue;
  if (n === null) throw Error(T(311));
  n.lastRenderedReducer = t;
  var a = n.dispatch,
    i = n.pending,
    l = e.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do ((l = t(l, s.action)), (s = s.next));
    while (s !== i);
    (Pt(l, e.memoizedState) || (pt = !0),
      (e.memoizedState = l),
      e.baseQueue === null && (e.baseState = l),
      (n.lastRenderedState = l));
  }
  return [l, a];
}
function h0(t, e, n) {
  var a = B,
    i = ft(),
    l = Y;
  if (l) {
    if (n === void 0) throw Error(T(407));
    n = n();
  } else n = e();
  var s = !Pt((J || i).memoizedState, n);
  if (
    (s && ((i.memoizedState = n), (pt = !0)),
    (i = i.queue),
    nc(y0.bind(null, a, i, t), [t]),
    i.getSnapshot !== e || s || (dt !== null && dt.memoizedState.tag & 1))
  ) {
    if (
      ((a.flags |= 2048),
      Ra(9, { destroy: void 0 }, p0.bind(null, a, i, n, e), null),
      F === null)
    )
      throw Error(T(349));
    l || qe & 127 || m0(a, e, n);
  }
  return n;
}
function m0(t, e, n) {
  ((t.flags |= 16384),
    (t = { getSnapshot: e, value: n }),
    (e = B.updateQueue),
    e === null
      ? ((e = Ps()), (B.updateQueue = e), (e.stores = [t]))
      : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t)));
}
function p0(t, e, n, a) {
  ((e.value = n), (e.getSnapshot = a), g0(e) && v0(t));
}
function y0(t, e, n) {
  return n(function () {
    g0(e) && v0(t);
  });
}
function g0(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Pt(t, n);
  } catch {
    return !0;
  }
}
function v0(t) {
  var e = Jn(t, 2);
  e !== null && Lt(e, t, 2);
}
function Bo(t) {
  var e = Rt();
  if (typeof t == "function") {
    var n = t;
    if (((t = n()), Xn)) {
      tn(!0);
      try {
        n();
      } finally {
        tn(!1);
      }
    }
  }
  return (
    (e.memoizedState = e.baseState = t),
    (e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ye,
      lastRenderedState: t,
    }),
    e
  );
}
function b0(t, e, n, a) {
  return ((t.baseState = n), ec(t, J, typeof a == "function" ? a : Ye));
}
function D1(t, e, n, a, i) {
  if (Is(t)) throw Error(T(485));
  if (((t = e.action), t !== null)) {
    var l = {
      payload: i,
      action: t,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (s) {
        l.listeners.push(s);
      },
    };
    (w.T !== null ? n(!0) : (l.isTransition = !1),
      a(l),
      (n = e.pending),
      n === null
        ? ((l.next = e.pending = l), S0(e, l))
        : ((l.next = n.next), (e.pending = n.next = l)));
  }
}
function S0(t, e) {
  var n = e.action,
    a = e.payload,
    i = t.state;
  if (e.isTransition) {
    var l = w.T,
      s = {};
    w.T = s;
    try {
      var u = n(i, a),
        o = w.S;
      (o !== null && o(s, u), Yf(t, e, u));
    } catch (r) {
      Lo(t, e, r);
    } finally {
      (l !== null && s.types !== null && (l.types = s.types), (w.T = l));
    }
  } else
    try {
      ((l = n(i, a)), Yf(t, e, l));
    } catch (r) {
      Lo(t, e, r);
    }
}
function Yf(t, e, n) {
  n !== null && typeof n == "object" && typeof n.then == "function"
    ? n.then(
        function (a) {
          Gf(t, e, a);
        },
        function (a) {
          return Lo(t, e, a);
        },
      )
    : Gf(t, e, n);
}
function Gf(t, e, n) {
  ((e.status = "fulfilled"),
    (e.value = n),
    x0(e),
    (t.state = n),
    (e = t.pending),
    e !== null &&
      ((n = e.next),
      n === e ? (t.pending = null) : ((n = n.next), (e.next = n), S0(t, n))));
}
function Lo(t, e, n) {
  var a = t.pending;
  if (((t.pending = null), a !== null)) {
    a = a.next;
    do ((e.status = "rejected"), (e.reason = n), x0(e), (e = e.next));
    while (e !== a);
  }
  t.action = null;
}
function x0(t) {
  t = t.listeners;
  for (var e = 0; e < t.length; e++) (0, t[e])();
}
function T0(t, e) {
  return e;
}
function Xf(t, e) {
  if (Y) {
    var n = F.formState;
    if (n !== null) {
      t: {
        var a = B;
        if (Y) {
          if (I) {
            e: {
              for (var i = I, l = oe; i.nodeType !== 8; ) {
                if (!l) {
                  i = null;
                  break e;
                }
                if (((i = ce(i.nextSibling)), i === null)) {
                  i = null;
                  break e;
                }
              }
              ((l = i.data), (i = l === "F!" || l === "F" ? i : null));
            }
            if (i) {
              ((I = ce(i.nextSibling)), (a = i.data === "F!"));
              break t;
            }
          }
          yn(a);
        }
        a = !1;
      }
      a && (e = n[0]);
    }
  }
  return (
    (n = Rt()),
    (n.memoizedState = n.baseState = e),
    (a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: T0,
      lastRenderedState: e,
    }),
    (n.queue = a),
    (n = L0.bind(null, B, a)),
    (a.dispatch = n),
    (a = Bo(!1)),
    (l = sc.bind(null, B, !1, a.queue)),
    (a = Rt()),
    (i = { state: e, dispatch: null, action: t, pending: null }),
    (a.queue = i),
    (n = D1.bind(null, B, i, l, n)),
    (i.dispatch = n),
    (a.memoizedState = t),
    [e, n, !1]
  );
}
function Qf(t) {
  var e = ft();
  return A0(e, J, t);
}
function A0(t, e, n) {
  if (
    ((e = ec(t, e, T0)[0]),
    (t = Kl(Ye)[0]),
    typeof e == "object" && e !== null && typeof e.then == "function")
  )
    try {
      var a = nl(e);
    } catch (s) {
      throw s === Qa ? Fs : s;
    }
  else a = e;
  e = ft();
  var i = e.queue,
    l = i.dispatch;
  return (
    n !== e.memoizedState &&
      ((B.flags |= 2048),
      Ra(9, { destroy: void 0 }, C1.bind(null, i, n), null)),
    [a, l, t]
  );
}
function C1(t, e) {
  t.action = e;
}
function Kf(t) {
  var e = ft(),
    n = J;
  if (n !== null) return A0(e, n, t);
  (ft(), (e = e.memoizedState), (n = ft()));
  var a = n.queue.dispatch;
  return ((n.memoizedState = t), [e, a, !1]);
}
function Ra(t, e, n, a) {
  return (
    (t = { tag: t, create: n, deps: a, inst: e, next: null }),
    (e = B.updateQueue),
    e === null && ((e = Ps()), (B.updateQueue = e)),
    (n = e.lastEffect),
    n === null
      ? (e.lastEffect = t.next = t)
      : ((a = n.next), (n.next = t), (t.next = a), (e.lastEffect = t)),
    t
  );
}
function E0() {
  return ft().memoizedState;
}
function Zl(t, e, n, a) {
  var i = Rt();
  ((B.flags |= t),
    (i.memoizedState = Ra(
      1 | e,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a,
    )));
}
function Ws(t, e, n, a) {
  var i = ft();
  a = a === void 0 ? null : a;
  var l = i.memoizedState.inst;
  J !== null && a !== null && Fr(a, J.memoizedState.deps)
    ? (i.memoizedState = Ra(e, l, n, a))
    : ((B.flags |= t), (i.memoizedState = Ra(1 | e, l, n, a)));
}
function Zf(t, e) {
  Zl(8390656, 8, t, e);
}
function nc(t, e) {
  Ws(2048, 8, t, e);
}
function z1(t) {
  B.flags |= 4;
  var e = B.updateQueue;
  if (e === null) ((e = Ps()), (B.updateQueue = e), (e.events = [t]));
  else {
    var n = e.events;
    n === null ? (e.events = [t]) : n.push(t);
  }
}
function M0(t) {
  var e = ft().memoizedState;
  return (
    z1({ ref: e, nextImpl: t }),
    function () {
      if (G & 2) throw Error(T(440));
      return e.impl.apply(void 0, arguments);
    }
  );
}
function D0(t, e) {
  return Ws(4, 2, t, e);
}
function C0(t, e) {
  return Ws(4, 4, t, e);
}
function z0(t, e) {
  if (typeof e == "function") {
    t = t();
    var n = e(t);
    return function () {
      typeof n == "function" ? n() : e(null);
    };
  }
  if (e != null)
    return (
      (t = t()),
      (e.current = t),
      function () {
        e.current = null;
      }
    );
}
function j0(t, e, n) {
  ((n = n != null ? n.concat([t]) : null), Ws(4, 4, z0.bind(null, e, t), n));
}
function ac() {}
function N0(t, e) {
  var n = ft();
  e = e === void 0 ? null : e;
  var a = n.memoizedState;
  return e !== null && Fr(e, a[1]) ? a[0] : ((n.memoizedState = [t, e]), t);
}
function R0(t, e) {
  var n = ft();
  e = e === void 0 ? null : e;
  var a = n.memoizedState;
  if (e !== null && Fr(e, a[1])) return a[0];
  if (((a = t()), Xn)) {
    tn(!0);
    try {
      t();
    } finally {
      tn(!1);
    }
  }
  return ((n.memoizedState = [a, e]), a);
}
function ic(t, e, n) {
  return n === void 0 || (qe & 1073741824 && !(q & 261930))
    ? (t.memoizedState = e)
    : ((t.memoizedState = n), (t = bp()), (B.lanes |= t), (vn |= t), n);
}
function _0(t, e, n, a) {
  return Pt(n, e)
    ? n
    : Na.current !== null
      ? ((t = ic(t, n, a)), Pt(t, e) || (pt = !0), t)
      : !(qe & 42) || (qe & 1073741824 && !(q & 261930))
        ? ((pt = !0), (t.memoizedState = n))
        : ((t = bp()), (B.lanes |= t), (vn |= t), e);
}
function O0(t, e, n, a, i) {
  var l = X.p;
  X.p = l !== 0 && 8 > l ? l : 8;
  var s = w.T,
    u = {};
  ((w.T = u), sc(t, !1, e, n));
  try {
    var o = i(),
      r = w.S;
    if (
      (r !== null && r(u, o),
      o !== null && typeof o == "object" && typeof o.then == "function")
    ) {
      var c = A1(o, a);
      Si(t, e, c, Jt(t));
    } else Si(t, e, a, Jt(t));
  } catch (f) {
    Si(t, e, { then: function () {}, status: "rejected", reason: f }, Jt());
  } finally {
    ((X.p = l),
      s !== null && u.types !== null && (s.types = u.types),
      (w.T = s));
  }
}
function j1() {}
function Ho(t, e, n, a) {
  if (t.tag !== 5) throw Error(T(476));
  var i = w0(t).queue;
  O0(
    t,
    i,
    e,
    wn,
    n === null
      ? j1
      : function () {
          return (V0(t), n(a));
        },
  );
}
function w0(t) {
  var e = t.memoizedState;
  if (e !== null) return e;
  e = {
    memoizedState: wn,
    baseState: wn,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ye,
      lastRenderedState: wn,
    },
    next: null,
  };
  var n = {};
  return (
    (e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ye,
        lastRenderedState: n,
      },
      next: null,
    }),
    (t.memoizedState = e),
    (t = t.alternate),
    t !== null && (t.memoizedState = e),
    e
  );
}
function V0(t) {
  var e = w0(t);
  (e.next === null && (e = t.alternate.memoizedState),
    Si(t, e.next.queue, {}, Jt()));
}
function lc() {
  return Ct(Yi);
}
function U0() {
  return ft().memoizedState;
}
function B0() {
  return ft().memoizedState;
}
function N1(t) {
  for (var e = t.return; e !== null; ) {
    switch (e.tag) {
      case 24:
      case 3:
        var n = Jt();
        t = on(n);
        var a = rn(e, t, n);
        (a !== null && (Lt(a, e, n), gi(a, e, n)),
          (e = { cache: Qr() }),
          (t.payload = e));
        return;
    }
    e = e.return;
  }
}
function R1(t, e, n) {
  var a = Jt();
  ((n = {
    lane: a,
    revertLane: 0,
    gesture: null,
    action: n,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    Is(t)
      ? H0(e, n)
      : ((n = qr(t, e, n, a)), n !== null && (Lt(n, t, a), q0(n, e, a))));
}
function L0(t, e, n) {
  var a = Jt();
  Si(t, e, n, a);
}
function Si(t, e, n, a) {
  var i = {
    lane: a,
    revertLane: 0,
    gesture: null,
    action: n,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if (Is(t)) H0(e, i);
  else {
    var l = t.alternate;
    if (
      t.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = e.lastRenderedReducer), l !== null)
    )
      try {
        var s = e.lastRenderedState,
          u = l(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = u), Pt(u, s)))
          return (Js(t, e, i, 0), F === null && ks(), !1);
      } catch {
      } finally {
      }
    if (((n = qr(t, e, i, a)), n !== null))
      return (Lt(n, t, a), q0(n, e, a), !0);
  }
  return !1;
}
function sc(t, e, n, a) {
  if (
    ((a = {
      lane: 2,
      revertLane: pc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Is(t))
  ) {
    if (e) throw Error(T(479));
  } else ((e = qr(t, n, a, 2)), e !== null && Lt(e, t, 2));
}
function Is(t) {
  var e = t.alternate;
  return t === B || (e !== null && e === B);
}
function H0(t, e) {
  Ea = ps = !0;
  var n = t.pending;
  (n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
    (t.pending = e));
}
function q0(t, e, n) {
  if (n & 4194048) {
    var a = e.lanes;
    ((a &= t.pendingLanes), (n |= a), (e.lanes = n), Mm(t, n));
  }
}
var Li = {
  readContext: Ct,
  use: $s,
  useCallback: st,
  useContext: st,
  useEffect: st,
  useImperativeHandle: st,
  useLayoutEffect: st,
  useInsertionEffect: st,
  useMemo: st,
  useReducer: st,
  useRef: st,
  useState: st,
  useDebugValue: st,
  useDeferredValue: st,
  useTransition: st,
  useSyncExternalStore: st,
  useId: st,
  useHostTransitionStatus: st,
  useFormState: st,
  useActionState: st,
  useOptimistic: st,
  useMemoCache: st,
  useCacheRefresh: st,
};
Li.useEffectEvent = st;
var Y0 = {
    readContext: Ct,
    use: $s,
    useCallback: function (t, e) {
      return ((Rt().memoizedState = [t, e === void 0 ? null : e]), t);
    },
    useContext: Ct,
    useEffect: Zf,
    useImperativeHandle: function (t, e, n) {
      ((n = n != null ? n.concat([t]) : null),
        Zl(4194308, 4, z0.bind(null, e, t), n));
    },
    useLayoutEffect: function (t, e) {
      return Zl(4194308, 4, t, e);
    },
    useInsertionEffect: function (t, e) {
      Zl(4, 2, t, e);
    },
    useMemo: function (t, e) {
      var n = Rt();
      e = e === void 0 ? null : e;
      var a = t();
      if (Xn) {
        tn(!0);
        try {
          t();
        } finally {
          tn(!1);
        }
      }
      return ((n.memoizedState = [a, e]), a);
    },
    useReducer: function (t, e, n) {
      var a = Rt();
      if (n !== void 0) {
        var i = n(e);
        if (Xn) {
          tn(!0);
          try {
            n(e);
          } finally {
            tn(!1);
          }
        }
      } else i = e;
      return (
        (a.memoizedState = a.baseState = i),
        (t = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: t,
          lastRenderedState: i,
        }),
        (a.queue = t),
        (t = t.dispatch = R1.bind(null, B, t)),
        [a.memoizedState, t]
      );
    },
    useRef: function (t) {
      var e = Rt();
      return ((t = { current: t }), (e.memoizedState = t));
    },
    useState: function (t) {
      t = Bo(t);
      var e = t.queue,
        n = L0.bind(null, B, e);
      return ((e.dispatch = n), [t.memoizedState, n]);
    },
    useDebugValue: ac,
    useDeferredValue: function (t, e) {
      var n = Rt();
      return ic(n, t, e);
    },
    useTransition: function () {
      var t = Bo(!1);
      return (
        (t = O0.bind(null, B, t.queue, !0, !1)),
        (Rt().memoizedState = t),
        [!1, t]
      );
    },
    useSyncExternalStore: function (t, e, n) {
      var a = B,
        i = Rt();
      if (Y) {
        if (n === void 0) throw Error(T(407));
        n = n();
      } else {
        if (((n = e()), F === null)) throw Error(T(349));
        q & 127 || m0(a, e, n);
      }
      i.memoizedState = n;
      var l = { value: n, getSnapshot: e };
      return (
        (i.queue = l),
        Zf(y0.bind(null, a, l, t), [t]),
        (a.flags |= 2048),
        Ra(9, { destroy: void 0 }, p0.bind(null, a, l, n, e), null),
        n
      );
    },
    useId: function () {
      var t = Rt(),
        e = F.identifierPrefix;
      if (Y) {
        var n = ge,
          a = ye;
        ((n = (a & ~(1 << (32 - kt(a) - 1))).toString(32) + n),
          (e = "_" + e + "R_" + n),
          (n = ys++),
          0 < n && (e += "H" + n.toString(32)),
          (e += "_"));
      } else ((n = E1++), (e = "_" + e + "r_" + n.toString(32) + "_"));
      return (t.memoizedState = e);
    },
    useHostTransitionStatus: lc,
    useFormState: Xf,
    useActionState: Xf,
    useOptimistic: function (t) {
      var e = Rt();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (e.queue = n),
        (e = sc.bind(null, B, !0, n)),
        (n.dispatch = e),
        [t, e]
      );
    },
    useMemoCache: tc,
    useCacheRefresh: function () {
      return (Rt().memoizedState = N1.bind(null, B));
    },
    useEffectEvent: function (t) {
      var e = Rt(),
        n = { impl: t };
      return (
        (e.memoizedState = n),
        function () {
          if (G & 2) throw Error(T(440));
          return n.impl.apply(void 0, arguments);
        }
      );
    },
  },
  uc = {
    readContext: Ct,
    use: $s,
    useCallback: N0,
    useContext: Ct,
    useEffect: nc,
    useImperativeHandle: j0,
    useInsertionEffect: D0,
    useLayoutEffect: C0,
    useMemo: R0,
    useReducer: Kl,
    useRef: E0,
    useState: function () {
      return Kl(Ye);
    },
    useDebugValue: ac,
    useDeferredValue: function (t, e) {
      var n = ft();
      return _0(n, J.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Kl(Ye)[0],
        e = ft().memoizedState;
      return [typeof t == "boolean" ? t : nl(t), e];
    },
    useSyncExternalStore: h0,
    useId: U0,
    useHostTransitionStatus: lc,
    useFormState: Qf,
    useActionState: Qf,
    useOptimistic: function (t, e) {
      var n = ft();
      return b0(n, J, t, e);
    },
    useMemoCache: tc,
    useCacheRefresh: B0,
  };
uc.useEffectEvent = M0;
var G0 = {
  readContext: Ct,
  use: $s,
  useCallback: N0,
  useContext: Ct,
  useEffect: nc,
  useImperativeHandle: j0,
  useInsertionEffect: D0,
  useLayoutEffect: C0,
  useMemo: R0,
  useReducer: ju,
  useRef: E0,
  useState: function () {
    return ju(Ye);
  },
  useDebugValue: ac,
  useDeferredValue: function (t, e) {
    var n = ft();
    return J === null ? ic(n, t, e) : _0(n, J.memoizedState, t, e);
  },
  useTransition: function () {
    var t = ju(Ye)[0],
      e = ft().memoizedState;
    return [typeof t == "boolean" ? t : nl(t), e];
  },
  useSyncExternalStore: h0,
  useId: U0,
  useHostTransitionStatus: lc,
  useFormState: Kf,
  useActionState: Kf,
  useOptimistic: function (t, e) {
    var n = ft();
    return J !== null
      ? b0(n, J, t, e)
      : ((n.baseState = t), [t, n.queue.dispatch]);
  },
  useMemoCache: tc,
  useCacheRefresh: B0,
};
G0.useEffectEvent = M0;
function Nu(t, e, n, a) {
  ((e = t.memoizedState),
    (n = n(a, e)),
    (n = n == null ? e : nt({}, e, n)),
    (t.memoizedState = n),
    t.lanes === 0 && (t.updateQueue.baseState = n));
}
var qo = {
  enqueueSetState: function (t, e, n) {
    t = t._reactInternals;
    var a = Jt(),
      i = on(a);
    ((i.payload = e),
      n != null && (i.callback = n),
      (e = rn(t, i, a)),
      e !== null && (Lt(e, t, a), gi(e, t, a)));
  },
  enqueueReplaceState: function (t, e, n) {
    t = t._reactInternals;
    var a = Jt(),
      i = on(a);
    ((i.tag = 1),
      (i.payload = e),
      n != null && (i.callback = n),
      (e = rn(t, i, a)),
      e !== null && (Lt(e, t, a), gi(e, t, a)));
  },
  enqueueForceUpdate: function (t, e) {
    t = t._reactInternals;
    var n = Jt(),
      a = on(n);
    ((a.tag = 2),
      e != null && (a.callback = e),
      (e = rn(t, a, n)),
      e !== null && (Lt(e, t, n), gi(e, t, n)));
  },
};
function kf(t, e, n, a, i, l, s) {
  return (
    (t = t.stateNode),
    typeof t.shouldComponentUpdate == "function"
      ? t.shouldComponentUpdate(a, l, s)
      : e.prototype && e.prototype.isPureReactComponent
        ? !Oi(n, a) || !Oi(i, l)
        : !0
  );
}
function Jf(t, e, n, a) {
  ((t = e.state),
    typeof e.componentWillReceiveProps == "function" &&
      e.componentWillReceiveProps(n, a),
    typeof e.UNSAFE_componentWillReceiveProps == "function" &&
      e.UNSAFE_componentWillReceiveProps(n, a),
    e.state !== t && qo.enqueueReplaceState(e, e.state, null));
}
function Qn(t, e) {
  var n = e;
  if ("ref" in e) {
    n = {};
    for (var a in e) a !== "ref" && (n[a] = e[a]);
  }
  if ((t = t.defaultProps)) {
    n === e && (n = nt({}, n));
    for (var i in t) n[i] === void 0 && (n[i] = t[i]);
  }
  return n;
}
function X0(t) {
  os(t);
}
function Q0(t) {
  console.error(t);
}
function K0(t) {
  os(t);
}
function gs(t, e) {
  try {
    var n = t.onUncaughtError;
    n(e.value, { componentStack: e.stack });
  } catch (a) {
    setTimeout(function () {
      throw a;
    });
  }
}
function Ff(t, e, n) {
  try {
    var a = t.onCaughtError;
    a(n.value, {
      componentStack: n.stack,
      errorBoundary: e.tag === 1 ? e.stateNode : null,
    });
  } catch (i) {
    setTimeout(function () {
      throw i;
    });
  }
}
function Yo(t, e, n) {
  return (
    (n = on(n)),
    (n.tag = 3),
    (n.payload = { element: null }),
    (n.callback = function () {
      gs(t, e);
    }),
    n
  );
}
function Z0(t) {
  return ((t = on(t)), (t.tag = 3), t);
}
function k0(t, e, n, a) {
  var i = n.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var l = a.value;
    ((t.payload = function () {
      return i(l);
    }),
      (t.callback = function () {
        Ff(e, n, a);
      }));
  }
  var s = n.stateNode;
  s !== null &&
    typeof s.componentDidCatch == "function" &&
    (t.callback = function () {
      (Ff(e, n, a),
        typeof i != "function" &&
          (cn === null ? (cn = new Set([this])) : cn.add(this)));
      var u = a.stack;
      this.componentDidCatch(a.value, { componentStack: u !== null ? u : "" });
    });
}
function _1(t, e, n, a, i) {
  if (
    ((n.flags |= 32768),
    a !== null && typeof a == "object" && typeof a.then == "function")
  ) {
    if (
      ((e = n.alternate),
      e !== null && Xa(e, n, i, !0),
      (n = $t.current),
      n !== null)
    ) {
      switch (n.tag) {
        case 31:
        case 13:
          return (
            re === null ? Ts() : n.alternate === null && ot === 0 && (ot = 3),
            (n.flags &= -257),
            (n.flags |= 65536),
            (n.lanes = i),
            a === ds
              ? (n.flags |= 16384)
              : ((e = n.updateQueue),
                e === null ? (n.updateQueue = new Set([a])) : e.add(a),
                Yu(t, a, i)),
            !1
          );
        case 22:
          return (
            (n.flags |= 65536),
            a === ds
              ? (n.flags |= 16384)
              : ((e = n.updateQueue),
                e === null
                  ? ((e = {
                      transitions: null,
                      markerInstances: null,
                      retryQueue: new Set([a]),
                    }),
                    (n.updateQueue = e))
                  : ((n = e.retryQueue),
                    n === null ? (e.retryQueue = new Set([a])) : n.add(a)),
                Yu(t, a, i)),
            !1
          );
      }
      throw Error(T(435, n.tag));
    }
    return (Yu(t, a, i), Ts(), !1);
  }
  if (Y)
    return (
      (e = $t.current),
      e !== null
        ? (!(e.flags & 65536) && (e.flags |= 256),
          (e.flags |= 65536),
          (e.lanes = i),
          a !== zo && ((t = Error(T(422), { cause: a })), Vi(ue(t, n))))
        : (a !== zo && ((e = Error(T(423), { cause: a })), Vi(ue(e, n))),
          (t = t.current.alternate),
          (t.flags |= 65536),
          (i &= -i),
          (t.lanes |= i),
          (a = ue(a, n)),
          (i = Yo(t.stateNode, a, i)),
          zu(t, i),
          ot !== 4 && (ot = 2)),
      !1
    );
  var l = Error(T(520), { cause: a });
  if (
    ((l = ue(l, n)),
    Ai === null ? (Ai = [l]) : Ai.push(l),
    ot !== 4 && (ot = 2),
    e === null)
  )
    return !0;
  ((a = ue(a, n)), (n = e));
  do {
    switch (n.tag) {
      case 3:
        return (
          (n.flags |= 65536),
          (t = i & -i),
          (n.lanes |= t),
          (t = Yo(n.stateNode, a, t)),
          zu(n, t),
          !1
        );
      case 1:
        if (
          ((e = n.type),
          (l = n.stateNode),
          (n.flags & 128) === 0 &&
            (typeof e.getDerivedStateFromError == "function" ||
              (l !== null &&
                typeof l.componentDidCatch == "function" &&
                (cn === null || !cn.has(l)))))
        )
          return (
            (n.flags |= 65536),
            (i &= -i),
            (n.lanes |= i),
            (i = Z0(i)),
            k0(i, t, n, a),
            zu(n, i),
            !1
          );
    }
    n = n.return;
  } while (n !== null);
  return !1;
}
var oc = Error(T(461)),
  pt = !1;
function At(t, e, n, a) {
  e.child = t === null ? u0(e, null, n, a) : Gn(e, t.child, n, a);
}
function Pf(t, e, n, a, i) {
  n = n.render;
  var l = e.ref;
  if ("ref" in a) {
    var s = {};
    for (var u in a) u !== "ref" && (s[u] = a[u]);
  } else s = a;
  return (
    Yn(e),
    (a = Pr(t, e, n, s, l, i)),
    (u = $r()),
    t !== null && !pt
      ? (Wr(t, e, i), Ge(t, e, i))
      : (Y && u && Gr(e), (e.flags |= 1), At(t, e, a, i), e.child)
  );
}
function $f(t, e, n, a, i) {
  if (t === null) {
    var l = n.type;
    return typeof l == "function" &&
      !Yr(l) &&
      l.defaultProps === void 0 &&
      n.compare === null
      ? ((e.tag = 15), (e.type = l), J0(t, e, l, a, i))
      : ((t = Xl(n.type, null, a, e, e.mode, i)),
        (t.ref = e.ref),
        (t.return = e),
        (e.child = t));
  }
  if (((l = t.child), !rc(t, i))) {
    var s = l.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Oi), n(s, a) && t.ref === e.ref)
    )
      return Ge(t, e, i);
  }
  return (
    (e.flags |= 1),
    (t = we(l, a)),
    (t.ref = e.ref),
    (t.return = e),
    (e.child = t)
  );
}
function J0(t, e, n, a, i) {
  if (t !== null) {
    var l = t.memoizedProps;
    if (Oi(l, a) && t.ref === e.ref)
      if (((pt = !1), (e.pendingProps = a = l), rc(t, i)))
        t.flags & 131072 && (pt = !0);
      else return ((e.lanes = t.lanes), Ge(t, e, i));
  }
  return Go(t, e, n, a, i);
}
function F0(t, e, n, a) {
  var i = a.children,
    l = t !== null ? t.memoizedState : null;
  if (
    (t === null &&
      e.stateNode === null &&
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    a.mode === "hidden")
  ) {
    if (e.flags & 128) {
      if (((l = l !== null ? l.baseLanes | n : n), t !== null)) {
        for (a = e.child = t.child, i = 0; a !== null; )
          ((i = i | a.lanes | a.childLanes), (a = a.sibling));
        a = i & ~l;
      } else ((a = 0), (e.child = null));
      return Wf(t, e, l, n, a);
    }
    if (n & 536870912)
      ((e.memoizedState = { baseLanes: 0, cachePool: null }),
        t !== null && Ql(e, l !== null ? l.cachePool : null),
        l !== null ? qf(e, l) : Vo(),
        c0(e));
    else
      return (
        (a = e.lanes = 536870912),
        Wf(t, e, l !== null ? l.baseLanes | n : n, n, a)
      );
  } else
    l !== null
      ? (Ql(e, l.cachePool), qf(e, l), We(), (e.memoizedState = null))
      : (t !== null && Ql(e, null), Vo(), We());
  return (At(t, e, i, n), e.child);
}
function ui(t, e) {
  return (
    (t !== null && t.tag === 22) ||
      e.stateNode !== null ||
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    e.sibling
  );
}
function Wf(t, e, n, a, i) {
  var l = Kr();
  return (
    (l = l === null ? null : { parent: mt._currentValue, pool: l }),
    (e.memoizedState = { baseLanes: n, cachePool: l }),
    t !== null && Ql(e, null),
    Vo(),
    c0(e),
    t !== null && Xa(t, e, a, !0),
    (e.childLanes = i),
    null
  );
}
function kl(t, e) {
  return (
    (e = vs({ mode: e.mode, children: e.children }, t.mode)),
    (e.ref = t.ref),
    (t.child = e),
    (e.return = t),
    e
  );
}
function If(t, e, n) {
  return (
    Gn(e, t.child, null, n),
    (t = kl(e, e.pendingProps)),
    (t.flags |= 2),
    Gt(e),
    (e.memoizedState = null),
    t
  );
}
function O1(t, e, n) {
  var a = e.pendingProps,
    i = (e.flags & 128) !== 0;
  if (((e.flags &= -129), t === null)) {
    if (Y) {
      if (a.mode === "hidden")
        return ((t = kl(e, a)), (e.lanes = 536870912), ui(null, t));
      if (
        (Uo(e),
        (t = I)
          ? ((t = Yp(t, oe)),
            (t = t !== null && t.data === "&" ? t : null),
            t !== null &&
              ((e.memoizedState = {
                dehydrated: t,
                treeContext: pn !== null ? { id: ye, overflow: ge } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (n = t0(t)),
              (n.return = e),
              (e.child = n),
              (Dt = e),
              (I = null)))
          : (t = null),
        t === null)
      )
        throw yn(e);
      return ((e.lanes = 536870912), null);
    }
    return kl(e, a);
  }
  var l = t.memoizedState;
  if (l !== null) {
    var s = l.dehydrated;
    if ((Uo(e), i))
      if (e.flags & 256) ((e.flags &= -257), (e = If(t, e, n)));
      else if (e.memoizedState !== null)
        ((e.child = t.child), (e.flags |= 128), (e = null));
      else throw Error(T(558));
    else if ((pt || Xa(t, e, n, !1), (i = (n & t.childLanes) !== 0), pt || i)) {
      if (
        ((a = F), a !== null && ((s = Dm(a, n)), s !== 0 && s !== l.retryLane))
      )
        throw ((l.retryLane = s), Jn(t, s), Lt(a, t, s), oc);
      (Ts(), (e = If(t, e, n)));
    } else
      ((t = l.treeContext),
        (I = ce(s.nextSibling)),
        (Dt = e),
        (Y = !0),
        (un = null),
        (oe = !1),
        t !== null && n0(e, t),
        (e = kl(e, a)),
        (e.flags |= 4096));
    return e;
  }
  return (
    (t = we(t.child, { mode: a.mode, children: a.children })),
    (t.ref = e.ref),
    (e.child = t),
    (t.return = e),
    t
  );
}
function Jl(t, e) {
  var n = e.ref;
  if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
  else {
    if (typeof n != "function" && typeof n != "object") throw Error(T(284));
    (t === null || t.ref !== n) && (e.flags |= 4194816);
  }
}
function Go(t, e, n, a, i) {
  return (
    Yn(e),
    (n = Pr(t, e, n, a, void 0, i)),
    (a = $r()),
    t !== null && !pt
      ? (Wr(t, e, i), Ge(t, e, i))
      : (Y && a && Gr(e), (e.flags |= 1), At(t, e, n, i), e.child)
  );
}
function td(t, e, n, a, i, l) {
  return (
    Yn(e),
    (e.updateQueue = null),
    (n = d0(e, a, n, i)),
    f0(t),
    (a = $r()),
    t !== null && !pt
      ? (Wr(t, e, l), Ge(t, e, l))
      : (Y && a && Gr(e), (e.flags |= 1), At(t, e, n, l), e.child)
  );
}
function ed(t, e, n, a, i) {
  if ((Yn(e), e.stateNode === null)) {
    var l = ca,
      s = n.contextType;
    (typeof s == "object" && s !== null && (l = Ct(s)),
      (l = new n(a, l)),
      (e.memoizedState =
        l.state !== null && l.state !== void 0 ? l.state : null),
      (l.updater = qo),
      (e.stateNode = l),
      (l._reactInternals = e),
      (l = e.stateNode),
      (l.props = a),
      (l.state = e.memoizedState),
      (l.refs = {}),
      kr(e),
      (s = n.contextType),
      (l.context = typeof s == "object" && s !== null ? Ct(s) : ca),
      (l.state = e.memoizedState),
      (s = n.getDerivedStateFromProps),
      typeof s == "function" && (Nu(e, n, s, a), (l.state = e.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function" ||
        (typeof l.UNSAFE_componentWillMount != "function" &&
          typeof l.componentWillMount != "function") ||
        ((s = l.state),
        typeof l.componentWillMount == "function" && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == "function" &&
          l.UNSAFE_componentWillMount(),
        s !== l.state && qo.enqueueReplaceState(l, l.state, null),
        bi(e, a, l, i),
        vi(),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == "function" && (e.flags |= 4194308),
      (a = !0));
  } else if (t === null) {
    l = e.stateNode;
    var u = e.memoizedProps,
      o = Qn(n, u);
    l.props = o;
    var r = l.context,
      c = n.contextType;
    ((s = ca), typeof c == "object" && c !== null && (s = Ct(c)));
    var f = n.getDerivedStateFromProps;
    ((c =
      typeof f == "function" || typeof l.getSnapshotBeforeUpdate == "function"),
      (u = e.pendingProps !== u),
      c ||
        (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
          typeof l.componentWillReceiveProps != "function") ||
        ((u || r !== s) && Jf(e, l, a, s)),
      (Fe = !1));
    var d = e.memoizedState;
    ((l.state = d),
      bi(e, a, l, i),
      vi(),
      (r = e.memoizedState),
      u || d !== r || Fe
        ? (typeof f == "function" && (Nu(e, n, f, a), (r = e.memoizedState)),
          (o = Fe || kf(e, n, o, a, d, r, s))
            ? (c ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" &&
                  l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" &&
                  l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" && (e.flags |= 4194308))
            : (typeof l.componentDidMount == "function" && (e.flags |= 4194308),
              (e.memoizedProps = a),
              (e.memoizedState = r)),
          (l.props = a),
          (l.state = r),
          (l.context = s),
          (a = o))
        : (typeof l.componentDidMount == "function" && (e.flags |= 4194308),
          (a = !1)));
  } else {
    ((l = e.stateNode),
      Oo(t, e),
      (s = e.memoizedProps),
      (c = Qn(n, s)),
      (l.props = c),
      (f = e.pendingProps),
      (d = l.context),
      (r = n.contextType),
      (o = ca),
      typeof r == "object" && r !== null && (o = Ct(r)),
      (u = n.getDerivedStateFromProps),
      (r =
        typeof u == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function") ||
        (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
          typeof l.componentWillReceiveProps != "function") ||
        ((s !== f || d !== o) && Jf(e, l, a, o)),
      (Fe = !1),
      (d = e.memoizedState),
      (l.state = d),
      bi(e, a, l, i),
      vi());
    var m = e.memoizedState;
    s !== f ||
    d !== m ||
    Fe ||
    (t !== null && t.dependencies !== null && fs(t.dependencies))
      ? (typeof u == "function" && (Nu(e, n, u, a), (m = e.memoizedState)),
        (c =
          Fe ||
          kf(e, n, c, a, d, m, o) ||
          (t !== null && t.dependencies !== null && fs(t.dependencies)))
          ? (r ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" &&
                l.componentWillUpdate(a, m, o),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(a, m, o)),
            typeof l.componentDidUpdate == "function" && (e.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (s === t.memoizedProps && d === t.memoizedState) ||
              (e.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (s === t.memoizedProps && d === t.memoizedState) ||
              (e.flags |= 1024),
            (e.memoizedProps = a),
            (e.memoizedState = m)),
        (l.props = a),
        (l.state = m),
        (l.context = o),
        (a = c))
      : (typeof l.componentDidUpdate != "function" ||
          (s === t.memoizedProps && d === t.memoizedState) ||
          (e.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (s === t.memoizedProps && d === t.memoizedState) ||
          (e.flags |= 1024),
        (a = !1));
  }
  return (
    (l = a),
    Jl(t, e),
    (a = (e.flags & 128) !== 0),
    l || a
      ? ((l = e.stateNode),
        (n =
          a && typeof n.getDerivedStateFromError != "function"
            ? null
            : l.render()),
        (e.flags |= 1),
        t !== null && a
          ? ((e.child = Gn(e, t.child, null, i)), (e.child = Gn(e, null, n, i)))
          : At(t, e, n, i),
        (e.memoizedState = l.state),
        (t = e.child))
      : (t = Ge(t, e, i)),
    t
  );
}
function nd(t, e, n, a) {
  return (qn(), (e.flags |= 256), At(t, e, n, a), e.child);
}
var Ru = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null,
};
function _u(t) {
  return { baseLanes: t, cachePool: i0() };
}
function Ou(t, e, n) {
  return ((t = t !== null ? t.childLanes & ~n : 0), e && (t |= Qt), t);
}
function P0(t, e, n) {
  var a = e.pendingProps,
    i = !1,
    l = (e.flags & 128) !== 0,
    s;
  if (
    ((s = l) ||
      (s =
        t !== null && t.memoizedState === null ? !1 : (ct.current & 2) !== 0),
    s && ((i = !0), (e.flags &= -129)),
    (s = (e.flags & 32) !== 0),
    (e.flags &= -33),
    t === null)
  ) {
    if (Y) {
      if (
        (i ? $e(e) : We(),
        (t = I)
          ? ((t = Yp(t, oe)),
            (t = t !== null && t.data !== "&" ? t : null),
            t !== null &&
              ((e.memoizedState = {
                dehydrated: t,
                treeContext: pn !== null ? { id: ye, overflow: ge } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (n = t0(t)),
              (n.return = e),
              (e.child = n),
              (Dt = e),
              (I = null)))
          : (t = null),
        t === null)
      )
        throw yn(e);
      return (nr(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
    }
    var u = a.children;
    return (
      (a = a.fallback),
      i
        ? (We(),
          (i = e.mode),
          (u = vs({ mode: "hidden", children: u }, i)),
          (a = Vn(a, i, n, null)),
          (u.return = e),
          (a.return = e),
          (u.sibling = a),
          (e.child = u),
          (a = e.child),
          (a.memoizedState = _u(n)),
          (a.childLanes = Ou(t, s, n)),
          (e.memoizedState = Ru),
          ui(null, a))
        : ($e(e), Xo(e, u))
    );
  }
  var o = t.memoizedState;
  if (o !== null && ((u = o.dehydrated), u !== null)) {
    if (l)
      e.flags & 256
        ? ($e(e), (e.flags &= -257), (e = wu(t, e, n)))
        : e.memoizedState !== null
          ? (We(), (e.child = t.child), (e.flags |= 128), (e = null))
          : (We(),
            (u = a.fallback),
            (i = e.mode),
            (a = vs({ mode: "visible", children: a.children }, i)),
            (u = Vn(u, i, n, null)),
            (u.flags |= 2),
            (a.return = e),
            (u.return = e),
            (a.sibling = u),
            (e.child = a),
            Gn(e, t.child, null, n),
            (a = e.child),
            (a.memoizedState = _u(n)),
            (a.childLanes = Ou(t, s, n)),
            (e.memoizedState = Ru),
            (e = ui(null, a)));
    else if (($e(e), nr(u))) {
      if (((s = u.nextSibling && u.nextSibling.dataset), s)) var r = s.dgst;
      ((s = r),
        (a = Error(T(419))),
        (a.stack = ""),
        (a.digest = s),
        Vi({ value: a, source: null, stack: null }),
        (e = wu(t, e, n)));
    } else if (
      (pt || Xa(t, e, n, !1), (s = (n & t.childLanes) !== 0), pt || s)
    ) {
      if (
        ((s = F), s !== null && ((a = Dm(s, n)), a !== 0 && a !== o.retryLane))
      )
        throw ((o.retryLane = a), Jn(t, a), Lt(s, t, a), oc);
      (er(u) || Ts(), (e = wu(t, e, n)));
    } else
      er(u)
        ? ((e.flags |= 192), (e.child = t.child), (e = null))
        : ((t = o.treeContext),
          (I = ce(u.nextSibling)),
          (Dt = e),
          (Y = !0),
          (un = null),
          (oe = !1),
          t !== null && n0(e, t),
          (e = Xo(e, a.children)),
          (e.flags |= 4096));
    return e;
  }
  return i
    ? (We(),
      (u = a.fallback),
      (i = e.mode),
      (o = t.child),
      (r = o.sibling),
      (a = we(o, { mode: "hidden", children: a.children })),
      (a.subtreeFlags = o.subtreeFlags & 65011712),
      r !== null ? (u = we(r, u)) : ((u = Vn(u, i, n, null)), (u.flags |= 2)),
      (u.return = e),
      (a.return = e),
      (a.sibling = u),
      (e.child = a),
      ui(null, a),
      (a = e.child),
      (u = t.child.memoizedState),
      u === null
        ? (u = _u(n))
        : ((i = u.cachePool),
          i !== null
            ? ((o = mt._currentValue),
              (i = i.parent !== o ? { parent: o, pool: o } : i))
            : (i = i0()),
          (u = { baseLanes: u.baseLanes | n, cachePool: i })),
      (a.memoizedState = u),
      (a.childLanes = Ou(t, s, n)),
      (e.memoizedState = Ru),
      ui(t.child, a))
    : ($e(e),
      (n = t.child),
      (t = n.sibling),
      (n = we(n, { mode: "visible", children: a.children })),
      (n.return = e),
      (n.sibling = null),
      t !== null &&
        ((s = e.deletions),
        s === null ? ((e.deletions = [t]), (e.flags |= 16)) : s.push(t)),
      (e.child = n),
      (e.memoizedState = null),
      n);
}
function Xo(t, e) {
  return (
    (e = vs({ mode: "visible", children: e }, t.mode)),
    (e.return = t),
    (t.child = e)
  );
}
function vs(t, e) {
  return ((t = Xt(22, t, null, e)), (t.lanes = 0), t);
}
function wu(t, e, n) {
  return (
    Gn(e, t.child, null, n),
    (t = Xo(e, e.pendingProps.children)),
    (t.flags |= 2),
    (e.memoizedState = null),
    t
  );
}
function ad(t, e, n) {
  t.lanes |= e;
  var a = t.alternate;
  (a !== null && (a.lanes |= e), No(t.return, e, n));
}
function Vu(t, e, n, a, i, l) {
  var s = t.memoizedState;
  s === null
    ? (t.memoizedState = {
        isBackwards: e,
        rendering: null,
        renderingStartTime: 0,
        last: a,
        tail: n,
        tailMode: i,
        treeForkCount: l,
      })
    : ((s.isBackwards = e),
      (s.rendering = null),
      (s.renderingStartTime = 0),
      (s.last = a),
      (s.tail = n),
      (s.tailMode = i),
      (s.treeForkCount = l));
}
function $0(t, e, n) {
  var a = e.pendingProps,
    i = a.revealOrder,
    l = a.tail;
  a = a.children;
  var s = ct.current,
    u = (s & 2) !== 0;
  if (
    (u ? ((s = (s & 1) | 2), (e.flags |= 128)) : (s &= 1),
    P(ct, s),
    At(t, e, a, n),
    (a = Y ? wi : 0),
    !u && t !== null && t.flags & 128)
  )
    t: for (t = e.child; t !== null; ) {
      if (t.tag === 13) t.memoizedState !== null && ad(t, n, e);
      else if (t.tag === 19) ad(t, n, e);
      else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break t;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) break t;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  switch (i) {
    case "forwards":
      for (n = e.child, i = null; n !== null; )
        ((t = n.alternate),
          t !== null && ms(t) === null && (i = n),
          (n = n.sibling));
      ((n = i),
        n === null
          ? ((i = e.child), (e.child = null))
          : ((i = n.sibling), (n.sibling = null)),
        Vu(e, !1, i, n, l, a));
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      for (n = null, i = e.child, e.child = null; i !== null; ) {
        if (((t = i.alternate), t !== null && ms(t) === null)) {
          e.child = i;
          break;
        }
        ((t = i.sibling), (i.sibling = n), (n = i), (i = t));
      }
      Vu(e, !0, n, null, l, a);
      break;
    case "together":
      Vu(e, !1, null, null, void 0, a);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function Ge(t, e, n) {
  if (
    (t !== null && (e.dependencies = t.dependencies),
    (vn |= e.lanes),
    !(n & e.childLanes))
  )
    if (t !== null) {
      if ((Xa(t, e, n, !1), (n & e.childLanes) === 0)) return null;
    } else return null;
  if (t !== null && e.child !== t.child) throw Error(T(153));
  if (e.child !== null) {
    for (
      t = e.child, n = we(t, t.pendingProps), e.child = n, n.return = e;
      t.sibling !== null;
    )
      ((t = t.sibling),
        (n = n.sibling = we(t, t.pendingProps)),
        (n.return = e));
    n.sibling = null;
  }
  return e.child;
}
function rc(t, e) {
  return t.lanes & e ? !0 : ((t = t.dependencies), !!(t !== null && fs(t)));
}
function w1(t, e, n) {
  switch (e.tag) {
    case 3:
      (is(e, e.stateNode.containerInfo),
        Pe(e, mt, t.memoizedState.cache),
        qn());
      break;
    case 27:
    case 5:
      go(e);
      break;
    case 4:
      is(e, e.stateNode.containerInfo);
      break;
    case 10:
      Pe(e, e.type, e.memoizedProps.value);
      break;
    case 31:
      if (e.memoizedState !== null) return ((e.flags |= 128), Uo(e), null);
      break;
    case 13:
      var a = e.memoizedState;
      if (a !== null)
        return a.dehydrated !== null
          ? ($e(e), (e.flags |= 128), null)
          : n & e.child.childLanes
            ? P0(t, e, n)
            : ($e(e), (t = Ge(t, e, n)), t !== null ? t.sibling : null);
      $e(e);
      break;
    case 19:
      var i = (t.flags & 128) !== 0;
      if (
        ((a = (n & e.childLanes) !== 0),
        a || (Xa(t, e, n, !1), (a = (n & e.childLanes) !== 0)),
        i)
      ) {
        if (a) return $0(t, e, n);
        e.flags |= 128;
      }
      if (
        ((i = e.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        P(ct, ct.current),
        a)
      )
        break;
      return null;
    case 22:
      return ((e.lanes = 0), F0(t, e, n, e.pendingProps));
    case 24:
      Pe(e, mt, t.memoizedState.cache);
  }
  return Ge(t, e, n);
}
function W0(t, e, n) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps) pt = !0;
    else {
      if (!rc(t, n) && !(e.flags & 128)) return ((pt = !1), w1(t, e, n));
      pt = !!(t.flags & 131072);
    }
  else ((pt = !1), Y && e.flags & 1048576 && e0(e, wi, e.index));
  switch (((e.lanes = 0), e.tag)) {
    case 16:
      t: {
        var a = e.pendingProps;
        if (((t = jn(e.elementType)), (e.type = t), typeof t == "function"))
          Yr(t)
            ? ((a = Qn(t, a)), (e.tag = 1), (e = ed(null, e, t, a, n)))
            : ((e.tag = 0), (e = Go(null, e, t, a, n)));
        else {
          if (t != null) {
            var i = t.$$typeof;
            if (i === Cr) {
              ((e.tag = 11), (e = Pf(null, e, t, a, n)));
              break t;
            } else if (i === zr) {
              ((e.tag = 14), (e = $f(null, e, t, a, n)));
              break t;
            }
          }
          throw ((e = po(t) || t), Error(T(306, e, "")));
        }
      }
      return e;
    case 0:
      return Go(t, e, e.type, e.pendingProps, n);
    case 1:
      return ((a = e.type), (i = Qn(a, e.pendingProps)), ed(t, e, a, i, n));
    case 3:
      t: {
        if ((is(e, e.stateNode.containerInfo), t === null)) throw Error(T(387));
        a = e.pendingProps;
        var l = e.memoizedState;
        ((i = l.element), Oo(t, e), bi(e, a, null, n));
        var s = e.memoizedState;
        if (
          ((a = s.cache),
          Pe(e, mt, a),
          a !== l.cache && Ro(e, [mt], n, !0),
          vi(),
          (a = s.element),
          l.isDehydrated)
        )
          if (
            ((l = { element: a, isDehydrated: !1, cache: s.cache }),
            (e.updateQueue.baseState = l),
            (e.memoizedState = l),
            e.flags & 256)
          ) {
            e = nd(t, e, a, n);
            break t;
          } else if (a !== i) {
            ((i = ue(Error(T(424)), e)), Vi(i), (e = nd(t, e, a, n)));
            break t;
          } else {
            switch (((t = e.stateNode.containerInfo), t.nodeType)) {
              case 9:
                t = t.body;
                break;
              default:
                t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
            }
            for (
              I = ce(t.firstChild),
                Dt = e,
                Y = !0,
                un = null,
                oe = !0,
                n = u0(e, null, a, n),
                e.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          }
        else {
          if ((qn(), a === i)) {
            e = Ge(t, e, n);
            break t;
          }
          At(t, e, a, n);
        }
        e = e.child;
      }
      return e;
    case 26:
      return (
        Jl(t, e),
        t === null
          ? (n = Ad(e.type, null, e.pendingProps, null))
            ? (e.memoizedState = n)
            : Y ||
              ((n = e.type),
              (t = e.pendingProps),
              (a = Ds(sn.current).createElement(n)),
              (a[Mt] = e),
              (a[Ht] = t),
              zt(a, n, t),
              St(a),
              (e.stateNode = a))
          : (e.memoizedState = Ad(
              e.type,
              t.memoizedProps,
              e.pendingProps,
              t.memoizedState,
            )),
        null
      );
    case 27:
      return (
        go(e),
        t === null &&
          Y &&
          ((a = e.stateNode = Gp(e.type, e.pendingProps, sn.current)),
          (Dt = e),
          (oe = !0),
          (i = I),
          Tn(e.type) ? ((ar = i), (I = ce(a.firstChild))) : (I = i)),
        At(t, e, e.pendingProps.children, n),
        Jl(t, e),
        t === null && (e.flags |= 4194304),
        e.child
      );
    case 5:
      return (
        t === null &&
          Y &&
          ((i = a = I) &&
            ((a = cb(a, e.type, e.pendingProps, oe)),
            a !== null
              ? ((e.stateNode = a),
                (Dt = e),
                (I = ce(a.firstChild)),
                (oe = !1),
                (i = !0))
              : (i = !1)),
          i || yn(e)),
        go(e),
        (i = e.type),
        (l = e.pendingProps),
        (s = t !== null ? t.memoizedProps : null),
        (a = l.children),
        Io(i, l) ? (a = null) : s !== null && Io(i, s) && (e.flags |= 32),
        e.memoizedState !== null &&
          ((i = Pr(t, e, M1, null, null, n)), (Yi._currentValue = i)),
        Jl(t, e),
        At(t, e, a, n),
        e.child
      );
    case 6:
      return (
        t === null &&
          Y &&
          ((t = n = I) &&
            ((n = fb(n, e.pendingProps, oe)),
            n !== null
              ? ((e.stateNode = n), (Dt = e), (I = null), (t = !0))
              : (t = !1)),
          t || yn(e)),
        null
      );
    case 13:
      return P0(t, e, n);
    case 4:
      return (
        is(e, e.stateNode.containerInfo),
        (a = e.pendingProps),
        t === null ? (e.child = Gn(e, null, a, n)) : At(t, e, a, n),
        e.child
      );
    case 11:
      return Pf(t, e, e.type, e.pendingProps, n);
    case 7:
      return (At(t, e, e.pendingProps, n), e.child);
    case 8:
      return (At(t, e, e.pendingProps.children, n), e.child);
    case 12:
      return (At(t, e, e.pendingProps.children, n), e.child);
    case 10:
      return (
        (a = e.pendingProps),
        Pe(e, e.type, a.value),
        At(t, e, a.children, n),
        e.child
      );
    case 9:
      return (
        (i = e.type._context),
        (a = e.pendingProps.children),
        Yn(e),
        (i = Ct(i)),
        (a = a(i)),
        (e.flags |= 1),
        At(t, e, a, n),
        e.child
      );
    case 14:
      return $f(t, e, e.type, e.pendingProps, n);
    case 15:
      return J0(t, e, e.type, e.pendingProps, n);
    case 19:
      return $0(t, e, n);
    case 31:
      return O1(t, e, n);
    case 22:
      return F0(t, e, n, e.pendingProps);
    case 24:
      return (
        Yn(e),
        (a = Ct(mt)),
        t === null
          ? ((i = Kr()),
            i === null &&
              ((i = F),
              (l = Qr()),
              (i.pooledCache = l),
              l.refCount++,
              l !== null && (i.pooledCacheLanes |= n),
              (i = l)),
            (e.memoizedState = { parent: a, cache: i }),
            kr(e),
            Pe(e, mt, i))
          : (t.lanes & n && (Oo(t, e), bi(e, null, null, n), vi()),
            (i = t.memoizedState),
            (l = e.memoizedState),
            i.parent !== a
              ? ((i = { parent: a, cache: a }),
                (e.memoizedState = i),
                e.lanes === 0 &&
                  (e.memoizedState = e.updateQueue.baseState = i),
                Pe(e, mt, a))
              : ((a = l.cache),
                Pe(e, mt, a),
                a !== i.cache && Ro(e, [mt], n, !0))),
        At(t, e, e.pendingProps.children, n),
        e.child
      );
    case 29:
      throw e.pendingProps;
  }
  throw Error(T(156, e.tag));
}
function Me(t) {
  t.flags |= 4;
}
function Uu(t, e, n, a, i) {
  if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
    if (((t.flags |= 16777216), (i & 335544128) === i))
      if (t.stateNode.complete) t.flags |= 8192;
      else if (Tp()) t.flags |= 8192;
      else throw ((Bn = ds), Zr);
  } else t.flags &= -16777217;
}
function id(t, e) {
  if (e.type !== "stylesheet" || e.state.loading & 4) t.flags &= -16777217;
  else if (((t.flags |= 16777216), !Kp(e)))
    if (Tp()) t.flags |= 8192;
    else throw ((Bn = ds), Zr);
}
function zl(t, e) {
  (e !== null && (t.flags |= 4),
    t.flags & 16384 &&
      ((e = t.tag !== 22 ? Am() : 536870912), (t.lanes |= e), (_a |= e)));
}
function ti(t, e) {
  if (!Y)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var n = null; e !== null; )
          (e.alternate !== null && (n = e), (e = e.sibling));
        n === null ? (t.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = t.tail;
        for (var a = null; n !== null; )
          (n.alternate !== null && (a = n), (n = n.sibling));
        a === null
          ? e || t.tail === null
            ? (t.tail = null)
            : (t.tail.sibling = null)
          : (a.sibling = null);
    }
}
function W(t) {
  var e = t.alternate !== null && t.alternate.child === t.child,
    n = 0,
    a = 0;
  if (e)
    for (var i = t.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (a |= i.subtreeFlags & 65011712),
        (a |= i.flags & 65011712),
        (i.return = t),
        (i = i.sibling));
  else
    for (i = t.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (a |= i.subtreeFlags),
        (a |= i.flags),
        (i.return = t),
        (i = i.sibling));
  return ((t.subtreeFlags |= a), (t.childLanes = n), e);
}
function V1(t, e, n) {
  var a = e.pendingProps;
  switch ((Xr(e), e.tag)) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (W(e), null);
    case 1:
      return (W(e), null);
    case 3:
      return (
        (n = e.stateNode),
        (a = null),
        t !== null && (a = t.memoizedState.cache),
        e.memoizedState.cache !== a && (e.flags |= 2048),
        Ve(mt),
        Da(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (t === null || t.child === null) &&
          ($n(e)
            ? Me(e)
            : t === null ||
              (t.memoizedState.isDehydrated && !(e.flags & 256)) ||
              ((e.flags |= 1024), Cu())),
        W(e),
        null
      );
    case 26:
      var i = e.type,
        l = e.memoizedState;
      return (
        t === null
          ? (Me(e),
            l !== null ? (W(e), id(e, l)) : (W(e), Uu(e, i, null, a, n)))
          : l
            ? l !== t.memoizedState
              ? (Me(e), W(e), id(e, l))
              : (W(e), (e.flags &= -16777217))
            : ((t = t.memoizedProps),
              t !== a && Me(e),
              W(e),
              Uu(e, i, t, a, n)),
        null
      );
    case 27:
      if (
        (ls(e),
        (n = sn.current),
        (i = e.type),
        t !== null && e.stateNode != null)
      )
        t.memoizedProps !== a && Me(e);
      else {
        if (!a) {
          if (e.stateNode === null) throw Error(T(166));
          return (W(e), null);
        }
        ((t = be.current),
          $n(e) ? Of(e) : ((t = Gp(i, a, n)), (e.stateNode = t), Me(e)));
      }
      return (W(e), null);
    case 5:
      if ((ls(e), (i = e.type), t !== null && e.stateNode != null))
        t.memoizedProps !== a && Me(e);
      else {
        if (!a) {
          if (e.stateNode === null) throw Error(T(166));
          return (W(e), null);
        }
        if (((l = be.current), $n(e))) Of(e);
        else {
          var s = Ds(sn.current);
          switch (l) {
            case 1:
              l = s.createElementNS("http://www.w3.org/2000/svg", i);
              break;
            case 2:
              l = s.createElementNS("http://www.w3.org/1998/Math/MathML", i);
              break;
            default:
              switch (i) {
                case "svg":
                  l = s.createElementNS("http://www.w3.org/2000/svg", i);
                  break;
                case "math":
                  l = s.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    i,
                  );
                  break;
                case "script":
                  ((l = s.createElement("div")),
                    (l.innerHTML = "<script><\/script>"),
                    (l = l.removeChild(l.firstChild)));
                  break;
                case "select":
                  ((l =
                    typeof a.is == "string"
                      ? s.createElement("select", { is: a.is })
                      : s.createElement("select")),
                    a.multiple
                      ? (l.multiple = !0)
                      : a.size && (l.size = a.size));
                  break;
                default:
                  l =
                    typeof a.is == "string"
                      ? s.createElement(i, { is: a.is })
                      : s.createElement(i);
              }
          }
          ((l[Mt] = e), (l[Ht] = a));
          t: for (s = e.child; s !== null; ) {
            if (s.tag === 5 || s.tag === 6) l.appendChild(s.stateNode);
            else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
              ((s.child.return = s), (s = s.child));
              continue;
            }
            if (s === e) break t;
            for (; s.sibling === null; ) {
              if (s.return === null || s.return === e) break t;
              s = s.return;
            }
            ((s.sibling.return = s.return), (s = s.sibling));
          }
          e.stateNode = l;
          t: switch ((zt(l, i, a), i)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              a = !!a.autoFocus;
              break t;
            case "img":
              a = !0;
              break t;
            default:
              a = !1;
          }
          a && Me(e);
        }
      }
      return (
        W(e),
        Uu(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, n),
        null
      );
    case 6:
      if (t && e.stateNode != null) t.memoizedProps !== a && Me(e);
      else {
        if (typeof a != "string" && e.stateNode === null) throw Error(T(166));
        if (((t = sn.current), $n(e))) {
          if (
            ((t = e.stateNode),
            (n = e.memoizedProps),
            (a = null),
            (i = Dt),
            i !== null)
          )
            switch (i.tag) {
              case 27:
              case 5:
                a = i.memoizedProps;
            }
          ((t[Mt] = e),
            (t = !!(
              t.nodeValue === n ||
              (a !== null && a.suppressHydrationWarning === !0) ||
              Lp(t.nodeValue, n)
            )),
            t || yn(e, !0));
        } else ((t = Ds(t).createTextNode(a)), (t[Mt] = e), (e.stateNode = t));
      }
      return (W(e), null);
    case 31:
      if (((n = e.memoizedState), t === null || t.memoizedState !== null)) {
        if (((a = $n(e)), n !== null)) {
          if (t === null) {
            if (!a) throw Error(T(318));
            if (
              ((t = e.memoizedState),
              (t = t !== null ? t.dehydrated : null),
              !t)
            )
              throw Error(T(557));
            t[Mt] = e;
          } else
            (qn(),
              !(e.flags & 128) && (e.memoizedState = null),
              (e.flags |= 4));
          (W(e), (t = !1));
        } else
          ((n = Cu()),
            t !== null &&
              t.memoizedState !== null &&
              (t.memoizedState.hydrationErrors = n),
            (t = !0));
        if (!t) return e.flags & 256 ? (Gt(e), e) : (Gt(e), null);
        if (e.flags & 128) throw Error(T(558));
      }
      return (W(e), null);
    case 13:
      if (
        ((a = e.memoizedState),
        t === null ||
          (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
      ) {
        if (((i = $n(e)), a !== null && a.dehydrated !== null)) {
          if (t === null) {
            if (!i) throw Error(T(318));
            if (
              ((i = e.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(T(317));
            i[Mt] = e;
          } else
            (qn(),
              !(e.flags & 128) && (e.memoizedState = null),
              (e.flags |= 4));
          (W(e), (i = !1));
        } else
          ((i = Cu()),
            t !== null &&
              t.memoizedState !== null &&
              (t.memoizedState.hydrationErrors = i),
            (i = !0));
        if (!i) return e.flags & 256 ? (Gt(e), e) : (Gt(e), null);
      }
      return (
        Gt(e),
        e.flags & 128
          ? ((e.lanes = n), e)
          : ((n = a !== null),
            (t = t !== null && t.memoizedState !== null),
            n &&
              ((a = e.child),
              (i = null),
              a.alternate !== null &&
                a.alternate.memoizedState !== null &&
                a.alternate.memoizedState.cachePool !== null &&
                (i = a.alternate.memoizedState.cachePool.pool),
              (l = null),
              a.memoizedState !== null &&
                a.memoizedState.cachePool !== null &&
                (l = a.memoizedState.cachePool.pool),
              l !== i && (a.flags |= 2048)),
            n !== t && n && (e.child.flags |= 8192),
            zl(e, e.updateQueue),
            W(e),
            null)
      );
    case 4:
      return (Da(), t === null && yc(e.stateNode.containerInfo), W(e), null);
    case 10:
      return (Ve(e.type), W(e), null);
    case 19:
      if ((xt(ct), (a = e.memoizedState), a === null)) return (W(e), null);
      if (((i = (e.flags & 128) !== 0), (l = a.rendering), l === null))
        if (i) ti(a, !1);
        else {
          if (ot !== 0 || (t !== null && t.flags & 128))
            for (t = e.child; t !== null; ) {
              if (((l = ms(t)), l !== null)) {
                for (
                  e.flags |= 128,
                    ti(a, !1),
                    t = l.updateQueue,
                    e.updateQueue = t,
                    zl(e, t),
                    e.subtreeFlags = 0,
                    t = n,
                    n = e.child;
                  n !== null;
                )
                  (Im(n, t), (n = n.sibling));
                return (
                  P(ct, (ct.current & 1) | 2),
                  Y && je(e, a.treeForkCount),
                  e.child
                );
              }
              t = t.sibling;
            }
          a.tail !== null &&
            Kt() > Ss &&
            ((e.flags |= 128), (i = !0), ti(a, !1), (e.lanes = 4194304));
        }
      else {
        if (!i)
          if (((t = ms(l)), t !== null)) {
            if (
              ((e.flags |= 128),
              (i = !0),
              (t = t.updateQueue),
              (e.updateQueue = t),
              zl(e, t),
              ti(a, !0),
              a.tail === null && a.tailMode === "hidden" && !l.alternate && !Y)
            )
              return (W(e), null);
          } else
            2 * Kt() - a.renderingStartTime > Ss &&
              n !== 536870912 &&
              ((e.flags |= 128), (i = !0), ti(a, !1), (e.lanes = 4194304));
        a.isBackwards
          ? ((l.sibling = e.child), (e.child = l))
          : ((t = a.last),
            t !== null ? (t.sibling = l) : (e.child = l),
            (a.last = l));
      }
      return a.tail !== null
        ? ((t = a.tail),
          (a.rendering = t),
          (a.tail = t.sibling),
          (a.renderingStartTime = Kt()),
          (t.sibling = null),
          (n = ct.current),
          P(ct, i ? (n & 1) | 2 : n & 1),
          Y && je(e, a.treeForkCount),
          t)
        : (W(e), null);
    case 22:
    case 23:
      return (
        Gt(e),
        Jr(),
        (a = e.memoizedState !== null),
        t !== null
          ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
          : a && (e.flags |= 8192),
        a
          ? n & 536870912 &&
            !(e.flags & 128) &&
            (W(e), e.subtreeFlags & 6 && (e.flags |= 8192))
          : W(e),
        (n = e.updateQueue),
        n !== null && zl(e, n.retryQueue),
        (n = null),
        t !== null &&
          t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (n = t.memoizedState.cachePool.pool),
        (a = null),
        e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (a = e.memoizedState.cachePool.pool),
        a !== n && (e.flags |= 2048),
        t !== null && xt(Un),
        null
      );
    case 24:
      return (
        (n = null),
        t !== null && (n = t.memoizedState.cache),
        e.memoizedState.cache !== n && (e.flags |= 2048),
        Ve(mt),
        W(e),
        null
      );
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(T(156, e.tag));
}
function U1(t, e) {
  switch ((Xr(e), e.tag)) {
    case 1:
      return (
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 3:
      return (
        Ve(mt),
        Da(),
        (t = e.flags),
        t & 65536 && !(t & 128) ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 26:
    case 27:
    case 5:
      return (ls(e), null);
    case 31:
      if (e.memoizedState !== null) {
        if ((Gt(e), e.alternate === null)) throw Error(T(340));
        qn();
      }
      return (
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 13:
      if ((Gt(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
        if (e.alternate === null) throw Error(T(340));
        qn();
      }
      return (
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 19:
      return (xt(ct), null);
    case 4:
      return (Da(), null);
    case 10:
      return (Ve(e.type), null);
    case 22:
    case 23:
      return (
        Gt(e),
        Jr(),
        t !== null && xt(Un),
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 24:
      return (Ve(mt), null);
    case 25:
      return null;
    default:
      return null;
  }
}
function I0(t, e) {
  switch ((Xr(e), e.tag)) {
    case 3:
      (Ve(mt), Da());
      break;
    case 26:
    case 27:
    case 5:
      ls(e);
      break;
    case 4:
      Da();
      break;
    case 31:
      e.memoizedState !== null && Gt(e);
      break;
    case 13:
      Gt(e);
      break;
    case 19:
      xt(ct);
      break;
    case 10:
      Ve(e.type);
      break;
    case 22:
    case 23:
      (Gt(e), Jr(), t !== null && xt(Un));
      break;
    case 24:
      Ve(mt);
  }
}
function al(t, e) {
  try {
    var n = e.updateQueue,
      a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var i = a.next;
      n = i;
      do {
        if ((n.tag & t) === t) {
          a = void 0;
          var l = n.create,
            s = n.inst;
          ((a = l()), (s.destroy = a));
        }
        n = n.next;
      } while (n !== i);
    }
  } catch (u) {
    Z(e, e.return, u);
  }
}
function gn(t, e, n) {
  try {
    var a = e.updateQueue,
      i = a !== null ? a.lastEffect : null;
    if (i !== null) {
      var l = i.next;
      a = l;
      do {
        if ((a.tag & t) === t) {
          var s = a.inst,
            u = s.destroy;
          if (u !== void 0) {
            ((s.destroy = void 0), (i = e));
            var o = n,
              r = u;
            try {
              r();
            } catch (c) {
              Z(i, o, c);
            }
          }
        }
        a = a.next;
      } while (a !== l);
    }
  } catch (c) {
    Z(e, e.return, c);
  }
}
function tp(t) {
  var e = t.updateQueue;
  if (e !== null) {
    var n = t.stateNode;
    try {
      r0(e, n);
    } catch (a) {
      Z(t, t.return, a);
    }
  }
}
function ep(t, e, n) {
  ((n.props = Qn(t.type, t.memoizedProps)), (n.state = t.memoizedState));
  try {
    n.componentWillUnmount();
  } catch (a) {
    Z(t, e, a);
  }
}
function xi(t, e) {
  try {
    var n = t.ref;
    if (n !== null) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          var a = t.stateNode;
          break;
        case 30:
          a = t.stateNode;
          break;
        default:
          a = t.stateNode;
      }
      typeof n == "function" ? (t.refCleanup = n(a)) : (n.current = a);
    }
  } catch (i) {
    Z(t, e, i);
  }
}
function ve(t, e) {
  var n = t.ref,
    a = t.refCleanup;
  if (n !== null)
    if (typeof a == "function")
      try {
        a();
      } catch (i) {
        Z(t, e, i);
      } finally {
        ((t.refCleanup = null),
          (t = t.alternate),
          t != null && (t.refCleanup = null));
      }
    else if (typeof n == "function")
      try {
        n(null);
      } catch (i) {
        Z(t, e, i);
      }
    else n.current = null;
}
function np(t) {
  var e = t.type,
    n = t.memoizedProps,
    a = t.stateNode;
  try {
    t: switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n.autoFocus && a.focus();
        break t;
      case "img":
        n.src ? (a.src = n.src) : n.srcSet && (a.srcset = n.srcSet);
    }
  } catch (i) {
    Z(t, t.return, i);
  }
}
function Bu(t, e, n) {
  try {
    var a = t.stateNode;
    (ib(a, t.type, n, e), (a[Ht] = e));
  } catch (i) {
    Z(t, t.return, i);
  }
}
function ap(t) {
  return (
    t.tag === 5 ||
    t.tag === 3 ||
    t.tag === 26 ||
    (t.tag === 27 && Tn(t.type)) ||
    t.tag === 4
  );
}
function Lu(t) {
  t: for (;;) {
    for (; t.sibling === null; ) {
      if (t.return === null || ap(t.return)) return null;
      t = t.return;
    }
    for (
      t.sibling.return = t.return, t = t.sibling;
      t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
    ) {
      if (
        (t.tag === 27 && Tn(t.type)) ||
        t.flags & 2 ||
        t.child === null ||
        t.tag === 4
      )
        continue t;
      ((t.child.return = t), (t = t.child));
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function Qo(t, e, n) {
  var a = t.tag;
  if (a === 5 || a === 6)
    ((t = t.stateNode),
      e
        ? (n.nodeType === 9
            ? n.body
            : n.nodeName === "HTML"
              ? n.ownerDocument.body
              : n
          ).insertBefore(t, e)
        : ((e =
            n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n),
          e.appendChild(t),
          (n = n._reactRootContainer),
          n != null || e.onclick !== null || (e.onclick = _e)));
  else if (
    a !== 4 &&
    (a === 27 && Tn(t.type) && ((n = t.stateNode), (e = null)),
    (t = t.child),
    t !== null)
  )
    for (Qo(t, e, n), t = t.sibling; t !== null; )
      (Qo(t, e, n), (t = t.sibling));
}
function bs(t, e, n) {
  var a = t.tag;
  if (a === 5 || a === 6)
    ((t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t));
  else if (
    a !== 4 &&
    (a === 27 && Tn(t.type) && (n = t.stateNode), (t = t.child), t !== null)
  )
    for (bs(t, e, n), t = t.sibling; t !== null; )
      (bs(t, e, n), (t = t.sibling));
}
function ip(t) {
  var e = t.stateNode,
    n = t.memoizedProps;
  try {
    for (var a = t.type, i = e.attributes; i.length; )
      e.removeAttributeNode(i[0]);
    (zt(e, a, n), (e[Mt] = t), (e[Ht] = n));
  } catch (l) {
    Z(t, t.return, l);
  }
}
var Ne = !1,
  ht = !1,
  Hu = !1,
  ld = typeof WeakSet == "function" ? WeakSet : Set,
  bt = null;
function B1(t, e) {
  if (((t = t.containerInfo), ($o = Ns), (t = Km(t)), Lr(t))) {
    if ("selectionStart" in t)
      var n = { start: t.selectionStart, end: t.selectionEnd };
    else
      t: {
        n = ((n = t.ownerDocument) && n.defaultView) || window;
        var a = n.getSelection && n.getSelection();
        if (a && a.rangeCount !== 0) {
          n = a.anchorNode;
          var i = a.anchorOffset,
            l = a.focusNode;
          a = a.focusOffset;
          try {
            (n.nodeType, l.nodeType);
          } catch {
            n = null;
            break t;
          }
          var s = 0,
            u = -1,
            o = -1,
            r = 0,
            c = 0,
            f = t,
            d = null;
          e: for (;;) {
            for (
              var m;
              f !== n || (i !== 0 && f.nodeType !== 3) || (u = s + i),
                f !== l || (a !== 0 && f.nodeType !== 3) || (o = s + a),
                f.nodeType === 3 && (s += f.nodeValue.length),
                (m = f.firstChild) !== null;
            )
              ((d = f), (f = m));
            for (;;) {
              if (f === t) break e;
              if (
                (d === n && ++r === i && (u = s),
                d === l && ++c === a && (o = s),
                (m = f.nextSibling) !== null)
              )
                break;
              ((f = d), (d = f.parentNode));
            }
            f = m;
          }
          n = u === -1 || o === -1 ? null : { start: u, end: o };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (
    Wo = { focusedElem: t, selectionRange: n }, Ns = !1, bt = e;
    bt !== null;
  )
    if (((e = bt), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
      ((t.return = e), (bt = t));
    else
      for (; bt !== null; ) {
        switch (((e = bt), (l = e.alternate), (t = e.flags), e.tag)) {
          case 0:
            if (
              t & 4 &&
              ((t = e.updateQueue),
              (t = t !== null ? t.events : null),
              t !== null)
            )
              for (n = 0; n < t.length; n++)
                ((i = t[n]), (i.ref.impl = i.nextImpl));
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (t & 1024 && l !== null) {
              ((t = void 0),
                (n = e),
                (i = l.memoizedProps),
                (l = l.memoizedState),
                (a = n.stateNode));
              try {
                var b = Qn(n.type, i);
                ((t = a.getSnapshotBeforeUpdate(b, l)),
                  (a.__reactInternalSnapshotBeforeUpdate = t));
              } catch (S) {
                Z(n, n.return, S);
              }
            }
            break;
          case 3:
            if (t & 1024) {
              if (((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9))
                tr(t);
              else if (n === 1)
                switch (t.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    tr(t);
                    break;
                  default:
                    t.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (t & 1024) throw Error(T(163));
        }
        if (((t = e.sibling), t !== null)) {
          ((t.return = e.return), (bt = t));
          break;
        }
        bt = e.return;
      }
}
function lp(t, e, n) {
  var a = n.flags;
  switch (n.tag) {
    case 0:
    case 11:
    case 15:
      (Ce(t, n), a & 4 && al(5, n));
      break;
    case 1:
      if ((Ce(t, n), a & 4))
        if (((t = n.stateNode), e === null))
          try {
            t.componentDidMount();
          } catch (s) {
            Z(n, n.return, s);
          }
        else {
          var i = Qn(n.type, e.memoizedProps);
          e = e.memoizedState;
          try {
            t.componentDidUpdate(i, e, t.__reactInternalSnapshotBeforeUpdate);
          } catch (s) {
            Z(n, n.return, s);
          }
        }
      (a & 64 && tp(n), a & 512 && xi(n, n.return));
      break;
    case 3:
      if ((Ce(t, n), a & 64 && ((t = n.updateQueue), t !== null))) {
        if (((e = null), n.child !== null))
          switch (n.child.tag) {
            case 27:
            case 5:
              e = n.child.stateNode;
              break;
            case 1:
              e = n.child.stateNode;
          }
        try {
          r0(t, e);
        } catch (s) {
          Z(n, n.return, s);
        }
      }
      break;
    case 27:
      e === null && a & 4 && ip(n);
    case 26:
    case 5:
      (Ce(t, n), e === null && a & 4 && np(n), a & 512 && xi(n, n.return));
      break;
    case 12:
      Ce(t, n);
      break;
    case 31:
      (Ce(t, n), a & 4 && op(t, n));
      break;
    case 13:
      (Ce(t, n),
        a & 4 && rp(t, n),
        a & 64 &&
          ((t = n.memoizedState),
          t !== null &&
            ((t = t.dehydrated),
            t !== null && ((n = Z1.bind(null, n)), db(t, n)))));
      break;
    case 22:
      if (((a = n.memoizedState !== null || Ne), !a)) {
        ((e = (e !== null && e.memoizedState !== null) || ht), (i = Ne));
        var l = ht;
        ((Ne = a),
          (ht = e) && !l ? ze(t, n, (n.subtreeFlags & 8772) !== 0) : Ce(t, n),
          (Ne = i),
          (ht = l));
      }
      break;
    case 30:
      break;
    default:
      Ce(t, n);
  }
}
function sp(t) {
  var e = t.alternate;
  (e !== null && ((t.alternate = null), sp(e)),
    (t.child = null),
    (t.deletions = null),
    (t.sibling = null),
    t.tag === 5 && ((e = t.stateNode), e !== null && _r(e)),
    (t.stateNode = null),
    (t.return = null),
    (t.dependencies = null),
    (t.memoizedProps = null),
    (t.memoizedState = null),
    (t.pendingProps = null),
    (t.stateNode = null),
    (t.updateQueue = null));
}
var at = null,
  Ut = !1;
function De(t, e, n) {
  for (n = n.child; n !== null; ) (up(t, e, n), (n = n.sibling));
}
function up(t, e, n) {
  if (Zt && typeof Zt.onCommitFiberUnmount == "function")
    try {
      Zt.onCommitFiberUnmount(Pi, n);
    } catch {}
  switch (n.tag) {
    case 26:
      (ht || ve(n, e),
        De(t, e, n),
        n.memoizedState
          ? n.memoizedState.count--
          : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
      break;
    case 27:
      ht || ve(n, e);
      var a = at,
        i = Ut;
      (Tn(n.type) && ((at = n.stateNode), (Ut = !1)),
        De(t, e, n),
        Mi(n.stateNode),
        (at = a),
        (Ut = i));
      break;
    case 5:
      ht || ve(n, e);
    case 6:
      if (
        ((a = at),
        (i = Ut),
        (at = null),
        De(t, e, n),
        (at = a),
        (Ut = i),
        at !== null)
      )
        if (Ut)
          try {
            (at.nodeType === 9
              ? at.body
              : at.nodeName === "HTML"
                ? at.ownerDocument.body
                : at
            ).removeChild(n.stateNode);
          } catch (l) {
            Z(n, e, l);
          }
        else
          try {
            at.removeChild(n.stateNode);
          } catch (l) {
            Z(n, e, l);
          }
      break;
    case 18:
      at !== null &&
        (Ut
          ? ((t = at),
            vd(
              t.nodeType === 9
                ? t.body
                : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t,
              n.stateNode,
            ),
            Ua(t))
          : vd(at, n.stateNode));
      break;
    case 4:
      ((a = at),
        (i = Ut),
        (at = n.stateNode.containerInfo),
        (Ut = !0),
        De(t, e, n),
        (at = a),
        (Ut = i));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      (gn(2, n, e), ht || gn(4, n, e), De(t, e, n));
      break;
    case 1:
      (ht ||
        (ve(n, e),
        (a = n.stateNode),
        typeof a.componentWillUnmount == "function" && ep(n, e, a)),
        De(t, e, n));
      break;
    case 21:
      De(t, e, n);
      break;
    case 22:
      ((ht = (a = ht) || n.memoizedState !== null), De(t, e, n), (ht = a));
      break;
    default:
      De(t, e, n);
  }
}
function op(t, e) {
  if (
    e.memoizedState === null &&
    ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
  ) {
    t = t.dehydrated;
    try {
      Ua(t);
    } catch (n) {
      Z(e, e.return, n);
    }
  }
}
function rp(t, e) {
  if (
    e.memoizedState === null &&
    ((t = e.alternate),
    t !== null &&
      ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
  )
    try {
      Ua(t);
    } catch (n) {
      Z(e, e.return, n);
    }
}
function L1(t) {
  switch (t.tag) {
    case 31:
    case 13:
    case 19:
      var e = t.stateNode;
      return (e === null && (e = t.stateNode = new ld()), e);
    case 22:
      return (
        (t = t.stateNode),
        (e = t._retryCache),
        e === null && (e = t._retryCache = new ld()),
        e
      );
    default:
      throw Error(T(435, t.tag));
  }
}
function jl(t, e) {
  var n = L1(t);
  e.forEach(function (a) {
    if (!n.has(a)) {
      n.add(a);
      var i = k1.bind(null, t, a);
      a.then(i, i);
    }
  });
}
function wt(t, e) {
  var n = e.deletions;
  if (n !== null)
    for (var a = 0; a < n.length; a++) {
      var i = n[a],
        l = t,
        s = e,
        u = s;
      t: for (; u !== null; ) {
        switch (u.tag) {
          case 27:
            if (Tn(u.type)) {
              ((at = u.stateNode), (Ut = !1));
              break t;
            }
            break;
          case 5:
            ((at = u.stateNode), (Ut = !1));
            break t;
          case 3:
          case 4:
            ((at = u.stateNode.containerInfo), (Ut = !0));
            break t;
        }
        u = u.return;
      }
      if (at === null) throw Error(T(160));
      (up(l, s, i),
        (at = null),
        (Ut = !1),
        (l = i.alternate),
        l !== null && (l.return = null),
        (i.return = null));
    }
  if (e.subtreeFlags & 13886)
    for (e = e.child; e !== null; ) (cp(e, t), (e = e.sibling));
}
var me = null;
function cp(t, e) {
  var n = t.alternate,
    a = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      (wt(e, t),
        Vt(t),
        a & 4 && (gn(3, t, t.return), al(3, t), gn(5, t, t.return)));
      break;
    case 1:
      (wt(e, t),
        Vt(t),
        a & 512 && (ht || n === null || ve(n, n.return)),
        a & 64 &&
          Ne &&
          ((t = t.updateQueue),
          t !== null &&
            ((a = t.callbacks),
            a !== null &&
              ((n = t.shared.hiddenCallbacks),
              (t.shared.hiddenCallbacks = n === null ? a : n.concat(a))))));
      break;
    case 26:
      var i = me;
      if (
        (wt(e, t),
        Vt(t),
        a & 512 && (ht || n === null || ve(n, n.return)),
        a & 4)
      ) {
        var l = n !== null ? n.memoizedState : null;
        if (((a = t.memoizedState), n === null))
          if (a === null)
            if (t.stateNode === null) {
              t: {
                ((a = t.type),
                  (n = t.memoizedProps),
                  (i = i.ownerDocument || i));
                e: switch (a) {
                  case "title":
                    ((l = i.getElementsByTagName("title")[0]),
                      (!l ||
                        l[Ii] ||
                        l[Mt] ||
                        l.namespaceURI === "http://www.w3.org/2000/svg" ||
                        l.hasAttribute("itemprop")) &&
                        ((l = i.createElement(a)),
                        i.head.insertBefore(
                          l,
                          i.querySelector("head > title"),
                        )),
                      zt(l, a, n),
                      (l[Mt] = t),
                      St(l),
                      (a = l));
                    break t;
                  case "link":
                    var s = Md("link", "href", i).get(a + (n.href || ""));
                    if (s) {
                      for (var u = 0; u < s.length; u++)
                        if (
                          ((l = s[u]),
                          l.getAttribute("href") ===
                            (n.href == null || n.href === "" ? null : n.href) &&
                            l.getAttribute("rel") ===
                              (n.rel == null ? null : n.rel) &&
                            l.getAttribute("title") ===
                              (n.title == null ? null : n.title) &&
                            l.getAttribute("crossorigin") ===
                              (n.crossOrigin == null ? null : n.crossOrigin))
                        ) {
                          s.splice(u, 1);
                          break e;
                        }
                    }
                    ((l = i.createElement(a)),
                      zt(l, a, n),
                      i.head.appendChild(l));
                    break;
                  case "meta":
                    if (
                      (s = Md("meta", "content", i).get(a + (n.content || "")))
                    ) {
                      for (u = 0; u < s.length; u++)
                        if (
                          ((l = s[u]),
                          l.getAttribute("content") ===
                            (n.content == null ? null : "" + n.content) &&
                            l.getAttribute("name") ===
                              (n.name == null ? null : n.name) &&
                            l.getAttribute("property") ===
                              (n.property == null ? null : n.property) &&
                            l.getAttribute("http-equiv") ===
                              (n.httpEquiv == null ? null : n.httpEquiv) &&
                            l.getAttribute("charset") ===
                              (n.charSet == null ? null : n.charSet))
                        ) {
                          s.splice(u, 1);
                          break e;
                        }
                    }
                    ((l = i.createElement(a)),
                      zt(l, a, n),
                      i.head.appendChild(l));
                    break;
                  default:
                    throw Error(T(468, a));
                }
                ((l[Mt] = t), St(l), (a = l));
              }
              t.stateNode = a;
            } else Dd(i, t.type, t.stateNode);
          else t.stateNode = Ed(i, a, t.memoizedProps);
        else
          l !== a
            ? (l === null
                ? n.stateNode !== null &&
                  ((n = n.stateNode), n.parentNode.removeChild(n))
                : l.count--,
              a === null
                ? Dd(i, t.type, t.stateNode)
                : Ed(i, a, t.memoizedProps))
            : a === null &&
              t.stateNode !== null &&
              Bu(t, t.memoizedProps, n.memoizedProps);
      }
      break;
    case 27:
      (wt(e, t),
        Vt(t),
        a & 512 && (ht || n === null || ve(n, n.return)),
        n !== null && a & 4 && Bu(t, t.memoizedProps, n.memoizedProps));
      break;
    case 5:
      if (
        (wt(e, t),
        Vt(t),
        a & 512 && (ht || n === null || ve(n, n.return)),
        t.flags & 32)
      ) {
        i = t.stateNode;
        try {
          za(i, "");
        } catch (b) {
          Z(t, t.return, b);
        }
      }
      (a & 4 &&
        t.stateNode != null &&
        ((i = t.memoizedProps), Bu(t, i, n !== null ? n.memoizedProps : i)),
        a & 1024 && (Hu = !0));
      break;
    case 6:
      if ((wt(e, t), Vt(t), a & 4)) {
        if (t.stateNode === null) throw Error(T(162));
        ((a = t.memoizedProps), (n = t.stateNode));
        try {
          n.nodeValue = a;
        } catch (b) {
          Z(t, t.return, b);
        }
      }
      break;
    case 3:
      if (
        (($l = null),
        (i = me),
        (me = Cs(e.containerInfo)),
        wt(e, t),
        (me = i),
        Vt(t),
        a & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Ua(e.containerInfo);
        } catch (b) {
          Z(t, t.return, b);
        }
      Hu && ((Hu = !1), fp(t));
      break;
    case 4:
      ((a = me),
        (me = Cs(t.stateNode.containerInfo)),
        wt(e, t),
        Vt(t),
        (me = a));
      break;
    case 12:
      (wt(e, t), Vt(t));
      break;
    case 31:
      (wt(e, t),
        Vt(t),
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((t.updateQueue = null), jl(t, a))));
      break;
    case 13:
      (wt(e, t),
        Vt(t),
        t.child.flags & 8192 &&
          (t.memoizedState !== null) !=
            (n !== null && n.memoizedState !== null) &&
          (tu = Kt()),
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((t.updateQueue = null), jl(t, a))));
      break;
    case 22:
      i = t.memoizedState !== null;
      var o = n !== null && n.memoizedState !== null,
        r = Ne,
        c = ht;
      if (
        ((Ne = r || i),
        (ht = c || o),
        wt(e, t),
        (ht = c),
        (Ne = r),
        Vt(t),
        a & 8192)
      )
        t: for (
          e = t.stateNode,
            e._visibility = i ? e._visibility & -2 : e._visibility | 1,
            i && (n === null || o || Ne || ht || Nn(t)),
            n = null,
            e = t;
          ;
        ) {
          if (e.tag === 5 || e.tag === 26) {
            if (n === null) {
              o = n = e;
              try {
                if (((l = o.stateNode), i))
                  ((s = l.style),
                    typeof s.setProperty == "function"
                      ? s.setProperty("display", "none", "important")
                      : (s.display = "none"));
                else {
                  u = o.stateNode;
                  var f = o.memoizedProps.style,
                    d =
                      f != null && f.hasOwnProperty("display")
                        ? f.display
                        : null;
                  u.style.display =
                    d == null || typeof d == "boolean" ? "" : ("" + d).trim();
                }
              } catch (b) {
                Z(o, o.return, b);
              }
            }
          } else if (e.tag === 6) {
            if (n === null) {
              o = e;
              try {
                o.stateNode.nodeValue = i ? "" : o.memoizedProps;
              } catch (b) {
                Z(o, o.return, b);
              }
            }
          } else if (e.tag === 18) {
            if (n === null) {
              o = e;
              try {
                var m = o.stateNode;
                i ? bd(m, !0) : bd(o.stateNode, !1);
              } catch (b) {
                Z(o, o.return, b);
              }
            }
          } else if (
            ((e.tag !== 22 && e.tag !== 23) ||
              e.memoizedState === null ||
              e === t) &&
            e.child !== null
          ) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break t;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break t;
            (n === e && (n = null), (e = e.return));
          }
          (n === e && (n = null),
            (e.sibling.return = e.return),
            (e = e.sibling));
        }
      a & 4 &&
        ((a = t.updateQueue),
        a !== null &&
          ((n = a.retryQueue),
          n !== null && ((a.retryQueue = null), jl(t, n))));
      break;
    case 19:
      (wt(e, t),
        Vt(t),
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((t.updateQueue = null), jl(t, a))));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      (wt(e, t), Vt(t));
  }
}
function Vt(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      for (var n, a = t.return; a !== null; ) {
        if (ap(a)) {
          n = a;
          break;
        }
        a = a.return;
      }
      if (n == null) throw Error(T(160));
      switch (n.tag) {
        case 27:
          var i = n.stateNode,
            l = Lu(t);
          bs(t, l, i);
          break;
        case 5:
          var s = n.stateNode;
          n.flags & 32 && (za(s, ""), (n.flags &= -33));
          var u = Lu(t);
          bs(t, u, s);
          break;
        case 3:
        case 4:
          var o = n.stateNode.containerInfo,
            r = Lu(t);
          Qo(t, r, o);
          break;
        default:
          throw Error(T(161));
      }
    } catch (c) {
      Z(t, t.return, c);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function fp(t) {
  if (t.subtreeFlags & 1024)
    for (t = t.child; t !== null; ) {
      var e = t;
      (fp(e),
        e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
        (t = t.sibling));
    }
}
function Ce(t, e) {
  if (e.subtreeFlags & 8772)
    for (e = e.child; e !== null; ) (lp(t, e.alternate, e), (e = e.sibling));
}
function Nn(t) {
  for (t = t.child; t !== null; ) {
    var e = t;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (gn(4, e, e.return), Nn(e));
        break;
      case 1:
        ve(e, e.return);
        var n = e.stateNode;
        (typeof n.componentWillUnmount == "function" && ep(e, e.return, n),
          Nn(e));
        break;
      case 27:
        Mi(e.stateNode);
      case 26:
      case 5:
        (ve(e, e.return), Nn(e));
        break;
      case 22:
        e.memoizedState === null && Nn(e);
        break;
      case 30:
        Nn(e);
        break;
      default:
        Nn(e);
    }
    t = t.sibling;
  }
}
function ze(t, e, n) {
  for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
    var a = e.alternate,
      i = t,
      l = e,
      s = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ze(i, l, n), al(4, l));
        break;
      case 1:
        if (
          (ze(i, l, n),
          (a = l),
          (i = a.stateNode),
          typeof i.componentDidMount == "function")
        )
          try {
            i.componentDidMount();
          } catch (r) {
            Z(a, a.return, r);
          }
        if (((a = l), (i = a.updateQueue), i !== null)) {
          var u = a.stateNode;
          try {
            var o = i.shared.hiddenCallbacks;
            if (o !== null)
              for (i.shared.hiddenCallbacks = null, i = 0; i < o.length; i++)
                o0(o[i], u);
          } catch (r) {
            Z(a, a.return, r);
          }
        }
        (n && s & 64 && tp(l), xi(l, l.return));
        break;
      case 27:
        ip(l);
      case 26:
      case 5:
        (ze(i, l, n), n && a === null && s & 4 && np(l), xi(l, l.return));
        break;
      case 12:
        ze(i, l, n);
        break;
      case 31:
        (ze(i, l, n), n && s & 4 && op(i, l));
        break;
      case 13:
        (ze(i, l, n), n && s & 4 && rp(i, l));
        break;
      case 22:
        (l.memoizedState === null && ze(i, l, n), xi(l, l.return));
        break;
      case 30:
        break;
      default:
        ze(i, l, n);
    }
    e = e.sibling;
  }
}
function cc(t, e) {
  var n = null;
  (t !== null &&
    t.memoizedState !== null &&
    t.memoizedState.cachePool !== null &&
    (n = t.memoizedState.cachePool.pool),
    (t = null),
    e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (t = e.memoizedState.cachePool.pool),
    t !== n && (t != null && t.refCount++, n != null && el(n)));
}
function fc(t, e) {
  ((t = null),
    e.alternate !== null && (t = e.alternate.memoizedState.cache),
    (e = e.memoizedState.cache),
    e !== t && (e.refCount++, t != null && el(t)));
}
function de(t, e, n, a) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) (dp(t, e, n, a), (e = e.sibling));
}
function dp(t, e, n, a) {
  var i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      (de(t, e, n, a), i & 2048 && al(9, e));
      break;
    case 1:
      de(t, e, n, a);
      break;
    case 3:
      (de(t, e, n, a),
        i & 2048 &&
          ((t = null),
          e.alternate !== null && (t = e.alternate.memoizedState.cache),
          (e = e.memoizedState.cache),
          e !== t && (e.refCount++, t != null && el(t))));
      break;
    case 12:
      if (i & 2048) {
        (de(t, e, n, a), (t = e.stateNode));
        try {
          var l = e.memoizedProps,
            s = l.id,
            u = l.onPostCommit;
          typeof u == "function" &&
            u(
              s,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0,
            );
        } catch (o) {
          Z(e, e.return, o);
        }
      } else de(t, e, n, a);
      break;
    case 31:
      de(t, e, n, a);
      break;
    case 13:
      de(t, e, n, a);
      break;
    case 23:
      break;
    case 22:
      ((l = e.stateNode),
        (s = e.alternate),
        e.memoizedState !== null
          ? l._visibility & 2
            ? de(t, e, n, a)
            : Ti(t, e)
          : l._visibility & 2
            ? de(t, e, n, a)
            : ((l._visibility |= 2),
              ta(t, e, n, a, (e.subtreeFlags & 10256) !== 0 || !1)),
        i & 2048 && cc(s, e));
      break;
    case 24:
      (de(t, e, n, a), i & 2048 && fc(e.alternate, e));
      break;
    default:
      de(t, e, n, a);
  }
}
function ta(t, e, n, a, i) {
  for (
    i = i && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child;
    e !== null;
  ) {
    var l = t,
      s = e,
      u = n,
      o = a,
      r = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        (ta(l, s, u, o, i), al(8, s));
        break;
      case 23:
        break;
      case 22:
        var c = s.stateNode;
        (s.memoizedState !== null
          ? c._visibility & 2
            ? ta(l, s, u, o, i)
            : Ti(l, s)
          : ((c._visibility |= 2), ta(l, s, u, o, i)),
          i && r & 2048 && cc(s.alternate, s));
        break;
      case 24:
        (ta(l, s, u, o, i), i && r & 2048 && fc(s.alternate, s));
        break;
      default:
        ta(l, s, u, o, i);
    }
    e = e.sibling;
  }
}
function Ti(t, e) {
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) {
      var n = t,
        a = e,
        i = a.flags;
      switch (a.tag) {
        case 22:
          (Ti(n, a), i & 2048 && cc(a.alternate, a));
          break;
        case 24:
          (Ti(n, a), i & 2048 && fc(a.alternate, a));
          break;
        default:
          Ti(n, a);
      }
      e = e.sibling;
    }
}
var oi = 8192;
function Wn(t, e, n) {
  if (t.subtreeFlags & oi)
    for (t = t.child; t !== null; ) (hp(t, e, n), (t = t.sibling));
}
function hp(t, e, n) {
  switch (t.tag) {
    case 26:
      (Wn(t, e, n),
        t.flags & oi &&
          t.memoizedState !== null &&
          Eb(n, me, t.memoizedState, t.memoizedProps));
      break;
    case 5:
      Wn(t, e, n);
      break;
    case 3:
    case 4:
      var a = me;
      ((me = Cs(t.stateNode.containerInfo)), Wn(t, e, n), (me = a));
      break;
    case 22:
      t.memoizedState === null &&
        ((a = t.alternate),
        a !== null && a.memoizedState !== null
          ? ((a = oi), (oi = 16777216), Wn(t, e, n), (oi = a))
          : Wn(t, e, n));
      break;
    default:
      Wn(t, e, n);
  }
}
function mp(t) {
  var e = t.alternate;
  if (e !== null && ((t = e.child), t !== null)) {
    e.child = null;
    do ((e = t.sibling), (t.sibling = null), (t = e));
    while (t !== null);
  }
}
function ei(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var a = e[n];
        ((bt = a), yp(a, t));
      }
    mp(t);
  }
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) (pp(t), (t = t.sibling));
}
function pp(t) {
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      (ei(t), t.flags & 2048 && gn(9, t, t.return));
      break;
    case 3:
      ei(t);
      break;
    case 12:
      ei(t);
      break;
    case 22:
      var e = t.stateNode;
      t.memoizedState !== null &&
      e._visibility & 2 &&
      (t.return === null || t.return.tag !== 13)
        ? ((e._visibility &= -3), Fl(t))
        : ei(t);
      break;
    default:
      ei(t);
  }
}
function Fl(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null)
      for (var n = 0; n < e.length; n++) {
        var a = e[n];
        ((bt = a), yp(a, t));
      }
    mp(t);
  }
  for (t = t.child; t !== null; ) {
    switch (((e = t), e.tag)) {
      case 0:
      case 11:
      case 15:
        (gn(8, e, e.return), Fl(e));
        break;
      case 22:
        ((n = e.stateNode),
          n._visibility & 2 && ((n._visibility &= -3), Fl(e)));
        break;
      default:
        Fl(e);
    }
    t = t.sibling;
  }
}
function yp(t, e) {
  for (; bt !== null; ) {
    var n = bt;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        gn(8, n, e);
        break;
      case 23:
      case 22:
        if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
          var a = n.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        el(n.memoizedState.cache);
    }
    if (((a = n.child), a !== null)) ((a.return = n), (bt = a));
    else
      t: for (n = t; bt !== null; ) {
        a = bt;
        var i = a.sibling,
          l = a.return;
        if ((sp(a), a === n)) {
          bt = null;
          break t;
        }
        if (i !== null) {
          ((i.return = l), (bt = i));
          break t;
        }
        bt = l;
      }
  }
}
var H1 = {
    getCacheForType: function (t) {
      var e = Ct(mt),
        n = e.data.get(t);
      return (n === void 0 && ((n = t()), e.data.set(t, n)), n);
    },
    cacheSignal: function () {
      return Ct(mt).controller.signal;
    },
  },
  q1 = typeof WeakMap == "function" ? WeakMap : Map,
  G = 0,
  F = null,
  H = null,
  q = 0,
  K = 0,
  Yt = null,
  nn = !1,
  Ka = !1,
  dc = !1,
  Xe = 0,
  ot = 0,
  vn = 0,
  Ln = 0,
  hc = 0,
  Qt = 0,
  _a = 0,
  Ai = null,
  Bt = null,
  Ko = !1,
  tu = 0,
  gp = 0,
  Ss = 1 / 0,
  xs = null,
  cn = null,
  gt = 0,
  fn = null,
  Oa = null,
  Ue = 0,
  Zo = 0,
  ko = null,
  vp = null,
  Ei = 0,
  Jo = null;
function Jt() {
  return G & 2 && q !== 0 ? q & -q : w.T !== null ? pc() : Cm();
}
function bp() {
  if (Qt === 0)
    if (!(q & 536870912) || Y) {
      var t = xl;
      ((xl <<= 1), !(xl & 3932160) && (xl = 262144), (Qt = t));
    } else Qt = 536870912;
  return ((t = $t.current), t !== null && (t.flags |= 32), Qt);
}
function Lt(t, e, n) {
  (((t === F && (K === 2 || K === 9)) || t.cancelPendingCommit !== null) &&
    (wa(t, 0), an(t, q, Qt, !1)),
    Wi(t, n),
    (!(G & 2) || t !== F) &&
      (t === F && (!(G & 2) && (Ln |= n), ot === 4 && an(t, q, Qt, !1)),
      Ae(t)));
}
function Sp(t, e, n) {
  if (G & 6) throw Error(T(327));
  var a = (!n && (e & 127) === 0 && (e & t.expiredLanes) === 0) || $i(t, e),
    i = a ? X1(t, e) : qu(t, e, !0),
    l = a;
  do {
    if (i === 0) {
      Ka && !a && an(t, e, 0, !1);
      break;
    } else {
      if (((n = t.current.alternate), l && !Y1(n))) {
        ((i = qu(t, e, !1)), (l = !1));
        continue;
      }
      if (i === 2) {
        if (((l = e), t.errorRecoveryDisabledLanes & l)) var s = 0;
        else
          ((s = t.pendingLanes & -536870913),
            (s = s !== 0 ? s : s & 536870912 ? 536870912 : 0));
        if (s !== 0) {
          e = s;
          t: {
            var u = t;
            i = Ai;
            var o = u.current.memoizedState.isDehydrated;
            if ((o && (wa(u, s).flags |= 256), (s = qu(u, s, !1)), s !== 2)) {
              if (dc && !o) {
                ((u.errorRecoveryDisabledLanes |= l), (Ln |= l), (i = 4));
                break t;
              }
              ((l = Bt),
                (Bt = i),
                l !== null && (Bt === null ? (Bt = l) : Bt.push.apply(Bt, l)));
            }
            i = s;
          }
          if (((l = !1), i !== 2)) continue;
        }
      }
      if (i === 1) {
        (wa(t, 0), an(t, e, 0, !0));
        break;
      }
      t: {
        switch (((a = t), (l = i), l)) {
          case 0:
          case 1:
            throw Error(T(345));
          case 4:
            if ((e & 4194048) !== e) break;
          case 6:
            an(a, e, Qt, !nn);
            break t;
          case 2:
            Bt = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(T(329));
        }
        if ((e & 62914560) === e && ((i = tu + 300 - Kt()), 10 < i)) {
          if ((an(a, e, Qt, !nn), Xs(a, 0, !0) !== 0)) break t;
          ((Ue = e),
            (a.timeoutHandle = qp(
              sd.bind(
                null,
                a,
                n,
                Bt,
                xs,
                Ko,
                e,
                Qt,
                Ln,
                _a,
                nn,
                l,
                "Throttled",
                -0,
                0,
              ),
              i,
            )));
          break t;
        }
        sd(a, n, Bt, xs, Ko, e, Qt, Ln, _a, nn, l, null, -0, 0);
      }
    }
    break;
  } while (!0);
  Ae(t);
}
function sd(t, e, n, a, i, l, s, u, o, r, c, f, d, m) {
  if (
    ((t.timeoutHandle = -1),
    (f = e.subtreeFlags),
    f & 8192 || (f & 16785408) === 16785408)
  ) {
    ((f = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: _e,
    }),
      hp(e, l, f));
    var b =
      (l & 62914560) === l ? tu - Kt() : (l & 4194048) === l ? gp - Kt() : 0;
    if (((b = Mb(f, b)), b !== null)) {
      ((Ue = l),
        (t.cancelPendingCommit = b(
          od.bind(null, t, e, l, n, a, i, s, u, o, c, f, null, d, m),
        )),
        an(t, l, s, !r));
      return;
    }
  }
  od(t, e, l, n, a, i, s, u, o);
}
function Y1(t) {
  for (var e = t; ; ) {
    var n = e.tag;
    if (
      (n === 0 || n === 11 || n === 15) &&
      e.flags & 16384 &&
      ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
    )
      for (var a = 0; a < n.length; a++) {
        var i = n[a],
          l = i.getSnapshot;
        i = i.value;
        try {
          if (!Pt(l(), i)) return !1;
        } catch {
          return !1;
        }
      }
    if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
      ((n.return = e), (e = n));
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
  }
  return !0;
}
function an(t, e, n, a) {
  ((e &= ~hc),
    (e &= ~Ln),
    (t.suspendedLanes |= e),
    (t.pingedLanes &= ~e),
    a && (t.warmLanes |= e),
    (a = t.expirationTimes));
  for (var i = e; 0 < i; ) {
    var l = 31 - kt(i),
      s = 1 << l;
    ((a[l] = -1), (i &= ~s));
  }
  n !== 0 && Em(t, n, e);
}
function eu() {
  return G & 6 ? !0 : (il(0), !1);
}
function mc() {
  if (H !== null) {
    if (K === 0) var t = H.return;
    else ((t = H), (Oe = Fn = null), Ir(t), (Aa = null), (Ui = 0), (t = H));
    for (; t !== null; ) (I0(t.alternate, t), (t = t.return));
    H = null;
  }
}
function wa(t, e) {
  var n = t.timeoutHandle;
  (n !== -1 && ((t.timeoutHandle = -1), ub(n)),
    (n = t.cancelPendingCommit),
    n !== null && ((t.cancelPendingCommit = null), n()),
    (Ue = 0),
    mc(),
    (F = t),
    (H = n = we(t.current, null)),
    (q = e),
    (K = 0),
    (Yt = null),
    (nn = !1),
    (Ka = $i(t, e)),
    (dc = !1),
    (_a = Qt = hc = Ln = vn = ot = 0),
    (Bt = Ai = null),
    (Ko = !1),
    e & 8 && (e |= e & 32));
  var a = t.entangledLanes;
  if (a !== 0)
    for (t = t.entanglements, a &= e; 0 < a; ) {
      var i = 31 - kt(a),
        l = 1 << i;
      ((e |= t[i]), (a &= ~l));
    }
  return ((Xe = e), ks(), n);
}
function xp(t, e) {
  ((B = null),
    (w.H = Li),
    e === Qa || e === Fs
      ? ((e = Lf()), (K = 3))
      : e === Zr
        ? ((e = Lf()), (K = 4))
        : (K =
            e === oc
              ? 8
              : e !== null &&
                  typeof e == "object" &&
                  typeof e.then == "function"
                ? 6
                : 1),
    (Yt = e),
    H === null && ((ot = 1), gs(t, ue(e, t.current))));
}
function Tp() {
  var t = $t.current;
  return t === null
    ? !0
    : (q & 4194048) === q
      ? re === null
      : (q & 62914560) === q || q & 536870912
        ? t === re
        : !1;
}
function Ap() {
  var t = w.H;
  return ((w.H = Li), t === null ? Li : t);
}
function Ep() {
  var t = w.A;
  return ((w.A = H1), t);
}
function Ts() {
  ((ot = 4),
    nn || ((q & 4194048) !== q && $t.current !== null) || (Ka = !0),
    (!(vn & 134217727) && !(Ln & 134217727)) || F === null || an(F, q, Qt, !1));
}
function qu(t, e, n) {
  var a = G;
  G |= 2;
  var i = Ap(),
    l = Ep();
  ((F !== t || q !== e) && ((xs = null), wa(t, e)), (e = !1));
  var s = ot;
  t: do
    try {
      if (K !== 0 && H !== null) {
        var u = H,
          o = Yt;
        switch (K) {
          case 8:
            (mc(), (s = 6));
            break t;
          case 3:
          case 2:
          case 9:
          case 6:
            $t.current === null && (e = !0);
            var r = K;
            if (((K = 0), (Yt = null), ha(t, u, o, r), n && Ka)) {
              s = 0;
              break t;
            }
            break;
          default:
            ((r = K), (K = 0), (Yt = null), ha(t, u, o, r));
        }
      }
      (G1(), (s = ot));
      break;
    } catch (c) {
      xp(t, c);
    }
  while (!0);
  return (
    e && t.shellSuspendCounter++,
    (Oe = Fn = null),
    (G = a),
    (w.H = i),
    (w.A = l),
    H === null && ((F = null), (q = 0), ks()),
    s
  );
}
function G1() {
  for (; H !== null; ) Mp(H);
}
function X1(t, e) {
  var n = G;
  G |= 2;
  var a = Ap(),
    i = Ep();
  F !== t || q !== e
    ? ((xs = null), (Ss = Kt() + 500), wa(t, e))
    : (Ka = $i(t, e));
  t: do
    try {
      if (K !== 0 && H !== null) {
        e = H;
        var l = Yt;
        e: switch (K) {
          case 1:
            ((K = 0), (Yt = null), ha(t, e, l, 1));
            break;
          case 2:
          case 9:
            if (Bf(l)) {
              ((K = 0), (Yt = null), ud(e));
              break;
            }
            ((e = function () {
              ((K !== 2 && K !== 9) || F !== t || (K = 7), Ae(t));
            }),
              l.then(e, e));
            break t;
          case 3:
            K = 7;
            break t;
          case 4:
            K = 5;
            break t;
          case 7:
            Bf(l)
              ? ((K = 0), (Yt = null), ud(e))
              : ((K = 0), (Yt = null), ha(t, e, l, 7));
            break;
          case 5:
            var s = null;
            switch (H.tag) {
              case 26:
                s = H.memoizedState;
              case 5:
              case 27:
                var u = H;
                if (s ? Kp(s) : u.stateNode.complete) {
                  ((K = 0), (Yt = null));
                  var o = u.sibling;
                  if (o !== null) H = o;
                  else {
                    var r = u.return;
                    r !== null ? ((H = r), nu(r)) : (H = null);
                  }
                  break e;
                }
            }
            ((K = 0), (Yt = null), ha(t, e, l, 5));
            break;
          case 6:
            ((K = 0), (Yt = null), ha(t, e, l, 6));
            break;
          case 8:
            (mc(), (ot = 6));
            break t;
          default:
            throw Error(T(462));
        }
      }
      Q1();
      break;
    } catch (c) {
      xp(t, c);
    }
  while (!0);
  return (
    (Oe = Fn = null),
    (w.H = a),
    (w.A = i),
    (G = n),
    H !== null ? 0 : ((F = null), (q = 0), ks(), ot)
  );
}
function Q1() {
  for (; H !== null && !hv(); ) Mp(H);
}
function Mp(t) {
  var e = W0(t.alternate, t, Xe);
  ((t.memoizedProps = t.pendingProps), e === null ? nu(t) : (H = e));
}
function ud(t) {
  var e = t,
    n = e.alternate;
  switch (e.tag) {
    case 15:
    case 0:
      e = td(n, e, e.pendingProps, e.type, void 0, q);
      break;
    case 11:
      e = td(n, e, e.pendingProps, e.type.render, e.ref, q);
      break;
    case 5:
      Ir(e);
    default:
      (I0(n, e), (e = H = Im(e, Xe)), (e = W0(n, e, Xe)));
  }
  ((t.memoizedProps = t.pendingProps), e === null ? nu(t) : (H = e));
}
function ha(t, e, n, a) {
  ((Oe = Fn = null), Ir(e), (Aa = null), (Ui = 0));
  var i = e.return;
  try {
    if (_1(t, i, e, n, q)) {
      ((ot = 1), gs(t, ue(n, t.current)), (H = null));
      return;
    }
  } catch (l) {
    if (i !== null) throw ((H = i), l);
    ((ot = 1), gs(t, ue(n, t.current)), (H = null));
    return;
  }
  e.flags & 32768
    ? (Y || a === 1
        ? (t = !0)
        : Ka || q & 536870912
          ? (t = !1)
          : ((nn = t = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = $t.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
      Dp(e, t))
    : nu(e);
}
function nu(t) {
  var e = t;
  do {
    if (e.flags & 32768) {
      Dp(e, nn);
      return;
    }
    t = e.return;
    var n = V1(e.alternate, e, Xe);
    if (n !== null) {
      H = n;
      return;
    }
    if (((e = e.sibling), e !== null)) {
      H = e;
      return;
    }
    H = e = t;
  } while (e !== null);
  ot === 0 && (ot = 5);
}
function Dp(t, e) {
  do {
    var n = U1(t.alternate, t);
    if (n !== null) {
      ((n.flags &= 32767), (H = n));
      return;
    }
    if (
      ((n = t.return),
      n !== null &&
        ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
      !e && ((t = t.sibling), t !== null))
    ) {
      H = t;
      return;
    }
    H = t = n;
  } while (t !== null);
  ((ot = 6), (H = null));
}
function od(t, e, n, a, i, l, s, u, o) {
  t.cancelPendingCommit = null;
  do au();
  while (gt !== 0);
  if (G & 6) throw Error(T(327));
  if (e !== null) {
    if (e === t.current) throw Error(T(177));
    if (
      ((l = e.lanes | e.childLanes),
      (l |= Hr),
      Av(t, n, l, s, u, o),
      t === F && ((H = F = null), (q = 0)),
      (Oa = e),
      (fn = t),
      (Ue = n),
      (Zo = l),
      (ko = i),
      (vp = a),
      e.subtreeFlags & 10256 || e.flags & 10256
        ? ((t.callbackNode = null),
          (t.callbackPriority = 0),
          J1(ss, function () {
            return (Rp(), null);
          }))
        : ((t.callbackNode = null), (t.callbackPriority = 0)),
      (a = (e.flags & 13878) !== 0),
      e.subtreeFlags & 13878 || a)
    ) {
      ((a = w.T), (w.T = null), (i = X.p), (X.p = 2), (s = G), (G |= 4));
      try {
        B1(t, e, n);
      } finally {
        ((G = s), (X.p = i), (w.T = a));
      }
    }
    ((gt = 1), Cp(), zp(), jp());
  }
}
function Cp() {
  if (gt === 1) {
    gt = 0;
    var t = fn,
      e = Oa,
      n = (e.flags & 13878) !== 0;
    if (e.subtreeFlags & 13878 || n) {
      ((n = w.T), (w.T = null));
      var a = X.p;
      X.p = 2;
      var i = G;
      G |= 4;
      try {
        cp(e, t);
        var l = Wo,
          s = Km(t.containerInfo),
          u = l.focusedElem,
          o = l.selectionRange;
        if (
          s !== u &&
          u &&
          u.ownerDocument &&
          Qm(u.ownerDocument.documentElement, u)
        ) {
          if (o !== null && Lr(u)) {
            var r = o.start,
              c = o.end;
            if ((c === void 0 && (c = r), "selectionStart" in u))
              ((u.selectionStart = r),
                (u.selectionEnd = Math.min(c, u.value.length)));
            else {
              var f = u.ownerDocument || document,
                d = (f && f.defaultView) || window;
              if (d.getSelection) {
                var m = d.getSelection(),
                  b = u.textContent.length,
                  S = Math.min(o.start, b),
                  A = o.end === void 0 ? S : Math.min(o.end, b);
                !m.extend && S > A && ((s = A), (A = S), (S = s));
                var p = Nf(u, S),
                  h = Nf(u, A);
                if (
                  p &&
                  h &&
                  (m.rangeCount !== 1 ||
                    m.anchorNode !== p.node ||
                    m.anchorOffset !== p.offset ||
                    m.focusNode !== h.node ||
                    m.focusOffset !== h.offset)
                ) {
                  var y = f.createRange();
                  (y.setStart(p.node, p.offset),
                    m.removeAllRanges(),
                    S > A
                      ? (m.addRange(y), m.extend(h.node, h.offset))
                      : (y.setEnd(h.node, h.offset), m.addRange(y)));
                }
              }
            }
          }
          for (f = [], m = u; (m = m.parentNode); )
            m.nodeType === 1 &&
              f.push({ element: m, left: m.scrollLeft, top: m.scrollTop });
          for (
            typeof u.focus == "function" && u.focus(), u = 0;
            u < f.length;
            u++
          ) {
            var v = f[u];
            ((v.element.scrollLeft = v.left), (v.element.scrollTop = v.top));
          }
        }
        ((Ns = !!$o), (Wo = $o = null));
      } finally {
        ((G = i), (X.p = a), (w.T = n));
      }
    }
    ((t.current = e), (gt = 2));
  }
}
function zp() {
  if (gt === 2) {
    gt = 0;
    var t = fn,
      e = Oa,
      n = (e.flags & 8772) !== 0;
    if (e.subtreeFlags & 8772 || n) {
      ((n = w.T), (w.T = null));
      var a = X.p;
      X.p = 2;
      var i = G;
      G |= 4;
      try {
        lp(t, e.alternate, e);
      } finally {
        ((G = i), (X.p = a), (w.T = n));
      }
    }
    gt = 3;
  }
}
function jp() {
  if (gt === 4 || gt === 3) {
    ((gt = 0), mv());
    var t = fn,
      e = Oa,
      n = Ue,
      a = vp;
    e.subtreeFlags & 10256 || e.flags & 10256
      ? (gt = 5)
      : ((gt = 0), (Oa = fn = null), Np(t, t.pendingLanes));
    var i = t.pendingLanes;
    if (
      (i === 0 && (cn = null),
      Rr(n),
      (e = e.stateNode),
      Zt && typeof Zt.onCommitFiberRoot == "function")
    )
      try {
        Zt.onCommitFiberRoot(Pi, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
    if (a !== null) {
      ((e = w.T), (i = X.p), (X.p = 2), (w.T = null));
      try {
        for (var l = t.onRecoverableError, s = 0; s < a.length; s++) {
          var u = a[s];
          l(u.value, { componentStack: u.stack });
        }
      } finally {
        ((w.T = e), (X.p = i));
      }
    }
    (Ue & 3 && au(),
      Ae(t),
      (i = t.pendingLanes),
      n & 261930 && i & 42
        ? t === Jo
          ? Ei++
          : ((Ei = 0), (Jo = t))
        : (Ei = 0),
      il(0));
  }
}
function Np(t, e) {
  (t.pooledCacheLanes &= e) === 0 &&
    ((e = t.pooledCache), e != null && ((t.pooledCache = null), el(e)));
}
function au() {
  return (Cp(), zp(), jp(), Rp());
}
function Rp() {
  if (gt !== 5) return !1;
  var t = fn,
    e = Zo;
  Zo = 0;
  var n = Rr(Ue),
    a = w.T,
    i = X.p;
  try {
    ((X.p = 32 > n ? 32 : n), (w.T = null), (n = ko), (ko = null));
    var l = fn,
      s = Ue;
    if (((gt = 0), (Oa = fn = null), (Ue = 0), G & 6)) throw Error(T(331));
    var u = G;
    if (
      ((G |= 4),
      pp(l.current),
      dp(l, l.current, s, n),
      (G = u),
      il(0, !1),
      Zt && typeof Zt.onPostCommitFiberRoot == "function")
    )
      try {
        Zt.onPostCommitFiberRoot(Pi, l);
      } catch {}
    return !0;
  } finally {
    ((X.p = i), (w.T = a), Np(t, e));
  }
}
function rd(t, e, n) {
  ((e = ue(n, e)),
    (e = Yo(t.stateNode, e, 2)),
    (t = rn(t, e, 2)),
    t !== null && (Wi(t, 2), Ae(t)));
}
function Z(t, e, n) {
  if (t.tag === 3) rd(t, t, n);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        rd(e, t, n);
        break;
      } else if (e.tag === 1) {
        var a = e.stateNode;
        if (
          typeof e.type.getDerivedStateFromError == "function" ||
          (typeof a.componentDidCatch == "function" &&
            (cn === null || !cn.has(a)))
        ) {
          ((t = ue(n, t)),
            (n = Z0(2)),
            (a = rn(e, n, 2)),
            a !== null && (k0(n, a, e, t), Wi(a, 2), Ae(a)));
          break;
        }
      }
      e = e.return;
    }
}
function Yu(t, e, n) {
  var a = t.pingCache;
  if (a === null) {
    a = t.pingCache = new q1();
    var i = new Set();
    a.set(e, i);
  } else ((i = a.get(e)), i === void 0 && ((i = new Set()), a.set(e, i)));
  i.has(n) || ((dc = !0), i.add(n), (t = K1.bind(null, t, e, n)), e.then(t, t));
}
function K1(t, e, n) {
  var a = t.pingCache;
  (a !== null && a.delete(e),
    (t.pingedLanes |= t.suspendedLanes & n),
    (t.warmLanes &= ~n),
    F === t &&
      (q & n) === n &&
      (ot === 4 || (ot === 3 && (q & 62914560) === q && 300 > Kt() - tu)
        ? !(G & 2) && wa(t, 0)
        : (hc |= n),
      _a === q && (_a = 0)),
    Ae(t));
}
function _p(t, e) {
  (e === 0 && (e = Am()), (t = Jn(t, e)), t !== null && (Wi(t, e), Ae(t)));
}
function Z1(t) {
  var e = t.memoizedState,
    n = 0;
  (e !== null && (n = e.retryLane), _p(t, n));
}
function k1(t, e) {
  var n = 0;
  switch (t.tag) {
    case 31:
    case 13:
      var a = t.stateNode,
        i = t.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      a = t.stateNode;
      break;
    case 22:
      a = t.stateNode._retryCache;
      break;
    default:
      throw Error(T(314));
  }
  (a !== null && a.delete(e), _p(t, n));
}
function J1(t, e) {
  return jr(t, e);
}
var As = null,
  ea = null,
  Fo = !1,
  Es = !1,
  Gu = !1,
  ln = 0;
function Ae(t) {
  (t !== ea &&
    t.next === null &&
    (ea === null ? (As = ea = t) : (ea = ea.next = t)),
    (Es = !0),
    Fo || ((Fo = !0), P1()));
}
function il(t, e) {
  if (!Gu && Es) {
    Gu = !0;
    do
      for (var n = !1, a = As; a !== null; ) {
        if (t !== 0) {
          var i = a.pendingLanes;
          if (i === 0) var l = 0;
          else {
            var s = a.suspendedLanes,
              u = a.pingedLanes;
            ((l = (1 << (31 - kt(42 | t) + 1)) - 1),
              (l &= i & ~(s & ~u)),
              (l = l & 201326741 ? (l & 201326741) | 1 : l ? l | 2 : 0));
          }
          l !== 0 && ((n = !0), cd(a, l));
        } else
          ((l = q),
            (l = Xs(
              a,
              a === F ? l : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
            )),
            !(l & 3) || $i(a, l) || ((n = !0), cd(a, l)));
        a = a.next;
      }
    while (n);
    Gu = !1;
  }
}
function F1() {
  Op();
}
function Op() {
  Es = Fo = !1;
  var t = 0;
  ln !== 0 && sb() && (t = ln);
  for (var e = Kt(), n = null, a = As; a !== null; ) {
    var i = a.next,
      l = wp(a, e);
    (l === 0
      ? ((a.next = null),
        n === null ? (As = i) : (n.next = i),
        i === null && (ea = n))
      : ((n = a), (t !== 0 || l & 3) && (Es = !0)),
      (a = i));
  }
  ((gt !== 0 && gt !== 5) || il(t), ln !== 0 && (ln = 0));
}
function wp(t, e) {
  for (
    var n = t.suspendedLanes,
      a = t.pingedLanes,
      i = t.expirationTimes,
      l = t.pendingLanes & -62914561;
    0 < l;
  ) {
    var s = 31 - kt(l),
      u = 1 << s,
      o = i[s];
    (o === -1
      ? (!(u & n) || u & a) && (i[s] = Tv(u, e))
      : o <= e && (t.expiredLanes |= u),
      (l &= ~u));
  }
  if (
    ((e = F),
    (n = q),
    (n = Xs(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
    )),
    (a = t.callbackNode),
    n === 0 ||
      (t === e && (K === 2 || K === 9)) ||
      t.cancelPendingCommit !== null)
  )
    return (
      a !== null && a !== null && yu(a),
      (t.callbackNode = null),
      (t.callbackPriority = 0)
    );
  if (!(n & 3) || $i(t, n)) {
    if (((e = n & -n), e === t.callbackPriority)) return e;
    switch ((a !== null && yu(a), Rr(n))) {
      case 2:
      case 8:
        n = xm;
        break;
      case 32:
        n = ss;
        break;
      case 268435456:
        n = Tm;
        break;
      default:
        n = ss;
    }
    return (
      (a = Vp.bind(null, t)),
      (n = jr(n, a)),
      (t.callbackPriority = e),
      (t.callbackNode = n),
      e
    );
  }
  return (
    a !== null && a !== null && yu(a),
    (t.callbackPriority = 2),
    (t.callbackNode = null),
    2
  );
}
function Vp(t, e) {
  if (gt !== 0 && gt !== 5)
    return ((t.callbackNode = null), (t.callbackPriority = 0), null);
  var n = t.callbackNode;
  if (au() && t.callbackNode !== n) return null;
  var a = q;
  return (
    (a = Xs(
      t,
      t === F ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
    )),
    a === 0
      ? null
      : (Sp(t, a, e),
        wp(t, Kt()),
        t.callbackNode != null && t.callbackNode === n
          ? Vp.bind(null, t)
          : null)
  );
}
function cd(t, e) {
  if (au()) return null;
  Sp(t, e, !0);
}
function P1() {
  ob(function () {
    G & 6 ? jr(Sm, F1) : Op();
  });
}
function pc() {
  if (ln === 0) {
    var t = ja;
    (t === 0 && ((t = Sl), (Sl <<= 1), !(Sl & 261888) && (Sl = 256)), (ln = t));
  }
  return ln;
}
function fd(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean"
    ? null
    : typeof t == "function"
      ? t
      : ql("" + t);
}
function dd(t, e) {
  var n = e.ownerDocument.createElement("input");
  return (
    (n.name = e.name),
    (n.value = e.value),
    t.id && n.setAttribute("form", t.id),
    e.parentNode.insertBefore(n, e),
    (t = new FormData(t)),
    n.parentNode.removeChild(n),
    t
  );
}
function $1(t, e, n, a, i) {
  if (e === "submit" && n && n.stateNode === i) {
    var l = fd((i[Ht] || null).action),
      s = a.submitter;
    s &&
      ((e = (e = s[Ht] || null)
        ? fd(e.formAction)
        : s.getAttribute("formAction")),
      e !== null && ((l = e), (s = null)));
    var u = new Qs("action", "action", null, a, i);
    t.push({
      event: u,
      listeners: [
        {
          instance: null,
          listener: function () {
            if (a.defaultPrevented) {
              if (ln !== 0) {
                var o = s ? dd(i, s) : new FormData(i);
                Ho(
                  n,
                  { pending: !0, data: o, method: i.method, action: l },
                  null,
                  o,
                );
              }
            } else
              typeof l == "function" &&
                (u.preventDefault(),
                (o = s ? dd(i, s) : new FormData(i)),
                Ho(
                  n,
                  { pending: !0, data: o, method: i.method, action: l },
                  l,
                  o,
                ));
          },
          currentTarget: i,
        },
      ],
    });
  }
}
for (var Xu = 0; Xu < Co.length; Xu++) {
  var Qu = Co[Xu],
    W1 = Qu.toLowerCase(),
    I1 = Qu[0].toUpperCase() + Qu.slice(1);
  pe(W1, "on" + I1);
}
pe(km, "onAnimationEnd");
pe(Jm, "onAnimationIteration");
pe(Fm, "onAnimationStart");
pe("dblclick", "onDoubleClick");
pe("focusin", "onFocus");
pe("focusout", "onBlur");
pe(p1, "onTransitionRun");
pe(y1, "onTransitionStart");
pe(g1, "onTransitionCancel");
pe(Pm, "onTransitionEnd");
Ca("onMouseEnter", ["mouseout", "mouseover"]);
Ca("onMouseLeave", ["mouseout", "mouseover"]);
Ca("onPointerEnter", ["pointerout", "pointerover"]);
Ca("onPointerLeave", ["pointerout", "pointerover"]);
Kn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Kn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Kn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Kn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Kn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Kn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Hi =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  tb = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle"
      .split(" ")
      .concat(Hi),
  );
function Up(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var a = t[n],
      i = a.event;
    a = a.listeners;
    t: {
      var l = void 0;
      if (e)
        for (var s = a.length - 1; 0 <= s; s--) {
          var u = a[s],
            o = u.instance,
            r = u.currentTarget;
          if (((u = u.listener), o !== l && i.isPropagationStopped())) break t;
          ((l = u), (i.currentTarget = r));
          try {
            l(i);
          } catch (c) {
            os(c);
          }
          ((i.currentTarget = null), (l = o));
        }
      else
        for (s = 0; s < a.length; s++) {
          if (
            ((u = a[s]),
            (o = u.instance),
            (r = u.currentTarget),
            (u = u.listener),
            o !== l && i.isPropagationStopped())
          )
            break t;
          ((l = u), (i.currentTarget = r));
          try {
            l(i);
          } catch (c) {
            os(c);
          }
          ((i.currentTarget = null), (l = o));
        }
    }
  }
}
function L(t, e) {
  var n = e[bo];
  n === void 0 && (n = e[bo] = new Set());
  var a = t + "__bubble";
  n.has(a) || (Bp(e, t, 2, !1), n.add(a));
}
function Ku(t, e, n) {
  var a = 0;
  (e && (a |= 4), Bp(n, t, a, e));
}
var Nl = "_reactListening" + Math.random().toString(36).slice(2);
function yc(t) {
  if (!t[Nl]) {
    ((t[Nl] = !0),
      zm.forEach(function (n) {
        n !== "selectionchange" && (tb.has(n) || Ku(n, !1, t), Ku(n, !0, t));
      }));
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Nl] || ((e[Nl] = !0), Ku("selectionchange", !1, e));
  }
}
function Bp(t, e, n, a) {
  switch (Pp(e)) {
    case 2:
      var i = zb;
      break;
    case 8:
      i = jb;
      break;
    default:
      i = Sc;
  }
  ((n = i.bind(null, e, n, t)),
    (i = void 0),
    !Eo ||
      (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
      (i = !0),
    a
      ? i !== void 0
        ? t.addEventListener(e, n, { capture: !0, passive: i })
        : t.addEventListener(e, n, !0)
      : i !== void 0
        ? t.addEventListener(e, n, { passive: i })
        : t.addEventListener(e, n, !1));
}
function Zu(t, e, n, a, i) {
  var l = a;
  if (!(e & 1) && !(e & 2) && a !== null)
    t: for (;;) {
      if (a === null) return;
      var s = a.tag;
      if (s === 3 || s === 4) {
        var u = a.stateNode.containerInfo;
        if (u === i) break;
        if (s === 4)
          for (s = a.return; s !== null; ) {
            var o = s.tag;
            if ((o === 3 || o === 4) && s.stateNode.containerInfo === i) return;
            s = s.return;
          }
        for (; u !== null; ) {
          if (((s = ia(u)), s === null)) return;
          if (((o = s.tag), o === 5 || o === 6 || o === 26 || o === 27)) {
            a = l = s;
            continue t;
          }
          u = u.parentNode;
        }
      }
      a = a.return;
    }
  Um(function () {
    var r = l,
      c = wr(n),
      f = [];
    t: {
      var d = $m.get(t);
      if (d !== void 0) {
        var m = Qs,
          b = t;
        switch (t) {
          case "keypress":
            if (Gl(n) === 0) break t;
          case "keydown":
          case "keyup":
            m = kv;
            break;
          case "focusin":
            ((b = "focus"), (m = xu));
            break;
          case "focusout":
            ((b = "blur"), (m = xu));
            break;
          case "beforeblur":
          case "afterblur":
            m = xu;
            break;
          case "click":
            if (n.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = Sf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = Vv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Pv;
            break;
          case km:
          case Jm:
          case Fm:
            m = Lv;
            break;
          case Pm:
            m = Wv;
            break;
          case "scroll":
          case "scrollend":
            m = Ov;
            break;
          case "wheel":
            m = t1;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = qv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = Tf;
            break;
          case "toggle":
          case "beforetoggle":
            m = n1;
        }
        var S = (e & 4) !== 0,
          A = !S && (t === "scroll" || t === "scrollend"),
          p = S ? (d !== null ? d + "Capture" : null) : d;
        S = [];
        for (var h = r, y; h !== null; ) {
          var v = h;
          if (
            ((y = v.stateNode),
            (v = v.tag),
            (v !== 5 && v !== 26 && v !== 27) ||
              y === null ||
              p === null ||
              ((v = Ri(h, p)), v != null && S.push(qi(h, v, y))),
            A)
          )
            break;
          h = h.return;
        }
        0 < S.length &&
          ((d = new m(d, b, null, n, c)), f.push({ event: d, listeners: S }));
      }
    }
    if (!(e & 7)) {
      t: {
        if (
          ((d = t === "mouseover" || t === "pointerover"),
          (m = t === "mouseout" || t === "pointerout"),
          d &&
            n !== Ao &&
            (b = n.relatedTarget || n.fromElement) &&
            (ia(b) || b[Ya]))
        )
          break t;
        if (
          (m || d) &&
          ((d =
            c.window === c
              ? c
              : (d = c.ownerDocument)
                ? d.defaultView || d.parentWindow
                : window),
          m
            ? ((b = n.relatedTarget || n.toElement),
              (m = r),
              (b = b ? ia(b) : null),
              b !== null &&
                ((A = Fi(b)),
                (S = b.tag),
                b !== A || (S !== 5 && S !== 27 && S !== 6)) &&
                (b = null))
            : ((m = null), (b = r)),
          m !== b)
        ) {
          if (
            ((S = Sf),
            (v = "onMouseLeave"),
            (p = "onMouseEnter"),
            (h = "mouse"),
            (t === "pointerout" || t === "pointerover") &&
              ((S = Tf),
              (v = "onPointerLeave"),
              (p = "onPointerEnter"),
              (h = "pointer")),
            (A = m == null ? d : si(m)),
            (y = b == null ? d : si(b)),
            (d = new S(v, h + "leave", m, n, c)),
            (d.target = A),
            (d.relatedTarget = y),
            (v = null),
            ia(c) === r &&
              ((S = new S(p, h + "enter", b, n, c)),
              (S.target = y),
              (S.relatedTarget = A),
              (v = S)),
            (A = v),
            m && b)
          )
            e: {
              for (S = eb, p = m, h = b, y = 0, v = p; v; v = S(v)) y++;
              v = 0;
              for (var x = h; x; x = S(x)) v++;
              for (; 0 < y - v; ) ((p = S(p)), y--);
              for (; 0 < v - y; ) ((h = S(h)), v--);
              for (; y--; ) {
                if (p === h || (h !== null && p === h.alternate)) {
                  S = p;
                  break e;
                }
                ((p = S(p)), (h = S(h)));
              }
              S = null;
            }
          else S = null;
          (m !== null && hd(f, d, m, S, !1),
            b !== null && A !== null && hd(f, A, b, S, !0));
        }
      }
      t: {
        if (
          ((d = r ? si(r) : window),
          (m = d.nodeName && d.nodeName.toLowerCase()),
          m === "select" || (m === "input" && d.type === "file"))
        )
          var C = Df;
        else if (Mf(d))
          if (Gm) C = d1;
          else {
            C = c1;
            var E = r1;
          }
        else
          ((m = d.nodeName),
            !m ||
            m.toLowerCase() !== "input" ||
            (d.type !== "checkbox" && d.type !== "radio")
              ? r && Or(r.elementType) && (C = Df)
              : (C = f1));
        if (C && (C = C(t, r))) {
          Ym(f, C, n, c);
          break t;
        }
        (E && E(t, d, r),
          t === "focusout" &&
            r &&
            d.type === "number" &&
            r.memoizedProps.value != null &&
            To(d, "number", d.value));
      }
      switch (((E = r ? si(r) : window), t)) {
        case "focusin":
          (Mf(E) || E.contentEditable === "true") &&
            ((ua = E), (Mo = r), (pi = null));
          break;
        case "focusout":
          pi = Mo = ua = null;
          break;
        case "mousedown":
          Do = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Do = !1), Rf(f, n, c));
          break;
        case "selectionchange":
          if (m1) break;
        case "keydown":
        case "keyup":
          Rf(f, n, c);
      }
      var D;
      if (Br)
        t: {
          switch (t) {
            case "compositionstart":
              var N = "onCompositionStart";
              break t;
            case "compositionend":
              N = "onCompositionEnd";
              break t;
            case "compositionupdate":
              N = "onCompositionUpdate";
              break t;
          }
          N = void 0;
        }
      else
        sa
          ? Hm(t, n) && (N = "onCompositionEnd")
          : t === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      (N &&
        (Lm &&
          n.locale !== "ko" &&
          (sa || N !== "onCompositionStart"
            ? N === "onCompositionEnd" && sa && (D = Bm())
            : ((en = c),
              (Vr = "value" in en ? en.value : en.textContent),
              (sa = !0))),
        (E = Ms(r, N)),
        0 < E.length &&
          ((N = new xf(N, t, null, n, c)),
          f.push({ event: N, listeners: E }),
          D ? (N.data = D) : ((D = qm(n)), D !== null && (N.data = D)))),
        (D = i1 ? l1(t, n) : s1(t, n)) &&
          ((N = Ms(r, "onBeforeInput")),
          0 < N.length &&
            ((E = new xf("onBeforeInput", "beforeinput", null, n, c)),
            f.push({ event: E, listeners: N }),
            (E.data = D))),
        $1(f, t, r, n, c));
    }
    Up(f, e);
  });
}
function qi(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function Ms(t, e) {
  for (var n = e + "Capture", a = []; t !== null; ) {
    var i = t,
      l = i.stateNode;
    if (
      ((i = i.tag),
      (i !== 5 && i !== 26 && i !== 27) ||
        l === null ||
        ((i = Ri(t, n)),
        i != null && a.unshift(qi(t, i, l)),
        (i = Ri(t, e)),
        i != null && a.push(qi(t, i, l))),
      t.tag === 3)
    )
      return a;
    t = t.return;
  }
  return [];
}
function eb(t) {
  if (t === null) return null;
  do t = t.return;
  while (t && t.tag !== 5 && t.tag !== 27);
  return t || null;
}
function hd(t, e, n, a, i) {
  for (var l = e._reactName, s = []; n !== null && n !== a; ) {
    var u = n,
      o = u.alternate,
      r = u.stateNode;
    if (((u = u.tag), o !== null && o === a)) break;
    ((u !== 5 && u !== 26 && u !== 27) ||
      r === null ||
      ((o = r),
      i
        ? ((r = Ri(n, l)), r != null && s.unshift(qi(n, r, o)))
        : i || ((r = Ri(n, l)), r != null && s.push(qi(n, r, o)))),
      (n = n.return));
  }
  s.length !== 0 && t.push({ event: e, listeners: s });
}
var nb = /\r\n?/g,
  ab = /\u0000|\uFFFD/g;
function md(t) {
  return (typeof t == "string" ? t : "" + t)
    .replace(
      nb,
      `
`,
    )
    .replace(ab, "");
}
function Lp(t, e) {
  return ((e = md(e)), md(t) === e);
}
function k(t, e, n, a, i, l) {
  switch (n) {
    case "children":
      typeof a == "string"
        ? e === "body" || (e === "textarea" && a === "") || za(t, a)
        : (typeof a == "number" || typeof a == "bigint") &&
          e !== "body" &&
          za(t, "" + a);
      break;
    case "className":
      Al(t, "class", a);
      break;
    case "tabIndex":
      Al(t, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      Al(t, n, a);
      break;
    case "style":
      Vm(t, a, l);
      break;
    case "data":
      if (e !== "object") {
        Al(t, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (e !== "a" || n !== "href")) {
        t.removeAttribute(n);
        break;
      }
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "symbol" ||
        typeof a == "boolean"
      ) {
        t.removeAttribute(n);
        break;
      }
      ((a = ql("" + a)), t.setAttribute(n, a));
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        t.setAttribute(
          n,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      } else
        typeof l == "function" &&
          (n === "formAction"
            ? (e !== "input" && k(t, e, "name", i.name, i, null),
              k(t, e, "formEncType", i.formEncType, i, null),
              k(t, e, "formMethod", i.formMethod, i, null),
              k(t, e, "formTarget", i.formTarget, i, null))
            : (k(t, e, "encType", i.encType, i, null),
              k(t, e, "method", i.method, i, null),
              k(t, e, "target", i.target, i, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        t.removeAttribute(n);
        break;
      }
      ((a = ql("" + a)), t.setAttribute(n, a));
      break;
    case "onClick":
      a != null && (t.onclick = _e);
      break;
    case "onScroll":
      a != null && L("scroll", t);
      break;
    case "onScrollEnd":
      a != null && L("scrollend", t);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(T(61));
        if (((n = a.__html), n != null)) {
          if (i.children != null) throw Error(T(60));
          t.innerHTML = n;
        }
      }
      break;
    case "multiple":
      t.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      t.muted = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "boolean" ||
        typeof a == "symbol"
      ) {
        t.removeAttribute("xlink:href");
        break;
      }
      ((n = ql("" + a)),
        t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol"
        ? t.setAttribute(n, "" + a)
        : t.removeAttribute(n);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      a && typeof a != "function" && typeof a != "symbol"
        ? t.setAttribute(n, "")
        : t.removeAttribute(n);
      break;
    case "capture":
    case "download":
      a === !0
        ? t.setAttribute(n, "")
        : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? t.setAttribute(n, a)
          : t.removeAttribute(n);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null &&
      typeof a != "function" &&
      typeof a != "symbol" &&
      !isNaN(a) &&
      1 <= a
        ? t.setAttribute(n, a)
        : t.removeAttribute(n);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
        ? t.removeAttribute(n)
        : t.setAttribute(n, a);
      break;
    case "popover":
      (L("beforetoggle", t), L("toggle", t), Hl(t, "popover", a));
      break;
    case "xlinkActuate":
      Ee(t, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
      break;
    case "xlinkArcrole":
      Ee(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
      break;
    case "xlinkRole":
      Ee(t, "http://www.w3.org/1999/xlink", "xlink:role", a);
      break;
    case "xlinkShow":
      Ee(t, "http://www.w3.org/1999/xlink", "xlink:show", a);
      break;
    case "xlinkTitle":
      Ee(t, "http://www.w3.org/1999/xlink", "xlink:title", a);
      break;
    case "xlinkType":
      Ee(t, "http://www.w3.org/1999/xlink", "xlink:type", a);
      break;
    case "xmlBase":
      Ee(t, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
      break;
    case "xmlLang":
      Ee(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
      break;
    case "xmlSpace":
      Ee(t, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
      break;
    case "is":
      Hl(t, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < n.length) ||
        (n[0] !== "o" && n[0] !== "O") ||
        (n[1] !== "n" && n[1] !== "N")) &&
        ((n = Rv.get(n) || n), Hl(t, n, a));
  }
}
function Po(t, e, n, a, i, l) {
  switch (n) {
    case "style":
      Vm(t, a, l);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(T(61));
        if (((n = a.__html), n != null)) {
          if (i.children != null) throw Error(T(60));
          t.innerHTML = n;
        }
      }
      break;
    case "children":
      typeof a == "string"
        ? za(t, a)
        : (typeof a == "number" || typeof a == "bigint") && za(t, "" + a);
      break;
    case "onScroll":
      a != null && L("scroll", t);
      break;
    case "onScrollEnd":
      a != null && L("scrollend", t);
      break;
    case "onClick":
      a != null && (t.onclick = _e);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!jm.hasOwnProperty(n))
        t: {
          if (
            n[0] === "o" &&
            n[1] === "n" &&
            ((i = n.endsWith("Capture")),
            (e = n.slice(2, i ? n.length - 7 : void 0)),
            (l = t[Ht] || null),
            (l = l != null ? l[n] : null),
            typeof l == "function" && t.removeEventListener(e, l, i),
            typeof a == "function")
          ) {
            (typeof l != "function" &&
              l !== null &&
              (n in t
                ? (t[n] = null)
                : t.hasAttribute(n) && t.removeAttribute(n)),
              t.addEventListener(e, a, i));
            break t;
          }
          n in t ? (t[n] = a) : a === !0 ? t.setAttribute(n, "") : Hl(t, n, a);
        }
  }
}
function zt(t, e, n) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      (L("error", t), L("load", t));
      var a = !1,
        i = !1,
        l;
      for (l in n)
        if (n.hasOwnProperty(l)) {
          var s = n[l];
          if (s != null)
            switch (l) {
              case "src":
                a = !0;
                break;
              case "srcSet":
                i = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(T(137, e));
              default:
                k(t, e, l, s, n, null);
            }
        }
      (i && k(t, e, "srcSet", n.srcSet, n, null),
        a && k(t, e, "src", n.src, n, null));
      return;
    case "input":
      L("invalid", t);
      var u = (l = s = i = null),
        o = null,
        r = null;
      for (a in n)
        if (n.hasOwnProperty(a)) {
          var c = n[a];
          if (c != null)
            switch (a) {
              case "name":
                i = c;
                break;
              case "type":
                s = c;
                break;
              case "checked":
                o = c;
                break;
              case "defaultChecked":
                r = c;
                break;
              case "value":
                l = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(T(137, e));
                break;
              default:
                k(t, e, a, c, n, null);
            }
        }
      _m(t, l, u, o, r, s, i, !1);
      return;
    case "select":
      (L("invalid", t), (a = s = l = null));
      for (i in n)
        if (n.hasOwnProperty(i) && ((u = n[i]), u != null))
          switch (i) {
            case "value":
              l = u;
              break;
            case "defaultValue":
              s = u;
              break;
            case "multiple":
              a = u;
            default:
              k(t, e, i, u, n, null);
          }
      ((e = l),
        (n = s),
        (t.multiple = !!a),
        e != null ? Sa(t, !!a, e, !1) : n != null && Sa(t, !!a, n, !0));
      return;
    case "textarea":
      (L("invalid", t), (l = i = a = null));
      for (s in n)
        if (n.hasOwnProperty(s) && ((u = n[s]), u != null))
          switch (s) {
            case "value":
              a = u;
              break;
            case "defaultValue":
              i = u;
              break;
            case "children":
              l = u;
              break;
            case "dangerouslySetInnerHTML":
              if (u != null) throw Error(T(91));
              break;
            default:
              k(t, e, s, u, n, null);
          }
      wm(t, a, i, l);
      return;
    case "option":
      for (o in n)
        if (n.hasOwnProperty(o) && ((a = n[o]), a != null))
          switch (o) {
            case "selected":
              t.selected = a && typeof a != "function" && typeof a != "symbol";
              break;
            default:
              k(t, e, o, a, n, null);
          }
      return;
    case "dialog":
      (L("beforetoggle", t), L("toggle", t), L("cancel", t), L("close", t));
      break;
    case "iframe":
    case "object":
      L("load", t);
      break;
    case "video":
    case "audio":
      for (a = 0; a < Hi.length; a++) L(Hi[a], t);
      break;
    case "image":
      (L("error", t), L("load", t));
      break;
    case "details":
      L("toggle", t);
      break;
    case "embed":
    case "source":
    case "link":
      (L("error", t), L("load", t));
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (r in n)
        if (n.hasOwnProperty(r) && ((a = n[r]), a != null))
          switch (r) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(T(137, e));
            default:
              k(t, e, r, a, n, null);
          }
      return;
    default:
      if (Or(e)) {
        for (c in n)
          n.hasOwnProperty(c) &&
            ((a = n[c]), a !== void 0 && Po(t, e, c, a, n, void 0));
        return;
      }
  }
  for (u in n)
    n.hasOwnProperty(u) && ((a = n[u]), a != null && k(t, e, u, a, n, null));
}
function ib(t, e, n, a) {
  switch (e) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var i = null,
        l = null,
        s = null,
        u = null,
        o = null,
        r = null,
        c = null;
      for (m in n) {
        var f = n[m];
        if (n.hasOwnProperty(m) && f != null)
          switch (m) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              o = f;
            default:
              a.hasOwnProperty(m) || k(t, e, m, null, a, f);
          }
      }
      for (var d in a) {
        var m = a[d];
        if (((f = n[d]), a.hasOwnProperty(d) && (m != null || f != null)))
          switch (d) {
            case "type":
              l = m;
              break;
            case "name":
              i = m;
              break;
            case "checked":
              r = m;
              break;
            case "defaultChecked":
              c = m;
              break;
            case "value":
              s = m;
              break;
            case "defaultValue":
              u = m;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (m != null) throw Error(T(137, e));
              break;
            default:
              m !== f && k(t, e, d, m, a, f);
          }
      }
      xo(t, s, u, o, r, c, l, i);
      return;
    case "select":
      m = s = u = d = null;
      for (l in n)
        if (((o = n[l]), n.hasOwnProperty(l) && o != null))
          switch (l) {
            case "value":
              break;
            case "multiple":
              m = o;
            default:
              a.hasOwnProperty(l) || k(t, e, l, null, a, o);
          }
      for (i in a)
        if (
          ((l = a[i]),
          (o = n[i]),
          a.hasOwnProperty(i) && (l != null || o != null))
        )
          switch (i) {
            case "value":
              d = l;
              break;
            case "defaultValue":
              u = l;
              break;
            case "multiple":
              s = l;
            default:
              l !== o && k(t, e, i, l, a, o);
          }
      ((e = u),
        (n = s),
        (a = m),
        d != null
          ? Sa(t, !!n, d, !1)
          : !!a != !!n &&
            (e != null ? Sa(t, !!n, e, !0) : Sa(t, !!n, n ? [] : "", !1)));
      return;
    case "textarea":
      m = d = null;
      for (u in n)
        if (
          ((i = n[u]), n.hasOwnProperty(u) && i != null && !a.hasOwnProperty(u))
        )
          switch (u) {
            case "value":
              break;
            case "children":
              break;
            default:
              k(t, e, u, null, a, i);
          }
      for (s in a)
        if (
          ((i = a[s]),
          (l = n[s]),
          a.hasOwnProperty(s) && (i != null || l != null))
        )
          switch (s) {
            case "value":
              d = i;
              break;
            case "defaultValue":
              m = i;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (i != null) throw Error(T(91));
              break;
            default:
              i !== l && k(t, e, s, i, a, l);
          }
      Om(t, d, m);
      return;
    case "option":
      for (var b in n)
        if (
          ((d = n[b]), n.hasOwnProperty(b) && d != null && !a.hasOwnProperty(b))
        )
          switch (b) {
            case "selected":
              t.selected = !1;
              break;
            default:
              k(t, e, b, null, a, d);
          }
      for (o in a)
        if (
          ((d = a[o]),
          (m = n[o]),
          a.hasOwnProperty(o) && d !== m && (d != null || m != null))
        )
          switch (o) {
            case "selected":
              t.selected = d && typeof d != "function" && typeof d != "symbol";
              break;
            default:
              k(t, e, o, d, a, m);
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var S in n)
        ((d = n[S]),
          n.hasOwnProperty(S) &&
            d != null &&
            !a.hasOwnProperty(S) &&
            k(t, e, S, null, a, d));
      for (r in a)
        if (
          ((d = a[r]),
          (m = n[r]),
          a.hasOwnProperty(r) && d !== m && (d != null || m != null))
        )
          switch (r) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (d != null) throw Error(T(137, e));
              break;
            default:
              k(t, e, r, d, a, m);
          }
      return;
    default:
      if (Or(e)) {
        for (var A in n)
          ((d = n[A]),
            n.hasOwnProperty(A) &&
              d !== void 0 &&
              !a.hasOwnProperty(A) &&
              Po(t, e, A, void 0, a, d));
        for (c in a)
          ((d = a[c]),
            (m = n[c]),
            !a.hasOwnProperty(c) ||
              d === m ||
              (d === void 0 && m === void 0) ||
              Po(t, e, c, d, a, m));
        return;
      }
  }
  for (var p in n)
    ((d = n[p]),
      n.hasOwnProperty(p) &&
        d != null &&
        !a.hasOwnProperty(p) &&
        k(t, e, p, null, a, d));
  for (f in a)
    ((d = a[f]),
      (m = n[f]),
      !a.hasOwnProperty(f) ||
        d === m ||
        (d == null && m == null) ||
        k(t, e, f, d, a, m));
}
function pd(t) {
  switch (t) {
    case "css":
    case "script":
    case "font":
    case "img":
    case "image":
    case "input":
    case "link":
      return !0;
    default:
      return !1;
  }
}
function lb() {
  if (typeof performance.getEntriesByType == "function") {
    for (
      var t = 0, e = 0, n = performance.getEntriesByType("resource"), a = 0;
      a < n.length;
      a++
    ) {
      var i = n[a],
        l = i.transferSize,
        s = i.initiatorType,
        u = i.duration;
      if (l && u && pd(s)) {
        for (s = 0, u = i.responseEnd, a += 1; a < n.length; a++) {
          var o = n[a],
            r = o.startTime;
          if (r > u) break;
          var c = o.transferSize,
            f = o.initiatorType;
          c &&
            pd(f) &&
            ((o = o.responseEnd), (s += c * (o < u ? 1 : (u - r) / (o - r))));
        }
        if ((--a, (e += (8 * (l + s)) / (i.duration / 1e3)), t++, 10 < t))
          break;
      }
    }
    if (0 < t) return e / t / 1e6;
  }
  return navigator.connection &&
    ((t = navigator.connection.downlink), typeof t == "number")
    ? t
    : 5;
}
var $o = null,
  Wo = null;
function Ds(t) {
  return t.nodeType === 9 ? t : t.ownerDocument;
}
function yd(t) {
  switch (t) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function Hp(t, e) {
  if (t === 0)
    switch (e) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return t === 1 && e === "foreignObject" ? 0 : t;
}
function Io(t, e) {
  return (
    t === "textarea" ||
    t === "noscript" ||
    typeof e.children == "string" ||
    typeof e.children == "number" ||
    typeof e.children == "bigint" ||
    (typeof e.dangerouslySetInnerHTML == "object" &&
      e.dangerouslySetInnerHTML !== null &&
      e.dangerouslySetInnerHTML.__html != null)
  );
}
var ku = null;
function sb() {
  var t = window.event;
  return t && t.type === "popstate"
    ? t === ku
      ? !1
      : ((ku = t), !0)
    : ((ku = null), !1);
}
var qp = typeof setTimeout == "function" ? setTimeout : void 0,
  ub = typeof clearTimeout == "function" ? clearTimeout : void 0,
  gd = typeof Promise == "function" ? Promise : void 0,
  ob =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof gd < "u"
        ? function (t) {
            return gd.resolve(null).then(t).catch(rb);
          }
        : qp;
function rb(t) {
  setTimeout(function () {
    throw t;
  });
}
function Tn(t) {
  return t === "head";
}
function vd(t, e) {
  var n = e,
    a = 0;
  do {
    var i = n.nextSibling;
    if ((t.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$" || n === "/&")) {
        if (a === 0) {
          (t.removeChild(i), Ua(e));
          return;
        }
        a--;
      } else if (
        n === "$" ||
        n === "$?" ||
        n === "$~" ||
        n === "$!" ||
        n === "&"
      )
        a++;
      else if (n === "html") Mi(t.ownerDocument.documentElement);
      else if (n === "head") {
        ((n = t.ownerDocument.head), Mi(n));
        for (var l = n.firstChild; l; ) {
          var s = l.nextSibling,
            u = l.nodeName;
          (l[Ii] ||
            u === "SCRIPT" ||
            u === "STYLE" ||
            (u === "LINK" && l.rel.toLowerCase() === "stylesheet") ||
            n.removeChild(l),
            (l = s));
        }
      } else n === "body" && Mi(t.ownerDocument.body);
    n = i;
  } while (n);
  Ua(e);
}
function bd(t, e) {
  var n = t;
  t = 0;
  do {
    var a = n.nextSibling;
    if (
      (n.nodeType === 1
        ? e
          ? ((n._stashedDisplay = n.style.display), (n.style.display = "none"))
          : ((n.style.display = n._stashedDisplay || ""),
            n.getAttribute("style") === "" && n.removeAttribute("style"))
        : n.nodeType === 3 &&
          (e
            ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
            : (n.nodeValue = n._stashedText || "")),
      a && a.nodeType === 8)
    )
      if (((n = a.data), n === "/$")) {
        if (t === 0) break;
        t--;
      } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || t++;
    n = a;
  } while (n);
}
function tr(t) {
  var e = t.firstChild;
  for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
    var n = e;
    switch (((e = e.nextSibling), n.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        (tr(n), _r(n));
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (n.rel.toLowerCase() === "stylesheet") continue;
    }
    t.removeChild(n);
  }
}
function cb(t, e, n, a) {
  for (; t.nodeType === 1; ) {
    var i = n;
    if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
      if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
    } else if (a) {
      if (!t[Ii])
        switch (e) {
          case "meta":
            if (!t.hasAttribute("itemprop")) break;
            return t;
          case "link":
            if (
              ((l = t.getAttribute("rel")),
              l === "stylesheet" && t.hasAttribute("data-precedence"))
            )
              break;
            if (
              l !== i.rel ||
              t.getAttribute("href") !==
                (i.href == null || i.href === "" ? null : i.href) ||
              t.getAttribute("crossorigin") !==
                (i.crossOrigin == null ? null : i.crossOrigin) ||
              t.getAttribute("title") !== (i.title == null ? null : i.title)
            )
              break;
            return t;
          case "style":
            if (t.hasAttribute("data-precedence")) break;
            return t;
          case "script":
            if (
              ((l = t.getAttribute("src")),
              (l !== (i.src == null ? null : i.src) ||
                t.getAttribute("type") !== (i.type == null ? null : i.type) ||
                t.getAttribute("crossorigin") !==
                  (i.crossOrigin == null ? null : i.crossOrigin)) &&
                l &&
                t.hasAttribute("async") &&
                !t.hasAttribute("itemprop"))
            )
              break;
            return t;
          default:
            return t;
        }
    } else if (e === "input" && t.type === "hidden") {
      var l = i.name == null ? null : "" + i.name;
      if (i.type === "hidden" && t.getAttribute("name") === l) return t;
    } else return t;
    if (((t = ce(t.nextSibling)), t === null)) break;
  }
  return null;
}
function fb(t, e, n) {
  if (e === "") return null;
  for (; t.nodeType !== 3; )
    if (
      ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
        !n) ||
      ((t = ce(t.nextSibling)), t === null)
    )
      return null;
  return t;
}
function Yp(t, e) {
  for (; t.nodeType !== 8; )
    if (
      ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
        !e) ||
      ((t = ce(t.nextSibling)), t === null)
    )
      return null;
  return t;
}
function er(t) {
  return t.data === "$?" || t.data === "$~";
}
function nr(t) {
  return (
    t.data === "$!" ||
    (t.data === "$?" && t.ownerDocument.readyState !== "loading")
  );
}
function db(t, e) {
  var n = t.ownerDocument;
  if (t.data === "$~") t._reactRetry = e;
  else if (t.data !== "$?" || n.readyState !== "loading") e();
  else {
    var a = function () {
      (e(), n.removeEventListener("DOMContentLoaded", a));
    };
    (n.addEventListener("DOMContentLoaded", a), (t._reactRetry = a));
  }
}
function ce(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (
        ((e = t.data),
        e === "$" ||
          e === "$!" ||
          e === "$?" ||
          e === "$~" ||
          e === "&" ||
          e === "F!" ||
          e === "F")
      )
        break;
      if (e === "/$" || e === "/&") return null;
    }
  }
  return t;
}
var ar = null;
function Sd(t) {
  t = t.nextSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "/$" || n === "/&") {
        if (e === 0) return ce(t.nextSibling);
        e--;
      } else
        (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
          e++;
    }
    t = t.nextSibling;
  }
  return null;
}
function xd(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
        if (e === 0) return t;
        e--;
      } else (n !== "/$" && n !== "/&") || e++;
    }
    t = t.previousSibling;
  }
  return null;
}
function Gp(t, e, n) {
  switch (((e = Ds(n)), t)) {
    case "html":
      if (((t = e.documentElement), !t)) throw Error(T(452));
      return t;
    case "head":
      if (((t = e.head), !t)) throw Error(T(453));
      return t;
    case "body":
      if (((t = e.body), !t)) throw Error(T(454));
      return t;
    default:
      throw Error(T(451));
  }
}
function Mi(t) {
  for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
  _r(t);
}
var fe = new Map(),
  Td = new Set();
function Cs(t) {
  return typeof t.getRootNode == "function"
    ? t.getRootNode()
    : t.nodeType === 9
      ? t
      : t.ownerDocument;
}
var Ke = X.d;
X.d = { f: hb, r: mb, D: pb, C: yb, L: gb, m: vb, X: Sb, S: bb, M: xb };
function hb() {
  var t = Ke.f(),
    e = eu();
  return t || e;
}
function mb(t) {
  var e = Ga(t);
  e !== null && e.tag === 5 && e.type === "form" ? V0(e) : Ke.r(t);
}
var Za = typeof document > "u" ? null : document;
function Xp(t, e, n) {
  var a = Za;
  if (a && typeof e == "string" && e) {
    var i = se(e);
    ((i = 'link[rel="' + t + '"][href="' + i + '"]'),
      typeof n == "string" && (i += '[crossorigin="' + n + '"]'),
      Td.has(i) ||
        (Td.add(i),
        (t = { rel: t, crossOrigin: n, href: e }),
        a.querySelector(i) === null &&
          ((e = a.createElement("link")),
          zt(e, "link", t),
          St(e),
          a.head.appendChild(e))));
  }
}
function pb(t) {
  (Ke.D(t), Xp("dns-prefetch", t, null));
}
function yb(t, e) {
  (Ke.C(t, e), Xp("preconnect", t, e));
}
function gb(t, e, n) {
  Ke.L(t, e, n);
  var a = Za;
  if (a && t && e) {
    var i = 'link[rel="preload"][as="' + se(e) + '"]';
    e === "image" && n && n.imageSrcSet
      ? ((i += '[imagesrcset="' + se(n.imageSrcSet) + '"]'),
        typeof n.imageSizes == "string" &&
          (i += '[imagesizes="' + se(n.imageSizes) + '"]'))
      : (i += '[href="' + se(t) + '"]');
    var l = i;
    switch (e) {
      case "style":
        l = Va(t);
        break;
      case "script":
        l = ka(t);
    }
    fe.has(l) ||
      ((t = nt(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e,
        },
        n,
      )),
      fe.set(l, t),
      a.querySelector(i) !== null ||
        (e === "style" && a.querySelector(ll(l))) ||
        (e === "script" && a.querySelector(sl(l))) ||
        ((e = a.createElement("link")),
        zt(e, "link", t),
        St(e),
        a.head.appendChild(e)));
  }
}
function vb(t, e) {
  Ke.m(t, e);
  var n = Za;
  if (n && t) {
    var a = e && typeof e.as == "string" ? e.as : "script",
      i = 'link[rel="modulepreload"][as="' + se(a) + '"][href="' + se(t) + '"]',
      l = i;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        l = ka(t);
    }
    if (
      !fe.has(l) &&
      ((t = nt({ rel: "modulepreload", href: t }, e)),
      fe.set(l, t),
      n.querySelector(i) === null)
    ) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (n.querySelector(sl(l))) return;
      }
      ((a = n.createElement("link")),
        zt(a, "link", t),
        St(a),
        n.head.appendChild(a));
    }
  }
}
function bb(t, e, n) {
  Ke.S(t, e, n);
  var a = Za;
  if (a && t) {
    var i = ba(a).hoistableStyles,
      l = Va(t);
    e = e || "default";
    var s = i.get(l);
    if (!s) {
      var u = { loading: 0, preload: null };
      if ((s = a.querySelector(ll(l)))) u.loading = 5;
      else {
        ((t = nt({ rel: "stylesheet", href: t, "data-precedence": e }, n)),
          (n = fe.get(l)) && gc(t, n));
        var o = (s = a.createElement("link"));
        (St(o),
          zt(o, "link", t),
          (o._p = new Promise(function (r, c) {
            ((o.onload = r), (o.onerror = c));
          })),
          o.addEventListener("load", function () {
            u.loading |= 1;
          }),
          o.addEventListener("error", function () {
            u.loading |= 2;
          }),
          (u.loading |= 4),
          Pl(s, e, a));
      }
      ((s = { type: "stylesheet", instance: s, count: 1, state: u }),
        i.set(l, s));
    }
  }
}
function Sb(t, e) {
  Ke.X(t, e);
  var n = Za;
  if (n && t) {
    var a = ba(n).hoistableScripts,
      i = ka(t),
      l = a.get(i);
    l ||
      ((l = n.querySelector(sl(i))),
      l ||
        ((t = nt({ src: t, async: !0 }, e)),
        (e = fe.get(i)) && vc(t, e),
        (l = n.createElement("script")),
        St(l),
        zt(l, "link", t),
        n.head.appendChild(l)),
      (l = { type: "script", instance: l, count: 1, state: null }),
      a.set(i, l));
  }
}
function xb(t, e) {
  Ke.M(t, e);
  var n = Za;
  if (n && t) {
    var a = ba(n).hoistableScripts,
      i = ka(t),
      l = a.get(i);
    l ||
      ((l = n.querySelector(sl(i))),
      l ||
        ((t = nt({ src: t, async: !0, type: "module" }, e)),
        (e = fe.get(i)) && vc(t, e),
        (l = n.createElement("script")),
        St(l),
        zt(l, "link", t),
        n.head.appendChild(l)),
      (l = { type: "script", instance: l, count: 1, state: null }),
      a.set(i, l));
  }
}
function Ad(t, e, n, a) {
  var i = (i = sn.current) ? Cs(i) : null;
  if (!i) throw Error(T(446));
  switch (t) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof n.precedence == "string" && typeof n.href == "string"
        ? ((e = Va(n.href)),
          (n = ba(i).hoistableStyles),
          (a = n.get(e)),
          a ||
            ((a = { type: "style", instance: null, count: 0, state: null }),
            n.set(e, a)),
          a)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        n.rel === "stylesheet" &&
        typeof n.href == "string" &&
        typeof n.precedence == "string"
      ) {
        t = Va(n.href);
        var l = ba(i).hoistableStyles,
          s = l.get(t);
        if (
          (s ||
            ((i = i.ownerDocument || i),
            (s = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            l.set(t, s),
            (l = i.querySelector(ll(t))) &&
              !l._p &&
              ((s.instance = l), (s.state.loading = 5)),
            fe.has(t) ||
              ((n = {
                rel: "preload",
                as: "style",
                href: n.href,
                crossOrigin: n.crossOrigin,
                integrity: n.integrity,
                media: n.media,
                hrefLang: n.hrefLang,
                referrerPolicy: n.referrerPolicy,
              }),
              fe.set(t, n),
              l || Tb(i, t, n, s.state))),
          e && a === null)
        )
          throw Error(T(528, ""));
        return s;
      }
      if (e && a !== null) throw Error(T(529, ""));
      return null;
    case "script":
      return (
        (e = n.async),
        (n = n.src),
        typeof n == "string" &&
        e &&
        typeof e != "function" &&
        typeof e != "symbol"
          ? ((e = ka(n)),
            (n = ba(i).hoistableScripts),
            (a = n.get(e)),
            a ||
              ((a = { type: "script", instance: null, count: 0, state: null }),
              n.set(e, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(T(444, t));
  }
}
function Va(t) {
  return 'href="' + se(t) + '"';
}
function ll(t) {
  return 'link[rel="stylesheet"][' + t + "]";
}
function Qp(t) {
  return nt({}, t, { "data-precedence": t.precedence, precedence: null });
}
function Tb(t, e, n, a) {
  t.querySelector('link[rel="preload"][as="style"][' + e + "]")
    ? (a.loading = 1)
    : ((e = t.createElement("link")),
      (a.preload = e),
      e.addEventListener("load", function () {
        return (a.loading |= 1);
      }),
      e.addEventListener("error", function () {
        return (a.loading |= 2);
      }),
      zt(e, "link", n),
      St(e),
      t.head.appendChild(e));
}
function ka(t) {
  return '[src="' + se(t) + '"]';
}
function sl(t) {
  return "script[async]" + t;
}
function Ed(t, e, n) {
  if ((e.count++, e.instance === null))
    switch (e.type) {
      case "style":
        var a = t.querySelector('style[data-href~="' + se(n.href) + '"]');
        if (a) return ((e.instance = a), St(a), a);
        var i = nt({}, n, {
          "data-href": n.href,
          "data-precedence": n.precedence,
          href: null,
          precedence: null,
        });
        return (
          (a = (t.ownerDocument || t).createElement("style")),
          St(a),
          zt(a, "style", i),
          Pl(a, n.precedence, t),
          (e.instance = a)
        );
      case "stylesheet":
        i = Va(n.href);
        var l = t.querySelector(ll(i));
        if (l) return ((e.state.loading |= 4), (e.instance = l), St(l), l);
        ((a = Qp(n)),
          (i = fe.get(i)) && gc(a, i),
          (l = (t.ownerDocument || t).createElement("link")),
          St(l));
        var s = l;
        return (
          (s._p = new Promise(function (u, o) {
            ((s.onload = u), (s.onerror = o));
          })),
          zt(l, "link", a),
          (e.state.loading |= 4),
          Pl(l, n.precedence, t),
          (e.instance = l)
        );
      case "script":
        return (
          (l = ka(n.src)),
          (i = t.querySelector(sl(l)))
            ? ((e.instance = i), St(i), i)
            : ((a = n),
              (i = fe.get(l)) && ((a = nt({}, n)), vc(a, i)),
              (t = t.ownerDocument || t),
              (i = t.createElement("script")),
              St(i),
              zt(i, "link", a),
              t.head.appendChild(i),
              (e.instance = i))
        );
      case "void":
        return null;
      default:
        throw Error(T(443, e.type));
    }
  else
    e.type === "stylesheet" &&
      !(e.state.loading & 4) &&
      ((a = e.instance), (e.state.loading |= 4), Pl(a, n.precedence, t));
  return e.instance;
}
function Pl(t, e, n) {
  for (
    var a = n.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]',
      ),
      i = a.length ? a[a.length - 1] : null,
      l = i,
      s = 0;
    s < a.length;
    s++
  ) {
    var u = a[s];
    if (u.dataset.precedence === e) l = u;
    else if (l !== i) break;
  }
  l
    ? l.parentNode.insertBefore(t, l.nextSibling)
    : ((e = n.nodeType === 9 ? n.head : n), e.insertBefore(t, e.firstChild));
}
function gc(t, e) {
  (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
    t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
    t.title == null && (t.title = e.title));
}
function vc(t, e) {
  (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
    t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
    t.integrity == null && (t.integrity = e.integrity));
}
var $l = null;
function Md(t, e, n) {
  if ($l === null) {
    var a = new Map(),
      i = ($l = new Map());
    i.set(n, a);
  } else ((i = $l), (a = i.get(n)), a || ((a = new Map()), i.set(n, a)));
  if (a.has(t)) return a;
  for (
    a.set(t, null), n = n.getElementsByTagName(t), i = 0;
    i < n.length;
    i++
  ) {
    var l = n[i];
    if (
      !(
        l[Ii] ||
        l[Mt] ||
        (t === "link" && l.getAttribute("rel") === "stylesheet")
      ) &&
      l.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var s = l.getAttribute(e) || "";
      s = t + s;
      var u = a.get(s);
      u ? u.push(l) : a.set(s, [l]);
    }
  }
  return a;
}
function Dd(t, e, n) {
  ((t = t.ownerDocument || t),
    t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null,
    ));
}
function Ab(t, e, n) {
  if (n === 1 || e.itemProp != null) return !1;
  switch (t) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (
        typeof e.precedence != "string" ||
        typeof e.href != "string" ||
        e.href === ""
      )
        break;
      return !0;
    case "link":
      if (
        typeof e.rel != "string" ||
        typeof e.href != "string" ||
        e.href === "" ||
        e.onLoad ||
        e.onError
      )
        break;
      switch (e.rel) {
        case "stylesheet":
          return (
            (t = e.disabled),
            typeof e.precedence == "string" && t == null
          );
        default:
          return !0;
      }
    case "script":
      if (
        e.async &&
        typeof e.async != "function" &&
        typeof e.async != "symbol" &&
        !e.onLoad &&
        !e.onError &&
        e.src &&
        typeof e.src == "string"
      )
        return !0;
  }
  return !1;
}
function Kp(t) {
  return !(t.type === "stylesheet" && !(t.state.loading & 3));
}
function Eb(t, e, n, a) {
  if (
    n.type === "stylesheet" &&
    (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
    !(n.state.loading & 4)
  ) {
    if (n.instance === null) {
      var i = Va(a.href),
        l = e.querySelector(ll(i));
      if (l) {
        ((e = l._p),
          e !== null &&
            typeof e == "object" &&
            typeof e.then == "function" &&
            (t.count++, (t = zs.bind(t)), e.then(t, t)),
          (n.state.loading |= 4),
          (n.instance = l),
          St(l));
        return;
      }
      ((l = e.ownerDocument || e),
        (a = Qp(a)),
        (i = fe.get(i)) && gc(a, i),
        (l = l.createElement("link")),
        St(l));
      var s = l;
      ((s._p = new Promise(function (u, o) {
        ((s.onload = u), (s.onerror = o));
      })),
        zt(l, "link", a),
        (n.instance = l));
    }
    (t.stylesheets === null && (t.stylesheets = new Map()),
      t.stylesheets.set(n, e),
      (e = n.state.preload) &&
        !(n.state.loading & 3) &&
        (t.count++,
        (n = zs.bind(t)),
        e.addEventListener("load", n),
        e.addEventListener("error", n)));
  }
}
var Ju = 0;
function Mb(t, e) {
  return (
    t.stylesheets && t.count === 0 && Wl(t, t.stylesheets),
    0 < t.count || 0 < t.imgCount
      ? function (n) {
          var a = setTimeout(function () {
            if ((t.stylesheets && Wl(t, t.stylesheets), t.unsuspend)) {
              var l = t.unsuspend;
              ((t.unsuspend = null), l());
            }
          }, 6e4 + e);
          0 < t.imgBytes && Ju === 0 && (Ju = 62500 * lb());
          var i = setTimeout(
            function () {
              if (
                ((t.waitingForImages = !1),
                t.count === 0 &&
                  (t.stylesheets && Wl(t, t.stylesheets), t.unsuspend))
              ) {
                var l = t.unsuspend;
                ((t.unsuspend = null), l());
              }
            },
            (t.imgBytes > Ju ? 50 : 800) + e,
          );
          return (
            (t.unsuspend = n),
            function () {
              ((t.unsuspend = null), clearTimeout(a), clearTimeout(i));
            }
          );
        }
      : null
  );
}
function zs() {
  if (
    (this.count--,
    this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
  ) {
    if (this.stylesheets) Wl(this, this.stylesheets);
    else if (this.unsuspend) {
      var t = this.unsuspend;
      ((this.unsuspend = null), t());
    }
  }
}
var js = null;
function Wl(t, e) {
  ((t.stylesheets = null),
    t.unsuspend !== null &&
      (t.count++, (js = new Map()), e.forEach(Db, t), (js = null), zs.call(t)));
}
function Db(t, e) {
  if (!(e.state.loading & 4)) {
    var n = js.get(t);
    if (n) var a = n.get(null);
    else {
      ((n = new Map()), js.set(t, n));
      for (
        var i = t.querySelectorAll(
            "link[data-precedence],style[data-precedence]",
          ),
          l = 0;
        l < i.length;
        l++
      ) {
        var s = i[l];
        (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") &&
          (n.set(s.dataset.precedence, s), (a = s));
      }
      a && n.set(null, a);
    }
    ((i = e.instance),
      (s = i.getAttribute("data-precedence")),
      (l = n.get(s) || a),
      l === a && n.set(null, i),
      n.set(s, i),
      this.count++,
      (a = zs.bind(this)),
      i.addEventListener("load", a),
      i.addEventListener("error", a),
      l
        ? l.parentNode.insertBefore(i, l.nextSibling)
        : ((t = t.nodeType === 9 ? t.head : t),
          t.insertBefore(i, t.firstChild)),
      (e.state.loading |= 4));
  }
}
var Yi = {
  $$typeof: Re,
  Provider: null,
  Consumer: null,
  _currentValue: wn,
  _currentValue2: wn,
  _threadCount: 0,
};
function Cb(t, e, n, a, i, l, s, u, o) {
  ((this.tag = 1),
    (this.containerInfo = t),
    (this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = gu(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = gu(0)),
    (this.hiddenUpdates = gu(null)),
    (this.identifierPrefix = a),
    (this.onUncaughtError = i),
    (this.onCaughtError = l),
    (this.onRecoverableError = s),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = o),
    (this.incompleteTransitions = new Map()));
}
function Zp(t, e, n, a, i, l, s, u, o, r, c, f) {
  return (
    (t = new Cb(t, e, n, s, o, r, c, f, u)),
    (e = 1),
    l === !0 && (e |= 24),
    (l = Xt(3, null, null, e)),
    (t.current = l),
    (l.stateNode = t),
    (e = Qr()),
    e.refCount++,
    (t.pooledCache = e),
    e.refCount++,
    (l.memoizedState = { element: a, isDehydrated: n, cache: e }),
    kr(l),
    t
  );
}
function kp(t) {
  return t ? ((t = ca), t) : ca;
}
function Jp(t, e, n, a, i, l) {
  ((i = kp(i)),
    a.context === null ? (a.context = i) : (a.pendingContext = i),
    (a = on(e)),
    (a.payload = { element: n }),
    (l = l === void 0 ? null : l),
    l !== null && (a.callback = l),
    (n = rn(t, a, e)),
    n !== null && (Lt(n, t, e), gi(n, t, e)));
}
function Cd(t, e) {
  if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function bc(t, e) {
  (Cd(t, e), (t = t.alternate) && Cd(t, e));
}
function Fp(t) {
  if (t.tag === 13 || t.tag === 31) {
    var e = Jn(t, 67108864);
    (e !== null && Lt(e, t, 67108864), bc(t, 67108864));
  }
}
function zd(t) {
  if (t.tag === 13 || t.tag === 31) {
    var e = Jt();
    e = Nr(e);
    var n = Jn(t, e);
    (n !== null && Lt(n, t, e), bc(t, e));
  }
}
var Ns = !0;
function zb(t, e, n, a) {
  var i = w.T;
  w.T = null;
  var l = X.p;
  try {
    ((X.p = 2), Sc(t, e, n, a));
  } finally {
    ((X.p = l), (w.T = i));
  }
}
function jb(t, e, n, a) {
  var i = w.T;
  w.T = null;
  var l = X.p;
  try {
    ((X.p = 8), Sc(t, e, n, a));
  } finally {
    ((X.p = l), (w.T = i));
  }
}
function Sc(t, e, n, a) {
  if (Ns) {
    var i = ir(a);
    if (i === null) (Zu(t, e, a, Rs, n), jd(t, a));
    else if (Rb(i, t, e, n, a)) a.stopPropagation();
    else if ((jd(t, a), e & 4 && -1 < Nb.indexOf(t))) {
      for (; i !== null; ) {
        var l = Ga(i);
        if (l !== null)
          switch (l.tag) {
            case 3:
              if (((l = l.stateNode), l.current.memoizedState.isDehydrated)) {
                var s = zn(l.pendingLanes);
                if (s !== 0) {
                  var u = l;
                  for (u.pendingLanes |= 2, u.entangledLanes |= 2; s; ) {
                    var o = 1 << (31 - kt(s));
                    ((u.entanglements[1] |= o), (s &= ~o));
                  }
                  (Ae(l), !(G & 6) && ((Ss = Kt() + 500), il(0)));
                }
              }
              break;
            case 31:
            case 13:
              ((u = Jn(l, 2)), u !== null && Lt(u, l, 2), eu(), bc(l, 2));
          }
        if (((l = ir(a)), l === null && Zu(t, e, a, Rs, n), l === i)) break;
        i = l;
      }
      i !== null && a.stopPropagation();
    } else Zu(t, e, a, null, n);
  }
}
function ir(t) {
  return ((t = wr(t)), xc(t));
}
var Rs = null;
function xc(t) {
  if (((Rs = null), (t = ia(t)), t !== null)) {
    var e = Fi(t);
    if (e === null) t = null;
    else {
      var n = e.tag;
      if (n === 13) {
        if (((t = pm(e)), t !== null)) return t;
        t = null;
      } else if (n === 31) {
        if (((t = ym(e)), t !== null)) return t;
        t = null;
      } else if (n === 3) {
        if (e.stateNode.current.memoizedState.isDehydrated)
          return e.tag === 3 ? e.stateNode.containerInfo : null;
        t = null;
      } else e !== t && (t = null);
    }
  }
  return ((Rs = t), null);
}
function Pp(t) {
  switch (t) {
    case "beforetoggle":
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
    case "toggle":
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
      return 2;
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
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (pv()) {
        case Sm:
          return 2;
        case xm:
          return 8;
        case ss:
        case yv:
          return 32;
        case Tm:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var lr = !1,
  dn = null,
  hn = null,
  mn = null,
  Gi = new Map(),
  Xi = new Map(),
  Ie = [],
  Nb =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function jd(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      dn = null;
      break;
    case "dragenter":
    case "dragleave":
      hn = null;
      break;
    case "mouseover":
    case "mouseout":
      mn = null;
      break;
    case "pointerover":
    case "pointerout":
      Gi.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Xi.delete(e.pointerId);
  }
}
function ni(t, e, n, a, i, l) {
  return t === null || t.nativeEvent !== l
    ? ((t = {
        blockedOn: e,
        domEventName: n,
        eventSystemFlags: a,
        nativeEvent: l,
        targetContainers: [i],
      }),
      e !== null && ((e = Ga(e)), e !== null && Fp(e)),
      t)
    : ((t.eventSystemFlags |= a),
      (e = t.targetContainers),
      i !== null && e.indexOf(i) === -1 && e.push(i),
      t);
}
function Rb(t, e, n, a, i) {
  switch (e) {
    case "focusin":
      return ((dn = ni(dn, t, e, n, a, i)), !0);
    case "dragenter":
      return ((hn = ni(hn, t, e, n, a, i)), !0);
    case "mouseover":
      return ((mn = ni(mn, t, e, n, a, i)), !0);
    case "pointerover":
      var l = i.pointerId;
      return (Gi.set(l, ni(Gi.get(l) || null, t, e, n, a, i)), !0);
    case "gotpointercapture":
      return (
        (l = i.pointerId),
        Xi.set(l, ni(Xi.get(l) || null, t, e, n, a, i)),
        !0
      );
  }
  return !1;
}
function $p(t) {
  var e = ia(t.target);
  if (e !== null) {
    var n = Fi(e);
    if (n !== null) {
      if (((e = n.tag), e === 13)) {
        if (((e = pm(n)), e !== null)) {
          ((t.blockedOn = e),
            hf(t.priority, function () {
              zd(n);
            }));
          return;
        }
      } else if (e === 31) {
        if (((e = ym(n)), e !== null)) {
          ((t.blockedOn = e),
            hf(t.priority, function () {
              zd(n);
            }));
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function Il(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = ir(t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var a = new n.constructor(n.type, n);
      ((Ao = a), n.target.dispatchEvent(a), (Ao = null));
    } else return ((e = Ga(n)), e !== null && Fp(e), (t.blockedOn = n), !1);
    e.shift();
  }
  return !0;
}
function Nd(t, e, n) {
  Il(t) && n.delete(e);
}
function _b() {
  ((lr = !1),
    dn !== null && Il(dn) && (dn = null),
    hn !== null && Il(hn) && (hn = null),
    mn !== null && Il(mn) && (mn = null),
    Gi.forEach(Nd),
    Xi.forEach(Nd));
}
function Rl(t, e) {
  t.blockedOn === e &&
    ((t.blockedOn = null),
    lr ||
      ((lr = !0),
      vt.unstable_scheduleCallback(vt.unstable_NormalPriority, _b)));
}
var _l = null;
function Rd(t) {
  _l !== t &&
    ((_l = t),
    vt.unstable_scheduleCallback(vt.unstable_NormalPriority, function () {
      _l === t && (_l = null);
      for (var e = 0; e < t.length; e += 3) {
        var n = t[e],
          a = t[e + 1],
          i = t[e + 2];
        if (typeof a != "function") {
          if (xc(a || n) === null) continue;
          break;
        }
        var l = Ga(n);
        l !== null &&
          (t.splice(e, 3),
          (e -= 3),
          Ho(l, { pending: !0, data: i, method: n.method, action: a }, a, i));
      }
    }));
}
function Ua(t) {
  function e(o) {
    return Rl(o, t);
  }
  (dn !== null && Rl(dn, t),
    hn !== null && Rl(hn, t),
    mn !== null && Rl(mn, t),
    Gi.forEach(e),
    Xi.forEach(e));
  for (var n = 0; n < Ie.length; n++) {
    var a = Ie[n];
    a.blockedOn === t && (a.blockedOn = null);
  }
  for (; 0 < Ie.length && ((n = Ie[0]), n.blockedOn === null); )
    ($p(n), n.blockedOn === null && Ie.shift());
  if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
    for (a = 0; a < n.length; a += 3) {
      var i = n[a],
        l = n[a + 1],
        s = i[Ht] || null;
      if (typeof l == "function") s || Rd(n);
      else if (s) {
        var u = null;
        if (l && l.hasAttribute("formAction")) {
          if (((i = l), (s = l[Ht] || null))) u = s.formAction;
          else if (xc(i) !== null) continue;
        } else u = s.action;
        (typeof u == "function" ? (n[a + 1] = u) : (n.splice(a, 3), (a -= 3)),
          Rd(n));
      }
    }
}
function Wp() {
  function t(l) {
    l.canIntercept &&
      l.info === "react-transition" &&
      l.intercept({
        handler: function () {
          return new Promise(function (s) {
            return (i = s);
          });
        },
        focusReset: "manual",
        scroll: "manual",
      });
  }
  function e() {
    (i !== null && (i(), (i = null)), a || setTimeout(n, 20));
  }
  function n() {
    if (!a && !navigation.transition) {
      var l = navigation.currentEntry;
      l &&
        l.url != null &&
        navigation.navigate(l.url, {
          state: l.getState(),
          info: "react-transition",
          history: "replace",
        });
    }
  }
  if (typeof navigation == "object") {
    var a = !1,
      i = null;
    return (
      navigation.addEventListener("navigate", t),
      navigation.addEventListener("navigatesuccess", e),
      navigation.addEventListener("navigateerror", e),
      setTimeout(n, 100),
      function () {
        ((a = !0),
          navigation.removeEventListener("navigate", t),
          navigation.removeEventListener("navigatesuccess", e),
          navigation.removeEventListener("navigateerror", e),
          i !== null && (i(), (i = null)));
      }
    );
  }
}
function Tc(t) {
  this._internalRoot = t;
}
iu.prototype.render = Tc.prototype.render = function (t) {
  var e = this._internalRoot;
  if (e === null) throw Error(T(409));
  var n = e.current,
    a = Jt();
  Jp(n, a, t, e, null, null);
};
iu.prototype.unmount = Tc.prototype.unmount = function () {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    (Jp(t.current, 2, null, t, null, null), eu(), (e[Ya] = null));
  }
};
function iu(t) {
  this._internalRoot = t;
}
iu.prototype.unstable_scheduleHydration = function (t) {
  if (t) {
    var e = Cm();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < Ie.length && e !== 0 && e < Ie[n].priority; n++);
    (Ie.splice(n, 0, t), n === 0 && $p(t));
  }
};
var _d = hm.version;
if (_d !== "19.2.3") throw Error(T(527, _d, "19.2.3"));
X.findDOMNode = function (t) {
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function"
      ? Error(T(188))
      : ((t = Object.keys(t).join(",")), Error(T(268, t)));
  return (
    (t = ov(e)),
    (t = t !== null ? gm(t) : null),
    (t = t === null ? null : t.stateNode),
    t
  );
};
var Ob = {
  bundleType: 0,
  version: "19.2.3",
  rendererPackageName: "react-dom",
  currentDispatcherRef: w,
  reconcilerVersion: "19.2.3",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ol = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ol.isDisabled && Ol.supportsFiber)
    try {
      ((Pi = Ol.inject(Ob)), (Zt = Ol));
    } catch {}
}
Ys.createRoot = function (t, e) {
  if (!mm(t)) throw Error(T(299));
  var n = !1,
    a = "",
    i = X0,
    l = Q0,
    s = K0;
  return (
    e != null &&
      (e.unstable_strictMode === !0 && (n = !0),
      e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
      e.onUncaughtError !== void 0 && (i = e.onUncaughtError),
      e.onCaughtError !== void 0 && (l = e.onCaughtError),
      e.onRecoverableError !== void 0 && (s = e.onRecoverableError)),
    (e = Zp(t, 1, !1, null, null, n, a, null, i, l, s, Wp)),
    (t[Ya] = e.current),
    yc(t),
    new Tc(e)
  );
};
Ys.hydrateRoot = function (t, e, n) {
  if (!mm(t)) throw Error(T(299));
  var a = !1,
    i = "",
    l = X0,
    s = Q0,
    u = K0,
    o = null;
  return (
    n != null &&
      (n.unstable_strictMode === !0 && (a = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onUncaughtError !== void 0 && (l = n.onUncaughtError),
      n.onCaughtError !== void 0 && (s = n.onCaughtError),
      n.onRecoverableError !== void 0 && (u = n.onRecoverableError),
      n.formState !== void 0 && (o = n.formState)),
    (e = Zp(t, 1, !0, e, n ?? null, a, i, o, l, s, u, Wp)),
    (e.context = kp(null)),
    (n = e.current),
    (a = Jt()),
    (a = Nr(a)),
    (i = on(a)),
    (i.callback = null),
    rn(n, i, a),
    (n = a),
    (e.current.lanes = n),
    Wi(e, n),
    Ae(e),
    (t[Ya] = e.current),
    yc(t),
    new iu(e)
  );
};
Ys.version = "19.2.3";
function Ip() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ip);
    } catch (t) {
      console.error(t);
    }
}
(Ip(), (tm.exports = Ys));
var wb = tm.exports;
const Vb = () => {
    const [t, e] = M.useState({ left: !1, right: !1, interact: !1 });
    return (
      M.useEffect(() => {
        const n = (i) => {
            switch (i.key) {
              case "ArrowLeft":
              case "a":
              case "A":
                e((l) => ({ ...l, left: !0 }));
                break;
              case "ArrowRight":
              case "d":
              case "D":
                e((l) => ({ ...l, right: !0 }));
                break;
              case "Enter":
              case " ":
                e((l) => ({ ...l, interact: !0 }));
                break;
            }
          },
          a = (i) => {
            switch (i.key) {
              case "ArrowLeft":
              case "a":
              case "A":
                e((l) => ({ ...l, left: !1 }));
                break;
              case "ArrowRight":
              case "d":
              case "D":
                e((l) => ({ ...l, right: !1 }));
                break;
              case "Enter":
              case " ":
                e((l) => ({ ...l, interact: !1 }));
                break;
            }
          };
        return (
          window.addEventListener("keydown", n),
          window.addEventListener("keyup", a),
          () => {
            (window.removeEventListener("keydown", n),
              window.removeEventListener("keyup", a));
          }
        );
      }, []),
      t
    );
  },
  Ac = M.createContext({});
function Ec(t) {
  const e = M.useRef(null);
  return (e.current === null && (e.current = t()), e.current);
}
const lu = M.createContext(null),
  Mc = M.createContext({
    transformPagePoint: (t) => t,
    isStatic: !1,
    reducedMotion: "never",
  });
class Ub extends M.Component {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const a = this.props.sizeRef.current;
      ((a.height = n.offsetHeight || 0),
        (a.width = n.offsetWidth || 0),
        (a.top = n.offsetTop),
        (a.left = n.offsetLeft));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function Bb({ children: t, isPresent: e }) {
  const n = M.useId(),
    a = M.useRef(null),
    i = M.useRef({ width: 0, height: 0, top: 0, left: 0 }),
    { nonce: l } = M.useContext(Mc);
  return (
    M.useInsertionEffect(() => {
      const { width: s, height: u, top: o, left: r } = i.current;
      if (e || !a.current || !s || !u) return;
      a.current.dataset.motionPopId = n;
      const c = document.createElement("style");
      return (
        l && (c.nonce = l),
        document.head.appendChild(c),
        c.sheet &&
          c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${u}px !important;
            top: ${o}px !important;
            left: ${r}px !important;
          }
        `),
        () => {
          document.head.removeChild(c);
        }
      );
    }, [e]),
    g.jsx(Ub, {
      isPresent: e,
      childRef: a,
      sizeRef: i,
      children: M.cloneElement(t, { ref: a }),
    })
  );
}
const Lb = ({
  children: t,
  initial: e,
  isPresent: n,
  onExitComplete: a,
  custom: i,
  presenceAffectsLayout: l,
  mode: s,
}) => {
  const u = Ec(Hb),
    o = M.useId(),
    r = M.useCallback(
      (f) => {
        u.set(f, !0);
        for (const d of u.values()) if (!d) return;
        a && a();
      },
      [u, a],
    ),
    c = M.useMemo(
      () => ({
        id: o,
        initial: e,
        isPresent: n,
        custom: i,
        onExitComplete: r,
        register: (f) => (u.set(f, !1), () => u.delete(f)),
      }),
      l ? [Math.random(), r] : [n, r],
    );
  return (
    M.useMemo(() => {
      u.forEach((f, d) => u.set(d, !1));
    }, [n]),
    M.useEffect(() => {
      !n && !u.size && a && a();
    }, [n]),
    s === "popLayout" && (t = g.jsx(Bb, { isPresent: n, children: t })),
    g.jsx(lu.Provider, { value: c, children: t })
  );
};
function Hb() {
  return new Map();
}
function ty(t = !0) {
  const e = M.useContext(lu);
  if (e === null) return [!0, null];
  const { isPresent: n, onExitComplete: a, register: i } = e,
    l = M.useId();
  M.useEffect(() => {
    t && i(l);
  }, [t]);
  const s = M.useCallback(() => t && a && a(l), [l, a, t]);
  return !n && a ? [!1, s] : [!0];
}
const wl = (t) => t.key || "";
function Od(t) {
  const e = [];
  return (
    M.Children.forEach(t, (n) => {
      M.isValidElement(n) && e.push(n);
    }),
    e
  );
}
const Dc = typeof window < "u",
  ey = Dc ? M.useLayoutEffect : M.useEffect,
  _s = ({
    children: t,
    custom: e,
    initial: n = !0,
    onExitComplete: a,
    presenceAffectsLayout: i = !0,
    mode: l = "sync",
    propagate: s = !1,
  }) => {
    const [u, o] = ty(s),
      r = M.useMemo(() => Od(t), [t]),
      c = s && !u ? [] : r.map(wl),
      f = M.useRef(!0),
      d = M.useRef(r),
      m = Ec(() => new Map()),
      [b, S] = M.useState(r),
      [A, p] = M.useState(r);
    ey(() => {
      ((f.current = !1), (d.current = r));
      for (let v = 0; v < A.length; v++) {
        const x = wl(A[v]);
        c.includes(x) ? m.delete(x) : m.get(x) !== !0 && m.set(x, !1);
      }
    }, [A, c.length, c.join("-")]);
    const h = [];
    if (r !== b) {
      let v = [...r];
      for (let x = 0; x < A.length; x++) {
        const C = A[x],
          E = wl(C);
        c.includes(E) || (v.splice(x, 0, C), h.push(C));
      }
      (l === "wait" && h.length && (v = h), p(Od(v)), S(r));
      return;
    }
    const { forceRender: y } = M.useContext(Ac);
    return g.jsx(g.Fragment, {
      children: A.map((v) => {
        const x = wl(v),
          C = s && !u ? !1 : r === A || c.includes(x),
          E = () => {
            if (m.has(x)) m.set(x, !0);
            else return;
            let D = !0;
            (m.forEach((N) => {
              N || (D = !1);
            }),
              D &&
                (y == null || y(),
                p(d.current),
                s && (o == null || o()),
                a && a()));
          };
        return g.jsx(
          Lb,
          {
            isPresent: C,
            initial: !f.current || n ? void 0 : !1,
            custom: C ? void 0 : e,
            presenceAffectsLayout: i,
            mode: l,
            onExitComplete: C ? void 0 : E,
            children: v,
          },
          x,
        );
      }),
    });
  },
  Ft = (t) => t;
let ny = Ft;
function Cc(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const Ba = (t, e, n) => {
    const a = e - t;
    return a === 0 ? 1 : (n - t) / a;
  },
  Be = (t) => t * 1e3,
  Le = (t) => t / 1e3,
  qb = { useManualTiming: !1 };
function Yb(t) {
  let e = new Set(),
    n = new Set(),
    a = !1,
    i = !1;
  const l = new WeakSet();
  let s = { delta: 0, timestamp: 0, isProcessing: !1 };
  function u(r) {
    (l.has(r) && (o.schedule(r), t()), r(s));
  }
  const o = {
    schedule: (r, c = !1, f = !1) => {
      const m = f && a ? e : n;
      return (c && l.add(r), m.has(r) || m.add(r), r);
    },
    cancel: (r) => {
      (n.delete(r), l.delete(r));
    },
    process: (r) => {
      if (((s = r), a)) {
        i = !0;
        return;
      }
      ((a = !0),
        ([e, n] = [n, e]),
        e.forEach(u),
        e.clear(),
        (a = !1),
        i && ((i = !1), o.process(r)));
    },
  };
  return o;
}
const Vl = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
  ],
  Gb = 40;
function ay(t, e) {
  let n = !1,
    a = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    l = () => (n = !0),
    s = Vl.reduce((p, h) => ((p[h] = Yb(l)), p), {}),
    {
      read: u,
      resolveKeyframes: o,
      update: r,
      preRender: c,
      render: f,
      postRender: d,
    } = s,
    m = () => {
      const p = performance.now();
      ((n = !1),
        (i.delta = a ? 1e3 / 60 : Math.max(Math.min(p - i.timestamp, Gb), 1)),
        (i.timestamp = p),
        (i.isProcessing = !0),
        u.process(i),
        o.process(i),
        r.process(i),
        c.process(i),
        f.process(i),
        d.process(i),
        (i.isProcessing = !1),
        n && e && ((a = !1), t(m)));
    },
    b = () => {
      ((n = !0), (a = !0), i.isProcessing || t(m));
    };
  return {
    schedule: Vl.reduce((p, h) => {
      const y = s[h];
      return (
        (p[h] = (v, x = !1, C = !1) => (n || b(), y.schedule(v, x, C))),
        p
      );
    }, {}),
    cancel: (p) => {
      for (let h = 0; h < Vl.length; h++) s[Vl[h]].cancel(p);
    },
    state: i,
    steps: s,
  };
}
const {
    schedule: et,
    cancel: bn,
    state: Tt,
    steps: Fu,
  } = ay(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ft, !0),
  iy = M.createContext({ strict: !1 }),
  wd = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  La = {};
for (const t in wd) La[t] = { isEnabled: (e) => wd[t].some((n) => !!e[n]) };
function Xb(t) {
  for (const e in t) La[e] = { ...La[e], ...t[e] };
}
const Qb = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Os(t) {
  return (
    t.startsWith("while") ||
    (t.startsWith("drag") && t !== "draggable") ||
    t.startsWith("layout") ||
    t.startsWith("onTap") ||
    t.startsWith("onPan") ||
    t.startsWith("onLayout") ||
    Qb.has(t)
  );
}
let ly = (t) => !Os(t);
function Kb(t) {
  t && (ly = (e) => (e.startsWith("on") ? !Os(e) : t(e)));
}
try {
  Kb(require("@emotion/is-prop-valid").default);
} catch {}
function Zb(t, e, n) {
  const a = {};
  for (const i in t)
    (i === "values" && typeof t.values == "object") ||
      ((ly(i) ||
        (n === !0 && Os(i)) ||
        (!e && !Os(i)) ||
        (t.draggable && i.startsWith("onDrag"))) &&
        (a[i] = t[i]));
  return a;
}
function kb(t) {
  if (typeof Proxy > "u") return t;
  const e = new Map(),
    n = (...a) => t(...a);
  return new Proxy(n, {
    get: (a, i) =>
      i === "create" ? t : (e.has(i) || e.set(i, t(i)), e.get(i)),
  });
}
const su = M.createContext({});
function Qi(t) {
  return typeof t == "string" || Array.isArray(t);
}
function uu(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
const zc = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  jc = ["initial", ...zc];
function ou(t) {
  return uu(t.animate) || jc.some((e) => Qi(t[e]));
}
function sy(t) {
  return !!(ou(t) || t.variants);
}
function Jb(t, e) {
  if (ou(t)) {
    const { initial: n, animate: a } = t;
    return {
      initial: n === !1 || Qi(n) ? n : void 0,
      animate: Qi(a) ? a : void 0,
    };
  }
  return t.inherit !== !1 ? e : {};
}
function Fb(t) {
  const { initial: e, animate: n } = Jb(t, M.useContext(su));
  return M.useMemo(() => ({ initial: e, animate: n }), [Vd(e), Vd(n)]);
}
function Vd(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Pb = Symbol.for("motionComponentSymbol");
function ma(t) {
  return (
    t &&
    typeof t == "object" &&
    Object.prototype.hasOwnProperty.call(t, "current")
  );
}
function $b(t, e, n) {
  return M.useCallback(
    (a) => {
      (a && t.onMount && t.onMount(a),
        e && (a ? e.mount(a) : e.unmount()),
        n && (typeof n == "function" ? n(a) : ma(n) && (n.current = a)));
    },
    [e],
  );
}
const Nc = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  Wb = "framerAppearId",
  uy = "data-" + Nc(Wb),
  { schedule: Rc } = ay(queueMicrotask, !1),
  oy = M.createContext({});
function Ib(t, e, n, a, i) {
  var l, s;
  const { visualElement: u } = M.useContext(su),
    o = M.useContext(iy),
    r = M.useContext(lu),
    c = M.useContext(Mc).reducedMotion,
    f = M.useRef(null);
  ((a = a || o.renderer),
    !f.current &&
      a &&
      (f.current = a(t, {
        visualState: e,
        parent: u,
        props: n,
        presenceContext: r,
        blockInitialAnimation: r ? r.initial === !1 : !1,
        reducedMotionConfig: c,
      })));
  const d = f.current,
    m = M.useContext(oy);
  d &&
    !d.projection &&
    i &&
    (d.type === "html" || d.type === "svg") &&
    tS(f.current, n, i, m);
  const b = M.useRef(!1);
  M.useInsertionEffect(() => {
    d && b.current && d.update(n, r);
  });
  const S = n[uy],
    A = M.useRef(
      !!S &&
        !(
          !((l = window.MotionHandoffIsComplete) === null || l === void 0) &&
          l.call(window, S)
        ) &&
        ((s = window.MotionHasOptimisedAnimation) === null || s === void 0
          ? void 0
          : s.call(window, S)),
    );
  return (
    ey(() => {
      d &&
        ((b.current = !0),
        (window.MotionIsMounted = !0),
        d.updateFeatures(),
        Rc.render(d.render),
        A.current && d.animationState && d.animationState.animateChanges());
    }),
    M.useEffect(() => {
      d &&
        (!A.current && d.animationState && d.animationState.animateChanges(),
        A.current &&
          (queueMicrotask(() => {
            var p;
            (p = window.MotionHandoffMarkAsComplete) === null ||
              p === void 0 ||
              p.call(window, S);
          }),
          (A.current = !1)));
    }),
    d
  );
}
function tS(t, e, n, a) {
  const {
    layoutId: i,
    layout: l,
    drag: s,
    dragConstraints: u,
    layoutScroll: o,
    layoutRoot: r,
  } = e;
  ((t.projection = new n(
    t.latestValues,
    e["data-framer-portal-id"] ? void 0 : ry(t.parent),
  )),
    t.projection.setOptions({
      layoutId: i,
      layout: l,
      alwaysMeasureLayout: !!s || (u && ma(u)),
      visualElement: t,
      animationType: typeof l == "string" ? l : "both",
      initialPromotionConfig: a,
      layoutScroll: o,
      layoutRoot: r,
    }));
}
function ry(t) {
  if (t) return t.options.allowProjection !== !1 ? t.projection : ry(t.parent);
}
function eS({
  preloadedFeatures: t,
  createVisualElement: e,
  useRender: n,
  useVisualState: a,
  Component: i,
}) {
  var l, s;
  t && Xb(t);
  function u(r, c) {
    let f;
    const d = { ...M.useContext(Mc), ...r, layoutId: nS(r) },
      { isStatic: m } = d,
      b = Fb(r),
      S = a(r, m);
    if (!m && Dc) {
      aS();
      const A = iS(d);
      ((f = A.MeasureLayout),
        (b.visualElement = Ib(i, S, d, e, A.ProjectionNode)));
    }
    return g.jsxs(su.Provider, {
      value: b,
      children: [
        f && b.visualElement
          ? g.jsx(f, { visualElement: b.visualElement, ...d })
          : null,
        n(i, r, $b(S, b.visualElement, c), S, m, b.visualElement),
      ],
    });
  }
  u.displayName = `motion.${typeof i == "string" ? i : `create(${(s = (l = i.displayName) !== null && l !== void 0 ? l : i.name) !== null && s !== void 0 ? s : ""})`}`;
  const o = M.forwardRef(u);
  return ((o[Pb] = i), o);
}
function nS({ layoutId: t }) {
  const e = M.useContext(Ac).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function aS(t, e) {
  M.useContext(iy).strict;
}
function iS(t) {
  const { drag: e, layout: n } = La;
  if (!e && !n) return {};
  const a = { ...e, ...n };
  return {
    MeasureLayout:
      (e != null && e.isEnabled(t)) || (n != null && n.isEnabled(t))
        ? a.MeasureLayout
        : void 0,
    ProjectionNode: a.ProjectionNode,
  };
}
const lS = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function _c(t) {
  return typeof t != "string" || t.includes("-")
    ? !1
    : !!(lS.indexOf(t) > -1 || /[A-Z]/u.test(t));
}
function Ud(t) {
  const e = [{}, {}];
  return (
    t == null ||
      t.values.forEach((n, a) => {
        ((e[0][a] = n.get()), (e[1][a] = n.getVelocity()));
      }),
    e
  );
}
function Oc(t, e, n, a) {
  if (typeof e == "function") {
    const [i, l] = Ud(a);
    e = e(n !== void 0 ? n : t.custom, i, l);
  }
  if (
    (typeof e == "string" && (e = t.variants && t.variants[e]),
    typeof e == "function")
  ) {
    const [i, l] = Ud(a);
    e = e(n !== void 0 ? n : t.custom, i, l);
  }
  return e;
}
const sr = (t) => Array.isArray(t),
  sS = (t) => !!(t && typeof t == "object" && t.mix && t.toValue),
  uS = (t) => (sr(t) ? t[t.length - 1] || 0 : t),
  Nt = (t) => !!(t && t.getVelocity);
function ts(t) {
  const e = Nt(t) ? t.get() : t;
  return sS(e) ? e.toValue() : e;
}
function oS(
  { scrapeMotionValuesFromProps: t, createRenderState: e, onUpdate: n },
  a,
  i,
  l,
) {
  const s = { latestValues: rS(a, i, l, t), renderState: e() };
  return (
    n &&
      ((s.onMount = (u) => n({ props: a, current: u, ...s })),
      (s.onUpdate = (u) => n(u))),
    s
  );
}
const cy = (t) => (e, n) => {
  const a = M.useContext(su),
    i = M.useContext(lu),
    l = () => oS(t, e, a, i);
  return n ? l() : Ec(l);
};
function rS(t, e, n, a) {
  const i = {},
    l = a(t, {});
  for (const d in l) i[d] = ts(l[d]);
  let { initial: s, animate: u } = t;
  const o = ou(t),
    r = sy(t);
  e &&
    r &&
    !o &&
    t.inherit !== !1 &&
    (s === void 0 && (s = e.initial), u === void 0 && (u = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || s === !1;
  const f = c ? u : s;
  if (f && typeof f != "boolean" && !uu(f)) {
    const d = Array.isArray(f) ? f : [f];
    for (let m = 0; m < d.length; m++) {
      const b = Oc(t, d[m]);
      if (b) {
        const { transitionEnd: S, transition: A, ...p } = b;
        for (const h in p) {
          let y = p[h];
          if (Array.isArray(y)) {
            const v = c ? y.length - 1 : 0;
            y = y[v];
          }
          y !== null && (i[h] = y);
        }
        for (const h in S) i[h] = S[h];
      }
    }
  }
  return i;
}
const Ja = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Pn = new Set(Ja),
  fy = (t) => (e) => typeof e == "string" && e.startsWith(t),
  dy = fy("--"),
  cS = fy("var(--"),
  wc = (t) => (cS(t) ? fS.test(t.split("/*")[0].trim()) : !1),
  fS =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  hy = (t, e) => (e && typeof t == "number" ? e.transform(t) : t),
  Qe = (t, e, n) => (n > e ? e : n < t ? t : n),
  Fa = {
    test: (t) => typeof t == "number",
    parse: parseFloat,
    transform: (t) => t,
  },
  Ki = { ...Fa, transform: (t) => Qe(0, 1, t) },
  Ul = { ...Fa, default: 1 },
  ul = (t) => ({
    test: (e) =>
      typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: (e) => `${e}${t}`,
  }),
  ke = ul("deg"),
  Se = ul("%"),
  _ = ul("px"),
  dS = ul("vh"),
  hS = ul("vw"),
  Bd = {
    ...Se,
    parse: (t) => Se.parse(t) / 100,
    transform: (t) => Se.transform(t * 100),
  },
  mS = {
    borderWidth: _,
    borderTopWidth: _,
    borderRightWidth: _,
    borderBottomWidth: _,
    borderLeftWidth: _,
    borderRadius: _,
    radius: _,
    borderTopLeftRadius: _,
    borderTopRightRadius: _,
    borderBottomRightRadius: _,
    borderBottomLeftRadius: _,
    width: _,
    maxWidth: _,
    height: _,
    maxHeight: _,
    top: _,
    right: _,
    bottom: _,
    left: _,
    padding: _,
    paddingTop: _,
    paddingRight: _,
    paddingBottom: _,
    paddingLeft: _,
    margin: _,
    marginTop: _,
    marginRight: _,
    marginBottom: _,
    marginLeft: _,
    backgroundPositionX: _,
    backgroundPositionY: _,
  },
  pS = {
    rotate: ke,
    rotateX: ke,
    rotateY: ke,
    rotateZ: ke,
    scale: Ul,
    scaleX: Ul,
    scaleY: Ul,
    scaleZ: Ul,
    skew: ke,
    skewX: ke,
    skewY: ke,
    distance: _,
    translateX: _,
    translateY: _,
    translateZ: _,
    x: _,
    y: _,
    z: _,
    perspective: _,
    transformPerspective: _,
    opacity: Ki,
    originX: Bd,
    originY: Bd,
    originZ: _,
  },
  Ld = { ...Fa, transform: Math.round },
  Vc = {
    ...mS,
    ...pS,
    zIndex: Ld,
    size: _,
    fillOpacity: Ki,
    strokeOpacity: Ki,
    numOctaves: Ld,
  },
  yS = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  gS = Ja.length;
function vS(t, e, n) {
  let a = "",
    i = !0;
  for (let l = 0; l < gS; l++) {
    const s = Ja[l],
      u = t[s];
    if (u === void 0) continue;
    let o = !0;
    if (
      (typeof u == "number"
        ? (o = u === (s.startsWith("scale") ? 1 : 0))
        : (o = parseFloat(u) === 0),
      !o || n)
    ) {
      const r = hy(u, Vc[s]);
      if (!o) {
        i = !1;
        const c = yS[s] || s;
        a += `${c}(${r}) `;
      }
      n && (e[s] = r);
    }
  }
  return ((a = a.trim()), n ? (a = n(e, i ? "" : a)) : i && (a = "none"), a);
}
function Uc(t, e, n) {
  const { style: a, vars: i, transformOrigin: l } = t;
  let s = !1,
    u = !1;
  for (const o in e) {
    const r = e[o];
    if (Pn.has(o)) {
      s = !0;
      continue;
    } else if (dy(o)) {
      i[o] = r;
      continue;
    } else {
      const c = hy(r, Vc[o]);
      o.startsWith("origin") ? ((u = !0), (l[o] = c)) : (a[o] = c);
    }
  }
  if (
    (e.transform ||
      (s || n
        ? (a.transform = vS(e, t.transform, n))
        : a.transform && (a.transform = "none")),
    u)
  ) {
    const { originX: o = "50%", originY: r = "50%", originZ: c = 0 } = l;
    a.transformOrigin = `${o} ${r} ${c}`;
  }
}
const bS = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  SS = { offset: "strokeDashoffset", array: "strokeDasharray" };
function xS(t, e, n = 1, a = 0, i = !0) {
  t.pathLength = 1;
  const l = i ? bS : SS;
  t[l.offset] = _.transform(-a);
  const s = _.transform(e),
    u = _.transform(n);
  t[l.array] = `${s} ${u}`;
}
function Hd(t, e, n) {
  return typeof t == "string" ? t : _.transform(e + n * t);
}
function TS(t, e, n) {
  const a = Hd(e, t.x, t.width),
    i = Hd(n, t.y, t.height);
  return `${a} ${i}`;
}
function Bc(
  t,
  {
    attrX: e,
    attrY: n,
    attrScale: a,
    originX: i,
    originY: l,
    pathLength: s,
    pathSpacing: u = 1,
    pathOffset: o = 0,
    ...r
  },
  c,
  f,
) {
  if ((Uc(t, r, f), c)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  ((t.attrs = t.style), (t.style = {}));
  const { attrs: d, style: m, dimensions: b } = t;
  (d.transform && (b && (m.transform = d.transform), delete d.transform),
    b &&
      (i !== void 0 || l !== void 0 || m.transform) &&
      (m.transformOrigin = TS(
        b,
        i !== void 0 ? i : 0.5,
        l !== void 0 ? l : 0.5,
      )),
    e !== void 0 && (d.x = e),
    n !== void 0 && (d.y = n),
    a !== void 0 && (d.scale = a),
    s !== void 0 && xS(d, s, u, o, !1));
}
const Lc = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  my = () => ({ ...Lc(), attrs: {} }),
  Hc = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function py(t, { style: e, vars: n }, a, i) {
  Object.assign(t.style, e, i && i.getProjectionStyles(a));
  for (const l in n) t.style.setProperty(l, n[l]);
}
const yy = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function gy(t, e, n, a) {
  py(t, e, void 0, a);
  for (const i in e.attrs) t.setAttribute(yy.has(i) ? i : Nc(i), e.attrs[i]);
}
const ws = {};
function AS(t) {
  Object.assign(ws, t);
}
function vy(t, { layout: e, layoutId: n }) {
  return (
    Pn.has(t) ||
    t.startsWith("origin") ||
    ((e || n !== void 0) && (!!ws[t] || t === "opacity"))
  );
}
function qc(t, e, n) {
  var a;
  const { style: i } = t,
    l = {};
  for (const s in i)
    (Nt(i[s]) ||
      (e.style && Nt(e.style[s])) ||
      vy(s, t) ||
      ((a = n == null ? void 0 : n.getValue(s)) === null || a === void 0
        ? void 0
        : a.liveStyle) !== void 0) &&
      (l[s] = i[s]);
  return l;
}
function by(t, e, n) {
  const a = qc(t, e, n);
  for (const i in t)
    if (Nt(t[i]) || Nt(e[i])) {
      const l =
        Ja.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      a[l] = t[i];
    }
  return a;
}
function ES(t, e) {
  try {
    e.dimensions =
      typeof t.getBBox == "function" ? t.getBBox() : t.getBoundingClientRect();
  } catch {
    e.dimensions = { x: 0, y: 0, width: 0, height: 0 };
  }
}
const qd = ["x", "y", "width", "height", "cx", "cy", "r"],
  MS = {
    useVisualState: cy({
      scrapeMotionValuesFromProps: by,
      createRenderState: my,
      onUpdate: ({
        props: t,
        prevProps: e,
        current: n,
        renderState: a,
        latestValues: i,
      }) => {
        if (!n) return;
        let l = !!t.drag;
        if (!l) {
          for (const u in i)
            if (Pn.has(u)) {
              l = !0;
              break;
            }
        }
        if (!l) return;
        let s = !e;
        if (e)
          for (let u = 0; u < qd.length; u++) {
            const o = qd[u];
            t[o] !== e[o] && (s = !0);
          }
        s &&
          et.read(() => {
            (ES(n, a),
              et.render(() => {
                (Bc(a, i, Hc(n.tagName), t.transformTemplate), gy(n, a));
              }));
          });
      },
    }),
  },
  DS = {
    useVisualState: cy({
      scrapeMotionValuesFromProps: qc,
      createRenderState: Lc,
    }),
  };
function Sy(t, e, n) {
  for (const a in e) !Nt(e[a]) && !vy(a, n) && (t[a] = e[a]);
}
function CS({ transformTemplate: t }, e) {
  return M.useMemo(() => {
    const n = Lc();
    return (Uc(n, e, t), Object.assign({}, n.vars, n.style));
  }, [e]);
}
function zS(t, e) {
  const n = t.style || {},
    a = {};
  return (Sy(a, n, t), Object.assign(a, CS(t, e)), a);
}
function jS(t, e) {
  const n = {},
    a = zS(t, e);
  return (
    t.drag &&
      t.dragListener !== !1 &&
      ((n.draggable = !1),
      (a.userSelect = a.WebkitUserSelect = a.WebkitTouchCallout = "none"),
      (a.touchAction =
        t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`)),
    t.tabIndex === void 0 &&
      (t.onTap || t.onTapStart || t.whileTap) &&
      (n.tabIndex = 0),
    (n.style = a),
    n
  );
}
function NS(t, e, n, a) {
  const i = M.useMemo(() => {
    const l = my();
    return (
      Bc(l, e, Hc(a), t.transformTemplate),
      { ...l.attrs, style: { ...l.style } }
    );
  }, [e]);
  if (t.style) {
    const l = {};
    (Sy(l, t.style, t), (i.style = { ...l, ...i.style }));
  }
  return i;
}
function RS(t = !1) {
  return (n, a, i, { latestValues: l }, s) => {
    const o = (_c(n) ? NS : jS)(a, l, s, n),
      r = Zb(a, typeof n == "string", t),
      c = n !== M.Fragment ? { ...r, ...o, ref: i } : {},
      { children: f } = a,
      d = M.useMemo(() => (Nt(f) ? f.get() : f), [f]);
    return M.createElement(n, { ...c, children: d });
  };
}
function _S(t, e) {
  return function (a, { forwardMotionProps: i } = { forwardMotionProps: !1 }) {
    const s = {
      ...(_c(a) ? MS : DS),
      preloadedFeatures: t,
      useRender: RS(i),
      createVisualElement: e,
      Component: a,
    };
    return eS(s);
  };
}
function xy(t, e) {
  if (!Array.isArray(e)) return !1;
  const n = e.length;
  if (n !== t.length) return !1;
  for (let a = 0; a < n; a++) if (e[a] !== t[a]) return !1;
  return !0;
}
function ru(t, e, n) {
  const a = t.getProps();
  return Oc(a, e, n !== void 0 ? n : a.custom, t);
}
const OS = Cc(() => window.ScrollTimeline !== void 0);
class wS {
  constructor(e) {
    ((this.stop = () => this.runAll("stop")),
      (this.animations = e.filter(Boolean)));
  }
  get finished() {
    return Promise.all(
      this.animations.map((e) => ("finished" in e ? e.finished : e)),
    );
  }
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let a = 0; a < this.animations.length; a++) this.animations[a][e] = n;
  }
  attachTimeline(e, n) {
    const a = this.animations.map((i) => {
      if (OS() && i.attachTimeline) return i.attachTimeline(e);
      if (typeof n == "function") return n(i);
    });
    return () => {
      a.forEach((i, l) => {
        (i && i(), this.animations[l].stop());
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let e = 0;
    for (let n = 0; n < this.animations.length; n++)
      e = Math.max(e, this.animations[n].duration);
    return e;
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class VS extends wS {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
function Yc(t, e) {
  return t ? t[e] || t.default || t : void 0;
}
const ur = 2e4;
function Ty(t) {
  let e = 0;
  const n = 50;
  let a = t.next(e);
  for (; !a.done && e < ur; ) ((e += n), (a = t.next(e)));
  return e >= ur ? 1 / 0 : e;
}
function Gc(t) {
  return typeof t == "function";
}
function Yd(t, e) {
  ((t.timeline = e), (t.onfinish = null));
}
const Xc = (t) => Array.isArray(t) && typeof t[0] == "number",
  US = { linearEasing: void 0 };
function BS(t, e) {
  const n = Cc(t);
  return () => {
    var a;
    return (a = US[e]) !== null && a !== void 0 ? a : n();
  };
}
const Vs = BS(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  Ay = (t, e, n = 10) => {
    let a = "";
    const i = Math.max(Math.round(e / n), 2);
    for (let l = 0; l < i; l++) a += t(Ba(0, i - 1, l)) + ", ";
    return `linear(${a.substring(0, a.length - 2)})`;
  };
function Ey(t) {
  return !!(
    (typeof t == "function" && Vs()) ||
    !t ||
    (typeof t == "string" && (t in or || Vs())) ||
    Xc(t) ||
    (Array.isArray(t) && t.every(Ey))
  );
}
const ri = ([t, e, n, a]) => `cubic-bezier(${t}, ${e}, ${n}, ${a})`,
  or = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: ri([0, 0.65, 0.55, 1]),
    circOut: ri([0.55, 0, 1, 0.45]),
    backIn: ri([0.31, 0.01, 0.66, -0.59]),
    backOut: ri([0.33, 1.53, 0.69, 0.99]),
  };
function My(t, e) {
  if (t)
    return typeof t == "function" && Vs()
      ? Ay(t, e)
      : Xc(t)
        ? ri(t)
        : Array.isArray(t)
          ? t.map((n) => My(n, e) || or.easeOut)
          : or[t];
}
const he = { x: !1, y: !1 };
function Dy() {
  return he.x || he.y;
}
function LS(t, e, n) {
  var a;
  if (t instanceof Element) return [t];
  if (typeof t == "string") {
    let i = document;
    const l = (a = void 0) !== null && a !== void 0 ? a : i.querySelectorAll(t);
    return l ? Array.from(l) : [];
  }
  return Array.from(t);
}
function Cy(t, e) {
  const n = LS(t),
    a = new AbortController(),
    i = { passive: !0, ...e, signal: a.signal };
  return [n, i, () => a.abort()];
}
function Gd(t) {
  return (e) => {
    e.pointerType === "touch" || Dy() || t(e);
  };
}
function HS(t, e, n = {}) {
  const [a, i, l] = Cy(t, n),
    s = Gd((u) => {
      const { target: o } = u,
        r = e(u);
      if (typeof r != "function" || !o) return;
      const c = Gd((f) => {
        (r(f), o.removeEventListener("pointerleave", c));
      });
      o.addEventListener("pointerleave", c, i);
    });
  return (
    a.forEach((u) => {
      u.addEventListener("pointerenter", s, i);
    }),
    l
  );
}
const zy = (t, e) => (e ? (t === e ? !0 : zy(t, e.parentElement)) : !1),
  Qc = (t) =>
    t.pointerType === "mouse"
      ? typeof t.button != "number" || t.button <= 0
      : t.isPrimary !== !1,
  qS = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function YS(t) {
  return qS.has(t.tagName) || t.tabIndex !== -1;
}
const ci = new WeakSet();
function Xd(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Pu(t, e) {
  t.dispatchEvent(
    new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }),
  );
}
const GS = (t, e) => {
  const n = t.currentTarget;
  if (!n) return;
  const a = Xd(() => {
    if (ci.has(n)) return;
    Pu(n, "down");
    const i = Xd(() => {
        Pu(n, "up");
      }),
      l = () => Pu(n, "cancel");
    (n.addEventListener("keyup", i, e), n.addEventListener("blur", l, e));
  });
  (n.addEventListener("keydown", a, e),
    n.addEventListener("blur", () => n.removeEventListener("keydown", a), e));
};
function Qd(t) {
  return Qc(t) && !Dy();
}
function XS(t, e, n = {}) {
  const [a, i, l] = Cy(t, n),
    s = (u) => {
      const o = u.currentTarget;
      if (!Qd(u) || ci.has(o)) return;
      ci.add(o);
      const r = e(u),
        c = (m, b) => {
          (window.removeEventListener("pointerup", f),
            window.removeEventListener("pointercancel", d),
            !(!Qd(m) || !ci.has(o)) &&
              (ci.delete(o), typeof r == "function" && r(m, { success: b })));
        },
        f = (m) => {
          c(m, n.useGlobalTarget || zy(o, m.target));
        },
        d = (m) => {
          c(m, !1);
        };
      (window.addEventListener("pointerup", f, i),
        window.addEventListener("pointercancel", d, i));
    };
  return (
    a.forEach((u) => {
      (!YS(u) && u.getAttribute("tabindex") === null && (u.tabIndex = 0),
        (n.useGlobalTarget ? window : u).addEventListener("pointerdown", s, i),
        u.addEventListener("focus", (r) => GS(r, i), i));
    }),
    l
  );
}
function QS(t) {
  return t === "x" || t === "y"
    ? he[t]
      ? null
      : ((he[t] = !0),
        () => {
          he[t] = !1;
        })
    : he.x || he.y
      ? null
      : ((he.x = he.y = !0),
        () => {
          he.x = he.y = !1;
        });
}
const jy = new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Ja,
]);
let es;
function KS() {
  es = void 0;
}
const xe = {
  now: () => (
    es === void 0 &&
      xe.set(
        Tt.isProcessing || qb.useManualTiming
          ? Tt.timestamp
          : performance.now(),
      ),
    es
  ),
  set: (t) => {
    ((es = t), queueMicrotask(KS));
  },
};
function Kc(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Zc(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
class kc {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return (Kc(this.subscriptions, e), () => Zc(this.subscriptions, e));
  }
  notify(e, n, a) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](e, n, a);
      else
        for (let l = 0; l < i; l++) {
          const s = this.subscriptions[l];
          s && s(e, n, a);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function Ny(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Kd = 30,
  ZS = (t) => !isNaN(parseFloat(t));
class kS {
  constructor(e, n = {}) {
    ((this.version = "11.18.2"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (a, i = !0) => {
        const l = xe.now();
        (this.updatedAt !== l && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(a),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current));
      }),
      (this.hasAnimated = !1),
      this.setCurrent(e),
      (this.owner = n.owner));
  }
  setCurrent(e) {
    ((this.current = e),
      (this.updatedAt = xe.now()),
      this.canTrackVelocity === null &&
        e !== void 0 &&
        (this.canTrackVelocity = ZS(this.current)));
  }
  setPrevFrameValue(e = this.current) {
    ((this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new kc());
    const a = this.events[e].add(n);
    return e === "change"
      ? () => {
          (a(),
            et.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : a;
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear();
  }
  attach(e, n) {
    ((this.passiveEffect = e), (this.stopPassiveEffect = n));
  }
  set(e, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(e, n)
      : this.passiveEffect(e, this.updateAndNotify);
  }
  setWithVelocity(e, n, a) {
    (this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = e),
      (this.prevUpdatedAt = this.updatedAt - a));
  }
  jump(e, n = !0) {
    (this.updateAndNotify(e),
      (this.prev = e),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const e = xe.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      e - this.updatedAt > Kd
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Kd);
    return Ny(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(e) {
    return (
      this.stop(),
      new Promise((n) => {
        ((this.hasAnimated = !0),
          (this.animation = e(n)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    (this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function Zi(t, e) {
  return new kS(t, e);
}
function JS(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Zi(n));
}
function FS(t, e) {
  const n = ru(t, e);
  let { transitionEnd: a = {}, transition: i = {}, ...l } = n || {};
  l = { ...l, ...a };
  for (const s in l) {
    const u = uS(l[s]);
    JS(t, s, u);
  }
}
function PS(t) {
  return !!(Nt(t) && t.add);
}
function rr(t, e) {
  const n = t.getValue("willChange");
  if (PS(n)) return n.add(e);
}
function Ry(t) {
  return t.props[uy];
}
const _y = (t, e, n) =>
    (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
  $S = 1e-7,
  WS = 12;
function IS(t, e, n, a, i) {
  let l,
    s,
    u = 0;
  do ((s = e + (n - e) / 2), (l = _y(s, a, i) - t), l > 0 ? (n = s) : (e = s));
  while (Math.abs(l) > $S && ++u < WS);
  return s;
}
function ol(t, e, n, a) {
  if (t === e && n === a) return Ft;
  const i = (l) => IS(l, 0, 1, t, n);
  return (l) => (l === 0 || l === 1 ? l : _y(i(l), e, a));
}
const Oy = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
  wy = (t) => (e) => 1 - t(1 - e),
  Vy = ol(0.33, 1.53, 0.69, 0.99),
  Jc = wy(Vy),
  Uy = Oy(Jc),
  By = (t) =>
    (t *= 2) < 1 ? 0.5 * Jc(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
  Fc = (t) => 1 - Math.sin(Math.acos(t)),
  Ly = wy(Fc),
  Hy = Oy(Fc),
  qy = (t) => /^0[^.\s]+$/u.test(t);
function tx(t) {
  return typeof t == "number"
    ? t === 0
    : t !== null
      ? t === "none" || t === "0" || qy(t)
      : !0;
}
const Di = (t) => Math.round(t * 1e5) / 1e5,
  Pc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ex(t) {
  return t == null;
}
const nx =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  $c = (t, e) => (n) =>
    !!(
      (typeof n == "string" && nx.test(n) && n.startsWith(t)) ||
      (e && !ex(n) && Object.prototype.hasOwnProperty.call(n, e))
    ),
  Yy = (t, e, n) => (a) => {
    if (typeof a != "string") return a;
    const [i, l, s, u] = a.match(Pc);
    return {
      [t]: parseFloat(i),
      [e]: parseFloat(l),
      [n]: parseFloat(s),
      alpha: u !== void 0 ? parseFloat(u) : 1,
    };
  },
  ax = (t) => Qe(0, 255, t),
  $u = { ...Fa, transform: (t) => Math.round(ax(t)) },
  On = {
    test: $c("rgb", "red"),
    parse: Yy("red", "green", "blue"),
    transform: ({ red: t, green: e, blue: n, alpha: a = 1 }) =>
      "rgba(" +
      $u.transform(t) +
      ", " +
      $u.transform(e) +
      ", " +
      $u.transform(n) +
      ", " +
      Di(Ki.transform(a)) +
      ")",
  };
function ix(t) {
  let e = "",
    n = "",
    a = "",
    i = "";
  return (
    t.length > 5
      ? ((e = t.substring(1, 3)),
        (n = t.substring(3, 5)),
        (a = t.substring(5, 7)),
        (i = t.substring(7, 9)))
      : ((e = t.substring(1, 2)),
        (n = t.substring(2, 3)),
        (a = t.substring(3, 4)),
        (i = t.substring(4, 5)),
        (e += e),
        (n += n),
        (a += a),
        (i += i)),
    {
      red: parseInt(e, 16),
      green: parseInt(n, 16),
      blue: parseInt(a, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const cr = { test: $c("#"), parse: ix, transform: On.transform },
  pa = {
    test: $c("hsl", "hue"),
    parse: Yy("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: e, lightness: n, alpha: a = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      Se.transform(Di(e)) +
      ", " +
      Se.transform(Di(n)) +
      ", " +
      Di(Ki.transform(a)) +
      ")",
  },
  jt = {
    test: (t) => On.test(t) || cr.test(t) || pa.test(t),
    parse: (t) =>
      On.test(t) ? On.parse(t) : pa.test(t) ? pa.parse(t) : cr.parse(t),
    transform: (t) =>
      typeof t == "string"
        ? t
        : t.hasOwnProperty("red")
          ? On.transform(t)
          : pa.transform(t),
  },
  lx =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function sx(t) {
  var e, n;
  return (
    isNaN(t) &&
    typeof t == "string" &&
    (((e = t.match(Pc)) === null || e === void 0 ? void 0 : e.length) || 0) +
      (((n = t.match(lx)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const Gy = "number",
  Xy = "color",
  ux = "var",
  ox = "var(",
  Zd = "${}",
  rx =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ki(t) {
  const e = t.toString(),
    n = [],
    a = { color: [], number: [], var: [] },
    i = [];
  let l = 0;
  const u = e
    .replace(
      rx,
      (o) => (
        jt.test(o)
          ? (a.color.push(l), i.push(Xy), n.push(jt.parse(o)))
          : o.startsWith(ox)
            ? (a.var.push(l), i.push(ux), n.push(o))
            : (a.number.push(l), i.push(Gy), n.push(parseFloat(o))),
        ++l,
        Zd
      ),
    )
    .split(Zd);
  return { values: n, split: u, indexes: a, types: i };
}
function Qy(t) {
  return ki(t).values;
}
function Ky(t) {
  const { split: e, types: n } = ki(t),
    a = e.length;
  return (i) => {
    let l = "";
    for (let s = 0; s < a; s++)
      if (((l += e[s]), i[s] !== void 0)) {
        const u = n[s];
        u === Gy
          ? (l += Di(i[s]))
          : u === Xy
            ? (l += jt.transform(i[s]))
            : (l += i[s]);
      }
    return l;
  };
}
const cx = (t) => (typeof t == "number" ? 0 : t);
function fx(t) {
  const e = Qy(t);
  return Ky(t)(e.map(cx));
}
const Sn = {
    test: sx,
    parse: Qy,
    createTransformer: Ky,
    getAnimatableNone: fx,
  },
  dx = new Set(["brightness", "contrast", "saturate", "opacity"]);
function hx(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow") return t;
  const [a] = n.match(Pc) || [];
  if (!a) return t;
  const i = n.replace(a, "");
  let l = dx.has(e) ? 1 : 0;
  return (a !== n && (l *= 100), e + "(" + l + i + ")");
}
const mx = /\b([a-z-]*)\(.*?\)/gu,
  fr = {
    ...Sn,
    getAnimatableNone: (t) => {
      const e = t.match(mx);
      return e ? e.map(hx).join(" ") : t;
    },
  },
  px = {
    ...Vc,
    color: jt,
    backgroundColor: jt,
    outlineColor: jt,
    fill: jt,
    stroke: jt,
    borderColor: jt,
    borderTopColor: jt,
    borderRightColor: jt,
    borderBottomColor: jt,
    borderLeftColor: jt,
    filter: fr,
    WebkitFilter: fr,
  },
  Wc = (t) => px[t];
function Zy(t, e) {
  let n = Wc(t);
  return (
    n !== fr && (n = Sn),
    n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
  );
}
const yx = new Set(["auto", "none", "0"]);
function gx(t, e, n) {
  let a = 0,
    i;
  for (; a < t.length && !i; ) {
    const l = t[a];
    (typeof l == "string" && !yx.has(l) && ki(l).values.length && (i = t[a]),
      a++);
  }
  if (i && n) for (const l of e) t[l] = Zy(n, i);
}
const kd = (t) => t === Fa || t === _,
  Jd = (t, e) => parseFloat(t.split(", ")[e]),
  Fd =
    (t, e) =>
    (n, { transform: a }) => {
      if (a === "none" || !a) return 0;
      const i = a.match(/^matrix3d\((.+)\)$/u);
      if (i) return Jd(i[1], e);
      {
        const l = a.match(/^matrix\((.+)\)$/u);
        return l ? Jd(l[1], t) : 0;
      }
    },
  vx = new Set(["x", "y", "z"]),
  bx = Ja.filter((t) => !vx.has(t));
function Sx(t) {
  const e = [];
  return (
    bx.forEach((n) => {
      const a = t.getValue(n);
      a !== void 0 &&
        (e.push([n, a.get()]), a.set(n.startsWith("scale") ? 1 : 0));
    }),
    e
  );
}
const Ha = {
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
    t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  x: Fd(4, 13),
  y: Fd(5, 14),
};
Ha.translateX = Ha.x;
Ha.translateY = Ha.y;
const Hn = new Set();
let dr = !1,
  hr = !1;
function ky() {
  if (hr) {
    const t = Array.from(Hn).filter((a) => a.needsMeasurement),
      e = new Set(t.map((a) => a.element)),
      n = new Map();
    (e.forEach((a) => {
      const i = Sx(a);
      i.length && (n.set(a, i), a.render());
    }),
      t.forEach((a) => a.measureInitialState()),
      e.forEach((a) => {
        a.render();
        const i = n.get(a);
        i &&
          i.forEach(([l, s]) => {
            var u;
            (u = a.getValue(l)) === null || u === void 0 || u.set(s);
          });
      }),
      t.forEach((a) => a.measureEndState()),
      t.forEach((a) => {
        a.suspendedScrollY !== void 0 && window.scrollTo(0, a.suspendedScrollY);
      }));
  }
  ((hr = !1), (dr = !1), Hn.forEach((t) => t.complete()), Hn.clear());
}
function Jy() {
  Hn.forEach((t) => {
    (t.readKeyframes(), t.needsMeasurement && (hr = !0));
  });
}
function xx() {
  (Jy(), ky());
}
class Ic {
  constructor(e, n, a, i, l, s = !1) {
    ((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...e]),
      (this.onComplete = n),
      (this.name = a),
      (this.motionValue = i),
      (this.element = l),
      (this.isAsync = s));
  }
  scheduleResolve() {
    ((this.isScheduled = !0),
      this.isAsync
        ? (Hn.add(this),
          dr || ((dr = !0), et.read(Jy), et.resolveKeyframes(ky)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: e,
      name: n,
      element: a,
      motionValue: i,
    } = this;
    for (let l = 0; l < e.length; l++)
      if (e[l] === null)
        if (l === 0) {
          const s = i == null ? void 0 : i.get(),
            u = e[e.length - 1];
          if (s !== void 0) e[0] = s;
          else if (a && n) {
            const o = a.readValue(n, u);
            o != null && (e[0] = o);
          }
          (e[0] === void 0 && (e[0] = u), i && s === void 0 && i.set(e[0]));
        } else e[l] = e[l - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      Hn.delete(this));
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Hn.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const Fy = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
  Tx = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Ax(t) {
  const e = Tx.exec(t);
  if (!e) return [,];
  const [, n, a, i] = e;
  return [`--${n ?? a}`, i];
}
function Py(t, e, n = 1) {
  const [a, i] = Ax(t);
  if (!a) return;
  const l = window.getComputedStyle(e).getPropertyValue(a);
  if (l) {
    const s = l.trim();
    return Fy(s) ? parseFloat(s) : s;
  }
  return wc(i) ? Py(i, e, n + 1) : i;
}
const $y = (t) => (e) => e.test(t),
  Ex = { test: (t) => t === "auto", parse: (t) => t },
  Wy = [Fa, _, Se, ke, hS, dS, Ex],
  Pd = (t) => Wy.find($y(t));
class Iy extends Ic {
  constructor(e, n, a, i, l) {
    super(e, n, a, i, l, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: a } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let o = 0; o < e.length; o++) {
      let r = e[o];
      if (typeof r == "string" && ((r = r.trim()), wc(r))) {
        const c = Py(r, n.current);
        (c !== void 0 && (e[o] = c),
          o === e.length - 1 && (this.finalKeyframe = r));
      }
    }
    if ((this.resolveNoneKeyframes(), !jy.has(a) || e.length !== 2)) return;
    const [i, l] = e,
      s = Pd(i),
      u = Pd(l);
    if (s !== u)
      if (kd(s) && kd(u))
        for (let o = 0; o < e.length; o++) {
          const r = e[o];
          typeof r == "string" && (e[o] = parseFloat(r));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this,
      a = [];
    for (let i = 0; i < e.length; i++) tx(e[i]) && a.push(i);
    a.length && gx(e, a, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: a } = this;
    if (!e || !e.current) return;
    (a === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Ha[a](
        e.measureViewportBox(),
        window.getComputedStyle(e.current),
      )),
      (n[0] = this.measuredOrigin));
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(a, i).jump(i, !1);
  }
  measureEndState() {
    var e;
    const { element: n, name: a, unresolvedKeyframes: i } = this;
    if (!n || !n.current) return;
    const l = n.getValue(a);
    l && l.jump(this.measuredOrigin, !1);
    const s = i.length - 1,
      u = i[s];
    ((i[s] = Ha[a](n.measureViewportBox(), window.getComputedStyle(n.current))),
      u !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = u),
      !((e = this.removedTransforms) === null || e === void 0) &&
        e.length &&
        this.removedTransforms.forEach(([o, r]) => {
          n.getValue(o).set(r);
        }),
      this.resolveNoneKeyframes());
  }
}
const $d = (t, e) =>
  e === "zIndex"
    ? !1
    : !!(
        typeof t == "number" ||
        Array.isArray(t) ||
        (typeof t == "string" &&
          (Sn.test(t) || t === "0") &&
          !t.startsWith("url("))
      );
function Mx(t) {
  const e = t[0];
  if (t.length === 1) return !0;
  for (let n = 0; n < t.length; n++) if (t[n] !== e) return !0;
}
function Dx(t, e, n, a) {
  const i = t[0];
  if (i === null) return !1;
  if (e === "display" || e === "visibility") return !0;
  const l = t[t.length - 1],
    s = $d(i, e),
    u = $d(l, e);
  return !s || !u ? !1 : Mx(t) || ((n === "spring" || Gc(n)) && a);
}
const Cx = (t) => t !== null;
function cu(t, { repeat: e, repeatType: n = "loop" }, a) {
  const i = t.filter(Cx),
    l = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return !l || a === void 0 ? i[l] : a;
}
const zx = 40;
class tg {
  constructor({
    autoplay: e = !0,
    delay: n = 0,
    type: a = "keyframes",
    repeat: i = 0,
    repeatDelay: l = 0,
    repeatType: s = "loop",
    ...u
  }) {
    ((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = xe.now()),
      (this.options = {
        autoplay: e,
        delay: n,
        type: a,
        repeat: i,
        repeatDelay: l,
        repeatType: s,
        ...u,
      }),
      this.updateFinishedPromise());
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > zx
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt;
  }
  get resolved() {
    return (
      !this._resolved && !this.hasAttemptedResolve && xx(),
      this._resolved
    );
  }
  onKeyframesResolved(e, n) {
    ((this.resolvedAt = xe.now()), (this.hasAttemptedResolve = !0));
    const {
      name: a,
      type: i,
      velocity: l,
      delay: s,
      onComplete: u,
      onUpdate: o,
      isGenerator: r,
    } = this.options;
    if (!r && !Dx(e, a, i, l))
      if (s) this.options.duration = 0;
      else {
        (o && o(cu(e, this.options, n)),
          u && u(),
          this.resolveFinishedPromise());
        return;
      }
    const c = this.initPlayback(e, n);
    c !== !1 &&
      ((this._resolved = { keyframes: e, finalKeyframe: n, ...c }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(e, n) {
    return this.currentFinishedPromise.then(e, n);
  }
  flatten() {
    ((this.options.type = "keyframes"), (this.options.ease = "linear"));
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((e) => {
      this.resolveFinishedPromise = e;
    });
  }
}
const it = (t, e, n) => t + (e - t) * n;
function Wu(t, e, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? t + (e - t) * 6 * n
      : n < 1 / 2
        ? e
        : n < 2 / 3
          ? t + (e - t) * (2 / 3 - n) * 6
          : t
  );
}
function jx({ hue: t, saturation: e, lightness: n, alpha: a }) {
  ((t /= 360), (e /= 100), (n /= 100));
  let i = 0,
    l = 0,
    s = 0;
  if (!e) i = l = s = n;
  else {
    const u = n < 0.5 ? n * (1 + e) : n + e - n * e,
      o = 2 * n - u;
    ((i = Wu(o, u, t + 1 / 3)), (l = Wu(o, u, t)), (s = Wu(o, u, t - 1 / 3)));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(l * 255),
    blue: Math.round(s * 255),
    alpha: a,
  };
}
function Us(t, e) {
  return (n) => (n > 0 ? e : t);
}
const Iu = (t, e, n) => {
    const a = t * t,
      i = n * (e * e - a) + a;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  Nx = [cr, On, pa],
  Rx = (t) => Nx.find((e) => e.test(t));
function Wd(t) {
  const e = Rx(t);
  if (!e) return !1;
  let n = e.parse(t);
  return (e === pa && (n = jx(n)), n);
}
const Id = (t, e) => {
    const n = Wd(t),
      a = Wd(e);
    if (!n || !a) return Us(t, e);
    const i = { ...n };
    return (l) => (
      (i.red = Iu(n.red, a.red, l)),
      (i.green = Iu(n.green, a.green, l)),
      (i.blue = Iu(n.blue, a.blue, l)),
      (i.alpha = it(n.alpha, a.alpha, l)),
      On.transform(i)
    );
  },
  _x = (t, e) => (n) => e(t(n)),
  rl = (...t) => t.reduce(_x),
  mr = new Set(["none", "hidden"]);
function Ox(t, e) {
  return mr.has(t) ? (n) => (n <= 0 ? t : e) : (n) => (n >= 1 ? e : t);
}
function wx(t, e) {
  return (n) => it(t, e, n);
}
function tf(t) {
  return typeof t == "number"
    ? wx
    : typeof t == "string"
      ? wc(t)
        ? Us
        : jt.test(t)
          ? Id
          : Bx
      : Array.isArray(t)
        ? eg
        : typeof t == "object"
          ? jt.test(t)
            ? Id
            : Vx
          : Us;
}
function eg(t, e) {
  const n = [...t],
    a = n.length,
    i = t.map((l, s) => tf(l)(l, e[s]));
  return (l) => {
    for (let s = 0; s < a; s++) n[s] = i[s](l);
    return n;
  };
}
function Vx(t, e) {
  const n = { ...t, ...e },
    a = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (a[i] = tf(t[i])(t[i], e[i]));
  return (i) => {
    for (const l in a) n[l] = a[l](i);
    return n;
  };
}
function Ux(t, e) {
  var n;
  const a = [],
    i = { color: 0, var: 0, number: 0 };
  for (let l = 0; l < e.values.length; l++) {
    const s = e.types[l],
      u = t.indexes[s][i[s]],
      o = (n = t.values[u]) !== null && n !== void 0 ? n : 0;
    ((a[l] = o), i[s]++);
  }
  return a;
}
const Bx = (t, e) => {
  const n = Sn.createTransformer(e),
    a = ki(t),
    i = ki(e);
  return a.indexes.var.length === i.indexes.var.length &&
    a.indexes.color.length === i.indexes.color.length &&
    a.indexes.number.length >= i.indexes.number.length
    ? (mr.has(t) && !i.values.length) || (mr.has(e) && !a.values.length)
      ? Ox(t, e)
      : rl(eg(Ux(a, i), i.values), n)
    : Us(t, e);
};
function ng(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number"
    ? it(t, e, n)
    : tf(t)(t, e);
}
const Lx = 5;
function ag(t, e, n) {
  const a = Math.max(e - Lx, 0);
  return Ny(n - t(a), e - a);
}
const ut = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  to = 0.001;
function Hx({
  duration: t = ut.duration,
  bounce: e = ut.bounce,
  velocity: n = ut.velocity,
  mass: a = ut.mass,
}) {
  let i,
    l,
    s = 1 - e;
  ((s = Qe(ut.minDamping, ut.maxDamping, s)),
    (t = Qe(ut.minDuration, ut.maxDuration, Le(t))),
    s < 1
      ? ((i = (r) => {
          const c = r * s,
            f = c * t,
            d = c - n,
            m = pr(r, s),
            b = Math.exp(-f);
          return to - (d / m) * b;
        }),
        (l = (r) => {
          const f = r * s * t,
            d = f * n + n,
            m = Math.pow(s, 2) * Math.pow(r, 2) * t,
            b = Math.exp(-f),
            S = pr(Math.pow(r, 2), s);
          return ((-i(r) + to > 0 ? -1 : 1) * ((d - m) * b)) / S;
        }))
      : ((i = (r) => {
          const c = Math.exp(-r * t),
            f = (r - n) * t + 1;
          return -to + c * f;
        }),
        (l = (r) => {
          const c = Math.exp(-r * t),
            f = (n - r) * (t * t);
          return c * f;
        })));
  const u = 5 / t,
    o = Yx(i, l, u);
  if (((t = Be(t)), isNaN(o)))
    return { stiffness: ut.stiffness, damping: ut.damping, duration: t };
  {
    const r = Math.pow(o, 2) * a;
    return { stiffness: r, damping: s * 2 * Math.sqrt(a * r), duration: t };
  }
}
const qx = 12;
function Yx(t, e, n) {
  let a = n;
  for (let i = 1; i < qx; i++) a = a - t(a) / e(a);
  return a;
}
function pr(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Gx = ["duration", "bounce"],
  Xx = ["stiffness", "damping", "mass"];
function th(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Qx(t) {
  let e = {
    velocity: ut.velocity,
    stiffness: ut.stiffness,
    damping: ut.damping,
    mass: ut.mass,
    isResolvedFromDuration: !1,
    ...t,
  };
  if (!th(t, Xx) && th(t, Gx))
    if (t.visualDuration) {
      const n = t.visualDuration,
        a = (2 * Math.PI) / (n * 1.2),
        i = a * a,
        l = 2 * Qe(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = { ...e, mass: ut.mass, stiffness: i, damping: l };
    } else {
      const n = Hx(t);
      ((e = { ...e, ...n, mass: ut.mass }), (e.isResolvedFromDuration = !0));
    }
  return e;
}
function ig(t = ut.visualDuration, e = ut.bounce) {
  const n =
    typeof t != "object"
      ? { visualDuration: t, keyframes: [0, 1], bounce: e }
      : t;
  let { restSpeed: a, restDelta: i } = n;
  const l = n.keyframes[0],
    s = n.keyframes[n.keyframes.length - 1],
    u = { done: !1, value: l },
    {
      stiffness: o,
      damping: r,
      mass: c,
      duration: f,
      velocity: d,
      isResolvedFromDuration: m,
    } = Qx({ ...n, velocity: -Le(n.velocity || 0) }),
    b = d || 0,
    S = r / (2 * Math.sqrt(o * c)),
    A = s - l,
    p = Le(Math.sqrt(o / c)),
    h = Math.abs(A) < 5;
  (a || (a = h ? ut.restSpeed.granular : ut.restSpeed.default),
    i || (i = h ? ut.restDelta.granular : ut.restDelta.default));
  let y;
  if (S < 1) {
    const x = pr(p, S);
    y = (C) => {
      const E = Math.exp(-S * p * C);
      return (
        s - E * (((b + S * p * A) / x) * Math.sin(x * C) + A * Math.cos(x * C))
      );
    };
  } else if (S === 1) y = (x) => s - Math.exp(-p * x) * (A + (b + p * A) * x);
  else {
    const x = p * Math.sqrt(S * S - 1);
    y = (C) => {
      const E = Math.exp(-S * p * C),
        D = Math.min(x * C, 300);
      return (
        s - (E * ((b + S * p * A) * Math.sinh(D) + x * A * Math.cosh(D))) / x
      );
    };
  }
  const v = {
    calculatedDuration: (m && f) || null,
    next: (x) => {
      const C = y(x);
      if (m) u.done = x >= f;
      else {
        let E = 0;
        S < 1 && (E = x === 0 ? Be(b) : ag(y, x, C));
        const D = Math.abs(E) <= a,
          N = Math.abs(s - C) <= i;
        u.done = D && N;
      }
      return ((u.value = u.done ? s : C), u);
    },
    toString: () => {
      const x = Math.min(Ty(v), ur),
        C = Ay((E) => v.next(x * E).value, x, 30);
      return x + "ms " + C;
    },
  };
  return v;
}
function eh({
  keyframes: t,
  velocity: e = 0,
  power: n = 0.8,
  timeConstant: a = 325,
  bounceDamping: i = 10,
  bounceStiffness: l = 500,
  modifyTarget: s,
  min: u,
  max: o,
  restDelta: r = 0.5,
  restSpeed: c,
}) {
  const f = t[0],
    d = { done: !1, value: f },
    m = (D) => (u !== void 0 && D < u) || (o !== void 0 && D > o),
    b = (D) =>
      u === void 0
        ? o
        : o === void 0 || Math.abs(u - D) < Math.abs(o - D)
          ? u
          : o;
  let S = n * e;
  const A = f + S,
    p = s === void 0 ? A : s(A);
  p !== A && (S = p - f);
  const h = (D) => -S * Math.exp(-D / a),
    y = (D) => p + h(D),
    v = (D) => {
      const N = h(D),
        j = y(D);
      ((d.done = Math.abs(N) <= r), (d.value = d.done ? p : j));
    };
  let x, C;
  const E = (D) => {
    m(d.value) &&
      ((x = D),
      (C = ig({
        keyframes: [d.value, b(d.value)],
        velocity: ag(y, D, d.value),
        damping: i,
        stiffness: l,
        restDelta: r,
        restSpeed: c,
      })));
  };
  return (
    E(0),
    {
      calculatedDuration: null,
      next: (D) => {
        let N = !1;
        return (
          !C && x === void 0 && ((N = !0), v(D), E(D)),
          x !== void 0 && D >= x ? C.next(D - x) : (!N && v(D), d)
        );
      },
    }
  );
}
const Kx = ol(0.42, 0, 1, 1),
  Zx = ol(0, 0, 0.58, 1),
  lg = ol(0.42, 0, 0.58, 1),
  kx = (t) => Array.isArray(t) && typeof t[0] != "number",
  Jx = {
    linear: Ft,
    easeIn: Kx,
    easeInOut: lg,
    easeOut: Zx,
    circIn: Fc,
    circInOut: Hy,
    circOut: Ly,
    backIn: Jc,
    backInOut: Uy,
    backOut: Vy,
    anticipate: By,
  },
  nh = (t) => {
    if (Xc(t)) {
      ny(t.length === 4);
      const [e, n, a, i] = t;
      return ol(e, n, a, i);
    } else if (typeof t == "string") return Jx[t];
    return t;
  };
function Fx(t, e, n) {
  const a = [],
    i = n || ng,
    l = t.length - 1;
  for (let s = 0; s < l; s++) {
    let u = i(t[s], t[s + 1]);
    if (e) {
      const o = Array.isArray(e) ? e[s] || Ft : e;
      u = rl(o, u);
    }
    a.push(u);
  }
  return a;
}
function Px(t, e, { clamp: n = !0, ease: a, mixer: i } = {}) {
  const l = t.length;
  if ((ny(l === e.length), l === 1)) return () => e[0];
  if (l === 2 && e[0] === e[1]) return () => e[1];
  const s = t[0] === t[1];
  t[0] > t[l - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
  const u = Fx(e, a, i),
    o = u.length,
    r = (c) => {
      if (s && c < t[0]) return e[0];
      let f = 0;
      if (o > 1) for (; f < t.length - 2 && !(c < t[f + 1]); f++);
      const d = Ba(t[f], t[f + 1], c);
      return u[f](d);
    };
  return n ? (c) => r(Qe(t[0], t[l - 1], c)) : r;
}
function $x(t, e) {
  const n = t[t.length - 1];
  for (let a = 1; a <= e; a++) {
    const i = Ba(0, e, a);
    t.push(it(n, 1, i));
  }
}
function Wx(t) {
  const e = [0];
  return ($x(e, t.length - 1), e);
}
function Ix(t, e) {
  return t.map((n) => n * e);
}
function t2(t, e) {
  return t.map(() => e || lg).splice(0, t.length - 1);
}
function Bs({
  duration: t = 300,
  keyframes: e,
  times: n,
  ease: a = "easeInOut",
}) {
  const i = kx(a) ? a.map(nh) : nh(a),
    l = { done: !1, value: e[0] },
    s = Ix(n && n.length === e.length ? n : Wx(e), t),
    u = Px(s, e, { ease: Array.isArray(i) ? i : t2(e, i) });
  return {
    calculatedDuration: t,
    next: (o) => ((l.value = u(o)), (l.done = o >= t), l),
  };
}
const e2 = (t) => {
    const e = ({ timestamp: n }) => t(n);
    return {
      start: () => et.update(e, !0),
      stop: () => bn(e),
      now: () => (Tt.isProcessing ? Tt.timestamp : xe.now()),
    };
  },
  n2 = { decay: eh, inertia: eh, tween: Bs, keyframes: Bs, spring: ig },
  a2 = (t) => t / 100;
class ef extends tg {
  constructor(e) {
    (super(e),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.startTime = null),
      (this.state = "idle"),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
        )
          return;
        this.teardown();
        const { onStop: o } = this.options;
        o && o();
      }));
    const { name: n, motionValue: a, element: i, keyframes: l } = this.options,
      s = (i == null ? void 0 : i.KeyframeResolver) || Ic,
      u = (o, r) => this.onKeyframesResolved(o, r);
    ((this.resolver = new s(l, u, n, a, i)), this.resolver.scheduleResolve());
  }
  flatten() {
    (super.flatten(),
      this._resolved &&
        Object.assign(
          this._resolved,
          this.initPlayback(this._resolved.keyframes),
        ));
  }
  initPlayback(e) {
    const {
        type: n = "keyframes",
        repeat: a = 0,
        repeatDelay: i = 0,
        repeatType: l,
        velocity: s = 0,
      } = this.options,
      u = Gc(n) ? n : n2[n] || Bs;
    let o, r;
    u !== Bs &&
      typeof e[0] != "number" &&
      ((o = rl(a2, ng(e[0], e[1]))), (e = [0, 100]));
    const c = u({ ...this.options, keyframes: e });
    (l === "mirror" &&
      (r = u({ ...this.options, keyframes: [...e].reverse(), velocity: -s })),
      c.calculatedDuration === null && (c.calculatedDuration = Ty(c)));
    const { calculatedDuration: f } = c,
      d = f + i,
      m = d * (a + 1) - i;
    return {
      generator: c,
      mirroredGenerator: r,
      mapPercentToKeyframes: o,
      calculatedDuration: f,
      resolvedDuration: d,
      totalDuration: m,
    };
  }
  onPostResolved() {
    const { autoplay: e = !0 } = this.options;
    (this.play(),
      this.pendingPlayState === "paused" || !e
        ? this.pause()
        : (this.state = this.pendingPlayState));
  }
  tick(e, n = !1) {
    const { resolved: a } = this;
    if (!a) {
      const { keyframes: D } = this.options;
      return { done: !0, value: D[D.length - 1] };
    }
    const {
      finalKeyframe: i,
      generator: l,
      mirroredGenerator: s,
      mapPercentToKeyframes: u,
      keyframes: o,
      calculatedDuration: r,
      totalDuration: c,
      resolvedDuration: f,
    } = a;
    if (this.startTime === null) return l.next(0);
    const {
      delay: d,
      repeat: m,
      repeatType: b,
      repeatDelay: S,
      onUpdate: A,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, e))
      : this.speed < 0 &&
        (this.startTime = Math.min(e - c / this.speed, this.startTime)),
      n
        ? (this.currentTime = e)
        : this.holdTime !== null
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(e - this.startTime) * this.speed));
    const p = this.currentTime - d * (this.speed >= 0 ? 1 : -1),
      h = this.speed >= 0 ? p < 0 : p > c;
    ((this.currentTime = Math.max(p, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = c));
    let y = this.currentTime,
      v = l;
    if (m) {
      const D = Math.min(this.currentTime, c) / f;
      let N = Math.floor(D),
        j = D % 1;
      (!j && D >= 1 && (j = 1),
        j === 1 && N--,
        (N = Math.min(N, m + 1)),
        !!(N % 2) &&
          (b === "reverse"
            ? ((j = 1 - j), S && (j -= S / f))
            : b === "mirror" && (v = s)),
        (y = Qe(0, 1, j) * f));
    }
    const x = h ? { done: !1, value: o[0] } : v.next(y);
    u && (x.value = u(x.value));
    let { done: C } = x;
    !h &&
      r !== null &&
      (C = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const E =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && C));
    return (
      E && i !== void 0 && (x.value = cu(o, this.options, i)),
      A && A(x.value),
      E && this.finish(),
      x
    );
  }
  get duration() {
    const { resolved: e } = this;
    return e ? Le(e.calculatedDuration) : 0;
  }
  get time() {
    return Le(this.currentTime);
  }
  set time(e) {
    ((e = Be(e)),
      (this.currentTime = e),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = e)
        : this.driver && (this.startTime = this.driver.now() - e / this.speed));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    ((this.playbackSpeed = e), n && (this.time = Le(this.currentTime)));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: e = e2, onPlay: n, startTime: a } = this.options;
    (this.driver || (this.driver = e((l) => this.tick(l))), n && n());
    const i = this.driver.now();
    (this.holdTime !== null
      ? (this.startTime = i - this.holdTime)
      : this.startTime
        ? this.state === "finished" && (this.startTime = i)
        : (this.startTime = a ?? this.calcStartTime()),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    var e;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    ((this.state = "paused"),
      (this.holdTime =
        (e = this.currentTime) !== null && e !== void 0 ? e : 0));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    (this.teardown(), (this.state = "finished"));
    const { onComplete: e } = this.options;
    e && e();
  }
  cancel() {
    (this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise());
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel());
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(e) {
    return ((this.startTime = 0), this.tick(e, !0));
  }
}
const i2 = new Set(["opacity", "clipPath", "filter", "transform"]);
function l2(
  t,
  e,
  n,
  {
    delay: a = 0,
    duration: i = 300,
    repeat: l = 0,
    repeatType: s = "loop",
    ease: u = "easeInOut",
    times: o,
  } = {},
) {
  const r = { [e]: n };
  o && (r.offset = o);
  const c = My(u, i);
  return (
    Array.isArray(c) && (r.easing = c),
    t.animate(r, {
      delay: a,
      duration: i,
      easing: Array.isArray(c) ? "linear" : c,
      fill: "both",
      iterations: l + 1,
      direction: s === "reverse" ? "alternate" : "normal",
    })
  );
}
const s2 = Cc(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  Ls = 10,
  u2 = 2e4;
function o2(t) {
  return Gc(t.type) || t.type === "spring" || !Ey(t.ease);
}
function r2(t, e) {
  const n = new ef({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let a = { done: !1, value: t[0] };
  const i = [];
  let l = 0;
  for (; !a.done && l < u2; ) ((a = n.sample(l)), i.push(a.value), (l += Ls));
  return { times: void 0, keyframes: i, duration: l - Ls, ease: "linear" };
}
const sg = { anticipate: By, backInOut: Uy, circInOut: Hy };
function c2(t) {
  return t in sg;
}
class ah extends tg {
  constructor(e) {
    super(e);
    const { name: n, motionValue: a, element: i, keyframes: l } = this.options;
    ((this.resolver = new Iy(
      l,
      (s, u) => this.onKeyframesResolved(s, u),
      n,
      a,
      i,
    )),
      this.resolver.scheduleResolve());
  }
  initPlayback(e, n) {
    let {
      duration: a = 300,
      times: i,
      ease: l,
      type: s,
      motionValue: u,
      name: o,
      startTime: r,
    } = this.options;
    if (!u.owner || !u.owner.current) return !1;
    if (
      (typeof l == "string" && Vs() && c2(l) && (l = sg[l]), o2(this.options))
    ) {
      const {
          onComplete: f,
          onUpdate: d,
          motionValue: m,
          element: b,
          ...S
        } = this.options,
        A = r2(e, S);
      ((e = A.keyframes),
        e.length === 1 && (e[1] = e[0]),
        (a = A.duration),
        (i = A.times),
        (l = A.ease),
        (s = "keyframes"));
    }
    const c = l2(u.owner.current, o, e, {
      ...this.options,
      duration: a,
      times: i,
      ease: l,
    });
    return (
      (c.startTime = r ?? this.calcStartTime()),
      this.pendingTimeline
        ? (Yd(c, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (c.onfinish = () => {
            const { onComplete: f } = this.options;
            (u.set(cu(e, this.options, n)),
              f && f(),
              this.cancel(),
              this.resolveFinishedPromise());
          }),
      { animation: c, duration: a, times: i, type: s, ease: l, keyframes: e }
    );
  }
  get duration() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { duration: n } = e;
    return Le(n);
  }
  get time() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { animation: n } = e;
    return Le(n.currentTime || 0);
  }
  set time(e) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: a } = n;
    a.currentTime = Be(e);
  }
  get speed() {
    const { resolved: e } = this;
    if (!e) return 1;
    const { animation: n } = e;
    return n.playbackRate;
  }
  set speed(e) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: a } = n;
    a.playbackRate = e;
  }
  get state() {
    const { resolved: e } = this;
    if (!e) return "idle";
    const { animation: n } = e;
    return n.playState;
  }
  get startTime() {
    const { resolved: e } = this;
    if (!e) return null;
    const { animation: n } = e;
    return n.startTime;
  }
  attachTimeline(e) {
    if (!this._resolved) this.pendingTimeline = e;
    else {
      const { resolved: n } = this;
      if (!n) return Ft;
      const { animation: a } = n;
      Yd(a, e);
    }
    return Ft;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: e } = this;
    if (!e) return;
    const { animation: n } = e;
    (n.playState === "finished" && this.updateFinishedPromise(), n.play());
  }
  pause() {
    const { resolved: e } = this;
    if (!e) return;
    const { animation: n } = e;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    (this.resolveFinishedPromise(), this.updateFinishedPromise());
    const { resolved: e } = this;
    if (!e) return;
    const {
      animation: n,
      keyframes: a,
      duration: i,
      type: l,
      ease: s,
      times: u,
    } = e;
    if (n.playState === "idle" || n.playState === "finished") return;
    if (this.time) {
      const {
          motionValue: r,
          onUpdate: c,
          onComplete: f,
          element: d,
          ...m
        } = this.options,
        b = new ef({
          ...m,
          keyframes: a,
          duration: i,
          type: l,
          ease: s,
          times: u,
          isGenerator: !0,
        }),
        S = Be(this.time);
      r.setWithVelocity(b.sample(S - Ls).value, b.sample(S).value, Ls);
    }
    const { onStop: o } = this.options;
    (o && o(), this.cancel());
  }
  complete() {
    const { resolved: e } = this;
    e && e.animation.finish();
  }
  cancel() {
    const { resolved: e } = this;
    e && e.animation.cancel();
  }
  static supports(e) {
    const {
      motionValue: n,
      name: a,
      repeatDelay: i,
      repeatType: l,
      damping: s,
      type: u,
    } = e;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    const { onUpdate: o, transformTemplate: r } = n.owner.getProps();
    return (
      s2() &&
      a &&
      i2.has(a) &&
      !o &&
      !r &&
      !i &&
      l !== "mirror" &&
      s !== 0 &&
      u !== "inertia"
    );
  }
}
const f2 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  d2 = (t) => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  h2 = { type: "keyframes", duration: 0.8 },
  m2 = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  p2 = (t, { keyframes: e }) =>
    e.length > 2
      ? h2
      : Pn.has(t)
        ? t.startsWith("scale")
          ? d2(e[1])
          : f2
        : m2;
function y2({
  when: t,
  delay: e,
  delayChildren: n,
  staggerChildren: a,
  staggerDirection: i,
  repeat: l,
  repeatType: s,
  repeatDelay: u,
  from: o,
  elapsed: r,
  ...c
}) {
  return !!Object.keys(c).length;
}
const nf =
  (t, e, n, a = {}, i, l) =>
  (s) => {
    const u = Yc(a, t) || {},
      o = u.delay || a.delay || 0;
    let { elapsed: r = 0 } = a;
    r = r - Be(o);
    let c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: e.getVelocity(),
      ...u,
      delay: -r,
      onUpdate: (d) => {
        (e.set(d), u.onUpdate && u.onUpdate(d));
      },
      onComplete: () => {
        (s(), u.onComplete && u.onComplete());
      },
      name: t,
      motionValue: e,
      element: l ? void 0 : i,
    };
    (y2(u) || (c = { ...c, ...p2(t, c) }),
      c.duration && (c.duration = Be(c.duration)),
      c.repeatDelay && (c.repeatDelay = Be(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from));
    let f = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        ((c.duration = 0), c.delay === 0 && (f = !0)),
      f && !l && e.get() !== void 0)
    ) {
      const d = cu(c.keyframes, u);
      if (d !== void 0)
        return (
          et.update(() => {
            (c.onUpdate(d), c.onComplete());
          }),
          new VS([])
        );
    }
    return !l && ah.supports(c) ? new ah(c) : new ef(c);
  };
function g2({ protectedKeys: t, needsAnimating: e }, n) {
  const a = t.hasOwnProperty(n) && e[n] !== !0;
  return ((e[n] = !1), a);
}
function ug(t, e, { delay: n = 0, transitionOverride: a, type: i } = {}) {
  var l;
  let { transition: s = t.getDefaultTransition(), transitionEnd: u, ...o } = e;
  a && (s = a);
  const r = [],
    c = i && t.animationState && t.animationState.getState()[i];
  for (const f in o) {
    const d = t.getValue(
        f,
        (l = t.latestValues[f]) !== null && l !== void 0 ? l : null,
      ),
      m = o[f];
    if (m === void 0 || (c && g2(c, f))) continue;
    const b = { delay: n, ...Yc(s || {}, f) };
    let S = !1;
    if (window.MotionHandoffAnimation) {
      const p = Ry(t);
      if (p) {
        const h = window.MotionHandoffAnimation(p, f, et);
        h !== null && ((b.startTime = h), (S = !0));
      }
    }
    (rr(t, f),
      d.start(
        nf(f, d, m, t.shouldReduceMotion && jy.has(f) ? { type: !1 } : b, t, S),
      ));
    const A = d.animation;
    A && r.push(A);
  }
  return (
    u &&
      Promise.all(r).then(() => {
        et.update(() => {
          u && FS(t, u);
        });
      }),
    r
  );
}
function yr(t, e, n = {}) {
  var a;
  const i = ru(
    t,
    e,
    n.type === "exit"
      ? (a = t.presenceContext) === null || a === void 0
        ? void 0
        : a.custom
      : void 0,
  );
  let { transition: l = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (l = n.transitionOverride);
  const s = i ? () => Promise.all(ug(t, i, n)) : () => Promise.resolve(),
    u =
      t.variantChildren && t.variantChildren.size
        ? (r = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: f,
              staggerDirection: d,
            } = l;
            return v2(t, e, c + r, f, d, n);
          }
        : () => Promise.resolve(),
    { when: o } = l;
  if (o) {
    const [r, c] = o === "beforeChildren" ? [s, u] : [u, s];
    return r().then(() => c());
  } else return Promise.all([s(), u(n.delay)]);
}
function v2(t, e, n = 0, a = 0, i = 1, l) {
  const s = [],
    u = (t.variantChildren.size - 1) * a,
    o = i === 1 ? (r = 0) => r * a : (r = 0) => u - r * a;
  return (
    Array.from(t.variantChildren)
      .sort(b2)
      .forEach((r, c) => {
        (r.notify("AnimationStart", e),
          s.push(
            yr(r, e, { ...l, delay: n + o(c) }).then(() =>
              r.notify("AnimationComplete", e),
            ),
          ));
      }),
    Promise.all(s)
  );
}
function b2(t, e) {
  return t.sortNodePosition(e);
}
function S2(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let a;
  if (Array.isArray(e)) {
    const i = e.map((l) => yr(t, l, n));
    a = Promise.all(i);
  } else if (typeof e == "string") a = yr(t, e, n);
  else {
    const i = typeof e == "function" ? ru(t, e, n.custom) : e;
    a = Promise.all(ug(t, i, n));
  }
  return a.then(() => {
    t.notify("AnimationComplete", e);
  });
}
const x2 = jc.length;
function og(t) {
  if (!t) return;
  if (!t.isControllingVariants) {
    const n = t.parent ? og(t.parent) || {} : {};
    return (t.props.initial !== void 0 && (n.initial = t.props.initial), n);
  }
  const e = {};
  for (let n = 0; n < x2; n++) {
    const a = jc[n],
      i = t.props[a];
    (Qi(i) || i === !1) && (e[a] = i);
  }
  return e;
}
const T2 = [...zc].reverse(),
  A2 = zc.length;
function E2(t) {
  return (e) =>
    Promise.all(e.map(({ animation: n, options: a }) => S2(t, n, a)));
}
function M2(t) {
  let e = E2(t),
    n = ih(),
    a = !0;
  const i = (o) => (r, c) => {
    var f;
    const d = ru(
      t,
      c,
      o === "exit"
        ? (f = t.presenceContext) === null || f === void 0
          ? void 0
          : f.custom
        : void 0,
    );
    if (d) {
      const { transition: m, transitionEnd: b, ...S } = d;
      r = { ...r, ...S, ...b };
    }
    return r;
  };
  function l(o) {
    e = o(t);
  }
  function s(o) {
    const { props: r } = t,
      c = og(t.parent) || {},
      f = [],
      d = new Set();
    let m = {},
      b = 1 / 0;
    for (let A = 0; A < A2; A++) {
      const p = T2[A],
        h = n[p],
        y = r[p] !== void 0 ? r[p] : c[p],
        v = Qi(y),
        x = p === o ? h.isActive : null;
      x === !1 && (b = A);
      let C = y === c[p] && y !== r[p] && v;
      if (
        (C && a && t.manuallyAnimateOnMount && (C = !1),
        (h.protectedKeys = { ...m }),
        (!h.isActive && x === null) ||
          (!y && !h.prevProp) ||
          uu(y) ||
          typeof y == "boolean")
      )
        continue;
      const E = D2(h.prevProp, y);
      let D = E || (p === o && h.isActive && !C && v) || (A > b && v),
        N = !1;
      const j = Array.isArray(y) ? y : [y];
      let U = j.reduce(i(p), {});
      x === !1 && (U = {});
      const { prevResolvedValues: yt = {} } = h,
        dl = { ...yt, ...U },
        hl = (R) => {
          ((D = !0),
            d.has(R) && ((N = !0), d.delete(R)),
            (h.needsAnimating[R] = !0));
          const O = t.getValue(R);
          O && (O.liveStyle = !1);
        };
      for (const R in dl) {
        const O = U[R],
          $ = yt[R];
        if (m.hasOwnProperty(R)) continue;
        let lt = !1;
        (sr(O) && sr($) ? (lt = !xy(O, $)) : (lt = O !== $),
          lt
            ? O != null
              ? hl(R)
              : d.add(R)
            : O !== void 0 && d.has(R)
              ? hl(R)
              : (h.protectedKeys[R] = !0));
      }
      ((h.prevProp = y),
        (h.prevResolvedValues = U),
        h.isActive && (m = { ...m, ...U }),
        a && t.blockInitialAnimation && (D = !1),
        D &&
          (!(C && E) || N) &&
          f.push(...j.map((R) => ({ animation: R, options: { type: p } }))));
    }
    if (d.size) {
      const A = {};
      (d.forEach((p) => {
        const h = t.getBaseTarget(p),
          y = t.getValue(p);
        (y && (y.liveStyle = !0), (A[p] = h ?? null));
      }),
        f.push({ animation: A }));
    }
    let S = !!f.length;
    return (
      a &&
        (r.initial === !1 || r.initial === r.animate) &&
        !t.manuallyAnimateOnMount &&
        (S = !1),
      (a = !1),
      S ? e(f) : Promise.resolve()
    );
  }
  function u(o, r) {
    var c;
    if (n[o].isActive === r) return Promise.resolve();
    ((c = t.variantChildren) === null ||
      c === void 0 ||
      c.forEach((d) => {
        var m;
        return (m = d.animationState) === null || m === void 0
          ? void 0
          : m.setActive(o, r);
      }),
      (n[o].isActive = r));
    const f = s(o);
    for (const d in n) n[d].protectedKeys = {};
    return f;
  }
  return {
    animateChanges: s,
    setActive: u,
    setAnimateFunction: l,
    getState: () => n,
    reset: () => {
      ((n = ih()), (a = !0));
    },
  };
}
function D2(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !xy(e, t) : !1;
}
function Dn(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function ih() {
  return {
    animate: Dn(!0),
    whileInView: Dn(),
    whileHover: Dn(),
    whileTap: Dn(),
    whileDrag: Dn(),
    whileFocus: Dn(),
    exit: Dn(),
  };
}
class An {
  constructor(e) {
    ((this.isMounted = !1), (this.node = e));
  }
  update() {}
}
class C2 extends An {
  constructor(e) {
    (super(e), e.animationState || (e.animationState = M2(e)));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    uu(e) && (this.unmountControls = e.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var e;
    (this.node.animationState.reset(),
      (e = this.unmountControls) === null || e === void 0 || e.call(this));
  }
}
let z2 = 0;
class j2 extends An {
  constructor() {
    (super(...arguments), (this.id = z2++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext,
      { isPresent: a } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === a) return;
    const i = this.node.animationState.setActive("exit", !e);
    n && !e && i.then(() => n(this.id));
  }
  mount() {
    const { register: e } = this.node.presenceContext || {};
    e && (this.unmount = e(this.id));
  }
  unmount() {}
}
const N2 = { animation: { Feature: C2 }, exit: { Feature: j2 } };
function Ji(t, e, n, a = { passive: !0 }) {
  return (t.addEventListener(e, n, a), () => t.removeEventListener(e, n));
}
function cl(t) {
  return { point: { x: t.pageX, y: t.pageY } };
}
const R2 = (t) => (e) => Qc(e) && t(e, cl(e));
function Ci(t, e, n, a) {
  return Ji(t, e, R2(n), a);
}
const lh = (t, e) => Math.abs(t - e);
function _2(t, e) {
  const n = lh(t.x, e.x),
    a = lh(t.y, e.y);
  return Math.sqrt(n ** 2 + a ** 2);
}
class rg {
  constructor(
    e,
    n,
    { transformPagePoint: a, contextWindow: i, dragSnapToOrigin: l = !1 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const f = no(this.lastMoveEventInfo, this.history),
          d = this.startEvent !== null,
          m = _2(f.offset, { x: 0, y: 0 }) >= 3;
        if (!d && !m) return;
        const { point: b } = f,
          { timestamp: S } = Tt;
        this.history.push({ ...b, timestamp: S });
        const { onStart: A, onMove: p } = this.handlers;
        (d ||
          (A && A(this.lastMoveEvent, f),
          (this.startEvent = this.lastMoveEvent)),
          p && p(this.lastMoveEvent, f));
      }),
      (this.handlePointerMove = (f, d) => {
        ((this.lastMoveEvent = f),
          (this.lastMoveEventInfo = eo(d, this.transformPagePoint)),
          et.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (f, d) => {
        this.end();
        const { onEnd: m, onSessionEnd: b, resumeAnimation: S } = this.handlers;
        if (
          (this.dragSnapToOrigin && S && S(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const A = no(
          f.type === "pointercancel"
            ? this.lastMoveEventInfo
            : eo(d, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && m && m(f, A), b && b(f, A));
      }),
      !Qc(e))
    )
      return;
    ((this.dragSnapToOrigin = l),
      (this.handlers = n),
      (this.transformPagePoint = a),
      (this.contextWindow = i || window));
    const s = cl(e),
      u = eo(s, this.transformPagePoint),
      { point: o } = u,
      { timestamp: r } = Tt;
    this.history = [{ ...o, timestamp: r }];
    const { onSessionStart: c } = n;
    (c && c(e, no(u, this.history)),
      (this.removeListeners = rl(
        Ci(this.contextWindow, "pointermove", this.handlePointerMove),
        Ci(this.contextWindow, "pointerup", this.handlePointerUp),
        Ci(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    (this.removeListeners && this.removeListeners(), bn(this.updatePoint));
  }
}
function eo(t, e) {
  return e ? { point: e(t.point) } : t;
}
function sh(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function no({ point: t }, e) {
  return {
    point: t,
    delta: sh(t, cg(e)),
    offset: sh(t, O2(e)),
    velocity: w2(e, 0.1),
  };
}
function O2(t) {
  return t[0];
}
function cg(t) {
  return t[t.length - 1];
}
function w2(t, e) {
  if (t.length < 2) return { x: 0, y: 0 };
  let n = t.length - 1,
    a = null;
  const i = cg(t);
  for (; n >= 0 && ((a = t[n]), !(i.timestamp - a.timestamp > Be(e))); ) n--;
  if (!a) return { x: 0, y: 0 };
  const l = Le(i.timestamp - a.timestamp);
  if (l === 0) return { x: 0, y: 0 };
  const s = { x: (i.x - a.x) / l, y: (i.y - a.y) / l };
  return (s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s);
}
const fg = 1e-4,
  V2 = 1 - fg,
  U2 = 1 + fg,
  dg = 0.01,
  B2 = 0 - dg,
  L2 = 0 + dg;
function Wt(t) {
  return t.max - t.min;
}
function H2(t, e, n) {
  return Math.abs(t - e) <= n;
}
function uh(t, e, n, a = 0.5) {
  ((t.origin = a),
    (t.originPoint = it(e.min, e.max, t.origin)),
    (t.scale = Wt(n) / Wt(e)),
    (t.translate = it(n.min, n.max, t.origin) - t.originPoint),
    ((t.scale >= V2 && t.scale <= U2) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= B2 && t.translate <= L2) || isNaN(t.translate)) &&
      (t.translate = 0));
}
function zi(t, e, n, a) {
  (uh(t.x, e.x, n.x, a ? a.originX : void 0),
    uh(t.y, e.y, n.y, a ? a.originY : void 0));
}
function oh(t, e, n) {
  ((t.min = n.min + e.min), (t.max = t.min + Wt(e)));
}
function q2(t, e, n) {
  (oh(t.x, e.x, n.x), oh(t.y, e.y, n.y));
}
function rh(t, e, n) {
  ((t.min = e.min - n.min), (t.max = t.min + Wt(e)));
}
function ji(t, e, n) {
  (rh(t.x, e.x, n.x), rh(t.y, e.y, n.y));
}
function Y2(t, { min: e, max: n }, a) {
  return (
    e !== void 0 && t < e
      ? (t = a ? it(e, t, a.min) : Math.max(t, e))
      : n !== void 0 && t > n && (t = a ? it(n, t, a.max) : Math.min(t, n)),
    t
  );
}
function ch(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0,
  };
}
function G2(t, { top: e, left: n, bottom: a, right: i }) {
  return { x: ch(t.x, n, i), y: ch(t.y, e, a) };
}
function fh(t, e) {
  let n = e.min - t.min,
    a = e.max - t.max;
  return (
    e.max - e.min < t.max - t.min && ([n, a] = [a, n]),
    { min: n, max: a }
  );
}
function X2(t, e) {
  return { x: fh(t.x, e.x), y: fh(t.y, e.y) };
}
function Q2(t, e) {
  let n = 0.5;
  const a = Wt(t),
    i = Wt(e);
  return (
    i > a
      ? (n = Ba(e.min, e.max - a, t.min))
      : a > i && (n = Ba(t.min, t.max - i, e.min)),
    Qe(0, 1, n)
  );
}
function K2(t, e) {
  const n = {};
  return (
    e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
  );
}
const gr = 0.35;
function Z2(t = gr) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = gr),
    { x: dh(t, "left", "right"), y: dh(t, "top", "bottom") }
  );
}
function dh(t, e, n) {
  return { min: hh(t, e), max: hh(t, n) };
}
function hh(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const mh = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  ya = () => ({ x: mh(), y: mh() }),
  ph = () => ({ min: 0, max: 0 }),
  rt = () => ({ x: ph(), y: ph() });
function ee(t) {
  return [t("x"), t("y")];
}
function hg({ top: t, left: e, right: n, bottom: a }) {
  return { x: { min: e, max: n }, y: { min: t, max: a } };
}
function k2({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function J2(t, e) {
  if (!e) return t;
  const n = e({ x: t.left, y: t.top }),
    a = e({ x: t.right, y: t.bottom });
  return { top: n.y, left: n.x, bottom: a.y, right: a.x };
}
function ao(t) {
  return t === void 0 || t === 1;
}
function vr({ scale: t, scaleX: e, scaleY: n }) {
  return !ao(t) || !ao(e) || !ao(n);
}
function Rn(t) {
  return (
    vr(t) ||
    mg(t) ||
    t.z ||
    t.rotate ||
    t.rotateX ||
    t.rotateY ||
    t.skewX ||
    t.skewY
  );
}
function mg(t) {
  return yh(t.x) || yh(t.y);
}
function yh(t) {
  return t && t !== "0%";
}
function Hs(t, e, n) {
  const a = t - n,
    i = e * a;
  return n + i;
}
function gh(t, e, n, a, i) {
  return (i !== void 0 && (t = Hs(t, i, a)), Hs(t, n, a) + e);
}
function br(t, e = 0, n = 1, a, i) {
  ((t.min = gh(t.min, e, n, a, i)), (t.max = gh(t.max, e, n, a, i)));
}
function pg(t, { x: e, y: n }) {
  (br(t.x, e.translate, e.scale, e.originPoint),
    br(t.y, n.translate, n.scale, n.originPoint));
}
const vh = 0.999999999999,
  bh = 1.0000000000001;
function F2(t, e, n, a = !1) {
  const i = n.length;
  if (!i) return;
  e.x = e.y = 1;
  let l, s;
  for (let u = 0; u < i; u++) {
    ((l = n[u]), (s = l.projectionDelta));
    const { visualElement: o } = l.options;
    (o && o.props.style && o.props.style.display === "contents") ||
      (a &&
        l.options.layoutScroll &&
        l.scroll &&
        l !== l.root &&
        va(t, { x: -l.scroll.offset.x, y: -l.scroll.offset.y }),
      s && ((e.x *= s.x.scale), (e.y *= s.y.scale), pg(t, s)),
      a && Rn(l.latestValues) && va(t, l.latestValues));
  }
  (e.x < bh && e.x > vh && (e.x = 1), e.y < bh && e.y > vh && (e.y = 1));
}
function ga(t, e) {
  ((t.min = t.min + e), (t.max = t.max + e));
}
function Sh(t, e, n, a, i = 0.5) {
  const l = it(t.min, t.max, i);
  br(t, e, n, l, a);
}
function va(t, e) {
  (Sh(t.x, e.x, e.scaleX, e.scale, e.originX),
    Sh(t.y, e.y, e.scaleY, e.scale, e.originY));
}
function yg(t, e) {
  return hg(J2(t.getBoundingClientRect(), e));
}
function P2(t, e, n) {
  const a = yg(t, n),
    { scroll: i } = e;
  return (i && (ga(a.x, i.offset.x), ga(a.y, i.offset.y)), a);
}
const gg = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  $2 = new WeakMap();
class W2 {
  constructor(e) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = rt()),
      (this.visualElement = e));
  }
  start(e, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: a } = this.visualElement;
    if (a && a.isPresent === !1) return;
    const i = (c) => {
        const { dragSnapToOrigin: f } = this.getProps();
        (f ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(cl(c).point));
      },
      l = (c, f) => {
        const { drag: d, dragPropagation: m, onDragStart: b } = this.getProps();
        if (
          d &&
          !m &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = QS(d)),
          !this.openDragLock)
        )
          return;
        ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          ee((A) => {
            let p = this.getAxisMotionValue(A).get() || 0;
            if (Se.test(p)) {
              const { projection: h } = this.visualElement;
              if (h && h.layout) {
                const y = h.layout.layoutBox[A];
                y && (p = Wt(y) * (parseFloat(p) / 100));
              }
            }
            this.originPoint[A] = p;
          }),
          b && et.postRender(() => b(c, f)),
          rr(this.visualElement, "transform"));
        const { animationState: S } = this.visualElement;
        S && S.setActive("whileDrag", !0);
      },
      s = (c, f) => {
        const {
          dragPropagation: d,
          dragDirectionLock: m,
          onDirectionLock: b,
          onDrag: S,
        } = this.getProps();
        if (!d && !this.openDragLock) return;
        const { offset: A } = f;
        if (m && this.currentDirection === null) {
          ((this.currentDirection = I2(A)),
            this.currentDirection !== null && b && b(this.currentDirection));
          return;
        }
        (this.updateAxis("x", f.point, A),
          this.updateAxis("y", f.point, A),
          this.visualElement.render(),
          S && S(c, f));
      },
      u = (c, f) => this.stop(c, f),
      o = () =>
        ee((c) => {
          var f;
          return (
            this.getAnimationState(c) === "paused" &&
            ((f = this.getAxisMotionValue(c).animation) === null || f === void 0
              ? void 0
              : f.play())
          );
        }),
      { dragSnapToOrigin: r } = this.getProps();
    this.panSession = new rg(
      e,
      {
        onSessionStart: i,
        onStart: l,
        onMove: s,
        onSessionEnd: u,
        resumeAnimation: o,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: r,
        contextWindow: gg(this.visualElement),
      },
    );
  }
  stop(e, n) {
    const a = this.isDragging;
    if ((this.cancel(), !a)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: l } = this.getProps();
    l && et.postRender(() => l(e, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    (e && (e.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: a } = this.getProps();
    (!a &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1));
  }
  updateAxis(e, n, a) {
    const { drag: i } = this.getProps();
    if (!a || !Bl(e, i, this.currentDirection)) return;
    const l = this.getAxisMotionValue(e);
    let s = this.originPoint[e] + a[e];
    (this.constraints &&
      this.constraints[e] &&
      (s = Y2(s, this.constraints[e], this.elastic[e])),
      l.set(s));
  }
  resolveConstraints() {
    var e;
    const { dragConstraints: n, dragElastic: a } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (e = this.visualElement.projection) === null || e === void 0
            ? void 0
            : e.layout,
      l = this.constraints;
    (n && ma(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
        ? (this.constraints = G2(i.layoutBox, n))
        : (this.constraints = !1),
      (this.elastic = Z2(a)),
      l !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        ee((s) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(s) &&
            (this.constraints[s] = K2(i.layoutBox[s], this.constraints[s]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !ma(e)) return !1;
    const a = e.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const l = P2(a, i.root, this.visualElement.getTransformPagePoint());
    let s = X2(i.layout.layoutBox, l);
    if (n) {
      const u = n(k2(s));
      ((this.hasMutatedConstraints = !!u), u && (s = hg(u)));
    }
    return s;
  }
  startAnimation(e) {
    const {
        drag: n,
        dragMomentum: a,
        dragElastic: i,
        dragTransition: l,
        dragSnapToOrigin: s,
        onDragTransitionEnd: u,
      } = this.getProps(),
      o = this.constraints || {},
      r = ee((c) => {
        if (!Bl(c, n, this.currentDirection)) return;
        let f = (o && o[c]) || {};
        s && (f = { min: 0, max: 0 });
        const d = i ? 200 : 1e6,
          m = i ? 40 : 1e7,
          b = {
            type: "inertia",
            velocity: a ? e[c] : 0,
            bounceStiffness: d,
            bounceDamping: m,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...l,
            ...f,
          };
        return this.startAxisValueAnimation(c, b);
      });
    return Promise.all(r).then(u);
  }
  startAxisValueAnimation(e, n) {
    const a = this.getAxisMotionValue(e);
    return (
      rr(this.visualElement, e),
      a.start(nf(e, a, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    ee((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    ee((e) => {
      var n;
      return (n = this.getAxisMotionValue(e).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(e) {
    var n;
    return (n = this.getAxisMotionValue(e).animation) === null || n === void 0
      ? void 0
      : n.state;
  }
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`,
      a = this.visualElement.getProps(),
      i = a[n];
    return (
      i ||
      this.visualElement.getValue(e, (a.initial ? a.initial[e] : void 0) || 0)
    );
  }
  snapToCursor(e) {
    ee((n) => {
      const { drag: a } = this.getProps();
      if (!Bl(n, a, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        l = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: s, max: u } = i.layout.layoutBox[n];
        l.set(e[n] - it(s, u, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: e, dragConstraints: n } = this.getProps(),
      { projection: a } = this.visualElement;
    if (!ma(n) || !a || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    ee((s) => {
      const u = this.getAxisMotionValue(s);
      if (u && this.constraints !== !1) {
        const o = u.get();
        i[s] = Q2({ min: o, max: o }, this.constraints[s]);
      }
    });
    const { transformTemplate: l } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = l ? l({}, "") : "none"),
      a.root && a.root.updateScroll(),
      a.updateLayout(),
      this.resolveConstraints(),
      ee((s) => {
        if (!Bl(s, e, null)) return;
        const u = this.getAxisMotionValue(s),
          { min: o, max: r } = this.constraints[s];
        u.set(it(o, r, i[s]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    $2.set(this.visualElement, this);
    const e = this.visualElement.current,
      n = Ci(e, "pointerdown", (o) => {
        const { drag: r, dragListener: c = !0 } = this.getProps();
        r && c && this.start(o);
      }),
      a = () => {
        const { dragConstraints: o } = this.getProps();
        ma(o) && o.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      l = i.addEventListener("measure", a);
    (i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
      et.read(a));
    const s = Ji(window, "resize", () => this.scalePositionWithinConstraints()),
      u = i.addEventListener(
        "didUpdate",
        ({ delta: o, hasLayoutChanged: r }) => {
          this.isDragging &&
            r &&
            (ee((c) => {
              const f = this.getAxisMotionValue(c);
              f &&
                ((this.originPoint[c] += o[c].translate),
                f.set(f.get() + o[c].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      (s(), n(), l(), u && u());
    };
  }
  getProps() {
    const e = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: a = !1,
        dragPropagation: i = !1,
        dragConstraints: l = !1,
        dragElastic: s = gr,
        dragMomentum: u = !0,
      } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: a,
      dragPropagation: i,
      dragConstraints: l,
      dragElastic: s,
      dragMomentum: u,
    };
  }
}
function Bl(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function I2(t, e = 10) {
  let n = null;
  return (Math.abs(t.y) > e ? (n = "y") : Math.abs(t.x) > e && (n = "x"), n);
}
class tT extends An {
  constructor(e) {
    (super(e),
      (this.removeGroupControls = Ft),
      (this.removeListeners = Ft),
      (this.controls = new W2(e)));
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    (e && (this.removeGroupControls = e.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Ft));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const xh = (t) => (e, n) => {
  t && et.postRender(() => t(e, n));
};
class eT extends An {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = Ft));
  }
  onPointerDown(e) {
    this.session = new rg(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: gg(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: e,
      onPanStart: n,
      onPan: a,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: xh(e),
      onStart: xh(n),
      onMove: a,
      onEnd: (l, s) => {
        (delete this.session, i && et.postRender(() => i(l, s)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Ci(this.node.current, "pointerdown", (e) =>
      this.onPointerDown(e),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const ns = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Th(t, e) {
  return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
}
const ai = {
    correct: (t, e) => {
      if (!e.target) return t;
      if (typeof t == "string")
        if (_.test(t)) t = parseFloat(t);
        else return t;
      const n = Th(t, e.target.x),
        a = Th(t, e.target.y);
      return `${n}% ${a}%`;
    },
  },
  nT = {
    correct: (t, { treeScale: e, projectionDelta: n }) => {
      const a = t,
        i = Sn.parse(t);
      if (i.length > 5) return a;
      const l = Sn.createTransformer(t),
        s = typeof i[0] != "number" ? 1 : 0,
        u = n.x.scale * e.x,
        o = n.y.scale * e.y;
      ((i[0 + s] /= u), (i[1 + s] /= o));
      const r = it(u, o, 0.5);
      return (
        typeof i[2 + s] == "number" && (i[2 + s] /= r),
        typeof i[3 + s] == "number" && (i[3 + s] /= r),
        l(i)
      );
    },
  };
class aT extends M.Component {
  componentDidMount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: a,
        layoutId: i,
      } = this.props,
      { projection: l } = e;
    (AS(iT),
      l &&
        (n.group && n.group.add(l),
        a && a.register && i && a.register(l),
        l.root.didUpdate(),
        l.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        l.setOptions({
          ...l.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (ns.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(e) {
    const {
        layoutDependency: n,
        visualElement: a,
        drag: i,
        isPresent: l,
      } = this.props,
      s = a.projection;
    return (
      s &&
        ((s.isPresent = l),
        i || e.layoutDependency !== n || n === void 0
          ? s.willUpdate()
          : this.safeToRemove(),
        e.isPresent !== l &&
          (l
            ? s.promote()
            : s.relegate() ||
              et.postRender(() => {
                const u = s.getStack();
                (!u || !u.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e &&
      (e.root.didUpdate(),
      Rc.postRender(() => {
        !e.currentAnimation && e.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: a,
      } = this.props,
      { projection: i } = e;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      a && a.deregister && a.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function vg(t) {
  const [e, n] = ty(),
    a = M.useContext(Ac);
  return g.jsx(aT, {
    ...t,
    layoutGroup: a,
    switchLayoutGroup: M.useContext(oy),
    isPresent: e,
    safeToRemove: n,
  });
}
const iT = {
  borderRadius: {
    ...ai,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: ai,
  borderTopRightRadius: ai,
  borderBottomLeftRadius: ai,
  borderBottomRightRadius: ai,
  boxShadow: nT,
};
function lT(t, e, n) {
  const a = Nt(t) ? t : Zi(t);
  return (a.start(nf("", a, e, n)), a.animation);
}
function sT(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const uT = (t, e) => t.depth - e.depth;
class oT {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(e) {
    (Kc(this.children, e), (this.isDirty = !0));
  }
  remove(e) {
    (Zc(this.children, e), (this.isDirty = !0));
  }
  forEach(e) {
    (this.isDirty && this.children.sort(uT),
      (this.isDirty = !1),
      this.children.forEach(e));
  }
}
function rT(t, e) {
  const n = xe.now(),
    a = ({ timestamp: i }) => {
      const l = i - n;
      l >= e && (bn(a), t(l - e));
    };
  return (et.read(a, !0), () => bn(a));
}
const bg = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  cT = bg.length,
  Ah = (t) => (typeof t == "string" ? parseFloat(t) : t),
  Eh = (t) => typeof t == "number" || _.test(t);
function fT(t, e, n, a, i, l) {
  i
    ? ((t.opacity = it(0, n.opacity !== void 0 ? n.opacity : 1, dT(a))),
      (t.opacityExit = it(e.opacity !== void 0 ? e.opacity : 1, 0, hT(a))))
    : l &&
      (t.opacity = it(
        e.opacity !== void 0 ? e.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        a,
      ));
  for (let s = 0; s < cT; s++) {
    const u = `border${bg[s]}Radius`;
    let o = Mh(e, u),
      r = Mh(n, u);
    if (o === void 0 && r === void 0) continue;
    (o || (o = 0),
      r || (r = 0),
      o === 0 || r === 0 || Eh(o) === Eh(r)
        ? ((t[u] = Math.max(it(Ah(o), Ah(r), a), 0)),
          (Se.test(r) || Se.test(o)) && (t[u] += "%"))
        : (t[u] = r));
  }
  (e.rotate || n.rotate) && (t.rotate = it(e.rotate || 0, n.rotate || 0, a));
}
function Mh(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const dT = Sg(0, 0.5, Ly),
  hT = Sg(0.5, 0.95, Ft);
function Sg(t, e, n) {
  return (a) => (a < t ? 0 : a > e ? 1 : n(Ba(t, e, a)));
}
function Dh(t, e) {
  ((t.min = e.min), (t.max = e.max));
}
function te(t, e) {
  (Dh(t.x, e.x), Dh(t.y, e.y));
}
function Ch(t, e) {
  ((t.translate = e.translate),
    (t.scale = e.scale),
    (t.originPoint = e.originPoint),
    (t.origin = e.origin));
}
function zh(t, e, n, a, i) {
  return (
    (t -= e),
    (t = Hs(t, 1 / n, a)),
    i !== void 0 && (t = Hs(t, 1 / i, a)),
    t
  );
}
function mT(t, e = 0, n = 1, a = 0.5, i, l = t, s = t) {
  if (
    (Se.test(e) &&
      ((e = parseFloat(e)), (e = it(s.min, s.max, e / 100) - s.min)),
    typeof e != "number")
  )
    return;
  let u = it(l.min, l.max, a);
  (t === l && (u -= e),
    (t.min = zh(t.min, e, n, u, i)),
    (t.max = zh(t.max, e, n, u, i)));
}
function jh(t, e, [n, a, i], l, s) {
  mT(t, e[n], e[a], e[i], e.scale, l, s);
}
const pT = ["x", "scaleX", "originX"],
  yT = ["y", "scaleY", "originY"];
function Nh(t, e, n, a) {
  (jh(t.x, e, pT, n ? n.x : void 0, a ? a.x : void 0),
    jh(t.y, e, yT, n ? n.y : void 0, a ? a.y : void 0));
}
function Rh(t) {
  return t.translate === 0 && t.scale === 1;
}
function xg(t) {
  return Rh(t.x) && Rh(t.y);
}
function _h(t, e) {
  return t.min === e.min && t.max === e.max;
}
function gT(t, e) {
  return _h(t.x, e.x) && _h(t.y, e.y);
}
function Oh(t, e) {
  return (
    Math.round(t.min) === Math.round(e.min) &&
    Math.round(t.max) === Math.round(e.max)
  );
}
function Tg(t, e) {
  return Oh(t.x, e.x) && Oh(t.y, e.y);
}
function wh(t) {
  return Wt(t.x) / Wt(t.y);
}
function Vh(t, e) {
  return (
    t.translate === e.translate &&
    t.scale === e.scale &&
    t.originPoint === e.originPoint
  );
}
class vT {
  constructor() {
    this.members = [];
  }
  add(e) {
    (Kc(this.members, e), e.scheduleRender());
  }
  remove(e) {
    if (
      (Zc(this.members, e),
      e === this.prevLead && (this.prevLead = void 0),
      e === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((i) => e === i);
    if (n === 0) return !1;
    let a;
    for (let i = n; i >= 0; i--) {
      const l = this.members[i];
      if (l.isPresent !== !1) {
        a = l;
        break;
      }
    }
    return a ? (this.promote(a), !0) : !1;
  }
  promote(e, n) {
    const a = this.lead;
    if (e !== a && ((this.prevLead = a), (this.lead = e), e.show(), a)) {
      (a.instance && a.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = a),
        n && (e.resumeFrom.preserveOpacity = !0),
        a.snapshot &&
          ((e.snapshot = a.snapshot),
          (e.snapshot.latestValues = a.animationValues || a.latestValues)),
        e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
      const { crossfade: i } = e.options;
      i === !1 && a.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: a } = e;
      (n.onExitComplete && n.onExitComplete(),
        a && a.options.onExitComplete && a.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function bT(t, e, n) {
  let a = "";
  const i = t.x.translate / e.x,
    l = t.y.translate / e.y,
    s = (n == null ? void 0 : n.z) || 0;
  if (
    ((i || l || s) && (a = `translate3d(${i}px, ${l}px, ${s}px) `),
    (e.x !== 1 || e.y !== 1) && (a += `scale(${1 / e.x}, ${1 / e.y}) `),
    n)
  ) {
    const {
      transformPerspective: r,
      rotate: c,
      rotateX: f,
      rotateY: d,
      skewX: m,
      skewY: b,
    } = n;
    (r && (a = `perspective(${r}px) ${a}`),
      c && (a += `rotate(${c}deg) `),
      f && (a += `rotateX(${f}deg) `),
      d && (a += `rotateY(${d}deg) `),
      m && (a += `skewX(${m}deg) `),
      b && (a += `skewY(${b}deg) `));
  }
  const u = t.x.scale * e.x,
    o = t.y.scale * e.y;
  return ((u !== 1 || o !== 1) && (a += `scale(${u}, ${o})`), a || "none");
}
const _n = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  fi = typeof window < "u" && window.MotionDebug !== void 0,
  io = ["", "X", "Y", "Z"],
  ST = { visibility: "hidden" },
  Uh = 1e3;
let xT = 0;
function lo(t, e, n, a) {
  const { latestValues: i } = e;
  i[t] && ((n[t] = i[t]), e.setStaticValue(t, 0), a && (a[t] = 0));
}
function Ag(t) {
  if (((t.hasCheckedOptimisedAppear = !0), t.root === t)) return;
  const { visualElement: e } = t.options;
  if (!e) return;
  const n = Ry(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: l } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", et, !(i || l));
  }
  const { parent: a } = t;
  a && !a.hasCheckedOptimisedAppear && Ag(a);
}
function Eg({
  attachResizeListener: t,
  defaultParent: e,
  measureScroll: n,
  checkIsScrollRoot: a,
  resetTransform: i,
}) {
  return class {
    constructor(s = {}, u = e == null ? void 0 : e()) {
      ((this.id = xT++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            fi &&
              (_n.totalNodes =
                _n.resolvedTargetDeltas =
                _n.recalculatedProjection =
                  0),
            this.nodes.forEach(ET),
            this.nodes.forEach(jT),
            this.nodes.forEach(NT),
            this.nodes.forEach(MT),
            fi && window.MotionDebug.record(_n));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = u ? u.root || u : this),
        (this.path = u ? [...u.path, u] : []),
        (this.parent = u),
        (this.depth = u ? u.depth + 1 : 0));
      for (let o = 0; o < this.path.length; o++)
        this.path[o].shouldResetTransform = !0;
      this.root === this && (this.nodes = new oT());
    }
    addEventListener(s, u) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new kc()),
        this.eventHandlers.get(s).add(u)
      );
    }
    notifyListeners(s, ...u) {
      const o = this.eventHandlers.get(s);
      o && o.notify(...u);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    mount(s, u = this.root.hasTreeAnimated) {
      if (this.instance) return;
      ((this.isSVG = sT(s)), (this.instance = s));
      const { layoutId: o, layout: r, visualElement: c } = this.options;
      if (
        (c && !c.current && c.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        u && (r || o) && (this.isLayoutDirty = !0),
        t)
      ) {
        let f;
        const d = () => (this.root.updateBlockedByResize = !1);
        t(s, () => {
          ((this.root.updateBlockedByResize = !0),
            f && f(),
            (f = rT(d, 250)),
            ns.hasAnimatedSinceResize &&
              ((ns.hasAnimatedSinceResize = !1), this.nodes.forEach(Lh)));
        });
      }
      (o && this.root.registerSharedNode(o, this),
        this.options.animate !== !1 &&
          c &&
          (o || r) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: f,
              hasLayoutChanged: d,
              hasRelativeTargetChanged: m,
              layout: b,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const S =
                  this.options.transition || c.getDefaultTransition() || VT,
                { onLayoutAnimationStart: A, onLayoutAnimationComplete: p } =
                  c.getProps(),
                h = !this.targetLayout || !Tg(this.targetLayout, b) || m,
                y = !d && m;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                y ||
                (d && (h || !this.currentAnimation))
              ) {
                (this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(f, y));
                const v = { ...Yc(S, "layout"), onPlay: A, onComplete: p };
                ((c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((v.delay = 0), (v.type = !1)),
                  this.startAnimation(v));
              } else
                (d || Lh(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              this.targetLayout = b;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const s = this.getStack();
      (s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        bn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(RT),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          Ag(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        ((f.shouldResetTransform = !0),
          f.updateScroll("snapshot"),
          f.options.layoutRoot && f.willUpdate(!1));
      }
      const { layoutId: u, layout: o } = this.options;
      if (u === void 0 && !o) return;
      const r = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = r
        ? r(this.latestValues, "")
        : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(Bh));
        return;
      }
      (this.isUpdating || this.nodes.forEach(CT),
        (this.isUpdating = !1),
        this.nodes.forEach(zT),
        this.nodes.forEach(TT),
        this.nodes.forEach(AT),
        this.clearAllSnapshots());
      const u = xe.now();
      ((Tt.delta = Qe(0, 1e3 / 60, u - Tt.timestamp)),
        (Tt.timestamp = u),
        (Tt.isProcessing = !0),
        Fu.update.process(Tt),
        Fu.preRender.process(Tt),
        Fu.render.process(Tt),
        (Tt.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Rc.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(DT), this.sharedNodes.forEach(_T));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        et.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      et.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let o = 0; o < this.path.length; o++) this.path[o].updateScroll();
      const s = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = rt()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: u } = this.options;
      u &&
        u.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          s ? s.layoutBox : void 0,
        );
    }
    updateScroll(s = "measure") {
      let u = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === s &&
          (u = !1),
        u)
      ) {
        const o = a(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: o,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : o,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const s =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        u = this.projectionDelta && !xg(this.projectionDelta),
        o = this.getTransformTemplate(),
        r = o ? o(this.latestValues, "") : void 0,
        c = r !== this.prevTransformTemplateValue;
      s &&
        (u || Rn(this.latestValues) || c) &&
        (i(this.instance, r),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(s = !0) {
      const u = this.measurePageBox();
      let o = this.removeElementScroll(u);
      return (
        s && (o = this.removeTransform(o)),
        UT(o),
        {
          animationId: this.root.animationId,
          measuredBox: u,
          layoutBox: o,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var s;
      const { visualElement: u } = this.options;
      if (!u) return rt();
      const o = u.measureViewportBox();
      if (
        !(
          ((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) ||
          this.path.some(BT)
        )
      ) {
        const { scroll: c } = this.root;
        c && (ga(o.x, c.offset.x), ga(o.y, c.offset.y));
      }
      return o;
    }
    removeElementScroll(s) {
      var u;
      const o = rt();
      if (
        (te(o, s), !((u = this.scroll) === null || u === void 0) && u.wasRoot)
      )
        return o;
      for (let r = 0; r < this.path.length; r++) {
        const c = this.path[r],
          { scroll: f, options: d } = c;
        c !== this.root &&
          f &&
          d.layoutScroll &&
          (f.wasRoot && te(o, s), ga(o.x, f.offset.x), ga(o.y, f.offset.y));
      }
      return o;
    }
    applyTransform(s, u = !1) {
      const o = rt();
      te(o, s);
      for (let r = 0; r < this.path.length; r++) {
        const c = this.path[r];
        (!u &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          va(o, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          Rn(c.latestValues) && va(o, c.latestValues));
      }
      return (Rn(this.latestValues) && va(o, this.latestValues), o);
    }
    removeTransform(s) {
      const u = rt();
      te(u, s);
      for (let o = 0; o < this.path.length; o++) {
        const r = this.path[o];
        if (!r.instance || !Rn(r.latestValues)) continue;
        vr(r.latestValues) && r.updateSnapshot();
        const c = rt(),
          f = r.measurePageBox();
        (te(c, f),
          Nh(u, r.latestValues, r.snapshot ? r.snapshot.layoutBox : void 0, c));
      }
      return (Rn(this.latestValues) && Nh(u, this.latestValues), u);
    }
    setTargetDelta(s) {
      ((this.targetDelta = s),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Tt.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(s = !1) {
      var u;
      const o = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = o.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = o.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = o.isSharedProjectionDirty));
      const r = !!this.resumingFrom || this !== o;
      if (
        !(
          s ||
          (r && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((u = this.parent) === null || u === void 0) &&
            u.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: f, layoutId: d } = this.options;
      if (!(!this.layout || !(f || d))) {
        if (
          ((this.resolvedRelativeTargetAt = Tt.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const m = this.getClosestProjectingParent();
          m && m.layout && this.animationProgress !== 1
            ? ((this.relativeParent = m),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = rt()),
              (this.relativeTargetOrigin = rt()),
              ji(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                m.layout.layoutBox,
              ),
              te(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = rt()), (this.targetWithTransforms = rt())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                q2(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target,
                ))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : te(this.target, this.layout.layoutBox),
                  pg(this.target, this.targetDelta))
                : te(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const m = this.getClosestProjectingParent();
            m &&
            !!m.resumingFrom == !!this.resumingFrom &&
            !m.options.layoutScroll &&
            m.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = m),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = rt()),
                (this.relativeTargetOrigin = rt()),
                ji(this.relativeTargetOrigin, this.target, m.target),
                te(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          fi && _n.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          vr(this.parent.latestValues) ||
          mg(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var s;
      const u = this.getLead(),
        o = !!this.resumingFrom || this !== u;
      let r = !0;
      if (
        ((this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) &&
            s.isProjectionDirty)) &&
          (r = !1),
        o &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (r = !1),
        this.resolvedRelativeTargetAt === Tt.timestamp && (r = !1),
        r)
      )
        return;
      const { layout: c, layoutId: f } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || f))
      )
        return;
      te(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x,
        m = this.treeScale.y;
      (F2(this.layoutCorrected, this.treeScale, this.path, o),
        u.layout &&
          !u.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((u.target = u.layout.layoutBox), (u.targetWithTransforms = rt())));
      const { target: b } = u;
      if (!b) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Ch(this.prevProjectionDelta.x, this.projectionDelta.x),
          Ch(this.prevProjectionDelta.y, this.projectionDelta.y)),
        zi(this.projectionDelta, this.layoutCorrected, b, this.latestValues),
        (this.treeScale.x !== d ||
          this.treeScale.y !== m ||
          !Vh(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Vh(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", b)),
        fi && _n.recalculatedProjection++);
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      var u;
      if (
        ((u = this.options.visualElement) === null ||
          u === void 0 ||
          u.scheduleRender(),
        s)
      ) {
        const o = this.getStack();
        o && o.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = ya()),
        (this.projectionDelta = ya()),
        (this.projectionDeltaWithTransform = ya()));
    }
    setAnimationOrigin(s, u = !1) {
      const o = this.snapshot,
        r = o ? o.latestValues : {},
        c = { ...this.latestValues },
        f = ya();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !u));
      const d = rt(),
        m = o ? o.source : void 0,
        b = this.layout ? this.layout.source : void 0,
        S = m !== b,
        A = this.getStack(),
        p = !A || A.members.length <= 1,
        h = !!(S && !p && this.options.crossfade === !0 && !this.path.some(wT));
      this.animationProgress = 0;
      let y;
      ((this.mixTargetDelta = (v) => {
        const x = v / 1e3;
        (Hh(f.x, s.x, x),
          Hh(f.y, s.y, x),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (ji(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            OT(this.relativeTarget, this.relativeTargetOrigin, d, x),
            y && gT(this.relativeTarget, y) && (this.isProjectionDirty = !1),
            y || (y = rt()),
            te(y, this.relativeTarget)),
          S &&
            ((this.animationValues = c), fT(c, r, this.latestValues, x, h, p)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = x));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(s) {
      (this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (bn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = et.update(() => {
          ((ns.hasAnimatedSinceResize = !0),
            (this.currentAnimation = lT(0, Uh, {
              ...s,
              onUpdate: (u) => {
                (this.mixTargetDelta(u), s.onUpdate && s.onUpdate(u));
              },
              onComplete: () => {
                (s.onComplete && s.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const s = this.getStack();
      (s && s.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Uh),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let {
        targetWithTransforms: u,
        target: o,
        layout: r,
        latestValues: c,
      } = s;
      if (!(!u || !o || !r)) {
        if (
          this !== s &&
          this.layout &&
          r &&
          Mg(this.options.animationType, this.layout.layoutBox, r.layoutBox)
        ) {
          o = this.target || rt();
          const f = Wt(this.layout.layoutBox.x);
          ((o.x.min = s.target.x.min), (o.x.max = o.x.min + f));
          const d = Wt(this.layout.layoutBox.y);
          ((o.y.min = s.target.y.min), (o.y.max = o.y.min + d));
        }
        (te(u, o),
          va(u, c),
          zi(this.projectionDeltaWithTransform, this.layoutCorrected, u, c));
      }
    }
    registerSharedNode(s, u) {
      (this.sharedNodes.has(s) || this.sharedNodes.set(s, new vT()),
        this.sharedNodes.get(s).add(u));
      const r = u.options.initialPromotionConfig;
      u.promote({
        transition: r ? r.transition : void 0,
        preserveFollowOpacity:
          r && r.shouldPreserveFollowOpacity
            ? r.shouldPreserveFollowOpacity(u)
            : void 0,
      });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      const { layoutId: u } = this.options;
      return u
        ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var s;
      const { layoutId: u } = this.options;
      return u
        ? (s = this.getStack()) === null || s === void 0
          ? void 0
          : s.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: s } = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: u, preserveFollowOpacity: o } = {}) {
      const r = this.getStack();
      (r && r.promote(this, o),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        u && this.setOptions({ transition: u }));
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options;
      if (!s) return;
      let u = !1;
      const { latestValues: o } = s;
      if (
        ((o.z ||
          o.rotate ||
          o.rotateX ||
          o.rotateY ||
          o.rotateZ ||
          o.skewX ||
          o.skewY) &&
          (u = !0),
        !u)
      )
        return;
      const r = {};
      o.z && lo("z", s, r, this.animationValues);
      for (let c = 0; c < io.length; c++)
        (lo(`rotate${io[c]}`, s, r, this.animationValues),
          lo(`skew${io[c]}`, s, r, this.animationValues));
      s.render();
      for (const c in r)
        (s.setStaticValue(c, r[c]),
          this.animationValues && (this.animationValues[c] = r[c]));
      s.scheduleRender();
    }
    getProjectionStyles(s) {
      var u, o;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return ST;
      const r = { visibility: "" },
        c = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (r.opacity = ""),
          (r.pointerEvents = ts(s == null ? void 0 : s.pointerEvents) || ""),
          (r.transform = c ? c(this.latestValues, "") : "none"),
          r
        );
      const f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        const S = {};
        return (
          this.options.layoutId &&
            ((S.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (S.pointerEvents = ts(s == null ? void 0 : s.pointerEvents) || "")),
          this.hasProjected &&
            !Rn(this.latestValues) &&
            ((S.transform = c ? c({}, "") : "none"), (this.hasProjected = !1)),
          S
        );
      }
      const d = f.animationValues || f.latestValues;
      (this.applyTransformsToTarget(),
        (r.transform = bT(
          this.projectionDeltaWithTransform,
          this.treeScale,
          d,
        )),
        c && (r.transform = c(d, r.transform)));
      const { x: m, y: b } = this.projectionDelta;
      ((r.transformOrigin = `${m.origin * 100}% ${b.origin * 100}% 0`),
        f.animationValues
          ? (r.opacity =
              f === this
                ? (o =
                    (u = d.opacity) !== null && u !== void 0
                      ? u
                      : this.latestValues.opacity) !== null && o !== void 0
                  ? o
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : d.opacityExit)
          : (r.opacity =
              f === this
                ? d.opacity !== void 0
                  ? d.opacity
                  : ""
                : d.opacityExit !== void 0
                  ? d.opacityExit
                  : 0));
      for (const S in ws) {
        if (d[S] === void 0) continue;
        const { correct: A, applyTo: p } = ws[S],
          h = r.transform === "none" ? d[S] : A(d[S], f);
        if (p) {
          const y = p.length;
          for (let v = 0; v < y; v++) r[p[v]] = h;
        } else r[S] = h;
      }
      return (
        this.options.layoutId &&
          (r.pointerEvents =
            f === this
              ? ts(s == null ? void 0 : s.pointerEvents) || ""
              : "none"),
        r
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((s) => {
        var u;
        return (u = s.currentAnimation) === null || u === void 0
          ? void 0
          : u.stop();
      }),
        this.root.nodes.forEach(Bh),
        this.root.sharedNodes.clear());
    }
  };
}
function TT(t) {
  t.updateLayout();
}
function AT(t) {
  var e;
  const n =
    ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) ||
    t.snapshot;
  if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
    const { layoutBox: a, measuredBox: i } = t.layout,
      { animationType: l } = t.options,
      s = n.source !== t.layout.source;
    l === "size"
      ? ee((f) => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            m = Wt(d);
          ((d.min = a[f].min), (d.max = d.min + m));
        })
      : Mg(l, n.layoutBox, a) &&
        ee((f) => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            m = Wt(a[f]);
          ((d.max = d.min + m),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0),
              (t.relativeTarget[f].max = t.relativeTarget[f].min + m)));
        });
    const u = ya();
    zi(u, a, n.layoutBox);
    const o = ya();
    s ? zi(o, t.applyTransform(i, !0), n.measuredBox) : zi(o, a, n.layoutBox);
    const r = !xg(u);
    let c = !1;
    if (!t.resumeFrom) {
      const f = t.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const { snapshot: d, layout: m } = f;
        if (d && m) {
          const b = rt();
          ji(b, n.layoutBox, d.layoutBox);
          const S = rt();
          (ji(S, a, m.layoutBox),
            Tg(b, S) || (c = !0),
            f.options.layoutRoot &&
              ((t.relativeTarget = S),
              (t.relativeTargetOrigin = b),
              (t.relativeParent = f)));
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: a,
      snapshot: n,
      delta: o,
      layoutDelta: u,
      hasLayoutChanged: r,
      hasRelativeTargetChanged: c,
    });
  } else if (t.isLead()) {
    const { onExitComplete: a } = t.options;
    a && a();
  }
  t.options.transition = void 0;
}
function ET(t) {
  (fi && _n.totalNodes++,
    t.parent &&
      (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
      t.isSharedProjectionDirty ||
        (t.isSharedProjectionDirty = !!(
          t.isProjectionDirty ||
          t.parent.isProjectionDirty ||
          t.parent.isSharedProjectionDirty
        )),
      t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty)));
}
function MT(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function DT(t) {
  t.clearSnapshot();
}
function Bh(t) {
  t.clearMeasurements();
}
function CT(t) {
  t.isLayoutDirty = !1;
}
function zT(t) {
  const { visualElement: e } = t.options;
  (e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
    t.resetTransform());
}
function Lh(t) {
  (t.finishAnimation(),
    (t.targetDelta = t.relativeTarget = t.target = void 0),
    (t.isProjectionDirty = !0));
}
function jT(t) {
  t.resolveTargetDelta();
}
function NT(t) {
  t.calcProjection();
}
function RT(t) {
  t.resetSkewAndRotation();
}
function _T(t) {
  t.removeLeadSnapshot();
}
function Hh(t, e, n) {
  ((t.translate = it(e.translate, 0, n)),
    (t.scale = it(e.scale, 1, n)),
    (t.origin = e.origin),
    (t.originPoint = e.originPoint));
}
function qh(t, e, n, a) {
  ((t.min = it(e.min, n.min, a)), (t.max = it(e.max, n.max, a)));
}
function OT(t, e, n, a) {
  (qh(t.x, e.x, n.x, a), qh(t.y, e.y, n.y, a));
}
function wT(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const VT = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Yh = (t) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(t),
  Gh = Yh("applewebkit/") && !Yh("chrome/") ? Math.round : Ft;
function Xh(t) {
  ((t.min = Gh(t.min)), (t.max = Gh(t.max)));
}
function UT(t) {
  (Xh(t.x), Xh(t.y));
}
function Mg(t, e, n) {
  return (
    t === "position" || (t === "preserve-aspect" && !H2(wh(e), wh(n), 0.2))
  );
}
function BT(t) {
  var e;
  return (
    t !== t.root &&
    ((e = t.scroll) === null || e === void 0 ? void 0 : e.wasRoot)
  );
}
const LT = Eg({
    attachResizeListener: (t, e) => Ji(t, "resize", e),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  so = { current: void 0 },
  Dg = Eg({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!so.current) {
        const t = new LT({});
        (t.mount(window), t.setOptions({ layoutScroll: !0 }), (so.current = t));
      }
      return so.current;
    },
    resetTransform: (t, e) => {
      t.style.transform = e !== void 0 ? e : "none";
    },
    checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed",
  }),
  HT = {
    pan: { Feature: eT },
    drag: { Feature: tT, ProjectionNode: Dg, MeasureLayout: vg },
  };
function Qh(t, e, n) {
  const { props: a } = t;
  t.animationState &&
    a.whileHover &&
    t.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    l = a[i];
  l && et.postRender(() => l(e, cl(e)));
}
class qT extends An {
  mount() {
    const { current: e } = this.node;
    e &&
      (this.unmount = HS(
        e,
        (n) => (Qh(this.node, n, "Start"), (a) => Qh(this.node, a, "End")),
      ));
  }
  unmount() {}
}
class YT extends An {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = rl(
      Ji(this.node.current, "focus", () => this.onFocus()),
      Ji(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function Kh(t, e, n) {
  const { props: a } = t;
  t.animationState &&
    a.whileTap &&
    t.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    l = a[i];
  l && et.postRender(() => l(e, cl(e)));
}
class GT extends An {
  mount() {
    const { current: e } = this.node;
    e &&
      (this.unmount = XS(
        e,
        (n) => (
          Kh(this.node, n, "Start"),
          (a, { success: i }) => Kh(this.node, a, i ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const Sr = new WeakMap(),
  uo = new WeakMap(),
  XT = (t) => {
    const e = Sr.get(t.target);
    e && e(t);
  },
  QT = (t) => {
    t.forEach(XT);
  };
function KT({ root: t, ...e }) {
  const n = t || document;
  uo.has(n) || uo.set(n, {});
  const a = uo.get(n),
    i = JSON.stringify(e);
  return (
    a[i] || (a[i] = new IntersectionObserver(QT, { root: t, ...e })),
    a[i]
  );
}
function ZT(t, e, n) {
  const a = KT(e);
  return (
    Sr.set(t, n),
    a.observe(t),
    () => {
      (Sr.delete(t), a.unobserve(t));
    }
  );
}
const kT = { some: 0, all: 1 };
class JT extends An {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(),
      { root: n, margin: a, amount: i = "some", once: l } = e,
      s = {
        root: n ? n.current : void 0,
        rootMargin: a,
        threshold: typeof i == "number" ? i : kT[i],
      },
      u = (o) => {
        const { isIntersecting: r } = o;
        if (
          this.isInView === r ||
          ((this.isInView = r), l && !r && this.hasEnteredView)
        )
          return;
        (r && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", r));
        const { onViewportEnter: c, onViewportLeave: f } = this.node.getProps(),
          d = r ? c : f;
        d && d(o);
      };
    return ZT(this.node.current, s, u);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(FT(e, n)) && this.startObserver();
  }
  unmount() {}
}
function FT({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const PT = {
    inView: { Feature: JT },
    tap: { Feature: GT },
    focus: { Feature: YT },
    hover: { Feature: qT },
  },
  $T = { layout: { ProjectionNode: Dg, MeasureLayout: vg } },
  xr = { current: null },
  Cg = { current: !1 };
function WT() {
  if (((Cg.current = !0), !!Dc))
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"),
        e = () => (xr.current = t.matches);
      (t.addListener(e), e());
    } else xr.current = !1;
}
const IT = [...Wy, jt, Sn],
  tA = (t) => IT.find($y(t)),
  Zh = new WeakMap();
function eA(t, e, n) {
  for (const a in e) {
    const i = e[a],
      l = n[a];
    if (Nt(i)) t.addValue(a, i);
    else if (Nt(l)) t.addValue(a, Zi(i, { owner: t }));
    else if (l !== i)
      if (t.hasValue(a)) {
        const s = t.getValue(a);
        s.liveStyle === !0 ? s.jump(i) : s.hasAnimated || s.set(i);
      } else {
        const s = t.getStaticValue(a);
        t.addValue(a, Zi(s !== void 0 ? s : i, { owner: t }));
      }
  }
  for (const a in n) e[a] === void 0 && t.removeValue(a);
  return e;
}
const kh = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class nA {
  scrapeMotionValuesFromProps(e, n, a) {
    return {};
  }
  constructor(
    {
      parent: e,
      props: n,
      presenceContext: a,
      reducedMotionConfig: i,
      blockInitialAnimation: l,
      visualState: s,
    },
    u = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Ic),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const m = xe.now();
        this.renderScheduledAt < m &&
          ((this.renderScheduledAt = m), et.render(this.render, !1, !0));
      }));
    const { latestValues: o, renderState: r, onUpdate: c } = s;
    ((this.onUpdate = c),
      (this.latestValues = o),
      (this.baseTarget = { ...o }),
      (this.initialValues = n.initial ? { ...o } : {}),
      (this.renderState = r),
      (this.parent = e),
      (this.props = n),
      (this.presenceContext = a),
      (this.depth = e ? e.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = u),
      (this.blockInitialAnimation = !!l),
      (this.isControllingVariants = ou(n)),
      (this.isVariantNode = sy(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(e && e.current)));
    const { willChange: f, ...d } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this,
    );
    for (const m in d) {
      const b = d[m];
      o[m] !== void 0 && Nt(b) && b.set(o[m], !1);
    }
  }
  mount(e) {
    ((this.current = e),
      Zh.set(e, this),
      this.projection && !this.projection.instance && this.projection.mount(e),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, a) => this.bindToMotionValue(a, n)),
      Cg.current || WT(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : xr.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    (Zh.delete(this.current),
      this.projection && this.projection.unmount(),
      bn(this.notifyUpdate),
      bn(this.render),
      this.valueSubscriptions.forEach((e) => e()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (const e in this.events) this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const a = Pn.has(e),
      i = n.on("change", (u) => {
        ((this.latestValues[e] = u),
          this.props.onUpdate && et.preRender(this.notifyUpdate),
          a && this.projection && (this.projection.isTransformDirty = !0));
      }),
      l = n.on("renderRequest", this.scheduleRender);
    let s;
    (window.MotionCheckAppearSync &&
      (s = window.MotionCheckAppearSync(this, e, n)),
      this.valueSubscriptions.set(e, () => {
        (i(), l(), s && s(), n.owner && n.stop());
      }));
  }
  sortNodePosition(e) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== e.type
      ? 0
      : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in La) {
      const n = La[e];
      if (!n) continue;
      const { isEnabled: a, Feature: i } = n;
      if (
        (!this.features[e] &&
          i &&
          a(this.props) &&
          (this.features[e] = new i(this)),
        this.features[e])
      ) {
        const l = this.features[e];
        l.isMounted ? l.update() : (l.mount(), (l.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : rt();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  update(e, n) {
    ((e.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = e),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n));
    for (let a = 0; a < kh.length; a++) {
      const i = kh[a];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const l = "on" + i,
        s = e[l];
      s && (this.propEventSubscriptions[i] = this.on(i, s));
    }
    ((this.prevMotionValues = eA(
      this,
      this.scrapeMotionValuesFromProps(e, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this));
  }
  getProps() {
    return this.props;
  }
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(e),
        () => n.variantChildren.delete(e)
      );
  }
  addValue(e, n) {
    const a = this.values.get(e);
    n !== a &&
      (a && this.removeValue(e),
      this.bindToMotionValue(e, n),
      this.values.set(e, n),
      (this.latestValues[e] = n.get()));
  }
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    (n && (n(), this.valueSubscriptions.delete(e)),
      delete this.latestValues[e],
      this.removeValueFromRenderState(e, this.renderState));
  }
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e]) return this.props.values[e];
    let a = this.values.get(e);
    return (
      a === void 0 &&
        n !== void 0 &&
        ((a = Zi(n === null ? void 0 : n, { owner: this })),
        this.addValue(e, a)),
      a
    );
  }
  readValue(e, n) {
    var a;
    let i =
      this.latestValues[e] !== void 0 || !this.current
        ? this.latestValues[e]
        : (a = this.getBaseTargetFromProps(this.props, e)) !== null &&
            a !== void 0
          ? a
          : this.readValueFromInstance(this.current, e, this.options);
    return (
      i != null &&
        (typeof i == "string" && (Fy(i) || qy(i))
          ? (i = parseFloat(i))
          : !tA(i) && Sn.test(n) && (i = Zy(e, n)),
        this.setBaseTarget(e, Nt(i) ? i.get() : i)),
      Nt(i) ? i.get() : i
    );
  }
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  getBaseTarget(e) {
    var n;
    const { initial: a } = this.props;
    let i;
    if (typeof a == "string" || typeof a == "object") {
      const s = Oc(
        this.props,
        a,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom,
      );
      s && (i = s[e]);
    }
    if (a && i !== void 0) return i;
    const l = this.getBaseTargetFromProps(this.props, e);
    return l !== void 0 && !Nt(l)
      ? l
      : this.initialValues[e] !== void 0 && i === void 0
        ? void 0
        : this.baseTarget[e];
  }
  on(e, n) {
    return (
      this.events[e] || (this.events[e] = new kc()),
      this.events[e].add(n)
    );
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class zg extends nA {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = Iy));
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: a }) {
    (delete n[e], delete a[e]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    Nt(e) &&
      (this.childSubscription = e.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function aA(t) {
  return window.getComputedStyle(t);
}
class iA extends zg {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = py));
  }
  readValueFromInstance(e, n) {
    if (Pn.has(n)) {
      const a = Wc(n);
      return (a && a.default) || 0;
    } else {
      const a = aA(e),
        i = (dy(n) ? a.getPropertyValue(n) : a[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return yg(e, n);
  }
  build(e, n, a) {
    Uc(e, n, a.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, a) {
    return qc(e, n, a);
  }
}
class lA extends zg {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = rt));
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Pn.has(n)) {
      const a = Wc(n);
      return (a && a.default) || 0;
    }
    return ((n = yy.has(n) ? n : Nc(n)), e.getAttribute(n));
  }
  scrapeMotionValuesFromProps(e, n, a) {
    return by(e, n, a);
  }
  build(e, n, a) {
    Bc(e, n, this.isSVGTag, a.transformTemplate);
  }
  renderInstance(e, n, a, i) {
    gy(e, n, a, i);
  }
  mount(e) {
    ((this.isSVGTag = Hc(e.tagName)), super.mount(e));
  }
}
const sA = (t, e) =>
    _c(t) ? new lA(e) : new iA(e, { allowProjection: t !== M.Fragment }),
  uA = _S({ ...N2, ...PT, ...HT, ...$T }, sA),
  Q = kb(uA);
function oA({ isMoving: t, direction: e }) {
  return g.jsxs("div", {
    className: "relative w-32 h-16",
    children: [
      g.jsxs(Q.div, {
        animate: {
          y: t ? [0, -2, 0] : 0,
          rotate: e === "right" ? -2 : e === "left" ? 2 : 0,
        },
        transition: {
          y: { repeat: 1 / 0, duration: 0.2 },
          rotate: { type: "spring", stiffness: 100 },
        },
        className: "w-full h-full relative z-10",
        children: [
          g.jsxs("div", {
            className:
              "absolute bottom-2 left-0 w-full h-8 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-lg skew-x-[-20deg] shadow-[0_0_15px_rgba(236,72,153,0.6)]",
            children: [
              g.jsx("div", {
                className:
                  "absolute -top-4 left-8 w-16 h-6 bg-cyan-900/80 rounded-t-lg border-t border-cyan-400/50 skew-x-[20deg]",
              }),
              g.jsx("div", {
                className:
                  "absolute top-3 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_5px_#06b6d4]",
              }),
              g.jsx("div", {
                className:
                  "absolute top-1 -left-1 w-2 h-4 bg-red-500 rounded-sm shadow-[0_0_10px_red]",
              }),
              g.jsx("div", {
                className:
                  "absolute top-2 -right-1 w-2 h-3 bg-yellow-200 rounded-sm shadow-[0_0_15px_yellow]",
              }),
            ],
          }),
          g.jsx(Q.div, {
            className:
              "absolute bottom-0 left-4 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-600 flex items-center justify-center",
            animate: { rotate: t ? 360 : 0 },
            transition: { repeat: 1 / 0, duration: 0.5, ease: "linear" },
            children: g.jsx("div", {
              className:
                "w-4 h-4 border border-cyan-500 rounded-full opacity-50",
            }),
          }),
          g.jsx(Q.div, {
            className:
              "absolute bottom-0 right-4 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-600 flex items-center justify-center",
            animate: { rotate: t ? 360 : 0 },
            transition: { repeat: 1 / 0, duration: 0.5, ease: "linear" },
            children: g.jsx("div", {
              className:
                "w-4 h-4 border border-cyan-500 rounded-full opacity-50",
            }),
          }),
        ],
      }),
      g.jsx("div", {
        className:
          "absolute bottom-0 left-2 right-2 h-2 bg-cyan-500/50 blur-md rounded-full",
      }),
      t &&
        g.jsxs("div", {
          className: "absolute bottom-2 -left-4 flex space-x-1",
          children: [
            g.jsx(Q.div, {
              initial: { opacity: 1, x: 0, scale: 1 },
              animate: { opacity: 0, x: -20, scale: 0 },
              transition: { duration: 0.5, repeat: 1 / 0, delay: 0 },
              className: "w-2 h-2 bg-pink-500 rounded-full blur-[1px]",
            }),
            g.jsx(Q.div, {
              initial: { opacity: 1, x: 0, scale: 1 },
              animate: { opacity: 0, x: -25, scale: 0 },
              transition: { duration: 0.5, repeat: 1 / 0, delay: 0.1 },
              className: "w-1 h-1 bg-purple-500 rounded-full blur-[1px]",
            }),
          ],
        }),
    ],
  });
}
function Jh({
  children: t,
  speed: e,
  offset: n,
  className: a = "",
  zIndex: i = 0,
}) {
  const l = -n * e;
  return g.jsx(Q.div, {
    className: `absolute top-0 left-0 w-full h-full pointer-events-none ${a}`,
    style: { x: l, zIndex: i },
    children: t,
  });
}
function rA({ milestone: t, isVisible: e, distanceFromCar: n }) {
  if (!e) return null;
  const a = Math.abs(n) < 200;
  return g.jsxs("div", {
    className:
      "absolute bottom-20 transform -translate-x-1/2 flex flex-col items-center group",
    style: { left: t.x },
    children: [
      g.jsxs(Q.div, {
        initial: { y: 0 },
        animate: {
          y: [0, -10, 0],
          scale: a ? 1.2 : 1,
          filter: a ? `drop-shadow(0 0 15px ${t.color})` : "none",
        },
        transition: {
          y: { repeat: 1 / 0, duration: 2 },
          scale: { duration: 0.3 },
        },
        className: "relative z-20 cursor-pointer",
        children: [
          g.jsx("div", {
            className:
              "w-16 h-16 rounded-lg border-2 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm transition-colors duration-300",
            style: { borderColor: t.color, boxShadow: `0 0 10px ${t.color}40` },
            children: g.jsx("span", {
              className: "text-3xl",
              children: t.icon,
            }),
          }),
          g.jsx("div", {
            className: "w-1 h-12 bg-slate-600 mx-auto mt-[-2px]",
          }),
          g.jsx("div", { className: "w-4 h-1 bg-slate-600 mx-auto" }),
          " ",
        ],
      }),
      g.jsx(Q.div, {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: a ? 1 : 0, y: a ? 0 : 10 },
        className:
          "absolute -top-12 whitespace-nowrap bg-black/70 px-3 py-1 rounded border border-white/20 backdrop-blur-md",
        children: g.jsx("span", {
          className: "text-sm font-bold text-white tracking-wider",
          children: t.title,
        }),
      }),
    ],
  });
}
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const cA = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  fA = (t) =>
    t.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, n, a) =>
      a ? a.toUpperCase() : n.toLowerCase(),
    ),
  Fh = (t) => {
    const e = fA(t);
    return e.charAt(0).toUpperCase() + e.slice(1);
  },
  jg = (...t) =>
    t
      .filter((e, n, a) => !!e && e.trim() !== "" && a.indexOf(e) === n)
      .join(" ")
      .trim(),
  dA = (t) => {
    for (const e in t)
      if (e.startsWith("aria-") || e === "role" || e === "title") return !0;
  };
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var hA = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mA = M.forwardRef(
  (
    {
      color: t = "currentColor",
      size: e = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: a,
      className: i = "",
      children: l,
      iconNode: s,
      ...u
    },
    o,
  ) =>
    M.createElement(
      "svg",
      {
        ref: o,
        ...hA,
        width: e,
        height: e,
        stroke: t,
        strokeWidth: a ? (Number(n) * 24) / Number(e) : n,
        className: jg("lucide", i),
        ...(!l && !dA(u) && { "aria-hidden": "true" }),
        ...u,
      },
      [
        ...s.map(([r, c]) => M.createElement(r, c)),
        ...(Array.isArray(l) ? l : [l]),
      ],
    ),
);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const It = (t, e) => {
  const n = M.forwardRef(({ className: a, ...i }, l) =>
    M.createElement(mA, {
      ref: l,
      iconNode: e,
      className: jg(`lucide-${cA(Fh(t))}`, `lucide-${t}`, a),
      ...i,
    }),
  );
  return ((n.displayName = Fh(t)), n);
};
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pA = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }],
  ],
  yA = It("arrow-left", pA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gA = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  vA = It("arrow-right", gA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bA = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
    ],
    ["path", { d: "M3 10h18", key: "8toen8" }],
  ],
  SA = It("calendar", bA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xA = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  TA = It("chevron-right", xA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const AA = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  EA = It("circle-check-big", AA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const MA = [
    [
      "path",
      {
        d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",
        key: "i9b6wo",
      },
    ],
    ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }],
  ],
  DA = It("flag", MA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const CA = [
    ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
    ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }],
  ],
  zA = It("gauge", CA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jA = [
    ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1fvzgz" }],
    ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2", key: "1kc0my" }],
    ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8", key: "10h0bg" }],
    [
      "path",
      {
        d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
        key: "1s1gnw",
      },
    ],
  ],
  NA = It("hand", jA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const RA = [
    [
      "path",
      {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
        key: "v9h5vc",
      },
    ],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    [
      "path",
      {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
        key: "3uifl3",
      },
    ],
    ["path", { d: "M8 16H3v5", key: "1cv678" }],
  ],
  Ph = It("refresh-cw", RA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _A = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
  ],
  OA = It("send", _A);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wA = [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0",
      },
    ],
    [
      "circle",
      { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" },
    ],
  ],
  VA = It("tag", wA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const UA = [
    [
      "path",
      {
        d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",
        key: "1n3hpd",
      },
    ],
    [
      "path",
      {
        d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",
        key: "rfe1zi",
      },
    ],
    ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }],
    ["path", { d: "M4 22h16", key: "57wxv0" }],
    [
      "path",
      {
        d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
        key: "1mhfuq",
      },
    ],
    ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }],
  ],
  BA = It("trophy", UA);
/**
 * @license lucide-react v0.522.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const LA = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  HA = It("x", LA);
function qA({ milestone: t, isOpen: e, onClose: n }) {
  return t
    ? g.jsx(_s, {
        children:
          e &&
          g.jsx(g.Fragment, {
            children: g.jsx(Q.div, {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              onClick: n,
              className:
                "fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4",
              children: g.jsxs(Q.div, {
                initial: { scale: 0.9, opacity: 0, y: 50, rotateX: 10 },
                animate: { scale: 1, opacity: 1, y: 0, rotateX: 0 },
                exit: { scale: 0.9, opacity: 0, y: 50, rotateX: -10 },
                transition: { type: "spring", bounce: 0.4 },
                onClick: (a) => a.stopPropagation(),
                className:
                  "w-full max-w-2xl bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-2xl relative group",
                style: {
                  borderColor: t.color,
                  boxShadow: `0 0 50px ${t.color}20`,
                },
                children: [
                  g.jsx("div", {
                    className:
                      "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50",
                  }),
                  g.jsxs("div", {
                    className: "relative p-8 overflow-hidden",
                    children: [
                      g.jsx("div", {
                        className: "absolute inset-0 opacity-10",
                        style: {
                          backgroundColor: t.color,
                          backgroundImage:
                            "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)",
                          backgroundSize: "20px 20px",
                          backgroundPosition: "0 0, 10px 10px",
                        },
                      }),
                      g.jsxs("div", {
                        className:
                          "relative z-10 flex justify-between items-start",
                        children: [
                          g.jsxs("div", {
                            className: "flex items-start gap-6",
                            children: [
                              g.jsx(Q.div, {
                                initial: { scale: 0, rotate: -180 },
                                animate: { scale: 1, rotate: 0 },
                                transition: { delay: 0.2, type: "spring" },
                                className:
                                  "w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg border-2 border-white/20",
                                style: {
                                  backgroundColor: t.color,
                                  boxShadow: `0 0 20px ${t.color}60`,
                                },
                                children: t.icon,
                              }),
                              g.jsxs("div", {
                                children: [
                                  g.jsxs(Q.div, {
                                    initial: { opacity: 0, x: -20 },
                                    animate: { opacity: 1, x: 0 },
                                    transition: { delay: 0.3 },
                                    children: [
                                      g.jsx("span", {
                                        className:
                                          "inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-2 border border-white/20 bg-black/30 text-white/80",
                                        children: t.type,
                                      }),
                                      g.jsx("h2", {
                                        className:
                                          "text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-2 drop-shadow-md",
                                        children: t.title,
                                      }),
                                    ],
                                  }),
                                  g.jsx(Q.div, {
                                    initial: { opacity: 0 },
                                    animate: { opacity: 1 },
                                    transition: { delay: 0.4 },
                                    className:
                                      "flex items-center gap-3 text-slate-300 text-sm font-medium",
                                    children: g.jsxs("div", {
                                      className:
                                        "flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded",
                                      children: [
                                        g.jsx(SA, {
                                          size: 14,
                                          className: "text-white/60",
                                        }),
                                        g.jsx("span", { children: t.date }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          g.jsx("button", {
                            onClick: n,
                            className:
                              "text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full",
                            children: g.jsx(HA, { size: 24 }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  g.jsxs("div", {
                    className: "p-8 space-y-8 bg-slate-900/50 backdrop-blur-sm",
                    children: [
                      g.jsx(Q.p, {
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.5 },
                        className:
                          "text-slate-300 leading-relaxed text-lg border-l-2 border-slate-700 pl-4",
                        children: t.description,
                      }),
                      g.jsxs(Q.div, {
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.6 },
                        children: [
                          g.jsxs("h3", {
                            className:
                              "text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2",
                            children: [g.jsx(VA, { size: 12 }), "Tech Stack"],
                          }),
                          g.jsx("div", {
                            className: "flex flex-wrap gap-2",
                            children: t.tags.map((a, i) =>
                              g.jsx(
                                Q.span,
                                {
                                  initial: { opacity: 0, scale: 0.8 },
                                  animate: { opacity: 1, scale: 1 },
                                  transition: { delay: 0.7 + i * 0.05 },
                                  className:
                                    "px-3 py-1.5 rounded text-sm font-medium bg-slate-800 border border-slate-700 text-cyan-300 shadow-sm hover:border-cyan-500/50 transition-colors cursor-default",
                                  children: a,
                                },
                                a,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                  g.jsxs("div", {
                    className:
                      "p-6 bg-slate-950 border-t border-slate-800 flex justify-between items-center",
                    children: [
                      g.jsxs("div", {
                        className: "text-xs text-slate-500 font-mono",
                        children: ["ID: ", t.id.toString().padStart(4, "0")],
                      }),
                      g.jsxs("button", {
                        onClick: n,
                        className:
                          "group relative px-8 py-3 rounded-lg font-bold overflow-hidden transition-transform active:scale-95",
                        children: [
                          g.jsx("div", {
                            className:
                              "absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity",
                            style: { backgroundColor: t.color },
                          }),
                          g.jsxs("div", {
                            className: "relative flex items-center gap-2",
                            style: { color: t.color },
                            children: [
                              g.jsx("span", { children: "CONTINUE DRIVING" }),
                              g.jsx(TA, {
                                size: 18,
                                className:
                                  "group-hover:translate-x-1 transition-transform",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
      })
    : null;
}
function YA({ speed: t, progress: e }) {
  const n = -90 + (t / 15) * 180,
    a = t > 12 ? "#ef4444" : t > 8 ? "#f59e0b" : "#06b6d4";
  return g.jsxs(g.Fragment, {
    children: [
      g.jsxs("div", {
        className: "fixed top-0 left-0 w-full z-40 px-4 pt-4 md:hidden",
        children: [
          g.jsxs("div", {
            className:
              "bg-slate-900/80 backdrop-blur border border-slate-700 rounded-full p-2 flex items-center gap-3 shadow-lg",
            children: [
              g.jsx(zA, { size: 16, className: "text-cyan-400" }),
              g.jsx("div", {
                className:
                  "flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative",
                children: g.jsx(Q.div, {
                  className:
                    "absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-pink-500",
                  style: { width: `${e}%` },
                  layoutId: "progressBar",
                }),
              }),
              g.jsx(DA, {
                size: 16,
                className:
                  e >= 99 ? "text-yellow-400 animate-bounce" : "text-slate-500",
              }),
            ],
          }),
          g.jsx("div", {
            className: "flex justify-center mt-2",
            children: g.jsxs("div", {
              className:
                "bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-mono text-cyan-300 border border-cyan-900/50",
              children: [Math.round(t * 10), " KM/H"],
            }),
          }),
        ],
      }),
      g.jsxs("div", {
        className:
          "fixed bottom-8 right-8 w-56 h-56 z-40 pointer-events-none hidden md:block",
        children: [
          g.jsx("div", {
            className: "absolute inset-0 bg-cyan-500/5 rounded-full blur-2xl",
          }),
          g.jsxs("div", {
            className:
              "relative w-full h-full bg-slate-900/90 rounded-full border-4 border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden",
            children: [
              g.jsx("div", {
                className: "absolute inset-0 opacity-20",
                style: {
                  backgroundImage:
                    "radial-gradient(#06b6d4 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                },
              }),
              [...Array(21)].map((i, l) => {
                const s = -90 + l * 9,
                  u = l % 5 === 0;
                return g.jsx(
                  "div",
                  {
                    className: "absolute top-1/2 left-1/2 w-1 origin-bottom",
                    style: {
                      height: "45%",
                      transform: `translate(-50%, -100%) rotate(${s}deg)`,
                    },
                    children: g.jsx("div", {
                      className: "w-full absolute top-0 rounded-full",
                      style: {
                        height: u ? "12px" : "6px",
                        backgroundColor:
                          l > 15 ? "#ef4444" : l > 10 ? "#f59e0b" : "#334155",
                        boxShadow: l > 15 ? "0 0 5px #ef4444" : "none",
                      },
                    }),
                  },
                  l,
                );
              }),
              g.jsx(Q.div, {
                className:
                  "absolute top-1/2 left-1/2 w-[45%] h-1 bg-gradient-to-r from-transparent via-pink-500 to-pink-400 origin-left rounded-full",
                animate: { rotate: n },
                transition: { type: "spring", stiffness: 120, damping: 15 },
                style: { boxShadow: "0 0 15px #ec4899", zIndex: 10 },
                children: g.jsx("div", {
                  className:
                    "absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]",
                }),
              }),
              g.jsx("div", {
                className:
                  "absolute top-1/2 left-1/2 w-8 h-8 bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 border-2 border-slate-600 flex items-center justify-center",
                children: g.jsx("div", {
                  className: "w-2 h-2 bg-cyan-500 rounded-full animate-pulse",
                }),
              }),
              g.jsxs("div", {
                className: "absolute bottom-10 left-0 w-full text-center z-10",
                children: [
                  g.jsx("div", {
                    className:
                      "text-4xl font-black text-white tracking-tighter tabular-nums italic",
                    style: { textShadow: `0 0 15px ${a}` },
                    children: Math.round(t * 10),
                  }),
                  g.jsx("div", {
                    className:
                      "text-[10px] font-bold text-slate-500 tracking-widest mt-1",
                    children: "KM/H",
                  }),
                ],
              }),
              g.jsx("div", {
                className:
                  "absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-800 rounded-full overflow-hidden",
                children: g.jsx(Q.div, {
                  className: "h-full bg-cyan-500",
                  style: { width: `${e}%` },
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function GA({ onControlChange: t }) {
  const [e, n] = M.useState(!1);
  if (
    (M.useEffect(() => {
      n("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []),
    !e)
  )
    return null;
  const a = (l) => (s) => {
      (s.preventDefault(), t(l, !0));
    },
    i = (l) => (s) => {
      (s.preventDefault(), t(l, !1));
    };
  return g.jsxs("div", {
    className:
      "absolute bottom-4 left-0 w-full px-4 pb-4 z-50 flex justify-between items-end pointer-events-none",
    children: [
      g.jsxs("div", {
        className: "flex gap-4 pointer-events-auto",
        children: [
          g.jsx(Q.button, {
            whileTap: { scale: 0.9, backgroundColor: "rgba(6, 182, 212, 0.4)" },
            className:
              "w-16 h-16 rounded-full border-2 border-cyan-500 bg-cyan-900/50 backdrop-blur-sm flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
            onTouchStart: a("left"),
            onTouchEnd: i("left"),
            "aria-label": "Move Left",
            children: g.jsx(yA, { size: 32 }),
          }),
          g.jsx(Q.button, {
            whileTap: { scale: 0.9, backgroundColor: "rgba(6, 182, 212, 0.4)" },
            className:
              "w-16 h-16 rounded-full border-2 border-cyan-500 bg-cyan-900/50 backdrop-blur-sm flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
            onTouchStart: a("right"),
            onTouchEnd: i("right"),
            "aria-label": "Move Right",
            children: g.jsx(vA, { size: 32 }),
          }),
        ],
      }),
      g.jsx("div", {
        className: "pointer-events-auto",
        children: g.jsxs(Q.button, {
          whileTap: { scale: 0.9, backgroundColor: "rgba(236, 72, 153, 0.4)" },
          className:
            "w-20 h-20 rounded-full border-2 border-pink-500 bg-pink-900/50 backdrop-blur-sm flex flex-col items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]",
          onTouchStart: a("interact"),
          onTouchEnd: i("interact"),
          "aria-label": "Interact",
          children: [
            g.jsx(NA, { size: 32 }),
            g.jsx("span", {
              className: "text-[10px] font-bold mt-1 uppercase tracking-wider",
              children: "View",
            }),
          ],
        }),
      }),
    ],
  });
}
class fl {
  constructor(e = 0, n = "Network Error") {
    ((this.status = e), (this.text = n));
  }
}
const XA = () => {
    if (!(typeof localStorage > "u"))
      return {
        get: (t) => Promise.resolve(localStorage.getItem(t)),
        set: (t, e) => Promise.resolve(localStorage.setItem(t, e)),
        remove: (t) => Promise.resolve(localStorage.removeItem(t)),
      };
  },
  Et = {
    origin: "https://api.emailjs.com",
    blockHeadless: !1,
    storageProvider: XA(),
  },
  af = (t) =>
    t
      ? typeof t == "string"
        ? { publicKey: t }
        : t.toString() === "[object Object]"
          ? t
          : {}
      : {},
  QA = (t, e = "https://api.emailjs.com") => {
    if (!t) return;
    const n = af(t);
    ((Et.publicKey = n.publicKey),
      (Et.blockHeadless = n.blockHeadless),
      (Et.storageProvider = n.storageProvider),
      (Et.blockList = n.blockList),
      (Et.limitRate = n.limitRate),
      (Et.origin = n.origin || e));
  },
  Ng = async (t, e, n = {}) => {
    const a = await fetch(Et.origin + t, {
        method: "POST",
        headers: n,
        body: e,
      }),
      i = await a.text(),
      l = new fl(a.status, i);
    if (a.ok) return l;
    throw l;
  },
  Rg = (t, e, n) => {
    if (!t || typeof t != "string")
      throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
    if (!e || typeof e != "string")
      throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
    if (!n || typeof n != "string")
      throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
  },
  KA = (t) => {
    if (t && t.toString() !== "[object Object]")
      throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
  },
  _g = (t) => t.webdriver || !t.languages || t.languages.length === 0,
  Og = () => new fl(451, "Unavailable For Headless Browser"),
  ZA = (t, e) => {
    if (!Array.isArray(t)) throw "The BlockList list has to be an array";
    if (typeof e != "string")
      throw "The BlockList watchVariable has to be a string";
  },
  kA = (t) => {
    var e;
    return !((e = t.list) != null && e.length) || !t.watchVariable;
  },
  JA = (t, e) => (t instanceof FormData ? t.get(e) : t[e]),
  wg = (t, e) => {
    if (kA(t)) return !1;
    ZA(t.list, t.watchVariable);
    const n = JA(e, t.watchVariable);
    return typeof n != "string" ? !1 : t.list.includes(n);
  },
  Vg = () => new fl(403, "Forbidden"),
  FA = (t, e) => {
    if (typeof t != "number" || t < 0)
      throw "The LimitRate throttle has to be a positive number";
    if (e && typeof e != "string")
      throw "The LimitRate ID has to be a non-empty string";
  },
  PA = async (t, e, n) => {
    const a = Number((await n.get(t)) || 0);
    return e - Date.now() + a;
  },
  Ug = async (t, e, n) => {
    if (!e.throttle || !n) return !1;
    FA(e.throttle, e.id);
    const a = e.id || t;
    return (await PA(a, e.throttle, n)) > 0
      ? !0
      : (await n.set(a, Date.now().toString()), !1);
  },
  Bg = () => new fl(429, "Too Many Requests"),
  $A = async (t, e, n, a) => {
    const i = af(a),
      l = i.publicKey || Et.publicKey,
      s = i.blockHeadless || Et.blockHeadless,
      u = i.storageProvider || Et.storageProvider,
      o = { ...Et.blockList, ...i.blockList },
      r = { ...Et.limitRate, ...i.limitRate };
    return s && _g(navigator)
      ? Promise.reject(Og())
      : (Rg(l, t, e),
        KA(n),
        n && wg(o, n)
          ? Promise.reject(Vg())
          : (await Ug(location.pathname, r, u))
            ? Promise.reject(Bg())
            : Ng(
                "/api/v1.0/email/send",
                JSON.stringify({
                  lib_version: "4.4.1",
                  user_id: l,
                  service_id: t,
                  template_id: e,
                  template_params: n,
                }),
                { "Content-type": "application/json" },
              ));
  },
  WA = (t) => {
    if (!t || t.nodeName !== "FORM")
      throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
  },
  IA = (t) => (typeof t == "string" ? document.querySelector(t) : t),
  t3 = async (t, e, n, a) => {
    const i = af(a),
      l = i.publicKey || Et.publicKey,
      s = i.blockHeadless || Et.blockHeadless,
      u = Et.storageProvider || i.storageProvider,
      o = { ...Et.blockList, ...i.blockList },
      r = { ...Et.limitRate, ...i.limitRate };
    if (s && _g(navigator)) return Promise.reject(Og());
    const c = IA(n);
    (Rg(l, t, e), WA(c));
    const f = new FormData(c);
    return wg(o, f)
      ? Promise.reject(Vg())
      : (await Ug(location.pathname, r, u))
        ? Promise.reject(Bg())
        : (f.append("lib_version", "4.4.1"),
          f.append("service_id", t),
          f.append("template_id", e),
          f.append("user_id", l),
          Ng("/api/v1.0/email/send-form", f));
  },
  e3 = { init: QA, send: $A, sendForm: t3, EmailJSResponseStatus: fl },
  n3 = () => {
    const [t, e] = M.useState(!1),
      [n, a] = M.useState(!1),
      [i, l] = M.useState(null);
    return {
      isSubmitting: t,
      isSent: n,
      error: i,
      sendEmail: async (o) => {
        (e(!0), l(null));
        try {
          (await e3.send(
            "service_1zors1q",
            "template_gmaraad",
            { name: o.name, email: o.email, message: o.message },
            "c533Re066kQDWbI5s",
          ),
            a(!0));
        } catch (r) {
          const c = r instanceof Error ? r.message : "Failed to send email";
          (l(c), console.error("Failed to send email:", r));
        } finally {
          e(!1);
        }
      },
      reset: () => {
        (a(!1), l(null), e(!1));
      },
    };
  };
function a3({ isOpen: t, onRestart: e }) {
  const [n, a] = M.useState({ name: "", email: "", message: "" }),
    { isSubmitting: i, isSent: l, sendEmail: s } = n3(),
    u = async (o) => {
      (o.preventDefault(), await s(n));
    };
  return t
    ? g.jsx(_s, {
        children: g.jsx(Q.div, {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className:
            "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4",
          children: g.jsxs(Q.div, {
            initial: { scale: 0.8, y: 50 },
            animate: { scale: 1, y: 0 },
            className:
              "w-full max-w-lg bg-slate-900 border-2 border-yellow-500 rounded-xl shadow-[0_0_50px_rgba(234,179,8,0.3)] overflow-hidden relative",
            children: [
              g.jsxs("div", {
                className:
                  "bg-gradient-to-r from-yellow-600 to-orange-600 p-6 text-center relative overflow-hidden",
                children: [
                  g.jsx("div", {
                    className:
                      "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20",
                  }),
                  g.jsx(Q.div, {
                    initial: { scale: 0, rotate: -180 },
                    animate: { scale: 1, rotate: 0 },
                    transition: { type: "spring", bounce: 0.5, delay: 0.2 },
                    className:
                      "w-20 h-20 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-white",
                    children: g.jsx(BA, {
                      size: 40,
                      className: "text-yellow-800",
                    }),
                  }),
                  g.jsx("h2", {
                    className:
                      "text-3xl font-black text-white uppercase tracking-widest italic drop-shadow-md",
                    children: "Mission Complete!",
                  }),
                  g.jsx("p", {
                    className: "text-yellow-100 font-medium mt-2",
                    children: "You've explored the entire journey.",
                  }),
                ],
              }),
              g.jsx("div", {
                className: "p-8",
                children: l
                  ? g.jsxs(Q.div, {
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      className: "text-center py-8",
                      children: [
                        g.jsx("div", {
                          className:
                            "w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6",
                          children: g.jsx(EA, {
                            size: 48,
                            className: "text-green-500",
                          }),
                        }),
                        g.jsx("h3", {
                          className: "text-2xl font-bold text-white mb-2",
                          children: "Message Sent!",
                        }),
                        g.jsx("p", {
                          className: "text-slate-400 mb-8",
                          children:
                            "Thanks for reaching out. I'll get back to you faster than this car drives.",
                        }),
                        g.jsxs("button", {
                          onClick: e,
                          className:
                            "w-full py-3 px-4 rounded font-bold text-white bg-slate-700 hover:bg-slate-600 transition-colors flex items-center justify-center gap-2",
                          children: [g.jsx(Ph, { size: 18 }), "Play Again"],
                        }),
                      ],
                    })
                  : g.jsxs("form", {
                      onSubmit: u,
                      className: "space-y-4",
                      children: [
                        g.jsxs("div", {
                          className: "text-center mb-6",
                          children: [
                            g.jsx("h3", {
                              className: "text-xl font-bold text-cyan-400 mb-2",
                              children: "Let's Build Something Together",
                            }),
                            g.jsx("p", {
                              className: "text-slate-400 text-sm",
                              children:
                                "Send me a message to discuss your next project or just say hi!",
                            }),
                          ],
                        }),
                        g.jsxs("div", {
                          children: [
                            g.jsx("label", {
                              htmlFor: "name",
                              className:
                                "block text-xs font-bold text-slate-500 uppercase mb-1",
                              children: "Name",
                            }),
                            g.jsx("input", {
                              type: "text",
                              id: "name",
                              required: !0,
                              className:
                                "w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors",
                              placeholder: "Player One",
                              value: n.name,
                              onChange: (o) =>
                                a({ ...n, name: o.target.value }),
                            }),
                          ],
                        }),
                        g.jsxs("div", {
                          children: [
                            g.jsx("label", {
                              htmlFor: "email",
                              className:
                                "block text-xs font-bold text-slate-500 uppercase mb-1",
                              children: "Email",
                            }),
                            g.jsx("input", {
                              type: "email",
                              id: "email",
                              required: !0,
                              className:
                                "w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors",
                              placeholder: "player@example.com",
                              value: n.email,
                              onChange: (o) =>
                                a({ ...n, email: o.target.value }),
                            }),
                          ],
                        }),
                        g.jsxs("div", {
                          children: [
                            g.jsx("label", {
                              htmlFor: "message",
                              className:
                                "block text-xs font-bold text-slate-500 uppercase mb-1",
                              children: "Message",
                            }),
                            g.jsx("textarea", {
                              id: "message",
                              required: !0,
                              rows: 3,
                              className:
                                "w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none",
                              placeholder: "Ready to start the next level...",
                              value: n.message,
                              onChange: (o) =>
                                a({ ...n, message: o.target.value }),
                            }),
                          ],
                        }),
                        g.jsxs("div", {
                          className: "flex gap-4 pt-2",
                          children: [
                            g.jsxs("button", {
                              type: "button",
                              onClick: e,
                              className:
                                "flex-1 py-3 px-4 rounded font-bold text-slate-300 border border-slate-600 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center gap-2",
                              children: [g.jsx(Ph, { size: 18 }), "Replay"],
                            }),
                            g.jsx("button", {
                              type: "submit",
                              disabled: i,
                              className:
                                "flex-[2] py-3 px-4 rounded font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-900/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
                              children: i
                                ? g.jsx("span", {
                                    className: "animate-pulse",
                                    children: "Sending...",
                                  })
                                : g.jsxs(g.Fragment, {
                                    children: [
                                      g.jsx(OA, { size: 18 }),
                                      "Send Message",
                                    ],
                                  }),
                            }),
                          ],
                        }),
                      ],
                    }),
              }),
            ],
          }),
        }),
      })
    : null;
}
const oo = [
    {
      id: 1,
      type: "skill",
      title: "Engineering Foundations",
      date: "2015–2021",
      x: 500,
      icon: "🎓",
      description:
        "Completed a Bachelor of Science in Computer Engineering while building early web and mobile applications using React, Django, and PostgreSQL.",
      tags: ["Computer Engineering", "React", "Django", "PostgreSQL"],
      color: "#06b6d4",
    },
    {
      id: 2,
      type: "job",
      title: "Software Engineer Intern",
      date: "2020–2021",
      x: 1500,
      icon: "🧩",
      description:
        "Built a web-based school records system and contributed to backend development using Django and PostgreSQL. Developed mobile apps using React Native.",
      tags: ["Django", "PostgreSQL", "React Native", "TypeScript"],
      color: "#22c55e",
    },
    {
      id: 3,
      type: "job",
      title: "Software Engineer at DNA Micro Software",
      date: "2021–2022",
      x: 2700,
      icon: "🔧",
      description:
        "Developed web and mobile applications using React, TypeScript, and Redux. Integrated third-party APIs and built REST services for production systems.",
      tags: ["React", "TypeScript", "Redux", "React Native"],
      color: "#f97316",
    },
    {
      id: 4,
      type: "job",
      title: "Software Engineer Analyst at Accenture (IMDA)",
      date: "2022–2023",
      x: 3900,
      icon: "🏢",
      description:
        "Delivered responsive enterprise applications using React, Material UI, Redux, and TypeScript. Actively contributed to Agile ceremonies and unit testing.",
      tags: ["React", "Material UI", "Redux", "Jest"],
      color: "#3b82f6",
    },
    {
      id: 5,
      type: "job",
      title: "Software Engineer III at Community Brands",
      date: "2023–2024",
      x: 5200,
      icon: "⚙️",
      description:
        "Built and maintained scalable frontend systems using React and Redux Saga. Optimized Webpack builds and supported legacy ColdFusion integrations.",
      tags: ["React", "Redux Saga", "Webpack", "Jest"],
      color: "#a855f7",
    },
    {
      id: 6,
      type: "job",
      title: "Senior Front-end Developer at Apteum (Landchecker)",
      date: "2024–Present",
      x: 6800,
      icon: "🗺️",
      description:
        "Leading development of geospatial tools using React and Mapbox. Integrated AI observability, real-time WebSockets, automation testing, and CI/CD improvements.",
      tags: [
        "React",
        "Mapbox GL",
        "Playwright",
        "WebSockets",
        "CI/CD",
        "Ruby on Rails",
      ],
      color: "#ec4899",
    },
    {
      id: 7,
      type: "project",
      title: "AI & Automation Systems",
      date: "2024",
      x: 8200,
      icon: "🤖",
      description:
        "Developed AI-powered features with Langfuse, automated PDF generation with Puppeteer, and improved reliability of LLM workflows.",
      tags: ["AI", "Langfuse", "Next.js", "Puppeteer"],
      color: "#ef4444",
    },
    {
      id: 8,
      type: "skill",
      title: "Testing, Performance & Scale",
      date: "2024",
      x: 9500,
      icon: "🧪",
      description:
        "Strengthened code quality through Playwright automation, SonarQube integration, dependency upgrades, and performance optimization.",
      tags: ["Playwright", "SonarQube", "Performance", "Testing"],
      color: "#10b981",
    },
  ],
  Ll = 11e3;
function i3() {
  const t = Vb(),
    [e, n] = M.useState({ left: !1, right: !1, interact: !1 }),
    [a, i] = M.useState(0),
    [l, s] = M.useState(0),
    [u, o] = M.useState(null),
    [r, c] = M.useState(!1),
    [f, d] = M.useState(!1),
    [m, b] = M.useState(!1),
    S = M.useRef(),
    A = M.useRef(),
    p = 15,
    h = 0.5,
    y = 0.98,
    v = {
      left: t.left || e.left,
      right: t.right || e.right,
      interact: t.interact || e.interact,
    },
    x = (j, U) => {
      n((yt) => ({ ...yt, [j]: U }));
    },
    C = () => {
      (d(!1), i(0), s(0), c(!1), o(null));
    };
  M.useEffect(() => {
    const j = setTimeout(() => b(!0), 2500);
    return () => clearTimeout(j);
  }, []);
  const E = (j) => {
    if (A.current !== void 0) {
      let U = l;
      (!r && !f && m
        ? v.right
          ? (U += h)
          : v.left
            ? (U -= h)
            : ((U *= y), Math.abs(U) < 0.1 && (U = 0))
        : ((U *= 0.8), Math.abs(U) < 0.1 && (U = 0)),
        (U = Math.max(Math.min(U, p), -p)));
      let yt = a + U;
      (yt < 0 && ((yt = 0), (U = 0)),
        yt >= Ll && ((yt = Ll), (U = 0), !f && Math.abs(l) > 0 && d(!0)),
        s(U),
        i(yt));
    }
    ((A.current = j), (S.current = requestAnimationFrame(E)));
  };
  (M.useEffect(
    () => (
      (S.current = requestAnimationFrame(E)),
      () => cancelAnimationFrame(S.current)
    ),
    [l, a, v, r, f, m],
  ),
    M.useEffect(() => {
      if (v.interact && !r && !f && m) {
        const j = oo.find((U) => Math.abs(U.x - a) < 150);
        j && (o(j), c(!0), s(0));
      }
    }, [v.interact, a, r, f, m]));
  const D = (a / Ll) * 100,
    N = oo.some((j) => Math.abs(j.x - a) < 150);
  return g.jsxs("div", {
    className:
      "relative w-full h-screen overflow-hidden bg-slate-900 select-none touch-none font-sans",
    children: [
      g.jsx("div", {
        className:
          "absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]",
      }),
      g.jsx("div", {
        className:
          "absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-t from-yellow-500 via-orange-500 to-pink-600 blur-sm opacity-90 shadow-[0_0_100px_rgba(236,72,153,0.5)]",
        children: [...Array(6)].map((j, U) =>
          g.jsx(
            "div",
            {
              className: "absolute w-full bg-[#1e1b4b] opacity-80",
              style: {
                height: `${U * 4 + 2}px`,
                bottom: `${10 + U * 15}%`,
                filter: "blur(1px)",
              },
            },
            U,
          ),
        ),
      }),
      g.jsx("div", {
        className: "absolute inset-0 opacity-50",
        style: {
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        },
      }),
      g.jsx(Jh, {
        speed: 0.1,
        offset: a,
        className: "bottom-48 h-64",
        children: g.jsxs("div", {
          className:
            "w-[200%] h-full absolute bottom-0 left-0 flex items-end opacity-60",
          children: [
            g.jsx("svg", {
              viewBox: "0 0 1200 300",
              className: "w-full h-full text-[#312e81] fill-current",
              preserveAspectRatio: "none",
              children: g.jsx("path", {
                d: "M0,300 L150,100 L300,300 L450,150 L600,300 L750,50 L900,300 L1050,200 L1200,300 Z",
              }),
            }),
            g.jsx("svg", {
              viewBox: "0 0 1200 300",
              className: "w-full h-full text-[#312e81] fill-current ml-[-1px]",
              preserveAspectRatio: "none",
              children: g.jsx("path", {
                d: "M0,300 L150,100 L300,300 L450,150 L600,300 L750,50 L900,300 L1050,200 L1200,300 Z",
              }),
            }),
          ],
        }),
      }),
      g.jsx(Jh, {
        speed: 0.3,
        offset: a,
        className: "bottom-40 h-48",
        children: g.jsx("div", {
          className:
            "w-[300%] h-full absolute bottom-0 left-0 flex items-end opacity-80",
          children: g.jsx("div", {
            className: "w-full h-32 bg-repeat-x",
            style: {
              backgroundImage:
                "linear-gradient(to top, #1e1b4b 0%, transparent 100%), linear-gradient(90deg, #1e1b4b 20px, transparent 20px), linear-gradient(90deg, transparent 40px, #1e1b4b 40px)",
              backgroundSize: "100% 100%, 60px 100%, 90px 80%",
            },
            children: g.jsx("div", {
              className: "w-full h-full opacity-30",
              style: {
                backgroundImage:
                  "radial-gradient(#fcd34d 1px, transparent 1px)",
                backgroundSize: "10px 15px",
              },
            }),
          }),
        }),
      }),
      g.jsx("div", {
        className:
          "absolute bottom-0 w-full h-1/3 bg-[#0f172a] road-perspective overflow-hidden",
        children: g.jsx("div", {
          className: "absolute inset-0 w-full h-[200%]",
          style: {
            backgroundImage:
              "linear-gradient(transparent 95%, rgba(6, 182, 212, 0.4) 95%), linear-gradient(90deg, transparent 95%, rgba(236, 72, 153, 0.2) 95%)",
            backgroundSize: "60px 60px",
            transform: `translateY(${a % 60}px) rotateX(60deg)`,
            backgroundPosition: `${-a}px 0`,
          },
        }),
      }),
      g.jsx("div", {
        className:
          "absolute bottom-0 w-full h-32 bg-slate-900 border-t-4 border-cyan-500 shadow-[0_-5px_30px_rgba(6,182,212,0.3)]",
        children: g.jsx("div", {
          className: "w-full h-full flex flex-col justify-center space-y-8",
          style: {
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, #fbbf24 40px, #fbbf24 80px)",
            backgroundPosition: `${-a}px 0`,
            opacity: 0.8,
          },
          children: g.jsx("div", { className: "w-full h-2 bg-transparent" }),
        }),
      }),
      g.jsx("div", {
        className: "absolute top-0 left-0 w-full h-full pointer-events-none",
        children: g.jsxs("div", {
          className: "absolute inset-0 w-full h-full will-change-transform",
          style: { transform: `translateX(${-a + window.innerWidth / 3}px)` },
          children: [
            g.jsx("div", {
              className:
                "absolute bottom-32 left-0 w-4 h-32 bg-white z-10 shadow-[0_0_20px_white]",
            }),
            g.jsx("div", {
              className:
                "absolute bottom-64 left-4 text-white font-black text-6xl transform -rotate-90 origin-bottom-left opacity-50",
              children: "START",
            }),
            oo.map((j) =>
              g.jsx(
                rA,
                {
                  milestone: j,
                  isVisible: Math.abs(j.x - a) < window.innerWidth * 1.5,
                  distanceFromCar: j.x - a,
                },
                j.id,
              ),
            ),
            g.jsxs("div", {
              className:
                "absolute bottom-32 w-24 h-32 z-10 flex flex-col justify-end border-l-4 border-white",
              style: { left: Ll },
              children: [
                g.jsx("div", {
                  className: "w-full h-full opacity-80",
                  style: {
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff, #fff 10px, #000 10px, #000 20px)",
                  },
                }),
                g.jsx("div", {
                  className:
                    "absolute -top-24 left-1/2 transform -translate-x-1/2 text-white font-black text-4xl whitespace-nowrap bg-black/50 px-4 py-2 rounded border border-white/20 backdrop-blur",
                  children: "FINISH LINE",
                }),
              ],
            }),
          ],
        }),
      }),
      g.jsx("div", {
        className:
          "absolute bottom-24 left-1/3 transform -translate-x-1/2 z-30",
        children: g.jsx(oA, {
          isMoving: Math.abs(l) > 0.1,
          direction: l > 0.5 ? "right" : l < -0.5 ? "left" : "idle",
        }),
      }),
      g.jsx(YA, { speed: Math.abs(l), progress: D }),
      g.jsx(GA, { onControlChange: x }),
      g.jsx(_s, {
        children:
          !m &&
          g.jsx(Q.div, {
            className:
              "absolute inset-0 bg-black z-50 flex items-center justify-center",
            exit: { opacity: 0, transition: { duration: 1 } },
            children: g.jsx(Q.div, {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "text-center",
              children: g.jsx("p", {
                className:
                  "text-cyan-300 text-xl tracking-widest uppercase animate-pulse",
                children: "Accelerating innovation at light speed",
              }),
            }),
          }),
      }),
      m &&
        g.jsxs(Q.div, {
          className:
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full px-4 z-40",
          animate: { opacity: a > 200 ? 0 : 1 },
          transition: { duration: 0.5 },
          children: [
            g.jsxs("div", {
              className:
                "hidden md:block bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-2xl",
              children: [
                g.jsx("p", {
                  className: "text-2xl text-white font-bold mb-4",
                  children: "CONTROLS",
                }),
                g.jsxs("div", {
                  className: "flex justify-center gap-8 mb-4",
                  children: [
                    g.jsxs("div", {
                      className: "flex flex-col items-center",
                      children: [
                        g.jsxs("div", {
                          className: "flex gap-2 mb-2",
                          children: [
                            g.jsx("span", {
                              className:
                                "w-10 h-10 border-2 border-cyan-500 rounded flex items-center justify-center text-cyan-400 font-bold bg-cyan-950/50",
                              children: "←",
                            }),
                            g.jsx("span", {
                              className:
                                "w-10 h-10 border-2 border-cyan-500 rounded flex items-center justify-center text-cyan-400 font-bold bg-cyan-950/50",
                              children: "→",
                            }),
                          ],
                        }),
                        g.jsx("span", {
                          className:
                            "text-xs text-slate-400 uppercase tracking-wider",
                          children: "Drive",
                        }),
                      ],
                    }),
                    g.jsxs("div", {
                      className: "flex flex-col items-center",
                      children: [
                        g.jsx("span", {
                          className:
                            "h-10 px-4 border-2 border-pink-500 rounded flex items-center justify-center text-pink-400 font-bold bg-pink-950/50 mb-2",
                          children: "ENTER",
                        }),
                        g.jsx("span", {
                          className:
                            "text-xs text-slate-400 uppercase tracking-wider",
                          children: "Interact",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            g.jsx("div", {
              className: "md:hidden",
              children: g.jsx("p", {
                className:
                  "text-lg text-white font-bold drop-shadow-md animate-pulse",
                children: "TAP ARROWS TO DRIVE",
              }),
            }),
          ],
        }),
      g.jsx(_s, {
        children:
          N &&
          !r &&
          !f &&
          g.jsx(Q.div, {
            className:
              "absolute bottom-56 left-1/2 transform -translate-x-1/2 pointer-events-none z-40",
            initial: { opacity: 0, y: 20, scale: 0.8 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 20, scale: 0.8 },
            children: g.jsxs("div", {
              className: "relative group",
              children: [
                g.jsx("div", {
                  className:
                    "absolute inset-0 bg-pink-500 blur-lg opacity-50 animate-pulse rounded-full",
                }),
                g.jsxs("div", {
                  className:
                    "relative bg-slate-900 text-white px-6 py-3 rounded-full border-2 border-pink-500 flex items-center gap-3 shadow-[0_0_20px_rgba(236,72,153,0.4)]",
                  children: [
                    g.jsx("span", {
                      className: "hidden md:inline font-bold text-pink-400",
                      children: "ENTER",
                    }),
                    g.jsx("span", {
                      className: "md:hidden font-bold text-pink-400",
                      children: "TAP VIEW",
                    }),
                    g.jsx("span", { className: "w-px h-4 bg-slate-700" }),
                    g.jsx("span", {
                      className: "font-medium",
                      children: "Open Milestone",
                    }),
                  ],
                }),
                g.jsx("div", {
                  className:
                    "absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-pink-500 transform rotate-45",
                }),
              ],
            }),
          }),
      }),
      g.jsx(qA, { milestone: u, isOpen: r, onClose: () => c(!1) }),
      g.jsx(a3, { isOpen: f, onRestart: C }),
    ],
  });
}
function l3() {
  return g.jsx("div", {
    className: "w-full h-screen overflow-hidden",
    children: g.jsx(i3, {}),
  });
}
const $h = document.getElementById("root");
$h && wb.createRoot($h).render(g.jsx(l3, {}));
