var iDraw = function() {
  "use strict";
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
  function throttle$1(fn, timeout) {
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
  function toColorHexNum(color2) {
    return parseInt(color2.replace(/^\#/, "0x"));
  }
  function toColorHexStr(color2) {
    return "#" + color2.toString(16);
  }
  function isColorStr(color2) {
    return typeof color2 === "string" && /^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color2);
  }
  function createUUID() {
    function str4() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return `${str4()}${str4()}-${str4()}-${str4()}-${str4()}-${str4()}${str4()}${str4()}`;
  }
  function deepClone(target) {
    function _clone(t) {
      const type = is$2(t);
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
        keys.forEach((key) => {
          obj[key] = _clone(t[key]);
        });
        return obj;
      }
    }
    return _clone(target);
  }
  function is$2(data) {
    return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, "").split(" ")[1];
  }
  function parsePrototype(data) {
    const typeStr = Object.prototype.toString.call(data) || "";
    const result = typeStr.replace(/(\[object|\])/ig, "").trim();
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
    <svg xmlns="http://www.w3.org/2000/svg" width="${width || ""}" height = "${height || ""}">
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
  var __awaiter$1 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
  const { Image } = window;
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
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
    return str.replace(/\&/ig, "&amp;");
  }
  function loadHTML(html2, opts) {
    return __awaiter$1(this, void 0, void 0, function* () {
      html2 = filterAmpersand(html2);
      const dataURL = yield parseHTMLToDataURL(html2, opts);
      const image = yield loadImage(dataURL);
      return image;
    });
  }
  let Context$1 = class Context {
    constructor(ctx, opts) {
      this._opts = opts;
      this._ctx = ctx;
      this._transform = {
        scale: 1,
        scrollX: 0,
        scrollY: 0
      };
    }
    getContext() {
      return this._ctx;
    }
    resetSize(opts) {
      this._opts = Object.assign(Object.assign({}, this._opts), opts);
    }
    calcDeviceNum(num) {
      return num * this._opts.devicePixelRatio;
    }
    calcScreenNum(num) {
      return num / this._opts.devicePixelRatio;
    }
    getSize() {
      return {
        width: this._opts.width,
        height: this._opts.height,
        contextWidth: this._opts.contextWidth,
        contextHeight: this._opts.contextHeight,
        devicePixelRatio: this._opts.devicePixelRatio
      };
    }
    setTransform(config) {
      this._transform = Object.assign(Object.assign({}, this._transform), config);
    }
    getTransform() {
      return {
        scale: this._transform.scale,
        scrollX: this._transform.scrollX,
        scrollY: this._transform.scrollY
      };
    }
    setFillStyle(color2) {
      this._ctx.fillStyle = color2;
    }
    fill(fillRule) {
      return this._ctx.fill(fillRule || "nonzero");
    }
    arc(x2, y2, radius, startAngle, endAngle, anticlockwise) {
      return this._ctx.arc(this._doSize(x2), this._doSize(y2), this._doSize(radius), startAngle, endAngle, anticlockwise);
    }
    rect(x2, y2, w2, h2) {
      return this._ctx.rect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    }
    fillRect(x2, y2, w2, h2) {
      return this._ctx.fillRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    }
    clearRect(x2, y2, w2, h2) {
      return this._ctx.clearRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    }
    beginPath() {
      return this._ctx.beginPath();
    }
    closePath() {
      return this._ctx.closePath();
    }
    lineTo(x2, y2) {
      return this._ctx.lineTo(this._doSize(x2), this._doSize(y2));
    }
    moveTo(x2, y2) {
      return this._ctx.moveTo(this._doSize(x2), this._doSize(y2));
    }
    arcTo(x1, y1, x2, y2, radius) {
      return this._ctx.arcTo(this._doSize(x1), this._doSize(y1), this._doSize(x2), this._doSize(y2), this._doSize(radius));
    }
    setLineWidth(w2) {
      return this._ctx.lineWidth = this._doSize(w2);
    }
    setLineDash(nums) {
      return this._ctx.setLineDash(nums.map((n) => this._doSize(n)));
    }
    isPointInPath(x2, y2) {
      return this._ctx.isPointInPath(this._doX(x2), this._doY(y2));
    }
    isPointInPathWithoutScroll(x2, y2) {
      return this._ctx.isPointInPath(this._doSize(x2), this._doSize(y2));
    }
    setStrokeStyle(color2) {
      this._ctx.strokeStyle = color2;
    }
    stroke() {
      return this._ctx.stroke();
    }
    translate(x2, y2) {
      return this._ctx.translate(this._doSize(x2), this._doSize(y2));
    }
    rotate(angle2) {
      return this._ctx.rotate(angle2);
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
        return this._ctx.drawImage(image, this._doSize(sx), this._doSize(sy), this._doSize(sw), this._doSize(sh), this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      } else {
        return this._ctx.drawImage(image, this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      }
    }
    createPattern(image, repetition) {
      return this._ctx.createPattern(image, repetition);
    }
    measureText(text2) {
      return this._ctx.measureText(text2);
    }
    setTextAlign(align) {
      this._ctx.textAlign = align;
    }
    fillText(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2));
      }
    }
    strokeText(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2));
      }
    }
    setFont(opts) {
      const strList = [];
      if (opts.fontWeight === "bold") {
        strList.push(`${opts.fontWeight}`);
      }
      strList.push(`${this._doSize(opts.fontSize || 12)}px`);
      strList.push(`${opts.fontFamily || "sans-serif"}`);
      this._ctx.font = `${strList.join(" ")}`;
    }
    setTextBaseline(baseline) {
      this._ctx.textBaseline = baseline;
    }
    setGlobalAlpha(alpha) {
      this._ctx.globalAlpha = alpha;
    }
    save() {
      this._ctx.save();
    }
    restore() {
      this._ctx.restore();
    }
    scale(ratioX, ratioY) {
      this._ctx.scale(ratioX, ratioY);
    }
    setShadowColor(color2) {
      this._ctx.shadowColor = color2;
    }
    setShadowOffsetX(offsetX) {
      this._ctx.shadowOffsetX = this._doSize(offsetX);
    }
    setShadowOffsetY(offsetY) {
      this._ctx.shadowOffsetY = this._doSize(offsetY);
    }
    setShadowBlur(blur) {
      this._ctx.shadowBlur = this._doSize(blur);
    }
    ellipse(x2, y2, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
      this._ctx.ellipse(this._doSize(x2), this._doSize(y2), this._doSize(radiusX), this._doSize(radiusY), rotation, startAngle, endAngle, counterclockwise);
    }
    _doSize(num) {
      return this._opts.devicePixelRatio * num;
    }
    _doX(x2) {
      const { scale, scrollX } = this._transform;
      const _x = (x2 - scrollX) / scale;
      return this._doSize(_x);
    }
    _doY(y2) {
      const { scale, scrollY } = this._transform;
      const _y = (y2 - scrollY) / scale;
      return this._doSize(_y);
    }
  };
  function number$1(value) {
    return typeof value === "number" && (value > 0 || value <= 0);
  }
  function x$1(value) {
    return number$1(value);
  }
  function y$1(value) {
    return number$1(value);
  }
  function w$1(value) {
    return typeof value === "number" && value >= 0;
  }
  function h$1(value) {
    return typeof value === "number" && value >= 0;
  }
  function angle$1(value) {
    return typeof value === "number" && value >= -360 && value <= 360;
  }
  function borderWidth$1(value) {
    return w$1(value);
  }
  function borderRadius$1(value) {
    return number$1(value) && value >= 0;
  }
  function color$1(value) {
    return isColorStr(value);
  }
  function imageURL$1(value) {
    return typeof value === "string" && /^(http:\/\/|https:\/\/|\.\/|\/)/.test(`${value}`);
  }
  function imageBase64$1(value) {
    return typeof value === "string" && /^(data:image\/)/.test(`${value}`);
  }
  function imageSrc$1(value) {
    return imageBase64$1(value) || imageURL$1(value);
  }
  function svg$1(value) {
    return typeof value === "string" && /^(<svg[\s]{1,}|<svg>)/i.test(`${value}`.trim()) && /<\/[\s]{0,}svg>$/i.test(`${value}`.trim());
  }
  function html$1(value) {
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
  function text$1(value) {
    return typeof value === "string";
  }
  function fontSize$1(value) {
    return number$1(value) && value > 0;
  }
  function lineHeight$1(value) {
    return number$1(value) && value > 0;
  }
  function strokeWidth$1(value) {
    return number$1(value) && value > 0;
  }
  function textAlign$1(value) {
    return ["center", "left", "right"].includes(value);
  }
  function fontFamily$1(value) {
    return typeof value === "string" && value.length > 0;
  }
  function fontWeight$1(value) {
    return ["bold"].includes(value);
  }
  const is$1 = {
    x: x$1,
    y: y$1,
    w: w$1,
    h: h$1,
    angle: angle$1,
    number: number$1,
    borderWidth: borderWidth$1,
    borderRadius: borderRadius$1,
    color: color$1,
    imageSrc: imageSrc$1,
    imageURL: imageURL$1,
    imageBase64: imageBase64$1,
    svg: svg$1,
    html: html$1,
    text: text$1,
    fontSize: fontSize$1,
    lineHeight: lineHeight$1,
    textAlign: textAlign$1,
    fontFamily: fontFamily$1,
    fontWeight: fontWeight$1,
    strokeWidth: strokeWidth$1
  };
  function attrs$1(attrs2) {
    const { x: x2, y: y2, w: w2, h: h2, angle: angle2 } = attrs2;
    if (!(is$1.x(x2) && is$1.y(y2) && is$1.w(w2) && is$1.h(h2) && is$1.angle(angle2))) {
      return false;
    }
    if (!(angle2 >= -360 && angle2 <= 360)) {
      return false;
    }
    return true;
  }
  function box$1(desc = {}) {
    const { borderColor, borderRadius: borderRadius2, borderWidth: borderWidth2 } = desc;
    if (desc.hasOwnProperty("borderColor") && !is$1.color(borderColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderRadius") && !is$1.number(borderRadius2)) {
      return false;
    }
    if (desc.hasOwnProperty("borderWidth") && !is$1.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function rectDesc$1(desc) {
    const { bgColor } = desc;
    if (desc.hasOwnProperty("bgColor") && !is$1.color(bgColor)) {
      return false;
    }
    if (!box$1(desc)) {
      return false;
    }
    return true;
  }
  function circleDesc$1(desc) {
    const { bgColor, borderColor, borderWidth: borderWidth2 } = desc;
    if (desc.hasOwnProperty("bgColor") && !is$1.color(bgColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderColor") && !is$1.color(borderColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderWidth") && !is$1.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function imageDesc$1(desc) {
    const { src } = desc;
    if (!is$1.imageSrc(src)) {
      return false;
    }
    return true;
  }
  function svgDesc$1(desc) {
    const { svg: svg2 } = desc;
    if (!is$1.svg(svg2)) {
      return false;
    }
    return true;
  }
  function htmlDesc$1(desc) {
    const { html: html2 } = desc;
    if (!is$1.html(html2)) {
      return false;
    }
    return true;
  }
  function textDesc$1(desc) {
    const { text: text2, color: color2, fontSize: fontSize2, lineHeight: lineHeight2, fontFamily: fontFamily2, textAlign: textAlign2, fontWeight: fontWeight2, bgColor, strokeWidth: strokeWidth2, strokeColor } = desc;
    if (!is$1.text(text2)) {
      return false;
    }
    if (!is$1.color(color2)) {
      return false;
    }
    if (!is$1.fontSize(fontSize2)) {
      return false;
    }
    if (desc.hasOwnProperty("bgColor") && !is$1.color(bgColor)) {
      return false;
    }
    if (desc.hasOwnProperty("fontWeight") && !is$1.fontWeight(fontWeight2)) {
      return false;
    }
    if (desc.hasOwnProperty("lineHeight") && !is$1.lineHeight(lineHeight2)) {
      return false;
    }
    if (desc.hasOwnProperty("fontFamily") && !is$1.fontFamily(fontFamily2)) {
      return false;
    }
    if (desc.hasOwnProperty("textAlign") && !is$1.textAlign(textAlign2)) {
      return false;
    }
    if (desc.hasOwnProperty("strokeWidth") && !is$1.strokeWidth(strokeWidth2)) {
      return false;
    }
    if (desc.hasOwnProperty("strokeColor") && !is$1.color(strokeColor)) {
      return false;
    }
    if (!box$1(desc)) {
      return false;
    }
    return true;
  }
  const check$1 = {
    attrs: attrs$1,
    textDesc: textDesc$1,
    rectDesc: rectDesc$1,
    circleDesc: circleDesc$1,
    imageDesc: imageDesc$1,
    svgDesc: svgDesc$1,
    htmlDesc: htmlDesc$1
  };
  const util = {
    is: is$1,
    check: check$1,
    delay,
    compose,
    throttle: throttle$1,
    loadImage,
    loadSVG,
    loadHTML,
    downloadImageFromCanvas,
    toColorHexStr,
    toColorHexNum,
    isColorStr,
    createUUID,
    istype,
    deepClone,
    Context: Context$1
  };
  class BoardEvent {
    constructor() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    on(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
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
    trigger(eventKey, arg) {
      const callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach((cb) => {
          cb(arg);
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
  function createTempData() {
    return {
      prevClickPoint: null,
      isHoverCanvas: false,
      isDragCanvas: false,
      statusMap: {
        canScrollYPrev: true,
        canScrollYNext: true,
        canScrollXPrev: true,
        canScrollXNext: true
      }
    };
  }
  let TempData$3 = class TempData {
    constructor() {
      this._temp = createTempData();
    }
    set(name, value) {
      this._temp[name] = value;
    }
    get(name) {
      return this._temp[name];
    }
    clear() {
      this._temp = createTempData();
    }
  };
  class ScreenWatcher {
    constructor(canvas, ctx) {
      this._isMoving = false;
      this._temp = new TempData$3();
      this._container = window;
      this._canvas = canvas;
      this._isMoving = false;
      this._initEvent();
      this._event = new BoardEvent();
    }
    setStatusMap(statusMap) {
      this._temp.set("statusMap", statusMap);
    }
    on(name, callback) {
      this._event.on(name, callback);
    }
    off(name, callback) {
      this._event.off(name, callback);
    }
    _initEvent() {
      const canvas = this._canvas;
      const container = this._container;
      container.addEventListener("mousemove", this._listenWindowMove.bind(this), false);
      container.addEventListener("mouseup", this._listenWindowMoveEnd.bind(this), false);
      canvas.addEventListener("mousemove", this._listenHover.bind(this), false);
      canvas.addEventListener("mousedown", this._listenMoveStart.bind(this), false);
      canvas.addEventListener("mousemove", this._listenMove.bind(this), false);
      canvas.addEventListener("mouseup", this._listenMoveEnd.bind(this), false);
      canvas.addEventListener("click", this._listenCanvasClick.bind(this), false);
      canvas.addEventListener("wheel", this._listenCanvasWheel.bind(this), false);
      canvas.addEventListener("mousedown", this._listenCanvasMoveStart.bind(this), true);
      canvas.addEventListener("mouseup", this._listenCanvasMoveEnd.bind(this), true);
      canvas.addEventListener("mouseover", this._listenCanvasMoveOver.bind(this), true);
      canvas.addEventListener("mouseleave", this._listenCanvasMoveLeave.bind(this), true);
      this._initParentEvent();
    }
    _initParentEvent() {
      try {
        let target = window;
        const targetOrigin = target.origin;
        while (target.self !== target.top) {
          if (target.self !== target.parent) {
            if (target.origin === targetOrigin) {
              target.parent.window.addEventListener("mousemove", this._listSameOriginParentWindow.bind(this), false);
            }
          }
          target = target.parent;
          if (!target) {
            break;
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
    _listenHover(e) {
      e.preventDefault();
      const p = this._getPosition(e);
      if (this._isVaildPoint(p)) {
        if (this._event.has("hover")) {
          this._event.trigger("hover", p);
        }
      }
      this._isMoving = true;
    }
    _listenMoveStart(e) {
      e.preventDefault();
      const p = this._getPosition(e);
      if (this._isVaildPoint(p)) {
        if (this._event.has("point")) {
          this._event.trigger("point", p);
        }
        if (this._event.has("moveStart")) {
          this._event.trigger("moveStart", p);
        }
      }
      this._isMoving = true;
    }
    _listenMove(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this._event.has("move") && this._isMoving === true) {
        const p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("move", p);
        }
      }
    }
    _listenMoveEnd(e) {
      e.preventDefault();
      if (this._event.has("moveEnd")) {
        const p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("moveEnd", p);
        }
      }
      this._isMoving = false;
    }
    _listSameOriginParentWindow() {
      if (this._temp.get("isHoverCanvas")) {
        if (this._event.has("leave")) {
          this._event.trigger("leave", void 0);
        }
      }
      if (this._temp.get("isDragCanvas")) {
        if (this._event.has("moveEnd")) {
          this._event.trigger("moveEnd", { x: NaN, y: NaN });
        }
      }
      this._isMoving = false;
      this._temp.set("isDragCanvas", false);
      this._temp.set("isHoverCanvas", false);
    }
    _listenCanvasMoveStart() {
      if (this._temp.get("isHoverCanvas")) {
        this._temp.set("isDragCanvas", true);
      }
    }
    _listenCanvasMoveEnd() {
      this._temp.set("isDragCanvas", false);
    }
    _listenCanvasMoveOver() {
      this._temp.set("isHoverCanvas", true);
    }
    _listenCanvasMoveLeave() {
      this._temp.set("isHoverCanvas", false);
      if (this._event.has("leave")) {
        this._event.trigger("leave", void 0);
      }
    }
    _listenWindowMove(e) {
      if (this._temp.get("isDragCanvas") !== true) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (this._event.has("move") && this._isMoving === true) {
        const p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("move", p);
        }
      }
    }
    _listenWindowMoveEnd(e) {
      if (!this._temp.get("isDragCanvas") === true) {
        return;
      }
      e.preventDefault();
      if (this._event.has("moveEnd")) {
        const p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("moveEnd", p);
        }
      }
      this._temp.set("isDragCanvas", false);
      this._isMoving = false;
    }
    _listenCanvasWheel(e) {
      if (this._event.has("wheelX") && (e.deltaX > 0 || e.deltaX < 0)) {
        this._event.trigger("wheelX", e.deltaX);
      }
      if (this._event.has("wheelY") && (e.deltaY > 0 || e.deltaY < 0)) {
        this._event.trigger("wheelY", e.deltaY);
      }
      const { canScrollYNext, canScrollYPrev } = this._temp.get("statusMap");
      if (e.deltaX > 0 && e.deltaX < 0) {
        e.preventDefault();
      } else if (e.deltaY > 0 && canScrollYNext === true) {
        e.preventDefault();
      } else if (e.deltaY < 0 && canScrollYPrev === true) {
        e.preventDefault();
      }
    }
    _listenCanvasClick(e) {
      e.preventDefault();
      const maxLimitTime = 500;
      const p = this._getPosition(e);
      const t = Date.now();
      if (this._isVaildPoint(p)) {
        const preClickPoint = this._temp.get("prevClickPoint");
        if (preClickPoint && t - preClickPoint.t <= maxLimitTime && Math.abs(preClickPoint.x - p.x) <= 5 && Math.abs(preClickPoint.y - p.y) <= 5) {
          if (this._event.has("doubleClick")) {
            this._event.trigger("doubleClick", { x: p.x, y: p.y });
          }
        } else {
          this._temp.set("prevClickPoint", { x: p.x, y: p.y, t });
        }
      }
    }
    _getPosition(e) {
      const canvas = this._canvas;
      let x2 = 0;
      let y2 = 0;
      if (e && e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch) {
          x2 = touch.clientX;
          y2 = touch.clientY;
        }
      } else {
        x2 = e.clientX;
        y2 = e.clientY;
      }
      const p = {
        x: x2 - canvas.getBoundingClientRect().left,
        y: y2 - canvas.getBoundingClientRect().top,
        t: Date.now()
      };
      return p;
    }
    _isVaildPoint(p) {
      return isAvailableNum(p.x) && isAvailableNum(p.y);
    }
  }
  function isAvailableNum(num) {
    return num > 0 || num < 0 || num === 0;
  }
  function setStyle(dom, style) {
    const originStyle = getStyle(dom);
    const _style = Object.assign(Object.assign({}, originStyle), style);
    const keys = Object.keys(_style);
    let styleStr = "";
    keys.forEach((key) => {
      styleStr += `${key}:${_style[key] || ""};`;
    });
    dom.setAttribute("style", styleStr);
  }
  function getStyle(dom) {
    const styleObj = {};
    const style = dom.getAttribute("style") || "";
    const styleList = style.split(";");
    styleList.forEach((item) => {
      const dataList = item.split(":");
      if (dataList[0] && typeof dataList[0] === "string") {
        styleObj[dataList[0]] = dataList[1] || "";
      }
    });
    return styleObj;
  }
  const minScrollerWidth = 12;
  const scrollerAlpha = 0.12;
  const scrollerThumbAlpha = 0.36;
  const defaultScrollConfig = {
    width: minScrollerWidth,
    color: "#000000",
    showBackground: true
  };
  class Scroller {
    constructor(ctx, opts) {
      this._displayCtx = ctx;
      this._opts = this._getOpts(opts);
    }
    draw(position) {
      const { width, height, scrollConfig } = this._opts;
      const wrapper = this.calc(position);
      const ctx = this._displayCtx;
      if (wrapper.xSize > 0) {
        if (scrollConfig.showBackground === true) {
          ctx.globalAlpha = scrollerAlpha;
          ctx.fillStyle = wrapper.color;
          ctx.fillRect(0, this._doSize(height - wrapper.lineSize), this._doSize(width), this._doSize(wrapper.lineSize));
        }
        drawBoxScrollerThumb(ctx, {
          axis: "X",
          x: this._doSize(wrapper.translateX),
          y: this._doSize(height - wrapper.lineSize),
          w: this._doSize(wrapper.xSize),
          h: this._doSize(wrapper.lineSize),
          r: this._doSize(wrapper.lineSize / 2),
          color: wrapper.color
        });
      }
      if (wrapper.ySize > 0) {
        if (scrollConfig.showBackground === true) {
          ctx.globalAlpha = scrollerAlpha;
          ctx.fillStyle = wrapper.color;
          ctx.fillRect(this._doSize(width - wrapper.lineSize), 0, this._doSize(wrapper.lineSize), this._doSize(height));
        }
        drawBoxScrollerThumb(ctx, {
          axis: "Y",
          x: this._doSize(width - wrapper.lineSize),
          y: this._doSize(wrapper.translateY),
          w: this._doSize(wrapper.lineSize),
          h: this._doSize(wrapper.ySize),
          r: this._doSize(wrapper.lineSize / 2),
          color: wrapper.color
        });
      }
      ctx.globalAlpha = 1;
    }
    resetSize(opts) {
      this._opts = Object.assign(Object.assign({}, this._opts), opts);
    }
    isPointAtScrollY(p) {
      const { width, height, scrollConfig } = this._opts;
      const ctx = this._displayCtx;
      ctx.beginPath();
      ctx.rect(this._doSize(width - scrollConfig.width), 0, this._doSize(scrollConfig.width), this._doSize(height));
      ctx.closePath();
      if (ctx.isPointInPath(this._doSize(p.x), this._doSize(p.y))) {
        return true;
      }
      return false;
    }
    isPointAtScrollX(p) {
      const { width, height, scrollConfig } = this._opts;
      const ctx = this._displayCtx;
      ctx.beginPath();
      ctx.rect(0, this._doSize(height - scrollConfig.width), this._doSize(width - scrollConfig.width), this._doSize(scrollConfig.width));
      ctx.closePath();
      if (ctx.isPointInPath(this._doSize(p.x), this._doSize(p.y))) {
        return true;
      }
      return false;
    }
    getLineWidth() {
      const lineWidth = this._opts.scrollConfig.width;
      return lineWidth;
    }
    calc(position) {
      const { width, height, scrollConfig } = this._opts;
      const sliderMinSize = scrollConfig.width * 2.5;
      const lineSize = scrollConfig.width;
      let xSize = 0;
      let ySize = 0;
      if (position.left <= 0 && position.right <= 0) {
        xSize = Math.max(sliderMinSize, width - (Math.abs(position.left) + Math.abs(position.right)));
        if (xSize >= width)
          xSize = 0;
      }
      if (position.top <= 0 || position.bottom <= 0) {
        ySize = Math.max(sliderMinSize, height - (Math.abs(position.top) + Math.abs(position.bottom)));
        if (ySize >= height)
          ySize = 0;
      }
      let translateX = 0;
      if (xSize > 0) {
        translateX = xSize / 2 + (width - xSize) * Math.abs(position.left) / (Math.abs(position.left) + Math.abs(position.right));
        translateX = Math.min(Math.max(0, translateX - xSize / 2), width - xSize);
      }
      let translateY = 0;
      if (ySize > 0) {
        translateY = ySize / 2 + (height - ySize) * Math.abs(position.top) / (Math.abs(position.top) + Math.abs(position.bottom));
        translateY = Math.min(Math.max(0, translateY - ySize / 2), height - ySize);
      }
      const scrollWrapper = {
        lineSize,
        xSize,
        ySize,
        translateY,
        translateX,
        color: this._opts.scrollConfig.color
      };
      return scrollWrapper;
    }
    _doSize(num) {
      return num * this._opts.devicePixelRatio;
    }
    _getOpts(opts) {
      var _a;
      const options = Object.assign(Object.assign({}, opts), {
        scrollConfig: Object.assign(Object.assign({}, defaultScrollConfig), opts.scrollConfig || {})
      });
      if (!options.scrollConfig) {
        options.scrollConfig = defaultScrollConfig;
      }
      if (!(((_a = options === null || options === void 0 ? void 0 : options.scrollConfig) === null || _a === void 0 ? void 0 : _a.width) > 0)) {
        options.scrollConfig.width = defaultScrollConfig.width;
      }
      options.scrollConfig.width = Math.max(options.scrollConfig.width, defaultScrollConfig.width);
      if (isColorStr(options.scrollConfig.color) !== true) {
        options.scrollConfig.color = options.scrollConfig.color;
      }
      return options;
    }
  }
  function drawBoxScrollerThumb(ctx, opts) {
    let { x: x2, y: y2, h: h2, w: w2 } = opts;
    const { color: color2, axis } = opts;
    if (axis === "X") {
      y2 = y2 + h2 / 4 + 1;
      h2 = h2 / 2;
    } else if (axis === "Y") {
      x2 = x2 + w2 / 4 + 1;
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
    ctx.moveTo(x2 + r, y2);
    ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, r);
    ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, r);
    ctx.arcTo(x2, y2 + h2, x2, y2, r);
    ctx.arcTo(x2, y2, x2 + w2, y2, r);
    ctx.closePath();
    ctx.stroke();
  }
  const _opts$1 = Symbol("_opts");
  const _ctx = Symbol("_ctx");
  class Screen {
    constructor(ctx, opts) {
      this[_opts$1] = opts;
      this[_ctx] = ctx;
    }
    resetSize(opts) {
      this[_opts$1] = Object.assign(Object.assign({}, this[_opts$1]), opts);
    }
    calcScreen() {
      const scaleRatio = this[_ctx].getTransform().scale;
      const { width, height, contextWidth, contextHeight, devicePixelRatio: pxRatio } = this[_opts$1];
      let canScrollXPrev = true;
      let canScrollXNext = true;
      let canScrollYPrev = true;
      let canScrollYNext = true;
      if (contextWidth * scaleRatio <= width) {
        this[_ctx].setTransform({
          scrollX: (width - contextWidth * scaleRatio) / 2
        });
        canScrollXPrev = false;
        canScrollXNext = false;
      }
      if (contextHeight * scaleRatio <= height) {
        this[_ctx].setTransform({
          scrollY: (height - contextHeight * scaleRatio) / 2
        });
        canScrollYPrev = false;
        canScrollYNext = false;
      }
      if (contextWidth * scaleRatio >= width && this[_ctx].getTransform().scrollX > 0) {
        this[_ctx].setTransform({
          scrollX: 0
        });
        canScrollXPrev = false;
      }
      if (contextHeight * scaleRatio >= height && this[_ctx].getTransform().scrollY > 0) {
        this[_ctx].setTransform({
          scrollY: 0
        });
        canScrollYPrev = false;
      }
      const { scrollX: _scrollX, scrollY: _scrollY } = this[_ctx].getTransform();
      if (_scrollX < 0 && Math.abs(_scrollX) > Math.abs(contextWidth * scaleRatio - width)) {
        this[_ctx].setTransform({
          scrollX: 0 - Math.abs(contextWidth * scaleRatio - width)
        });
        canScrollXNext = false;
      }
      if (_scrollY < 0 && Math.abs(_scrollY) > Math.abs(contextHeight * scaleRatio - height)) {
        this[_ctx].setTransform({
          scrollY: 0 - Math.abs(contextHeight * scaleRatio - height)
        });
        canScrollYNext = false;
      }
      const { scrollX, scrollY } = this[_ctx].getTransform();
      const size = {
        x: scrollX * scaleRatio,
        y: scrollY * scaleRatio,
        w: contextWidth * scaleRatio,
        h: contextHeight * scaleRatio
      };
      const deviceSize = {
        x: scrollX * pxRatio,
        y: scrollY * pxRatio,
        w: contextWidth * pxRatio * scaleRatio,
        h: contextHeight * pxRatio * scaleRatio
      };
      const position = {
        top: scrollY,
        bottom: height - (contextHeight * scaleRatio + scrollY),
        left: scrollX,
        right: width - (contextWidth * scaleRatio + scrollX)
      };
      return {
        size,
        position,
        deviceSize,
        width: this[_opts$1].width,
        height: this[_opts$1].height,
        devicePixelRatio: this[_opts$1].devicePixelRatio,
        canScrollYPrev,
        canScrollYNext,
        canScrollXPrev,
        canScrollXNext
      };
    }
    calcScreenScroll(start, end, sliderSize, limitLen, moveDistance) {
      let scrollDistance = start;
      let scrollLen = limitLen - sliderSize;
      if (start <= 0 && end <= 0) {
        scrollLen = Math.abs(start) + Math.abs(end);
      }
      let unit = 1;
      if (scrollLen > 0) {
        unit = scrollLen / (limitLen - sliderSize);
      }
      scrollDistance = 0 - unit * moveDistance;
      return scrollDistance;
    }
  }
  const { throttle, Context } = util;
  class Board {
    constructor(mount, opts) {
      this._hasRendered = false;
      this._mount = mount;
      this._canvas = document.createElement("canvas");
      this._helperCanvas = document.createElement("canvas");
      this._displayCanvas = document.createElement("canvas");
      this._mount.appendChild(this._displayCanvas);
      this._opts = this._parsePrivateOptions(opts);
      const originCtx2d = this._canvas.getContext("2d");
      const displayCtx2d = this._displayCanvas.getContext("2d");
      const helperCtx2d = this._helperCanvas.getContext("2d");
      this._ctx = new Context(originCtx2d, this._opts);
      this._helperCtx = new Context(helperCtx2d, this._opts);
      this._screen = new Screen(this._ctx, this._opts);
      this._watcher = new ScreenWatcher(this._displayCanvas, this._ctx);
      this._scroller = new Scroller(displayCtx2d, {
        width: opts.width,
        height: opts.height,
        devicePixelRatio: opts.devicePixelRatio || 1,
        scrollConfig: opts.scrollConfig
      });
      this._render();
    }
    getDisplayContext2D() {
      return this._displayCanvas.getContext("2d");
    }
    getOriginContext2D() {
      return this._ctx.getContext();
    }
    getHelperContext2D() {
      return this._helperCtx.getContext();
    }
    getContext() {
      return this._ctx;
    }
    getHelperContext() {
      return this._helperCtx;
    }
    scale(scaleRatio) {
      if (scaleRatio > 0) {
        this._ctx.setTransform({ scale: scaleRatio });
        this._helperCtx.setTransform({ scale: scaleRatio });
      }
      const { position, size } = this._screen.calcScreen();
      return { position, size };
    }
    scrollX(x2) {
      this._watcher.setStatusMap({
        canScrollYPrev: true,
        canScrollYNext: true,
        canScrollXPrev: true,
        canScrollXNext: true
      });
      if (x2 >= 0 || x2 < 0) {
        this._ctx.setTransform({ scrollX: x2 });
        this._helperCtx.setTransform({ scrollX: x2 });
      }
      const { position, size, canScrollXNext, canScrollYNext, canScrollXPrev, canScrollYPrev } = this._screen.calcScreen();
      this._watcher.setStatusMap({
        canScrollYPrev,
        canScrollYNext,
        canScrollXPrev,
        canScrollXNext
      });
      return { position, size };
    }
    scrollY(y2) {
      this._watcher.setStatusMap({
        canScrollYPrev: true,
        canScrollYNext: true,
        canScrollXPrev: true,
        canScrollXNext: true
      });
      if (y2 >= 0 || y2 < 0) {
        this._ctx.setTransform({ scrollY: y2 });
        this._helperCtx.setTransform({ scrollY: y2 });
      }
      const { position, size, canScrollXNext, canScrollYNext, canScrollXPrev, canScrollYPrev } = this._screen.calcScreen();
      this._watcher.setStatusMap({
        canScrollYPrev,
        canScrollYNext,
        canScrollXPrev,
        canScrollXNext
      });
      return { position, size };
    }
    getTransform() {
      return this._ctx.getTransform();
    }
    draw() {
      this.clear();
      const { position, deviceSize, size } = this._screen.calcScreen();
      const displayCtx = this._displayCanvas.getContext("2d");
      displayCtx === null || displayCtx === void 0 ? void 0 : displayCtx.drawImage(this._canvas, deviceSize.x, deviceSize.y, deviceSize.w, deviceSize.h);
      displayCtx === null || displayCtx === void 0 ? void 0 : displayCtx.drawImage(this._helperCanvas, deviceSize.x, deviceSize.y, deviceSize.w, deviceSize.h);
      if (this._opts.canScroll === true) {
        this._scroller.draw(position);
      }
      return { position, size };
    }
    clear() {
      const displayCtx = this._displayCanvas.getContext("2d");
      displayCtx === null || displayCtx === void 0 ? void 0 : displayCtx.clearRect(0, 0, this._displayCanvas.width, this._displayCanvas.height);
    }
    on(name, callback) {
      this._watcher.on(name, callback);
    }
    off(name, callback) {
      this._watcher.off(name, callback);
    }
    getScreenInfo() {
      return this._screen.calcScreen();
    }
    setCursor(cursor) {
      this._displayCanvas.style.cursor = cursor;
    }
    resetCursor() {
      this._displayCanvas.style.cursor = "auto";
    }
    resetSize(opts) {
      this._opts = Object.assign(Object.assign({}, this._opts), opts);
      this._resetContext();
      this._ctx.resetSize(opts);
      this._helperCtx.resetSize(opts);
      this._screen.resetSize(opts);
      this._scroller.resetSize({
        width: this._opts.width,
        height: this._opts.height,
        devicePixelRatio: this._opts.devicePixelRatio
      });
      this.draw();
    }
    getScrollLineWidth() {
      let lineWidth = 0;
      if (this._opts.canScroll === true) {
        lineWidth = this._scroller.getLineWidth();
      }
      return lineWidth;
    }
    pointScreenToContext(screenPoint) {
      const { scrollX, scrollY, scale } = this.getTransform();
      const ctxPoint = {
        x: (screenPoint.x - scrollX) / scale,
        y: (screenPoint.y - scrollY) / scale
      };
      return ctxPoint;
    }
    pointContextToScreen(ctxPoint) {
      const { scrollX, scrollY, scale } = this.getTransform();
      const screenPoint = {
        x: ctxPoint.x * scale + scrollX,
        y: ctxPoint.y * scale + scrollY
      };
      return screenPoint;
    }
    _render() {
      if (this._hasRendered === true) {
        return;
      }
      this._resetContext();
      this._initEvent();
      this._hasRendered = true;
    }
    _resetContext() {
      const { width, height, contextWidth, contextHeight, devicePixelRatio } = this._opts;
      this._canvas.width = contextWidth * devicePixelRatio;
      this._canvas.height = contextHeight * devicePixelRatio;
      this._helperCanvas.width = contextWidth * devicePixelRatio;
      this._helperCanvas.height = contextHeight * devicePixelRatio;
      this._displayCanvas.width = width * devicePixelRatio;
      this._displayCanvas.height = height * devicePixelRatio;
      setStyle(this._displayCanvas, {
        width: `${width}px`,
        height: `${height}px`
      });
    }
    _parsePrivateOptions(opts) {
      const defaultOpts = {
        devicePixelRatio: 1
      };
      return Object.assign(Object.assign({}, defaultOpts), opts);
    }
    _initEvent() {
      if (this._hasRendered === true) {
        return;
      }
      if (this._opts.canScroll === true) {
        this.on("wheelX", throttle((deltaX) => {
          this._doScrollX(deltaX);
        }, 16));
        this.on("wheelY", throttle((deltaY) => {
          this._doScrollY(deltaY);
        }, 16));
        let scrollType = null;
        this.on("moveStart", throttle((p) => {
          if (this._scroller.isPointAtScrollX(p)) {
            scrollType = "x";
          } else if (this._scroller.isPointAtScrollY(p)) {
            scrollType = "y";
          }
        }, 16));
        this.on("move", throttle((p) => {
          if (scrollType) {
            this._doMoveScroll(scrollType, p);
          }
        }, 16));
        this.on("moveEnd", throttle((p) => {
          if (scrollType) {
            this._doMoveScroll(scrollType, p);
          }
          scrollType = null;
        }, 16));
      }
    }
    _doScrollX(dx, prevScrollX) {
      const { width } = this._opts;
      let scrollX = prevScrollX;
      if (!(typeof scrollX === "number" && (scrollX > 0 || scrollX <= 0))) {
        scrollX = this._ctx.getTransform().scrollX;
      }
      const { position } = this._screen.calcScreen();
      const { xSize } = this._scroller.calc(position);
      const moveX = this._screen.calcScreenScroll(position.left, position.right, xSize, width, dx);
      this.scrollX(scrollX + moveX);
      this.draw();
    }
    _doScrollY(dy, prevScrollY) {
      const { height } = this._opts;
      let scrollY = prevScrollY;
      if (!(typeof scrollY === "number" && (scrollY > 0 || scrollY <= 0))) {
        scrollY = this._ctx.getTransform().scrollY;
      }
      const { position } = this._screen.calcScreen();
      const { ySize } = this._scroller.calc(position);
      const moveY = this._screen.calcScreenScroll(position.top, position.bottom, ySize, height, dy);
      this.scrollY(scrollY + moveY);
      this.draw();
    }
    _doMoveScroll(scrollType, point) {
      if (!scrollType) {
        return;
      }
      const { position } = this._screen.calcScreen();
      const { xSize, ySize } = this._scroller.calc(position);
      if (scrollType === "x") {
        this._doScrollX(point.x - xSize / 2, 0);
      } else if (scrollType === "y") {
        this._doScrollY(point.y - ySize / 2, 0);
      }
    }
  }
  function parseAngleToRadian$1(angle2) {
    return angle2 / 180 * Math.PI;
  }
  function calcElementCenter$1(elem) {
    const p = {
      x: elem.x + elem.w / 2,
      y: elem.y + elem.h / 2
    };
    return p;
  }
  function rotateElement$1(ctx, elem, callback) {
    const center = calcElementCenter$1(elem);
    const radian = parseAngleToRadian$1(elem.angle || 0);
    return rotateContext$1(ctx, center, radian || 0, callback);
  }
  function rotateContext$1(ctx, center, radian, callback) {
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
  function clearContext$1(ctx) {
    ctx.setFillStyle("#000000");
    ctx.setStrokeStyle("#000000");
    ctx.setLineDash([]);
    ctx.setGlobalAlpha(1);
    ctx.setShadowColor("#00000000");
    ctx.setShadowOffsetX(0);
    ctx.setShadowOffsetY(0);
    ctx.setShadowBlur(0);
  }
  function drawBgColor(ctx, color2) {
    const size = ctx.getSize();
    ctx.setFillStyle(color2);
    ctx.fillRect(0, 0, size.contextWidth, size.contextHeight);
  }
  function drawBox(ctx, elem, pattern) {
    clearContext$1(ctx);
    drawBoxBorder(ctx, elem);
    clearContext$1(ctx);
    rotateElement$1(ctx, elem, () => {
      const { x: x2, y: y2, w: w2, h: h2 } = elem;
      let r = elem.desc.borderRadius || 0;
      r = Math.min(r, w2 / 2, h2 / 2);
      if (w2 < r * 2 || h2 < r * 2) {
        r = 0;
      }
      ctx.beginPath();
      ctx.moveTo(x2 + r, y2);
      ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, r);
      ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, r);
      ctx.arcTo(x2, y2 + h2, x2, y2, r);
      ctx.arcTo(x2, y2, x2 + w2, y2, r);
      ctx.closePath();
      if (typeof pattern === "string") {
        ctx.setFillStyle(pattern);
      } else if (["CanvasPattern"].includes(istype.type(pattern))) {
        ctx.setFillStyle(pattern);
      }
      ctx.fill();
    });
  }
  function drawBoxBorder(ctx, elem) {
    clearContext$1(ctx);
    rotateElement$1(ctx, elem, () => {
      if (!(elem.desc.borderWidth && elem.desc.borderWidth > 0)) {
        return;
      }
      const bw = elem.desc.borderWidth;
      let borderColor = "#000000";
      if (isColorStr(elem.desc.borderColor) === true) {
        borderColor = elem.desc.borderColor;
      }
      const x2 = elem.x - bw / 2;
      const y2 = elem.y - bw / 2;
      const w2 = elem.w + bw;
      const h2 = elem.h + bw;
      let r = elem.desc.borderRadius || 0;
      r = Math.min(r, w2 / 2, h2 / 2);
      if (r < w2 / 2 && r < h2 / 2) {
        r = r + bw / 2;
      }
      const { desc } = elem;
      if (desc.shadowColor !== void 0 && isColorStr(desc.shadowColor)) {
        ctx.setShadowColor(desc.shadowColor);
      }
      if (desc.shadowOffsetX !== void 0 && is$1.number(desc.shadowOffsetX)) {
        ctx.setShadowOffsetX(desc.shadowOffsetX);
      }
      if (desc.shadowOffsetY !== void 0 && is$1.number(desc.shadowOffsetY)) {
        ctx.setShadowOffsetY(desc.shadowOffsetY);
      }
      if (desc.shadowBlur !== void 0 && is$1.number(desc.shadowBlur)) {
        ctx.setShadowBlur(desc.shadowBlur);
      }
      ctx.beginPath();
      ctx.setLineWidth(bw);
      ctx.setStrokeStyle(borderColor);
      ctx.moveTo(x2 + r, y2);
      ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h2, r);
      ctx.arcTo(x2 + w2, y2 + h2, x2, y2 + h2, r);
      ctx.arcTo(x2, y2 + h2, x2, y2, r);
      ctx.arcTo(x2, y2, x2 + w2, y2, r);
      ctx.closePath();
      ctx.stroke();
    });
  }
  function drawRect(ctx, elem) {
    drawBox(ctx, elem, elem.desc.bgColor);
  }
  function drawImage(ctx, elem, loader) {
    const content = loader.getContent(elem.uuid);
    rotateElement$1(ctx, elem, () => {
      if (content) {
        ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
      }
    });
  }
  function drawSVG(ctx, elem, loader) {
    const content = loader.getContent(elem.uuid);
    rotateElement$1(ctx, elem, () => {
      if (content) {
        ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
      }
    });
  }
  function drawHTML(ctx, elem, loader) {
    const content = loader.getContent(elem.uuid);
    rotateElement$1(ctx, elem, () => {
      if (content) {
        ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
      }
    });
  }
  function drawText(ctx, elem, loader) {
    clearContext$1(ctx);
    drawBox(ctx, elem, elem.desc.bgColor || "transparent");
    rotateElement$1(ctx, elem, () => {
      const desc = Object.assign({
        fontSize: 12,
        fontFamily: "sans-serif",
        textAlign: "center"
      }, elem.desc);
      ctx.setFillStyle(elem.desc.color);
      ctx.setTextBaseline("top");
      ctx.setFont({
        fontWeight: desc.fontWeight,
        fontSize: desc.fontSize,
        fontFamily: desc.fontFamily
      });
      const descText = desc.text.replace(/\r\n/gi, "\n");
      const fontHeight = desc.lineHeight || desc.fontSize;
      const descTextList = descText.split("\n");
      const lines = [];
      let lineNum = 0;
      descTextList.forEach((tempText, idx) => {
        let lineText = "";
        if (tempText.length > 0) {
          for (let i = 0; i < tempText.length; i++) {
            if (ctx.measureText(lineText + (tempText[i] || "")).width < ctx.calcDeviceNum(elem.w)) {
              lineText += tempText[i] || "";
            } else {
              lines.push({
                text: lineText,
                width: ctx.calcScreenNum(ctx.measureText(lineText).width)
              });
              lineText = tempText[i] || "";
              lineNum++;
            }
            if ((lineNum + 1) * fontHeight > elem.h) {
              break;
            }
            if (tempText.length - 1 === i) {
              if ((lineNum + 1) * fontHeight < elem.h) {
                lines.push({
                  text: lineText,
                  width: ctx.calcScreenNum(ctx.measureText(lineText).width)
                });
                if (idx < descTextList.length - 1) {
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
      if (lines.length * fontHeight < elem.h) {
        if (elem.desc.verticalAlign === "top") {
          startY = 0;
        } else if (elem.desc.verticalAlign === "bottom") {
          startY += elem.h - lines.length * fontHeight;
        } else {
          startY += (elem.h - lines.length * fontHeight) / 2;
        }
      }
      {
        const _y = elem.y + startY;
        if (desc.textShadowColor !== void 0 && isColorStr(desc.textShadowColor)) {
          ctx.setShadowColor(desc.textShadowColor);
        }
        if (desc.textShadowOffsetX !== void 0 && is$1.number(desc.textShadowOffsetX)) {
          ctx.setShadowOffsetX(desc.textShadowOffsetX);
        }
        if (desc.textShadowOffsetY !== void 0 && is$1.number(desc.textShadowOffsetY)) {
          ctx.setShadowOffsetY(desc.textShadowOffsetY);
        }
        if (desc.textShadowBlur !== void 0 && is$1.number(desc.textShadowBlur)) {
          ctx.setShadowBlur(desc.textShadowBlur);
        }
        lines.forEach((line, i) => {
          let _x = elem.x;
          if (desc.textAlign === "center") {
            _x = elem.x + (elem.w - line.width) / 2;
          } else if (desc.textAlign === "right") {
            _x = elem.x + (elem.w - line.width);
          }
          ctx.fillText(line.text, _x, _y + fontHeight * i);
        });
        clearContext$1(ctx);
      }
      if (isColorStr(desc.strokeColor) && desc.strokeWidth !== void 0 && desc.strokeWidth > 0) {
        const _y = elem.y + startY;
        lines.forEach((line, i) => {
          let _x = elem.x;
          if (desc.textAlign === "center") {
            _x = elem.x + (elem.w - line.width) / 2;
          } else if (desc.textAlign === "right") {
            _x = elem.x + (elem.w - line.width);
          }
          if (desc.strokeColor !== void 0) {
            ctx.setStrokeStyle(desc.strokeColor);
          }
          if (desc.strokeWidth !== void 0 && desc.strokeWidth > 0) {
            ctx.setLineWidth(desc.strokeWidth);
          }
          ctx.strokeText(line.text, _x, _y + fontHeight * i);
        });
      }
    });
  }
  function drawCircle(ctx, elem) {
    clearContext$1(ctx);
    rotateElement$1(ctx, elem, (ctx2) => {
      const { x: x2, y: y2, w: w2, h: h2, desc } = elem;
      const { bgColor = "#000000", borderColor = "#000000", borderWidth: borderWidth2 = 0 } = desc;
      const a = w2 / 2;
      const b = h2 / 2;
      const centerX = x2 + a;
      const centerY = y2 + b;
      if (borderWidth2 && borderWidth2 > 0) {
        const ba = borderWidth2 / 2 + a;
        const bb = borderWidth2 / 2 + b;
        ctx2.beginPath();
        ctx2.setStrokeStyle(borderColor);
        ctx2.setLineWidth(borderWidth2);
        ctx2.ellipse(centerX, centerY, ba, bb, 0, 0, 2 * Math.PI);
        ctx2.closePath();
        ctx2.stroke();
      }
      ctx2.beginPath();
      ctx2.setFillStyle(bgColor);
      ctx2.ellipse(centerX, centerY, a, b, 0, 0, 2 * Math.PI);
      ctx2.closePath();
      ctx2.fill();
    });
  }
  function drawContext(ctx, data, loader) {
    var _a;
    clearContext$1(ctx);
    const size = ctx.getSize();
    ctx.clearRect(0, 0, size.contextWidth, size.contextHeight);
    if (typeof data.bgColor === "string" && isColorStr(data.bgColor)) {
      drawBgColor(ctx, data.bgColor);
    }
    if (!(data.elements.length > 0)) {
      return;
    }
    for (let i = 0; i < data.elements.length; i++) {
      const elem = data.elements[i];
      if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.invisible) === true) {
        continue;
      }
      switch (elem.type) {
        case "rect": {
          drawRect(ctx, elem);
          break;
        }
        case "text": {
          drawText(ctx, elem);
          break;
        }
        case "image": {
          drawImage(ctx, elem, loader);
          break;
        }
        case "svg": {
          drawSVG(ctx, elem, loader);
          break;
        }
        case "html": {
          drawHTML(ctx, elem, loader);
          break;
        }
        case "circle": {
          drawCircle(ctx, elem);
          break;
        }
      }
    }
  }
  class LoaderEvent {
    constructor() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    on(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
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
    trigger(eventKey, arg) {
      const callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach((cb) => {
          cb(arg);
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
  function filterScript(html2) {
    return html2.replace(/<script[\s\S]*?<\/script>/ig, "");
  }
  var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
  var LoaderStatus;
  (function(LoaderStatus2) {
    LoaderStatus2["FREE"] = "free";
    LoaderStatus2["LOADING"] = "loading";
    LoaderStatus2["COMPLETE"] = "complete";
  })(LoaderStatus || (LoaderStatus = {}));
  class Loader {
    constructor(opts) {
      this._currentLoadData = {};
      this._currentUUIDQueue = [];
      this._storageLoadData = {};
      this._status = LoaderStatus.FREE;
      this._waitingLoadQueue = [];
      this._opts = opts;
      this._event = new LoaderEvent();
      this._waitingLoadQueue = [];
    }
    load(data, changeResourceUUIDs) {
      const [uuidQueue, loadData] = this._resetLoadData(data, changeResourceUUIDs);
      if (this._status === LoaderStatus.FREE || this._status === LoaderStatus.COMPLETE) {
        this._currentUUIDQueue = uuidQueue;
        this._currentLoadData = loadData;
        this._loadTask();
      } else if (this._status === LoaderStatus.LOADING && uuidQueue.length > 0) {
        this._waitingLoadQueue.push({
          uuidQueue,
          loadData
        });
      }
    }
    on(name, callback) {
      this._event.on(name, callback);
    }
    off(name, callback) {
      this._event.off(name, callback);
    }
    isComplete() {
      return this._status === LoaderStatus.COMPLETE;
    }
    getContent(uuid) {
      var _a;
      if (((_a = this._storageLoadData[uuid]) === null || _a === void 0 ? void 0 : _a.status) === "loaded") {
        return this._storageLoadData[uuid].content;
      }
      return null;
    }
    _resetLoadData(data, changeResourceUUIDs) {
      const loadData = {};
      const uuidQueue = [];
      const storageLoadData = this._storageLoadData;
      for (let i = data.elements.length - 1; i >= 0; i--) {
        const elem = data.elements[i];
        if (["image", "svg", "html"].includes(elem.type)) {
          if (!storageLoadData[elem.uuid]) {
            loadData[elem.uuid] = this._createEmptyLoadItem(elem);
            uuidQueue.push(elem.uuid);
          } else {
            if (changeResourceUUIDs.includes(elem.uuid)) {
              loadData[elem.uuid] = this._createEmptyLoadItem(elem);
              uuidQueue.push(elem.uuid);
            }
          }
        }
      }
      return [uuidQueue, loadData];
    }
    _createEmptyLoadItem(elem) {
      let source = "";
      const type = elem.type;
      let elemW = elem.w;
      let elemH = elem.h;
      if (elem.type === "image") {
        const _elem = elem;
        source = _elem.desc.src || "";
      } else if (elem.type === "svg") {
        const _elem = elem;
        source = _elem.desc.svg || "";
      } else if (elem.type === "html") {
        const _elem = elem;
        source = filterScript(_elem.desc.html || "");
        elemW = _elem.desc.width || elem.w;
        elemH = _elem.desc.height || elem.h;
      }
      return {
        uuid: elem.uuid,
        type,
        status: "null",
        content: null,
        source,
        elemW,
        elemH,
        element: deepClone(elem)
      };
    }
    _loadTask() {
      if (this._status === LoaderStatus.LOADING) {
        return;
      }
      this._status = LoaderStatus.LOADING;
      if (this._currentUUIDQueue.length === 0) {
        if (this._waitingLoadQueue.length === 0) {
          this._status = LoaderStatus.COMPLETE;
          this._event.trigger("complete", void 0);
          return;
        } else {
          const waitingItem = this._waitingLoadQueue.shift();
          if (waitingItem) {
            const { uuidQueue, loadData } = waitingItem;
            this._currentLoadData = loadData;
            this._currentUUIDQueue = uuidQueue;
          }
        }
      }
      const { maxParallelNum } = this._opts;
      const uuids = this._currentUUIDQueue.splice(0, maxParallelNum);
      uuids.forEach((url, i) => {
      });
      const loadUUIDList = [];
      const _loadAction = () => {
        if (loadUUIDList.length >= maxParallelNum) {
          return false;
        }
        if (uuids.length === 0) {
          return true;
        }
        for (let i = loadUUIDList.length; i < maxParallelNum; i++) {
          const uuid = uuids.shift();
          if (uuid === void 0) {
            break;
          }
          loadUUIDList.push(uuid);
          this._loadElementSource(this._currentLoadData[uuid]).then((image) => {
            var _a, _b;
            loadUUIDList.splice(loadUUIDList.indexOf(uuid), 1);
            const status = _loadAction();
            this._storageLoadData[uuid] = {
              uuid,
              type: this._currentLoadData[uuid].type,
              status: "loaded",
              content: image,
              source: this._currentLoadData[uuid].source,
              elemW: this._currentLoadData[uuid].elemW,
              elemH: this._currentLoadData[uuid].elemH,
              element: this._currentLoadData[uuid].element
            };
            if (loadUUIDList.length === 0 && uuids.length === 0 && status === true) {
              this._status = LoaderStatus.FREE;
              this._loadTask();
            }
            this._event.trigger("load", {
              uuid: (_a = this._storageLoadData[uuid]) === null || _a === void 0 ? void 0 : _a.uuid,
              type: this._storageLoadData[uuid].type,
              status: this._storageLoadData[uuid].status,
              content: this._storageLoadData[uuid].content,
              source: this._storageLoadData[uuid].source,
              elemW: this._storageLoadData[uuid].elemW,
              elemH: this._storageLoadData[uuid].elemH,
              element: (_b = this._storageLoadData[uuid]) === null || _b === void 0 ? void 0 : _b.element
            });
          }).catch((err) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            console.warn(err);
            loadUUIDList.splice(loadUUIDList.indexOf(uuid), 1);
            const status = _loadAction();
            if (this._currentLoadData[uuid]) {
              this._storageLoadData[uuid] = {
                uuid,
                type: (_a = this._currentLoadData[uuid]) === null || _a === void 0 ? void 0 : _a.type,
                status: "fail",
                content: null,
                error: err,
                source: (_b = this._currentLoadData[uuid]) === null || _b === void 0 ? void 0 : _b.source,
                elemW: (_c = this._currentLoadData[uuid]) === null || _c === void 0 ? void 0 : _c.elemW,
                elemH: (_d = this._currentLoadData[uuid]) === null || _d === void 0 ? void 0 : _d.elemH,
                element: (_e = this._currentLoadData[uuid]) === null || _e === void 0 ? void 0 : _e.element
              };
            }
            if (loadUUIDList.length === 0 && uuids.length === 0 && status === true) {
              this._status = LoaderStatus.FREE;
              this._loadTask();
            }
            if (this._currentLoadData[uuid]) {
              this._event.trigger("error", {
                uuid,
                type: (_f = this._storageLoadData[uuid]) === null || _f === void 0 ? void 0 : _f.type,
                status: (_g = this._storageLoadData[uuid]) === null || _g === void 0 ? void 0 : _g.status,
                content: (_h = this._storageLoadData[uuid]) === null || _h === void 0 ? void 0 : _h.content,
                source: (_j = this._storageLoadData[uuid]) === null || _j === void 0 ? void 0 : _j.source,
                elemW: (_k = this._storageLoadData[uuid]) === null || _k === void 0 ? void 0 : _k.elemW,
                elemH: (_l = this._storageLoadData[uuid]) === null || _l === void 0 ? void 0 : _l.elemH,
                element: (_m = this._storageLoadData[uuid]) === null || _m === void 0 ? void 0 : _m.element
              });
            }
          });
        }
        return false;
      };
      _loadAction();
    }
    _loadElementSource(params) {
      return __awaiter(this, void 0, void 0, function* () {
        if (params && params.type === "image") {
          const image = yield loadImage(params.source);
          return image;
        } else if (params && params.type === "svg") {
          const image = yield loadSVG(params.source);
          return image;
        } else if (params && params.type === "html") {
          const image = yield loadHTML(params.source, {
            width: params.elemW,
            height: params.elemH
          });
          return image;
        }
        throw Error("Element's source is not support!");
      });
    }
  }
  class RendererEvent {
    constructor() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    on(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
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
    trigger(eventKey, arg) {
      const callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach((cb) => {
          cb(arg);
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
  const { requestAnimationFrame } = window;
  var DrawStatus;
  (function(DrawStatus2) {
    DrawStatus2["NULL"] = "null";
    DrawStatus2["FREE"] = "free";
    DrawStatus2["DRAWING"] = "drawing";
    DrawStatus2["FREEZE"] = "freeze";
  })(DrawStatus || (DrawStatus = {}));
  class Renderer extends RendererEvent {
    constructor(opts) {
      super();
      this._queue = [];
      this._ctx = null;
      this._status = DrawStatus.NULL;
      this._opts = opts;
      this._loader = new Loader({
        maxParallelNum: 6
      });
      this._loader.on("load", (res) => {
        this._drawFrame();
        this.trigger("load", { element: res.element });
      });
      this._loader.on("error", (res) => {
        this.trigger("error", { element: res.element, error: res.error });
      });
      this._loader.on("complete", () => {
        this.trigger("loadComplete", { t: Date.now() });
      });
    }
    render(target, originData, opts) {
      const { changeResourceUUIDs = [] } = opts || {};
      this._status = DrawStatus.FREE;
      const data = deepClone(originData);
      if (Array.isArray(data.elements)) {
        data.elements.forEach((elem) => {
          if (!(typeof elem.uuid === "string" && elem.uuid)) {
            elem.uuid = createUUID();
          }
        });
      }
      if (!this._ctx) {
        if (this._opts && Object.prototype.toString.call(target) === "[object HTMLCanvasElement]") {
          const { width, height, contextWidth, contextHeight, devicePixelRatio } = this._opts;
          const canvas = target;
          canvas.width = width * devicePixelRatio;
          canvas.height = height * devicePixelRatio;
          const ctx2d = canvas.getContext("2d");
          this._ctx = new Context$1(ctx2d, {
            width,
            height,
            contextWidth: contextWidth || width,
            contextHeight: contextHeight || height,
            devicePixelRatio
          });
        } else if (target) {
          this._ctx = target;
        }
      }
      if ([DrawStatus.FREEZE].includes(this._status)) {
        return;
      }
      const _data = deepClone({ data });
      this._queue.push(_data);
      this._drawFrame();
      this._loader.load(data, changeResourceUUIDs || []);
    }
    getContext() {
      return this._ctx;
    }
    thaw() {
      this._status = DrawStatus.FREE;
    }
    _freeze() {
      this._status = DrawStatus.FREEZE;
    }
    _drawFrame() {
      if (this._status === DrawStatus.FREEZE) {
        return;
      }
      requestAnimationFrame(() => {
        if (this._status === DrawStatus.FREEZE) {
          return;
        }
        const ctx = this._ctx;
        let item = this._queue[0];
        let isLastFrame = false;
        if (this._queue.length > 1) {
          item = this._queue.shift();
        } else {
          isLastFrame = true;
        }
        if (this._loader.isComplete() !== true) {
          this._drawFrame();
          if (item && ctx) {
            drawContext(ctx, item.data, this._loader);
          }
        } else if (item && ctx) {
          drawContext(ctx, item.data, this._loader);
          this._retainQueueOneItem();
          if (!isLastFrame) {
            this._drawFrame();
          } else {
            this._status = DrawStatus.FREE;
          }
        } else {
          this._status = DrawStatus.FREE;
        }
        this.trigger("drawFrame", { t: Date.now() });
        if (this._loader.isComplete() === true && this._queue.length === 1 && this._status === DrawStatus.FREE) {
          if (ctx && this._queue[0] && this._queue[0].data) {
            drawContext(ctx, this._queue[0].data, this._loader);
          }
          this.trigger("drawFrameComplete", { t: Date.now() });
          this._freeze();
        }
      });
    }
    _retainQueueOneItem() {
      if (this._queue.length <= 1) {
        return;
      }
      const lastOne = deepClone(this._queue[this._queue.length - 1]);
      this._queue = [lastOne];
    }
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
  function fontSize(value) {
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
  function fontFamily(value) {
    return typeof value === "string" && value.length > 0;
  }
  function fontWeight(value) {
    return ["bold"].includes(value);
  }
  const is = {
    x,
    y,
    w,
    h,
    angle,
    number,
    borderWidth,
    borderRadius,
    color,
    imageSrc,
    imageURL,
    imageBase64,
    svg,
    html,
    text,
    fontSize,
    lineHeight,
    textAlign,
    fontFamily,
    fontWeight,
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
  function box(desc = {}) {
    const { borderColor, borderRadius: borderRadius2, borderWidth: borderWidth2 } = desc;
    if (desc.hasOwnProperty("borderColor") && !is.color(borderColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderRadius") && !is.number(borderRadius2)) {
      return false;
    }
    if (desc.hasOwnProperty("borderWidth") && !is.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function rectDesc(desc) {
    const { bgColor } = desc;
    if (desc.hasOwnProperty("bgColor") && !is.color(bgColor)) {
      return false;
    }
    if (!box(desc)) {
      return false;
    }
    return true;
  }
  function circleDesc(desc) {
    const { bgColor, borderColor, borderWidth: borderWidth2 } = desc;
    if (desc.hasOwnProperty("bgColor") && !is.color(bgColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderColor") && !is.color(borderColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderWidth") && !is.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function imageDesc(desc) {
    const { src } = desc;
    if (!is.imageSrc(src)) {
      return false;
    }
    return true;
  }
  function svgDesc(desc) {
    const { svg: svg2 } = desc;
    if (!is.svg(svg2)) {
      return false;
    }
    return true;
  }
  function htmlDesc(desc) {
    const { html: html2 } = desc;
    if (!is.html(html2)) {
      return false;
    }
    return true;
  }
  function textDesc(desc) {
    const { text: text2, color: color2, fontSize: fontSize2, lineHeight: lineHeight2, fontFamily: fontFamily2, textAlign: textAlign2, fontWeight: fontWeight2, bgColor, strokeWidth: strokeWidth2, strokeColor } = desc;
    if (!is.text(text2)) {
      return false;
    }
    if (!is.color(color2)) {
      return false;
    }
    if (!is.fontSize(fontSize2)) {
      return false;
    }
    if (desc.hasOwnProperty("bgColor") && !is.color(bgColor)) {
      return false;
    }
    if (desc.hasOwnProperty("fontWeight") && !is.fontWeight(fontWeight2)) {
      return false;
    }
    if (desc.hasOwnProperty("lineHeight") && !is.lineHeight(lineHeight2)) {
      return false;
    }
    if (desc.hasOwnProperty("fontFamily") && !is.fontFamily(fontFamily2)) {
      return false;
    }
    if (desc.hasOwnProperty("textAlign") && !is.textAlign(textAlign2)) {
      return false;
    }
    if (desc.hasOwnProperty("strokeWidth") && !is.strokeWidth(strokeWidth2)) {
      return false;
    }
    if (desc.hasOwnProperty("strokeColor") && !is.color(strokeColor)) {
      return false;
    }
    if (!box(desc)) {
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
  function parseRadianToAngle(radian) {
    return radian / Math.PI * 180;
  }
  function parseAngleToRadian(angle2) {
    return angle2 / 180 * Math.PI;
  }
  function calcElementCenter(elem) {
    const p = {
      x: elem.x + elem.w / 2,
      y: elem.y + elem.h / 2
    };
    return p;
  }
  function calcRadian(center, start, end) {
    const startAngle = calcLineAngle(center, start);
    const endAngle = calcLineAngle(center, end);
    if (endAngle !== null && startAngle !== null) {
      if (startAngle > Math.PI * 3 / 2 && endAngle < Math.PI / 2) {
        return endAngle + (Math.PI * 2 - startAngle);
      } else if (endAngle > Math.PI * 3 / 2 && startAngle < Math.PI / 2) {
        return startAngle + (Math.PI * 2 - endAngle);
      } else {
        return endAngle - startAngle;
      }
    } else {
      return 0;
    }
  }
  function calcLineAngle(center, p) {
    const x2 = p.x - center.x;
    const y2 = center.y - p.y;
    if (x2 === 0) {
      if (y2 < 0) {
        return Math.PI / 2;
      } else if (y2 > 0) {
        return Math.PI * (3 / 2);
      }
    } else if (y2 === 0) {
      if (x2 < 0) {
        return Math.PI;
      } else if (x2 > 0) {
        return 0;
      }
    }
    if (x2 > 0 && y2 < 0) {
      return Math.atan(Math.abs(y2) / Math.abs(x2));
    } else if (x2 < 0 && y2 < 0) {
      return Math.PI - Math.atan(Math.abs(y2) / Math.abs(x2));
    } else if (x2 < 0 && y2 > 0) {
      return Math.PI + Math.atan(Math.abs(y2) / Math.abs(x2));
    } else if (x2 > 0 && y2 > 0) {
      return Math.PI * 2 - Math.atan(Math.abs(y2) / Math.abs(x2));
    }
    return null;
  }
  const defaultConfig = {
    elementWrapper: {
      color: "#0d85da",
      lockColor: "#aaaaaa",
      controllerSize: 6,
      lineWidth: 1,
      lineDash: [4, 3]
    }
  };
  function mergeConfig(config) {
    const result = deepClone(defaultConfig);
    if (config) {
      if (config.elementWrapper) {
        result.elementWrapper = Object.assign(Object.assign({}, result.elementWrapper), config.elementWrapper);
      }
    }
    return result;
  }
  class CoreEvent {
    constructor() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    on(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
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
    trigger(eventKey, arg) {
      const callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach((cb) => {
          cb(arg);
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
  function isChangeImageElementResource(before, after) {
    var _a, _b;
    return ((_a = before === null || before === void 0 ? void 0 : before.desc) === null || _a === void 0 ? void 0 : _a.src) !== ((_b = after === null || after === void 0 ? void 0 : after.desc) === null || _b === void 0 ? void 0 : _b.src);
  }
  function isChangeSVGElementResource(before, after) {
    var _a, _b;
    return ((_a = before === null || before === void 0 ? void 0 : before.desc) === null || _a === void 0 ? void 0 : _a.svg) !== ((_b = after === null || after === void 0 ? void 0 : after.desc) === null || _b === void 0 ? void 0 : _b.svg);
  }
  function isChangeHTMLElementResource(before, after) {
    var _a, _b, _c, _d, _e, _f;
    return ((_a = before === null || before === void 0 ? void 0 : before.desc) === null || _a === void 0 ? void 0 : _a.html) !== ((_b = after === null || after === void 0 ? void 0 : after.desc) === null || _b === void 0 ? void 0 : _b.html) || ((_c = before === null || before === void 0 ? void 0 : before.desc) === null || _c === void 0 ? void 0 : _c.width) !== ((_d = after === null || after === void 0 ? void 0 : after.desc) === null || _d === void 0 ? void 0 : _d.width) || ((_e = before === null || before === void 0 ? void 0 : before.desc) === null || _e === void 0 ? void 0 : _e.height) !== ((_f = after === null || after === void 0 ? void 0 : after.desc) === null || _f === void 0 ? void 0 : _f.height);
  }
  function diffElementResourceChange(before, after) {
    let result = null;
    let isChange = false;
    switch (after.type) {
      case "image": {
        isChange = isChangeImageElementResource(before, after);
        break;
      }
      case "svg": {
        isChange = isChangeSVGElementResource(before, after);
        break;
      }
      case "html": {
        isChange = isChangeHTMLElementResource(before, after);
        break;
      }
    }
    if (isChange === true) {
      result = after.uuid;
    }
    return result;
  }
  function diffElementResourceChangeList(before, after) {
    var _a;
    const uuids = [];
    const beforeMap = parseDataElementMap(before);
    const afterMap = parseDataElementMap(after);
    for (const uuid in afterMap) {
      if (["image", "svg", "html"].includes((_a = afterMap[uuid]) === null || _a === void 0 ? void 0 : _a.type) !== true) {
        continue;
      }
      if (beforeMap[uuid]) {
        let isChange = false;
        switch (beforeMap[uuid].type) {
          case "image": {
            isChange = isChangeImageElementResource(beforeMap[uuid], afterMap[uuid]);
            break;
          }
          case "svg": {
            isChange = isChangeSVGElementResource(beforeMap[uuid], afterMap[uuid]);
            break;
          }
          case "html": {
            isChange = isChangeHTMLElementResource(beforeMap[uuid], afterMap[uuid]);
            break;
          }
        }
        if (isChange === true) {
          uuids.push(uuid);
        }
      } else {
        uuids.push(uuid);
      }
    }
    return uuids;
  }
  function parseDataElementMap(data) {
    const elemMap = {};
    data.elements.forEach((elem) => {
      elemMap[elem.uuid] = elem;
    });
    return elemMap;
  }
  function rotateElement(ctx, elem, callback) {
    const center = calcElementCenter(elem);
    const radian = parseAngleToRadian(elem.angle || 0);
    return rotateContext(ctx, center, radian || 0, callback);
  }
  function rotateContext(ctx, center, radian, callback) {
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
  function limitNum(num) {
    const numStr = num.toFixed(2);
    return parseFloat(numStr);
  }
  function limitAngle(angle2) {
    return limitNum(angle2 % 360);
  }
  const elementTypes = {
    "text": {},
    "rect": {},
    "image": {},
    "svg": {},
    "circle": {},
    "html": {}
  };
  const elementNames = Object.keys(elementTypes);
  const LIMIT_QBLIQUE_ANGLE = 15;
  const limitQbliqueAngle$1 = LIMIT_QBLIQUE_ANGLE;
  class Element {
    constructor(ctx) {
      this._ctx = ctx;
    }
    initData(data) {
      data.elements.forEach((elem) => {
        if (!(elem.uuid && typeof elem.uuid === "string")) {
          elem.uuid = createUUID();
        }
      });
      return data;
    }
    isPointInElement(p, data) {
      var _a, _b;
      const ctx = this._ctx;
      let idx = -1;
      let uuid = null;
      for (let i = data.elements.length - 1; i >= 0; i--) {
        const ele = data.elements[i];
        if (((_a = ele.operation) === null || _a === void 0 ? void 0 : _a.invisible) === true)
          continue;
        let bw = 0;
        if (((_b = ele.desc) === null || _b === void 0 ? void 0 : _b.borderWidth) > 0) {
          bw = ele.desc.borderWidth;
        }
        rotateElement(ctx, ele, () => {
          ctx.beginPath();
          ctx.moveTo(ele.x - bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y - bw);
          ctx.closePath();
          if (ctx.isPointInPath(p.x, p.y)) {
            idx = i;
            uuid = ele.uuid;
          }
        });
        if (idx >= 0) {
          break;
        }
      }
      return [idx, uuid];
    }
    dragElement(data, uuid, point, prevPoint, scale) {
      const index = this.getElementIndex(data, uuid);
      if (!data.elements[index]) {
        return;
      }
      const moveX = point.x - prevPoint.x;
      const moveY = point.y - prevPoint.y;
      data.elements[index].x += moveX / scale;
      data.elements[index].y += moveY / scale;
      this.limitElementAttrs(data.elements[index]);
    }
    transformElement(data, uuid, point, prevPoint, scale, direction) {
      var _a, _b;
      const index = this.getElementIndex(data, uuid);
      if (!data.elements[index]) {
        return null;
      }
      if (((_b = (_a = data.elements[index]) === null || _a === void 0 ? void 0 : _a.operation) === null || _b === void 0 ? void 0 : _b.lock) === true) {
        return null;
      }
      const moveX = (point.x - prevPoint.x) / scale;
      const moveY = (point.y - prevPoint.y) / scale;
      const elem = data.elements[index];
      if ([
        "top-left",
        "top",
        "top-right",
        "right",
        "bottom-right",
        "bottom",
        "bottom-left",
        "left"
      ].includes(direction)) {
        const p = calcuScaleElemPosition(elem, moveX, moveY, direction);
        elem.x = p.x;
        elem.y = p.y;
        elem.w = p.w;
        elem.h = p.h;
      } else if (direction === "rotate") {
        const center = calcElementCenter(elem);
        const radian = calcRadian(center, prevPoint, point);
        elem.angle = (elem.angle || 0) + parseRadianToAngle(radian);
      }
      this.limitElementAttrs(elem);
      return {
        width: limitNum(elem.w),
        height: limitNum(elem.h),
        angle: limitAngle(elem.angle || 0)
      };
    }
    getElementIndex(data, uuid) {
      let idx = -1;
      for (let i = 0; i < data.elements.length; i++) {
        if (data.elements[i].uuid === uuid) {
          idx = i;
          break;
        }
      }
      return idx;
    }
    limitElementAttrs(elem) {
      elem.x = limitNum(elem.x);
      elem.y = limitNum(elem.y);
      elem.w = limitNum(elem.w);
      elem.h = limitNum(elem.h);
      elem.angle = limitAngle(elem.angle || 0);
    }
  }
  function calcuScaleElemPosition(elem, moveX, moveY, direction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const p = { x: elem.x, y: elem.y, w: elem.w, h: elem.h };
    elem.angle || 0;
    if (((_a = elem.operation) === null || _a === void 0 ? void 0 : _a.limitRatio) === true) {
      if (["top-left", "top-right", "bottom-right", "bottom-left"].includes(direction)) {
        const maxDist = Math.max(Math.abs(moveX), Math.abs(moveY));
        moveX = (moveX >= 0 ? 1 : -1) * maxDist;
        moveY = (moveY >= 0 ? 1 : -1) * maxDist / elem.w * elem.h;
      }
    }
    switch (direction) {
      case "top-left": {
        if (elem.w - moveX > 0 && elem.h - moveY > 0) {
          p.x += moveX;
          p.y += moveY;
          p.w -= moveX;
          p.h -= moveY;
        }
        break;
      }
      case "top": {
        if (elem.angle === 0 || Math.abs(elem.angle || 0) < limitQbliqueAngle$1) {
          if (p.h - moveY > 0) {
            p.y += moveY;
            p.h -= moveY;
            if (((_b = elem.operation) === null || _b === void 0 ? void 0 : _b.limitRatio) === true) {
              p.x += moveY / elem.h * elem.w / 2;
              p.w -= moveY / elem.h * elem.w;
            }
          }
        } else if (elem.angle !== void 0 && (elem.angle > 0 || elem.angle < 0)) {
          const angle2 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          let moveDist = calcMoveDist(moveX, moveY);
          let centerX = p.x + elem.w / 2;
          let centerY = p.y + elem.h / 2;
          if (angle2 < 90) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          } else if (angle2 < 180) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2 - 90);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          } else if (angle2 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2 - 180);
            const centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          } else if (angle2 < 360) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2 - 270);
            const centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.cos(radian);
            centerY = centerY - centerMoveDist * Math.sin(radian);
          }
          if (p.h + moveDist > 0) {
            if (((_c = elem.operation) === null || _c === void 0 ? void 0 : _c.limitRatio) === true) {
              p.w = p.w + moveDist / elem.h * elem.w;
            }
            p.h = p.h + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (p.h - moveY > 0) {
            p.y += moveY;
            p.h -= moveY;
            if (((_d = elem.operation) === null || _d === void 0 ? void 0 : _d.limitRatio) === true) {
              p.x -= moveX / 2;
              p.w += moveX;
            }
          }
        }
        break;
      }
      case "top-right": {
        if (p.h - moveY > 0 && p.w + moveX > 0) {
          p.y += moveY;
          p.w += moveX;
          p.h -= moveY;
        }
        break;
      }
      case "right": {
        if (elem.angle === 0 || Math.abs(elem.angle || 0) < limitQbliqueAngle$1) {
          if (elem.w + moveX > 0) {
            p.w += moveX;
            if (((_e = elem.operation) === null || _e === void 0 ? void 0 : _e.limitRatio) === true) {
              p.y -= moveX * elem.h / elem.w / 2;
              p.h += moveX * elem.h / elem.w;
            }
          }
        } else if (elem.angle !== void 0 && (elem.angle > 0 || elem.angle < 0)) {
          const angle2 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          let moveDist = calcMoveDist(moveX, moveY);
          let centerX = p.x + elem.w / 2;
          let centerY = p.y + elem.h / 2;
          if (angle2 < 90) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          } else if (angle2 < 180) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2 - 90);
            const centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          } else if (angle2 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2 - 180);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
            moveDist = 0 - moveDist;
          } else if (angle2 < 360) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2 - 270);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          }
          if (p.w + moveDist > 0) {
            if (((_f = elem.operation) === null || _f === void 0 ? void 0 : _f.limitRatio) === true) {
              p.h = p.h + moveDist / elem.w * elem.h;
            }
            p.w = p.w + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (elem.w + moveX > 0) {
            p.w += moveX;
            if (((_g = elem.operation) === null || _g === void 0 ? void 0 : _g.limitRatio) === true) {
              p.h += moveX * elem.h / elem.w;
              p.y -= moveX * elem.h / elem.w / 2;
            }
          }
        }
        break;
      }
      case "bottom-right": {
        if (elem.w + moveX > 0 && elem.h + moveY > 0) {
          p.w += moveX;
          p.h += moveY;
        }
        break;
      }
      case "bottom": {
        if (elem.angle === 0 || Math.abs(elem.angle || 0) < limitQbliqueAngle$1) {
          if (elem.h + moveY > 0) {
            p.h += moveY;
            if (((_h = elem.operation) === null || _h === void 0 ? void 0 : _h.limitRatio) === true) {
              p.x -= moveY / elem.h * elem.w / 2;
              p.w += moveY / elem.h * elem.w;
            }
          }
        } else if (elem.angle !== void 0 && (elem.angle > 0 || elem.angle < 0)) {
          const angle2 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          let moveDist = calcMoveDist(moveX, moveY);
          let centerX = p.x + elem.w / 2;
          let centerY = p.y + elem.h / 2;
          if (angle2 < 90) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2);
            const centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          } else if (angle2 < 180) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2 - 90);
            const centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.cos(radian);
            centerY = centerY - centerMoveDist * Math.sin(radian);
          } else if (angle2 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2 - 180);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          } else if (angle2 < 360) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2 - 270);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          }
          if (p.h + moveDist > 0) {
            if (((_j = elem.operation) === null || _j === void 0 ? void 0 : _j.limitRatio) === true) {
              p.w = p.w + moveDist / elem.h * elem.w;
            }
            p.h = p.h + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (elem.h + moveY > 0) {
            p.h += moveY;
            if (((_k = elem.operation) === null || _k === void 0 ? void 0 : _k.limitRatio) === true) {
              p.x -= moveY / elem.h * elem.w / 2;
              p.w += moveY / elem.h * elem.w;
            }
          }
        }
        break;
      }
      case "bottom-left": {
        if (elem.w - moveX > 0 && elem.h + moveY > 0) {
          p.x += moveX;
          p.w -= moveX;
          p.h += moveY;
        }
        break;
      }
      case "left": {
        if (elem.angle === 0 || Math.abs(elem.angle || 0) < limitQbliqueAngle$1) {
          if (elem.w - moveX > 0) {
            p.x += moveX;
            p.w -= moveX;
            if (((_l = elem.operation) === null || _l === void 0 ? void 0 : _l.limitRatio) === true) {
              p.h -= moveX / elem.w * elem.h;
              p.y += moveX / elem.w * elem.h / 2;
            }
          }
        } else if (elem.angle !== void 0 && (elem.angle > 0 || elem.angle < 0)) {
          const angle2 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          let moveDist = calcMoveDist(moveX, moveY);
          let centerX = p.x + elem.w / 2;
          let centerY = p.y + elem.h / 2;
          if (angle2 < 90) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2);
            const centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.cos(radian);
            centerY = centerY - centerMoveDist * Math.sin(radian);
          } else if (angle2 < 180) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            const radian = parseRadian(angle2 - 90);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          } else if (angle2 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2 - 180);
            const centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          } else if (angle2 < 360) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            const radian = parseRadian(angle2 - 270);
            const centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          }
          if (p.w + moveDist > 0) {
            if (((_m = elem.operation) === null || _m === void 0 ? void 0 : _m.limitRatio) === true) {
              p.h = p.h + moveDist / elem.w * elem.h;
            }
            p.w = p.w + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (elem.w - moveX > 0) {
            p.x += moveX;
            p.w -= moveX;
            if (((_o = elem.operation) === null || _o === void 0 ? void 0 : _o.limitRatio) === true) {
              p.h -= moveX / elem.w * elem.h;
              p.y += moveX / elem.w * elem.h / 2;
            }
          }
        }
        break;
      }
    }
    return p;
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
  const limitQbliqueAngle = LIMIT_QBLIQUE_ANGLE;
  class Helper {
    constructor(board, config) {
      this._areaStart = { x: 0, y: 0 };
      this._areaEnd = { x: 0, y: 0 };
      this._board = board;
      this._ctx = this._board.getContext();
      this._coreConfig = config;
      this._helperConfig = {
        elementIndexMap: {}
      };
    }
    updateConfig(data, opts) {
      this._updateElementIndex(data);
      this._updateSelectedElementWrapper(data, opts);
      this._updateSelectedElementListWrapper(data, opts);
    }
    getConfig() {
      return deepClone(this._helperConfig);
    }
    getElementIndexByUUID(uuid) {
      const index = this._helperConfig.elementIndexMap[uuid];
      if (index >= 0) {
        return index;
      }
      return null;
    }
    isPointInElementWrapperController(p, data) {
      var _a, _b;
      const ctx = this._ctx;
      const uuid = ((_b = (_a = this._helperConfig) === null || _a === void 0 ? void 0 : _a.selectedElementWrapper) === null || _b === void 0 ? void 0 : _b.uuid) || null;
      let directIndex = null;
      let selectedControllerDirection = null;
      let hoverControllerDirection = null;
      if (!this._helperConfig.selectedElementWrapper) {
        return {
          uuid,
          selectedControllerDirection,
          directIndex,
          hoverControllerDirection
        };
      }
      const wrapper = this._helperConfig.selectedElementWrapper;
      const controllers = [
        wrapper.controllers.right,
        wrapper.controllers.topRight,
        wrapper.controllers.top,
        wrapper.controllers.topLeft,
        wrapper.controllers.left,
        wrapper.controllers.bottomLeft,
        wrapper.controllers.bottom,
        wrapper.controllers.bottomRight
      ];
      const directionNames = [
        "right",
        "top-right",
        "top",
        "top-left",
        "left",
        "bottom-left",
        "bottom",
        "bottom-right"
      ];
      let hoverDirectionNames = deepClone(directionNames);
      let angleMoveNum = 0;
      if (data && uuid) {
        const elemIdx = this.getElementIndexByUUID(uuid);
        if (elemIdx !== null && elemIdx >= 0) {
          const elem = data.elements[elemIdx];
          let angle2 = elem.angle || 0;
          if (angle2 < 0) {
            angle2 += 360;
          }
          if (angle2 < 45) {
            angleMoveNum = 0;
          } else if (angle2 < 90) {
            angleMoveNum = 1;
          } else if (angle2 < 135) {
            angleMoveNum = 2;
          } else if (angle2 < 180) {
            angleMoveNum = 3;
          } else if (angle2 < 225) {
            angleMoveNum = 4;
          } else if (angle2 < 270) {
            angleMoveNum = 5;
          } else if (angle2 < 315) {
            angleMoveNum = 6;
          }
        }
      }
      if (angleMoveNum > 0) {
        hoverDirectionNames = hoverDirectionNames.slice(-angleMoveNum).concat(hoverDirectionNames.slice(0, -angleMoveNum));
      }
      rotateContext(ctx, wrapper.translate, wrapper.radian || 0, () => {
        for (let i = 0; i < controllers.length; i++) {
          const controller = controllers[i];
          if (controller.invisible === true) {
            continue;
          }
          ctx.beginPath();
          ctx.arc(controller.x, controller.y, wrapper.controllerSize, 0, Math.PI * 2);
          ctx.closePath();
          if (ctx.isPointInPath(p.x, p.y)) {
            selectedControllerDirection = directionNames[i];
            hoverControllerDirection = hoverDirectionNames[i];
          }
          if (selectedControllerDirection) {
            directIndex = i;
            break;
          }
        }
      });
      if (selectedControllerDirection === null) {
        const controller = wrapper.controllers.rotate;
        if (controller.invisible !== true) {
          rotateContext(ctx, wrapper.translate, wrapper.radian || 0, () => {
            ctx.beginPath();
            ctx.arc(controller.x, controller.y, wrapper.controllerSize, 0, Math.PI * 2);
            ctx.closePath();
            if (ctx.isPointInPath(p.x, p.y)) {
              selectedControllerDirection = "rotate";
              hoverControllerDirection = "rotate";
            }
          });
        }
      }
      return {
        uuid,
        selectedControllerDirection,
        hoverControllerDirection,
        directIndex
      };
    }
    isPointInElementList(p, data) {
      var _a, _b, _c;
      const ctx = this._ctx;
      let idx = -1;
      let uuid = null;
      const wrapperList = ((_a = this._helperConfig) === null || _a === void 0 ? void 0 : _a.selectedElementListWrappers) || [];
      for (let i = 0; i < wrapperList.length; i++) {
        const wrapper = wrapperList[i];
        const elemIdx = this._helperConfig.elementIndexMap[wrapper.uuid];
        const ele = data.elements[elemIdx];
        if (!ele)
          continue;
        if (((_b = ele.operation) === null || _b === void 0 ? void 0 : _b.invisible) === true)
          continue;
        let bw = 0;
        if (((_c = ele.desc) === null || _c === void 0 ? void 0 : _c.borderWidth) > 0) {
          bw = ele.desc.borderWidth;
        }
        rotateElement(ctx, ele, () => {
          ctx.beginPath();
          ctx.moveTo(ele.x - bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y - bw);
          ctx.closePath();
          if (ctx.isPointInPath(p.x, p.y)) {
            idx = i;
            uuid = ele.uuid;
          }
        });
        if (idx >= 0) {
          break;
        }
      }
      if (uuid && idx >= 0) {
        return true;
      } else {
        return false;
      }
    }
    startSelectArea(p) {
      this._areaStart = p;
      this._areaEnd = p;
    }
    changeSelectArea(p) {
      this._areaEnd = p;
      this._calcSelectedArea();
    }
    clearSelectedArea() {
      this._areaStart = { x: 0, y: 0 };
      this._areaEnd = { x: 0, y: 0 };
      this._calcSelectedArea();
    }
    calcSelectedElements(data) {
      const transform = this._ctx.getTransform();
      const { scale = 1, scrollX = 0, scrollY = 0 } = transform;
      const start = this._areaStart;
      const end = this._areaEnd;
      const x2 = (Math.min(start.x, end.x) - scrollX) / scale;
      const y2 = (Math.min(start.y, end.y) - scrollY) / scale;
      const w2 = Math.abs(end.x - start.x) / scale;
      const h2 = Math.abs(end.y - start.y) / scale;
      const uuids = [];
      const ctx = this._ctx;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 + w2, y2);
      ctx.lineTo(x2 + w2, y2 + h2);
      ctx.lineTo(x2, y2 + h2);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      data.elements.forEach((elem) => {
        var _a;
        if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.invisible) !== true) {
          const centerX = elem.x + elem.w / 2;
          const centerY = elem.y + elem.h / 2;
          if (ctx.isPointInPathWithoutScroll(centerX, centerY)) {
            uuids.push(elem.uuid);
          }
        }
      });
      return uuids;
    }
    _calcSelectedArea() {
      const start = this._areaStart;
      const end = this._areaEnd;
      const transform = this._ctx.getTransform();
      const { scale = 1, scrollX = 0, scrollY = 0 } = transform;
      const elemWrapper = this._coreConfig.elementWrapper;
      const lineWidth = elemWrapper.lineWidth / scale;
      const lineDash = elemWrapper.lineDash.map((n) => n / scale);
      this._helperConfig.selectedAreaWrapper = {
        x: (Math.min(start.x, end.x) - scrollX) / scale,
        y: (Math.min(start.y, end.y) - scrollY) / scale,
        w: Math.abs(end.x - start.x) / scale,
        h: Math.abs(end.y - start.y) / scale,
        startPoint: { x: start.x, y: start.y },
        endPoint: { x: end.x, y: end.y },
        lineWidth,
        lineDash,
        color: elemWrapper.color
      };
    }
    _updateElementIndex(data) {
      this._helperConfig.elementIndexMap = {};
      data.elements.forEach((elem, i) => {
        this._helperConfig.elementIndexMap[elem.uuid] = i;
      });
    }
    _updateSelectedElementWrapper(data, opts) {
      var _a;
      const { selectedUUID: uuid } = opts;
      if (!(typeof uuid === "string" && this._helperConfig.elementIndexMap[uuid] >= 0)) {
        delete this._helperConfig.selectedElementWrapper;
        return;
      }
      const index = this._helperConfig.elementIndexMap[uuid];
      const elem = data.elements[index];
      if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.invisible) === true) {
        return;
      }
      const wrapper = this._createSelectedElementWrapper(elem, opts);
      this._helperConfig.selectedElementWrapper = wrapper;
    }
    _updateSelectedElementListWrapper(data, opts) {
      const { selectedUUIDList } = opts;
      const wrapperList = [];
      data.elements.forEach((elem) => {
        if (selectedUUIDList === null || selectedUUIDList === void 0 ? void 0 : selectedUUIDList.includes(elem.uuid)) {
          const wrapper = this._createSelectedElementWrapper(elem, opts);
          wrapperList.push(wrapper);
        }
      });
      this._helperConfig.selectedElementListWrappers = wrapperList;
    }
    _createSelectedElementWrapper(elem, opts) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
      const { scale } = opts;
      const elemWrapper = this._coreConfig.elementWrapper;
      const controllerSize = elemWrapper.controllerSize / scale;
      const lineWidth = elemWrapper.lineWidth / scale;
      const lineDash = elemWrapper.lineDash.map((n) => n / scale);
      const rotateLimit = 12;
      const bw = ((_a = elem.desc) === null || _a === void 0 ? void 0 : _a.borderWidth) || 0;
      let hideObliqueDirection = false;
      if (typeof elem.angle === "number" && Math.abs(elem.angle) > limitQbliqueAngle) {
        hideObliqueDirection = true;
      }
      const controllerOffset = lineWidth;
      const wrapper = {
        uuid: elem.uuid,
        controllerSize,
        controllerOffset,
        lock: ((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.lock) === true,
        controllers: {
          topLeft: {
            x: elem.x - controllerOffset - bw,
            y: elem.y - controllerOffset - bw,
            invisible: hideObliqueDirection || ((_c = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _c === void 0 ? void 0 : _c.disableScale) === true
          },
          top: {
            x: elem.x + elem.w / 2,
            y: elem.y - controllerOffset - bw,
            invisible: ((_d = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _d === void 0 ? void 0 : _d.disableScale) === true
          },
          topRight: {
            x: elem.x + elem.w + controllerOffset + bw,
            y: elem.y - controllerOffset - bw,
            invisible: hideObliqueDirection || ((_e = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _e === void 0 ? void 0 : _e.disableScale) === true
          },
          right: {
            x: elem.x + elem.w + controllerOffset + bw,
            y: elem.y + elem.h / 2,
            invisible: ((_f = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _f === void 0 ? void 0 : _f.disableScale) === true
          },
          bottomRight: {
            x: elem.x + elem.w + controllerOffset + bw,
            y: elem.y + elem.h + controllerOffset + bw,
            invisible: hideObliqueDirection || ((_g = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _g === void 0 ? void 0 : _g.disableScale) === true
          },
          bottom: {
            x: elem.x + elem.w / 2,
            y: elem.y + elem.h + controllerOffset + bw,
            invisible: ((_h = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _h === void 0 ? void 0 : _h.disableScale) === true
          },
          bottomLeft: {
            x: elem.x - controllerOffset - bw,
            y: elem.y + elem.h + controllerOffset + bw,
            invisible: hideObliqueDirection || ((_j = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _j === void 0 ? void 0 : _j.disableScale) === true
          },
          left: {
            x: elem.x - controllerOffset - bw,
            y: elem.y + elem.h / 2,
            invisible: ((_k = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _k === void 0 ? void 0 : _k.disableScale) === true
          },
          rotate: {
            x: elem.x + elem.w / 2,
            y: elem.y - controllerSize - (controllerSize * 2 + rotateLimit) - bw,
            invisible: ((_l = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _l === void 0 ? void 0 : _l.disableRotate) === true
          }
        },
        lineWidth,
        lineDash,
        color: ((_m = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _m === void 0 ? void 0 : _m.lock) === true ? elemWrapper.lockColor : elemWrapper.color
      };
      if (typeof elem.angle === "number" && (elem.angle > 0 || elem.angle < 0)) {
        wrapper.radian = parseAngleToRadian(elem.angle);
        wrapper.translate = calcElementCenter(elem);
      }
      return wrapper;
    }
  }
  const _board = Symbol("_displayCtx");
  const _helper = Symbol("_helper");
  const _element = Symbol("_element");
  const _opts = Symbol("_opts");
  class Mapper {
    constructor(opts) {
      this[_opts] = opts;
      this[_board] = this[_opts].board;
      this[_element] = this[_opts].element;
      this[_helper] = this[_opts].helper;
    }
    isEffectivePoint(p) {
      const scrollLineWidth = this[_board].getScrollLineWidth();
      const screenInfo = this[_board].getScreenInfo();
      if (p.x <= screenInfo.width - scrollLineWidth && p.y <= screenInfo.height - scrollLineWidth) {
        return true;
      }
      return false;
    }
    judgePointCursor(p, data) {
      let cursor = "auto";
      let elementUUID = null;
      if (!this.isEffectivePoint(p)) {
        return { cursor, elementUUID };
      }
      const { uuid, hoverControllerDirection } = this[_helper].isPointInElementWrapperController(p, data);
      const direction = hoverControllerDirection;
      if (uuid && direction) {
        switch (direction) {
          case "top-right": {
            cursor = "ne-resize";
            break;
          }
          case "top-left": {
            cursor = "nw-resize";
            break;
          }
          case "top": {
            cursor = "n-resize";
            break;
          }
          case "right": {
            cursor = "e-resize";
            break;
          }
          case "bottom-right": {
            cursor = "se-resize";
            break;
          }
          case "bottom": {
            cursor = "s-resize";
            break;
          }
          case "bottom-left": {
            cursor = "sw-resize";
            break;
          }
          case "left": {
            cursor = "w-resize";
            break;
          }
          case "rotate": {
            cursor = "grab";
            break;
          }
        }
        if (uuid) {
          elementUUID = uuid;
        }
      } else {
        const [index, uuid2] = this[_element].isPointInElement(p, data);
        if (index >= 0) {
          cursor = "move";
        }
        if (uuid2) {
          elementUUID = uuid2;
        }
      }
      return {
        cursor,
        elementUUID
      };
    }
  }
  function parseData(data) {
    const result = {
      elements: []
    };
    if (Array.isArray(data === null || data === void 0 ? void 0 : data.elements)) {
      data === null || data === void 0 ? void 0 : data.elements.forEach((elem = {}) => {
        if (isElement(elem)) {
          result.elements.push(elem);
        }
      });
    }
    if (typeof data.bgColor === "string") {
      result.bgColor = data.bgColor;
    }
    return result;
  }
  function isElement(elem) {
    if (!(isNumber(elem.x) && isNumber(elem.y) && isNumber(elem.w) && isNumber(elem.h))) {
      return false;
    }
    if (!(typeof elem.type === "string" && elementNames.includes(elem.type))) {
      return false;
    }
    return true;
  }
  function isNumber(num) {
    return num >= 0 || num < 0;
  }
  function createData$1() {
    return {
      hasInited: false
    };
  }
  let TempData$2 = class TempData {
    constructor() {
      this._temp = createData$1();
    }
    set(name, value) {
      this._temp[name] = value;
    }
    get(name) {
      return this._temp[name];
    }
    clear() {
      this._temp = createData$1();
    }
  };
  var Mode;
  (function(Mode2) {
    Mode2["NULL"] = "null";
    Mode2["SELECT_ELEMENT"] = "select-element";
    Mode2["SELECT_ELEMENT_LIST"] = "select-element-list";
    Mode2["SELECT_ELEMENT_WRAPPER_CONTROLLER"] = "select-element-wrapper-controller";
    Mode2["SELECT_AREA"] = "select-area";
  })(Mode || (Mode = {}));
  var CursorStatus;
  (function(CursorStatus2) {
    CursorStatus2["DRAGGING"] = "dragging";
    CursorStatus2["NULL"] = "null";
  })(CursorStatus || (CursorStatus = {}));
  function getSelectedElements(core) {
    const elems = [];
    let list = [];
    const uuid = core.getEngine().temp.get("selectedUUID");
    if (typeof uuid === "string" && uuid) {
      list.push(uuid);
    } else {
      list = core.getEngine().temp.get("selectedUUIDList");
    }
    list.forEach((uuid2) => {
      const index = core.getEngine().helper.getElementIndexByUUID(uuid2);
      if (index !== null && index >= 0) {
        const elem = core.$data.elements[index];
        if (elem)
          elems.push(elem);
      }
    });
    return deepClone(elems);
  }
  function getElement(core, uuid) {
    let elem = null;
    const index = core.getEngine().helper.getElementIndexByUUID(uuid);
    if (index !== null && core.$data.elements[index]) {
      elem = deepClone(core.$data.elements[index]);
    }
    return elem;
  }
  function getElementByIndex(core, index) {
    let elem = null;
    if (index >= 0 && core.$data.elements[index]) {
      elem = deepClone(core.$data.elements[index]);
    }
    return elem;
  }
  function updateElement(core, elem) {
    var _a;
    const _elem = deepClone(elem);
    const data = core.getData();
    const resourceChangeUUIDs = [];
    for (let i = 0; i < data.elements.length; i++) {
      if (_elem.uuid === ((_a = data.elements[i]) === null || _a === void 0 ? void 0 : _a.uuid)) {
        const result = diffElementResourceChange(data.elements[i], _elem);
        if (typeof result === "string") {
          resourceChangeUUIDs.push(result);
        }
        data.elements[i] = _elem;
        core.setData(data);
        break;
      }
    }
    core.$emitChangeData();
    core.$draw({ resourceChangeUUIDs });
  }
  function selectElementByIndex(core, index) {
    if (core.$data.elements[index]) {
      const uuid = core.$data.elements[index].uuid;
      core.getEngine().temp.set("mode", Mode.NULL);
      if (typeof uuid === "string") {
        core.getEngine().temp.set("selectedUUID", uuid);
        core.getEngine().temp.set("selectedUUIDList", []);
      }
      core.$draw();
    }
  }
  function selectElement(core, uuid) {
    const index = core.getEngine().helper.getElementIndexByUUID(uuid);
    if (typeof index === "number" && index >= 0) {
      core.selectElementByIndex(index);
    }
  }
  function cancelElementByIndex(core, index) {
    if (core.$data.elements[index]) {
      const uuid = core.$data.elements[index].uuid;
      const selectedUUID = core.getEngine().temp.get("selectedUUID");
      if (typeof uuid === "string" && uuid === selectedUUID) {
        core.getEngine().temp.set("mode", Mode.NULL);
        core.getEngine().temp.set("selectedUUID", null);
        core.getEngine().temp.set("selectedUUIDList", []);
      }
      core.$draw();
    }
  }
  function cancelElement(core, uuid) {
    const index = core.getEngine().helper.getElementIndexByUUID(uuid);
    if (typeof index === "number" && index >= 0) {
      core.cancelElementByIndex(index);
    }
  }
  function moveUpElement(core, uuid) {
    const index = core.getEngine().helper.getElementIndexByUUID(uuid);
    if (typeof index === "number" && index >= 0 && index < core.$data.elements.length - 1) {
      const temp = core.$data.elements[index];
      core.$data.elements[index] = core.$data.elements[index + 1];
      core.$data.elements[index + 1] = temp;
    }
    core.$emitChangeData();
    core.$draw();
  }
  function moveDownElement(core, uuid) {
    const index = core.getEngine().helper.getElementIndexByUUID(uuid);
    if (typeof index === "number" && index > 0 && index < core.$data.elements.length) {
      const temp = core.$data.elements[index];
      core.$data.elements[index] = core.$data.elements[index - 1];
      core.$data.elements[index - 1] = temp;
    }
    core.$emitChangeData();
    core.$draw();
  }
  function addElement(core, elem) {
    const _elem = deepClone(elem);
    _elem.uuid = createUUID();
    core.$data.elements.push(_elem);
    core.$emitChangeData();
    core.$draw();
    return _elem.uuid;
  }
  function deleteElement(core, uuid) {
    const index = core.$getElementHandler().getElementIndex(core.getData(), uuid);
    if (index >= 0) {
      core.$data.elements.splice(index, 1);
      core.$emitChangeData();
      core.$draw();
    }
  }
  function insertElementBefore(core, elem, beforeUUID) {
    const index = core.getEngine().helper.getElementIndexByUUID(beforeUUID);
    if (index !== null) {
      return core.insertElementBeforeIndex(elem, index);
    }
    return null;
  }
  function insertElementBeforeIndex(core, elem, index) {
    const _elem = deepClone(elem);
    _elem.uuid = createUUID();
    if (index >= 0) {
      core.$data.elements.splice(index, 0, _elem);
      core.$emitChangeData();
      core.$draw();
      return _elem.uuid;
    }
    return null;
  }
  function insertElementAfter(core, elem, beforeUUID) {
    const index = core.getEngine().helper.getElementIndexByUUID(beforeUUID);
    if (index !== null) {
      return core.insertElementAfterIndex(elem, index);
    }
    return null;
  }
  function insertElementAfterIndex(core, elem, index) {
    const _elem = deepClone(elem);
    _elem.uuid = createUUID();
    if (index >= 0) {
      core.$data.elements.splice(index + 1, 0, _elem);
      core.$emitChangeData();
      core.$draw();
      return _elem.uuid;
    }
    return null;
  }
  function createData() {
    return {
      hasInited: false,
      mode: Mode.NULL,
      cursorStatus: CursorStatus.NULL,
      selectedUUID: null,
      selectedUUIDList: [],
      hoverUUID: null,
      selectedControllerDirection: null,
      hoverControllerDirection: null,
      prevPoint: null,
      hasChangedElement: false
    };
  }
  let TempData$1 = class TempData {
    constructor() {
      this._temp = createData();
    }
    set(name, value) {
      this._temp[name] = value;
    }
    get(name) {
      return this._temp[name];
    }
    clear() {
      this._temp = createData();
    }
  };
  class Engine {
    constructor(opts) {
      this._plugins = [];
      const { board, config, element } = opts;
      const helper = new Helper(board, config);
      this._opts = opts;
      this.temp = new TempData$1();
      this.helper = helper;
      this._mapper = new Mapper({ board, helper, element });
    }
    addPlugin(plugin) {
      this._plugins.push(plugin);
    }
    getHelperConfig() {
      return this.helper.getConfig();
    }
    updateHelperConfig(opts) {
      var _a;
      const { board, getDataFeekback, config } = this._opts;
      const data = getDataFeekback();
      const transform = board.getTransform();
      this.helper.updateConfig(data, {
        width: opts.width,
        height: opts.height,
        devicePixelRatio: opts.devicePixelRatio,
        canScroll: ((_a = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _a === void 0 ? void 0 : _a.use) === true,
        selectedUUID: this.temp.get("selectedUUID"),
        selectedUUIDList: this.temp.get("selectedUUIDList"),
        scale: transform.scale,
        scrollX: transform.scrollX,
        scrollY: transform.scrollY
      });
    }
    init() {
      this._initEvent();
    }
    _initEvent() {
      if (this.temp.get("hasInited") === true) {
        return;
      }
      const { board } = this._opts;
      board.on("hover", throttle$1(this._handleHover.bind(this), 32));
      board.on("leave", throttle$1(this._handleLeave.bind(this), 32));
      board.on("point", throttle$1(this._handleClick.bind(this), 16));
      board.on("doubleClick", this._handleDoubleClick.bind(this));
      board.on("point", this._handlePoint.bind(this));
      board.on("moveStart", this._handleMoveStart.bind(this));
      board.on("move", throttle$1(this._handleMove.bind(this), 16));
      board.on("moveEnd", this._handleMoveEnd.bind(this));
    }
    _handleDoubleClick(point) {
      var _a, _b, _c;
      const { element, getDataFeekback, drawFeekback, coreEvent } = this._opts;
      const data = getDataFeekback();
      const [index, uuid] = element.isPointInElement(point, data);
      if (index >= 0 && uuid) {
        const elem = deepClone((_a = data.elements) === null || _a === void 0 ? void 0 : _a[index]);
        if (((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.invisible) !== true) {
          coreEvent.trigger("screenDoubleClickElement", {
            index,
            uuid,
            element: deepClone((_c = data.elements) === null || _c === void 0 ? void 0 : _c[index])
          });
        }
      }
      drawFeekback();
    }
    _handlePoint(point) {
      var _a, _b, _c;
      if (!this._mapper.isEffectivePoint(point)) {
        return;
      }
      const { element, getDataFeekback, selectElementByIndex: selectElementByIndex2, coreEvent, emitChangeScreen, drawFeekback } = this._opts;
      const helper = this.helper;
      const data = getDataFeekback();
      if (helper.isPointInElementList(point, data)) {
        this.temp.set("mode", Mode.SELECT_ELEMENT_LIST);
      } else {
        const { uuid, selectedControllerDirection } = helper.isPointInElementWrapperController(point, data);
        if (uuid && selectedControllerDirection) {
          this.temp.set("mode", Mode.SELECT_ELEMENT_WRAPPER_CONTROLLER);
          this.temp.set("selectedControllerDirection", selectedControllerDirection);
          this.temp.set("selectedUUID", uuid);
        } else {
          const [index, uuid2] = element.isPointInElement(point, data);
          if (index >= 0 && ((_b = (_a = data.elements[index]) === null || _a === void 0 ? void 0 : _a.operation) === null || _b === void 0 ? void 0 : _b.invisible) !== true) {
            selectElementByIndex2(index, { useMode: true });
            if (typeof uuid2 === "string" && coreEvent.has("screenSelectElement")) {
              coreEvent.trigger("screenSelectElement", {
                index,
                uuid: uuid2,
                element: deepClone((_c = data.elements) === null || _c === void 0 ? void 0 : _c[index])
              });
              emitChangeScreen();
            }
            this.temp.set("mode", Mode.SELECT_ELEMENT);
          } else {
            this.temp.set("selectedUUIDList", []);
            this.temp.set("selectedUUID", null);
            this.temp.set("mode", Mode.SELECT_AREA);
          }
        }
      }
      drawFeekback();
    }
    _handleClick(point) {
      var _a;
      const { element, getDataFeekback, coreEvent, drawFeekback } = this._opts;
      const data = getDataFeekback();
      const [index, uuid] = element.isPointInElement(point, data);
      if (index >= 0 && uuid) {
        coreEvent.trigger("screenClickElement", {
          index,
          uuid,
          element: deepClone((_a = data.elements) === null || _a === void 0 ? void 0 : _a[index])
        });
      }
      drawFeekback();
    }
    _handleMoveStart(point) {
      const { element, getDataFeekback, coreEvent } = this._opts;
      const data = getDataFeekback();
      const helper = this.helper;
      this.temp.set("prevPoint", point);
      const uuid = this.temp.get("selectedUUID");
      if (this.temp.get("mode") === Mode.SELECT_ELEMENT_LIST)
        ;
      else if (this.temp.get("mode") === Mode.SELECT_ELEMENT) {
        if (typeof uuid === "string" && coreEvent.has("screenMoveElementStart")) {
          coreEvent.trigger("screenMoveElementStart", {
            index: element.getElementIndex(data, uuid),
            uuid,
            x: point.x,
            y: point.y
          });
        }
      } else if (this.temp.get("mode") === Mode.SELECT_AREA) {
        helper.startSelectArea(point);
      }
    }
    _handleMove(point) {
      const { drawFeekback } = this._opts;
      const helper = this.helper;
      if (this.temp.get("mode") === Mode.SELECT_ELEMENT_LIST) {
        this.temp.set("hasChangedElement", true);
        this._dragElements(this.temp.get("selectedUUIDList"), point, this.temp.get("prevPoint"));
        drawFeekback();
        this.temp.set("cursorStatus", CursorStatus.DRAGGING);
      } else if (typeof this.temp.get("selectedUUID") === "string") {
        if (this.temp.get("mode") === Mode.SELECT_ELEMENT) {
          this.temp.set("hasChangedElement", true);
          this._dragElements([this.temp.get("selectedUUID")], point, this.temp.get("prevPoint"));
          drawFeekback();
          this.temp.set("cursorStatus", CursorStatus.DRAGGING);
        } else if (this.temp.get("mode") === Mode.SELECT_ELEMENT_WRAPPER_CONTROLLER && this.temp.get("selectedControllerDirection")) {
          this._transfromElement(this.temp.get("selectedUUID"), point, this.temp.get("prevPoint"), this.temp.get("selectedControllerDirection"));
          this.temp.set("cursorStatus", CursorStatus.DRAGGING);
        }
      } else if (this.temp.get("mode") === Mode.SELECT_AREA) {
        helper.changeSelectArea(point);
        drawFeekback();
      }
      this.temp.set("prevPoint", point);
    }
    _dragElements(uuids, point, prevPoint) {
      if (!prevPoint) {
        return;
      }
      const { board, element, getDataFeekback, drawFeekback } = this._opts;
      const data = getDataFeekback();
      const helper = this.helper;
      uuids.forEach((uuid) => {
        var _a, _b;
        const idx = helper.getElementIndexByUUID(uuid);
        if (idx === null)
          return;
        const elem = data.elements[idx];
        if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.lock) !== true && ((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.invisible) !== true) {
          element.dragElement(data, uuid, point, prevPoint, board.getContext().getTransform().scale);
        }
      });
      drawFeekback();
    }
    _transfromElement(uuid, point, prevPoint, direction) {
      if (!prevPoint) {
        return null;
      }
      const { board, element, getDataFeekback, drawFeekback } = this._opts;
      const data = getDataFeekback();
      const result = element.transformElement(data, uuid, point, prevPoint, board.getContext().getTransform().scale, direction);
      drawFeekback();
      return result;
    }
    _handleMoveEnd(point) {
      const { element, getDataFeekback, coreEvent, drawFeekback, emitChangeData } = this._opts;
      const data = getDataFeekback();
      const helper = this.helper;
      const uuid = this.temp.get("selectedUUID");
      if (typeof uuid === "string") {
        const index = element.getElementIndex(data, uuid);
        const elem = data.elements[index];
        if (elem) {
          if (coreEvent.has("screenMoveElementEnd")) {
            coreEvent.trigger("screenMoveElementEnd", {
              index,
              uuid,
              x: point.x,
              y: point.y
            });
          }
          if (coreEvent.has("screenChangeElement")) {
            coreEvent.trigger("screenChangeElement", {
              index,
              uuid,
              width: elem.w,
              height: elem.h,
              angle: elem.angle || 0
            });
          }
        }
      } else if (this.temp.get("mode") === Mode.SELECT_AREA) {
        const uuids = helper.calcSelectedElements(data);
        if (uuids.length > 0) {
          this.temp.set("selectedUUIDList", uuids);
          this.temp.set("selectedUUID", null);
        } else {
          this.temp.set("mode", Mode.NULL);
        }
        helper.clearSelectedArea();
        drawFeekback();
      }
      if (this.temp.get("mode") !== Mode.SELECT_ELEMENT) {
        this.temp.set("selectedUUID", null);
      }
      this.temp.set("cursorStatus", CursorStatus.NULL);
      this.temp.set("mode", Mode.NULL);
      if (this.temp.get("hasChangedElement") === true) {
        emitChangeData();
        this.temp.set("hasChangedElement", false);
      }
    }
    _handleHover(point) {
      var _a, _b;
      let isMouseOverElement = false;
      const { board, getDataFeekback, coreEvent } = this._opts;
      const data = getDataFeekback();
      const helper = this.helper;
      const mapper = this._mapper;
      if (this.temp.get("mode") === Mode.SELECT_AREA) {
        board.resetCursor();
      } else if (this.temp.get("cursorStatus") === CursorStatus.NULL) {
        const { cursor, elementUUID } = mapper.judgePointCursor(point, data);
        board.setCursor(cursor);
        if (elementUUID) {
          const index = helper.getElementIndexByUUID(elementUUID);
          if (index !== null && index >= 0) {
            const elem = data.elements[index];
            if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.lock) === true || ((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.invisible) === true) {
              board.resetCursor();
              return;
            }
            if (this.temp.get("hoverUUID") !== elem.uuid) {
              const preIndex = helper.getElementIndexByUUID(this.temp.get("hoverUUID") || "");
              if (preIndex !== null && data.elements[preIndex]) {
                coreEvent.trigger("mouseLeaveElement", {
                  uuid: this.temp.get("hoverUUID"),
                  index: preIndex,
                  element: data.elements[preIndex]
                });
              }
            }
            if (elem) {
              coreEvent.trigger("mouseOverElement", {
                uuid: elem.uuid,
                index,
                element: elem
              });
              this.temp.set("hoverUUID", elem.uuid);
              isMouseOverElement = true;
            }
          }
        }
      }
      if (isMouseOverElement !== true && this.temp.get("hoverUUID") !== null) {
        const uuid = this.temp.get("hoverUUID");
        const index = helper.getElementIndexByUUID(uuid || "");
        if (index !== null)
          coreEvent.trigger("mouseLeaveElement", {
            uuid,
            index,
            element: data.elements[index]
          });
        this.temp.set("hoverUUID", null);
      }
      if (coreEvent.has("mouseOverScreen"))
        coreEvent.trigger("mouseOverScreen", point);
    }
    _handleLeave() {
      const { coreEvent } = this._opts;
      if (coreEvent.has("mouseLeaveScreen")) {
        coreEvent.trigger("mouseLeaveScreen", void 0);
      }
    }
  }
  function clearContext(ctx) {
    ctx.setFillStyle("#000000");
    ctx.setStrokeStyle("#000000");
    ctx.setLineDash([]);
    ctx.setGlobalAlpha(1);
    ctx.setShadowColor("#00000000");
    ctx.setShadowOffsetX(0);
    ctx.setShadowOffsetY(0);
    ctx.setShadowBlur(0);
  }
  function drawElementWrapper(ctx, config) {
    if (!(config === null || config === void 0 ? void 0 : config.selectedElementWrapper)) {
      return;
    }
    const wrapper = config.selectedElementWrapper;
    clearContext(ctx);
    rotateContext(ctx, wrapper.translate, wrapper.radian || 0, () => {
      ctx.beginPath();
      ctx.setLineDash(wrapper.lineDash);
      ctx.setLineWidth(wrapper.lineWidth);
      ctx.setStrokeStyle(wrapper.color);
      ctx.moveTo(wrapper.controllers.topLeft.x, wrapper.controllers.topLeft.y);
      ctx.lineTo(wrapper.controllers.topRight.x, wrapper.controllers.topRight.y);
      ctx.lineTo(wrapper.controllers.bottomRight.x, wrapper.controllers.bottomRight.y);
      ctx.lineTo(wrapper.controllers.bottomLeft.x, wrapper.controllers.bottomLeft.y);
      ctx.lineTo(wrapper.controllers.topLeft.x, wrapper.controllers.topLeft.y - wrapper.lineWidth / 2);
      ctx.stroke();
      ctx.closePath();
      if (wrapper.lock !== true) {
        if (wrapper.controllers.rotate.invisible !== true) {
          ctx.beginPath();
          ctx.moveTo(wrapper.controllers.top.x, wrapper.controllers.top.y);
          ctx.lineTo(wrapper.controllers.rotate.x, wrapper.controllers.rotate.y + wrapper.controllerSize);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.setLineWidth(wrapper.controllerSize / 1.2);
          ctx.arc(wrapper.controllers.rotate.x, wrapper.controllers.rotate.y, wrapper.controllerSize * 0.8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.closePath();
          ctx.setStrokeStyle("#FFFFFF");
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.setLineWidth(wrapper.controllerSize / 2.1);
          ctx.arc(wrapper.controllers.rotate.x, wrapper.controllers.rotate.y, wrapper.controllerSize * 0.8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.closePath();
        }
        [
          wrapper.controllers.topLeft,
          wrapper.controllers.top,
          wrapper.controllers.topRight,
          wrapper.controllers.right,
          wrapper.controllers.bottomRight,
          wrapper.controllers.bottom,
          wrapper.controllers.bottomLeft,
          wrapper.controllers.left
        ].forEach((controller) => {
          if (controller.invisible !== true) {
            ctx.setFillStyle(wrapper.color);
            ctx.beginPath();
            ctx.arc(controller.x, controller.y, wrapper.controllerSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.setFillStyle("#FFFFFF");
            ctx.beginPath();
            ctx.arc(controller.x, controller.y, wrapper.controllerSize - 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
          }
        });
      } else {
        clearContext(ctx);
        ctx.setStrokeStyle(wrapper.color);
        [
          wrapper.controllers.topLeft,
          wrapper.controllers.top,
          wrapper.controllers.topRight,
          wrapper.controllers.right,
          wrapper.controllers.bottomRight,
          wrapper.controllers.bottom,
          wrapper.controllers.bottomLeft,
          wrapper.controllers.left
        ].forEach((controller) => {
          ctx.beginPath();
          ctx.moveTo(controller.x - wrapper.controllerSize / 2, controller.y - wrapper.controllerSize / 2);
          ctx.lineTo(controller.x + wrapper.controllerSize / 2, controller.y + wrapper.controllerSize / 2);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(controller.x + wrapper.controllerSize / 2, controller.y - wrapper.controllerSize / 2);
          ctx.lineTo(controller.x - wrapper.controllerSize / 2, controller.y + wrapper.controllerSize / 2);
          ctx.stroke();
          ctx.closePath();
        });
      }
    });
  }
  function drawAreaWrapper(ctx, config) {
    if (!(config === null || config === void 0 ? void 0 : config.selectedAreaWrapper)) {
      return;
    }
    const wrapper = config.selectedAreaWrapper;
    if (wrapper && wrapper.w > 0 && wrapper.h > 0) {
      clearContext(ctx);
      ctx.setGlobalAlpha(0.3);
      ctx.setFillStyle(wrapper.color);
      ctx.fillRect(wrapper.x, wrapper.y, wrapper.w, wrapper.h);
      clearContext(ctx);
      ctx.beginPath();
      ctx.setLineDash(wrapper.lineDash);
      ctx.setLineWidth(wrapper.lineWidth);
      ctx.setStrokeStyle(wrapper.color);
      ctx.moveTo(wrapper.x, wrapper.y);
      ctx.lineTo(wrapper.x + wrapper.w, wrapper.y);
      ctx.lineTo(wrapper.x + wrapper.w, wrapper.y + wrapper.h);
      ctx.lineTo(wrapper.x, wrapper.y + wrapper.h);
      ctx.lineTo(wrapper.x, wrapper.y);
      ctx.stroke();
      ctx.closePath();
    }
  }
  function drawElementListWrappers(ctx, config) {
    if (!Array.isArray(config === null || config === void 0 ? void 0 : config.selectedElementListWrappers)) {
      return;
    }
    const wrapperList = config.selectedElementListWrappers;
    wrapperList === null || wrapperList === void 0 ? void 0 : wrapperList.forEach((wrapper) => {
      clearContext(ctx);
      rotateContext(ctx, wrapper.translate, wrapper.radian || 0, () => {
        clearContext(ctx);
        ctx.setGlobalAlpha(0.05);
        ctx.setFillStyle(wrapper.color);
        ctx.fillRect(wrapper.controllers.topLeft.x, wrapper.controllers.topLeft.y, wrapper.controllers.bottomRight.x - wrapper.controllers.topLeft.x, wrapper.controllers.bottomRight.y - wrapper.controllers.topLeft.y);
        clearContext(ctx);
        ctx.beginPath();
        ctx.setLineDash(wrapper.lineDash);
        ctx.setLineWidth(wrapper.lineWidth);
        ctx.setStrokeStyle(wrapper.color);
        ctx.moveTo(wrapper.controllers.topLeft.x, wrapper.controllers.topLeft.y);
        ctx.lineTo(wrapper.controllers.topRight.x, wrapper.controllers.topRight.y);
        ctx.lineTo(wrapper.controllers.bottomRight.x, wrapper.controllers.bottomRight.y);
        ctx.lineTo(wrapper.controllers.bottomLeft.x, wrapper.controllers.bottomLeft.y);
        ctx.lineTo(wrapper.controllers.topLeft.x, wrapper.controllers.topLeft.y - wrapper.lineWidth / 2);
        ctx.stroke();
        ctx.closePath();
        if (wrapper.lock === true) {
          clearContext(ctx);
          ctx.setStrokeStyle(wrapper.color);
          [
            wrapper.controllers.topLeft,
            wrapper.controllers.top,
            wrapper.controllers.topRight,
            wrapper.controllers.right,
            wrapper.controllers.bottomRight,
            wrapper.controllers.bottom,
            wrapper.controllers.bottomLeft,
            wrapper.controllers.left
          ].forEach((controller) => {
            ctx.beginPath();
            ctx.moveTo(controller.x - wrapper.controllerSize / 2, controller.y - wrapper.controllerSize / 2);
            ctx.lineTo(controller.x + wrapper.controllerSize / 2, controller.y + wrapper.controllerSize / 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(controller.x + wrapper.controllerSize / 2, controller.y - wrapper.controllerSize / 2);
            ctx.lineTo(controller.x - wrapper.controllerSize / 2, controller.y + wrapper.controllerSize / 2);
            ctx.stroke();
            ctx.closePath();
          });
        }
      });
    });
  }
  class Core {
    constructor(mount, opts, config) {
      var _a, _b, _c;
      this._coreEvent = new CoreEvent();
      this._tempData = new TempData$2();
      this.$data = { elements: [] };
      this._opts = opts;
      this._config = mergeConfig(config || {});
      this._board = new Board(mount, Object.assign(Object.assign({}, this._opts), { canScroll: (_a = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _a === void 0 ? void 0 : _a.use, scrollConfig: Object.assign({ color: ((_b = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _b === void 0 ? void 0 : _b.color) || "#000000", width: ((_c = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _c === void 0 ? void 0 : _c.width) || 12 }, (config === null || config === void 0 ? void 0 : config.scrollWrapper) || {}) }));
      this._renderer = new Renderer();
      const drawFrame = () => {
        const helperCtx = this._board.getHelperContext();
        const helperConfig = this._engine.getHelperConfig();
        this._board.clear();
        const { contextWidth, contextHeight, devicePixelRatio } = this._opts;
        helperCtx.clearRect(0, 0, contextWidth * devicePixelRatio, contextHeight * devicePixelRatio);
        drawElementWrapper(helperCtx, helperConfig);
        drawAreaWrapper(helperCtx, helperConfig);
        drawElementListWrappers(helperCtx, helperConfig);
        this._board.draw();
      };
      this._renderer.on("drawFrame", () => {
        drawFrame();
      });
      this._renderer.on("drawFrameComplete", () => {
        drawFrame();
      });
      this._elementHandler = new Element(this._board.getContext());
      this._engine = new Engine({
        coreEvent: this._coreEvent,
        board: this._board,
        element: this._elementHandler,
        config: this._config,
        drawFeekback: this.$draw.bind(this),
        getDataFeekback: () => this.$data,
        selectElementByIndex: this.selectElementByIndex.bind(this),
        emitChangeScreen: this._emitChangeScreen.bind(this),
        emitChangeData: this.$emitChangeData.bind(this)
      });
      this._engine.init();
      this._renderer.on("drawFrame", () => {
        this._coreEvent.trigger("drawFrame", void 0);
      });
      this._renderer.on("drawFrameComplete", () => {
        this._coreEvent.trigger("drawFrameComplete", void 0);
      });
      this._tempData.set("hasInited", true);
    }
    _emitChangeScreen() {
      if (this._coreEvent.has("changeScreen")) {
        this._coreEvent.trigger("changeScreen", Object.assign({}, this.getScreenTransform()));
      }
    }
    $draw(opts) {
      this._engine.updateHelperConfig({
        width: this._opts.width,
        height: this._opts.height,
        devicePixelRatio: this._opts.devicePixelRatio
      });
      this._renderer.thaw();
      this._renderer.render(this._board.getContext(), this.$data, {
        changeResourceUUIDs: (opts === null || opts === void 0 ? void 0 : opts.resourceChangeUUIDs) || []
      });
    }
    getElement(uuid) {
      return getElement(this, uuid);
    }
    getElementByIndex(index) {
      return getElementByIndex(this, index);
    }
    selectElementByIndex(index) {
      return selectElementByIndex(this, index);
    }
    selectElement(uuid) {
      return selectElement(this, uuid);
    }
    cancelElementByIndex(index) {
      return cancelElementByIndex(this, index);
    }
    cancelElement(uuid) {
      return cancelElement(this, uuid);
    }
    moveUpElement(uuid) {
      return moveUpElement(this, uuid);
    }
    moveDownElement(uuid) {
      return moveDownElement(this, uuid);
    }
    updateElement(elem) {
      return updateElement(this, elem);
    }
    addElement(elem) {
      return addElement(this, elem);
    }
    deleteElement(uuid) {
      return deleteElement(this, uuid);
    }
    insertElementBefore(elem, beforeUUID) {
      return insertElementBefore(this, elem, beforeUUID);
    }
    insertElementBeforeIndex(elem, index) {
      return insertElementBeforeIndex(this, elem, index);
    }
    getSelectedElements() {
      return getSelectedElements(this);
    }
    insertElementAfter(elem, beforeUUID) {
      return insertElementAfter(this, elem, beforeUUID);
    }
    insertElementAfterIndex(elem, index) {
      return insertElementAfterIndex(this, elem, index);
    }
    resetSize(opts) {
      this._opts = Object.assign(Object.assign({}, this._opts), opts);
      this._board.resetSize(opts);
      this.$draw();
    }
    scale(ratio) {
      const screen = this._board.scale(ratio);
      this.$draw();
      this._emitChangeScreen();
      return screen;
    }
    scrollLeft(left) {
      const screen = this._board.scrollX(0 - left);
      this.$draw();
      this._emitChangeScreen();
      return screen;
    }
    scrollTop(top) {
      const screen = this._board.scrollY(0 - top);
      this.$draw();
      this._emitChangeScreen();
      return screen;
    }
    getScreenTransform() {
      const transform = this._board.getTransform();
      return {
        scale: transform.scale,
        scrollTop: Math.max(0, 0 - transform.scrollY),
        scrollLeft: Math.max(0, 0 - transform.scrollX)
      };
    }
    getData() {
      return deepClone(this.$data);
    }
    setData(data, opts) {
      const resourceChangeUUIDs = diffElementResourceChangeList(this.$data, data);
      this.$data = this._elementHandler.initData(deepClone(parseData(data)));
      if (opts && opts.triggerChangeEvent === true) {
        this.$emitChangeData();
      }
      this.$draw({ resourceChangeUUIDs });
    }
    clearOperation() {
      this._tempData.clear();
      this.$draw();
    }
    on(key, callback) {
      this._coreEvent.on(key, callback);
    }
    off(key, callback) {
      this._coreEvent.off(key, callback);
    }
    getEngine() {
      return this._engine;
    }
    pointScreenToContext(p) {
      return this._board.pointScreenToContext(p);
    }
    pointContextToScreen(p) {
      return this._board.pointContextToScreen(p);
    }
    $getBoardContext() {
      return this._board.getContext();
    }
    $getDisplayContext2D() {
      return this._board.getDisplayContext2D();
    }
    $getOriginContext2D() {
      return this._board.getOriginContext2D();
    }
    $emitChangeData() {
      if (this._coreEvent.has("changeData")) {
        this._coreEvent.trigger("changeData", deepClone(this.$data));
      }
    }
    $getElementHandler() {
      return this._elementHandler;
    }
  }
  Core.is = is;
  Core.check = check;
  const defaultOptions = {
    width: 400,
    height: 300,
    contextWidth: 400,
    contextHeight: 300,
    devicePixelRatio: 1,
    onlyRender: false,
    maxRecords: 10,
    disableKeyboard: true
  };
  function createDefaultData() {
    return {
      isFocus: false,
      doRecords: [],
      unDoRecords: [],
      clipboardElements: [],
      isDownloading: false
    };
  }
  class TempData {
    constructor() {
      this._temp = createDefaultData();
    }
    set(name, value) {
      this._temp[name] = value;
    }
    get(name) {
      return this._temp[name];
    }
    clear() {
      this._temp = createDefaultData();
    }
  }
  class KeyboardWatcher {
    constructor() {
      this._listeners = /* @__PURE__ */ new Map();
      this._initEvent();
    }
    _initEvent() {
      document.addEventListener("keydown", (e) => {
        if ((e.metaKey === true || e.ctrlKey === true) && e.key === "c") {
          this.trigger("keyboardCopy", void 0);
        } else if ((e.metaKey === true || e.ctrlKey === true) && e.key === "v") {
          this.trigger("keyboardPaste", void 0);
        } else if ((e.metaKey === true || e.ctrlKey === true) && e.key === "x") {
          this.trigger("keyboardCut", void 0);
        } else if ((e.metaKey === true || e.ctrlKey === true) && e.key === "z") {
          this.trigger("keyboardUndo", void 0);
        } else if (e.key === "Backspace") {
          this.trigger("keyboardDelete", void 0);
        } else if (e.key === "ArrowUp") {
          this.trigger("keyboardArrowUp", void 0);
        } else if (e.key === "ArrowDown") {
          this.trigger("keyboardArrowDown", void 0);
        } else if (e.key === "ArrowLeft") {
          this.trigger("keyboardArrowLeft", void 0);
        } else if (e.key === "ArrowRight") {
          this.trigger("keyboardArrowRight", void 0);
        }
      });
    }
    on(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey);
        callbacks == null ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
      } else {
        this._listeners.set(eventKey, [callback]);
      }
      return this;
    }
    off(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        const callbacks = this._listeners.get(eventKey);
        if (Array.isArray(callbacks)) {
          for (let i = 0; i < (callbacks == null ? void 0 : callbacks.length); i++) {
            if (callbacks[i] === callback) {
              callbacks.splice(i, 1);
              break;
            }
          }
        }
        this._listeners.set(eventKey, callbacks || []);
      }
      return this;
    }
    trigger(eventKey, arg) {
      const callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach((cb) => {
          cb(arg);
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
  function undo(idraw) {
    const doRecords = idraw.getTempData().get("doRecords");
    const unDoRecords = idraw.getTempData().get("unDoRecords");
    if (!(doRecords.length > 1)) {
      return {
        doRecordCount: doRecords.length,
        data: null
      };
    }
    const popRecord = doRecords.pop();
    if (popRecord) {
      unDoRecords.push(popRecord);
    }
    const record = doRecords[doRecords.length - 1];
    if (record == null ? void 0 : record.data) {
      idraw.setData(record.data);
    }
    idraw.getTempData().set("doRecords", doRecords);
    idraw.getTempData().set("unDoRecords", unDoRecords);
    return {
      doRecordCount: doRecords.length,
      data: (record == null ? void 0 : record.data) || null
    };
  }
  function redo(idraw) {
    const unDoRecords = idraw.getTempData().get("unDoRecords");
    if (!(unDoRecords.length > 0)) {
      return {
        undoRecordCount: unDoRecords.length,
        data: null
      };
    }
    const record = unDoRecords.pop();
    if (record == null ? void 0 : record.data) {
      idraw.setData(record.data);
    }
    idraw.getTempData().set("unDoRecords", unDoRecords);
    return {
      undoRecordCount: unDoRecords.length,
      data: (record == null ? void 0 : record.data) || null
    };
  }
  async function exportDataURL(idraw, type, quality) {
    if (idraw.getTempData().get("isDownloading") === true) {
      return Promise.reject("Busy!");
    }
    idraw.getTempData().set("isDownloading", true);
    return new Promise((resolve, reject) => {
      let dataURL = "";
      function listenRenderFrameComplete() {
        idraw.off("drawFrameComplete", listenRenderFrameComplete);
        idraw.getTempData().set("isDownloading", false);
        const ctx = idraw.$getOriginContext2D();
        const canvas = ctx.canvas;
        dataURL = canvas.toDataURL(type, quality);
        resolve(dataURL);
      }
      try {
        idraw.on("drawFrameComplete", listenRenderFrameComplete);
        idraw.clearOperation();
      } catch (err) {
        reject(err);
      }
    });
  }
  function toDataURL(idraw, type, quality) {
    const ctx = idraw.$getOriginContext2D();
    const canvas = ctx.canvas;
    const dataURL = canvas.toDataURL(type, quality);
    return dataURL;
  }
  function copyElements(idraw) {
    if (idraw.getTempData().get("isFocus") !== true) {
      return;
    }
    const elems = deepClone(idraw.getSelectedElements());
    idraw.getTempData().set("clipboardElements", elems);
  }
  function pasteElements(idraw) {
    if (idraw.getTempData().get("isFocus") !== true) {
      return;
    }
    const elems = idraw.getTempData().get("clipboardElements");
    const moveRate = 0.1;
    elems.forEach((elem) => {
      elem.x += elem.w * moveRate;
      elem.y += elem.w * moveRate;
      idraw.addElement(elem);
    });
    idraw.getTempData().set("clipboardElements", []);
  }
  function cutElements(idraw) {
    if (idraw.getTempData().get("isFocus") !== true) {
      return;
    }
    const elems = deepClone(idraw.getSelectedElements());
    elems.forEach((elem) => {
      idraw.deleteElement(elem.uuid);
    });
    idraw.getTempData().set("clipboardElements", elems);
  }
  function deleteElements(idraw) {
    if (idraw.getTempData().get("isFocus") !== true) {
      return;
    }
    const elems = deepClone(idraw.getSelectedElements());
    elems.forEach((elem) => {
      idraw.deleteElement(elem.uuid);
    });
  }
  const keyArrowMoveDistance = 4;
  function keyArrowUp(idraw) {
    const elems = deepClone(idraw.getSelectedElements());
    if (elems.length > 0) {
      elems.forEach((elem) => {
        elem.y -= keyArrowMoveDistance;
        idraw.updateElement(elem);
      });
    } else {
      const { scrollTop } = idraw.getScreenTransform();
      idraw.scrollTop(scrollTop - keyArrowMoveDistance);
    }
  }
  function keyArrowDown(idraw) {
    const elems = deepClone(idraw.getSelectedElements());
    if (elems.length > 0) {
      elems.forEach((elem) => {
        elem.y += keyArrowMoveDistance;
        idraw.updateElement(elem);
      });
    } else {
      const { scrollTop } = idraw.getScreenTransform();
      idraw.scrollTop(scrollTop + keyArrowMoveDistance);
    }
  }
  function keyArrowLeft(idraw) {
    const elems = deepClone(idraw.getSelectedElements());
    if (elems.length > 0) {
      elems.forEach((elem) => {
        elem.x -= keyArrowMoveDistance;
        idraw.updateElement(elem);
      });
    } else {
      const { scrollLeft } = idraw.getScreenTransform();
      idraw.scrollLeft(scrollLeft - keyArrowMoveDistance);
    }
  }
  function keyArrowRight(idraw) {
    const elems = deepClone(idraw.getSelectedElements());
    if (elems.length > 0) {
      elems.forEach((elem) => {
        elem.x += keyArrowMoveDistance;
        idraw.updateElement(elem);
      });
    } else {
      const { scrollLeft } = idraw.getScreenTransform();
      idraw.scrollLeft(scrollLeft + keyArrowMoveDistance);
    }
  }
  function keyUndo(idraw) {
    idraw.undo();
  }
  class iDraw2 extends Core {
    // static version = version;
    constructor(mount, opts, config) {
      super(
        mount,
        {
          width: opts.width || defaultOptions.width,
          height: opts.height || defaultOptions.height,
          contextWidth: opts.contextWidth || defaultOptions.contextWidth,
          contextHeight: opts.contextHeight || defaultOptions.contextHeight,
          devicePixelRatio: opts.devicePixelRatio || defaultOptions.devicePixelRatio,
          onlyRender: opts.onlyRender || defaultOptions.onlyRender
        },
        config || {}
      );
      this._hasInited = false;
      this._tempData = new TempData();
      this._keyboardWatcher = new KeyboardWatcher();
      this._opts = this._createOpts(opts);
      this._initEvent();
    }
    undo() {
      return undo(this);
    }
    redo() {
      return redo(this);
    }
    toDataURL(type, quality) {
      return toDataURL(this, type, quality);
    }
    getTempData() {
      return this._tempData;
    }
    async exportDataURL(type, quality) {
      return exportDataURL(this, type, quality);
    }
    _initEvent() {
      if (this._hasInited === true) {
        return;
      }
      this.on("changeData", (data) => {
        this._pushRecord(data);
      });
      this.on("mouseLeaveScreen", () => {
        this._tempData.set("isFocus", false);
      });
      this.on("mouseOverScreen", () => {
        this._tempData.set("isFocus", true);
      });
      if (this._opts.disableKeyboard === false) {
        this._keyboardWatcher.on("keyboardCopy", () => copyElements(this)).on("keyboardPaste", () => pasteElements(this)).on("keyboardCut", () => cutElements(this)).on("keyboardDelete", () => deleteElements(this)).on("keyboardArrowUp", () => keyArrowUp(this)).on("keyboardArrowDown", () => keyArrowDown(this)).on("keyboardArrowLeft", () => keyArrowLeft(this)).on("keyboardArrowRight", () => keyArrowRight(this)).on("keyboardUndo", () => keyUndo(this));
      }
      this._hasInited = true;
    }
    _pushRecord(data) {
      const doRecords = this._tempData.get("doRecords");
      if (doRecords.length >= this._opts.maxRecords) {
        doRecords.shift();
      }
      doRecords.push({ data, time: Date.now() });
      this._tempData.set("doRecords", doRecords);
      this._tempData.set("unDoRecords", []);
    }
    _createOpts(opts) {
      return { ...{}, ...defaultOptions, ...opts };
    }
  }
  return iDraw2;
}();
