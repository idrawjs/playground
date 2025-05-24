var iDraw = function(exports) {
  "use strict";var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  var _core, _opts, _store, _historyHandler, _iDraw_instances, init_fn, setFeature_fn;
  function compose(middleware) {
    return function(context, next) {
      return dispatch(0);
      function dispatch(i) {
        let fn = middleware[i];
        if (i === middleware.length && next) {
          fn = next;
        }
        if (!fn)
          return Promise.resolve();
        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
        } catch (err) {
          return Promise.reject(err);
        }
      }
    };
  }
  function delay(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
  function throttle(fn, timeout) {
    let timer = -1;
    return function(...args) {
      if (timer >= 0) {
        return;
      }
      timer = setTimeout(() => {
        fn(...args);
        timer = -1;
      }, timeout);
    };
  }
  function debounce(fn, timeout) {
    let timer = -1;
    return function(...args) {
      if (timer >= 0) {
        window.clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
        timer = -1;
      }, timeout);
    };
  }
  function downloadImageFromCanvas(canvas, opts) {
    const { fileName, type = "image/jpeg" } = opts;
    const stream = canvas.toDataURL(type);
    let downloadLink = document.createElement("a");
    downloadLink.href = stream;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink = null;
  }
  function pickFile(opts) {
    const { accept, success, error } = opts;
    let input = document.createElement("input");
    input.type = "file";
    if (accept) {
      input.accept = accept;
    }
    input.addEventListener("change", function() {
      var _a;
      const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
      success({
        file
      });
      input = null;
    });
    input.addEventListener("error", function(err) {
      if (typeof error === "function") {
        error(err);
      }
      input = null;
    });
    input.click();
  }
  function parseFileToBase64(file) {
    return new Promise(function(resolve, reject) {
      let reader = new FileReader();
      reader.addEventListener("load", function() {
        resolve(reader.result);
        reader = null;
      });
      reader.addEventListener("error", function(err) {
        reject(err);
        reader = null;
      });
      reader.addEventListener("abort", function() {
        reject(new Error("abort"));
        reader = null;
      });
      reader.readAsDataURL(file);
    });
  }
  function parseFileToText(file) {
    return new Promise(function(resolve, reject) {
      let reader = new FileReader();
      reader.addEventListener("load", function() {
        resolve(reader.result);
        reader = null;
      });
      reader.addEventListener("error", function(err) {
        reject(err);
        reader = null;
      });
      reader.addEventListener("abort", function() {
        reject(new Error("abort"));
        reader = null;
      });
      reader.readAsText(file);
    });
  }
  function parseTextToBlobURL(text2) {
    const bytes = new TextEncoder().encode(text2);
    const blob = new Blob([bytes], {
      type: "text/plain;charset=utf-8"
    });
    const blobURL = window.URL.createObjectURL(blob);
    return blobURL;
  }
  function downloadFileFromText(text2, opts) {
    const { fileName } = opts;
    const blobURL = parseTextToBlobURL(text2);
    let downloadLink = document.createElement("a");
    downloadLink.href = blobURL;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink = null;
  }
  function toColorHexNum(color2) {
    return parseInt(color2.replace(/^#/, "0x"));
  }
  function toColorHexStr(color2) {
    return "#" + color2.toString(16);
  }
  function isColorStr(color2) {
    return typeof color2 === "string" && (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color2) || /^[a-z]{1,}$/i.test(color2));
  }
  const colorNameMap = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    "indianred ": "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  function colorNameToHex(name) {
    const n = name.toLowerCase();
    const hex = colorNameMap[n];
    if (typeof hex === "string") {
      return hex;
    }
    return null;
  }
  function colorToCSS(color2) {
    let css = "transparent";
    if (typeof color2 === "string") {
      css = color2;
    } else if ((color2 === null || color2 === void 0 ? void 0 : color2.stops.length) === 1) {
      css = color2.stops[0].color;
    } else if ((color2 === null || color2 === void 0 ? void 0 : color2.type) === "linear-gradient") {
      const items = [];
      if (typeof color2.angle === "number") {
        items.push(`${color2.angle}deg`);
      } else {
        items.push(`180deg`);
      }
      if (Array.isArray(color2.stops)) {
        color2.stops.forEach((stop) => {
          items.push(`${stop.color} ${stop.offset * 100}%`);
        });
      }
      css = `linear-gradient(${items.join(", ")})`;
    } else if ((color2 === null || color2 === void 0 ? void 0 : color2.type) === "radial-gradient") {
      const items = [];
      if (Array.isArray(color2.stops)) {
        color2.stops.forEach((stop) => {
          items.push(`${stop.color} ${stop.offset * 100}%`);
        });
      }
      css = `radial-gradient(circle, ${items.join(", ")})`;
    }
    return css;
  }
  function colorToLinearGradientCSS(color2) {
    let css = "transparent";
    if (typeof color2 === "string") {
      css = color2;
    } else if ((color2 === null || color2 === void 0 ? void 0 : color2.type) === "radial-gradient" || (color2 === null || color2 === void 0 ? void 0 : color2.type) === "linear-gradient") {
      const items = [];
      if (Array.isArray(color2.stops) && color2.stops.length > 0) {
        color2.stops.forEach((stop, i) => {
          items.push(`${stop.color} ${stop.offset * 100}%`);
          if (i === color2.stops.length - 1 && stop.offset < 1) {
            items.push(`${stop.color} ${stop.offset * 100}%`);
          }
        });
        css = `linear-gradient(90deg, ${items.join(", ")})`;
      }
    }
    return css;
  }
  function mergeHexColorAlpha(hex, alpha) {
    if (alpha === 1) {
      return hex;
    }
    let hexAlpha = 1;
    const regHex1 = /^#[0-9a-f]{6,6}$/i;
    const regHex2 = /^#[0-9a-f]{8,8}$/i;
    let result = hex;
    if (regHex1.test(hex)) {
      hexAlpha = parseInt(hex.substring(5, 7).replace(/^#/, "0x"));
    } else if (regHex2.test(hex)) {
      hexAlpha = parseInt(hex.substring(7, 9).replace(/^#/, "0x"));
      result = hex.substring(0, 7);
    }
    hexAlpha = hexAlpha * alpha;
    if (regHex1.test(result) && hexAlpha > 0 && hexAlpha < 1) {
      const aHexNum = Math.max(0, Math.min(255, Math.ceil(hexAlpha * 256)));
      result = `${result.toUpperCase()}${aHexNum.toString(16).toUpperCase()}`;
    }
    return result;
  }
  function createUUID() {
    function _createStr() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return `${_createStr()}${_createStr()}-${_createStr()}-${_createStr()}-${_createStr()}-${_createStr()}${_createStr()}${_createStr()}`;
  }
  function limitHexStr(str, seed) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      count += str.charCodeAt(i);
    }
    return (count + seed).toString(16).substring(0, 4);
  }
  function sumCharCodes(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
    }
    return sum;
  }
  function createAssetId(assetStr, elemUUID) {
    const len = assetStr.length;
    const seed = sumCharCodes(elemUUID);
    const mid = Math.floor(len / 2);
    const start4 = assetStr.substring(0, 4).padStart(4, "0");
    const end4 = assetStr.substring(0, 4).padStart(4, "0");
    const str1 = limitHexStr(len.toString(16).padStart(4, start4), seed).padStart(4, "0");
    const str2 = limitHexStr(assetStr.substring(mid - 4, mid).padStart(4, start4), seed).padStart(4, "0");
    const str3 = limitHexStr(assetStr.substring(mid - 8, mid - 4).padStart(4, start4), seed).padStart(4, "0");
    const str4 = limitHexStr(assetStr.substring(mid - 12, mid - 8).padStart(4, start4), seed).padStart(4, "0");
    const str5 = limitHexStr(assetStr.substring(mid - 16, mid - 12).padStart(4, end4), seed).padStart(4, "0");
    const str6 = limitHexStr(assetStr.substring(mid, mid + 4).padStart(4, end4), seed).padStart(4, "0");
    const str7 = limitHexStr(assetStr.substring(mid + 4, mid + 8).padStart(4, end4), seed).padStart(4, "0");
    const str8 = limitHexStr(end4.padStart(4, start4).padStart(4, end4), seed);
    return `@assets/${str1}${str2}-${str3}-${str4}-${str5}-${str6}${str7}${str8}`;
  }
  function isAssetId(id) {
    return /^@assets\/[0-9a-z-]{0,}$/.test(`${id}`);
  }
  var __rest$4 = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  function deepClone(target) {
    function _clone(t) {
      const type = is$1(t);
      if (["Null", "Number", "String", "Boolean", "Undefined"].indexOf(type) >= 0) {
        return t;
      } else if (type === "Array") {
        const arr = [];
        t.forEach((item) => {
          arr.push(_clone(item));
        });
        return arr;
      } else if (type === "Object") {
        const obj = {};
        const keys = Object.keys(t);
        keys.forEach((key2) => {
          obj[key2] = _clone(t[key2]);
        });
        const symbolKeys = Object.getOwnPropertySymbols(t);
        symbolKeys.forEach((key2) => {
          obj[key2] = _clone(t[key2]);
        });
        return obj;
      }
    }
    return _clone(target);
  }
  function deepCloneElement(element) {
    const elem = deepClone(element);
    const _resetUUID = (e) => {
      e.uuid = createUUID();
      if (e.type === "group" && e.detail.children) {
        e.detail.children.forEach((child) => {
          _resetUUID(child);
        });
      }
    };
    _resetUUID(elem);
    return elem;
  }
  function deepCloneData(data) {
    const { elements } = data, restData = __rest$4(data, ["elements"]);
    return Object.assign(Object.assign({}, deepClone(restData)), {
      elements: elements.map((elem) => deepCloneElement(elem))
    });
  }
  function is$1(target) {
    return Object.prototype.toString.call(target).replace(/[\]|\[]{1,1}/gi, "").split(" ")[1];
  }
  function sortDataAsserts(data, opts) {
    const assets = data.assets || {};
    let sortedData = data;
    if ((opts === null || opts === void 0 ? void 0 : opts.clone) === true) {
      sortedData = deepClone(data);
    }
    const _scanElements = (elems) => {
      elems.forEach((elem) => {
        if (elem.type === "image" && elem.detail.src) {
          const src = elem.detail.src;
          const assetUUID = createAssetId(src, elem.uuid);
          if (!assets[assetUUID]) {
            assets[assetUUID] = {
              type: "image",
              value: src
            };
          }
          elem.detail.src = assetUUID;
        } else if (elem.type === "svg") {
          const svg2 = elem.detail.svg;
          const assetUUID = createAssetId(svg2, elem.uuid);
          if (!assets[assetUUID]) {
            assets[assetUUID] = {
              type: "svg",
              value: svg2
            };
          }
          elem.detail.svg = assetUUID;
        } else if (elem.type === "html") {
          const html2 = elem.detail.html;
          const assetUUID = createAssetId(html2, elem.uuid);
          if (!assets[assetUUID]) {
            assets[assetUUID] = {
              type: "html",
              value: html2
            };
          }
          elem.detail.html = assetUUID;
        } else if (elem.type === "group" && Array.isArray(elem.detail.children)) {
          const groupAssets = elem.detail.assets || {};
          Object.keys(groupAssets).forEach((assetId) => {
            if (!assets[assetId]) {
              assets[assetId] = groupAssets[assetId];
            }
          });
          delete elem.detail.assets;
          _scanElements(elem.detail.children);
        }
      });
    };
    _scanElements(sortedData.elements);
    sortedData.assets = assets;
    return sortedData;
  }
  function filterCompactData(data, opts) {
    const assets = data.assets || {};
    const sortedData = deepClone(data);
    const loadItemMap = (opts === null || opts === void 0 ? void 0 : opts.loadItemMap) || {};
    const _scanElements = (elems) => {
      elems.forEach((elem) => {
        var _a, _b, _c;
        if (elem.type === "image" && elem.detail.src) {
          const src = elem.detail.src;
          if (isAssetId(src) && !assets[src] && loadItemMap[src] && typeof ((_a = loadItemMap[src]) === null || _a === void 0 ? void 0 : _a.source) === "string") {
            assets[src] = {
              type: "image",
              value: loadItemMap[src].source
            };
          } else if (!assets[src]) {
            const assetUUID = createAssetId(src, elem.uuid);
            if (!assets[assetUUID]) {
              assets[assetUUID] = {
                type: "image",
                value: src
              };
            }
            elem.detail.src = assetUUID;
          }
        } else if (elem.type === "svg") {
          const svg2 = elem.detail.svg;
          if (isAssetId(svg2) && !assets[svg2] && loadItemMap[svg2] && typeof ((_b = loadItemMap[svg2]) === null || _b === void 0 ? void 0 : _b.source) === "string") {
            assets[svg2] = {
              type: "svg",
              value: loadItemMap[svg2].source
            };
          } else if (!assets[svg2]) {
            const assetUUID = createAssetId(svg2, elem.uuid);
            if (!assets[assetUUID]) {
              assets[assetUUID] = {
                type: "svg",
                value: svg2
              };
            }
            elem.detail.svg = assetUUID;
          }
        } else if (elem.type === "html") {
          const html2 = elem.detail.html;
          if (isAssetId(html2) && !assets[html2] && loadItemMap[html2] && typeof ((_c = loadItemMap[html2]) === null || _c === void 0 ? void 0 : _c.source) === "string") {
            assets[html2] = {
              type: "html",
              value: loadItemMap[html2].source
            };
          } else if (!assets[html2]) {
            const assetUUID = createAssetId(html2, elem.uuid);
            if (!assets[assetUUID]) {
              assets[assetUUID] = {
                type: "html",
                value: html2
              };
            }
            elem.detail.html = assetUUID;
          }
        } else if (elem.type === "group" && Array.isArray(elem.detail.children)) {
          const groupAssets = elem.detail.assets || {};
          Object.keys(groupAssets).forEach((assetId) => {
            if (!assets[assetId]) {
              assets[assetId] = groupAssets[assetId];
            }
          });
          delete elem.detail.assets;
          _scanElements(elem.detail.children);
        }
      });
    };
    _scanElements(sortedData.elements);
    sortedData.assets = assets;
    return sortedData;
  }
  function parsePrototype(data) {
    const typeStr = Object.prototype.toString.call(data) || "";
    const result = typeStr.replace(/(\[object|\])/gi, "").trim();
    return result;
  }
  const istype = {
    type(data, lowerCase) {
      const result = parsePrototype(data);
      return lowerCase === true ? result.toLocaleLowerCase() : result;
    },
    array(data) {
      return parsePrototype(data) === "Array";
    },
    json(data) {
      return parsePrototype(data) === "Object";
    },
    function(data) {
      return parsePrototype(data) === "Function";
    },
    asyncFunction(data) {
      return parsePrototype(data) === "AsyncFunction";
    },
    boolean(data) {
      return parsePrototype(data) === "Boolean";
    },
    string(data) {
      return parsePrototype(data) === "String";
    },
    number(data) {
      return parsePrototype(data) === "Number";
    },
    undefined(data) {
      return parsePrototype(data) === "Undefined";
    },
    null(data) {
      return parsePrototype(data) === "Null";
    },
    promise(data) {
      return parsePrototype(data) === "Promise";
    }
  };
  function parseHTMLToDataURL(html2, opts) {
    const { width, height } = opts;
    return new Promise((resolve, reject) => {
      const _svg = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${width || ""}" 
      height = "${height || ""}">
      <foreignObject width="100%" height="100%">
        <div xmlns = "http://www.w3.org/1999/xhtml">
          ${html2}
        </div>
      </foreignObject>
    </svg>
    `;
      const blob = new Blob([_svg], { type: "image/svg+xml;charset=utf-8" });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        var _a;
        const base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
        resolve(base64);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }
  function parseSVGToDataURL(svg2) {
    return new Promise((resolve, reject) => {
      const _svg = svg2;
      const blob = new Blob([_svg], { type: "image/svg+xml;charset=utf-8" });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        var _a;
        const base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
        resolve(base64);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }
  var __awaiter$1 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  const { Image: Image$1 } = window;
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image$1();
      img.crossOrigin = "anonymous";
      img.onload = function() {
        resolve(img);
      };
      img.onabort = reject;
      img.onerror = reject;
      img.src = src;
    });
  }
  function loadSVG(svg2) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const dataURL = yield parseSVGToDataURL(svg2);
      const image = yield loadImage(dataURL);
      return image;
    });
  }
  function filterAmpersand(str) {
    return str.replace(/\&/gi, "&amp;");
  }
  function loadHTML(html2, opts) {
    return __awaiter$1(this, void 0, void 0, function* () {
      html2 = filterAmpersand(html2);
      const dataURL = yield parseHTMLToDataURL(html2, opts);
      const image = yield loadImage(dataURL);
      return image;
    });
  }
  function positiveNum(value) {
    return typeof value === "number" && value >= 0;
  }
  function number(value) {
    return typeof value === "number" && (value > 0 || value <= 0);
  }
  function x(value) {
    return number(value);
  }
  function y(value) {
    return number(value);
  }
  function w(value) {
    return positiveNum(value);
  }
  function h(value) {
    return positiveNum(value);
  }
  function angle(value) {
    return typeof value === "number" && value >= -360 && value <= 360;
  }
  function borderWidth(value) {
    return positiveNum(value) || Array.isArray(value) && positiveNum(value[0]) && positiveNum(value[1]) && positiveNum(value[2]) && positiveNum(value[3]);
  }
  function borderRadius(value) {
    return positiveNum(value) || Array.isArray(value) && positiveNum(value[0]) && positiveNum(value[1]) && positiveNum(value[2]) && positiveNum(value[3]);
  }
  function color(value) {
    return isColorStr(value);
  }
  function imageURL(value) {
    return typeof value === "string" && /^(http:\/\/|https:\/\/|\.\/|\/)/.test(`${value}`);
  }
  function imageBase64(value) {
    return typeof value === "string" && /^(data:image\/)/.test(`${value}`);
  }
  function imageSrc(value) {
    return imageBase64(value) || imageURL(value);
  }
  function svg(value) {
    return typeof value === "string" && /^(<svg[\s]{1,}|<svg>)/i.test(`${value}`.trim()) && /<\/[\s]{0,}svg>$/i.test(`${value}`.trim());
  }
  function html(value) {
    let result = false;
    if (typeof value === "string") {
      let div = document.createElement("div");
      div.innerHTML = value;
      if (div.children.length > 0) {
        result = true;
      }
      div = null;
    }
    return result;
  }
  function text(value) {
    return typeof value === "string";
  }
  function fontSize$1(value) {
    return number(value) && value > 0;
  }
  function lineHeight(value) {
    return number(value) && value > 0;
  }
  function strokeWidth(value) {
    return number(value) && value > 0;
  }
  function textAlign(value) {
    return ["center", "left", "right"].includes(value);
  }
  function fontFamily$2(value) {
    return typeof value === "string" && value.length > 0;
  }
  function fontWeight$1(value) {
    return ["bold"].includes(value);
  }
  function numberStr(value) {
    return /^(-?\d+(?:\.\d+)?)$/.test(`${value}`);
  }
  const is = {
    positiveNum,
    x,
    y,
    w,
    h,
    angle,
    number,
    numberStr,
    borderWidth,
    borderRadius,
    color,
    imageSrc,
    imageURL,
    imageBase64,
    svg,
    html,
    text,
    fontSize: fontSize$1,
    lineHeight,
    textAlign,
    fontFamily: fontFamily$2,
    fontWeight: fontWeight$1,
    strokeWidth
  };
  function attrs(attrs2) {
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = attrs2;
    if (!(is.x(x2) && is.y(y2) && is.w(w2) && is.h(h2) && is.angle(angle2))) {
      return false;
    }
    if (!(angle2 >= -360 && angle2 <= 360)) {
      return false;
    }
    return true;
  }
  function box(detail = {}) {
    const { borderColor: borderColor2, borderRadius: borderRadius2, borderWidth: borderWidth2 } = detail;
    if (Object.prototype.hasOwnProperty.call(detail, "borderColor") && !is.color(borderColor2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "borderRadius") && !is.number(borderRadius2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "borderWidth") && !is.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function rectDesc(detail) {
    const { background: background2 } = detail;
    if (Object.prototype.hasOwnProperty.call(detail, "background") && !is.color(background2)) {
      return false;
    }
    if (!box(detail)) {
      return false;
    }
    return true;
  }
  function circleDesc(detail) {
    const { background: background2, borderColor: borderColor2, borderWidth: borderWidth2 } = detail;
    if (Object.prototype.hasOwnProperty.call(detail, "background") && !is.color(background2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "borderColor") && !is.color(borderColor2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "borderWidth") && !is.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function imageDesc(detail) {
    const { src } = detail;
    if (!is.imageSrc(src)) {
      return false;
    }
    return true;
  }
  function svgDesc(detail) {
    const { svg: svg2 } = detail;
    if (!is.svg(svg2)) {
      return false;
    }
    return true;
  }
  function htmlDesc(detail) {
    const { html: html2 } = detail;
    if (!is.html(html2)) {
      return false;
    }
    return true;
  }
  function textDesc(detail) {
    const { text: text2, color: color2, fontSize: fontSize2, lineHeight: lineHeight2, fontFamily: fontFamily2, textAlign: textAlign2, fontWeight: fontWeight2, background: background2, strokeWidth: strokeWidth2, strokeColor } = detail;
    if (!is.text(text2)) {
      return false;
    }
    if (!is.color(color2)) {
      return false;
    }
    if (!is.fontSize(fontSize2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "background") && !is.color(background2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "fontWeight") && !is.fontWeight(fontWeight2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "lineHeight") && !is.lineHeight(lineHeight2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "fontFamily") && !is.fontFamily(fontFamily2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "textAlign") && !is.textAlign(textAlign2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "strokeWidth") && !is.strokeWidth(strokeWidth2)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(detail, "strokeColor") && !is.color(strokeColor)) {
      return false;
    }
    if (!box(detail)) {
      return false;
    }
    return true;
  }
  const check = {
    attrs,
    textDesc,
    rectDesc,
    circleDesc,
    imageDesc,
    svgDesc,
    htmlDesc
  };
  var __classPrivateFieldSet$b = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$b = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Context2D_ctx, _Context2D_opts;
  const defaultFontSize = 12;
  const defaultFontWeight = "400";
  const defaultFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;
  class Context2D {
    constructor(ctx, opts) {
      _Context2D_ctx.set(this, void 0);
      _Context2D_opts.set(this, void 0);
      __classPrivateFieldSet$b(this, _Context2D_ctx, ctx, "f");
      __classPrivateFieldSet$b(this, _Context2D_opts, Object.assign({ devicePixelRatio: 1, offscreenCanvas: null }, opts), "f");
      this.$resetFont();
    }
    $undoPixelRatio(num) {
      return num / __classPrivateFieldGet$b(this, _Context2D_opts, "f").devicePixelRatio;
    }
    $doPixelRatio(num) {
      return __classPrivateFieldGet$b(this, _Context2D_opts, "f").devicePixelRatio * num;
    }
    $getContext() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f");
    }
    $setContext(ctx) {
      __classPrivateFieldSet$b(this, _Context2D_ctx, ctx, "f");
    }
    $setFont(opts) {
      const strList = [];
      if (opts.fontWeight) {
        strList.push(`${opts.fontWeight}`);
      }
      strList.push(`${this.$doPixelRatio(opts.fontSize || 12)}px`);
      strList.push(`${opts.fontFamily || "sans-serif"}`);
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").font = `${strList.join(" ")}`;
    }
    $resetFont() {
      this.$setFont({
        fontSize: defaultFontSize,
        fontFamily: defaultFontFamily,
        fontWeight: defaultFontWeight
      });
    }
    $getOffscreenCanvas() {
      return __classPrivateFieldGet$b(this, _Context2D_opts, "f").offscreenCanvas;
    }
    $resize(opts) {
      const { width, height, devicePixelRatio, resetStyle } = opts;
      const { canvas } = __classPrivateFieldGet$b(this, _Context2D_ctx, "f");
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      __classPrivateFieldSet$b(this, _Context2D_opts, Object.assign(Object.assign({}, __classPrivateFieldGet$b(this, _Context2D_opts, "f")), {
        devicePixelRatio
      }), "f");
      if (resetStyle === true) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    }
    $getSize() {
      const { devicePixelRatio } = __classPrivateFieldGet$b(this, _Context2D_opts, "f");
      const { width, height } = __classPrivateFieldGet$b(this, _Context2D_ctx, "f").canvas;
      return {
        width: width / devicePixelRatio,
        height: height / devicePixelRatio,
        devicePixelRatio
      };
    }
    get canvas() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").canvas;
    }
    get fillStyle() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").fillStyle;
    }
    set fillStyle(value) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").fillStyle = value;
    }
    get strokeStyle() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").strokeStyle;
    }
    set strokeStyle(color2) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").strokeStyle = color2;
    }
    get lineWidth() {
      return this.$undoPixelRatio(__classPrivateFieldGet$b(this, _Context2D_ctx, "f").lineWidth);
    }
    set lineWidth(w2) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").lineWidth = this.$doPixelRatio(w2);
    }
    get textAlign() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").textAlign;
    }
    set textAlign(align) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").textAlign = align;
    }
    get textBaseline() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").textBaseline;
    }
    set textBaseline(baseline) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").textBaseline = baseline;
    }
    get globalAlpha() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").globalAlpha;
    }
    set globalAlpha(alpha) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").globalAlpha = alpha;
    }
    get shadowColor() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowColor;
    }
    set shadowColor(color2) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowColor = color2;
    }
    get shadowOffsetX() {
      return this.$undoPixelRatio(__classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowOffsetX);
    }
    set shadowOffsetX(offsetX) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowOffsetX = this.$doPixelRatio(offsetX);
    }
    get shadowOffsetY() {
      return this.$undoPixelRatio(__classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowOffsetY);
    }
    set shadowOffsetY(offsetY) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowOffsetY = this.$doPixelRatio(offsetY);
    }
    get shadowBlur() {
      return this.$undoPixelRatio(__classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowBlur);
    }
    set shadowBlur(blur) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").shadowBlur = this.$doPixelRatio(blur);
    }
    get lineCap() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").lineCap;
    }
    set lineCap(lineCap) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").lineCap = lineCap;
    }
    get globalCompositeOperation() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").globalCompositeOperation;
    }
    set globalCompositeOperation(operations) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").globalCompositeOperation = operations;
    }
    fill(...args) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").fill(...args);
    }
    arc(x2, y2, radius, startAngle, endAngle, anticlockwise) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").arc(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(radius), startAngle, endAngle, anticlockwise);
    }
    rect(x2, y2, w2, h2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").rect(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(w2), this.$doPixelRatio(h2));
    }
    fillRect(x2, y2, w2, h2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").fillRect(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(w2), this.$doPixelRatio(h2));
    }
    clearRect(x2, y2, w2, h2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").clearRect(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(w2), this.$doPixelRatio(h2));
    }
    beginPath() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").beginPath();
    }
    closePath() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").closePath();
    }
    lineTo(x2, y2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").lineTo(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    moveTo(x2, y2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").moveTo(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    arcTo(x1, y1, x2, y2, radius) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").arcTo(this.$doPixelRatio(x1), this.$doPixelRatio(y1), this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(radius));
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").bezierCurveTo(this.$doPixelRatio(cp1x), this.$doPixelRatio(cp1y), this.$doPixelRatio(cp2x), this.$doPixelRatio(cp2y), this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    quadraticCurveTo(cpx, cpy, x2, y2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").quadraticCurveTo(this.$doPixelRatio(cpx), this.$doPixelRatio(cpy), this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    getLineDash() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").getLineDash();
    }
    setLineDash(nums) {
      const dash = nums.map((n) => this.$doPixelRatio(n));
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").setLineDash(dash);
    }
    stroke(path) {
      return path ? __classPrivateFieldGet$b(this, _Context2D_ctx, "f").stroke(path) : __classPrivateFieldGet$b(this, _Context2D_ctx, "f").stroke();
    }
    translate(x2, y2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").translate(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    rotate(angle2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").rotate(angle2);
    }
    drawImage(...args) {
      const image = args[0];
      const sx = args[1];
      const sy = args[2];
      const sw = args[3];
      const sh = args[4];
      const dx = args[args.length - 4];
      const dy = args[args.length - 3];
      const dw = args[args.length - 2];
      const dh = args[args.length - 1];
      if (args.length === 9) {
        return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").drawImage(image, this.$doPixelRatio(sx), this.$doPixelRatio(sy), this.$doPixelRatio(sw), this.$doPixelRatio(sh), this.$doPixelRatio(dx), this.$doPixelRatio(dy), this.$doPixelRatio(dw), this.$doPixelRatio(dh));
      } else {
        return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").drawImage(image, this.$doPixelRatio(dx), this.$doPixelRatio(dy), this.$doPixelRatio(dw), this.$doPixelRatio(dh));
      }
    }
    createPattern(image, repetition) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").createPattern(image, repetition);
    }
    measureText(text2) {
      const textMetrics = __classPrivateFieldGet$b(this, _Context2D_ctx, "f").measureText(text2);
      return textMetrics;
    }
    fillText(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").fillText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(maxWidth));
      } else {
        return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").fillText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2));
      }
    }
    strokeText(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").strokeText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(maxWidth));
      } else {
        return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").strokeText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2));
      }
    }
    save() {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").save();
    }
    restore() {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").restore();
    }
    scale(ratioX, ratioY) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").scale(ratioX, ratioY);
    }
    circle(x2, y2, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
      __classPrivateFieldGet$b(this, _Context2D_ctx, "f").ellipse(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(radiusX), this.$doPixelRatio(radiusY), rotation, startAngle, endAngle, counterclockwise);
    }
    isPointInPath(x2, y2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").isPointInPath(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    clip(...args) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").clip(...args);
    }
    setTransform(a, b, c, d, e, f) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").setTransform(a, b, c, d, e, f);
    }
    getTransform() {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").getTransform();
    }
    createLinearGradient(x0, y0, x1, y1) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").createLinearGradient(this.$doPixelRatio(x0), this.$doPixelRatio(y0), this.$doPixelRatio(x1), this.$doPixelRatio(y1));
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").createRadialGradient(this.$doPixelRatio(x0), this.$doPixelRatio(y0), this.$doPixelRatio(r0), this.$doPixelRatio(x1), this.$doPixelRatio(y1), this.$doPixelRatio(r1));
    }
    createConicGradient(startAngle, x2, y2) {
      return __classPrivateFieldGet$b(this, _Context2D_ctx, "f").createConicGradient(startAngle, this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
  }
  _Context2D_ctx = /* @__PURE__ */ new WeakMap(), _Context2D_opts = /* @__PURE__ */ new WeakMap();
  function createContext2D(opts) {
    const { width, height, ctx, devicePixelRatio } = opts;
    let context = ctx;
    if (!context) {
      const canvas = document.createElement("canvas");
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      context = canvas.getContext("2d");
    }
    const context2d = new Context2D(context, opts);
    return context2d;
  }
  function createOffscreenContext2D(opts) {
    const { width, height, devicePixelRatio } = opts;
    const offCanvas = new OffscreenCanvas(width * devicePixelRatio, height * devicePixelRatio);
    const offRenderCtx = offCanvas.getContext("2d");
    const offCtx = offRenderCtx.canvas.getContext("2d");
    const context2d = new Context2D(offCtx, {
      devicePixelRatio,
      offscreenCanvas: offCanvas
    });
    return context2d;
  }
  function createBoardContent(canvas, opts) {
    const { width, height, devicePixelRatio } = opts;
    const ctxOpts = {
      width,
      height,
      devicePixelRatio
    };
    const ctx = canvas.getContext("2d");
    const viewContext = createOffscreenContext2D(ctxOpts);
    const overlayContext = createOffscreenContext2D(ctxOpts);
    const underlayContext = createOffscreenContext2D(ctxOpts);
    const boardContext = createContext2D(Object.assign({ ctx }, ctxOpts));
    const tempContext = createOffscreenContext2D(ctxOpts);
    const drawView = () => {
      const { width: w2, height: h2 } = viewContext.$getSize();
      boardContext.clearRect(0, 0, w2, h2);
      boardContext.drawImage(underlayContext.canvas, 0, 0, w2, h2);
      boardContext.drawImage(viewContext.canvas, 0, 0, w2, h2);
      boardContext.drawImage(overlayContext.canvas, 0, 0, w2, h2);
      underlayContext.clearRect(0, 0, w2, h2);
      viewContext.clearRect(0, 0, w2, h2);
      overlayContext.clearRect(0, 0, w2, h2);
    };
    const content = {
      underlayContext,
      viewContext,
      overlayContext,
      boardContext,
      tempContext,
      drawView
    };
    return content;
  }
  var __classPrivateFieldSet$a = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$a = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _EventEmitter_listeners;
  class EventEmitter {
    constructor() {
      _EventEmitter_listeners.set(this, void 0);
      __classPrivateFieldSet$a(this, _EventEmitter_listeners, /* @__PURE__ */ new Map(), "f");
    }
    on(eventKey, callback) {
      if (__classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").has(eventKey)) {
        const callbacks = __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").get(eventKey) || [];
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").set(eventKey, callbacks);
      } else {
        __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").set(eventKey, [callback]);
      }
    }
    off(eventKey, callback) {
      if (__classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").has(eventKey)) {
        const callbacks = __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").get(eventKey);
        if (Array.isArray(callbacks)) {
          for (let i = 0; i < (callbacks === null || callbacks === void 0 ? void 0 : callbacks.length); i++) {
            if (callbacks[i] === callback) {
              callbacks.splice(i, 1);
              break;
            }
          }
        }
        __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").set(eventKey, callbacks || []);
      }
    }
    trigger(eventKey, e) {
      const callbacks = __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach((cb) => {
          cb(e);
        });
        return true;
      } else {
        return false;
      }
    }
    has(name) {
      if (__classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").has(name)) {
        const list = __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").get(name);
        if (Array.isArray(list) && list.length > 0) {
          return true;
        }
      }
      return false;
    }
    destroy() {
      this.clear();
    }
    clear() {
      __classPrivateFieldGet$a(this, _EventEmitter_listeners, "f").clear();
    }
  }
  _EventEmitter_listeners = /* @__PURE__ */ new WeakMap();
  function calcDistance(start, end) {
    const distance = (start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y);
    return distance === 0 ? distance : Math.sqrt(distance);
  }
  function calcSpeed(start, end) {
    const distance = calcDistance(start, end);
    const speed = distance / Math.abs(end.t - start.t);
    return speed;
  }
  function equalPoint(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y && p1.t === p2.t;
  }
  function equalTouchPoint(p1, p2) {
    return equalPoint(p1, p2) === true && p1.f === p2.f;
  }
  function isNum(num) {
    return num >= 0 || num < 0;
  }
  function vaildPoint(p) {
    return isNum(p.x) && isNum(p.y) && p.t > 0;
  }
  function vaildTouchPoint(p) {
    return vaildPoint(p) === true && p.f >= 0;
  }
  function getCenterFromTwoPoints(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2
    };
  }
  var __classPrivateFieldSet$9 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$9 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Store_instances, _Store_temp, _Store_backUpDefaultStorage, _Store_static, _Store_createTempStorage;
  class Store {
    constructor(opts) {
      _Store_instances.add(this);
      _Store_temp.set(this, void 0);
      _Store_backUpDefaultStorage.set(this, void 0);
      _Store_static.set(this, void 0);
      __classPrivateFieldSet$9(this, _Store_backUpDefaultStorage, deepClone(opts.defaultStorage), "f");
      __classPrivateFieldSet$9(this, _Store_temp, __classPrivateFieldGet$9(this, _Store_instances, "m", _Store_createTempStorage).call(this), "f");
      __classPrivateFieldSet$9(this, _Store_static, opts.defaultStatic || {}, "f");
    }
    set(name, value) {
      __classPrivateFieldGet$9(this, _Store_temp, "f")[name] = value;
    }
    get(name) {
      return __classPrivateFieldGet$9(this, _Store_temp, "f")[name];
    }
    setStatic(name, value) {
      __classPrivateFieldGet$9(this, _Store_static, "f")[name] = value;
    }
    getStatic(name) {
      return __classPrivateFieldGet$9(this, _Store_static, "f")[name];
    }
    getSnapshot(opts) {
      if ((opts === null || opts === void 0 ? void 0 : opts.deepClone) === true) {
        return deepClone(__classPrivateFieldGet$9(this, _Store_temp, "f"));
      }
      return Object.assign({}, __classPrivateFieldGet$9(this, _Store_temp, "f"));
    }
    clear() {
      __classPrivateFieldSet$9(this, _Store_temp, __classPrivateFieldGet$9(this, _Store_instances, "m", _Store_createTempStorage).call(this), "f");
    }
    destroy() {
      __classPrivateFieldSet$9(this, _Store_temp, null, "f");
      __classPrivateFieldSet$9(this, _Store_static, null, "f");
    }
  }
  _Store_temp = /* @__PURE__ */ new WeakMap(), _Store_backUpDefaultStorage = /* @__PURE__ */ new WeakMap(), _Store_static = /* @__PURE__ */ new WeakMap(), _Store_instances = /* @__PURE__ */ new WeakSet(), _Store_createTempStorage = function _Store_createTempStorage2() {
    return deepClone(__classPrivateFieldGet$9(this, _Store_backUpDefaultStorage, "f"));
  };
  function getViewScaleInfoFromSnapshot(snapshot) {
    const { activeStore } = snapshot;
    const sacelInfo = {
      scale: activeStore === null || activeStore === void 0 ? void 0 : activeStore.scale,
      offsetTop: activeStore === null || activeStore === void 0 ? void 0 : activeStore.offsetTop,
      offsetBottom: activeStore === null || activeStore === void 0 ? void 0 : activeStore.offsetBottom,
      offsetLeft: activeStore === null || activeStore === void 0 ? void 0 : activeStore.offsetLeft,
      offsetRight: activeStore === null || activeStore === void 0 ? void 0 : activeStore.offsetRight
    };
    return sacelInfo;
  }
  function getViewSizeInfoFromSnapshot(snapshot) {
    const { activeStore } = snapshot;
    const sacelInfo = {
      devicePixelRatio: activeStore.devicePixelRatio,
      width: activeStore === null || activeStore === void 0 ? void 0 : activeStore.width,
      height: activeStore === null || activeStore === void 0 ? void 0 : activeStore.height,
      contextWidth: activeStore === null || activeStore === void 0 ? void 0 : activeStore.contextWidth,
      contextHeight: activeStore === null || activeStore === void 0 ? void 0 : activeStore.contextHeight
    };
    return sacelInfo;
  }
  function parseRadianToAngle(radian) {
    return radian / Math.PI * 180;
  }
  function parseAngleToRadian(angle2) {
    return angle2 / 180 * Math.PI;
  }
  function rotateByCenter(ctx, angle2, center, callback) {
    const radian = parseAngleToRadian(angle2 || 0);
    if (center && (radian > 0 || radian < 0)) {
      ctx.translate(center.x, center.y);
      ctx.rotate(radian);
      ctx.translate(-center.x, -center.y);
    }
    callback(ctx);
    if (center && (radian > 0 || radian < 0)) {
      ctx.translate(center.x, center.y);
      ctx.rotate(-radian);
      ctx.translate(-center.x, -center.y);
    }
  }
  function rotateElement$1(ctx, elemSize, callback) {
    const center = calcElementCenter(elemSize);
    rotateByCenter(ctx, elemSize.angle || 0, center, () => {
      callback(ctx);
    });
  }
  function calcElementCenter(elem) {
    const p = {
      x: elem.x + elem.w / 2,
      y: elem.y + elem.h / 2
    };
    return p;
  }
  function calcElementCenterFromVertexes(ves) {
    const startX = Math.min(ves[0].x, ves[1].x, ves[2].x, ves[3].x);
    const startY = Math.min(ves[0].y, ves[1].y, ves[2].y, ves[3].y);
    const endX = Math.max(ves[0].x, ves[1].x, ves[2].x, ves[3].x);
    const endY = Math.max(ves[0].y, ves[1].y, ves[2].y, ves[3].y);
    const elemSize = {
      x: startX,
      y: startY,
      w: endX - startX,
      h: endY - startY
    };
    return calcElementCenter(elemSize);
  }
  function calcRadian(center, start, end) {
    const startRadian = calcLineRadian(center, start);
    const endRadian = calcLineRadian(center, end);
    if (endRadian !== null && startRadian !== null) {
      return endRadian - startRadian;
    } else {
      return 0;
    }
  }
  function calcLineRadian(center, p) {
    const x2 = p.x - center.x;
    const y2 = p.y - center.y;
    if (x2 === 0) {
      if (y2 < 0) {
        return 0;
      } else if (y2 > 0) {
        return Math.PI;
      }
    } else if (y2 === 0) {
      if (x2 < 0) {
        return Math.PI * 3 / 2;
      } else if (x2 > 0) {
        return Math.PI / 2;
      }
    }
    if (x2 > 0 && y2 < 0) {
      return Math.atan(Math.abs(x2) / Math.abs(y2));
    } else if (x2 > 0 && y2 > 0) {
      return Math.PI - Math.atan(Math.abs(x2) / Math.abs(y2));
    } else if (x2 < 0 && y2 > 0) {
      return Math.PI + Math.atan(Math.abs(x2) / Math.abs(y2));
    } else if (x2 < 0 && y2 < 0) {
      return 2 * Math.PI - Math.atan(Math.abs(x2) / Math.abs(y2));
    }
    return 0;
  }
  function rotatePoint(center, start, radian) {
    const startRadian = calcLineRadian(center, start);
    const rotateRadian = radian;
    let endRadian = startRadian + rotateRadian;
    if (endRadian > Math.PI * 2) {
      endRadian = endRadian - Math.PI * 2;
    } else if (endRadian < 0 - Math.PI * 2) {
      endRadian = endRadian + Math.PI * 2;
    }
    if (endRadian < 0) {
      endRadian = endRadian + Math.PI * 2;
    }
    const length = calcDistance(center, start);
    let x2 = 0;
    let y2 = 0;
    if (endRadian === 0) {
      x2 = 0;
      y2 = 0 - length;
    } else if (endRadian > 0 && endRadian < Math.PI / 2) {
      x2 = Math.sin(endRadian) * length;
      y2 = 0 - Math.cos(endRadian) * length;
    } else if (endRadian === Math.PI / 2) {
      x2 = length;
      y2 = 0;
    } else if (endRadian > Math.PI / 2 && endRadian < Math.PI) {
      x2 = Math.sin(Math.PI - endRadian) * length;
      y2 = Math.cos(Math.PI - endRadian) * length;
    } else if (endRadian === Math.PI) {
      x2 = 0;
      y2 = length;
    } else if (endRadian > Math.PI && endRadian < 3 / 2 * Math.PI) {
      x2 = 0 - Math.sin(endRadian - Math.PI) * length;
      y2 = Math.cos(endRadian - Math.PI) * length;
    } else if (endRadian === 3 / 2 * Math.PI) {
      x2 = 0 - length;
      y2 = 0;
    } else if (endRadian > 3 / 2 * Math.PI && endRadian < 2 * Math.PI) {
      x2 = 0 - Math.sin(2 * Math.PI - endRadian) * length;
      y2 = 0 - Math.cos(2 * Math.PI - endRadian) * length;
    } else if (endRadian === 2 * Math.PI) {
      x2 = 0;
      y2 = 0 - length;
    }
    x2 += center.x;
    y2 += center.y;
    return { x: x2, y: y2 };
  }
  function rotatePointInGroup(point, groupQueue) {
    if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
      let resultX = point.x;
      let resultY = point.y;
      groupQueue.forEach((group) => {
        const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = group;
        const center = calcElementCenter({ x: x2, y: y2, w: w2, h: h2 });
        const temp = rotatePoint(center, { x: resultX, y: resultY }, parseAngleToRadian(angle2));
        resultX = temp.x;
        resultY = temp.y;
      });
      return {
        x: resultX,
        y: resultY
      };
    }
    return point;
  }
  function getElementRotateVertexes(elemSize, center, angle2) {
    const { x: x2, y: y2, w: w2, h: h2 } = elemSize;
    let p1 = { x: x2, y: y2 };
    let p2 = { x: x2 + w2, y: y2 };
    let p3 = { x: x2 + w2, y: y2 + h2 };
    let p4 = { x: x2, y: y2 + h2 };
    if (angle2 && (angle2 > 0 || angle2 < 0)) {
      const radian = parseAngleToRadian(limitAngle(angle2));
      p1 = rotatePoint(center, p1, radian);
      p2 = rotatePoint(center, p2, radian);
      p3 = rotatePoint(center, p3, radian);
      p4 = rotatePoint(center, p4, radian);
    }
    return [p1, p2, p3, p4];
  }
  function rotateElementVertexes(elemSize) {
    const { angle: angle2 = 0 } = elemSize;
    const center = calcElementCenter(elemSize);
    return getElementRotateVertexes(elemSize, center, angle2);
  }
  function rotateVertexes(center, ves, radian) {
    return [
      rotatePoint(center, { x: ves[0].x, y: ves[0].y }, radian),
      rotatePoint(center, { x: ves[1].x, y: ves[1].y }, radian),
      rotatePoint(center, { x: ves[2].x, y: ves[2].y }, radian),
      rotatePoint(center, { x: ves[3].x, y: ves[3].y }, radian)
    ];
  }
  function limitAngle(angle2) {
    if (!(angle2 > 0 || angle2 < 0) || angle2 === 0 || angle2 === 360) {
      return 0;
    }
    let num = angle2 % 360;
    if (num < 0) {
      num += 360;
    } else if (angle2 === 360) {
      num = 0;
    }
    return num;
  }
  function getGroupUUIDs(elements, index) {
    var _a;
    const uuids = [];
    if (typeof index === "string" && /^\d+(\.\d+)*$/.test(index)) {
      const nums = index.split(".");
      let target = elements;
      while (nums.length > 0) {
        const num = nums.shift();
        if (typeof num === "string") {
          const elem = target[parseInt(num)];
          if (elem && nums.length === 0) {
            uuids.push(elem.uuid);
          } else if (elem.type === "group" && nums.length > 0) {
            target = ((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children) || [];
          }
        }
        break;
      }
    }
    return uuids;
  }
  function getSelectedElementUUIDs(data, indexes) {
    var _a;
    let uuids = [];
    if (Array.isArray(data === null || data === void 0 ? void 0 : data.elements) && ((_a = data === null || data === void 0 ? void 0 : data.elements) === null || _a === void 0 ? void 0 : _a.length) > 0 && Array.isArray(indexes) && indexes.length > 0) {
      indexes.forEach((idx) => {
        var _a2;
        if (typeof idx === "number") {
          if ((_a2 = data === null || data === void 0 ? void 0 : data.elements) === null || _a2 === void 0 ? void 0 : _a2[idx]) {
            uuids.push(data.elements[idx].uuid);
          }
        } else if (typeof idx === "string") {
          uuids = uuids.concat(getGroupUUIDs(data.elements, idx));
        }
      });
    }
    return uuids;
  }
  function validateElements(elements) {
    let isValid = true;
    if (Array.isArray(elements)) {
      const uuids = [];
      elements.forEach((elem) => {
        var _a;
        if (typeof elem.uuid === "string" && elem.uuid) {
          if (uuids.includes(elem.uuid)) {
            isValid = false;
            console.warn(`Duplicate uuids: ${elem.uuid}`);
          } else {
            uuids.push(elem.uuid);
          }
        } else {
          isValid = false;
          console.warn("Element missing uuid", elem);
        }
        if (elem.type === "group") {
          isValid = validateElements((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children);
        }
      });
    }
    return isValid;
  }
  function calcElementListSize(list) {
    var _a;
    const area = { x: 0, y: 0, w: 0, h: 0 };
    let prevElemSize = null;
    for (let i = 0; i < list.length; i++) {
      const elem = list[i];
      if ((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.invisible) {
        continue;
      }
      const elemSize = {
        x: elem.x,
        y: elem.y,
        w: elem.w,
        h: elem.h,
        angle: elem.angle || 0
      };
      if (elemSize.angle && (elemSize.angle > 0 || elemSize.angle < 0)) {
        const ves = rotateElementVertexes(elemSize);
        if (ves.length === 4) {
          const xList = [ves[0].x, ves[1].x, ves[2].x, ves[3].x];
          const yList = [ves[0].y, ves[1].y, ves[2].y, ves[3].y];
          elemSize.x = Math.min(...xList);
          elemSize.y = Math.min(...yList);
          elemSize.w = Math.abs(Math.max(...xList) - Math.min(...xList));
          elemSize.h = Math.abs(Math.max(...yList) - Math.min(...yList));
        }
      }
      if (prevElemSize) {
        const areaStartX = Math.min(elemSize.x, area.x);
        const areaStartY = Math.min(elemSize.y, area.y);
        const areaEndX = Math.max(elemSize.x + elemSize.w, area.x + area.w);
        const areaEndY = Math.max(elemSize.y + elemSize.h, area.y + area.h);
        area.x = areaStartX;
        area.y = areaStartY;
        area.w = Math.abs(areaEndX - areaStartX);
        area.h = Math.abs(areaEndY - areaStartY);
      } else {
        area.x = elemSize.x;
        area.y = elemSize.y;
        area.w = elemSize.w;
        area.h = elemSize.h;
      }
      prevElemSize = elemSize;
    }
    const listSize = {
      x: Math.floor(area.x),
      y: Math.floor(area.y),
      w: Math.ceil(area.w),
      h: Math.ceil(area.h)
    };
    return listSize;
  }
  function calcElementsContextSize(elements, opts) {
    const area = { x: 0, y: 0, w: 0, h: 0 };
    elements.forEach((elem) => {
      const elemSize = {
        x: elem.x,
        y: elem.y,
        w: elem.w,
        h: elem.h,
        angle: elem.angle
      };
      if (elemSize.angle && (elemSize.angle > 0 || elemSize.angle < 0)) {
        const ves = rotateElementVertexes(elemSize);
        if (ves.length === 4) {
          const xList = [ves[0].x, ves[1].x, ves[2].x, ves[3].x];
          const yList = [ves[0].y, ves[1].y, ves[2].y, ves[3].y];
          elemSize.x = Math.min(...xList);
          elemSize.y = Math.min(...yList);
          elemSize.w = Math.abs(Math.max(...xList) - Math.min(...xList));
          elemSize.h = Math.abs(Math.max(...yList) - Math.min(...yList));
        }
      }
      const areaStartX = Math.min(elemSize.x, area.x);
      const areaStartY = Math.min(elemSize.y, area.y);
      const areaEndX = Math.max(elemSize.x + elemSize.w, area.x + area.w);
      const areaEndY = Math.max(elemSize.y + elemSize.h, area.y + area.h);
      area.x = areaStartX;
      area.y = areaStartY;
      area.w = Math.abs(areaEndX - areaStartX);
      area.h = Math.abs(areaEndY - areaStartY);
    });
    if (opts === null || opts === void 0 ? void 0 : opts.extend) {
      area.x = Math.min(area.x, 0);
      area.y = Math.min(area.y, 0);
    }
    const ctxSize = {
      contextWidth: area.w,
      contextHeight: area.h
    };
    if ((opts === null || opts === void 0 ? void 0 : opts.viewWidth) && (opts === null || opts === void 0 ? void 0 : opts.viewHeight) && (opts === null || opts === void 0 ? void 0 : opts.viewWidth) > 0 && (opts === null || opts === void 0 ? void 0 : opts.viewHeight) > 0) {
      if (opts.viewWidth > area.x + area.w) {
        ctxSize.contextWidth = opts.viewWidth - area.x;
      }
      if (opts.viewHeight > area.y + area.h) {
        ctxSize.contextHeight = opts.viewHeight - area.y;
      }
    }
    return ctxSize;
  }
  function calcElementsViewInfo(elements, prevViewSize, options) {
    const contextSize = calcElementsContextSize(elements, {
      viewWidth: prevViewSize.width,
      viewHeight: prevViewSize.height,
      extend: options === null || options === void 0 ? void 0 : options.extend
    });
    if ((options === null || options === void 0 ? void 0 : options.extend) === true) {
      contextSize.contextWidth = Math.max(contextSize.contextWidth, prevViewSize.contextWidth);
      contextSize.contextHeight = Math.max(contextSize.contextHeight, prevViewSize.contextHeight);
    }
    return {
      contextSize
    };
  }
  function getElemenetsAssetIds(elements) {
    const assetIds = [];
    const _scanElements = (elems) => {
      elems.forEach((elem) => {
        if (elem.type === "image" && isAssetId(elem.detail.src)) {
          assetIds.push(elem.detail.src);
        } else if (elem.type === "svg" && isAssetId(elem.detail.svg)) {
          assetIds.push(elem.detail.svg);
        } else if (elem.type === "html" && elem.detail.html) {
          assetIds.push(elem.detail.html);
        } else if (elem.type === "group" && Array.isArray(elem.detail.children)) {
          _scanElements(elem.detail.children);
        }
      });
    };
    _scanElements(elements);
    return assetIds;
  }
  function findElementFromList(uuid, list) {
    var _a;
    let result = null;
    for (let i = 0; i < list.length; i++) {
      const elem = list[i];
      if (elem.uuid === uuid) {
        result = elem;
        break;
      } else if (!result && elem.type === "group") {
        const resultInGroup = findElementFromList(uuid, ((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children) || []);
        if ((resultInGroup === null || resultInGroup === void 0 ? void 0 : resultInGroup.uuid) === uuid) {
          result = resultInGroup;
          break;
        }
      }
    }
    return result;
  }
  function findElementsFromList(uuids, list) {
    const result = [];
    function _find(elements) {
      var _a;
      for (let i = 0; i < elements.length; i++) {
        const elem = elements[i];
        if (uuids.includes(elem.uuid)) {
          result.push(elem);
        } else if (elem.type === "group") {
          _find(((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children) || []);
        }
      }
    }
    _find(list);
    return result;
  }
  function getGroupQueueFromList(uuid, elements) {
    const groupQueue = [];
    function _scan(uuid2, elements2) {
      var _a;
      let result = null;
      for (let i = 0; i < elements2.length; i++) {
        const elem = elements2[i];
        if (elem.uuid === uuid2) {
          result = elem;
          break;
        } else if (!result && elem.type === "group") {
          groupQueue.push(elem);
          const resultInGroup = _scan(uuid2, ((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children) || []);
          if ((resultInGroup === null || resultInGroup === void 0 ? void 0 : resultInGroup.uuid) === uuid2) {
            result = resultInGroup;
            break;
          }
          groupQueue.pop();
        }
      }
      return result;
    }
    _scan(uuid, elements);
    return groupQueue;
  }
  function getGroupQueueByElementPosition(elements, position) {
    var _a;
    const groupQueue = [];
    let currentElements = elements;
    if (position.length > 1) {
      for (let i = 0; i < position.length - 1; i++) {
        const index = position[i];
        const group = currentElements[index];
        if ((group === null || group === void 0 ? void 0 : group.type) === "group" && Array.isArray((_a = group === null || group === void 0 ? void 0 : group.detail) === null || _a === void 0 ? void 0 : _a.children)) {
          groupQueue.push(group);
          currentElements = group.detail.children;
        } else {
          return null;
        }
      }
    }
    return groupQueue;
  }
  function getElementSize(elem) {
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = elem;
    const size = { x: x2, y: y2, w: w2, h: h2, angle: angle2 };
    return size;
  }
  function mergeElementAsset(element, assets) {
    const elem = element;
    let assetId = null;
    let assetItem = null;
    if (elem.type === "image") {
      assetId = elem.detail.src;
    } else if (elem.type === "svg") {
      assetId = elem.detail.svg;
    } else if (elem.type === "html") {
      assetId = elem.detail.html;
    }
    if (assetId && (assetId === null || assetId === void 0 ? void 0 : assetId.startsWith("@assets/"))) {
      assetItem = assets[assetId];
    }
    if ((assetItem === null || assetItem === void 0 ? void 0 : assetItem.type) === elem.type && typeof (assetItem === null || assetItem === void 0 ? void 0 : assetItem.value) === "string" && (assetItem === null || assetItem === void 0 ? void 0 : assetItem.value)) {
      if (elem.type === "image") {
        elem.detail.src = assetItem.value;
      } else if (elem.type === "svg") {
        elem.detail.svg = assetItem.value;
      } else if (elem.type === "html") {
        elem.detail.html = assetItem.value;
      }
    }
    return elem;
  }
  function filterElementAsset(element) {
    let assetId = null;
    let assetItem = null;
    let resource = null;
    if (element.type === "image") {
      resource = element.detail.src;
    } else if (element.type === "svg") {
      resource = element.detail.svg;
    } else if (element.type === "html") {
      resource = element.detail.html;
    }
    if (typeof resource === "string" && !isAssetId(resource)) {
      assetId = createAssetId(resource, element.uuid);
      assetItem = {
        type: element.type,
        value: resource
      };
      if (element.type === "image") {
        element.detail.src = assetId;
      } else if (element.type === "svg") {
        element.detail.svg = assetId;
      } else if (element.type === "html") {
        element.detail.html = assetId;
      }
    }
    return {
      element,
      assetId,
      assetItem
    };
  }
  function isResourceElement(elem) {
    return ["image", "svg", "html"].includes(elem === null || elem === void 0 ? void 0 : elem.type);
  }
  function findElementsFromListByPositions(positions, list) {
    const elements = [];
    positions.forEach((pos) => {
      const elem = findElementFromListByPosition(pos, list);
      if (elem) {
        elements.push(elem);
      }
    });
    return elements;
  }
  function findElementFromListByPosition(position, list) {
    let result = null;
    let tempList = list;
    for (let i = 0; i < position.length; i++) {
      const pos = position[i];
      const item = tempList[pos];
      if (i < position.length - 1 && (item === null || item === void 0 ? void 0 : item.type) === "group") {
        tempList = item.detail.children;
      } else if (i === position.length - 1) {
        result = item;
      } else {
        break;
      }
    }
    return result;
  }
  function findElementQueueFromListByPosition(position, list) {
    const result = [];
    let tempList = list;
    for (let i = 0; i < position.length; i++) {
      const pos = position[i];
      const item = tempList[pos];
      if (item) {
        result.push(item);
      } else {
        break;
      }
      if (i < position.length - 1 && item.type === "group") {
        tempList = item.detail.children;
      } else {
        break;
      }
    }
    return result;
  }
  function getElementPositionFromList(uuid, elements) {
    const result = [];
    let over = false;
    const _loop = (list) => {
      var _a;
      for (let i = 0; i < list.length; i++) {
        if (over === true) {
          break;
        }
        result.push(i);
        const elem = list[i];
        if (elem.uuid === uuid) {
          over = true;
          break;
        } else if (elem.type === "group") {
          _loop(((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children) || []);
        }
        if (over) {
          break;
        }
        result.pop();
      }
    };
    _loop(elements);
    return result;
  }
  function getElementPositionMapFromList(uuids, elements) {
    const currentPosition = [];
    const positionMap = {};
    let over = false;
    const _loop = (list) => {
      var _a;
      for (let i = 0; i < list.length; i++) {
        if (over === true) {
          break;
        }
        currentPosition.push(i);
        const elem = list[i];
        if (uuids.includes(elem.uuid)) {
          positionMap[elem.uuid] = [...currentPosition];
          if (Object.keys(positionMap).length === uuids.length) {
            over = true;
            break;
          }
        } else if (elem.type === "group") {
          _loop(((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children) || []);
        }
        if (over) {
          break;
        }
        currentPosition.pop();
      }
    };
    _loop(elements);
    return positionMap;
  }
  function isSameElementSize(elem1, elem2) {
    return elem1.x === elem2.x && elem1.y === elem2.y && elem1.h === elem2.h && elem1.w === elem2.w && limitAngle(elem1.angle || 0) === limitAngle(elem2.angle || 0);
  }
  function checkRectIntersect(rect1, rect2) {
    const rect1MinX = rect1.x;
    const rect1MinY = rect1.y;
    const rect1MaxX = rect1.x + rect1.w;
    const rect1MaxY = rect1.y + rect1.h;
    const rect2MinX = rect2.x;
    const rect2MinY = rect2.y;
    const rect2MaxX = rect2.x + rect2.w;
    const rect2MaxY = rect2.y + rect2.h;
    return rect1MinX <= rect2MaxX && rect1MaxX >= rect2MinX && rect1MinY <= rect2MaxY && rect1MaxY >= rect2MinY;
  }
  function getElementVertexes(elemSize) {
    const { x: x2, y: y2, h: h2, w: w2 } = elemSize;
    return [
      { x: x2, y: y2 },
      { x: x2 + w2, y: y2 },
      { x: x2 + w2, y: y2 + h2 },
      { x: x2, y: y2 + h2 }
    ];
  }
  function calcElementVertexes(elemSize) {
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = elemSize;
    if (angle2 === 0) {
      return getElementVertexes(elemSize);
    }
    return getElementRotateVertexes(elemSize, calcElementCenter({ x: x2, y: y2, w: w2, h: h2 }), angle2);
  }
  function calcElementQueueVertexesQueueInGroup(groupQueue) {
    const vesList = [];
    let totalX = 0;
    let totalY = 0;
    const rotateActionList = [];
    const elemQueue = [...groupQueue];
    for (let i = 0; i < elemQueue.length; i++) {
      const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = elemQueue[i];
      totalX += x2;
      totalY += y2;
      let ves;
      if (i === 0) {
        const elemSize = { x: totalX, y: totalY, w: w2, h: h2 };
        ves = calcElementVertexes({ x: x2, y: y2, w: w2, h: h2, angle: angle2 });
        rotateActionList.push({
          center: calcElementCenter(elemSize),
          angle: angle2,
          radian: parseAngleToRadian(angle2)
        });
      } else {
        const elemSize = { x: totalX, y: totalY, w: w2, h: h2 };
        ves = getElementVertexes(elemSize);
        for (let aIdx = 0; aIdx < rotateActionList.length; aIdx++) {
          const { center, radian } = rotateActionList[aIdx];
          ves = rotateVertexes(center, ves, radian);
        }
        const vesCenter = calcElementCenterFromVertexes(ves);
        if (angle2 > 0 || angle2 < 0) {
          const radian = parseAngleToRadian(angle2);
          ves = rotateVertexes(vesCenter, ves, radian);
        }
        rotateActionList.push({
          center: vesCenter,
          angle: angle2,
          radian: parseAngleToRadian(angle2)
        });
      }
      vesList.push(ves);
    }
    return vesList;
  }
  function calcElementVertexesQueueInGroup(targetElem, opts) {
    const { groupQueue } = opts;
    if (!(groupQueue.length > 0)) {
      return [calcElementVertexes(targetElem)];
    }
    const elemQueue = [...groupQueue, ...[targetElem]];
    const vesList = calcElementQueueVertexesQueueInGroup(elemQueue);
    return vesList;
  }
  function calcElementVertexesInGroup(targetElem, opts) {
    const vesList = calcElementVertexesQueueInGroup(targetElem, opts);
    const ves = vesList.pop();
    return ves || null;
  }
  function calcViewScaleInfo(info, opts) {
    const { scale, offsetX, offsetY } = info;
    const { viewSizeInfo } = opts;
    const { width, height, contextWidth, contextHeight } = viewSizeInfo;
    const w2 = contextWidth * scale;
    const h2 = contextHeight * scale;
    const offsetLeft = 0 - offsetX * scale;
    const offsetTop = 0 - offsetY * scale;
    const offsetRight = width - (w2 + offsetLeft / scale);
    const offsetBottom = height - (h2 + offsetTop / scale);
    const newScaleInfo = {
      scale,
      offsetLeft,
      offsetTop,
      offsetRight,
      offsetBottom
    };
    return newScaleInfo;
  }
  function viewScale(opts) {
    const { scale, point, viewScaleInfo: prevViewScaleInfo } = opts;
    const { offsetLeft, offsetTop } = prevViewScaleInfo;
    const scaleDiff = scale / prevViewScaleInfo.scale;
    const x0 = point.x;
    const y0 = point.y;
    const moveX = x0 - x0 * scaleDiff + (offsetLeft * scaleDiff - offsetLeft);
    const moveY = y0 - y0 * scaleDiff + (offsetTop * scaleDiff - offsetTop);
    return {
      moveX,
      moveY
    };
  }
  function viewScroll(opts) {
    const { moveX = 0, moveY = 0, viewScaleInfo, viewSizeInfo } = opts;
    const { scale } = viewScaleInfo;
    const { width, height, contextWidth, contextHeight } = viewSizeInfo;
    let offsetLeft = viewScaleInfo.offsetLeft;
    let offsetRight = viewScaleInfo.offsetRight;
    let offsetTop = viewScaleInfo.offsetTop;
    let offsetBottom = viewScaleInfo.offsetBottom;
    offsetLeft += moveX;
    offsetTop += moveY;
    const w2 = contextWidth * scale;
    const h2 = contextHeight * scale;
    offsetRight = width - (w2 + offsetLeft);
    offsetBottom = height - (h2 + offsetTop);
    return {
      scale,
      offsetTop,
      offsetLeft,
      offsetRight,
      offsetBottom
    };
  }
  function calcViewElementSize(size, opts) {
    const { viewScaleInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = size;
    const { scale, offsetTop, offsetLeft } = viewScaleInfo;
    const newSize = {
      x: x2 * scale + offsetLeft,
      y: y2 * scale + offsetTop,
      w: w2 * scale,
      h: h2 * scale,
      angle: angle2
    };
    return newSize;
  }
  function calcViewPointSize(size, opts) {
    const { viewScaleInfo } = opts;
    const { x: x2, y: y2 } = size;
    const { scale, offsetTop, offsetLeft } = viewScaleInfo;
    const newSize = {
      x: x2 * scale + offsetLeft,
      y: y2 * scale + offsetTop
    };
    return newSize;
  }
  function calcViewVertexes(vertexes, opts) {
    return [
      calcViewPointSize(vertexes[0], opts),
      calcViewPointSize(vertexes[1], opts),
      calcViewPointSize(vertexes[2], opts),
      calcViewPointSize(vertexes[3], opts)
    ];
  }
  function isViewPointInElement(p, opts) {
    const { context2d: ctx, element: elem, viewScaleInfo } = opts;
    const { angle: angle2 = 0 } = elem;
    const { x: x2, y: y2, w: w2, h: h2 } = calcViewElementSize(elem, { viewScaleInfo });
    const vertexes = rotateElementVertexes({ x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    if (vertexes.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(vertexes[0].x, vertexes[0].y);
      for (let i = 1; i < vertexes.length; i++) {
        ctx.lineTo(vertexes[i].x, vertexes[i].y);
      }
      ctx.closePath();
    }
    if (ctx.isPointInPath(p.x, p.y)) {
      return true;
    }
    return false;
  }
  function isViewPointInElementSize(p, elemSize, opts) {
    const vertexes = calcElementVertexes(elemSize);
    return isViewPointInVertexes(p, vertexes);
  }
  function isViewPointInVertexes(p, vertexes, opts) {
    const xList = [vertexes[0].x, vertexes[1].x, vertexes[2].x, vertexes[3].x];
    const yList = [vertexes[0].y, vertexes[1].y, vertexes[2].y, vertexes[3].y];
    const mixX = Math.min(...xList);
    const maxX = Math.max(...xList);
    const mixY = Math.min(...yList);
    const maxY = Math.max(...yList);
    if (p.x > mixX && p.x < maxX && p.y > mixY && p.y < maxY) {
      return true;
    }
    return false;
  }
  function getViewPointAtElement(p, opts) {
    var _a, _b, _c;
    const { context2d: ctx, data, viewScaleInfo, viewSizeInfo, groupQueue } = opts;
    const result = {
      index: -1,
      element: null,
      groupQueueIndex: -1
    };
    if (groupQueue && Array.isArray(groupQueue) && (groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
      for (let gIdx = groupQueue.length - 1; gIdx >= 0; gIdx--) {
        let totalX = 0;
        let totalY = 0;
        let totalAngle = 0;
        for (let i = 0; i <= gIdx; i++) {
          totalX += groupQueue[i].x;
          totalY += groupQueue[i].y;
          totalAngle += groupQueue[i].angle || 0;
        }
        const lastGroup = groupQueue[gIdx];
        if (lastGroup && lastGroup.type === "group" && Array.isArray((_a = lastGroup.detail) === null || _a === void 0 ? void 0 : _a.children)) {
          for (let i = 0; i < lastGroup.detail.children.length; i++) {
            const child = lastGroup.detail.children[i];
            if (((_b = child === null || child === void 0 ? void 0 : child.operations) === null || _b === void 0 ? void 0 : _b.invisible) === true) {
              continue;
            }
            if (child) {
              const elemSize = {
                x: totalX + child.x,
                y: totalY + child.y,
                w: child.w,
                h: child.h,
                angle: totalAngle + (child.angle || 0)
              };
              if (isViewPointInElement(p, { context2d: ctx, element: elemSize, viewScaleInfo })) {
                result.element = child;
                if (gIdx < groupQueue.length - 1 || child.type !== "group") {
                  result.groupQueueIndex = gIdx;
                }
                break;
              }
            } else {
              break;
            }
          }
        }
        if (result.element) {
          break;
        }
      }
    }
    if (result.element) {
      return result;
    }
    for (let i = data.elements.length - 1; i >= 0; i--) {
      const elem = data.elements[i];
      if (((_c = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _c === void 0 ? void 0 : _c.invisible) === true) {
        continue;
      }
      if (isViewPointInElement(p, { context2d: ctx, element: elem, viewScaleInfo })) {
        result.index = i;
        result.element = elem;
        break;
      }
    }
    return result;
  }
  function isElementInView(elem, opts) {
    const { viewSizeInfo, viewScaleInfo } = opts;
    const { width, height } = viewSizeInfo;
    const { angle: angle2 } = elem;
    const { x: x2, y: y2, w: w2, h: h2 } = calcViewElementSize(elem, { viewScaleInfo });
    const ves = rotateElementVertexes({ x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    const viewSize = { x: 0, y: 0, w: width, h: height };
    const elemStartX = Math.min(ves[0].x, ves[1].x, ves[2].x, ves[3].x);
    const elemStartY = Math.min(ves[0].y, ves[1].y, ves[2].y, ves[3].y);
    const elemEndX = Math.max(ves[0].x, ves[1].x, ves[2].x, ves[3].x);
    const elemEndY = Math.max(ves[0].y, ves[1].y, ves[2].y, ves[3].y);
    const elemSize = { x: elemStartX, y: elemStartY, w: elemEndX - elemStartX, h: elemEndY - elemStartY };
    return checkRectIntersect(viewSize, elemSize);
  }
  function calcElementOriginRectInfo(elemSize, opts) {
    const { groupQueue } = opts;
    const vertexes = calcElementVertexesInGroup(elemSize, { groupQueue });
    const top = getCenterFromTwoPoints(vertexes[0], vertexes[1]);
    const right = getCenterFromTwoPoints(vertexes[1], vertexes[2]);
    const bottom = getCenterFromTwoPoints(vertexes[2], vertexes[3]);
    const left = getCenterFromTwoPoints(vertexes[3], vertexes[0]);
    const topLeft = vertexes[0];
    const topRight = vertexes[1];
    const bottomRight = vertexes[2];
    const bottomLeft = vertexes[3];
    const maxX = Math.max(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
    const maxY = Math.max(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);
    const minX = Math.min(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
    const minY = Math.min(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);
    const center = {
      x: (maxX + minX) / 2,
      y: (maxY + minY) / 2
    };
    const rectInfo = {
      center,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      top,
      right,
      left,
      bottom
    };
    return rectInfo;
  }
  function originRectInfoToRangeRectInfo(originRectInfo) {
    const rangeMaxX = Math.max(originRectInfo.topLeft.x, originRectInfo.topRight.x, originRectInfo.bottomRight.x, originRectInfo.bottomLeft.x);
    const rangeMaxY = Math.max(originRectInfo.topLeft.y, originRectInfo.topRight.y, originRectInfo.bottomRight.y, originRectInfo.bottomLeft.y);
    const rangeMinX = Math.min(originRectInfo.topLeft.x, originRectInfo.topRight.x, originRectInfo.bottomRight.x, originRectInfo.bottomLeft.x);
    const rangeMinY = Math.min(originRectInfo.topLeft.y, originRectInfo.topRight.y, originRectInfo.bottomRight.y, originRectInfo.bottomLeft.y);
    const rangeCenter = { x: originRectInfo.center.x, y: originRectInfo.center.y };
    const rangeTopLeft = { x: rangeMinX, y: rangeMinY };
    const rangeTopRight = { x: rangeMaxX, y: rangeMinY };
    const rangeBottomRight = { x: rangeMaxX, y: rangeMaxY };
    const rangeBottomLeft = { x: rangeMinX, y: rangeMaxY };
    const rangeTop = getCenterFromTwoPoints(rangeTopLeft, rangeTopRight);
    const rangeBottom = getCenterFromTwoPoints(rangeBottomLeft, rangeBottomRight);
    const rangeLeft = getCenterFromTwoPoints(rangeTopLeft, rangeBottomLeft);
    const rangeRight = getCenterFromTwoPoints(rangeTopRight, rangeBottomRight);
    const rangeRectInfo = {
      center: rangeCenter,
      topLeft: rangeTopLeft,
      topRight: rangeTopRight,
      bottomLeft: rangeBottomLeft,
      bottomRight: rangeBottomRight,
      top: rangeTop,
      right: rangeRight,
      left: rangeLeft,
      bottom: rangeBottom
    };
    return rangeRectInfo;
  }
  function calcElementViewRectInfo(elemSize, opts) {
    const { groupQueue, viewScaleInfo, range } = opts;
    const originRectInfo = calcElementOriginRectInfo(elemSize, { groupQueue });
    const { center, top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight } = originRectInfo;
    const viewRectInfo = {
      center: calcViewPointSize(center, { viewScaleInfo }),
      topLeft: calcViewPointSize(topLeft, { viewScaleInfo }),
      topRight: calcViewPointSize(topRight, { viewScaleInfo }),
      bottomLeft: calcViewPointSize(bottomLeft, { viewScaleInfo }),
      bottomRight: calcViewPointSize(bottomRight, { viewScaleInfo }),
      top: calcViewPointSize(top, { viewScaleInfo }),
      right: calcViewPointSize(right, { viewScaleInfo }),
      left: calcViewPointSize(left, { viewScaleInfo }),
      bottom: calcViewPointSize(bottom, { viewScaleInfo })
    };
    if (range === true) {
      const viewMaxX = Math.max(viewRectInfo.topLeft.x, viewRectInfo.topRight.x, viewRectInfo.bottomRight.x, viewRectInfo.bottomLeft.x);
      const viewMaxY = Math.max(viewRectInfo.topLeft.y, viewRectInfo.topRight.y, viewRectInfo.bottomRight.y, viewRectInfo.bottomLeft.y);
      const viewMinX = Math.min(viewRectInfo.topLeft.x, viewRectInfo.topRight.x, viewRectInfo.bottomRight.x, viewRectInfo.bottomLeft.x);
      const viewMinY = Math.min(viewRectInfo.topLeft.y, viewRectInfo.topRight.y, viewRectInfo.bottomRight.y, viewRectInfo.bottomLeft.y);
      const rangeCenter = { x: viewRectInfo.center.x, y: viewRectInfo.center.y };
      const rangeTopLeft = { x: viewMinX, y: viewMinY };
      const rangeTopRight = { x: viewMaxX, y: viewMinY };
      const rangeBottomRight = { x: viewMaxX, y: viewMaxY };
      const rangeBottomLeft = { x: viewMinX, y: viewMaxY };
      const rangeTop = getCenterFromTwoPoints(rangeTopLeft, rangeTopRight);
      const rangeBottom = getCenterFromTwoPoints(rangeBottomLeft, rangeBottomRight);
      const rangeLeft = getCenterFromTwoPoints(rangeTopLeft, rangeBottomLeft);
      const rangeRight = getCenterFromTwoPoints(rangeTopRight, rangeBottomRight);
      const rangeRectInfo = {
        center: rangeCenter,
        topLeft: rangeTopLeft,
        topRight: rangeTopRight,
        bottomLeft: rangeBottomLeft,
        bottomRight: rangeBottomRight,
        top: rangeTop,
        right: rangeRight,
        left: rangeLeft,
        bottom: rangeBottom
      };
      return rangeRectInfo;
    }
    return viewRectInfo;
  }
  function createControllerElementSizeFromCenter(center, opts) {
    const { x: x2, y: y2 } = center;
    const { size, angle: angle2 } = opts;
    return {
      x: x2 - size / 2,
      y: y2 - size / 2,
      w: size,
      h: size,
      angle: angle2
    };
  }
  function calcElementSizeController(elemSize, opts) {
    const { groupQueue, controllerSize: controllerSize2, viewScaleInfo, rotateControllerSize: rotateControllerSize2, rotateControllerPosition: rotateControllerPosition2 } = opts;
    const ctrlSize = (controllerSize2 && controllerSize2 > 0 ? controllerSize2 : 8) / viewScaleInfo.scale;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = elemSize;
    const rotateCtrlSize = rotateControllerSize2;
    const rotateCtrlPos = rotateControllerPosition2;
    const ctrlGroupQueue = [
      ...[
        {
          uuid: createUUID(),
          x: x2,
          y: y2,
          w: w2,
          h: h2,
          angle: angle2,
          type: "group",
          detail: { children: [] }
        }
      ],
      ...groupQueue
    ];
    let totalAngle = 0;
    ctrlGroupQueue.forEach(({ angle: angle3 = 0 }) => {
      totalAngle += angle3;
    });
    const vertexes = calcElementVertexesInGroup(elemSize, { groupQueue });
    const rotateElemVertexes = calcElementVertexesInGroup({
      x: x2,
      y: y2 - (rotateCtrlPos + rotateCtrlSize / 2) / viewScaleInfo.scale,
      h: h2 + (rotateCtrlPos * 2 + rotateCtrlSize) / viewScaleInfo.scale,
      w: w2,
      angle: angle2
    }, { groupQueue: [...groupQueue] });
    const topCenter = getCenterFromTwoPoints(vertexes[0], vertexes[1]);
    const rightCenter = getCenterFromTwoPoints(vertexes[1], vertexes[2]);
    const bottomCenter = getCenterFromTwoPoints(vertexes[2], vertexes[3]);
    const leftCenter = getCenterFromTwoPoints(vertexes[3], vertexes[0]);
    const topLeftCenter = vertexes[0];
    const topRightCenter = vertexes[1];
    const bottomRightCenter = vertexes[2];
    const bottomLeftCenter = vertexes[3];
    const topMiddleSize = createControllerElementSizeFromCenter(topCenter, { size: ctrlSize, angle: totalAngle });
    const rightMiddleSize = createControllerElementSizeFromCenter(rightCenter, { size: ctrlSize, angle: totalAngle });
    const bottomMiddleSize = createControllerElementSizeFromCenter(bottomCenter, { size: ctrlSize, angle: totalAngle });
    const leftMiddleSize = createControllerElementSizeFromCenter(leftCenter, { size: ctrlSize, angle: totalAngle });
    const topLeftSize = createControllerElementSizeFromCenter(topLeftCenter, { size: ctrlSize, angle: totalAngle });
    const topRightSize = createControllerElementSizeFromCenter(topRightCenter, { size: ctrlSize, angle: totalAngle });
    const bottomLeftSize = createControllerElementSizeFromCenter(bottomLeftCenter, { size: ctrlSize, angle: totalAngle });
    const bottomRightSize = createControllerElementSizeFromCenter(bottomRightCenter, {
      size: ctrlSize,
      angle: totalAngle
    });
    const topLeftVertexes = calcElementVertexes(topLeftSize);
    const topRightVertexes = calcElementVertexes(topRightSize);
    const bottomLeftVertexes = calcElementVertexes(bottomLeftSize);
    const bottomRightVertexes = calcElementVertexes(bottomRightSize);
    const topVertexes = [
      topLeftVertexes[1],
      topRightVertexes[0],
      topRightVertexes[3],
      topLeftVertexes[2]
    ];
    const rightVertexes = [
      topRightVertexes[3],
      topRightVertexes[2],
      bottomRightVertexes[1],
      bottomRightVertexes[0]
    ];
    const bottomVertexes = [
      bottomLeftVertexes[1],
      bottomRightVertexes[0],
      bottomRightVertexes[3],
      bottomLeftVertexes[2]
    ];
    const leftVertexes = [
      topLeftVertexes[3],
      topLeftVertexes[2],
      bottomLeftVertexes[1],
      bottomLeftVertexes[0]
    ];
    const topMiddleVertexes = calcElementVertexes(topMiddleSize);
    const rightMiddleVertexes = calcElementVertexes(rightMiddleSize);
    const bottomMiddleVertexes = calcElementVertexes(bottomMiddleSize);
    const leftMiddleVertexes = calcElementVertexes(leftMiddleSize);
    const rotateCenter = getCenterFromTwoPoints(rotateElemVertexes[0], rotateElemVertexes[1]);
    const tempRotateSizeRepairRatio = 1.1;
    const rotateSize = createControllerElementSizeFromCenter(rotateCenter, {
      size: rotateControllerSize2 * tempRotateSizeRepairRatio / viewScaleInfo.scale,
      angle: totalAngle
    });
    const rotateVertexes2 = calcElementVertexes(rotateSize);
    const sizeController = {
      originalElementCenter: calcElementCenter(elemSize),
      originalElementSize: Object.assign({}, elemSize),
      elementWrapper: vertexes,
      left: {
        type: "left",
        vertexes: leftVertexes,
        center: leftCenter,
        size: ctrlSize
      },
      right: {
        type: "right",
        vertexes: rightVertexes,
        center: rightCenter,
        size: ctrlSize
      },
      top: {
        type: "top",
        vertexes: topVertexes,
        center: topCenter,
        size: ctrlSize
      },
      bottom: {
        type: "bottom",
        vertexes: bottomVertexes,
        center: bottomCenter,
        size: ctrlSize
      },
      topLeft: {
        type: "top-left",
        vertexes: topLeftVertexes,
        center: topLeftCenter,
        size: ctrlSize
      },
      topRight: {
        type: "top-right",
        vertexes: topRightVertexes,
        center: topRightCenter,
        size: ctrlSize
      },
      bottomLeft: {
        type: "bottom-left",
        vertexes: bottomLeftVertexes,
        center: bottomLeftCenter,
        size: ctrlSize
      },
      bottomRight: {
        type: "bottom-right",
        vertexes: bottomRightVertexes,
        center: bottomRightCenter,
        size: ctrlSize
      },
      leftMiddle: {
        type: "left-middle",
        vertexes: leftMiddleVertexes,
        center: leftCenter,
        size: ctrlSize
      },
      rightMiddle: {
        type: "right-middle",
        vertexes: rightMiddleVertexes,
        center: rightCenter,
        size: ctrlSize
      },
      topMiddle: {
        type: "top-middle",
        vertexes: topMiddleVertexes,
        center: topCenter,
        size: ctrlSize
      },
      bottomMiddle: {
        type: "bottom-middle",
        vertexes: bottomMiddleVertexes,
        center: bottomCenter,
        size: ctrlSize
      },
      rotate: {
        type: "rotate",
        vertexes: rotateVertexes2,
        center: rotateCenter,
        size: rotateControllerSize2
      }
    };
    return sizeController;
  }
  function calcLayoutSizeController(layoutSize, opts) {
    const { controllerSize: controllerSize2, viewScaleInfo } = opts;
    const ctrlSize = controllerSize2 && controllerSize2 > 0 ? controllerSize2 : 8;
    const { x: x2, y: y2, w: w2, h: h2 } = calcViewElementSize(layoutSize, { viewScaleInfo });
    const center = calcElementCenter({ x: x2, y: y2, w: w2, h: h2 });
    const topCenter = { x: center.x, y: y2 };
    const rightCenter = { x: x2 + w2, y: center.y };
    const bottomCenter = { x: center.x, y: y2 + h2 };
    const leftCenter = { x: x2, y: center.y };
    const topLeftCenter = { x: x2, y: y2 };
    const topRightCenter = { x: x2 + w2, y: y2 };
    const bottomRightCenter = { x: x2 + w2, y: y2 + h2 };
    const bottomLeftCenter = { x: x2, y: y2 + h2 };
    const topMiddleSize = createControllerElementSizeFromCenter(topCenter, { size: ctrlSize, angle: 0 });
    const rightMiddleSize = createControllerElementSizeFromCenter(rightCenter, { size: ctrlSize, angle: 0 });
    const bottomMiddleSize = createControllerElementSizeFromCenter(bottomCenter, { size: ctrlSize, angle: 0 });
    const leftMiddleSize = createControllerElementSizeFromCenter(leftCenter, { size: ctrlSize, angle: 0 });
    const topLeftSize = createControllerElementSizeFromCenter(topLeftCenter, { size: ctrlSize, angle: 0 });
    const topRightSize = createControllerElementSizeFromCenter(topRightCenter, { size: ctrlSize, angle: 0 });
    const bottomLeftSize = createControllerElementSizeFromCenter(bottomLeftCenter, { size: ctrlSize, angle: 0 });
    const bottomRightSize = createControllerElementSizeFromCenter(bottomRightCenter, { size: ctrlSize, angle: 0 });
    const topLeftVertexes = calcElementVertexes(topLeftSize);
    const topRightVertexes = calcElementVertexes(topRightSize);
    const bottomLeftVertexes = calcElementVertexes(bottomLeftSize);
    const bottomRightVertexes = calcElementVertexes(bottomRightSize);
    const topVertexes = [
      topLeftVertexes[1],
      topRightVertexes[0],
      topRightVertexes[3],
      topLeftVertexes[2]
    ];
    const rightVertexes = [
      topRightVertexes[3],
      topRightVertexes[2],
      bottomRightVertexes[1],
      bottomRightVertexes[0]
    ];
    const bottomVertexes = [
      bottomLeftVertexes[1],
      bottomRightVertexes[0],
      bottomRightVertexes[3],
      bottomLeftVertexes[2]
    ];
    const leftVertexes = [
      topLeftVertexes[3],
      topLeftVertexes[2],
      bottomLeftVertexes[1],
      bottomLeftVertexes[0]
    ];
    const topMiddleVertexes = calcElementVertexes(topMiddleSize);
    const rightMiddleVertexes = calcElementVertexes(rightMiddleSize);
    const bottomMiddleVertexes = calcElementVertexes(bottomMiddleSize);
    const leftMiddleVertexes = calcElementVertexes(leftMiddleSize);
    const sizeController = {
      left: {
        type: "left",
        vertexes: leftVertexes,
        center: leftCenter,
        size: ctrlSize
      },
      right: {
        type: "right",
        vertexes: rightVertexes,
        center: rightCenter,
        size: ctrlSize
      },
      top: {
        type: "top",
        vertexes: topVertexes,
        center: topCenter,
        size: ctrlSize
      },
      bottom: {
        type: "bottom",
        vertexes: bottomVertexes,
        center: bottomCenter,
        size: ctrlSize
      },
      topLeft: {
        type: "top-left",
        vertexes: topLeftVertexes,
        center: topLeftCenter,
        size: ctrlSize
      },
      topRight: {
        type: "top-right",
        vertexes: topRightVertexes,
        center: topRightCenter,
        size: ctrlSize
      },
      bottomLeft: {
        type: "bottom-left",
        vertexes: bottomLeftVertexes,
        center: bottomLeftCenter,
        size: ctrlSize
      },
      bottomRight: {
        type: "bottom-right",
        vertexes: bottomRightVertexes,
        center: bottomRightCenter,
        size: ctrlSize
      },
      leftMiddle: {
        type: "left-middle",
        vertexes: leftMiddleVertexes,
        center: leftCenter,
        size: ctrlSize
      },
      rightMiddle: {
        type: "right-middle",
        vertexes: rightMiddleVertexes,
        center: rightCenter,
        size: ctrlSize
      },
      topMiddle: {
        type: "top-middle",
        vertexes: topMiddleVertexes,
        center: topCenter,
        size: ctrlSize
      },
      bottomMiddle: {
        type: "bottom-middle",
        vertexes: bottomMiddleVertexes,
        center: bottomCenter,
        size: ctrlSize
      }
    };
    return sizeController;
  }
  const cmdReg = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
  const numReg = /(-?\d+(?:\.\d+)?)/gi;
  function parseSVGPath(path) {
    const commands = [];
    path.replace(cmdReg, (match, cmd, paramStr) => {
      const matchParams = paramStr.match(numReg);
      const params = matchParams ? matchParams.map(Number) : [];
      const command = {
        type: cmd,
        params
      };
      commands.push(command);
      return match;
    });
    return commands;
  }
  function generateSVGPath(commands) {
    let path = "";
    commands.forEach((item) => {
      path += item.type + item.params.join(" ");
    });
    return path;
  }
  const attrRegExp = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
  const elemRegExp = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g;
  const whitespaceReg = /^\s*$/;
  const singleElements = {};
  function parseElement(element) {
    const node = {
      type: "element",
      name: "",
      isVoid: false,
      attributes: {},
      children: []
    };
    const elementMatch = element.match(/<\/?([^\s]+?)[/\s>]/);
    if (elementMatch) {
      node.name = elementMatch[1];
      if (singleElements[elementMatch[1]] || element.charAt(element.length - 2) === "/") {
        node.isVoid = true;
      }
      if (node.name.startsWith("!--")) {
        const endIndex = element.indexOf("-->");
        return {
          type: "comment",
          name: null,
          attributes: {},
          children: [],
          isVoid: false,
          comment: endIndex !== -1 ? element.slice(4, endIndex) : ""
        };
      }
    }
    const reg = new RegExp(attrRegExp);
    let result = null;
    while (true) {
      result = reg.exec(element);
      if (result === null) {
        break;
      }
      if (!result[0].trim()) {
        continue;
      }
      if (result[1]) {
        const attr = result[1].trim();
        let arr = [attr, ""];
        if (attr.indexOf("=") > -1) {
          arr = attr.split("=");
        }
        node.attributes[arr[0]] = arr[1];
        reg.lastIndex--;
      } else if (result[2]) {
        node.attributes[result[2]] = result[3].trim().substring(1, result[3].length - 1);
      }
    }
    return node;
  }
  function parseHTML(html2) {
    const result = [];
    const arr = [];
    let current;
    let level = -1;
    html2.replace(elemRegExp, (element, index) => {
      const isOpen = element.charAt(1) !== "/";
      const isComment = element.startsWith("<!--");
      const start = index + element.length;
      const nextChar = html2.charAt(start);
      let parent;
      if (isComment) {
        const comment = parseElement(element);
        if (level < 0) {
          result.push(comment);
          return element;
        }
        parent = arr[level];
        parent.children.push(comment);
        return element;
      }
      if (isOpen) {
        level++;
        current = parseElement(element);
        if (!current.isVoid && true && nextChar && nextChar !== "<") {
          const content = html2.slice(start, html2.indexOf("<", start));
          if (content.trim()) {
            current.children.push({
              type: "text",
              name: null,
              attributes: {},
              children: [],
              isVoid: false,
              textContent: content.trim()
            });
          }
        }
        if (level === 0) {
          result.push(current);
        }
        parent = arr[level - 1];
        if (parent) {
          parent.children.push(current);
        }
        arr[level] = current;
      }
      if (!isOpen || !Array.isArray(current) && current.isVoid) {
        if (level > -1 && !Array.isArray(current) && (current.isVoid || current.name === element.slice(2, -1))) {
          level--;
          current = level === -1 ? result : arr[level];
        }
        if (nextChar !== "<" && nextChar) {
          parent = level === -1 ? result : arr[level].children;
          const end = html2.indexOf("<", start);
          let content = html2.slice(start, end === -1 ? void 0 : end);
          if (whitespaceReg.test(content)) {
            content = " ";
          }
          if (end > -1 && level + parent.length >= 0 || content !== " ") {
            if (content.trim()) {
              parent.push({
                type: "text",
                name: null,
                attributes: {},
                children: [],
                isVoid: false,
                textContent: content.trim()
              });
            }
          }
        }
      }
      return element;
    });
    return result;
  }
  function attrString(attrs2) {
    const buff = [];
    for (const key2 in attrs2) {
      buff.push(key2 + '="' + attrs2[key2] + '"');
    }
    if (!buff.length) {
      return "";
    }
    return " " + buff.join(" ");
  }
  function stringify(buff, htmlNode) {
    switch (htmlNode.type) {
      case "text":
        return buff + htmlNode.textContent;
      case "element":
        buff += "<" + htmlNode.name + (htmlNode.attributes ? attrString(htmlNode.attributes) : "") + (htmlNode.isVoid ? "/>" : ">");
        if (htmlNode.isVoid) {
          return buff;
        }
        return buff + htmlNode.children.reduce(stringify, "") + "</" + htmlNode.name + ">";
      case "comment":
        buff += "<!--" + htmlNode.comment + "-->";
        return buff;
    }
  }
  function generateHTML(htmlNodes) {
    return htmlNodes.reduce(function(token, rootEl) {
      return token + stringify("", rootEl);
    }, "");
  }
  function compressImage(src, opts) {
    let radio = 0.5;
    const type = (opts === null || opts === void 0 ? void 0 : opts.type) || "image/png";
    if ((opts === null || opts === void 0 ? void 0 : opts.radio) && (opts === null || opts === void 0 ? void 0 : opts.radio) > 0 && (opts === null || opts === void 0 ? void 0 : opts.radio) <= 1) {
      radio = opts === null || opts === void 0 ? void 0 : opts.radio;
    }
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => {
        const { width, height } = image;
        const resultW = width * radio;
        const resultH = height * radio;
        let canvas = document.createElement("canvas");
        canvas.width = resultW;
        canvas.height = resultH;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, resultW, resultH);
        const base64 = canvas.toDataURL(type);
        canvas = null;
        resolve(base64);
      });
      image.addEventListener("error", (err) => {
        reject(err);
      });
      image.src = src;
    });
  }
  function formatNumber(num, opts) {
    let decimalPlaces = 2;
    if (typeof (opts === null || opts === void 0 ? void 0 : opts.decimalPlaces) !== "undefined" && (opts === null || opts === void 0 ? void 0 : opts.decimalPlaces) >= 0) {
      decimalPlaces = opts.decimalPlaces;
    }
    return parseFloat(num.toFixed(decimalPlaces));
  }
  function matrixToRadian(matrix) {
    if (matrix[1] != -1 * matrix[3] || matrix[4] != matrix[0] || matrix[0] * matrix[4] - matrix[3] * matrix[1] != 1) {
      return null;
    } else {
      return Math.acos(matrix[0]);
    }
  }
  function matrixToAngle(matrix) {
    const radian = matrixToRadian(matrix);
    if (typeof radian === "number") {
      const angle2 = radian * 180 / Math.PI;
      return angle2;
    }
    return radian;
  }
  const defaultText = "Text Element";
  function getDefaultElementDetailConfig() {
    const config = {
      boxSizing: "border-box",
      borderWidth: 0,
      borderColor: "#000000",
      shadowColor: "#000000",
      borderRadius: 0,
      borderDash: [],
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      opacity: 1,
      color: "#000000",
      textAlign: "left",
      verticalAlign: "top",
      fontSize: 16,
      fontFamily: "sans-serif",
      fontWeight: 400,
      minInlineSize: "auto",
      wordBreak: "break-all",
      overflow: "hidden"
    };
    return config;
  }
  function getDefaultElementRectDetail() {
    const detail = {
      background: "#D9D9D9"
    };
    return detail;
  }
  function getDefaultElementCircleDetail() {
    const detail = {
      background: "#D9D9D9",
      radius: 0
    };
    return detail;
  }
  function getDefaultElementTextDetail(elementSize) {
    const detailConfig2 = getDefaultElementDetailConfig();
    const detail = {
      text: defaultText,
      color: detailConfig2.color,
      fontFamily: detailConfig2.fontFamily,
      fontWeight: detailConfig2.fontWeight,
      lineHeight: elementSize.w / defaultText.length,
      fontSize: elementSize.w / defaultText.length,
      textAlign: "center",
      verticalAlign: "middle"
    };
    return detail;
  }
  function getDefaultElementSVGDetail() {
    const detail = {
      svg: '<svg t="1701004189871" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"   width="200" height="200"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"   fill="#2c2c2c"></path></svg>'
    };
    return detail;
  }
  function getDefaultElementImageDetail() {
    const detail = {
      src: "data:image/svg+xml;base64,PHN2ZyAgIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik05MjggMTYwSDk2Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnY2NDBjMCAxNy43IDE0LjMgMzIgMzIgMzJoODMyYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjE5MmMwLTE3LjctMTQuMy0zMi0zMi0zMnogbS00MCA2MzJIMTM2di0zOS45bDEzOC41LTE2NC4zIDE1MC4xIDE3OEw2NTguMSA0ODkgODg4IDc2MS42Vjc5MnogbTAtMTI5LjhMNjY0LjIgMzk2LjhjLTMuMi0zLjgtOS0zLjgtMTIuMiAwTDQyNC42IDY2Ni40bC0xNDQtMTcwLjdjLTMuMi0zLjgtOS0zLjgtMTIuMiAwTDEzNiA2NTIuN1YyMzJoNzUydjQzMC4yeiIgIGZpbGw9IiM1MTUxNTEiPjwvcGF0aD48cGF0aCBkPSJNMzA0IDQ1NmM0OC42IDAgODgtMzkuNCA4OC04OHMtMzkuNC04OC04OC04OC04OCAzOS40LTg4IDg4IDM5LjQgODggODggODh6IG0wLTExNmMxNS41IDAgMjggMTIuNSAyOCAyOHMtMTIuNSAyOC0yOCAyOC0yOC0xMi41LTI4LTI4IDEyLjUtMjggMjgtMjh6IiAgZmlsbD0iIzUxNTE1MSI+PC9wYXRoPjwvc3ZnPg=="
    };
    return detail;
  }
  function getDefaultElementGroupDetail() {
    const detail = {
      children: [],
      background: "#D9D9D9",
      overflow: "hidden"
    };
    return detail;
  }
  const defaultElemConfig$1 = getDefaultElementDetailConfig();
  function calcViewBoxSize(viewElem, opts) {
    const { viewScaleInfo } = opts;
    const { scale } = viewScaleInfo;
    let { borderRadius: borderRadius2 } = viewElem.detail;
    const { borderDash } = viewElem.detail;
    const hasBorderDash = Array.isArray(borderDash) && borderDash.length > 0;
    const { boxSizing = defaultElemConfig$1.boxSizing, borderWidth: borderWidth2 } = viewElem.detail;
    if (Array.isArray(borderWidth2)) {
      borderRadius2 = 0;
    }
    let { x: x2, y: y2, w: w2, h: h2 } = viewElem;
    let radiusList = [0, 0, 0, 0];
    if (typeof borderRadius2 === "number") {
      const br = borderRadius2 * scale;
      radiusList = [br, br, br, br];
    } else if (Array.isArray(borderRadius2) && (borderRadius2 === null || borderRadius2 === void 0 ? void 0 : borderRadius2.length) === 4) {
      radiusList = [borderRadius2[0] * scale, borderRadius2[1] * scale, borderRadius2[2] * scale, borderRadius2[3] * scale];
    }
    let bw = 0;
    if (typeof borderWidth2 === "number") {
      bw = (borderWidth2 || 0) * scale;
    }
    if (boxSizing === "border-box" && !hasBorderDash) {
      x2 = viewElem.x + bw / 2;
      y2 = viewElem.y + bw / 2;
      w2 = viewElem.w - bw;
      h2 = viewElem.h - bw;
    } else if (boxSizing === "content-box") {
      x2 = viewElem.x - bw / 2;
      y2 = viewElem.y - bw / 2;
      w2 = viewElem.w + bw;
      h2 = viewElem.h + bw;
    } else {
      x2 = viewElem.x;
      y2 = viewElem.y;
      w2 = viewElem.w;
      h2 = viewElem.h;
    }
    w2 = Math.max(w2, 1);
    h2 = Math.max(h2, 1);
    radiusList = radiusList.map((r) => {
      return Math.min(r, w2 / 2, h2 / 2);
    });
    return {
      x: x2,
      y: y2,
      w: w2,
      h: h2,
      radiusList
    };
  }
  function flattenObject(obj, parentKey = "", result = {}, opts) {
    Object.keys(obj).forEach((key2) => {
      var _a;
      const currentKey = parentKey ? `${parentKey}${isArrayIndex$1(key2) ? `[${key2}]` : `.${key2}`}` : key2;
      if (!((_a = opts === null || opts === void 0 ? void 0 : opts.ignorePaths) === null || _a === void 0 ? void 0 : _a.includes(currentKey))) {
        const value = obj[key2];
        if (isFlattenable(value)) {
          flattenObject(value, Array.isArray(value) ? currentKey : currentKey, result, opts);
        } else {
          result[currentKey] = value;
        }
      }
    });
    return result;
  }
  function isFlattenable(value) {
    return typeof value === "object" && value !== null && !(value instanceof Date) || Array.isArray(value);
  }
  function isArrayIndex$1(key2) {
    return /^\d+$/.test(key2) && !isNaN(Number(key2));
  }
  function flatObject(obj, opts) {
    if (typeof obj !== "object" || obj === null) {
      return { "": obj };
    }
    return flattenObject(obj, "", {}, opts);
  }
  function toFlattenElement(elem) {
    return flatObject(elem, { ignorePaths: ["detail.children"] });
  }
  function toFlattenLayout(layout) {
    return flatObject(layout);
  }
  function toFlattenGlobal(global) {
    return flatObject(global);
  }
  function toPath(path) {
    if (Array.isArray(path))
      return [...path];
    return path.split(/\.|\[|\]/).filter((key2) => key2 !== "");
  }
  function get(obj, path, defaultValue) {
    if (!path) {
      return void 0;
    }
    const pathArray = toPath(path);
    let current = obj;
    for (const key2 of pathArray) {
      if (current === null || current === void 0) {
        return defaultValue;
      }
      current = current[key2];
    }
    return current !== void 0 ? current : defaultValue;
  }
  function set(obj, path, value) {
    const pathArray = toPath(path);
    if (pathArray.length === 0) {
      return obj;
    }
    let current = obj;
    if (current) {
      for (let i = 0; i < pathArray.length; i++) {
        const key2 = pathArray[i];
        if (i === pathArray.length - 1) {
          current[key2] = value;
          break;
        }
        if (current && ((current === null || current === void 0 ? void 0 : current[key2]) === void 0 || typeof (current === null || current === void 0 ? void 0 : current[key2]) !== "object" || (current === null || current === void 0 ? void 0 : current[key2]) === null)) {
          const nextKey = pathArray[i + 1];
          const isNextNumeric = /^\d+$/.test(nextKey);
          current[key2] = isNextNumeric ? [] : {};
        }
        current = current === null || current === void 0 ? void 0 : current[key2];
      }
    }
    return obj;
  }
  function del(obj, path) {
    const pathArray = toPath(path);
    if (pathArray.length === 0) {
      return obj;
    }
    let current = obj;
    if (current) {
      for (let i = 0; i < pathArray.length; i++) {
        const key2 = pathArray[i];
        if (i === pathArray.length - 1) {
          delete current[key2];
          break;
        }
        if (current && ((current === null || current === void 0 ? void 0 : current[key2]) === void 0 || typeof (current === null || current === void 0 ? void 0 : current[key2]) !== "object" || (current === null || current === void 0 ? void 0 : current[key2]) === null)) {
          const nextKey = pathArray[i + 1];
          const isNextNumeric = /^\d+$/.test(nextKey);
          current[key2] = isNextNumeric ? [] : {};
        }
        current = current === null || current === void 0 ? void 0 : current[key2];
      }
    }
    return obj;
  }
  const doNum = (n) => {
    return formatNumber(n, { decimalPlaces: 4 });
  };
  function resizeElementBaseDetailByRatio(elem, opts) {
    const beforeElem = { detail: {} };
    const afterElem = { detail: {} };
    const record = {
      type: "modifyElement",
      time: Date.now(),
      content: {
        method: "modifyElement",
        uuid: elem.uuid,
        before: null,
        after: null
      }
    };
    const { detail } = elem;
    const { xRatio, yRatio, maxRatio } = opts;
    const middleRatio = (xRatio + yRatio) / 2;
    const { borderWidth: borderWidth2, borderRadius: borderRadius2, borderDash, shadowOffsetX, shadowOffsetY, shadowBlur } = detail;
    if (typeof borderWidth2 === "number") {
      detail.borderWidth = doNum(borderWidth2 * middleRatio);
      beforeElem.detail.borderWidth = borderWidth2;
      afterElem.detail.borderWidth = detail.borderWidth;
    } else if (Array.isArray(detail.borderWidth)) {
      const bw = borderWidth2;
      detail.borderWidth = [doNum(bw[0] * yRatio), doNum(bw[1] * xRatio), doNum(bw[2] * yRatio), doNum(bw[3] * xRatio)];
      beforeElem.detail.borderWidth = [...bw];
      afterElem.detail.borderWidth = [...detail.borderWidth];
    }
    if (typeof borderRadius2 === "number") {
      detail.borderRadius = doNum(borderRadius2 * middleRatio);
      beforeElem.detail.borderRadius = borderRadius2;
      afterElem.detail.borderRadius = detail.borderRadius;
    } else if (Array.isArray(detail.borderRadius)) {
      const br = borderRadius2;
      detail.borderRadius = [br[0] * xRatio, br[1] * xRatio, br[2] * yRatio, br[3] * yRatio];
      beforeElem.detail.borderRadius = [...br];
      afterElem.detail.borderRadius = [...detail.borderRadius];
    }
    if (Array.isArray(borderDash)) {
      borderDash.forEach((dash, i) => {
        detail.borderDash[i] = doNum(dash * maxRatio);
      });
      beforeElem.detail.borderDash = [...borderDash];
      afterElem.detail.borderDash = [...detail.borderDash];
    }
    if (typeof shadowOffsetX === "number") {
      detail.shadowOffsetX = doNum(shadowOffsetX * maxRatio);
      beforeElem.detail.shadowOffsetX = shadowOffsetX;
      afterElem.detail.shadowOffsetX = detail.shadowOffsetX;
    }
    if (typeof shadowOffsetY === "number") {
      detail.shadowOffsetY = doNum(shadowOffsetY * maxRatio);
      beforeElem.detail.shadowOffsetY = shadowOffsetY;
      afterElem.detail.shadowOffsetY = detail.shadowOffsetY;
    }
    if (typeof shadowBlur === "number") {
      detail.shadowBlur = doNum(shadowBlur * maxRatio);
      beforeElem.detail.shadowBlur = shadowBlur;
      afterElem.detail.shadowBlur = detail.shadowBlur;
    }
    record.content.before = toFlattenElement(beforeElem);
    record.content.after = toFlattenElement(afterElem);
    return record;
  }
  function resizeElementBaseByRatio(elem, opts) {
    const { xRatio, yRatio } = opts;
    const { uuid, x: x2, y: y2, w: w2, h: h2 } = elem;
    const record = {
      type: "modifyElement",
      time: Date.now(),
      content: {
        method: "modifyElement",
        uuid,
        before: { x: x2, y: y2, w: w2, h: h2 },
        after: { x: x2, y: y2, w: w2, h: h2 }
      }
    };
    elem.x = doNum(x2 * xRatio);
    elem.y = doNum(y2 * yRatio);
    elem.w = doNum(w2 * xRatio);
    elem.h = doNum(h2 * yRatio);
    const detailRecord = resizeElementBaseDetailByRatio(elem, opts);
    record.content.before = Object.assign(Object.assign({}, record.content.before), detailRecord.content.before);
    record.content.after = Object.assign(Object.assign({}, record.content.after), detailRecord.content.after);
    return record;
  }
  function resizeTextElementDetailByRatio(elem, opts) {
    const { minRatio, maxRatio } = opts;
    const { fontSize: fontSize2, lineHeight: lineHeight2 } = elem.detail;
    const ratio = (minRatio + maxRatio) / 2;
    const beforeFlattenElem = {};
    const afterFlattenElem = {};
    if (fontSize2 && fontSize2 > 0) {
      elem.detail.fontSize = doNum(fontSize2 * ratio);
      beforeFlattenElem["detail.fontSize"] = fontSize2;
      afterFlattenElem["detail.fontSize"] = elem.detail.fontSize;
    }
    if (lineHeight2 && lineHeight2 > 0) {
      elem.detail.lineHeight = doNum(lineHeight2 * ratio);
      beforeFlattenElem["detail.lineHeight"] = lineHeight2;
      afterFlattenElem["detail.lineHeight"] = elem.detail.lineHeight;
    }
    const record = {
      type: "modifyElement",
      time: Date.now(),
      content: {
        method: "modifyElement",
        uuid: elem.uuid,
        before: beforeFlattenElem,
        after: afterFlattenElem
      }
    };
    return record;
  }
  function deepResizeElementByRatio(elem, opts, record) {
    const { type, uuid } = elem;
    const rootRecord = resizeElementBaseByRatio(elem, opts);
    const rootRecordBefore = Object.assign(Object.assign({}, rootRecord.content.before), { uuid });
    const rootRecordAfter = Object.assign(Object.assign({}, rootRecord.content.after), { uuid });
    record === null || record === void 0 ? void 0 : record.content.before.push(rootRecordBefore);
    record === null || record === void 0 ? void 0 : record.content.after.push(rootRecordAfter);
    if (type === "circle") ;
    else if (type === "text") {
      const textRecord = resizeTextElementDetailByRatio(elem, opts);
      Object.keys(textRecord.content.before || {}).forEach((key2) => {
        var _a;
        rootRecordBefore[key2] = (_a = textRecord.content.before) === null || _a === void 0 ? void 0 : _a[key2];
      });
      Object.keys(textRecord.content.after || {}).forEach((key2) => {
        var _a;
        rootRecordAfter[key2] = (_a = textRecord.content.after) === null || _a === void 0 ? void 0 : _a[key2];
      });
    } else if (type === "image") ;
    else if (type === "svg") ;
    else if (type === "html") ;
    else if (type === "path") ;
    else if (type === "group" && Array.isArray(elem.detail.children)) {
      elem.detail.children.forEach((child) => {
        deepResizeElementByRatio(child, opts, record);
      });
    }
  }
  function fixedResizeGroupElementChildren(elem, opts, record) {
    if (!(elem.type === "group" && Array.isArray(elem.detail.children))) {
      return;
    }
    const { moveX, moveY, moveH, moveW } = opts;
    let childChangedX = 0;
    let childChangedY = 0;
    let needReszieChildren = false;
    if ((moveX !== 0 || moveY !== 0) && (moveH !== 0 || moveW !== 0)) {
      needReszieChildren = true;
      childChangedX = -moveX;
      childChangedY = -moveY;
    }
    if (needReszieChildren !== true) {
      return;
    }
    elem.detail.children.forEach((child) => {
      const { uuid, x: x2, y: y2 } = child;
      const afterX = x2 + childChangedX;
      const afterY = y2 + childChangedY;
      const before = { uuid, x: x2, y: y2 };
      const after = { uuid, x: afterX, y: afterY };
      child.x = afterX;
      child.y = afterY;
      record === null || record === void 0 ? void 0 : record.content.before.push(before);
      record === null || record === void 0 ? void 0 : record.content.after.push(after);
    });
  }
  function resizeEffectGroupElement(elem, size, opts) {
    if (!istype.number(size.x) && !istype.number(size.y)) {
      return null;
    }
    const record = {
      type: "modifyElements",
      time: Date.now(),
      content: {
        method: "modifyElements",
        before: [],
        after: []
      }
    };
    const uuid = elem.uuid;
    const originX = elem.x;
    const originY = elem.y;
    const originW = elem.w;
    const originH = elem.h;
    const resizeX = istype.number(size.x) ? size.x : elem.x;
    const resizeY = istype.number(size.y) ? size.y : elem.y;
    const resizeW = (size.w && size.w > 0 ? size.w : elem.w) || 0;
    const resizeH = (size.h && size.h > 0 ? size.h : elem.h) || 0;
    const beforeGroupElem = { uuid, x: originX, y: originY, w: originW, h: originH };
    const afterGroupElem = { uuid, x: resizeX, y: resizeY, w: resizeW, h: resizeH };
    if ((opts === null || opts === void 0 ? void 0 : opts.resizeEffect) === "deepResize") {
      const xRatio = resizeW / elem.w;
      const yRatio = resizeH / elem.h;
      if (xRatio === yRatio && xRatio === 1) {
        return record;
      }
      const minRatio = Math.min(xRatio, yRatio);
      const maxRatio = Math.max(xRatio, yRatio);
      elem.w = resizeW;
      elem.h = resizeH;
      const resizeRadioOpts = { xRatio, yRatio, minRatio, maxRatio };
      if (elem.type === "group" && Array.isArray(elem.detail.children)) {
        elem.detail.children.forEach((child) => {
          deepResizeElementByRatio(child, resizeRadioOpts, record);
        });
      }
      const groupDetailRecord = resizeElementBaseDetailByRatio(elem, resizeRadioOpts);
      Object.keys(groupDetailRecord.content.before || {}).forEach((key2) => {
        var _a;
        beforeGroupElem[key2] = (_a = groupDetailRecord.content.before) === null || _a === void 0 ? void 0 : _a[key2];
      });
      Object.keys(groupDetailRecord.content.after || {}).forEach((key2) => {
        var _a;
        afterGroupElem[key2] = (_a = groupDetailRecord.content.after) === null || _a === void 0 ? void 0 : _a[key2];
      });
      return record;
    }
    if ((opts === null || opts === void 0 ? void 0 : opts.resizeEffect) === "fixed") {
      record.content.before.push(beforeGroupElem);
      record.content.after.push(afterGroupElem);
      const moveX = resizeX - elem.x;
      const moveY = resizeY - elem.y;
      const moveW = resizeW - elem.w;
      const moveH = resizeH - elem.h;
      fixedResizeGroupElementChildren(elem, { moveX, moveY, moveH, moveW }, record);
      elem.w = resizeW;
      elem.h = resizeH;
      elem.x = resizeX;
      elem.y = resizeY;
      return record;
    }
    elem.w = resizeW;
    elem.h = resizeH;
    elem.x = resizeX;
    elem.y = resizeY;
    record.content.before.push(beforeGroupElem);
    record.content.after.push(afterGroupElem);
    return record;
  }
  const defaultViewWidth = 200;
  const defaultViewHeight = 200;
  function createElementSize(type, opts) {
    let x2 = 0;
    let y2 = 0;
    let w2 = defaultViewWidth;
    let h2 = defaultViewHeight;
    if (opts) {
      const { viewScaleInfo, viewSizeInfo } = opts;
      const { scale, offsetLeft, offsetTop } = viewScaleInfo;
      const { width, height } = viewSizeInfo;
      const limitViewWidth = width / 4;
      const limitViewHeight = height / 4;
      if (defaultViewWidth >= limitViewWidth) {
        w2 = limitViewWidth / scale;
      } else {
        w2 = defaultViewWidth / scale;
      }
      if (defaultViewHeight >= limitViewHeight) {
        h2 = limitViewHeight / scale;
      } else {
        h2 = defaultViewHeight / scale;
      }
      if (["circle", "svg", "image"].includes(type)) {
        w2 = h2 = Math.max(w2, h2);
      } else if (type === "text") {
        const fontSize2 = w2 / defaultText.length;
        h2 = fontSize2 * 2;
      }
      x2 = (0 - offsetLeft + width / 2 - w2 * scale / 2) / scale;
      y2 = (0 - offsetTop + height / 2 - h2 * scale / 2) / scale;
    }
    const elemSize = {
      x: x2,
      y: y2,
      w: w2,
      h: h2
    };
    return elemSize;
  }
  function createElement$1(type, baseElem, opts) {
    const elementSize = createElementSize(type, opts);
    let detail = {};
    if (type === "rect") {
      detail = getDefaultElementRectDetail();
    } else if (type === "circle") {
      detail = getDefaultElementCircleDetail();
    } else if (type === "text") {
      detail = getDefaultElementTextDetail(elementSize);
    } else if (type === "svg") {
      detail = getDefaultElementSVGDetail();
    } else if (type === "image") {
      detail = getDefaultElementImageDetail();
    } else if (type === "group") {
      detail = getDefaultElementGroupDetail();
    }
    const elem = Object.assign(Object.assign(Object.assign({ uuid: createUUID() }, elementSize), baseElem), { type, detail: Object.assign(Object.assign({}, detail), baseElem.detail || {}) });
    return elem;
  }
  function insertElementToListByPosition(element, position, list) {
    let result = false;
    if (position.length === 1) {
      const pos = position[0];
      list.splice(pos, 0, element);
      result = true;
    } else if (position.length > 1) {
      let tempList = list;
      for (let i = 0; i < position.length; i++) {
        const pos = position[i];
        const item = tempList[pos];
        if (i === position.length - 1) {
          const pos2 = position[i];
          tempList.splice(pos2, 0, element);
          result = true;
        } else if (i < position.length - 1 && item.type === "group") {
          tempList = item.detail.children;
        } else {
          break;
        }
      }
    }
    return result;
  }
  function deleteElementInListByPosition(position, list) {
    let result = false;
    if (position.length === 1) {
      const pos = position[0];
      list.splice(pos, 1);
      result = true;
    } else if (position.length > 1) {
      let tempList = list;
      for (let i = 0; i < position.length; i++) {
        const pos = position[i];
        const item = tempList[pos];
        if (i === position.length - 1) {
          const pos2 = position[i];
          tempList.splice(pos2, 1);
          result = true;
        } else if (i < position.length - 1 && item.type === "group") {
          tempList = item.detail.children;
        } else {
          break;
        }
      }
    }
    return result;
  }
  function deleteElementInList(uuid, list) {
    const position = getElementPositionFromList(uuid, list);
    return deleteElementInListByPosition(position, list);
  }
  function moveElementPosition(elements, opts) {
    const from = [...opts.from];
    const to = [...opts.to];
    if (from.length === 0 || to.length === 0) {
      return { elements, from, to };
    }
    if (from.length <= to.length) {
      for (let i = 0; i < from.length; i++) {
        if (to[i] === from[i]) {
          if (i === from.length - 1) {
            return { elements, from, to };
          }
          continue;
        }
      }
    }
    const target = findElementFromListByPosition(from, elements);
    if (target) {
      const insterResult = insertElementToListByPosition(target, to, elements);
      if (!insterResult) {
        return { elements, from, to };
      }
      let trimDeletePosIndex = -1;
      let isEffectToIndex = false;
      if (from.length >= 1 && to.length >= 1) {
        if (from.length <= to.length) {
          if (from.length === 1) {
            if (from[0] < to[0]) {
              isEffectToIndex = true;
            }
          } else {
            for (let i = 0; i < from.length; i++) {
              if (from[i] === to[i]) {
                if (from.length === from.length - 1) {
                  isEffectToIndex = true;
                  break;
                }
              } else {
                break;
              }
            }
          }
        }
        if (from.length >= to.length) {
          if (to.length === 1) {
            if (to[0] < from[0]) {
              isEffectToIndex = true;
            }
          } else {
            for (let i = 0; i < to.length; i++) {
              if (i === to.length - 1 && to[i] < from[i]) {
                isEffectToIndex = true;
              }
              if (from[i] === to[i]) {
                continue;
              } else {
                break;
              }
            }
          }
        }
      }
      if (isEffectToIndex === true) {
        for (let i = 0; i < from.length; i++) {
          if (!(to[i] >= 0)) {
            break;
          }
          if (to[i] === from[i]) {
            continue;
          }
          if (to[i] < from[i] && i == to.length - 1) {
            trimDeletePosIndex = i;
          }
        }
      }
      if (trimDeletePosIndex >= 0) {
        {
          from[trimDeletePosIndex] = from[trimDeletePosIndex] + 1;
        }
      }
      deleteElementInListByPosition(from, elements);
    }
    return { elements, from, to };
  }
  function mergeElement(originElem, updateContent, opts) {
    const updatedFlatten = toFlattenElement(updateContent);
    const ignoreKeys = ["uuid", "type"];
    const updatedKeys = Object.keys(updatedFlatten);
    updatedKeys.forEach((key2) => {
      if (!ignoreKeys.includes(key2)) {
        const value = updatedFlatten[key2];
        del(originElem, key2);
        if (value !== void 0) {
          set(originElem, key2, value);
        }
      }
    });
    if ((opts === null || opts === void 0 ? void 0 : opts.strict) === true) {
      const originFlatten = toFlattenElement(originElem);
      const originKeys = Object.keys(originFlatten);
      originKeys.forEach((key2) => {
        if (!ignoreKeys.includes(key2)) {
          if (!updatedKeys.includes(key2)) {
            del(originElem, key2);
          }
        }
      });
    }
    return originElem;
  }
  function updateElementInList(uuid, updateContent, elements) {
    var _a, _b, _c;
    let targetElement = null;
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      if (elem.uuid === uuid) {
        if (elem.type === "group" && ((_a = elem.operations) === null || _a === void 0 ? void 0 : _a.resizeEffect)) {
          resizeEffectGroupElement(elem, Object.assign({}, updateContent), {
            resizeEffect: (_b = elem.operations) === null || _b === void 0 ? void 0 : _b.resizeEffect
          });
        }
        mergeElement(elem, updateContent);
        targetElement = elem;
        break;
      } else if (elem.type === "group") {
        targetElement = updateElementInList(uuid, updateContent, ((_c = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _c === void 0 ? void 0 : _c.children) || []);
      }
    }
    return targetElement;
  }
  function updateElementInListByPosition(position, updateContent, elements, opts) {
    var _a, _b;
    const elem = findElementFromListByPosition(position, elements);
    if (elem) {
      if (elem.type === "group" && ((_a = elem.operations) === null || _a === void 0 ? void 0 : _a.resizeEffect)) {
        resizeEffectGroupElement(elem, Object.assign({}, updateContent), {
          resizeEffect: (_b = elem.operations) === null || _b === void 0 ? void 0 : _b.resizeEffect
        });
      }
      mergeElement(elem, updateContent, opts);
    }
    return elem;
  }
  function calcViewCenterContent(data, opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let offsetX = 0;
    let offsetY = 0;
    let scale = 1;
    let contentX = ((_b = (_a = data === null || data === void 0 ? void 0 : data.elements) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.x) || 0;
    let contentY = ((_d = (_c = data === null || data === void 0 ? void 0 : data.elements) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.y) || 0;
    let contentW = ((_f = (_e = data === null || data === void 0 ? void 0 : data.elements) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.w) || 0;
    let contentH = ((_h = (_g = data === null || data === void 0 ? void 0 : data.elements) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.h) || 0;
    const { width, height } = opts.viewSizeInfo;
    if (data.layout && ((_k = (_j = data.layout) === null || _j === void 0 ? void 0 : _j.detail) === null || _k === void 0 ? void 0 : _k.overflow) === "hidden") {
      contentX = 0;
      contentY = 0;
      contentW = data.layout.w || 0;
      contentH = data.layout.h || 0;
    } else {
      data.elements.forEach((elem) => {
        const elemSize = {
          x: elem.x,
          y: elem.y,
          w: elem.w,
          h: elem.h,
          angle: elem.angle
        };
        if (elemSize.angle && (elemSize.angle > 0 || elemSize.angle < 0)) {
          const ves = rotateElementVertexes(elemSize);
          if (ves.length === 4) {
            const xList = [ves[0].x, ves[1].x, ves[2].x, ves[3].x];
            const yList = [ves[0].y, ves[1].y, ves[2].y, ves[3].y];
            elemSize.x = Math.min(...xList);
            elemSize.y = Math.min(...yList);
            elemSize.w = Math.abs(Math.max(...xList) - Math.min(...xList));
            elemSize.h = Math.abs(Math.max(...yList) - Math.min(...yList));
          }
        }
        const areaStartX = Math.min(elemSize.x, contentX);
        const areaStartY = Math.min(elemSize.y, contentY);
        const areaEndX = Math.max(elemSize.x + elemSize.w, contentX + contentW);
        const areaEndY = Math.max(elemSize.y + elemSize.h, contentY + contentH);
        contentX = areaStartX;
        contentY = areaStartY;
        contentW = Math.abs(areaEndX - areaStartX);
        contentH = Math.abs(areaEndY - areaStartY);
      });
    }
    if (data.layout) {
      const { x: x2, y: y2, w: w2, h: h2 } = data.layout;
      if (is.x(x2) && is.y(y2) && is.w(w2) && is.h(h2)) {
        contentX = Math.min(contentX, x2);
        contentY = Math.min(contentY, y2);
        contentW = Math.max(contentW, w2);
        contentH = Math.max(contentH, h2);
      }
    }
    if (contentW > 0 && contentH > 0) {
      const scaleW = formatNumber(width / contentW, { decimalPlaces: 4 });
      const scaleH = formatNumber(height / contentH, { decimalPlaces: 4 });
      scale = Math.min(scaleW, scaleH, 1);
      offsetX = (contentW * scale - width) / 2 / scale + contentX;
      offsetY = (contentH * scale - height) / 2 / scale + contentY;
    }
    const result = {
      offsetX: formatNumber(offsetX, { decimalPlaces: 0 }),
      offsetY: formatNumber(offsetY, { decimalPlaces: 0 }),
      scale
    };
    return result;
  }
  function calcViewCenter(opts) {
    let x2 = 0;
    let y2 = 0;
    if (opts) {
      const { viewScaleInfo, viewSizeInfo } = opts;
      const { offsetLeft, offsetTop, scale } = viewScaleInfo;
      const { width, height } = viewSizeInfo;
      x2 = 0 - offsetLeft + width / scale / 2;
      y2 = 0 - offsetTop + height / scale / 2;
    }
    const p = {
      x: x2,
      y: y2
    };
    return p;
  }
  const baseFontFamilyList = ["-apple-system", '"system-ui"', ' "Segoe UI"', " Roboto", '"Helvetica Neue"', "Arial", '"Noto Sans"', " sans-serif"];
  function enhanceFontFamliy(fontFamily2) {
    return [fontFamily2, ...baseFontFamilyList].join(", ");
  }
  var __rest$3 = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  function flatElementSize(elemSize, opts) {
    const { groupQueue } = opts;
    let { x: x2, y: y2 } = elemSize;
    const { w: w2, h: h2, angle: angle2 = 0 } = elemSize;
    let totalAngle = 0;
    groupQueue.forEach((group) => {
      x2 += group.x;
      y2 += group.y;
      totalAngle += group.angle || 0;
    });
    totalAngle = limitAngle(totalAngle);
    if (totalAngle === 0) {
      return {
        x: x2,
        y: y2,
        w: w2,
        h: h2,
        angle: angle2
      };
    }
    totalAngle += elemSize.angle || 0;
    totalAngle = limitAngle(totalAngle);
    const vertexes = calcElementVertexesInGroup(elemSize, { groupQueue });
    const center = calcElementCenterFromVertexes(vertexes);
    const start = rotatePoint(center, vertexes[0], parseAngleToRadian(0 - totalAngle));
    x2 = start.x;
    y2 = start.y;
    return {
      x: x2,
      y: y2,
      w: w2,
      h: h2,
      angle: totalAngle
    };
  }
  function isValidElement(elem) {
    var _a;
    if (["rect", "circle"].includes(elem.type)) {
      const detail = elem.detail;
      if (!detail.background && !detail.borderWidth) {
        return false;
      }
      if (detail.background === "transparent" && !detail.borderWidth) {
        return false;
      }
    }
    if (["group"].includes(elem.type)) {
      const detail = elem.detail || {};
      const { children } = detail;
      if (!(children.length > 0) && !detail.background && !detail.borderWidth) {
        return false;
      }
      if (!(children.length > 0) && detail.background === "transparent" && !detail.borderWidth) {
        return false;
      }
    }
    if (elem.type === "text") {
      if (!elem.detail.text) {
        return false;
      }
    }
    if (elem.type === "image") {
      if (!elem.detail.src) {
        return false;
      }
    }
    if (elem.type === "html") {
      if (!elem.detail.html) {
        return false;
      }
    }
    if (elem.type === "svg") {
      if (!elem.detail.svg) {
        return false;
      }
    }
    if (elem.type === "path") {
      const detail = elem.detail;
      if (!(((_a = detail === null || detail === void 0 ? void 0 : detail.commands) === null || _a === void 0 ? void 0 : _a.length) > 0)) {
        return false;
      }
    }
    return true;
  }
  function flatElementList(list) {
    const elemeList = [];
    const currentGroupQueue = [];
    const _resetElemSize = (elem) => {
      if (!isValidElement(elem)) {
        return;
      }
      const newSize = flatElementSize(elem, { groupQueue: currentGroupQueue });
      const resizeElem = Object.assign(Object.assign({}, elem), newSize);
      elemeList.push(resizeElem);
    };
    const _walk = (elem) => {
      var _a;
      if (((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.invisible) === true) {
        return;
      }
      if (elem.type === "group") {
        const { detail } = elem;
        const { children } = detail, restDetail = __rest$3(detail, ["children"]);
        _resetElemSize(Object.assign(Object.assign({}, elem), { detail: Object.assign(Object.assign({}, restDetail), { children: [] }) }));
        currentGroupQueue.push(elem);
        children.forEach((child) => {
          _walk(child);
        });
        currentGroupQueue.pop();
      } else {
        _resetElemSize(elem);
      }
    };
    for (let i = 0; i < list.length; i++) {
      const elem = list[i];
      _walk(elem);
    }
    return elemeList;
  }
  function calcPointMoveElementInGroup(start, end, groupQueue) {
    let moveX = end.x - start.x;
    let moveY = end.y - start.y;
    const pointGroupQueue = [];
    groupQueue.forEach((group) => {
      const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = group;
      pointGroupQueue.push({
        x: x2,
        y: y2,
        w: w2,
        h: h2,
        angle: 0 - angle2
      });
    });
    if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
      const startInGroup = rotatePointInGroup(start, pointGroupQueue);
      const endInGroup = rotatePointInGroup(end, pointGroupQueue);
      moveX = endInGroup.x - startInGroup.x;
      moveY = endInGroup.y - startInGroup.y;
    }
    return {
      moveX,
      moveY
    };
  }
  function mergeLayout(originLayout, updateContent, opts) {
    const updatedFlatten = toFlattenLayout(updateContent);
    const ignoreKeys = [];
    const updatedKeys = Object.keys(updatedFlatten);
    updatedKeys.forEach((key2) => {
      if (!ignoreKeys.includes(key2)) {
        const value = updatedFlatten[key2];
        del(originLayout, key2);
        if (value !== void 0) {
          set(originLayout, key2, value);
        }
      }
    });
    return originLayout;
  }
  function mergeGlobal(originGlobal, updateContent, opts) {
    const updatedFlatten = toFlattenGlobal(updateContent);
    const ignoreKeys = [];
    const updatedKeys = Object.keys(updatedFlatten);
    updatedKeys.forEach((key2) => {
      if (!ignoreKeys.includes(key2)) {
        const value = updatedFlatten[key2];
        del(originGlobal, key2);
        if (value !== void 0) {
          set(originGlobal, key2, value);
        }
      }
    });
    return originGlobal;
  }
  function calcResultMovePosition(opts) {
    const from = [...opts.from];
    const to = [...opts.to];
    if (from.length === 0 || to.length === 0) {
      return null;
    }
    if (from.length <= to.length) {
      for (let i = 0; i < from.length; i++) {
        if (to[i] === from[i]) {
          if (i === from.length - 1) {
            return null;
          }
          continue;
        }
      }
    }
    let moveDirection = null;
    if (from.length >= 1 && to.length >= 1) {
      if (from.length <= to.length) {
        if (from.length === 1) {
          if (from[0] < to[0]) {
            moveDirection = "up-down";
          }
        } else {
          for (let i = 0; i < from.length; i++) {
            if (from[i] === to[i]) {
              if (from.length === from.length - 1) {
                moveDirection = "up-down";
                break;
              }
            } else {
              break;
            }
          }
        }
      }
      if (from.length >= to.length) {
        if (to.length === 1) {
          if (to[0] < from[0]) {
            moveDirection = "down-up";
          }
        } else {
          for (let i = 0; i < to.length; i++) {
            if (i === to.length - 1 && to[i] < from[i]) {
              moveDirection = "down-up";
            }
            if (from[i] === to[i]) {
              continue;
            } else {
              break;
            }
          }
        }
      }
    }
    const startEffectIndex = from.length - 1;
    const endEffectIndex = to.length - 1;
    if (moveDirection === "up-down" && startEffectIndex >= 0) {
      to[startEffectIndex] -= 1;
    } else if (moveDirection === "down-up" && endEffectIndex >= 0) {
      from[endEffectIndex] += 1;
    }
    return { from, to };
  }
  function calcRevertMovePosition(opts) {
    const result = calcResultMovePosition(opts);
    if (!result) {
      return result;
    }
    return {
      from: [...result.to],
      to: [...result.from]
    };
  }
  function merge(target, source) {
    const result = target;
    for (const key2 in source) {
      if (Object.prototype.hasOwnProperty.call(source, key2)) {
        if (typeof source[key2] === "object" && source[key2] !== null && typeof result[key2] === "object" && result[key2] !== null) {
          result[key2] = merge(result[key2], source[key2]);
        } else {
          result[key2] = source[key2];
        }
      }
    }
    return target;
  }
  function omit(obj, keys) {
    const result = Object.assign({}, obj);
    for (const key2 of keys) {
      delete result[key2];
    }
    return result;
  }
  function unflatObject(flatObj) {
    const result = {};
    for (const [flatKey, value] of Object.entries(flatObj)) {
      const pathParts = parseKeyToPath(flatKey);
      buildNestedStructure(result, pathParts, value);
    }
    return result;
  }
  function parseKeyToPath(flatKey) {
    const regex = /([\w-]+)|\[(\d+)\]/g;
    const pathParts = [];
    let match;
    while ((match = regex.exec(flatKey)) !== null) {
      const prop = match[1] || match[2];
      if (prop) {
        pathParts.push(prop);
      }
    }
    return pathParts;
  }
  function buildNestedStructure(currentObj, pathParts, value) {
    let currentLevel = currentObj;
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const isArrayPart = isArrayIndex(part);
      const isLast = i === pathParts.length - 1;
      try {
        if (isArrayPart) {
          validateArrayPath(currentLevel, part);
        } else {
          validateObjectPath(currentLevel, part);
        }
      } catch (e) {
        throw new Error(`Structure conflict at path '${pathParts.slice(0, i + 1).join(".")}': ${e.message}`);
      }
      if (isLast) {
        assignValue(currentLevel, part, value);
      } else {
        currentLevel = prepareNextLevel(currentLevel, part, pathParts[i + 1]);
      }
    }
  }
  function isArrayIndex(key2) {
    return /^\d+$/.test(key2);
  }
  function validateArrayPath(obj, index) {
    if (!Array.isArray(obj)) {
      throw new Error(`Expected array but found ${typeof obj}`);
    }
    const idx = Number(index);
    if (idx > obj.length) {
      obj.length = idx + 1;
    }
  }
  function validateObjectPath(obj, key2) {
    if (Array.isArray(obj)) {
      throw new Error(`Cannot create object property '${key2}' on array`);
    }
    if (typeof obj !== "object" || obj === null) {
      throw new Error(`Invalid structure for property '${key2}'`);
    }
  }
  function prepareNextLevel(current, part, nextPart) {
    const isNextArray = nextPart ? isArrayIndex(nextPart) : false;
    if (Array.isArray(current)) {
      const index = Number(part);
      if (!current[index]) {
        current[index] = isNextArray ? [] : {};
      }
      return current[index];
    }
    if (!current[part]) {
      current[part] = isNextArray ? [] : {};
    }
    return current[part];
  }
  function assignValue(target, key2, value) {
    if (Array.isArray(target)) {
      const index = Number(key2);
      if (index >= target.length) {
        target.length = index + 1;
      }
      target[index] = value;
    } else {
      target[key2] = value;
    }
  }
  function createColorStyle(ctx, color2, opts) {
    if (typeof color2 === "string") {
      return color2;
    }
    const { viewElementSize, viewScaleInfo, opacity = 1 } = opts;
    const { x: x2, y: y2 } = viewElementSize;
    const { scale } = viewScaleInfo;
    if ((color2 === null || color2 === void 0 ? void 0 : color2.type) === "linear-gradient") {
      const { start, end, stops } = color2;
      const viewStart = {
        x: x2 + start.x * scale,
        y: y2 + start.y * scale
      };
      const viewEnd = {
        x: x2 + end.x * scale,
        y: y2 + end.y * scale
      };
      const linearGradient = ctx.createLinearGradient(viewStart.x, viewStart.y, viewEnd.x, viewEnd.y);
      stops.forEach((stop) => {
        linearGradient.addColorStop(stop.offset, mergeHexColorAlpha(stop.color, opacity));
      });
      return linearGradient;
    }
    if ((color2 === null || color2 === void 0 ? void 0 : color2.type) === "radial-gradient") {
      const { inner, outer, stops } = color2;
      const viewInner = {
        x: x2 + inner.x * scale,
        y: y2 + inner.y * scale,
        radius: inner.radius * scale
      };
      const viewOuter = {
        x: x2 + outer.x * scale,
        y: y2 + outer.y * scale,
        radius: outer.radius * scale
      };
      const radialGradient = ctx.createRadialGradient(viewInner.x, viewInner.y, viewInner.radius, viewOuter.x, viewOuter.y, viewOuter.radius);
      stops.forEach((stop) => {
        radialGradient.addColorStop(stop.offset, mergeHexColorAlpha(stop.color, opacity));
      });
      return radialGradient;
    }
    return "#000000";
  }
  const defaultElemConfig = getDefaultElementDetailConfig();
  function getOpacity(elem) {
    var _a, _b, _c, _d;
    let opacity = 1;
    if (((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.opacity) !== void 0 && ((_b = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _b === void 0 ? void 0 : _b.opacity) >= 0 && ((_c = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _c === void 0 ? void 0 : _c.opacity) <= 1) {
      opacity = (_d = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _d === void 0 ? void 0 : _d.opacity;
    }
    return opacity;
  }
  function drawBox(ctx, viewElem, opts) {
    const { pattern, renderContent, originElem, calcElemSize, viewScaleInfo, viewSizeInfo } = opts || {};
    const { parentOpacity } = opts;
    const opacity = getOpacity(originElem) * parentOpacity;
    const { clipPath, clipPathStrokeColor, clipPathStrokeWidth } = originElem.detail;
    const mainRender = () => {
      ctx.globalAlpha = opacity;
      drawBoxBackground(ctx, viewElem, { pattern, viewScaleInfo, viewSizeInfo });
      renderContent === null || renderContent === void 0 ? void 0 : renderContent();
      drawBoxBorder(ctx, viewElem, { viewScaleInfo });
      ctx.globalAlpha = parentOpacity;
    };
    if (clipPath) {
      drawClipPath(ctx, viewElem, {
        originElem,
        calcElemSize,
        viewSizeInfo,
        renderContent: () => {
          mainRender();
        }
      });
      if (typeof clipPathStrokeWidth === "number" && clipPathStrokeWidth > 0 && clipPathStrokeColor) {
        drawClipPathStroke(ctx, viewElem, {
          originElem,
          calcElemSize,
          viewSizeInfo,
          parentOpacity
        });
      }
    } else {
      mainRender();
    }
  }
  function drawClipPath(ctx, viewElem, opts) {
    const { renderContent, originElem, calcElemSize, viewSizeInfo } = opts;
    const totalScale = viewSizeInfo.devicePixelRatio;
    const { clipPath } = (originElem === null || originElem === void 0 ? void 0 : originElem.detail) || {};
    if (clipPath && calcElemSize && clipPath.commands) {
      const { x: x2, y: y2, w: w2, h: h2 } = calcElemSize;
      const { originW, originH, originX, originY } = clipPath;
      const scaleW = w2 / originW;
      const scaleH = h2 / originH;
      const viewOriginX = originX * scaleW;
      const viewOriginY = originY * scaleH;
      const internalX = x2 - viewOriginX;
      const internalY = y2 - viewOriginY;
      ctx.save();
      ctx.translate(internalX, internalY);
      ctx.scale(totalScale * scaleW, totalScale * scaleH);
      const pathStr = generateSVGPath(clipPath.commands || []);
      const path2d = new Path2D(pathStr);
      ctx.clip(path2d, "nonzero");
      ctx.translate(0 - internalX, 0 - internalY);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      rotateElement$1(ctx, Object.assign({}, viewElem), () => {
        renderContent === null || renderContent === void 0 ? void 0 : renderContent();
      });
      ctx.restore();
    } else {
      renderContent === null || renderContent === void 0 ? void 0 : renderContent();
    }
  }
  function drawClipPathStroke(ctx, viewElem, opts) {
    const { renderContent, originElem, calcElemSize, viewSizeInfo, parentOpacity } = opts;
    const totalScale = viewSizeInfo.devicePixelRatio;
    const { clipPath, clipPathStrokeColor, clipPathStrokeWidth } = (originElem === null || originElem === void 0 ? void 0 : originElem.detail) || {};
    if (clipPath && calcElemSize && clipPath.commands && typeof clipPathStrokeWidth === "number" && clipPathStrokeWidth > 0 && clipPathStrokeColor) {
      const { x: x2, y: y2, w: w2, h: h2 } = calcElemSize;
      const { originW, originH, originX, originY } = clipPath;
      const scaleW = w2 / originW;
      const scaleH = h2 / originH;
      const viewOriginX = originX * scaleW;
      const viewOriginY = originY * scaleH;
      const internalX = x2 - viewOriginX;
      const internalY = y2 - viewOriginY;
      ctx.save();
      ctx.globalAlpha = parentOpacity;
      ctx.translate(internalX, internalY);
      ctx.scale(totalScale * scaleW, totalScale * scaleH);
      const pathStr = generateSVGPath(clipPath.commands || []);
      const path2d = new Path2D(pathStr);
      ctx.strokeStyle = clipPathStrokeColor;
      ctx.lineWidth = clipPathStrokeWidth;
      ctx.stroke(path2d);
      ctx.translate(0 - internalX, 0 - internalY);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      rotateElement$1(ctx, Object.assign({}, viewElem), () => {
        renderContent === null || renderContent === void 0 ? void 0 : renderContent();
      });
      ctx.restore();
    } else {
      renderContent === null || renderContent === void 0 ? void 0 : renderContent();
    }
  }
  function drawBoxBackground(ctx, viewElem, opts) {
    var _a, _b;
    const { pattern, viewScaleInfo, viewSizeInfo } = opts;
    const transform = [];
    if (viewElem.detail.background || pattern) {
      const { x: x2, y: y2, w: w2, h: h2, radiusList } = calcViewBoxSize(viewElem, {
        viewScaleInfo
      });
      ctx.beginPath();
      ctx.moveTo(x2 + radiusList[0], y2);
      ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, radiusList[1]);
      ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, radiusList[2]);
      ctx.arcTo(x2, y2 + h2, x2, y2, radiusList[3]);
      ctx.arcTo(x2, y2, x2 + w2, y2, radiusList[0]);
      ctx.closePath();
      if (typeof pattern === "string") {
        ctx.fillStyle = pattern;
      } else if (["CanvasPattern"].includes(istype.type(pattern))) {
        ctx.fillStyle = pattern;
      } else if (typeof viewElem.detail.background === "string") {
        ctx.fillStyle = viewElem.detail.background;
      } else if (((_a = viewElem.detail.background) === null || _a === void 0 ? void 0 : _a.type) === "linear-gradient") {
        const colorStyle = createColorStyle(ctx, viewElem.detail.background, {
          viewElementSize: { x: x2, y: y2, w: w2, h: h2 },
          viewScaleInfo,
          opacity: ctx.globalAlpha
        });
        ctx.fillStyle = colorStyle;
      } else if (((_b = viewElem.detail.background) === null || _b === void 0 ? void 0 : _b.type) === "radial-gradient") {
        const colorStyle = createColorStyle(ctx, viewElem.detail.background, {
          viewElementSize: { x: x2, y: y2, w: w2, h: h2 },
          viewScaleInfo,
          opacity: ctx.globalAlpha
        });
        ctx.fillStyle = colorStyle;
        if (transform && transform.length > 0) {
          for (let i = 0; i < (transform === null || transform === void 0 ? void 0 : transform.length); i++) {
            const action = transform[i];
            if (action.method === "translate") {
              ctx.translate(action.args[0] + x2, action.args[1] + y2);
            } else if (action.method === "rotate") {
              ctx.rotate(...action.args);
            } else if (action.method === "scale") {
              ctx.scale(...action.args);
            }
          }
        }
      }
      ctx.fill("nonzero");
      if (transform && transform.length > 0) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }
  function drawBoxBorder(ctx, viewElem, opts) {
    if (viewElem.detail.borderWidth === 0) {
      return;
    }
    if (!isColorStr(viewElem.detail.borderColor)) {
      return;
    }
    const { viewScaleInfo } = opts;
    const { scale } = viewScaleInfo;
    let borderColor2 = defaultElemConfig.borderColor;
    if (isColorStr(viewElem.detail.borderColor) === true) {
      borderColor2 = viewElem.detail.borderColor;
    }
    const { borderDash, borderWidth: borderWidth2, borderRadius: borderRadius2, boxSizing = defaultElemConfig.boxSizing } = viewElem.detail;
    let viewBorderDash = [];
    if (Array.isArray(borderDash) && borderDash.length > 0) {
      viewBorderDash = borderDash.map((num) => Math.ceil(num * scale));
    }
    if (viewBorderDash.length > 0) {
      ctx.lineCap = "butt";
    } else {
      ctx.lineCap = "square";
    }
    let radiusList = [0, 0, 0, 0];
    if (typeof borderRadius2 === "number") {
      const br = borderRadius2 * scale;
      radiusList = [br, br, br, br];
    } else if (Array.isArray(borderRadius2) && (borderRadius2 === null || borderRadius2 === void 0 ? void 0 : borderRadius2.length) === 4) {
      radiusList = [borderRadius2[0] * scale, borderRadius2[1] * scale, borderRadius2[2] * scale, borderRadius2[3] * scale];
    }
    let bw = 0;
    if (typeof borderWidth2 === "number") {
      bw = borderWidth2 || 1;
    }
    bw = bw * scale;
    ctx.strokeStyle = borderColor2;
    let borderTop = 0;
    let borderRight = 0;
    let borderBottom = 0;
    let borderLeft = 0;
    if (Array.isArray(borderWidth2)) {
      borderTop = (borderWidth2[0] || 0) * scale;
      borderRight = (borderWidth2[1] || 0) * scale;
      borderBottom = (borderWidth2[2] || 0) * scale;
      borderLeft = (borderWidth2[3] || 0) * scale;
    }
    if (borderLeft || borderRight || borderTop || borderBottom) {
      ctx.lineCap = "butt";
      let { x: x2, y: y2, w: w2, h: h2 } = viewElem;
      if (boxSizing === "border-box") {
        x2 = x2 + borderLeft / 2;
        y2 = y2 + borderTop / 2;
        w2 = w2 - borderLeft / 2 - borderRight / 2;
        h2 = h2 - borderTop / 2 - borderBottom / 2;
      } else if (boxSizing === "content-box") {
        x2 = x2 - borderLeft / 2;
        y2 = y2 - borderTop / 2;
        w2 = w2 + borderLeft / 2 + borderRight / 2;
        h2 = h2 + borderTop / 2 + borderBottom / 2;
      } else {
        x2 = viewElem.x;
        y2 = viewElem.y;
        w2 = viewElem.w;
        h2 = viewElem.h;
      }
      if (borderTop) {
        ctx.beginPath();
        ctx.lineWidth = borderTop;
        ctx.moveTo(x2 - borderLeft / 2, y2);
        ctx.lineTo(x2 + w2 + borderRight / 2, y2);
        ctx.closePath();
        ctx.stroke();
      }
      if (borderRight) {
        ctx.beginPath();
        ctx.lineWidth = borderRight;
        ctx.moveTo(x2 + w2, y2 - borderTop / 2);
        ctx.lineTo(x2 + w2, y2 + h2 + borderBottom / 2);
        ctx.closePath();
        ctx.stroke();
      }
      if (borderBottom) {
        ctx.beginPath();
        ctx.lineWidth = borderBottom;
        ctx.moveTo(x2 - borderLeft / 2, y2 + h2);
        ctx.lineTo(x2 + w2 + borderRight / 2, y2 + h2);
        ctx.closePath();
        ctx.stroke();
      }
      if (borderLeft) {
        ctx.beginPath();
        ctx.lineWidth = borderLeft;
        ctx.moveTo(x2, y2 - borderTop / 2);
        ctx.lineTo(x2, y2 + h2 + borderBottom / 2);
        ctx.closePath();
        ctx.stroke();
      }
    } else {
      let { x: x2, y: y2, w: w2, h: h2 } = viewElem;
      if (boxSizing === "border-box") {
        x2 = viewElem.x + bw / 2;
        y2 = viewElem.y + bw / 2;
        w2 = viewElem.w - bw;
        h2 = viewElem.h - bw;
      } else if (boxSizing === "content-box") {
        x2 = viewElem.x - bw / 2;
        y2 = viewElem.y - bw / 2;
        w2 = viewElem.w + bw;
        h2 = viewElem.h + bw;
      } else {
        x2 = viewElem.x;
        y2 = viewElem.y;
        w2 = viewElem.w;
        h2 = viewElem.h;
      }
      w2 = Math.max(w2, 1);
      h2 = Math.max(h2, 1);
      radiusList = radiusList.map((r) => {
        return Math.min(r, w2 / 2, h2 / 2);
      });
      ctx.setLineDash(viewBorderDash);
      ctx.lineWidth = bw;
      ctx.beginPath();
      ctx.moveTo(x2 + radiusList[0], y2);
      ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, radiusList[1]);
      ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, radiusList[2]);
      ctx.arcTo(x2, y2 + h2, x2, y2, radiusList[3]);
      ctx.arcTo(x2, y2, x2 + w2, y2, radiusList[0]);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }
  function drawBoxShadow(ctx, viewElem, opts) {
    const { detail } = viewElem;
    const { viewScaleInfo, renderContent } = opts;
    const { shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur } = detail;
    if (is.number(shadowBlur)) {
      ctx.save();
      ctx.shadowColor = shadowColor || defaultElemConfig.shadowColor;
      ctx.shadowOffsetX = (shadowOffsetX || 0) * viewScaleInfo.scale;
      ctx.shadowOffsetY = (shadowOffsetY || 0) * viewScaleInfo.scale;
      ctx.shadowBlur = (shadowBlur || 0) * viewScaleInfo.scale;
      renderContent();
      ctx.restore();
    } else {
      ctx.save();
      ctx.shadowColor = "transparent";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      renderContent();
      ctx.restore();
    }
  }
  function drawCircle(ctx, elem, opts) {
    const { detail, angle: angle2 } = elem;
    const { viewScaleInfo, viewSizeInfo, parentOpacity } = opts;
    const { background: background2 = "#000000", borderColor: borderColor2 = "#000000", boxSizing, borderWidth: borderWidth2 = 0, borderDash } = detail;
    let bw = 0;
    if (typeof borderWidth2 === "number" && borderWidth2 > 0) {
      bw = borderWidth2;
    } else if (Array.isArray(borderWidth2) && typeof borderWidth2[0] === "number" && borderWidth2[0] > 0) {
      bw = borderWidth2[0];
    }
    bw = bw * viewScaleInfo.scale;
    const { x: x2, y: y2, w: w2, h: h2 } = calcViewElementSize({ x: elem.x, y: elem.y, w: elem.w, h: elem.h }, { viewScaleInfo }) || elem;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        renderContent: () => {
          let a = w2 / 2;
          let b = h2 / 2;
          const centerX = x2 + a;
          const centerY = y2 + b;
          const radiusA = a;
          const radiusB = b;
          if (bw > 0) {
            if (boxSizing === "content-box") ;
            else if (boxSizing === "center-line") {
              a = a - bw / 2;
              b = b - bw / 2;
            } else {
              a = a - bw;
              b = b - bw;
            }
          }
          if (a >= 0 && b >= 0) {
            const opacity = getOpacity(viewElem) * parentOpacity;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            const fillStyle = createColorStyle(ctx, background2, {
              viewElementSize: { x: x2, y: y2, w: w2, h: h2 },
              viewScaleInfo,
              opacity: ctx.globalAlpha
            });
            ctx.fillStyle = fillStyle;
            ctx.circle(centerX, centerY, radiusA, radiusB, 0, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill("nonzero");
            ctx.globalAlpha = parentOpacity;
            if (typeof bw === "number" && bw > 0) {
              const ba = bw / 2 + a;
              const bb = bw / 2 + b;
              ctx.beginPath();
              if (borderDash) {
                const lineDash = borderDash.map((n) => n * viewScaleInfo.scale);
                ctx.setLineDash(lineDash);
              }
              ctx.strokeStyle = borderColor2;
              ctx.lineWidth = bw;
              ctx.circle(centerX, centerY, ba, bb, 0, 0, 2 * Math.PI);
              ctx.closePath();
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        }
      });
    });
  }
  function drawRect(ctx, elem, opts) {
    const { viewScaleInfo, viewSizeInfo, parentOpacity } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        renderContent: () => {
          drawBox(ctx, viewElem, {
            originElem: elem,
            calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
            viewScaleInfo,
            viewSizeInfo,
            parentOpacity,
            renderContent: () => {
            }
          });
        }
      });
    });
  }
  function drawImage(ctx, elem, opts) {
    const content = opts.loader.getContent(elem);
    const { viewScaleInfo, viewSizeInfo, parentOpacity } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        renderContent: () => {
          drawBox(ctx, viewElem, {
            originElem: elem,
            calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
            viewScaleInfo,
            viewSizeInfo,
            parentOpacity,
            renderContent: () => {
              if (!content && !opts.loader.isDestroyed()) {
                opts.loader.load(elem, opts.elementAssets || {});
              }
              if (elem.type === "image" && content) {
                ctx.globalAlpha = getOpacity(elem) * parentOpacity;
                const { x: x3, y: y3, w: w3, h: h3, radiusList } = calcViewBoxSize(viewElem, {
                  viewScaleInfo
                });
                const { detail } = elem;
                const { scaleMode, originW = 0, originH = 0 } = detail;
                const imageW = ctx.$undoPixelRatio(originW);
                const imageH = ctx.$undoPixelRatio(originH);
                ctx.save();
                ctx.fillStyle = "transparent";
                ctx.beginPath();
                ctx.moveTo(x3 + radiusList[0], y3);
                ctx.arcTo(x3 + w3, y3, x3 + w3, y3 + h3, radiusList[1]);
                ctx.arcTo(x3 + w3, y3 + h3, x3, y3 + h3, radiusList[2]);
                ctx.arcTo(x3, y3 + h3, x3, y3, radiusList[3]);
                ctx.arcTo(x3, y3, x3 + w3, y3, radiusList[0]);
                ctx.closePath();
                ctx.fill("nonzero");
                ctx.clip("nonzero");
                if (scaleMode && originH && originW) {
                  let sx = 0;
                  let sy = 0;
                  let sWidth = imageW;
                  let sHeight = imageH;
                  const dx = x3;
                  const dy = y3;
                  const dWidth = w3;
                  const dHeight = h3;
                  if (imageW > elem.w || imageH > elem.h) {
                    if (scaleMode === "fill") {
                      const sourceScale = Math.max(elem.w / imageW, elem.h / imageH);
                      const newImageWidth = imageW * sourceScale;
                      const newImageHeight = imageH * sourceScale;
                      sx = (newImageWidth - elem.w) / 2 / sourceScale;
                      sy = (newImageHeight - elem.h) / 2 / sourceScale;
                      sWidth = elem.w / sourceScale;
                      sHeight = elem.h / sourceScale;
                    } else if (scaleMode === "tile") {
                      sx = 0;
                      sy = 0;
                      sWidth = elem.w;
                      sHeight = elem.h;
                    } else if (scaleMode === "fit") {
                      const sourceScale = Math.min(elem.w / imageW, elem.h / imageH);
                      sx = (imageW - elem.w / sourceScale) / 2;
                      sy = (imageH - elem.h / sourceScale) / 2;
                      sWidth = elem.w / sourceScale;
                      sHeight = elem.h / sourceScale;
                    }
                  }
                  ctx.drawImage(content, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                } else {
                  ctx.drawImage(content, x3, y3, w3, h3);
                }
                ctx.globalAlpha = parentOpacity;
                ctx.restore();
              }
            }
          });
        }
      });
    });
  }
  function drawSVG(ctx, elem, opts) {
    const content = opts.loader.getContent(elem);
    const { viewScaleInfo, parentOpacity } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      if (!content && !opts.loader.isDestroyed()) {
        opts.loader.load(elem, opts.elementAssets || {});
      }
      if (elem.type === "svg" && content) {
        ctx.globalAlpha = getOpacity(elem) * parentOpacity;
        ctx.drawImage(content, x2, y2, w2, h2);
        ctx.globalAlpha = parentOpacity;
      }
    });
  }
  function drawHTML(ctx, elem, opts) {
    const content = opts.loader.getContent(elem);
    const { viewScaleInfo, parentOpacity } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      if (!content && !opts.loader.isDestroyed()) {
        opts.loader.load(elem, opts.elementAssets || {});
      }
      if (elem.type === "html" && content) {
        ctx.globalAlpha = getOpacity(elem) * parentOpacity;
        ctx.drawImage(content, x2, y2, w2, h2);
        ctx.globalAlpha = parentOpacity;
      }
    });
  }
  const detailConfig$1 = getDefaultElementDetailConfig();
  function drawText(ctx, elem, opts) {
    const { viewScaleInfo, viewSizeInfo, parentOpacity, calculator } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      var _a, _b;
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        renderContent: () => {
          drawBox(ctx, viewElem, {
            originElem: elem,
            calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
            viewScaleInfo,
            viewSizeInfo,
            parentOpacity
          });
        }
      });
      {
        const detail = Object.assign(Object.assign({}, detailConfig$1), elem.detail);
        const originFontSize = detail.fontSize || detailConfig$1.fontSize;
        const fontSize2 = originFontSize * viewScaleInfo.scale;
        if (fontSize2 < 2) {
          return;
        }
        ctx.fillStyle = elem.detail.color || detailConfig$1.color;
        ctx.textBaseline = "top";
        ctx.$setFont({
          fontWeight: detail.fontWeight,
          fontSize: fontSize2,
          fontFamily: enhanceFontFamliy(detail.fontFamily)
        });
        {
          const virtualTextDetail = calculator.getVirtualFlatItem(elem.uuid);
          if (Array.isArray(virtualTextDetail === null || virtualTextDetail === void 0 ? void 0 : virtualTextDetail.textLines) && ((_a = virtualTextDetail === null || virtualTextDetail === void 0 ? void 0 : virtualTextDetail.textLines) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            if (detail.textShadowColor !== void 0 && isColorStr(detail.textShadowColor)) {
              ctx.shadowColor = detail.textShadowColor;
            }
            if (detail.textShadowOffsetX !== void 0 && is.number(detail.textShadowOffsetX)) {
              ctx.shadowOffsetX = detail.textShadowOffsetX;
            }
            if (detail.textShadowOffsetY !== void 0 && is.number(detail.textShadowOffsetY)) {
              ctx.shadowOffsetY = detail.textShadowOffsetY;
            }
            if (detail.textShadowBlur !== void 0 && is.number(detail.textShadowBlur)) {
              ctx.shadowBlur = detail.textShadowBlur;
            }
            (_b = virtualTextDetail === null || virtualTextDetail === void 0 ? void 0 : virtualTextDetail.textLines) === null || _b === void 0 ? void 0 : _b.forEach((line) => {
              ctx.fillText(line.text, x2 + line.x * viewScaleInfo.scale, y2 + line.y * viewScaleInfo.scale);
            });
          }
        }
      }
    });
  }
  var __rest$2 = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  function drawPath(ctx, elem, opts) {
    var _a, _b;
    const { detail } = elem;
    const { originX, originY, originW, originH, fillRule } = detail;
    const { viewScaleInfo, viewSizeInfo, parentOpacity } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
    const scaleW = w2 / originW;
    const scaleH = h2 / originH;
    const viewOriginX = originX * scaleW;
    const viewOriginY = originY * scaleH;
    const internalX = x2 - viewOriginX;
    const internalY = y2 - viewOriginY;
    const _c = elem.detail, { clipPath, clipPathStrokeColor, clipPathStrokeWidth } = _c, restDetail = __rest$2(_c, ["clipPath", "clipPathStrokeColor", "clipPathStrokeWidth"]);
    const scaleNum = viewScaleInfo.scale * viewSizeInfo.devicePixelRatio;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    let boxViewElem = Object.assign({}, viewElem);
    boxViewElem.detail = restDetail;
    let boxOriginElem = Object.assign({}, elem);
    boxOriginElem.detail = restDetail;
    if (detail.fill && detail.fill !== "string" && ((_b = (_a = detail.fill) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.includes("gradient"))) {
      boxViewElem = Object.assign(Object.assign({}, viewElem), {
        detail: Object.assign(Object.assign({}, viewElem.detail), {
          background: detail.fill,
          clipPath: {
            commands: detail.commands,
            originX,
            originY,
            originW,
            originH
          }
        })
      });
      boxOriginElem.detail = Object.assign({}, boxViewElem.detail);
    }
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBox(ctx, boxViewElem, {
        originElem: boxOriginElem,
        calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
        viewScaleInfo,
        viewSizeInfo,
        parentOpacity,
        renderContent: () => {
          drawBoxShadow(ctx, viewElem, {
            viewScaleInfo,
            renderContent: () => {
              ctx.save();
              ctx.translate(internalX, internalY);
              ctx.scale(scaleNum * scaleW / viewScaleInfo.scale, scaleNum * scaleH / viewScaleInfo.scale);
              const pathStr = generateSVGPath(detail.commands || []);
              const path2d = new Path2D(pathStr);
              if (detail.fill) {
                if (typeof detail.fill === "string") {
                  ctx.fillStyle = detail.fill;
                } else {
                  ctx.fillStyle = "transparent";
                }
              }
              if (detail.fill) {
                ctx.fill(path2d, fillRule || "nonzero");
              }
              if (detail.stroke && detail.strokeWidth !== 0) {
                ctx.strokeStyle = detail.stroke;
                ctx.lineWidth = (detail.strokeWidth || 1) / viewSizeInfo.devicePixelRatio;
                ctx.lineCap = detail.strokeLineCap || "square";
                ctx.stroke(path2d);
              }
              ctx.translate(-internalX, -internalY);
              ctx.restore();
            }
          });
        }
      });
    });
  }
  const visiableMinSize = 0.4;
  function drawElement(ctx, elem, opts) {
    var _a, _b, _c;
    if (((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.invisible) === true) {
      return;
    }
    const { w: w2, h: h2 } = elem;
    const { scale } = opts.viewScaleInfo;
    if (scale < 1 && (w2 * scale < visiableMinSize || h2 * scale < visiableMinSize) || opts.parentOpacity === 0) {
      return;
    }
    const { overrideElementMap } = opts;
    if ((_c = (_b = overrideElementMap === null || overrideElementMap === void 0 ? void 0 : overrideElementMap[elem.uuid]) === null || _b === void 0 ? void 0 : _b.operations) === null || _c === void 0 ? void 0 : _c.invisible) {
      return;
    }
    try {
      switch (elem.type) {
        case "rect": {
          drawRect(ctx, elem, opts);
          break;
        }
        case "circle": {
          drawCircle(ctx, elem, opts);
          break;
        }
        case "text": {
          drawText(ctx, elem, opts);
          break;
        }
        case "image": {
          drawImage(ctx, elem, opts);
          break;
        }
        case "svg": {
          drawSVG(ctx, elem, opts);
          break;
        }
        case "html": {
          drawHTML(ctx, elem, opts);
          break;
        }
        case "path": {
          drawPath(ctx, elem, opts);
          break;
        }
        case "group": {
          const assets = Object.assign(Object.assign({}, opts.elementAssets || {}), elem.detail.assets || {});
          drawGroup(ctx, elem, Object.assign(Object.assign({}, opts), { elementAssets: assets }));
          break;
        }
        default: {
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  function drawGroup(ctx, elem, opts) {
    const { viewScaleInfo, viewSizeInfo, parentOpacity } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calcViewElementSize({ x: elem.x, y: elem.y, w: elem.w, h: elem.h, angle: elem.angle }, { viewScaleInfo }) || elem;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement$1(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      ctx.globalAlpha = getOpacity(elem) * parentOpacity;
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        renderContent: () => {
          drawBox(ctx, viewElem, {
            originElem: elem,
            calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
            viewScaleInfo,
            viewSizeInfo,
            parentOpacity,
            renderContent: () => {
              const { x: x3, y: y3, w: w3, h: h3, radiusList } = calcViewBoxSize(viewElem, {
                viewScaleInfo
              });
              if (elem.detail.overflow === "hidden") {
                ctx.save();
                ctx.fillStyle = "transparent";
                ctx.beginPath();
                ctx.moveTo(x3 + radiusList[0], y3);
                ctx.arcTo(x3 + w3, y3, x3 + w3, y3 + h3, radiusList[1]);
                ctx.arcTo(x3 + w3, y3 + h3, x3, y3 + h3, radiusList[2]);
                ctx.arcTo(x3, y3 + h3, x3, y3, radiusList[3]);
                ctx.arcTo(x3, y3, x3 + w3, y3, radiusList[0]);
                ctx.closePath();
                ctx.fill("nonzero");
                ctx.clip("nonzero");
              }
              if (Array.isArray(elem.detail.children)) {
                const { parentElementSize: parentSize } = opts;
                const newParentSize = {
                  x: parentSize.x + elem.x,
                  y: parentSize.y + elem.y,
                  w: elem.w || parentSize.w,
                  h: elem.h || parentSize.h,
                  angle: elem.angle
                };
                const { calculator } = opts;
                for (let i = 0; i < elem.detail.children.length; i++) {
                  let child = elem.detail.children[i];
                  child = Object.assign(Object.assign({}, child), {
                    x: newParentSize.x + child.x,
                    y: newParentSize.y + child.y
                  });
                  if (opts.forceDrawAll !== true) {
                    if (!(calculator === null || calculator === void 0 ? void 0 : calculator.needRender(child))) {
                      continue;
                    }
                  }
                  try {
                    drawElement(ctx, child, Object.assign(Object.assign({}, opts), { parentOpacity: parentOpacity * getOpacity(elem) }));
                  } catch (err) {
                    console.error(err);
                  }
                }
              }
              if (elem.detail.overflow === "hidden") {
                ctx.restore();
              }
            }
          });
        }
      });
      ctx.globalAlpha = parentOpacity;
    });
  }
  const defaultDetail = getDefaultElementDetailConfig();
  function drawElementList(ctx, data, opts) {
    var _a;
    const { elements = [] } = data;
    const { parentOpacity } = opts;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elem = Object.assign(Object.assign({}, element), {
        detail: Object.assign(Object.assign({}, defaultDetail), element === null || element === void 0 ? void 0 : element.detail)
      });
      if (opts.forceDrawAll !== true) {
        if (!((_a = opts.calculator) === null || _a === void 0 ? void 0 : _a.needRender(elem))) {
          continue;
        }
      }
      try {
        drawElement(ctx, elem, Object.assign(Object.assign({}, opts), {
          parentOpacity
        }));
      } catch (err) {
        console.error(err);
      }
    }
  }
  function drawLayout(ctx, layout, opts, renderContent) {
    const { viewScaleInfo, viewSizeInfo, parentOpacity } = opts;
    const elem = Object.assign({ uuid: "layout", type: "group" }, layout);
    const { x: x2, y: y2, w: w2, h: h2 } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
    const angle2 = 0;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    ctx.globalAlpha = 1;
    drawBoxShadow(ctx, viewElem, {
      viewScaleInfo,
      renderContent: () => {
        drawBoxBackground(ctx, viewElem, { viewScaleInfo, viewSizeInfo });
      }
    });
    if (layout.detail.overflow === "hidden") {
      const { viewScaleInfo: viewScaleInfo2, viewSizeInfo: viewSizeInfo2 } = opts;
      const elem2 = Object.assign({ uuid: "layout", type: "group" }, layout);
      const viewElemSize = calcViewElementSize(elem2, { viewScaleInfo: viewScaleInfo2 }) || elem2;
      const viewElem2 = Object.assign(Object.assign({}, elem2), viewElemSize);
      const { x: x3, y: y3, w: w3, h: h3, radiusList } = calcViewBoxSize(viewElem2, {
        viewScaleInfo: viewScaleInfo2
      });
      ctx.save();
      ctx.fillStyle = "transparent";
      ctx.beginPath();
      ctx.moveTo(x3 + radiusList[0], y3);
      ctx.arcTo(x3 + w3, y3, x3 + w3, y3 + h3, radiusList[1]);
      ctx.arcTo(x3 + w3, y3 + h3, x3, y3 + h3, radiusList[2]);
      ctx.arcTo(x3, y3 + h3, x3, y3, radiusList[3]);
      ctx.arcTo(x3, y3, x3 + w3, y3, radiusList[0]);
      ctx.closePath();
      ctx.fill("nonzero");
      ctx.clip("nonzero");
    }
    renderContent(ctx);
    if (layout.detail.overflow === "hidden") {
      ctx.restore();
    }
    drawBoxBorder(ctx, viewElem, { viewScaleInfo });
    ctx.globalAlpha = parentOpacity;
  }
  function drawGlobalBackground(ctx, global, opts) {
    if (typeof (global === null || global === void 0 ? void 0 : global.background) === "string") {
      const { viewSizeInfo } = opts;
      const { width, height } = viewSizeInfo;
      ctx.globalAlpha = 1;
      ctx.fillStyle = global.background;
      ctx.fillRect(0, 0, width, height);
    }
  }
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __classPrivateFieldGet$8 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet$8 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _Loader_instances, _Loader_loadFuncMap, _Loader_currentLoadItemMap, _Loader_storageLoadItemMap, _Loader_hasDestroyed, _Loader_registerLoadFunc, _Loader_getLoadElementSource, _Loader_createLoadItem, _Loader_emitLoad, _Loader_emitError, _Loader_loadResource, _Loader_isExistingErrorStorage;
  const supportElementTypes = ["image", "svg", "html"];
  const getAssetIdFromElement = (element) => {
    var _a, _b, _c;
    let source = null;
    if (element.type === "image") {
      source = ((_a = element === null || element === void 0 ? void 0 : element.detail) === null || _a === void 0 ? void 0 : _a.src) || null;
    } else if (element.type === "svg") {
      source = ((_b = element === null || element === void 0 ? void 0 : element.detail) === null || _b === void 0 ? void 0 : _b.svg) || null;
    } else if (element.type === "html") {
      source = ((_c = element === null || element === void 0 ? void 0 : element.detail) === null || _c === void 0 ? void 0 : _c.html) || null;
    }
    if (typeof source === "string" && source) {
      if (isAssetId(source)) {
        return source;
      }
      return createAssetId(source, element.uuid);
    }
    return createAssetId(`${createUUID()}-${element.uuid}-${createUUID()}-${createUUID()}`, element.uuid);
  };
  class Loader extends EventEmitter {
    constructor() {
      super();
      _Loader_instances.add(this);
      _Loader_loadFuncMap.set(this, {});
      _Loader_currentLoadItemMap.set(this, {});
      _Loader_storageLoadItemMap.set(this, {});
      _Loader_hasDestroyed.set(this, false);
      __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_registerLoadFunc).call(this, "image", (elem, assets) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const src = ((_a = assets[elem.detail.src]) === null || _a === void 0 ? void 0 : _a.value) || elem.detail.src;
        const content = yield loadImage(src);
        return {
          uuid: elem.uuid,
          lastModified: Date.now(),
          content
        };
      }));
      __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_registerLoadFunc).call(this, "html", (elem, assets) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const html2 = ((_a = assets[elem.detail.html]) === null || _a === void 0 ? void 0 : _a.value) || elem.detail.html;
        const content = yield loadHTML(html2, {
          width: elem.detail.originW || elem.w,
          height: elem.detail.originH || elem.h
        });
        return {
          uuid: elem.uuid,
          lastModified: Date.now(),
          content
        };
      }));
      __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_registerLoadFunc).call(this, "svg", (elem, assets) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const svg2 = ((_a = assets[elem.detail.svg]) === null || _a === void 0 ? void 0 : _a.value) || elem.detail.svg;
        const content = yield loadSVG(svg2);
        return {
          uuid: elem.uuid,
          lastModified: Date.now(),
          content
        };
      }));
    }
    isDestroyed() {
      return __classPrivateFieldGet$8(this, _Loader_hasDestroyed, "f");
    }
    reset() {
      if (__classPrivateFieldGet$8(this, _Loader_hasDestroyed, "f") === true) {
        return;
      }
      __classPrivateFieldSet$8(this, _Loader_currentLoadItemMap, {}, "f");
      __classPrivateFieldSet$8(this, _Loader_storageLoadItemMap, {}, "f");
    }
    resetElementAsset(element) {
      var _a, _b, _c;
      if (supportElementTypes.includes(element.type)) {
        let assetId = null;
        let resource = null;
        if (element.type === "image" && typeof ((_a = element === null || element === void 0 ? void 0 : element.detail) === null || _a === void 0 ? void 0 : _a.src) === "string") {
          resource = element.detail.src;
        } else if (element.type === "svg" && typeof ((_b = element === null || element === void 0 ? void 0 : element.detail) === null || _b === void 0 ? void 0 : _b.svg) === "string") {
          resource = element.detail.svg;
        } else if (element.type === "html" && typeof ((_c = element === null || element === void 0 ? void 0 : element.detail) === null || _c === void 0 ? void 0 : _c.html) === "string") {
          resource = element.detail.html;
        }
        if (typeof resource === "string") {
          this.load(element, {});
          if (isAssetId(resource)) {
            assetId = resource;
          } else if (element.uuid) {
            assetId = createAssetId(resource, element.uuid);
          }
        }
        if (assetId && isAssetId(assetId)) {
          delete __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")[assetId];
          delete __classPrivateFieldGet$8(this, _Loader_currentLoadItemMap, "f")[assetId];
        }
      }
    }
    destroy() {
      __classPrivateFieldSet$8(this, _Loader_hasDestroyed, true, "f");
      this.clear();
      __classPrivateFieldSet$8(this, _Loader_loadFuncMap, null, "f");
      __classPrivateFieldSet$8(this, _Loader_currentLoadItemMap, null, "f");
      __classPrivateFieldSet$8(this, _Loader_storageLoadItemMap, null, "f");
    }
    load(element, assets) {
      if (__classPrivateFieldGet$8(this, _Loader_hasDestroyed, "f") === true) {
        return;
      }
      if (__classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_isExistingErrorStorage).call(this, element)) {
        return;
      }
      if (supportElementTypes.includes(element.type)) {
        __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_loadResource).call(this, element, assets);
      }
    }
    getContent(element) {
      var _a, _b;
      const assetId = getAssetIdFromElement(element);
      return ((_b = (_a = __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")) === null || _a === void 0 ? void 0 : _a[assetId]) === null || _b === void 0 ? void 0 : _b.content) || null;
    }
    getLoadItemMap() {
      return __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f");
    }
    setLoadItemMap(itemMap) {
      __classPrivateFieldSet$8(this, _Loader_storageLoadItemMap, itemMap, "f");
    }
  }
  _Loader_loadFuncMap = /* @__PURE__ */ new WeakMap(), _Loader_currentLoadItemMap = /* @__PURE__ */ new WeakMap(), _Loader_storageLoadItemMap = /* @__PURE__ */ new WeakMap(), _Loader_hasDestroyed = /* @__PURE__ */ new WeakMap(), _Loader_instances = /* @__PURE__ */ new WeakSet(), _Loader_registerLoadFunc = function _Loader_registerLoadFunc2(type, func) {
    __classPrivateFieldGet$8(this, _Loader_loadFuncMap, "f")[type] = func;
  }, _Loader_getLoadElementSource = function _Loader_getLoadElementSource2(element) {
    var _a, _b, _c;
    let source = null;
    if (element.type === "image") {
      source = ((_a = element === null || element === void 0 ? void 0 : element.detail) === null || _a === void 0 ? void 0 : _a.src) || null;
    } else if (element.type === "svg") {
      source = ((_b = element === null || element === void 0 ? void 0 : element.detail) === null || _b === void 0 ? void 0 : _b.svg) || null;
    } else if (element.type === "html") {
      source = ((_c = element === null || element === void 0 ? void 0 : element.detail) === null || _c === void 0 ? void 0 : _c.html) || null;
    }
    return source;
  }, _Loader_createLoadItem = function _Loader_createLoadItem2(element) {
    return {
      element,
      status: "null",
      content: null,
      error: null,
      startTime: -1,
      endTime: -1,
      source: __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_getLoadElementSource).call(this, element)
    };
  }, _Loader_emitLoad = function _Loader_emitLoad2(item) {
    const assetId = getAssetIdFromElement(item.element);
    const storageItem = __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")[assetId];
    if (!__classPrivateFieldGet$8(this, _Loader_hasDestroyed, "f")) {
      if (storageItem) {
        if (storageItem.startTime < item.startTime) {
          __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")[assetId] = item;
          this.trigger("load", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
        }
      } else {
        __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")[assetId] = item;
        this.trigger("load", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
      }
    }
  }, _Loader_emitError = function _Loader_emitError2(item) {
    var _a;
    const assetId = getAssetIdFromElement(item.element);
    const storageItem = (_a = __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")) === null || _a === void 0 ? void 0 : _a[assetId];
    if (!__classPrivateFieldGet$8(this, _Loader_hasDestroyed, "f")) {
      if (storageItem) {
        if (storageItem.startTime < item.startTime) {
          __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")[assetId] = item;
          this.trigger("error", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
        }
      } else {
        __classPrivateFieldGet$8(this, _Loader_storageLoadItemMap, "f")[assetId] = item;
        this.trigger("error", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
      }
    }
  }, _Loader_loadResource = function _Loader_loadResource2(element, assets) {
    const item = __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_createLoadItem).call(this, element);
    const assetId = getAssetIdFromElement(element);
    if (__classPrivateFieldGet$8(this, _Loader_currentLoadItemMap, "f")[assetId]) {
      return;
    }
    __classPrivateFieldGet$8(this, _Loader_currentLoadItemMap, "f")[assetId] = item;
    const loadFunc = __classPrivateFieldGet$8(this, _Loader_loadFuncMap, "f")[element.type];
    if (typeof loadFunc === "function" && !__classPrivateFieldGet$8(this, _Loader_hasDestroyed, "f")) {
      item.startTime = Date.now();
      loadFunc(element, assets).then((result) => {
        if (!__classPrivateFieldGet$8(this, _Loader_hasDestroyed, "f")) {
          item.content = result.content;
          item.endTime = Date.now();
          item.status = "load";
          __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_emitLoad).call(this, item);
        }
      }).catch((err) => {
        console.warn(`Load element source "${item.source}" fail`, err, element);
        item.endTime = Date.now();
        item.status = "error";
        item.error = err;
        __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_emitError).call(this, item);
      });
    }
  }, _Loader_isExistingErrorStorage = function _Loader_isExistingErrorStorage2(element) {
    var _a;
    const assetId = getAssetIdFromElement(element);
    const existItem = (_a = __classPrivateFieldGet$8(this, _Loader_currentLoadItemMap, "f")) === null || _a === void 0 ? void 0 : _a[assetId];
    if (existItem && existItem.status === "error" && existItem.source && existItem.source === __classPrivateFieldGet$8(this, _Loader_instances, "m", _Loader_getLoadElementSource).call(this, element)) {
      return true;
    }
    return false;
  };
  const detailConfig = getDefaultElementDetailConfig();
  function isTextWidthWithinErrorRange(w0, w1, scale) {
    return w0 >= w1;
  }
  function calcVirtualTextDetail(elem, opts) {
    const { w: w2, h: h2 } = elem;
    const x2 = 0;
    const y2 = 0;
    const ctx = opts.tempContext;
    const lines = [];
    const detail = Object.assign(Object.assign({}, detailConfig), elem.detail);
    const originFontSize = detail.fontSize || detailConfig.fontSize;
    const fontSize2 = originFontSize;
    if (fontSize2 < 2) {
      return {};
    }
    const originLineHeight = detail.lineHeight || originFontSize;
    const lineHeight2 = originLineHeight;
    ctx.textBaseline = "top";
    ctx.$setFont({
      fontWeight: detail.fontWeight,
      fontSize: fontSize2,
      fontFamily: enhanceFontFamliy(detail.fontFamily)
    });
    let detailText = detail.text.replace(/\r\n/gi, "\n");
    if (detail.textTransform === "lowercase") {
      detailText = detailText.toLowerCase();
    } else if (detail.textTransform === "uppercase") {
      detailText = detailText.toUpperCase();
    }
    const fontHeight = lineHeight2;
    const detailTextList = detailText.split("\n");
    let lineNum = 0;
    detailTextList.forEach((itemText, idx) => {
      if (detail.minInlineSize === "maxContent") {
        lines.push({
          x: x2,
          y: 0,
          text: itemText,
          width: ctx.$undoPixelRatio(ctx.measureText(itemText).width)
        });
      } else {
        let lineText = "";
        let splitStr = "";
        let tempStrList = itemText.split(splitStr);
        if (detail.wordBreak === "normal") {
          splitStr = " ";
          const wordList = itemText.split(splitStr);
          tempStrList = [];
          wordList.forEach((word, idx2) => {
            tempStrList.push(word);
            if (idx2 < wordList.length - 1) {
              tempStrList.push(splitStr);
            }
          });
        }
        if (tempStrList.length === 1 && detail.overflow === "visible") {
          lines.push({
            x: x2,
            y: 0,
            text: tempStrList[0],
            width: ctx.$undoPixelRatio(ctx.measureText(tempStrList[0]).width)
          });
        } else if (tempStrList.length > 0) {
          for (let i = 0; i < tempStrList.length; i++) {
            if (isTextWidthWithinErrorRange(ctx.$doPixelRatio(w2), ctx.measureText(lineText + tempStrList[i]).width)) {
              lineText += tempStrList[i] || "";
            } else {
              lines.push({
                x: x2,
                y: 0,
                text: lineText,
                width: ctx.$undoPixelRatio(ctx.measureText(lineText).width)
              });
              lineText = tempStrList[i] || "";
              lineNum++;
            }
            if ((lineNum + 1) * fontHeight > h2 && detail.overflow === "hidden") {
              break;
            }
            if (tempStrList.length - 1 === i) {
              if ((lineNum + 1) * fontHeight <= h2) {
                lines.push({
                  x: x2,
                  y: 0,
                  text: lineText,
                  width: ctx.$undoPixelRatio(ctx.measureText(lineText).width)
                });
                if (idx < detailTextList.length - 1) {
                  lineNum++;
                }
                break;
              }
            }
          }
        } else {
          lines.push({
            x: x2,
            y: 0,
            text: "",
            width: 0
          });
        }
      }
    });
    let startY = 0;
    let eachLineStartY = 0;
    if (fontHeight > fontSize2) {
      eachLineStartY = (fontHeight - fontSize2) / 2;
    }
    if (lines.length * fontHeight < h2) {
      if (detail.verticalAlign === "top") {
        startY = 0;
      } else if (detail.verticalAlign === "bottom") {
        startY += h2 - lines.length * fontHeight;
      } else {
        startY += (h2 - lines.length * fontHeight) / 2;
      }
    }
    {
      const _y = y2 + startY;
      lines.forEach((line, i) => {
        let _x = x2;
        if (detail.textAlign === "center") {
          _x = x2 + (w2 - line.width) / 2;
        } else if (detail.textAlign === "right") {
          _x = x2 + (w2 - line.width);
        }
        lines[i].x = _x;
        lines[i].y = _y + fontHeight * i + eachLineStartY;
      });
    }
    const virtualTextDetail = {
      textLines: lines
    };
    return virtualTextDetail;
  }
  function calcVirtualFlatDetail(elem, opts) {
    let virtualDetail = {};
    if (elem.type === "text") {
      virtualDetail = calcVirtualTextDetail(elem, opts);
    }
    return virtualDetail;
  }
  function elementsToVirtualFlatMap(elements, opts) {
    const virtualFlatMap = {};
    const currentPosition = [];
    const _walk = (elem) => {
      const baseInfo = {
        type: elem.type,
        isVisibleInView: true,
        position: [...currentPosition]
      };
      let originRectInfo = null;
      const groupQueue = getGroupQueueByElementPosition(elements, currentPosition);
      originRectInfo = calcElementOriginRectInfo(elem, {
        groupQueue: groupQueue || []
      });
      const virtualItem = Object.assign(Object.assign(Object.assign({}, baseInfo), {
        originRectInfo,
        rangeRectInfo: is.angle(elem.angle) ? originRectInfoToRangeRectInfo(originRectInfo) : originRectInfo
      }), calcVirtualFlatDetail(elem, opts));
      virtualFlatMap[elem.uuid] = virtualItem;
      if (elem.type === "group") {
        elem.detail.children.forEach((ele, i) => {
          currentPosition.push(i);
          _walk(ele);
          currentPosition.pop();
        });
      }
    };
    elements.forEach((elem, index) => {
      currentPosition.push(index);
      _walk(elem);
      currentPosition.pop();
    });
    return virtualFlatMap;
  }
  function sortElementsViewVisiableInfoMap(elements, opts) {
    const { viewScaleInfo, viewSizeInfo, tempContext } = opts;
    const visibleInfoMap = elementsToVirtualFlatMap(elements, { tempContext });
    return updateVirtualFlatItemMapStatus(visibleInfoMap, { viewScaleInfo, viewSizeInfo });
  }
  function isRangeRectInfoCollide(info1, info2) {
    const rect1MinX = Math.min(info1.topLeft.x, info1.topRight.x, info1.bottomLeft.x, info1.bottomRight.x);
    const rect1MaxX = Math.max(info1.topLeft.x, info1.topRight.x, info1.bottomLeft.x, info1.bottomRight.x);
    const rect1MinY = Math.min(info1.topLeft.y, info1.topRight.y, info1.bottomLeft.y, info1.bottomRight.y);
    const rect1MaxY = Math.max(info1.topLeft.y, info1.topRight.y, info1.bottomLeft.y, info1.bottomRight.y);
    const rect2MinX = Math.min(info2.topLeft.x, info2.topRight.x, info2.bottomLeft.x, info2.bottomRight.x);
    const rect2MaxX = Math.max(info2.topLeft.x, info2.topRight.x, info2.bottomLeft.x, info2.bottomRight.x);
    const rect2MinY = Math.min(info2.topLeft.y, info2.topRight.y, info2.bottomLeft.y, info2.bottomRight.y);
    const rect2MaxY = Math.max(info2.topLeft.y, info2.topRight.y, info2.bottomLeft.y, info2.bottomRight.y);
    if (rect1MinX <= rect2MaxX && rect1MaxX >= rect2MinX && rect1MinY <= rect2MaxY && rect1MaxY >= rect2MinY || rect2MaxX <= rect1MaxY && rect2MaxX >= rect1MaxY && rect2MaxX <= rect1MaxY && rect2MaxX >= rect1MaxY) {
      return true;
    }
    return false;
  }
  function updateVirtualFlatItemMapStatus(virtualFlatItemMap, opts) {
    const canvasRectInfo = calcVisibleOriginCanvasRectInfo(opts);
    let visibleCount = 0;
    let invisibleCount = 0;
    Object.keys(virtualFlatItemMap).forEach((uuid) => {
      const info = virtualFlatItemMap[uuid];
      info.isVisibleInView = isRangeRectInfoCollide(info.rangeRectInfo, canvasRectInfo);
      info.isVisibleInView ? visibleCount++ : invisibleCount++;
    });
    return { virtualFlatItemMap, visibleCount, invisibleCount };
  }
  function calcVisibleOriginCanvasRectInfo(opts) {
    const { viewScaleInfo, viewSizeInfo } = opts;
    const { scale, offsetTop, offsetLeft } = viewScaleInfo;
    const { width, height } = viewSizeInfo;
    const x2 = 0 - offsetLeft / scale;
    const y2 = 0 - offsetTop / scale;
    const w2 = width / scale;
    const h2 = height / scale;
    const center = calcElementCenter({ x: x2, y: y2, w: w2, h: h2 });
    const topLeft = { x: x2, y: y2 };
    const topRight = { x: x2 + w2, y: y2 };
    const bottomLeft = { x: x2, y: y2 + h2 };
    const bottomRight = { x: x2 + w2, y: y2 + h2 };
    const left = { x: x2, y: center.y };
    const top = { x: center.x, y: y2 };
    const right = { x: x2 + w2, y: center.y };
    const bottom = { x: center.x, y: y2 + h2 };
    const rectInfo = {
      center,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      left,
      top,
      right,
      bottom
    };
    return rectInfo;
  }
  var __classPrivateFieldSet$7 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$7 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Calculator_opts, _Calculator_store;
  class Calculator {
    constructor(opts) {
      _Calculator_opts.set(this, void 0);
      _Calculator_store.set(this, void 0);
      __classPrivateFieldSet$7(this, _Calculator_opts, opts, "f");
      __classPrivateFieldSet$7(this, _Calculator_store, new Store({
        defaultStorage: {
          virtualFlatItemMap: {},
          visibleCount: 0,
          invisibleCount: 0
        }
      }), "f");
    }
    toGridNum(num, opts) {
      if ((opts === null || opts === void 0 ? void 0 : opts.ignore) === true) {
        return num;
      }
      return Math.round(num);
    }
    destroy() {
      __classPrivateFieldSet$7(this, _Calculator_opts, null, "f");
    }
    needRender(elem) {
      const virtualFlatItemMap = __classPrivateFieldGet$7(this, _Calculator_store, "f").get("virtualFlatItemMap");
      const info = virtualFlatItemMap[elem.uuid];
      if (!info) {
        return true;
      }
      return info.isVisibleInView;
    }
    getPointElement(p, opts) {
      const context2d = __classPrivateFieldGet$7(this, _Calculator_opts, "f").tempContext;
      return getViewPointAtElement(p, Object.assign(Object.assign({}, opts), { context2d }));
    }
    resetVirtualFlatItemMap(data, opts) {
      if (data) {
        const { virtualFlatItemMap, invisibleCount, visibleCount } = sortElementsViewVisiableInfoMap(data.elements, Object.assign(Object.assign({}, opts), {
          tempContext: __classPrivateFieldGet$7(this, _Calculator_opts, "f").tempContext
        }));
        __classPrivateFieldGet$7(this, _Calculator_store, "f").set("virtualFlatItemMap", virtualFlatItemMap);
        __classPrivateFieldGet$7(this, _Calculator_store, "f").set("invisibleCount", invisibleCount);
        __classPrivateFieldGet$7(this, _Calculator_store, "f").set("visibleCount", visibleCount);
      }
    }
    updateVisiableStatus(opts) {
      const { virtualFlatItemMap, invisibleCount, visibleCount } = updateVirtualFlatItemMapStatus(__classPrivateFieldGet$7(this, _Calculator_store, "f").get("virtualFlatItemMap"), opts);
      __classPrivateFieldGet$7(this, _Calculator_store, "f").set("virtualFlatItemMap", virtualFlatItemMap);
      __classPrivateFieldGet$7(this, _Calculator_store, "f").set("invisibleCount", invisibleCount);
      __classPrivateFieldGet$7(this, _Calculator_store, "f").set("visibleCount", visibleCount);
    }
    calcViewRectInfoFromOrigin(uuid, opts) {
      const infoData = __classPrivateFieldGet$7(this, _Calculator_store, "f").get("virtualFlatItemMap")[uuid];
      if (!(infoData === null || infoData === void 0 ? void 0 : infoData.originRectInfo)) {
        return null;
      }
      const { checkVisible, viewScaleInfo, viewSizeInfo } = opts;
      const { center, left, right, bottom, top, topLeft, topRight, bottomLeft, bottomRight } = infoData.originRectInfo;
      if (checkVisible === true && infoData.isVisibleInView === false) {
        return null;
      }
      const calcOpts = { viewScaleInfo };
      const viewRectInfo = {
        center: calcViewPointSize(center, calcOpts),
        left: calcViewPointSize(left, calcOpts),
        right: calcViewPointSize(right, calcOpts),
        bottom: calcViewPointSize(bottom, calcOpts),
        top: calcViewPointSize(top, calcOpts),
        topLeft: calcViewPointSize(topLeft, calcOpts),
        topRight: calcViewPointSize(topRight, calcOpts),
        bottomLeft: calcViewPointSize(bottomLeft, calcOpts),
        bottomRight: calcViewPointSize(bottomRight, calcOpts)
      };
      return viewRectInfo;
    }
    calcViewRectInfoFromRange(uuid, opts) {
      const infoData = __classPrivateFieldGet$7(this, _Calculator_store, "f").get("virtualFlatItemMap")[uuid];
      if (!(infoData === null || infoData === void 0 ? void 0 : infoData.originRectInfo)) {
        return null;
      }
      const { checkVisible, viewScaleInfo, viewSizeInfo } = opts;
      const { center, left, right, bottom, top, topLeft, topRight, bottomLeft, bottomRight } = infoData.rangeRectInfo;
      if (checkVisible === true && infoData.isVisibleInView === false) {
        return null;
      }
      const calcOpts = { viewScaleInfo };
      const viewRectInfo = {
        center: calcViewPointSize(center, calcOpts),
        left: calcViewPointSize(left, calcOpts),
        right: calcViewPointSize(right, calcOpts),
        bottom: calcViewPointSize(bottom, calcOpts),
        top: calcViewPointSize(top, calcOpts),
        topLeft: calcViewPointSize(topLeft, calcOpts),
        topRight: calcViewPointSize(topRight, calcOpts),
        bottomLeft: calcViewPointSize(bottomLeft, calcOpts),
        bottomRight: calcViewPointSize(bottomRight, calcOpts)
      };
      return viewRectInfo;
    }
    modifyText(element) {
      const virtualFlatItemMap = __classPrivateFieldGet$7(this, _Calculator_store, "f").get("virtualFlatItemMap");
      const flatItem = virtualFlatItemMap[element.uuid];
      if (element && element.type === "text") {
        const newVirtualFlatItem = Object.assign(Object.assign({}, flatItem), calcVirtualTextDetail(element, {
          tempContext: __classPrivateFieldGet$7(this, _Calculator_opts, "f").tempContext
        }));
        virtualFlatItemMap[element.uuid] = newVirtualFlatItem;
        __classPrivateFieldGet$7(this, _Calculator_store, "f").set("virtualFlatItemMap", virtualFlatItemMap);
      }
    }
    modifyVirtualFlatItemMap(data, opts) {
      const { modifyInfo, viewScaleInfo, viewSizeInfo } = opts;
      const { type, content } = modifyInfo;
      const list = data.elements;
      const virtualFlatItemMap = __classPrivateFieldGet$7(this, _Calculator_store, "f").get("virtualFlatItemMap");
      if (type === "deleteElement") {
        const { element } = content;
        const uuids = [];
        const _walk = (e) => {
          uuids.push(e.uuid);
          if (e.type === "group" && Array.isArray(e.detail.children)) {
            e.detail.children.forEach((child) => {
              _walk(child);
            });
          }
        };
        _walk(element);
        uuids.forEach((uuid) => {
          delete virtualFlatItemMap[uuid];
        });
        __classPrivateFieldGet$7(this, _Calculator_store, "f").set("virtualFlatItemMap", virtualFlatItemMap);
      } else if (type === "addElement" || type === "updateElement") {
        const { position } = content;
        const element = findElementFromListByPosition(position, data.elements);
        const groupQueue = getGroupQueueByElementPosition(list, position);
        if (element) {
          if (type === "updateElement" && element.type === "group") {
            this.resetVirtualFlatItemMap(data, { viewScaleInfo, viewSizeInfo });
          } else {
            const originRectInfo = calcElementOriginRectInfo(element, {
              groupQueue: groupQueue || []
            });
            const newVirtualFlatItem = Object.assign({ type: element.type, originRectInfo, rangeRectInfo: is.angle(element.angle) ? originRectInfoToRangeRectInfo(originRectInfo) : originRectInfo, isVisibleInView: true, position: [...position] }, calcVirtualFlatDetail(element, {
              tempContext: __classPrivateFieldGet$7(this, _Calculator_opts, "f").tempContext
            }));
            virtualFlatItemMap[element.uuid] = newVirtualFlatItem;
            __classPrivateFieldGet$7(this, _Calculator_store, "f").set("virtualFlatItemMap", virtualFlatItemMap);
            if (type === "updateElement") {
              this.updateVisiableStatus({ viewScaleInfo, viewSizeInfo });
            }
          }
        }
      } else if (type === "moveElement") {
        this.resetVirtualFlatItemMap(data, { viewScaleInfo, viewSizeInfo });
      }
    }
    getVirtualFlatItem(uuid) {
      const itemMap = __classPrivateFieldGet$7(this, _Calculator_store, "f").get("virtualFlatItemMap");
      return itemMap[uuid] || null;
    }
  }
  _Calculator_opts = /* @__PURE__ */ new WeakMap(), _Calculator_store = /* @__PURE__ */ new WeakMap();
  var __classPrivateFieldSet$6 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$6 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Renderer_instances, _Renderer_opts, _Renderer_loader, _Renderer_calculator, _Renderer_hasDestroyed, _Renderer_init;
  class Renderer extends EventEmitter {
    constructor(opts) {
      super();
      _Renderer_instances.add(this);
      _Renderer_opts.set(this, void 0);
      _Renderer_loader.set(this, new Loader());
      _Renderer_calculator.set(this, void 0);
      _Renderer_hasDestroyed.set(this, false);
      __classPrivateFieldSet$6(this, _Renderer_opts, opts, "f");
      __classPrivateFieldSet$6(this, _Renderer_calculator, new Calculator({
        tempContext: opts.tempContext
      }), "f");
      __classPrivateFieldGet$6(this, _Renderer_instances, "m", _Renderer_init).call(this);
    }
    isDestroyed() {
      return __classPrivateFieldGet$6(this, _Renderer_hasDestroyed, "f");
    }
    destroy() {
      this.clear();
      __classPrivateFieldSet$6(this, _Renderer_opts, null, "f");
      __classPrivateFieldGet$6(this, _Renderer_loader, "f").destroy();
      __classPrivateFieldSet$6(this, _Renderer_loader, null, "f");
      __classPrivateFieldSet$6(this, _Renderer_hasDestroyed, true, "f");
    }
    updateOptions(opts) {
      __classPrivateFieldSet$6(this, _Renderer_opts, opts, "f");
    }
    drawData(data, opts) {
      const loader = __classPrivateFieldGet$6(this, _Renderer_loader, "f");
      const calculator = __classPrivateFieldGet$6(this, _Renderer_calculator, "f");
      const { sharer } = __classPrivateFieldGet$6(this, _Renderer_opts, "f");
      const viewContext = __classPrivateFieldGet$6(this, _Renderer_opts, "f").viewContext;
      viewContext.clearRect(0, 0, viewContext.canvas.width, viewContext.canvas.height);
      const parentElementSize = {
        x: 0,
        y: 0,
        w: opts.viewSizeInfo.width,
        h: opts.viewSizeInfo.height
      };
      if (opts.forceDrawAll === true) {
        __classPrivateFieldGet$6(this, _Renderer_calculator, "f").resetVirtualFlatItemMap(data, {
          viewScaleInfo: opts.viewScaleInfo,
          viewSizeInfo: opts.viewSizeInfo
        });
      }
      const drawOpts = Object.assign({
        loader,
        calculator,
        parentElementSize,
        elementAssets: data.assets,
        parentOpacity: 1,
        overrideElementMap: sharer === null || sharer === void 0 ? void 0 : sharer.getActiveOverrideElemenentMap()
      }, opts);
      drawGlobalBackground(viewContext, data.global, drawOpts);
      if (data.layout) {
        drawLayout(viewContext, data.layout, drawOpts, () => {
          drawElementList(viewContext, data, drawOpts);
        });
      } else {
        drawElementList(viewContext, data, drawOpts);
      }
    }
    scale(num) {
      const { sharer } = __classPrivateFieldGet$6(this, _Renderer_opts, "f");
      if (!sharer) {
        return;
      }
      const { data, offsetTop, offsetBottom, offsetLeft, offsetRight, width, height, contextHeight, contextWidth, devicePixelRatio } = sharer.getActiveStoreSnapshot();
      if (data) {
        this.drawData(data, {
          viewScaleInfo: {
            scale: num,
            offsetTop,
            offsetBottom,
            offsetLeft,
            offsetRight
          },
          viewSizeInfo: {
            width,
            height,
            contextHeight,
            contextWidth,
            devicePixelRatio
          }
        });
      }
    }
    setLoadItemMap(itemMap) {
      __classPrivateFieldGet$6(this, _Renderer_loader, "f").setLoadItemMap(itemMap);
    }
    getLoadItemMap() {
      return __classPrivateFieldGet$6(this, _Renderer_loader, "f").getLoadItemMap();
    }
    getLoader() {
      return __classPrivateFieldGet$6(this, _Renderer_loader, "f");
    }
    getCalculator() {
      return __classPrivateFieldGet$6(this, _Renderer_calculator, "f");
    }
  }
  _Renderer_opts = /* @__PURE__ */ new WeakMap(), _Renderer_loader = /* @__PURE__ */ new WeakMap(), _Renderer_calculator = /* @__PURE__ */ new WeakMap(), _Renderer_hasDestroyed = /* @__PURE__ */ new WeakMap(), _Renderer_instances = /* @__PURE__ */ new WeakSet(), _Renderer_init = function _Renderer_init2() {
    const loader = __classPrivateFieldGet$6(this, _Renderer_loader, "f");
    loader.on("load", (e) => {
      this.trigger("load", e);
    });
    loader.on("error", (e) => {
      console.error(e);
    });
  };
  var __classPrivateFieldSet$5 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$5 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _BoardWatcher_instances, _BoardWatcher_opts, _BoardWatcher_store, _BoardWatcher_hasDestroyed, _BoardWatcher_init, _BoardWatcher_onWheel, _BoardWatcher_onContextMenu, _BoardWatcher_onClick, _BoardWatcher_onPointLeave, _BoardWatcher_onPointEnd, _BoardWatcher_onPointMove, _BoardWatcher_onPointStart, _BoardWatcher_onHover, _BoardWatcher_isInTarget, _BoardWatcher_getPoint, _BoardWatcher_isVaildPoint;
  function isBoardAvailableNum(num) {
    return num > 0 || num < 0 || num === 0;
  }
  class BoardWatcher extends EventEmitter {
    constructor(opts) {
      super();
      _BoardWatcher_instances.add(this);
      _BoardWatcher_opts.set(this, void 0);
      _BoardWatcher_store.set(this, void 0);
      _BoardWatcher_hasDestroyed.set(this, false);
      _BoardWatcher_onWheel.set(this, (e) => {
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isInTarget).call(this, e)) {
          return;
        }
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isVaildPoint).call(this, point)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const deltaX = e.deltaX > 0 || e.deltaX < 0 ? e.deltaX : 0;
        const deltaY = e.deltaY > 0 || e.deltaY < 0 ? e.deltaY : 0;
        if (e.ctrlKey === true && this.has("wheelScale")) {
          this.trigger("wheelScale", { deltaX, deltaY, point });
        } else if (this.has("wheel")) {
          this.trigger("wheel", { deltaX, deltaY, point });
        }
      });
      _BoardWatcher_onContextMenu.set(this, (e) => {
        if (e.button !== 2) {
          return;
        }
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isInTarget).call(this, e)) {
          return;
        }
        e.preventDefault();
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isVaildPoint).call(this, point)) {
          return;
        }
        this.trigger("contextMenu", { point });
      });
      _BoardWatcher_onClick.set(this, (e) => {
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isInTarget).call(this, e)) {
          return;
        }
        e.preventDefault();
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isVaildPoint).call(this, point)) {
          return;
        }
        const maxLimitTime = 500;
        const t = Date.now();
        const preClickPoint = __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").get("prevClickPoint");
        if (preClickPoint && t - preClickPoint.t <= maxLimitTime && Math.abs(preClickPoint.x - point.x) <= 5 && Math.abs(preClickPoint.y - point.y) <= 5) {
          this.trigger("doubleClick", { point });
        } else {
          __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").set("prevClickPoint", point);
        }
      });
      _BoardWatcher_onPointLeave.set(this, (e) => {
        __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").set("hasPointDown", false);
        e.preventDefault();
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        this.trigger("pointLeave", { point });
      });
      _BoardWatcher_onPointEnd.set(this, (e) => {
        __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").set("hasPointDown", false);
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isInTarget).call(this, e)) {
          return;
        }
        e.preventDefault();
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        this.trigger("pointEnd", { point });
      });
      _BoardWatcher_onPointMove.set(this, (e) => {
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isInTarget).call(this, e)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isVaildPoint).call(this, point)) {
          if (__classPrivateFieldGet$5(this, _BoardWatcher_store, "f").get("hasPointDown")) {
            this.trigger("pointLeave", { point });
            __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").set("hasPointDown", false);
          }
          return;
        }
        if (__classPrivateFieldGet$5(this, _BoardWatcher_store, "f").get("hasPointDown") !== true) {
          return;
        }
        this.trigger("pointMove", { point });
      });
      _BoardWatcher_onPointStart.set(this, (e) => {
        if (e.button !== 0) {
          return;
        }
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isInTarget).call(this, e)) {
          return;
        }
        e.preventDefault();
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isVaildPoint).call(this, point)) {
          return;
        }
        __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").set("hasPointDown", true);
        this.trigger("pointStart", { point });
      });
      _BoardWatcher_onHover.set(this, (e) => {
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isInTarget).call(this, e)) {
          if (__classPrivateFieldGet$5(this, _BoardWatcher_store, "f").get("inCanvas") === true) {
            __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").set("inCanvas", false);
            __classPrivateFieldGet$5(this, _BoardWatcher_onPointLeave, "f").call(this, e);
          }
          return;
        }
        __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").set("inCanvas", true);
        e.preventDefault();
        const point = __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_getPoint).call(this, e);
        if (!__classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_isVaildPoint).call(this, point)) {
          return;
        }
        this.trigger("hover", { point });
      });
      const store = new Store({
        defaultStorage: { hasPointDown: false, prevClickPoint: null, inCanvas: true }
      });
      __classPrivateFieldSet$5(this, _BoardWatcher_store, store, "f");
      __classPrivateFieldSet$5(this, _BoardWatcher_opts, opts, "f");
      __classPrivateFieldGet$5(this, _BoardWatcher_instances, "m", _BoardWatcher_init).call(this);
    }
    onEvents() {
      if (__classPrivateFieldGet$5(this, _BoardWatcher_hasDestroyed, "f")) {
        return;
      }
      const canvas = __classPrivateFieldGet$5(this, _BoardWatcher_opts, "f").boardContent.boardContext.canvas;
      const container = window;
      container.addEventListener("mousemove", __classPrivateFieldGet$5(this, _BoardWatcher_onHover, "f"));
      container.addEventListener("mousedown", __classPrivateFieldGet$5(this, _BoardWatcher_onPointStart, "f"));
      container.addEventListener("mousemove", __classPrivateFieldGet$5(this, _BoardWatcher_onPointMove, "f"));
      container.addEventListener("mouseup", __classPrivateFieldGet$5(this, _BoardWatcher_onPointEnd, "f"));
      canvas.addEventListener("wheel", __classPrivateFieldGet$5(this, _BoardWatcher_onWheel, "f"), { passive: false });
      container.addEventListener("click", __classPrivateFieldGet$5(this, _BoardWatcher_onClick, "f"));
      container.addEventListener("contextmenu", __classPrivateFieldGet$5(this, _BoardWatcher_onContextMenu, "f"));
    }
    offEvents() {
      const container = window;
      const canvas = __classPrivateFieldGet$5(this, _BoardWatcher_opts, "f").boardContent.boardContext.canvas;
      container.removeEventListener("mousemove", __classPrivateFieldGet$5(this, _BoardWatcher_onHover, "f"));
      container.removeEventListener("mousedown", __classPrivateFieldGet$5(this, _BoardWatcher_onPointStart, "f"));
      container.removeEventListener("mousemove", __classPrivateFieldGet$5(this, _BoardWatcher_onPointMove, "f"));
      container.removeEventListener("mouseup", __classPrivateFieldGet$5(this, _BoardWatcher_onPointEnd, "f"));
      container.removeEventListener("mouseleave", __classPrivateFieldGet$5(this, _BoardWatcher_onPointLeave, "f"));
      canvas.removeEventListener("wheel", __classPrivateFieldGet$5(this, _BoardWatcher_onWheel, "f"));
      container.removeEventListener("click", __classPrivateFieldGet$5(this, _BoardWatcher_onClick, "f"));
      container.removeEventListener("contextmenu", __classPrivateFieldGet$5(this, _BoardWatcher_onContextMenu, "f"));
    }
    destroy() {
      this.offEvents();
      __classPrivateFieldGet$5(this, _BoardWatcher_store, "f").destroy();
      __classPrivateFieldSet$5(this, _BoardWatcher_hasDestroyed, true, "f");
    }
  }
  _BoardWatcher_opts = /* @__PURE__ */ new WeakMap(), _BoardWatcher_store = /* @__PURE__ */ new WeakMap(), _BoardWatcher_hasDestroyed = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onWheel = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onContextMenu = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onClick = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onPointLeave = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onPointEnd = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onPointMove = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onPointStart = /* @__PURE__ */ new WeakMap(), _BoardWatcher_onHover = /* @__PURE__ */ new WeakMap(), _BoardWatcher_instances = /* @__PURE__ */ new WeakSet(), _BoardWatcher_init = function _BoardWatcher_init2() {
    this.onEvents();
  }, _BoardWatcher_isInTarget = function _BoardWatcher_isInTarget2(e) {
    return e.target === __classPrivateFieldGet$5(this, _BoardWatcher_opts, "f").boardContent.boardContext.canvas;
  }, _BoardWatcher_getPoint = function _BoardWatcher_getPoint2(e) {
    const boardCanvas = __classPrivateFieldGet$5(this, _BoardWatcher_opts, "f").boardContent.boardContext.canvas;
    const rect = boardCanvas.getBoundingClientRect();
    const p = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: Date.now()
    };
    return p;
  }, _BoardWatcher_isVaildPoint = function _BoardWatcher_isVaildPoint2(p) {
    const viewSize = __classPrivateFieldGet$5(this, _BoardWatcher_opts, "f").sharer.getActiveViewSizeInfo();
    const { width, height } = viewSize;
    if (isBoardAvailableNum(p.x) && isBoardAvailableNum(p.y) && p.x <= width && p.y <= height) {
      return true;
    }
    return false;
  };
  var __classPrivateFieldSet$4 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$4 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Sharer_activeStore, _Sharer_sharedStore;
  const defaultActiveStorage = {
    width: 0,
    height: 0,
    devicePixelRatio: 1,
    contextWidth: 0,
    contextHeight: 0,
    data: null,
    scale: 1,
    offsetLeft: 0,
    offsetRight: 0,
    offsetTop: 0,
    offsetBottom: 0,
    overrideElementMap: null
  };
  class Sharer {
    constructor() {
      _Sharer_activeStore.set(this, void 0);
      _Sharer_sharedStore.set(this, void 0);
      const activeStore = new Store({
        defaultStorage: defaultActiveStorage
      });
      const sharedStore = new Store({
        defaultStorage: {}
      });
      __classPrivateFieldSet$4(this, _Sharer_activeStore, activeStore, "f");
      __classPrivateFieldSet$4(this, _Sharer_sharedStore, sharedStore, "f");
    }
    getActiveStorage(key2) {
      return __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get(key2);
    }
    setActiveStorage(key2, storage) {
      return __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set(key2, storage);
    }
    getActiveStoreSnapshot(opts) {
      return __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").getSnapshot(opts);
    }
    getSharedStorage(key2) {
      return __classPrivateFieldGet$4(this, _Sharer_sharedStore, "f").get(key2);
    }
    setSharedStorage(key2, storage) {
      return __classPrivateFieldGet$4(this, _Sharer_sharedStore, "f").set(key2, storage);
    }
    getSharedStoreSnapshot(opts) {
      return __classPrivateFieldGet$4(this, _Sharer_sharedStore, "f").getSnapshot(opts);
    }
    getActiveViewScaleInfo() {
      const viewScaleInfo = {
        scale: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("scale"),
        offsetTop: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("offsetTop"),
        offsetBottom: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("offsetBottom"),
        offsetLeft: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("offsetLeft"),
        offsetRight: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("offsetRight")
      };
      return viewScaleInfo;
    }
    setActiveViewScaleInfo(viewScaleInfo) {
      const { scale, offsetTop, offsetBottom, offsetLeft, offsetRight } = viewScaleInfo;
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("scale", scale);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("offsetTop", offsetTop);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("offsetBottom", offsetBottom);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("offsetLeft", offsetLeft);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("offsetRight", offsetRight);
    }
    setActiveViewSizeInfo(size) {
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("width", size.width);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("height", size.height);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("devicePixelRatio", size.devicePixelRatio);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("contextWidth", size.contextWidth);
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("contextHeight", size.contextHeight);
    }
    getActiveViewSizeInfo() {
      const sizeInfo = {
        width: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("width"),
        height: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("height"),
        devicePixelRatio: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("devicePixelRatio"),
        contextWidth: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("contextWidth"),
        contextHeight: __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("contextHeight")
      };
      return sizeInfo;
    }
    getActiveOverrideElemenentMap() {
      return __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").get("overrideElementMap");
    }
    setActiveOverrideElemenentMap(map) {
      __classPrivateFieldGet$4(this, _Sharer_activeStore, "f").set("overrideElementMap", map);
    }
  }
  _Sharer_activeStore = /* @__PURE__ */ new WeakMap(), _Sharer_sharedStore = /* @__PURE__ */ new WeakMap();
  var __classPrivateFieldSet$3 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$3 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Viewer_instances, _Viewer_opts, _Viewer_drawFrameSnapshotQueue, _Viewer_drawFrameStatus, _Viewer_init, _Viewer_drawAnimationFrame;
  const { requestAnimationFrame } = window;
  class Viewer extends EventEmitter {
    constructor(opts) {
      super();
      _Viewer_instances.add(this);
      _Viewer_opts.set(this, void 0);
      _Viewer_drawFrameSnapshotQueue.set(this, []);
      _Viewer_drawFrameStatus.set(this, "FREE");
      __classPrivateFieldSet$3(this, _Viewer_opts, opts, "f");
      __classPrivateFieldGet$3(this, _Viewer_instances, "m", _Viewer_init).call(this);
    }
    resetVirtualFlatItemMap(data, opts) {
      if (data) {
        __classPrivateFieldGet$3(this, _Viewer_opts, "f").calculator.resetVirtualFlatItemMap(data, opts);
      }
    }
    drawFrame() {
      const { sharer } = __classPrivateFieldGet$3(this, _Viewer_opts, "f");
      const activeStore = sharer.getActiveStoreSnapshot();
      const sharedStore = sharer.getSharedStoreSnapshot();
      __classPrivateFieldGet$3(this, _Viewer_drawFrameSnapshotQueue, "f").push({
        activeStore,
        sharedStore
      });
      __classPrivateFieldGet$3(this, _Viewer_instances, "m", _Viewer_drawAnimationFrame).call(this);
    }
    scale(opts) {
      const { scale, point, ignoreUpdateVisibleStatus } = opts;
      const { sharer } = __classPrivateFieldGet$3(this, _Viewer_opts, "f");
      const { moveX, moveY } = viewScale({
        scale,
        point,
        viewScaleInfo: sharer.getActiveViewScaleInfo(),
        viewSizeInfo: sharer.getActiveViewSizeInfo()
      });
      sharer.setActiveStorage("scale", scale);
      if (!ignoreUpdateVisibleStatus) {
        __classPrivateFieldGet$3(this, _Viewer_opts, "f").calculator.updateVisiableStatus({
          viewScaleInfo: sharer.getActiveViewScaleInfo(),
          viewSizeInfo: sharer.getActiveViewSizeInfo()
        });
      }
      return { moveX, moveY };
    }
    scroll(opts) {
      const { sharer } = __classPrivateFieldGet$3(this, _Viewer_opts, "f");
      const prevViewScaleInfo = sharer.getActiveViewScaleInfo();
      const { moveX, moveY, ignoreUpdateVisibleStatus } = opts;
      const viewSizeInfo = sharer.getActiveViewSizeInfo();
      const viewScaleInfo = viewScroll({
        moveX,
        moveY,
        viewScaleInfo: prevViewScaleInfo,
        viewSizeInfo
      });
      sharer.setActiveViewScaleInfo(viewScaleInfo);
      if (!ignoreUpdateVisibleStatus) {
        __classPrivateFieldGet$3(this, _Viewer_opts, "f").calculator.updateVisiableStatus({
          viewScaleInfo: sharer.getActiveViewScaleInfo(),
          viewSizeInfo: sharer.getActiveViewSizeInfo()
        });
      }
      return viewScaleInfo;
    }
    updateViewScaleInfo(opts) {
      const { sharer } = __classPrivateFieldGet$3(this, _Viewer_opts, "f");
      const viewScaleInfo = calcViewScaleInfo(opts, {
        viewSizeInfo: sharer.getActiveViewSizeInfo()
      });
      sharer.setActiveViewScaleInfo(viewScaleInfo);
      __classPrivateFieldGet$3(this, _Viewer_opts, "f").calculator.updateVisiableStatus({
        viewScaleInfo: sharer.getActiveViewScaleInfo(),
        viewSizeInfo: sharer.getActiveViewSizeInfo()
      });
      return viewScaleInfo;
    }
    resize(viewSize = {}, opts) {
      const { sharer } = __classPrivateFieldGet$3(this, _Viewer_opts, "f");
      const originViewSize = sharer.getActiveViewSizeInfo();
      const newViewSize = Object.assign(Object.assign({}, originViewSize), viewSize);
      const { width, height, devicePixelRatio } = newViewSize;
      const { underlayContext, boardContext, overlayContext, viewContext } = __classPrivateFieldGet$3(this, _Viewer_opts, "f").boardContent;
      boardContext.canvas.width = width * devicePixelRatio;
      boardContext.canvas.height = height * devicePixelRatio;
      boardContext.canvas.style.width = `${width}px`;
      boardContext.canvas.style.height = `${height}px`;
      underlayContext.canvas.width = width * devicePixelRatio;
      underlayContext.canvas.height = height * devicePixelRatio;
      overlayContext.canvas.width = width * devicePixelRatio;
      overlayContext.canvas.height = height * devicePixelRatio;
      viewContext.canvas.width = width * devicePixelRatio;
      viewContext.canvas.height = height * devicePixelRatio;
      sharer.setActiveViewSizeInfo(newViewSize);
      if (!(opts === null || opts === void 0 ? void 0 : opts.ignoreUpdateVisibleStatus)) {
        __classPrivateFieldGet$3(this, _Viewer_opts, "f").calculator.updateVisiableStatus({
          viewScaleInfo: sharer.getActiveViewScaleInfo(),
          viewSizeInfo: sharer.getActiveViewSizeInfo()
        });
      }
      return newViewSize;
    }
  }
  _Viewer_opts = /* @__PURE__ */ new WeakMap(), _Viewer_drawFrameSnapshotQueue = /* @__PURE__ */ new WeakMap(), _Viewer_drawFrameStatus = /* @__PURE__ */ new WeakMap(), _Viewer_instances = /* @__PURE__ */ new WeakSet(), _Viewer_init = function _Viewer_init2() {
    const { renderer } = __classPrivateFieldGet$3(this, _Viewer_opts, "f");
    renderer.on("load", () => {
      this.drawFrame();
    });
  }, _Viewer_drawAnimationFrame = function _Viewer_drawAnimationFrame2() {
    if (__classPrivateFieldGet$3(this, _Viewer_drawFrameStatus, "f") === "DRAWING" || __classPrivateFieldGet$3(this, _Viewer_drawFrameSnapshotQueue, "f").length === 0) {
      return;
    } else {
      __classPrivateFieldSet$3(this, _Viewer_drawFrameStatus, "DRAWING", "f");
    }
    const snapshot = __classPrivateFieldGet$3(this, _Viewer_drawFrameSnapshotQueue, "f").shift();
    const { renderer, boardContent, beforeDrawFrame, afterDrawFrame } = __classPrivateFieldGet$3(this, _Viewer_opts, "f");
    if (snapshot) {
      const { scale, offsetTop, offsetBottom, offsetLeft, offsetRight, width, height, contextHeight, contextWidth, devicePixelRatio } = snapshot.activeStore;
      const viewScaleInfo = {
        scale,
        offsetTop,
        offsetBottom,
        offsetLeft,
        offsetRight
      };
      const viewSizeInfo = {
        width,
        height,
        contextHeight,
        contextWidth,
        devicePixelRatio
      };
      if (snapshot === null || snapshot === void 0 ? void 0 : snapshot.activeStore.data) {
        renderer.drawData(snapshot.activeStore.data, {
          viewScaleInfo,
          viewSizeInfo
        });
      }
      beforeDrawFrame({ snapshot });
      boardContent.drawView();
      afterDrawFrame({ snapshot });
    }
    if (__classPrivateFieldGet$3(this, _Viewer_drawFrameSnapshotQueue, "f").length === 0) {
      __classPrivateFieldSet$3(this, _Viewer_drawFrameStatus, "COMPLETE", "f");
      return;
    }
    if (__classPrivateFieldGet$3(this, _Viewer_drawFrameStatus, "f") === "DRAWING") {
      requestAnimationFrame(() => {
        __classPrivateFieldGet$3(this, _Viewer_instances, "m", _Viewer_drawAnimationFrame2).call(this);
      });
    }
  };
  var __classPrivateFieldSet$2 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$2 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Board_instances, _Board_opts, _Board_middlewareMap, _Board_activeMiddlewareObjs, _Board_watcher, _Board_renderer, _Board_sharer, _Board_viewer, _Board_calculator, _Board_eventHub, _Board_hasDestroyed, _Board_init, _Board_handlePointStart, _Board_handlePointEnd, _Board_handlePointMove, _Board_handlePointLeave, _Board_handleHover, _Board_handleDoubleClick, _Board_handleContextMenu, _Board_handleWheel, _Board_handleWheelScale, _Board_handleScrollX, _Board_handleScrollY, _Board_handleResize, _Board_handleClear, _Board_handleBeforeDrawFrame, _Board_handleAfterDrawFrame, _Board_resetActiveMiddlewareObjs;
  class Board {
    constructor(opts) {
      _Board_instances.add(this);
      _Board_opts.set(this, void 0);
      _Board_middlewareMap.set(this, /* @__PURE__ */ new Map());
      _Board_activeMiddlewareObjs.set(this, []);
      _Board_watcher.set(this, void 0);
      _Board_renderer.set(this, void 0);
      _Board_sharer.set(this, void 0);
      _Board_viewer.set(this, void 0);
      _Board_calculator.set(this, void 0);
      _Board_eventHub.set(this, new EventEmitter());
      _Board_hasDestroyed.set(this, false);
      const { boardContent } = opts;
      const sharer = new Sharer();
      const watcher = new BoardWatcher({
        boardContent,
        sharer
      });
      const renderer = new Renderer({
        viewContext: boardContent.viewContext,
        tempContext: boardContent.tempContext,
        sharer
      });
      const calculator = renderer.getCalculator();
      __classPrivateFieldSet$2(this, _Board_opts, opts, "f");
      __classPrivateFieldSet$2(this, _Board_sharer, sharer, "f");
      __classPrivateFieldSet$2(this, _Board_watcher, watcher, "f");
      __classPrivateFieldSet$2(this, _Board_renderer, renderer, "f");
      __classPrivateFieldSet$2(this, _Board_calculator, calculator, "f");
      __classPrivateFieldSet$2(this, _Board_viewer, new Viewer({
        boardContent: opts.boardContent,
        sharer,
        renderer,
        calculator: __classPrivateFieldGet$2(this, _Board_calculator, "f"),
        beforeDrawFrame: (e) => {
          __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleBeforeDrawFrame).call(this, e);
        },
        afterDrawFrame: (e) => {
          __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleAfterDrawFrame).call(this, e);
        }
      }), "f");
      __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_init).call(this);
      __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_resetActiveMiddlewareObjs).call(this);
    }
    isDestroyed() {
      return __classPrivateFieldGet$2(this, _Board_hasDestroyed, "f");
    }
    destroy() {
      __classPrivateFieldGet$2(this, _Board_watcher, "f").destroy();
      __classPrivateFieldGet$2(this, _Board_renderer, "f").destroy();
      __classPrivateFieldGet$2(this, _Board_calculator, "f").destroy();
      __classPrivateFieldGet$2(this, _Board_eventHub, "f").destroy();
      __classPrivateFieldSet$2(this, _Board_hasDestroyed, true, "f");
    }
    getSharer() {
      return __classPrivateFieldGet$2(this, _Board_sharer, "f");
    }
    getViewer() {
      return __classPrivateFieldGet$2(this, _Board_viewer, "f");
    }
    getRenderer() {
      return __classPrivateFieldGet$2(this, _Board_renderer, "f");
    }
    setData(data) {
      const sharer = __classPrivateFieldGet$2(this, _Board_sharer, "f");
      __classPrivateFieldGet$2(this, _Board_sharer, "f").setActiveStorage("data", data);
      const viewSizeInfo = sharer.getActiveViewSizeInfo();
      const viewScaleInfo = sharer.getActiveViewScaleInfo();
      const newViewContextSize = calcElementsContextSize(data.elements, {
        viewWidth: viewSizeInfo.width,
        viewHeight: viewSizeInfo.height,
        extend: true
      });
      __classPrivateFieldGet$2(this, _Board_viewer, "f").resetVirtualFlatItemMap(data, {
        viewSizeInfo,
        viewScaleInfo
      });
      __classPrivateFieldGet$2(this, _Board_viewer, "f").drawFrame();
      const newViewSizeInfo = Object.assign(Object.assign({}, viewSizeInfo), newViewContextSize);
      __classPrivateFieldGet$2(this, _Board_sharer, "f").setActiveViewSizeInfo(newViewSizeInfo);
      return { viewSizeInfo: newViewSizeInfo };
    }
    getData() {
      const { data } = __classPrivateFieldGet$2(this, _Board_sharer, "f").getActiveStoreSnapshot();
      return data;
    }
    use(middleware, config) {
      var _a, _b, _c;
      if (__classPrivateFieldGet$2(this, _Board_middlewareMap, "f").has(middleware)) {
        const item = __classPrivateFieldGet$2(this, _Board_middlewareMap, "f").get(middleware);
        if (item && item.status !== "enable") {
          item.status = "enable";
          (_b = (_a = item.middlewareObject).use) === null || _b === void 0 ? void 0 : _b.call(_a);
          __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_resetActiveMiddlewareObjs).call(this);
        }
        return;
      }
      const { boardContent, container } = __classPrivateFieldGet$2(this, _Board_opts, "f");
      const sharer = __classPrivateFieldGet$2(this, _Board_sharer, "f");
      const viewer = __classPrivateFieldGet$2(this, _Board_viewer, "f");
      const calculator = __classPrivateFieldGet$2(this, _Board_calculator, "f");
      const eventHub = __classPrivateFieldGet$2(this, _Board_eventHub, "f");
      const obj = middleware({ boardContent, sharer, viewer, calculator, eventHub, container }, config);
      (_c = obj.use) === null || _c === void 0 ? void 0 : _c.call(obj);
      __classPrivateFieldGet$2(this, _Board_middlewareMap, "f").set(middleware, {
        status: "enable",
        middlewareObject: obj,
        config
      });
      __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_resetActiveMiddlewareObjs).call(this);
    }
    disuse(middleware) {
      var _a, _b;
      if (__classPrivateFieldGet$2(this, _Board_middlewareMap, "f").has(middleware)) {
        const item = __classPrivateFieldGet$2(this, _Board_middlewareMap, "f").get(middleware);
        if (item) {
          (_b = (_a = item.middlewareObject).disuse) === null || _b === void 0 ? void 0 : _b.call(_a);
          item.status = "disable";
        }
        __classPrivateFieldGet$2(this, _Board_middlewareMap, "f").delete(middleware);
        __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_resetActiveMiddlewareObjs).call(this);
      }
    }
    resetMiddlewareConfig(middleware, config) {
      var _a, _b;
      if (__classPrivateFieldGet$2(this, _Board_middlewareMap, "f").has(middleware)) {
        const item = __classPrivateFieldGet$2(this, _Board_middlewareMap, "f").get(middleware);
        if (item) {
          (_b = (_a = item.middlewareObject).resetConfig) === null || _b === void 0 ? void 0 : _b.call(_a, config);
        }
      }
    }
    scale(opts) {
      const viewer = __classPrivateFieldGet$2(this, _Board_viewer, "f");
      const { ignoreUpdateVisibleStatus } = opts;
      const { moveX, moveY } = viewer.scale(Object.assign(Object.assign({}, opts), {
        ignoreUpdateVisibleStatus: true
      }));
      viewer.scroll({ moveX, moveY, ignoreUpdateVisibleStatus });
    }
    scroll(opts) {
      const result = __classPrivateFieldGet$2(this, _Board_viewer, "f").scroll(opts);
      return result;
    }
    updateViewScaleInfo(opts) {
      const result = __classPrivateFieldGet$2(this, _Board_viewer, "f").updateViewScaleInfo(opts);
      return result;
    }
    resize(newViewSize, opts) {
      const viewSize = __classPrivateFieldGet$2(this, _Board_viewer, "f").resize(newViewSize, opts);
      const { width, height, devicePixelRatio } = newViewSize;
      const { boardContent } = __classPrivateFieldGet$2(this, _Board_opts, "f");
      boardContent.viewContext.$resize({ width, height, devicePixelRatio });
      boardContent.overlayContext.$resize({ width, height, devicePixelRatio });
      boardContent.boardContext.$resize({ width, height, devicePixelRatio });
      boardContent.underlayContext.$resize({ width, height, devicePixelRatio });
      __classPrivateFieldGet$2(this, _Board_viewer, "f").drawFrame();
      __classPrivateFieldGet$2(this, _Board_watcher, "f").trigger("resize", viewSize);
      __classPrivateFieldGet$2(this, _Board_sharer, "f").setActiveViewSizeInfo(newViewSize);
    }
    clear() {
      const { boardContent } = __classPrivateFieldGet$2(this, _Board_opts, "f");
      const { underlayContext, overlayContext, viewContext, boardContext } = boardContent;
      underlayContext.clearRect(0, 0, underlayContext.canvas.width, underlayContext.canvas.height);
      overlayContext.clearRect(0, 0, overlayContext.canvas.width, overlayContext.canvas.height);
      viewContext.clearRect(0, 0, viewContext.canvas.width, viewContext.canvas.height);
      boardContext.clearRect(0, 0, boardContext.canvas.width, boardContext.canvas.height);
      __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleClear).call(this);
    }
    getEventHub() {
      return __classPrivateFieldGet$2(this, _Board_eventHub, "f");
    }
    onWatcherEvents() {
      if (__classPrivateFieldGet$2(this, _Board_opts, "f").disableWatcher === true) {
        return;
      }
      __classPrivateFieldGet$2(this, _Board_watcher, "f").onEvents();
    }
    offWatcherEvents() {
      if (__classPrivateFieldGet$2(this, _Board_opts, "f").disableWatcher === true) {
        return;
      }
      __classPrivateFieldGet$2(this, _Board_watcher, "f").offEvents();
    }
  }
  _Board_opts = /* @__PURE__ */ new WeakMap(), _Board_middlewareMap = /* @__PURE__ */ new WeakMap(), _Board_activeMiddlewareObjs = /* @__PURE__ */ new WeakMap(), _Board_watcher = /* @__PURE__ */ new WeakMap(), _Board_renderer = /* @__PURE__ */ new WeakMap(), _Board_sharer = /* @__PURE__ */ new WeakMap(), _Board_viewer = /* @__PURE__ */ new WeakMap(), _Board_calculator = /* @__PURE__ */ new WeakMap(), _Board_eventHub = /* @__PURE__ */ new WeakMap(), _Board_hasDestroyed = /* @__PURE__ */ new WeakMap(), _Board_instances = /* @__PURE__ */ new WeakSet(), _Board_init = function _Board_init2() {
    if (__classPrivateFieldGet$2(this, _Board_opts, "f").disableWatcher !== true) {
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("pointStart", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handlePointStart).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("pointEnd", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handlePointEnd).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("pointMove", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handlePointMove).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("pointLeave", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handlePointLeave).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("hover", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleHover).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("wheel", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleWheel).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("wheelScale", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleWheelScale).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("scrollX", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleScrollX).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("scrollY", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleScrollY).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("resize", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleResize).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("doubleClick", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleDoubleClick).bind(this));
      __classPrivateFieldGet$2(this, _Board_watcher, "f").on("contextMenu", __classPrivateFieldGet$2(this, _Board_instances, "m", _Board_handleContextMenu).bind(this));
    }
    __classPrivateFieldGet$2(this, _Board_renderer, "f").on("load", () => {
      __classPrivateFieldGet$2(this, _Board_eventHub, "f").trigger("loadResource");
    });
  }, _Board_handlePointStart = function _Board_handlePointStart2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.pointStart) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handlePointEnd = function _Board_handlePointEnd2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.pointEnd) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handlePointMove = function _Board_handlePointMove2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.pointMove) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handlePointLeave = function _Board_handlePointLeave2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.pointLeave) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleHover = function _Board_handleHover2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.hover) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleDoubleClick = function _Board_handleDoubleClick2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.doubleClick) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleContextMenu = function _Board_handleContextMenu2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.contextMenu) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleWheel = function _Board_handleWheel2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.wheel) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleWheelScale = function _Board_handleWheelScale2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.wheelScale) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleScrollX = function _Board_handleScrollX2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.scrollX) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleScrollY = function _Board_handleScrollY2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.scrollY) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleResize = function _Board_handleResize2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.resize) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleClear = function _Board_handleClear2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.clear) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleBeforeDrawFrame = function _Board_handleBeforeDrawFrame2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.beforeDrawFrame) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_handleAfterDrawFrame = function _Board_handleAfterDrawFrame2(e) {
    var _a;
    for (let i = 0; i < __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f").length; i++) {
      const obj = __classPrivateFieldGet$2(this, _Board_activeMiddlewareObjs, "f")[i];
      const result = (_a = obj === null || obj === void 0 ? void 0 : obj.afterDrawFrame) === null || _a === void 0 ? void 0 : _a.call(obj, e);
      if (result === false) {
        return;
      }
    }
  }, _Board_resetActiveMiddlewareObjs = function _Board_resetActiveMiddlewareObjs2() {
    const activeMiddlewareObjs = [];
    for (const [_, item] of __classPrivateFieldGet$2(this, _Board_middlewareMap, "f")) {
      if ((item === null || item === void 0 ? void 0 : item.status) === "enable" && (item === null || item === void 0 ? void 0 : item.middlewareObject)) {
        activeMiddlewareObjs.push(item.middlewareObject);
      }
    }
    __classPrivateFieldSet$2(this, _Board_activeMiddlewareObjs, activeMiddlewareObjs, "f");
  };
  const CURSOR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDktMTdUMTY6MDc6MjYrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA5LTE3VDE2OjEyOjUwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA5LTE3VDE2OjEyOjUwKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjliMGM0MzI2LWU4ZTQtNDlkNy04MmUzLTgxODkwYTE2ZmU1YSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjMzOGFhZDBmLWZkZjMtODE0MS1iMTZmLWNiZWIzNTQyYTJhMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUwODAxNzc1LWZlNGEtNDQyMy05NDQ3LThkYWRhNzZhYTllOSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTA4MDE3NzUtZmU0YS00NDIzLTk0NDctOGRhZGE3NmFhOWU5IiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjA3OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWIwYzQzMjYtZThlNC00OWQ3LTgyZTMtODE4OTBhMTZmZTVhIiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjEyOjUwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7W6XrzAAAGLklEQVRYhb2Xf2iUdRzHX/txtfXLplZ6Wblm6fzRmG6r7Uou1AxKRjQKYUqgaLBACFogppcK1h8aLRkMSYaJIA5hYMomZpskEfPOufCaDpZ6t7rbre263U3vzn3643meu+eu3XNzvz7w4bbdc/e89nl/Pu/v50HUCAQCx1tbW0uAx4CHgSwggxkKERkziUQif2mQ0WjU53a7vwSeBB4BTEDmTICmBBwYGDivVlDjlFAo9KvT6dwIPAHkANkq6MwDXr169bCISENDg9TX14s+BgcHf2hubi5mBmRPCXj06NFPREQ6OjoEkPLycrl06VIMMhKJeFwu1xdMs+wpAYuLi9eIiIyOjkpeXp4AAsj27dvF7/fHQIPB4C9dXV0fME2ypwQEXvX7/bdFRNauXRsDBMRkMsnhw4cTZB8YGGhsamp6hSmW3Qhw1Y0bN86LiNTW1iYAallWViZtbW162ftcLtdO/i/7tAAWtba2ficicvLkyTEBtdy6dasMDg7GQIeHh9s7OzvfBx5nkrIbAS7du3fvxyIiPT09hoBa1tXVJcv+fWNj4zLgUeAhJiC7EeDLwOsiMioisnDhwnFBrlixQi5evKiX/c6tW7c+R5E9lweU3QjwReDV/v7+bhGRqqqqcQFquWnTJvH5fHrZLzocjkoSZU9bTSPA54GV165daxYROXDgwAMBannw4MFk2RsaGhqWME7ZjQDNwIrTp09/JSLS0tIyIUBACgoK5MKFCzHIcDj85+3btz8FZpFGdiPAZ4DCmpqaTSIiPp9vwoBaVlVVidfr1ct+/sqVK+9iILsR4FzgJcASDoeHRUSKioomDQnI/v37E2T3+Xz1hw4dWjSW7EaAeUA+UNbX12cXEdmyZcuUAAJiNpvlzJkzetl73G53rVrN2EmUCjATuA9EgYjL5eoGKCkpGatNHijmz5/Pxo0b2blzJ2azOfZ3k8lUYDabv45Go/Y7d+6sIY0VZQOjGqDT6bxeWlrKqlWrJgRlsVhYv349FRUVWCwWcnJyEt4PBoOuoaEhu9frvdzR0fHTtm3buolvRpLqe3OBp4EllZWV74mIRKNRyc3NTSvf7Nmzpbq6Wk6cOCFut1uSY2RkJOB0Ou3Nzc3Ha2trPwPWAGXAEuBZFFPPAbKMevBhYA6wCKgIBoP9IiKrV682hLPZbP8DEpH7vb29N1paWn602WwHFyxYsAX4EKgE3gIsQBFQgOIeT6j3z0wFqEkc60OPx9Odn58/t6SkhPb29jFLbrVa2bNnDwBer7fv5s2bPQ6Ho7upqcnZ1tbmASJq3gPC6utdYESXYfWeo6mkBaUHRQ/odrv/yM/Pt5SWlqb8kAbncDh+W7lyZYN683u6DOvAwipsOOnniA4wZf9lqhdoVYzY7fbrQMpBsdlsWK1WRkZGAtXV1d8D/wA+wKNLr5o+YEC9ZggIAEHiFbyfDhCUCcoFngIWFxYWrtMaat68eQl9V15eHmu2+vr6OuAd4A2gGFgMLERp/mdQ+noWyuadi9Jr2aQ4k42GBPXDs1Ga97WhoaFbIiIbNmxIANTWq87Ozp9VuApgGfACihPkoRjwI+p3mlSgtA9ZRkYNYwwKJBr2rl27sFqthEKhwZqamqOAX5f/AsPE5btLvM/GJWO6yFb/82eBonPnztWJiJw9e1YAWb58eUzaI0eOfAO8CbwCPIfiZZN+eEoncSaKLPOApbt3794uIuL1ehOktdvtF4C3gRKURXcOSn9lTRRsvIAZKI4+l/gjQFREZMeOHSIiEggE+tetW/cRitkuRhmERxnnxjxZQFDWnzzURwCv1+vUHxHHjh37lri0C1Am9KGpgDMC1G8SQnxxCHs8Hqf2RldX10+bN28+i+JjwyT62KSaP13oAfWTHO7t7f0dIBQK/b1v375GlEnVjPYuyoQaHlNTDahVMALca29vdwBcvnz5+KlTp26OATft1UuODBS7yEOxj0K/329HOSWWopjxlE1tchhtM7FriPfgXSDDbrfXo0gbJr4QzIi0WiRPYBbKZJrUV23b0dYn7XSYcsBkS9EiO/k6lApq1cwiPjzaAM1Y9cYC1G6uAWrPCtrvMwoHqU02Q5caIEzj1KaS+D+vIjxtLug31gAAAABJRU5ErkJggg==";
  const CURSOR_RESIZE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDktMTdUMTY6MzE6MjMrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA5LTE3VDE2OjQ0OjIyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA5LTE3VDE2OjQ0OjIyKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY0MTBhYjUzLWM0ZjEtNDVhNS04MjhkLTIxOTczOWFjOTk3MSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjBkMDNmNjM5LTE5MzctY2Y0MC1hMTg0LTIyMjg0NzczNWNmYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjgyYjQwZGRmLWE0ZGEtNDY3MC1iYzc2LTBhYjY3ZmI5M2I0ZSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODJiNDBkZGYtYTRkYS00NjcwLWJjNzYtMGFiNjdmYjkzYjRlIiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjMxOjIzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjQxMGFiNTMtYzRmMS00NWE1LTgyOGQtMjE5NzM5YWM5OTcxIiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjQ0OjIyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz57vRudAAAEk0lEQVRYhe3ZW0jbVxzA8e8/MX+NYnG9uI4xE3bvoLt0FzradRfGBtsYo32YdAhb6WQyBqV7KOylpYjzZShDGfjmyxgbgjjwyRm16SYMhgiNKDhbL3VtNF4xJOnf3x7+59i/Wf4aTbInf3AwJMdzPjnnf/n9/jFEhGzDMIxMb3uAIsDs6ek5urS05Dtz5syE+uwekAQS6u89YD19gC0NIpJ1c8GZQHlXV9fJRCIxGo/HxxoaGj4CngWOAEGgEihXfT07MeQC3MB1dna+lkgkRkXF6urq3xcuXPgUOAE8DzwGPOiGLARwEy4ej4+JiITD4elr167NiIgsLi7eqq2trQPeBI4Bj7sh8w10xZmmeds0zdn+/v5/RERisdjUuXPnvgLeAl50Q+YTaAA+oKy7u/uE3laNAwSQ4uLiu6FQ6G4G5DG13YeAMjWWkU+gBygJhULHNe769etTTpwDGXUiz58//yXwujp5qoAHgBLAk0+gNxKJHEulUiMKN2ma5gwgPp/vjhOXjlxYWJisq6urBV5RW30IKAW8eQPGYrGjlmXdEBEZHBy8aZrmFCCmac729fVtAHt7e6MO5N2+vr47IiJLS0s3L126dBZ4Sh2LZUBRwVdwYGBgVuwOYh/zsoF0bnPBVzDTMRgOh6dFhROokSIi8/Pz0+pEeaPQx+DGWdzV1XVSX2LcgCIic3NzMzU1NV8D7wIvq9WrLNRZvOk62NHRccqJTAdGo9Hb1dXV3wAfYt9VjgAPFfI66EQWAxU9PT0fuwEvXrzYBJwF3gFeAAJAhfrfrO4k/7lxZxnr2JlJqry8POnWyePx6H4JR0vhktVkHGOXQI20SkpKLLcOhmGsA5YCaZiVLS5XoADi9XpdkznDMERhnE0fCgUHZhvOW+CO4/8A5hR7wFxjD5hr7AFzjZyBlmVlrOYdYaS1HUUuQA/gWV9fd51URDyqn1c1j6MVFGjoidfW1oq2ABrYj0V82OmVzwHNajVdB88C5wOKTdM87NaxsrKyQsFKHC2BnTDo+/TWt8Bd5INeVC44NDT0xXYZdXNz8w/AaeyS8yjwCPdzQu92ht2m/OUjIyOfS1pkAoqItLS0fA+8D7wKPA0cxs6qC1O4T0xMfKYnb21tnXEDNjc3z+nXbW1t3wFvYz9dCAL7KUThHovFPtGTNjU1jQFSX18/lg68cuXKLUAaGxs3vkB7e/u3wHHgCQpUdnpTqdQvesJgMDisUVevXh3Xry9fvnxTv66qqprQ/cfHx/vVNj/J/couv0DAv7q6+pMDeYPNSalkwkUikX7s4ukl4FHgAODPN1CXnPsWFxd/dCAjW+GGhoZCwAfYpeczwMPAPjVW3gv3IvXN98disZ8dyBGNCwQC4/r94eHhfuy6+JS6zATUCeJXY+W9cNfIUuDAwsLCr05kIBDYeBQ8Ojr6h8Lpx25BtbWlGpfv62BG5PLy8m+SFpOTk38C76mVe84NVyhgOvLgysrK7xoXjUb/Uqt2XG1rEDiYCbcd0MgwsWtk+J1EI03An0wmw5Zlefx+/2n1eRKIO5r+rWTTpFsZ/gWFrGMmeObuqwAAAABJRU5ErkJggg==";
  const CURSOR_DRAG_DEFAULT = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAEvUlEQVRYhc2Y20/cVRDHP8v+uKzAWkpDCtZq8BYhJkq8PBoJxgj7I2m0ryaSyFN9IT74pI8+8WJiggRj/APApFkSTGRJ+qKGUiyxbGPEWsUSuVhYC12Wy8+HmeMeYPe3d3WSye/k/M7le+bMzJkZ+J9ToEJreGVYN+vihcytstjQocUlAw0WCSoIVCv3Ae8CXwIt+u8XHVeOG8qLqgAHqAFCQCNwGugCthBJGd7S/tM6LqTzHI5KuqzgaoAHgEvAtwrkG2AG8FzXvep5nue67lX9N6P/PR1/SefXlBtkFXKNDUA/RyX1D9uUbYzOb9D1ygbSQU7eDMxhSSsSiVz3AxiJRK57nuf19/fPad8coqONFCBJPyUOIKc1OvcbgiY9ICDT8+0DHge2gR0gBeyTtviM5HeKAGlrrfMZVwhdAVaAr4F3KNF4gkA9cBbowOc68+3LwDn1Mhdy4/OcYk54nPr6+m54nofruvPa9SFQ6wfQTweNgTwInAGuQWk6mEUvHwb+Au4Dexx7ffK9+0q+CHWIBIOZ9skHYKWfK9tQ8gZoLDjIyWCg3ORY+2T8aYOyg4EaRIFrkCs4QU1NTSvabC20zyIDzuyfkYzEahHX8jHwE/LwXwHeJ4P7KIVIu5ouxFDC+HgLAy4MfEF2v1UpgOezATSiNVf6EvAWsD01NXVtdnb2bk9Pz81sp/q3KIi8t83Ae4DX0tJy0z7t8PDwD4FAYIX/WILVwKMAzc3Nu/agoaGhzmg0ugcsV0hIvlSNoH8IuIiebHJycrls4sotwaxGYvueAPAjEg3jum79yMjIr5WUjFLOxMpBIopWoBN4GfhOJ+4NDg4ulVt6i4uLm7r+BvAscA4fCXrAAfJQJ5Fg8gPgMuCMjo62d3V1LW1sbKRKlpXSxMTEmjZ/5qQrOwHwUAGmkIjiHhJdfKrM/Pz8Y+3t7RvT09Ob5QAYi8X2tbmke2cEZwAaCdoAt5QvIzEbiUSitbe3tyoej++UCnBhYSGkzdu6d1aQxkgOkfwgieQMCeCu8iwSnpNKpcIdHR3BZDJ5UCy4SCSyvL6+/giiSou67wE+eYmhAKKkIaAJUdynkdflNcQF3dFTpooxjmg0aozDAz4DXkB8bxPy1OYM7QzIOuAU0AY8pQu9CrwJ3AK8UCj0RyHgZmZmli1w3wOvAM/oHo1kiZiygbSDh7PAE8DzQA/wBqKnnuM4a2NjY7dygbtw4cICRy31deBFJA09o7eWsU7kJ1KTLJmyRyOSn5zS70fAkwBtbW2/DwwMHHR3d9d3dnY2rK6u7o2Pj2/GYrH9eDzurK2tndM1vwI+QXT7T2BTD5skQz6SCyAcLRoZkGEFGQbeRqpbubK+BPA5MI14h00L3I6Cy2h4+eQbJsKuRa6iQcGFFfB5oBt4DpFsI+Ky7iDBxW3gBhBH/GtC+R7i1lKk3UxRAG2QpvxWr0AbtB3SA5jkx36djH/dVlDbyibN3M8GDvJPyI2PSulixm/u6kZ1OQCaJ/S+tndJX6tvsFBIxcCUdA3vW5ubxMrObc0hDMhd/Rqp5QQHxeW8dubnHGM7tzVv/IECMlxQ/bpcRfRMqaNRheNcUGG9XFWDACfzWs/6Fl3t/xtO//8gpbCORQAAAABJRU5ErkJggg==`;
  const CURSOR_DRAG_ACTIVE = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAER0lEQVRYhe2YT2hjRRjAf8lL22xsNsm6EWKrSKvuIkIh+O9QRFxEW18KUsoe7FHoRaWCN1FPetOrIHgVKS0q9P5OxaJbodkalgVrtVZjS7Ntd02z6abPw3yzmaT585q+elj2g2HmvZn35jffN/PNNwP35R6XgM/fuif4n+dO2klQvgsaZRc4NJJvoJbHdhrIAkJAN2ADHwFfAw9J3ZoB/b9I0AA6A0SBc0Aa2EVpSqddeZ+QdmfkO+u0gIPSQQR4HfhRQH4AHMDNZDJXXNd1M5nMFalzdB3wJTAOPAD0yEB9066G6wXepVZTd5MpTdporZ6jVqsatmMJoTR3HvgJQ1u2bS+3ArRte9l1XXdsbGyJo1pdBN6Wf3d3ChlAmSQO9LeC8fquQRpDWaerHWSjSr1iu4BkJyOsF9u2s67rkslkluTVxygltAVsJBZqdCngEj5osIlW+4EYytRNF04jeu3vulCT+7QkLH20dEOhumft97pQI4s3+iiRSPwtxVSbd39J8eEGvzFXc1NAs8KSFAZeBt4AHgNeBFDWObkEAne7HAK2gT2gCFQatdca1GbtBj4E3veFprVYVLXXcg4GqM6588BbAMlkcm1qamqzr6/v6ikBet5RgiizJoDPAXdgYGDZXHkzMzPrrk9CdRWngUeAsxxdCzVwpgZ/BigWiz1mo4mJif7jqMajeJrU5hywgGvAej6fvzA0NLThN1Eul9uT4g5VTbYFNKUIfAbsZ7PZvuHh4Wt+As7Ozu5IcY2j219TQB0NV4A7qODgO4CFhYWLg4ODOb8AHccpG4A68m6pRQ1YAQ6A28A+8BXwBcDq6upTqVTquh+AuVyuW4q/opRRaQdZD1gCbgE3ge+BT4HdfD7/ZDwe/z2bzRY6hRsfH1/e3Nx8FDX/sgbgoZfvg6jo4ixqW7oIPA+8CrwHrAJuJBLJd+JaHMf5k6qmPgGeQe1SCenXk0/U21xcIC8AzwGvAJPAEuAmEon1xcXFba9w8/Pz5oqdB14CnpY+oij35km0qwmjwqAU8ISM9hIwBeQA17KsG9PT07+1gxsZGdmgdqW+BjwLDAAPoo4ALU+W9arVwWoIpXp9kouKZpPAO8AwQCwW+2d0dLQ0OTkZSafT0UKhUJ6bm9t2HKeysrIS3tra0g7+KvABUJC0g5rrJdRcbLpImtleRzYashc1P2OSXwbebDVykX3gW+Ab1AHqhuQ3pe6AJlFMO0CoPROHDcio5I8DL1A9C8dQbmod+APYAK4DvwjQnsDdErgyVTfTEaCG1GFYGHXG7TVSo2OkdvhlAflXoHSuNdfStFqaRhEi2kfdprrj6M5LAt0I8EDaaMdflPal48CB95hMr3Bt8h4jD0kyL5E0pN6dysZzW7N2AqjbmhdIZjJvufTOpE19x3g+9s1XJ/ck5tVbfdhu+rxDfLiSO+lFToCjZwrXyH2/0Lwv95z8B1jAqXmDnj4YAAAAAElFTkSuQmCC`;
  const CURSOR_RESIZE_ROTATE = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAIiklEQVRYhe2YW2yUxxmGn7W96zXGNnZsr2FJHQyYBHNIU1ttAqVUVjlJUAtxQyUXhKgQktUDdSUkuEDtBVJ9UQXRC0RJRblrq/SCIARpFImWQ8VBIZQinJpQYozNyWaxiw/rfXsx3+z+6xNOe9tPGv2nOTzzffPPvDMhSXwJC1nKAXIDV/9ellLAqF1T9o5A2Ry7J5A/Fbh3mUMh8qYJ5kHCQATID6QIkBcAHAVGgKFAStq33EB53/ao5Rm064i9g0CmqcDyrNICYCZQBJTYdaa9j1jelDUwCAwAz4F+ex61DhZauXzr1CDwDHhq1wFg2Do1KWAo0NsCAyoDKoGYXcuBWdZY1PKnzAsDQB/wBOg1yKTVN8vqmoHz6nOgC7gHdFrbCasrNRFgyMCj5qVXgDlANfAaMA/4ir2rMI+MtSHgEdAN9BjsiNVZYR0sNq8+AtqB69Z2MuDBcYA+pAXW0yoDWgTUWXrd8k1l+cBcSxjIIBlPB63G8uUB/8Z57znwAkgGAX1YC4BSK7QIWA7UWwoDJJNJzp49y4ULF2hvb6e7u5tEIkFhYSGVlZXMmzePhoYGNmzYQElJCVZv2tPt7e3s2bOHvr4+9u3bx/r16+PWjg/zQ9x4BEk+5UkqklQt6ZuSdkn6jaRbMhsYGFBbW5uWLVvmp5MpU3V1tVpbW9XV1aWgbdy4MZ2npqbGvx6W9DtJ35e0RFJREDBX0gxJcUnfkPQDScck3fGlz549q7q6ummBjU2xWEzvvfdeGvCtt95Kf6uoqAiyfyBpt6SvSZrlAUOSIpLKJS2X9D1Jv5Z025d69913FQqFJmy8rKxMS5YsUUNDg5YvX67Zs2dPCrpjxw6NjIxoxYoV6XdVVVVBwI8l/UTS1yWVesBcC+18SRsk/ULS33yJtra2CRtramrSiRMn1NXVpWQyKUlKpVJ6+vSpTp48qZ07dyo/P39cua1bt6q+vn4ywL9IapX0tqQyDxiRFDPq3ZL+JCklSadOnRrXwMKFC3X69GlNx65du6aVK1eOqyMYjTGAf50IsNC8t1FSm6TPJOn+/fuKxWJZFb/zzjvjBvx0bO/evQqHwxNG4mUe9MtYMZk5bwHA4cOH6enpSc9BixYt4uTJk5SVlflXfcBN4DFuapoHLPQfz58/z9WrVwmFQsTjceLxOHfv3uUlNlZcpFeMEtzsXg2QSCQ4duxYulQoFOLQoUNBuE7gvAE+x82b/VZHyblz52hsbCSZTL4MCGWrqUECq0gQsBi3ts4B+PDDD3n48GG61OrVq1mzZo1/fGZw54HbVmGV1bMAWPbRRx9NC24CwD7cajLiAXNwIS7ELW3lAGfOnMmqZPv27cHHvwM3gH8AnwH/wnn0C+AuwLZt25g/f/5L4cLhMNu2bfOPnbh1+xkZ9UMebvmKGmQEoLOzM11JQUEBK1eu9I/JAFAPTqnk4hTNY9xS1V5TU1N7+fJlOjo6SKXS+jPLJFFUVMTixYsxmJtW/inOi2nAXDI/C0BWeMvKyojFYv6xz1LCKhnCRSEBPMCFfBaQKi0tfb2+vn5qFzp7AnwCXAM+t45mAUJGfgMwOpoWtIRCWZ/89BB8TuJ+lG5cNEatkXYgjtN+BYG2ktaxBE4U3AP+iRsud3EeHCTwk6Ss0IhvtaKiIk3Q19dHb28vhYWF4H6mYtxwiBrQIE4aPTHgIVzoO3E/TzlOV4YD3/stj9eMPj2xzg4HAYMSPQnkxePxNGB/fz+XLl1iy5Yt4HTeq+aZTtyA9h18Yb33G6aRQBqyDiUNLihmH1q54LAZ9ZHKISPRn1loaGxsJGjHjx8PPi6xtAgnNufgVHcRmf1J2DpTiJsjvYout3c5gQ49Ns89s3fpOdB70I+Hx7iBXrV27VqKi4tJJBKAm3auXLmCDfpy4G3rZSHur/aSPg83BCpx24MFuNUlbnkHcGMubEDdxpG0lBn8AcBBsgfsVysqKti6dStHjhwBYGRkhJaWFs6dO0ckEgGYj9v0xIA71rkha7jUgBYCb5hHGRoaIj8/f4Z5s8jafUpmN/diLBwAkmZKWiipSdKvJN2VpI6ODhUVFWUt7Js2bdLAwMBYLdAt6VNJlyV9IumLsRkOHjyo2tparVixQrdvp2Xmn00YrJI0R05VBRV+GjAiqcoUxA8lnfI1HD16dJz6WLVqla5fvz4tFdPZ2anm5uas8s3Nzf7zp5J+LmmNpFcl5U8GmCupWFKtpO9K+qWkG76W3bt3j4OMRqNqaWnRhQsXNDQ0lAWVTCZ169YtHThwQFVVVePKtrS0+Kw3pgsYso+Vkuol7ZD0W0ldvsHW1tZJZXxtba0aGxvV1NSkdevWaenSpYpGoxPmXb9+vXp6ejzgx5J+ZiGeLSk8GaD34ky5Hd23JP1I0h8kPQmGu7y8/L/aNEUiEe3fv1/Dw8Pp6Es6KqlZ0puSXpHbVU4KiPVglqQFkr4j6aeSfi/pvq/13r172rVrlyorK6cFFo1GtXnzZl25ciU4Ch5J+qOkH0v6tqTXzDk5EwGGlNFjOWQOd8px4vUN4E3cpn2pz/jgwQPef/99Ll68yJ07d+jt7WVwcJBIJEJJSQlz586loaGBTZs2UVdXF5w0OoDLwFWcbPsct6r04+bRLHEYCoWyAD1kBDfHleHmsxrccccS3NFHNV/eenBy6iZwCycMOnHz5wBuDh2nyyY6H0zhFmoF7vtxk+l9q3ieQfrDo8msF7cy3cN56g7ZWnKcep7IxnrQmz+wHKu2K3EKJWbPpWSUTQ4ZtRJc23sC6ZGB9ZM52JwcboIQjzUvZvNxYfeHlyVkZFcBbux6wKA6ShjoM5yM8uH0Xpuy8ekAQuZc2W8P8nEei9p9mMmPgAfJHO0O27e0lHppw9MEDJo//A4eoE91iB48SJ80lFMB/t/+V/sPGZfTmtMFR4EAAAAASUVORK5CYII=`;
  const EVENT_KEY_CHANGE = "change";
  const EVENT_KEY_CURSOR = "cursor";
  const EVENT_KEY_RULER = "ruler";
  const EVENT_KEY_SCALE = "scale";
  const EVENT_KEY_SELECT = "select";
  const EVENT_KEY_SELECT_LAYOUT = "selectLayout";
  const EVENT_KEY_CLEAR_SELECT = "clearSelect";
  const EVENT_KEY_TEXT_EDIT = "textEdit";
  const EVENT_KEY_TEXT_CHANGE = "textChange";
  const EVENT_KEY_CONTEXT_MENU = "contextMenu";
  const EVENT_KEY_SELECT_IN_GROUP = "selectInGroup";
  const innerEventKeys = {
    CURSOR: EVENT_KEY_CURSOR,
    CHANGE: EVENT_KEY_CHANGE,
    RULER: EVENT_KEY_RULER,
    SCALE: EVENT_KEY_SCALE,
    SELECT_LAYOUT: EVENT_KEY_SELECT_LAYOUT,
    SELECT: EVENT_KEY_SELECT,
    CLEAR_SELECT: EVENT_KEY_CLEAR_SELECT,
    TEXT_EDIT: EVENT_KEY_TEXT_EDIT,
    TEXT_CHANGE: EVENT_KEY_TEXT_CHANGE,
    CONTEXT_MENU: EVENT_KEY_CONTEXT_MENU,
    SELECT_IN_GROUP: EVENT_KEY_SELECT_IN_GROUP,
    SNAP_TO_GRID: EVENT_KEY_SELECT_IN_GROUP
  };
  const coreEventKeys = {};
  Object.keys(innerEventKeys).forEach((keyName) => {
    Object.defineProperty(coreEventKeys, keyName, {
      value: innerEventKeys[keyName],
      writable: false
    });
  });
  var __classPrivateFieldSet$1 = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$1 = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Cursor_instances, _Cursor_eventHub, _Cursor_container, _Cursor_cursorType, _Cursor_resizeCursorBaseImage, _Cursor_cursorImageMap, _Cursor_init, _Cursor_loadResizeCursorBaseImage, _Cursor_resetCursor, _Cursor_setCursorResize, _Cursor_appendRotateResizeImage;
  class Cursor {
    constructor(container, opts) {
      _Cursor_instances.add(this);
      _Cursor_eventHub.set(this, void 0);
      _Cursor_container.set(this, void 0);
      _Cursor_cursorType.set(this, null);
      _Cursor_resizeCursorBaseImage.set(this, null);
      _Cursor_cursorImageMap.set(this, {
        auto: CURSOR,
        "drag-default": CURSOR_DRAG_DEFAULT,
        "drag-active": CURSOR_DRAG_ACTIVE,
        "rotate-0": CURSOR_RESIZE,
        rotate: CURSOR_RESIZE_ROTATE
      });
      __classPrivateFieldSet$1(this, _Cursor_container, container, "f");
      __classPrivateFieldSet$1(this, _Cursor_eventHub, opts.eventHub, "f");
      __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_init).call(this);
      __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_loadResizeCursorBaseImage).call(this);
    }
  }
  _Cursor_eventHub = /* @__PURE__ */ new WeakMap(), _Cursor_container = /* @__PURE__ */ new WeakMap(), _Cursor_cursorType = /* @__PURE__ */ new WeakMap(), _Cursor_resizeCursorBaseImage = /* @__PURE__ */ new WeakMap(), _Cursor_cursorImageMap = /* @__PURE__ */ new WeakMap(), _Cursor_instances = /* @__PURE__ */ new WeakSet(), _Cursor_init = function _Cursor_init2() {
    const eventHub = __classPrivateFieldGet$1(this, _Cursor_eventHub, "f");
    __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_resetCursor).call(this, "default");
    eventHub.on(coreEventKeys.CURSOR, (e) => {
      var _a;
      if (e.type === "over-element" || !e.type) {
        __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_resetCursor).call(this, "auto");
      } else if (e.type === "resize-rotate") {
        __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_resetCursor).call(this, "rotate");
      } else if (typeof e.type === "string" && ((_a = e.type) === null || _a === void 0 ? void 0 : _a.startsWith("resize-"))) {
        __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_setCursorResize).call(this, e);
      } else if (e.type === "drag-default") {
        __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_resetCursor).call(this, "drag-default");
      } else if (e.type === "drag-active") {
        __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_resetCursor).call(this, "drag-active");
      } else {
        __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_resetCursor).call(this, "auto");
      }
    });
  }, _Cursor_loadResizeCursorBaseImage = function _Cursor_loadResizeCursorBaseImage2() {
    loadImage(CURSOR_RESIZE).then((img) => {
      __classPrivateFieldSet$1(this, _Cursor_resizeCursorBaseImage, img, "f");
    }).catch((err) => {
      console.error(err);
    });
  }, _Cursor_resetCursor = function _Cursor_resetCursor2(cursorKey) {
    if (__classPrivateFieldGet$1(this, _Cursor_cursorType, "f") === cursorKey) {
      return;
    }
    __classPrivateFieldSet$1(this, _Cursor_cursorType, cursorKey, "f");
    const image = __classPrivateFieldGet$1(this, _Cursor_cursorImageMap, "f")[__classPrivateFieldGet$1(this, _Cursor_cursorType, "f")] || __classPrivateFieldGet$1(this, _Cursor_cursorImageMap, "f")["auto"];
    let offsetX = 0;
    let offsetY = 0;
    if (cursorKey.startsWith("rotate-") && __classPrivateFieldGet$1(this, _Cursor_cursorImageMap, "f")[__classPrivateFieldGet$1(this, _Cursor_cursorType, "f")]) {
      offsetX = 10;
      offsetY = 10;
    } else if (cursorKey === "rotate") {
      offsetX = 10;
      offsetY = 10;
    }
    if (cursorKey === "default") {
      __classPrivateFieldGet$1(this, _Cursor_container, "f").style.cursor = "default";
    } else {
      __classPrivateFieldGet$1(this, _Cursor_container, "f").style.cursor = `image-set(url(${image})2x) ${offsetX} ${offsetY}, auto`;
    }
  }, _Cursor_setCursorResize = function _Cursor_setCursorResize2(e) {
    var _a;
    let totalAngle = 0;
    if (e.type === "resize-top") {
      totalAngle += 0;
    } else if (e.type === "resize-top-right") {
      totalAngle += 45;
    } else if (e.type === "resize-right") {
      totalAngle += 90;
    } else if (e.type === "resize-bottom-right") {
      totalAngle += 135;
    } else if (e.type === "resize-bottom") {
      totalAngle += 180;
    } else if (e.type === "resize-bottom-left") {
      totalAngle += 225;
    } else if (e.type === "resize-left") {
      totalAngle += 270;
    } else if (e.type === "resize-top-left") {
      totalAngle += 315;
    }
    totalAngle += limitAngle(((_a = e === null || e === void 0 ? void 0 : e.element) === null || _a === void 0 ? void 0 : _a.angle) || 0);
    if (Array.isArray(e.groupQueue) && e.groupQueue.length > 0) {
      e.groupQueue.forEach((group) => {
        totalAngle += limitAngle(group.angle || 0);
      });
    }
    totalAngle = limitAngle(totalAngle);
    const cursorKey = __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_appendRotateResizeImage).call(this, totalAngle);
    __classPrivateFieldGet$1(this, _Cursor_instances, "m", _Cursor_resetCursor).call(this, cursorKey);
  }, _Cursor_appendRotateResizeImage = function _Cursor_appendRotateResizeImage2(angle2) {
    const key2 = `rotate-${angle2}`;
    if (!__classPrivateFieldGet$1(this, _Cursor_cursorImageMap, "f")[key2]) {
      const baseImage = __classPrivateFieldGet$1(this, _Cursor_resizeCursorBaseImage, "f");
      if (baseImage) {
        const canvas = document.createElement("canvas");
        const w2 = baseImage.width;
        const h2 = baseImage.height;
        const center = {
          x: w2 / 2,
          y: h2 / 2
        };
        canvas.width = w2;
        canvas.height = h2;
        const ctx = canvas.getContext("2d");
        const radian = parseAngleToRadian(angle2);
        ctx.translate(center.x, center.y);
        ctx.rotate(radian);
        ctx.translate(-center.x, -center.y);
        ctx.drawImage(baseImage, 0, 0, w2, h2);
        ctx.translate(center.x, center.y);
        ctx.rotate(-radian);
        ctx.translate(-center.x, -center.y);
        const base = canvas.toDataURL("image/png");
        __classPrivateFieldGet$1(this, _Cursor_cursorImageMap, "f")[key2] = base;
      }
    }
    return key2;
  };
  var __rest$1 = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  function getModifyElementRecord(opts) {
    const { modifiedElement, beforeElement } = opts;
    const { uuid } = modifiedElement, restElement = __rest$1(modifiedElement, ["uuid"]);
    const after = toFlattenElement(restElement);
    let before = {};
    Object.keys(after).forEach((key2) => {
      let val = get(beforeElement, key2);
      if (val === void 0 && /(borderRadius|borderWidth)\[[0-9]{1,}\]$/.test(key2)) {
        key2 = key2.replace(/\[[0-9]{1,}\]$/, "");
        val = get(beforeElement, key2);
      }
      before[key2] = val;
    });
    before = toFlattenElement(before);
    const record = {
      type: "modifyElement",
      time: Date.now(),
      content: {
        method: "modifyElement",
        uuid,
        before,
        after
      }
    };
    return record;
  }
  const key$3 = "SELECT";
  const keyActionType = Symbol(`${key$3}_actionType`);
  const keyResizeType = Symbol(`${key$3}_resizeType`);
  const keyAreaStart = Symbol(`${key$3}_areaStart`);
  const keyAreaEnd = Symbol(`${key$3}_areaEnd`);
  const keyHoverElement = Symbol(`${key$3}_hoverElement`);
  const keyHoverElementVertexes = Symbol(`${key$3}_hoverElementVertexes`);
  const keySelectedElementList = Symbol(`${key$3}_selectedElementList`);
  const keySelectedElementListVertexes = Symbol(`${key$3}_selectedElementListVertexes`);
  const keySelectedElementController = Symbol(`${key$3}_selectedElementController`);
  const keySelectedElementPosition = Symbol(`${key$3}_selectedElementPosition`);
  const keyGroupQueue = Symbol(`${key$3}_groupQueue`);
  const keyGroupQueueVertexesList = Symbol(`${key$3}_groupQueueVertexesList`);
  const keyIsMoving = Symbol(`${key$3}_isMoving`);
  const keyEnableSelectInGroup = Symbol(`${key$3}_enableSelectInGroup`);
  const keyEnableSnapToGrid = Symbol(`${key$3}_enableSnapToGrid`);
  const selectWrapperBorderWidth = 2;
  const resizeControllerBorderWidth = 4;
  const areaBorderWidth = 1;
  const controllerSize$1 = 10;
  const rotateControllerSize = 20;
  const rotateControllerPosition = 22;
  const activeColor = "#1973ba";
  const activeAreaColor = "#1976d21c";
  const lockedColor = "#5b5959b5";
  const referenceColor = "#f7276e";
  const defaultStyle$3 = {
    activeColor,
    activeAreaColor,
    lockedColor,
    referenceColor
  };
  function drawVertexes(ctx, vertexes, opts) {
    const { borderColor: borderColor2, borderWidth: borderWidth2, background: background2, lineDash } = opts;
    ctx.setLineDash([]);
    ctx.lineWidth = borderWidth2;
    ctx.strokeStyle = borderColor2;
    ctx.fillStyle = background2;
    ctx.setLineDash(lineDash);
    ctx.beginPath();
    ctx.moveTo(vertexes[0].x, vertexes[0].y);
    ctx.lineTo(vertexes[1].x, vertexes[1].y);
    ctx.lineTo(vertexes[2].x, vertexes[2].y);
    ctx.lineTo(vertexes[3].x, vertexes[3].y);
    ctx.lineTo(vertexes[0].x, vertexes[0].y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill("nonzero");
  }
  function drawLine(ctx, start, end, opts) {
    const { borderColor: borderColor2, borderWidth: borderWidth2, lineDash } = opts;
    ctx.setLineDash([]);
    ctx.lineWidth = borderWidth2;
    ctx.strokeStyle = borderColor2;
    ctx.setLineDash(lineDash);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();
  }
  function drawCircleController(ctx, circleCenter, opts) {
    const { size, borderColor: borderColor2, borderWidth: borderWidth2, background: background2 } = opts;
    const center = circleCenter;
    const r = size / 2;
    const a = r;
    const b = r;
    if (a >= 0 && b >= 0) {
      if (typeof borderWidth2 === "number" && borderWidth2 > 0) {
        const ba = borderWidth2 / 2 + a;
        const bb = borderWidth2 / 2 + b;
        ctx.beginPath();
        ctx.strokeStyle = borderColor2;
        ctx.lineWidth = borderWidth2;
        ctx.circle(center.x, center.y, ba, bb, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.fillStyle = background2;
      ctx.circle(center.x, center.y, a, b, 0, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill("nonzero");
    }
  }
  function drawCrossVertexes(ctx, vertexes, opts) {
    const { borderColor: borderColor2, borderWidth: borderWidth2, lineDash } = opts;
    ctx.setLineDash([]);
    ctx.lineWidth = borderWidth2;
    ctx.strokeStyle = borderColor2;
    ctx.setLineDash(lineDash);
    ctx.beginPath();
    ctx.moveTo(vertexes[0].x, vertexes[0].y);
    ctx.lineTo(vertexes[2].x, vertexes[2].y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(vertexes[1].x, vertexes[1].y);
    ctx.lineTo(vertexes[3].x, vertexes[3].y);
    ctx.closePath();
    ctx.stroke();
  }
  function drawCrossByCenter(ctx, center, opts) {
    const { size, borderColor: borderColor2, borderWidth: borderWidth2, lineDash } = opts;
    const minX = center.x - size / 2;
    const maxX = center.x + size / 2;
    const minY = center.y - size / 2;
    const maxY = center.y + size / 2;
    const vertexes = [
      {
        x: minX,
        y: minY
      },
      {
        x: maxX,
        y: minY
      },
      {
        x: maxX,
        y: maxY
      },
      {
        x: minX,
        y: maxY
      }
    ];
    drawCrossVertexes(ctx, vertexes, {
      borderColor: borderColor2,
      borderWidth: borderWidth2,
      lineDash
    });
  }
  function drawHoverVertexesWrapper(ctx, vertexes, opts) {
    if (!vertexes) {
      return;
    }
    const { style } = opts;
    const { activeColor: activeColor2 } = style;
    const wrapperOpts = { borderColor: activeColor2, borderWidth: 1, background: "transparent", lineDash: [] };
    drawVertexes(ctx, calcViewVertexes(vertexes, opts), wrapperOpts);
  }
  function drawLockedVertexesWrapper(ctx, vertexes, opts) {
    if (!vertexes) {
      return;
    }
    const { style } = opts;
    const { lockedColor: lockedColor2 } = style;
    const wrapperOpts = { borderColor: lockedColor2, borderWidth: 1, background: "transparent", lineDash: [] };
    drawVertexes(ctx, calcViewVertexes(vertexes, opts), wrapperOpts);
    const { controller } = opts;
    if (controller) {
      const { topLeft, topRight, bottomLeft, bottomRight, topMiddle, bottomMiddle, leftMiddle, rightMiddle } = controller;
      const ctrlOpts = Object.assign(Object.assign({}, wrapperOpts), { borderWidth: 1, background: lockedColor2 });
      drawCrossVertexes(ctx, calcViewVertexes(topMiddle.vertexes, opts), ctrlOpts);
      drawCrossVertexes(ctx, calcViewVertexes(bottomMiddle.vertexes, opts), ctrlOpts);
      drawCrossVertexes(ctx, calcViewVertexes(leftMiddle.vertexes, opts), ctrlOpts);
      drawCrossVertexes(ctx, calcViewVertexes(rightMiddle.vertexes, opts), ctrlOpts);
      drawCrossVertexes(ctx, calcViewVertexes(topLeft.vertexes, opts), ctrlOpts);
      drawCrossVertexes(ctx, calcViewVertexes(topRight.vertexes, opts), ctrlOpts);
      drawCrossVertexes(ctx, calcViewVertexes(bottomLeft.vertexes, opts), ctrlOpts);
      drawCrossVertexes(ctx, calcViewVertexes(bottomRight.vertexes, opts), ctrlOpts);
    }
  }
  function drawSelectedElementControllersVertexes(ctx, controller, opts) {
    var _a;
    if (!controller) {
      return;
    }
    const { hideControllers, style, rotateControllerPattern, viewSizeInfo, element } = opts;
    const { devicePixelRatio = 1 } = viewSizeInfo;
    const { activeColor: activeColor2 } = style;
    const { elementWrapper, topLeft, topRight, bottomLeft, bottomRight, rotate } = controller;
    const wrapperOpts = {
      borderColor: activeColor2,
      borderWidth: selectWrapperBorderWidth,
      background: "transparent",
      lineDash: []
    };
    const ctrlOpts = Object.assign(Object.assign({}, wrapperOpts), { borderWidth: resizeControllerBorderWidth, background: "#FFFFFF" });
    drawVertexes(ctx, calcViewVertexes(elementWrapper, opts), wrapperOpts);
    if (!hideControllers) {
      drawVertexes(ctx, calcViewVertexes(topLeft.vertexes, opts), ctrlOpts);
      drawVertexes(ctx, calcViewVertexes(topRight.vertexes, opts), ctrlOpts);
      drawVertexes(ctx, calcViewVertexes(bottomLeft.vertexes, opts), ctrlOpts);
      drawVertexes(ctx, calcViewVertexes(bottomRight.vertexes, opts), ctrlOpts);
      if (((_a = element === null || element === void 0 ? void 0 : element.operations) === null || _a === void 0 ? void 0 : _a.rotatable) !== false) {
        drawCircleController(ctx, calcViewPointSize(rotate.center, opts), Object.assign(Object.assign({}, ctrlOpts), { size: rotate.size, borderWidth: 0 }));
        const rotateCenter = calcViewPointSize(rotate.center, opts);
        ctx.drawImage(rotateControllerPattern.canvas, 0, 0, rotateControllerPattern.canvas.width / devicePixelRatio, rotateControllerPattern.canvas.height / devicePixelRatio, rotateCenter.x - rotate.size / 2, rotateCenter.y - rotate.size / 2, rotate.size, rotate.size);
      }
    }
  }
  function drawArea(ctx, opts) {
    const { start, end, style } = opts;
    const { activeColor: activeColor2, activeAreaColor: activeAreaColor2 } = style;
    ctx.setLineDash([]);
    ctx.lineWidth = areaBorderWidth;
    ctx.strokeStyle = activeColor2;
    ctx.fillStyle = activeAreaColor2;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineTo(start.x, end.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill("nonzero");
  }
  function drawListArea(ctx, opts) {
    const { areaSize, style } = opts;
    const { activeColor: activeColor2, activeAreaColor: activeAreaColor2 } = style;
    const { x: x2, y: y2, w: w2, h: h2 } = areaSize;
    ctx.setLineDash([]);
    ctx.lineWidth = areaBorderWidth;
    ctx.strokeStyle = activeColor2;
    ctx.fillStyle = activeAreaColor2;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + w2, y2);
    ctx.lineTo(x2 + w2, y2 + h2);
    ctx.lineTo(x2, y2 + h2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill("nonzero");
  }
  function drawGroupQueueVertexesWrappers(ctx, vertexesList, opts) {
    const { style } = opts;
    const { activeColor: activeColor2 } = style;
    for (let i = 0; i < vertexesList.length; i++) {
      const vertexes = vertexesList[i];
      const wrapperOpts = {
        borderColor: activeColor2,
        borderWidth: selectWrapperBorderWidth,
        background: "transparent",
        lineDash: [4, 4]
      };
      drawVertexes(ctx, calcViewVertexes(vertexes, opts), wrapperOpts);
    }
  }
  function drawReferenceLines(ctx, opts) {
    const { xLines, yLines, style } = opts;
    const { referenceColor: referenceColor2 } = style;
    const lineOpts = {
      borderColor: referenceColor2,
      borderWidth: 1,
      lineDash: []
    };
    const crossOpts = Object.assign(Object.assign({}, lineOpts), { size: 6 });
    if (xLines) {
      xLines.forEach((line) => {
        line.forEach((p, pIdx) => {
          drawCrossByCenter(ctx, p, crossOpts);
          if (line[pIdx + 1]) {
            drawLine(ctx, line[pIdx], line[pIdx + 1], lineOpts);
          }
        });
      });
    }
    if (yLines) {
      yLines.forEach((line) => {
        line.forEach((p, pIdx) => {
          drawCrossByCenter(ctx, p, crossOpts);
          if (line[pIdx + 1]) {
            drawLine(ctx, line[pIdx], line[pIdx + 1], lineOpts);
          }
        });
      });
    }
  }
  function parseRadian(angle2) {
    return angle2 * Math.PI / 180;
  }
  function calcMoveDist(moveX, moveY) {
    return Math.sqrt(moveX * moveX + moveY * moveY);
  }
  function changeMoveDistDirect(moveDist, moveDirect) {
    return moveDirect > 0 ? Math.abs(moveDist) : 0 - Math.abs(moveDist);
  }
  function isPointInViewActiveVertexes(p, opts) {
    const { ctx, viewScaleInfo, vertexes } = opts;
    const v0 = calcViewPointSize(vertexes[0], { viewScaleInfo });
    const v1 = calcViewPointSize(vertexes[1], { viewScaleInfo });
    const v2 = calcViewPointSize(vertexes[2], { viewScaleInfo });
    const v3 = calcViewPointSize(vertexes[3], { viewScaleInfo });
    ctx.beginPath();
    ctx.moveTo(v0.x, v0.y);
    ctx.lineTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.lineTo(v3.x, v3.y);
    ctx.lineTo(v0.x, v0.y);
    ctx.closePath();
    if (ctx.isPointInPath(p.x, p.y)) {
      return true;
    }
    return false;
  }
  function isPointInViewActiveGroup(p, opts) {
    const { ctx, viewScaleInfo, viewSizeInfo, groupQueue } = opts;
    if (!groupQueue || !((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0)) {
      return false;
    }
    const vesQueue = calcElementQueueVertexesQueueInGroup(groupQueue);
    const vertexes = vesQueue[vesQueue.length - 1];
    if (!vertexes) {
      return false;
    }
    return isPointInViewActiveVertexes(p, { ctx, vertexes, viewScaleInfo });
  }
  function getPointTarget(p, opts) {
    var _a, _b, _c, _d, _e;
    const target = {
      type: null,
      elements: [],
      elementVertexesList: [],
      groupQueue: [],
      groupQueueVertexesList: []
    };
    const { ctx, data, calculator, selectedElements, viewScaleInfo, viewSizeInfo, areaSize, groupQueue, selectedElementController } = opts;
    if (selectedElementController) {
      const { left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight, rotate } = selectedElementController;
      const ctrls = [left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight];
      if ((selectedElements === null || selectedElements === void 0 ? void 0 : selectedElements.length) === 1 && ((_b = (_a = selectedElements === null || selectedElements === void 0 ? void 0 : selectedElements[0]) === null || _a === void 0 ? void 0 : _a.operations) === null || _b === void 0 ? void 0 : _b.rotatable) !== false) {
        ctrls.push(rotate);
      }
      for (let i = 0; i < ctrls.length; i++) {
        const ctrl = ctrls[i];
        if (isPointInViewActiveVertexes(p, { ctx, vertexes: ctrl.vertexes, viewScaleInfo })) {
          target.type = `resize-${ctrl.type}`;
          if (selectedElements && (selectedElements === null || selectedElements === void 0 ? void 0 : selectedElements.length) > 0) {
            target.groupQueue = groupQueue || [];
            target.elements = [selectedElements[0]];
            return target;
          }
          break;
        }
      }
    }
    if (groupQueue && Array.isArray(groupQueue) && groupQueue.length > 0) {
      const lastGroup = groupQueue[groupQueue.length - 1];
      if (((_c = lastGroup === null || lastGroup === void 0 ? void 0 : lastGroup.detail) === null || _c === void 0 ? void 0 : _c.children) && Array.isArray((_d = lastGroup === null || lastGroup === void 0 ? void 0 : lastGroup.detail) === null || _d === void 0 ? void 0 : _d.children)) {
        for (let i = lastGroup.detail.children.length - 1; i >= 0; i--) {
          const child = lastGroup.detail.children[i];
          const vertexes = calcElementVertexesInGroup(child, { groupQueue });
          if (vertexes && isPointInViewActiveVertexes(p, { ctx, vertexes, viewScaleInfo })) {
            if (!target.type) {
              target.type = "over-element";
            }
            target.groupQueue = groupQueue;
            target.elements = [child];
            return target;
          }
        }
      }
      return target;
    }
    if (target.type !== null) {
      return target;
    }
    if (areaSize && Array.isArray(selectedElements) && (selectedElements === null || selectedElements === void 0 ? void 0 : selectedElements.length) > 1) {
      const { x: x2, y: y2, w: w2, h: h2 } = areaSize;
      if (p.x >= x2 && p.x <= x2 + w2 && p.y >= y2 && p.y <= y2 + h2) {
        target.type = "list-area";
        target.elements = selectedElements;
        return target;
      }
    }
    if (data) {
      const { index, element } = calculator.getPointElement(p, { data, viewScaleInfo, viewSizeInfo });
      if (index >= 0 && element && ((_e = element === null || element === void 0 ? void 0 : element.operations) === null || _e === void 0 ? void 0 : _e.invisible) !== true) {
        target.elements = [element];
        target.type = "over-element";
        return target;
      }
    }
    return target;
  }
  function resizeElement(elem, opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = elem;
    const elemCenter = calcElementCenter({ x: x2, y: y2, w: w2, h: h2 });
    angle2 = limitAngle(angle2);
    const radian = parseAngleToRadian(angle2);
    const limitRatio = !!((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.limitRatio);
    const { start, end, resizeType, scale } = opts;
    let start0 = Object.assign({}, start);
    let end0 = Object.assign({}, end);
    let startHorizontal0 = { x: start0.x, y: elemCenter.y };
    let endHorizontal0 = { x: end0.x, y: elemCenter.y };
    let startHorizontal = Object.assign({}, startHorizontal0);
    let endHorizontal = Object.assign({}, endHorizontal0);
    let startVertical0 = { x: elemCenter.x, y: start0.y };
    let endVertical0 = { x: elemCenter.x, y: end0.y };
    let startVertical = Object.assign({}, startVertical0);
    let endVertical = Object.assign({}, endVertical0);
    let moveHorizontalX = (endHorizontal.x - startHorizontal.x) / scale;
    let moveHorizontalY = (endHorizontal.y - startHorizontal.y) / scale;
    let moveHorizontalDist = calcMoveDist(moveHorizontalX, moveHorizontalY);
    let moveVerticalX = (endVertical.x - startVertical.x) / scale;
    let moveVerticalY = (endVertical.y - startVertical.y) / scale;
    let moveVerticalDist = calcMoveDist(moveVerticalX, moveVerticalY);
    if (angle2 > 0 || angle2 < 0) {
      start0 = rotatePoint(elemCenter, start, 0 - radian);
      end0 = rotatePoint(elemCenter, end, 0 - radian);
      startHorizontal0 = { x: start0.x, y: elemCenter.y };
      endHorizontal0 = { x: end0.x, y: elemCenter.y };
      startHorizontal = rotatePoint(elemCenter, startHorizontal0, radian);
      endHorizontal = rotatePoint(elemCenter, endHorizontal0, radian);
      startVertical0 = { x: elemCenter.x, y: start0.y };
      endVertical0 = { x: elemCenter.x, y: end0.y };
      startVertical = rotatePoint(elemCenter, startVertical0, radian);
      endVertical = rotatePoint(elemCenter, endVertical0, radian);
      moveHorizontalX = (endHorizontal.x - startHorizontal.x) / scale;
      moveHorizontalY = (endHorizontal.y - startHorizontal.y) / scale;
      moveHorizontalDist = calcMoveDist(moveHorizontalX, moveHorizontalY);
      moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveHorizontalY);
      moveVerticalX = (endVertical.x - startVertical.x) / scale;
      moveVerticalY = (endVertical.y - startVertical.y) / scale;
      moveVerticalDist = calcMoveDist(moveVerticalX, moveVerticalY);
      moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalY);
    }
    let moveX = (end.x - start.x) / scale;
    let moveY = (end.y - start.y) / scale;
    if (limitRatio === true) {
      if (["resize-top", "resize-bottom", "resize-left", "resize-right"].includes(resizeType)) {
        const maxDist = Math.max(Math.abs(moveX), Math.abs(moveY));
        moveX = (moveX >= 0 ? 1 : -1) * maxDist;
        moveY = (moveY >= 0 ? 1 : -1) * maxDist / elem.w * elem.h;
        const maxVerticalDist = Math.max(Math.abs(moveVerticalX), Math.abs(moveVerticalY));
        moveVerticalX = (moveVerticalX >= 0 ? 1 : -1) * maxVerticalDist;
        moveVerticalY = (moveVerticalY >= 0 ? 1 : -1) * maxVerticalDist / elem.w * elem.h;
        const maxHorizontalDist = Math.max(Math.abs(moveHorizontalX), Math.abs(moveHorizontalY));
        moveHorizontalX = (moveHorizontalX >= 0 ? 1 : -1) * maxHorizontalDist;
        moveHorizontalY = (moveHorizontalY >= 0 ? 1 : -1) * maxHorizontalDist / elem.w * elem.h;
      } else if (["resize-top-left", "resize-top-right", "resize-bottom-left", "resize-bottom-right"].includes(resizeType)) {
        {
          const maxDist = Math.abs(moveX);
          moveX = (moveX >= 0 ? 1 : -1) * maxDist;
          const moveYLeng = maxDist / elem.w * elem.h;
          if (resizeType === "resize-top-left" || resizeType === "resize-bottom-right") {
            moveY = moveX > 0 ? moveYLeng : -moveYLeng;
          } else if (resizeType === "resize-top-right" || resizeType === "resize-bottom-left") {
            moveY = moveX > 0 ? -moveYLeng : moveYLeng;
          }
        }
        {
          moveHorizontalDist = Math.abs(moveHorizontalDist);
          moveVerticalDist = moveHorizontalDist / elem.w * elem.h;
        }
      }
    }
    switch (resizeType) {
      case "resize-top": {
        if (angle2 === 0) {
          if (h2 - moveY > 0) {
            y2 += moveY;
            h2 -= moveY;
            if (((_b = elem.operations) === null || _b === void 0 ? void 0 : _b.limitRatio) === true) {
              x2 += moveY / elem.h * elem.w / 2;
              w2 -= moveY / elem.h * elem.w;
            }
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            const radian2 = parseRadian(angle2);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.cos(radian2);
          } else if (angle2 < 180) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.sin(radian2);
          } else if (angle2 < 270) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            const radian2 = parseRadian(angle2 - 180);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.cos(radian2);
          } else if (angle2 < 360) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.sin(radian2);
          }
          if (h2 + moveVerticalDist > 0) {
            if (((_c = elem.operations) === null || _c === void 0 ? void 0 : _c.limitRatio) === true) {
              w2 = w2 + moveVerticalDist / elem.h * elem.w;
            }
            h2 = h2 + moveVerticalDist;
            x2 = centerX - w2 / 2;
            y2 = centerY - h2 / 2;
          }
        }
        break;
      }
      case "resize-bottom": {
        if (angle2 === 0) {
          if (elem.h + moveY > 0) {
            h2 += moveY;
            if (((_d = elem.operations) === null || _d === void 0 ? void 0 : _d.limitRatio) === true) {
              x2 -= moveY / elem.h * elem.w / 2;
              w2 += moveY / elem.h * elem.w;
            }
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            const radian2 = parseRadian(angle2);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.cos(radian2);
          } else if (angle2 < 180) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.sin(radian2);
          } else if (angle2 < 270) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            const radian2 = parseRadian(angle2 - 180);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.cos(radian2);
          } else if (angle2 < 360) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian2);
            centerY = centerY + centerMoveDist * Math.sin(radian2);
          }
          if (h2 + moveVerticalDist > 0) {
            if (((_e = elem.operations) === null || _e === void 0 ? void 0 : _e.limitRatio) === true) {
              w2 = w2 + moveVerticalDist / elem.h * elem.w;
            }
            h2 = h2 + moveVerticalDist;
            x2 = centerX - w2 / 2;
            y2 = centerY - h2 / 2;
          }
        }
        break;
      }
      case "resize-left": {
        if (angle2 === 0) {
          if (elem.w - moveX > 0) {
            x2 += moveX;
            w2 -= moveX;
            if (((_f = elem.operations) === null || _f === void 0 ? void 0 : _f.limitRatio) === true) {
              h2 -= moveX / elem.w * elem.h;
              y2 += moveX / elem.w * elem.h / 2;
            }
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveHorizontalDist = 0 - changeMoveDistDirect(moveHorizontalDist, moveHorizontalX);
            const radian2 = parseRadian(angle2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY - centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 180) {
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveHorizontalX);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian2);
            centerY = centerY - centerMoveDist * Math.cos(radian2);
          } else if (angle2 < 270) {
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveHorizontalY);
            const radian2 = parseRadian(angle2 - 180);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 360) {
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveHorizontalY);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.cos(radian2);
          }
          if (w2 + moveHorizontalDist > 0) {
            if (((_g = elem.operations) === null || _g === void 0 ? void 0 : _g.limitRatio) === true) {
              h2 = h2 + moveHorizontalDist / elem.w * elem.h;
            }
            w2 = w2 + moveHorizontalDist;
            x2 = centerX - w2 / 2;
            y2 = centerY - h2 / 2;
          }
        }
        break;
      }
      case "resize-right": {
        if (angle2 === 0) {
          if (elem.w + moveX > 0) {
            w2 += moveX;
            if (((_h = elem.operations) === null || _h === void 0 ? void 0 : _h.limitRatio) === true) {
              y2 -= moveX * elem.h / elem.w / 2;
              h2 += moveX * elem.h / elem.w;
            }
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveHorizontalY);
            const radian2 = parseRadian(angle2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 180) {
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveY);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.cos(radian2);
          } else if (angle2 < 270) {
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveY);
            const radian2 = parseRadian(angle2 - 180);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.sin(radian2);
            moveHorizontalDist = 0 - moveHorizontalDist;
          } else if (angle2 < 360) {
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, moveX);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY - centerMoveHorizontalDist * Math.cos(radian2);
          }
          if (w2 + moveHorizontalDist > 0) {
            if (((_j = elem.operations) === null || _j === void 0 ? void 0 : _j.limitRatio) === true) {
              h2 = h2 + moveHorizontalDist / elem.w * elem.h;
            }
            w2 = w2 + moveHorizontalDist;
            x2 = centerX - w2 / 2;
            y2 = centerY - h2 / 2;
          }
        }
        break;
      }
      case "resize-top-left": {
        if (angle2 === 0) {
          if (w2 - moveX > 0) {
            x2 += moveX;
            w2 -= moveX;
          }
          if (h2 - moveY > 0) {
            y2 += moveY;
            h2 -= moveY;
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            moveHorizontalDist = 0 - changeMoveDistDirect(moveHorizontalDist, limitRatio ? 0 - moveVerticalDist : moveHorizontalX);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.sin(radian);
            centerY = centerY - centerMoveVerticalDist * Math.cos(radian);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.cos(radian);
            centerY = centerY - centerMoveHorizontalDist * Math.sin(radian);
          } else if (angle2 < 180) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalX);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.sin(radian2);
            const centerMoveDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian2);
            centerY = centerY - centerMoveDist * Math.cos(radian2);
          } else if (angle2 < 270) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalY);
            const radian2 = parseRadian(angle2 - 180);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.cos(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 360) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalY);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.sin(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.cos(radian2);
          }
          if (h2 + moveVerticalDist > 0) {
            h2 = h2 + moveVerticalDist;
          }
          if (w2 + moveHorizontalDist > 0) {
            w2 = w2 + moveHorizontalDist;
          }
          x2 = centerX - w2 / 2;
          y2 = centerY - h2 / 2;
        }
        break;
      }
      case "resize-top-right": {
        if (angle2 === 0) {
          if (w2 + moveX > 0) {
            w2 += moveX;
          }
          if (h2 - moveY > 0) {
            y2 += moveY;
            h2 -= moveY;
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalY);
            const radian2 = parseRadian(angle2);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.cos(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 180) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalY);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.sin(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.cos(radian2);
          } else if (angle2 < 270) {
            const radian2 = parseRadian(angle2 - 180);
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : 0 - moveHorizontalX);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.cos(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY - centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 360) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalX);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.sin(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY - centerMoveHorizontalDist * Math.cos(radian2);
          }
          if (h2 + moveVerticalDist > 0) {
            h2 = h2 + moveVerticalDist;
          }
          if (w2 + moveHorizontalDist > 0) {
            w2 = w2 + moveHorizontalDist;
          }
          x2 = centerX - w2 / 2;
          y2 = centerY - h2 / 2;
        }
        break;
      }
      case "resize-bottom-left": {
        if (angle2 === 0) {
          if (elem.h + moveY > 0) {
            h2 += moveY;
          }
          if (elem.w - moveX > 0) {
            x2 += moveX;
            w2 -= moveX;
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            moveHorizontalDist = 0 - changeMoveDistDirect(moveHorizontalDist, limitRatio ? 0 - moveVerticalDist : moveHorizontalX);
            const radian2 = parseRadian(angle2);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.cos(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY - centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 180) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalX);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.sin(radian2);
            const centerMoveDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian2);
            centerY = centerY - centerMoveDist * Math.cos(radian2);
          } else if (angle2 < 270) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalY);
            const radian2 = parseRadian(angle2 - 180);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.cos(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 360) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalY);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian2);
            centerY = centerY + centerMoveDist * Math.sin(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.cos(radian2);
          }
          if (h2 + moveVerticalDist > 0) {
            h2 = h2 + moveVerticalDist;
          }
          if (w2 + moveHorizontalDist > 0) {
            w2 = w2 + moveHorizontalDist;
          }
          x2 = centerX - w2 / 2;
          y2 = centerY - h2 / 2;
        }
        break;
      }
      case "resize-bottom-right": {
        if (angle2 === 0) {
          if (elem.h + moveY > 0) {
            h2 += moveY;
          }
          if (elem.w + moveX > 0) {
            w2 += moveX;
          }
        } else if (angle2 > 0 || angle2 < 0) {
          let centerX = elemCenter.x;
          let centerY = elemCenter.y;
          if (angle2 < 90) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalY);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalY);
            const radian2 = parseRadian(angle2);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY + centerMoveVerticalDist * Math.cos(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 180) {
            moveVerticalDist = 0 - changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveY);
            const radian2 = parseRadian(angle2 - 90);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX - centerMoveVerticalDist * Math.cos(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.sin(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY + centerMoveHorizontalDist * Math.cos(radian2);
          } else if (angle2 < 270) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : 0 - moveHorizontalY);
            const radian2 = parseRadian(angle2 - 180);
            const centerMoveVerticalDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveVerticalDist * Math.sin(radian2);
            centerY = centerY - centerMoveVerticalDist * Math.cos(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX - centerMoveHorizontalDist * Math.cos(radian2);
            centerY = centerY - centerMoveHorizontalDist * Math.sin(radian2);
          } else if (angle2 < 360) {
            moveVerticalDist = changeMoveDistDirect(moveVerticalDist, moveVerticalX);
            moveHorizontalDist = changeMoveDistDirect(moveHorizontalDist, limitRatio ? moveVerticalDist : moveHorizontalX);
            const radian2 = parseRadian(angle2 - 270);
            const centerMoveDist = moveVerticalDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian2);
            centerY = centerY + centerMoveDist * Math.sin(radian2);
            const centerMoveHorizontalDist = moveHorizontalDist / 2;
            centerX = centerX + centerMoveHorizontalDist * Math.sin(radian2);
            centerY = centerY - centerMoveHorizontalDist * Math.cos(radian2);
          }
          if (h2 + moveVerticalDist > 0) {
            h2 = h2 + moveVerticalDist;
          }
          if (w2 + moveHorizontalDist > 0) {
            w2 = w2 + moveHorizontalDist;
          }
          x2 = centerX - w2 / 2;
          y2 = centerY - h2 / 2;
        }
        break;
      }
    }
    return { x: x2, y: y2, w: w2, h: h2, angle: elem.angle };
  }
  function rotateElement(elem, opts) {
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = elem;
    const { center, start, end, viewScaleInfo } = opts;
    const elemCenter = calcViewPointSize(center, {
      viewScaleInfo
    });
    const startAngle = limitAngle(angle2);
    const changedRadian = calcRadian(elemCenter, start, end);
    const endAngle = limitAngle(startAngle + parseRadianToAngle(changedRadian));
    return {
      x: x2,
      y: y2,
      w: w2,
      h: h2,
      angle: endAngle
    };
  }
  function getSelectedListArea(data, opts) {
    var _a;
    const indexes = [];
    const uuids = [];
    const elements = [];
    const { viewScaleInfo, start, end } = opts;
    if (!(Array.isArray(data.elements) && start && end)) {
      return { indexes, uuids, elements };
    }
    const startX = Math.min(start.x, end.x);
    const endX = Math.max(start.x, end.x);
    const startY = Math.min(start.y, end.y);
    const endY = Math.max(start.y, end.y);
    for (let idx = 0; idx < data.elements.length; idx++) {
      const elem = data.elements[idx];
      if (((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.locked) === true) {
        continue;
      }
      const elemSize = calcViewElementSize(elem, { viewScaleInfo });
      const center = calcElementCenter(elemSize);
      if (center.x >= startX && center.x <= endX && center.y >= startY && center.y <= endY) {
        indexes.push(idx);
        uuids.push(elem.uuid);
        elements.push(elem);
        if (elemSize.angle && (elemSize.angle > 0 || elemSize.angle < 0)) {
          const ves = rotateElementVertexes(elemSize);
          if (ves.length === 4) {
            const xList = [ves[0].x, ves[1].x, ves[2].x, ves[3].x];
            const yList = [ves[0].y, ves[1].y, ves[2].y, ves[3].y];
            elemSize.x = Math.min(...xList);
            elemSize.y = Math.min(...yList);
            elemSize.w = Math.abs(Math.max(...xList) - Math.min(...xList));
            elemSize.h = Math.abs(Math.max(...yList) - Math.min(...yList));
          }
        }
      }
    }
    return { indexes, uuids, elements };
  }
  function calcSelectedElementsArea(elements, opts) {
    var _a;
    if (!Array.isArray(elements)) {
      return null;
    }
    const area = { x: 0, y: 0, w: 0, h: 0 };
    const { viewScaleInfo } = opts;
    let prevElemSize = null;
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      if ((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.invisible) {
        continue;
      }
      const elemSize = calcViewElementSize(elem, { viewScaleInfo });
      if (elemSize.angle && (elemSize.angle > 0 || elemSize.angle < 0)) {
        const ves = rotateElementVertexes(elemSize);
        if (ves.length === 4) {
          const xList = [ves[0].x, ves[1].x, ves[2].x, ves[3].x];
          const yList = [ves[0].y, ves[1].y, ves[2].y, ves[3].y];
          elemSize.x = Math.min(...xList);
          elemSize.y = Math.min(...yList);
          elemSize.w = Math.abs(Math.max(...xList) - Math.min(...xList));
          elemSize.h = Math.abs(Math.max(...yList) - Math.min(...yList));
        }
      }
      if (prevElemSize) {
        const areaStartX = Math.min(elemSize.x, area.x);
        const areaStartY = Math.min(elemSize.y, area.y);
        const areaEndX = Math.max(elemSize.x + elemSize.w, area.x + area.w);
        const areaEndY = Math.max(elemSize.y + elemSize.h, area.y + area.h);
        area.x = areaStartX;
        area.y = areaStartY;
        area.w = Math.abs(areaEndX - areaStartX);
        area.h = Math.abs(areaEndY - areaStartY);
      } else {
        area.x = elemSize.x;
        area.y = elemSize.y;
        area.w = elemSize.w;
        area.h = elemSize.h;
      }
      prevElemSize = elemSize;
    }
    return area;
  }
  function isElementInGroup(elem, group) {
    var _a;
    if ((group === null || group === void 0 ? void 0 : group.type) === "group" && Array.isArray((_a = group === null || group === void 0 ? void 0 : group.detail) === null || _a === void 0 ? void 0 : _a.children)) {
      for (let i = 0; i < group.detail.children.length; i++) {
        const child = group.detail.children[i];
        if (elem.uuid === child.uuid) {
          return true;
        }
      }
    }
    return false;
  }
  const unitSize = 2;
  function getViewBoxInfo(rectInfo) {
    const boxInfo = {
      minX: rectInfo.topLeft.x,
      minY: rectInfo.topLeft.y,
      maxX: rectInfo.bottomRight.x,
      maxY: rectInfo.bottomRight.y,
      midX: rectInfo.center.x,
      midY: rectInfo.center.y
    };
    return boxInfo;
  }
  const getClosestNumInSortedKeys = (sortedKeys, target) => {
    if (sortedKeys.length === 0) {
      throw null;
    }
    if (sortedKeys.length === 1) {
      return sortedKeys[0];
    }
    let left = 0;
    let right = sortedKeys.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedKeys[mid] === target) {
        return sortedKeys[mid];
      } else if (sortedKeys[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (left >= sortedKeys.length) {
      return sortedKeys[right];
    }
    if (right < 0) {
      return sortedKeys[left];
    }
    return Math.abs(sortedKeys[right] - target) <= Math.abs(sortedKeys[left] - target) ? sortedKeys[right] : sortedKeys[left];
  };
  const isEqualNum = (a, b) => Math.abs(a - b) < 1e-5;
  function calcReferenceInfo(uuid, opts) {
    var _a, _b;
    const { data, groupQueue, calculator, viewScaleInfo, viewSizeInfo } = opts;
    let targetElements = data.elements || [];
    if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
      targetElements = ((_b = (_a = groupQueue[groupQueue.length - 1]) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.children) || [];
    }
    const siblingViewRectInfoList = [];
    targetElements.forEach((elem) => {
      if (elem.uuid !== uuid) {
        const info = calculator.calcViewRectInfoFromRange(elem.uuid, { checkVisible: true, viewScaleInfo, viewSizeInfo });
        if (info) {
          siblingViewRectInfoList.push(info);
        }
      }
    });
    const targetRectInfo = calculator.calcViewRectInfoFromRange(uuid, { viewScaleInfo, viewSizeInfo });
    if (!targetRectInfo) {
      return null;
    }
    const vTargetLineDotMap = {};
    const hTargetLineDotMap = {};
    const vRefLineDotMap = {};
    const hRefLineDotMap = {};
    const vHelperLineDotMapList = [];
    const hHelperLineDotMapList = [];
    let sortedRefXKeys = [];
    let sortedRefYKeys = [];
    const targetBox = getViewBoxInfo(targetRectInfo);
    vTargetLineDotMap[targetBox.minX] = [targetBox.minY, targetBox.midY, targetBox.maxY];
    vTargetLineDotMap[targetBox.midX] = [targetBox.minY, targetBox.midY, targetBox.maxY];
    vTargetLineDotMap[targetBox.maxX] = [targetBox.minY, targetBox.midY, targetBox.maxY];
    hTargetLineDotMap[targetBox.minY] = [targetBox.minX, targetBox.midX, targetBox.maxX];
    hTargetLineDotMap[targetBox.midY] = [targetBox.minX, targetBox.midX, targetBox.maxX];
    hTargetLineDotMap[targetBox.maxY] = [targetBox.minX, targetBox.midX, targetBox.maxX];
    siblingViewRectInfoList.forEach((info) => {
      const box2 = getViewBoxInfo(info);
      if (!vRefLineDotMap[box2.minX]) {
        vRefLineDotMap[box2.minX] = [];
      }
      if (!vRefLineDotMap[box2.midX]) {
        vRefLineDotMap[box2.midX] = [];
      }
      if (!vRefLineDotMap[box2.maxX]) {
        vRefLineDotMap[box2.maxX] = [];
      }
      if (!hRefLineDotMap[box2.minY]) {
        hRefLineDotMap[box2.minY] = [];
      }
      if (!hRefLineDotMap[box2.midY]) {
        hRefLineDotMap[box2.midY] = [];
      }
      if (!hRefLineDotMap[box2.maxY]) {
        hRefLineDotMap[box2.maxY] = [];
      }
      vRefLineDotMap[box2.minX] = [box2.minY, box2.midY, box2.maxY];
      vRefLineDotMap[box2.midX] = [box2.minY, box2.midY, box2.maxY];
      vRefLineDotMap[box2.maxX] = [box2.minY, box2.midY, box2.maxY];
      sortedRefXKeys.push(box2.minX);
      sortedRefXKeys.push(box2.midX);
      sortedRefXKeys.push(box2.maxX);
      hRefLineDotMap[box2.minY] = [box2.minX, box2.midX, box2.maxX];
      hRefLineDotMap[box2.midY] = [box2.minX, box2.midX, box2.maxX];
      hRefLineDotMap[box2.maxY] = [box2.minX, box2.midX, box2.maxX];
      sortedRefYKeys.push(box2.minY);
      sortedRefYKeys.push(box2.midY);
      sortedRefYKeys.push(box2.maxY);
    });
    sortedRefXKeys = sortedRefXKeys.sort((a, b) => a - b);
    sortedRefYKeys = sortedRefYKeys.sort((a, b) => a - b);
    let offsetX = null;
    let offsetY = null;
    let closestMinX = null;
    let closestMidX = null;
    let closestMaxX = null;
    let closestMinY = null;
    let closestMidY = null;
    let closestMaxY = null;
    if (sortedRefXKeys.length > 0) {
      closestMinX = getClosestNumInSortedKeys(sortedRefXKeys, targetBox.minX);
      closestMidX = getClosestNumInSortedKeys(sortedRefXKeys, targetBox.midX);
      closestMaxX = getClosestNumInSortedKeys(sortedRefXKeys, targetBox.maxX);
      const distMinX = Math.abs(closestMinX - targetBox.minX);
      const distMidX = Math.abs(closestMidX - targetBox.midX);
      const distMaxX = Math.abs(closestMaxX - targetBox.maxX);
      const closestXDist = Math.min(distMinX, distMidX, distMaxX);
      if (closestXDist <= unitSize / viewScaleInfo.scale) {
        if (isEqualNum(closestXDist, distMinX)) {
          offsetX = closestMinX - targetBox.minX;
        } else if (isEqualNum(closestXDist, distMidX)) {
          offsetX = closestMidX - targetBox.midX;
        } else if (isEqualNum(closestXDist, distMaxX)) {
          offsetX = closestMaxX - targetBox.maxX;
        }
      }
    }
    if (sortedRefYKeys.length > 0) {
      closestMinY = getClosestNumInSortedKeys(sortedRefYKeys, targetBox.minY);
      closestMidY = getClosestNumInSortedKeys(sortedRefYKeys, targetBox.midY);
      closestMaxY = getClosestNumInSortedKeys(sortedRefYKeys, targetBox.maxY);
      const distMinY = Math.abs(closestMinY - targetBox.minY);
      const distMidY = Math.abs(closestMidY - targetBox.midY);
      const distMaxY = Math.abs(closestMaxY - targetBox.maxY);
      const closestYDist = Math.min(distMinY, distMidY, distMaxY);
      if (closestYDist <= unitSize / viewScaleInfo.scale) {
        if (isEqualNum(closestYDist, distMinY)) {
          offsetY = closestMinY - targetBox.minY;
        } else if (isEqualNum(closestYDist, distMidY)) {
          offsetY = closestMidY - targetBox.midY;
        } else if (isEqualNum(closestYDist, distMaxY)) {
          offsetY = closestMaxY - targetBox.maxY;
        }
      }
    }
    const newTargetBox = Object.assign({}, targetBox);
    if (offsetX !== null) {
      newTargetBox.minX += offsetX;
      newTargetBox.midX += offsetX;
      newTargetBox.maxX += offsetX;
    }
    if (offsetY !== null) {
      newTargetBox.minY += offsetY;
      newTargetBox.midY += offsetY;
      newTargetBox.maxY += offsetY;
    }
    if (is.x(offsetX) && offsetX !== null && closestMinX !== null && closestMidX !== null && closestMaxX !== null) {
      if (isEqualNum(offsetX, closestMinX - targetBox.minX)) {
        const vLine = {
          x: closestMinX,
          yList: []
        };
        vLine.yList.push(newTargetBox.minY);
        vLine.yList.push(newTargetBox.maxY);
        vLine.yList.push(...(hRefLineDotMap === null || hRefLineDotMap === void 0 ? void 0 : hRefLineDotMap[closestMinX]) || []);
        vHelperLineDotMapList.push(vLine);
      }
      if (isEqualNum(offsetX, closestMidX - targetBox.minX)) {
        const vLine = {
          x: closestMidX,
          yList: []
        };
        vLine.yList.push(newTargetBox.minY);
        vLine.yList.push(newTargetBox.maxY);
        vLine.yList.push(...(hRefLineDotMap === null || hRefLineDotMap === void 0 ? void 0 : hRefLineDotMap[closestMidX]) || []);
        vHelperLineDotMapList.push(vLine);
      }
      if (isEqualNum(offsetX, closestMaxX - targetBox.minX)) {
        const vLine = {
          x: closestMaxX,
          yList: []
        };
        vLine.yList.push(newTargetBox.minY);
        vLine.yList.push(newTargetBox.maxY);
        vLine.yList.push(...(hRefLineDotMap === null || hRefLineDotMap === void 0 ? void 0 : hRefLineDotMap[closestMaxX]) || []);
        vHelperLineDotMapList.push(vLine);
      }
    }
    if (is.y(offsetY) && offsetY !== null && closestMinY !== null && closestMidY !== null && closestMaxY !== null) {
      if (isEqualNum(offsetY, closestMinY - targetBox.minY)) {
        const hLine = {
          y: closestMinY,
          xList: []
        };
        hLine.xList.push(newTargetBox.minX);
        hLine.xList.push(newTargetBox.maxX);
        hLine.xList.push(...(vRefLineDotMap === null || vRefLineDotMap === void 0 ? void 0 : vRefLineDotMap[closestMinY]) || []);
        hHelperLineDotMapList.push(hLine);
      }
      if (isEqualNum(offsetY, closestMidY - targetBox.midY)) {
        const hLine = {
          y: closestMidY,
          xList: []
        };
        hLine.xList.push(newTargetBox.minX);
        hLine.xList.push(newTargetBox.maxX);
        hLine.xList.push(...(vRefLineDotMap === null || vRefLineDotMap === void 0 ? void 0 : vRefLineDotMap[closestMinY]) || []);
        hHelperLineDotMapList.push(hLine);
      }
      if (isEqualNum(offsetY, closestMaxY - targetBox.maxY)) {
        const hLine = {
          y: closestMaxY,
          xList: []
        };
        hLine.xList.push(newTargetBox.minX);
        hLine.xList.push(newTargetBox.maxX);
        hLine.xList.push(...(vRefLineDotMap === null || vRefLineDotMap === void 0 ? void 0 : vRefLineDotMap[closestMaxY]) || []);
        hHelperLineDotMapList.push(hLine);
      }
    }
    const yLines = [];
    if ((vHelperLineDotMapList === null || vHelperLineDotMapList === void 0 ? void 0 : vHelperLineDotMapList.length) > 0) {
      vHelperLineDotMapList.forEach((item, i) => {
        yLines.push([]);
        item.yList.forEach((y2) => {
          yLines[i].push({
            x: item.x,
            y: y2
          });
        });
      });
    }
    const xLines = [];
    if ((hHelperLineDotMapList === null || hHelperLineDotMapList === void 0 ? void 0 : hHelperLineDotMapList.length) > 0) {
      hHelperLineDotMapList.forEach((item, i) => {
        xLines.push([]);
        item.xList.forEach((x2) => {
          xLines[i].push({
            x: x2,
            y: item.y
          });
        });
      });
    }
    return {
      offsetX,
      offsetY,
      yLines,
      xLines
    };
  }
  const key$2 = "LAYOUT_SELECT";
  const keyLayoutActionType = Symbol(`${key$2}_layoutActionType`);
  const keyLayoutControlType = Symbol(`${key$2}_layoutControlType`);
  const keyLayoutController = Symbol(`${key$2}_layoutController`);
  const keyLayoutIsHoverContent = Symbol(`${key$2}_layoutIsHoverContent`);
  const keyLayoutIsHoverController = Symbol(`${key$2}_layoutIsHoverController`);
  const keyLayoutIsSelected = Symbol(`${key$2}_layoutIsSelected`);
  const keyLayoutIsBusyMoving = Symbol(`${key$2}_layoutIsSelected`);
  const controllerSize = 10;
  const defaultStyle$2 = {
    activeColor: "#b331c9"
  };
  function drawControllerBox(ctx, boxVertexes, style) {
    const { activeColor: activeColor2 } = style;
    ctx.setLineDash([]);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(boxVertexes[0].x, boxVertexes[0].y);
    ctx.lineTo(boxVertexes[1].x, boxVertexes[1].y);
    ctx.lineTo(boxVertexes[2].x, boxVertexes[2].y);
    ctx.lineTo(boxVertexes[3].x, boxVertexes[3].y);
    ctx.closePath();
    ctx.fill("nonzero");
    ctx.strokeStyle = activeColor2;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(boxVertexes[0].x, boxVertexes[0].y);
    ctx.lineTo(boxVertexes[1].x, boxVertexes[1].y);
    ctx.lineTo(boxVertexes[2].x, boxVertexes[2].y);
    ctx.lineTo(boxVertexes[3].x, boxVertexes[3].y);
    ctx.closePath();
    ctx.stroke();
  }
  function drawControllerLine(ctx, opts) {
    const { start, end, style } = opts;
    const { activeColor: activeColor2 } = style;
    const lineWidth = 2;
    const strokeStyle = activeColor2;
    ctx.setLineDash([]);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();
  }
  function drawLayoutController(ctx, opts) {
    const { controller, style } = opts;
    const { topLeft, topRight, bottomLeft, bottomRight, topMiddle, rightMiddle, bottomMiddle, leftMiddle } = controller;
    drawControllerLine(ctx, { start: topLeft.center, end: topRight.center, centerVertexes: topMiddle.vertexes, style });
    drawControllerLine(ctx, {
      start: topRight.center,
      end: bottomRight.center,
      centerVertexes: rightMiddle.vertexes,
      style
    });
    drawControllerLine(ctx, {
      start: bottomRight.center,
      end: bottomLeft.center,
      centerVertexes: bottomMiddle.vertexes,
      style
    });
    drawControllerLine(ctx, {
      start: bottomLeft.center,
      end: topLeft.center,
      centerVertexes: leftMiddle.vertexes,
      style
    });
    drawControllerBox(ctx, topLeft.vertexes, style);
    drawControllerBox(ctx, topRight.vertexes, style);
    drawControllerBox(ctx, bottomRight.vertexes, style);
    drawControllerBox(ctx, bottomLeft.vertexes, style);
  }
  function drawLayoutHover(ctx, opts) {
    const { layoutSize, style } = opts;
    const { activeColor: activeColor2 } = style;
    const { x: x2, y: y2, w: w2, h: h2 } = layoutSize;
    ctx.setLineDash([]);
    ctx.strokeStyle = activeColor2;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + w2, y2);
    ctx.lineTo(x2 + w2, y2 + h2);
    ctx.lineTo(x2, y2 + h2);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
  }
  const MiddlewareLayoutSelector = (opts, config) => {
    const { sharer, boardContent, calculator, viewer, eventHub } = opts;
    const { overlayContext } = boardContent;
    let innerConfig = Object.assign(Object.assign({}, defaultStyle$2), config);
    let prevPoint = null;
    let prevIsHoverContent = null;
    let prevIsSelected = null;
    let pointStartLayoutSize = null;
    const clear = () => {
      prevPoint = null;
      sharer.setSharedStorage(keyLayoutActionType, null);
      sharer.setSharedStorage(keyLayoutControlType, null);
      sharer.setSharedStorage(keyLayoutController, null);
      sharer.setSharedStorage(keyLayoutIsHoverContent, null);
      sharer.setSharedStorage(keyLayoutIsHoverController, null);
      sharer.setSharedStorage(keyLayoutIsSelected, null);
      sharer.setSharedStorage(keyLayoutIsBusyMoving, null);
      prevIsHoverContent = null;
      prevIsSelected = null;
    };
    const isInElementAction = () => {
      const elementActionType = sharer.getSharedStorage(keyActionType);
      if (elementActionType && elementActionType !== "area") {
        clear();
        return true;
      }
      return false;
    };
    const getLayoutSize = () => {
      const data = sharer.getActiveStorage("data");
      if (data === null || data === void 0 ? void 0 : data.layout) {
        const { x: x2, y: y2, w: w2, h: h2 } = data.layout;
        return { x: x2, y: y2, w: w2, h: h2 };
      }
      return null;
    };
    const isInLayout = (p) => {
      const size = getLayoutSize();
      if (size) {
        const { x: x2, y: y2, w: w2, h: h2 } = size;
        const viewScaleInfo = sharer.getActiveViewScaleInfo();
        const viewSize = calcViewElementSize({
          x: x2 - controllerSize / 2,
          y: y2 - controllerSize / 2,
          w: w2 + controllerSize,
          h: h2 + controllerSize
        }, { viewScaleInfo });
        return isViewPointInElementSize(p, viewSize);
      }
      return false;
    };
    const resetController = () => {
      const viewScaleInfo = sharer.getActiveViewScaleInfo();
      const size = getLayoutSize();
      if (size) {
        const controller = calcLayoutSizeController(size, { viewScaleInfo, controllerSize: 10 });
        sharer.setSharedStorage(keyLayoutController, controller);
      } else {
        sharer.setSharedStorage(keyLayoutController, null);
      }
    };
    const resetControlType = (e) => {
      const data = sharer.getActiveStorage("data");
      const controller = sharer.getSharedStorage(keyLayoutController);
      let controllerType = null;
      if (controller && (data === null || data === void 0 ? void 0 : data.layout) && (e === null || e === void 0 ? void 0 : e.point)) {
        let layoutControlType = null;
        if (controller) {
          const { topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left } = controller;
          const list = [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (isViewPointInVertexes(e.point, item.vertexes)) {
              layoutControlType = `${item.type}`;
              break;
            }
          }
          if (layoutControlType) {
            sharer.setSharedStorage(keyLayoutControlType, layoutControlType);
            eventHub.trigger(coreEventKeys.CLEAR_SELECT);
            controllerType = layoutControlType;
          }
        }
      }
      if (controllerType) {
        sharer.setSharedStorage(keyLayoutIsHoverController, true);
      } else {
        sharer.setSharedStorage(keyLayoutIsHoverController, false);
      }
      return controllerType;
    };
    const updateCursor = (controlType) => {
      if (sharer.getSharedStorage(keyLayoutIsBusyMoving) === true) {
        return;
      }
      eventHub.trigger(coreEventKeys.CURSOR, {
        type: controlType ? `resize-${controlType}` : controlType,
        groupQueue: [],
        element: getLayoutSize()
      });
    };
    return {
      name: "@middleware/layout-selector",
      use: () => {
        clear();
        resetController();
      },
      resetConfig(config2) {
        innerConfig = Object.assign(Object.assign({}, innerConfig), config2);
      },
      hover: (e) => {
        if (sharer.getSharedStorage(keyLayoutIsBusyMoving) === true) {
          return;
        }
        if (isInElementAction()) {
          return;
        }
        if (isInLayout(e.point)) {
          sharer.setSharedStorage(keyLayoutIsHoverContent, true);
        } else {
          sharer.setSharedStorage(keyLayoutIsHoverContent, false);
          if (prevIsHoverContent === true) {
            viewer.drawFrame();
            prevIsHoverContent = false;
          }
        }
        if (sharer.getSharedStorage(keyLayoutIsSelected) === true) {
          const prevLayoutActionType = sharer.getSharedStorage(keyLayoutActionType);
          const data = sharer.getActiveStorage("data");
          if (data === null || data === void 0 ? void 0 : data.layout) {
            if (prevLayoutActionType !== "resize") {
              resetController();
              const layoutControlType = resetControlType(e);
              if (layoutControlType) {
                updateCursor(layoutControlType);
              } else {
                updateCursor();
                sharer.setSharedStorage(keyLayoutActionType, null);
              }
            } else {
              const layoutControlType = resetControlType(e);
              updateCursor(layoutControlType);
            }
          }
          if (sharer.getSharedStorage(keyLayoutIsHoverController) === true) {
            return false;
          }
          return;
        }
        if (sharer.getSharedStorage(keyLayoutIsHoverContent) && !prevIsHoverContent) {
          viewer.drawFrame();
        }
        prevIsHoverContent = sharer.getSharedStorage(keyLayoutIsHoverContent);
        if (sharer.getSharedStorage(keyLayoutIsHoverController) === true) {
          return false;
        }
      },
      pointStart: (e) => {
        if (isInElementAction()) {
          return;
        }
        if (isInLayout(e.point)) {
          sharer.setSharedStorage(keyLayoutIsSelected, true);
        } else {
          if (prevIsSelected === true) {
            clear();
            viewer.drawFrame();
          }
          sharer.setSharedStorage(keyLayoutIsSelected, false);
        }
        const data = sharer.getActiveStorage("data");
        if (data === null || data === void 0 ? void 0 : data.layout) {
          pointStartLayoutSize = getElementSize(data.layout);
        } else {
          pointStartLayoutSize = null;
        }
        resetController();
        const layoutControlType = resetControlType(e);
        prevPoint = e.point;
        if (layoutControlType) {
          sharer.setSharedStorage(keyLayoutActionType, "resize");
        }
        if (sharer.getSharedStorage(keyLayoutIsSelected) === true && !prevIsSelected) {
          viewer.drawFrame();
          eventHub.trigger(coreEventKeys.SELECT_LAYOUT);
        }
        prevIsSelected = sharer.getSharedStorage(keyLayoutIsSelected);
        if (sharer.getSharedStorage(keyLayoutIsHoverController) === true) {
          return false;
        }
      },
      pointMove: (e) => {
        if (!sharer.getSharedStorage(keyLayoutIsSelected)) {
          if (isInElementAction()) {
            return;
          }
        }
        const layoutActionType = sharer.getSharedStorage(keyLayoutActionType);
        const layoutControlType = sharer.getSharedStorage(keyLayoutControlType);
        const data = sharer.getActiveStorage("data");
        if (layoutActionType === "resize" && layoutControlType && (data === null || data === void 0 ? void 0 : data.layout)) {
          if (prevPoint) {
            sharer.setSharedStorage(keyLayoutIsBusyMoving, true);
            const scale = sharer.getActiveStorage("scale");
            const viewMoveX = e.point.x - prevPoint.x;
            const viewMoveY = e.point.y - prevPoint.y;
            const moveX = viewMoveX / scale;
            const moveY = viewMoveY / scale;
            const { x: x2, y: y2, w: w2, h: h2, operations = {} } = data.layout;
            const { position = "absolute" } = operations;
            if (layoutControlType === "top") {
              if (position === "relative") {
                data.layout.h = calculator.toGridNum(h2 - moveY);
                viewer.scroll({ moveY: viewMoveY });
              } else {
                data.layout.y = calculator.toGridNum(y2 + moveY);
                data.layout.h = calculator.toGridNum(h2 - moveY);
              }
            } else if (layoutControlType === "right") {
              data.layout.w = calculator.toGridNum(w2 + moveX);
            } else if (layoutControlType === "bottom") {
              data.layout.h = calculator.toGridNum(h2 + moveY);
            } else if (layoutControlType === "left") {
              if (position === "relative") {
                data.layout.w = calculator.toGridNum(w2 - moveX);
                viewer.scroll({ moveX: viewMoveX });
              } else {
                data.layout.x = calculator.toGridNum(x2 + moveX);
                data.layout.w = calculator.toGridNum(w2 - moveX);
              }
            } else if (layoutControlType === "top-left") {
              if (position === "relative") {
                data.layout.w = calculator.toGridNum(w2 - moveX);
                data.layout.h = calculator.toGridNum(h2 - moveY);
                viewer.scroll({ moveX: viewMoveX, moveY: viewMoveY });
              } else {
                data.layout.x = calculator.toGridNum(x2 + moveX);
                data.layout.y = calculator.toGridNum(y2 + moveY);
                data.layout.w = calculator.toGridNum(w2 - moveX);
                data.layout.h = calculator.toGridNum(h2 - moveY);
              }
            } else if (layoutControlType === "top-right") {
              if (position === "relative") {
                viewer.scroll({
                  moveY: viewMoveY
                });
                data.layout.w = calculator.toGridNum(w2 + moveX);
                data.layout.h = calculator.toGridNum(h2 - moveY);
              } else {
                data.layout.y = calculator.toGridNum(y2 + moveY);
                data.layout.w = calculator.toGridNum(w2 + moveX);
                data.layout.h = calculator.toGridNum(h2 - moveY);
              }
            } else if (layoutControlType === "bottom-right") {
              data.layout.w = calculator.toGridNum(w2 + moveX);
              data.layout.h = calculator.toGridNum(h2 + moveY);
            } else if (layoutControlType === "bottom-left") {
              if (position === "relative") {
                viewer.scroll({
                  moveX: viewMoveX
                });
                data.layout.w = calculator.toGridNum(w2 - moveX);
                data.layout.h = calculator.toGridNum(h2 + moveY);
              } else {
                data.layout.x = calculator.toGridNum(x2 + moveX);
                data.layout.w = calculator.toGridNum(w2 - moveX);
                data.layout.h = calculator.toGridNum(h2 + moveY);
              }
            }
          }
          prevPoint = e.point;
          resetController();
          viewer.drawFrame();
          return false;
        }
        if (["resize"].includes(layoutActionType)) {
          return false;
        }
      },
      pointEnd: () => {
        sharer.setSharedStorage(keyLayoutIsBusyMoving, false);
        const layoutActionType = sharer.getSharedStorage(keyLayoutActionType);
        const layoutControlType = sharer.getSharedStorage(keyLayoutControlType);
        const data = sharer.getActiveStorage("data");
        if (data && layoutActionType === "resize" && layoutControlType) {
          let modifyRecord = void 0;
          if (pointStartLayoutSize) {
            modifyRecord = {
              type: "modifyLayout",
              time: Date.now(),
              content: {
                method: "modifyLayout",
                before: toFlattenLayout(pointStartLayoutSize),
                after: toFlattenLayout(getElementSize(data.layout))
              }
            };
          }
          eventHub.trigger(coreEventKeys.CHANGE, {
            type: "dragLayout",
            data,
            modifyRecord
          });
        }
        pointStartLayoutSize = null;
        sharer.setSharedStorage(keyLayoutActionType, null);
        sharer.setSharedStorage(keyLayoutControlType, null);
        if (sharer.getSharedStorage(keyLayoutIsHoverController) === true) {
          return false;
        }
      },
      beforeDrawFrame: ({ snapshot }) => {
        var _a;
        if (isInElementAction()) {
          return;
        }
        const { activeColor: activeColor2 } = innerConfig;
        const style = { activeColor: activeColor2 };
        const { sharedStore, activeStore } = snapshot;
        const layoutActionType = sharedStore[keyLayoutActionType];
        const layoutIsHover = sharedStore[keyLayoutIsHoverContent];
        const layoutIsSelected = sharedStore[keyLayoutIsSelected];
        if ((_a = activeStore.data) === null || _a === void 0 ? void 0 : _a.layout) {
          const { x: x2, y: y2, w: w2, h: h2 } = activeStore.data.layout;
          const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
          const size = { x: x2, y: y2, w: w2, h: h2 };
          const controller = calcLayoutSizeController(size, { viewScaleInfo, controllerSize });
          if (layoutIsHover === true) {
            const viewSize = calcViewElementSize(size, { viewScaleInfo });
            drawLayoutHover(overlayContext, { layoutSize: viewSize, style });
          }
          if (layoutActionType && ["resize"].includes(layoutActionType) || layoutIsSelected === true) {
            drawLayoutController(overlayContext, { controller, style });
          }
        }
      },
      scrollX: () => {
        clear();
      },
      scrollY: () => {
        clear();
      },
      wheelScale: () => {
        clear();
      }
    };
  };
  const createIconRotate = (opts) => {
    const iconRotate = {
      uuid: createUUID(),
      type: "path",
      x: 0,
      y: 0,
      w: 200,
      h: 200,
      detail: Object.assign({ commands: [
        {
          type: "M",
          params: [512, 0]
        },
        {
          type: "c",
          params: [282.8, 0, 512, 229.2, 512, 512]
        },
        {
          type: "s",
          params: [-229.2, 512, -512, 512]
        },
        {
          type: "S",
          params: [0, 794.8, 0, 512, 229.2, 0, 512, 0]
        },
        {
          type: "z",
          params: []
        },
        {
          type: "m",
          params: [309.8, 253.8]
        },
        {
          type: "c",
          params: [0, -10.5, -6.5, -19.8, -15.7, -23.8, -9.7, -4, -21, -2, -28.2, 5.6]
        },
        {
          type: "l",
          params: [-52.5, 52]
        },
        {
          type: "c",
          params: [
            -56.9,
            -53.7,
            -133.9,
            -85.5,
            -213.4,
            -85.5,
            -170.7,
            0,
            -309.8,
            139.2,
            -309.8,
            309.8,
            0,
            170.6,
            139.2,
            309.8,
            309.8,
            309.8,
            92.4,
            0,
            179.5,
            -40.8,
            238.4,
            -111.8,
            4,
            -5.2,
            4,
            -12.9,
            -0.8,
            -17.3
          ]
        },
        {
          type: "L",
          params: [694.3, 637]
        },
        {
          type: "c",
          params: [
            -2.8,
            -2.4,
            -6.5,
            -3.6,
            -10.1,
            -3.6,
            -3.6,
            0.4,
            -7.3,
            2,
            -9.3,
            4.8,
            -39.5,
            51.2,
            -98.8,
            80.3,
            -163,
            80.3,
            -113.8,
            0,
            -206.5,
            -92.8,
            -206.5,
            -206.5,
            0,
            -113.8,
            92.8,
            -206.5,
            206.5,
            -206.5,
            52.8,
            0,
            102.9,
            20.2,
            140.8,
            55.3
          ]
        },
        {
          type: "L",
          params: [597, 416.5]
        },
        {
          type: "c",
          params: [-7.7, 7.3, -9.7, 18.6, -5.6, 27.9, 4, 9.7, 13.3, 16.1, 23.8, 16.1]
        },
        {
          type: "H",
          params: [796]
        },
        {
          type: "c",
          params: [14.1, 0, 25.8, -11.7, 25.8, -25.8]
        },
        {
          type: "V",
          params: [253.8]
        },
        {
          type: "z",
          params: []
        }
      ], fill: "#2c2c2c", stroke: "transparent", strokeWidth: 0, originX: 0, originY: 0, originW: 1024, originH: 1024, opacity: 1 }, opts)
    };
    return iconRotate;
  };
  function createRotateControllerPattern(opts) {
    const { fill, devicePixelRatio } = opts;
    const iconRotate = createIconRotate({ fill });
    const { w: w2, h: h2 } = iconRotate;
    const context2d = createOffscreenContext2D({
      width: w2,
      height: h2,
      devicePixelRatio
    });
    drawElement(context2d, iconRotate, {
      loader: void 0,
      viewScaleInfo: {
        scale: 1,
        offsetTop: 0,
        offsetBottom: 0,
        offsetLeft: 0,
        offsetRight: 0
      },
      viewSizeInfo: {
        width: w2,
        height: h2,
        devicePixelRatio,
        contextWidth: w2,
        contextHeight: h2
      },
      parentElementSize: {
        x: 0,
        y: 0,
        w: w2,
        h: h2
      },
      parentOpacity: 1
    });
    return { context2d, fill };
  }
  const fontFamily$1 = "monospace";
  function drawSizeInfoText(ctx, opts) {
    const { point, rotateCenter, angle: angle2, text: text2, style, fontSize: fontSize2, lineHeight: lineHeight2 } = opts;
    const { textColor: textColor2, textBackground } = style;
    rotateByCenter(ctx, angle2, rotateCenter, () => {
      ctx.$setFont({
        fontWeight: "300",
        fontSize: fontSize2,
        fontFamily: fontFamily$1
      });
      const padding = (lineHeight2 - fontSize2) / 2;
      const textWidth = ctx.$undoPixelRatio(ctx.measureText(text2).width);
      const bgStart = {
        x: point.x - textWidth / 2 - padding,
        y: point.y
      };
      const bgEnd = {
        x: bgStart.x + textWidth + padding * 2,
        y: bgStart.y + fontSize2 + padding
      };
      const textStart = {
        x: point.x - textWidth / 2,
        y: point.y
      };
      ctx.setLineDash([]);
      ctx.fillStyle = textBackground;
      ctx.beginPath();
      ctx.moveTo(bgStart.x, bgStart.y);
      ctx.lineTo(bgEnd.x, bgStart.y);
      ctx.lineTo(bgEnd.x, bgEnd.y);
      ctx.lineTo(bgStart.x, bgEnd.y);
      ctx.closePath();
      ctx.fill("nonzero");
      ctx.fillStyle = textColor2;
      ctx.textBaseline = "top";
      ctx.fillText(text2, textStart.x, textStart.y + padding);
    });
  }
  function drawPositionInfoText(ctx, opts) {
    const { point, rotateCenter, angle: angle2, text: text2, style, fontSize: fontSize2, lineHeight: lineHeight2 } = opts;
    const { textBackground, textColor: textColor2 } = style;
    rotateByCenter(ctx, angle2, rotateCenter, () => {
      ctx.$setFont({
        fontWeight: "300",
        fontSize: fontSize2,
        fontFamily: fontFamily$1
      });
      const padding = (lineHeight2 - fontSize2) / 2;
      const textWidth = ctx.$undoPixelRatio(ctx.measureText(text2).width);
      const bgStart = {
        x: point.x,
        y: point.y
      };
      const bgEnd = {
        x: bgStart.x + textWidth + padding * 2,
        y: bgStart.y + fontSize2 + padding
      };
      const textStart = {
        x: point.x + padding,
        y: point.y
      };
      ctx.setLineDash([]);
      ctx.fillStyle = textBackground;
      ctx.beginPath();
      ctx.moveTo(bgStart.x, bgStart.y);
      ctx.lineTo(bgEnd.x, bgStart.y);
      ctx.lineTo(bgEnd.x, bgEnd.y);
      ctx.lineTo(bgStart.x, bgEnd.y);
      ctx.closePath();
      ctx.fill("nonzero");
      ctx.fillStyle = textColor2;
      ctx.textBaseline = "top";
      ctx.fillText(text2, textStart.x, textStart.y + padding);
    });
  }
  function drawAngleInfoText(ctx, opts) {
    const { point, rotateCenter, angle: angle2, text: text2, style, fontSize: fontSize2, lineHeight: lineHeight2 } = opts;
    const { textBackground, textColor: textColor2 } = style;
    rotateByCenter(ctx, angle2, rotateCenter, () => {
      ctx.$setFont({
        fontWeight: "300",
        fontSize: fontSize2,
        fontFamily: fontFamily$1
      });
      const padding = (lineHeight2 - fontSize2) / 2;
      const textWidth = ctx.$undoPixelRatio(ctx.measureText(text2).width);
      const bgStart = {
        x: point.x,
        y: point.y
      };
      const bgEnd = {
        x: bgStart.x + textWidth + padding * 2,
        y: bgStart.y + fontSize2 + padding
      };
      const textStart = {
        x: point.x + padding,
        y: point.y
      };
      ctx.setLineDash([]);
      ctx.fillStyle = textBackground;
      ctx.beginPath();
      ctx.moveTo(bgStart.x, bgStart.y);
      ctx.lineTo(bgEnd.x, bgStart.y);
      ctx.lineTo(bgEnd.x, bgEnd.y);
      ctx.lineTo(bgStart.x, bgEnd.y);
      ctx.closePath();
      ctx.fill("nonzero");
      ctx.fillStyle = textColor2;
      ctx.textBaseline = "top";
      ctx.fillText(text2, textStart.x, textStart.y + padding);
    });
  }
  const infoBackground = "#1973bac6";
  const infoTextColor = "#ffffff";
  const MIDDLEWARE_INTERNAL_EVENT_SHOW_INFO_ANGLE = "@middleware/internal-event/show-info-angle";
  const defaltStyle = {
    textBackground: infoBackground,
    textColor: infoTextColor
  };
  const infoFontSize = 10;
  const infoLineHeight = 16;
  const MiddlewareInfo = (opts, config) => {
    const { boardContent, calculator, eventHub } = opts;
    const { overlayContext } = boardContent;
    let innerConfig = Object.assign(Object.assign({}, defaltStyle), config);
    let showAngleInfo = true;
    const showInfoAngleCallback = ({ show }) => {
      showAngleInfo = show;
    };
    return {
      name: "@middleware/info",
      use() {
        eventHub.on(MIDDLEWARE_INTERNAL_EVENT_SHOW_INFO_ANGLE, showInfoAngleCallback);
      },
      disuse() {
        eventHub.off(MIDDLEWARE_INTERNAL_EVENT_SHOW_INFO_ANGLE, showInfoAngleCallback);
      },
      resetConfig(config2) {
        innerConfig = Object.assign(Object.assign({}, innerConfig), config2);
      },
      beforeDrawFrame({ snapshot }) {
        var _a;
        const { textBackground, textColor: textColor2 } = innerConfig;
        const style = {
          textBackground,
          textColor: textColor2
        };
        const { sharedStore } = snapshot;
        const selectedElementList = sharedStore[keySelectedElementList];
        const actionType = sharedStore[keyActionType];
        const groupQueue = sharedStore[keyGroupQueue] || [];
        if (selectedElementList.length === 1) {
          const elem = selectedElementList[0];
          if (elem && ["select", "drag", "resize"].includes(actionType)) {
            const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
            const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);
            const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = elem;
            const totalGroupQueue = [
              ...groupQueue,
              ...[
                {
                  uuid: createUUID(),
                  x: x2,
                  y: y2,
                  w: w2,
                  h: h2,
                  angle: angle2,
                  type: "group",
                  detail: { children: [] }
                }
              ]
            ];
            const calcOpts = { viewScaleInfo, viewSizeInfo };
            const rangeRectInfo = calculator.calcViewRectInfoFromOrigin(elem.uuid, calcOpts);
            let totalAngle = 0;
            totalGroupQueue.forEach((group) => {
              totalAngle += group.angle || 0;
            });
            const totalRadian = parseAngleToRadian(limitAngle(0 - totalAngle));
            if (rangeRectInfo) {
              const elemCenter = rangeRectInfo === null || rangeRectInfo === void 0 ? void 0 : rangeRectInfo.center;
              const rectInfo = {
                topLeft: rotatePoint(elemCenter, rangeRectInfo.topLeft, totalRadian),
                topRight: rotatePoint(elemCenter, rangeRectInfo.topRight, totalRadian),
                bottomRight: rotatePoint(elemCenter, rangeRectInfo.bottomRight, totalRadian),
                bottomLeft: rotatePoint(elemCenter, rangeRectInfo.bottomLeft, totalRadian),
                center: rotatePoint(elemCenter, rangeRectInfo.center, totalRadian),
                top: rotatePoint(elemCenter, rangeRectInfo.top, totalRadian),
                right: rotatePoint(elemCenter, rangeRectInfo.right, totalRadian),
                bottom: rotatePoint(elemCenter, rangeRectInfo.bottom, totalRadian),
                left: rotatePoint(elemCenter, rangeRectInfo.left, totalRadian)
              };
              const x3 = formatNumber(elem.x, { decimalPlaces: 2 });
              const y3 = formatNumber(elem.y, { decimalPlaces: 2 });
              const w3 = formatNumber(elem.w, { decimalPlaces: 2 });
              const h3 = formatNumber(elem.h, { decimalPlaces: 2 });
              const xyText = `${formatNumber(x3, { decimalPlaces: 0 })},${formatNumber(y3, { decimalPlaces: 0 })}`;
              const whText = `${formatNumber(w3, { decimalPlaces: 0 })}x${formatNumber(h3, { decimalPlaces: 0 })}`;
              const angleText = `${formatNumber(elem.angle || 0, { decimalPlaces: 0 })}°`;
              drawSizeInfoText(overlayContext, {
                point: {
                  x: rectInfo.bottom.x,
                  y: rectInfo.bottom.y + infoFontSize
                },
                rotateCenter: rectInfo.center,
                angle: totalAngle,
                text: whText,
                fontSize: infoFontSize,
                lineHeight: infoLineHeight,
                style
              });
              drawPositionInfoText(overlayContext, {
                point: {
                  x: rectInfo.topLeft.x,
                  y: rectInfo.topLeft.y - infoFontSize * 2
                },
                rotateCenter: rectInfo.center,
                angle: totalAngle,
                text: xyText,
                fontSize: infoFontSize,
                lineHeight: infoLineHeight,
                style
              });
              if (showAngleInfo) {
                if (((_a = elem.operations) === null || _a === void 0 ? void 0 : _a.rotatable) !== false) {
                  drawAngleInfoText(overlayContext, {
                    point: {
                      x: rectInfo.top.x + infoFontSize + 4,
                      y: rectInfo.top.y - infoFontSize * 2 - 18
                    },
                    rotateCenter: rectInfo.center,
                    angle: totalAngle,
                    text: angleText,
                    fontSize: infoFontSize,
                    lineHeight: infoLineHeight,
                    style
                  });
                }
              }
            }
          }
        }
      }
    };
  };
  const MiddlewareSelector = (opts, config) => {
    let innerConfig = Object.assign(Object.assign({}, defaultStyle$3), config);
    const { viewer, sharer, boardContent, calculator, eventHub } = opts;
    const { overlayContext } = boardContent;
    let prevPoint = null;
    let pointStartElementSizeList = [];
    let moveOriginalStartPoint = null;
    let moveOriginalStartElementSize = null;
    let inBusyMode = null;
    let hasChangedData = null;
    let rotateControllerPattern = createRotateControllerPattern({
      fill: innerConfig.activeColor,
      devicePixelRatio: sharer.getActiveViewSizeInfo().devicePixelRatio
    });
    sharer.setSharedStorage(keyActionType, null);
    sharer.setSharedStorage(keyEnableSnapToGrid, true);
    const getActiveElements = () => {
      return sharer.getSharedStorage(keySelectedElementList);
    };
    const pushGroupQueue = (elem) => {
      let groupQueue = sharer.getSharedStorage(keyGroupQueue);
      if (!Array.isArray(groupQueue)) {
        groupQueue = [];
      }
      if (groupQueue.length > 0) {
        if (isElementInGroup(elem, groupQueue[groupQueue.length - 1])) {
          groupQueue.push(elem);
        } else {
          groupQueue = [];
        }
      } else if (groupQueue.length === 0) {
        groupQueue.push(elem);
      }
      const vertexesList = calcElementQueueVertexesQueueInGroup(groupQueue);
      sharer.setSharedStorage(keyGroupQueue, groupQueue);
      sharer.setSharedStorage(keyGroupQueueVertexesList, vertexesList);
      return groupQueue.length > 0;
    };
    const updateHoverElement = (elem) => {
      sharer.setSharedStorage(keyHoverElement, elem);
      let vertexes = null;
      if (elem) {
        vertexes = calcElementVertexesInGroup(elem, {
          groupQueue: sharer.getSharedStorage(keyGroupQueue)
        });
      }
      sharer.setSharedStorage(keyHoverElementVertexes, vertexes);
    };
    const updateSelectedElemenetController = () => {
      const list = sharer.getSharedStorage(keySelectedElementList);
      if (list.length === 1) {
        const controller = calcElementSizeController(list[0], {
          groupQueue: sharer.getSharedStorage(keyGroupQueue),
          controllerSize: controllerSize$1,
          viewScaleInfo: sharer.getActiveViewScaleInfo(),
          rotateControllerPosition,
          rotateControllerSize
        });
        sharer.setSharedStorage(keySelectedElementController, controller);
      }
    };
    const updateSelectedElementList = (list, opts2) => {
      var _a;
      sharer.setSharedStorage(keySelectedElementList, list);
      if (list.length === 1) {
        updateSelectedElemenetController();
        sharer.setSharedStorage(keySelectedElementPosition, getElementPositionFromList(list[0].uuid, ((_a = sharer.getActiveStorage("data")) === null || _a === void 0 ? void 0 : _a.elements) || []));
      } else {
        sharer.setSharedStorage(keySelectedElementController, null);
        sharer.setSharedStorage(keySelectedElementPosition, []);
      }
      if ((opts2 === null || opts2 === void 0 ? void 0 : opts2.triggerEvent) === true) {
        const uuids = list.map((elem) => elem.uuid);
        const data = sharer.getActiveStorage("data");
        const positionMap = getElementPositionMapFromList(uuids, (data === null || data === void 0 ? void 0 : data.elements) || []);
        eventHub.trigger(coreEventKeys.SELECT, {
          type: "clickCanvas",
          uuids,
          positions: list.map((elem) => [...positionMap[elem.uuid]])
        });
      }
    };
    const pointTargetBaseOptions = () => {
      return {
        ctx: overlayContext,
        calculator,
        data: sharer.getActiveStorage("data"),
        selectedElements: getActiveElements(),
        viewScaleInfo: sharer.getActiveViewScaleInfo(),
        viewSizeInfo: sharer.getActiveViewSizeInfo(),
        groupQueue: sharer.getSharedStorage(keyGroupQueue),
        areaSize: null,
        selectedElementController: sharer.getSharedStorage(keySelectedElementController),
        selectedElementPosition: sharer.getSharedStorage(keySelectedElementPosition)
      };
    };
    const clear = () => {
      sharer.setSharedStorage(keyActionType, null);
      sharer.setSharedStorage(keyResizeType, null);
      sharer.setSharedStorage(keyAreaStart, null);
      sharer.setSharedStorage(keyAreaEnd, null);
      sharer.setSharedStorage(keyGroupQueue, []);
      sharer.setSharedStorage(keyGroupQueueVertexesList, []);
      sharer.setSharedStorage(keyHoverElement, null);
      sharer.setSharedStorage(keyHoverElementVertexes, null);
      sharer.setSharedStorage(keySelectedElementList, []);
      sharer.setSharedStorage(keySelectedElementListVertexes, null);
      sharer.setSharedStorage(keySelectedElementController, null);
      sharer.setSharedStorage(keySelectedElementPosition, []);
      sharer.setSharedStorage(keyIsMoving, null);
    };
    clear();
    const selectCallback = ({ uuids = [], positions }) => {
      let elements = [];
      const actionType = sharer.getSharedStorage(keyActionType);
      const data = sharer.getActiveStorage("data");
      if (positions && Array.isArray(positions)) {
        elements = findElementsFromListByPositions(positions, (data === null || data === void 0 ? void 0 : data.elements) || []);
      } else {
        elements = findElementsFromList(uuids, (data === null || data === void 0 ? void 0 : data.elements) || []);
      }
      let needRefresh = false;
      if (!actionType && elements.length === 1) {
        sharer.setSharedStorage(keyActionType, "select");
        needRefresh = true;
      } else if (actionType === "select" && elements.length === 1) {
        needRefresh = true;
      }
      if (needRefresh) {
        const elem = elements[0];
        const groupQueue = getGroupQueueFromList(elem.uuid, (data === null || data === void 0 ? void 0 : data.elements) || []);
        sharer.setSharedStorage(keyGroupQueue, groupQueue);
        updateSelectedElementList(elements);
        viewer.drawFrame();
      }
    };
    const selectClearCallback = () => {
      clear();
      viewer.drawFrame();
    };
    const setSnapToSnapCallback = (e) => {
      sharer.setSharedStorage(keyEnableSnapToGrid, !!e.enable);
    };
    const selectInGroupCallback = (e) => {
      sharer.setSharedStorage(keyEnableSelectInGroup, !!e.enable);
    };
    return {
      name: "@middleware/selector",
      use() {
        eventHub.on(coreEventKeys.SELECT, selectCallback);
        eventHub.on(coreEventKeys.CLEAR_SELECT, selectClearCallback);
        eventHub.on(coreEventKeys.SELECT_IN_GROUP, selectInGroupCallback);
        eventHub.on(coreEventKeys.SNAP_TO_GRID, setSnapToSnapCallback);
      },
      disuse() {
        eventHub.off(coreEventKeys.SELECT, selectCallback);
        eventHub.off(coreEventKeys.CLEAR_SELECT, selectClearCallback);
        eventHub.off(coreEventKeys.SELECT_IN_GROUP, selectInGroupCallback);
        eventHub.off(coreEventKeys.SNAP_TO_GRID, setSnapToSnapCallback);
        clear();
        innerConfig = null;
      },
      resetConfig(config2) {
        innerConfig = Object.assign(Object.assign({}, innerConfig), config2);
      },
      hover: (e) => {
        var _a, _b, _c, _d, _e;
        const layoutIsSelected = sharer.getSharedStorage(keyLayoutIsSelected);
        const layoutIsBusyMoving = sharer.getSharedStorage(keyLayoutIsBusyMoving);
        if (layoutIsBusyMoving === true) {
          return;
        }
        const resizeType = sharer.getSharedStorage(keyResizeType);
        const actionType = sharer.getSharedStorage(keyActionType);
        const groupQueue = sharer.getSharedStorage(keyGroupQueue);
        const triggerCursor = (target2) => {
          if (layoutIsSelected === true) {
            return;
          }
          const cursor = target2.type;
          if (inBusyMode === null) {
            eventHub.trigger(coreEventKeys.CURSOR, {
              type: cursor,
              groupQueue: target2.groupQueue,
              element: target2.elements[0]
            });
          }
        };
        if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
          const isInActiveGroup = isPointInViewActiveGroup(e.point, {
            ctx: overlayContext,
            viewScaleInfo: sharer.getActiveViewScaleInfo(),
            viewSizeInfo: sharer.getActiveViewSizeInfo(),
            groupQueue: sharer.getSharedStorage(keyGroupQueue)
          });
          if (!isInActiveGroup) {
            updateHoverElement(null);
            viewer.drawFrame();
            return;
          }
          const target2 = getPointTarget(e.point, pointTargetBaseOptions());
          triggerCursor(target2);
          if (resizeType || ["area", "drag", "drag-list"].includes(actionType)) {
            updateHoverElement(null);
            viewer.drawFrame();
            return;
          }
          if (((_a = target2 === null || target2 === void 0 ? void 0 : target2.elements) === null || _a === void 0 ? void 0 : _a.length) === 1) {
            updateHoverElement(target2.elements[0]);
            viewer.drawFrame();
            return;
          }
          updateHoverElement(null);
          viewer.drawFrame();
          return;
        }
        if (resizeType || ["area", "drag", "drag-list"].includes(actionType)) {
          updateHoverElement(null);
          return;
        }
        if (actionType === "drag") {
          updateHoverElement(null);
          return;
        }
        const selectedElements = getActiveElements();
        const viewScaleInfo = sharer.getActiveViewScaleInfo();
        sharer.getActiveViewSizeInfo();
        const target = getPointTarget(e.point, Object.assign(Object.assign({}, pointTargetBaseOptions()), { areaSize: calcSelectedElementsArea(selectedElements, {
          viewScaleInfo
        }) }));
        triggerCursor(target);
        if (target.type === null) {
          if (sharer.getSharedStorage(keyHoverElement) || sharer.getSharedStorage(keyHoverElementVertexes)) {
            sharer.setSharedStorage(keyHoverElement, null);
            sharer.setSharedStorage(keyHoverElementVertexes, null);
            viewer.drawFrame();
          }
          return;
        }
        if (target.type === "over-element" && sharer.getSharedStorage(keyActionType) === "select" && target.elements.length === 1 && target.elements[0].uuid === ((_c = (_b = getActiveElements()) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.uuid)) {
          return;
        }
        if (target.type === "over-element" && sharer.getSharedStorage(keyActionType) === null && target.elements.length === 1 && target.elements[0].uuid === ((_d = sharer.getSharedStorage(keyHoverElement)) === null || _d === void 0 ? void 0 : _d.uuid)) {
          return;
        }
        if (target.type === "over-element" && ((_e = target === null || target === void 0 ? void 0 : target.elements) === null || _e === void 0 ? void 0 : _e.length) === 1) {
          updateHoverElement(target.elements[0]);
          viewer.drawFrame();
          return;
        }
        if (sharer.getSharedStorage(keyHoverElement)) {
          updateHoverElement(null);
          viewer.drawFrame();
          return;
        }
      },
      pointStart: (e) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        prevPoint = e.point;
        moveOriginalStartPoint = e.point;
        sharer.setSharedStorage(keyActionType, null);
        sharer.setSharedStorage(keyResizeType, null);
        sharer.setSharedStorage(keyAreaStart, null);
        sharer.setSharedStorage(keyAreaEnd, null);
        sharer.setSharedStorage(keyHoverElement, null);
        const groupQueue = sharer.getSharedStorage(keyGroupQueue);
        if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
          if (isPointInViewActiveGroup(e.point, {
            ctx: overlayContext,
            viewScaleInfo: sharer.getActiveViewScaleInfo(),
            viewSizeInfo: sharer.getActiveViewSizeInfo(),
            groupQueue
          })) {
            const target2 = getPointTarget(e.point, pointTargetBaseOptions());
            const isLockedElement2 = ((_a = target2 === null || target2 === void 0 ? void 0 : target2.elements) === null || _a === void 0 ? void 0 : _a.length) === 1 && ((_c = (_b = target2.elements[0]) === null || _b === void 0 ? void 0 : _b.operations) === null || _c === void 0 ? void 0 : _c.locked) === true;
            updateHoverElement(null);
            if (((_d = target2 === null || target2 === void 0 ? void 0 : target2.elements) === null || _d === void 0 ? void 0 : _d.length) === 1) {
              moveOriginalStartElementSize = getElementSize(target2 === null || target2 === void 0 ? void 0 : target2.elements[0]);
            }
            if (isLockedElement2 === true) {
              clear();
            } else if (target2.type === "over-element" && ((_e = target2 === null || target2 === void 0 ? void 0 : target2.elements) === null || _e === void 0 ? void 0 : _e.length) === 1) {
              updateSelectedElementList([target2.elements[0]], { triggerEvent: true });
              sharer.setSharedStorage(keyActionType, "drag");
              pointStartElementSizeList = [Object.assign(Object.assign({}, getElementSize(target2 === null || target2 === void 0 ? void 0 : target2.elements[0])), { uuid: target2 === null || target2 === void 0 ? void 0 : target2.elements[0].uuid })];
            } else if ((_f = target2.type) === null || _f === void 0 ? void 0 : _f.startsWith("resize-")) {
              sharer.setSharedStorage(keyResizeType, target2.type);
              sharer.setSharedStorage(keyActionType, "resize");
            } else {
              updateSelectedElementList([], { triggerEvent: true });
            }
          } else {
            clear();
          }
          viewer.drawFrame();
          return;
        }
        const listAreaSize = calcSelectedElementsArea(getActiveElements(), {
          viewScaleInfo: sharer.getActiveViewScaleInfo(),
          viewSizeInfo: sharer.getActiveViewSizeInfo()
        });
        const target = getPointTarget(e.point, Object.assign(Object.assign({}, pointTargetBaseOptions()), { areaSize: listAreaSize, groupQueue: [] }));
        const isLockedElement = ((_g = target === null || target === void 0 ? void 0 : target.elements) === null || _g === void 0 ? void 0 : _g.length) === 1 && ((_j = (_h = target.elements[0]) === null || _h === void 0 ? void 0 : _h.operations) === null || _j === void 0 ? void 0 : _j.locked) === true;
        updateHoverElement(null);
        if (((_k = target === null || target === void 0 ? void 0 : target.elements) === null || _k === void 0 ? void 0 : _k.length) === 1) {
          moveOriginalStartElementSize = getElementSize(target === null || target === void 0 ? void 0 : target.elements[0]);
        }
        if (isLockedElement === true) {
          clear();
          sharer.setSharedStorage(keyActionType, "area");
          sharer.setSharedStorage(keyAreaStart, e.point);
          updateSelectedElementList([], { triggerEvent: true });
        } else if (target.type === "list-area") {
          sharer.setSharedStorage(keyActionType, "drag-list");
        } else if (target.type === "over-element" && ((_l = target === null || target === void 0 ? void 0 : target.elements) === null || _l === void 0 ? void 0 : _l.length) === 1) {
          updateSelectedElementList([target.elements[0]], { triggerEvent: true });
          sharer.setSharedStorage(keyActionType, "drag");
          pointStartElementSizeList = [Object.assign(Object.assign({}, getElementSize(target === null || target === void 0 ? void 0 : target.elements[0])), { uuid: target === null || target === void 0 ? void 0 : target.elements[0].uuid })];
        } else if ((_m = target.type) === null || _m === void 0 ? void 0 : _m.startsWith("resize-")) {
          sharer.setSharedStorage(keyResizeType, target.type);
          sharer.setSharedStorage(keyActionType, "resize");
        } else {
          clear();
          sharer.setSharedStorage(keyActionType, "area");
          sharer.setSharedStorage(keyAreaStart, e.point);
          updateSelectedElementList([], { triggerEvent: true });
        }
        viewer.drawFrame();
      },
      pointMove: (e) => {
        var _a, _b, _c;
        sharer.setSharedStorage(keyIsMoving, true);
        const data = sharer.getActiveStorage("data");
        const elems = getActiveElements();
        const scale = sharer.getActiveStorage("scale") || 1;
        const viewScaleInfo = sharer.getActiveViewScaleInfo();
        const viewSizeInfo = sharer.getActiveViewSizeInfo();
        const start = prevPoint;
        const originalStart = moveOriginalStartPoint;
        const end = e.point;
        const resizeType = sharer.getSharedStorage(keyResizeType);
        const actionType = sharer.getSharedStorage(keyActionType);
        const groupQueue = sharer.getSharedStorage(keyGroupQueue);
        const enableSnapToGrid = sharer.getSharedStorage(keyEnableSnapToGrid);
        if (actionType === "drag") {
          hasChangedData = true;
          inBusyMode = "drag";
          eventHub.trigger(MIDDLEWARE_INTERNAL_EVENT_SHOW_INFO_ANGLE, { show: false });
          if (data && (elems === null || elems === void 0 ? void 0 : elems.length) === 1 && moveOriginalStartElementSize && originalStart && end && ((_b = (_a = elems[0]) === null || _a === void 0 ? void 0 : _a.operations) === null || _b === void 0 ? void 0 : _b.locked) !== true) {
            const { moveX, moveY } = calcPointMoveElementInGroup(originalStart, end, groupQueue);
            let totalMoveX = calculator.toGridNum(moveX / scale);
            let totalMoveY = calculator.toGridNum(moveY / scale);
            if (enableSnapToGrid === true) {
              const referenceInfo = calcReferenceInfo(elems[0].uuid, {
                calculator,
                data,
                groupQueue,
                viewScaleInfo,
                viewSizeInfo
              });
              try {
                if (referenceInfo) {
                  if (is.x(referenceInfo.offsetX) && referenceInfo.offsetX !== null) {
                    totalMoveX = calculator.toGridNum(totalMoveX + referenceInfo.offsetX);
                  }
                  if (is.y(referenceInfo.offsetY) && referenceInfo.offsetY !== null) {
                    totalMoveY = calculator.toGridNum(totalMoveY + referenceInfo.offsetY);
                  }
                }
              } catch (err) {
                console.error(err);
              }
            }
            elems[0].x = calculator.toGridNum(moveOriginalStartElementSize.x + totalMoveX);
            elems[0].y = calculator.toGridNum(moveOriginalStartElementSize.y + totalMoveY);
            updateSelectedElementList([elems[0]]);
            calculator.modifyVirtualFlatItemMap(data, {
              modifyInfo: {
                type: "updateElement",
                content: {
                  element: elems[0],
                  position: sharer.getSharedStorage(keySelectedElementPosition) || []
                }
              },
              viewSizeInfo,
              viewScaleInfo
            });
          }
          viewer.drawFrame();
        } else if (actionType === "drag-list") {
          hasChangedData = true;
          inBusyMode = "drag-list";
          if (data && originalStart && start && end && (elems === null || elems === void 0 ? void 0 : elems.length) > 1) {
            const moveX = (end.x - start.x) / scale;
            const moveY = (end.y - start.y) / scale;
            elems.forEach((elem) => {
              var _a2;
              if (elem && ((_a2 = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a2 === void 0 ? void 0 : _a2.locked) !== true) {
                elem.x = calculator.toGridNum(elem.x + moveX);
                elem.y = calculator.toGridNum(elem.y + moveY);
                calculator.modifyVirtualFlatItemMap(data, {
                  modifyInfo: {
                    type: "updateElement",
                    content: {
                      element: elem,
                      position: getElementPositionFromList(elem.uuid, data.elements) || []
                    }
                  },
                  viewSizeInfo,
                  viewScaleInfo
                });
              }
            });
            sharer.setActiveStorage("data", data);
          }
          viewer.drawFrame();
        } else if (actionType === "resize") {
          if (data && (elems === null || elems === void 0 ? void 0 : elems.length) === 1 && originalStart && moveOriginalStartElementSize && (resizeType === null || resizeType === void 0 ? void 0 : resizeType.startsWith("resize-"))) {
            hasChangedData = true;
            inBusyMode = "resize";
            const pointGroupQueue = [];
            groupQueue.forEach((group) => {
              const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = group;
              pointGroupQueue.push({
                x: x2,
                y: y2,
                w: w2,
                h: h2,
                angle: 0 - angle2
              });
            });
            let resizeStart = originalStart;
            let resizeEnd = end;
            if (groupQueue.length > 0) {
              resizeStart = rotatePointInGroup(originalStart, pointGroupQueue);
              resizeEnd = rotatePointInGroup(end, pointGroupQueue);
            }
            if (resizeType === "resize-rotate") {
              const controller = sharer.getSharedStorage(keySelectedElementController);
              const viewVertexes = [
                controller.topLeft.center,
                controller.topRight.center,
                controller.bottomLeft.center,
                controller.bottomRight.center
              ];
              const viewCenter = calcElementCenterFromVertexes(viewVertexes);
              const resizedElemSize = rotateElement(moveOriginalStartElementSize, {
                center: viewCenter,
                viewScaleInfo,
                start: originalStart,
                end
              });
              elems[0].angle = calculator.toGridNum(resizedElemSize.angle || 0);
            } else {
              const resizedElemSize = resizeElement(Object.assign(Object.assign({}, moveOriginalStartElementSize), { operations: elems[0].operations }), { scale, start: resizeStart, end: resizeEnd, resizeType });
              const calcOpts = { ignore: !!moveOriginalStartElementSize.angle };
              const gridX = calculator.toGridNum(resizedElemSize.x, calcOpts);
              const gridY = calculator.toGridNum(resizedElemSize.y, calcOpts);
              const gridW = calculator.toGridNum(resizedElemSize.w, calcOpts);
              const gridH = calculator.toGridNum(resizedElemSize.h, calcOpts);
              if (elems[0].type === "group") {
                resizeEffectGroupElement(elems[0], {
                  x: gridX,
                  y: gridY,
                  w: gridW,
                  h: gridH
                }, { resizeEffect: (_c = elems[0].operations) === null || _c === void 0 ? void 0 : _c.resizeEffect });
                elems[0].x = gridX;
                elems[0].y = gridY;
              } else {
                elems[0].x = gridX;
                elems[0].y = gridY;
                elems[0].w = gridW;
                elems[0].h = gridH;
              }
            }
            updateSelectedElementList([elems[0]]);
            calculator.modifyVirtualFlatItemMap(data, {
              modifyInfo: {
                type: "updateElement",
                content: {
                  element: elems[0],
                  position: sharer.getSharedStorage(keySelectedElementPosition) || []
                }
              },
              viewSizeInfo,
              viewScaleInfo
            });
            viewer.drawFrame();
          }
        } else if (actionType === "area") {
          inBusyMode = "area";
          sharer.setSharedStorage(keyAreaEnd, e.point);
          viewer.drawFrame();
        }
        prevPoint = e.point;
      },
      pointEnd(e) {
        inBusyMode = null;
        sharer.setSharedStorage(keyIsMoving, false);
        const data = sharer.getActiveStorage("data");
        const selectedElements = sharer.getSharedStorage(keySelectedElementList);
        const hoverElement = sharer.getSharedStorage(keyHoverElement);
        const resizeType = sharer.getSharedStorage(keyResizeType);
        const actionType = sharer.getSharedStorage(keyActionType);
        const viewSizeInfo = sharer.getActiveViewSizeInfo();
        let needDrawFrame = false;
        prevPoint = null;
        moveOriginalStartPoint = null;
        moveOriginalStartElementSize = null;
        if (actionType === "drag") {
          eventHub.trigger(MIDDLEWARE_INTERNAL_EVENT_SHOW_INFO_ANGLE, { show: true });
        }
        if (actionType === "resize" && resizeType) {
          sharer.setSharedStorage(keyResizeType, null);
          needDrawFrame = true;
        } else if (actionType === "area") {
          sharer.setSharedStorage(keyActionType, null);
          if (data) {
            const start = sharer.getSharedStorage(keyAreaStart);
            const end = sharer.getSharedStorage(keyAreaEnd);
            if (start && end) {
              const { elements } = getSelectedListArea(data, {
                start,
                end,
                viewScaleInfo: sharer.getActiveViewScaleInfo(),
                viewSizeInfo: sharer.getActiveViewSizeInfo()
              });
              if (elements.length > 0) {
                sharer.setSharedStorage(keyActionType, "drag-list");
                updateSelectedElementList(elements, { triggerEvent: true });
                needDrawFrame = true;
              }
            }
          }
        } else if (actionType === "drag-list") {
          sharer.setSharedStorage(keyActionType, "drag-list-end");
          needDrawFrame = true;
        } else if (data) {
          const result = calculator.getPointElement(e.point, {
            data,
            viewScaleInfo: sharer.getActiveViewScaleInfo(),
            viewSizeInfo: sharer.getActiveViewSizeInfo()
          });
          if (result.element) {
            sharer.setSharedStorage(keyActionType, "select");
            needDrawFrame = true;
          } else {
            sharer.setSharedStorage(keyActionType, null);
          }
        }
        if (sharer.getSharedStorage(keyActionType) === null) {
          clear();
          needDrawFrame = true;
        }
        const finalDrawFrame = () => {
          if (!needDrawFrame) {
            return;
          }
          if (data && Array.isArray(data === null || data === void 0 ? void 0 : data.elements) && ["drag", "drag-list"].includes(actionType)) {
            const viewInfo = calcElementsViewInfo(data.elements, viewSizeInfo, { extend: true });
            sharer.setActiveStorage("contextHeight", viewInfo.contextSize.contextHeight);
            sharer.setActiveStorage("contextWidth", viewInfo.contextSize.contextWidth);
          }
          if (data && ["drag", "drag-list", "drag-list-end", "resize"].includes(actionType)) {
            let type = "dragElement";
            if (hasChangedData) {
              const startSize = pointStartElementSizeList[0];
              let modifyRecord = void 0;
              if (selectedElements.length === 1) {
                modifyRecord = {
                  type: "dragElement",
                  time: 0,
                  content: {
                    method: "modifyElement",
                    uuid: startSize.uuid,
                    before: toFlattenElement(startSize),
                    after: toFlattenElement(getElementSize(selectedElements[0]))
                  }
                };
              } else if (selectedElements.length > 1) {
                modifyRecord = {
                  type: "dragElements",
                  time: 0,
                  content: {
                    method: "modifyElements",
                    before: pointStartElementSizeList.map((item) => Object.assign(Object.assign({}, toFlattenElement(item)), { uuid: item.uuid })),
                    after: selectedElements.map((item) => Object.assign(Object.assign({}, toFlattenElement(getElementSize(item))), { uuid: item.uuid }))
                  }
                };
              }
              eventHub.trigger(coreEventKeys.CHANGE, { data, type, selectedElements, hoverElement, modifyRecord });
              hasChangedData = false;
            }
          }
          viewer.drawFrame();
        };
        finalDrawFrame();
      },
      pointLeave() {
        inBusyMode = null;
        sharer.setSharedStorage(keyResizeType, null);
        eventHub.trigger(coreEventKeys.CURSOR, {
          type: "default"
        });
      },
      doubleClick(e) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (sharer.getSharedStorage(keyEnableSelectInGroup) === false) {
          return;
        }
        const target = getPointTarget(e.point, pointTargetBaseOptions());
        sharer.setSharedStorage(keySelectedElementController, null);
        sharer.setSharedStorage(keySelectedElementList, []);
        if (target.elements.length === 1 && ((_b = (_a = target.elements[0]) === null || _a === void 0 ? void 0 : _a.operations) === null || _b === void 0 ? void 0 : _b.locked) === true) {
          return;
        }
        if (target.elements.length === 1 && ((_c = target.elements[0]) === null || _c === void 0 ? void 0 : _c.type) === "group") {
          const pushResult = pushGroupQueue(target.elements[0]);
          if (pushResult === true) {
            sharer.setSharedStorage(keyActionType, null);
            viewer.drawFrame();
            return;
          }
        } else if (target.elements.length === 1 && ((_d = target.elements[0]) === null || _d === void 0 ? void 0 : _d.type) === "text" && !((_f = (_e = target.elements[0]) === null || _e === void 0 ? void 0 : _e.operations) === null || _f === void 0 ? void 0 : _f.invisible)) {
          eventHub.trigger(coreEventKeys.TEXT_EDIT, {
            element: target.elements[0],
            groupQueue: sharer.getSharedStorage(keyGroupQueue) || [],
            position: getElementPositionFromList((_g = target.elements[0]) === null || _g === void 0 ? void 0 : _g.uuid, ((_h = sharer.getActiveStorage("data")) === null || _h === void 0 ? void 0 : _h.elements) || []),
            viewScaleInfo: sharer.getActiveViewScaleInfo()
          });
        }
        sharer.setSharedStorage(keyActionType, null);
      },
      wheel() {
        updateSelectedElemenetController();
      },
      wheelScale() {
        updateSelectedElemenetController();
      },
      contextMenu: (e) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const groupQueue = sharer.getSharedStorage(keyGroupQueue);
        if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
          if (isPointInViewActiveGroup(e.point, {
            ctx: overlayContext,
            viewScaleInfo: sharer.getActiveViewScaleInfo(),
            viewSizeInfo: sharer.getActiveViewSizeInfo(),
            groupQueue
          })) {
            const target2 = getPointTarget(e.point, pointTargetBaseOptions());
            if (((_a = target2 === null || target2 === void 0 ? void 0 : target2.elements) === null || _a === void 0 ? void 0 : _a.length) === 1 && ((_c = (_b = target2.elements[0]) === null || _b === void 0 ? void 0 : _b.operations) === null || _c === void 0 ? void 0 : _c.locked) !== true) {
              clear();
              updateSelectedElementList([target2.elements[0]], { triggerEvent: true });
              viewer.drawFrame();
            } else if (!((_d = target2 === null || target2 === void 0 ? void 0 : target2.elements) === null || _d === void 0 ? void 0 : _d.length)) {
              clear();
            }
          }
          return;
        }
        const listAreaSize = calcSelectedElementsArea(getActiveElements(), {
          viewScaleInfo: sharer.getActiveViewScaleInfo(),
          viewSizeInfo: sharer.getActiveViewSizeInfo()
        });
        const target = getPointTarget(e.point, Object.assign(Object.assign({}, pointTargetBaseOptions()), { areaSize: listAreaSize, groupQueue: [] }));
        if (((_e = target === null || target === void 0 ? void 0 : target.elements) === null || _e === void 0 ? void 0 : _e.length) === 1 && ((_g = (_f = target.elements[0]) === null || _f === void 0 ? void 0 : _f.operations) === null || _g === void 0 ? void 0 : _g.locked) !== true) {
          clear();
          updateSelectedElementList([target.elements[0]], { triggerEvent: true });
          viewer.drawFrame();
          return;
        } else if (!((_h = target === null || target === void 0 ? void 0 : target.elements) === null || _h === void 0 ? void 0 : _h.length)) {
          clear();
        }
      },
      beforeDrawFrame({ snapshot }) {
        var _a;
        const { activeColor: activeColor2, activeAreaColor: activeAreaColor2, lockedColor: lockedColor2, referenceColor: referenceColor2 } = innerConfig;
        const style = { activeColor: activeColor2, activeAreaColor: activeAreaColor2, lockedColor: lockedColor2, referenceColor: referenceColor2 };
        const { activeStore, sharedStore } = snapshot;
        const { scale, offsetLeft, offsetTop, offsetRight, offsetBottom, width, height, contextHeight, contextWidth, devicePixelRatio } = activeStore;
        if (rotateControllerPattern.fill !== activeColor2) {
          rotateControllerPattern = createRotateControllerPattern({
            fill: innerConfig.activeColor,
            devicePixelRatio
          });
        }
        const sharer2 = opts.sharer;
        const viewScaleInfo = { scale, offsetLeft, offsetTop, offsetRight, offsetBottom };
        const viewSizeInfo = { width, height, contextHeight, contextWidth, devicePixelRatio };
        const selectedElements = sharedStore[keySelectedElementList];
        const elem = selectedElements[0];
        const hoverElement = sharedStore[keyHoverElement];
        const hoverElementVertexes = sharedStore[keyHoverElementVertexes];
        const actionType = sharedStore[keyActionType];
        const areaStart = sharedStore[keyAreaStart];
        const areaEnd = sharedStore[keyAreaEnd];
        const groupQueue = sharedStore[keyGroupQueue];
        const groupQueueVertexesList = sharedStore[keyGroupQueueVertexesList];
        const isMoving = sharedStore[keyIsMoving];
        const enableSnapToGrid = sharedStore[keyEnableSnapToGrid];
        const drawBaseOpts = { calculator, viewScaleInfo, viewSizeInfo, style };
        let selectedElementController = sharedStore[keySelectedElementController];
        if (selectedElementController && selectedElements.length === 1 && elem) {
          if (!isSameElementSize(elem, selectedElementController.originalElementSize)) {
            selectedElementController = calcElementSizeController(elem, {
              groupQueue: groupQueue || [],
              controllerSize: controllerSize$1,
              viewScaleInfo,
              rotateControllerPosition,
              rotateControllerSize
            });
            sharer2.setSharedStorage(keySelectedElementController, selectedElementController);
          }
        }
        const isHoverLocked = !!((_a = hoverElement === null || hoverElement === void 0 ? void 0 : hoverElement.operations) === null || _a === void 0 ? void 0 : _a.locked);
        if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
          drawGroupQueueVertexesWrappers(overlayContext, groupQueueVertexesList, drawBaseOpts);
          if (hoverElement && actionType !== "drag") {
            if (isHoverLocked) {
              drawLockedVertexesWrapper(overlayContext, hoverElementVertexes, Object.assign(Object.assign({}, drawBaseOpts), { controller: selectedElementController, style }));
            } else {
              drawHoverVertexesWrapper(overlayContext, hoverElementVertexes, drawBaseOpts);
            }
          }
          if (elem && ["select", "drag", "resize"].includes(actionType)) {
            drawSelectedElementControllersVertexes(overlayContext, selectedElementController, Object.assign(Object.assign({}, drawBaseOpts), { element: elem, calculator, hideControllers: !!isMoving && actionType === "drag", rotateControllerPattern: rotateControllerPattern.context2d, style }));
            if (actionType === "drag") {
              if (enableSnapToGrid === true) {
                const referenceInfo = calcReferenceInfo(elem.uuid, {
                  calculator,
                  data: activeStore.data,
                  groupQueue,
                  viewScaleInfo,
                  viewSizeInfo
                });
                if (referenceInfo) {
                  const { offsetX, offsetY, xLines, yLines } = referenceInfo;
                  if (offsetX === 0 || offsetY === 0) {
                    drawReferenceLines(overlayContext, {
                      xLines,
                      yLines,
                      style
                    });
                  }
                }
              }
            }
          }
        } else {
          if (hoverElement && actionType !== "drag") {
            if (isHoverLocked) {
              drawLockedVertexesWrapper(overlayContext, hoverElementVertexes, Object.assign(Object.assign({}, drawBaseOpts), { controller: selectedElementController, style }));
            } else {
              drawHoverVertexesWrapper(overlayContext, hoverElementVertexes, drawBaseOpts);
            }
          }
          if (elem && ["select", "drag", "resize"].includes(actionType)) {
            drawSelectedElementControllersVertexes(overlayContext, selectedElementController, Object.assign(Object.assign({}, drawBaseOpts), { element: elem, calculator, hideControllers: !!isMoving && actionType === "drag", rotateControllerPattern: rotateControllerPattern.context2d, style }));
            if (actionType === "drag") {
              if (enableSnapToGrid === true) {
                const referenceInfo = calcReferenceInfo(elem.uuid, {
                  calculator,
                  data: activeStore.data,
                  groupQueue,
                  viewScaleInfo,
                  viewSizeInfo
                });
                if (referenceInfo) {
                  const { offsetX, offsetY, xLines, yLines } = referenceInfo;
                  if (offsetX === 0 || offsetY === 0) {
                    drawReferenceLines(overlayContext, {
                      xLines,
                      yLines,
                      style
                    });
                  }
                }
              }
            }
          } else if (actionType === "area" && areaStart && areaEnd) {
            drawArea(overlayContext, { start: areaStart, end: areaEnd, style });
          } else if (["drag-list", "drag-list-end"].includes(actionType)) {
            const listAreaSize = calcSelectedElementsArea(getActiveElements(), {
              viewScaleInfo: sharer2.getActiveViewScaleInfo(),
              viewSizeInfo: sharer2.getActiveViewSizeInfo()
            });
            if (listAreaSize) {
              drawListArea(overlayContext, { areaSize: listAreaSize, style });
            }
          }
        }
      }
    };
  };
  const key$1 = "SCROLL";
  const keyXThumbRect = Symbol(`${key$1}_xThumbRect`);
  const keyYThumbRect = Symbol(`${key$1}_yThumbRect`);
  const keyHoverXThumbRect = Symbol(`${key$1}_hoverXThumbRect`);
  const keyHoverYThumbRect = Symbol(`${key$1}_hoverYThumbRect`);
  const keyPrevPoint$1 = Symbol(`${key$1}_prevPoint`);
  const keyActivePoint = Symbol(`${key$1}_activePoint`);
  const keyActiveThumbType = Symbol(`${key$1}_activeThumbType`);
  const defaultStyle$1 = {
    thumbBackground: "#0000003A",
    thumbBorderColor: "#0000008A",
    hoverThumbBackground: "#0000005F",
    hoverThumbBorderColor: "#000000EE",
    activeThumbBackground: "#0000005E",
    activeThumbBorderColor: "#000000F0"
  };
  const scrollerLineWidth = 16;
  const minThumbLength = scrollerLineWidth * 2.5;
  function isPointAtRect(overlayContext, p, rect) {
    const ctx = overlayContext;
    const { x: x2, y: y2, w: w2, h: h2 } = rect;
    ctx.beginPath();
    ctx.rect(x2, y2, w2, h2);
    ctx.closePath();
    if (ctx.isPointInPath(p.x, p.y)) {
      return true;
    }
    return false;
  }
  function isPointInScrollThumb(overlayContext, p, opts) {
    let thumbType = null;
    const { xThumbRect, yThumbRect } = opts;
    if (xThumbRect && isPointAtRect(overlayContext, p, xThumbRect)) {
      thumbType = "X";
    } else if (yThumbRect && isPointAtRect(overlayContext, p, yThumbRect)) {
      thumbType = "Y";
    }
    return thumbType;
  }
  function getScrollInfoFromSnapshot(snapshot) {
    const { sharedStore } = snapshot;
    const info = {
      activePoint: sharedStore[keyActivePoint] || null,
      prevPoint: sharedStore[keyPrevPoint$1] || null,
      activeThumbType: sharedStore[keyActiveThumbType] || null,
      xThumbRect: sharedStore[keyXThumbRect] || null,
      yThumbRect: sharedStore[keyYThumbRect] || null,
      hoverXThumb: sharedStore[keyHoverXThumbRect],
      hoverYThumb: sharedStore[keyHoverYThumbRect]
    };
    return info;
  }
  function calcScrollerInfo(opts) {
    const { viewScaleInfo, viewSizeInfo, hoverXThumb, hoverYThumb, style } = opts;
    const { width, height } = viewSizeInfo;
    const { offsetTop, offsetBottom, offsetLeft, offsetRight } = viewScaleInfo;
    const sliderMinSize = minThumbLength;
    const lineSize2 = scrollerLineWidth;
    const { thumbBackground, thumbBorderColor, hoverThumbBackground, hoverThumbBorderColor } = style;
    let xSize = 0;
    let ySize = 0;
    xSize = Math.max(sliderMinSize, width - lineSize2 * 2 - (Math.abs(offsetLeft) + Math.abs(offsetRight)));
    if (xSize >= width) {
      xSize = width;
    }
    ySize = Math.max(sliderMinSize, height - lineSize2 * 2 - (Math.abs(offsetTop) + Math.abs(offsetBottom)));
    if (ySize >= height) {
      ySize = height;
    }
    const xStart = lineSize2;
    const xEnd = width - xSize - lineSize2;
    let translateX = xStart;
    if (offsetLeft > 0) {
      translateX = xStart;
    } else if (offsetRight > 0) {
      translateX = xEnd;
    } else if (offsetLeft <= 0 && xSize > 0 && !(offsetLeft === 0 && offsetRight === 0)) {
      translateX = xStart + (width - xSize) * Math.abs(offsetLeft) / (Math.abs(offsetLeft) + Math.abs(offsetRight));
      translateX = Math.min(Math.max(0, translateX - xStart), width - xSize);
    }
    const yStart = lineSize2;
    const yEnd = height - ySize - lineSize2;
    let translateY = yStart;
    if (offsetTop > 0) {
      translateY = yStart;
    } else if (offsetBottom > 0) {
      translateY = yEnd;
    } else if (offsetTop <= 0 && ySize > 0 && !(offsetTop === 0 && offsetBottom === 0)) {
      translateY = yStart + (height - ySize) * Math.abs(offsetTop) / (Math.abs(offsetTop) + Math.abs(offsetBottom));
      translateY = Math.min(Math.max(0, translateY - yStart), height - ySize);
    }
    const xThumbRect = {
      x: translateX,
      y: height - lineSize2,
      w: xSize,
      h: lineSize2
    };
    const yThumbRect = {
      x: width - lineSize2,
      y: translateY,
      w: lineSize2,
      h: ySize
    };
    const scrollWrapper = {
      lineSize: lineSize2,
      xSize,
      ySize,
      translateY,
      translateX,
      xThumbBackground: hoverXThumb ? hoverThumbBackground : thumbBackground,
      yThumbBackground: hoverYThumb ? hoverThumbBackground : thumbBackground,
      xThumbBorderColor: hoverXThumb ? hoverThumbBorderColor : thumbBorderColor,
      yThumbBorderColor: hoverYThumb ? hoverThumbBorderColor : thumbBorderColor,
      xThumbRect,
      yThumbRect
    };
    return scrollWrapper;
  }
  function drawScrollerThumb(ctx, opts) {
    let { x: x2, y: y2, h: h2, w: w2 } = opts;
    const { background: background2, borderColor: borderColor2 } = opts;
    ctx.save();
    ctx.shadowColor = "#FFFFFF";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 1;
    {
      const { axis } = opts;
      if (axis === "X") {
        y2 = y2 + h2 / 4 + 0;
        h2 = h2 / 2;
      } else if (axis === "Y") {
        x2 = x2 + w2 / 4 + 0;
        w2 = w2 / 2;
      }
      let r = opts.r;
      r = Math.min(r, w2 / 2, h2 / 2);
      if (w2 < r * 2 || h2 < r * 2) {
        r = 0;
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(x2 + r, y2);
      ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, r);
      ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, r);
      ctx.arcTo(x2, y2 + h2, x2, y2, r);
      ctx.arcTo(x2, y2, x2 + w2, y2, r);
      ctx.closePath();
      ctx.fillStyle = background2;
      ctx.fill("nonzero");
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor2;
      ctx.setLineDash([]);
      ctx.moveTo(x2 + r, y2);
      ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, r);
      ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, r);
      ctx.arcTo(x2, y2 + h2, x2, y2, r);
      ctx.arcTo(x2, y2, x2 + w2, y2, r);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }
  function drawScrollerInfo(overlayContext, opts) {
    const ctx = overlayContext;
    const { viewScaleInfo, viewSizeInfo, scrollInfo, style } = opts;
    const { activeThumbType, prevPoint, activePoint, hoverXThumb, hoverYThumb } = scrollInfo;
    const wrapper = calcScrollerInfo({ viewScaleInfo, viewSizeInfo, hoverXThumb, hoverYThumb, style });
    let xThumbRect = Object.assign({}, wrapper.xThumbRect);
    let yThumbRect = Object.assign({}, wrapper.yThumbRect);
    if (activeThumbType && prevPoint && activePoint) {
      if (activeThumbType === "X" && scrollInfo.xThumbRect) {
        xThumbRect = Object.assign({}, scrollInfo.xThumbRect);
        xThumbRect.x = xThumbRect.x + (activePoint.x - prevPoint.x);
      } else if (activeThumbType === "Y" && scrollInfo.yThumbRect) {
        yThumbRect = Object.assign({}, scrollInfo.yThumbRect);
        yThumbRect.y = yThumbRect.y + (activePoint.y - prevPoint.y);
      }
    }
    drawScrollerThumb(ctx, Object.assign(Object.assign({ axis: "X" }, xThumbRect), { r: wrapper.lineSize / 2, background: wrapper.xThumbBackground, borderColor: wrapper.xThumbBorderColor }));
    drawScrollerThumb(ctx, Object.assign(Object.assign({ axis: "Y" }, yThumbRect), { r: wrapper.lineSize / 2, background: wrapper.yThumbBackground, borderColor: wrapper.yThumbBorderColor }));
    return {
      xThumbRect,
      yThumbRect
    };
  }
  function drawScroller(ctx, opts) {
    const { snapshot, style } = opts;
    const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);
    const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
    const scrollInfo = getScrollInfoFromSnapshot(snapshot);
    const { xThumbRect, yThumbRect } = drawScrollerInfo(ctx, { viewSizeInfo, viewScaleInfo, scrollInfo, style });
    return { xThumbRect, yThumbRect };
  }
  const MiddlewareScroller = (opts, config) => {
    const { viewer, boardContent, sharer, eventHub } = opts;
    const { overlayContext } = boardContent;
    sharer.setSharedStorage(keyXThumbRect, null);
    sharer.setSharedStorage(keyYThumbRect, null);
    let isBusy = false;
    let innerConfig = Object.assign(Object.assign({}, defaultStyle$1), config);
    const clear = () => {
      sharer.setSharedStorage(keyPrevPoint$1, null);
      sharer.setSharedStorage(keyActivePoint, null);
      sharer.setSharedStorage(keyActiveThumbType, null);
      sharer.setSharedStorage(keyHoverXThumbRect, null);
      sharer.setSharedStorage(keyHoverYThumbRect, null);
      isBusy = false;
    };
    clear();
    const scrollX = (p) => {
      const prevPoint = sharer.getSharedStorage(keyPrevPoint$1);
      if (prevPoint) {
        const { offsetLeft, offsetRight } = sharer.getActiveViewScaleInfo();
        const { width } = sharer.getActiveViewSizeInfo();
        const thumbMoveX = -(p.x - prevPoint.x);
        const totalWidth = width + Math.abs(offsetLeft) + Math.abs(offsetRight);
        const moveX = thumbMoveX * totalWidth / width;
        viewer.scroll({ moveX });
        viewer.drawFrame();
      }
    };
    const scrollY = (p) => {
      const prevPoint = sharer.getSharedStorage(keyPrevPoint$1);
      if (prevPoint) {
        const { offsetTop, offsetBottom } = sharer.getActiveViewScaleInfo();
        const { height } = sharer.getActiveViewSizeInfo();
        const thumbMoveY = -(p.y - prevPoint.y);
        const totalHeight = height + Math.abs(offsetTop) + Math.abs(offsetBottom);
        const moveY = thumbMoveY * totalHeight / height;
        viewer.scroll({ moveY });
        viewer.drawFrame();
      }
    };
    const getThumbType = (p) => {
      return isPointInScrollThumb(overlayContext, p, {
        xThumbRect: sharer.getSharedStorage(keyXThumbRect),
        yThumbRect: sharer.getSharedStorage(keyYThumbRect)
      });
    };
    return {
      name: "@middleware/scroller",
      resetConfig(config2) {
        innerConfig = Object.assign(Object.assign({}, innerConfig), config2);
      },
      wheel: (e) => {
        viewer.scroll({
          moveX: 0 - e.deltaX,
          moveY: 0 - e.deltaY
        });
        viewer.drawFrame();
      },
      hover: (e) => {
        if (isBusy === true) {
          return false;
        }
        const { point } = e;
        const thumbType = getThumbType(point);
        if (thumbType === "X" || thumbType === "Y") {
          if (thumbType === "X") {
            sharer.setSharedStorage(keyHoverXThumbRect, true);
            sharer.setSharedStorage(keyHoverYThumbRect, false);
          } else {
            sharer.setSharedStorage(keyHoverXThumbRect, false);
            sharer.setSharedStorage(keyHoverYThumbRect, true);
          }
          eventHub.trigger(coreEventKeys.CURSOR, { type: "default" });
          return false;
        }
        sharer.setSharedStorage(keyHoverXThumbRect, false);
        sharer.setSharedStorage(keyHoverYThumbRect, false);
      },
      pointStart: (e) => {
        const { point } = e;
        const thumbType = getThumbType(point);
        if (thumbType === "X" || thumbType === "Y") {
          isBusy = true;
          sharer.setSharedStorage(keyActiveThumbType, thumbType);
          sharer.setSharedStorage(keyPrevPoint$1, point);
          return false;
        }
      },
      pointMove: (e) => {
        const { point } = e;
        const activeThumbType = sharer.getSharedStorage(keyActiveThumbType);
        if (activeThumbType === "X" || activeThumbType === "Y") {
          sharer.setSharedStorage(keyActivePoint, point);
          if (activeThumbType === "X") {
            scrollX(point);
          } else if (activeThumbType === "Y") {
            scrollY(point);
          }
          sharer.setSharedStorage(keyPrevPoint$1, point);
          return false;
        }
      },
      pointEnd: () => {
        isBusy = false;
        const activeThumbType = sharer.getSharedStorage(keyActiveThumbType);
        clear();
        if (activeThumbType === "X" || activeThumbType === "Y") {
          viewer.scroll({ moveX: 0, moveY: 0 });
          viewer.drawFrame();
          return false;
        }
      },
      beforeDrawFrame({ snapshot }) {
        const { thumbBackground, thumbBorderColor, hoverThumbBackground, hoverThumbBorderColor, activeThumbBackground, activeThumbBorderColor } = innerConfig;
        const style = {
          thumbBackground,
          thumbBorderColor,
          hoverThumbBackground,
          hoverThumbBorderColor,
          activeThumbBackground,
          activeThumbBorderColor
        };
        const { xThumbRect, yThumbRect } = drawScroller(overlayContext, { snapshot, style });
        sharer.setSharedStorage(keyXThumbRect, xThumbRect);
        sharer.setSharedStorage(keyYThumbRect, yThumbRect);
      }
    };
  };
  const MiddlewareScaler = (opts) => {
    const { viewer, sharer, eventHub } = opts;
    const maxScale = 50;
    const minScale = 0.05;
    return {
      name: "@middleware/scaler",
      wheelScale(e) {
        const { deltaY, point } = e;
        const { scale } = sharer.getActiveViewScaleInfo();
        let newScaleNum = scale;
        if (deltaY < 0) {
          newScaleNum = scale * 1.1;
        } else if (deltaY > 0) {
          newScaleNum = scale * 0.9;
        }
        if (newScaleNum < minScale || newScaleNum > maxScale) {
          return;
        }
        const { moveX, moveY } = viewer.scale({ scale: newScaleNum, point });
        viewer.scroll({ moveX, moveY });
        viewer.drawFrame();
        const scaleNum = formatNumber(scale);
        eventHub.trigger(coreEventKeys.SCALE, { scale: scaleNum });
      }
    };
  };
  const rulerSize = 16;
  const fontSize = 10;
  const fontWeight = 100;
  const lineSize = 1;
  const fontFamily = "monospace";
  const background = "#FFFFFFA8";
  const borderColor = "#00000080";
  const scaleColor = "#000000";
  const textColor = "#00000080";
  const gridColor = "#AAAAAA20";
  const gridPrimaryColor = "#AAAAAA40";
  const selectedAreaColor = "#19609780";
  const defaultStyle = {
    background,
    borderColor,
    scaleColor,
    textColor,
    gridColor,
    gridPrimaryColor,
    selectedAreaColor
  };
  const limitRulerUnitList = [1, 2, 5, 10, 20, 50, 100, 200, 500];
  function limitRulerUnit(unit) {
    unit = Math.max(limitRulerUnitList[0], Math.min(unit, limitRulerUnitList[limitRulerUnitList.length - 1]));
    for (let i = 0; i < limitRulerUnitList.length - 1; i++) {
      const thisUnit = limitRulerUnitList[i];
      const nextUnit = limitRulerUnitList[i + 1];
      if (unit > nextUnit) {
        continue;
      }
      if (unit === thisUnit) {
        return unit;
      }
      if (unit === nextUnit) {
        return unit;
      }
      const mid = (thisUnit + nextUnit) / 2;
      if (unit <= mid) {
        return thisUnit;
      }
      return nextUnit;
    }
    return unit;
  }
  function calcRulerScaleList(opts) {
    const { scale, viewLength, viewOffset } = opts;
    const list = [];
    let rulerUnit = 10;
    rulerUnit = formatNumber(rulerUnit / scale, { decimalPlaces: 0 });
    rulerUnit = limitRulerUnit(rulerUnit);
    const rulerKeyUnit = rulerUnit * 10;
    const rulerSubKeyUnit = rulerUnit * 5;
    let index = 0;
    const viewUnit = rulerUnit * scale;
    const startNum = 0 - viewOffset;
    const startPosition = 0;
    const remainderNum = startNum % viewUnit;
    const firstNum = (startNum - remainderNum + viewUnit) / scale;
    const firstPosition = startPosition + (viewUnit - remainderNum);
    while (firstPosition + index * viewUnit < viewLength) {
      const num = formatNumber(firstNum + index * rulerUnit, { decimalPlaces: 0 });
      const position = formatNumber(firstPosition + index * viewUnit, { decimalPlaces: 0 });
      const rulerScale = {
        num,
        position,
        showNum: num % rulerKeyUnit === 0,
        isKeyNum: num % rulerKeyUnit === 0,
        isSubKeyNum: num % rulerSubKeyUnit === 0
      };
      list.push(rulerScale);
      index++;
    }
    return { list, rulerUnit };
  }
  function calcXRulerScaleList(opts) {
    const { viewScaleInfo, viewSizeInfo } = opts;
    const { scale, offsetLeft } = viewScaleInfo;
    const { width } = viewSizeInfo;
    return calcRulerScaleList({
      scale,
      viewLength: width,
      viewOffset: offsetLeft
    });
  }
  function calcYRulerScaleList(opts) {
    const { viewScaleInfo, viewSizeInfo } = opts;
    const { scale, offsetTop } = viewScaleInfo;
    const { height } = viewSizeInfo;
    return calcRulerScaleList({
      scale,
      viewLength: height,
      viewOffset: offsetTop
    });
  }
  function drawXRuler(ctx, opts) {
    const { scaleList, style } = opts;
    const { scaleColor: scaleColor2, textColor: textColor2 } = style;
    const scaleDrawStart = rulerSize;
    const scaleDrawEnd = rulerSize * 4 / 5;
    const subKeyScaleDrawEnd = rulerSize * 2 / 5;
    const keyScaleDrawEnd = rulerSize * 1 / 5;
    const fontStart = rulerSize / 5;
    for (let i = 0; i < scaleList.length; i++) {
      const item = scaleList[i];
      if (item.position < rulerSize) {
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(item.position, scaleDrawStart);
      ctx.lineTo(item.position, item.isKeyNum ? keyScaleDrawEnd : item.isSubKeyNum ? subKeyScaleDrawEnd : scaleDrawEnd);
      ctx.closePath();
      ctx.lineWidth = lineSize;
      ctx.setLineDash([]);
      ctx.fillStyle = scaleColor2;
      ctx.stroke();
      if (item.isKeyNum) {
        ctx.fillStyle = textColor2;
        ctx.textBaseline = "top";
        ctx.$setFont({
          fontWeight,
          fontSize,
          fontFamily
        });
        ctx.fillText(`${item.num}`, item.position + fontStart, fontStart);
      }
    }
  }
  function drawYRuler(ctx, opts) {
    const { scaleList, style } = opts;
    const { scaleColor: scaleColor2, textColor: textColor2 } = style;
    const scaleDrawStart = rulerSize;
    const scaleDrawEnd = rulerSize * 4 / 5;
    const subKeyScaleDrawEnd = rulerSize * 2 / 5;
    const keyScaleDrawEnd = rulerSize * 1 / 5;
    const fontStart = rulerSize / 5;
    for (let i = 0; i < scaleList.length; i++) {
      const item = scaleList[i];
      if (item.position < rulerSize) {
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(scaleDrawStart, item.position);
      ctx.lineTo(item.isKeyNum ? keyScaleDrawEnd : item.isSubKeyNum ? subKeyScaleDrawEnd : scaleDrawEnd, item.position);
      ctx.closePath();
      ctx.fillStyle = scaleColor2;
      ctx.lineWidth = lineSize;
      ctx.setLineDash([]);
      ctx.stroke();
      if (item.showNum === true) {
        const textX = fontStart;
        const textY = item.position + fontStart;
        const numText = `${item.num}`;
        rotateByCenter(ctx, -90, { x: textX, y: textY }, () => {
          ctx.fillStyle = textColor2;
          ctx.textBaseline = "top";
          ctx.$setFont({
            fontWeight,
            fontSize,
            fontFamily
          });
          ctx.fillText(numText, fontStart + fontSize, item.position + fontStart);
        });
      }
    }
  }
  function drawRulerBackground(ctx, opts) {
    const { viewSizeInfo, style } = opts;
    const { width, height } = viewSizeInfo;
    const { background: background2, borderColor: borderColor2 } = style;
    ctx.beginPath();
    const basePosition = -1;
    ctx.moveTo(basePosition, basePosition);
    ctx.lineTo(width + 1, basePosition);
    ctx.lineTo(width + 1, rulerSize);
    ctx.lineTo(rulerSize, rulerSize);
    ctx.lineTo(rulerSize, height + 1);
    ctx.lineTo(basePosition, height + 1);
    ctx.lineTo(basePosition, basePosition);
    ctx.closePath();
    ctx.fillStyle = background2;
    ctx.fill("nonzero");
    ctx.lineWidth = lineSize;
    ctx.setLineDash([]);
    ctx.strokeStyle = borderColor2;
    ctx.stroke();
  }
  function drawGrid(ctx, opts) {
    const { xList, yList, viewSizeInfo, style } = opts;
    const { width, height } = viewSizeInfo;
    const { gridColor: gridColor2, gridPrimaryColor: gridPrimaryColor2 } = style;
    for (let i = 0; i < xList.length; i++) {
      const item = xList[i];
      ctx.beginPath();
      ctx.moveTo(item.position, 0);
      ctx.lineTo(item.position, height);
      if (item.isKeyNum === true || item.isSubKeyNum === true) {
        ctx.strokeStyle = gridPrimaryColor2;
      } else {
        ctx.strokeStyle = gridColor2;
      }
      ctx.closePath();
      ctx.lineWidth = lineSize;
      ctx.setLineDash([]);
      ctx.stroke();
    }
    for (let i = 0; i < yList.length; i++) {
      const item = yList[i];
      ctx.beginPath();
      ctx.moveTo(0, item.position);
      ctx.lineTo(width, item.position);
      if (item.isKeyNum === true || item.isSubKeyNum === true) {
        ctx.strokeStyle = gridPrimaryColor2;
      } else {
        ctx.strokeStyle = gridColor2;
      }
      ctx.lineWidth = 1;
      ctx.closePath();
      ctx.stroke();
    }
  }
  function drawScrollerSelectedArea(ctx, opts) {
    const { snapshot, calculator, style } = opts;
    const { sharedStore } = snapshot;
    const { selectedAreaColor: selectedAreaColor2 } = style;
    const selectedElementList = sharedStore[keySelectedElementList];
    const actionType = sharedStore[keyActionType];
    if (["select", "drag", "drag-list", "drag-list-end"].includes(actionType) && selectedElementList.length > 0) {
      const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
      const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);
      const rangeRectInfoList = [];
      const xAreaStartList = [];
      const xAreaEndList = [];
      const yAreaStartList = [];
      const yAreaEndList = [];
      selectedElementList.forEach((elem) => {
        const rectInfo = calculator.calcViewRectInfoFromRange(elem.uuid, {
          viewScaleInfo,
          viewSizeInfo
        });
        if (rectInfo) {
          rangeRectInfoList.push(rectInfo);
          xAreaStartList.push(rectInfo.left.x);
          xAreaEndList.push(rectInfo.right.x);
          yAreaStartList.push(rectInfo.top.y);
          yAreaEndList.push(rectInfo.bottom.y);
        }
      });
      if (!(rangeRectInfoList.length > 0)) {
        return;
      }
      const xAreaStart = Math.min(...xAreaStartList);
      const xAreaEnd = Math.max(...xAreaEndList);
      const yAreaStart = Math.min(...yAreaStartList);
      const yAreaEnd = Math.max(...yAreaEndList);
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(xAreaStart, 0);
      ctx.lineTo(xAreaEnd, 0);
      ctx.lineTo(xAreaEnd, rulerSize);
      ctx.lineTo(xAreaStart, rulerSize);
      ctx.fillStyle = selectedAreaColor2;
      ctx.closePath();
      ctx.fill("nonzero");
      ctx.beginPath();
      ctx.moveTo(0, yAreaStart);
      ctx.lineTo(rulerSize, yAreaStart);
      ctx.lineTo(rulerSize, yAreaEnd);
      ctx.lineTo(0, yAreaEnd);
      ctx.fillStyle = selectedAreaColor2;
      ctx.closePath();
      ctx.fill("nonzero");
    }
  }
  const MiddlewareRuler = (opts, config) => {
    const { boardContent, viewer, eventHub, calculator } = opts;
    const { overlayContext, underlayContext } = boardContent;
    let innerConfig = Object.assign(Object.assign({}, defaultStyle), config);
    let show = true;
    let showGrid = true;
    const rulerCallback = (e) => {
      if (typeof (e === null || e === void 0 ? void 0 : e.show) === "boolean") {
        show = e.show;
      }
      if (typeof (e === null || e === void 0 ? void 0 : e.showGrid) === "boolean") {
        showGrid = e.showGrid;
      }
      if (typeof (e === null || e === void 0 ? void 0 : e.show) === "boolean" || typeof (e === null || e === void 0 ? void 0 : e.showGrid) === "boolean") {
        viewer.drawFrame();
      }
    };
    return {
      name: "@middleware/ruler",
      use() {
        eventHub.on(coreEventKeys.RULER, rulerCallback);
      },
      disuse() {
        eventHub.off(coreEventKeys.RULER, rulerCallback);
      },
      resetConfig(config2) {
        innerConfig = Object.assign(Object.assign({}, innerConfig), config2);
      },
      beforeDrawFrame: ({ snapshot }) => {
        const { background: background2, borderColor: borderColor2, scaleColor: scaleColor2, textColor: textColor2, gridColor: gridColor2, gridPrimaryColor: gridPrimaryColor2, selectedAreaColor: selectedAreaColor2 } = innerConfig;
        const style = {
          background: background2,
          borderColor: borderColor2,
          scaleColor: scaleColor2,
          textColor: textColor2,
          gridColor: gridColor2,
          gridPrimaryColor: gridPrimaryColor2,
          selectedAreaColor: selectedAreaColor2
        };
        if (show === true) {
          const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
          const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);
          drawRulerBackground(overlayContext, { viewSizeInfo, style });
          drawScrollerSelectedArea(overlayContext, { snapshot, calculator, style });
          const { list: xList, rulerUnit } = calcXRulerScaleList({ viewScaleInfo, viewSizeInfo });
          drawXRuler(overlayContext, { scaleList: xList, style });
          const { list: yList } = calcYRulerScaleList({ viewScaleInfo, viewSizeInfo });
          drawYRuler(overlayContext, { scaleList: yList, style });
          if (showGrid === true) {
            const ctx = rulerUnit === 1 ? overlayContext : underlayContext;
            drawGrid(ctx, {
              xList,
              yList,
              viewSizeInfo,
              style
            });
          }
        }
      }
    };
  };
  const defaultElementDetail = getDefaultElementDetailConfig();
  const MiddlewareTextEditor = (opts) => {
    const { eventHub, boardContent, viewer, sharer, calculator } = opts;
    const canvas = boardContent.boardContext.canvas;
    const container = opts.container || document.body;
    let textarea = document.createElement("div");
    textarea.setAttribute("contenteditable", "true");
    let canvasWrapper = document.createElement("div");
    let mask = document.createElement("div");
    let activeElem = null;
    let activePosition = [];
    let originText = "";
    const id = `idraw-middleware-text-editor-${Math.random().toString(26).substring(2)}`;
    mask.setAttribute("id", id);
    canvasWrapper.appendChild(textarea);
    canvasWrapper.style.position = "absolute";
    mask.appendChild(canvasWrapper);
    mask.style.position = "fixed";
    mask.style.top = "0";
    mask.style.bottom = "0";
    mask.style.left = "0";
    mask.style.right = "0";
    mask.style.display = "none";
    container.appendChild(mask);
    const showTextArea = (e) => {
      resetCanvasWrapper();
      resetTextArea(e);
      mask.style.display = "block";
      originText = "";
      if (activeElem === null || activeElem === void 0 ? void 0 : activeElem.uuid) {
        sharer.setActiveOverrideElemenentMap({
          [activeElem.uuid]: {
            operations: { invisible: true }
          }
        });
        originText = activeElem.detail.text || "";
        viewer.drawFrame();
      }
    };
    const hideTextArea = () => {
      if (activeElem === null || activeElem === void 0 ? void 0 : activeElem.uuid) {
        const map = sharer.getActiveOverrideElemenentMap();
        if (map) {
          delete map[activeElem.uuid];
        }
        sharer.setActiveOverrideElemenentMap(map);
        viewer.drawFrame();
      }
      mask.style.display = "none";
      activeElem = null;
      activePosition = [];
    };
    const getCanvasRect = () => {
      const clientRect = canvas.getBoundingClientRect();
      const { left, top, width, height } = clientRect;
      return { left, top, width, height };
    };
    const createBox = (opts2) => {
      const { size, parent } = opts2;
      const div = document.createElement("div");
      const { x: x2, y: y2, w: w2, h: h2 } = size;
      const angle2 = limitAngle(size.angle || 0);
      div.style.position = "absolute";
      div.style.left = `${x2}px`;
      div.style.top = `${y2}px`;
      div.style.width = `${w2}px`;
      div.style.height = `${h2}px`;
      div.style.transform = `rotate(${angle2}deg)`;
      parent.appendChild(div);
      return div;
    };
    const resetTextArea = (e) => {
      const { viewScaleInfo, element, groupQueue } = e;
      const { scale, offsetTop, offsetLeft } = viewScaleInfo;
      if (canvasWrapper.children) {
        Array.from(canvasWrapper.children).forEach((child) => {
          child.remove();
        });
      }
      let parent = canvasWrapper;
      for (let i = 0; i < groupQueue.length; i++) {
        const group = groupQueue[i];
        const { x: x2, y: y2, w: w2, h: h2 } = group;
        const angle2 = limitAngle(group.angle || 0);
        const size = {
          x: x2 * scale,
          y: y2 * scale,
          w: w2 * scale,
          h: h2 * scale,
          angle: angle2
        };
        if (i === 0) {
          size.x += offsetLeft;
          size.y += offsetTop;
        }
        parent = createBox({ size, parent });
      }
      const detail = Object.assign(Object.assign({}, defaultElementDetail), element.detail);
      let elemX = element.x * scale + offsetLeft;
      let elemY = element.y * scale + offsetTop;
      let elemW = element.w * scale;
      let elemH = element.h * scale;
      if (groupQueue.length > 0) {
        elemX = element.x * scale;
        elemY = element.y * scale;
        elemW = element.w * scale;
        elemH = element.h * scale;
      }
      let justifyContent = "center";
      let alignItems = "center";
      if (detail.textAlign === "left") {
        justifyContent = "start";
      } else if (detail.textAlign === "right") {
        justifyContent = "end";
      }
      if (detail.verticalAlign === "top") {
        alignItems = "start";
      } else if (detail.verticalAlign === "bottom") {
        alignItems = "end";
      }
      textarea.style.display = "inline-flex";
      textarea.style.justifyContent = justifyContent;
      textarea.style.alignItems = alignItems;
      textarea.style.position = "absolute";
      textarea.style.left = `${elemX - 1}px`;
      textarea.style.top = `${elemY - 1}px`;
      textarea.style.width = `${elemW + 2}px`;
      textarea.style.height = `${elemH + 2}px`;
      textarea.style.transform = `rotate(${limitAngle(element.angle || 0)}deg)`;
      textarea.style.boxSizing = "border-box";
      textarea.style.border = "1px solid #1973ba";
      textarea.style.resize = "none";
      textarea.style.overflow = "hidden";
      textarea.style.wordBreak = "break-all";
      textarea.style.borderRadius = `${(typeof detail.borderRadius === "number" ? detail.borderRadius : 0) * scale}px`;
      textarea.style.background = `${detail.background || "transparent"}`;
      textarea.style.color = `${detail.color || "#333333"}`;
      textarea.style.fontSize = `${detail.fontSize * scale}px`;
      textarea.style.lineHeight = `${(detail.lineHeight || detail.fontSize) * scale}px`;
      textarea.style.fontFamily = enhanceFontFamliy(detail.fontFamily);
      textarea.style.fontWeight = `${detail.fontWeight}`;
      textarea.style.padding = "0";
      textarea.style.margin = "0";
      textarea.style.outline = "none";
      textarea.innerText = detail.text || "";
      parent.appendChild(textarea);
    };
    const resetCanvasWrapper = () => {
      const { left, top, width, height } = getCanvasRect();
      canvasWrapper.style.position = "absolute";
      canvasWrapper.style.overflow = "hidden";
      canvasWrapper.style.top = `${top}px`;
      canvasWrapper.style.left = `${left}px`;
      canvasWrapper.style.width = `${width}px`;
      canvasWrapper.style.height = `${height}px`;
    };
    const maskClickEvent = () => {
      hideTextArea();
    };
    const textareaClickEvent = (e) => {
      e.stopPropagation();
    };
    const textareaInputEvent = () => {
      if (activeElem && activePosition) {
        activeElem.detail.text = textarea.innerText || "";
        eventHub.trigger(coreEventKeys.TEXT_CHANGE, {
          element: {
            uuid: activeElem.uuid,
            detail: {
              text: activeElem.detail.text
            }
          },
          position: [...activePosition || []]
        });
        calculator.modifyText(activeElem);
        viewer.drawFrame();
      }
    };
    const textareaBlurEvent = () => {
      if (activeElem && activePosition) {
        activeElem.detail.text = textarea.innerText || "";
        eventHub.trigger(coreEventKeys.TEXT_CHANGE, {
          element: {
            uuid: activeElem.uuid,
            detail: {
              text: activeElem.detail.text
            }
          },
          position: [...activePosition]
        });
        const data = sharer.getActiveStorage("data") || { elements: [] };
        const updateContent = {
          detail: {
            text: activeElem.detail.text
          }
        };
        updateElementInList(activeElem.uuid, updateContent, data.elements);
        eventHub.trigger(coreEventKeys.CHANGE, {
          selectedElements: [
            Object.assign(Object.assign({}, activeElem), { detail: Object.assign(Object.assign({}, activeElem.detail), updateContent.detail) })
          ],
          data,
          type: "modifyElement",
          modifyRecord: {
            type: "modifyElement",
            time: Date.now(),
            content: {
              method: "modifyElement",
              uuid: activeElem.uuid,
              before: {
                "detail.text": originText
              },
              after: {
                "detail.text": activeElem.detail.text
              }
            }
          }
        });
        calculator.modifyText(activeElem);
        viewer.drawFrame();
      }
      hideTextArea();
    };
    const textareaKeyDownEvent = (e) => {
      e.stopPropagation();
    };
    const textareaKeyPressEvent = (e) => {
      e.stopPropagation();
    };
    const textareaKeyUpEvent = (e) => {
      e.stopPropagation();
    };
    const textareaWheelEvent = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    mask.addEventListener("click", maskClickEvent);
    textarea.addEventListener("click", textareaClickEvent);
    textarea.addEventListener("input", textareaInputEvent);
    textarea.addEventListener("blur", textareaBlurEvent);
    textarea.addEventListener("keydown", textareaKeyDownEvent);
    textarea.addEventListener("keypress", textareaKeyPressEvent);
    textarea.addEventListener("keyup", textareaKeyUpEvent);
    textarea.addEventListener("wheel", textareaWheelEvent);
    const textEditCallback = (e) => {
      var _a;
      if ((e === null || e === void 0 ? void 0 : e.position) && (e === null || e === void 0 ? void 0 : e.element) && ((_a = e === null || e === void 0 ? void 0 : e.element) === null || _a === void 0 ? void 0 : _a.type) === "text") {
        activeElem = e.element;
        activePosition = e.position;
      }
      showTextArea(e);
    };
    return {
      name: "@middleware/text-editor",
      use() {
        eventHub.on(coreEventKeys.TEXT_EDIT, textEditCallback);
      },
      disuse() {
        eventHub.off(coreEventKeys.TEXT_EDIT, textEditCallback);
        mask.removeEventListener("click", maskClickEvent);
        textarea.removeEventListener("click", textareaClickEvent);
        textarea.removeEventListener("input", textareaInputEvent);
        textarea.removeEventListener("blur", textareaBlurEvent);
        textarea.removeEventListener("keydown", textareaKeyDownEvent);
        textarea.removeEventListener("keypress", textareaKeyPressEvent);
        textarea.removeEventListener("keyup", textareaKeyUpEvent);
        textarea.removeEventListener("wheel", textareaWheelEvent);
        canvasWrapper.removeChild(textarea);
        mask.removeChild(canvasWrapper);
        container.removeChild(mask);
        textarea.remove();
        canvasWrapper.remove();
        mask = null;
        textarea = null;
        canvasWrapper = null;
        mask = null;
        activeElem = null;
        activePosition = null;
        originText = null;
      }
    };
  };
  const key = "DRAG";
  const keyPrevPoint = Symbol(`${key}_prevPoint`);
  const MiddlewareDragger = (opts) => {
    const { eventHub, sharer, viewer } = opts;
    let isDragging = false;
    return {
      name: "@middleware/dragger",
      hover() {
        if (isDragging === true) {
          return;
        }
        eventHub.trigger(coreEventKeys.CURSOR, {
          type: "drag-default"
        });
      },
      pointStart(e) {
        const { point } = e;
        sharer.setSharedStorage(keyPrevPoint, point);
        isDragging = true;
        eventHub.trigger(coreEventKeys.CURSOR, {
          type: "drag-active"
        });
      },
      pointMove(e) {
        const { point } = e;
        const prevPoint = sharer.getSharedStorage(keyPrevPoint);
        if (point && prevPoint) {
          const moveX = point.x - prevPoint.x;
          const moveY = point.y - prevPoint.y;
          viewer.scroll({ moveX, moveY });
          viewer.drawFrame();
        }
        sharer.setSharedStorage(keyPrevPoint, point);
      },
      pointEnd() {
        isDragging = false;
        sharer.setSharedStorage(keyPrevPoint, null);
        eventHub.trigger(coreEventKeys.CURSOR, {
          type: "drag-default"
        });
      }
    };
  };
  const MiddlewarePointer = (opts) => {
    const { boardContent, eventHub, sharer } = opts;
    const canvas = boardContent.boardContext.canvas;
    const container = opts.container || document.body;
    const id = `idraw-middleware-pointer-${Math.random().toString(26).substring(2)}`;
    const getCanvasRect = () => {
      const clientRect = canvas.getBoundingClientRect();
      const { left, top, width, height } = clientRect;
      return { left, top, width, height };
    };
    let contextMenuPointer = document.createElement("div");
    return {
      name: "@middleware/pointer",
      use() {
        contextMenuPointer.setAttribute("id", id);
        contextMenuPointer.style.position = "fixed";
        contextMenuPointer.style.top = "0";
        contextMenuPointer.style.bottom = "unset";
        contextMenuPointer.style.left = "0";
        contextMenuPointer.style.right = "unset";
        container.appendChild(contextMenuPointer);
      },
      disuse() {
        container.removeChild(contextMenuPointer);
        contextMenuPointer.remove();
        contextMenuPointer = null;
      },
      contextMenu(e) {
        const { point } = e;
        const { left, top } = getCanvasRect();
        contextMenuPointer.style.left = `${left + point.x}px`;
        contextMenuPointer.style.top = `${top + point.y}px`;
        const selectedElements = sharer.getSharedStorage(keySelectedElementList);
        eventHub.trigger(coreEventKeys.CONTEXT_MENU, {
          pointerContainer: contextMenuPointer,
          selectedElements: selectedElements || []
        });
      }
    };
  };
  var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __rest = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  var _Core_instances, _Core_board, _Core_canvas, _Core_container, _Core_initContainer, _Core_resetData;
  class Core {
    constructor(container, opts) {
      _Core_instances.add(this);
      _Core_board.set(this, void 0);
      _Core_canvas.set(this, void 0);
      _Core_container.set(this, void 0);
      const { devicePixelRatio = 1, width, height, disableWatcher = false } = opts;
      __classPrivateFieldSet(this, _Core_container, container, "f");
      const canvas = document.createElement("canvas");
      canvas.setAttribute("tabindex", "0");
      __classPrivateFieldSet(this, _Core_canvas, canvas, "f");
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_initContainer).call(this);
      container.appendChild(canvas);
      const boardContent = createBoardContent(canvas, { width, height, devicePixelRatio });
      const board = new Board({ boardContent, container, disableWatcher });
      const sharer = board.getSharer();
      sharer.setActiveViewSizeInfo({
        width,
        height,
        devicePixelRatio,
        contextWidth: width,
        contextHeight: height
      });
      __classPrivateFieldSet(this, _Core_board, board, "f");
      this.resize(sharer.getActiveViewSizeInfo());
      const eventHub = board.getEventHub();
      new Cursor(container, {
        eventHub
      });
    }
    isDestroyed() {
      return __classPrivateFieldGet(this, _Core_board, "f").isDestroyed();
    }
    destroy() {
      __classPrivateFieldGet(this, _Core_board, "f").destroy();
      __classPrivateFieldGet(this, _Core_canvas, "f").remove();
    }
    use(middleware, config) {
      __classPrivateFieldGet(this, _Core_board, "f").use(middleware, config);
    }
    disuse(middleware) {
      __classPrivateFieldGet(this, _Core_board, "f").disuse(middleware);
    }
    resetMiddlewareConfig(middleware, config) {
      __classPrivateFieldGet(this, _Core_board, "f").resetMiddlewareConfig(middleware, config);
    }
    setData(data) {
      const loader = __classPrivateFieldGet(this, _Core_board, "f").getRenderer().getLoader();
      loader.reset();
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
    }
    getData() {
      return __classPrivateFieldGet(this, _Core_board, "f").getData();
    }
    scale(opts) {
      __classPrivateFieldGet(this, _Core_board, "f").scale(opts);
      const viewer = __classPrivateFieldGet(this, _Core_board, "f").getViewer();
      viewer.drawFrame();
    }
    resize(newViewSize) {
      const board = __classPrivateFieldGet(this, _Core_board, "f");
      const sharer = board.getSharer();
      const viewSizeInfo = sharer.getActiveViewSizeInfo();
      board.resize(Object.assign(Object.assign({}, viewSizeInfo), newViewSize));
    }
    clear() {
      __classPrivateFieldGet(this, _Core_board, "f").clear();
    }
    on(name, callback) {
      const eventHub = __classPrivateFieldGet(this, _Core_board, "f").getEventHub();
      eventHub.on(name, callback);
    }
    off(name, callback) {
      const eventHub = __classPrivateFieldGet(this, _Core_board, "f").getEventHub();
      eventHub.off(name, callback);
    }
    trigger(name, e) {
      const eventHub = __classPrivateFieldGet(this, _Core_board, "f").getEventHub();
      eventHub.trigger(name, e);
    }
    getViewInfo() {
      const board = __classPrivateFieldGet(this, _Core_board, "f");
      const sharer = board.getSharer();
      const viewSizeInfo = sharer.getActiveViewSizeInfo();
      const viewScaleInfo = sharer.getActiveViewScaleInfo();
      return {
        viewSizeInfo,
        viewScaleInfo
      };
    }
    refresh() {
      __classPrivateFieldGet(this, _Core_board, "f").getViewer().drawFrame();
    }
    forceRender() {
      const renderer = __classPrivateFieldGet(this, _Core_board, "f").getRenderer();
      const calculator = renderer.getCalculator();
      const loader = renderer.getLoader();
      const data = this.getData();
      if (data) {
        const { viewScaleInfo, viewSizeInfo } = this.getViewInfo();
        calculator.resetVirtualFlatItemMap(data, {
          viewScaleInfo,
          viewSizeInfo
        });
      }
      loader.reset();
      this.refresh();
    }
    setViewScale(opts) {
      __classPrivateFieldGet(this, _Core_board, "f").updateViewScaleInfo(opts);
    }
    getLoadItemMap() {
      return __classPrivateFieldGet(this, _Core_board, "f").getRenderer().getLoadItemMap();
    }
    onBoardWatcherEvents() {
      __classPrivateFieldGet(this, _Core_board, "f").onWatcherEvents();
    }
    offBoardWatcherEvents() {
      __classPrivateFieldGet(this, _Core_board, "f").offWatcherEvents();
    }
    createElement(type, element, opts) {
      const { viewScaleInfo, viewSizeInfo } = this.getViewInfo();
      return createElement$1(type, element || {}, (opts === null || opts === void 0 ? void 0 : opts.viewCenter) === true ? {
        viewScaleInfo,
        viewSizeInfo
      } : void 0);
    }
    updateElement(element) {
      const data = this.getData() || { elements: [] };
      const uuid = element.uuid;
      const position = getElementPositionFromList(uuid, data.elements);
      const beforeElem = findElementFromListByPosition(position, data.elements);
      if (!beforeElem) {
        return null;
      }
      const before = toFlattenElement(beforeElem);
      const updatedElement = updateElementInListByPosition(position, element, data.elements, { strict: true });
      const after = toFlattenElement(updatedElement);
      const loader = __classPrivateFieldGet(this, _Core_board, "f").getRenderer().getLoader();
      loader.resetElementAsset(element);
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      const modifyRecord = {
        type: "updateElement",
        time: Date.now(),
        content: { method: "updateElement", uuid, before, after }
      };
      return modifyRecord;
    }
    modifyElement(element) {
      const { uuid } = element, restElement = __rest(element, ["uuid"]);
      const data = this.getData() || { elements: [] };
      const position = getElementPositionFromList(uuid, data.elements);
      const beforeElem = findElementFromListByPosition(position, data.elements);
      if (!beforeElem) {
        return null;
      }
      const modifyRecord = getModifyElementRecord({
        modifiedElement: element,
        beforeElement: beforeElem
      });
      updateElementInListByPosition(position, restElement, data.elements);
      const loader = __classPrivateFieldGet(this, _Core_board, "f").getRenderer().getLoader();
      loader.resetElementAsset(Object.assign(Object.assign({}, element), { type: beforeElem.type }));
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      return modifyRecord;
    }
    modifyElements(elements) {
      const data = this.getData() || { elements: [] };
      let modifyRecord = null;
      const before = [];
      const after = [];
      elements.forEach((element) => {
        const { uuid } = element, restElement = __rest(element, ["uuid"]);
        const position = getElementPositionFromList(uuid, data.elements);
        const beforeElem = findElementFromListByPosition(position, data.elements);
        if (!beforeElem) {
          return null;
        }
        const tempRecord = getModifyElementRecord({
          modifiedElement: element,
          beforeElement: beforeElem
        });
        if (tempRecord.content) {
          before.push(Object.assign(Object.assign({}, tempRecord.content.before), { uuid }));
          after.push(Object.assign(Object.assign({}, tempRecord.content.after), { uuid }));
        }
        updateElementInListByPosition(position, restElement, data.elements);
      });
      modifyRecord = {
        type: "modifyElements",
        time: Date.now(),
        content: {
          method: "modifyElements",
          before,
          after
        }
      };
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      return modifyRecord;
    }
    addElement(element, opts) {
      var _a;
      const data = this.getData() || { elements: [] };
      if (!opts || !((_a = opts === null || opts === void 0 ? void 0 : opts.position) === null || _a === void 0 ? void 0 : _a.length)) {
        data.elements.push(element);
      } else if (opts === null || opts === void 0 ? void 0 : opts.position) {
        const position2 = [...(opts === null || opts === void 0 ? void 0 : opts.position) || []];
        insertElementToListByPosition(element, position2, data.elements);
      }
      const position = getElementPositionFromList(element.uuid, data.elements);
      const modifyRecord = {
        type: "addElement",
        time: Date.now(),
        content: { method: "addElement", uuid: element.uuid, position, element: deepClone(element) }
      };
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      return modifyRecord;
    }
    deleteElement(uuid) {
      const data = this.getData() || { elements: [] };
      const position = getElementPositionFromList(uuid, data.elements);
      const element = findElementFromListByPosition(position, data.elements);
      const modifyRecord = {
        type: "deleteElement",
        time: Date.now(),
        content: { method: "deleteElement", uuid, position, element: element ? deepClone(element) : null }
      };
      if (element) {
        const loader = __classPrivateFieldGet(this, _Core_board, "f").getRenderer().getLoader();
        loader.resetElementAsset(element);
      }
      deleteElementInList(uuid, data.elements);
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      return modifyRecord;
    }
    moveElement(uuid, to) {
      const data = this.getData() || { elements: [] };
      const from = getElementPositionFromList(uuid, data.elements);
      const modifyRecord = {
        type: "moveElement",
        time: Date.now(),
        content: { method: "moveElement", uuid, from: [...from], to: [...to] }
      };
      const { elements: list } = moveElementPosition(data.elements, { from, to });
      data.elements = list;
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      return modifyRecord;
    }
    modifyLayout(layout) {
      const data = this.getData() || { elements: [] };
      const modifyRecord = {
        type: "modifyLayout",
        time: Date.now(),
        content: {
          method: "modifyLayout",
          before: null,
          after: null
        }
      };
      if (layout === null) {
        if (data.layout) {
          modifyRecord.content.before = toFlattenLayout(data.layout);
          delete data["layout"];
          __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
          this.refresh();
          return modifyRecord;
        } else {
          return modifyRecord;
        }
      }
      const beforeLayout = data.layout;
      let before = {};
      const after = toFlattenLayout(layout);
      if (data.layout) {
        Object.keys(after).forEach((key2) => {
          let val = get(beforeLayout, key2);
          if (val === void 0 && /(borderRadius|borderWidth)\[[0-9]{1,}\]$/.test(key2)) {
            key2 = key2.replace(/\[[0-9]{1,}\]$/, "");
            val = get(beforeLayout, key2);
          }
          before[key2] = val;
        });
        before = toFlattenLayout(before);
        modifyRecord.content.before = before;
      } else {
        data.layout = {};
      }
      modifyRecord.content.after = after;
      mergeLayout(data.layout, layout);
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      return modifyRecord;
    }
    modifyGlobal(global) {
      const data = this.getData() || { elements: [] };
      const modifyRecord = {
        type: "modifyGlobal",
        time: Date.now(),
        content: {
          method: "modifyGlobal",
          before: null,
          after: null
        }
      };
      if (global === null) {
        if (data.global) {
          modifyRecord.content.before = toFlattenGlobal(data.global);
          delete data["global"];
          __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
          this.refresh();
          return modifyRecord;
        } else {
          return modifyRecord;
        }
      }
      const beforeGlobal = data.global;
      let before = {};
      const after = toFlattenGlobal(global);
      if (data.global) {
        Object.keys(after).forEach((key2) => {
          before[key2] = get(beforeGlobal, key2);
        });
        before = toFlattenGlobal(before);
        modifyRecord.content.before = before;
      } else {
        data.global = {};
      }
      modifyRecord.content.after = after;
      mergeGlobal(data.global, global);
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_resetData).call(this, data);
      this.refresh();
      return modifyRecord;
    }
  }
  _Core_board = /* @__PURE__ */ new WeakMap(), _Core_canvas = /* @__PURE__ */ new WeakMap(), _Core_container = /* @__PURE__ */ new WeakMap(), _Core_instances = /* @__PURE__ */ new WeakSet(), _Core_initContainer = function _Core_initContainer2() {
    const container = __classPrivateFieldGet(this, _Core_container, "f");
    container.style.position = "relative";
  }, _Core_resetData = function _Core_resetData2(data) {
    validateElements((data === null || data === void 0 ? void 0 : data.elements) || []);
    __classPrivateFieldGet(this, _Core_board, "f").setData(data);
  };
  const defaultMode = "select";
  const defaultSettings = {
    mode: defaultMode,
    history: false
  };
  const defaultOptions = {
    devicePixelRatio: window.devicePixelRatio
  };
  function getDefaultStorage() {
    const storage = {
      mode: defaultMode,
      enableRuler: false,
      enableScale: false,
      enableScroll: false,
      enableSelect: false,
      enableTextEdit: false,
      enableDrag: false,
      enableInfo: false,
      middlewareStyles: {
        selector: {},
        info: {},
        ruler: {},
        scroller: {},
        layoutSelector: {}
      }
    };
    return storage;
  }
  function parseSettings(opts) {
    const { mode, styles } = opts;
    const settings = {};
    if (istype.string(mode)) {
      settings.mode = mode;
    }
    if (styles) {
      settings.styles = parseStrictStyles(opts);
    }
    return settings;
  }
  function parseStrictStyles(settings) {
    const styles = parseStyles(settings);
    const strictStyles = {};
    const { selector, info, ruler, scroller, layoutSelector } = styles;
    if (Object.keys(selector).length > 0) {
      strictStyles.selector = selector;
    }
    if (Object.keys(info).length > 0) {
      strictStyles.info = info;
    }
    if (Object.keys(ruler).length > 0) {
      strictStyles.ruler = ruler;
    }
    if (Object.keys(scroller).length > 0) {
      strictStyles.scroller = scroller;
    }
    if (Object.keys(layoutSelector).length > 0) {
      strictStyles.layoutSelector = layoutSelector;
    }
    return strictStyles;
  }
  function parseStyles(settings) {
    const styles = {
      selector: {},
      ruler: {},
      info: {},
      scroller: {},
      layoutSelector: {}
    };
    if (settings.styles) {
      const { selector, info, ruler, scroller, layoutSelector } = settings.styles;
      if (istype.string(selector == null ? void 0 : selector.activeColor)) {
        styles.selector.activeColor = selector == null ? void 0 : selector.activeColor;
      }
      if (istype.string(selector == null ? void 0 : selector.activeAreaColor)) {
        styles.selector.activeAreaColor = selector == null ? void 0 : selector.activeAreaColor;
      }
      if (istype.string(selector == null ? void 0 : selector.lockedColor)) {
        styles.selector.lockedColor = selector == null ? void 0 : selector.lockedColor;
      }
      if (istype.string(selector == null ? void 0 : selector.referenceColor)) {
        styles.selector.referenceColor = selector == null ? void 0 : selector.referenceColor;
      }
      if (istype.string(info == null ? void 0 : info.textBackground)) {
        styles.info.textBackground = info == null ? void 0 : info.textBackground;
      }
      if (istype.string(info == null ? void 0 : info.textColor)) {
        styles.info.textColor = info == null ? void 0 : info.textColor;
      }
      if (istype.string(ruler == null ? void 0 : ruler.background)) {
        styles.ruler.background = ruler == null ? void 0 : ruler.background;
      }
      if (istype.string(ruler == null ? void 0 : ruler.borderColor)) {
        styles.ruler.borderColor = ruler == null ? void 0 : ruler.borderColor;
      }
      if (istype.string(ruler == null ? void 0 : ruler.scaleColor)) {
        styles.ruler.scaleColor = ruler == null ? void 0 : ruler.scaleColor;
      }
      if (istype.string(ruler == null ? void 0 : ruler.textColor)) {
        styles.ruler.textColor = ruler == null ? void 0 : ruler.textColor;
      }
      if (istype.string(ruler == null ? void 0 : ruler.gridColor)) {
        styles.ruler.gridColor = ruler == null ? void 0 : ruler.gridColor;
      }
      if (istype.string(ruler == null ? void 0 : ruler.gridPrimaryColor)) {
        styles.ruler.gridPrimaryColor = ruler == null ? void 0 : ruler.gridPrimaryColor;
      }
      if (istype.string(ruler == null ? void 0 : ruler.selectedAreaColor)) {
        styles.ruler.selectedAreaColor = ruler == null ? void 0 : ruler.selectedAreaColor;
      }
      if (istype.string(scroller == null ? void 0 : scroller.thumbBackground)) {
        styles.scroller.thumbBackground = scroller == null ? void 0 : scroller.thumbBackground;
      }
      if (istype.string(scroller == null ? void 0 : scroller.thumbBorderColor)) {
        styles.scroller.thumbBorderColor = scroller == null ? void 0 : scroller.thumbBorderColor;
      }
      if (istype.string(scroller == null ? void 0 : scroller.hoverThumbBackground)) {
        styles.scroller.hoverThumbBackground = scroller == null ? void 0 : scroller.hoverThumbBackground;
      }
      if (istype.string(scroller == null ? void 0 : scroller.hoverThumbBorderColor)) {
        styles.scroller.hoverThumbBorderColor = scroller == null ? void 0 : scroller.hoverThumbBorderColor;
      }
      if (istype.string(scroller == null ? void 0 : scroller.activeThumbBackground)) {
        styles.scroller.activeThumbBackground = scroller == null ? void 0 : scroller.activeThumbBackground;
      }
      if (istype.string(scroller == null ? void 0 : scroller.activeThumbBorderColor)) {
        styles.scroller.activeThumbBorderColor = scroller == null ? void 0 : scroller.activeThumbBorderColor;
      }
      if (istype.string(layoutSelector == null ? void 0 : layoutSelector.activeColor)) {
        styles.layoutSelector.activeColor = layoutSelector == null ? void 0 : layoutSelector.activeColor;
      }
    }
    return styles;
  }
  function isValidMode(mode) {
    return ["select", "drag", "readOnly"].includes(mode);
  }
  function runMiddlewares(core, store) {
    const { enableRuler, enableScale, enableScroll, enableSelect, enableTextEdit, enableDrag, enableInfo } = store.getSnapshot();
    const styles = store.get("middlewareStyles");
    if (enableScroll === true) {
      core.use(MiddlewareScroller, styles == null ? void 0 : styles.scroller);
    } else if (enableScroll === false) {
      core.disuse(MiddlewareScroller);
    }
    if (enableSelect === true) {
      core.use(MiddlewareLayoutSelector, styles == null ? void 0 : styles.layoutSelector);
      core.use(MiddlewareSelector, styles == null ? void 0 : styles.selector);
    } else if (enableSelect === false) {
      core.disuse(MiddlewareLayoutSelector);
      core.disuse(MiddlewareSelector);
    }
    if (enableScale === true) {
      core.use(MiddlewareScaler);
    } else if (enableScale === false) {
      core.disuse(MiddlewareScaler);
    }
    if (enableRuler === true) {
      core.use(MiddlewareRuler, styles == null ? void 0 : styles.ruler);
    } else if (enableRuler === false) {
      core.disuse(MiddlewareRuler);
    }
    if (enableTextEdit === true) {
      core.use(MiddlewareTextEditor);
    } else if (enableTextEdit === false) {
      core.disuse(MiddlewareTextEditor);
    }
    if (enableDrag === true) {
      core.use(MiddlewareDragger);
    } else if (enableDrag === false) {
      core.disuse(MiddlewareDragger);
    }
    if (enableInfo === true) {
      core.use(MiddlewareInfo, styles == null ? void 0 : styles.info);
    } else if (enableInfo === false) {
      core.disuse(MiddlewareInfo);
    }
    core.use(MiddlewarePointer);
  }
  function changeMode(mode, core, store) {
    let enableScale = false;
    let enableScroll = false;
    let enableSelect = false;
    let enableTextEdit = false;
    let enableDrag = false;
    let enableRuler = false;
    let enableInfo = false;
    let innerMode = "select";
    store.set("mode", innerMode);
    if (isValidMode(mode)) {
      innerMode = mode;
    } else {
      console.warn(`${mode} is invalid mode of iDraw.js`);
    }
    if (innerMode === "select") {
      enableScale = true;
      enableScroll = true;
      enableSelect = true;
      enableInfo = true;
      enableTextEdit = true;
      enableDrag = false;
      enableRuler = true;
    } else if (innerMode === "drag") {
      enableScale = true;
      enableScroll = true;
      enableSelect = false;
      enableTextEdit = false;
      enableDrag = true;
      enableRuler = true;
    } else if (innerMode === "readOnly") {
      enableScale = false;
      enableScroll = false;
      enableSelect = false;
      enableTextEdit = false;
      enableDrag = false;
      enableRuler = false;
    }
    store.set("enableScale", enableScale);
    store.set("enableScroll", enableScroll);
    store.set("enableSelect", enableSelect);
    store.set("enableTextEdit", enableTextEdit);
    store.set("enableDrag", enableDrag);
    store.set("enableRuler", enableRuler);
    store.set("enableInfo", enableInfo);
    runMiddlewares(core, store);
  }
  function createElement(depOptions, type, element, opts) {
    const { core } = depOptions;
    return core.createElement(type, element, opts);
  }
  function updateElement(depOptions, element) {
    const { core } = depOptions;
    const modifyRecord = core.updateElement(element);
    if (!modifyRecord) {
      return;
    }
    const data = core.getData();
    if (!data) {
      return;
    }
    core.trigger(coreEventKeys.CHANGE, { data, type: "updateElement", modifyRecord });
  }
  function modifyElement(depOptions, element) {
    const { core } = depOptions;
    const modifyRecord = core.modifyElement(element);
    if (!modifyRecord) {
      return;
    }
    const data = core.getData();
    if (!data) {
      return;
    }
    core.trigger(coreEventKeys.CHANGE, { data, type: "modifyElement", modifyRecord });
  }
  function addElement(depOptions, element, opts) {
    const { core } = depOptions;
    const modifyRecord = core.addElement(element, opts);
    const data = core.getData();
    core.trigger(coreEventKeys.CHANGE, { data, type: "addElement", modifyRecord });
    return data;
  }
  function deleteElement(depOptions, uuid) {
    const { core } = depOptions;
    const modifyRecord = core.deleteElement(uuid);
    const data = core.getData();
    core.trigger(coreEventKeys.CHANGE, { data, type: "deleteElement", modifyRecord });
  }
  function moveElement(depOptions, uuid, to) {
    const { core } = depOptions;
    const modifyRecord = core.moveElement(uuid, to);
    const data = core.getData();
    core.trigger(coreEventKeys.CHANGE, { data, type: "moveElement", modifyRecord });
  }
  function modifyLayout(depOptions, layout) {
    const { core } = depOptions;
    const modifyRecord = core.modifyLayout(layout);
    const data = core.getData();
    core.trigger(coreEventKeys.CHANGE, { data, type: "modifyLayout", modifyRecord });
  }
  function modifyGlobal(depOptions, global) {
    const { core } = depOptions;
    const modifyRecord = core.modifyGlobal(global);
    const data = core.getData();
    core.trigger(coreEventKeys.CHANGE, { data, type: "modifyGlobal", modifyRecord });
  }
  function changeStyles(styles, core, store) {
    const { selector, info, ruler, scroller, layoutSelector } = styles;
    const middlewareStyles = store.get("middlewareStyles");
    if (selector) {
      core.resetMiddlewareConfig(MiddlewareSelector, selector);
      middlewareStyles.selector = { ...middlewareStyles.selector, ...selector };
    }
    if (info) {
      core.resetMiddlewareConfig(MiddlewareInfo, info);
      middlewareStyles.info = { ...middlewareStyles.info, ...info };
    }
    if (ruler) {
      core.resetMiddlewareConfig(MiddlewareRuler, ruler);
      middlewareStyles.ruler = { ...middlewareStyles.ruler, ...ruler };
    }
    if (scroller) {
      core.resetMiddlewareConfig(MiddlewareScroller, scroller);
      middlewareStyles.scroller = { ...middlewareStyles.scroller, ...scroller };
    }
    if (layoutSelector) {
      core.resetMiddlewareConfig(MiddlewareLayoutSelector, layoutSelector);
      middlewareStyles.layoutSelector = { ...middlewareStyles.layoutSelector, ...layoutSelector };
    }
  }
  function reset(depOptions, opts) {
    const { core, store } = depOptions;
    const { mode, styles } = parseSettings(opts);
    let needFresh = false;
    const newOpts = {};
    store.clear();
    if (mode) {
      changeMode(mode, core, store);
      newOpts.mode = mode;
      needFresh = true;
    }
    if (styles) {
      changeStyles(styles, core, store);
      newOpts.styles = styles;
      needFresh = true;
    }
    if (needFresh === true) {
      core.refresh();
    }
    return newOpts;
  }
  function setFeature(depOptions, feat, status) {
    const { core, store } = depOptions;
    if (["ruler", "scroll", "scale", "info"].includes(feat)) {
      const map = {
        ruler: "enableRuler",
        scroll: "enableScroll",
        scale: "enableScale",
        info: "enableInfo"
      };
      store.set(map[feat], !!status);
      runMiddlewares(core, store);
      core.refresh();
    } else if (feat === "selectInGroup") {
      core.trigger(coreEventKeys.SELECT_IN_GROUP, {
        enable: !!status
      });
    } else if (feat === "snapToGrid") {
      core.trigger(coreEventKeys.SNAP_TO_GRID, {
        enable: !!status
      });
    }
  }
  async function exportImageFileBlobURL(opts) {
    const { data, width, height, devicePixelRatio, viewScaleInfo, viewSizeInfo, loadItemMap } = opts;
    let viewContext = createOffscreenContext2D({ width, height, devicePixelRatio });
    let tempContext = createOffscreenContext2D({ width, height, devicePixelRatio });
    let renderer = new Renderer({
      viewContext,
      tempContext
    });
    renderer.setLoadItemMap(loadItemMap);
    renderer.drawData(data, {
      viewScaleInfo,
      viewSizeInfo,
      forceDrawAll: true
    });
    let blobURL = null;
    let offScreenCanvas = viewContext.$getOffscreenCanvas();
    if (offScreenCanvas) {
      const blob = await offScreenCanvas.convertToBlob();
      blobURL = window.URL.createObjectURL(blob);
    }
    offScreenCanvas = null;
    viewContext = null;
    tempContext = null;
    renderer = null;
    return {
      blobURL,
      width,
      height,
      devicePixelRatio
    };
  }
  async function getImageBlobURL(depOptions, opts) {
    const { data, viewSizeInfo, core } = depOptions;
    const { devicePixelRatio } = opts || { devicePixelRatio: 1 };
    const outputSize = calcElementListSize(data.elements);
    return await exportImageFileBlobURL({
      width: outputSize.w,
      height: outputSize.h,
      devicePixelRatio,
      data,
      viewScaleInfo: { scale: 1, offsetLeft: -outputSize.x, offsetTop: -outputSize.y, offsetBottom: 0, offsetRight: 0 },
      viewSizeInfo: {
        ...viewSizeInfo,
        ...{ devicePixelRatio }
      },
      loadItemMap: core.getLoadItemMap()
    });
  }
  const eventKeys = coreEventKeys;
  const supportRecordTypes = [
    "updateElement",
    "modifyElement",
    "deleteElement",
    "moveElement",
    "addElement",
    "dragElement",
    "resizeElement",
    "dragLayout",
    "modifyLayout",
    "modifyGlobal"
  ];
  const LIMIT = 100;
  const useHistory = (opts) => {
    const { core, limit } = opts;
    const historyLimit = limit && limit > 0 ? limit : LIMIT;
    let doRecords = [];
    let undoRecords = [];
    const doAction = (record) => {
      doRecords.push(record);
    };
    const undoAction = () => {
      var _a;
      if ((doRecords == null ? void 0 : doRecords.length) > 0) {
        const record = doRecords.pop();
        if (!record) {
          return;
        }
        let undoRecord = { ...record };
        if (record.content.method === "modifyElement") {
          const info = unflatObject(record.content.before || {});
          undoRecord = core.modifyElement({
            ...info,
            uuid: (_a = record.content) == null ? void 0 : _a.uuid
          });
        } else if (record.content.method === "updateElement") {
          const info = unflatObject(record.content.before || {});
          undoRecord = core.updateElement({ ...info, uuid: record.content.uuid });
        } else if (record.content.method === "addElement") {
          const uuid = record.content.uuid;
          undoRecord = core.deleteElement(uuid);
        } else if (record.content.method === "deleteElement") {
          const { element, position } = record.content;
          if (!element) {
            return;
          }
          if (!element) {
            return;
          }
          undoRecord = core.addElement(element, { position });
        } else if (record.content.method === "moveElement") {
          const uuid = record.content.uuid;
          const moveResult = calcResultMovePosition({
            from: record.content.from,
            to: record.content.to
          });
          if (!moveResult) {
            return;
          }
          undoRecord = core.moveElement(uuid, moveResult.from);
        } else if (record.content.method === "modifyLayout") {
          const info = record.content.before === null ? null : unflatObject(record.content.before || {});
          undoRecord = core.modifyLayout(info);
        } else if (record.content.method === "modifyGlobal") {
          const info = record.content.before === null ? null : unflatObject(record.content.before || {});
          undoRecord = core.modifyGlobal(info);
        } else if (record.content.method === "modifyElements") {
          undoRecord = core.modifyElements(
            record.content.before.forEach((item) => unflatObject(item))
          );
        }
        undoRecord = { ...undoRecord, type: "undo" };
        undoRecords.push(undoRecord);
        if (undoRecords.length > historyLimit) {
          undoRecords.splice(historyLimit - undoRecords.length, undoRecords.length);
        }
      }
    };
    const redoAction = () => {
      if ((undoRecords == null ? void 0 : undoRecords.length) > 0) {
        const record = undoRecords.pop();
        if (!record) {
          return;
        }
        let redoRecord = { ...record };
        if (record.content.method === "modifyElement") {
          const info = unflatObject(record.content.before || {});
          redoRecord = core.modifyElement({
            ...info,
            uuid: record.content.uuid
          });
        } else if (record.content.method === "updateElement") {
          const info = unflatObject(record.content.before || {});
          redoRecord = core.updateElement({ ...info, uuid: record.content.uuid });
        } else if (record.content.method === "addElement") {
          const uuid = record.content.uuid;
          redoRecord = core.deleteElement(uuid);
        } else if (record.content.method === "deleteElement") {
          const { element, position } = record.content;
          if (!element) {
            return;
          }
          redoRecord = core.addElement(element, { position });
        } else if (record.content.method === "moveElement") {
          const uuid = record.content.uuid;
          const moveResult = calcResultMovePosition({
            from: record.content.from,
            to: record.content.to
          });
          if (!moveResult) {
            return;
          }
          redoRecord = core.moveElement(uuid, moveResult.from);
        } else if (record.content.method === "modifyLayout") {
          const info = record.content.before === null ? null : unflatObject(record.content.before || {});
          redoRecord = core.modifyLayout(info);
        } else if (record.content.method === "modifyGlobal") {
          const info = record.content.before === null ? null : unflatObject(record.content.before || {});
          redoRecord = core.modifyGlobal(info);
        } else if (record.content.method === "modifyElements") {
          redoRecord = core.modifyElements(
            record.content.before.forEach((item) => unflatObject(item))
          );
        }
        redoRecord = { ...redoRecord, type: "redo" };
        doRecords.push(redoRecord);
        if (doRecords.length > historyLimit) {
          doRecords.splice(historyLimit - doRecords.length, doRecords.length);
        }
      }
    };
    const MiddlewareHistory = (opts2) => {
      const { eventHub } = opts2;
      const changeEvent = (e) => {
        const { modifyRecord } = e;
        if (modifyRecord && supportRecordTypes.includes(modifyRecord == null ? void 0 : modifyRecord.type)) {
          doAction(modifyRecord);
        }
      };
      const onEvents = () => {
        eventHub.on(eventKeys.CHANGE, changeEvent);
      };
      const offEvents = () => {
        eventHub.off(eventKeys.CHANGE, changeEvent);
      };
      return {
        name: "@middleware/history",
        use() {
          onEvents();
        },
        disuse() {
          offEvents();
        }
      };
    };
    const destroy = () => {
      clear();
      doRecords = null;
      undoRecords = null;
    };
    const clear = () => {
      while ((doRecords == null ? void 0 : doRecords.length) > 0) {
        doRecords.pop();
      }
      while ((undoRecords == null ? void 0 : undoRecords.length) > 0) {
        undoRecords.pop();
      }
    };
    const getDoRecords = () => doRecords;
    const getUndoRecords = () => undoRecords;
    const historyHandler = {
      undo: undoAction,
      redo: redoAction,
      destroy,
      clear,
      canUndo: () => doRecords.length > 0,
      canRedo: () => undoRecords.length > 0,
      __getDoRecords: getDoRecords,
      __getUndoRecords: getUndoRecords
    };
    return {
      MiddlewareHistory,
      historyHandler
    };
  };
  class iDraw2 {
    constructor(mount, options) {
      __privateAdd(this, _iDraw_instances);
      __privateAdd(this, _core);
      __privateAdd(this, _opts);
      __privateAdd(this, _store, new Store({
        defaultStorage: getDefaultStorage()
      }));
      __privateAdd(this, _historyHandler, null);
      const opts = { ...defaultSettings, ...defaultOptions, ...options };
      __privateGet(this, _store).set("middlewareStyles", parseStyles(opts));
      const { width, height, devicePixelRatio } = opts;
      const core = new Core(mount, { width, height, devicePixelRatio });
      __privateSet(this, _core, core);
      __privateSet(this, _opts, opts);
      __privateMethod(this, _iDraw_instances, init_fn).call(this);
    }
    use(middleware, config) {
      __privateGet(this, _core).use(middleware, config);
    }
    disuse(middleware) {
      __privateGet(this, _core).disuse(middleware);
    }
    reset(opts) {
      const newOpts = reset({ core: __privateGet(this, _core), store: __privateGet(this, _store) }, opts);
      __privateSet(this, _opts, { ...__privateGet(this, _opts), ...newOpts });
    }
    setMode(mode) {
      const core = __privateGet(this, _core);
      const store = __privateGet(this, _store);
      changeMode(mode || defaultMode, core, store);
      core.refresh();
    }
    enable(feat) {
      __privateMethod(this, _iDraw_instances, setFeature_fn).call(this, feat, true);
    }
    disable(feat) {
      __privateMethod(this, _iDraw_instances, setFeature_fn).call(this, feat, false);
    }
    setData(data) {
      const core = __privateGet(this, _core);
      core.setData(data);
      core.trigger(coreEventKeys.CHANGE, { data, type: "setData" });
    }
    getData(opts) {
      const data = __privateGet(this, _core).getData();
      if (data && (opts == null ? void 0 : opts.compact) === true) {
        return filterCompactData(data, {
          loadItemMap: __privateGet(this, _core).getLoadItemMap()
        });
      }
      return data;
    }
    getViewInfo() {
      return __privateGet(this, _core).getViewInfo();
    }
    scale(opts) {
      __privateGet(this, _core).scale(opts);
    }
    setViewScale(opts) {
      const core = __privateGet(this, _core);
      core.setViewScale(opts);
      core.refresh();
    }
    centerContent(opts) {
      const data = (opts == null ? void 0 : opts.data) || __privateGet(this, _core).getData();
      const { viewSizeInfo } = this.getViewInfo();
      if ((data == null ? void 0 : data.layout) || Array.isArray(data == null ? void 0 : data.elements) && (data == null ? void 0 : data.elements.length) > 0) {
        const result = calcViewCenterContent(data, { viewSizeInfo });
        this.setViewScale(result);
      }
    }
    resize(opts) {
      __privateGet(this, _core).resize(opts);
    }
    on(name, callback) {
      __privateGet(this, _core).on(name, callback);
    }
    off(name, callback) {
      __privateGet(this, _core).off(name, callback);
    }
    trigger(name, e) {
      __privateGet(this, _core).trigger(name, e);
    }
    selectElement(uuid, opts) {
      this.trigger(coreEventKeys.SELECT, { uuids: [uuid], type: (opts == null ? void 0 : opts.type) || "selectElement" });
    }
    selectElements(uuids, opts) {
      this.trigger(coreEventKeys.SELECT, { uuids, type: (opts == null ? void 0 : opts.type) || "selectElements" });
    }
    selectElementByPosition(position, opts) {
      this.trigger(coreEventKeys.SELECT, { positions: [position], type: (opts == null ? void 0 : opts.type) || "selectElementByPosition" });
    }
    selectElementsByPositions(positions, opts) {
      this.trigger(coreEventKeys.SELECT, { positions, type: (opts == null ? void 0 : opts.type) || "selectElementsByPositions" });
    }
    cancelElements() {
      this.trigger(coreEventKeys.CLEAR_SELECT, { uuids: [] });
    }
    createElement(type, element, opts) {
      return createElement({ core: __privateGet(this, _core) }, type, element, opts);
    }
    updateElement(element) {
      return updateElement({ core: __privateGet(this, _core) }, element);
    }
    modifyElement(element) {
      return modifyElement({ core: __privateGet(this, _core) }, element);
    }
    addElement(element, opts) {
      return addElement({ core: __privateGet(this, _core) }, element, opts);
    }
    deleteElement(uuid) {
      return deleteElement({ core: __privateGet(this, _core) }, uuid);
    }
    moveElement(uuid, to) {
      return moveElement({ core: __privateGet(this, _core) }, uuid, to);
    }
    modifyLayout(layout) {
      return modifyLayout({ core: __privateGet(this, _core) }, layout);
    }
    modifyGlobal(global) {
      return modifyGlobal({ core: __privateGet(this, _core) }, global);
    }
    async getImageBlobURL(opts) {
      const data = this.getData() || { elements: [] };
      const { viewSizeInfo } = this.getViewInfo();
      return await getImageBlobURL({ data, viewSizeInfo, core: __privateGet(this, _core) }, opts);
    }
    isDestroyed() {
      return __privateGet(this, _core).isDestroyed();
    }
    destroy() {
      var _a;
      __privateGet(this, _core).destroy();
      __privateGet(this, _store).destroy();
      (_a = __privateGet(this, _historyHandler)) == null ? void 0 : _a.destroy();
      __privateSet(this, _core, null);
      __privateSet(this, _store, null);
      __privateSet(this, _historyHandler, null);
    }
    getViewCenter() {
      const { viewScaleInfo, viewSizeInfo } = this.getViewInfo();
      const pointSize = calcViewCenter({ viewScaleInfo, viewSizeInfo });
      return pointSize;
    }
    getCore() {
      return __privateGet(this, _core);
    }
    forceRender() {
      return __privateGet(this, _core).forceRender();
    }
    // getHistoryHandler() {
    //   return this.#historyHandler;
    // }
    // redo() {
    //   this.#historyHandler?.redo();
    // }
    // undo() {
    //   this.#historyHandler?.undo();
    // }
  }
  _core = new WeakMap();
  _opts = new WeakMap();
  _store = new WeakMap();
  _historyHandler = new WeakMap();
  _iDraw_instances = new WeakSet();
  init_fn = function() {
    const core = __privateGet(this, _core);
    const store = __privateGet(this, _store);
    if (__privateGet(this, _opts).history === true) {
      const { historyLimit } = __privateGet(this, _opts);
      const { historyHandler, MiddlewareHistory } = useHistory({ core, limit: historyLimit });
      __privateSet(this, _historyHandler, historyHandler);
      core.use(MiddlewareHistory);
    }
    changeMode("select", core, store);
  };
  setFeature_fn = function(feat, status) {
    return setFeature({ core: __privateGet(this, _core), store: __privateGet(this, _store) }, feat, status);
  };
  exports.Board = Board;
  exports.Calculator = Calculator;
  exports.Context2D = Context2D;
  exports.Core = Core;
  exports.EventEmitter = EventEmitter;
  exports.MiddlewareRuler = MiddlewareRuler;
  exports.MiddlewareScaler = MiddlewareScaler;
  exports.MiddlewareScroller = MiddlewareScroller;
  exports.MiddlewareSelector = MiddlewareSelector;
  exports.MiddlewareTextEditor = MiddlewareTextEditor;
  exports.Renderer = Renderer;
  exports.Sharer = Sharer;
  exports.Store = Store;
  exports.calcDistance = calcDistance;
  exports.calcElementCenter = calcElementCenter;
  exports.calcElementCenterFromVertexes = calcElementCenterFromVertexes;
  exports.calcElementListSize = calcElementListSize;
  exports.calcElementOriginRectInfo = calcElementOriginRectInfo;
  exports.calcElementQueueVertexesQueueInGroup = calcElementQueueVertexesQueueInGroup;
  exports.calcElementSizeController = calcElementSizeController;
  exports.calcElementVertexesInGroup = calcElementVertexesInGroup;
  exports.calcElementVertexesQueueInGroup = calcElementVertexesQueueInGroup;
  exports.calcElementViewRectInfo = calcElementViewRectInfo;
  exports.calcElementsContextSize = calcElementsContextSize;
  exports.calcElementsViewInfo = calcElementsViewInfo;
  exports.calcPointMoveElementInGroup = calcPointMoveElementInGroup;
  exports.calcResultMovePosition = calcResultMovePosition;
  exports.calcRevertMovePosition = calcRevertMovePosition;
  exports.calcSpeed = calcSpeed;
  exports.calcViewBoxSize = calcViewBoxSize;
  exports.calcViewCenter = calcViewCenter;
  exports.calcViewCenterContent = calcViewCenterContent;
  exports.calcViewElementSize = calcViewElementSize;
  exports.calcViewPointSize = calcViewPointSize;
  exports.calcViewVertexes = calcViewVertexes;
  exports.check = check;
  exports.checkRectIntersect = checkRectIntersect;
  exports.colorNameToHex = colorNameToHex;
  exports.colorToCSS = colorToCSS;
  exports.colorToLinearGradientCSS = colorToLinearGradientCSS;
  exports.compose = compose;
  exports.compressImage = compressImage;
  exports.coreEventKeys = coreEventKeys;
  exports.createAssetId = createAssetId;
  exports.createBoardContent = createBoardContent;
  exports.createContext2D = createContext2D;
  exports.createElement = createElement$1;
  exports.createOffscreenContext2D = createOffscreenContext2D;
  exports.createUUID = createUUID;
  exports.debounce = debounce;
  exports.deepClone = deepClone;
  exports.deepCloneData = deepCloneData;
  exports.deepCloneElement = deepCloneElement;
  exports.delay = delay;
  exports.deleteElementInList = deleteElementInList;
  exports.deleteElementInListByPosition = deleteElementInListByPosition;
  exports.downloadFileFromText = downloadFileFromText;
  exports.downloadImageFromCanvas = downloadImageFromCanvas;
  exports.equalPoint = equalPoint;
  exports.equalTouchPoint = equalTouchPoint;
  exports.eventKeys = eventKeys;
  exports.filterElementAsset = filterElementAsset;
  exports.findElementFromList = findElementFromList;
  exports.findElementFromListByPosition = findElementFromListByPosition;
  exports.findElementQueueFromListByPosition = findElementQueueFromListByPosition;
  exports.findElementsFromList = findElementsFromList;
  exports.findElementsFromListByPositions = findElementsFromListByPositions;
  exports.flatElementList = flatElementList;
  exports.flatObject = flatObject;
  exports.formatNumber = formatNumber;
  exports.generateHTML = generateHTML;
  exports.generateSVGPath = generateSVGPath;
  exports.get = get;
  exports.getCenterFromTwoPoints = getCenterFromTwoPoints;
  exports.getDefaultElementDetailConfig = getDefaultElementDetailConfig;
  exports.getElemenetsAssetIds = getElemenetsAssetIds;
  exports.getElementPositionFromList = getElementPositionFromList;
  exports.getElementPositionMapFromList = getElementPositionMapFromList;
  exports.getElementRotateVertexes = getElementRotateVertexes;
  exports.getElementSize = getElementSize;
  exports.getElementVertexes = getElementVertexes;
  exports.getGroupQueueFromList = getGroupQueueFromList;
  exports.getSelectedElementUUIDs = getSelectedElementUUIDs;
  exports.getViewPointAtElement = getViewPointAtElement;
  exports.getViewScaleInfoFromSnapshot = getViewScaleInfoFromSnapshot;
  exports.getViewSizeInfoFromSnapshot = getViewSizeInfoFromSnapshot;
  exports.iDraw = iDraw2;
  exports.insertElementToListByPosition = insertElementToListByPosition;
  exports.is = is;
  exports.isAssetId = isAssetId;
  exports.isColorStr = isColorStr;
  exports.isElementInView = isElementInView;
  exports.isResourceElement = isResourceElement;
  exports.isViewPointInElement = isViewPointInElement;
  exports.istype = istype;
  exports.limitAngle = limitAngle;
  exports.loadHTML = loadHTML;
  exports.loadImage = loadImage;
  exports.loadSVG = loadSVG;
  exports.matrixToAngle = matrixToAngle;
  exports.matrixToRadian = matrixToRadian;
  exports.merge = merge;
  exports.mergeElement = mergeElement;
  exports.mergeElementAsset = mergeElementAsset;
  exports.mergeHexColorAlpha = mergeHexColorAlpha;
  exports.moveElementPosition = moveElementPosition;
  exports.omit = omit;
  exports.parseAngleToRadian = parseAngleToRadian;
  exports.parseFileToBase64 = parseFileToBase64;
  exports.parseFileToText = parseFileToText;
  exports.parseHTML = parseHTML;
  exports.parseRadianToAngle = parseRadianToAngle;
  exports.parseSVGPath = parseSVGPath;
  exports.pickFile = pickFile;
  exports.rotateElement = rotateElement$1;
  exports.rotateElementVertexes = rotateElementVertexes;
  exports.rotatePoint = rotatePoint;
  exports.rotatePointInGroup = rotatePointInGroup;
  exports.rotateVertexes = rotateVertexes;
  exports.set = set;
  exports.sortDataAsserts = sortDataAsserts;
  exports.throttle = throttle;
  exports.toColorHexNum = toColorHexNum;
  exports.toColorHexStr = toColorHexStr;
  exports.toFlattenElement = toFlattenElement;
  exports.toFlattenGlobal = toFlattenGlobal;
  exports.toFlattenLayout = toFlattenLayout;
  exports.unflatObject = unflatObject;
  exports.updateElementInList = updateElementInList;
  exports.useHistory = useHistory;
  exports.vaildPoint = vaildPoint;
  exports.vaildTouchPoint = vaildTouchPoint;
  exports.validateElements = validateElements;
  exports.viewScale = viewScale;
  exports.viewScroll = viewScroll;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
