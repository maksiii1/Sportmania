if (location.href.indexOf("/administrator/") + 1) {
  (function () {
    this.MooTools = {
      version: "1.4.5",
      build: "ab8ea8824dc3b24b6666867a2c4ed58ebb762cf0",
    };
    var e = (this.typeOf = function (i) {
      if (i == null) {
        return "null";
      }
      if (i.$family != null) {
        return i.$family();
      }
      if (i.nodeName) {
        if (i.nodeType == 1) {
          return "element";
        }
        if (i.nodeType == 3) {
          return /\S/.test(i.nodeValue) ? "textnode" : "whitespace";
        }
      } else {
        if (typeof i.length == "number") {
          if (i.callee) {
            return "arguments";
          }
          if ("item" in i) {
            return "collection";
          }
        }
      }
      return typeof i;
    });
    var u = (this.instanceOf = function (w, i) {
      if (w == null) {
        return false;
      }
      var v = w.$constructor || w.constructor;
      while (v) {
        if (v === i) {
          return true;
        }
        v = v.parent;
      }
      if (!w.hasOwnProperty) {
        return false;
      }
      return w instanceof i;
    });
    var f = this.Function;
    var r = true;
    for (var q in { toString: 1 }) {
      r = null;
    }
    if (r) {
      r = [
        "hasOwnProperty",
        "valueOf",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "constructor",
      ];
    }
    f.prototype.overloadSetter = function (v) {
      var i = this;
      return function (x, w) {
        if (x == null) {
          return this;
        }
        if (v || typeof x != "string") {
          for (var y in x) {
            i.call(this, y, x[y]);
          }
          if (r) {
            for (var z = r.length; z--; ) {
              y = r[z];
              if (x.hasOwnProperty(y)) {
                i.call(this, y, x[y]);
              }
            }
          }
        } else {
          i.call(this, x, w);
        }
        return this;
      };
    };
    f.prototype.overloadGetter = function (v) {
      var i = this;
      return function (x) {
        var y, w;
        if (typeof x != "string") {
          y = x;
        } else {
          if (arguments.length > 1) {
            y = arguments;
          } else {
            if (v) {
              y = [x];
            }
          }
        }
        if (y) {
          w = {};
          for (var z = 0; z < y.length; z++) {
            w[y[z]] = i.call(this, y[z]);
          }
        } else {
          w = i.call(this, x);
        }
        return w;
      };
    };
    f.prototype.extend = function (i, v) {
      this[i] = v;
    }.overloadSetter();
    f.prototype.implement = function (i, v) {
      this.prototype[i] = v;
    }.overloadSetter();
    var o = Array.prototype.slice;
    f.from = function (i) {
      return e(i) == "function"
        ? i
        : function () {
            return i;
          };
    };
    Array.from = function (i) {
      if (i == null) {
        return [];
      }
      return k.isEnumerable(i) && typeof i != "string"
        ? e(i) == "array"
          ? i
          : o.call(i)
        : [i];
    };
    Number.from = function (v) {
      var i = parseFloat(v);
      return isFinite(i) ? i : null;
    };
    String.from = function (i) {
      return i + "";
    };
    f.implement({
      hide: function () {
        this.$hidden = true;
        return this;
      },
      protect: function () {
        this.$protected = true;
        return this;
      },
    });
    var k = (this.Type = function (x, w) {
      if (x) {
        var v = x.toLowerCase();
        var i = function (y) {
          return e(y) == v;
        };
        k["is" + x] = i;
        if (w != null) {
          w.prototype.$family = function () {
            return v;
          }.hide();
          w.type = i;
        }
      }
      if (w == null) {
        return null;
      }
      w.extend(this);
      w.$constructor = k;
      w.prototype.$constructor = w;
      return w;
    });
    var p = Object.prototype.toString;
    k.isEnumerable = function (i) {
      return (
        i != null &&
        typeof i.length == "number" &&
        p.call(i) != "[object Function]"
      );
    };
    var b = {};
    var d = function (i) {
      var v = e(i.prototype);
      return b[v] || (b[v] = []);
    };
    var h = function (w, A) {
      if (A && A.$hidden) {
        return;
      }
      var v = d(this);
      for (var x = 0; x < v.length; x++) {
        var z = v[x];
        if (e(z) == "type") {
          h.call(z, w, A);
        } else {
          z.call(this, w, A);
        }
      }
      var y = this.prototype[w];
      if (y == null || !y.$protected) {
        this.prototype[w] = A;
      }
      if (this[w] == null && e(A) == "function") {
        t.call(this, w, function (i) {
          return A.apply(i, o.call(arguments, 1));
        });
      }
    };
    var t = function (i, w) {
      if (w && w.$hidden) {
        return;
      }
      var v = this[i];
      if (v == null || !v.$protected) {
        this[i] = w;
      }
    };
    k.implement({
      implement: h.overloadSetter(),
      extend: t.overloadSetter(),
      alias: function (i, v) {
        h.call(this, i, this.prototype[v]);
      }.overloadSetter(),
      mirror: function (i) {
        d(this).push(i);
        return this;
      },
    });
    new k("Type", k);
    var c = function (v, A, y) {
      var x = A != Object,
        E = A.prototype;
      if (x) {
        A = new k(v, A);
      }
      for (var B = 0, z = y.length; B < z; B++) {
        var F = y[B],
          D = A[F],
          C = E[F];
        if (D) {
          D.protect();
        }
        if (x && C) {
          A.implement(F, C.protect());
        }
      }
      if (x) {
        var w = E.propertyIsEnumerable(y[0]);
        A.forEachMethod = function (J) {
          if (!w) {
            for (var I = 0, G = y.length; I < G; I++) {
              J.call(E, E[y[I]], y[I]);
            }
          }
          for (var H in E) {
            J.call(E, E[H], H);
          }
        };
      }
      return c;
    };
    c("String", String, [
      "charAt",
      "charCodeAt",
      "concat",
      "indexOf",
      "lastIndexOf",
      "match",
      "quote",
      "replace",
      "search",
      "slice",
      "split",
      "substr",
      "substring",
      "trim",
      "toLowerCase",
      "toUpperCase",
    ])("Array", Array, [
      "pop",
      "push",
      "reverse",
      "shift",
      "sort",
      "splice",
      "unshift",
      "concat",
      "join",
      "slice",
      "indexOf",
      "lastIndexOf",
      "filter",
      "forEach",
      "every",
      "map",
      "some",
      "reduce",
      "reduceRight",
    ])("Number", Number, [
      "toExponential",
      "toFixed",
      "toLocaleString",
      "toPrecision",
    ])("Function", f, ["apply", "call", "bind"])("RegExp", RegExp, [
      "exec",
      "test",
    ])("Object", Object, [
      "create",
      "defineProperty",
      "defineProperties",
      "keys",
      "getPrototypeOf",
      "getOwnPropertyDescriptor",
      "getOwnPropertyNames",
      "preventExtensions",
      "isExtensible",
      "seal",
      "isSealed",
      "freeze",
      "isFrozen",
    ])("Date", Date, ["now"]);
    Object.extend = t.overloadSetter();
    Date.extend("now", function () {
      return +new Date();
    });
    new k("Boolean", Boolean);
    Number.prototype.$family = function () {
      return isFinite(this) ? "number" : "null";
    }.hide();
    Number.extend("random", function (v, i) {
      return Math.floor(Math.random() * (i - v + 1) + v);
    });
    var l = Object.prototype.hasOwnProperty;
    Object.extend("forEach", function (i, w, x) {
      for (var v in i) {
        if (l.call(i, v)) {
          w.call(x, i[v], v, i);
        }
      }
    });
    Object.each = Object.forEach;
    Array.implement({
      forEach: function (x, y) {
        for (var w = 0, v = this.length; w < v; w++) {
          if (w in this) {
            x.call(y, this[w], w, this);
          }
        }
      },
      each: function (i, v) {
        Array.forEach(this, i, v);
        return this;
      },
    });
    var s = function (i) {
      switch (e(i)) {
        case "array":
          return i.clone();
        case "object":
          return Object.clone(i);
        default:
          return i;
      }
    };
    Array.implement("clone", function () {
      var v = this.length,
        w = new Array(v);
      while (v--) {
        w[v] = s(this[v]);
      }
      return w;
    });
    var a = function (v, i, w) {
      switch (e(w)) {
        case "object":
          if (e(v[i]) == "object") {
            Object.merge(v[i], w);
          } else {
            v[i] = Object.clone(w);
          }
          break;
        case "array":
          v[i] = w.clone();
          break;
        default:
          v[i] = w;
      }
      return v;
    };
    Object.extend({
      merge: function (C, y, x) {
        if (e(y) == "string") {
          return a(C, y, x);
        }
        for (var B = 1, w = arguments.length; B < w; B++) {
          var z = arguments[B];
          for (var A in z) {
            a(C, A, z[A]);
          }
        }
        return C;
      },
      clone: function (i) {
        var w = {};
        for (var v in i) {
          w[v] = s(i[v]);
        }
        return w;
      },
      append: function (z) {
        for (var y = 1, w = arguments.length; y < w; y++) {
          var v = arguments[y] || {};
          for (var x in v) {
            z[x] = v[x];
          }
        }
        return z;
      },
    });
    ["Object", "WhiteSpace", "TextNode", "Collection", "Arguments"].each(
      function (i) {
        new k(i);
      }
    );
    var j = Date.now();
    String.extend("uniqueID", function () {
      return (j++).toString(36);
    });
    var g = (this.Hash = new k("Hash", function (i) {
      if (e(i) == "hash") {
        i = Object.clone(i.getClean());
      }
      for (var v in i) {
        this[v] = i[v];
      }
      return this;
    }));
    g.implement({
      forEach: function (i, v) {
        Object.forEach(this, i, v);
      },
      getClean: function () {
        var v = {};
        for (var i in this) {
          if (this.hasOwnProperty(i)) {
            v[i] = this[i];
          }
        }
        return v;
      },
      getLength: function () {
        var v = 0;
        for (var i in this) {
          if (this.hasOwnProperty(i)) {
            v++;
          }
        }
        return v;
      },
    });
    g.alias("each", "forEach");
    Object.type = k.isObject;
    var n = (this.Native = function (i) {
      return new k(i.name, i.initialize);
    });
    n.type = k.type;
    n.implement = function (x, v) {
      for (var w = 0; w < x.length; w++) {
        x[w].implement(v);
      }
      return n;
    };
    var m = Array.type;
    Array.type = function (i) {
      return u(i, Array) || m(i);
    };
    this.$A = function (i) {
      return Array.from(i).slice();
    };
    this.$arguments = function (v) {
      return function () {
        return arguments[v];
      };
    };
    this.$chk = function (i) {
      return !!(i || i === 0);
    };
    this.$clear = function (i) {
      clearTimeout(i);
      clearInterval(i);
      return null;
    };
    this.$defined = function (i) {
      return i != null;
    };
    this.$each = function (w, v, x) {
      var i = e(w);
      (i == "arguments" || i == "collection" || i == "array" || i == "elements"
        ? Array
        : Object
      ).each(w, v, x);
    };
    this.$empty = function () {};
    this.$extend = function (v, i) {
      return Object.append(v, i);
    };
    this.$H = function (i) {
      return new g(i);
    };
    this.$merge = function () {
      var i = Array.slice(arguments);
      i.unshift({});
      return Object.merge.apply(null, i);
    };
    this.$lambda = f.from;
    this.$mixin = Object.merge;
    this.$random = Number.random;
    this.$splat = Array.from;
    this.$time = Date.now;
    this.$type = function (i) {
      var v = e(i);
      if (v == "elements") {
        return "array";
      }
      return v == "null" ? false : v;
    };
    this.$unlink = function (i) {
      switch (e(i)) {
        case "object":
          return Object.clone(i);
        case "array":
          return Array.clone(i);
        case "hash":
          return new g(i);
        default:
          return i;
      }
    };
  })();
  Array.implement({
    every: function (c, d) {
      for (var b = 0, a = this.length >>> 0; b < a; b++) {
        if (b in this && !c.call(d, this[b], b, this)) {
          return false;
        }
      }
      return true;
    },
    filter: function (d, f) {
      var c = [];
      for (var e, b = 0, a = this.length >>> 0; b < a; b++) {
        if (b in this) {
          e = this[b];
          if (d.call(f, e, b, this)) {
            c.push(e);
          }
        }
      }
      return c;
    },
    indexOf: function (c, d) {
      var b = this.length >>> 0;
      for (var a = d < 0 ? Math.max(0, b + d) : d || 0; a < b; a++) {
        if (this[a] === c) {
          return a;
        }
      }
      return -1;
    },
    map: function (c, e) {
      var d = this.length >>> 0,
        b = Array(d);
      for (var a = 0; a < d; a++) {
        if (a in this) {
          b[a] = c.call(e, this[a], a, this);
        }
      }
      return b;
    },
    some: function (c, d) {
      for (var b = 0, a = this.length >>> 0; b < a; b++) {
        if (b in this && c.call(d, this[b], b, this)) {
          return true;
        }
      }
      return false;
    },
    clean: function () {
      return this.filter(function (a) {
        return a != null;
      });
    },
    invoke: function (a) {
      var b = Array.slice(arguments, 1);
      return this.map(function (c) {
        return c[a].apply(c, b);
      });
    },
    associate: function (c) {
      var d = {},
        b = Math.min(this.length, c.length);
      for (var a = 0; a < b; a++) {
        d[c[a]] = this[a];
      }
      return d;
    },
    link: function (c) {
      var a = {};
      for (var e = 0, b = this.length; e < b; e++) {
        for (var d in c) {
          if (c[d](this[e])) {
            a[d] = this[e];
            delete c[d];
            break;
          }
        }
      }
      return a;
    },
    contains: function (a, b) {
      return this.indexOf(a, b) != -1;
    },
    append: function (a) {
      this.push.apply(this, a);
      return this;
    },
    getLast: function () {
      return this.length ? this[this.length - 1] : null;
    },
    getRandom: function () {
      return this.length ? this[Number.random(0, this.length - 1)] : null;
    },
    include: function (a) {
      if (!this.contains(a)) {
        this.push(a);
      }
      return this;
    },
    combine: function (c) {
      for (var b = 0, a = c.length; b < a; b++) {
        this.include(c[b]);
      }
      return this;
    },
    erase: function (b) {
      for (var a = this.length; a--; ) {
        if (this[a] === b) {
          this.splice(a, 1);
        }
      }
      return this;
    },
    empty: function () {
      this.length = 0;
      return this;
    },
    flatten: function () {
      var d = [];
      for (var b = 0, a = this.length; b < a; b++) {
        var c = typeOf(this[b]);
        if (c == "null") {
          continue;
        }
        d = d.concat(
          c == "array" ||
            c == "collection" ||
            c == "arguments" ||
            instanceOf(this[b], Array)
            ? Array.flatten(this[b])
            : this[b]
        );
      }
      return d;
    },
    pick: function () {
      for (var b = 0, a = this.length; b < a; b++) {
        if (this[b] != null) {
          return this[b];
        }
      }
      return null;
    },
    hexToRgb: function (b) {
      if (this.length != 3) {
        return null;
      }
      var a = this.map(function (c) {
        if (c.length == 1) {
          c += c;
        }
        return c.toInt(16);
      });
      return b ? a : "rgb(" + a + ")";
    },
    rgbToHex: function (d) {
      if (this.length < 3) {
        return null;
      }
      if (this.length == 4 && this[3] == 0 && !d) {
        return "transparent";
      }
      var b = [];
      for (var a = 0; a < 3; a++) {
        var c = (this[a] - 0).toString(16);
        b.push(c.length == 1 ? "0" + c : c);
      }
      return d ? b : "#" + b.join("");
    },
  });
  Array.alias("extend", "append");
  var $pick = function () {
    return Array.from(arguments).pick();
  };
  String.implement({
    test: function (a, b) {
      return (typeOf(a) == "regexp" ? a : new RegExp("" + a, b)).test(this);
    },
    contains: function (a, b) {
      return b
        ? (b + this + b).indexOf(b + a + b) > -1
        : String(this).indexOf(a) > -1;
    },
    trim: function () {
      return String(this).replace(/^\s+|\s+$/g, "");
    },
    clean: function () {
      return String(this).replace(/\s+/g, " ").trim();
    },
    camelCase: function () {
      return String(this).replace(/-\D/g, function (a) {
        return a.charAt(1).toUpperCase();
      });
    },
    hyphenate: function () {
      return String(this).replace(/[A-Z]/g, function (a) {
        return "-" + a.charAt(0).toLowerCase();
      });
    },
    capitalize: function () {
      return String(this).replace(/\b[a-z]/g, function (a) {
        return a.toUpperCase();
      });
    },
    escapeRegExp: function () {
      return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
    },
    toInt: function (a) {
      return parseInt(this, a || 10);
    },
    toFloat: function () {
      return parseFloat(this);
    },
    hexToRgb: function (b) {
      var a = String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
      return a ? a.slice(1).hexToRgb(b) : null;
    },
    rgbToHex: function (b) {
      var a = String(this).match(/\d{1,3}/g);
      return a ? a.rgbToHex(b) : null;
    },
    substitute: function (a, b) {
      return String(this).replace(b || /\\?\{([^{}]+)\}/g, function (d, c) {
        if (d.charAt(0) == "\\") {
          return d.slice(1);
        }
        return a[c] != null ? a[c] : "";
      });
    },
  });
  Number.implement({
    limit: function (b, a) {
      return Math.min(a, Math.max(b, this));
    },
    round: function (a) {
      a = Math.pow(10, a || 0).toFixed(a < 0 ? -a : 0);
      return Math.round(this * a) / a;
    },
    times: function (b, c) {
      for (var a = 0; a < this; a++) {
        b.call(c, a, this);
      }
    },
    toFloat: function () {
      return parseFloat(this);
    },
    toInt: function (a) {
      return parseInt(this, a || 10);
    },
  });
  Number.alias("each", "times");
  (function (b) {
    var a = {};
    b.each(function (c) {
      if (!Number[c]) {
        a[c] = function () {
          return Math[c].apply(null, [this].concat(Array.from(arguments)));
        };
      }
    });
    Number.implement(a);
  })([
    "abs",
    "acos",
    "asin",
    "atan",
    "atan2",
    "ceil",
    "cos",
    "exp",
    "floor",
    "log",
    "max",
    "min",
    "pow",
    "sin",
    "sqrt",
    "tan",
  ]);
  Function.extend({
    attempt: function () {
      for (var b = 0, a = arguments.length; b < a; b++) {
        try {
          return arguments[b]();
        } catch (c) {}
      }
      return null;
    },
  });
  Function.implement({
    attempt: function (a, c) {
      try {
        return this.apply(c, Array.from(a));
      } catch (b) {}
      return null;
    },
    bind: function (e) {
      var a = this,
        b = arguments.length > 1 ? Array.slice(arguments, 1) : null,
        d = function () {};
      var c = function () {
        var g = e,
          h = arguments.length;
        if (this instanceof c) {
          d.prototype = a.prototype;
          g = new d();
        }
        var f =
          !b && !h
            ? a.call(g)
            : a.apply(
                g,
                b && h ? b.concat(Array.slice(arguments)) : b || arguments
              );
        return g == e ? f : g;
      };
      return c;
    },
    pass: function (b, c) {
      var a = this;
      if (b != null) {
        b = Array.from(b);
      }
      return function () {
        return a.apply(c, b || arguments);
      };
    },
    delay: function (b, c, a) {
      return setTimeout(this.pass(a == null ? [] : a, c), b);
    },
    periodical: function (c, b, a) {
      return setInterval(this.pass(a == null ? [] : a, b), c);
    },
  });
  delete Function.prototype.bind;
  Function.implement({
    create: function (b) {
      var a = this;
      b = b || {};
      return function (d) {
        var c = b.arguments;
        c = c != null ? Array.from(c) : Array.slice(arguments, b.event ? 1 : 0);
        if (b.event) {
          c = [d || window.event].extend(c);
        }
        var e = function () {
          return a.apply(b.bind || null, c);
        };
        if (b.delay) {
          return setTimeout(e, b.delay);
        }
        if (b.periodical) {
          return setInterval(e, b.periodical);
        }
        if (b.attempt) {
          return Function.attempt(e);
        }
        return e();
      };
    },
    bind: function (c, b) {
      var a = this;
      if (b != null) {
        b = Array.from(b);
      }
      return function () {
        return a.apply(c, b || arguments);
      };
    },
    bindWithEvent: function (c, b) {
      var a = this;
      if (b != null) {
        b = Array.from(b);
      }
      return function (d) {
        return a.apply(c, b == null ? arguments : [d].concat(b));
      };
    },
    run: function (a, b) {
      return this.apply(b, Array.from(a));
    },
  });
  if (Object.create == Function.prototype.create) {
    Object.create = null;
  }
  var $try = Function.attempt;
  (function () {
    var a = Object.prototype.hasOwnProperty;
    Object.extend({
      subset: function (d, g) {
        var f = {};
        for (var e = 0, b = g.length; e < b; e++) {
          var c = g[e];
          if (c in d) {
            f[c] = d[c];
          }
        }
        return f;
      },
      map: function (b, e, f) {
        var d = {};
        for (var c in b) {
          if (a.call(b, c)) {
            d[c] = e.call(f, b[c], c, b);
          }
        }
        return d;
      },
      filter: function (b, e, g) {
        var d = {};
        for (var c in b) {
          var f = b[c];
          if (a.call(b, c) && e.call(g, f, c, b)) {
            d[c] = f;
          }
        }
        return d;
      },
      every: function (b, d, e) {
        for (var c in b) {
          if (a.call(b, c) && !d.call(e, b[c], c)) {
            return false;
          }
        }
        return true;
      },
      some: function (b, d, e) {
        for (var c in b) {
          if (a.call(b, c) && d.call(e, b[c], c)) {
            return true;
          }
        }
        return false;
      },
      keys: function (b) {
        var d = [];
        for (var c in b) {
          if (a.call(b, c)) {
            d.push(c);
          }
        }
        return d;
      },
      values: function (c) {
        var b = [];
        for (var d in c) {
          if (a.call(c, d)) {
            b.push(c[d]);
          }
        }
        return b;
      },
      getLength: function (b) {
        return Object.keys(b).length;
      },
      keyOf: function (b, d) {
        for (var c in b) {
          if (a.call(b, c) && b[c] === d) {
            return c;
          }
        }
        return null;
      },
      contains: function (b, c) {
        return Object.keyOf(b, c) != null;
      },
      toQueryString: function (b, c) {
        var d = [];
        Object.each(b, function (h, g) {
          if (c) {
            g = c + "[" + g + "]";
          }
          var f;
          switch (typeOf(h)) {
            case "object":
              f = Object.toQueryString(h, g);
              break;
            case "array":
              var e = {};
              h.each(function (k, j) {
                e[j] = k;
              });
              f = Object.toQueryString(e, g);
              break;
            default:
              f = g + "=" + encodeURIComponent(h);
          }
          if (h != null) {
            d.push(f);
          }
        });
        return d.join("&");
      },
    });
  })();
  Hash.implement({
    has: Object.prototype.hasOwnProperty,
    keyOf: function (a) {
      return Object.keyOf(this, a);
    },
    hasValue: function (a) {
      return Object.contains(this, a);
    },
    extend: function (a) {
      Hash.each(
        a || {},
        function (c, b) {
          Hash.set(this, b, c);
        },
        this
      );
      return this;
    },
    combine: function (a) {
      Hash.each(
        a || {},
        function (c, b) {
          Hash.include(this, b, c);
        },
        this
      );
      return this;
    },
    erase: function (a) {
      if (this.hasOwnProperty(a)) {
        delete this[a];
      }
      return this;
    },
    get: function (a) {
      return this.hasOwnProperty(a) ? this[a] : null;
    },
    set: function (a, b) {
      if (!this[a] || this.hasOwnProperty(a)) {
        this[a] = b;
      }
      return this;
    },
    empty: function () {
      Hash.each(
        this,
        function (b, a) {
          delete this[a];
        },
        this
      );
      return this;
    },
    include: function (a, b) {
      if (this[a] == null) {
        this[a] = b;
      }
      return this;
    },
    map: function (a, b) {
      return new Hash(Object.map(this, a, b));
    },
    filter: function (a, b) {
      return new Hash(Object.filter(this, a, b));
    },
    every: function (a, b) {
      return Object.every(this, a, b);
    },
    some: function (a, b) {
      return Object.some(this, a, b);
    },
    getKeys: function () {
      return Object.keys(this);
    },
    getValues: function () {
      return Object.values(this);
    },
    toQueryString: function (a) {
      return Object.toQueryString(this, a);
    },
  });
  Hash.extend = Object.append;
  Hash.alias({ indexOf: "keyOf", contains: "hasValue" });
  (function () {
    var k = this.document;
    var h = (k.window = this);
    var a = navigator.userAgent.toLowerCase(),
      b = navigator.platform.toLowerCase(),
      i = a.match(
        /(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/
      ) || [null, "unknown", 0],
      f = i[1] == "ie" && k.documentMode;
    var o = (this.Browser = {
      extend: Function.prototype.extend,
      name: i[1] == "version" ? i[3] : i[1],
      version: f || parseFloat(i[1] == "opera" && i[4] ? i[4] : i[2]),
      Platform: {
        name: a.match(/ip(?:ad|od|hone)/)
          ? "ios"
          : (a.match(/(?:webos|android)/) ||
              b.match(/mac|win|linux/) || ["other"])[0],
      },
      Features: {
        xpath: !!k.evaluate,
        air: !!h.runtime,
        query: !!k.querySelector,
        json: !!h.JSON,
      },
      Plugins: {},
    });
    o[o.name] = true;
    o[o.name + parseInt(o.version, 10)] = true;
    o.Platform[o.Platform.name] = true;
    o.Request = (function () {
      var q = function () {
        return new XMLHttpRequest();
      };
      var p = function () {
        return new ActiveXObject("MSXML2.XMLHTTP");
      };
      var e = function () {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
      return Function.attempt(
        function () {
          q();
          return q;
        },
        function () {
          p();
          return p;
        },
        function () {
          e();
          return e;
        }
      );
    })();
    o.Features.xhr = !!o.Request;
    var j = (
      Function.attempt(
        function () {
          return navigator.plugins["Shockwave Flash"].description;
        },
        function () {
          return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable(
            "$version"
          );
        }
      ) || "0 r0"
    ).match(/\d+/g);
    o.Plugins.Flash = {
      version: Number(j[0] || "0." + j[1]) || 0,
      build: Number(j[2]) || 0,
    };
    o.exec = function (p) {
      if (!p) {
        return p;
      }
      if (h.execScript) {
        h.execScript(p);
      } else {
        var e = k.createElement("script");
        e.setAttribute("type", "text/javascript");
        e.text = p;
        k.head.appendChild(e);
        k.head.removeChild(e);
      }
      return p;
    };
    String.implement("stripScripts", function (p) {
      var e = "";
      var q = this.replace(
        /<script[^>]*>([\s\S]*?)<\/script>/gi,
        function (r, s) {
          e += s + "\n";
          return "";
        }
      );
      if (p === true) {
        o.exec(e);
      } else {
        if (typeOf(p) == "function") {
          p(e, q);
        }
      }
      return q;
    });
    o.extend({
      Document: this.Document,
      Window: this.Window,
      Element: this.Element,
      Event: this.Event,
    });
    this.Window = this.$constructor = new Type("Window", function () {});
    this.$family = Function.from("window").hide();
    Window.mirror(function (e, p) {
      h[e] = p;
    });
    this.Document = k.$constructor = new Type("Document", function () {});
    k.$family = Function.from("document").hide();
    Document.mirror(function (e, p) {
      k[e] = p;
    });
    k.html = k.documentElement;
    if (!k.head) {
      k.head = k.getElementsByTagName("head")[0];
    }
    if (k.execCommand) {
      try {
        k.execCommand("BackgroundImageCache", false, true);
      } catch (g) {}
    }
    if (this.attachEvent && !this.addEventListener) {
      var c = function () {
        this.detachEvent("onunload", c);
        k.head = k.html = k.window = null;
      };
      this.attachEvent("onunload", c);
    }
    var m = Array.from;
    try {
      m(k.html.childNodes);
    } catch (g) {
      Array.from = function (p) {
        if (
          typeof p != "string" &&
          Type.isEnumerable(p) &&
          typeOf(p) != "array"
        ) {
          var e = p.length,
            q = new Array(e);
          while (e--) {
            q[e] = p[e];
          }
          return q;
        }
        return m(p);
      };
      var l = Array.prototype,
        n = l.slice;
      [
        "pop",
        "push",
        "reverse",
        "shift",
        "sort",
        "splice",
        "unshift",
        "concat",
        "join",
        "slice",
      ].each(function (e) {
        var p = l[e];
        Array[e] = function (q) {
          return p.apply(Array.from(q), n.call(arguments, 1));
        };
      });
    }
    if (o.Platform.ios) {
      o.Platform.ipod = true;
    }
    o.Engine = {};
    var d = function (p, e) {
      o.Engine.name = p;
      o.Engine[p + e] = true;
      o.Engine.version = e;
    };
    if (o.ie) {
      o.Engine.trident = true;
      switch (o.version) {
        case 6:
          d("trident", 4);
          break;
        case 7:
          d("trident", 5);
          break;
        case 8:
          d("trident", 6);
      }
    }
    if (o.firefox) {
      o.Engine.gecko = true;
      if (o.version >= 3) {
        d("gecko", 19);
      } else {
        d("gecko", 18);
      }
    }
    if (o.safari || o.chrome) {
      o.Engine.webkit = true;
      switch (o.version) {
        case 2:
          d("webkit", 419);
          break;
        case 3:
          d("webkit", 420);
          break;
        case 4:
          d("webkit", 525);
      }
    }
    if (o.opera) {
      o.Engine.presto = true;
      if (o.version >= 9.6) {
        d("presto", 960);
      } else {
        if (o.version >= 9.5) {
          d("presto", 950);
        } else {
          d("presto", 925);
        }
      }
    }
    if (o.name == "unknown") {
      switch ((a.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
        case "webkit":
        case "khtml":
          o.Engine.webkit = true;
          break;
        case "gecko":
          o.Engine.gecko = true;
      }
    }
    this.$exec = o.exec;
  })();
  (function () {
    var b = {};
    var a = (this.DOMEvent = new Type("DOMEvent", function (c, g) {
      if (!g) {
        g = window;
      }
      c = c || g.event;
      if (c.$extended) {
        return c;
      }
      this.event = c;
      this.$extended = true;
      this.shift = c.shiftKey;
      this.control = c.ctrlKey;
      this.alt = c.altKey;
      this.meta = c.metaKey;
      var i = (this.type = c.type);
      var h = c.target || c.srcElement;
      while (h && h.nodeType == 3) {
        h = h.parentNode;
      }
      this.target = document.id(h);
      if (i.indexOf("key") == 0) {
        var d = (this.code = c.which || c.keyCode);
        this.key = b[d] || Object.keyOf(Event.Keys, d);
        if (i == "keydown") {
          if (d > 111 && d < 124) {
            this.key = "f" + (d - 111);
          } else {
            if (d > 95 && d < 106) {
              this.key = d - 96;
            }
          }
        }
        if (this.key == null) {
          this.key = String.fromCharCode(d).toLowerCase();
        }
      } else {
        if (
          i == "click" ||
          i == "dblclick" ||
          i == "contextmenu" ||
          i == "DOMMouseScroll" ||
          i.indexOf("mouse") == 0
        ) {
          var j = g.document;
          j = !j.compatMode || j.compatMode == "CSS1Compat" ? j.html : j.body;
          this.page = {
            x: c.pageX != null ? c.pageX : c.clientX + j.scrollLeft,
            y: c.pageY != null ? c.pageY : c.clientY + j.scrollTop,
          };
          this.client = {
            x: c.pageX != null ? c.pageX - g.pageXOffset : c.clientX,
            y: c.pageY != null ? c.pageY - g.pageYOffset : c.clientY,
          };
          if (i == "DOMMouseScroll" || i == "mousewheel") {
            this.wheel = c.wheelDelta
              ? c.wheelDelta / 120
              : -(c.detail || 0) / 3;
          }
          this.rightClick = c.which == 3 || c.button == 2;
          if (i == "mouseover" || i == "mouseout") {
            var k =
              c.relatedTarget ||
              c[(i == "mouseover" ? "from" : "to") + "Element"];
            while (k && k.nodeType == 3) {
              k = k.parentNode;
            }
            this.relatedTarget = document.id(k);
          }
        } else {
          if (i.indexOf("touch") == 0 || i.indexOf("gesture") == 0) {
            this.rotation = c.rotation;
            this.scale = c.scale;
            this.targetTouches = c.targetTouches;
            this.changedTouches = c.changedTouches;
            var f = (this.touches = c.touches);
            if (f && f[0]) {
              var e = f[0];
              this.page = { x: e.pageX, y: e.pageY };
              this.client = { x: e.clientX, y: e.clientY };
            }
          }
        }
      }
      if (!this.client) {
        this.client = {};
      }
      if (!this.page) {
        this.page = {};
      }
    }));
    a.implement({
      stop: function () {
        return this.preventDefault().stopPropagation();
      },
      stopPropagation: function () {
        if (this.event.stopPropagation) {
          this.event.stopPropagation();
        } else {
          this.event.cancelBubble = true;
        }
        return this;
      },
      preventDefault: function () {
        if (this.event.preventDefault) {
          this.event.preventDefault();
        } else {
          this.event.returnValue = false;
        }
        return this;
      },
    });
    a.defineKey = function (d, c) {
      b[d] = c;
      return this;
    };
    a.defineKeys = a.defineKey.overloadSetter(true);
    a.defineKeys({
      38: "up",
      40: "down",
      37: "left",
      39: "right",
      27: "esc",
      32: "space",
      8: "backspace",
      9: "tab",
      46: "delete",
      13: "enter",
    });
  })();
  var Event = DOMEvent;
  Event.Keys = {};
  Event.Keys = new Hash(Event.Keys);
  (function () {
    var a = (this.Class = new Type("Class", function (h) {
      if (instanceOf(h, Function)) {
        h = { initialize: h };
      }
      var g = function () {
        e(this);
        if (g.$prototyping) {
          return this;
        }
        this.$caller = null;
        var i = this.initialize ? this.initialize.apply(this, arguments) : this;
        this.$caller = this.caller = null;
        return i;
      }
        .extend(this)
        .implement(h);
      g.$constructor = a;
      g.prototype.$constructor = g;
      g.prototype.parent = c;
      return g;
    }));
    var c = function () {
      if (!this.$caller) {
        throw new Error('The method "parent" cannot be called.');
      }
      var g = this.$caller.$name,
        h = this.$caller.$owner.parent,
        i = h ? h.prototype[g] : null;
      if (!i) {
        throw new Error('The method "' + g + '" has no parent.');
      }
      return i.apply(this, arguments);
    };
    var e = function (g) {
      for (var h in g) {
        var j = g[h];
        switch (typeOf(j)) {
          case "object":
            var i = function () {};
            i.prototype = j;
            g[h] = e(new i());
            break;
          case "array":
            g[h] = j.clone();
            break;
        }
      }
      return g;
    };
    var b = function (g, h, j) {
      if (j.$origin) {
        j = j.$origin;
      }
      var i = function () {
        if (j.$protected && this.$caller == null) {
          throw new Error('The method "' + h + '" cannot be called.');
        }
        var l = this.caller,
          m = this.$caller;
        this.caller = m;
        this.$caller = i;
        var k = j.apply(this, arguments);
        this.$caller = m;
        this.caller = l;
        return k;
      }.extend({ $owner: g, $origin: j, $name: h });
      return i;
    };
    var f = function (h, i, g) {
      if (a.Mutators.hasOwnProperty(h)) {
        i = a.Mutators[h].call(this, i);
        if (i == null) {
          return this;
        }
      }
      if (typeOf(i) == "function") {
        if (i.$hidden) {
          return this;
        }
        this.prototype[h] = g ? i : b(this, h, i);
      } else {
        Object.merge(this.prototype, h, i);
      }
      return this;
    };
    var d = function (g) {
      g.$prototyping = true;
      var h = new g();
      delete g.$prototyping;
      return h;
    };
    a.implement("implement", f.overloadSetter());
    a.Mutators = {
      Extends: function (g) {
        this.parent = g;
        this.prototype = d(g);
      },
      Implements: function (g) {
        Array.from(g).each(function (j) {
          var h = new j();
          for (var i in h) {
            f.call(this, i, h[i], true);
          }
        }, this);
      },
    };
  })();
  (function () {
    this.Chain = new Class({
      $chain: [],
      chain: function () {
        this.$chain.append(Array.flatten(arguments));
        return this;
      },
      callChain: function () {
        return this.$chain.length
          ? this.$chain.shift().apply(this, arguments)
          : false;
      },
      clearChain: function () {
        this.$chain.empty();
        return this;
      },
    });
    var a = function (b) {
      return b.replace(/^on([A-Z])/, function (c, d) {
        return d.toLowerCase();
      });
    };
    this.Events = new Class({
      $events: {},
      addEvent: function (d, c, b) {
        d = a(d);
        if (c == $empty) {
          return this;
        }
        this.$events[d] = (this.$events[d] || []).include(c);
        if (b) {
          c.internal = true;
        }
        return this;
      },
      addEvents: function (b) {
        for (var c in b) {
          this.addEvent(c, b[c]);
        }
        return this;
      },
      fireEvent: function (e, c, b) {
        e = a(e);
        var d = this.$events[e];
        if (!d) {
          return this;
        }
        c = Array.from(c);
        d.each(function (f) {
          if (b) {
            f.delay(b, this, c);
          } else {
            f.apply(this, c);
          }
        }, this);
        return this;
      },
      removeEvent: function (e, d) {
        e = a(e);
        var c = this.$events[e];
        if (c && !d.internal) {
          var b = c.indexOf(d);
          if (b != -1) {
            delete c[b];
          }
        }
        return this;
      },
      removeEvents: function (d) {
        var e;
        if (typeOf(d) == "object") {
          for (e in d) {
            this.removeEvent(e, d[e]);
          }
          return this;
        }
        if (d) {
          d = a(d);
        }
        for (e in this.$events) {
          if (d && d != e) {
            continue;
          }
          var c = this.$events[e];
          for (var b = c.length; b--; ) {
            if (b in c) {
              this.removeEvent(e, c[b]);
            }
          }
        }
        return this;
      },
    });
    this.Options = new Class({
      setOptions: function () {
        var b = (this.options = Object.merge.apply(
          null,
          [{}, this.options].append(arguments)
        ));
        if (this.addEvent) {
          for (var c in b) {
            if (typeOf(b[c]) != "function" || !/^on[A-Z]/.test(c)) {
              continue;
            }
            this.addEvent(c, b[c]);
            delete b[c];
          }
        }
        return this;
      },
    });
  })();
  (function () {
    var k,
      n,
      l,
      g,
      a = {},
      c = {},
      m = /\\/g;
    var e = function (q, p) {
      if (q == null) {
        return null;
      }
      if (q.Slick === true) {
        return q;
      }
      q = ("" + q).replace(/^\s+|\s+$/g, "");
      g = !!p;
      var o = g ? c : a;
      if (o[q]) {
        return o[q];
      }
      k = {
        Slick: true,
        expressions: [],
        raw: q,
        reverse: function () {
          return e(this.raw, true);
        },
      };
      n = -1;
      while (q != (q = q.replace(j, b))) {}
      k.length = k.expressions.length;
      return (o[k.raw] = g ? h(k) : k);
    };
    var i = function (o) {
      if (o === "!") {
        return " ";
      } else {
        if (o === " ") {
          return "!";
        } else {
          if (/^!/.test(o)) {
            return o.replace(/^!/, "");
          } else {
            return "!" + o;
          }
        }
      }
    };
    var h = function (u) {
      var r = u.expressions;
      for (var p = 0; p < r.length; p++) {
        var t = r[p];
        var q = { parts: [], tag: "*", combinator: i(t[0].combinator) };
        for (var o = 0; o < t.length; o++) {
          var s = t[o];
          if (!s.reverseCombinator) {
            s.reverseCombinator = " ";
          }
          s.combinator = s.reverseCombinator;
          delete s.reverseCombinator;
        }
        t.reverse().push(q);
      }
      return u;
    };
    var f = function (o) {
      return o.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function (p) {
        return "\\" + p;
      });
    };
    var j = new RegExp(
      "^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)"
        .replace(/<combinator>/, "[" + f(">+~`!@$%^&={}\\;</") + "]")
        .replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
        .replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
    );
    function b(x, s, D, z, r, C, q, B, A, y, u, F, G, v, p, w) {
      if (s || n === -1) {
        k.expressions[++n] = [];
        l = -1;
        if (s) {
          return "";
        }
      }
      if (D || z || l === -1) {
        D = D || " ";
        var t = k.expressions[n];
        if (g && t[l]) {
          t[l].reverseCombinator = i(D);
        }
        t[++l] = { combinator: D, tag: "*" };
      }
      var o = k.expressions[n][l];
      if (r) {
        o.tag = r.replace(m, "");
      } else {
        if (C) {
          o.id = C.replace(m, "");
        } else {
          if (q) {
            q = q.replace(m, "");
            if (!o.classList) {
              o.classList = [];
            }
            if (!o.classes) {
              o.classes = [];
            }
            o.classList.push(q);
            o.classes.push({
              value: q,
              regexp: new RegExp("(^|\\s)" + f(q) + "(\\s|$)"),
            });
          } else {
            if (G) {
              w = w || p;
              w = w ? w.replace(m, "") : null;
              if (!o.pseudos) {
                o.pseudos = [];
              }
              o.pseudos.push({
                key: G.replace(m, ""),
                value: w,
                type: F.length == 1 ? "class" : "element",
              });
            } else {
              if (B) {
                B = B.replace(m, "");
                u = (u || "").replace(m, "");
                var E, H;
                switch (A) {
                  case "^=":
                    H = new RegExp("^" + f(u));
                    break;
                  case "$=":
                    H = new RegExp(f(u) + "$");
                    break;
                  case "~=":
                    H = new RegExp("(^|\\s)" + f(u) + "(\\s|$)");
                    break;
                  case "|=":
                    H = new RegExp("^" + f(u) + "(-|$)");
                    break;
                  case "=":
                    E = function (I) {
                      return u == I;
                    };
                    break;
                  case "*=":
                    E = function (I) {
                      return I && I.indexOf(u) > -1;
                    };
                    break;
                  case "!=":
                    E = function (I) {
                      return u != I;
                    };
                    break;
                  default:
                    E = function (I) {
                      return !!I;
                    };
                }
                if (u == "" && /^[*$^]=$/.test(A)) {
                  E = function () {
                    return false;
                  };
                }
                if (!E) {
                  E = function (I) {
                    return I && H.test(I);
                  };
                }
                if (!o.attributes) {
                  o.attributes = [];
                }
                o.attributes.push({ key: B, operator: A, value: u, test: E });
              }
            }
          }
        }
      }
      return "";
    }
    var d = this.Slick || {};
    d.parse = function (o) {
      return e(o);
    };
    d.escapeRegExp = f;
    if (!this.Slick) {
      this.Slick = d;
    }
  }).apply(typeof exports != "undefined" ? exports : this);
  (function () {
    var k = {},
      m = {},
      d = Object.prototype.toString;
    k.isNativeCode = function (c) {
      return /\{\s*\[native code\]\s*\}/.test("" + c);
    };
    k.isXML = function (c) {
      return (
        !!c.xmlVersion ||
        !!c.xml ||
        d.call(c) == "[object XMLDocument]" ||
        (c.nodeType == 9 && c.documentElement.nodeName != "HTML")
      );
    };
    k.setDocument = function (w) {
      var p = w.nodeType;
      if (p == 9) {
      } else {
        if (p) {
          w = w.ownerDocument;
        } else {
          if (w.navigator) {
            w = w.document;
          } else {
            return;
          }
        }
      }
      if (this.document === w) {
        return;
      }
      this.document = w;
      var A = w.documentElement,
        o = this.getUIDXML(A),
        s = m[o],
        r;
      if (s) {
        for (r in s) {
          this[r] = s[r];
        }
        return;
      }
      s = m[o] = {};
      s.root = A;
      s.isXMLDocument = this.isXML(w);
      s.brokenStarGEBTN =
        s.starSelectsClosedQSA =
        s.idGetsName =
        s.brokenMixedCaseQSA =
        s.brokenGEBCN =
        s.brokenCheckedQSA =
        s.brokenEmptyAttributeQSA =
        s.isHTMLDocument =
        s.nativeMatchesSelector =
          false;
      var q, u, y, z, t;
      var x,
        v = "slick_uniqueid";
      var c = w.createElement("div");
      var n = w.body || w.getElementsByTagName("body")[0] || A;
      n.appendChild(c);
      try {
        c.innerHTML = '<a id="' + v + '"></a>';
        s.isHTMLDocument = !!w.getElementById(v);
      } catch (C) {}
      if (s.isHTMLDocument) {
        c.style.display = "none";
        c.appendChild(w.createComment(""));
        u = c.getElementsByTagName("*").length > 1;
        try {
          c.innerHTML = "foo</foo>";
          x = c.getElementsByTagName("*");
          q = x && !!x.length && x[0].nodeName.charAt(0) == "/";
        } catch (C) {}
        s.brokenStarGEBTN = u || q;
        try {
          c.innerHTML = '<a name="' + v + '"></a><b id="' + v + '"></b>';
          s.idGetsName = w.getElementById(v) === c.firstChild;
        } catch (C) {}
        if (c.getElementsByClassName) {
          try {
            c.innerHTML = '<a class="f"></a><a class="b"></a>';
            c.getElementsByClassName("b").length;
            c.firstChild.className = "b";
            z = c.getElementsByClassName("b").length != 2;
          } catch (C) {}
          try {
            c.innerHTML = '<a class="a"></a><a class="f b a"></a>';
            y = c.getElementsByClassName("a").length != 2;
          } catch (C) {}
          s.brokenGEBCN = z || y;
        }
        if (c.querySelectorAll) {
          try {
            c.innerHTML = "foo</foo>";
            x = c.querySelectorAll("*");
            s.starSelectsClosedQSA =
              x && !!x.length && x[0].nodeName.charAt(0) == "/";
          } catch (C) {}
          try {
            c.innerHTML = '<a class="MiX"></a>';
            s.brokenMixedCaseQSA = !c.querySelectorAll(".MiX").length;
          } catch (C) {}
          try {
            c.innerHTML =
              '<select><option selected="selected">a</option></select>';
            s.brokenCheckedQSA = c.querySelectorAll(":checked").length == 0;
          } catch (C) {}
          try {
            c.innerHTML = '<a class=""></a>';
            s.brokenEmptyAttributeQSA =
              c.querySelectorAll('[class*=""]').length != 0;
          } catch (C) {}
        }
        try {
          c.innerHTML = '<form action="s"><input id="action"/></form>';
          t = c.firstChild.getAttribute("action") != "s";
        } catch (C) {}
        s.nativeMatchesSelector =
          A.matchesSelector || A.mozMatchesSelector || A.webkitMatchesSelector;
        if (s.nativeMatchesSelector) {
          try {
            s.nativeMatchesSelector.call(A, ":slick");
            s.nativeMatchesSelector = null;
          } catch (C) {}
        }
      }
      try {
        A.slick_expando = 1;
        delete A.slick_expando;
        s.getUID = this.getUIDHTML;
      } catch (C) {
        s.getUID = this.getUIDXML;
      }
      n.removeChild(c);
      c = x = n = null;
      s.getAttribute =
        s.isHTMLDocument && t
          ? function (G, E) {
              var H = this.attributeGetters[E];
              if (H) {
                return H.call(G);
              }
              var F = G.getAttributeNode(E);
              return F ? F.nodeValue : null;
            }
          : function (F, E) {
              var G = this.attributeGetters[E];
              return G ? G.call(F) : F.getAttribute(E);
            };
      s.hasAttribute =
        A && this.isNativeCode(A.hasAttribute)
          ? function (F, E) {
              return F.hasAttribute(E);
            }
          : function (F, E) {
              F = F.getAttributeNode(E);
              return !!(F && (F.specified || F.nodeValue));
            };
      var D = A && this.isNativeCode(A.contains),
        B = w && this.isNativeCode(w.contains);
      s.contains =
        D && B
          ? function (E, F) {
              return E.contains(F);
            }
          : D && !B
          ? function (E, F) {
              return E === F || (E === w ? w.documentElement : E).contains(F);
            }
          : A && A.compareDocumentPosition
          ? function (E, F) {
              return E === F || !!(E.compareDocumentPosition(F) & 16);
            }
          : function (E, F) {
              if (F) {
                do {
                  if (F === E) {
                    return true;
                  }
                } while ((F = F.parentNode));
              }
              return false;
            };
      s.documentSorter = A.compareDocumentPosition
        ? function (F, E) {
            if (!F.compareDocumentPosition || !E.compareDocumentPosition) {
              return 0;
            }
            return F.compareDocumentPosition(E) & 4 ? -1 : F === E ? 0 : 1;
          }
        : "sourceIndex" in A
        ? function (F, E) {
            if (!F.sourceIndex || !E.sourceIndex) {
              return 0;
            }
            return F.sourceIndex - E.sourceIndex;
          }
        : w.createRange
        ? function (H, F) {
            if (!H.ownerDocument || !F.ownerDocument) {
              return 0;
            }
            var G = H.ownerDocument.createRange(),
              E = F.ownerDocument.createRange();
            G.setStart(H, 0);
            G.setEnd(H, 0);
            E.setStart(F, 0);
            E.setEnd(F, 0);
            return G.compareBoundaryPoints(Range.START_TO_END, E);
          }
        : null;
      A = null;
      for (r in s) {
        this[r] = s[r];
      }
    };
    var f = /^([#.]?)((?:[\w-]+|\*))$/,
      h = /\[.+[*$^]=(?:""|'')?\]/,
      g = {};
    k.search = function (U, z, H, s) {
      var p = (this.found = s ? null : H || []);
      if (!U) {
        return p;
      } else {
        if (U.navigator) {
          U = U.document;
        } else {
          if (!U.nodeType) {
            return p;
          }
        }
      }
      var F,
        O,
        V = (this.uniques = {}),
        I = !!(H && H.length),
        y = U.nodeType == 9;
      if (this.document !== (y ? U : U.ownerDocument)) {
        this.setDocument(U);
      }
      if (I) {
        for (O = p.length; O--; ) {
          V[this.getUID(p[O])] = true;
        }
      }
      if (typeof z == "string") {
        var r = z.match(f);
        simpleSelectors: if (r) {
          var u = r[1],
            v = r[2],
            A,
            E;
          if (!u) {
            if (v == "*" && this.brokenStarGEBTN) {
              break simpleSelectors;
            }
            E = U.getElementsByTagName(v);
            if (s) {
              return E[0] || null;
            }
            for (O = 0; (A = E[O++]); ) {
              if (!(I && V[this.getUID(A)])) {
                p.push(A);
              }
            }
          } else {
            if (u == "#") {
              if (!this.isHTMLDocument || !y) {
                break simpleSelectors;
              }
              A = U.getElementById(v);
              if (!A) {
                return p;
              }
              if (this.idGetsName && A.getAttributeNode("id").nodeValue != v) {
                break simpleSelectors;
              }
              if (s) {
                return A || null;
              }
              if (!(I && V[this.getUID(A)])) {
                p.push(A);
              }
            } else {
              if (u == ".") {
                if (
                  !this.isHTMLDocument ||
                  ((!U.getElementsByClassName || this.brokenGEBCN) &&
                    U.querySelectorAll)
                ) {
                  break simpleSelectors;
                }
                if (U.getElementsByClassName && !this.brokenGEBCN) {
                  E = U.getElementsByClassName(v);
                  if (s) {
                    return E[0] || null;
                  }
                  for (O = 0; (A = E[O++]); ) {
                    if (!(I && V[this.getUID(A)])) {
                      p.push(A);
                    }
                  }
                } else {
                  var T = new RegExp("(^|\\s)" + e.escapeRegExp(v) + "(\\s|$)");
                  E = U.getElementsByTagName("*");
                  for (O = 0; (A = E[O++]); ) {
                    className = A.className;
                    if (!(className && T.test(className))) {
                      continue;
                    }
                    if (s) {
                      return A;
                    }
                    if (!(I && V[this.getUID(A)])) {
                      p.push(A);
                    }
                  }
                }
              }
            }
          }
          if (I) {
            this.sort(p);
          }
          return s ? null : p;
        }
        querySelector: if (U.querySelectorAll) {
          if (
            !this.isHTMLDocument ||
            g[z] ||
            this.brokenMixedCaseQSA ||
            (this.brokenCheckedQSA && z.indexOf(":checked") > -1) ||
            (this.brokenEmptyAttributeQSA && h.test(z)) ||
            (!y && z.indexOf(",") > -1) ||
            e.disableQSA
          ) {
            break querySelector;
          }
          var S = z,
            x = U;
          if (!y) {
            var C = x.getAttribute("id"),
              t = "slickid__";
            x.setAttribute("id", t);
            S = "#" + t + " " + S;
            U = x.parentNode;
          }
          try {
            if (s) {
              return U.querySelector(S) || null;
            } else {
              E = U.querySelectorAll(S);
            }
          } catch (Q) {
            g[z] = 1;
            break querySelector;
          } finally {
            if (!y) {
              if (C) {
                x.setAttribute("id", C);
              } else {
                x.removeAttribute("id");
              }
              U = x;
            }
          }
          if (this.starSelectsClosedQSA) {
            for (O = 0; (A = E[O++]); ) {
              if (A.nodeName > "@" && !(I && V[this.getUID(A)])) {
                p.push(A);
              }
            }
          } else {
            for (O = 0; (A = E[O++]); ) {
              if (!(I && V[this.getUID(A)])) {
                p.push(A);
              }
            }
          }
          if (I) {
            this.sort(p);
          }
          return p;
        }
        F = this.Slick.parse(z);
        if (!F.length) {
          return p;
        }
      } else {
        if (z == null) {
          return p;
        } else {
          if (z.Slick) {
            F = z;
          } else {
            if (this.contains(U.documentElement || U, z)) {
              p ? p.push(z) : (p = z);
              return p;
            } else {
              return p;
            }
          }
        }
      }
      this.posNTH = {};
      this.posNTHLast = {};
      this.posNTHType = {};
      this.posNTHTypeLast = {};
      this.push =
        !I && (s || (F.length == 1 && F.expressions[0].length == 1))
          ? this.pushArray
          : this.pushUID;
      if (p == null) {
        p = [];
      }
      var M, L, K;
      var B, J, D, c, q, G, W;
      var N,
        P,
        o,
        w,
        R = F.expressions;
      search: for (O = 0; (P = R[O]); O++) {
        for (M = 0; (o = P[M]); M++) {
          B = "combinator:" + o.combinator;
          if (!this[B]) {
            continue search;
          }
          J = this.isXMLDocument ? o.tag : o.tag.toUpperCase();
          D = o.id;
          c = o.classList;
          q = o.classes;
          G = o.attributes;
          W = o.pseudos;
          w = M === P.length - 1;
          this.bitUniques = {};
          if (w) {
            this.uniques = V;
            this.found = p;
          } else {
            this.uniques = {};
            this.found = [];
          }
          if (M === 0) {
            this[B](U, J, D, q, G, W, c);
            if (s && w && p.length) {
              break search;
            }
          } else {
            if (s && w) {
              for (L = 0, K = N.length; L < K; L++) {
                this[B](N[L], J, D, q, G, W, c);
                if (p.length) {
                  break search;
                }
              }
            } else {
              for (L = 0, K = N.length; L < K; L++) {
                this[B](N[L], J, D, q, G, W, c);
              }
            }
          }
          N = this.found;
        }
      }
      if (I || F.expressions.length > 1) {
        this.sort(p);
      }
      return s ? p[0] || null : p;
    };
    k.uidx = 1;
    k.uidk = "slick-uniqueid";
    k.getUIDXML = function (n) {
      var c = n.getAttribute(this.uidk);
      if (!c) {
        c = this.uidx++;
        n.setAttribute(this.uidk, c);
      }
      return c;
    };
    k.getUIDHTML = function (c) {
      return c.uniqueNumber || (c.uniqueNumber = this.uidx++);
    };
    k.sort = function (c) {
      if (!this.documentSorter) {
        return c;
      }
      c.sort(this.documentSorter);
      return c;
    };
    k.cacheNTH = {};
    k.matchNTH = /^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/;
    k.parseNTHArgument = function (q) {
      var o = q.match(this.matchNTH);
      if (!o) {
        return false;
      }
      var p = o[2] || false;
      var n = o[1] || 1;
      if (n == "-") {
        n = -1;
      }
      var c = +o[3] || 0;
      o =
        p == "n"
          ? { a: n, b: c }
          : p == "odd"
          ? { a: 2, b: 1 }
          : p == "even"
          ? { a: 2, b: 0 }
          : { a: 0, b: n };
      return (this.cacheNTH[q] = o);
    };
    k.createNTHPseudo = function (p, n, c, o) {
      return function (s, q) {
        var u = this.getUID(s);
        if (!this[c][u]) {
          var A = s.parentNode;
          if (!A) {
            return false;
          }
          var r = A[p],
            t = 1;
          if (o) {
            var z = s.nodeName;
            do {
              if (r.nodeName != z) {
                continue;
              }
              this[c][this.getUID(r)] = t++;
            } while ((r = r[n]));
          } else {
            do {
              if (r.nodeType != 1) {
                continue;
              }
              this[c][this.getUID(r)] = t++;
            } while ((r = r[n]));
          }
        }
        q = q || "n";
        var v = this.cacheNTH[q] || this.parseNTHArgument(q);
        if (!v) {
          return false;
        }
        var y = v.a,
          x = v.b,
          w = this[c][u];
        if (y == 0) {
          return x == w;
        }
        if (y > 0) {
          if (w < x) {
            return false;
          }
        } else {
          if (x < w) {
            return false;
          }
        }
        return (w - x) % y == 0;
      };
    };
    k.pushArray = function (p, c, r, o, n, q) {
      if (this.matchSelector(p, c, r, o, n, q)) {
        this.found.push(p);
      }
    };
    k.pushUID = function (q, c, s, p, n, r) {
      var o = this.getUID(q);
      if (!this.uniques[o] && this.matchSelector(q, c, s, p, n, r)) {
        this.uniques[o] = true;
        this.found.push(q);
      }
    };
    k.matchNode = function (n, o) {
      if (this.isHTMLDocument && this.nativeMatchesSelector) {
        try {
          return this.nativeMatchesSelector.call(
            n,
            o.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g, '[$1="$2"]')
          );
        } catch (u) {}
      }
      var t = this.Slick.parse(o);
      if (!t) {
        return true;
      }
      var r = t.expressions,
        s = 0,
        q;
      for (q = 0; (currentExpression = r[q]); q++) {
        if (currentExpression.length == 1) {
          var p = currentExpression[0];
          if (
            this.matchSelector(
              n,
              this.isXMLDocument ? p.tag : p.tag.toUpperCase(),
              p.id,
              p.classes,
              p.attributes,
              p.pseudos
            )
          ) {
            return true;
          }
          s++;
        }
      }
      if (s == t.length) {
        return false;
      }
      var c = this.search(this.document, t),
        v;
      for (q = 0; (v = c[q++]); ) {
        if (v === n) {
          return true;
        }
      }
      return false;
    };
    k.matchPseudo = function (q, c, p) {
      var n = "pseudo:" + c;
      if (this[n]) {
        return this[n](q, p);
      }
      var o = this.getAttribute(q, c);
      return p ? p == o : !!o;
    };
    k.matchSelector = function (o, v, c, p, q, s) {
      if (v) {
        var t = this.isXMLDocument ? o.nodeName : o.nodeName.toUpperCase();
        if (v == "*") {
          if (t < "@") {
            return false;
          }
        } else {
          if (t != v) {
            return false;
          }
        }
      }
      if (c && o.getAttribute("id") != c) {
        return false;
      }
      var r, n, u;
      if (p) {
        for (r = p.length; r--; ) {
          u = this.getAttribute(o, "class");
          if (!(u && p[r].regexp.test(u))) {
            return false;
          }
        }
      }
      if (q) {
        for (r = q.length; r--; ) {
          n = q[r];
          if (
            n.operator
              ? !n.test(this.getAttribute(o, n.key))
              : !this.hasAttribute(o, n.key)
          ) {
            return false;
          }
        }
      }
      if (s) {
        for (r = s.length; r--; ) {
          n = s[r];
          if (!this.matchPseudo(o, n.key, n.value)) {
            return false;
          }
        }
      }
      return true;
    };
    var j = {
      " ": function (q, w, n, r, s, u, p) {
        var t, v, o;
        if (this.isHTMLDocument) {
          getById: if (n) {
            v = this.document.getElementById(n);
            if (
              (!v && q.all) ||
              (this.idGetsName && v && v.getAttributeNode("id").nodeValue != n)
            ) {
              o = q.all[n];
              if (!o) {
                return;
              }
              if (!o[0]) {
                o = [o];
              }
              for (t = 0; (v = o[t++]); ) {
                var c = v.getAttributeNode("id");
                if (c && c.nodeValue == n) {
                  this.push(v, w, null, r, s, u);
                  break;
                }
              }
              return;
            }
            if (!v) {
              if (this.contains(this.root, q)) {
                return;
              } else {
                break getById;
              }
            } else {
              if (this.document !== q && !this.contains(q, v)) {
                return;
              }
            }
            this.push(v, w, null, r, s, u);
            return;
          }
          getByClass: if (r && q.getElementsByClassName && !this.brokenGEBCN) {
            o = q.getElementsByClassName(p.join(" "));
            if (!(o && o.length)) {
              break getByClass;
            }
            for (t = 0; (v = o[t++]); ) {
              this.push(v, w, n, null, s, u);
            }
            return;
          }
        }
        getByTag: {
          o = q.getElementsByTagName(w);
          if (!(o && o.length)) {
            break getByTag;
          }
          if (!this.brokenStarGEBTN) {
            w = null;
          }
          for (t = 0; (v = o[t++]); ) {
            this.push(v, w, n, r, s, u);
          }
        }
      },
      ">": function (p, c, r, o, n, q) {
        if ((p = p.firstChild)) {
          do {
            if (p.nodeType == 1) {
              this.push(p, c, r, o, n, q);
            }
          } while ((p = p.nextSibling));
        }
      },
      "+": function (p, c, r, o, n, q) {
        while ((p = p.nextSibling)) {
          if (p.nodeType == 1) {
            this.push(p, c, r, o, n, q);
            break;
          }
        }
      },
      "^": function (p, c, r, o, n, q) {
        p = p.firstChild;
        if (p) {
          if (p.nodeType == 1) {
            this.push(p, c, r, o, n, q);
          } else {
            this["combinator:+"](p, c, r, o, n, q);
          }
        }
      },
      "~": function (q, c, s, p, n, r) {
        while ((q = q.nextSibling)) {
          if (q.nodeType != 1) {
            continue;
          }
          var o = this.getUID(q);
          if (this.bitUniques[o]) {
            break;
          }
          this.bitUniques[o] = true;
          this.push(q, c, s, p, n, r);
        }
      },
      "++": function (p, c, r, o, n, q) {
        this["combinator:+"](p, c, r, o, n, q);
        this["combinator:!+"](p, c, r, o, n, q);
      },
      "~~": function (p, c, r, o, n, q) {
        this["combinator:~"](p, c, r, o, n, q);
        this["combinator:!~"](p, c, r, o, n, q);
      },
      "!": function (p, c, r, o, n, q) {
        while ((p = p.parentNode)) {
          if (p !== this.document) {
            this.push(p, c, r, o, n, q);
          }
        }
      },
      "!>": function (p, c, r, o, n, q) {
        p = p.parentNode;
        if (p !== this.document) {
          this.push(p, c, r, o, n, q);
        }
      },
      "!+": function (p, c, r, o, n, q) {
        while ((p = p.previousSibling)) {
          if (p.nodeType == 1) {
            this.push(p, c, r, o, n, q);
            break;
          }
        }
      },
      "!^": function (p, c, r, o, n, q) {
        p = p.lastChild;
        if (p) {
          if (p.nodeType == 1) {
            this.push(p, c, r, o, n, q);
          } else {
            this["combinator:!+"](p, c, r, o, n, q);
          }
        }
      },
      "!~": function (q, c, s, p, n, r) {
        while ((q = q.previousSibling)) {
          if (q.nodeType != 1) {
            continue;
          }
          var o = this.getUID(q);
          if (this.bitUniques[o]) {
            break;
          }
          this.bitUniques[o] = true;
          this.push(q, c, s, p, n, r);
        }
      },
    };
    for (var i in j) {
      k["combinator:" + i] = j[i];
    }
    var l = {
      empty: function (c) {
        var n = c.firstChild;
        return (
          !(n && n.nodeType == 1) &&
          !(c.innerText || c.textContent || "").length
        );
      },
      not: function (c, n) {
        return !this.matchNode(c, n);
      },
      contains: function (c, n) {
        return (c.innerText || c.textContent || "").indexOf(n) > -1;
      },
      "first-child": function (c) {
        while ((c = c.previousSibling)) {
          if (c.nodeType == 1) {
            return false;
          }
        }
        return true;
      },
      "last-child": function (c) {
        while ((c = c.nextSibling)) {
          if (c.nodeType == 1) {
            return false;
          }
        }
        return true;
      },
      "only-child": function (o) {
        var n = o;
        while ((n = n.previousSibling)) {
          if (n.nodeType == 1) {
            return false;
          }
        }
        var c = o;
        while ((c = c.nextSibling)) {
          if (c.nodeType == 1) {
            return false;
          }
        }
        return true;
      },
      "nth-child": k.createNTHPseudo("firstChild", "nextSibling", "posNTH"),
      "nth-last-child": k.createNTHPseudo(
        "lastChild",
        "previousSibling",
        "posNTHLast"
      ),
      "nth-of-type": k.createNTHPseudo(
        "firstChild",
        "nextSibling",
        "posNTHType",
        true
      ),
      "nth-last-of-type": k.createNTHPseudo(
        "lastChild",
        "previousSibling",
        "posNTHTypeLast",
        true
      ),
      index: function (n, c) {
        return this["pseudo:nth-child"](n, "" + (c + 1));
      },
      even: function (c) {
        return this["pseudo:nth-child"](c, "2n");
      },
      odd: function (c) {
        return this["pseudo:nth-child"](c, "2n+1");
      },
      "first-of-type": function (c) {
        var n = c.nodeName;
        while ((c = c.previousSibling)) {
          if (c.nodeName == n) {
            return false;
          }
        }
        return true;
      },
      "last-of-type": function (c) {
        var n = c.nodeName;
        while ((c = c.nextSibling)) {
          if (c.nodeName == n) {
            return false;
          }
        }
        return true;
      },
      "only-of-type": function (o) {
        var n = o,
          p = o.nodeName;
        while ((n = n.previousSibling)) {
          if (n.nodeName == p) {
            return false;
          }
        }
        var c = o;
        while ((c = c.nextSibling)) {
          if (c.nodeName == p) {
            return false;
          }
        }
        return true;
      },
      enabled: function (c) {
        return !c.disabled;
      },
      disabled: function (c) {
        return c.disabled;
      },
      checked: function (c) {
        return c.checked || c.selected;
      },
      focus: function (c) {
        return (
          this.isHTMLDocument &&
          this.document.activeElement === c &&
          (c.href || c.type || this.hasAttribute(c, "tabindex"))
        );
      },
      root: function (c) {
        return c === this.root;
      },
      selected: function (c) {
        return c.selected;
      },
    };
    for (var b in l) {
      k["pseudo:" + b] = l[b];
    }
    var a = (k.attributeGetters = {
      for: function () {
        return "htmlFor" in this ? this.htmlFor : this.getAttribute("for");
      },
      href: function () {
        return "href" in this
          ? this.getAttribute("href", 2)
          : this.getAttribute("href");
      },
      style: function () {
        return this.style ? this.style.cssText : this.getAttribute("style");
      },
      tabindex: function () {
        var c = this.getAttributeNode("tabindex");
        return c && c.specified ? c.nodeValue : null;
      },
      type: function () {
        return this.getAttribute("type");
      },
      maxlength: function () {
        var c = this.getAttributeNode("maxLength");
        return c && c.specified ? c.nodeValue : null;
      },
    });
    a.MAXLENGTH = a.maxLength = a.maxlength;
    var e = (k.Slick = this.Slick || {});
    e.version = "1.1.7";
    e.search = function (n, o, c) {
      return k.search(n, o, c);
    };
    e.find = function (c, n) {
      return k.search(c, n, null, true);
    };
    e.contains = function (c, n) {
      k.setDocument(c);
      return k.contains(c, n);
    };
    e.getAttribute = function (n, c) {
      k.setDocument(n);
      return k.getAttribute(n, c);
    };
    e.hasAttribute = function (n, c) {
      k.setDocument(n);
      return k.hasAttribute(n, c);
    };
    e.match = function (n, c) {
      if (!(n && c)) {
        return false;
      }
      if (!c || c === n) {
        return true;
      }
      k.setDocument(n);
      return k.matchNode(n, c);
    };
    e.defineAttributeGetter = function (c, n) {
      k.attributeGetters[c] = n;
      return this;
    };
    e.lookupAttributeGetter = function (c) {
      return k.attributeGetters[c];
    };
    e.definePseudo = function (c, n) {
      k["pseudo:" + c] = function (p, o) {
        return n.call(p, o);
      };
      return this;
    };
    e.lookupPseudo = function (c) {
      var n = k["pseudo:" + c];
      if (n) {
        return function (o) {
          return n.call(this, o);
        };
      }
      return null;
    };
    e.override = function (n, c) {
      k.override(n, c);
      return this;
    };
    e.isXML = k.isXML;
    e.uidOf = function (c) {
      return k.getUIDHTML(c);
    };
    if (!this.Slick) {
      this.Slick = e;
    }
  }).apply(typeof exports != "undefined" ? exports : this);
  var Element = function (b, g) {
    var h = Element.Constructors[b];
    if (h) {
      return h(g);
    }
    if (typeof b != "string") {
      return document.id(b).set(g);
    }
    if (!g) {
      g = {};
    }
    if (!/^[\w-]+$/.test(b)) {
      var e = Slick.parse(b).expressions[0][0];
      b = e.tag == "*" ? "div" : e.tag;
      if (e.id && g.id == null) {
        g.id = e.id;
      }
      var d = e.attributes;
      if (d) {
        for (var a, f = 0, c = d.length; f < c; f++) {
          a = d[f];
          if (g[a.key] != null) {
            continue;
          }
          if (a.value != null && a.operator == "=") {
            g[a.key] = a.value;
          } else {
            if (!a.value && !a.operator) {
              g[a.key] = true;
            }
          }
        }
      }
      if (e.classList && g["class"] == null) {
        g["class"] = e.classList.join(" ");
      }
    }
    return document.newElement(b, g);
  };
  if (Browser.Element) {
    Element.prototype = Browser.Element.prototype;
    Element.prototype._fireEvent = (function (a) {
      return function (b, c) {
        return a.call(this, b, c);
      };
    })(Element.prototype.fireEvent);
  }
  new Type("Element", Element).mirror(function (a) {
    if (Array.prototype[a]) {
      return;
    }
    var b = {};
    b[a] = function () {
      var h = [],
        e = arguments,
        j = true;
      for (var g = 0, d = this.length; g < d; g++) {
        var f = this[g],
          c = (h[g] = f[a].apply(f, e));
        j = j && typeOf(c) == "element";
      }
      return j ? new Elements(h) : h;
    };
    Elements.implement(b);
  });
  if (!Browser.Element) {
    Element.parent = Object;
    Element.Prototype = {
      $constructor: Element,
      $family: Function.from("element").hide(),
    };
    Element.mirror(function (a, b) {
      Element.Prototype[a] = b;
    });
  }
  Element.Constructors = {};
  Element.Constructors = new Hash();
  var IFrame = new Type("IFrame", function () {
    var e = Array.link(arguments, {
      properties: Type.isObject,
      iframe: function (f) {
        return f != null;
      },
    });
    var c = e.properties || {},
      b;
    if (e.iframe) {
      b = document.id(e.iframe);
    }
    var d = c.onload || function () {};
    delete c.onload;
    c.id = c.name = [
      c.id,
      c.name,
      b ? b.id || b.name : "IFrame_" + String.uniqueID(),
    ].pick();
    b = new Element(b || "iframe", c);
    var a = function () {
      d.call(b.contentWindow);
    };
    if (window.frames[c.id]) {
      a();
    } else {
      b.addListener("load", a);
    }
    return b;
  });
  var Elements = (this.Elements = function (a) {
    if (a && a.length) {
      var e = {},
        d;
      for (var c = 0; (d = a[c++]); ) {
        var b = Slick.uidOf(d);
        if (!e[b]) {
          e[b] = true;
          this.push(d);
        }
      }
    }
  });
  Elements.prototype = { length: 0 };
  Elements.parent = Array;
  new Type("Elements", Elements).implement({
    filter: function (a, b) {
      if (!a) {
        return this;
      }
      return new Elements(
        Array.filter(
          this,
          typeOf(a) == "string"
            ? function (c) {
                return c.match(a);
              }
            : a,
          b
        )
      );
    }.protect(),
    push: function () {
      var d = this.length;
      for (var b = 0, a = arguments.length; b < a; b++) {
        var c = document.id(arguments[b]);
        if (c) {
          this[d++] = c;
        }
      }
      return (this.length = d);
    }.protect(),
    unshift: function () {
      var b = [];
      for (var c = 0, a = arguments.length; c < a; c++) {
        var d = document.id(arguments[c]);
        if (d) {
          b.push(d);
        }
      }
      return Array.prototype.unshift.apply(this, b);
    }.protect(),
    concat: function () {
      var b = new Elements(this);
      for (var c = 0, a = arguments.length; c < a; c++) {
        var d = arguments[c];
        if (Type.isEnumerable(d)) {
          b.append(d);
        } else {
          b.push(d);
        }
      }
      return b;
    }.protect(),
    append: function (c) {
      for (var b = 0, a = c.length; b < a; b++) {
        this.push(c[b]);
      }
      return this;
    }.protect(),
    empty: function () {
      while (this.length) {
        delete this[--this.length];
      }
      return this;
    }.protect(),
  });
  Elements.alias("extend", "append");
  (function () {
    var f = Array.prototype.splice,
      a = { 0: 0, 1: 1, length: 2 };
    f.call(a, 1, 1);
    if (a[1] == 1) {
      Elements.implement(
        "splice",
        function () {
          var g = this.length;
          var e = f.apply(this, arguments);
          while (g >= this.length) {
            delete this[g--];
          }
          return e;
        }.protect()
      );
    }
    Array.forEachMethod(function (g, e) {
      Elements.implement(e, g);
    });
    Array.mirror(Elements);
    var d;
    try {
      d = document.createElement("<input name=x>").name == "x";
    } catch (b) {}
    var c = function (e) {
      return ("" + e).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    };
    Document.implement({
      newElement: function (e, g) {
        if (g && g.checked != null) {
          g.defaultChecked = g.checked;
        }
        if (d && g) {
          e = "<" + e;
          if (g.name) {
            e += ' name="' + c(g.name) + '"';
          }
          if (g.type) {
            e += ' type="' + c(g.type) + '"';
          }
          e += ">";
          delete g.name;
          delete g.type;
        }
        return this.id(this.createElement(e)).set(g);
      },
    });
  })();
  (function () {
    Slick.uidOf(window);
    Slick.uidOf(document);
    Document.implement({
      newTextNode: function (e) {
        return this.createTextNode(e);
      },
      getDocument: function () {
        return this;
      },
      getWindow: function () {
        return this.window;
      },
      id: (function () {
        var e = {
          string: function (E, D, l) {
            E = Slick.find(l, "#" + E.replace(/(\W)/g, "\\$1"));
            return E ? e.element(E, D) : null;
          },
          element: function (D, E) {
            Slick.uidOf(D);
            if (!E && !D.$family && !/^(?:object|embed)$/i.test(D.tagName)) {
              var l = D.fireEvent;
              D._fireEvent = function (F, G) {
                return l(F, G);
              };
              Object.append(D, Element.Prototype);
            }
            return D;
          },
          object: function (D, E, l) {
            if (D.toElement) {
              return e.element(D.toElement(l), E);
            }
            return null;
          },
        };
        e.textnode =
          e.whitespace =
          e.window =
          e.document =
            function (l) {
              return l;
            };
        return function (D, F, E) {
          if (D && D.$family && D.uniqueNumber) {
            return D;
          }
          var l = typeOf(D);
          return e[l] ? e[l](D, F, E || document) : null;
        };
      })(),
    });
    if (window.$ == null) {
      Window.implement("$", function (e, l) {
        return document.id(e, l, this.document);
      });
    }
    Window.implement({
      getDocument: function () {
        return this.document;
      },
      getWindow: function () {
        return this;
      },
    });
    [Document, Element].invoke("implement", {
      getElements: function (e) {
        return Slick.search(this, e, new Elements());
      },
      getElement: function (e) {
        return document.id(Slick.find(this, e));
      },
    });
    var m = {
      contains: function (e) {
        return Slick.contains(this, e);
      },
    };
    if (!document.contains) {
      Document.implement(m);
    }
    if (!document.createElement("div").contains) {
      Element.implement(m);
    }
    Element.implement("hasChild", function (e) {
      return this !== e && this.contains(e);
    });
    (function (l, E, e) {
      this.Selectors = {};
      var F = (this.Selectors.Pseudo = new Hash());
      var D = function () {
        for (var G in F) {
          if (F.hasOwnProperty(G)) {
            Slick.definePseudo(G, F[G]);
            delete F[G];
          }
        }
      };
      Slick.search = function (H, I, G) {
        D();
        return l.call(this, H, I, G);
      };
      Slick.find = function (G, H) {
        D();
        return E.call(this, G, H);
      };
      Slick.match = function (H, G) {
        D();
        return e.call(this, H, G);
      };
    })(Slick.search, Slick.find, Slick.match);
    var r = function (E, D) {
      if (!E) {
        return D;
      }
      E = Object.clone(Slick.parse(E));
      var l = E.expressions;
      for (var e = l.length; e--; ) {
        l[e][0].combinator = D;
      }
      return E;
    };
    Object.forEach(
      { getNext: "~", getPrevious: "!~", getParent: "!" },
      function (e, l) {
        Element.implement(l, function (D) {
          return this.getElement(r(D, e));
        });
      }
    );
    Object.forEach(
      {
        getAllNext: "~",
        getAllPrevious: "!~",
        getSiblings: "~~",
        getChildren: ">",
        getParents: "!",
      },
      function (e, l) {
        Element.implement(l, function (D) {
          return this.getElements(r(D, e));
        });
      }
    );
    Element.implement({
      getFirst: function (e) {
        return document.id(Slick.search(this, r(e, ">"))[0]);
      },
      getLast: function (e) {
        return document.id(Slick.search(this, r(e, ">")).getLast());
      },
      getWindow: function () {
        return this.ownerDocument.window;
      },
      getDocument: function () {
        return this.ownerDocument;
      },
      getElementById: function (e) {
        return document.id(
          Slick.find(this, "#" + ("" + e).replace(/(\W)/g, "\\$1"))
        );
      },
      match: function (e) {
        return !e || Slick.match(this, e);
      },
    });
    if (window.$$ == null) {
      Window.implement("$$", function (e) {
        var H = new Elements();
        if (arguments.length == 1 && typeof e == "string") {
          return Slick.search(this.document, e, H);
        }
        var E = Array.flatten(arguments);
        for (var F = 0, D = E.length; F < D; F++) {
          var G = E[F];
          switch (typeOf(G)) {
            case "element":
              H.push(G);
              break;
            case "string":
              Slick.search(this.document, G, H);
          }
        }
        return H;
      });
    }
    if (window.$$ == null) {
      Window.implement("$$", function (e) {
        if (arguments.length == 1) {
          if (typeof e == "string") {
            return Slick.search(this.document, e, new Elements());
          } else {
            if (Type.isEnumerable(e)) {
              return new Elements(e);
            }
          }
        }
        return new Elements(arguments);
      });
    }
    var w = {
      before: function (l, e) {
        var D = e.parentNode;
        if (D) {
          D.insertBefore(l, e);
        }
      },
      after: function (l, e) {
        var D = e.parentNode;
        if (D) {
          D.insertBefore(l, e.nextSibling);
        }
      },
      bottom: function (l, e) {
        e.appendChild(l);
      },
      top: function (l, e) {
        e.insertBefore(l, e.firstChild);
      },
    };
    w.inside = w.bottom;
    Object.each(w, function (l, D) {
      D = D.capitalize();
      var e = {};
      e["inject" + D] = function (E) {
        l(this, document.id(E, true));
        return this;
      };
      e["grab" + D] = function (E) {
        l(document.id(E, true), this);
        return this;
      };
      Element.implement(e);
    });
    var j = {},
      d = {};
    var k = {};
    Array.forEach(
      [
        "type",
        "value",
        "defaultValue",
        "accessKey",
        "cellPadding",
        "cellSpacing",
        "colSpan",
        "frameBorder",
        "rowSpan",
        "tabIndex",
        "useMap",
      ],
      function (e) {
        k[e.toLowerCase()] = e;
      }
    );
    k.html = "innerHTML";
    k.text =
      document.createElement("div").textContent == null
        ? "innerText"
        : "textContent";
    Object.forEach(k, function (l, e) {
      d[e] = function (D, E) {
        D[l] = E;
      };
      j[e] = function (D) {
        return D[l];
      };
    });
    var x = [
      "compact",
      "nowrap",
      "ismap",
      "declare",
      "noshade",
      "checked",
      "disabled",
      "readOnly",
      "multiple",
      "selected",
      "noresize",
      "defer",
      "defaultChecked",
      "autofocus",
      "controls",
      "autoplay",
      "loop",
    ];
    var h = {};
    Array.forEach(x, function (e) {
      var l = e.toLowerCase();
      h[l] = e;
      d[l] = function (D, E) {
        D[e] = !!E;
      };
      j[l] = function (D) {
        return !!D[e];
      };
    });
    Object.append(d, {
      class: function (e, l) {
        "className" in e ? (e.className = l || "") : e.setAttribute("class", l);
      },
      for: function (e, l) {
        "htmlFor" in e ? (e.htmlFor = l) : e.setAttribute("for", l);
      },
      style: function (e, l) {
        e.style ? (e.style.cssText = l) : e.setAttribute("style", l);
      },
      value: function (e, l) {
        e.value = l != null ? l : "";
      },
    });
    j["class"] = function (e) {
      return "className" in e ? e.className || null : e.getAttribute("class");
    };
    var f = document.createElement("button");
    try {
      f.type = "button";
    } catch (z) {}
    if (f.type != "button") {
      d.type = function (e, l) {
        e.setAttribute("type", l);
      };
    }
    f = null;
    var p = document.createElement("input");
    p.value = "t";
    p.type = "submit";
    if (p.value != "t") {
      d.type = function (l, e) {
        var D = l.value;
        l.type = e;
        l.value = D;
      };
    }
    p = null;
    var q = (function (e) {
      e.random = "attribute";
      return e.getAttribute("random") == "attribute";
    })(document.createElement("div"));
    Element.implement({
      setProperty: function (l, D) {
        var E = d[l.toLowerCase()];
        if (E) {
          E(this, D);
        } else {
          if (q) {
            var e = this.retrieve("$attributeWhiteList", {});
          }
          if (D == null) {
            this.removeAttribute(l);
            if (q) {
              delete e[l];
            }
          } else {
            this.setAttribute(l, "" + D);
            if (q) {
              e[l] = true;
            }
          }
        }
        return this;
      },
      setProperties: function (e) {
        for (var l in e) {
          this.setProperty(l, e[l]);
        }
        return this;
      },
      getProperty: function (F) {
        var D = j[F.toLowerCase()];
        if (D) {
          return D(this);
        }
        if (q) {
          var l = this.getAttributeNode(F),
            E = this.retrieve("$attributeWhiteList", {});
          if (!l) {
            return null;
          }
          if (l.expando && !E[F]) {
            var G = this.outerHTML;
            if (
              G.substr(0, G.search(/\/?['"]?>(?![^<]*<['"])/)).indexOf(F) < 0
            ) {
              return null;
            }
            E[F] = true;
          }
        }
        var e = Slick.getAttribute(this, F);
        return !e && !Slick.hasAttribute(this, F) ? null : e;
      },
      getProperties: function () {
        var e = Array.from(arguments);
        return e.map(this.getProperty, this).associate(e);
      },
      removeProperty: function (e) {
        return this.setProperty(e, null);
      },
      removeProperties: function () {
        Array.each(arguments, this.removeProperty, this);
        return this;
      },
      set: function (D, l) {
        var e = Element.Properties[D];
        e && e.set ? e.set.call(this, l) : this.setProperty(D, l);
      }.overloadSetter(),
      get: function (l) {
        var e = Element.Properties[l];
        return e && e.get ? e.get.apply(this) : this.getProperty(l);
      }.overloadGetter(),
      erase: function (l) {
        var e = Element.Properties[l];
        e && e.erase ? e.erase.apply(this) : this.removeProperty(l);
        return this;
      },
      hasClass: function (e) {
        return this.className.clean().contains(e, " ");
      },
      addClass: function (e) {
        if (!this.hasClass(e)) {
          this.className = (this.className + " " + e).clean();
        }
        return this;
      },
      removeClass: function (e) {
        this.className = this.className.replace(
          new RegExp("(^|\\s)" + e + "(?:\\s|$)"),
          "$1"
        );
        return this;
      },
      toggleClass: function (e, l) {
        if (l == null) {
          l = !this.hasClass(e);
        }
        return l ? this.addClass(e) : this.removeClass(e);
      },
      adopt: function () {
        var E = this,
          e,
          G = Array.flatten(arguments),
          F = G.length;
        if (F > 1) {
          E = e = document.createDocumentFragment();
        }
        for (var D = 0; D < F; D++) {
          var l = document.id(G[D], true);
          if (l) {
            E.appendChild(l);
          }
        }
        if (e) {
          this.appendChild(e);
        }
        return this;
      },
      appendText: function (l, e) {
        return this.grab(this.getDocument().newTextNode(l), e);
      },
      grab: function (l, e) {
        w[e || "bottom"](document.id(l, true), this);
        return this;
      },
      inject: function (l, e) {
        w[e || "bottom"](this, document.id(l, true));
        return this;
      },
      replaces: function (e) {
        e = document.id(e, true);
        e.parentNode.replaceChild(this, e);
        return this;
      },
      wraps: function (l, e) {
        l = document.id(l, true);
        return this.replaces(l).grab(l, e);
      },
      getSelected: function () {
        this.selectedIndex;
        return new Elements(
          Array.from(this.options).filter(function (e) {
            return e.selected;
          })
        );
      },
      toQueryString: function () {
        var e = [];
        this.getElements("input, select, textarea").each(function (D) {
          var l = D.type;
          if (
            !D.name ||
            D.disabled ||
            l == "submit" ||
            l == "reset" ||
            l == "file" ||
            l == "image"
          ) {
            return;
          }
          var E =
            D.get("tag") == "select"
              ? D.getSelected().map(function (F) {
                  return document.id(F).get("value");
                })
              : (l == "radio" || l == "checkbox") && !D.checked
              ? null
              : D.get("value");
          Array.from(E).each(function (F) {
            if (typeof F != "undefined") {
              e.push(encodeURIComponent(D.name) + "=" + encodeURIComponent(F));
            }
          });
        });
        return e.join("&");
      },
    });
    var i = {},
      A = {};
    var B = function (e) {
      return A[e] || (A[e] = {});
    };
    var v = function (l) {
      var e = l.uniqueNumber;
      if (l.removeEvents) {
        l.removeEvents();
      }
      if (l.clearAttributes) {
        l.clearAttributes();
      }
      if (e != null) {
        delete i[e];
        delete A[e];
      }
      return l;
    };
    var C = { input: "checked", option: "selected", textarea: "value" };
    Element.implement({
      destroy: function () {
        var e = v(this).getElementsByTagName("*");
        Array.each(e, v);
        Element.dispose(this);
        return null;
      },
      empty: function () {
        Array.from(this.childNodes).each(Element.dispose);
        return this;
      },
      dispose: function () {
        return this.parentNode ? this.parentNode.removeChild(this) : this;
      },
      clone: function (G, E) {
        G = G !== false;
        var L = this.cloneNode(G),
          D = [L],
          F = [this],
          J;
        if (G) {
          D.append(Array.from(L.getElementsByTagName("*")));
          F.append(Array.from(this.getElementsByTagName("*")));
        }
        for (J = D.length; J--; ) {
          var H = D[J],
            K = F[J];
          if (!E) {
            H.removeAttribute("id");
          }
          if (H.clearAttributes) {
            H.clearAttributes();
            H.mergeAttributes(K);
            H.removeAttribute("uniqueNumber");
            if (H.options) {
              var O = H.options,
                e = K.options;
              for (var I = O.length; I--; ) {
                O[I].selected = e[I].selected;
              }
            }
          }
          var l = C[K.tagName.toLowerCase()];
          if (l && K[l]) {
            H[l] = K[l];
          }
        }
        if (Browser.ie) {
          var M = L.getElementsByTagName("object"),
            N = this.getElementsByTagName("object");
          for (J = M.length; J--; ) {
            M[J].outerHTML = N[J].outerHTML;
          }
        }
        return document.id(L);
      },
    });
    [Element, Window, Document].invoke("implement", {
      addListener: function (E, D) {
        if (E == "unload") {
          var e = D,
            l = this;
          D = function () {
            l.removeListener("unload", D);
            e();
          };
        } else {
          i[Slick.uidOf(this)] = this;
        }
        if (this.addEventListener) {
          this.addEventListener(E, D, !!arguments[2]);
        } else {
          this.attachEvent("on" + E, D);
        }
        return this;
      },
      removeListener: function (l, e) {
        if (this.removeEventListener) {
          this.removeEventListener(l, e, !!arguments[2]);
        } else {
          this.detachEvent("on" + l, e);
        }
        return this;
      },
      retrieve: function (l, e) {
        var E = B(Slick.uidOf(this)),
          D = E[l];
        if (e != null && D == null) {
          D = E[l] = e;
        }
        return D != null ? D : null;
      },
      store: function (l, e) {
        var D = B(Slick.uidOf(this));
        D[l] = e;
        return this;
      },
      eliminate: function (e) {
        var l = B(Slick.uidOf(this));
        delete l[e];
        return this;
      },
    });
    if (window.attachEvent && !window.addEventListener) {
      window.addListener("unload", function () {
        Object.each(i, v);
        if (window.CollectGarbage) {
          CollectGarbage();
        }
      });
    }
    Element.Properties = {};
    Element.Properties = new Hash();
    Element.Properties.style = {
      set: function (e) {
        this.style.cssText = e;
      },
      get: function () {
        return this.style.cssText;
      },
      erase: function () {
        this.style.cssText = "";
      },
    };
    Element.Properties.tag = {
      get: function () {
        return this.tagName.toLowerCase();
      },
    };
    Element.Properties.html = {
      set: function (e) {
        if (e == null) {
          e = "";
        } else {
          if (typeOf(e) == "array") {
            e = e.join("");
          }
        }
        this.innerHTML = e;
      },
      erase: function () {
        this.innerHTML = "";
      },
    };
    var t = document.createElement("div");
    t.innerHTML = "<nav></nav>";
    var a = t.childNodes.length == 1;
    if (!a) {
      var s =
          "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(
            " "
          ),
        b = document.createDocumentFragment(),
        u = s.length;
      while (u--) {
        b.createElement(s[u]);
      }
    }
    t = null;
    var g = Function.attempt(function () {
      var e = document.createElement("table");
      e.innerHTML = "<tr><td></td></tr>";
      return true;
    });
    var c = document.createElement("tr"),
      o = "<td></td>";
    c.innerHTML = o;
    var y = c.innerHTML == o;
    c = null;
    if (!g || !y || !a) {
      Element.Properties.html.set = (function (l) {
        var e = {
          table: [1, "<table>", "</table>"],
          select: [1, "<select>", "</select>"],
          tbody: [2, "<table><tbody>", "</tbody></table>"],
          tr: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        };
        e.thead = e.tfoot = e.tbody;
        return function (D) {
          var E = e[this.get("tag")];
          if (!E && !a) {
            E = [0, "", ""];
          }
          if (!E) {
            return l.call(this, D);
          }
          var H = E[0],
            G = document.createElement("div"),
            F = G;
          if (!a) {
            b.appendChild(G);
          }
          G.innerHTML = [E[1], D, E[2]].flatten().join("");
          while (H--) {
            F = F.firstChild;
          }
          this.empty().adopt(F.childNodes);
          if (!a) {
            b.removeChild(G);
          }
          G = null;
        };
      })(Element.Properties.html.set);
    }
    var n = document.createElement("form");
    n.innerHTML = "<select><option>s</option></select>";
    if (n.firstChild.value != "s") {
      Element.Properties.value = {
        set: function (G) {
          var l = this.get("tag");
          if (l != "select") {
            return this.setProperty("value", G);
          }
          var D = this.getElements("option");
          for (var E = 0; E < D.length; E++) {
            var F = D[E],
              e = F.getAttributeNode("value"),
              H = e && e.specified ? F.value : F.get("text");
            if (H == G) {
              return (F.selected = true);
            }
          }
        },
        get: function () {
          var D = this,
            l = D.get("tag");
          if (l != "select" && l != "option") {
            return this.getProperty("value");
          }
          if (l == "select" && !(D = D.getSelected()[0])) {
            return "";
          }
          var e = D.getAttributeNode("value");
          return e && e.specified ? D.value : D.get("text");
        },
      };
    }
    n = null;
    if (document.createElement("div").getAttributeNode("id")) {
      Element.Properties.id = {
        set: function (e) {
          this.id = this.getAttributeNode("id").value = e;
        },
        get: function () {
          return this.id || null;
        },
        erase: function () {
          this.id = this.getAttributeNode("id").value = "";
        },
      };
    }
  })();
  (function () {
    var i = document.html;
    var d = document.createElement("div");
    d.style.color = "red";
    d.style.color = null;
    var c = d.style.color == "red";
    d = null;
    Element.Properties.styles = {
      set: function (k) {
        this.setStyles(k);
      },
    };
    var h = i.style.opacity != null,
      e = i.style.filter != null,
      j = /alpha\(opacity=([\d.]+)\)/i;
    var a = function (l, k) {
      l.store("$opacity", k);
      l.style.visibility = k > 0 || k == null ? "visible" : "hidden";
    };
    var f = h
      ? function (l, k) {
          l.style.opacity = k;
        }
      : e
      ? function (l, k) {
          var n = l.style;
          if (!l.currentStyle || !l.currentStyle.hasLayout) {
            n.zoom = 1;
          }
          if (k == null || k == 1) {
            k = "";
          } else {
            k = "alpha(opacity=" + (k * 100).limit(0, 100).round() + ")";
          }
          var m = n.filter || l.getComputedStyle("filter") || "";
          n.filter = j.test(m) ? m.replace(j, k) : m + k;
          if (!n.filter) {
            n.removeAttribute("filter");
          }
        }
      : a;
    var g = h
      ? function (l) {
          var k = l.style.opacity || l.getComputedStyle("opacity");
          return k == "" ? 1 : k.toFloat();
        }
      : e
      ? function (l) {
          var m = l.style.filter || l.getComputedStyle("filter"),
            k;
          if (m) {
            k = m.match(j);
          }
          return k == null || m == null ? 1 : k[1] / 100;
        }
      : function (l) {
          var k = l.retrieve("$opacity");
          if (k == null) {
            k = l.style.visibility == "hidden" ? 0 : 1;
          }
          return k;
        };
    var b = i.style.cssFloat == null ? "styleFloat" : "cssFloat";
    Element.implement({
      getComputedStyle: function (m) {
        if (this.currentStyle) {
          return this.currentStyle[m.camelCase()];
        }
        var l = Element.getDocument(this).defaultView,
          k = l ? l.getComputedStyle(this, null) : null;
        return k ? k.getPropertyValue(m == b ? "float" : m.hyphenate()) : null;
      },
      setStyle: function (l, k) {
        if (l == "opacity") {
          if (k != null) {
            k = parseFloat(k);
          }
          f(this, k);
          return this;
        }
        l = (l == "float" ? b : l).camelCase();
        if (typeOf(k) != "string") {
          var m = (Element.Styles[l] || "@").split(" ");
          k = Array.from(k)
            .map(function (o, n) {
              if (!m[n]) {
                return "";
              }
              return typeOf(o) == "number"
                ? m[n].replace("@", Math.round(o))
                : o;
            })
            .join(" ");
        } else {
          if (k == String(Number(k))) {
            k = Math.round(k);
          }
        }
        this.style[l] = k;
        if ((k == "" || k == null) && c && this.style.removeAttribute) {
          this.style.removeAttribute(l);
        }
        return this;
      },
      getStyle: function (q) {
        if (q == "opacity") {
          return g(this);
        }
        q = (q == "float" ? b : q).camelCase();
        var k = this.style[q];
        if (!k || q == "zIndex") {
          k = [];
          for (var p in Element.ShortStyles) {
            if (q != p) {
              continue;
            }
            for (var o in Element.ShortStyles[p]) {
              k.push(this.getStyle(o));
            }
            return k.join(" ");
          }
          k = this.getComputedStyle(q);
        }
        if (k) {
          k = String(k);
          var m = k.match(/rgba?\([\d\s,]+\)/);
          if (m) {
            k = k.replace(m[0], m[0].rgbToHex());
          }
        }
        if (Browser.opera || Browser.ie) {
          if (/^(height|width)$/.test(q) && !/px$/.test(k)) {
            var l = q == "width" ? ["left", "right"] : ["top", "bottom"],
              n = 0;
            l.each(function (r) {
              n +=
                this.getStyle("border-" + r + "-width").toInt() +
                this.getStyle("padding-" + r).toInt();
            }, this);
            return this["offset" + q.capitalize()] - n + "px";
          }
          if (
            Browser.ie &&
            /^border(.+)Width|margin|padding/.test(q) &&
            isNaN(parseFloat(k))
          ) {
            return "0px";
          }
        }
        return k;
      },
      setStyles: function (l) {
        for (var k in l) {
          this.setStyle(k, l[k]);
        }
        return this;
      },
      getStyles: function () {
        var k = {};
        Array.flatten(arguments).each(function (l) {
          k[l] = this.getStyle(l);
        }, this);
        return k;
      },
    });
    Element.Styles = {
      left: "@px",
      top: "@px",
      bottom: "@px",
      right: "@px",
      width: "@px",
      height: "@px",
      maxWidth: "@px",
      maxHeight: "@px",
      minWidth: "@px",
      minHeight: "@px",
      backgroundColor: "rgb(@, @, @)",
      backgroundPosition: "@px @px",
      color: "rgb(@, @, @)",
      fontSize: "@px",
      letterSpacing: "@px",
      lineHeight: "@px",
      clip: "rect(@px @px @px @px)",
      margin: "@px @px @px @px",
      padding: "@px @px @px @px",
      border: "@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",
      borderWidth: "@px @px @px @px",
      borderStyle: "@ @ @ @",
      borderColor: "rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",
      zIndex: "@",
      zoom: "@",
      fontWeight: "@",
      textIndent: "@px",
      opacity: "@",
    };
    Element.implement({
      setOpacity: function (k) {
        f(this, k);
        return this;
      },
      getOpacity: function () {
        return g(this);
      },
    });
    Element.Properties.opacity = {
      set: function (k) {
        f(this, k);
        a(this, k);
      },
      get: function () {
        return g(this);
      },
    };
    Element.Styles = new Hash(Element.Styles);
    Element.ShortStyles = {
      margin: {},
      padding: {},
      border: {},
      borderWidth: {},
      borderStyle: {},
      borderColor: {},
    };
    ["Top", "Right", "Bottom", "Left"].each(function (q) {
      var p = Element.ShortStyles;
      var l = Element.Styles;
      ["margin", "padding"].each(function (r) {
        var s = r + q;
        p[r][s] = l[s] = "@px";
      });
      var o = "border" + q;
      p.border[o] = l[o] = "@px @ rgb(@, @, @)";
      var n = o + "Width",
        k = o + "Style",
        m = o + "Color";
      p[o] = {};
      p.borderWidth[n] = p[o][n] = l[n] = "@px";
      p.borderStyle[k] = p[o][k] = l[k] = "@";
      p.borderColor[m] = p[o][m] = l[m] = "rgb(@, @, @)";
    });
  })();
  (function () {
    Element.Properties.events = {
      set: function (b) {
        this.addEvents(b);
      },
    };
    [Element, Window, Document].invoke("implement", {
      addEvent: function (f, h) {
        var i = this.retrieve("events", {});
        if (!i[f]) {
          i[f] = { keys: [], values: [] };
        }
        if (i[f].keys.contains(h)) {
          return this;
        }
        i[f].keys.push(h);
        var g = f,
          b = Element.Events[f],
          d = h,
          j = this;
        if (b) {
          if (b.onAdd) {
            b.onAdd.call(this, h, f);
          }
          if (b.condition) {
            d = function (k) {
              if (b.condition.call(this, k, f)) {
                return h.call(this, k);
              }
              return true;
            };
          }
          if (b.base) {
            g = Function.from(b.base).call(this, f);
          }
        }
        var e = function () {
          return h.call(j);
        };
        var c = Element.NativeEvents[g];
        if (c) {
          if (c == 2) {
            e = function (k) {
              k = new DOMEvent(k, j.getWindow());
              if (d.call(j, k) === false) {
                k.stop();
              }
            };
          }
          this.addListener(g, e, arguments[2]);
        }
        i[f].values.push(e);
        return this;
      },
      removeEvent: function (e, d) {
        var c = this.retrieve("events");
        if (!c || !c[e]) {
          return this;
        }
        var h = c[e];
        var b = h.keys.indexOf(d);
        if (b == -1) {
          return this;
        }
        var g = h.values[b];
        delete h.keys[b];
        delete h.values[b];
        var f = Element.Events[e];
        if (f) {
          if (f.onRemove) {
            f.onRemove.call(this, d, e);
          }
          if (f.base) {
            e = Function.from(f.base).call(this, e);
          }
        }
        return Element.NativeEvents[e]
          ? this.removeListener(e, g, arguments[2])
          : this;
      },
      addEvents: function (b) {
        for (var c in b) {
          this.addEvent(c, b[c]);
        }
        return this;
      },
      removeEvents: function (b) {
        var d;
        if (typeOf(b) == "object") {
          for (d in b) {
            this.removeEvent(d, b[d]);
          }
          return this;
        }
        var c = this.retrieve("events");
        if (!c) {
          return this;
        }
        if (!b) {
          for (d in c) {
            this.removeEvents(d);
          }
          this.eliminate("events");
        } else {
          if (c[b]) {
            c[b].keys.each(function (e) {
              this.removeEvent(b, e);
            }, this);
            delete c[b];
          }
        }
        return this;
      },
      fireEvent: function (e, c, b) {
        var d = this.retrieve("events");
        if (!d || !d[e]) {
          return this;
        }
        c = Array.from(c);
        d[e].keys.each(function (f) {
          if (b) {
            f.delay(b, this, c);
          } else {
            f.apply(this, c);
          }
        }, this);
        return this;
      },
      cloneEvents: function (e, d) {
        e = document.id(e);
        var c = e.retrieve("events");
        if (!c) {
          return this;
        }
        if (!d) {
          for (var b in c) {
            this.cloneEvents(e, b);
          }
        } else {
          if (c[d]) {
            c[d].keys.each(function (f) {
              this.addEvent(d, f);
            }, this);
          }
        }
        return this;
      },
    });
    Element.NativeEvents = {
      click: 2,
      dblclick: 2,
      mouseup: 2,
      mousedown: 2,
      contextmenu: 2,
      mousewheel: 2,
      DOMMouseScroll: 2,
      mouseover: 2,
      mouseout: 2,
      mousemove: 2,
      selectstart: 2,
      selectend: 2,
      keydown: 2,
      keypress: 2,
      keyup: 2,
      orientationchange: 2,
      touchstart: 2,
      touchmove: 2,
      touchend: 2,
      touchcancel: 2,
      gesturestart: 2,
      gesturechange: 2,
      gestureend: 2,
      focus: 2,
      blur: 2,
      change: 2,
      reset: 2,
      select: 2,
      submit: 2,
      paste: 2,
      input: 2,
      load: 2,
      unload: 1,
      beforeunload: 2,
      resize: 1,
      move: 1,
      DOMContentLoaded: 1,
      readystatechange: 1,
      error: 1,
      abort: 1,
      scroll: 1,
    };
    Element.Events = {
      mousewheel: { base: Browser.firefox ? "DOMMouseScroll" : "mousewheel" },
    };
    if ("onmouseenter" in document.documentElement) {
      Element.NativeEvents.mouseenter = Element.NativeEvents.mouseleave = 2;
    } else {
      var a = function (b) {
        var c = b.relatedTarget;
        if (c == null) {
          return true;
        }
        if (!c) {
          return false;
        }
        return (
          c != this &&
          c.prefix != "xul" &&
          typeOf(this) != "document" &&
          !this.contains(c)
        );
      };
      Element.Events.mouseenter = { base: "mouseover", condition: a };
      Element.Events.mouseleave = { base: "mouseout", condition: a };
    }
    if (!window.addEventListener) {
      Element.NativeEvents.propertychange = 2;
      Element.Events.change = {
        base: function () {
          var b = this.type;
          return this.get("tag") == "input" && (b == "radio" || b == "checkbox")
            ? "propertychange"
            : "change";
        },
        condition: function (b) {
          return (
            this.type != "radio" ||
            (b.event.propertyName == "checked" && this.checked)
          );
        },
      };
    }
    Element.Events = new Hash(Element.Events);
  })();
  (function () {
    var c = !!window.addEventListener;
    Element.NativeEvents.focusin = Element.NativeEvents.focusout = 2;
    var k = function (l, m, n, o, p) {
      while (p && p != l) {
        if (m(p, o)) {
          return n.call(p, o, p);
        }
        p = document.id(p.parentNode);
      }
    };
    var a = {
      mouseenter: { base: "mouseover" },
      mouseleave: { base: "mouseout" },
      focus: { base: "focus" + (c ? "" : "in"), capture: true },
      blur: { base: c ? "blur" : "focusout", capture: true },
    };
    var b = "$delegation:";
    var i = function (l) {
      return {
        base: "focusin",
        remove: function (m, o) {
          var p = m.retrieve(b + l + "listeners", {})[o];
          if (p && p.forms) {
            for (var n = p.forms.length; n--; ) {
              p.forms[n].removeEvent(l, p.fns[n]);
            }
          }
        },
        listen: function (x, r, v, n, t, s) {
          var o = t.get("tag") == "form" ? t : n.target.getParent("form");
          if (!o) {
            return;
          }
          var u = x.retrieve(b + l + "listeners", {}),
            p = u[s] || { forms: [], fns: [] },
            m = p.forms,
            w = p.fns;
          if (m.indexOf(o) != -1) {
            return;
          }
          m.push(o);
          var q = function (y) {
            k(x, r, v, y, t);
          };
          o.addEvent(l, q);
          w.push(q);
          u[s] = p;
          x.store(b + l + "listeners", u);
        },
      };
    };
    var d = function (l) {
      return {
        base: "focusin",
        listen: function (m, n, p, q, r) {
          var o = {
            blur: function () {
              this.removeEvents(o);
            },
          };
          o[l] = function (s) {
            k(m, n, p, s, r);
          };
          q.target.addEvents(o);
        },
      };
    };
    if (!c) {
      Object.append(a, {
        submit: i("submit"),
        reset: i("reset"),
        change: d("change"),
        select: d("select"),
      });
    }
    var h = Element.prototype,
      f = h.addEvent,
      j = h.removeEvent;
    var e = function (l, m) {
      return function (r, q, n) {
        if (r.indexOf(":relay") == -1) {
          return l.call(this, r, q, n);
        }
        var o = Slick.parse(r).expressions[0][0];
        if (o.pseudos[0].key != "relay") {
          return l.call(this, r, q, n);
        }
        var p = o.tag;
        o.pseudos.slice(1).each(function (s) {
          p += ":" + s.key + (s.value ? "(" + s.value + ")" : "");
        });
        l.call(this, r, q);
        return m.call(this, p, o.pseudos[0].value, q);
      };
    };
    var g = {
      addEvent: function (v, q, x) {
        var t = this.retrieve("$delegates", {}),
          r = t[v];
        if (r) {
          for (var y in r) {
            if (r[y].fn == x && r[y].match == q) {
              return this;
            }
          }
        }
        var p = v,
          u = q,
          o = x,
          n = a[v] || {};
        v = n.base || p;
        q = function (B) {
          return Slick.match(B, u);
        };
        var w = Element.Events[p];
        if (w && w.condition) {
          var l = q,
            m = w.condition;
          q = function (C, B) {
            return l(C, B) && m.call(C, B, v);
          };
        }
        var z = this,
          s = String.uniqueID();
        var A = n.listen
          ? function (B, C) {
              if (!C && B && B.target) {
                C = B.target;
              }
              if (C) {
                n.listen(z, q, x, B, C, s);
              }
            }
          : function (B, C) {
              if (!C && B && B.target) {
                C = B.target;
              }
              if (C) {
                k(z, q, x, B, C);
              }
            };
        if (!r) {
          r = {};
        }
        r[s] = { match: u, fn: o, delegator: A };
        t[p] = r;
        return f.call(this, v, A, n.capture);
      },
      removeEvent: function (r, n, t, u) {
        var q = this.retrieve("$delegates", {}),
          p = q[r];
        if (!p) {
          return this;
        }
        if (u) {
          var m = r,
            w = p[u].delegator,
            l = a[r] || {};
          r = l.base || m;
          if (l.remove) {
            l.remove(this, u);
          }
          delete p[u];
          q[m] = p;
          return j.call(this, r, w);
        }
        var o, v;
        if (t) {
          for (o in p) {
            v = p[o];
            if (v.match == n && v.fn == t) {
              return g.removeEvent.call(this, r, n, t, o);
            }
          }
        } else {
          for (o in p) {
            v = p[o];
            if (v.match == n) {
              g.removeEvent.call(this, r, n, v.fn, o);
            }
          }
        }
        return this;
      },
    };
    [Element, Window, Document].invoke("implement", {
      addEvent: e(f, g.addEvent),
      removeEvent: e(j, g.removeEvent),
    });
  })();
  (function () {
    var h = document.createElement("div"),
      e = document.createElement("div");
    h.style.height = "0";
    h.appendChild(e);
    var d = e.offsetParent === h;
    h = e = null;
    var l = function (m) {
      return k(m, "position") != "static" || a(m);
    };
    var i = function (m) {
      return l(m) || /^(?:table|td|th)$/i.test(m.tagName);
    };
    Element.implement({
      scrollTo: function (m, n) {
        if (a(this)) {
          this.getWindow().scrollTo(m, n);
        } else {
          this.scrollLeft = m;
          this.scrollTop = n;
        }
        return this;
      },
      getSize: function () {
        if (a(this)) {
          return this.getWindow().getSize();
        }
        return { x: this.offsetWidth, y: this.offsetHeight };
      },
      getScrollSize: function () {
        if (a(this)) {
          return this.getWindow().getScrollSize();
        }
        return { x: this.scrollWidth, y: this.scrollHeight };
      },
      getScroll: function () {
        if (a(this)) {
          return this.getWindow().getScroll();
        }
        return { x: this.scrollLeft, y: this.scrollTop };
      },
      getScrolls: function () {
        var n = this.parentNode,
          m = { x: 0, y: 0 };
        while (n && !a(n)) {
          m.x += n.scrollLeft;
          m.y += n.scrollTop;
          n = n.parentNode;
        }
        return m;
      },
      getOffsetParent: d
        ? function () {
            var m = this;
            if (a(m) || k(m, "position") == "fixed") {
              return null;
            }
            var n = k(m, "position") == "static" ? i : l;
            while ((m = m.parentNode)) {
              if (n(m)) {
                return m;
              }
            }
            return null;
          }
        : function () {
            var m = this;
            if (a(m) || k(m, "position") == "fixed") {
              return null;
            }
            try {
              return m.offsetParent;
            } catch (n) {}
            return null;
          },
      getOffsets: function () {
        if (this.getBoundingClientRect && !Browser.Platform.ios) {
          var r = this.getBoundingClientRect(),
            o = document.id(this.getDocument().documentElement),
            q = o.getScroll(),
            t = this.getScrolls(),
            s = k(this, "position") == "fixed";
          return {
            x: r.left.toInt() + t.x + (s ? 0 : q.x) - o.clientLeft,
            y: r.top.toInt() + t.y + (s ? 0 : q.y) - o.clientTop,
          };
        }
        var n = this,
          m = { x: 0, y: 0 };
        if (a(this)) {
          return m;
        }
        while (n && !a(n)) {
          m.x += n.offsetLeft;
          m.y += n.offsetTop;
          if (Browser.firefox) {
            if (!c(n)) {
              m.x += b(n);
              m.y += g(n);
            }
            var p = n.parentNode;
            if (p && k(p, "overflow") != "visible") {
              m.x += b(p);
              m.y += g(p);
            }
          } else {
            if (n != this && Browser.safari) {
              m.x += b(n);
              m.y += g(n);
            }
          }
          n = n.offsetParent;
        }
        if (Browser.firefox && !c(this)) {
          m.x -= b(this);
          m.y -= g(this);
        }
        return m;
      },
      getPosition: function (p) {
        var q = this.getOffsets(),
          n = this.getScrolls();
        var m = { x: q.x - n.x, y: q.y - n.y };
        if (p && (p = document.id(p))) {
          var o = p.getPosition();
          return { x: m.x - o.x - b(p), y: m.y - o.y - g(p) };
        }
        return m;
      },
      getCoordinates: function (o) {
        if (a(this)) {
          return this.getWindow().getCoordinates();
        }
        var m = this.getPosition(o),
          n = this.getSize();
        var p = { left: m.x, top: m.y, width: n.x, height: n.y };
        p.right = p.left + p.width;
        p.bottom = p.top + p.height;
        return p;
      },
      computePosition: function (m) {
        return {
          left: m.x - j(this, "margin-left"),
          top: m.y - j(this, "margin-top"),
        };
      },
      setPosition: function (m) {
        return this.setStyles(this.computePosition(m));
      },
    });
    [Document, Window].invoke("implement", {
      getSize: function () {
        var m = f(this);
        return { x: m.clientWidth, y: m.clientHeight };
      },
      getScroll: function () {
        var n = this.getWindow(),
          m = f(this);
        return {
          x: n.pageXOffset || m.scrollLeft,
          y: n.pageYOffset || m.scrollTop,
        };
      },
      getScrollSize: function () {
        var o = f(this),
          n = this.getSize(),
          m = this.getDocument().body;
        return {
          x: Math.max(o.scrollWidth, m.scrollWidth, n.x),
          y: Math.max(o.scrollHeight, m.scrollHeight, n.y),
        };
      },
      getPosition: function () {
        return { x: 0, y: 0 };
      },
      getCoordinates: function () {
        var m = this.getSize();
        return {
          top: 0,
          left: 0,
          bottom: m.y,
          right: m.x,
          height: m.y,
          width: m.x,
        };
      },
    });
    var k = Element.getComputedStyle;
    function j(m, n) {
      return k(m, n).toInt() || 0;
    }
    function c(m) {
      return k(m, "-moz-box-sizing") == "border-box";
    }
    function g(m) {
      return j(m, "border-top-width");
    }
    function b(m) {
      return j(m, "border-left-width");
    }
    function a(m) {
      return /^(?:body|html)$/i.test(m.tagName);
    }
    function f(m) {
      var n = m.getDocument();
      return !n.compatMode || n.compatMode == "CSS1Compat" ? n.html : n.body;
    }
  })();
  Element.alias({ position: "setPosition" });
  [Window, Document, Element].invoke("implement", {
    getHeight: function () {
      return this.getSize().y;
    },
    getWidth: function () {
      return this.getSize().x;
    },
    getScrollTop: function () {
      return this.getScroll().y;
    },
    getScrollLeft: function () {
      return this.getScroll().x;
    },
    getScrollHeight: function () {
      return this.getScrollSize().y;
    },
    getScrollWidth: function () {
      return this.getScrollSize().x;
    },
    getTop: function () {
      return this.getPosition().y;
    },
    getLeft: function () {
      return this.getPosition().x;
    },
  });
  (function () {
    var f = (this.Fx = new Class({
      Implements: [Chain, Events, Options],
      options: {
        fps: 60,
        unit: false,
        duration: 500,
        frames: null,
        frameSkip: true,
        link: "ignore",
      },
      initialize: function (g) {
        this.subject = this.subject || this;
        this.setOptions(g);
      },
      getTransition: function () {
        return function (g) {
          return -(Math.cos(Math.PI * g) - 1) / 2;
        };
      },
      step: function (g) {
        if (this.options.frameSkip) {
          var h = this.time != null ? g - this.time : 0,
            i = h / this.frameInterval;
          this.time = g;
          this.frame += i;
        } else {
          this.frame++;
        }
        if (this.frame < this.frames) {
          var j = this.transition(this.frame / this.frames);
          this.set(this.compute(this.from, this.to, j));
        } else {
          this.frame = this.frames;
          this.set(this.compute(this.from, this.to, 1));
          this.stop();
        }
      },
      set: function (g) {
        return g;
      },
      compute: function (i, h, g) {
        return f.compute(i, h, g);
      },
      check: function () {
        if (!this.isRunning()) {
          return true;
        }
        switch (this.options.link) {
          case "cancel":
            this.cancel();
            return true;
          case "chain":
            this.chain(this.caller.pass(arguments, this));
            return false;
        }
        return false;
      },
      start: function (k, j) {
        if (!this.check(k, j)) {
          return this;
        }
        this.from = k;
        this.to = j;
        this.frame = this.options.frameSkip ? 0 : -1;
        this.time = null;
        this.transition = this.getTransition();
        var i = this.options.frames,
          h = this.options.fps,
          g = this.options.duration;
        this.duration = f.Durations[g] || g.toInt();
        this.frameInterval = 1000 / h;
        this.frames = i || Math.round(this.duration / this.frameInterval);
        this.fireEvent("start", this.subject);
        b.call(this, h);
        return this;
      },
      stop: function () {
        if (this.isRunning()) {
          this.time = null;
          d.call(this, this.options.fps);
          if (this.frames == this.frame) {
            this.fireEvent("complete", this.subject);
            if (!this.callChain()) {
              this.fireEvent("chainComplete", this.subject);
            }
          } else {
            this.fireEvent("stop", this.subject);
          }
        }
        return this;
      },
      cancel: function () {
        if (this.isRunning()) {
          this.time = null;
          d.call(this, this.options.fps);
          this.frame = this.frames;
          this.fireEvent("cancel", this.subject).clearChain();
        }
        return this;
      },
      pause: function () {
        if (this.isRunning()) {
          this.time = null;
          d.call(this, this.options.fps);
        }
        return this;
      },
      resume: function () {
        if (this.frame < this.frames && !this.isRunning()) {
          b.call(this, this.options.fps);
        }
        return this;
      },
      isRunning: function () {
        var g = e[this.options.fps];
        return g && g.contains(this);
      },
    }));
    f.compute = function (i, h, g) {
      return (h - i) * g + i;
    };
    f.Durations = { short: 250, normal: 500, long: 1000 };
    var e = {},
      c = {};
    var a = function () {
      var h = Date.now();
      for (var j = this.length; j--; ) {
        var g = this[j];
        if (g) {
          g.step(h);
        }
      }
    };
    var b = function (h) {
      var g = e[h] || (e[h] = []);
      g.push(this);
      if (!c[h]) {
        c[h] = a.periodical(Math.round(1000 / h), g);
      }
    };
    var d = function (h) {
      var g = e[h];
      if (g) {
        g.erase(this);
        if (!g.length && c[h]) {
          delete e[h];
          c[h] = clearInterval(c[h]);
        }
      }
    };
  })();
  Fx.CSS = new Class({
    Extends: Fx,
    prepare: function (b, e, a) {
      a = Array.from(a);
      var h = a[0],
        g = a[1];
      if (g == null) {
        g = h;
        h = b.getStyle(e);
        var c = this.options.unit;
        if (c && h.slice(-c.length) != c && parseFloat(h) != 0) {
          b.setStyle(e, g + c);
          var d = b.getComputedStyle(e);
          if (!/px$/.test(d)) {
            d = b.style[("pixel-" + e).camelCase()];
            if (d == null) {
              var f = b.style.left;
              b.style.left = g + c;
              d = b.style.pixelLeft;
              b.style.left = f;
            }
          }
          h = ((g || 1) / (parseFloat(d) || 1)) * (parseFloat(h) || 0);
          b.setStyle(e, h + c);
        }
      }
      return { from: this.parse(h), to: this.parse(g) };
    },
    parse: function (a) {
      a = Function.from(a)();
      a = typeof a == "string" ? a.split(" ") : Array.from(a);
      return a.map(function (c) {
        c = String(c);
        var b = false;
        Object.each(Fx.CSS.Parsers, function (f, e) {
          if (b) {
            return;
          }
          var d = f.parse(c);
          if (d || d === 0) {
            b = { value: d, parser: f };
          }
        });
        b = b || { value: c, parser: Fx.CSS.Parsers.String };
        return b;
      });
    },
    compute: function (d, c, b) {
      var a = [];
      Math.min(d.length, c.length).times(function (e) {
        a.push({
          value: d[e].parser.compute(d[e].value, c[e].value, b),
          parser: d[e].parser,
        });
      });
      a.$family = Function.from("fx:css:value");
      return a;
    },
    serve: function (c, b) {
      if (typeOf(c) != "fx:css:value") {
        c = this.parse(c);
      }
      var a = [];
      c.each(function (d) {
        a = a.concat(d.parser.serve(d.value, b));
      });
      return a;
    },
    render: function (a, d, c, b) {
      a.setStyle(d, this.serve(c, b));
    },
    search: function (a) {
      if (Fx.CSS.Cache[a]) {
        return Fx.CSS.Cache[a];
      }
      var c = {},
        b = new RegExp("^" + a.escapeRegExp() + "$");
      Array.each(document.styleSheets, function (f, e) {
        var d = f.href;
        if (d && d.contains("://") && !d.contains(document.domain)) {
          return;
        }
        var g = f.rules || f.cssRules;
        Array.each(g, function (k, h) {
          if (!k.style) {
            return;
          }
          var j = k.selectorText
            ? k.selectorText.replace(/^\w+/, function (i) {
                return i.toLowerCase();
              })
            : null;
          if (!j || !b.test(j)) {
            return;
          }
          Object.each(Element.Styles, function (l, i) {
            if (!k.style[i] || Element.ShortStyles[i]) {
              return;
            }
            l = String(k.style[i]);
            c[i] = /^rgb/.test(l) ? l.rgbToHex() : l;
          });
        });
      });
      return (Fx.CSS.Cache[a] = c);
    },
  });
  Fx.CSS.Cache = {};
  Fx.CSS.Parsers = {
    Color: {
      parse: function (a) {
        if (a.match(/^#[0-9a-f]{3,6}$/i)) {
          return a.hexToRgb(true);
        }
        return (a = a.match(/(\d+),\s*(\d+),\s*(\d+)/))
          ? [a[1], a[2], a[3]]
          : false;
      },
      compute: function (c, b, a) {
        return c.map(function (e, d) {
          return Math.round(Fx.compute(c[d], b[d], a));
        });
      },
      serve: function (a) {
        return a.map(Number);
      },
    },
    Number: {
      parse: parseFloat,
      compute: Fx.compute,
      serve: function (b, a) {
        return a ? b + a : b;
      },
    },
    String: {
      parse: Function.from(false),
      compute: function (b, a) {
        return a;
      },
      serve: function (a) {
        return a;
      },
    },
  };
  Fx.CSS.Parsers = new Hash(Fx.CSS.Parsers);
  Fx.Tween = new Class({
    Extends: Fx.CSS,
    initialize: function (b, a) {
      this.element = this.subject = document.id(b);
      this.parent(a);
    },
    set: function (b, a) {
      if (arguments.length == 1) {
        a = b;
        b = this.property || this.options.property;
      }
      this.render(this.element, b, a, this.options.unit);
      return this;
    },
    start: function (c, e, d) {
      if (!this.check(c, e, d)) {
        return this;
      }
      var b = Array.flatten(arguments);
      this.property = this.options.property || b.shift();
      var a = this.prepare(this.element, this.property, b);
      return this.parent(a.from, a.to);
    },
  });
  Element.Properties.tween = {
    set: function (a) {
      this.get("tween").cancel().setOptions(a);
      return this;
    },
    get: function () {
      var a = this.retrieve("tween");
      if (!a) {
        a = new Fx.Tween(this, { link: "cancel" });
        this.store("tween", a);
      }
      return a;
    },
  };
  Element.implement({
    tween: function (a, c, b) {
      this.get("tween").start(a, c, b);
      return this;
    },
    fade: function (d) {
      var e = this.get("tween"),
        g,
        c = ["opacity"].append(arguments),
        a;
      if (c[1] == null) {
        c[1] = "toggle";
      }
      switch (c[1]) {
        case "in":
          g = "start";
          c[1] = 1;
          break;
        case "out":
          g = "start";
          c[1] = 0;
          break;
        case "show":
          g = "set";
          c[1] = 1;
          break;
        case "hide":
          g = "set";
          c[1] = 0;
          break;
        case "toggle":
          var b = this.retrieve("fade:flag", this.getStyle("opacity") == 1);
          g = "start";
          c[1] = b ? 0 : 1;
          this.store("fade:flag", !b);
          a = true;
          break;
        default:
          g = "start";
      }
      if (!a) {
        this.eliminate("fade:flag");
      }
      e[g].apply(e, c);
      var f = c[c.length - 1];
      if (g == "set" || f != 0) {
        this.setStyle("visibility", f == 0 ? "hidden" : "visible");
      } else {
        e.chain(function () {
          this.element.setStyle("visibility", "hidden");
          this.callChain();
        });
      }
      return this;
    },
    highlight: function (c, a) {
      if (!a) {
        a = this.retrieve(
          "highlight:original",
          this.getStyle("background-color")
        );
        a = a == "transparent" ? "#fff" : a;
      }
      var b = this.get("tween");
      b.start("background-color", c || "#ffff88", a).chain(
        function () {
          this.setStyle(
            "background-color",
            this.retrieve("highlight:original")
          );
          b.callChain();
        }.bind(this)
      );
      return this;
    },
  });
  Fx.Morph = new Class({
    Extends: Fx.CSS,
    initialize: function (b, a) {
      this.element = this.subject = document.id(b);
      this.parent(a);
    },
    set: function (a) {
      if (typeof a == "string") {
        a = this.search(a);
      }
      for (var b in a) {
        this.render(this.element, b, a[b], this.options.unit);
      }
      return this;
    },
    compute: function (e, d, c) {
      var a = {};
      for (var b in e) {
        a[b] = this.parent(e[b], d[b], c);
      }
      return a;
    },
    start: function (b) {
      if (!this.check(b)) {
        return this;
      }
      if (typeof b == "string") {
        b = this.search(b);
      }
      var e = {},
        d = {};
      for (var c in b) {
        var a = this.prepare(this.element, c, b[c]);
        e[c] = a.from;
        d[c] = a.to;
      }
      return this.parent(e, d);
    },
  });
  Element.Properties.morph = {
    set: function (a) {
      this.get("morph").cancel().setOptions(a);
      return this;
    },
    get: function () {
      var a = this.retrieve("morph");
      if (!a) {
        a = new Fx.Morph(this, { link: "cancel" });
        this.store("morph", a);
      }
      return a;
    },
  };
  Element.implement({
    morph: function (a) {
      this.get("morph").start(a);
      return this;
    },
  });
  Fx.implement({
    getTransition: function () {
      var a = this.options.transition || Fx.Transitions.Sine.easeInOut;
      if (typeof a == "string") {
        var b = a.split(":");
        a = Fx.Transitions;
        a = a[b[0]] || a[b[0].capitalize()];
        if (b[1]) {
          a = a["ease" + b[1].capitalize() + (b[2] ? b[2].capitalize() : "")];
        }
      }
      return a;
    },
  });
  Fx.Transition = function (c, b) {
    b = Array.from(b);
    var a = function (d) {
      return c(d, b);
    };
    return Object.append(a, {
      easeIn: a,
      easeOut: function (d) {
        return 1 - c(1 - d, b);
      },
      easeInOut: function (d) {
        return (d <= 0.5 ? c(2 * d, b) : 2 - c(2 * (1 - d), b)) / 2;
      },
    });
  };
  Fx.Transitions = {
    linear: function (a) {
      return a;
    },
  };
  Fx.Transitions = new Hash(Fx.Transitions);
  Fx.Transitions.extend = function (a) {
    for (var b in a) {
      Fx.Transitions[b] = new Fx.Transition(a[b]);
    }
  };
  Fx.Transitions.extend({
    Pow: function (b, a) {
      return Math.pow(b, (a && a[0]) || 6);
    },
    Expo: function (a) {
      return Math.pow(2, 8 * (a - 1));
    },
    Circ: function (a) {
      return 1 - Math.sin(Math.acos(a));
    },
    Sine: function (a) {
      return 1 - Math.cos((a * Math.PI) / 2);
    },
    Back: function (b, a) {
      a = (a && a[0]) || 1.618;
      return Math.pow(b, 2) * ((a + 1) * b - a);
    },
    Bounce: function (f) {
      var e;
      for (var d = 0, c = 1; 1; d += c, c /= 2) {
        if (f >= (7 - 4 * d) / 11) {
          e = c * c - Math.pow((11 - 6 * d - 11 * f) / 4, 2);
          break;
        }
      }
      return e;
    },
    Elastic: function (b, a) {
      return (
        Math.pow(2, 10 * --b) *
        Math.cos((20 * b * Math.PI * ((a && a[0]) || 1)) / 3)
      );
    },
  });
  ["Quad", "Cubic", "Quart", "Quint"].each(function (b, a) {
    Fx.Transitions[b] = new Fx.Transition(function (c) {
      return Math.pow(c, a + 2);
    });
  });
  (function () {
    var d = function () {},
      a = "onprogress" in new Browser.Request();
    var c = (this.Request = new Class({
      Implements: [Chain, Events, Options],
      options: {
        url: "",
        data: "",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "text/javascript, text/html, application/xml, text/xml, */*",
        },
        async: true,
        format: false,
        method: "post",
        link: "ignore",
        isSuccess: null,
        emulation: true,
        urlEncoded: true,
        encoding: "utf-8",
        evalScripts: false,
        evalResponse: false,
        timeout: 0,
        noCache: false,
      },
      initialize: function (e) {
        this.xhr = new Browser.Request();
        this.setOptions(e);
        this.headers = this.options.headers;
      },
      onStateChange: function () {
        var e = this.xhr;
        if (e.readyState != 4 || !this.running) {
          return;
        }
        this.running = false;
        this.status = 0;
        Function.attempt(
          function () {
            var f = e.status;
            this.status = f == 1223 ? 204 : f;
          }.bind(this)
        );
        e.onreadystatechange = d;
        if (a) {
          e.onprogress = e.onloadstart = d;
        }
        clearTimeout(this.timer);
        this.response = {
          text: this.xhr.responseText || "",
          xml: this.xhr.responseXML,
        };
        if (this.options.isSuccess.call(this, this.status)) {
          this.success(this.response.text, this.response.xml);
        } else {
          this.failure();
        }
      },
      isSuccess: function () {
        var e = this.status;
        return e >= 200 && e < 300;
      },
      isRunning: function () {
        return !!this.running;
      },
      processScripts: function (e) {
        if (
          this.options.evalResponse ||
          /(ecma|java)script/.test(this.getHeader("Content-type"))
        ) {
          return Browser.exec(e);
        }
        return e.stripScripts(this.options.evalScripts);
      },
      success: function (f, e) {
        this.onSuccess(this.processScripts(f), e);
      },
      onSuccess: function () {
        this.fireEvent("complete", arguments)
          .fireEvent("success", arguments)
          .callChain();
      },
      failure: function () {
        this.onFailure();
      },
      onFailure: function () {
        this.fireEvent("complete").fireEvent("failure", this.xhr);
      },
      loadstart: function (e) {
        this.fireEvent("loadstart", [e, this.xhr]);
      },
      progress: function (e) {
        this.fireEvent("progress", [e, this.xhr]);
      },
      timeout: function () {
        this.fireEvent("timeout", this.xhr);
      },
      setHeader: function (e, f) {
        this.headers[e] = f;
        return this;
      },
      getHeader: function (e) {
        return Function.attempt(
          function () {
            return this.xhr.getResponseHeader(e);
          }.bind(this)
        );
      },
      check: function () {
        if (!this.running) {
          return true;
        }
        switch (this.options.link) {
          case "cancel":
            this.cancel();
            return true;
          case "chain":
            this.chain(this.caller.pass(arguments, this));
            return false;
        }
        return false;
      },
      send: function (o) {
        if (!this.check(o)) {
          return this;
        }
        this.options.isSuccess = this.options.isSuccess || this.isSuccess;
        this.running = true;
        var l = typeOf(o);
        if (l == "string" || l == "element") {
          o = { data: o };
        }
        var h = this.options;
        o = Object.append({ data: h.data, url: h.url, method: h.method }, o);
        var j = o.data,
          f = String(o.url),
          e = o.method.toLowerCase();
        switch (typeOf(j)) {
          case "element":
            j = document.id(j).toQueryString();
            break;
          case "object":
          case "hash":
            j = Object.toQueryString(j);
        }
        if (this.options.format) {
          var m = "format=" + this.options.format;
          j = j ? m + "&" + j : m;
        }
        if (this.options.emulation && !["get", "post"].contains(e)) {
          var k = "_method=" + e;
          j = j ? k + "&" + j : k;
          e = "post";
        }
        if (this.options.urlEncoded && ["post", "put"].contains(e)) {
          var g = this.options.encoding
            ? "; charset=" + this.options.encoding
            : "";
          this.headers["Content-type"] =
            "application/x-www-form-urlencoded" + g;
        }
        if (!f) {
          f = document.location.pathname;
        }
        var i = f.lastIndexOf("/");
        if (i > -1 && (i = f.indexOf("#")) > -1) {
          f = f.substr(0, i);
        }
        if (this.options.noCache) {
          f += (f.contains("?") ? "&" : "?") + String.uniqueID();
        }
        if (j && e == "get") {
          f += (f.contains("?") ? "&" : "?") + j;
          j = null;
        }
        var n = this.xhr;
        if (a) {
          n.onloadstart = this.loadstart.bind(this);
          n.onprogress = this.progress.bind(this);
        }
        n.open(
          e.toUpperCase(),
          f,
          this.options.async,
          this.options.user,
          this.options.password
        );
        if (this.options.user && "withCredentials" in n) {
          n.withCredentials = true;
        }
        n.onreadystatechange = this.onStateChange.bind(this);
        Object.each(
          this.headers,
          function (q, p) {
            try {
              n.setRequestHeader(p, q);
            } catch (r) {
              this.fireEvent("exception", [p, q]);
            }
          },
          this
        );
        this.fireEvent("request");
        n.send(j);
        if (!this.options.async) {
          this.onStateChange();
        } else {
          if (this.options.timeout) {
            this.timer = this.timeout.delay(this.options.timeout, this);
          }
        }
        return this;
      },
      cancel: function () {
        if (!this.running) {
          return this;
        }
        this.running = false;
        var e = this.xhr;
        e.abort();
        clearTimeout(this.timer);
        e.onreadystatechange = d;
        if (a) {
          e.onprogress = e.onloadstart = d;
        }
        this.xhr = new Browser.Request();
        this.fireEvent("cancel");
        return this;
      },
    }));
    var b = {};
    ["get", "post", "put", "delete", "GET", "POST", "PUT", "DELETE"].each(
      function (e) {
        b[e] = function (g) {
          var f = { method: e };
          if (g != null) {
            f.data = g;
          }
          return this.send(f);
        };
      }
    );
    c.implement(b);
    Element.Properties.send = {
      set: function (e) {
        var f = this.get("send").cancel();
        f.setOptions(e);
        return this;
      },
      get: function () {
        var e = this.retrieve("send");
        if (!e) {
          e = new c({
            data: this,
            link: "cancel",
            method: this.get("method") || "post",
            url: this.get("action"),
          });
          this.store("send", e);
        }
        return e;
      },
    };
    Element.implement({
      send: function (e) {
        var f = this.get("send");
        f.send({ data: this, url: e || f.options.url });
        return this;
      },
    });
  })();
  Request.HTML = new Class({
    Extends: Request,
    options: {
      update: false,
      append: false,
      evalScripts: true,
      filter: false,
      headers: { Accept: "text/html, application/xml, text/xml, */*" },
    },
    success: function (f) {
      var e = this.options,
        c = this.response;
      c.html = f.stripScripts(function (h) {
        c.javascript = h;
      });
      var d = c.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (d) {
        c.html = d[1];
      }
      var b = new Element("div").set("html", c.html);
      c.tree = b.childNodes;
      c.elements = b.getElements(e.filter || "*");
      if (e.filter) {
        c.tree = c.elements;
      }
      if (e.update) {
        var g = document.id(e.update).empty();
        if (e.filter) {
          g.adopt(c.elements);
        } else {
          g.set("html", c.html);
        }
      } else {
        if (e.append) {
          var a = document.id(e.append);
          if (e.filter) {
            c.elements.reverse().inject(a);
          } else {
            a.adopt(b.getChildren());
          }
        }
      }
      if (e.evalScripts) {
        Browser.exec(c.javascript);
      }
      this.onSuccess(c.tree, c.elements, c.html, c.javascript);
    },
  });
  Element.Properties.load = {
    set: function (a) {
      var b = this.get("load").cancel();
      b.setOptions(a);
      return this;
    },
    get: function () {
      var a = this.retrieve("load");
      if (!a) {
        a = new Request.HTML({
          data: this,
          link: "cancel",
          update: this,
          method: "get",
        });
        this.store("load", a);
      }
      return a;
    },
  };
  Element.implement({
    load: function () {
      this.get("load").send(
        Array.link(arguments, { data: Type.isObject, url: Type.isString })
      );
      return this;
    },
  });
  if (typeof JSON == "undefined") {
    this.JSON = {};
  }
  JSON = new Hash({ stringify: JSON.stringify, parse: JSON.parse });
  (function () {
    var special = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    };
    var escape = function (chr) {
      return (
        special[chr] ||
        "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).slice(-4)
      );
    };
    JSON.validate = function (string) {
      string = string
        .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "");
      return /^[\],:{}\s]*$/.test(string);
    };
    JSON.encode = JSON.stringify
      ? function (obj) {
          return JSON.stringify(obj);
        }
      : function (obj) {
          if (obj && obj.toJSON) {
            obj = obj.toJSON();
          }
          switch (typeOf(obj)) {
            case "string":
              return '"' + obj.replace(/[\x00-\x1f\\"]/g, escape) + '"';
            case "array":
              return "[" + obj.map(JSON.encode).clean() + "]";
            case "object":
            case "hash":
              var string = [];
              Object.each(obj, function (value, key) {
                var json = JSON.encode(value);
                if (json) {
                  string.push(JSON.encode(key) + ":" + json);
                }
              });
              return "{" + string + "}";
            case "number":
            case "boolean":
              return "" + obj;
            case "null":
              return "null";
          }
          return null;
        };
    JSON.decode = function (string, secure) {
      if (!string || typeOf(string) != "string") {
        return null;
      }
      if (secure || JSON.secure) {
        if (JSON.parse) {
          return JSON.parse(string);
        }
        if (!JSON.validate(string)) {
          throw new Error(
            "JSON could not decode the input; security is enabled and the value is not secure."
          );
        }
      }
      return eval("(" + string + ")");
    };
  })();
  Request.JSON = new Class({
    Extends: Request,
    options: { secure: true },
    initialize: function (a) {
      this.parent(a);
      Object.append(this.headers, {
        Accept: "application/json",
        "X-Request": "JSON",
      });
    },
    success: function (c) {
      var b;
      try {
        b = this.response.json = JSON.decode(c, this.options.secure);
      } catch (a) {
        this.fireEvent("error", [c, a]);
        return;
      }
      if (b == null) {
        this.onFailure();
      } else {
        this.onSuccess(b, c);
      }
    },
  });
  var Cookie = new Class({
    Implements: Options,
    options: {
      path: "/",
      domain: false,
      duration: false,
      secure: false,
      document: document,
      encode: true,
    },
    initialize: function (b, a) {
      this.key = b;
      this.setOptions(a);
    },
    write: function (b) {
      if (this.options.encode) {
        b = encodeURIComponent(b);
      }
      if (this.options.domain) {
        b += "; domain=" + this.options.domain;
      }
      if (this.options.path) {
        b += "; path=" + this.options.path;
      }
      if (this.options.duration) {
        var a = new Date();
        a.setTime(a.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
        b += "; expires=" + a.toGMTString();
      }
      if (this.options.secure) {
        b += "; secure";
      }
      this.options.document.cookie = this.key + "=" + b;
      return this;
    },
    read: function () {
      var a = this.options.document.cookie.match(
        "(?:^|;)\\s*" + this.key.escapeRegExp() + "=([^;]*)"
      );
      return a ? decodeURIComponent(a[1]) : null;
    },
    dispose: function () {
      new Cookie(
        this.key,
        Object.merge({}, this.options, { duration: -1 })
      ).write("");
      return this;
    },
  });
  Cookie.write = function (b, c, a) {
    return new Cookie(b, a).write(c);
  };
  Cookie.read = function (a) {
    return new Cookie(a).read();
  };
  Cookie.dispose = function (b, a) {
    return new Cookie(b, a).dispose();
  };
  (function (i, k) {
    var l,
      f,
      e = [],
      c,
      b,
      d = k.createElement("div");
    var g = function () {
      clearTimeout(b);
      if (l) {
        return;
      }
      Browser.loaded = l = true;
      k.removeListener("DOMContentLoaded", g).removeListener(
        "readystatechange",
        a
      );
      k.fireEvent("domready");
      i.fireEvent("domready");
    };
    var a = function () {
      for (var m = e.length; m--; ) {
        if (e[m]()) {
          g();
          return true;
        }
      }
      return false;
    };
    var j = function () {
      clearTimeout(b);
      if (!a()) {
        b = setTimeout(j, 10);
      }
    };
    k.addListener("DOMContentLoaded", g);
    var h = function () {
      try {
        d.doScroll();
        return true;
      } catch (m) {}
      return false;
    };
    if (d.doScroll && !h()) {
      e.push(h);
      c = true;
    }
    if (k.readyState) {
      e.push(function () {
        var m = k.readyState;
        return m == "loaded" || m == "complete";
      });
    }
    if ("onreadystatechange" in k) {
      k.addListener("readystatechange", a);
    } else {
      c = true;
    }
    if (c) {
      j();
    }
    Element.Events.domready = {
      onAdd: function (m) {
        if (l) {
          m.call(this);
        }
      },
    };
    Element.Events.load = {
      base: "load",
      onAdd: function (m) {
        if (f && this == i) {
          m.call(this);
        }
      },
      condition: function () {
        if (this == i) {
          g();
          delete Element.Events.load;
        }
        return true;
      },
    };
    i.addEvent("load", function () {
      f = true;
    });
  })(window, document);
  (function () {
    var Swiff = (this.Swiff = new Class({
      Implements: Options,
      options: {
        id: null,
        height: 1,
        width: 1,
        container: null,
        properties: {},
        params: {
          quality: "high",
          allowScriptAccess: "always",
          wMode: "window",
          swLiveConnect: true,
        },
        callBacks: {},
        vars: {},
      },
      toElement: function () {
        return this.object;
      },
      initialize: function (path, options) {
        this.instance = "Swiff_" + String.uniqueID();
        this.setOptions(options);
        options = this.options;
        var id = (this.id = options.id || this.instance);
        var container = document.id(options.container);
        Swiff.CallBacks[this.instance] = {};
        var params = options.params,
          vars = options.vars,
          callBacks = options.callBacks;
        var properties = Object.append(
          { height: options.height, width: options.width },
          options.properties
        );
        var self = this;
        for (var callBack in callBacks) {
          Swiff.CallBacks[this.instance][callBack] = (function (option) {
            return function () {
              return option.apply(self.object, arguments);
            };
          })(callBacks[callBack]);
          vars[callBack] = "Swiff.CallBacks." + this.instance + "." + callBack;
        }
        params.flashVars = Object.toQueryString(vars);
        if (Browser.ie) {
          properties.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
          params.movie = path;
        } else {
          properties.type = "application/x-shockwave-flash";
        }
        properties.data = path;
        var build = '<object id="' + id + '"';
        for (var property in properties) {
          build += " " + property + '="' + properties[property] + '"';
        }
        build += ">";
        for (var param in params) {
          if (params[param]) {
            build +=
              '<param name="' + param + '" value="' + params[param] + '" />';
          }
        }
        build += "</object>";
        this.object = (container ? container.empty() : new Element("div")).set(
          "html",
          build
        ).firstChild;
      },
      replaces: function (element) {
        element = document.id(element, true);
        element.parentNode.replaceChild(this.toElement(), element);
        return this;
      },
      inject: function (element) {
        document.id(element, true).appendChild(this.toElement());
        return this;
      },
      remote: function () {
        return Swiff.remote.apply(Swiff, [this.toElement()].append(arguments));
      },
    }));
    Swiff.CallBacks = {};
    Swiff.remote = function (obj, fn) {
      var rs = obj.CallFunction(
        '<invoke name="' +
          fn +
          '" returntype="javascript">' +
          __flash__argumentsToXML(arguments, 2) +
          "</invoke>"
      );
      return eval(rs);
    };
  })();
} else {
  (function () {
    this.MooTools = {
      version: "1.6.0",
      build: "529422872adfff401b901b8b6c7ca5114ee95e2b",
    };

    var typeOf = (this.typeOf = function (item) {
      if (item == null) return "null";
      if (item.$family != null) return item.$family();

      if (item.nodeName) {
        if (item.nodeType == 1) return "element";
        if (item.nodeType == 3)
          return /\S/.test(item.nodeValue) ? "textnode" : "whitespace";
      } else if (typeof item.length == "number") {
        if ("callee" in item) return "arguments";
        if ("item" in item) return "collection";
      }

      return typeof item;
    });

    var instanceOf = (this.instanceOf = function (item, object) {
      if (item == null) return false;
      var constructor = item.$constructor || item.constructor;
      while (constructor) {
        if (constructor === object) return true;
        constructor = constructor.parent;
      }
      /*<ltIE8>*/
      if (!item.hasOwnProperty) return false;
      /*</ltIE8>*/
      return item instanceof object;
    });

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /*<ltIE8>*/
    var enumerables = true;
    for (var i in { toString: 1 }) enumerables = null;
    if (enumerables)
      enumerables = [
        "hasOwnProperty",
        "valueOf",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "constructor",
      ];
    function forEachObjectEnumberableKey(object, fn, bind) {
      if (enumerables)
        for (var i = enumerables.length; i--; ) {
          var k = enumerables[i];

          if (hasOwnProperty.call(object, k)) fn.call(bind, k, object[k]);
        }
    }

    var Function = this.Function;

    Function.prototype.overloadSetter = function (usePlural) {
      var self = this;
      return function (a, b) {
        if (a == null) return this;
        if (usePlural || typeof a != "string") {
          for (var k in a) self.call(this, k, a[k]);
          forEachObjectEnumberableKey(a, self, this);
        } else {
          self.call(this, a, b);
        }
        return this;
      };
    };

    Function.prototype.overloadGetter = function (usePlural) {
      var self = this;
      return function (a) {
        var args, result;
        if (typeof a != "string") args = a;
        else if (arguments.length > 1) args = arguments;
        else if (usePlural) args = [a];
        if (args) {
          result = {};
          for (var i = 0; i < args.length; i++)
            result[args[i]] = self.call(this, args[i]);
        } else {
          result = self.call(this, a);
        }
        return result;
      };
    };

    Function.prototype.extend = function (key, value) {
      this[key] = value;
    }.overloadSetter();

    Function.prototype.implement = function (key, value) {
      this.prototype[key] = value;
    }.overloadSetter();

    var slice = Array.prototype.slice;

    Array.convert = function (item) {
      if (item == null) return [];
      return Type.isEnumerable(item) && typeof item != "string"
        ? typeOf(item) == "array"
          ? item
          : slice.call(item)
        : [item];
    };

    Function.convert = function (item) {
      return typeOf(item) == "function"
        ? item
        : function () {
            return item;
          };
    };

    Number.convert = function (item) {
      var number = parseFloat(item);
      return isFinite(number) ? number : null;
    };

    String.convert = function (item) {
      return item + "";
    };

    Function.from = Function.convert;
    Number.from = Number.convert;
    String.from = String.convert;

    Function.implement({
      hide: function () {
        this.$hidden = true;
        return this;
      },

      protect: function () {
        this.$protected = true;
        return this;
      },
    });

    var Type = (this.Type = function (name, object) {
      if (name) {
        var lower = name.toLowerCase();
        var typeCheck = function (item) {
          return typeOf(item) == lower;
        };

        Type["is" + name] = typeCheck;
        if (object != null) {
          object.prototype.$family = function () {
            return lower;
          }.hide();
        }
      }

      if (object == null) return null;

      object.extend(this);
      object.$constructor = Type;
      object.prototype.$constructor = object;

      return object;
    });

    var toString = Object.prototype.toString;

    Type.isEnumerable = function (item) {
      return (
        item != null &&
        typeof item.length == "number" &&
        toString.call(item) != "[object Function]"
      );
    };

    var hooks = {};

    var hooksOf = function (object) {
      var type = typeOf(object.prototype);
      return hooks[type] || (hooks[type] = []);
    };

    var implement = function (name, method) {
      if (method && method.$hidden) return;

      var hooks = hooksOf(this);

      for (var i = 0; i < hooks.length; i++) {
        var hook = hooks[i];
        if (typeOf(hook) == "type") implement.call(hook, name, method);
        else hook.call(this, name, method);
      }

      var previous = this.prototype[name];
      if (previous == null || !previous.$protected)
        this.prototype[name] = method;

      if (this[name] == null && typeOf(method) == "function")
        extend.call(this, name, function (item) {
          return method.apply(item, slice.call(arguments, 1));
        });
    };

    var extend = function (name, method) {
      if (method && method.$hidden) return;
      var previous = this[name];
      if (previous == null || !previous.$protected) this[name] = method;
    };

    Type.implement({
      implement: implement.overloadSetter(),

      extend: extend.overloadSetter(),

      alias: function (name, existing) {
        implement.call(this, name, this.prototype[existing]);
      }.overloadSetter(),

      mirror: function (hook) {
        hooksOf(this).push(hook);
        return this;
      },
    });

    new Type("Type", Type);

    var force = function (name, object, methods) {
      var isType = object != Object,
        prototype = object.prototype;

      if (isType) object = new Type(name, object);

      for (var i = 0, l = methods.length; i < l; i++) {
        var key = methods[i],
          generic = object[key],
          proto = prototype[key];

        if (generic) generic.protect();
        if (isType && proto) object.implement(key, proto.protect());
      }

      if (isType) {
        var methodsEnumerable = prototype.propertyIsEnumerable(methods[0]);
        object.forEachMethod = function (fn) {
          if (!methodsEnumerable)
            for (var i = 0, l = methods.length; i < l; i++) {
              fn.call(prototype, prototype[methods[i]], methods[i]);
            }
          for (var key in prototype) fn.call(prototype, prototype[key], key);
        };
      }

      return force;
    };

    force("String", String, [
      "charAt",
      "charCodeAt",
      "concat",
      "contains",
      "indexOf",
      "lastIndexOf",
      "match",
      "quote",
      "replace",
      "search",
      "slice",
      "split",
      "substr",
      "substring",
      "trim",
      "toLowerCase",
      "toUpperCase",
    ])("Array", Array, [
      "pop",
      "push",
      "reverse",
      "shift",
      "sort",
      "splice",
      "unshift",
      "concat",
      "join",
      "slice",
      "indexOf",
      "lastIndexOf",
      "filter",
      "forEach",
      "every",
      "map",
      "some",
      "reduce",
      "reduceRight",
      "contains",
    ])("Number", Number, [
      "toExponential",
      "toFixed",
      "toLocaleString",
      "toPrecision",
    ])("Function", Function, ["apply", "call", "bind"])("RegExp", RegExp, [
      "exec",
      "test",
    ])("Object", Object, [
      "create",
      "defineProperty",
      "defineProperties",
      "keys",
      "getPrototypeOf",
      "getOwnPropertyDescriptor",
      "getOwnPropertyNames",
      "preventExtensions",
      "isExtensible",
      "seal",
      "isSealed",
      "freeze",
      "isFrozen",
    ])("Date", Date, ["now"]);

    Object.extend = extend.overloadSetter();

    Date.extend("now", function () {
      return +new Date();
    });

    new Type("Boolean", Boolean);

    Number.prototype.$family = function () {
      return isFinite(this) ? "number" : "null";
    }.hide();

    Number.extend("random", function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    });

    Array.implement({
      /*<!ES5>*/
      forEach: function (fn, bind) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (i in this) fn.call(bind, this[i], i, this);
        }
      },
      /*</!ES5>*/

      each: function (fn, bind) {
        Array.forEach(this, fn, bind);
        return this;
      },
    });

    Object.extend({
      keys: function (object) {
        var keys = [];
        for (var k in object) {
          if (hasOwnProperty.call(object, k)) keys.push(k);
        }
        /*<ltIE8>*/
        forEachObjectEnumberableKey(object, function (k) {
          keys.push(k);
        });
        /*</ltIE8>*/
        return keys;
      },

      forEach: function (object, fn, bind) {
        Object.keys(object).forEach(function (key) {
          fn.call(bind, object[key], key, object);
        });
      },
    });

    Object.each = Object.forEach;

    var cloneOf = function (item) {
      switch (typeOf(item)) {
        case "array":
          return item.clone();
        case "object":
          return Object.clone(item);
        default:
          return item;
      }
    };

    Array.implement("clone", function () {
      var i = this.length,
        clone = new Array(i);
      while (i--) clone[i] = cloneOf(this[i]);
      return clone;
    });

    var mergeOne = function (source, key, current) {
      switch (typeOf(current)) {
        case "object":
          if (typeOf(source[key]) == "object")
            Object.merge(source[key], current);
          else source[key] = Object.clone(current);
          break;
        case "array":
          source[key] = current.clone();
          break;
        default:
          source[key] = current;
      }
      return source;
    };

    Object.extend({
      merge: function (source, k, v) {
        if (typeOf(k) == "string") return mergeOne(source, k, v);
        for (var i = 1, l = arguments.length; i < l; i++) {
          var object = arguments[i];
          for (var key in object) mergeOne(source, key, object[key]);
        }
        return source;
      },

      clone: function (object) {
        var clone = {};
        for (var key in object) clone[key] = cloneOf(object[key]);
        return clone;
      },

      append: function (original) {
        for (var i = 1, l = arguments.length; i < l; i++) {
          var extended = arguments[i] || {};
          for (var key in extended) original[key] = extended[key];
        }
        return original;
      },
    });

    ["Object", "WhiteSpace", "TextNode", "Collection", "Arguments"].each(
      function (name) {
        new Type(name);
      }
    );

    var UID = Date.now();

    String.extend("uniqueID", function () {
      return (UID++).toString(36);
    });
  })();

  Array.implement({
    every: function (fn, bind) {
      for (var i = 0, l = this.length >>> 0; i < l; i++) {
        if (i in this && !fn.call(bind, this[i], i, this)) return false;
      }
      return true;
    },

    filter: function (fn, bind) {
      var results = [];
      for (var value, i = 0, l = this.length >>> 0; i < l; i++)
        if (i in this) {
          value = this[i];
          if (fn.call(bind, value, i, this)) results.push(value);
        }
      return results;
    },

    indexOf: function (item, from) {
      var length = this.length >>> 0;
      for (
        var i = from < 0 ? Math.max(0, length + from) : from || 0;
        i < length;
        i++
      ) {
        if (this[i] === item) return i;
      }
      return -1;
    },

    map: function (fn, bind) {
      var length = this.length >>> 0,
        results = Array(length);
      for (var i = 0; i < length; i++) {
        if (i in this) results[i] = fn.call(bind, this[i], i, this);
      }
      return results;
    },

    some: function (fn, bind) {
      for (var i = 0, l = this.length >>> 0; i < l; i++) {
        if (i in this && fn.call(bind, this[i], i, this)) return true;
      }
      return false;
    },
    /*</!ES5>*/

    clean: function () {
      return this.filter(function (item) {
        return item != null;
      });
    },

    invoke: function (methodName) {
      var args = Array.slice(arguments, 1);
      return this.map(function (item) {
        return item[methodName].apply(item, args);
      });
    },

    associate: function (keys) {
      var obj = {},
        length = Math.min(this.length, keys.length);
      for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
      return obj;
    },

    link: function (object) {
      var result = {};
      for (var i = 0, l = this.length; i < l; i++) {
        for (var key in object) {
          if (object[key](this[i])) {
            result[key] = this[i];
            delete object[key];
            break;
          }
        }
      }
      return result;
    },

    contains: function (item, from) {
      return this.indexOf(item, from) != -1;
    },

    append: function (array) {
      this.push.apply(this, array);
      return this;
    },

    getLast: function () {
      return this.length ? this[this.length - 1] : null;
    },

    getRandom: function () {
      return this.length ? this[Number.random(0, this.length - 1)] : null;
    },

    include: function (item) {
      if (!this.contains(item)) this.push(item);
      return this;
    },

    combine: function (array) {
      for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
      return this;
    },

    erase: function (item) {
      for (var i = this.length; i--; ) {
        if (this[i] === item) this.splice(i, 1);
      }
      return this;
    },

    empty: function () {
      this.length = 0;
      return this;
    },

    flatten: function () {
      var array = [];
      for (var i = 0, l = this.length; i < l; i++) {
        var type = typeOf(this[i]);
        if (type == "null") continue;
        array = array.concat(
          type == "array" ||
            type == "collection" ||
            type == "arguments" ||
            instanceOf(this[i], Array)
            ? Array.flatten(this[i])
            : this[i]
        );
      }
      return array;
    },

    pick: function () {
      for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] != null) return this[i];
      }
      return null;
    },

    hexToRgb: function (array) {
      if (this.length != 3) return null;
      var rgb = this.map(function (value) {
        if (value.length == 1) value += value;
        return parseInt(value, 16);
      });
      return array ? rgb : "rgb(" + rgb + ")";
    },

    rgbToHex: function (array) {
      if (this.length < 3) return null;
      if (this.length == 4 && this[3] == 0 && !array) return "transparent";
      var hex = [];
      for (var i = 0; i < 3; i++) {
        var bit = (this[i] - 0).toString(16);
        hex.push(bit.length == 1 ? "0" + bit : bit);
      }
      return array ? hex : "#" + hex.join("");
    },
  });

  Function.extend({
    attempt: function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        try {
          return arguments[i]();
        } catch (e) {}
      }
      return null;
    },
  });

  Function.implement({
    attempt: function (args, bind) {
      try {
        return this.apply(bind, Array.convert(args));
      } catch (e) {}

      return null;
    },

    /*<!ES5-bind>*/
    bind: function (that) {
      var self = this,
        args = arguments.length > 1 ? Array.slice(arguments, 1) : null,
        F = function () {};

      var bound = function () {
        var context = that,
          length = arguments.length;
        if (this instanceof bound) {
          F.prototype = self.prototype;
          context = new F();
        }
        var result =
          !args && !length
            ? self.call(context)
            : self.apply(
                context,
                args && length
                  ? args.concat(Array.slice(arguments))
                  : args || arguments
              );
        return context == that ? result : context;
      };
      return bound;
    },
    /*</!ES5-bind>*/

    pass: function (args, bind) {
      var self = this;
      if (args != null) args = Array.convert(args);
      return function () {
        return self.apply(bind, args || arguments);
      };
    },

    delay: function (delay, bind, args) {
      return setTimeout(this.pass(args == null ? [] : args, bind), delay);
    },

    periodical: function (periodical, bind, args) {
      return setInterval(this.pass(args == null ? [] : args, bind), periodical);
    },
  });

  Number.implement({
    limit: function (min, max) {
      return Math.min(max, Math.max(min, this));
    },

    round: function (precision) {
      precision = Math.pow(10, precision || 0).toFixed(
        precision < 0 ? -precision : 0
      );
      return Math.round(this * precision) / precision;
    },

    times: function (fn, bind) {
      for (var i = 0; i < this; i++) fn.call(bind, i, this);
    },

    toFloat: function () {
      return parseFloat(this);
    },

    toInt: function (base) {
      return parseInt(this, base || 10);
    },
  });

  Number.alias("each", "times");

  (function (math) {
    var methods = {};

    math.each(function (name) {
      if (!Number[name])
        methods[name] = function () {
          return Math[name].apply(
            null,
            [this].concat(Array.convert(arguments))
          );
        };
    });

    Number.implement(methods);
  })([
    "abs",
    "acos",
    "asin",
    "atan",
    "atan2",
    "ceil",
    "cos",
    "exp",
    "floor",
    "log",
    "max",
    "min",
    "pow",
    "sin",
    "sqrt",
    "tan",
  ]);

  String.implement({
    contains: function (string, index) {
      return (
        (index ? String(this).slice(index) : String(this)).indexOf(string) > -1
      );
    },

    test: function (regex, params) {
      return (
        typeOf(regex) == "regexp" ? regex : new RegExp("" + regex, params)
      ).test(this);
    },

    trim: function () {
      return String(this).replace(/^\s+|\s+$/g, "");
    },

    clean: function () {
      return String(this).replace(/\s+/g, " ").trim();
    },

    camelCase: function () {
      return String(this).replace(/-\D/g, function (match) {
        return match.charAt(1).toUpperCase();
      });
    },

    hyphenate: function () {
      return String(this).replace(/[A-Z]/g, function (match) {
        return "-" + match.charAt(0).toLowerCase();
      });
    },

    capitalize: function () {
      return String(this).replace(/\b[a-z]/g, function (match) {
        return match.toUpperCase();
      });
    },

    escapeRegExp: function () {
      return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
    },

    toInt: function (base) {
      return parseInt(this, base || 10);
    },

    toFloat: function () {
      return parseFloat(this);
    },

    hexToRgb: function (array) {
      var hex = String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
      return hex ? hex.slice(1).hexToRgb(array) : null;
    },

    rgbToHex: function (array) {
      var rgb = String(this).match(/\d{1,3}/g);
      return rgb ? rgb.rgbToHex(array) : null;
    },

    substitute: function (object, regexp) {
      return String(this).replace(
        regexp || /\\?\{([^{}]+)\}/g,
        function (match, name) {
          if (match.charAt(0) == "\\") return match.slice(1);
          return object[name] != null ? object[name] : "";
        }
      );
    },
  });

  (function () {
    var document = this.document;
    var window = (document.window = this);

    var parse = function (ua, platform) {
      ua = ua.toLowerCase();
      platform = platform ? platform.toLowerCase() : "";

      var UA = ua.match(/(edge)[\s\/:]([\w\d\.]+)/);
      if (!UA) {
        UA = ua.match(
          /(opera|ie|firefox|chrome|trident|crios|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/
        ) || [null, "unknown", 0];
      }

      if (UA[1] == "trident") {
        UA[1] = "ie";
        if (UA[4]) UA[2] = UA[4];
      } else if (UA[1] == "crios") {
        UA[1] = "chrome";
      }

      platform = ua.match(/ip(?:ad|od|hone)/)
        ? "ios"
        : (ua.match(/(?:webos|android)/) ||
            ua.match(/mac|win|linux/) || ["other"])[0];
      if (platform == "win") platform = "windows";

      return {
        extend: Function.prototype.extend,
        name: UA[1] == "version" ? UA[3] : UA[1],
        version: parseFloat(UA[1] == "opera" && UA[4] ? UA[4] : UA[2]),
        platform: platform,
      };
    };

    var Browser = (this.Browser = parse(
      navigator.userAgent,
      navigator.platform
    ));

    if (Browser.name == "ie" && document.documentMode) {
      Browser.version = document.documentMode;
    }

    Browser.extend({
      Features: {
        xpath: !!document.evaluate,
        air: !!window.runtime,
        query: !!document.querySelector,
        json: !!window.JSON,
      },
      parseUA: parse,
    });

    Browser.Request = (function () {
      var XMLHTTP = function () {
        return new XMLHttpRequest();
      };

      var MSXML2 = function () {
        return new ActiveXObject("MSXML2.XMLHTTP");
      };

      var MSXML = function () {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };

      return Function.attempt(
        function () {
          XMLHTTP();
          return XMLHTTP;
        },
        function () {
          MSXML2();
          return MSXML2;
        },
        function () {
          MSXML();
          return MSXML;
        }
      );
    })();

    Browser.Features.xhr = !!Browser.Request;

    Browser.exec = function (text) {
      if (!text) return text;
      if (window.execScript) {
        window.execScript(text);
      } else {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.text = text;
        document.head.appendChild(script);
        document.head.removeChild(script);
      }
      return text;
    };

    String.implement("stripScripts", function (exec) {
      var scripts = "";
      var text = this.replace(
        /<script[^>]*>([\s\S]*?)<\/script>/gi,
        function (all, code) {
          scripts += code + "\n";
          return "";
        }
      );
      if (exec === true) Browser.exec(scripts);
      else if (typeOf(exec) == "function") exec(scripts, text);
      return text;
    });

    Browser.extend({
      Document: this.Document,
      Window: this.Window,
      Element: this.Element,
      Event: this.Event,
    });

    this.Window = this.$constructor = new Type("Window", function () {});

    this.$family = Function.convert("window").hide();

    Window.mirror(function (name, method) {
      window[name] = method;
    });

    this.Document = document.$constructor = new Type(
      "Document",
      function () {}
    );

    document.$family = Function.convert("document").hide();

    Document.mirror(function (name, method) {
      document[name] = method;
    });

    document.html = document.documentElement;
    if (!document.head)
      document.head = document.getElementsByTagName("head")[0];

    if (document.execCommand)
      try {
        document.execCommand("BackgroundImageCache", false, true);
      } catch (e) {}

    /*<ltIE9>*/
    if (this.attachEvent && !this.addEventListener) {
      var unloadEvent = function () {
        this.detachEvent("onunload", unloadEvent);
        document.head = document.html = document.window = null;
        window = this.Window = document = null;
      };
      this.attachEvent("onunload", unloadEvent);
    }

    var arrayFrom = Array.convert;
    try {
      arrayFrom(document.html.childNodes);
    } catch (e) {
      Array.convert = function (item) {
        if (
          typeof item != "string" &&
          Type.isEnumerable(item) &&
          typeOf(item) != "array"
        ) {
          var i = item.length,
            array = new Array(i);
          while (i--) array[i] = item[i];
          return array;
        }
        return arrayFrom(item);
      };

      var prototype = Array.prototype,
        slice = prototype.slice;
      [
        "pop",
        "push",
        "reverse",
        "shift",
        "sort",
        "splice",
        "unshift",
        "concat",
        "join",
        "slice",
      ].each(function (name) {
        var method = prototype[name];
        Array[name] = function (item) {
          return method.apply(Array.convert(item), slice.call(arguments, 1));
        };
      });
    }
  })();

  (function () {
    var Class = (this.Class = new Type("Class", function (params) {
      if (instanceOf(params, Function)) params = { initialize: params };

      var newClass = function () {
        reset(this);
        if (newClass.$prototyping) return this;
        this.$caller = null;
        this.$family = null;
        var value = this.initialize
          ? this.initialize.apply(this, arguments)
          : this;
        this.$caller = this.caller = null;
        return value;
      }
        .extend(this)
        .implement(params);

      newClass.$constructor = Class;
      newClass.prototype.$constructor = newClass;
      newClass.prototype.parent = parent;

      return newClass;
    }));

    var parent = function () {
      if (!this.$caller)
        throw new Error('The method "parent" cannot be called.');
      var name = this.$caller.$name,
        parent = this.$caller.$owner.parent,
        previous = parent ? parent.prototype[name] : null;
      if (!previous)
        throw new Error('The method "' + name + '" has no parent.');
      return previous.apply(this, arguments);
    };

    var reset = function (object) {
      for (var key in object) {
        var value = object[key];
        switch (typeOf(value)) {
          case "object":
            var F = function () {};
            F.prototype = value;
            object[key] = reset(new F());
            break;
          case "array":
            object[key] = value.clone();
            break;
        }
      }
      return object;
    };

    var wrap = function (self, key, method) {
      if (method.$origin) method = method.$origin;
      var wrapper = function () {
        if (method.$protected && this.$caller == null)
          throw new Error('The method "' + key + '" cannot be called.');
        var caller = this.caller,
          current = this.$caller;
        this.caller = current;
        this.$caller = wrapper;
        var result = method.apply(this, arguments);
        this.$caller = current;
        this.caller = caller;
        return result;
      }.extend({ $owner: self, $origin: method, $name: key });
      return wrapper;
    };

    var implement = function (key, value, retain) {
      if (Class.Mutators.hasOwnProperty(key)) {
        value = Class.Mutators[key].call(this, value);
        if (value == null) return this;
      }

      if (typeOf(value) == "function") {
        if (value.$hidden) return this;
        this.prototype[key] = retain ? value : wrap(this, key, value);
      } else {
        Object.merge(this.prototype, key, value);
      }

      return this;
    };

    var getInstance = function (klass) {
      klass.$prototyping = true;
      var proto = new klass();
      delete klass.$prototyping;
      return proto;
    };

    Class.implement("implement", implement.overloadSetter());

    Class.Mutators = {
      Extends: function (parent) {
        this.parent = parent;
        this.prototype = getInstance(parent);
      },

      Implements: function (items) {
        Array.convert(items).each(function (item) {
          var instance = new item();
          for (var key in instance)
            implement.call(this, key, instance[key], true);
        }, this);
      },
    };
  })();

  (function () {
    this.Chain = new Class({
      $chain: [],

      chain: function () {
        this.$chain.append(Array.flatten(arguments));
        return this;
      },

      callChain: function () {
        return this.$chain.length
          ? this.$chain.shift().apply(this, arguments)
          : false;
      },

      clearChain: function () {
        this.$chain.empty();
        return this;
      },
    });

    var removeOn = function (string) {
      return string.replace(/^on([A-Z])/, function (full, first) {
        return first.toLowerCase();
      });
    };

    this.Events = new Class({
      $events: {},

      addEvent: function (type, fn, internal) {
        type = removeOn(type);

        this.$events[type] = (this.$events[type] || []).include(fn);
        if (internal) fn.internal = true;
        return this;
      },

      addEvents: function (events) {
        for (var type in events) this.addEvent(type, events[type]);
        return this;
      },

      fireEvent: function (type, args, delay) {
        type = removeOn(type);
        var events = this.$events[type];
        if (!events) return this;
        args = Array.convert(args);
        events.each(function (fn) {
          if (delay) fn.delay(delay, this, args);
          else fn.apply(this, args);
        }, this);
        return this;
      },

      removeEvent: function (type, fn) {
        type = removeOn(type);
        var events = this.$events[type];
        if (events && !fn.internal) {
          var index = events.indexOf(fn);
          if (index != -1) delete events[index];
        }
        return this;
      },

      removeEvents: function (events) {
        var type;
        if (typeOf(events) == "object") {
          for (type in events) this.removeEvent(type, events[type]);
          return this;
        }
        if (events) events = removeOn(events);
        for (type in this.$events) {
          if (events && events != type) continue;
          var fns = this.$events[type];
          for (var i = fns.length; i--; )
            if (i in fns) {
              this.removeEvent(type, fns[i]);
            }
        }
        return this;
      },
    });

    this.Options = new Class({
      setOptions: function () {
        var options = (this.options = Object.merge.apply(
          null,
          [{}, this.options].append(arguments)
        ));
        if (this.addEvent)
          for (var option in options) {
            if (
              typeOf(options[option]) != "function" ||
              !/^on[A-Z]/.test(option)
            )
              continue;
            this.addEvent(option, options[option]);
            delete options[option];
          }
        return this;
      },
    });
  })();

  (function () {
    var STATE_PENDING = 0,
      STATE_FULFILLED = 1,
      STATE_REJECTED = 2;

    var Thenable = (Class.Thenable = new Class({
      $thenableState: STATE_PENDING,
      $thenableResult: null,
      $thenableReactions: [],

      resolve: function (value) {
        resolve(this, value);
        return this;
      },

      reject: function (reason) {
        reject(this, reason);
        return this;
      },

      getThenableState: function () {
        switch (this.$thenableState) {
          case STATE_PENDING:
            return "pending";

          case STATE_FULFILLED:
            return "fulfilled";

          case STATE_REJECTED:
            return "rejected";
        }
      },

      resetThenable: function (reason) {
        reject(this, reason);
        reset(this);
        return this;
      },

      then: function (onFulfilled, onRejected) {
        if (typeof onFulfilled !== "function") onFulfilled = "Identity";
        if (typeof onRejected !== "function") onRejected = "Thrower";

        var thenable = new Thenable();

        this.$thenableReactions.push({
          thenable: thenable,
          fulfillHandler: onFulfilled,
          rejectHandler: onRejected,
        });

        if (this.$thenableState !== STATE_PENDING) {
          react(this);
        }

        return thenable;
      },

      catch: function (onRejected) {
        return this.then(null, onRejected);
      },
    }));

    Thenable.extend({
      resolve: function (value) {
        var thenable;
        if (value instanceof Thenable) {
          thenable = value;
        } else {
          thenable = new Thenable();
          resolve(thenable, value);
        }
        return thenable;
      },
      reject: function (reason) {
        var thenable = new Thenable();
        reject(thenable, reason);
        return thenable;
      },
    });

    function resolve(thenable, value) {
      if (thenable.$thenableState === STATE_PENDING) {
        if (thenable === value) {
          reject(
            thenable,
            new TypeError("Tried to resolve a thenable with itself.")
          );
        } else if (
          value &&
          (typeof value === "object" || typeof value === "function")
        ) {
          var then;
          try {
            then = value.then;
          } catch (exception) {
            reject(thenable, exception);
          }
          if (typeof then === "function") {
            var resolved = false;
            defer(function () {
              try {
                then.call(
                  value,
                  function (nextValue) {
                    if (!resolved) {
                      resolved = true;
                      resolve(thenable, nextValue);
                    }
                  },
                  function (reason) {
                    if (!resolved) {
                      resolved = true;
                      reject(thenable, reason);
                    }
                  }
                );
              } catch (exception) {
                if (!resolved) {
                  resolved = true;
                  reject(thenable, exception);
                }
              }
            });
          } else {
            fulfill(thenable, value);
          }
        } else {
          fulfill(thenable, value);
        }
      }
    }

    function fulfill(thenable, value) {
      if (thenable.$thenableState === STATE_PENDING) {
        thenable.$thenableResult = value;
        thenable.$thenableState = STATE_FULFILLED;

        react(thenable);
      }
    }

    function reject(thenable, reason) {
      if (thenable.$thenableState === STATE_PENDING) {
        thenable.$thenableResult = reason;
        thenable.$thenableState = STATE_REJECTED;

        react(thenable);
      }
    }

    function reset(thenable) {
      if (thenable.$thenableState !== STATE_PENDING) {
        thenable.$thenableResult = null;
        thenable.$thenableState = STATE_PENDING;
      }
    }

    function react(thenable) {
      var state = thenable.$thenableState,
        result = thenable.$thenableResult,
        reactions = thenable.$thenableReactions,
        type;

      if (state === STATE_FULFILLED) {
        thenable.$thenableReactions = [];
        type = "fulfillHandler";
      } else if (state == STATE_REJECTED) {
        thenable.$thenableReactions = [];
        type = "rejectHandler";
      }

      if (type) {
        defer(handle.pass([result, reactions, type]));
      }
    }

    function handle(result, reactions, type) {
      for (var i = 0, l = reactions.length; i < l; ++i) {
        var reaction = reactions[i],
          handler = reaction[type];

        if (handler === "Identity") {
          resolve(reaction.thenable, result);
        } else if (handler === "Thrower") {
          reject(reaction.thenable, result);
        } else {
          try {
            resolve(reaction.thenable, handler(result));
          } catch (exception) {
            reject(reaction.thenable, exception);
          }
        }
      }
    }

    var defer;
    if (
      typeof process !== "undefined" &&
      typeof process.nextTick === "function"
    ) {
      defer = process.nextTick;
    } else if (typeof setImmediate !== "undefined") {
      defer = setImmediate;
    } else {
      defer = function (fn) {
        setTimeout(fn, 0);
      };
    }
  })();

  (function () {
    Object.extend({
      subset: function (object, keys) {
        var results = {};
        for (var i = 0, l = keys.length; i < l; i++) {
          var k = keys[i];
          if (k in object) results[k] = object[k];
        }
        return results;
      },

      map: function (object, fn, bind) {
        var results = {};
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          results[key] = fn.call(bind, object[key], key, object);
        }
        return results;
      },

      filter: function (object, fn, bind) {
        var results = {};
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i],
            value = object[key];
          if (fn.call(bind, value, key, object)) results[key] = value;
        }
        return results;
      },

      every: function (object, fn, bind) {
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!fn.call(bind, object[key], key)) return false;
        }
        return true;
      },

      some: function (object, fn, bind) {
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (fn.call(bind, object[key], key)) return true;
        }
        return false;
      },

      values: function (object) {
        var values = [];
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          values.push(object[k]);
        }
        return values;
      },

      getLength: function (object) {
        return Object.keys(object).length;
      },

      keyOf: function (object, value) {
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (object[key] === value) return key;
        }
        return null;
      },

      contains: function (object, value) {
        return Object.keyOf(object, value) != null;
      },

      toQueryString: function (object, base) {
        var queryString = [];

        Object.each(object, function (value, key) {
          if (base) key = base + "[" + key + "]";
          var result;
          switch (typeOf(value)) {
            case "object":
              result = Object.toQueryString(value, key);
              break;
            case "array":
              var qs = {};
              value.each(function (val, i) {
                qs[i] = val;
              });
              result = Object.toQueryString(qs, key);
              break;
            default:
              result = key + "=" + encodeURIComponent(value);
          }
          if (value != null) queryString.push(result);
        });

        return queryString.join("&");
      },
    });
  })();

  (function () {
    var parsed,
      separatorIndex,
      combinatorIndex,
      reversed,
      cache = {},
      reverseCache = {},
      reUnescape = /\\/g;

    var parse = function (expression, isReversed) {
      if (expression == null) return null;
      if (expression.Slick === true) return expression;
      expression = ("" + expression).replace(/^\s+|\s+$/g, "");
      reversed = !!isReversed;
      var currentCache = reversed ? reverseCache : cache;
      if (currentCache[expression]) return currentCache[expression];
      parsed = {
        Slick: true,
        expressions: [],
        raw: expression,
        reverse: function () {
          return parse(this.raw, true);
        },
      };
      separatorIndex = -1;
      while (expression != (expression = expression.replace(regexp, parser)));
      parsed.length = parsed.expressions.length;
      return (currentCache[parsed.raw] = reversed ? reverse(parsed) : parsed);
    };

    var reverseCombinator = function (combinator) {
      if (combinator === "!") return " ";
      else if (combinator === " ") return "!";
      else if (/^!/.test(combinator)) return combinator.replace(/^!/, "");
      else return "!" + combinator;
    };

    var reverse = function (expression) {
      var expressions = expression.expressions;
      for (var i = 0; i < expressions.length; i++) {
        var exp = expressions[i];
        var last = {
          parts: [],
          tag: "*",
          combinator: reverseCombinator(exp[0].combinator),
        };

        for (var j = 0; j < exp.length; j++) {
          var cexp = exp[j];
          if (!cexp.reverseCombinator) cexp.reverseCombinator = " ";
          cexp.combinator = cexp.reverseCombinator;
          delete cexp.reverseCombinator;
        }

        exp.reverse().push(last);
      }
      return expression;
    };

    var escapeRegExp = function (string) {
      return string.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function (match) {
        return "\\" + match;
      });
    };

    var regexp = new RegExp(
      "^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)"
        .replace(/<combinator>/, "[" + escapeRegExp(">+~`!@$%^&={}\\;</") + "]")
        .replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
        .replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
    );

    function parser(
      rawMatch,

      separator,
      combinator,
      combinatorChildren,

      tagName,
      id,
      className,

      attributeKey,
      attributeOperator,
      attributeQuote,
      attributeValue,

      pseudoMarker,
      pseudoClass,
      pseudoQuote,
      pseudoClassQuotedValue,
      pseudoClassValue
    ) {
      if (separator || separatorIndex === -1) {
        parsed.expressions[++separatorIndex] = [];
        combinatorIndex = -1;
        if (separator) return "";
      }

      if (combinator || combinatorChildren || combinatorIndex === -1) {
        combinator = combinator || " ";
        var currentSeparator = parsed.expressions[separatorIndex];
        if (reversed && currentSeparator[combinatorIndex])
          currentSeparator[combinatorIndex].reverseCombinator =
            reverseCombinator(combinator);
        currentSeparator[++combinatorIndex] = {
          combinator: combinator,
          tag: "*",
        };
      }

      var currentParsed = parsed.expressions[separatorIndex][combinatorIndex];

      if (tagName) {
        currentParsed.tag = tagName.replace(reUnescape, "");
      } else if (id) {
        currentParsed.id = id.replace(reUnescape, "");
      } else if (className) {
        className = className.replace(reUnescape, "");

        if (!currentParsed.classList) currentParsed.classList = [];
        if (!currentParsed.classes) currentParsed.classes = [];
        currentParsed.classList.push(className);
        currentParsed.classes.push({
          value: className,
          regexp: new RegExp("(^|\\s)" + escapeRegExp(className) + "(\\s|$)"),
        });
      } else if (pseudoClass) {
        pseudoClassValue = pseudoClassValue || pseudoClassQuotedValue;
        pseudoClassValue = pseudoClassValue
          ? pseudoClassValue.replace(reUnescape, "")
          : null;

        if (!currentParsed.pseudos) currentParsed.pseudos = [];
        currentParsed.pseudos.push({
          key: pseudoClass.replace(reUnescape, ""),
          value: pseudoClassValue,
          type: pseudoMarker.length == 1 ? "class" : "element",
        });
      } else if (attributeKey) {
        attributeKey = attributeKey.replace(reUnescape, "");
        attributeValue = (attributeValue || "").replace(reUnescape, "");

        var test, regexp;

        switch (attributeOperator) {
          case "^=":
            regexp = new RegExp("^" + escapeRegExp(attributeValue));
            break;
          case "$=":
            regexp = new RegExp(escapeRegExp(attributeValue) + "$");
            break;
          case "~=":
            regexp = new RegExp(
              "(^|\\s)" + escapeRegExp(attributeValue) + "(\\s|$)"
            );
            break;
          case "|=":
            regexp = new RegExp("^" + escapeRegExp(attributeValue) + "(-|$)");
            break;
          case "=":
            test = function (value) {
              return attributeValue == value;
            };
            break;
          case "*=":
            test = function (value) {
              return value && value.indexOf(attributeValue) > -1;
            };
            break;
          case "!=":
            test = function (value) {
              return attributeValue != value;
            };
            break;
          default:
            test = function (value) {
              return !!value;
            };
        }

        if (attributeValue == "" && /^[*$^]=$/.test(attributeOperator))
          test = function () {
            return false;
          };

        if (!test)
          test = function (value) {
            return value && regexp.test(value);
          };

        if (!currentParsed.attributes) currentParsed.attributes = [];
        currentParsed.attributes.push({
          key: attributeKey,
          operator: attributeOperator,
          value: attributeValue,
          test: test,
        });
      }

      return "";
    }

    var Slick = this.Slick || {};

    Slick.parse = function (expression) {
      return parse(expression);
    };

    Slick.escapeRegExp = escapeRegExp;

    if (!this.Slick) this.Slick = Slick;
  }).apply(typeof exports != "undefined" ? exports : this);

  (function () {
    var local = {},
      featuresCache = {},
      toString = Object.prototype.toString;

    local.isNativeCode = function (fn) {
      return /\{\s*\[native code\]\s*\}/.test("" + fn);
    };

    local.isXML = function (document) {
      return (
        !!document.xmlVersion ||
        !!document.xml ||
        toString.call(document) == "[object XMLDocument]" ||
        (document.nodeType == 9 && document.documentElement.nodeName != "HTML")
      );
    };

    local.setDocument = function (document) {
      var nodeType = document.nodeType;
      if (nodeType == 9);
      else if (nodeType) document = document.ownerDocument;
      else if (document.navigator) document = document.document;
      else return;

      if (this.document === document) return;
      this.document = document;

      var root = document.documentElement,
        rootUid = this.getUIDXML(root),
        features = featuresCache[rootUid],
        feature;

      if (features) {
        for (feature in features) {
          this[feature] = features[feature];
        }
        return;
      }

      features = featuresCache[rootUid] = {};

      features.root = root;
      features.isXMLDocument = this.isXML(document);

      features.brokenStarGEBTN =
        features.starSelectsClosedQSA =
        features.idGetsName =
        features.brokenMixedCaseQSA =
        features.brokenGEBCN =
        features.brokenCheckedQSA =
        features.brokenEmptyAttributeQSA =
        features.isHTMLDocument =
        features.nativeMatchesSelector =
          false;

      var starSelectsClosed,
        starSelectsComments,
        brokenSecondClassNameGEBCN,
        cachedGetElementsByClassName,
        brokenFormAttributeGetter;

      var selected,
        id = "slick_uniqueid";
      var testNode = document.createElement("div");

      var testRoot =
        document.body || document.getElementsByTagName("body")[0] || root;
      testRoot.appendChild(testNode);

      try {
        testNode.innerHTML = '<a id="' + id + '"></a>';
        features.isHTMLDocument = !!document.getElementById(id);
      } catch (e) {}

      if (features.isHTMLDocument) {
        testNode.style.display = "none";

        testNode.appendChild(document.createComment(""));
        starSelectsComments = testNode.getElementsByTagName("*").length > 1;

        try {
          testNode.innerHTML = "foo</foo>";
          selected = testNode.getElementsByTagName("*");
          starSelectsClosed =
            selected &&
            !!selected.length &&
            selected[0].nodeName.charAt(0) == "/";
        } catch (e) {}

        features.brokenStarGEBTN = starSelectsComments || starSelectsClosed;

        try {
          testNode.innerHTML =
            '<a name="' + id + '"></a><b id="' + id + '"></b>';
          features.idGetsName =
            document.getElementById(id) === testNode.firstChild;
        } catch (e) {}

        if (testNode.getElementsByClassName) {
          try {
            testNode.innerHTML = '<a class="f"></a><a class="b"></a>';
            testNode.getElementsByClassName("b").length;
            testNode.firstChild.className = "b";
            cachedGetElementsByClassName =
              testNode.getElementsByClassName("b").length != 2;
          } catch (e) {}

          try {
            testNode.innerHTML = '<a class="a"></a><a class="f b a"></a>';
            brokenSecondClassNameGEBCN =
              testNode.getElementsByClassName("a").length != 2;
          } catch (e) {}

          features.brokenGEBCN =
            cachedGetElementsByClassName || brokenSecondClassNameGEBCN;
        }

        if (testNode.querySelectorAll) {
          try {
            testNode.innerHTML = "foo</foo>";
            selected = testNode.querySelectorAll("*");
            features.starSelectsClosedQSA =
              selected &&
              !!selected.length &&
              selected[0].nodeName.charAt(0) == "/";
          } catch (e) {}

          try {
            testNode.innerHTML = '<a class="MiX"></a>';
            features.brokenMixedCaseQSA =
              !testNode.querySelectorAll(".MiX").length;
          } catch (e) {}

          try {
            testNode.innerHTML =
              '<select><option selected="selected">a</option></select>';
            features.brokenCheckedQSA =
              testNode.querySelectorAll(":checked").length == 0;
          } catch (e) {}

          try {
            testNode.innerHTML = '<a class=""></a>';
            features.brokenEmptyAttributeQSA =
              testNode.querySelectorAll('[class*=""]').length != 0;
          } catch (e) {}
        }

        try {
          testNode.innerHTML = '<form action="s"><input id="action"/></form>';
          brokenFormAttributeGetter =
            testNode.firstChild.getAttribute("action") != "s";
        } catch (e) {}

        features.nativeMatchesSelector =
          root.matches ||
          /*root.msMatchesSelector ||*/ root.mozMatchesSelector ||
          root.webkitMatchesSelector;
        if (features.nativeMatchesSelector)
          try {
            features.nativeMatchesSelector.call(root, ":slick");
            features.nativeMatchesSelector = null;
          } catch (e) {}
      }

      try {
        root.slick_expando = 1;
        delete root.slick_expando;
        features.getUID = this.getUIDHTML;
      } catch (e) {
        features.getUID = this.getUIDXML;
      }

      testRoot.removeChild(testNode);
      testNode = selected = testRoot = null;

      features.getAttribute =
        features.isHTMLDocument && brokenFormAttributeGetter
          ? function (node, name) {
              var method = this.attributeGetters[name];
              if (method) return method.call(node);
              var attributeNode = node.getAttributeNode(name);
              return attributeNode ? attributeNode.nodeValue : null;
            }
          : function (node, name) {
              var method = this.attributeGetters[name];
              return method ? method.call(node) : node.getAttribute(name);
            };

      features.hasAttribute =
        root && this.isNativeCode(root.hasAttribute)
          ? function (node, attribute) {
              return node.hasAttribute(attribute);
            }
          : function (node, attribute) {
              node = node.getAttributeNode(attribute);
              return !!(node && (node.specified || node.nodeValue));
            };

      var nativeRootContains = root && this.isNativeCode(root.contains),
        nativeDocumentContains =
          document && this.isNativeCode(document.contains);

      features.contains =
        nativeRootContains && nativeDocumentContains
          ? function (context, node) {
              return context.contains(node);
            }
          : nativeRootContains && !nativeDocumentContains
          ? function (context, node) {
              return (
                context === node ||
                (context === document
                  ? document.documentElement
                  : context
                ).contains(node)
              );
            }
          : root && root.compareDocumentPosition
          ? function (context, node) {
              return (
                context === node ||
                !!(context.compareDocumentPosition(node) & 16)
              );
            }
          : function (context, node) {
              if (node)
                do {
                  if (node === context) return true;
                } while ((node = node.parentNode));
              return false;
            };

      features.documentSorter = root.compareDocumentPosition
        ? function (a, b) {
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)
              return 0;
            return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
          }
        : "sourceIndex" in root
        ? function (a, b) {
            if (!a.sourceIndex || !b.sourceIndex) return 0;
            return a.sourceIndex - b.sourceIndex;
          }
        : document.createRange
        ? function (a, b) {
            if (!a.ownerDocument || !b.ownerDocument) return 0;
            var aRange = a.ownerDocument.createRange(),
              bRange = b.ownerDocument.createRange();
            aRange.setStart(a, 0);
            aRange.setEnd(a, 0);
            bRange.setStart(b, 0);
            bRange.setEnd(b, 0);
            return aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
          }
        : null;

      root = null;

      for (feature in features) {
        this[feature] = features[feature];
      }
    };

    var reSimpleSelector = /^([#.]?)((?:[\w-]+|\*))$/,
      reEmptyAttribute = /\[.+[*$^]=(?:""|'')?\]/,
      qsaFailExpCache = {};

    local.search = function (context, expression, append, first) {
      var found = (this.found = first ? null : append || []);

      if (!context) return found;
      else if (context.navigator) context = context.document;
      else if (!context.nodeType) return found;

      var parsed,
        i,
        node,
        nodes,
        uniques = (this.uniques = {}),
        hasOthers = !!(append && append.length),
        contextIsDocument = context.nodeType == 9;

      if (
        this.document !== (contextIsDocument ? context : context.ownerDocument)
      )
        this.setDocument(context);

      if (hasOthers)
        for (i = found.length; i--; ) uniques[this.getUID(found[i])] = true;

      if (typeof expression == "string") {
        /*<simple-selectors-override>*/
        var simpleSelector = expression.match(reSimpleSelector);
        simpleSelectors: if (simpleSelector) {
          var symbol = simpleSelector[1],
            name = simpleSelector[2];

          if (!symbol) {
            if (name == "*" && this.brokenStarGEBTN) break simpleSelectors;
            nodes = context.getElementsByTagName(name);
            if (first) return nodes[0] || null;
            for (i = 0; (node = nodes[i++]); ) {
              if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
            }
          } else if (symbol == "#") {
            if (!this.isHTMLDocument || !contextIsDocument)
              break simpleSelectors;
            node = context.getElementById(name);
            if (!node) return found;
            if (
              this.idGetsName &&
              node.getAttributeNode("id").nodeValue != name
            )
              break simpleSelectors;
            if (first) return node || null;
            if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
          } else if (symbol == ".") {
            if (
              !this.isHTMLDocument ||
              ((!context.getElementsByClassName || this.brokenGEBCN) &&
                context.querySelectorAll)
            )
              break simpleSelectors;
            if (context.getElementsByClassName && !this.brokenGEBCN) {
              nodes = context.getElementsByClassName(name);
              if (first) return nodes[0] || null;
              for (i = 0; (node = nodes[i++]); ) {
                if (!(hasOthers && uniques[this.getUID(node)]))
                  found.push(node);
              }
            } else {
              var matchClass = new RegExp(
                "(^|\\s)" + Slick.escapeRegExp(name) + "(\\s|$)"
              );
              nodes = context.getElementsByTagName("*");
              for (i = 0; (node = nodes[i++]); ) {
                className = node.className;
                if (!(className && matchClass.test(className))) continue;
                if (first) return node;
                if (!(hasOthers && uniques[this.getUID(node)]))
                  found.push(node);
              }
            }
          }

          if (hasOthers) this.sort(found);
          return first ? null : found;
        }
        /*</simple-selectors-override>*/

        /*<query-selector-override>*/
        querySelector: if (context.querySelectorAll) {
          if (
            !this.isHTMLDocument ||
            qsaFailExpCache[expression] ||
            //TODO: only skip when expression is actually mixed case
            this.brokenMixedCaseQSA ||
            (this.brokenCheckedQSA && expression.indexOf(":checked") > -1) ||
            (this.brokenEmptyAttributeQSA &&
              reEmptyAttribute.test(expression)) ||
            (!contextIsDocument && //Abort when !contextIsDocument and...
              expression.indexOf(",") > -1) ||
            Slick.disableQSA
          )
            break querySelector;

          var _expression = expression,
            _context = context,
            currentId;
          if (!contextIsDocument) {
            (currentId = _context.getAttribute("id")), (slickid = "slickid__");
            _context.setAttribute("id", slickid);
            _expression = "#" + slickid + " " + _expression;
            context = _context.parentNode;
          }

          try {
            if (first) return context.querySelector(_expression) || null;
            else nodes = context.querySelectorAll(_expression);
          } catch (e) {
            qsaFailExpCache[expression] = 1;
            break querySelector;
          } finally {
            if (!contextIsDocument) {
              if (currentId) _context.setAttribute("id", currentId);
              else _context.removeAttribute("id");
              context = _context;
            }
          }

          if (this.starSelectsClosedQSA)
            for (i = 0; (node = nodes[i++]); ) {
              if (
                node.nodeName > "@" &&
                !(hasOthers && uniques[this.getUID(node)])
              )
                found.push(node);
            }
          else
            for (i = 0; (node = nodes[i++]); ) {
              if (!(hasOthers && uniques[this.getUID(node)])) found.push(node);
            }

          if (hasOthers) this.sort(found);
          return found;
        }
        /*</query-selector-override>*/

        parsed = this.Slick.parse(expression);
        if (!parsed.length) return found;
      } else if (expression == null) {
        return found;
      } else if (expression.Slick) {
        parsed = expression;
      } else if (
        this.contains(context.documentElement || context, expression)
      ) {
        found ? found.push(expression) : (found = expression);
        return found;
      } else {
        return found;
      }

      this.posNTH = {};
      this.posNTHLast = {};
      this.posNTHType = {};
      this.posNTHTypeLast = {};

      this.push =
        !hasOthers &&
        (first || (parsed.length == 1 && parsed.expressions[0].length == 1))
          ? this.pushArray
          : this.pushUID;

      if (found == null) found = [];

      var j, m, n;
      var combinator, tag, id, classList, classes, attributes, pseudos;
      var currentItems,
        currentExpression,
        currentBit,
        lastBit,
        expressions = parsed.expressions;

      search: for (i = 0; (currentExpression = expressions[i]); i++)
        for (j = 0; (currentBit = currentExpression[j]); j++) {
          combinator = "combinator:" + currentBit.combinator;
          if (!this[combinator]) continue search;

          tag = this.isXMLDocument
            ? currentBit.tag
            : currentBit.tag.toUpperCase();
          id = currentBit.id;
          classList = currentBit.classList;
          classes = currentBit.classes;
          attributes = currentBit.attributes;
          pseudos = currentBit.pseudos;
          lastBit = j === currentExpression.length - 1;

          this.bitUniques = {};

          if (lastBit) {
            this.uniques = uniques;
            this.found = found;
          } else {
            this.uniques = {};
            this.found = [];
          }

          if (j === 0) {
            this[combinator](
              context,
              tag,
              id,
              classes,
              attributes,
              pseudos,
              classList
            );
            if (first && lastBit && found.length) break search;
          } else {
            if (first && lastBit)
              for (m = 0, n = currentItems.length; m < n; m++) {
                this[combinator](
                  currentItems[m],
                  tag,
                  id,
                  classes,
                  attributes,
                  pseudos,
                  classList
                );
                if (found.length) break search;
              }
            else
              for (m = 0, n = currentItems.length; m < n; m++)
                this[combinator](
                  currentItems[m],
                  tag,
                  id,
                  classes,
                  attributes,
                  pseudos,
                  classList
                );
          }

          currentItems = this.found;
        }

      if (hasOthers || parsed.expressions.length > 1) this.sort(found);

      return first ? found[0] || null : found;
    };

    local.uidx = 1;
    local.uidk = "slick-uniqueid";

    local.getUIDXML = function (node) {
      var uid = node.getAttribute(this.uidk);
      if (!uid) {
        uid = this.uidx++;
        node.setAttribute(this.uidk, uid);
      }
      return uid;
    };

    local.getUIDHTML = function (node) {
      return node.uniqueNumber || (node.uniqueNumber = this.uidx++);
    };

    local.sort = function (results) {
      if (!this.documentSorter) return results;
      results.sort(this.documentSorter);
      return results;
    };

    local.cacheNTH = {};

    local.matchNTH = /^([+-]?\d*)?([a-z]+)?([+-]\d+)?$/;

    local.parseNTHArgument = function (argument) {
      var parsed = argument.match(this.matchNTH);
      if (!parsed) return false;
      var special = parsed[2] || false;
      var a = parsed[1] || 1;
      if (a == "-") a = -1;
      var b = +parsed[3] || 0;
      parsed =
        special == "n"
          ? { a: a, b: b }
          : special == "odd"
          ? { a: 2, b: 1 }
          : special == "even"
          ? { a: 2, b: 0 }
          : { a: 0, b: a };

      return (this.cacheNTH[argument] = parsed);
    };

    local.createNTHPseudo = function (child, sibling, positions, ofType) {
      return function (node, argument) {
        var uid = this.getUID(node);
        if (!this[positions][uid]) {
          var parent = node.parentNode;
          if (!parent) return false;
          var el = parent[child],
            count = 1;
          if (ofType) {
            var nodeName = node.nodeName;
            do {
              if (el.nodeName != nodeName) continue;
              this[positions][this.getUID(el)] = count++;
            } while ((el = el[sibling]));
          } else {
            do {
              if (el.nodeType != 1) continue;
              this[positions][this.getUID(el)] = count++;
            } while ((el = el[sibling]));
          }
        }
        argument = argument || "n";
        var parsed = this.cacheNTH[argument] || this.parseNTHArgument(argument);
        if (!parsed) return false;
        var a = parsed.a,
          b = parsed.b,
          pos = this[positions][uid];
        if (a == 0) return b == pos;
        if (a > 0) {
          if (pos < b) return false;
        } else {
          if (b < pos) return false;
        }
        return (pos - b) % a == 0;
      };
    };

    local.pushArray = function (node, tag, id, classes, attributes, pseudos) {
      if (this.matchSelector(node, tag, id, classes, attributes, pseudos))
        this.found.push(node);
    };

    local.pushUID = function (node, tag, id, classes, attributes, pseudos) {
      var uid = this.getUID(node);
      if (
        !this.uniques[uid] &&
        this.matchSelector(node, tag, id, classes, attributes, pseudos)
      ) {
        this.uniques[uid] = true;
        this.found.push(node);
      }
    };

    local.matchNode = function (node, selector) {
      if (this.isHTMLDocument && this.nativeMatchesSelector) {
        try {
          return this.nativeMatchesSelector.call(
            node,
            selector.replace(/\[([^=]+)=\s*([^'"\]]+?)\s*\]/g, '[$1="$2"]')
          );
        } catch (matchError) {}
      }

      var parsed = this.Slick.parse(selector);
      if (!parsed) return true;

      var expressions = parsed.expressions,
        simpleExpCounter = 0,
        i,
        currentExpression;
      for (i = 0; (currentExpression = expressions[i]); i++) {
        if (currentExpression.length == 1) {
          var exp = currentExpression[0];
          if (
            this.matchSelector(
              node,
              this.isXMLDocument ? exp.tag : exp.tag.toUpperCase(),
              exp.id,
              exp.classes,
              exp.attributes,
              exp.pseudos
            )
          )
            return true;
          simpleExpCounter++;
        }
      }

      if (simpleExpCounter == parsed.length) return false;

      var nodes = this.search(this.document, parsed),
        item;
      for (i = 0; (item = nodes[i++]); ) {
        if (item === node) return true;
      }
      return false;
    };

    local.matchPseudo = function (node, name, argument) {
      var pseudoName = "pseudo:" + name;
      if (this[pseudoName]) return this[pseudoName](node, argument);
      var attribute = this.getAttribute(node, name);
      return argument ? argument == attribute : !!attribute;
    };

    local.matchSelector = function (
      node,
      tag,
      id,
      classes,
      attributes,
      pseudos
    ) {
      if (tag) {
        var nodeName = this.isXMLDocument
          ? node.nodeName
          : node.nodeName.toUpperCase();
        if (tag == "*") {
          if (nodeName < "@") return false;
        } else {
          if (nodeName != tag) return false;
        }
      }

      if (id && node.getAttribute("id") != id) return false;

      var i, part, cls;
      if (classes)
        for (i = classes.length; i--; ) {
          cls = this.getAttribute(node, "class");
          if (!(cls && classes[i].regexp.test(cls))) return false;
        }
      if (attributes)
        for (i = attributes.length; i--; ) {
          part = attributes[i];
          if (
            part.operator
              ? !part.test(this.getAttribute(node, part.key))
              : !this.hasAttribute(node, part.key)
          )
            return false;
        }
      if (pseudos)
        for (i = pseudos.length; i--; ) {
          part = pseudos[i];
          if (!this.matchPseudo(node, part.key, part.value)) return false;
        }
      return true;
    };

    var combinators = {
      " ": function (node, tag, id, classes, attributes, pseudos, classList) {
        var i, item, children;

        if (this.isHTMLDocument) {
          getById: if (id) {
            item = this.document.getElementById(id);
            if (
              (!item && node.all) ||
              (this.idGetsName &&
                item &&
                item.getAttributeNode("id").nodeValue != id)
            ) {
              children = node.all[id];
              if (!children) return;
              if (!children[0]) children = [children];
              for (i = 0; (item = children[i++]); ) {
                var idNode = item.getAttributeNode("id");
                if (idNode && idNode.nodeValue == id) {
                  this.push(item, tag, null, classes, attributes, pseudos);
                  break;
                }
              }
              return;
            }
            if (!item) {
              if (this.contains(this.root, node)) return;
              else break getById;
            } else if (this.document !== node && !this.contains(node, item))
              return;
            this.push(item, tag, null, classes, attributes, pseudos);
            return;
          }
          getByClass: if (
            classes &&
            node.getElementsByClassName &&
            !this.brokenGEBCN
          ) {
            children = node.getElementsByClassName(classList.join(" "));
            if (!(children && children.length)) break getByClass;
            for (i = 0; (item = children[i++]); )
              this.push(item, tag, id, null, attributes, pseudos);
            return;
          }
        }
        getByTag: {
          children = node.getElementsByTagName(tag);
          if (!(children && children.length)) break getByTag;
          if (!this.brokenStarGEBTN) tag = null;
          for (i = 0; (item = children[i++]); )
            this.push(item, tag, id, classes, attributes, pseudos);
        }
      },

      ">": function (node, tag, id, classes, attributes, pseudos) {
        if ((node = node.firstChild))
          do {
            if (node.nodeType == 1)
              this.push(node, tag, id, classes, attributes, pseudos);
          } while ((node = node.nextSibling));
      },

      "+": function (node, tag, id, classes, attributes, pseudos) {
        while ((node = node.nextSibling))
          if (node.nodeType == 1) {
            this.push(node, tag, id, classes, attributes, pseudos);
            break;
          }
      },

      "^": function (node, tag, id, classes, attributes, pseudos) {
        node = node.firstChild;
        if (node) {
          if (node.nodeType == 1)
            this.push(node, tag, id, classes, attributes, pseudos);
          else
            this["combinator:+"](node, tag, id, classes, attributes, pseudos);
        }
      },

      "~": function (node, tag, id, classes, attributes, pseudos) {
        while ((node = node.nextSibling)) {
          if (node.nodeType != 1) continue;
          var uid = this.getUID(node);
          if (this.bitUniques[uid]) break;
          this.bitUniques[uid] = true;
          this.push(node, tag, id, classes, attributes, pseudos);
        }
      },

      "++": function (node, tag, id, classes, attributes, pseudos) {
        this["combinator:+"](node, tag, id, classes, attributes, pseudos);
        this["combinator:!+"](node, tag, id, classes, attributes, pseudos);
      },

      "~~": function (node, tag, id, classes, attributes, pseudos) {
        this["combinator:~"](node, tag, id, classes, attributes, pseudos);
        this["combinator:!~"](node, tag, id, classes, attributes, pseudos);
      },

      "!": function (node, tag, id, classes, attributes, pseudos) {
        while ((node = node.parentNode))
          if (node !== this.document)
            this.push(node, tag, id, classes, attributes, pseudos);
      },

      "!>": function (node, tag, id, classes, attributes, pseudos) {
        node = node.parentNode;
        if (node !== this.document)
          this.push(node, tag, id, classes, attributes, pseudos);
      },

      "!+": function (node, tag, id, classes, attributes, pseudos) {
        while ((node = node.previousSibling))
          if (node.nodeType == 1) {
            this.push(node, tag, id, classes, attributes, pseudos);
            break;
          }
      },

      "!^": function (node, tag, id, classes, attributes, pseudos) {
        node = node.lastChild;
        if (node) {
          if (node.nodeType == 1)
            this.push(node, tag, id, classes, attributes, pseudos);
          else
            this["combinator:!+"](node, tag, id, classes, attributes, pseudos);
        }
      },

      "!~": function (node, tag, id, classes, attributes, pseudos) {
        while ((node = node.previousSibling)) {
          if (node.nodeType != 1) continue;
          var uid = this.getUID(node);
          if (this.bitUniques[uid]) break;
          this.bitUniques[uid] = true;
          this.push(node, tag, id, classes, attributes, pseudos);
        }
      },
    };

    for (var c in combinators) local["combinator:" + c] = combinators[c];

    var pseudos = {
      /*<pseudo-selectors>*/

      empty: function (node) {
        var child = node.firstChild;
        return (
          !(child && child.nodeType == 1) &&
          !(node.innerText || node.textContent || "").length
        );
      },

      not: function (node, expression) {
        return !this.matchNode(node, expression);
      },

      contains: function (node, text) {
        return (node.innerText || node.textContent || "").indexOf(text) > -1;
      },

      "first-child": function (node) {
        while ((node = node.previousSibling))
          if (node.nodeType == 1) return false;
        return true;
      },

      "last-child": function (node) {
        while ((node = node.nextSibling)) if (node.nodeType == 1) return false;
        return true;
      },

      "only-child": function (node) {
        var prev = node;
        while ((prev = prev.previousSibling))
          if (prev.nodeType == 1) return false;
        var next = node;
        while ((next = next.nextSibling)) if (next.nodeType == 1) return false;
        return true;
      },

      "nth-child": local.createNTHPseudo("firstChild", "nextSibling", "posNTH"),

      "nth-last-child": local.createNTHPseudo(
        "lastChild",
        "previousSibling",
        "posNTHLast"
      ),

      "nth-of-type": local.createNTHPseudo(
        "firstChild",
        "nextSibling",
        "posNTHType",
        true
      ),

      "nth-last-of-type": local.createNTHPseudo(
        "lastChild",
        "previousSibling",
        "posNTHTypeLast",
        true
      ),

      index: function (node, index) {
        return this["pseudo:nth-child"](node, "" + (index + 1));
      },

      even: function (node) {
        return this["pseudo:nth-child"](node, "2n");
      },

      odd: function (node) {
        return this["pseudo:nth-child"](node, "2n+1");
      },

      "first-of-type": function (node) {
        var nodeName = node.nodeName;
        while ((node = node.previousSibling))
          if (node.nodeName == nodeName) return false;
        return true;
      },

      "last-of-type": function (node) {
        var nodeName = node.nodeName;
        while ((node = node.nextSibling))
          if (node.nodeName == nodeName) return false;
        return true;
      },

      "only-of-type": function (node) {
        var prev = node,
          nodeName = node.nodeName;
        while ((prev = prev.previousSibling))
          if (prev.nodeName == nodeName) return false;
        var next = node;
        while ((next = next.nextSibling))
          if (next.nodeName == nodeName) return false;
        return true;
      },

      /*</of-type-pseudo-selectors>*/

      enabled: function (node) {
        return !node.disabled;
      },

      disabled: function (node) {
        return node.disabled;
      },

      checked: function (node) {
        return node.checked || node.selected;
      },

      focus: function (node) {
        return (
          this.isHTMLDocument &&
          this.document.activeElement === node &&
          (node.href || node.type || this.hasAttribute(node, "tabindex"))
        );
      },

      root: function (node) {
        return node === this.root;
      },

      selected: function (node) {
        return node.selected;
      },
    };

    for (var p in pseudos) local["pseudo:" + p] = pseudos[p];

    var attributeGetters = (local.attributeGetters = {
      for: function () {
        return "htmlFor" in this ? this.htmlFor : this.getAttribute("for");
      },

      href: function () {
        return "href" in this
          ? this.getAttribute("href", 2)
          : this.getAttribute("href");
      },

      style: function () {
        return this.style ? this.style.cssText : this.getAttribute("style");
      },

      tabindex: function () {
        var attributeNode = this.getAttributeNode("tabindex");
        return attributeNode && attributeNode.specified
          ? attributeNode.nodeValue
          : null;
      },

      type: function () {
        return this.getAttribute("type");
      },

      maxlength: function () {
        var attributeNode = this.getAttributeNode("maxLength");
        return attributeNode && attributeNode.specified
          ? attributeNode.nodeValue
          : null;
      },
    });

    attributeGetters.MAXLENGTH = attributeGetters.maxLength =
      attributeGetters.maxlength;

    var Slick = (local.Slick = this.Slick || {});

    Slick.version = "1.1.7";

    Slick.search = function (context, expression, append) {
      return local.search(context, expression, append);
    };

    Slick.find = function (context, expression) {
      return local.search(context, expression, null, true);
    };

    Slick.contains = function (container, node) {
      local.setDocument(container);
      return local.contains(container, node);
    };

    Slick.getAttribute = function (node, name) {
      local.setDocument(node);
      return local.getAttribute(node, name);
    };

    Slick.hasAttribute = function (node, name) {
      local.setDocument(node);
      return local.hasAttribute(node, name);
    };

    Slick.match = function (node, selector) {
      if (!(node && selector)) return false;
      if (!selector || selector === node) return true;
      local.setDocument(node);
      return local.matchNode(node, selector);
    };

    Slick.defineAttributeGetter = function (name, fn) {
      local.attributeGetters[name] = fn;
      return this;
    };

    Slick.lookupAttributeGetter = function (name) {
      return local.attributeGetters[name];
    };

    Slick.definePseudo = function (name, fn) {
      local["pseudo:" + name] = function (node, argument) {
        return fn.call(node, argument);
      };
      return this;
    };

    Slick.lookupPseudo = function (name) {
      var pseudo = local["pseudo:" + name];
      if (pseudo)
        return function (argument) {
          return pseudo.call(this, argument);
        };
      return null;
    };

    Slick.override = function (regexp, fn) {
      local.override(regexp, fn);
      return this;
    };

    Slick.isXML = local.isXML;

    Slick.uidOf = function (node) {
      return local.getUIDHTML(node);
    };

    if (!this.Slick) this.Slick = Slick;
  }).apply(typeof exports != "undefined" ? exports : this);

  var Element = (this.Element = function (tag, props) {
    var konstructor = Element.Constructors[tag];
    if (konstructor) return konstructor(props);
    if (typeof tag != "string") return document.id(tag).set(props);

    if (!props) props = {};

    if (!/^[\w-]+$/.test(tag)) {
      var parsed = Slick.parse(tag).expressions[0][0];
      tag = parsed.tag == "*" ? "div" : parsed.tag;
      if (parsed.id && props.id == null) props.id = parsed.id;

      var attributes = parsed.attributes;
      if (attributes)
        for (var attr, i = 0, l = attributes.length; i < l; i++) {
          attr = attributes[i];
          if (props[attr.key] != null) continue;

          if (attr.value != null && attr.operator == "=")
            props[attr.key] = attr.value;
          else if (!attr.value && !attr.operator) props[attr.key] = true;
        }

      if (parsed.classList && props["class"] == null)
        props["class"] = parsed.classList.join(" ");
    }

    return document.newElement(tag, props);
  });

  if (Browser.Element) {
    Element.prototype = Browser.Element.prototype;

    Element.prototype._fireEvent = (function (fireEvent) {
      return function (type, event) {
        return fireEvent.call(this, type, event);
      };
    })(Element.prototype.fireEvent);
  }

  new Type("Element", Element).mirror(function (name) {
    if (Array.prototype[name]) return;

    var obj = {};
    obj[name] = function () {
      var results = [],
        args = arguments,
        elements = true;
      for (var i = 0, l = this.length; i < l; i++) {
        var element = this[i],
          result = (results[i] = element[name].apply(element, args));
        elements = elements && typeOf(result) == "element";
      }
      return elements ? new Elements(results) : results;
    };

    Elements.implement(obj);
  });

  if (!Browser.Element) {
    Element.parent = Object;

    Element.Prototype = {
      $constructor: Element,
      $family: Function.convert("element").hide(),
    };

    Element.mirror(function (name, method) {
      Element.Prototype[name] = method;
    });
  }

  Element.Constructors = {};

  var IFrame = new Type("IFrame", function () {
    var params = Array.link(arguments, {
      properties: Type.isObject,
      iframe: function (obj) {
        return obj != null;
      },
    });

    var props = params.properties || {},
      iframe;
    if (params.iframe) iframe = document.id(params.iframe);
    var onload = props.onload || function () {};
    delete props.onload;
    props.id = props.name = [
      props.id,
      props.name,
      iframe ? iframe.id || iframe.name : "IFrame_" + String.uniqueID(),
    ].pick();
    iframe = new Element(iframe || "iframe", props);

    var onLoad = function () {
      onload.call(iframe.contentWindow);
    };

    if (window.frames[props.id]) onLoad();
    else iframe.addListener("load", onLoad);
    return iframe;
  });

  var Elements = (this.Elements = function (nodes) {
    if (nodes && nodes.length) {
      var uniques = {},
        node;
      for (var i = 0; (node = nodes[i++]); ) {
        var uid = Slick.uidOf(node);
        if (!uniques[uid]) {
          uniques[uid] = true;
          this.push(node);
        }
      }
    }
  });

  Elements.prototype = { length: 0 };
  Elements.parent = Array;

  new Type("Elements", Elements).implement({
    filter: function (filter, bind) {
      if (!filter) return this;
      return new Elements(
        Array.filter(
          this,
          typeOf(filter) == "string"
            ? function (item) {
                return item.match(filter);
              }
            : filter,
          bind
        )
      );
    }.protect(),

    push: function () {
      var length = this.length;
      for (var i = 0, l = arguments.length; i < l; i++) {
        var item = document.id(arguments[i]);
        if (item) this[length++] = item;
      }
      return (this.length = length);
    }.protect(),

    unshift: function () {
      var items = [];
      for (var i = 0, l = arguments.length; i < l; i++) {
        var item = document.id(arguments[i]);
        if (item) items.push(item);
      }
      return Array.prototype.unshift.apply(this, items);
    }.protect(),

    concat: function () {
      var newElements = new Elements(this);
      for (var i = 0, l = arguments.length; i < l; i++) {
        var item = arguments[i];
        if (Type.isEnumerable(item)) newElements.append(item);
        else newElements.push(item);
      }
      return newElements;
    }.protect(),

    append: function (collection) {
      for (var i = 0, l = collection.length; i < l; i++)
        this.push(collection[i]);
      return this;
    }.protect(),

    empty: function () {
      while (this.length) delete this[--this.length];
      return this;
    }.protect(),
  });

  (function () {
    var splice = Array.prototype.splice,
      object = { 0: 0, 1: 1, length: 2 };

    splice.call(object, 1, 1);
    if (object[1] == 1)
      Elements.implement(
        "splice",
        function () {
          var length = this.length;
          var result = splice.apply(this, arguments);
          while (length >= this.length) delete this[length--];
          return result;
        }.protect()
      );

    Array.forEachMethod(function (method, name) {
      Elements.implement(name, method);
    });

    Array.mirror(Elements);

    /*<ltIE8>*/
    var createElementAcceptsHTML;
    try {
      createElementAcceptsHTML =
        document.createElement("<input name=x>").name == "x";
    } catch (e) {}

    var escapeQuotes = function (html) {
      return ("" + html).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    };
    /*</ltIE8>*/

    /*<ltIE9>*/

    var canChangeStyleHTML = (function () {
      var div = document.createElement("style"),
        flag = false;
      try {
        div.innerHTML = "#justTesing{margin: 0px;}";
        flag = !!div.innerHTML;
      } catch (e) {}
      return flag;
    })();
    /*</ltIE9>*/

    Document.implement({
      newElement: function (tag, props) {
        if (props) {
          if (props.checked != null) props.defaultChecked = props.checked;
          if (
            (props.type == "checkbox" || props.type == "radio") &&
            props.value == null
          )
            props.value = "on";
          /*<ltIE9>*/
          if (!canChangeStyleHTML && tag == "style") {
            var styleElement = document.createElement("style");
            styleElement.setAttribute("type", "text/css");
            if (props.type) delete props.type;
            return this.id(styleElement).set(props);
          }
          /*</ltIE9>*/
          /*<ltIE8>*/
          if (createElementAcceptsHTML) {
            tag = "<" + tag;
            if (props.name) tag += ' name="' + escapeQuotes(props.name) + '"';
            if (props.type) tag += ' type="' + escapeQuotes(props.type) + '"';
            tag += ">";
            delete props.name;
            delete props.type;
          }
          /*</ltIE8>*/
        }
        return this.id(this.createElement(tag)).set(props);
      },
    });
  })();

  (function () {
    Slick.uidOf(window);
    Slick.uidOf(document);

    Document.implement({
      newTextNode: function (text) {
        return this.createTextNode(text);
      },

      getDocument: function () {
        return this;
      },

      getWindow: function () {
        return this.window;
      },

      id: (function () {
        var types = {
          string: function (id, nocash, doc) {
            id = Slick.find(doc, "#" + id.replace(/(\W)/g, "\\$1"));
            return id ? types.element(id, nocash) : null;
          },

          element: function (el, nocash) {
            Slick.uidOf(el);
            if (
              !nocash &&
              !el.$family &&
              !/^(?:object|embed)$/i.test(el.tagName)
            ) {
              var fireEvent = el.fireEvent;

              el._fireEvent = function (type, event) {
                return fireEvent(type, event);
              };
              Object.append(el, Element.Prototype);
            }
            return el;
          },

          object: function (obj, nocash, doc) {
            if (obj.toElement) return types.element(obj.toElement(doc), nocash);
            return null;
          },
        };

        types.textnode =
          types.whitespace =
          types.window =
          types.document =
            function (zero) {
              return zero;
            };

        return function (el, nocash, doc) {
          if (el && el.$family && el.uniqueNumber) return el;
          var type = typeOf(el);
          return types[type] ? types[type](el, nocash, doc || document) : null;
        };
      })(),
    });

    if (window.$ == null)
      Window.implement("$", function (el, nc) {
        return document.id(el, nc, this.document);
      });

    Window.implement({
      getDocument: function () {
        return this.document;
      },

      getWindow: function () {
        return this;
      },
    });

    [Document, Element].invoke("implement", {
      getElements: function (expression) {
        return Slick.search(this, expression, new Elements());
      },

      getElement: function (expression) {
        return document.id(Slick.find(this, expression));
      },
    });

    var contains = {
      contains: function (element) {
        return Slick.contains(this, element);
      },
    };

    if (!document.contains) Document.implement(contains);
    if (!document.createElement("div").contains) Element.implement(contains);

    var injectCombinator = function (expression, combinator) {
      if (!expression) return combinator;

      expression = Object.clone(Slick.parse(expression));

      var expressions = expression.expressions;
      for (var i = expressions.length; i--; )
        expressions[i][0].combinator = combinator;

      return expression;
    };

    Object.forEach(
      {
        getNext: "~",
        getPrevious: "!~",
        getParent: "!",
      },
      function (combinator, method) {
        Element.implement(method, function (expression) {
          return this.getElement(injectCombinator(expression, combinator));
        });
      }
    );

    Object.forEach(
      {
        getAllNext: "~",
        getAllPrevious: "!~",
        getSiblings: "~~",
        getChildren: ">",
        getParents: "!",
      },
      function (combinator, method) {
        Element.implement(method, function (expression) {
          return this.getElements(injectCombinator(expression, combinator));
        });
      }
    );

    Element.implement({
      getFirst: function (expression) {
        return document.id(
          Slick.search(this, injectCombinator(expression, ">"))[0]
        );
      },

      getLast: function (expression) {
        return document.id(
          Slick.search(this, injectCombinator(expression, ">")).getLast()
        );
      },

      getWindow: function () {
        return this.ownerDocument.window;
      },

      getDocument: function () {
        return this.ownerDocument;
      },

      getElementById: function (id) {
        return document.id(
          Slick.find(this, "#" + ("" + id).replace(/(\W)/g, "\\$1"))
        );
      },

      match: function (expression) {
        return !expression || Slick.match(this, expression);
      },
    });

    if (window.$$ == null)
      Window.implement("$$", function (selector) {
        if (arguments.length == 1) {
          if (typeof selector == "string")
            return Slick.search(this.document, selector, new Elements());
          else if (Type.isEnumerable(selector)) return new Elements(selector);
        }
        return new Elements(arguments);
      });

    var inserters = {
      before: function (context, element) {
        var parent = element.parentNode;
        if (parent) parent.insertBefore(context, element);
      },

      after: function (context, element) {
        var parent = element.parentNode;
        if (parent) parent.insertBefore(context, element.nextSibling);
      },

      bottom: function (context, element) {
        element.appendChild(context);
      },

      top: function (context, element) {
        element.insertBefore(context, element.firstChild);
      },
    };

    inserters.inside = inserters.bottom;

    var propertyGetters = {},
      propertySetters = {};

    var properties = {};
    Array.forEach(
      [
        "type",
        "value",
        "defaultValue",
        "accessKey",
        "cellPadding",
        "cellSpacing",
        "colSpan",
        "frameBorder",
        "rowSpan",
        "tabIndex",
        "useMap",
      ],
      function (property) {
        properties[property.toLowerCase()] = property;
      }
    );

    properties.html = "innerHTML";
    properties.text =
      document.createElement("div").textContent == null
        ? "innerText"
        : "textContent";

    Object.forEach(properties, function (real, key) {
      propertySetters[key] = function (node, value) {
        node[real] = value;
      };
      propertyGetters[key] = function (node) {
        return node[real];
      };
    });

    /*<ltIE9>*/
    propertySetters.text = (function () {
      return function (node, value) {
        if (node.get("tag") == "style") node.set("html", value);
        else node[properties.text] = value;
      };
    })(propertySetters.text);

    propertyGetters.text = (function (getter) {
      return function (node) {
        return node.get("tag") == "style" ? node.innerHTML : getter(node);
      };
    })(propertyGetters.text);
    /*</ltIE9>*/

    var bools = [
      "compact",
      "nowrap",
      "ismap",
      "declare",
      "noshade",
      "checked",
      "disabled",
      "readOnly",
      "multiple",
      "selected",
      "noresize",
      "defer",
      "defaultChecked",
      "autofocus",
      "controls",
      "autoplay",
      "loop",
    ];

    var booleans = {};
    Array.forEach(bools, function (bool) {
      var lower = bool.toLowerCase();
      booleans[lower] = bool;
      propertySetters[lower] = function (node, value) {
        node[bool] = !!value;
      };
      propertyGetters[lower] = function (node) {
        return !!node[bool];
      };
    });

    Object.append(propertySetters, {
      class: function (node, value) {
        "className" in node
          ? (node.className = value || "")
          : node.setAttribute("class", value);
      },

      for: function (node, value) {
        "htmlFor" in node
          ? (node.htmlFor = value)
          : node.setAttribute("for", value);
      },

      style: function (node, value) {
        node.style
          ? (node.style.cssText = value)
          : node.setAttribute("style", value);
      },

      value: function (node, value) {
        node.value = value != null ? value : "";
      },
    });

    propertyGetters["class"] = function (node) {
      return "className" in node
        ? node.className || null
        : node.getAttribute("class");
    };

    /* <webkit> */
    var el = document.createElement("button");

    try {
      el.type = "button";
    } catch (e) {}
    if (el.type != "button")
      propertySetters.type = function (node, value) {
        node.setAttribute("type", value);
      };
    el = null;
    /* </webkit> */

    /*<IE>*/

    /*<ltIE9>*/

    var canChangeStyleHTML = (function () {
      var div = document.createElement("style"),
        flag = false;
      try {
        div.innerHTML = "#justTesing{margin: 0px;}";
        flag = !!div.innerHTML;
      } catch (e) {}
      return flag;
    })();
    /*</ltIE9>*/

    var input = document.createElement("input"),
      volatileInputValue,
      html5InputSupport;

    input.value = "t";
    input.type = "submit";
    volatileInputValue = input.value != "t";

    try {
      input.value = "";
      input.type = "email";
      html5InputSupport = input.type == "email";
    } catch (e) {}

    input = null;

    if (volatileInputValue || !html5InputSupport)
      propertySetters.type = function (node, type) {
        try {
          var value = node.value;
          node.type = type;
          node.value = value;
        } catch (e) {}
      };
    /*</IE>*/

    /* getProperty, setProperty */

    /* <ltIE9> */
    var pollutesGetAttribute = (function (div) {
      div.random = "attribute";
      return div.getAttribute("random") == "attribute";
    })(document.createElement("div"));

    var hasCloneBug = (function (test) {
      test.innerHTML =
        '<object><param name="should_fix" value="the unknown" /></object>';
      return test.cloneNode(true).firstChild.childNodes.length != 1;
    })(document.createElement("div"));

    var hasClassList = !!document.createElement("div").classList;

    var classes = function (className) {
      var classNames = (className || "").clean().split(" "),
        uniques = {};
      return classNames.filter(function (className) {
        if (className !== "" && !uniques[className])
          return (uniques[className] = className);
      });
    };

    var addToClassList = function (name) {
      this.classList.add(name);
    };

    var removeFromClassList = function (name) {
      this.classList.remove(name);
    };

    Element.implement({
      setProperty: function (name, value) {
        var setter = propertySetters[name.toLowerCase()];
        if (setter) {
          setter(this, value);
        } else {
          /* <ltIE9> */
          var attributeWhiteList;
          if (pollutesGetAttribute)
            attributeWhiteList = this.retrieve("$attributeWhiteList", {});
          /* </ltIE9> */

          if (value == null) {
            this.removeAttribute(name);
            /* <ltIE9> */
            if (pollutesGetAttribute) delete attributeWhiteList[name];
            /* </ltIE9> */
          } else {
            this.setAttribute(name, "" + value);
            /* <ltIE9> */
            if (pollutesGetAttribute) attributeWhiteList[name] = true;
            /* </ltIE9> */
          }
        }
        return this;
      },

      setProperties: function (attributes) {
        for (var attribute in attributes)
          this.setProperty(attribute, attributes[attribute]);
        return this;
      },

      getProperty: function (name) {
        var getter = propertyGetters[name.toLowerCase()];
        if (getter) return getter(this);
        /* <ltIE9> */
        if (pollutesGetAttribute) {
          var attr = this.getAttributeNode(name),
            attributeWhiteList = this.retrieve("$attributeWhiteList", {});
          if (!attr) return null;
          if (attr.expando && !attributeWhiteList[name]) {
            var outer = this.outerHTML;

            if (
              outer
                .substr(0, outer.search(/\/?['"]?>(?![^<]*<['"])/))
                .indexOf(name) < 0
            )
              return null;
            attributeWhiteList[name] = true;
          }
        }
        /* </ltIE9> */
        var result = Slick.getAttribute(this, name);
        return !result && !Slick.hasAttribute(this, name) ? null : result;
      },

      getProperties: function () {
        var args = Array.convert(arguments);
        return args.map(this.getProperty, this).associate(args);
      },

      removeProperty: function (name) {
        return this.setProperty(name, null);
      },

      removeProperties: function () {
        Array.each(arguments, this.removeProperty, this);
        return this;
      },

      set: function (prop, value) {
        var property = Element.Properties[prop];
        property && property.set
          ? property.set.call(this, value)
          : this.setProperty(prop, value);
      }.overloadSetter(),

      get: function (prop) {
        var property = Element.Properties[prop];
        return property && property.get
          ? property.get.apply(this)
          : this.getProperty(prop);
      }.overloadGetter(),

      erase: function (prop) {
        var property = Element.Properties[prop];
        property && property.erase
          ? property.erase.apply(this)
          : this.removeProperty(prop);
        return this;
      },

      hasClass: hasClassList
        ? function (className) {
            return this.classList.contains(className);
          }
        : function (className) {
            return classes(this.className).contains(className);
          },

      addClass: hasClassList
        ? function (className) {
            classes(className).forEach(addToClassList, this);
            return this;
          }
        : function (className) {
            this.className = classes(className + " " + this.className).join(
              " "
            );
            return this;
          },

      removeClass: hasClassList
        ? function (className) {
            classes(className).forEach(removeFromClassList, this);
            return this;
          }
        : function (className) {
            var classNames = classes(this.className);
            classes(className).forEach(classNames.erase, classNames);
            this.className = classNames.join(" ");
            return this;
          },

      toggleClass: function (className, force) {
        if (force == null) force = !this.hasClass(className);
        return force ? this.addClass(className) : this.removeClass(className);
      },

      adopt: function () {
        var parent = this,
          fragment,
          elements = Array.flatten(arguments),
          length = elements.length;
        if (length > 1) parent = fragment = document.createDocumentFragment();

        for (var i = 0; i < length; i++) {
          var element = document.id(elements[i], true);
          if (element) parent.appendChild(element);
        }

        if (fragment) this.appendChild(fragment);

        return this;
      },

      appendText: function (text, where) {
        return this.grab(this.getDocument().newTextNode(text), where);
      },

      grab: function (el, where) {
        inserters[where || "bottom"](document.id(el, true), this);
        return this;
      },

      inject: function (el, where) {
        inserters[where || "bottom"](this, document.id(el, true));
        return this;
      },

      replaces: function (el) {
        el = document.id(el, true);
        el.parentNode.replaceChild(this, el);
        return this;
      },

      wraps: function (el, where) {
        el = document.id(el, true);
        return this.replaces(el).grab(el, where);
      },

      getSelected: function () {
        this.selectedIndex;
        return new Elements(
          Array.convert(this.options).filter(function (option) {
            return option.selected;
          })
        );
      },

      toQueryString: function () {
        var queryString = [];
        this.getElements("input, select, textarea").each(function (el) {
          var type = el.type;
          if (
            !el.name ||
            el.disabled ||
            type == "submit" ||
            type == "reset" ||
            type == "file" ||
            type == "image"
          )
            return;

          var value =
            el.get("tag") == "select"
              ? el.getSelected().map(function (opt) {
                  return document.id(opt).get("value");
                })
              : (type == "radio" || type == "checkbox") && !el.checked
              ? null
              : el.get("value");

          Array.convert(value).each(function (val) {
            if (typeof val != "undefined")
              queryString.push(
                encodeURIComponent(el.name) + "=" + encodeURIComponent(val)
              );
          });
        });
        return queryString.join("&");
      },
    });

    var appendInserters = {
      before: "beforeBegin",
      after: "afterEnd",
      bottom: "beforeEnd",
      top: "afterBegin",
      inside: "beforeEnd",
    };

    Element.implement(
      "appendHTML",
      "insertAdjacentHTML" in document.createElement("div")
        ? function (html, where) {
            this.insertAdjacentHTML(appendInserters[where || "bottom"], html);
            return this;
          }
        : function (html, where) {
            var temp = new Element("div", { html: html }),
              children = temp.childNodes,
              fragment = temp.firstChild;

            if (!fragment) return this;
            if (children.length > 1) {
              fragment = document.createDocumentFragment();
              for (var i = 0, l = children.length; i < l; i++) {
                fragment.appendChild(children[i]);
              }
            }

            inserters[where || "bottom"](fragment, this);
            return this;
          }
    );

    var collected = {},
      storage = {};

    var get = function (uid) {
      return storage[uid] || (storage[uid] = {});
    };

    var clean = function (item) {
      var uid = item.uniqueNumber;
      if (item.removeEvents) item.removeEvents();
      if (item.clearAttributes) item.clearAttributes();
      if (uid != null) {
        delete collected[uid];
        delete storage[uid];
      }
      return item;
    };

    var formProps = { input: "checked", option: "selected", textarea: "value" };

    Element.implement({
      destroy: function () {
        var children = clean(this).getElementsByTagName("*");
        Array.each(children, clean);
        Element.dispose(this);
        return null;
      },

      empty: function () {
        Array.convert(this.childNodes).each(Element.dispose);
        return this;
      },

      dispose: function () {
        return this.parentNode ? this.parentNode.removeChild(this) : this;
      },

      clone: function (contents, keepid) {
        contents = contents !== false;
        var clone = this.cloneNode(contents),
          ce = [clone],
          te = [this],
          i;

        if (contents) {
          ce.append(Array.convert(clone.getElementsByTagName("*")));
          te.append(Array.convert(this.getElementsByTagName("*")));
        }

        for (i = ce.length; i--; ) {
          var node = ce[i],
            element = te[i];
          if (!keepid) node.removeAttribute("id");
          /*<ltIE9>*/
          if (node.clearAttributes) {
            node.clearAttributes();
            node.mergeAttributes(element);
            node.removeAttribute("uniqueNumber");
            if (node.options) {
              var no = node.options,
                eo = element.options;
              for (var j = no.length; j--; ) no[j].selected = eo[j].selected;
            }
          }
          /*</ltIE9>*/
          var prop = formProps[element.tagName.toLowerCase()];
          if (prop && element[prop]) node[prop] = element[prop];
        }

        /*<ltIE9>*/
        if (hasCloneBug) {
          var co = clone.getElementsByTagName("object"),
            to = this.getElementsByTagName("object");
          for (i = co.length; i--; ) co[i].outerHTML = to[i].outerHTML;
        }
        /*</ltIE9>*/
        return document.id(clone);
      },
    });

    [Element, Window, Document].invoke("implement", {
      addListener: function (type, fn) {
        if (window.attachEvent && !window.addEventListener) {
          collected[Slick.uidOf(this)] = this;
        }
        if (this.addEventListener)
          this.addEventListener(type, fn, !!arguments[2]);
        else this.attachEvent("on" + type, fn);
        return this;
      },

      removeListener: function (type, fn) {
        if (this.removeEventListener)
          this.removeEventListener(type, fn, !!arguments[2]);
        else this.detachEvent("on" + type, fn);
        return this;
      },

      retrieve: function (property, dflt) {
        var storage = get(Slick.uidOf(this)),
          prop = storage[property];
        if (dflt != null && prop == null) prop = storage[property] = dflt;
        return prop != null ? prop : null;
      },

      store: function (property, value) {
        var storage = get(Slick.uidOf(this));
        storage[property] = value;
        return this;
      },

      eliminate: function (property) {
        var storage = get(Slick.uidOf(this));
        delete storage[property];
        return this;
      },
    });

    if (window.attachEvent && !window.addEventListener) {
      var gc = function () {
        Object.each(collected, clean);
        if (window.CollectGarbage) CollectGarbage();
        window.removeListener("unload", gc);
      };
      window.addListener("unload", gc);
    }

    Element.Properties = {};

    Element.Properties.style = {
      set: function (style) {
        this.style.cssText = style;
      },

      get: function () {
        return this.style.cssText;
      },

      erase: function () {
        this.style.cssText = "";
      },
    };

    Element.Properties.tag = {
      get: function () {
        return this.tagName.toLowerCase();
      },
    };

    Element.Properties.html = {
      set: function (html) {
        if (html == null) html = "";
        else if (typeOf(html) == "array") html = html.join("");

        /*<ltIE9>*/
        if (this.styleSheet && !canChangeStyleHTML)
          this.styleSheet.cssText = html;
        /*</ltIE9>*/ else this.innerHTML = html;
      },
      erase: function () {
        this.set("html", "");
      },
    };

    var supportsHTML5Elements = true,
      supportsTableInnerHTML = true,
      supportsTRInnerHTML = true;

    /*<ltIE9>*/

    var div = document.createElement("div");
    var fragment;
    div.innerHTML = "<nav></nav>";
    supportsHTML5Elements = div.childNodes.length == 1;
    if (!supportsHTML5Elements) {
      var tags =
        "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(
          " "
        );
      (fragment = document.createDocumentFragment()), (l = tags.length);
      while (l--) fragment.createElement(tags[l]);
    }
    div = null;

    supportsTableInnerHTML = Function.attempt(function () {
      var table = document.createElement("table");
      table.innerHTML = "<tr><td></td></tr>";
      return true;
    });

    var tr = document.createElement("tr"),
      html = "<td></td>";
    tr.innerHTML = html;
    supportsTRInnerHTML = tr.innerHTML == html;
    tr = null;

    if (
      !supportsTableInnerHTML ||
      !supportsTRInnerHTML ||
      !supportsHTML5Elements
    ) {
      Element.Properties.html.set = (function (set) {
        var translations = {
          table: [1, "<table>", "</table>"],
          select: [1, "<select>", "</select>"],
          tbody: [2, "<table><tbody>", "</tbody></table>"],
          tr: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        };

        translations.thead = translations.tfoot = translations.tbody;

        return function (html) {
          /*<ltIE9>*/
          if (this.styleSheet) return set.call(this, html);
          /*</ltIE9>*/
          var wrap = translations[this.get("tag")];
          if (!wrap && !supportsHTML5Elements) wrap = [0, "", ""];
          if (!wrap) return set.call(this, html);

          var level = wrap[0],
            wrapper = document.createElement("div"),
            target = wrapper;
          if (!supportsHTML5Elements) fragment.appendChild(wrapper);
          wrapper.innerHTML = [wrap[1], html, wrap[2]].flatten().join("");
          while (level--) target = target.firstChild;
          this.empty().adopt(target.childNodes);
          if (!supportsHTML5Elements) fragment.removeChild(wrapper);
          wrapper = null;
        };
      })(Element.Properties.html.set);
    }
    /*</IE>*/

    /*<ltIE9>*/
    var testForm = document.createElement("form");
    testForm.innerHTML = "<select><option>s</option></select>";

    if (testForm.firstChild.value != "s")
      Element.Properties.value = {
        set: function (value) {
          var tag = this.get("tag");
          if (tag != "select") return this.setProperty("value", value);
          var options = this.getElements("option");
          value = String(value);
          for (var i = 0; i < options.length; i++) {
            var option = options[i],
              attr = option.getAttributeNode("value"),
              optionValue =
                attr && attr.specified ? option.value : option.get("text");
            if (optionValue === value) return (option.selected = true);
          }
        },

        get: function () {
          var option = this,
            tag = option.get("tag");

          if (tag != "select" && tag != "option")
            return this.getProperty("value");

          if (tag == "select" && !(option = option.getSelected()[0])) return "";

          var attr = option.getAttributeNode("value");
          return attr && attr.specified ? option.value : option.get("text");
        },
      };
    testForm = null;
    /*</ltIE9>*/

    /*<IE>*/
    if (document.createElement("div").getAttributeNode("id"))
      Element.Properties.id = {
        set: function (id) {
          this.id = this.getAttributeNode("id").value = id;
        },
        get: function () {
          return this.id || null;
        },
        erase: function () {
          this.id = this.getAttributeNode("id").value = "";
        },
      };
  })();

  (function () {
    var _keys = {};
    var normalizeWheelSpeed = function (event) {
      var normalized;
      if (event.wheelDelta) {
        normalized =
          event.wheelDelta % 120 == 0
            ? event.wheelDelta / 120
            : event.wheelDelta / 12;
      } else {
        var rawAmount = event.deltaY || event.detail || 0;
        normalized = -(rawAmount % 3 == 0 ? rawAmount / 3 : rawAmount * 10);
      }
      return normalized;
    };

    var DOMEvent = (this.DOMEvent = new Type("DOMEvent", function (event, win) {
      if (!win) win = window;
      event = event || win.event;
      if (event.$extended) return event;
      this.event = event;
      this.$extended = true;
      this.shift = event.shiftKey;
      this.control = event.ctrlKey;
      this.alt = event.altKey;
      this.meta = event.metaKey;
      var type = (this.type = event.type);
      var target = event.target || event.srcElement;
      while (target && target.nodeType == 3) target = target.parentNode;
      this.target = document.id(target);

      if (type.indexOf("key") == 0) {
        var code = (this.code = event.which || event.keyCode);
        if (!this.shift || type != "keypress") this.key = _keys[code];
        if (type == "keydown" || type == "keyup") {
          if (code > 111 && code < 124) this.key = "f" + (code - 111);
          else if (code > 95 && code < 106) this.key = code - 96;
        }
        if (this.key == null)
          this.key = String.fromCharCode(code).toLowerCase();
      } else if (
        type == "click" ||
        type == "dblclick" ||
        type == "contextmenu" ||
        type == "wheel" ||
        type == "DOMMouseScroll" ||
        type.indexOf("mouse") == 0
      ) {
        var doc = win.document;
        doc =
          !doc.compatMode || doc.compatMode == "CSS1Compat"
            ? doc.html
            : doc.body;
        this.page = {
          x: event.pageX != null ? event.pageX : event.clientX + doc.scrollLeft,
          y: event.pageY != null ? event.pageY : event.clientY + doc.scrollTop,
        };
        this.client = {
          x:
            event.pageX != null ? event.pageX - win.pageXOffset : event.clientX,
          y:
            event.pageY != null ? event.pageY - win.pageYOffset : event.clientY,
        };
        if (type == "DOMMouseScroll" || type == "wheel" || type == "mousewheel")
          this.wheel = normalizeWheelSpeed(event);
        this.rightClick = event.which == 3 || event.button == 2;
        if (
          type == "mouseover" ||
          type == "mouseout" ||
          type == "mouseenter" ||
          type == "mouseleave"
        ) {
          var overTarget = type == "mouseover" || type == "mouseenter";
          var related =
            event.relatedTarget ||
            event[(overTarget ? "from" : "to") + "Element"];
          while (related && related.nodeType == 3) related = related.parentNode;
          this.relatedTarget = document.id(related);
        }
      } else if (type.indexOf("touch") == 0 || type.indexOf("gesture") == 0) {
        this.rotation = event.rotation;
        this.scale = event.scale;
        this.targetTouches = event.targetTouches;
        this.changedTouches = event.changedTouches;
        var touches = (this.touches = event.touches);
        if (touches && touches[0]) {
          var touch = touches[0];
          this.page = { x: touch.pageX, y: touch.pageY };
          this.client = { x: touch.clientX, y: touch.clientY };
        }
      }

      if (!this.client) this.client = {};
      if (!this.page) this.page = {};
    }));

    DOMEvent.implement({
      stop: function () {
        return this.preventDefault().stopPropagation();
      },

      stopPropagation: function () {
        if (this.event.stopPropagation) this.event.stopPropagation();
        else this.event.cancelBubble = true;
        return this;
      },

      preventDefault: function () {
        if (this.event.preventDefault) this.event.preventDefault();
        else this.event.returnValue = false;
        return this;
      },
    });

    DOMEvent.defineKey = function (code, key) {
      _keys[code] = key;
      return this;
    };

    DOMEvent.defineKeys = DOMEvent.defineKey.overloadSetter(true);

    DOMEvent.defineKeys({
      38: "up",
      40: "down",
      37: "left",
      39: "right",
      27: "esc",
      32: "space",
      8: "backspace",
      9: "tab",
      46: "delete",
      13: "enter",
    });
  })();

  (function () {
    Element.Properties.events = {
      set: function (events) {
        this.addEvents(events);
      },
    };

    [Element, Window, Document].invoke("implement", {
      addEvent: function (type, fn) {
        var events = this.retrieve("events", {});
        if (!events[type]) events[type] = { keys: [], values: [] };
        if (events[type].keys.contains(fn)) return this;
        events[type].keys.push(fn);
        var realType = type,
          custom = Element.Events[type],
          condition = fn,
          self = this;
        if (custom) {
          if (custom.onAdd) custom.onAdd.call(this, fn, type);
          if (custom.condition) {
            condition = function (event) {
              if (custom.condition.call(this, event, type))
                return fn.call(this, event);
              return true;
            };
          }
          if (custom.base)
            realType = Function.convert(custom.base).call(this, type);
        }
        var defn = function () {
          return fn.call(self);
        };
        var nativeEvent = Element.NativeEvents[realType];
        if (nativeEvent) {
          if (nativeEvent == 2) {
            defn = function (event) {
              event = new DOMEvent(event, self.getWindow());
              if (condition.call(self, event) === false) event.stop();
            };
          }
          this.addListener(realType, defn, arguments[2]);
        }
        events[type].values.push(defn);
        return this;
      },

      removeEvent: function (type, fn) {
        var events = this.retrieve("events");
        if (!events || !events[type]) return this;
        var list = events[type];
        var index = list.keys.indexOf(fn);
        if (index == -1) return this;
        var value = list.values[index];
        delete list.keys[index];
        delete list.values[index];
        var custom = Element.Events[type];
        if (custom) {
          if (custom.onRemove) custom.onRemove.call(this, fn, type);
          if (custom.base)
            type = Function.convert(custom.base).call(this, type);
        }
        return Element.NativeEvents[type]
          ? this.removeListener(type, value, arguments[2])
          : this;
      },

      addEvents: function (events) {
        for (var event in events) this.addEvent(event, events[event]);
        return this;
      },

      removeEvents: function (events) {
        var type;
        if (typeOf(events) == "object") {
          for (type in events) this.removeEvent(type, events[type]);
          return this;
        }
        var attached = this.retrieve("events");
        if (!attached) return this;
        if (!events) {
          for (type in attached) this.removeEvents(type);
          this.eliminate("events");
        } else if (attached[events]) {
          attached[events].keys.each(function (fn) {
            this.removeEvent(events, fn);
          }, this);
          delete attached[events];
        }
        return this;
      },

      fireEvent: function (type, args, delay) {
        var events = this.retrieve("events");
        if (!events || !events[type]) return this;
        args = Array.convert(args);

        events[type].keys.each(function (fn) {
          if (delay) fn.delay(delay, this, args);
          else fn.apply(this, args);
        }, this);
        return this;
      },

      cloneEvents: function (from, type) {
        from = document.id(from);
        var events = from.retrieve("events");
        if (!events) return this;
        if (!type) {
          for (var eventType in events) this.cloneEvents(from, eventType);
        } else if (events[type]) {
          events[type].keys.each(function (fn) {
            this.addEvent(type, fn);
          }, this);
        }
        return this;
      },
    });

    Element.NativeEvents = {
      click: 2,
      dblclick: 2,
      mouseup: 2,
      mousedown: 2,
      contextmenu: 2,
      wheel: 2,
      mousewheel: 2,
      DOMMouseScroll: 2,
      mouseover: 2,
      mouseout: 2,
      mousemove: 2,
      selectstart: 2,
      selectend: 2,
      keydown: 2,
      keypress: 2,
      keyup: 2,
      orientationchange: 2,
      touchstart: 2,
      touchmove: 2,
      touchend: 2,
      touchcancel: 2,
      gesturestart: 2,
      gesturechange: 2,
      gestureend: 2,
      focus: 2,
      blur: 2,
      change: 2,
      reset: 2,
      select: 2,
      submit: 2,
      paste: 2,
      input: 2, //form elements
      load: 2,
      unload: 1,
      beforeunload: 2,
      resize: 1,
      move: 1,
      DOMContentLoaded: 1,
      readystatechange: 1, //window
      hashchange: 1,
      popstate: 2,
      pageshow: 2,
      pagehide: 2,
      error: 1,
      abort: 1,
      scroll: 1,
      message: 2, //misc
    };

    Element.Events = {
      mousewheel: {
        base:
          "onwheel" in document
            ? "wheel"
            : "onmousewheel" in document
            ? "mousewheel"
            : "DOMMouseScroll",
      },
    };

    var check = function (event) {
      var related = event.relatedTarget;
      if (related == null) return true;
      if (!related) return false;
      return (
        related != this &&
        related.prefix != "xul" &&
        typeOf(this) != "document" &&
        !this.contains(related)
      );
    };

    if ("onmouseenter" in document.documentElement) {
      Element.NativeEvents.mouseenter = Element.NativeEvents.mouseleave = 2;
      Element.MouseenterCheck = check;
    } else {
      Element.Events.mouseenter = {
        base: "mouseover",
        condition: check,
      };

      Element.Events.mouseleave = {
        base: "mouseout",
        condition: check,
      };
    }

    /*<ltIE9>*/
    if (!window.addEventListener) {
      Element.NativeEvents.propertychange = 2;
      Element.Events.change = {
        base: function () {
          var type = this.type;
          return this.get("tag") == "input" &&
            (type == "radio" || type == "checkbox")
            ? "propertychange"
            : "change";
        },
        condition: function (event) {
          return (
            event.type != "propertychange" ||
            event.event.propertyName == "checked"
          );
        },
      };
    }
  })();

  (function () {
    var eventListenerSupport = !!window.addEventListener;

    Element.NativeEvents.focusin = Element.NativeEvents.focusout = 2;

    var bubbleUp = function (self, match, fn, event, target) {
      while (target && target != self) {
        if (match(target, event)) return fn.call(target, event, target);
        target = document.id(target.parentNode);
      }
    };

    var map = {
      mouseenter: {
        base: "mouseover",
        condition: Element.MouseenterCheck,
      },
      mouseleave: {
        base: "mouseout",
        condition: Element.MouseenterCheck,
      },
      focus: {
        base: "focus" + (eventListenerSupport ? "" : "in"),
        capture: true,
      },
      blur: {
        base: eventListenerSupport ? "blur" : "focusout",
        capture: true,
      },
    };

    /*<ltIE9>*/
    var _key = "$delegation:";
    var formObserver = function (type) {
      return {
        base: "focusin",

        remove: function (self, uid) {
          var list = self.retrieve(_key + type + "listeners", {})[uid];
          if (list && list.forms)
            for (var i = list.forms.length; i--; ) {
              if (list.forms[i].removeEvent)
                list.forms[i].removeEvent(type, list.fns[i]);
            }
        },

        listen: function (self, match, fn, event, target, uid) {
          var form =
            target.get("tag") == "form"
              ? target
              : event.target.getParent("form");
          if (!form) return;

          var listeners = self.retrieve(_key + type + "listeners", {}),
            listener = listeners[uid] || { forms: [], fns: [] },
            forms = listener.forms,
            fns = listener.fns;

          if (forms.indexOf(form) != -1) return;
          forms.push(form);

          var _fn = function (event) {
            bubbleUp(self, match, fn, event, target);
          };
          form.addEvent(type, _fn);
          fns.push(_fn);

          listeners[uid] = listener;
          self.store(_key + type + "listeners", listeners);
        },
      };
    };

    var inputObserver = function (type) {
      return {
        base: "focusin",
        listen: function (self, match, fn, event, target) {
          var events = {
            blur: function () {
              this.removeEvents(events);
            },
          };
          events[type] = function (event) {
            bubbleUp(self, match, fn, event, target);
          };
          event.target.addEvents(events);
        },
      };
    };

    if (!eventListenerSupport)
      Object.append(map, {
        submit: formObserver("submit"),
        reset: formObserver("reset"),
        change: inputObserver("change"),
        select: inputObserver("select"),
      });
    /*</ltIE9>*/

    var proto = Element.prototype,
      addEvent = proto.addEvent,
      removeEvent = proto.removeEvent;

    var relay = function (old, method) {
      return function (type, fn, useCapture) {
        if (type.indexOf(":relay") == -1)
          return old.call(this, type, fn, useCapture);
        var parsed = Slick.parse(type).expressions[0][0];
        if (parsed.pseudos[0].key != "relay")
          return old.call(this, type, fn, useCapture);
        var newType = parsed.tag;
        parsed.pseudos.slice(1).each(function (pseudo) {
          newType +=
            ":" + pseudo.key + (pseudo.value ? "(" + pseudo.value + ")" : "");
        });
        old.call(this, type, fn);
        return method.call(this, newType, parsed.pseudos[0].value, fn);
      };
    };

    var delegation = {
      addEvent: function (type, match, fn) {
        var storage = this.retrieve("$delegates", {}),
          stored = storage[type];
        if (stored)
          for (var _uid in stored) {
            if (stored[_uid].fn == fn && stored[_uid].match == match)
              return this;
          }

        var _type = type,
          _match = match,
          _fn = fn,
          _map = map[type] || {};
        type = _map.base || _type;

        match = function (target) {
          return Slick.match(target, _match);
        };

        var elementEvent = Element.Events[_type];
        if (_map.condition || (elementEvent && elementEvent.condition)) {
          var __match = match,
            condition = _map.condition || elementEvent.condition;
          match = function (target, event) {
            return (
              __match(target, event) && condition.call(target, event, type)
            );
          };
        }

        var self = this,
          uid = String.uniqueID();
        var delegator = _map.listen
          ? function (event, target) {
              if (!target && event && event.target) target = event.target;
              if (target) _map.listen(self, match, fn, event, target, uid);
            }
          : function (event, target) {
              if (!target && event && event.target) target = event.target;
              if (target) bubbleUp(self, match, fn, event, target);
            };

        if (!stored) stored = {};
        stored[uid] = {
          match: _match,
          fn: _fn,
          delegator: delegator,
        };
        storage[_type] = stored;
        return addEvent.call(this, type, delegator, _map.capture);
      },

      removeEvent: function (type, match, fn, _uid) {
        var storage = this.retrieve("$delegates", {}),
          stored = storage[type];
        if (!stored) return this;

        if (_uid) {
          var _type = type,
            delegator = stored[_uid].delegator,
            _map = map[type] || {};
          type = _map.base || _type;
          if (_map.remove) _map.remove(this, _uid);
          delete stored[_uid];
          storage[_type] = stored;
          return removeEvent.call(this, type, delegator, _map.capture);
        }

        var __uid, s;
        if (fn)
          for (__uid in stored) {
            s = stored[__uid];
            if (s.match == match && s.fn == fn)
              return delegation.removeEvent.call(this, type, match, fn, __uid);
          }
        else
          for (__uid in stored) {
            s = stored[__uid];
            if (s.match == match)
              delegation.removeEvent.call(this, type, match, s.fn, __uid);
          }
        return this;
      },
    };

    [Element, Window, Document].invoke("implement", {
      addEvent: relay(addEvent, delegation.addEvent),
      removeEvent: relay(removeEvent, delegation.removeEvent),
    });
  })();

  (function () {
    var html = document.html,
      el;

    el = document.createElement("div");
    el.style.color = "red";
    el.style.color = null;
    var doesNotRemoveStyles = el.style.color == "red";

    var border = "1px solid #123abc";
    el.style.border = border;
    var returnsBordersInWrongOrder = el.style.border != border;
    el = null;
    //</ltIE9>

    var hasGetComputedStyle = !!window.getComputedStyle,
      supportBorderRadius =
        document.createElement("div").style.borderRadius != null;

    Element.Properties.styles = {
      set: function (styles) {
        this.setStyles(styles);
      },
    };

    var hasOpacity = html.style.opacity != null,
      hasFilter = html.style.filter != null,
      reAlpha = /alpha\(opacity=([\d.]+)\)/i;

    var setVisibility = function (element, opacity) {
      element.store("$opacity", opacity);
      element.style.visibility =
        opacity > 0 || opacity == null ? "visible" : "hidden";
    };

    //<ltIE9>
    var setFilter = function (element, regexp, value) {
      var style = element.style,
        filter = style.filter || element.getComputedStyle("filter") || "";
      style.filter = (
        regexp.test(filter)
          ? filter.replace(regexp, value)
          : filter + " " + value
      ).trim();
      if (!style.filter) style.removeAttribute("filter");
    };
    //</ltIE9>

    var setOpacity = hasOpacity
      ? function (element, opacity) {
          element.style.opacity = opacity;
        }
      : hasFilter
      ? function (element, opacity) {
          if (!element.currentStyle || !element.currentStyle.hasLayout)
            element.style.zoom = 1;
          if (opacity == null || opacity == 1) {
            setFilter(element, reAlpha, "");
            if (opacity == 1 && getOpacity(element) != 1)
              setFilter(element, reAlpha, "alpha(opacity=100)");
          } else {
            setFilter(
              element,
              reAlpha,
              "alpha(opacity=" + (opacity * 100).limit(0, 100).round() + ")"
            );
          }
        }
      : setVisibility;

    var getOpacity = hasOpacity
      ? function (element) {
          var opacity =
            element.style.opacity || element.getComputedStyle("opacity");
          return opacity == "" ? 1 : opacity.toFloat();
        }
      : hasFilter
      ? function (element) {
          var filter =
              element.style.filter || element.getComputedStyle("filter"),
            opacity;
          if (filter) opacity = filter.match(reAlpha);
          return opacity == null || filter == null ? 1 : opacity[1] / 100;
        }
      : function (element) {
          var opacity = element.retrieve("$opacity");
          if (opacity == null)
            opacity = element.style.visibility == "hidden" ? 0 : 1;
          return opacity;
        };

    var floatName = html.style.cssFloat == null ? "styleFloat" : "cssFloat",
      namedPositions = {
        left: "0%",
        top: "0%",
        center: "50%",
        right: "100%",
        bottom: "100%",
      },
      hasBackgroundPositionXY = html.style.backgroundPositionX != null,
      prefixPattern = /^-(ms)-/;

    var camelCase = function (property) {
      return property.replace(prefixPattern, "$1-").camelCase();
    };

    //<ltIE9>
    var removeStyle = function (style, property) {
      if (property == "backgroundPosition") {
        style.removeAttribute(property + "X");
        property += "Y";
      }
      style.removeAttribute(property);
    };
    //</ltIE9>

    Element.implement({
      getComputedStyle: function (property) {
        if (!hasGetComputedStyle && this.currentStyle)
          return this.currentStyle[camelCase(property)];
        var defaultView = Element.getDocument(this).defaultView,
          computed = defaultView
            ? defaultView.getComputedStyle(this, null)
            : null;
        return computed
          ? computed.getPropertyValue(
              property == floatName ? "float" : property.hyphenate()
            )
          : "";
      },

      setStyle: function (property, value) {
        if (property == "opacity") {
          if (value != null) value = parseFloat(value);
          setOpacity(this, value);
          return this;
        }
        property = camelCase(property == "float" ? floatName : property);
        if (typeOf(value) != "string") {
          var map = (Element.Styles[property] || "@").split(" ");
          value = Array.convert(value)
            .map(function (val, i) {
              if (!map[i]) return "";
              return typeOf(val) == "number"
                ? map[i].replace("@", Math.round(val))
                : val;
            })
            .join(" ");
        } else if (value == String(Number(value))) {
          value = Math.round(value);
        }
        this.style[property] = value;
        //<ltIE9>
        if (
          (value == "" || value == null) &&
          doesNotRemoveStyles &&
          this.style.removeAttribute
        ) {
          removeStyle(this.style, property);
        }
        //</ltIE9>
        return this;
      },

      getStyle: function (property) {
        if (property == "opacity") return getOpacity(this);
        property = camelCase(property == "float" ? floatName : property);
        if (supportBorderRadius && property.indexOf("borderRadius") != -1) {
          return [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomRightRadius",
            "borderBottomLeftRadius",
          ]
            .map(function (corner) {
              return this.style[corner] || "0px";
            }, this)
            .join(" ");
        }
        var result = this.style[property];
        if (!result || property == "zIndex") {
          if (Element.ShortStyles.hasOwnProperty(property)) {
            result = [];
            for (var s in Element.ShortStyles[property])
              result.push(this.getStyle(s));
            return result.join(" ");
          }
          result = this.getComputedStyle(property);
        }
        if (
          hasBackgroundPositionXY &&
          /^backgroundPosition[XY]?$/.test(property)
        ) {
          return (
            result.replace(/(top|right|bottom|left)/g, function (position) {
              return namedPositions[position];
            }) || "0px"
          );
        }
        if (!result && property == "backgroundPosition") return "0px 0px";
        if (result) {
          result = String(result);
          var color = result.match(/rgba?\([\d\s,]+\)/);
          if (color) result = result.replace(color[0], color[0].rgbToHex());
        }
        if (!hasGetComputedStyle && !this.style[property]) {
          if (/^(height|width)$/.test(property) && !/px$/.test(result)) {
            var values =
                property == "width" ? ["left", "right"] : ["top", "bottom"],
              size = 0;
            values.each(function (value) {
              size +=
                this.getStyle("border-" + value + "-width").toInt() +
                this.getStyle("padding-" + value).toInt();
            }, this);
            return this["offset" + property.capitalize()] - size + "px";
          }
          if (
            /^border(.+)Width|margin|padding/.test(property) &&
            isNaN(parseFloat(result))
          ) {
            return "0px";
          }
        }
        if (
          returnsBordersInWrongOrder &&
          /^border(Top|Right|Bottom|Left)?$/.test(property) &&
          /^#/.test(result)
        ) {
          return result.replace(/^(.+)\s(.+)\s(.+)$/, "$2 $3 $1");
        }

        return result;
      },

      setStyles: function (styles) {
        for (var style in styles) this.setStyle(style, styles[style]);
        return this;
      },

      getStyles: function () {
        var result = {};
        Array.flatten(arguments).each(function (key) {
          result[key] = this.getStyle(key);
        }, this);
        return result;
      },
    });

    Element.Styles = {
      left: "@px",
      top: "@px",
      bottom: "@px",
      right: "@px",
      width: "@px",
      height: "@px",
      maxWidth: "@px",
      maxHeight: "@px",
      minWidth: "@px",
      minHeight: "@px",
      backgroundColor: "rgb(@, @, @)",
      backgroundSize: "@px",
      backgroundPosition: "@px @px",
      color: "rgb(@, @, @)",
      fontSize: "@px",
      letterSpacing: "@px",
      lineHeight: "@px",
      clip: "rect(@px @px @px @px)",
      margin: "@px @px @px @px",
      padding: "@px @px @px @px",
      border: "@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",
      borderWidth: "@px @px @px @px",
      borderStyle: "@ @ @ @",
      borderColor: "rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",
      zIndex: "@",
      zoom: "@",
      fontWeight: "@",
      textIndent: "@px",
      opacity: "@",
      borderRadius: "@px @px @px @px",
    };

    Element.ShortStyles = {
      margin: {},
      padding: {},
      border: {},
      borderWidth: {},
      borderStyle: {},
      borderColor: {},
    };

    ["Top", "Right", "Bottom", "Left"].each(function (direction) {
      var Short = Element.ShortStyles;
      var All = Element.Styles;
      ["margin", "padding"].each(function (style) {
        var sd = style + direction;
        Short[style][sd] = All[sd] = "@px";
      });
      var bd = "border" + direction;
      Short.border[bd] = All[bd] = "@px @ rgb(@, @, @)";
      var bdw = bd + "Width",
        bds = bd + "Style",
        bdc = bd + "Color";
      Short[bd] = {};
      Short.borderWidth[bdw] = Short[bd][bdw] = All[bdw] = "@px";
      Short.borderStyle[bds] = Short[bd][bds] = All[bds] = "@";
      Short.borderColor[bdc] = Short[bd][bdc] = All[bdc] = "rgb(@, @, @)";
    });

    if (hasBackgroundPositionXY)
      Element.ShortStyles.backgroundPosition = {
        backgroundPositionX: "@",
        backgroundPositionY: "@",
      };
  })();

  (function () {
    var element = document.createElement("div"),
      child = document.createElement("div");
    element.style.height = "0";
    element.appendChild(child);
    var brokenOffsetParent = child.offsetParent === element;
    element = child = null;

    var heightComponents = [
        "height",
        "paddingTop",
        "paddingBottom",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      widthComponents = [
        "width",
        "paddingLeft",
        "paddingRight",
        "borderLeftWidth",
        "borderRightWidth",
      ];

    var svgCalculateSize = function (el) {
      var gCS = window.getComputedStyle(el),
        bounds = { x: 0, y: 0 };

      heightComponents.each(function (css) {
        bounds.y += parseFloat(gCS[css]);
      });
      widthComponents.each(function (css) {
        bounds.x += parseFloat(gCS[css]);
      });
      return bounds;
    };

    var isOffset = function (el) {
      return styleString(el, "position") != "static" || isBody(el);
    };

    var isOffsetStatic = function (el) {
      return isOffset(el) || /^(?:table|td|th)$/i.test(el.tagName);
    };

    Element.implement({
      scrollTo: function (x, y) {
        if (isBody(this)) {
          this.getWindow().scrollTo(x, y);
        } else {
          this.scrollLeft = x;
          this.scrollTop = y;
        }
        return this;
      },

      getSize: function () {
        if (isBody(this)) return this.getWindow().getSize();

        //<ltIE9>

        if (!window.getComputedStyle)
          return { x: this.offsetWidth, y: this.offsetHeight };
        //</ltIE9>

        if (this.get("tag") == "svg") return svgCalculateSize(this);

        try {
          var bounds = this.getBoundingClientRect();
          return { x: bounds.width, y: bounds.height };
        } catch (e) {
          return { x: 0, y: 0 };
        }
      },

      getScrollSize: function () {
        if (isBody(this)) return this.getWindow().getScrollSize();
        return { x: this.scrollWidth, y: this.scrollHeight };
      },

      getScroll: function () {
        if (isBody(this)) return this.getWindow().getScroll();
        return { x: this.scrollLeft, y: this.scrollTop };
      },

      getScrolls: function () {
        var element = this.parentNode,
          position = { x: 0, y: 0 };
        while (element && !isBody(element)) {
          position.x += element.scrollLeft;
          position.y += element.scrollTop;
          element = element.parentNode;
        }
        return position;
      },

      getOffsetParent: brokenOffsetParent
        ? function () {
            var element = this;
            if (isBody(element) || styleString(element, "position") == "fixed")
              return null;

            var isOffsetCheck =
              styleString(element, "position") == "static"
                ? isOffsetStatic
                : isOffset;
            while ((element = element.parentNode)) {
              if (isOffsetCheck(element)) return element;
            }
            return null;
          }
        : function () {
            var element = this;
            if (isBody(element) || styleString(element, "position") == "fixed")
              return null;

            try {
              return element.offsetParent;
            } catch (e) {}
            return null;
          },

      getOffsets: function () {
        var hasGetBoundingClientRect = this.getBoundingClientRect;

        if (hasGetBoundingClientRect) {
          var bound = this.getBoundingClientRect(),
            html = document.id(this.getDocument().documentElement),
            htmlScroll = html.getScroll(),
            elemScrolls = this.getScrolls(),
            isFixed = styleString(this, "position") == "fixed";

          return {
            x:
              bound.left.toFloat() +
              elemScrolls.x +
              (isFixed ? 0 : htmlScroll.x) -
              html.clientLeft,
            y:
              bound.top.toFloat() +
              elemScrolls.y +
              (isFixed ? 0 : htmlScroll.y) -
              html.clientTop,
          };
        }

        var element = this,
          position = { x: 0, y: 0 };
        if (isBody(this)) return position;

        while (element && !isBody(element)) {
          position.x += element.offsetLeft;
          position.y += element.offsetTop;

          element = element.offsetParent;
        }

        return position;
      },

      getPosition: function (relative) {
        var offset = this.getOffsets(),
          scroll = this.getScrolls();
        var position = {
          x: offset.x - scroll.x,
          y: offset.y - scroll.y,
        };

        if (relative && (relative = document.id(relative))) {
          var relativePosition = relative.getPosition();
          return {
            x: position.x - relativePosition.x - leftBorder(relative),
            y: position.y - relativePosition.y - topBorder(relative),
          };
        }
        return position;
      },

      getCoordinates: function (element) {
        if (isBody(this)) return this.getWindow().getCoordinates();
        var position = this.getPosition(element),
          size = this.getSize();
        var obj = {
          left: position.x,
          top: position.y,
          width: size.x,
          height: size.y,
        };
        obj.right = obj.left + obj.width;
        obj.bottom = obj.top + obj.height;
        return obj;
      },

      computePosition: function (obj) {
        return {
          left: obj.x - styleNumber(this, "margin-left"),
          top: obj.y - styleNumber(this, "margin-top"),
        };
      },

      setPosition: function (obj) {
        return this.setStyles(this.computePosition(obj));
      },
    });

    [Document, Window].invoke("implement", {
      getSize: function () {
        var doc = getCompatElement(this);
        return { x: doc.clientWidth, y: doc.clientHeight };
      },

      getScroll: function () {
        var win = this.getWindow(),
          doc = getCompatElement(this);
        return {
          x: win.pageXOffset || doc.scrollLeft,
          y: win.pageYOffset || doc.scrollTop,
        };
      },

      getScrollSize: function () {
        var doc = getCompatElement(this),
          min = this.getSize(),
          body = this.getDocument().body;

        return {
          x: Math.max(doc.scrollWidth, body.scrollWidth, min.x),
          y: Math.max(doc.scrollHeight, body.scrollHeight, min.y),
        };
      },

      getPosition: function () {
        return { x: 0, y: 0 };
      },

      getCoordinates: function () {
        var size = this.getSize();
        return {
          top: 0,
          left: 0,
          bottom: size.y,
          right: size.x,
          height: size.y,
          width: size.x,
        };
      },
    });

    var styleString = Element.getComputedStyle;

    function styleNumber(element, style) {
      return styleString(element, style).toInt() || 0;
    }

    function topBorder(element) {
      return styleNumber(element, "border-top-width");
    }

    function leftBorder(element) {
      return styleNumber(element, "border-left-width");
    }

    function isBody(element) {
      return /^(?:body|html)$/i.test(element.tagName);
    }

    function getCompatElement(element) {
      var doc = element.getDocument();
      return !doc.compatMode || doc.compatMode == "CSS1Compat"
        ? doc.html
        : doc.body;
    }
  })();

  //aliases
  Element.alias({ position: "setPosition" }); //compatability

  [Window, Document, Element].invoke("implement", {
    getHeight: function () {
      return this.getSize().y;
    },

    getWidth: function () {
      return this.getSize().x;
    },

    getScrollTop: function () {
      return this.getScroll().y;
    },

    getScrollLeft: function () {
      return this.getScroll().x;
    },

    getScrollHeight: function () {
      return this.getScrollSize().y;
    },

    getScrollWidth: function () {
      return this.getScrollSize().x;
    },

    getTop: function () {
      return this.getPosition().y;
    },

    getLeft: function () {
      return this.getPosition().x;
    },
  });

  (function () {
    var Fx = (this.Fx = new Class({
      Implements: [Chain, Events, Options, Class.Thenable],

      options: {
        fps: 60,
        unit: false,
        duration: 500,
        frames: null,
        frameSkip: true,
        link: "ignore",
      },

      initialize: function (options) {
        this.subject = this.subject || this;
        this.setOptions(options);
      },

      getTransition: function () {
        return function (p) {
          return -(Math.cos(Math.PI * p) - 1) / 2;
        };
      },

      step: function (now) {
        if (this.options.frameSkip) {
          var diff = this.time != null ? now - this.time : 0,
            frames = diff / this.frameInterval;
          this.time = now;
          this.frame += frames;
        } else {
          this.frame++;
        }

        if (this.frame < this.frames) {
          var delta = this.transition(this.frame / this.frames);
          this.set(this.compute(this.from, this.to, delta));
        } else {
          this.frame = this.frames;
          this.set(this.compute(this.from, this.to, 1));
          this.stop();
        }
      },

      set: function (now) {
        return now;
      },

      compute: function (from, to, delta) {
        return Fx.compute(from, to, delta);
      },

      check: function () {
        if (!this.isRunning()) return true;
        switch (this.options.link) {
          case "cancel":
            this.cancel();
            return true;
          case "chain":
            this.chain(this.caller.pass(arguments, this));
            return false;
        }
        return false;
      },

      start: function (from, to) {
        if (!this.check(from, to)) return this;
        this.from = from;
        this.to = to;
        this.frame = this.options.frameSkip ? 0 : -1;
        this.time = null;
        this.transition = this.getTransition();
        var frames = this.options.frames,
          fps = this.options.fps,
          duration = this.options.duration;
        this.duration = Fx.Durations[duration] || duration.toInt();
        this.frameInterval = 1000 / fps;
        this.frames = frames || Math.round(this.duration / this.frameInterval);
        if (this.getThenableState() !== "pending") {
          this.resetThenable(this.subject);
        }
        this.fireEvent("start", this.subject);
        pushInstance.call(this, fps);
        return this;
      },

      stop: function () {
        if (this.isRunning()) {
          this.time = null;
          pullInstance.call(this, this.options.fps);
          if (this.frames == this.frame) {
            this.fireEvent("complete", this.subject);
            if (!this.callChain())
              this.fireEvent("chainComplete", this.subject);
          } else {
            this.fireEvent("stop", this.subject);
          }
          this.resolve(this.subject === this ? null : this.subject);
        }
        return this;
      },

      cancel: function () {
        if (this.isRunning()) {
          this.time = null;
          pullInstance.call(this, this.options.fps);
          this.frame = this.frames;
          this.fireEvent("cancel", this.subject).clearChain();
          this.reject(this.subject);
        }
        return this;
      },

      pause: function () {
        if (this.isRunning()) {
          this.time = null;
          pullInstance.call(this, this.options.fps);
        }
        return this;
      },

      resume: function () {
        if (this.isPaused()) pushInstance.call(this, this.options.fps);
        return this;
      },

      isRunning: function () {
        var list = instances[this.options.fps];
        return list && list.contains(this);
      },

      isPaused: function () {
        return this.frame < this.frames && !this.isRunning();
      },
    }));

    Fx.compute = function (from, to, delta) {
      return (to - from) * delta + from;
    };

    Fx.Durations = { short: 250, normal: 500, long: 1000 };

    var instances = {},
      timers = {};

    var loop = function () {
      var now = Date.now();
      for (var i = this.length; i--; ) {
        var instance = this[i];
        if (instance) instance.step(now);
      }
    };

    var pushInstance = function (fps) {
      var list = instances[fps] || (instances[fps] = []);
      list.push(this);
      if (!timers[fps])
        timers[fps] = loop.periodical(Math.round(1000 / fps), list);
    };

    var pullInstance = function (fps) {
      var list = instances[fps];
      if (list) {
        list.erase(this);
        if (!list.length && timers[fps]) {
          delete instances[fps];
          timers[fps] = clearInterval(timers[fps]);
        }
      }
    };
  })();

  Fx.CSS = new Class({
    Extends: Fx,

    prepare: function (element, property, values) {
      values = Array.convert(values);
      var from = values[0],
        to = values[1];
      if (to == null) {
        to = from;
        from = element.getStyle(property);
        var unit = this.options.unit;

        if (
          unit &&
          from &&
          typeof from == "string" &&
          from.slice(-unit.length) != unit &&
          parseFloat(from) != 0
        ) {
          element.setStyle(property, to + unit);
          var value = element.getComputedStyle(property);

          if (!/px$/.test(value)) {
            value = element.style[("pixel-" + property).camelCase()];
            if (value == null) {
              var left = element.style.left;
              element.style.left = to + unit;
              value = element.style.pixelLeft;
              element.style.left = left;
            }
          }
          from =
            ((to || 1) / (parseFloat(value) || 1)) * (parseFloat(from) || 0);
          element.setStyle(property, from + unit);
        }
      }
      return { from: this.parse(from), to: this.parse(to) };
    },

    //parses a value into an array

    parse: function (value) {
      value = Function.convert(value)();
      value =
        typeof value == "string" ? value.split(" ") : Array.convert(value);
      return value.map(function (val) {
        val = String(val);
        var found = false;
        Object.each(Fx.CSS.Parsers, function (parser) {
          if (found) return;
          var parsed = parser.parse(val);
          if (parsed || parsed === 0) found = { value: parsed, parser: parser };
        });
        found = found || { value: val, parser: Fx.CSS.Parsers.String };
        return found;
      });
    },

    //computes by a from and to prepared objects, using their parsers.

    compute: function (from, to, delta) {
      var computed = [];
      Math.min(from.length, to.length).times(function (i) {
        computed.push({
          value: from[i].parser.compute(from[i].value, to[i].value, delta),
          parser: from[i].parser,
        });
      });
      computed.$family = Function.convert("fx:css:value");
      return computed;
    },

    //serves the value as settable

    serve: function (value, unit) {
      if (typeOf(value) != "fx:css:value") value = this.parse(value);
      var returned = [];
      value.each(function (bit) {
        returned = returned.concat(bit.parser.serve(bit.value, unit));
      });
      return returned;
    },

    render: function (element, property, value, unit) {
      element.setStyle(property, this.serve(value, unit));
    },

    search: function (selector) {
      if (Fx.CSS.Cache[selector]) return Fx.CSS.Cache[selector];
      var to = {},
        selectorTest = new RegExp("^" + selector.escapeRegExp() + "$");

      var searchStyles = function (rules) {
        Array.each(rules, function (rule) {
          if (rule.media) {
            searchStyles(rule.rules || rule.cssRules);
            return;
          }
          if (!rule.style) return;
          var selectorText = rule.selectorText
            ? rule.selectorText.replace(/^\w+/, function (m) {
                return m.toLowerCase();
              })
            : null;
          if (!selectorText || !selectorTest.test(selectorText)) return;
          Object.each(Element.Styles, function (value, style) {
            if (!rule.style[style] || Element.ShortStyles[style]) return;
            value = String(rule.style[style]);
            to[style] = /^rgb/.test(value) ? value.rgbToHex() : value;
          });
        });
      };

      Array.each(document.styleSheets, function (sheet) {
        var href = sheet.href;
        if (
          href &&
          href.indexOf("://") > -1 &&
          href.indexOf(document.domain) == -1
        )
          return;
        var rules = sheet.rules || sheet.cssRules;
        searchStyles(rules);
      });
      return (Fx.CSS.Cache[selector] = to);
    },
  });

  Fx.CSS.Cache = {};

  Fx.CSS.Parsers = {
    Color: {
      parse: function (value) {
        if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
        return (value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))
          ? [value[1], value[2], value[3]]
          : false;
      },
      compute: function (from, to, delta) {
        return from.map(function (value, i) {
          return Math.round(Fx.compute(from[i], to[i], delta));
        });
      },
      serve: function (value) {
        return value.map(Number);
      },
    },

    Number: {
      parse: parseFloat,
      compute: Fx.compute,
      serve: function (value, unit) {
        return unit ? value + unit : value;
      },
    },

    String: {
      parse: Function.convert(false),
      compute: function (zero, one) {
        return one;
      },
      serve: function (zero) {
        return zero;
      },
    },
  };

  Fx.Morph = new Class({
    Extends: Fx.CSS,

    initialize: function (element, options) {
      this.element = this.subject = document.id(element);
      this.parent(options);
    },

    set: function (now) {
      if (typeof now == "string") now = this.search(now);
      for (var p in now)
        this.render(this.element, p, now[p], this.options.unit);
      return this;
    },

    compute: function (from, to, delta) {
      var now = {};
      for (var p in from) now[p] = this.parent(from[p], to[p], delta);
      return now;
    },

    start: function (properties) {
      if (!this.check(properties)) return this;
      if (typeof properties == "string") properties = this.search(properties);
      var from = {},
        to = {};
      for (var p in properties) {
        var parsed = this.prepare(this.element, p, properties[p]);
        from[p] = parsed.from;
        to[p] = parsed.to;
      }
      return this.parent(from, to);
    },
  });

  Element.Properties.morph = {
    set: function (options) {
      this.get("morph").cancel().setOptions(options);
      return this;
    },

    get: function () {
      var morph = this.retrieve("morph");
      if (!morph) {
        morph = new Fx.Morph(this, { link: "cancel" });
        this.store("morph", morph);
      }
      return morph;
    },
  };

  Element.implement({
    morph: function (props) {
      this.get("morph").start(props);
      return this;
    },
  });

  Fx.implement({
    getTransition: function () {
      var trans = this.options.transition || Fx.Transitions.Sine.easeInOut;
      if (typeof trans == "string") {
        var data = trans.split(":");
        trans = Fx.Transitions;
        trans = trans[data[0]] || trans[data[0].capitalize()];
        if (data[1])
          trans =
            trans[
              "ease" +
                data[1].capitalize() +
                (data[2] ? data[2].capitalize() : "")
            ];
      }
      return trans;
    },
  });

  Fx.Transition = function (transition, params) {
    params = Array.convert(params);
    var easeIn = function (pos) {
      return transition(pos, params);
    };
    return Object.append(easeIn, {
      easeIn: easeIn,
      easeOut: function (pos) {
        return 1 - transition(1 - pos, params);
      },
      easeInOut: function (pos) {
        return (
          (pos <= 0.5
            ? transition(2 * pos, params)
            : 2 - transition(2 * (1 - pos), params)) / 2
        );
      },
    });
  };

  Fx.Transitions = {
    linear: function (zero) {
      return zero;
    },
  };

  Fx.Transitions.extend = function (transitions) {
    for (var transition in transitions)
      Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
  };

  Fx.Transitions.extend({
    Pow: function (p, x) {
      return Math.pow(p, (x && x[0]) || 6);
    },

    Expo: function (p) {
      return Math.pow(2, 8 * (p - 1));
    },

    Circ: function (p) {
      return 1 - Math.sin(Math.acos(p));
    },

    Sine: function (p) {
      return 1 - Math.cos((p * Math.PI) / 2);
    },

    Back: function (p, x) {
      x = (x && x[0]) || 1.618;
      return Math.pow(p, 2) * ((x + 1) * p - x);
    },

    Bounce: function (p) {
      var value;
      for (var a = 0, b = 1; 1; a += b, b /= 2) {
        if (p >= (7 - 4 * a) / 11) {
          value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
          break;
        }
      }
      return value;
    },

    Elastic: function (p, x) {
      return (
        Math.pow(2, 10 * --p) *
        Math.cos((20 * p * Math.PI * ((x && x[0]) || 1)) / 3)
      );
    },
  });

  ["Quad", "Cubic", "Quart", "Quint"].each(function (transition, i) {
    Fx.Transitions[transition] = new Fx.Transition(function (p) {
      return Math.pow(p, i + 2);
    });
  });

  Fx.Tween = new Class({
    Extends: Fx.CSS,

    initialize: function (element, options) {
      this.element = this.subject = document.id(element);
      this.parent(options);
    },

    set: function (property, now) {
      if (arguments.length == 1) {
        now = property;
        property = this.property || this.options.property;
      }
      this.render(this.element, property, now, this.options.unit);
      return this;
    },

    start: function (property, from, to) {
      if (!this.check(property, from, to)) return this;
      var args = Array.flatten(arguments);
      this.property = this.options.property || args.shift();
      var parsed = this.prepare(this.element, this.property, args);
      return this.parent(parsed.from, parsed.to);
    },
  });

  Element.Properties.tween = {
    set: function (options) {
      this.get("tween").cancel().setOptions(options);
      return this;
    },

    get: function () {
      var tween = this.retrieve("tween");
      if (!tween) {
        tween = new Fx.Tween(this, { link: "cancel" });
        this.store("tween", tween);
      }
      return tween;
    },
  };

  Element.implement({
    tween: function (property, from, to) {
      this.get("tween").start(property, from, to);
      return this;
    },

    fade: function () {
      var fade = this.get("tween"),
        method,
        args = ["opacity"].append(arguments),
        toggle;
      if (args[1] == null) args[1] = "toggle";
      switch (args[1]) {
        case "in":
          method = "start";
          args[1] = 1;
          break;
        case "out":
          method = "start";
          args[1] = 0;
          break;
        case "show":
          method = "set";
          args[1] = 1;
          break;
        case "hide":
          method = "set";
          args[1] = 0;
          break;
        case "toggle":
          var flag = this.retrieve("fade:flag", this.getStyle("opacity") == 1);
          method = "start";
          args[1] = flag ? 0 : 1;
          this.store("fade:flag", !flag);
          toggle = true;
          break;
        default:
          method = "start";
      }
      if (!toggle) this.eliminate("fade:flag");
      fade[method].apply(fade, args);
      var to = args[args.length - 1];

      if (method == "set") {
        this.setStyle("visibility", to == 0 ? "hidden" : "visible");
      } else if (to != 0) {
        if (fade.$chain.length) {
          fade.chain(function () {
            this.element.setStyle("visibility", "visible");
            this.callChain();
          });
        } else {
          this.setStyle("visibility", "visible");
        }
      } else {
        fade.chain(function () {
          if (this.element.getStyle("opacity")) return;
          this.element.setStyle("visibility", "hidden");
          this.callChain();
        });
      }

      return this;
    },

    highlight: function (start, end) {
      if (!end) {
        end = this.retrieve(
          "highlight:original",
          this.getStyle("background-color")
        );
        end = end == "transparent" ? "#fff" : end;
      }
      var tween = this.get("tween");
      tween.start("background-color", start || "#ffff88", end).chain(
        function () {
          this.setStyle(
            "background-color",
            this.retrieve("highlight:original")
          );
          tween.callChain();
        }.bind(this)
      );
      return this;
    },
  });

  (function () {
    var empty = function () {},
      progressSupport = "onprogress" in new Browser.Request();

    var Request = (this.Request = new Class({
      Implements: [Chain, Events, Options, Class.Thenable],

      options: {
        url: "",
        data: "",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "text/javascript, text/html, application/xml, text/xml, */*",
        },
        async: true,
        format: false,
        method: "post",
        link: "ignore",
        isSuccess: null,
        emulation: true,
        urlEncoded: true,
        encoding: "utf-8",
        evalScripts: false,
        evalResponse: false,
        timeout: 0,
        noCache: false,
      },

      initialize: function (options) {
        this.xhr = new Browser.Request();
        this.setOptions(options);
        this.headers = this.options.headers;
      },

      onStateChange: function () {
        var xhr = this.xhr;
        if (xhr.readyState != 4 || !this.running) return;
        this.running = false;
        this.status = 0;
        Function.attempt(
          function () {
            var status = xhr.status;
            this.status = status == 1223 ? 204 : status;
          }.bind(this)
        );
        xhr.onreadystatechange = empty;
        if (progressSupport) xhr.onprogress = xhr.onloadstart = empty;
        if (this.timer) {
          clearTimeout(this.timer);
          delete this.timer;
        }

        this.response = {
          text: this.xhr.responseText || "",
          xml: this.xhr.responseXML,
        };
        if (this.options.isSuccess.call(this, this.status))
          this.success(this.response.text, this.response.xml);
        else this.failure();
      },

      isSuccess: function () {
        var status = this.status;
        return status >= 200 && status < 300;
      },

      isRunning: function () {
        return !!this.running;
      },

      processScripts: function (text) {
        if (
          this.options.evalResponse ||
          /(ecma|java)script/.test(this.getHeader("Content-type"))
        )
          return Browser.exec(text);
        return text.stripScripts(this.options.evalScripts);
      },

      success: function (text, xml) {
        this.onSuccess(this.processScripts(text), xml);
        this.resolve({ text: text, xml: xml });
      },

      onSuccess: function () {
        this.fireEvent("complete", arguments)
          .fireEvent("success", arguments)
          .callChain();
      },

      failure: function () {
        this.onFailure();
        this.reject({ reason: "failure", xhr: this.xhr });
      },

      onFailure: function () {
        this.fireEvent("complete").fireEvent("failure", this.xhr);
      },

      loadstart: function (event) {
        this.fireEvent("loadstart", [event, this.xhr]);
      },

      progress: function (event) {
        this.fireEvent("progress", [event, this.xhr]);
      },

      timeout: function () {
        this.fireEvent("timeout", this.xhr);
        this.reject({ reason: "timeout", xhr: this.xhr });
      },

      setHeader: function (name, value) {
        this.headers[name] = value;
        return this;
      },

      getHeader: function (name) {
        return Function.attempt(
          function () {
            return this.xhr.getResponseHeader(name);
          }.bind(this)
        );
      },

      check: function () {
        if (!this.running) return true;
        switch (this.options.link) {
          case "cancel":
            this.cancel();
            return true;
          case "chain":
            this.chain(this.caller.pass(arguments, this));
            return false;
        }
        return false;
      },

      send: function (options) {
        if (!this.check(options)) return this;

        this.options.isSuccess = this.options.isSuccess || this.isSuccess;
        this.running = true;

        var type = typeOf(options);
        if (type == "string" || type == "element") options = { data: options };

        var old = this.options;
        options = Object.append(
          { data: old.data, url: old.url, method: old.method },
          options
        );
        var data = options.data,
          url = String(options.url),
          method = options.method.toLowerCase();

        switch (typeOf(data)) {
          case "element":
            data = document.id(data).toQueryString();
            break;
          case "object":
          case "hash":
            data = Object.toQueryString(data);
        }

        if (this.options.format) {
          var format = "format=" + this.options.format;
          data = data ? format + "&" + data : format;
        }

        if (this.options.emulation && !["get", "post"].contains(method)) {
          var _method = "_method=" + method;
          data = data ? _method + "&" + data : _method;
          method = "post";
        }

        if (this.options.urlEncoded && ["post", "put"].contains(method)) {
          var encoding = this.options.encoding
            ? "; charset=" + this.options.encoding
            : "";
          this.headers["Content-type"] =
            "application/x-www-form-urlencoded" + encoding;
        }

        if (!url) url = document.location.pathname;

        var trimPosition = url.lastIndexOf("/");
        if (trimPosition > -1 && (trimPosition = url.indexOf("#")) > -1)
          url = url.substr(0, trimPosition);

        if (this.options.noCache)
          url += (url.indexOf("?") > -1 ? "&" : "?") + String.uniqueID();

        if (data && (method == "get" || method == "delete")) {
          url += (url.indexOf("?") > -1 ? "&" : "?") + data;
          data = null;
        }

        var xhr = this.xhr;
        if (progressSupport) {
          xhr.onloadstart = this.loadstart.bind(this);
          xhr.onprogress = this.progress.bind(this);
        }

        xhr.open(
          method.toUpperCase(),
          url,
          this.options.async,
          this.options.user,
          this.options.password
        );
        if (this.options.withCredentials && "withCredentials" in xhr)
          xhr.withCredentials = true;

        xhr.onreadystatechange = this.onStateChange.bind(this);

        Object.each(
          this.headers,
          function (value, key) {
            try {
              xhr.setRequestHeader(key, value);
            } catch (e) {
              this.fireEvent("exception", [key, value]);
              this.reject({ reason: "exception", xhr: xhr, exception: e });
            }
          },
          this
        );

        if (this.getThenableState() !== "pending") {
          this.resetThenable({ reason: "send" });
        }
        this.fireEvent("request");
        xhr.send(data);
        if (!this.options.async) this.onStateChange();
        else if (this.options.timeout)
          this.timer = this.timeout.delay(this.options.timeout, this);
        return this;
      },

      cancel: function () {
        if (!this.running) return this;
        this.running = false;
        var xhr = this.xhr;
        xhr.abort();
        if (this.timer) {
          clearTimeout(this.timer);
          delete this.timer;
        }
        xhr.onreadystatechange = empty;
        if (progressSupport) xhr.onprogress = xhr.onloadstart = empty;
        this.xhr = new Browser.Request();
        this.fireEvent("cancel");
        this.reject({ reason: "cancel", xhr: xhr });
        return this;
      },
    }));

    var methods = {};
    [
      "get",
      "post",
      "put",
      "delete",
      "patch",
      "head",
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "HEAD",
    ].each(function (method) {
      methods[method] = function (data) {
        var object = {
          method: method,
        };
        if (data != null) object.data = data;
        return this.send(object);
      };
    });

    Request.implement(methods);

    Element.Properties.send = {
      set: function (options) {
        var send = this.get("send").cancel();
        send.setOptions(options);
        return this;
      },

      get: function () {
        var send = this.retrieve("send");
        if (!send) {
          send = new Request({
            data: this,
            link: "cancel",
            method: this.get("method") || "post",
            url: this.get("action"),
          });
          this.store("send", send);
        }
        return send;
      },
    };

    Element.implement({
      send: function (url) {
        var sender = this.get("send");
        sender.send({ data: this, url: url || sender.options.url });
        return this;
      },
    });
  })();

  Request.HTML = new Class({
    Extends: Request,

    options: {
      update: false,
      append: false,
      evalScripts: true,
      filter: false,
      headers: {
        Accept: "text/html, application/xml, text/xml, */*",
      },
    },

    success: function (text) {
      var options = this.options,
        response = this.response;

      response.html = text.stripScripts(function (script) {
        response.javascript = script;
      });

      var match = response.html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (match) response.html = match[1];
      var temp = new Element("div").set("html", response.html);

      response.tree = temp.childNodes;
      response.elements = temp.getElements(options.filter || "*");

      if (options.filter) response.tree = response.elements;
      if (options.update) {
        var update = document.id(options.update).empty();
        if (options.filter) update.adopt(response.elements);
        else update.set("html", response.html);
      } else if (options.append) {
        var append = document.id(options.append);
        if (options.filter) response.elements.reverse().inject(append);
        else append.adopt(temp.getChildren());
      }
      if (options.evalScripts) Browser.exec(response.javascript);

      this.onSuccess(
        response.tree,
        response.elements,
        response.html,
        response.javascript
      );
      this.resolve({
        tree: response.tree,
        elements: response.elements,
        html: response.html,
        javascript: response.javascript,
      });
    },
  });

  Element.Properties.load = {
    set: function (options) {
      var load = this.get("load").cancel();
      load.setOptions(options);
      return this;
    },

    get: function () {
      var load = this.retrieve("load");
      if (!load) {
        load = new Request.HTML({
          data: this,
          link: "cancel",
          update: this,
          method: "get",
        });
        this.store("load", load);
      }
      return load;
    },
  };

  Element.implement({
    load: function () {
      this.get("load").send(
        Array.link(arguments, { data: Type.isObject, url: Type.isString })
      );
      return this;
    },
  });

  if (typeof JSON == "undefined") this.JSON = {};

  (function () {
    var special = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    };

    var escape = function (chr) {
      return (
        special[chr] ||
        "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).slice(-4)
      );
    };

    JSON.validate = function (string) {
      string = string
        .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "");

      return /^[\],:{}\s]*$/.test(string);
    };

    JSON.encode = JSON.stringify
      ? function (obj) {
          return JSON.stringify(obj);
        }
      : function (obj) {
          if (obj && obj.toJSON) obj = obj.toJSON();

          switch (typeOf(obj)) {
            case "string":
              return '"' + obj.replace(/[\x00-\x1f\\"]/g, escape) + '"';
            case "array":
              return "[" + obj.map(JSON.encode).clean() + "]";
            case "object":
            case "hash":
              var string = [];
              Object.each(obj, function (value, key) {
                var json = JSON.encode(value);
                if (json) string.push(JSON.encode(key) + ":" + json);
              });
              return "{" + string + "}";
            case "number":
            case "boolean":
              return "" + obj;
            case "null":
              return "null";
          }

          return null;
        };

    JSON.secure = true;

    JSON.decode = function (string, secure) {
      if (!string || typeOf(string) != "string") return null;

      if (secure == null) secure = JSON.secure;
      if (secure) {
        if (JSON.parse) return JSON.parse(string);
        if (!JSON.validate(string))
          throw new Error(
            "JSON could not decode the input; security is enabled and the value is not secure."
          );
      }

      return eval("(" + string + ")");
    };
  })();

  Request.JSON = new Class({
    Extends: Request,

    options: {
      secure: true,
    },

    initialize: function (options) {
      this.parent(options);
      Object.append(this.headers, {
        Accept: "application/json",
        "X-Request": "JSON",
      });
    },

    success: function (text) {
      var json;
      try {
        json = this.response.json = JSON.decode(text, this.options.secure);
      } catch (error) {
        this.fireEvent("error", [text, error]);
        return;
      }
      if (json == null) {
        this.failure();
      } else {
        this.onSuccess(json, text);
        this.resolve({ json: json, text: text });
      }
    },
  });

  var Cookie = new Class({
    Implements: Options,

    options: {
      path: "/",
      domain: false,
      duration: false,
      secure: false,
      document: document,
      encode: true,
      httpOnly: false,
    },

    initialize: function (key, options) {
      this.key = key;
      this.setOptions(options);
    },

    write: function (value) {
      if (this.options.encode) value = encodeURIComponent(value);
      if (this.options.domain) value += "; domain=" + this.options.domain;
      if (this.options.path) value += "; path=" + this.options.path;
      if (this.options.duration) {
        var date = new Date();
        date.setTime(
          date.getTime() + this.options.duration * 24 * 60 * 60 * 1000
        );
        value += "; expires=" + date.toGMTString();
      }
      if (this.options.secure) value += "; secure";
      if (this.options.httpOnly) value += "; HttpOnly";
      this.options.document.cookie = this.key + "=" + value;
      return this;
    },

    read: function () {
      var value = this.options.document.cookie.match(
        "(?:^|;)\\s*" + this.key.escapeRegExp() + "=([^;]*)"
      );
      return value ? decodeURIComponent(value[1]) : null;
    },

    dispose: function () {
      new Cookie(
        this.key,
        Object.merge({}, this.options, { duration: -1 })
      ).write("");
      return this;
    },
  });

  Cookie.write = function (key, value, options) {
    return new Cookie(key, options).write(value);
  };

  Cookie.read = function (key) {
    return new Cookie(key).read();
  };

  Cookie.dispose = function (key, options) {
    return new Cookie(key, options).dispose();
  };

  (function (window, document) {
    var ready,
      loaded,
      checks = [],
      shouldPoll,
      timer,
      testElement = document.createElement("div");

    var domready = function () {
      clearTimeout(timer);
      if (!ready) {
        Browser.loaded = ready = true;
        document
          .removeListener("DOMContentLoaded", domready)
          .removeListener("readystatechange", check);
        document.fireEvent("domready");
        window.fireEvent("domready");
      }

      document = window = testElement = null;
    };

    var check = function () {
      for (var i = checks.length; i--; )
        if (checks[i]()) {
          domready();
          return true;
        }
      return false;
    };

    var poll = function () {
      clearTimeout(timer);
      if (!check()) timer = setTimeout(poll, 10);
    };

    document.addListener("DOMContentLoaded", domready);

    /*<ltIE8>*/

    var doScrollWorks = function () {
      try {
        testElement.doScroll();
        return true;
      } catch (e) {}
      return false;
    };

    if (testElement.doScroll && !doScrollWorks()) {
      checks.push(doScrollWorks);
      shouldPoll = true;
    }
    /*</ltIE8>*/

    if (document.readyState)
      checks.push(function () {
        var state = document.readyState;
        return state == "loaded" || state == "complete";
      });

    if ("onreadystatechange" in document)
      document.addListener("readystatechange", check);
    else shouldPoll = true;

    if (shouldPoll) poll();

    Element.Events.domready = {
      onAdd: function (fn) {
        if (ready) fn.call(this);
      },
    };

    Element.Events.load = {
      base: "load",
      onAdd: function (fn) {
        if (loaded && this == window) fn.call(this);
      },
      condition: function () {
        if (this == window) {
          domready();
          delete Element.Events.load;
        }
        return true;
      },
    };

    window.addEvent("load", function () {
      loaded = true;
    });
  })(window, document);
}
