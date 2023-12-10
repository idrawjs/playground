var iDraw = function(exports) {
  "use strict";var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

  var _core;
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
      if (timer > 0) {
        return;
      }
      timer = setTimeout(() => {
        fn(...args);
        timer = -1;
      }, timeout);
    };
  }
  function downloadImageFromCanvas(canvas, opts) {
    const { filename, type = "image/jpeg" } = opts;
    const stream = canvas.toDataURL(type);
    const downloadLink = document.createElement("a");
    downloadLink.href = stream;
    downloadLink.download = filename;
    const downloadClickEvent = document.createEvent("MouseEvents");
    downloadClickEvent.initEvent("click", true, false);
    downloadLink.dispatchEvent(downloadClickEvent);
  }
  function pickFile(opts) {
    const { success, error } = opts;
    let input = document.createElement("input");
    input.type = "file";
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
  function toColorHexNum(color2) {
    return parseInt(color2.replace(/^\#/, "0x"));
  }
  function toColorHexStr(color2) {
    return "#" + color2.toString(16);
  }
  function isColorStr(color2) {
    return typeof color2 === "string" && (/^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color2) || /^[a-z]{1,}$/i.test(color2));
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
    const regHex1 = /^\#[0-9a-f]{6,6}$/i;
    const regHex2 = /^\#[0-9a-f]{8,8}$/i;
    let result = hex;
    if (regHex1.test(hex)) {
      hexAlpha = parseInt(hex.substring(5, 7).replace(/^\#/, "0x"));
    } else if (regHex2.test(hex)) {
      hexAlpha = parseInt(hex.substring(7, 9).replace(/^\#/, "0x"));
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
  function limitHexStr(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      count += str.charCodeAt(i) * str.charCodeAt(i) * i * i;
    }
    return count.toString(16).substring(0, 4);
  }
  function createAssetId(assetStr) {
    const len = assetStr.length;
    const mid = Math.floor(len / 2);
    const start4 = assetStr.substring(0, 4).padEnd(4, "0");
    const end4 = assetStr.substring(0, 4).padEnd(4, "0");
    const str1 = limitHexStr(len.toString(16).padEnd(4, start4));
    const str2 = limitHexStr(assetStr.substring(mid - 4, mid).padEnd(4, start4)).padEnd(4, "f");
    const str3 = limitHexStr(assetStr.substring(mid - 8, mid - 4).padEnd(4, start4)).padEnd(4, "f");
    const str4 = limitHexStr(assetStr.substring(mid - 12, mid - 8).padEnd(4, start4)).padEnd(4, "f");
    const str5 = limitHexStr(assetStr.substring(mid - 16, mid - 12).padEnd(4, end4)).padEnd(4, "f");
    const str6 = limitHexStr(assetStr.substring(mid, mid + 4).padEnd(4, end4)).padEnd(4, "f");
    const str7 = limitHexStr(assetStr.substring(mid + 4, mid + 8).padEnd(4, end4)).padEnd(4, "f");
    const str8 = limitHexStr(end4.padEnd(4, start4).padEnd(4, end4));
    return `@assets/${str1}${str2}-${str3}-${str4}-${str5}-${str6}${str7}${str8}`;
  }
  function isAssetId(id) {
    return /^@assets\/[0-9a-z]{8,8}\-[0-9a-z]{4,4}\-[0-9a-z]{4,4}\-[0-9a-z]{4,4}\-[0-9a-z]{12,12}$/.test(`${id}`);
  }
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
          const assetUUID = createAssetId(src);
          if (!assets[assetUUID]) {
            assets[assetUUID] = {
              type: "image",
              value: src
            };
          }
          elem.detail.src = assetUUID;
        } else if (elem.type === "svg") {
          const svg2 = elem.detail.svg;
          const assetUUID = createAssetId(svg2);
          if (!assets[assetUUID]) {
            assets[assetUUID] = {
              type: "svg",
              value: svg2
            };
          }
          elem.detail.svg = assetUUID;
        } else if (elem.type === "html") {
          const html2 = elem.detail.html;
          const assetUUID = createAssetId(html2);
          if (!assets[assetUUID]) {
            assets[assetUUID] = {
              type: "svg",
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
    return typeof value === "number" && value >= 0;
  }
  function h(value) {
    return typeof value === "number" && value >= 0;
  }
  function angle(value) {
    return typeof value === "number" && value >= -360 && value <= 360;
  }
  function borderWidth(value) {
    return w(value);
  }
  function borderRadius(value) {
    return number(value) && value >= 0;
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
  function fontFamily$1(value) {
    return typeof value === "string" && value.length > 0;
  }
  function fontWeight$1(value) {
    return ["bold"].includes(value);
  }
  function numberStr(value) {
    return /^(-?\d+(?:\.\d+)?)$/.test(`${value}`);
  }
  const is = {
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
    fontFamily: fontFamily$1,
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
    if (detail.hasOwnProperty("borderColor") && !is.color(borderColor2)) {
      return false;
    }
    if (detail.hasOwnProperty("borderRadius") && !is.number(borderRadius2)) {
      return false;
    }
    if (detail.hasOwnProperty("borderWidth") && !is.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function rectDesc(detail) {
    const { background: background2 } = detail;
    if (detail.hasOwnProperty("background") && !is.color(background2)) {
      return false;
    }
    if (!box(detail)) {
      return false;
    }
    return true;
  }
  function circleDesc(detail) {
    const { background: background2, borderColor: borderColor2, borderWidth: borderWidth2 } = detail;
    if (detail.hasOwnProperty("background") && !is.color(background2)) {
      return false;
    }
    if (detail.hasOwnProperty("borderColor") && !is.color(borderColor2)) {
      return false;
    }
    if (detail.hasOwnProperty("borderWidth") && !is.number(borderWidth2)) {
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
    if (detail.hasOwnProperty("background") && !is.color(background2)) {
      return false;
    }
    if (detail.hasOwnProperty("fontWeight") && !is.fontWeight(fontWeight2)) {
      return false;
    }
    if (detail.hasOwnProperty("lineHeight") && !is.lineHeight(lineHeight2)) {
      return false;
    }
    if (detail.hasOwnProperty("fontFamily") && !is.fontFamily(fontFamily2)) {
      return false;
    }
    if (detail.hasOwnProperty("textAlign") && !is.textAlign(textAlign2)) {
      return false;
    }
    if (detail.hasOwnProperty("strokeWidth") && !is.strokeWidth(strokeWidth2)) {
      return false;
    }
    if (detail.hasOwnProperty("strokeColor") && !is.color(strokeColor)) {
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
  var __classPrivateFieldSet$1 = function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet$1 = function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Context2D_ctx, _Context2D_opts;
  class Context2D {
    constructor(ctx, opts) {
      _Context2D_ctx.set(this, void 0);
      _Context2D_opts.set(this, void 0);
      __classPrivateFieldSet$1(this, _Context2D_ctx, ctx, "f");
      __classPrivateFieldSet$1(this, _Context2D_opts, Object.assign({ devicePixelRatio: 1, offscreenCanvas: null }, opts), "f");
    }
    $undoPixelRatio(num) {
      return num / __classPrivateFieldGet$1(this, _Context2D_opts, "f").devicePixelRatio;
    }
    $doPixelRatio(num) {
      return __classPrivateFieldGet$1(this, _Context2D_opts, "f").devicePixelRatio * num;
    }
    $getContext() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f");
    }
    $setFont(opts) {
      const strList = [];
      if (opts.fontWeight) {
        strList.push(`${opts.fontWeight}`);
      }
      strList.push(`${this.$doPixelRatio(opts.fontSize || 12)}px`);
      strList.push(`${opts.fontFamily || "sans-serif"}`);
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").font = `${strList.join(" ")}`;
    }
    $getOffscreenCanvas() {
      return __classPrivateFieldGet$1(this, _Context2D_opts, "f").offscreenCanvas;
    }
    $resize(opts) {
      const { width, height, devicePixelRatio, resetStyle } = opts;
      const { canvas } = __classPrivateFieldGet$1(this, _Context2D_ctx, "f");
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      __classPrivateFieldSet$1(this, _Context2D_opts, Object.assign(Object.assign({}, __classPrivateFieldGet$1(this, _Context2D_opts, "f")), {
        devicePixelRatio
      }), "f");
      if (resetStyle === true) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    }
    $getSize() {
      const { devicePixelRatio } = __classPrivateFieldGet$1(this, _Context2D_opts, "f");
      const { width, height } = __classPrivateFieldGet$1(this, _Context2D_ctx, "f").canvas;
      return {
        width: width / devicePixelRatio,
        height: height / devicePixelRatio,
        devicePixelRatio
      };
    }
    get canvas() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").canvas;
    }
    get fillStyle() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").fillStyle;
    }
    set fillStyle(value) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").fillStyle = value;
    }
    get strokeStyle() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").strokeStyle;
    }
    set strokeStyle(color2) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").strokeStyle = color2;
    }
    get lineWidth() {
      return this.$undoPixelRatio(__classPrivateFieldGet$1(this, _Context2D_ctx, "f").lineWidth);
    }
    set lineWidth(w2) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").lineWidth = this.$doPixelRatio(w2);
    }
    get textAlign() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").textAlign;
    }
    set textAlign(align) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").textAlign = align;
    }
    get textBaseline() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").textBaseline;
    }
    set textBaseline(baseline) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").textBaseline = baseline;
    }
    get globalAlpha() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").globalAlpha;
    }
    set globalAlpha(alpha) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").globalAlpha = alpha;
    }
    get shadowColor() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowColor;
    }
    set shadowColor(color2) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowColor = color2;
    }
    get shadowOffsetX() {
      return this.$undoPixelRatio(__classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowOffsetX);
    }
    set shadowOffsetX(offsetX) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowOffsetX = this.$doPixelRatio(offsetX);
    }
    get shadowOffsetY() {
      return this.$undoPixelRatio(__classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowOffsetY);
    }
    set shadowOffsetY(offsetY) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowOffsetY = this.$doPixelRatio(offsetY);
    }
    get shadowBlur() {
      return this.$undoPixelRatio(__classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowBlur);
    }
    set shadowBlur(blur) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").shadowBlur = this.$doPixelRatio(blur);
    }
    get lineCap() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").lineCap;
    }
    set lineCap(lineCap) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").lineCap = lineCap;
    }
    get globalCompositeOperation() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").globalCompositeOperation;
    }
    set globalCompositeOperation(operations) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").globalCompositeOperation = operations;
    }
    fill(...args) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").fill(...args);
    }
    arc(x2, y2, radius, startAngle, endAngle, anticlockwise) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").arc(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(radius), startAngle, endAngle, anticlockwise);
    }
    rect(x2, y2, w2, h2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").rect(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(w2), this.$doPixelRatio(h2));
    }
    fillRect(x2, y2, w2, h2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").fillRect(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(w2), this.$doPixelRatio(h2));
    }
    clearRect(x2, y2, w2, h2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").clearRect(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(w2), this.$doPixelRatio(h2));
    }
    beginPath() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").beginPath();
    }
    closePath() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").closePath();
    }
    lineTo(x2, y2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").lineTo(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    moveTo(x2, y2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").moveTo(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    arcTo(x1, y1, x2, y2, radius) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").arcTo(this.$doPixelRatio(x1), this.$doPixelRatio(y1), this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(radius));
    }
    getLineDash() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").getLineDash();
    }
    setLineDash(nums) {
      const dash = nums.map((n) => this.$doPixelRatio(n));
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").setLineDash(dash);
    }
    stroke(path) {
      return path ? __classPrivateFieldGet$1(this, _Context2D_ctx, "f").stroke(path) : __classPrivateFieldGet$1(this, _Context2D_ctx, "f").stroke();
    }
    translate(x2, y2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").translate(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    rotate(angle2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").rotate(angle2);
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
        return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").drawImage(image, this.$doPixelRatio(sx), this.$doPixelRatio(sy), this.$doPixelRatio(sw), this.$doPixelRatio(sh), this.$doPixelRatio(dx), this.$doPixelRatio(dy), this.$doPixelRatio(dw), this.$doPixelRatio(dh));
      } else {
        return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").drawImage(image, this.$doPixelRatio(dx), this.$doPixelRatio(dy), this.$doPixelRatio(dw), this.$doPixelRatio(dh));
      }
    }
    createPattern(image, repetition) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").createPattern(image, repetition);
    }
    measureText(text2) {
      const textMetrics = __classPrivateFieldGet$1(this, _Context2D_ctx, "f").measureText(text2);
      return textMetrics;
    }
    fillText(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").fillText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(maxWidth));
      } else {
        return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").fillText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2));
      }
    }
    strokeText(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").strokeText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(maxWidth));
      } else {
        return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").strokeText(text2, this.$doPixelRatio(x2), this.$doPixelRatio(y2));
      }
    }
    save() {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").save();
    }
    restore() {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").restore();
    }
    scale(ratioX, ratioY) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").scale(ratioX, ratioY);
    }
    circle(x2, y2, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
      __classPrivateFieldGet$1(this, _Context2D_ctx, "f").ellipse(this.$doPixelRatio(x2), this.$doPixelRatio(y2), this.$doPixelRatio(radiusX), this.$doPixelRatio(radiusY), rotation, startAngle, endAngle, counterclockwise);
    }
    isPointInPath(x2, y2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").isPointInPath(this.$doPixelRatio(x2), this.$doPixelRatio(y2));
    }
    clip(...args) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").clip(...args);
    }
    setTransform(a, b, c, d, e, f) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").setTransform(a, b, c, d, e, f);
    }
    getTransform() {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").getTransform();
    }
    createLinearGradient(x0, y0, x1, y1) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").createLinearGradient(this.$doPixelRatio(x0), this.$doPixelRatio(y0), this.$doPixelRatio(x1), this.$doPixelRatio(y1));
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").createRadialGradient(this.$doPixelRatio(x0), this.$doPixelRatio(y0), this.$doPixelRatio(r0), this.$doPixelRatio(x1), this.$doPixelRatio(y1), this.$doPixelRatio(r1));
    }
    createConicGradient(startAngle, x2, y2) {
      return __classPrivateFieldGet$1(this, _Context2D_ctx, "f").createConicGradient(startAngle, this.$doPixelRatio(x2), this.$doPixelRatio(y2));
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
  function createViewContent(canvas, opts) {
    const { width, height, devicePixelRatio, offscreen } = opts;
    const ctxOpts = {
      width,
      height,
      devicePixelRatio
    };
    if (offscreen === true) {
      const ctx = canvas.getContext("2d");
      const viewContext = createOffscreenContext2D(ctxOpts);
      const helperContext = createOffscreenContext2D(ctxOpts);
      const underContext = createOffscreenContext2D(ctxOpts);
      const boardContext = createContext2D(Object.assign({ ctx }, ctxOpts));
      const drawView = () => {
        const { width: w2, height: h2 } = viewContext.$getSize();
        boardContext.clearRect(0, 0, w2, h2);
        boardContext.drawImage(underContext.canvas, 0, 0, w2, h2);
        boardContext.drawImage(viewContext.canvas, 0, 0, w2, h2);
        boardContext.drawImage(helperContext.canvas, 0, 0, w2, h2);
        underContext.clearRect(0, 0, w2, h2);
        viewContext.clearRect(0, 0, w2, h2);
        helperContext.clearRect(0, 0, w2, h2);
      };
      const content = {
        underContext,
        viewContext,
        helperContext,
        boardContext,
        drawView
      };
      return content;
    } else {
      const ctx = canvas.getContext("2d");
      const viewContext = createContext2D(ctxOpts);
      const helperContext = createContext2D(ctxOpts);
      const underContext = createContext2D(ctxOpts);
      const boardContext = createContext2D(Object.assign({ ctx }, ctxOpts));
      const drawView = () => {
        boardContext.clearRect(0, 0, width, height);
        boardContext.drawImage(underContext.canvas, 0, 0, width, height);
        boardContext.drawImage(viewContext.canvas, 0, 0, width, height);
        boardContext.drawImage(helperContext.canvas, 0, 0, width, height);
        underContext.clearRect(0, 0, width, height);
        viewContext.clearRect(0, 0, width, height);
        helperContext.clearRect(0, 0, width, height);
      };
      const content = {
        underContext,
        viewContext,
        helperContext,
        boardContext,
        drawView
      };
      return content;
    }
  }
  class EventEmitter {
    constructor() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    on(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey) || [];
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks);
      } else {
        this._listeners.set(eventKey, [callback]);
      }
    }
    off(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey);
        if (Array.isArray(callbacks)) {
          for (let i = 0; i < (callbacks === null || callbacks === void 0 ? void 0 : callbacks.length); i++) {
            if (callbacks[i] === callback) {
              callbacks.splice(i, 1);
              break;
            }
          }
        }
        this._listeners.set(eventKey, callbacks || []);
      }
    }
    trigger(eventKey, e) {
      const callbacks = this._listeners.get(eventKey);
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
      if (this._listeners.has(name)) {
        const list = this._listeners.get(name);
        if (Array.isArray(list) && list.length > 0) {
          return true;
        }
      }
      return false;
    }
  }
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
  class Store {
    constructor(opts) {
      this._backUpDefaultStorage = deepClone(opts.defaultStorage);
      this._temp = this._createTempStorage();
    }
    set(name, value) {
      this._temp[name] = value;
    }
    get(name) {
      return this._temp[name];
    }
    getSnapshot() {
      return deepClone(this._temp);
    }
    clear() {
      this._temp = this._createTempStorage();
    }
    _createTempStorage() {
      return deepClone(this._backUpDefaultStorage);
    }
  }
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
  function rotateElement(ctx, elemSize, callback) {
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
        const center = calcElementCenter({ x: x2, y: y2, w: w2, h: h2, angle: angle2 });
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
    if (!(angle2 > 0 || angle2 < 0) || angle2 === 0) {
      return 0;
    }
    let num = angle2 % 360;
    if (num < 0) {
      num += 360;
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
    const contextSize = calcElementsContextSize(elements, { viewWidth: prevViewSize.width, viewHeight: prevViewSize.height, extend: options === null || options === void 0 ? void 0 : options.extend });
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
      assetId = createAssetId(resource);
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
      if (i < position.length - 1 && item.type === "group") {
        tempList = item.detail.children;
      } else if (i === position.length - 1) {
        result = item;
      } else {
        break;
      }
    }
    return result;
  }
  function getElementPositionFromList(uuid, elements) {
    let result = [];
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
  function checkRectIntersect(rect1, rect2) {
    const react1MinX = rect1.x;
    const react1MinY = rect1.y;
    const react1MaxX = rect1.x + rect1.w;
    const react1MaxY = rect1.y + rect1.h;
    const react2MinX = rect2.x;
    const react2MinY = rect2.y;
    const react2MaxX = rect2.x + rect2.w;
    const react2MaxY = rect2.y + rect2.h;
    return react1MinX <= react2MaxX && react1MaxX >= react2MinX && react1MinY <= react2MaxY && react1MaxY >= react2MinY;
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
    const { context2d: ctx, element: elem, viewScaleInfo, viewSizeInfo } = opts;
    const { angle: angle2 = 0 } = elem;
    const { x: x2, y: y2, w: w2, h: h2 } = calcViewElementSize(elem, { viewScaleInfo, viewSizeInfo });
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
              if (isViewPointInElement(p, { context2d: ctx, element: elemSize, viewScaleInfo, viewSizeInfo })) {
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
      if (isViewPointInElement(p, { context2d: ctx, element: elem, viewScaleInfo, viewSizeInfo })) {
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
    const { x: x2, y: y2, w: w2, h: h2 } = calcViewElementSize(elem, { viewScaleInfo, viewSizeInfo });
    const ves = rotateElementVertexes({ x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    const viewSize = { x: 0, y: 0, w: width, h: height };
    const elemStartX = Math.min(ves[0].x, ves[1].x, ves[2].x, ves[3].x);
    const elemStartY = Math.min(ves[0].y, ves[1].y, ves[2].y, ves[3].y);
    const elemEndX = Math.max(ves[0].x, ves[1].x, ves[2].x, ves[3].x);
    const elemEndY = Math.max(ves[0].y, ves[1].y, ves[2].y, ves[3].y);
    const elemSize = { x: elemStartX, y: elemStartY, w: elemEndX - elemStartX, h: elemEndY - elemStartY };
    return checkRectIntersect(viewSize, elemSize);
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
    return getElementRotateVertexes(elemSize, calcElementCenter({ x: x2, y: y2, w: w2, h: h2, angle: angle2 }), angle2);
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
        const elemSize = { x: totalX, y: totalY, w: w2, h: h2, angle: angle2 };
        ves = calcElementVertexes({ x: x2, y: y2, w: w2, h: h2, angle: angle2 });
        rotateActionList.push({
          center: calcElementCenter(elemSize),
          angle: angle2,
          radian: parseAngleToRadian(angle2)
        });
      } else {
        const elemSize = { x: totalX, y: totalY, w: w2, h: h2, angle: angle2 };
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
    const { groupQueue, controllerSize, viewScaleInfo } = opts;
    const ctrlSize = (controllerSize && controllerSize > 0 ? controllerSize : 8) / viewScaleInfo.scale;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 = 0 } = elemSize;
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
    const topCenter = getCenterFromTwoPoints(vertexes[0], vertexes[1]);
    const rightCenter = getCenterFromTwoPoints(vertexes[1], vertexes[2]);
    const bottomCenter = getCenterFromTwoPoints(vertexes[2], vertexes[3]);
    const leftCenter = getCenterFromTwoPoints(vertexes[3], vertexes[0]);
    const topLeftCenter = vertexes[0];
    const topRightCenter = vertexes[1];
    const bottomRightCenter = vertexes[2];
    const bottomLeftCenter = vertexes[3];
    const topLeftSize = createControllerElementSizeFromCenter(topLeftCenter, { size: ctrlSize, angle: totalAngle });
    const topRightSize = createControllerElementSizeFromCenter(topRightCenter, { size: ctrlSize, angle: totalAngle });
    const bottomLeftSize = createControllerElementSizeFromCenter(bottomLeftCenter, { size: ctrlSize, angle: totalAngle });
    const bottomRightSize = createControllerElementSizeFromCenter(bottomRightCenter, { size: ctrlSize, angle: totalAngle });
    const topLeftVertexes = calcElementVertexes(topLeftSize);
    const topRightVertexes = calcElementVertexes(topRightSize);
    const bottomLeftVertexes = calcElementVertexes(bottomLeftSize);
    const bottomRightVertexes = calcElementVertexes(bottomRightSize);
    const topVertexes = [topLeftVertexes[1], topRightVertexes[0], topRightVertexes[3], topLeftVertexes[2]];
    const rightVertexes = [topRightVertexes[3], topRightVertexes[2], bottomRightVertexes[1], bottomRightVertexes[0]];
    const bottomVertexes = [bottomLeftVertexes[1], bottomRightVertexes[0], bottomRightVertexes[3], bottomLeftVertexes[2]];
    const leftVertexes = [topLeftVertexes[3], topLeftVertexes[2], bottomLeftVertexes[1], bottomLeftVertexes[0]];
    const sizeController = {
      elementWrapper: vertexes,
      left: {
        type: "left",
        vertexes: leftVertexes,
        center: leftCenter
      },
      right: {
        type: "right",
        vertexes: rightVertexes,
        center: rightCenter
      },
      top: {
        type: "top",
        vertexes: topVertexes,
        center: topCenter
      },
      bottom: {
        type: "bottom",
        vertexes: bottomVertexes,
        center: bottomCenter
      },
      topLeft: {
        type: "top-left",
        vertexes: topLeftVertexes,
        center: topLeftCenter
      },
      topRight: {
        type: "top-right",
        vertexes: topRightVertexes,
        center: topRightCenter
      },
      bottomLeft: {
        type: "bottom-left",
        vertexes: bottomLeftVertexes,
        center: bottomLeftCenter
      },
      bottomRight: {
        type: "bottom-right",
        vertexes: bottomRightVertexes,
        center: bottomRightCenter
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
    let inComponent = false;
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
        if (!current.isVoid && !inComponent && nextChar && nextChar !== "<") {
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
    for (let key2 in attrs2) {
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
      lineHeight: 20,
      fontFamily: "sans-serif",
      fontWeight: 400,
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
  function getDefaultElementCircleDetail(opts) {
    const detail = {
      background: "#D9D9D9",
      radius: 0
    };
    return detail;
  }
  function getDefaultElementTextDetail(opts) {
    var _a;
    const detailConfig2 = getDefaultElementDetailConfig();
    const scale = ((_a = opts === null || opts === void 0 ? void 0 : opts.viewScaleInfo) === null || _a === void 0 ? void 0 : _a.scale) || 1;
    const detail = {
      text: "Text Element",
      color: detailConfig2.color,
      fontFamily: detailConfig2.fontFamily,
      fontWeight: detailConfig2.fontWeight,
      lineHeight: detailConfig2.fontSize * scale,
      fontSize: detailConfig2.fontSize * scale,
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
  function getDefaultElementGroupDetail(opts) {
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
    let { borderRadius: borderRadius2, boxSizing = defaultElemConfig$1.boxSizing, borderWidth: borderWidth2 } = viewElem.detail;
    if (typeof borderWidth2 !== "number") {
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
    return {
      x: x2,
      y: y2,
      w: w2,
      h: h2,
      radiusList
    };
  }
  const defaultViewWidth = 200;
  const defaultViewHeight = 200;
  const defaultDetail$1 = getDefaultElementDetailConfig();
  function createElementSize(type, opts) {
    let x2 = 0;
    let y2 = 0;
    let w2 = defaultViewWidth;
    let h2 = defaultViewHeight;
    if (opts) {
      const { viewScaleInfo, viewSizeInfo } = opts;
      const { scale, offsetLeft, offsetTop } = viewScaleInfo;
      const { width, height } = viewSizeInfo;
      if (type === "text") {
        const textDetail = getDefaultElementTextDetail();
        w2 = defaultDetail$1.fontSize * scale * textDetail.text.length;
        h2 = defaultDetail$1.fontSize * scale * 2;
      } else {
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
        }
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
  function createElement(type, baseElem, opts) {
    const elemSize = createElementSize(type, opts);
    let detail = {};
    if (type === "rect") {
      detail = getDefaultElementRectDetail();
    } else if (type === "circle") {
      detail = getDefaultElementCircleDetail({
        radius: elemSize.w
      });
    } else if (type === "text") {
      detail = getDefaultElementTextDetail(opts);
    } else if (type === "svg") {
      detail = getDefaultElementSVGDetail();
    } else if (type === "image") {
      detail = getDefaultElementImageDetail();
    } else if (type === "group") {
      detail = getDefaultElementGroupDetail();
    }
    const elem = Object.assign(Object.assign(Object.assign({}, elemSize), baseElem), { uuid: createUUID(), type, detail: Object.assign(Object.assign({}, detail), baseElem.detail || {}) });
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
    const { from, to } = opts;
    if (from.length === 0 || to.length === 0) {
      return elements;
    }
    if (from.length <= to.length) {
      for (let i = 0; i < from.length; i++) {
        if (to[i] === from[i]) {
          if (i === from.length - 1) {
            return elements;
          }
          continue;
        }
      }
    }
    const target = findElementFromListByPosition(from, elements);
    if (target) {
      const insterResult = insertElementToListByPosition(target, to, elements);
      if (!insterResult) {
        return elements;
      }
      let trimDeletePosIndex = -1;
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
      if (trimDeletePosIndex >= 0) {
        {
          from[trimDeletePosIndex] = from[trimDeletePosIndex] + 1;
        }
      }
      deleteElementInListByPosition(from, elements);
    }
    return elements;
  }
  function mergeElement(originElem, updateContent) {
    var _a;
    const commonKeys = Object.keys(updateContent);
    for (let i = 0; i < commonKeys.length; i++) {
      const commonKey = commonKeys[i];
      if (["x", "y", "w", "h", "angle", "name"].includes(commonKey)) {
        originElem[commonKey] = updateContent[commonKey];
      } else if (["detail", "operations"].includes(commonKey)) {
        if (istype.json(updateContent[commonKey])) {
          if (!(originElem === null || originElem === void 0 ? void 0 : originElem.hasOwnProperty(commonKey))) {
            originElem[commonKey] = {};
          }
          if (istype.json(originElem[commonKey])) {
            originElem[commonKey] = Object.assign(Object.assign({}, originElem[commonKey]), updateContent[commonKey]);
          }
        } else if (istype.array(updateContent[commonKey])) {
          if (!(originElem === null || originElem === void 0 ? void 0 : originElem.hasOwnProperty(commonKey))) {
            originElem[commonKey] = [];
          }
          if (istype.array(originElem[commonKey])) {
            (_a = updateContent === null || updateContent === void 0 ? void 0 : updateContent[commonKey]) === null || _a === void 0 ? void 0 : _a.forEach((item, i2) => {
              originElem[commonKey][i2] = item;
            });
            originElem[commonKey] = [...originElem[commonKey], ...updateContent[commonKey]];
          }
        }
      }
    }
    return originElem;
  }
  function updateElementInList(uuid, updateContent, elements) {
    var _a;
    let targetElement = null;
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      if (elem.uuid === uuid) {
        mergeElement(elem, updateContent);
        targetElement = elem;
        break;
      } else if (elem.type === "group") {
        targetElement = updateElementInList(uuid, updateContent, ((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.children) || []);
      }
    }
    return targetElement;
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
  function drawBox(ctx, viewElem, opts) {
    const { pattern, renderContent, originElem, calcElemSize, viewScaleInfo, viewSizeInfo } = opts || {};
    drawClipPath(ctx, viewElem, {
      originElem,
      calcElemSize,
      viewScaleInfo,
      viewSizeInfo,
      renderContent: () => {
        var _a, _b;
        if (((_a = viewElem === null || viewElem === void 0 ? void 0 : viewElem.detail) === null || _a === void 0 ? void 0 : _a.opacity) !== void 0 && ((_b = viewElem === null || viewElem === void 0 ? void 0 : viewElem.detail) === null || _b === void 0 ? void 0 : _b.opacity) >= 0) {
          ctx.globalAlpha = viewElem.detail.opacity;
        } else {
          ctx.globalAlpha = 1;
        }
        drawBoxBackground(ctx, viewElem, { pattern, viewScaleInfo, viewSizeInfo });
        renderContent === null || renderContent === void 0 ? void 0 : renderContent();
        drawBoxBorder(ctx, viewElem, { viewScaleInfo, viewSizeInfo });
        ctx.globalAlpha = 1;
      }
    });
  }
  function drawClipPath(ctx, viewElem, opts) {
    const { renderContent, originElem, calcElemSize, viewScaleInfo, viewSizeInfo } = opts;
    const totalScale = viewScaleInfo.scale * viewSizeInfo.devicePixelRatio;
    const { clipPath } = (originElem === null || originElem === void 0 ? void 0 : originElem.detail) || {};
    if (clipPath && calcElemSize && clipPath.commands) {
      const { x: x2, y: y2, w: w2, h: h2 } = calcElemSize;
      const { originW, originH, originX, originY } = clipPath;
      const scaleW = w2 / originW;
      const scaleH = h2 / originH;
      const viewOriginX = originX * scaleW;
      const viewOriginY = originY * scaleH;
      let internalX = x2 - viewOriginX;
      let internalY = y2 - viewOriginY;
      ctx.save();
      ctx.translate(internalX, internalY);
      ctx.scale(totalScale * scaleW, totalScale * scaleH);
      const pathStr = generateSVGPath(clipPath.commands || []);
      const path2d = new Path2D(pathStr);
      ctx.clip(path2d);
      ctx.translate(0 - internalX, 0 - internalY);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      rotateElement(ctx, Object.assign({}, viewElem), () => {
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
    let transform = [];
    viewElem.detail;
    if (viewElem.detail.background || pattern) {
      const { x: x2, y: y2, w: w2, h: h2, radiusList } = calcViewBoxSize(viewElem, {
        viewScaleInfo,
        viewSizeInfo
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
      ctx.fill();
      if (transform && transform.length > 0) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }
  function drawBoxBorder(ctx, viewElem, opts) {
    var _a, _b;
    if (viewElem.detail.borderWidth === 0) {
      return;
    }
    if (!isColorStr(viewElem.detail.borderColor)) {
      return;
    }
    if (((_a = viewElem === null || viewElem === void 0 ? void 0 : viewElem.detail) === null || _a === void 0 ? void 0 : _a.opacity) !== void 0 && ((_b = viewElem === null || viewElem === void 0 ? void 0 : viewElem.detail) === null || _b === void 0 ? void 0 : _b.opacity) >= 0) {
      ctx.globalAlpha = viewElem.detail.opacity;
    } else {
      ctx.globalAlpha = 1;
    }
    const { viewScaleInfo } = opts;
    const { scale } = viewScaleInfo;
    let borderColor2 = defaultElemConfig.borderColor;
    if (isColorStr(viewElem.detail.borderColor) === true) {
      borderColor2 = viewElem.detail.borderColor;
    }
    const { borderWidth: borderWidth2, borderRadius: borderRadius2, borderDash, boxSizing = defaultElemConfig.boxSizing } = viewElem.detail;
    let bw = 0;
    if (typeof borderWidth2 === "number") {
      bw = borderWidth2 || 1;
    }
    bw = bw * scale;
    let radiusList = [0, 0, 0, 0];
    if (typeof borderRadius2 === "number") {
      const br = borderRadius2 * scale;
      radiusList = [br, br, br, br];
    } else if (Array.isArray(borderRadius2) && (borderRadius2 === null || borderRadius2 === void 0 ? void 0 : borderRadius2.length) === 4) {
      radiusList = [borderRadius2[0] * scale, borderRadius2[1] * scale, borderRadius2[2] * scale, borderRadius2[3] * scale];
    }
    ctx.strokeStyle = borderColor2;
    let viewBorderDash = [];
    if (Array.isArray(borderDash) && borderDash.length > 0) {
      viewBorderDash = borderDash.map((num) => Math.ceil(num * scale));
    }
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
      if (viewBorderDash.length > 0) {
        ctx.lineCap = "butt";
      } else {
        ctx.lineCap = "square";
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
      ctx.globalAlpha = 1;
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
      renderContent();
    }
  }
  function drawCircle(ctx, elem, opts) {
    const { detail, angle: angle2 } = elem;
    const { background: background2 = "#000000", borderColor: borderColor2 = "#000000", borderWidth: borderWidth2 = 0 } = detail;
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2 } = calculator.elementSize({ x: elem.x, y: elem.y, w: elem.w, h: elem.h }, viewScaleInfo, viewSizeInfo);
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        viewSizeInfo,
        renderContent: () => {
          var _a, _b;
          const a = w2 / 2;
          const b = h2 / 2;
          const centerX = x2 + a;
          const centerY = y2 + b;
          if (((_a = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _a === void 0 ? void 0 : _a.opacity) !== void 0 && ((_b = elem === null || elem === void 0 ? void 0 : elem.detail) === null || _b === void 0 ? void 0 : _b.opacity) >= 0) {
            ctx.globalAlpha = elem.detail.opacity;
          } else {
            ctx.globalAlpha = 1;
          }
          if (typeof borderWidth2 === "number" && borderWidth2 > 0) {
            const ba = borderWidth2 / 2 + a;
            const bb = borderWidth2 / 2 + b;
            ctx.beginPath();
            ctx.strokeStyle = borderColor2;
            ctx.lineWidth = borderWidth2;
            ctx.circle(centerX, centerY, ba, bb, 0, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
          }
          ctx.beginPath();
          const fillStyle = createColorStyle(ctx, background2, {
            viewElementSize: { x: x2, y: y2, w: w2, h: h2 },
            viewScaleInfo,
            opacity: ctx.globalAlpha
          });
          ctx.fillStyle = fillStyle;
          ctx.circle(centerX, centerY, a, b, 0, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
    });
  }
  function drawRect(ctx, elem, opts) {
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    let { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        viewSizeInfo,
        renderContent: () => {
          drawBox(ctx, viewElem, {
            originElem: elem,
            calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
            viewScaleInfo,
            viewSizeInfo,
            renderContent: () => {
            }
          });
        }
      });
    });
  }
  function drawImage(ctx, elem, opts) {
    const content = opts.loader.getContent(elem);
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        viewSizeInfo,
        renderContent: () => {
          drawBox(ctx, viewElem, {
            originElem: elem,
            calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
            viewScaleInfo,
            viewSizeInfo,
            renderContent: () => {
              if (!content) {
                opts.loader.load(elem, opts.elementAssets || {});
              }
              if (elem.type === "image" && content) {
                const { opacity } = elem.detail;
                ctx.globalAlpha = opacity ? opacity : 1;
                const { x: x3, y: y3, w: w3, h: h3, radiusList } = calcViewBoxSize(viewElem, {
                  viewScaleInfo,
                  viewSizeInfo
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
                ctx.fill();
                ctx.clip();
                ctx.drawImage(content, x3, y3, w3, h3);
                ctx.globalAlpha = 1;
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
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      if (!content) {
        opts.loader.load(elem, opts.elementAssets || {});
      }
      if (elem.type === "svg" && content) {
        const { opacity } = elem.detail;
        ctx.globalAlpha = opacity ? opacity : 1;
        ctx.drawImage(content, x2, y2, w2, h2);
        ctx.globalAlpha = 1;
      }
    });
  }
  function drawHTML(ctx, elem, opts) {
    const content = opts.loader.getContent(elem);
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      if (!content) {
        opts.loader.load(elem, opts.elementAssets || {});
      }
      if (elem.type === "html" && content) {
        const { opacity } = elem.detail;
        ctx.globalAlpha = opacity ? opacity : 1;
        ctx.drawImage(content, x2, y2, w2, h2);
        ctx.globalAlpha = 1;
      }
    });
  }
  const detailConfig = getDefaultElementDetailConfig();
  function drawText(ctx, elem, opts) {
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBox(ctx, viewElem, {
        originElem: elem,
        calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
        viewScaleInfo,
        viewSizeInfo,
        renderContent: () => {
          const detail = Object.assign(Object.assign({}, detailConfig), elem.detail);
          const fontSize2 = (detail.fontSize || detailConfig.fontSize) * viewScaleInfo.scale;
          const lineHeight2 = detail.lineHeight ? detail.lineHeight * viewScaleInfo.scale : fontSize2;
          ctx.fillStyle = elem.detail.color || detailConfig.color;
          ctx.textBaseline = "top";
          ctx.$setFont({
            fontWeight: detail.fontWeight,
            fontSize: fontSize2,
            fontFamily: detail.fontFamily
          });
          const detailText = detail.text.replace(/\r\n/gi, "\n");
          const fontHeight = lineHeight2;
          const detailTextList = detailText.split("\n");
          const lines = [];
          let lineNum = 0;
          detailTextList.forEach((tempText, idx) => {
            let lineText = "";
            if (tempText.length > 0) {
              for (let i = 0; i < tempText.length; i++) {
                if (ctx.measureText(lineText + (tempText[i] || "")).width < ctx.$doPixelRatio(w2)) {
                  lineText += tempText[i] || "";
                } else {
                  lines.push({
                    text: lineText,
                    width: ctx.$undoPixelRatio(ctx.measureText(lineText).width)
                  });
                  lineText = tempText[i] || "";
                  lineNum++;
                }
                if ((lineNum + 1) * fontHeight > h2) {
                  break;
                }
                if (tempText.length - 1 === i) {
                  if ((lineNum + 1) * fontHeight < h2) {
                    lines.push({
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
                text: "",
                width: 0
              });
            }
          });
          let startY = 0;
          if (lines.length * fontHeight < h2) {
            if (elem.detail.verticalAlign === "top") {
              startY = 0;
            } else if (elem.detail.verticalAlign === "bottom") {
              startY += h2 - lines.length * fontHeight;
            } else {
              startY += (h2 - lines.length * fontHeight) / 2;
            }
          }
          {
            const _y = y2 + startY;
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
            lines.forEach((line, i) => {
              let _x = x2;
              if (detail.textAlign === "center") {
                _x = x2 + (w2 - line.width) / 2;
              } else if (detail.textAlign === "right") {
                _x = x2 + (w2 - line.width);
              }
              ctx.fillText(line.text, _x, _y + fontHeight * i);
            });
          }
        }
      });
    });
  }
  function drawPath(ctx, elem, opts) {
    const { detail } = elem;
    const { originX, originY, originW, originH } = detail;
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
    const scaleW = w2 / originW;
    const scaleH = h2 / originH;
    const viewOriginX = originX * scaleW;
    const viewOriginY = originY * scaleH;
    const internalX = x2 - viewOriginX;
    const internalY = y2 - viewOriginY;
    const scaleNum = viewScaleInfo.scale * viewSizeInfo.devicePixelRatio;
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBox(ctx, viewElem, {
        originElem: elem,
        calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
        viewScaleInfo,
        viewSizeInfo,
        renderContent: () => {
          drawBoxShadow(ctx, viewElem, {
            viewScaleInfo,
            viewSizeInfo,
            renderContent: () => {
              ctx.save();
              ctx.translate(internalX, internalY);
              ctx.scale(scaleNum * scaleW / viewScaleInfo.scale, scaleNum * scaleH / viewScaleInfo.scale);
              const pathStr = generateSVGPath(detail.commands || []);
              const path2d = new Path2D(pathStr);
              if (detail.fill) {
                ctx.fillStyle = detail.fill;
                ctx.fill(path2d);
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
  function drawElement(ctx, elem, opts) {
    var _a;
    if (((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.invisible) === true) {
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
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = calculator.elementSize({ x: elem.x, y: elem.y, w: elem.w, h: elem.h, angle: elem.angle }, viewScaleInfo, viewSizeInfo);
    const viewElem = Object.assign(Object.assign({}, elem), { x: x2, y: y2, w: w2, h: h2, angle: angle2 });
    rotateElement(ctx, { x: x2, y: y2, w: w2, h: h2, angle: angle2 }, () => {
      drawBoxShadow(ctx, viewElem, {
        viewScaleInfo,
        viewSizeInfo,
        renderContent: () => {
          drawBox(ctx, viewElem, {
            originElem: elem,
            calcElemSize: { x: x2, y: y2, w: w2, h: h2, angle: angle2 },
            viewScaleInfo,
            viewSizeInfo,
            renderContent: () => {
              const { x: x3, y: y3, w: w3, h: h3, radiusList } = calcViewBoxSize(viewElem, {
                viewScaleInfo,
                viewSizeInfo
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
                ctx.fill();
                ctx.clip();
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
                const { calculator: calculator2 } = opts;
                for (let i = 0; i < elem.detail.children.length; i++) {
                  let child = elem.detail.children[i];
                  child = Object.assign(Object.assign({}, child), {
                    x: newParentSize.x + child.x,
                    y: newParentSize.y + child.y
                  });
                  if (!calculator2.isElementInView(child, opts.viewScaleInfo, opts.viewSizeInfo)) {
                    continue;
                  }
                  try {
                    drawElement(ctx, child, Object.assign({}, opts));
                  } catch (err) {
                    console.error(err);
                  }
                }
              }
              if (elem.detail.overflow === "hidden") {
                ctx.globalAlpha = 1;
                ctx.restore();
              }
            }
          });
        }
      });
    });
  }
  const defaultDetail = getDefaultElementDetailConfig();
  function drawElementList(ctx, data, opts) {
    const { elements = [] } = data;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elem = Object.assign(Object.assign({}, element), {
        detail: Object.assign(Object.assign({}, defaultDetail), element === null || element === void 0 ? void 0 : element.detail)
      });
      if (!opts.calculator.isElementInView(elem, opts.viewScaleInfo, opts.viewSizeInfo)) {
        continue;
      }
      try {
        drawElement(ctx, elem, opts);
      } catch (err) {
        console.error(err);
      }
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
      return createAssetId(source);
    }
    return createAssetId(`${createUUID()}-${element.uuid}-${createUUID()}-${createUUID()}`);
  };
  class Loader extends EventEmitter {
    constructor() {
      super();
      this._loadFuncMap = {};
      this._currentLoadItemMap = {};
      this._storageLoadItemMap = {};
      this._registerLoadFunc("image", (elem, assets) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const src = ((_a = assets[elem.detail.src]) === null || _a === void 0 ? void 0 : _a.value) || elem.detail.src;
        const content = yield loadImage(src);
        return {
          uuid: elem.uuid,
          lastModified: Date.now(),
          content
        };
      }));
      this._registerLoadFunc("html", (elem, assets) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        const html2 = ((_b = assets[elem.detail.html]) === null || _b === void 0 ? void 0 : _b.value) || elem.detail.html;
        const content = yield loadHTML(html2, {
          width: elem.detail.width || elem.w,
          height: elem.detail.height || elem.h
        });
        return {
          uuid: elem.uuid,
          lastModified: Date.now(),
          content
        };
      }));
      this._registerLoadFunc("svg", (elem, assets) => __awaiter(this, void 0, void 0, function* () {
        var _c;
        const svg2 = ((_c = assets[elem.detail.svg]) === null || _c === void 0 ? void 0 : _c.value) || elem.detail.svg;
        const content = yield loadSVG(svg2);
        return {
          uuid: elem.uuid,
          lastModified: Date.now(),
          content
        };
      }));
    }
    _registerLoadFunc(type, func) {
      this._loadFuncMap[type] = func;
    }
    _getLoadElementSource(element) {
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
    }
    _createLoadItem(element) {
      return {
        element,
        status: "null",
        content: null,
        error: null,
        startTime: -1,
        endTime: -1,
        source: this._getLoadElementSource(element)
      };
    }
    _emitLoad(item) {
      const assetId = getAssetIdFromElement(item.element);
      const storageItem = this._storageLoadItemMap[assetId];
      if (storageItem) {
        if (storageItem.startTime < item.startTime) {
          this._storageLoadItemMap[assetId] = item;
          this.trigger("load", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
        }
      } else {
        this._storageLoadItemMap[assetId] = item;
        this.trigger("load", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
      }
    }
    _emitError(item) {
      const assetId = getAssetIdFromElement(item.element);
      const storageItem = this._storageLoadItemMap[assetId];
      if (storageItem) {
        if (storageItem.startTime < item.startTime) {
          this._storageLoadItemMap[assetId] = item;
          this.trigger("error", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
        }
      } else {
        this._storageLoadItemMap[assetId] = item;
        this.trigger("error", Object.assign(Object.assign({}, item), { countTime: item.endTime - item.startTime }));
      }
    }
    _loadResource(element, assets) {
      const item = this._createLoadItem(element);
      const assetId = getAssetIdFromElement(element);
      this._currentLoadItemMap[assetId] = item;
      const loadFunc = this._loadFuncMap[element.type];
      if (typeof loadFunc === "function") {
        item.startTime = Date.now();
        loadFunc(element, assets).then((result) => {
          item.content = result.content;
          item.endTime = Date.now();
          item.status = "load";
          this._emitLoad(item);
        }).catch((err) => {
          console.warn(`Load element source "${item.source}" fail`, err, element);
          item.endTime = Date.now();
          item.status = "error";
          item.error = err;
          this._emitError(item);
        });
      }
    }
    _isExistingErrorStorage(element) {
      var _a;
      const assetId = getAssetIdFromElement(element);
      const existItem = (_a = this._currentLoadItemMap) === null || _a === void 0 ? void 0 : _a[assetId];
      if (existItem && existItem.status === "error" && existItem.source && existItem.source === this._getLoadElementSource(element)) {
        return true;
      }
      return false;
    }
    load(element, assets) {
      if (this._isExistingErrorStorage(element)) {
        return;
      }
      if (supportElementTypes.includes(element.type)) {
        this._loadResource(element, assets);
      }
    }
    getContent(element) {
      var _a, _b;
      const assetId = getAssetIdFromElement(element);
      return ((_b = (_a = this._storageLoadItemMap) === null || _a === void 0 ? void 0 : _a[assetId]) === null || _b === void 0 ? void 0 : _b.content) || null;
    }
  }
  class Renderer extends EventEmitter {
    constructor(opts) {
      super();
      this._loader = new Loader();
      this._opts = opts;
      this._init();
    }
    _init() {
      const { _loader: loader } = this;
      loader.on("load", (e) => {
        this.trigger("load", e);
      });
      loader.on("error", () => {
      });
    }
    updateOptions(opts) {
      this._opts = opts;
    }
    drawData(data, opts) {
      const { _loader: loader } = this;
      const { calculator } = this._opts;
      const { viewContext } = this._opts.viewContent;
      viewContext.clearRect(0, 0, viewContext.canvas.width, viewContext.canvas.height);
      const parentElementSize = {
        x: 0,
        y: 0,
        w: opts.viewSizeInfo.width,
        h: opts.viewSizeInfo.height
      };
      drawElementList(viewContext, data, Object.assign({
        loader,
        calculator,
        parentElementSize,
        elementAssets: data.assets
      }, opts));
    }
    scale(num) {
      const { sharer } = this._opts;
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
  }
  class Calculator {
    constructor(opts) {
      this._opts = opts;
    }
    elementSize(size, viewScaleInfo, viewSizeInfo) {
      return calcViewElementSize(size, { viewScaleInfo, viewSizeInfo });
    }
    isElementInView(elem, viewScaleInfo, viewSizeInfo) {
      return isElementInView(elem, { viewScaleInfo, viewSizeInfo });
    }
    isPointInElement(p, elem, viewScaleInfo, viewSizeInfo) {
      const context2d = this._opts.viewContent.boardContext;
      return isViewPointInElement(p, {
        context2d,
        element: elem,
        viewScaleInfo,
        viewSizeInfo
      });
    }
    getPointElement(p, opts) {
      const context2d = this._opts.viewContent.boardContext;
      return getViewPointAtElement(p, Object.assign(Object.assign({}, opts), { context2d }));
    }
  }
  function isBoardAvailableNum(num) {
    return num > 0 || num < 0 || num === 0;
  }
  class BoardWatcher extends EventEmitter {
    constructor(opts) {
      super();
      const store = new Store({ defaultStorage: { hasPointDown: false, prevClickPoint: null } });
      this._store = store;
      this._opts = opts;
      this._init();
    }
    _init() {
      const container = window;
      container.addEventListener("mousemove", (e) => {
        if (!this._isInTarget(e)) {
          return;
        }
        e.preventDefault();
        const point = this._getPoint(e);
        if (!this._isVaildPoint(point)) {
          return;
        }
        this.trigger("hover", { point });
      });
      container.addEventListener("mousedown", (e) => {
        if (!this._isInTarget(e)) {
          return;
        }
        e.preventDefault();
        const point = this._getPoint(e);
        if (!this._isVaildPoint(point)) {
          return;
        }
        this._store.set("hasPointDown", true);
        this.trigger("pointStart", { point });
      });
      container.addEventListener("mousemove", (e) => {
        if (!this._isInTarget(e)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const point = this._getPoint(e);
        if (!this._isVaildPoint(point)) {
          if (this._store.get("hasPointDown")) {
            this.trigger("pointLeave", { point });
            this._store.set("hasPointDown", false);
          }
          return;
        }
        if (this._store.get("hasPointDown") !== true) {
          return;
        }
        this.trigger("pointMove", { point });
      });
      container.addEventListener("mouseup", (e) => {
        this._store.set("hasPointDown", false);
        if (!this._isInTarget(e)) {
          return;
        }
        e.preventDefault();
        const point = this._getPoint(e);
        this.trigger("pointEnd", { point });
      });
      container.addEventListener("mouseleave", (e) => {
        this._store.set("hasPointDown", false);
        if (!this._isInTarget(e)) {
          return;
        }
        e.preventDefault();
        const point = this._getPoint(e);
        this.trigger("pointLeave", { point });
      });
      container.addEventListener("wheel", (e) => {
        if (!this._isInTarget(e)) {
          return;
        }
        const point = this._getPoint(e);
        if (!this._isVaildPoint(point)) {
          return;
        }
        e.preventDefault();
        const deltaX = e.deltaX > 0 || e.deltaX < 0 ? e.deltaX : 0;
        const deltaY = e.deltaY > 0 || e.deltaY < 0 ? e.deltaY : 0;
        if (e.ctrlKey === true && this.has("wheelScale")) {
          this.trigger("wheelScale", { deltaX, deltaY, point });
        } else if (this.has("wheel")) {
          this.trigger("wheel", { deltaX, deltaY, point });
        }
      }, { passive: false });
      container.addEventListener("click", (e) => {
        if (!this._isInTarget(e)) {
          return;
        }
        e.preventDefault();
        const point = this._getPoint(e);
        if (!this._isVaildPoint(point)) {
          return;
        }
        const maxLimitTime = 500;
        const t = Date.now();
        const preClickPoint = this._store.get("prevClickPoint");
        if (preClickPoint && t - preClickPoint.t <= maxLimitTime && Math.abs(preClickPoint.x - point.x) <= 5 && Math.abs(preClickPoint.y - point.y) <= 5) {
          this.trigger("doubleClick", { point });
        } else {
          this._store.set("prevClickPoint", point);
        }
      });
      container.addEventListener("contextmenu", (e) => {
        if (!this._isInTarget(e)) {
          return;
        }
        e.preventDefault();
        const point = this._getPoint(e);
        if (!this._isVaildPoint(point)) {
          return;
        }
      });
    }
    _isInTarget(e) {
      return e.target === this._opts.viewContent.boardContext.canvas;
    }
    _getPoint(e) {
      const boardCanvas = this._opts.viewContent.boardContext.canvas;
      const rect = boardCanvas.getBoundingClientRect();
      const p = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: Date.now()
      };
      return p;
    }
    _isVaildPoint(p) {
      const viewSize = this._opts.sharer.getActiveViewSizeInfo();
      const { width, height } = viewSize;
      if (isBoardAvailableNum(p.x) && isBoardAvailableNum(p.y) && p.x <= width && p.y <= height) {
        return true;
      }
      return false;
    }
  }
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
    offsetBottom: 0
  };
  class Sharer {
    constructor() {
      const activeStore = new Store({
        defaultStorage: defaultActiveStorage
      });
      const sharedStore = new Store({
        defaultStorage: {}
      });
      this._activeStore = activeStore;
      this._sharedStore = sharedStore;
    }
    getActiveStorage(key2) {
      return this._activeStore.get(key2);
    }
    setActiveStorage(key2, storage) {
      return this._activeStore.set(key2, storage);
    }
    getActiveStoreSnapshot() {
      return this._activeStore.getSnapshot();
    }
    getSharedStorage(key2) {
      return this._sharedStore.get(key2);
    }
    setSharedStorage(key2, storage) {
      return this._sharedStore.set(key2, storage);
    }
    getSharedStoreSnapshot() {
      return this._sharedStore.getSnapshot();
    }
    getActiveViewScaleInfo() {
      const viewScaleInfo = {
        scale: this._activeStore.get("scale"),
        offsetTop: this._activeStore.get("offsetTop"),
        offsetBottom: this._activeStore.get("offsetBottom"),
        offsetLeft: this._activeStore.get("offsetLeft"),
        offsetRight: this._activeStore.get("offsetRight")
      };
      return viewScaleInfo;
    }
    setActiveViewScaleInfo(viewScaleInfo) {
      const { scale, offsetTop, offsetBottom, offsetLeft, offsetRight } = viewScaleInfo;
      this._activeStore.set("scale", scale);
      this._activeStore.set("offsetTop", offsetTop);
      this._activeStore.set("offsetBottom", offsetBottom);
      this._activeStore.set("offsetLeft", offsetLeft);
      this._activeStore.set("offsetRight", offsetRight);
    }
    setActiveViewSizeInfo(size) {
      this._activeStore.set("width", size.width);
      this._activeStore.set("height", size.height);
      this._activeStore.set("devicePixelRatio", size.devicePixelRatio);
      this._activeStore.set("contextWidth", size.contextWidth);
      this._activeStore.set("contextHeight", size.contextHeight);
    }
    getActiveViewSizeInfo() {
      const sizeInfo = {
        width: this._activeStore.get("width"),
        height: this._activeStore.get("height"),
        devicePixelRatio: this._activeStore.get("devicePixelRatio"),
        contextWidth: this._activeStore.get("contextWidth"),
        contextHeight: this._activeStore.get("contextHeight")
      };
      return sizeInfo;
    }
  }
  const { requestAnimationFrame } = window;
  class Viewer extends EventEmitter {
    constructor(opts) {
      super();
      this._drawFrameSnapshotQueue = [];
      this._drawFrameStatus = "FREE";
      this._opts = opts;
      this._init();
    }
    _init() {
      const { renderer } = this._opts;
      renderer.on("load", () => {
        this.drawFrame();
      });
    }
    _drawAnimationFrame() {
      if (this._drawFrameStatus === "DRAWING" || this._drawFrameSnapshotQueue.length === 0) {
        return;
      } else {
        this._drawFrameStatus = "DRAWING";
      }
      const snapshot = this._drawFrameSnapshotQueue.shift();
      const { renderer, viewContent, beforeDrawFrame, afterDrawFrame } = this._opts;
      if (snapshot) {
        const { scale, offsetTop, offsetBottom, offsetLeft, offsetRight, width, height, contextHeight, contextWidth, devicePixelRatio } = snapshot.activeStore;
        if (snapshot === null || snapshot === void 0 ? void 0 : snapshot.activeStore.data) {
          renderer.drawData(snapshot.activeStore.data, {
            viewScaleInfo: {
              scale,
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
        beforeDrawFrame({ snapshot });
        viewContent.drawView();
        afterDrawFrame({ snapshot });
      }
      if (this._drawFrameSnapshotQueue.length === 0) {
        this._drawFrameStatus = "COMPLETE";
        return;
      }
      if (this._drawFrameStatus = "DRAWING") {
        requestAnimationFrame(() => {
          this._drawAnimationFrame();
        });
      }
    }
    drawFrame() {
      const { sharer } = this._opts;
      const activeStore = sharer.getActiveStoreSnapshot();
      const sharedStore = sharer.getSharedStoreSnapshot();
      this._drawFrameSnapshotQueue.push({
        activeStore,
        sharedStore
      });
      this._drawAnimationFrame();
    }
    scale(opts) {
      const { scale, point } = opts;
      const { sharer } = this._opts;
      const { moveX, moveY } = viewScale({
        scale,
        point,
        viewScaleInfo: sharer.getActiveViewScaleInfo(),
        viewSizeInfo: sharer.getActiveViewSizeInfo()
      });
      sharer.setActiveStorage("scale", scale);
      return { moveX, moveY };
    }
    scroll(opts) {
      const { sharer } = this._opts;
      const prevViewScaleInfo = sharer.getActiveViewScaleInfo();
      const { moveX, moveY } = opts;
      const viewSizeInfo = sharer.getActiveViewSizeInfo();
      const viewScaleInfo = viewScroll({
        moveX,
        moveY,
        viewScaleInfo: prevViewScaleInfo,
        viewSizeInfo
      });
      sharer.setActiveViewScaleInfo(viewScaleInfo);
      return viewScaleInfo;
    }
    updateViewScaleInfo(opts) {
      const { sharer } = this._opts;
      const viewScaleInfo = calcViewScaleInfo(opts, {
        viewSizeInfo: sharer.getActiveViewSizeInfo()
      });
      sharer.setActiveViewScaleInfo(viewScaleInfo);
      return viewScaleInfo;
    }
    resize(viewSize = {}) {
      const { sharer } = this._opts;
      const originViewSize = sharer.getActiveViewSizeInfo();
      const newViewSize = Object.assign(Object.assign({}, originViewSize), viewSize);
      const { width, height, devicePixelRatio } = newViewSize;
      const { underContext, boardContext, helperContext, viewContext } = this._opts.viewContent;
      boardContext.canvas.width = width * devicePixelRatio;
      boardContext.canvas.height = height * devicePixelRatio;
      boardContext.canvas.style.width = `${width}px`;
      boardContext.canvas.style.height = `${height}px`;
      underContext.canvas.width = width * devicePixelRatio;
      underContext.canvas.height = height * devicePixelRatio;
      helperContext.canvas.width = width * devicePixelRatio;
      helperContext.canvas.height = height * devicePixelRatio;
      viewContext.canvas.width = width * devicePixelRatio;
      viewContext.canvas.height = height * devicePixelRatio;
      sharer.setActiveViewSizeInfo(newViewSize);
      return newViewSize;
    }
  }
  const throttleTime = 10;
  const LOCK_MODES = ["RULER"];
  class Board {
    constructor(opts) {
      this._middlewares = [];
      this._middlewareObjs = [];
      this._activeMiddlewareObjs = [];
      this._eventHub = new EventEmitter();
      this._activeMode = "SELECT";
      const { viewContent } = opts;
      const sharer = new Sharer();
      const calculator = new Calculator({ viewContent });
      const watcher = new BoardWatcher({
        viewContent,
        sharer
      });
      const renderer = new Renderer({
        viewContent,
        sharer,
        calculator
      });
      this._opts = opts;
      this._sharer = sharer;
      this._watcher = watcher;
      this._calculator = calculator;
      this._viewer = new Viewer({
        viewContent: opts.viewContent,
        sharer,
        renderer,
        calculator,
        beforeDrawFrame: (e) => {
          this._handleBeforeDrawFrame(e);
        },
        afterDrawFrame: (e) => {
          this._handleAfterDrawFrame(e);
        }
      });
      this._init();
      this._resetActiveMiddlewareObjs();
    }
    _init() {
      this._watcher.on("pointStart", this._handlePointStart.bind(this));
      this._watcher.on("pointEnd", this._handlePointEnd.bind(this));
      this._watcher.on("pointMove", throttle((e) => {
        this._handlePointMove(e);
      }, throttleTime));
      this._watcher.on("hover", throttle((e) => {
        this._handleHover(e);
      }, throttleTime));
      this._watcher.on("wheel", throttle((e) => {
        this._handleWheel(e);
      }, throttleTime));
      this._watcher.on("wheelScale", throttle((e) => {
        this._handleWheelScale(e);
      }, throttleTime));
      this._watcher.on("scrollX", this._handleScrollX.bind(this));
      this._watcher.on("scrollY", this._handleScrollY.bind(this));
      this._watcher.on("resize", this._handleResize.bind(this));
      this._watcher.on("doubleClick", this._handleDoubleClick.bind(this));
    }
    _handlePointStart(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.pointStart) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handlePointEnd(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.pointEnd) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handlePointMove(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.pointMove) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleHover(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.hover) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleDoubleClick(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.doubleClick) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleWheel(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.wheel) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleWheelScale(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.wheelScale) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleScrollX(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.scrollX) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleScrollY(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.scrollY) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleResize(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.resize) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleClear(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.clear) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleBeforeDrawFrame(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.beforeDrawFrame) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _handleAfterDrawFrame(e) {
      var _a;
      for (let i = 0; i < this._activeMiddlewareObjs.length; i++) {
        const obj = this._activeMiddlewareObjs[i];
        const result = (_a = obj === null || obj === void 0 ? void 0 : obj.afterDrawFrame) === null || _a === void 0 ? void 0 : _a.call(obj, e);
        if (result === false) {
          return;
        }
      }
    }
    _resetActiveMiddlewareObjs() {
      const { _activeMode: activeMode } = this;
      const modes = [...LOCK_MODES, activeMode];
      const activeMiddlewareObjs = [];
      this._middlewareObjs.forEach((m) => {
        if (m.isDefault === true) {
          activeMiddlewareObjs.push(m);
        } else if (modes.includes(m.mode)) {
          activeMiddlewareObjs.push(m);
        }
      });
      this._activeMiddlewareObjs = activeMiddlewareObjs;
    }
    getSharer() {
      return this._sharer;
    }
    getViewer() {
      return this._viewer;
    }
    setData(data) {
      const sharer = this._sharer;
      this._sharer.setActiveStorage("data", data);
      const viewSizeInfo = sharer.getActiveViewSizeInfo();
      const newViewContextSize = calcElementsContextSize(data.elements, {
        viewWidth: viewSizeInfo.width,
        viewHeight: viewSizeInfo.height,
        extend: true
      });
      this._viewer.drawFrame();
      const newViewSizeInfo = Object.assign(Object.assign({}, viewSizeInfo), newViewContextSize);
      this._sharer.setActiveViewSizeInfo(newViewSizeInfo);
      return { viewSizeInfo: newViewSizeInfo };
    }
    getData() {
      const { data } = this._sharer.getActiveStoreSnapshot();
      return data;
    }
    use(middleware) {
      const { viewContent, container } = this._opts;
      const { _sharer: sharer, _viewer: viewer, _calculator: calculator, _eventHub: eventHub } = this;
      const obj = middleware({ viewContent, sharer, viewer, calculator, eventHub, container });
      this._middlewares.push(middleware);
      this._activeMiddlewareObjs.push(obj);
    }
    scale(opts) {
      const { _viewer: viewer } = this;
      const { moveX, moveY } = viewer.scale(opts);
      viewer.scroll({ moveX, moveY });
    }
    scroll(opts) {
      return this._viewer.scroll(opts);
    }
    updateViewScaleInfo(opts) {
      return this._viewer.updateViewScaleInfo(opts);
    }
    resize(newViewSize) {
      const viewSize = this._viewer.resize(newViewSize);
      const { width, height, devicePixelRatio } = newViewSize;
      const { viewContent } = this._opts;
      viewContent.viewContext.$resize({ width, height, devicePixelRatio });
      viewContent.helperContext.$resize({ width, height, devicePixelRatio });
      viewContent.boardContext.$resize({ width, height, devicePixelRatio });
      this._viewer.drawFrame();
      this._watcher.trigger("resize", viewSize);
      this._sharer.setActiveViewSizeInfo(newViewSize);
    }
    clear() {
      const { viewContent } = this._opts;
      const { underContext, helperContext, viewContext, boardContext } = viewContent;
      underContext.clearRect(0, 0, underContext.canvas.width, underContext.canvas.height);
      helperContext.clearRect(0, 0, helperContext.canvas.width, helperContext.canvas.height);
      viewContext.clearRect(0, 0, viewContext.canvas.width, viewContext.canvas.height);
      boardContext.clearRect(0, 0, boardContext.canvas.width, boardContext.canvas.height);
      this._handleClear();
    }
    getEventHub() {
      return this._eventHub;
    }
  }
  const CURSOR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDktMTdUMTY6MDc6MjYrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA5LTE3VDE2OjEyOjUwKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA5LTE3VDE2OjEyOjUwKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjliMGM0MzI2LWU4ZTQtNDlkNy04MmUzLTgxODkwYTE2ZmU1YSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjMzOGFhZDBmLWZkZjMtODE0MS1iMTZmLWNiZWIzNTQyYTJhMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUwODAxNzc1LWZlNGEtNDQyMy05NDQ3LThkYWRhNzZhYTllOSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTA4MDE3NzUtZmU0YS00NDIzLTk0NDctOGRhZGE3NmFhOWU5IiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjA3OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWIwYzQzMjYtZThlNC00OWQ3LTgyZTMtODE4OTBhMTZmZTVhIiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjEyOjUwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7W6XrzAAAGLklEQVRYhb2Xf2iUdRzHX/txtfXLplZ6Wblm6fzRmG6r7Uou1AxKRjQKYUqgaLBACFogppcK1h8aLRkMSYaJIA5hYMomZpskEfPOufCaDpZ6t7rbre263U3vzn3643meu+eu3XNzvz7w4bbdc/e89nl/Pu/v50HUCAQCx1tbW0uAx4CHgSwggxkKERkziUQif2mQ0WjU53a7vwSeBB4BTEDmTICmBBwYGDivVlDjlFAo9KvT6dwIPAHkANkq6MwDXr169bCISENDg9TX14s+BgcHf2hubi5mBmRPCXj06NFPREQ6OjoEkPLycrl06VIMMhKJeFwu1xdMs+wpAYuLi9eIiIyOjkpeXp4AAsj27dvF7/fHQIPB4C9dXV0fME2ypwQEXvX7/bdFRNauXRsDBMRkMsnhw4cTZB8YGGhsamp6hSmW3Qhw1Y0bN86LiNTW1iYAallWViZtbW162ftcLtdO/i/7tAAWtba2ficicvLkyTEBtdy6dasMDg7GQIeHh9s7OzvfBx5nkrIbAS7du3fvxyIiPT09hoBa1tXVJcv+fWNj4zLgUeAhJiC7EeDLwOsiMioisnDhwnFBrlixQi5evKiX/c6tW7c+R5E9lweU3QjwReDV/v7+bhGRqqqqcQFquWnTJvH5fHrZLzocjkoSZU9bTSPA54GV165daxYROXDgwAMBannw4MFk2RsaGhqWME7ZjQDNwIrTp09/JSLS0tIyIUBACgoK5MKFCzHIcDj85+3btz8FZpFGdiPAZ4DCmpqaTSIiPp9vwoBaVlVVidfr1ct+/sqVK+9iILsR4FzgJcASDoeHRUSKioomDQnI/v37E2T3+Xz1hw4dWjSW7EaAeUA+UNbX12cXEdmyZcuUAAJiNpvlzJkzetl73G53rVrN2EmUCjATuA9EgYjL5eoGKCkpGatNHijmz5/Pxo0b2blzJ2azOfZ3k8lUYDabv45Go/Y7d+6sIY0VZQOjGqDT6bxeWlrKqlWrJgRlsVhYv349FRUVWCwWcnJyEt4PBoOuoaEhu9frvdzR0fHTtm3buolvRpLqe3OBp4EllZWV74mIRKNRyc3NTSvf7Nmzpbq6Wk6cOCFut1uSY2RkJOB0Ou3Nzc3Ha2trPwPWAGXAEuBZFFPPAbKMevBhYA6wCKgIBoP9IiKrV682hLPZbP8DEpH7vb29N1paWn602WwHFyxYsAX4EKgE3gIsQBFQgOIeT6j3z0wFqEkc60OPx9Odn58/t6SkhPb29jFLbrVa2bNnDwBer7fv5s2bPQ6Ho7upqcnZ1tbmASJq3gPC6utdYESXYfWeo6mkBaUHRQ/odrv/yM/Pt5SWlqb8kAbncDh+W7lyZYN683u6DOvAwipsOOnniA4wZf9lqhdoVYzY7fbrQMpBsdlsWK1WRkZGAtXV1d8D/wA+wKNLr5o+YEC9ZggIAEHiFbyfDhCUCcoFngIWFxYWrtMaat68eQl9V15eHmu2+vr6OuAd4A2gGFgMLERp/mdQ+noWyuadi9Jr2aQ4k42GBPXDs1Ga97WhoaFbIiIbNmxIANTWq87Ozp9VuApgGfACihPkoRjwI+p3mlSgtA9ZRkYNYwwKJBr2rl27sFqthEKhwZqamqOAX5f/AsPE5btLvM/GJWO6yFb/82eBonPnztWJiJw9e1YAWb58eUzaI0eOfAO8CbwCPIfiZZN+eEoncSaKLPOApbt3794uIuL1ehOktdvtF4C3gRKURXcOSn9lTRRsvIAZKI4+l/gjQFREZMeOHSIiEggE+tetW/cRitkuRhmERxnnxjxZQFDWnzzURwCv1+vUHxHHjh37lri0C1Am9KGpgDMC1G8SQnxxCHs8Hqf2RldX10+bN28+i+JjwyT62KSaP13oAfWTHO7t7f0dIBQK/b1v375GlEnVjPYuyoQaHlNTDahVMALca29vdwBcvnz5+KlTp26OATft1UuODBS7yEOxj0K/329HOSWWopjxlE1tchhtM7FriPfgXSDDbrfXo0gbJr4QzIi0WiRPYBbKZJrUV23b0dYn7XSYcsBkS9EiO/k6lApq1cwiPjzaAM1Y9cYC1G6uAWrPCtrvMwoHqU02Q5caIEzj1KaS+D+vIjxtLug31gAAAABJRU5ErkJggg==";
  const CURSOR_RESIZE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDktMTdUMTY6MzE6MjMrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA5LTE3VDE2OjQ0OjIyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA5LTE3VDE2OjQ0OjIyKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY0MTBhYjUzLWM0ZjEtNDVhNS04MjhkLTIxOTczOWFjOTk3MSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjBkMDNmNjM5LTE5MzctY2Y0MC1hMTg0LTIyMjg0NzczNWNmYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjgyYjQwZGRmLWE0ZGEtNDY3MC1iYzc2LTBhYjY3ZmI5M2I0ZSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODJiNDBkZGYtYTRkYS00NjcwLWJjNzYtMGFiNjdmYjkzYjRlIiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjMxOjIzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjQxMGFiNTMtYzRmMS00NWE1LTgyOGQtMjE5NzM5YWM5OTcxIiBzdEV2dDp3aGVuPSIyMDIzLTA5LTE3VDE2OjQ0OjIyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz57vRudAAAEk0lEQVRYhe3ZW0jbVxzA8e8/MX+NYnG9uI4xE3bvoLt0FzradRfGBtsYo32YdAhb6WQyBqV7KOylpYjzZShDGfjmyxgbgjjwyRm16SYMhgiNKDhbL3VtNF4xJOnf3x7+59i/Wf4aTbInf3AwJMdzPjnnf/n9/jFEhGzDMIxMb3uAIsDs6ek5urS05Dtz5syE+uwekAQS6u89YD19gC0NIpJ1c8GZQHlXV9fJRCIxGo/HxxoaGj4CngWOAEGgEihXfT07MeQC3MB1dna+lkgkRkXF6urq3xcuXPgUOAE8DzwGPOiGLARwEy4ej4+JiITD4elr167NiIgsLi7eqq2trQPeBI4Bj7sh8w10xZmmeds0zdn+/v5/RERisdjUuXPnvgLeAl50Q+YTaAA+oKy7u/uE3laNAwSQ4uLiu6FQ6G4G5DG13YeAMjWWkU+gBygJhULHNe769etTTpwDGXUiz58//yXwujp5qoAHgBLAk0+gNxKJHEulUiMKN2ma5gwgPp/vjhOXjlxYWJisq6urBV5RW30IKAW8eQPGYrGjlmXdEBEZHBy8aZrmFCCmac729fVtAHt7e6MO5N2+vr47IiJLS0s3L126dBZ4Sh2LZUBRwVdwYGBgVuwOYh/zsoF0bnPBVzDTMRgOh6dFhROokSIi8/Pz0+pEeaPQx+DGWdzV1XVSX2LcgCIic3NzMzU1NV8D7wIvq9WrLNRZvOk62NHRccqJTAdGo9Hb1dXV3wAfYt9VjgAPFfI66EQWAxU9PT0fuwEvXrzYBJwF3gFeAAJAhfrfrO4k/7lxZxnr2JlJqry8POnWyePx6H4JR0vhktVkHGOXQI20SkpKLLcOhmGsA5YCaZiVLS5XoADi9XpdkznDMERhnE0fCgUHZhvOW+CO4/8A5hR7wFxjD5hr7AFzjZyBlmVlrOYdYaS1HUUuQA/gWV9fd51URDyqn1c1j6MVFGjoidfW1oq2ABrYj0V82OmVzwHNajVdB88C5wOKTdM87NaxsrKyQsFKHC2BnTDo+/TWt8Bd5INeVC44NDT0xXYZdXNz8w/AaeyS8yjwCPdzQu92ht2m/OUjIyOfS1pkAoqItLS0fA+8D7wKPA0cxs6qC1O4T0xMfKYnb21tnXEDNjc3z+nXbW1t3wFvYz9dCAL7KUThHovFPtGTNjU1jQFSX18/lg68cuXKLUAaGxs3vkB7e/u3wHHgCQpUdnpTqdQvesJgMDisUVevXh3Xry9fvnxTv66qqprQ/cfHx/vVNj/J/couv0DAv7q6+pMDeYPNSalkwkUikX7s4ukl4FHgAODPN1CXnPsWFxd/dCAjW+GGhoZCwAfYpeczwMPAPjVW3gv3IvXN98disZ8dyBGNCwQC4/r94eHhfuy6+JS6zATUCeJXY+W9cNfIUuDAwsLCr05kIBDYeBQ8Ojr6h8Lpx25BtbWlGpfv62BG5PLy8m+SFpOTk38C76mVe84NVyhgOvLgysrK7xoXjUb/Uqt2XG1rEDiYCbcd0MgwsWtk+J1EI03An0wmw5Zlefx+/2n1eRKIO5r+rWTTpFsZ/gWFrGMmeObuqwAAAABJRU5ErkJggg==";
  class Cursor {
    constructor(container, opts) {
      this._cursorType = null;
      this._resizeCursorBaseImage = null;
      this._cursorImageMap = {
        auto: CURSOR,
        "rotate-0": CURSOR_RESIZE
      };
      this._container = container;
      this._eventHub = opts.eventHub;
      this._init();
      this._loadResizeCursorBaseImage();
    }
    _init() {
      const { _eventHub: eventHub } = this;
      this._resetCursor("auto");
      eventHub.on("cursor", (e) => {
        var _a;
        if (e.type === "over-element" || !e.type) {
          this._resetCursor("auto");
        } else if (typeof e.type === "string" && ((_a = e.type) === null || _a === void 0 ? void 0 : _a.startsWith("resize-"))) {
          this._setCursorResize(e);
        } else {
          this._resetCursor("auto");
        }
      });
    }
    _loadResizeCursorBaseImage() {
      loadImage(CURSOR_RESIZE).then((img) => {
        this._resizeCursorBaseImage = img;
      }).catch((err) => {
        console.error(err);
      });
    }
    _resetCursor(cursorKey) {
      if (this._cursorType === cursorKey) {
        return;
      }
      this._cursorType = cursorKey;
      const image = this._cursorImageMap[this._cursorType] || this._cursorImageMap["auto"];
      let offsetX = 0;
      let offsetY = 0;
      if (cursorKey.startsWith("rotate-") && this._cursorImageMap[this._cursorType]) {
        offsetX = 10;
        offsetY = 10;
      }
      this._container.style.cursor = `image-set(url(${image})2x) ${offsetX} ${offsetY}, auto`;
    }
    _setCursorResize(e) {
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
      const cursorKey = this._appendRotateResizeImage(totalAngle);
      this._resetCursor(cursorKey);
    }
    _appendRotateResizeImage(angle2) {
      const key2 = `rotate-${angle2}`;
      if (!this._cursorImageMap[key2]) {
        const baseImage = this._resizeCursorBaseImage;
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
          this._cursorImageMap[key2] = base;
        }
      }
      return key2;
    }
  }
  const key$1 = "SELECT";
  const keyActionType = Symbol(`${key$1}_actionType`);
  const keyResizeType = Symbol(`${key$1}_resizeType`);
  const keyAreaStart = Symbol(`${key$1}_areaStart`);
  const keyAreaEnd = Symbol(`${key$1}_areaEnd`);
  const keyHoverElement = Symbol(`${key$1}_hoverElement`);
  const keyHoverElementVertexes = Symbol(`${key$1}_hoverElementVertexes`);
  const keySelectedElementList = Symbol(`${key$1}_selectedElementList`);
  const keySelectedElementListVertexes = Symbol(`${key$1}_selectedElementListVertexes`);
  const keySelectedElementController = Symbol(`${key$1}_selectedElementController`);
  const keyGroupQueue = Symbol(`${key$1}_groupQueue`);
  const keyGroupQueueVertexesList = Symbol(`${key$1}_groupQueueVertexesList`);
  const resizeControllerBorderWidth = 2;
  const wrapperColor = "#1973ba";
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
    ctx.fill();
  }
  function drawHoverVertexesWrapper(ctx, vertexes, opts) {
    if (!vertexes) {
      return;
    }
    const wrapperOpts = { borderColor: wrapperColor, borderWidth: 1, background: "transparent", lineDash: [] };
    drawVertexes(ctx, calcViewVertexes(vertexes, opts), wrapperOpts);
  }
  function drawSelectedElementControllersVertexes(ctx, controller, opts) {
    if (!controller) {
      return;
    }
    const { elementWrapper, left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight } = controller;
    const wrapperOpts = { borderColor: wrapperColor, borderWidth: 1, background: "transparent", lineDash: [] };
    const ctrlOpts = Object.assign(Object.assign({}, wrapperOpts), { borderWidth: resizeControllerBorderWidth, background: "#FFFFFF" });
    drawVertexes(ctx, calcViewVertexes(elementWrapper, opts), wrapperOpts);
    drawVertexes(ctx, calcViewVertexes(topLeft.vertexes, opts), ctrlOpts);
    drawVertexes(ctx, calcViewVertexes(topRight.vertexes, opts), ctrlOpts);
    drawVertexes(ctx, calcViewVertexes(bottomLeft.vertexes, opts), ctrlOpts);
    drawVertexes(ctx, calcViewVertexes(bottomRight.vertexes, opts), ctrlOpts);
  }
  function drawArea(ctx, opts) {
    const { start, end } = opts;
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = wrapperColor;
    ctx.fillStyle = "#1976d24f";
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineTo(start.x, end.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  function drawListArea(ctx, opts) {
    const { areaSize } = opts;
    const { x: x2, y: y2, w: w2, h: h2 } = areaSize;
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = wrapperColor;
    ctx.fillStyle = "#1976d21c";
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + w2, y2);
    ctx.lineTo(x2 + w2, y2 + h2);
    ctx.lineTo(x2, y2 + h2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  function drawGroupQueueVertexesWrappers(ctx, vertexesList, opts) {
    for (let i = 0; i < vertexesList.length; i++) {
      const vertexes = vertexesList[i];
      const wrapperOpts = { borderColor: wrapperColor, borderWidth: 2, background: "transparent", lineDash: [4, 4] };
      drawVertexes(ctx, calcViewVertexes(vertexes, opts), wrapperOpts);
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
    const { ctx, viewScaleInfo, viewSizeInfo, vertexes } = opts;
    const v0 = calcViewPointSize(vertexes[0], { viewScaleInfo, viewSizeInfo });
    const v1 = calcViewPointSize(vertexes[1], { viewScaleInfo, viewSizeInfo });
    const v2 = calcViewPointSize(vertexes[2], { viewScaleInfo, viewSizeInfo });
    const v3 = calcViewPointSize(vertexes[3], { viewScaleInfo, viewSizeInfo });
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
    return isPointInViewActiveVertexes(p, { ctx, vertexes, viewScaleInfo, viewSizeInfo });
  }
  function getPointTarget(p, opts) {
    var _a, _b, _c;
    const target = {
      type: null,
      elements: [],
      elementVertexesList: [],
      groupQueue: [],
      groupQueueVertexesList: []
    };
    const { ctx, data, calculator, selectedElements, viewScaleInfo, viewSizeInfo, areaSize, groupQueue, selectedElementController } = opts;
    if (selectedElementController) {
      const { left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight } = selectedElementController;
      const ctrls = [left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight];
      for (let i = 0; i < ctrls.length; i++) {
        const ctrl = ctrls[i];
        if (isPointInViewActiveVertexes(p, { ctx, vertexes: ctrl.vertexes, viewSizeInfo, viewScaleInfo })) {
          target.type = `resize-${ctrl.type}`;
          if (selectedElements && (selectedElements === null || selectedElements === void 0 ? void 0 : selectedElements.length) > 0) {
            target.groupQueue = groupQueue || [];
            target.elements = [selectedElements[0]];
          }
          break;
        }
      }
    }
    if (groupQueue && Array.isArray(groupQueue) && groupQueue.length > 0) {
      const lastGroup = groupQueue[groupQueue.length - 1];
      if (((_a = lastGroup === null || lastGroup === void 0 ? void 0 : lastGroup.detail) === null || _a === void 0 ? void 0 : _a.children) && Array.isArray((_b = lastGroup === null || lastGroup === void 0 ? void 0 : lastGroup.detail) === null || _b === void 0 ? void 0 : _b.children)) {
        for (let i = lastGroup.detail.children.length - 1; i >= 0; i--) {
          const child = lastGroup.detail.children[i];
          const vertexes = calcElementVertexesInGroup(child, { groupQueue });
          if (vertexes && isPointInViewActiveVertexes(p, { ctx, vertexes, viewScaleInfo, viewSizeInfo })) {
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
      if (index >= 0 && element && ((_c = element === null || element === void 0 ? void 0 : element.operations) === null || _c === void 0 ? void 0 : _c.invisible) !== true) {
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
    const elemCenter = calcElementCenter({ x: x2, y: y2, w: w2, h: h2, angle: angle2 });
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
  function getSelectedListArea(data, opts) {
    const indexes = [];
    const uuids = [];
    const elements = [];
    const { calculator, viewScaleInfo, viewSizeInfo, start, end } = opts;
    if (!(Array.isArray(data.elements) && start && end)) {
      return { indexes, uuids, elements };
    }
    const startX = Math.min(start.x, end.x);
    const endX = Math.max(start.x, end.x);
    const startY = Math.min(start.y, end.y);
    const endY = Math.max(start.y, end.y);
    data.elements.forEach((elem, idx) => {
      const elemSize = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
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
    });
    return { indexes, uuids, elements };
  }
  function calcSelectedElementsArea(elements, opts) {
    var _a;
    if (!Array.isArray(elements)) {
      return null;
    }
    const area = { x: 0, y: 0, w: 0, h: 0 };
    const { calculator, viewScaleInfo, viewSizeInfo } = opts;
    let prevElemSize = null;
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      if ((_a = elem === null || elem === void 0 ? void 0 : elem.operations) === null || _a === void 0 ? void 0 : _a.invisible) {
        continue;
      }
      const elemSize = calculator.elementSize(elem, viewScaleInfo, viewSizeInfo);
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
  function calcMoveInGroup(start, end, groupQueue) {
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
  const middlewareEventTextEdit = "@middleware/text-edit";
  const defaultElementDetail = getDefaultElementDetailConfig();
  const MiddlewareTextEditor = (opts) => {
    const key2 = "SELECT";
    const { eventHub, viewContent, viewer } = opts;
    const canvas = viewContent.boardContext.canvas;
    const textarea = document.createElement("textarea");
    const canvasWrapper = document.createElement("div");
    const container = opts.container || document.body;
    const mask = document.createElement("div");
    let activeElem = null;
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
    };
    const hideTextArea = () => {
      mask.style.display = "none";
      activeElem = null;
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
      textarea.style.position = "absolute";
      textarea.style.left = `${elemX}px`;
      textarea.style.top = `${elemY}px`;
      textarea.style.width = `${elemW}px`;
      textarea.style.height = `${elemH}px`;
      textarea.style.transform = `rotate(${limitAngle(element.angle || 0)}deg)`;
      textarea.style.boxSizing = "border-box";
      textarea.style.border = "1px solid #1973ba";
      textarea.style.resize = "none";
      textarea.style.overflow = "hidden";
      textarea.style.wordBreak = "break-all";
      textarea.style.background = "#FFFFFF";
      textarea.style.color = "#333333";
      textarea.style.fontSize = `${detail.fontSize * scale}px`;
      textarea.style.lineHeight = `${detail.lineHeight * scale}px`;
      textarea.style.fontFamily = detail.fontFamily;
      textarea.style.fontWeight = `${detail.fontWeight}`;
      textarea.value = detail.text || "";
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
    mask.addEventListener("click", () => {
      hideTextArea();
    });
    textarea.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    textarea.addEventListener("input", (e) => {
      if (activeElem) {
        activeElem.detail.text = e.target.value || "";
        viewer.drawFrame();
      }
    });
    textarea.addEventListener("blur", () => {
      hideTextArea();
    });
    eventHub.on(middlewareEventTextEdit, (e) => {
      var _a;
      if ((e === null || e === void 0 ? void 0 : e.element) && ((_a = e === null || e === void 0 ? void 0 : e.element) === null || _a === void 0 ? void 0 : _a.type) === "text") {
        activeElem = e.element;
      }
      showTextArea(e);
    });
    return {
      mode: key2,
      isDefault: true
    };
  };
  const middlewareEventSelect = "@middleware/select";
  const MiddlewareSelector = (opts) => {
    const { viewer, sharer, viewContent, calculator, eventHub } = opts;
    const { helperContext } = viewContent;
    let prevPoint = null;
    let inBusyMode = null;
    eventHub.on(middlewareEventSelect, ({ uuids, positions }) => {
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
    });
    sharer.setSharedStorage(keyActionType, null);
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
    const updateSelectedElementList = (list, opts2) => {
      sharer.setSharedStorage(keySelectedElementList, list);
      if (list.length === 1) {
        const controller = calcElementSizeController(list[0], {
          groupQueue: sharer.getSharedStorage(keyGroupQueue),
          controllerSize: 10,
          viewScaleInfo: sharer.getActiveViewScaleInfo()
        });
        sharer.setSharedStorage(keySelectedElementController, controller);
      } else {
        sharer.setSharedStorage(keySelectedElementController, null);
      }
      if ((opts2 === null || opts2 === void 0 ? void 0 : opts2.triggerEvent) === true) {
        eventHub.trigger(middlewareEventSelect, { uuids: list.map((elem) => elem.uuid) });
      }
    };
    const pointTargetBaseOptions = () => {
      return {
        ctx: helperContext,
        calculator,
        data: sharer.getActiveStorage("data"),
        selectedElements: getActiveElements(),
        viewScaleInfo: sharer.getActiveViewScaleInfo(),
        viewSizeInfo: sharer.getActiveViewSizeInfo(),
        groupQueue: sharer.getSharedStorage(keyGroupQueue),
        areaSize: null,
        selectedElementController: sharer.getSharedStorage(keySelectedElementController)
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
    };
    clear();
    return {
      mode: key$1,
      hover: (e) => {
        var _a, _b;
        const resizeType = sharer.getSharedStorage(keyResizeType);
        const actionType = sharer.getSharedStorage(keyActionType);
        const groupQueue = sharer.getSharedStorage(keyGroupQueue);
        const triggerCursor = (target2) => {
          let cursor = target2.type;
          if (inBusyMode === null) {
            eventHub.trigger("cursor", {
              type: cursor,
              groupQueue: target2.groupQueue,
              element: target2.elements[0]
            });
          }
        };
        if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
          const isInActiveGroup = isPointInViewActiveGroup(e.point, {
            ctx: helperContext,
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
        const viewSizeInfo = sharer.getActiveViewSizeInfo();
        const target = getPointTarget(e.point, Object.assign(Object.assign({}, pointTargetBaseOptions()), { areaSize: calcSelectedElementsArea(selectedElements, {
          viewScaleInfo,
          viewSizeInfo,
          calculator
        }) }));
        triggerCursor(target);
        if (target.type === "over-element" && ((_b = target === null || target === void 0 ? void 0 : target.elements) === null || _b === void 0 ? void 0 : _b.length) === 1) {
          sharer.setSharedStorage(keyHoverElement, target.elements[0]);
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
        var _a, _b, _c, _d;
        prevPoint = e.point;
        updateHoverElement(null);
        const groupQueue = sharer.getSharedStorage(keyGroupQueue);
        if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
          if (isPointInViewActiveGroup(e.point, {
            ctx: helperContext,
            viewScaleInfo: sharer.getActiveViewScaleInfo(),
            viewSizeInfo: sharer.getActiveViewSizeInfo(),
            groupQueue
          })) {
            const target2 = getPointTarget(e.point, pointTargetBaseOptions());
            updateHoverElement(null);
            if (target2.type === "over-element" && ((_a = target2 === null || target2 === void 0 ? void 0 : target2.elements) === null || _a === void 0 ? void 0 : _a.length) === 1) {
              updateSelectedElementList([target2.elements[0]], { triggerEvent: true });
              sharer.setSharedStorage(keyActionType, "drag");
            } else if ((_b = target2.type) === null || _b === void 0 ? void 0 : _b.startsWith("resize-")) {
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
          viewSizeInfo: sharer.getActiveViewSizeInfo(),
          calculator
        });
        const target = getPointTarget(e.point, Object.assign(Object.assign({}, pointTargetBaseOptions()), { areaSize: listAreaSize, groupQueue: [] }));
        if (target.type === "list-area") {
          sharer.setSharedStorage(keyActionType, "drag-list");
        } else if (target.type === "over-element" && ((_c = target === null || target === void 0 ? void 0 : target.elements) === null || _c === void 0 ? void 0 : _c.length) === 1) {
          updateSelectedElementList([target.elements[0]], { triggerEvent: true });
          sharer.setSharedStorage(keyActionType, "drag");
        } else if ((_d = target.type) === null || _d === void 0 ? void 0 : _d.startsWith("resize-")) {
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
        const data = sharer.getActiveStorage("data");
        const elems = getActiveElements();
        const scale = sharer.getActiveStorage("scale") || 1;
        const start = prevPoint;
        const end = e.point;
        const resizeType = sharer.getSharedStorage(keyResizeType);
        const actionType = sharer.getSharedStorage(keyActionType);
        const groupQueue = sharer.getSharedStorage(keyGroupQueue);
        if (actionType === "drag") {
          inBusyMode = "drag";
          if (data && (elems === null || elems === void 0 ? void 0 : elems.length) === 1 && start && end) {
            const { moveX, moveY } = calcMoveInGroup(start, end, groupQueue);
            elems[0].x += moveX / scale;
            elems[0].y += moveY / scale;
            updateSelectedElementList([elems[0]]);
          }
          viewer.drawFrame();
        } else if (actionType === "drag-list") {
          inBusyMode = "drag-list";
          if (data && start && end && (elems === null || elems === void 0 ? void 0 : elems.length) > 1) {
            const moveX = (end.x - start.x) / scale;
            const moveY = (end.y - start.y) / scale;
            elems.forEach((elem) => {
              if (elem) {
                elem.x += moveX;
                elem.y += moveY;
              }
            });
            sharer.setActiveStorage("data", data);
          }
          viewer.drawFrame();
        } else if (actionType === "resize") {
          if (data && (elems === null || elems === void 0 ? void 0 : elems.length) === 1 && start && (resizeType === null || resizeType === void 0 ? void 0 : resizeType.startsWith("resize-"))) {
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
            let resizeStart = start;
            let resizeEnd = end;
            if (groupQueue.length > 0) {
              resizeStart = rotatePointInGroup(start, pointGroupQueue);
              resizeEnd = rotatePointInGroup(end, pointGroupQueue);
            }
            const resizedElemSize = resizeElement(elems[0], { scale, start: resizeStart, end: resizeEnd, resizeType, sharer });
            elems[0].x = resizedElemSize.x;
            elems[0].y = resizedElemSize.y;
            elems[0].w = resizedElemSize.w;
            elems[0].h = resizedElemSize.h;
            updateSelectedElementList([elems[0]]);
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
        const data = sharer.getActiveStorage("data");
        const resizeType = sharer.getSharedStorage(keyResizeType);
        const actionType = sharer.getSharedStorage(keyActionType);
        const viewSizeInfo = sharer.getActiveViewSizeInfo();
        let needDrawFrame = false;
        prevPoint = null;
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
                calculator,
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
            eventHub.trigger("change", { data });
          }
          viewer.drawFrame();
        };
        finalDrawFrame();
      },
      pointLeave() {
        prevPoint = null;
        clear();
        viewer.drawFrame();
      },
      doubleClick(e) {
        var _a, _b;
        const target = getPointTarget(e.point, pointTargetBaseOptions());
        if (target.elements.length === 1 && ((_a = target.elements[0]) === null || _a === void 0 ? void 0 : _a.type) === "group") {
          const pushResult = pushGroupQueue(target.elements[0]);
          if (pushResult === true) {
            sharer.setSharedStorage(keyActionType, null);
            viewer.drawFrame();
            return;
          }
        } else if (target.elements.length === 1 && ((_b = target.elements[0]) === null || _b === void 0 ? void 0 : _b.type) === "text") {
          eventHub.trigger(middlewareEventTextEdit, {
            element: target.elements[0],
            groupQueue: sharer.getSharedStorage(keyGroupQueue) || [],
            viewScaleInfo: sharer.getActiveViewScaleInfo()
          });
        }
        sharer.setSharedStorage(keyActionType, null);
      },
      beforeDrawFrame({ snapshot }) {
        const { activeStore, sharedStore } = snapshot;
        const { scale, offsetLeft, offsetTop, offsetRight, offsetBottom, width, height, contextHeight, contextWidth, devicePixelRatio } = activeStore;
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
        const drawBaseOpts = { calculator, viewScaleInfo, viewSizeInfo };
        const selectedElementController = elem ? calcElementSizeController(elem, {
          groupQueue,
          controllerSize: 10,
          viewScaleInfo
        }) : null;
        if ((groupQueue === null || groupQueue === void 0 ? void 0 : groupQueue.length) > 0) {
          drawGroupQueueVertexesWrappers(helperContext, groupQueueVertexesList, drawBaseOpts);
          if (hoverElement && actionType !== "drag") {
            drawHoverVertexesWrapper(helperContext, hoverElementVertexes, drawBaseOpts);
          }
          if (elem && ["select", "drag", "resize"].includes(actionType)) {
            drawSelectedElementControllersVertexes(helperContext, selectedElementController, Object.assign({}, drawBaseOpts));
          }
        } else {
          if (hoverElement && actionType !== "drag") {
            drawHoverVertexesWrapper(helperContext, hoverElementVertexes, drawBaseOpts);
          }
          if (elem && ["select", "drag", "resize"].includes(actionType)) {
            drawSelectedElementControllersVertexes(helperContext, selectedElementController, Object.assign({}, drawBaseOpts));
          } else if (actionType === "area" && areaStart && areaEnd) {
            drawArea(helperContext, { start: areaStart, end: areaEnd });
          } else if (["drag-list", "drag-list-end"].includes(actionType)) {
            const listAreaSize = calcSelectedElementsArea(getActiveElements(), {
              viewScaleInfo: sharer2.getActiveViewScaleInfo(),
              viewSizeInfo: sharer2.getActiveViewSizeInfo(),
              calculator
            });
            if (listAreaSize) {
              drawListArea(helperContext, { areaSize: listAreaSize });
            }
          }
        }
      }
    };
  };
  const key = "SCROLL";
  const keyXThumbRect = Symbol(`${key}_xThumbRect`);
  const keyYThumbRect = Symbol(`${key}_yThumbRect`);
  const keyPrevPoint = Symbol(`${key}_prevPoint`);
  const keyActivePoint = Symbol(`${key}_activePoint`);
  const keyActiveThumbType = Symbol(`${key}_activeThumbType`);
  const minScrollerWidth = 12;
  const scrollerLineWidth = 16;
  const scrollerThumbAlpha = 0.36;
  const scrollConfig = {
    width: minScrollerWidth,
    thumbColor: "#000000AA",
    scrollBarColor: "#FFFFFF60",
    showScrollBar: false
  };
  function isPointAtRect(helperContext, p, rect) {
    const ctx = helperContext;
    const { x: x2, y: y2, w: w2, h: h2 } = rect;
    ctx.beginPath();
    ctx.rect(x2, y2, w2, h2);
    ctx.closePath();
    if (ctx.isPointInPath(p.x, p.y)) {
      return true;
    }
    return false;
  }
  function isPointInScrollThumb(helperContext, p, opts) {
    let thumbType = null;
    const { xThumbRect, yThumbRect } = opts;
    if (xThumbRect && isPointAtRect(helperContext, p, xThumbRect)) {
      thumbType = "X";
    } else if (yThumbRect && isPointAtRect(helperContext, p, yThumbRect)) {
      thumbType = "Y";
    }
    return thumbType;
  }
  function getScrollInfoFromSnapshot(snapshot) {
    const { sharedStore } = snapshot;
    const info = {
      activePoint: sharedStore[keyActivePoint] || null,
      prevPoint: sharedStore[keyPrevPoint] || null,
      activeThumbType: sharedStore[keyActiveThumbType] || null,
      xThumbRect: sharedStore[keyXThumbRect] || null,
      yThumbRect: sharedStore[keyYThumbRect] || null
    };
    return info;
  }
  function calcScrollerInfo(viewScaleInfo, viewSizeInfo) {
    const { width, height } = viewSizeInfo;
    const { offsetTop, offsetBottom, offsetLeft, offsetRight } = viewScaleInfo;
    const sliderMinSize = scrollerLineWidth * 2.5;
    const lineSize2 = scrollerLineWidth;
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
      thumbColor: scrollConfig.thumbColor,
      scrollBarColor: scrollConfig.scrollBarColor,
      xThumbRect,
      yThumbRect
    };
    return scrollWrapper;
  }
  function drawScrollerThumb(ctx, opts) {
    let { x: x2, y: y2, h: h2, w: w2 } = opts;
    ctx.save();
    ctx.shadowColor = "#FFFFFF";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 1;
    {
      const { color: color2, axis } = opts;
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
      ctx.globalAlpha = scrollerThumbAlpha;
      ctx.beginPath();
      ctx.moveTo(x2 + r, y2);
      ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, r);
      ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, r);
      ctx.arcTo(x2, y2 + h2, x2, y2, r);
      ctx.arcTo(x2, y2, x2 + w2, y2, r);
      ctx.closePath();
      ctx.fillStyle = color2;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = color2;
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
  function drawScrollerInfo(helperContext, opts) {
    const ctx = helperContext;
    const { viewScaleInfo, viewSizeInfo, scrollInfo } = opts;
    const { activeThumbType, prevPoint, activePoint } = scrollInfo;
    const wrapper = calcScrollerInfo(viewScaleInfo, viewSizeInfo);
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
    drawScrollerThumb(ctx, Object.assign(Object.assign({ axis: "X" }, xThumbRect), { r: wrapper.lineSize / 2, color: wrapper.thumbColor }));
    drawScrollerThumb(ctx, Object.assign(Object.assign({ axis: "Y" }, yThumbRect), { r: wrapper.lineSize / 2, color: wrapper.thumbColor }));
    ctx.globalAlpha = 1;
    return {
      xThumbRect,
      yThumbRect
    };
  }
  function drawScroller(ctx, opts) {
    const { snapshot } = opts;
    const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);
    const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
    const scrollInfo = getScrollInfoFromSnapshot(snapshot);
    const { xThumbRect, yThumbRect } = drawScrollerInfo(ctx, { viewSizeInfo, viewScaleInfo, scrollInfo });
    return { xThumbRect, yThumbRect };
  }
  const MiddlewareScroller = (opts) => {
    const { viewer, viewContent, sharer } = opts;
    const { helperContext } = viewContent;
    sharer.setSharedStorage(keyXThumbRect, null);
    sharer.setSharedStorage(keyYThumbRect, null);
    const clear = () => {
      sharer.setSharedStorage(keyPrevPoint, null);
      sharer.setSharedStorage(keyActivePoint, null);
      sharer.setSharedStorage(keyActiveThumbType, null);
    };
    clear();
    const scrollX = (p) => {
      const prevPoint = sharer.getSharedStorage(keyPrevPoint);
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
      const prevPoint = sharer.getSharedStorage(keyPrevPoint);
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
      return isPointInScrollThumb(helperContext, p, {
        xThumbRect: sharer.getSharedStorage(keyXThumbRect),
        yThumbRect: sharer.getSharedStorage(keyYThumbRect)
      });
    };
    return {
      mode: key,
      wheel: (e) => {
        viewer.scroll({
          moveX: 0 - e.deltaX,
          moveY: 0 - e.deltaY
        });
        viewer.drawFrame();
      },
      pointStart: (e) => {
        const { point } = e;
        const thumbType = getThumbType(point);
        if (thumbType === "X" || thumbType === "Y") {
          sharer.setSharedStorage(keyActiveThumbType, thumbType);
          sharer.setSharedStorage(keyPrevPoint, point);
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
          sharer.setSharedStorage(keyPrevPoint, point);
          return false;
        }
      },
      pointEnd: (e) => {
        const activeThumbType = sharer.getSharedStorage(keyActiveThumbType);
        clear();
        if (activeThumbType === "X" || activeThumbType === "Y") {
          viewer.scroll({ moveX: 0, moveY: 0 });
          viewer.drawFrame();
          return false;
        }
      },
      beforeDrawFrame({ snapshot }) {
        const { xThumbRect, yThumbRect } = drawScroller(helperContext, { snapshot });
        sharer.setSharedStorage(keyXThumbRect, xThumbRect);
        sharer.setSharedStorage(keyYThumbRect, yThumbRect);
      }
    };
  };
  const middlewareEventScale = "@middleware/scale";
  const MiddlewareScaler = (opts) => {
    const key2 = "SCALE";
    const { viewer, sharer, eventHub } = opts;
    const maxScale = 50;
    const minScale = 0.05;
    return {
      mode: key2,
      isDefault: true,
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
        eventHub.trigger(middlewareEventScale, { scale: scaleNum });
      }
    };
  };
  const rulerSize = 16;
  const background = "#FFFFFFA8";
  const borderColor = "#00000080";
  const scaleColor = "#000000";
  const textColor = "#00000080";
  const fontFamily = "monospace";
  const fontSize = 10;
  const fontWeight = 100;
  const gridColor = "#AAAAAA20";
  const gridKeyColor = "#AAAAAA40";
  const lineSize = 1;
  function calcRulerScaleList(opts) {
    const { scale, viewLength, viewOffset } = opts;
    const list = [];
    let rulerUnit = 10;
    rulerUnit = formatNumber(rulerUnit / scale, { decimalPlaces: 0 });
    rulerUnit = Math.max(10, Math.min(rulerUnit, 1e3));
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
    return list;
  }
  function calcXRulerScaleList(opts) {
    const { viewScaleInfo, viewSizeInfo } = opts;
    const { scale, offsetLeft } = viewScaleInfo;
    const { width } = viewSizeInfo;
    return calcRulerScaleList({
      axis: "X",
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
      axis: "Y",
      scale,
      viewLength: height,
      viewOffset: offsetTop
    });
  }
  function drawXRuler(ctx, opts) {
    const { scaleList } = opts;
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
      ctx.fillStyle = scaleColor;
      ctx.stroke();
      if (item.isKeyNum) {
        ctx.fillStyle = textColor;
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
    const { scaleList } = opts;
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
      ctx.fillStyle = scaleColor;
      ctx.lineWidth = lineSize;
      ctx.setLineDash([]);
      ctx.stroke();
      if (item.showNum === true) {
        const textX = fontStart;
        const textY = item.position + fontStart;
        const numText = `${item.num}`;
        rotateByCenter(ctx, -90, { x: textX, y: textY }, () => {
          ctx.fillStyle = textColor;
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
    const { viewSizeInfo } = opts;
    const { width, height } = viewSizeInfo;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width + 1, 0);
    ctx.lineTo(width + 1, rulerSize);
    ctx.lineTo(rulerSize, rulerSize);
    ctx.lineTo(rulerSize, height + 1);
    ctx.lineTo(0, height + 1);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = background;
    ctx.fill();
    ctx.lineWidth = lineSize;
    ctx.setLineDash([]);
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  }
  function drawUnderGrid(ctx, opts) {
    const { xList, yList, viewSizeInfo } = opts;
    const { width, height } = viewSizeInfo;
    for (let i = 0; i < xList.length; i++) {
      const item = xList[i];
      ctx.beginPath();
      ctx.moveTo(item.position, 0);
      ctx.lineTo(item.position, height);
      if (item.isKeyNum === true || item.isSubKeyNum === true) {
        ctx.strokeStyle = gridKeyColor;
      } else {
        ctx.strokeStyle = gridColor;
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
        ctx.strokeStyle = gridKeyColor;
      } else {
        ctx.strokeStyle = gridColor;
      }
      ctx.lineWidth = 1;
      ctx.closePath();
      ctx.stroke();
    }
  }
  const middlewareEventRuler = "@middleware/show-ruler";
  const MiddlewareRuler = (opts) => {
    const key2 = "RULE";
    const { viewContent, viewer, eventHub } = opts;
    const { helperContext, underContext } = viewContent;
    let show = true;
    let showGrid = true;
    eventHub.on(middlewareEventRuler, (e) => {
      if (typeof (e === null || e === void 0 ? void 0 : e.show) === "boolean") {
        show = e.show;
      }
      if (typeof (e === null || e === void 0 ? void 0 : e.showGrid) === "boolean") {
        showGrid = e.showGrid;
      }
      if (typeof (e === null || e === void 0 ? void 0 : e.show) === "boolean" || typeof (e === null || e === void 0 ? void 0 : e.showGrid) === "boolean") {
        viewer.drawFrame();
      }
    });
    return {
      mode: key2,
      isDefault: true,
      beforeDrawFrame: ({ snapshot }) => {
        if (show === true) {
          const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
          const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);
          drawRulerBackground(helperContext, { viewScaleInfo, viewSizeInfo });
          const xList = calcXRulerScaleList({ viewScaleInfo, viewSizeInfo });
          drawXRuler(helperContext, { scaleList: xList });
          const yList = calcYRulerScaleList({ viewScaleInfo, viewSizeInfo });
          drawYRuler(helperContext, { scaleList: yList });
          if (showGrid === true) {
            drawUnderGrid(underContext, {
              xList,
              yList,
              viewScaleInfo,
              viewSizeInfo
            });
          }
        }
      }
    };
  };
  var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Core_instances, _Core_board, _Core_container, _Core_initContainer;
  class Core {
    constructor(container, opts) {
      _Core_instances.add(this);
      _Core_board.set(this, void 0);
      _Core_container.set(this, void 0);
      const { devicePixelRatio = 1, width, height } = opts;
      __classPrivateFieldSet(this, _Core_container, container, "f");
      const canvas = document.createElement("canvas");
      __classPrivateFieldGet(this, _Core_instances, "m", _Core_initContainer).call(this);
      container.appendChild(canvas);
      const viewContent = createViewContent(canvas, { width, height, devicePixelRatio, offscreen: true });
      const board = new Board({ viewContent, container });
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
    use(middleware) {
      __classPrivateFieldGet(this, _Core_board, "f").use(middleware);
    }
    setData(data) {
      validateElements((data === null || data === void 0 ? void 0 : data.elements) || []);
      __classPrivateFieldGet(this, _Core_board, "f").setData(data);
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
    setViewScale(opts) {
      __classPrivateFieldGet(this, _Core_board, "f").updateViewScaleInfo(opts);
    }
  }
  _Core_board = /* @__PURE__ */ new WeakMap(), _Core_container = /* @__PURE__ */ new WeakMap(), _Core_instances = /* @__PURE__ */ new WeakSet(), _Core_initContainer = function _Core_initContainer2() {
    const container = __classPrivateFieldGet(this, _Core_container, "f");
    container.style.position = "relative";
  };
  class iDraw2 {
    // private #opts: IDrawOptions;
    constructor(mount, opts) {
      __privateAdd(this, _core, void 0);
      const core = new Core(mount, opts);
      __privateSet(this, _core, core);
      core.use(MiddlewareScroller);
      core.use(MiddlewareSelector);
      core.use(MiddlewareScaler);
      core.use(MiddlewareRuler);
      core.use(MiddlewareTextEditor);
    }
    setData(data) {
      const core = __privateGet(this, _core);
      core.setData(data);
      core.trigger("change", { data, type: "set-data" });
    }
    getData() {
      return __privateGet(this, _core).getData();
    }
    scale(opts) {
      __privateGet(this, _core).scale(opts);
    }
    setViewScale(opts) {
      const core = __privateGet(this, _core);
      core.setViewScale(opts);
      core.refresh();
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
    selectElement(uuid) {
      this.selectElements([uuid]);
    }
    selectElements(uuids) {
      this.trigger(middlewareEventSelect, { uuids });
    }
    selectElementByPosition(position) {
      this.selectElementsByPositions([position]);
    }
    selectElementsByPositions(positions) {
      this.trigger(middlewareEventSelect, { positions });
    }
    cancelElements() {
      this.trigger(middlewareEventSelect, { uuids: [] });
    }
    createElement(type, opts) {
      const { viewScaleInfo, viewSizeInfo } = __privateGet(this, _core).getViewInfo();
      return createElement(
        type,
        (opts == null ? void 0 : opts.element) || {},
        (opts == null ? void 0 : opts.viewCenter) === true ? {
          viewScaleInfo,
          viewSizeInfo
        } : void 0
      );
    }
    updateElement(element) {
      const core = __privateGet(this, _core);
      const data = core.getData() || { elements: [] };
      updateElementInList(element.uuid, element, data.elements);
      core.setData(data);
      core.refresh();
      core.trigger("change", { data, type: "update-element" });
    }
    addElement(element, opts) {
      const core = __privateGet(this, _core);
      const data = core.getData() || { elements: [] };
      if (!opts) {
        data.elements.push(element);
      } else if (opts == null ? void 0 : opts.position) {
        insertElementToListByPosition(element, opts == null ? void 0 : opts.position, data.elements);
      }
      core.setData(data);
      core.refresh();
      core.trigger("change", { data, type: "add-element" });
      return data;
    }
    deleteElement(uuid) {
      const core = __privateGet(this, _core);
      const data = core.getData() || { elements: [] };
      deleteElementInList(uuid, data.elements);
      core.setData(data);
      core.refresh();
      core.trigger("change", { data, type: "delete-element" });
    }
    moveElement(uuid, to) {
      const core = __privateGet(this, _core);
      const data = core.getData() || { elements: [] };
      const from = getElementPositionFromList(uuid, data.elements);
      const list = moveElementPosition(data.elements, { from, to });
      data.elements = list;
      core.setData(data);
      core.refresh();
      core.trigger("change", { data, type: "move-element" });
    }
  }
  _core = new WeakMap();
  exports.Context2D = Context2D;
  exports.Core = Core;
  exports.EventEmitter = EventEmitter;
  exports.MiddlewareRuler = MiddlewareRuler;
  exports.MiddlewareScaler = MiddlewareScaler;
  exports.MiddlewareScroller = MiddlewareScroller;
  exports.MiddlewareSelector = MiddlewareSelector;
  exports.MiddlewareTextEditor = MiddlewareTextEditor;
  exports.Renderer = Renderer;
  exports.Store = Store;
  exports.calcDistance = calcDistance;
  exports.calcElementCenter = calcElementCenter;
  exports.calcElementCenterFromVertexes = calcElementCenterFromVertexes;
  exports.calcElementQueueVertexesQueueInGroup = calcElementQueueVertexesQueueInGroup;
  exports.calcElementSizeController = calcElementSizeController;
  exports.calcElementVertexesInGroup = calcElementVertexesInGroup;
  exports.calcElementVertexesQueueInGroup = calcElementVertexesQueueInGroup;
  exports.calcElementsContextSize = calcElementsContextSize;
  exports.calcElementsViewInfo = calcElementsViewInfo;
  exports.calcSpeed = calcSpeed;
  exports.calcViewBoxSize = calcViewBoxSize;
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
  exports.createAssetId = createAssetId;
  exports.createContext2D = createContext2D;
  exports.createElement = createElement;
  exports.createOffscreenContext2D = createOffscreenContext2D;
  exports.createUUID = createUUID;
  exports.createViewContent = createViewContent;
  exports.deepClone = deepClone;
  exports.delay = delay;
  exports.deleteElementInList = deleteElementInList;
  exports.deleteElementInListByPosition = deleteElementInListByPosition;
  exports.downloadImageFromCanvas = downloadImageFromCanvas;
  exports.equalPoint = equalPoint;
  exports.equalTouchPoint = equalTouchPoint;
  exports.filterElementAsset = filterElementAsset;
  exports.findElementFromList = findElementFromList;
  exports.findElementFromListByPosition = findElementFromListByPosition;
  exports.findElementsFromList = findElementsFromList;
  exports.findElementsFromListByPositions = findElementsFromListByPositions;
  exports.formatNumber = formatNumber;
  exports.generateHTML = generateHTML;
  exports.generateSVGPath = generateSVGPath;
  exports.getCenterFromTwoPoints = getCenterFromTwoPoints;
  exports.getDefaultElementDetailConfig = getDefaultElementDetailConfig;
  exports.getElemenetsAssetIds = getElemenetsAssetIds;
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
  exports.mergeElementAsset = mergeElementAsset;
  exports.mergeHexColorAlpha = mergeHexColorAlpha;
  exports.middlewareEventRuler = middlewareEventRuler;
  exports.middlewareEventScale = middlewareEventScale;
  exports.middlewareEventSelect = middlewareEventSelect;
  exports.moveElementPosition = moveElementPosition;
  exports.parseAngleToRadian = parseAngleToRadian;
  exports.parseFileToBase64 = parseFileToBase64;
  exports.parseFileToText = parseFileToText;
  exports.parseHTML = parseHTML;
  exports.parseRadianToAngle = parseRadianToAngle;
  exports.parseSVGPath = parseSVGPath;
  exports.pickFile = pickFile;
  exports.rotateElement = rotateElement;
  exports.rotateElementVertexes = rotateElementVertexes;
  exports.rotatePoint = rotatePoint;
  exports.rotatePointInGroup = rotatePointInGroup;
  exports.rotateVertexes = rotateVertexes;
  exports.sortDataAsserts = sortDataAsserts;
  exports.throttle = throttle;
  exports.toColorHexNum = toColorHexNum;
  exports.toColorHexStr = toColorHexStr;
  exports.updateElementInList = updateElementInList;
  exports.vaildPoint = vaildPoint;
  exports.vaildTouchPoint = vaildTouchPoint;
  exports.validateElements = validateElements;
  exports.viewScale = viewScale;
  exports.viewScroll = viewScroll;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
