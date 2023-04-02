var iDraw = function() {
  "use strict";
  var __assign$4 = function() {
    __assign$4 = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign$4.apply(this, arguments);
  };
  var __assign$1$1 = function() {
    __assign$1$1 = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign$1$1.apply(this, arguments);
  };
  function compose$2(middleware) {
    return function(context, next) {
      return dispatch(0);
      function dispatch(i) {
        var fn = middleware[i];
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
  function delay$2(time) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, time);
    });
  }
  function throttle$1$1(fn, timeout) {
    var timer = -1;
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (timer > 0) {
        return;
      }
      timer = setTimeout(function() {
        fn.apply(void 0, args);
        timer = -1;
      }, timeout);
    };
  }
  function downloadImageFromCanvas$2(canvas, opts) {
    var filename = opts.filename, _a2 = opts.type, type = _a2 === void 0 ? "image/jpeg" : _a2;
    var stream = canvas.toDataURL(type);
    var downloadLink = document.createElement("a");
    downloadLink.href = stream;
    downloadLink.download = filename;
    var downloadClickEvent = document.createEvent("MouseEvents");
    downloadClickEvent.initEvent("click", true, false);
    downloadLink.dispatchEvent(downloadClickEvent);
  }
  function toColorHexNum$2(color2) {
    return parseInt(color2.replace(/^\#/, "0x"));
  }
  function toColorHexStr$2(color2) {
    return "#" + color2.toString(16);
  }
  function isColorStr$2(color2) {
    return typeof color2 === "string" && /^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color2);
  }
  function createUUID$2() {
    function str4() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return "".concat(str4()).concat(str4(), "-").concat(str4(), "-").concat(str4(), "-").concat(str4(), "-").concat(str4()).concat(str4()).concat(str4());
  }
  function deepClone$2(target) {
    function _clone(t) {
      var type = is$1$2(t);
      if (["Null", "Number", "String", "Boolean", "Undefined"].indexOf(type) >= 0) {
        return t;
      } else if (type === "Array") {
        var arr_1 = [];
        t.forEach(function(item) {
          arr_1.push(_clone(item));
        });
        return arr_1;
      } else if (type === "Object") {
        var obj_1 = {};
        var keys = Object.keys(t);
        keys.forEach(function(key) {
          obj_1[key] = _clone(t[key]);
        });
        return obj_1;
      }
    }
    return _clone(target);
  }
  function is$1$2(data) {
    return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, "").split(" ")[1];
  }
  function parsePrototype$2(data) {
    var typeStr = Object.prototype.toString.call(data) || "";
    var result = typeStr.replace(/(\[object|\])/ig, "").trim();
    return result;
  }
  var istype$2 = {
    type: function(data, lowerCase) {
      var result = parsePrototype$2(data);
      return lowerCase === true ? result.toLocaleLowerCase() : result;
    },
    array: function(data) {
      return parsePrototype$2(data) === "Array";
    },
    json: function(data) {
      return parsePrototype$2(data) === "Object";
    },
    function: function(data) {
      return parsePrototype$2(data) === "Function";
    },
    asyncFunction: function(data) {
      return parsePrototype$2(data) === "AsyncFunction";
    },
    string: function(data) {
      return parsePrototype$2(data) === "String";
    },
    number: function(data) {
      return parsePrototype$2(data) === "Number";
    },
    undefined: function(data) {
      return parsePrototype$2(data) === "Undefined";
    },
    null: function(data) {
      return parsePrototype$2(data) === "Null";
    },
    promise: function(data) {
      return parsePrototype$2(data) === "Promise";
    }
  };
  var __assign$3 = function() {
    __assign$3 = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign$3.apply(this, arguments);
  };
  function __awaiter$3(thisArg, _arguments, P, generator) {
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
  }
  function __generator$3(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y2, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y2 && (t = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t = y2["return"]) && t.call(y2), 0) : y2.next) && !(t = t.call(y2, op[1])).done)
            return t;
          if (y2 = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y2 = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function parseHTMLToDataURL$2(html2, opts) {
    var width = opts.width, height = opts.height;
    return new Promise(function(resolve, reject) {
      var _svg = '\n    <svg xmlns="http://www.w3.org/2000/svg" width="'.concat(width || "", '" height = "').concat(height || "", '">\n      <foreignObject width="100%" height="100%">\n        <div xmlns = "http://www.w3.org/1999/xhtml">\n          ').concat(html2, "\n        </div>\n      </foreignObject>\n    </svg>\n    ");
      var blob = new Blob([_svg], { type: "image/svg+xml;charset=utf-8" });
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        var _a2;
        var base64 = (_a2 = event === null || event === void 0 ? void 0 : event.target) === null || _a2 === void 0 ? void 0 : _a2.result;
        resolve(base64);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }
  function parseSVGToDataURL$2(svg2) {
    return new Promise(function(resolve, reject) {
      var _svg = svg2;
      var blob = new Blob([_svg], { type: "image/svg+xml;charset=utf-8" });
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        var _a2;
        var base64 = (_a2 = event === null || event === void 0 ? void 0 : event.target) === null || _a2 === void 0 ? void 0 : _a2.result;
        resolve(base64);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }
  var Image$2 = window.Image;
  function loadImage$2(src) {
    return new Promise(function(resolve, reject) {
      var img = new Image$2();
      img.onload = function() {
        resolve(img);
      };
      img.onabort = reject;
      img.onerror = reject;
      img.src = src;
    });
  }
  function loadSVG$2(svg2) {
    return __awaiter$3(this, void 0, void 0, function() {
      var dataURL, image;
      return __generator$3(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            return [4, parseSVGToDataURL$2(svg2)];
          case 1:
            dataURL = _a2.sent();
            return [4, loadImage$2(dataURL)];
          case 2:
            image = _a2.sent();
            return [2, image];
        }
      });
    });
  }
  function loadHTML$2(html2, opts) {
    return __awaiter$3(this, void 0, void 0, function() {
      var dataURL, image;
      return __generator$3(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            return [4, parseHTMLToDataURL$2(html2, opts)];
          case 1:
            dataURL = _a2.sent();
            return [4, loadImage$2(dataURL)];
          case 2:
            image = _a2.sent();
            return [2, image];
        }
      });
    });
  }
  var Context$1$1 = function() {
    function Context2(ctx, opts) {
      this._opts = opts;
      this._ctx = ctx;
      this._transform = {
        scale: 1,
        scrollX: 0,
        scrollY: 0
      };
    }
    Context2.prototype.getContext = function() {
      return this._ctx;
    };
    Context2.prototype.resetSize = function(opts) {
      this._opts = __assign$3(__assign$3({}, this._opts), opts);
    };
    Context2.prototype.calcDeviceNum = function(num) {
      return num * this._opts.devicePixelRatio;
    };
    Context2.prototype.calcScreenNum = function(num) {
      return num / this._opts.devicePixelRatio;
    };
    Context2.prototype.getSize = function() {
      return {
        width: this._opts.width,
        height: this._opts.height,
        contextWidth: this._opts.contextWidth,
        contextHeight: this._opts.contextHeight,
        devicePixelRatio: this._opts.devicePixelRatio
      };
    };
    Context2.prototype.setTransform = function(config) {
      this._transform = __assign$3(__assign$3({}, this._transform), config);
    };
    Context2.prototype.getTransform = function() {
      return {
        scale: this._transform.scale,
        scrollX: this._transform.scrollX,
        scrollY: this._transform.scrollY
      };
    };
    Context2.prototype.setFillStyle = function(color2) {
      this._ctx.fillStyle = color2;
    };
    Context2.prototype.fill = function(fillRule) {
      return this._ctx.fill(fillRule || "nonzero");
    };
    Context2.prototype.arc = function(x2, y2, radius, startAngle, endAngle, anticlockwise) {
      return this._ctx.arc(this._doSize(x2), this._doSize(y2), this._doSize(radius), startAngle, endAngle, anticlockwise);
    };
    Context2.prototype.rect = function(x2, y2, w2, h2) {
      return this._ctx.rect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.fillRect = function(x2, y2, w2, h2) {
      return this._ctx.fillRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.clearRect = function(x2, y2, w2, h2) {
      return this._ctx.clearRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.beginPath = function() {
      return this._ctx.beginPath();
    };
    Context2.prototype.closePath = function() {
      return this._ctx.closePath();
    };
    Context2.prototype.lineTo = function(x2, y2) {
      return this._ctx.lineTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.moveTo = function(x2, y2) {
      return this._ctx.moveTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.arcTo = function(x1, y1, x2, y2, radius) {
      return this._ctx.arcTo(this._doSize(x1), this._doSize(y1), this._doSize(x2), this._doSize(y2), this._doSize(radius));
    };
    Context2.prototype.setLineWidth = function(w2) {
      return this._ctx.lineWidth = this._doSize(w2);
    };
    Context2.prototype.setLineDash = function(nums) {
      var _this = this;
      return this._ctx.setLineDash(nums.map(function(n) {
        return _this._doSize(n);
      }));
    };
    Context2.prototype.isPointInPath = function(x2, y2) {
      return this._ctx.isPointInPath(this._doX(x2), this._doY(y2));
    };
    Context2.prototype.isPointInPathWithoutScroll = function(x2, y2) {
      return this._ctx.isPointInPath(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.setStrokeStyle = function(color2) {
      this._ctx.strokeStyle = color2;
    };
    Context2.prototype.stroke = function() {
      return this._ctx.stroke();
    };
    Context2.prototype.translate = function(x2, y2) {
      return this._ctx.translate(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.rotate = function(angle2) {
      return this._ctx.rotate(angle2);
    };
    Context2.prototype.drawImage = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var image = args[0];
      var sx = args[1];
      var sy = args[2];
      var sw = args[3];
      var sh = args[4];
      var dx = args[args.length - 4];
      var dy = args[args.length - 3];
      var dw = args[args.length - 2];
      var dh = args[args.length - 1];
      if (args.length === 9) {
        return this._ctx.drawImage(image, this._doSize(sx), this._doSize(sy), this._doSize(sw), this._doSize(sh), this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      } else {
        return this._ctx.drawImage(image, this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      }
    };
    Context2.prototype.createPattern = function(image, repetition) {
      return this._ctx.createPattern(image, repetition);
    };
    Context2.prototype.measureText = function(text2) {
      return this._ctx.measureText(text2);
    };
    Context2.prototype.setTextAlign = function(align) {
      this._ctx.textAlign = align;
    };
    Context2.prototype.fillText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.strokeText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.setFont = function(opts) {
      var strList = [];
      if (opts.fontWeight === "bold") {
        strList.push("".concat(opts.fontWeight));
      }
      strList.push("".concat(this._doSize(opts.fontSize || 12), "px"));
      strList.push("".concat(opts.fontFamily || "sans-serif"));
      this._ctx.font = "".concat(strList.join(" "));
    };
    Context2.prototype.setTextBaseline = function(baseline) {
      this._ctx.textBaseline = baseline;
    };
    Context2.prototype.setGlobalAlpha = function(alpha) {
      this._ctx.globalAlpha = alpha;
    };
    Context2.prototype.save = function() {
      this._ctx.save();
    };
    Context2.prototype.restore = function() {
      this._ctx.restore();
    };
    Context2.prototype.scale = function(ratioX, ratioY) {
      this._ctx.scale(ratioX, ratioY);
    };
    Context2.prototype.setShadowColor = function(color2) {
      this._ctx.shadowColor = color2;
    };
    Context2.prototype.setShadowOffsetX = function(offsetX) {
      this._ctx.shadowOffsetX = this._doSize(offsetX);
    };
    Context2.prototype.setShadowOffsetY = function(offsetY) {
      this._ctx.shadowOffsetY = this._doSize(offsetY);
    };
    Context2.prototype.setShadowBlur = function(blur) {
      this._ctx.shadowBlur = this._doSize(blur);
    };
    Context2.prototype.ellipse = function(x2, y2, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
      this._ctx.ellipse(this._doSize(x2), this._doSize(y2), this._doSize(radiusX), this._doSize(radiusY), rotation, startAngle, endAngle, counterclockwise);
    };
    Context2.prototype._doSize = function(num) {
      return this._opts.devicePixelRatio * num;
    };
    Context2.prototype._doX = function(x2) {
      var _a2 = this._transform, scale = _a2.scale, scrollX = _a2.scrollX;
      var _x = (x2 - scrollX) / scale;
      return this._doSize(_x);
    };
    Context2.prototype._doY = function(y2) {
      var _a2 = this._transform, scale = _a2.scale, scrollY = _a2.scrollY;
      var _y = (y2 - scrollY) / scale;
      return this._doSize(_y);
    };
    return Context2;
  }();
  function number$3(value) {
    return typeof value === "number" && (value > 0 || value <= 0);
  }
  function x$3(value) {
    return number$3(value);
  }
  function y$3(value) {
    return number$3(value);
  }
  function w$3(value) {
    return typeof value === "number" && value >= 0;
  }
  function h$3(value) {
    return typeof value === "number" && value >= 0;
  }
  function angle$3(value) {
    return typeof value === "number" && value >= -360 && value <= 360;
  }
  function borderWidth$3(value) {
    return w$3(value);
  }
  function borderRadius$3(value) {
    return number$3(value) && value >= 0;
  }
  function color$3(value) {
    return isColorStr$2(value);
  }
  function imageURL$3(value) {
    return typeof value === "string" && /^(http:\/\/|https:\/\/|\.\/|\/)/.test("".concat(value));
  }
  function imageBase64$3(value) {
    return typeof value === "string" && /^(data:image\/)/.test("".concat(value));
  }
  function imageSrc$3(value) {
    return imageBase64$3(value) || imageURL$3(value);
  }
  function svg$3(value) {
    return typeof value === "string" && /^(<svg[\s]{1,}|<svg>)/i.test("".concat(value).trim()) && /<\/[\s]{0,}svg>$/i.test("".concat(value).trim());
  }
  function html$3(value) {
    var result = false;
    if (typeof value === "string") {
      var div = document.createElement("div");
      div.innerHTML = value;
      if (div.children.length > 0) {
        result = true;
      }
      div = null;
    }
    return result;
  }
  function text$3(value) {
    return typeof value === "string";
  }
  function fontSize$3(value) {
    return number$3(value) && value > 0;
  }
  function lineHeight$3(value) {
    return number$3(value) && value > 0;
  }
  function strokeWidth$3(value) {
    return number$3(value) && value > 0;
  }
  function textAlign$3(value) {
    return ["center", "left", "right"].includes(value);
  }
  function fontFamily$3(value) {
    return typeof value === "string" && value.length > 0;
  }
  function fontWeight$3(value) {
    return ["bold"].includes(value);
  }
  var is$4 = {
    x: x$3,
    y: y$3,
    w: w$3,
    h: h$3,
    angle: angle$3,
    number: number$3,
    borderWidth: borderWidth$3,
    borderRadius: borderRadius$3,
    color: color$3,
    imageSrc: imageSrc$3,
    imageURL: imageURL$3,
    imageBase64: imageBase64$3,
    svg: svg$3,
    html: html$3,
    text: text$3,
    fontSize: fontSize$3,
    lineHeight: lineHeight$3,
    textAlign: textAlign$3,
    fontFamily: fontFamily$3,
    fontWeight: fontWeight$3,
    strokeWidth: strokeWidth$3
  };
  function attrs$3(attrs2) {
    var x2 = attrs2.x, y2 = attrs2.y, w2 = attrs2.w, h2 = attrs2.h, angle2 = attrs2.angle;
    if (!(is$4.x(x2) && is$4.y(y2) && is$4.w(w2) && is$4.h(h2) && is$4.angle(angle2))) {
      return false;
    }
    if (!(angle2 >= -360 && angle2 <= 360)) {
      return false;
    }
    return true;
  }
  function box$3(desc) {
    if (desc === void 0) {
      desc = {};
    }
    var borderColor = desc.borderColor, borderRadius2 = desc.borderRadius, borderWidth2 = desc.borderWidth;
    if (desc.hasOwnProperty("borderColor") && !is$4.color(borderColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderRadius") && !is$4.number(borderRadius2)) {
      return false;
    }
    if (desc.hasOwnProperty("borderWidth") && !is$4.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function rectDesc$3(desc) {
    var bgColor = desc.bgColor;
    if (desc.hasOwnProperty("bgColor") && !is$4.color(bgColor)) {
      return false;
    }
    if (!box$3(desc)) {
      return false;
    }
    return true;
  }
  function circleDesc$3(desc) {
    var bgColor = desc.bgColor, borderColor = desc.borderColor, borderWidth2 = desc.borderWidth;
    if (desc.hasOwnProperty("bgColor") && !is$4.color(bgColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderColor") && !is$4.color(borderColor)) {
      return false;
    }
    if (desc.hasOwnProperty("borderWidth") && !is$4.number(borderWidth2)) {
      return false;
    }
    return true;
  }
  function imageDesc$3(desc) {
    var src = desc.src;
    if (!is$4.imageSrc(src)) {
      return false;
    }
    return true;
  }
  function svgDesc$3(desc) {
    var svg2 = desc.svg;
    if (!is$4.svg(svg2)) {
      return false;
    }
    return true;
  }
  function htmlDesc$3(desc) {
    var html2 = desc.html;
    if (!is$4.html(html2)) {
      return false;
    }
    return true;
  }
  function textDesc$3(desc) {
    var text2 = desc.text, color2 = desc.color, fontSize2 = desc.fontSize, lineHeight2 = desc.lineHeight, fontFamily2 = desc.fontFamily, textAlign2 = desc.textAlign, fontWeight2 = desc.fontWeight, bgColor = desc.bgColor, strokeWidth2 = desc.strokeWidth, strokeColor = desc.strokeColor;
    if (!is$4.text(text2)) {
      return false;
    }
    if (!is$4.color(color2)) {
      return false;
    }
    if (!is$4.fontSize(fontSize2)) {
      return false;
    }
    if (desc.hasOwnProperty("bgColor") && !is$4.color(bgColor)) {
      return false;
    }
    if (desc.hasOwnProperty("fontWeight") && !is$4.fontWeight(fontWeight2)) {
      return false;
    }
    if (desc.hasOwnProperty("lineHeight") && !is$4.lineHeight(lineHeight2)) {
      return false;
    }
    if (desc.hasOwnProperty("fontFamily") && !is$4.fontFamily(fontFamily2)) {
      return false;
    }
    if (desc.hasOwnProperty("textAlign") && !is$4.textAlign(textAlign2)) {
      return false;
    }
    if (desc.hasOwnProperty("strokeWidth") && !is$4.strokeWidth(strokeWidth2)) {
      return false;
    }
    if (desc.hasOwnProperty("strokeColor") && !is$4.color(strokeColor)) {
      return false;
    }
    if (!box$3(desc)) {
      return false;
    }
    return true;
  }
  var check$3 = {
    attrs: attrs$3,
    textDesc: textDesc$3,
    rectDesc: rectDesc$3,
    circleDesc: circleDesc$3,
    imageDesc: imageDesc$3,
    svgDesc: svgDesc$3,
    htmlDesc: htmlDesc$3
  };
  var default_1$1 = Object.freeze({
    __proto__: null,
    is: is$4,
    check: check$3,
    delay: delay$2,
    compose: compose$2,
    throttle: throttle$1$1,
    loadImage: loadImage$2,
    loadSVG: loadSVG$2,
    loadHTML: loadHTML$2,
    downloadImageFromCanvas: downloadImageFromCanvas$2,
    toColorHexStr: toColorHexStr$2,
    toColorHexNum: toColorHexNum$2,
    isColorStr: isColorStr$2,
    createUUID: createUUID$2,
    istype: istype$2,
    deepClone: deepClone$2,
    Context: Context$1$1
  });
  var BoardEvent = function() {
    function BoardEvent2() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    BoardEvent2.prototype.on = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
      } else {
        this._listeners.set(eventKey, [callback]);
      }
    };
    BoardEvent2.prototype.off = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        if (Array.isArray(callbacks)) {
          for (var i = 0; i < (callbacks === null || callbacks === void 0 ? void 0 : callbacks.length); i++) {
            if (callbacks[i] === callback) {
              callbacks.splice(i, 1);
              break;
            }
          }
        }
        this._listeners.set(eventKey, callbacks || []);
      }
    };
    BoardEvent2.prototype.trigger = function(eventKey, arg) {
      var callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach(function(cb) {
          cb(arg);
        });
        return true;
      } else {
        return false;
      }
    };
    BoardEvent2.prototype.has = function(name) {
      if (this._listeners.has(name)) {
        var list = this._listeners.get(name);
        if (Array.isArray(list) && list.length > 0) {
          return true;
        }
      }
      return false;
    };
    return BoardEvent2;
  }();
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
  var TempData$2 = function() {
    function TempData2() {
      this._temp = createTempData();
    }
    TempData2.prototype.set = function(name, value) {
      this._temp[name] = value;
    };
    TempData2.prototype.get = function(name) {
      return this._temp[name];
    };
    TempData2.prototype.clear = function() {
      this._temp = createTempData();
    };
    return TempData2;
  }();
  var ScreenWatcher = function() {
    function ScreenWatcher2(canvas, ctx) {
      this._isMoving = false;
      this._temp = new TempData$2();
      this._container = window;
      this._canvas = canvas;
      this._isMoving = false;
      this._initEvent();
      this._event = new BoardEvent();
    }
    ScreenWatcher2.prototype.setStatusMap = function(statusMap) {
      this._temp.set("statusMap", statusMap);
    };
    ScreenWatcher2.prototype.on = function(name, callback) {
      this._event.on(name, callback);
    };
    ScreenWatcher2.prototype.off = function(name, callback) {
      this._event.off(name, callback);
    };
    ScreenWatcher2.prototype._initEvent = function() {
      var canvas = this._canvas;
      var container = this._container;
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
    };
    ScreenWatcher2.prototype._initParentEvent = function() {
      try {
        var target = window;
        var targetOrigin = target.origin;
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
    };
    ScreenWatcher2.prototype._listenHover = function(e) {
      e.preventDefault();
      var p = this._getPosition(e);
      if (this._isVaildPoint(p)) {
        if (this._event.has("hover")) {
          this._event.trigger("hover", p);
        }
      }
      this._isMoving = true;
    };
    ScreenWatcher2.prototype._listenMoveStart = function(e) {
      e.preventDefault();
      var p = this._getPosition(e);
      if (this._isVaildPoint(p)) {
        if (this._event.has("point")) {
          this._event.trigger("point", p);
        }
        if (this._event.has("moveStart")) {
          this._event.trigger("moveStart", p);
        }
      }
      this._isMoving = true;
    };
    ScreenWatcher2.prototype._listenMove = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this._event.has("move") && this._isMoving === true) {
        var p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("move", p);
        }
      }
    };
    ScreenWatcher2.prototype._listenMoveEnd = function(e) {
      e.preventDefault();
      if (this._event.has("moveEnd")) {
        var p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("moveEnd", p);
        }
      }
      this._isMoving = false;
    };
    ScreenWatcher2.prototype._listSameOriginParentWindow = function() {
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
    };
    ScreenWatcher2.prototype._listenCanvasMoveStart = function() {
      if (this._temp.get("isHoverCanvas")) {
        this._temp.set("isDragCanvas", true);
      }
    };
    ScreenWatcher2.prototype._listenCanvasMoveEnd = function() {
      this._temp.set("isDragCanvas", false);
    };
    ScreenWatcher2.prototype._listenCanvasMoveOver = function() {
      this._temp.set("isHoverCanvas", true);
    };
    ScreenWatcher2.prototype._listenCanvasMoveLeave = function() {
      this._temp.set("isHoverCanvas", false);
      if (this._event.has("leave")) {
        this._event.trigger("leave", void 0);
      }
    };
    ScreenWatcher2.prototype._listenWindowMove = function(e) {
      if (this._temp.get("isDragCanvas") !== true) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (this._event.has("move") && this._isMoving === true) {
        var p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("move", p);
        }
      }
    };
    ScreenWatcher2.prototype._listenWindowMoveEnd = function(e) {
      if (!this._temp.get("isDragCanvas") === true) {
        return;
      }
      e.preventDefault();
      if (this._event.has("moveEnd")) {
        var p = this._getPosition(e);
        if (this._isVaildPoint(p)) {
          this._event.trigger("moveEnd", p);
        }
      }
      this._temp.set("isDragCanvas", false);
      this._isMoving = false;
    };
    ScreenWatcher2.prototype._listenCanvasWheel = function(e) {
      if (this._event.has("wheelX") && (e.deltaX > 0 || e.deltaX < 0)) {
        this._event.trigger("wheelX", e.deltaX);
      }
      if (this._event.has("wheelY") && (e.deltaY > 0 || e.deltaY < 0)) {
        this._event.trigger("wheelY", e.deltaY);
      }
      var _a2 = this._temp.get("statusMap"), canScrollYNext = _a2.canScrollYNext, canScrollYPrev = _a2.canScrollYPrev;
      if (e.deltaX > 0 && e.deltaX < 0) {
        e.preventDefault();
      } else if (e.deltaY > 0 && canScrollYNext === true) {
        e.preventDefault();
      } else if (e.deltaY < 0 && canScrollYPrev === true) {
        e.preventDefault();
      }
    };
    ScreenWatcher2.prototype._listenCanvasClick = function(e) {
      e.preventDefault();
      var maxLimitTime = 500;
      var p = this._getPosition(e);
      var t = Date.now();
      if (this._isVaildPoint(p)) {
        var preClickPoint = this._temp.get("prevClickPoint");
        if (preClickPoint && t - preClickPoint.t <= maxLimitTime && Math.abs(preClickPoint.x - p.x) <= 5 && Math.abs(preClickPoint.y - p.y) <= 5) {
          if (this._event.has("doubleClick")) {
            this._event.trigger("doubleClick", { x: p.x, y: p.y });
          }
        } else {
          this._temp.set("prevClickPoint", { x: p.x, y: p.y, t });
        }
      }
    };
    ScreenWatcher2.prototype._getPosition = function(e) {
      var canvas = this._canvas;
      var x2 = 0;
      var y2 = 0;
      if (e && e.touches && e.touches.length > 0) {
        var touch = e.touches[0];
        if (touch) {
          x2 = touch.clientX;
          y2 = touch.clientY;
        }
      } else {
        x2 = e.clientX;
        y2 = e.clientY;
      }
      var p = {
        x: x2 - canvas.getBoundingClientRect().left,
        y: y2 - canvas.getBoundingClientRect().top,
        t: Date.now()
      };
      return p;
    };
    ScreenWatcher2.prototype._isVaildPoint = function(p) {
      return isAvailableNum(p.x) && isAvailableNum(p.y);
    };
    return ScreenWatcher2;
  }();
  function isAvailableNum(num) {
    return num > 0 || num < 0 || num === 0;
  }
  function setStyle(dom, style) {
    var originStyle = getStyle(dom);
    var _style = __assign$1$1(__assign$1$1({}, originStyle), style);
    var keys = Object.keys(_style);
    var styleStr = "";
    keys.forEach(function(key) {
      styleStr += "".concat(key, ":").concat(_style[key] || "", ";");
    });
    dom.setAttribute("style", styleStr);
  }
  function getStyle(dom) {
    var styleObj = {};
    var style = dom.getAttribute("style") || "";
    var styleList = style.split(";");
    styleList.forEach(function(item) {
      var dataList = item.split(":");
      if (dataList[0] && typeof dataList[0] === "string") {
        styleObj[dataList[0]] = dataList[1] || "";
      }
    });
    return styleObj;
  }
  var defaultScrollConfig = {
    lineWidth: 12,
    color: "#a0a0a0"
  };
  var Scroller = function() {
    function Scroller2(ctx, opts) {
      this._displayCtx = ctx;
      this._opts = this._getOpts(opts);
    }
    Scroller2.prototype.draw = function(position) {
      var _a2 = this._opts, width = _a2.width, height = _a2.height;
      var wrapper = this.calc(position);
      var ctx = this._displayCtx;
      if (wrapper.xSize > 0) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = wrapper.color;
        ctx.fillRect(0, this._doSize(height - wrapper.lineSize), this._doSize(width), this._doSize(wrapper.lineSize));
        ctx.globalAlpha = 1;
        drawBox$1(ctx, {
          x: this._doSize(wrapper.translateX),
          y: this._doSize(height - wrapper.lineSize),
          w: this._doSize(wrapper.xSize),
          h: this._doSize(wrapper.lineSize),
          r: this._doSize(wrapper.lineSize / 2),
          color: wrapper.color
        });
      }
      if (wrapper.ySize > 0) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = wrapper.color;
        ctx.fillRect(this._doSize(width - wrapper.lineSize), 0, this._doSize(wrapper.lineSize), this._doSize(height));
        ctx.globalAlpha = 1;
        drawBox$1(ctx, {
          x: this._doSize(width - wrapper.lineSize),
          y: this._doSize(wrapper.translateY),
          w: this._doSize(wrapper.lineSize),
          h: this._doSize(wrapper.ySize),
          r: this._doSize(wrapper.lineSize / 2),
          color: wrapper.color
        });
      }
      ctx.globalAlpha = 1;
    };
    Scroller2.prototype.resetSize = function(opts) {
      this._opts = __assign$1$1(__assign$1$1({}, this._opts), opts);
    };
    Scroller2.prototype.isPointAtScrollY = function(p) {
      var _a2 = this._opts, width = _a2.width, height = _a2.height, scrollConfig = _a2.scrollConfig;
      var ctx = this._displayCtx;
      ctx.beginPath();
      ctx.rect(this._doSize(width - scrollConfig.lineWidth), 0, this._doSize(scrollConfig.lineWidth), this._doSize(height));
      ctx.closePath();
      if (ctx.isPointInPath(this._doSize(p.x), this._doSize(p.y))) {
        return true;
      }
      return false;
    };
    Scroller2.prototype.isPointAtScrollX = function(p) {
      var _a2 = this._opts, width = _a2.width, height = _a2.height, scrollConfig = _a2.scrollConfig;
      var ctx = this._displayCtx;
      ctx.beginPath();
      ctx.rect(0, this._doSize(height - scrollConfig.lineWidth), this._doSize(width - scrollConfig.lineWidth), this._doSize(scrollConfig.lineWidth));
      ctx.closePath();
      if (ctx.isPointInPath(this._doSize(p.x), this._doSize(p.y))) {
        return true;
      }
      return false;
    };
    Scroller2.prototype.getLineWidth = function() {
      var lineWidth = this._opts.scrollConfig.lineWidth;
      return lineWidth;
    };
    Scroller2.prototype.calc = function(position) {
      var _a2 = this._opts, width = _a2.width, height = _a2.height, scrollConfig = _a2.scrollConfig;
      var sliderMinSize = scrollConfig.lineWidth * 2.5;
      var lineSize = scrollConfig.lineWidth;
      var xSize = 0;
      var ySize = 0;
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
      var translateX = 0;
      if (xSize > 0) {
        translateX = xSize / 2 + (width - xSize) * Math.abs(position.left) / (Math.abs(position.left) + Math.abs(position.right));
        translateX = Math.min(Math.max(0, translateX - xSize / 2), width - xSize);
      }
      var translateY = 0;
      if (ySize > 0) {
        translateY = ySize / 2 + (height - ySize) * Math.abs(position.top) / (Math.abs(position.top) + Math.abs(position.bottom));
        translateY = Math.min(Math.max(0, translateY - ySize / 2), height - ySize);
      }
      var scrollWrapper = {
        lineSize,
        xSize,
        ySize,
        translateY,
        translateX,
        color: this._opts.scrollConfig.color
      };
      return scrollWrapper;
    };
    Scroller2.prototype._doSize = function(num) {
      return num * this._opts.devicePixelRatio;
    };
    Scroller2.prototype._getOpts = function(opts) {
      var options = __assign$1$1({ scrollConfig: defaultScrollConfig }, opts);
      if (!options.scrollConfig) {
        options.scrollConfig = defaultScrollConfig;
      }
      if (!(options.scrollConfig.lineWidth > 0)) {
        options.scrollConfig.lineWidth = defaultScrollConfig.lineWidth;
      }
      options.scrollConfig.lineWidth = Math.max(options.scrollConfig.lineWidth, defaultScrollConfig.lineWidth);
      if (isColorStr$2(options.scrollConfig.color) !== true) {
        options.scrollConfig.color = options.scrollConfig.color;
      }
      return options;
    };
    return Scroller2;
  }();
  function drawBox$1(ctx, opts) {
    var x2 = opts.x, y2 = opts.y, w2 = opts.w, h2 = opts.h, color2 = opts.color;
    var r = opts.r;
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
    ctx.fillStyle = color2;
    ctx.fill();
  }
  var _opts$1$1 = Symbol("_opts");
  var _ctx$1 = Symbol("_ctx");
  var Screen = function() {
    function Screen2(ctx, opts) {
      this[_opts$1$1] = opts;
      this[_ctx$1] = ctx;
    }
    Screen2.prototype.resetSize = function(opts) {
      this[_opts$1$1] = __assign$1$1(__assign$1$1({}, this[_opts$1$1]), opts);
    };
    Screen2.prototype.calcScreen = function() {
      var scaleRatio = this[_ctx$1].getTransform().scale;
      var _a2 = this[_opts$1$1], width = _a2.width, height = _a2.height, contextWidth = _a2.contextWidth, contextHeight = _a2.contextHeight, pxRatio = _a2.devicePixelRatio;
      var canScrollXPrev = true;
      var canScrollXNext = true;
      var canScrollYPrev = true;
      var canScrollYNext = true;
      if (contextWidth * scaleRatio <= width) {
        this[_ctx$1].setTransform({
          scrollX: (width - contextWidth * scaleRatio) / 2
        });
        canScrollXPrev = false;
        canScrollXNext = false;
      }
      if (contextHeight * scaleRatio <= height) {
        this[_ctx$1].setTransform({
          scrollY: (height - contextHeight * scaleRatio) / 2
        });
        canScrollYPrev = false;
        canScrollYNext = false;
      }
      if (contextWidth * scaleRatio >= width && this[_ctx$1].getTransform().scrollX > 0) {
        this[_ctx$1].setTransform({
          scrollX: 0
        });
        canScrollXPrev = false;
      }
      if (contextHeight * scaleRatio >= height && this[_ctx$1].getTransform().scrollY > 0) {
        this[_ctx$1].setTransform({
          scrollY: 0
        });
        canScrollYPrev = false;
      }
      var _b2 = this[_ctx$1].getTransform(), _scrollX = _b2.scrollX, _scrollY = _b2.scrollY;
      if (_scrollX < 0 && Math.abs(_scrollX) > Math.abs(contextWidth * scaleRatio - width)) {
        this[_ctx$1].setTransform({
          scrollX: 0 - Math.abs(contextWidth * scaleRatio - width)
        });
        canScrollXNext = false;
      }
      if (_scrollY < 0 && Math.abs(_scrollY) > Math.abs(contextHeight * scaleRatio - height)) {
        this[_ctx$1].setTransform({
          scrollY: 0 - Math.abs(contextHeight * scaleRatio - height)
        });
        canScrollYNext = false;
      }
      var _c2 = this[_ctx$1].getTransform(), scrollX = _c2.scrollX, scrollY = _c2.scrollY;
      var size = {
        x: scrollX * scaleRatio,
        y: scrollY * scaleRatio,
        w: contextWidth * scaleRatio,
        h: contextHeight * scaleRatio
      };
      var deviceSize = {
        x: scrollX * pxRatio,
        y: scrollY * pxRatio,
        w: contextWidth * pxRatio * scaleRatio,
        h: contextHeight * pxRatio * scaleRatio
      };
      var position = {
        top: scrollY,
        bottom: height - (contextHeight * scaleRatio + scrollY),
        left: scrollX,
        right: width - (contextWidth * scaleRatio + scrollX)
      };
      return {
        size,
        position,
        deviceSize,
        width: this[_opts$1$1].width,
        height: this[_opts$1$1].height,
        devicePixelRatio: this[_opts$1$1].devicePixelRatio,
        canScrollYPrev,
        canScrollYNext,
        canScrollXPrev,
        canScrollXNext
      };
    };
    Screen2.prototype.calcScreenScroll = function(start, end, sliderSize, limitLen, moveDistance) {
      var scrollDistance = start;
      var scrollLen = limitLen - sliderSize;
      if (start <= 0 && end <= 0) {
        scrollLen = Math.abs(start) + Math.abs(end);
      }
      var unit = 1;
      if (scrollLen > 0) {
        unit = scrollLen / (limitLen - sliderSize);
      }
      scrollDistance = 0 - unit * moveDistance;
      return scrollDistance;
    };
    return Screen2;
  }();
  var _canvas = Symbol("_canvas");
  var _displayCanvas = Symbol("_displayCanvas");
  var _helperCanvas = Symbol("_helperCanvas");
  var _mount = Symbol("_mount");
  var _opts$3 = Symbol("_opts");
  var _hasRendered = Symbol("_hasRendered");
  var _ctx$2 = Symbol("_ctx");
  var _helperCtx = Symbol("_helperCtx");
  var _watcher = Symbol("_watcher");
  var _render = Symbol("_render");
  var _parsePrivateOptions = Symbol("_parsePrivateOptions");
  var _scroller = Symbol("_scroller");
  var _initEvent = Symbol("_initEvent");
  var _doScrollX = Symbol("_doScrollX");
  var _doScrollY = Symbol("_doScrollY");
  var _doMoveScroll = Symbol("_doMoveScroll");
  var _resetContext = Symbol("_resetContext");
  var _screen = Symbol("_screen");
  var _a$1;
  var throttle$2 = default_1$1.throttle, Context$2 = default_1$1.Context;
  var Board = function() {
    function Board2(mount, opts) {
      this[_a$1] = false;
      this[_mount] = mount;
      this[_canvas] = document.createElement("canvas");
      this[_helperCanvas] = document.createElement("canvas");
      this[_displayCanvas] = document.createElement("canvas");
      this[_mount].appendChild(this[_displayCanvas]);
      this[_opts$3] = this[_parsePrivateOptions](opts);
      var originCtx2d = this[_canvas].getContext("2d");
      var displayCtx2d = this[_displayCanvas].getContext("2d");
      var helperCtx2d = this[_helperCanvas].getContext("2d");
      this[_ctx$2] = new Context$2(originCtx2d, this[_opts$3]);
      this[_helperCtx] = new Context$2(helperCtx2d, this[_opts$3]);
      this[_screen] = new Screen(this[_ctx$2], this[_opts$3]);
      this[_watcher] = new ScreenWatcher(this[_displayCanvas], this[_ctx$2]);
      this[_scroller] = new Scroller(displayCtx2d, {
        width: opts.width,
        height: opts.height,
        devicePixelRatio: opts.devicePixelRatio || 1,
        scrollConfig: opts.scrollConfig
      });
      this[_render]();
    }
    Board2.prototype.getDisplayContext2D = function() {
      return this[_displayCanvas].getContext("2d");
    };
    Board2.prototype.getOriginContext2D = function() {
      return this[_ctx$2].getContext();
    };
    Board2.prototype.getHelperContext2D = function() {
      return this[_helperCtx].getContext();
    };
    Board2.prototype.getContext = function() {
      return this[_ctx$2];
    };
    Board2.prototype.getHelperContext = function() {
      return this[_helperCtx];
    };
    Board2.prototype.scale = function(scaleRatio) {
      if (scaleRatio > 0) {
        this[_ctx$2].setTransform({ scale: scaleRatio });
        this[_helperCtx].setTransform({ scale: scaleRatio });
      }
      var _b2 = this[_screen].calcScreen(), position = _b2.position, size = _b2.size;
      return { position, size };
    };
    Board2.prototype.scrollX = function(x2) {
      this[_watcher].setStatusMap({
        canScrollYPrev: true,
        canScrollYNext: true,
        canScrollXPrev: true,
        canScrollXNext: true
      });
      if (x2 >= 0 || x2 < 0) {
        this[_ctx$2].setTransform({ scrollX: x2 });
        this[_helperCtx].setTransform({ scrollX: x2 });
      }
      var _b2 = this[_screen].calcScreen(), position = _b2.position, size = _b2.size, canScrollXNext = _b2.canScrollXNext, canScrollYNext = _b2.canScrollYNext, canScrollXPrev = _b2.canScrollXPrev, canScrollYPrev = _b2.canScrollYPrev;
      this[_watcher].setStatusMap({
        canScrollYPrev,
        canScrollYNext,
        canScrollXPrev,
        canScrollXNext
      });
      return { position, size };
    };
    Board2.prototype.scrollY = function(y2) {
      this[_watcher].setStatusMap({
        canScrollYPrev: true,
        canScrollYNext: true,
        canScrollXPrev: true,
        canScrollXNext: true
      });
      if (y2 >= 0 || y2 < 0) {
        this[_ctx$2].setTransform({ scrollY: y2 });
        this[_helperCtx].setTransform({ scrollY: y2 });
      }
      var _b2 = this[_screen].calcScreen(), position = _b2.position, size = _b2.size, canScrollXNext = _b2.canScrollXNext, canScrollYNext = _b2.canScrollYNext, canScrollXPrev = _b2.canScrollXPrev, canScrollYPrev = _b2.canScrollYPrev;
      this[_watcher].setStatusMap({
        canScrollYPrev,
        canScrollYNext,
        canScrollXPrev,
        canScrollXNext
      });
      return { position, size };
    };
    Board2.prototype.getTransform = function() {
      return this[_ctx$2].getTransform();
    };
    Board2.prototype.draw = function() {
      this.clear();
      var _b2 = this[_screen].calcScreen(), position = _b2.position, deviceSize = _b2.deviceSize, size = _b2.size;
      var displayCtx = this[_displayCanvas].getContext("2d");
      displayCtx === null || displayCtx === void 0 ? void 0 : displayCtx.drawImage(this[_canvas], deviceSize.x, deviceSize.y, deviceSize.w, deviceSize.h);
      displayCtx === null || displayCtx === void 0 ? void 0 : displayCtx.drawImage(this[_helperCanvas], deviceSize.x, deviceSize.y, deviceSize.w, deviceSize.h);
      if (this[_opts$3].canScroll === true) {
        this[_scroller].draw(position);
      }
      return { position, size };
    };
    Board2.prototype.clear = function() {
      var displayCtx = this[_displayCanvas].getContext("2d");
      displayCtx === null || displayCtx === void 0 ? void 0 : displayCtx.clearRect(0, 0, this[_displayCanvas].width, this[_displayCanvas].height);
    };
    Board2.prototype.on = function(name, callback) {
      this[_watcher].on(name, callback);
    };
    Board2.prototype.off = function(name, callback) {
      this[_watcher].off(name, callback);
    };
    Board2.prototype.getScreenInfo = function() {
      return this[_screen].calcScreen();
    };
    Board2.prototype.setCursor = function(cursor) {
      this[_displayCanvas].style.cursor = cursor;
    };
    Board2.prototype.resetCursor = function() {
      this[_displayCanvas].style.cursor = "auto";
    };
    Board2.prototype.resetSize = function(opts) {
      this[_opts$3] = __assign$1$1(__assign$1$1({}, this[_opts$3]), opts);
      this[_resetContext]();
      this[_ctx$2].resetSize(opts);
      this[_helperCtx].resetSize(opts);
      this[_screen].resetSize(opts);
      this[_scroller].resetSize({
        width: this[_opts$3].width,
        height: this[_opts$3].height,
        devicePixelRatio: this[_opts$3].devicePixelRatio
      });
      this.draw();
    };
    Board2.prototype.getScrollLineWidth = function() {
      var lineWidth = 0;
      if (this[_opts$3].canScroll === true) {
        lineWidth = this[_scroller].getLineWidth();
      }
      return lineWidth;
    };
    Board2.prototype.pointScreenToContext = function(screenPoint) {
      var _b2 = this.getTransform(), scrollX = _b2.scrollX, scrollY = _b2.scrollY, scale = _b2.scale;
      var ctxPoint = {
        x: (screenPoint.x - scrollX) / scale,
        y: (screenPoint.y - scrollY) / scale
      };
      return ctxPoint;
    };
    Board2.prototype.pointContextToScreen = function(ctxPoint) {
      var _b2 = this.getTransform(), scrollX = _b2.scrollX, scrollY = _b2.scrollY, scale = _b2.scale;
      var screenPoint = {
        x: ctxPoint.x * scale + scrollX,
        y: ctxPoint.y * scale + scrollY
      };
      return screenPoint;
    };
    Board2.prototype[_a$1 = _hasRendered, _render] = function() {
      if (this[_hasRendered] === true) {
        return;
      }
      this[_resetContext]();
      this[_initEvent]();
      this[_hasRendered] = true;
    };
    Board2.prototype[_resetContext] = function() {
      var _b2 = this[_opts$3], width = _b2.width, height = _b2.height, contextWidth = _b2.contextWidth, contextHeight = _b2.contextHeight, devicePixelRatio = _b2.devicePixelRatio;
      this[_canvas].width = contextWidth * devicePixelRatio;
      this[_canvas].height = contextHeight * devicePixelRatio;
      this[_helperCanvas].width = contextWidth * devicePixelRatio;
      this[_helperCanvas].height = contextHeight * devicePixelRatio;
      this[_displayCanvas].width = width * devicePixelRatio;
      this[_displayCanvas].height = height * devicePixelRatio;
      setStyle(this[_displayCanvas], {
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      });
    };
    Board2.prototype[_parsePrivateOptions] = function(opts) {
      var defaultOpts = {
        devicePixelRatio: 1
      };
      return __assign$1$1(__assign$1$1({}, defaultOpts), opts);
    };
    Board2.prototype[_initEvent] = function() {
      var _this = this;
      if (this[_hasRendered] === true) {
        return;
      }
      if (this[_opts$3].canScroll === true) {
        this.on("wheelX", throttle$2(function(deltaX) {
          _this[_doScrollX](deltaX);
        }, 16));
        this.on("wheelY", throttle$2(function(deltaY) {
          _this[_doScrollY](deltaY);
        }, 16));
        var scrollType_1 = null;
        this.on("moveStart", throttle$2(function(p) {
          if (_this[_scroller].isPointAtScrollX(p)) {
            scrollType_1 = "x";
          } else if (_this[_scroller].isPointAtScrollY(p)) {
            scrollType_1 = "y";
          }
        }, 16));
        this.on("move", throttle$2(function(p) {
          if (scrollType_1) {
            _this[_doMoveScroll](scrollType_1, p);
          }
        }, 16));
        this.on("moveEnd", throttle$2(function(p) {
          if (scrollType_1) {
            _this[_doMoveScroll](scrollType_1, p);
          }
          scrollType_1 = null;
        }, 16));
      }
    };
    Board2.prototype[_doScrollX] = function(dx, prevScrollX) {
      var width = this[_opts$3].width;
      var scrollX = prevScrollX;
      if (!(typeof scrollX === "number" && (scrollX > 0 || scrollX <= 0))) {
        scrollX = this[_ctx$2].getTransform().scrollX;
      }
      var position = this[_screen].calcScreen().position;
      var xSize = this[_scroller].calc(position).xSize;
      var moveX = this[_screen].calcScreenScroll(position.left, position.right, xSize, width, dx);
      this.scrollX(scrollX + moveX);
      this.draw();
    };
    Board2.prototype[_doScrollY] = function(dy, prevScrollY) {
      var height = this[_opts$3].height;
      var scrollY = prevScrollY;
      if (!(typeof scrollY === "number" && (scrollY > 0 || scrollY <= 0))) {
        scrollY = this[_ctx$2].getTransform().scrollY;
      }
      var position = this[_screen].calcScreen().position;
      var ySize = this[_scroller].calc(position).ySize;
      var moveY = this[_screen].calcScreenScroll(position.top, position.bottom, ySize, height, dy);
      this.scrollY(scrollY + moveY);
      this.draw();
    };
    Board2.prototype[_doMoveScroll] = function(scrollType, point) {
      if (!scrollType) {
        return;
      }
      var position = this[_screen].calcScreen().position;
      var _b2 = this[_scroller].calc(position), xSize = _b2.xSize, ySize = _b2.ySize;
      if (scrollType === "x") {
        this[_doScrollX](point.x - xSize / 2, 0);
      } else if (scrollType === "y") {
        this[_doScrollY](point.y - ySize / 2, 0);
      }
    };
    return Board2;
  }();
  function throttle$1(fn, timeout) {
    var timer = -1;
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (timer > 0) {
        return;
      }
      timer = setTimeout(function() {
        fn.apply(void 0, args);
        timer = -1;
      }, timeout);
    };
  }
  function isColorStr$1(color2) {
    return typeof color2 === "string" && /^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color2);
  }
  function createUUID$1() {
    function str4() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return "".concat(str4()).concat(str4(), "-").concat(str4(), "-").concat(str4(), "-").concat(str4(), "-").concat(str4()).concat(str4()).concat(str4());
  }
  function deepClone$1(target) {
    function _clone(t) {
      var type = is$1$1(t);
      if (["Null", "Number", "String", "Boolean", "Undefined"].indexOf(type) >= 0) {
        return t;
      } else if (type === "Array") {
        var arr_1 = [];
        t.forEach(function(item) {
          arr_1.push(_clone(item));
        });
        return arr_1;
      } else if (type === "Object") {
        var obj_1 = {};
        var keys = Object.keys(t);
        keys.forEach(function(key) {
          obj_1[key] = _clone(t[key]);
        });
        return obj_1;
      }
    }
    return _clone(target);
  }
  function is$1$1(data) {
    return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, "").split(" ")[1];
  }
  var __assign$2 = function() {
    __assign$2 = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign$2.apply(this, arguments);
  };
  (function() {
    function Context2(ctx, opts) {
      this._opts = opts;
      this._ctx = ctx;
      this._transform = {
        scale: 1,
        scrollX: 0,
        scrollY: 0
      };
    }
    Context2.prototype.getContext = function() {
      return this._ctx;
    };
    Context2.prototype.resetSize = function(opts) {
      this._opts = __assign$2(__assign$2({}, this._opts), opts);
    };
    Context2.prototype.calcDeviceNum = function(num) {
      return num * this._opts.devicePixelRatio;
    };
    Context2.prototype.calcScreenNum = function(num) {
      return num / this._opts.devicePixelRatio;
    };
    Context2.prototype.getSize = function() {
      return {
        width: this._opts.width,
        height: this._opts.height,
        contextWidth: this._opts.contextWidth,
        contextHeight: this._opts.contextHeight,
        devicePixelRatio: this._opts.devicePixelRatio
      };
    };
    Context2.prototype.setTransform = function(config) {
      this._transform = __assign$2(__assign$2({}, this._transform), config);
    };
    Context2.prototype.getTransform = function() {
      return {
        scale: this._transform.scale,
        scrollX: this._transform.scrollX,
        scrollY: this._transform.scrollY
      };
    };
    Context2.prototype.setFillStyle = function(color2) {
      this._ctx.fillStyle = color2;
    };
    Context2.prototype.fill = function(fillRule) {
      return this._ctx.fill(fillRule || "nonzero");
    };
    Context2.prototype.arc = function(x2, y2, radius, startAngle, endAngle, anticlockwise) {
      return this._ctx.arc(this._doSize(x2), this._doSize(y2), this._doSize(radius), startAngle, endAngle, anticlockwise);
    };
    Context2.prototype.rect = function(x2, y2, w2, h2) {
      return this._ctx.rect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.fillRect = function(x2, y2, w2, h2) {
      return this._ctx.fillRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.clearRect = function(x2, y2, w2, h2) {
      return this._ctx.clearRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.beginPath = function() {
      return this._ctx.beginPath();
    };
    Context2.prototype.closePath = function() {
      return this._ctx.closePath();
    };
    Context2.prototype.lineTo = function(x2, y2) {
      return this._ctx.lineTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.moveTo = function(x2, y2) {
      return this._ctx.moveTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.arcTo = function(x1, y1, x2, y2, radius) {
      return this._ctx.arcTo(this._doSize(x1), this._doSize(y1), this._doSize(x2), this._doSize(y2), this._doSize(radius));
    };
    Context2.prototype.setLineWidth = function(w2) {
      return this._ctx.lineWidth = this._doSize(w2);
    };
    Context2.prototype.setLineDash = function(nums) {
      var _this = this;
      return this._ctx.setLineDash(nums.map(function(n) {
        return _this._doSize(n);
      }));
    };
    Context2.prototype.isPointInPath = function(x2, y2) {
      return this._ctx.isPointInPath(this._doX(x2), this._doY(y2));
    };
    Context2.prototype.isPointInPathWithoutScroll = function(x2, y2) {
      return this._ctx.isPointInPath(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.setStrokeStyle = function(color2) {
      this._ctx.strokeStyle = color2;
    };
    Context2.prototype.stroke = function() {
      return this._ctx.stroke();
    };
    Context2.prototype.translate = function(x2, y2) {
      return this._ctx.translate(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.rotate = function(angle2) {
      return this._ctx.rotate(angle2);
    };
    Context2.prototype.drawImage = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var image = args[0];
      var sx = args[1];
      var sy = args[2];
      var sw = args[3];
      var sh = args[4];
      var dx = args[args.length - 4];
      var dy = args[args.length - 3];
      var dw = args[args.length - 2];
      var dh = args[args.length - 1];
      if (args.length === 9) {
        return this._ctx.drawImage(image, this._doSize(sx), this._doSize(sy), this._doSize(sw), this._doSize(sh), this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      } else {
        return this._ctx.drawImage(image, this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      }
    };
    Context2.prototype.createPattern = function(image, repetition) {
      return this._ctx.createPattern(image, repetition);
    };
    Context2.prototype.measureText = function(text2) {
      return this._ctx.measureText(text2);
    };
    Context2.prototype.setTextAlign = function(align) {
      this._ctx.textAlign = align;
    };
    Context2.prototype.fillText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.strokeText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.setFont = function(opts) {
      var strList = [];
      if (opts.fontWeight === "bold") {
        strList.push("".concat(opts.fontWeight));
      }
      strList.push("".concat(this._doSize(opts.fontSize || 12), "px"));
      strList.push("".concat(opts.fontFamily || "sans-serif"));
      this._ctx.font = "".concat(strList.join(" "));
    };
    Context2.prototype.setTextBaseline = function(baseline) {
      this._ctx.textBaseline = baseline;
    };
    Context2.prototype.setGlobalAlpha = function(alpha) {
      this._ctx.globalAlpha = alpha;
    };
    Context2.prototype.save = function() {
      this._ctx.save();
    };
    Context2.prototype.restore = function() {
      this._ctx.restore();
    };
    Context2.prototype.scale = function(ratioX, ratioY) {
      this._ctx.scale(ratioX, ratioY);
    };
    Context2.prototype.setShadowColor = function(color2) {
      this._ctx.shadowColor = color2;
    };
    Context2.prototype.setShadowOffsetX = function(offsetX) {
      this._ctx.shadowOffsetX = this._doSize(offsetX);
    };
    Context2.prototype.setShadowOffsetY = function(offsetY) {
      this._ctx.shadowOffsetY = this._doSize(offsetY);
    };
    Context2.prototype.setShadowBlur = function(blur) {
      this._ctx.shadowBlur = this._doSize(blur);
    };
    Context2.prototype.ellipse = function(x2, y2, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
      this._ctx.ellipse(this._doSize(x2), this._doSize(y2), this._doSize(radiusX), this._doSize(radiusY), rotation, startAngle, endAngle, counterclockwise);
    };
    Context2.prototype._doSize = function(num) {
      return this._opts.devicePixelRatio * num;
    };
    Context2.prototype._doX = function(x2) {
      var _a2 = this._transform, scale = _a2.scale, scrollX = _a2.scrollX;
      var _x = (x2 - scrollX) / scale;
      return this._doSize(_x);
    };
    Context2.prototype._doY = function(y2) {
      var _a2 = this._transform, scale = _a2.scale, scrollY = _a2.scrollY;
      var _y = (y2 - scrollY) / scale;
      return this._doSize(_y);
    };
    return Context2;
  })();
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign$1.apply(this, arguments);
  };
  function __awaiter$1(thisArg, _arguments, P, generator) {
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
  }
  function __generator$1(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y2, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y2 && (t = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t = y2["return"]) && t.call(y2), 0) : y2.next) && !(t = t.call(y2, op[1])).done)
            return t;
          if (y2 = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y2 = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function isColorStr(color2) {
    return typeof color2 === "string" && /^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color2);
  }
  function createUUID() {
    function str4() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return "".concat(str4()).concat(str4(), "-").concat(str4(), "-").concat(str4(), "-").concat(str4(), "-").concat(str4()).concat(str4()).concat(str4());
  }
  function deepClone$3(target) {
    function _clone(t) {
      var type = is$1$3(t);
      if (["Null", "Number", "String", "Boolean", "Undefined"].indexOf(type) >= 0) {
        return t;
      } else if (type === "Array") {
        var arr_1 = [];
        t.forEach(function(item) {
          arr_1.push(_clone(item));
        });
        return arr_1;
      } else if (type === "Object") {
        var obj_1 = {};
        var keys = Object.keys(t);
        keys.forEach(function(key) {
          obj_1[key] = _clone(t[key]);
        });
        return obj_1;
      }
    }
    return _clone(target);
  }
  function is$1$3(data) {
    return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, "").split(" ")[1];
  }
  function parsePrototype(data) {
    var typeStr = Object.prototype.toString.call(data) || "";
    var result = typeStr.replace(/(\[object|\])/ig, "").trim();
    return result;
  }
  var istype = {
    type: function(data, lowerCase) {
      var result = parsePrototype(data);
      return lowerCase === true ? result.toLocaleLowerCase() : result;
    },
    array: function(data) {
      return parsePrototype(data) === "Array";
    },
    json: function(data) {
      return parsePrototype(data) === "Object";
    },
    function: function(data) {
      return parsePrototype(data) === "Function";
    },
    asyncFunction: function(data) {
      return parsePrototype(data) === "AsyncFunction";
    },
    string: function(data) {
      return parsePrototype(data) === "String";
    },
    number: function(data) {
      return parsePrototype(data) === "Number";
    },
    undefined: function(data) {
      return parsePrototype(data) === "Undefined";
    },
    null: function(data) {
      return parsePrototype(data) === "Null";
    },
    promise: function(data) {
      return parsePrototype(data) === "Promise";
    }
  };
  var __assign$5 = function() {
    __assign$5 = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign$5.apply(this, arguments);
  };
  function __awaiter(thisArg, _arguments, P, generator) {
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
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y2, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y2 && (t = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t = y2["return"]) && t.call(y2), 0) : y2.next) && !(t = t.call(y2, op[1])).done)
            return t;
          if (y2 = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y2 = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function parseHTMLToDataURL(html2, opts) {
    var width = opts.width, height = opts.height;
    return new Promise(function(resolve, reject) {
      var _svg = '\n    <svg xmlns="http://www.w3.org/2000/svg" width="'.concat(width || "", '" height = "').concat(height || "", '">\n      <foreignObject width="100%" height="100%">\n        <div xmlns = "http://www.w3.org/1999/xhtml">\n          ').concat(html2, "\n        </div>\n      </foreignObject>\n    </svg>\n    ");
      var blob = new Blob([_svg], { type: "image/svg+xml;charset=utf-8" });
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        var _a2;
        var base64 = (_a2 = event === null || event === void 0 ? void 0 : event.target) === null || _a2 === void 0 ? void 0 : _a2.result;
        resolve(base64);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }
  function parseSVGToDataURL(svg2) {
    return new Promise(function(resolve, reject) {
      var _svg = svg2;
      var blob = new Blob([_svg], { type: "image/svg+xml;charset=utf-8" });
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        var _a2;
        var base64 = (_a2 = event === null || event === void 0 ? void 0 : event.target) === null || _a2 === void 0 ? void 0 : _a2.result;
        resolve(base64);
      };
      reader.onerror = function(err) {
        reject(err);
      };
    });
  }
  var Image = window.Image;
  function loadImage(src) {
    return new Promise(function(resolve, reject) {
      var img = new Image();
      img.onload = function() {
        resolve(img);
      };
      img.onabort = reject;
      img.onerror = reject;
      img.src = src;
    });
  }
  function loadSVG(svg2) {
    return __awaiter(this, void 0, void 0, function() {
      var dataURL, image;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            return [4, parseSVGToDataURL(svg2)];
          case 1:
            dataURL = _a2.sent();
            return [4, loadImage(dataURL)];
          case 2:
            image = _a2.sent();
            return [2, image];
        }
      });
    });
  }
  function loadHTML(html2, opts) {
    return __awaiter(this, void 0, void 0, function() {
      var dataURL, image;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            return [4, parseHTMLToDataURL(html2, opts)];
          case 1:
            dataURL = _a2.sent();
            return [4, loadImage(dataURL)];
          case 2:
            image = _a2.sent();
            return [2, image];
        }
      });
    });
  }
  var Context = function() {
    function Context2(ctx, opts) {
      this._opts = opts;
      this._ctx = ctx;
      this._transform = {
        scale: 1,
        scrollX: 0,
        scrollY: 0
      };
    }
    Context2.prototype.getContext = function() {
      return this._ctx;
    };
    Context2.prototype.resetSize = function(opts) {
      this._opts = __assign$5(__assign$5({}, this._opts), opts);
    };
    Context2.prototype.calcDeviceNum = function(num) {
      return num * this._opts.devicePixelRatio;
    };
    Context2.prototype.calcScreenNum = function(num) {
      return num / this._opts.devicePixelRatio;
    };
    Context2.prototype.getSize = function() {
      return {
        width: this._opts.width,
        height: this._opts.height,
        contextWidth: this._opts.contextWidth,
        contextHeight: this._opts.contextHeight,
        devicePixelRatio: this._opts.devicePixelRatio
      };
    };
    Context2.prototype.setTransform = function(config) {
      this._transform = __assign$5(__assign$5({}, this._transform), config);
    };
    Context2.prototype.getTransform = function() {
      return {
        scale: this._transform.scale,
        scrollX: this._transform.scrollX,
        scrollY: this._transform.scrollY
      };
    };
    Context2.prototype.setFillStyle = function(color2) {
      this._ctx.fillStyle = color2;
    };
    Context2.prototype.fill = function(fillRule) {
      return this._ctx.fill(fillRule || "nonzero");
    };
    Context2.prototype.arc = function(x2, y2, radius, startAngle, endAngle, anticlockwise) {
      return this._ctx.arc(this._doSize(x2), this._doSize(y2), this._doSize(radius), startAngle, endAngle, anticlockwise);
    };
    Context2.prototype.rect = function(x2, y2, w2, h2) {
      return this._ctx.rect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.fillRect = function(x2, y2, w2, h2) {
      return this._ctx.fillRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.clearRect = function(x2, y2, w2, h2) {
      return this._ctx.clearRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.beginPath = function() {
      return this._ctx.beginPath();
    };
    Context2.prototype.closePath = function() {
      return this._ctx.closePath();
    };
    Context2.prototype.lineTo = function(x2, y2) {
      return this._ctx.lineTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.moveTo = function(x2, y2) {
      return this._ctx.moveTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.arcTo = function(x1, y1, x2, y2, radius) {
      return this._ctx.arcTo(this._doSize(x1), this._doSize(y1), this._doSize(x2), this._doSize(y2), this._doSize(radius));
    };
    Context2.prototype.setLineWidth = function(w2) {
      return this._ctx.lineWidth = this._doSize(w2);
    };
    Context2.prototype.setLineDash = function(nums) {
      var _this = this;
      return this._ctx.setLineDash(nums.map(function(n) {
        return _this._doSize(n);
      }));
    };
    Context2.prototype.isPointInPath = function(x2, y2) {
      return this._ctx.isPointInPath(this._doX(x2), this._doY(y2));
    };
    Context2.prototype.isPointInPathWithoutScroll = function(x2, y2) {
      return this._ctx.isPointInPath(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.setStrokeStyle = function(color2) {
      this._ctx.strokeStyle = color2;
    };
    Context2.prototype.stroke = function() {
      return this._ctx.stroke();
    };
    Context2.prototype.translate = function(x2, y2) {
      return this._ctx.translate(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.rotate = function(angle2) {
      return this._ctx.rotate(angle2);
    };
    Context2.prototype.drawImage = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var image = args[0];
      var sx = args[1];
      var sy = args[2];
      var sw = args[3];
      var sh = args[4];
      var dx = args[args.length - 4];
      var dy = args[args.length - 3];
      var dw = args[args.length - 2];
      var dh = args[args.length - 1];
      if (args.length === 9) {
        return this._ctx.drawImage(image, this._doSize(sx), this._doSize(sy), this._doSize(sw), this._doSize(sh), this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      } else {
        return this._ctx.drawImage(image, this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      }
    };
    Context2.prototype.createPattern = function(image, repetition) {
      return this._ctx.createPattern(image, repetition);
    };
    Context2.prototype.measureText = function(text2) {
      return this._ctx.measureText(text2);
    };
    Context2.prototype.setTextAlign = function(align) {
      this._ctx.textAlign = align;
    };
    Context2.prototype.fillText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.strokeText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.setFont = function(opts) {
      var strList = [];
      if (opts.fontWeight === "bold") {
        strList.push("".concat(opts.fontWeight));
      }
      strList.push("".concat(this._doSize(opts.fontSize || 12), "px"));
      strList.push("".concat(opts.fontFamily || "sans-serif"));
      this._ctx.font = "".concat(strList.join(" "));
    };
    Context2.prototype.setTextBaseline = function(baseline) {
      this._ctx.textBaseline = baseline;
    };
    Context2.prototype.setGlobalAlpha = function(alpha) {
      this._ctx.globalAlpha = alpha;
    };
    Context2.prototype.save = function() {
      this._ctx.save();
    };
    Context2.prototype.restore = function() {
      this._ctx.restore();
    };
    Context2.prototype.scale = function(ratioX, ratioY) {
      this._ctx.scale(ratioX, ratioY);
    };
    Context2.prototype.setShadowColor = function(color2) {
      this._ctx.shadowColor = color2;
    };
    Context2.prototype.setShadowOffsetX = function(offsetX) {
      this._ctx.shadowOffsetX = this._doSize(offsetX);
    };
    Context2.prototype.setShadowOffsetY = function(offsetY) {
      this._ctx.shadowOffsetY = this._doSize(offsetY);
    };
    Context2.prototype.setShadowBlur = function(blur) {
      this._ctx.shadowBlur = this._doSize(blur);
    };
    Context2.prototype.ellipse = function(x2, y2, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
      this._ctx.ellipse(this._doSize(x2), this._doSize(y2), this._doSize(radiusX), this._doSize(radiusY), rotation, startAngle, endAngle, counterclockwise);
    };
    Context2.prototype._doSize = function(num) {
      return this._opts.devicePixelRatio * num;
    };
    Context2.prototype._doX = function(x2) {
      var _a2 = this._transform, scale = _a2.scale, scrollX = _a2.scrollX;
      var _x = (x2 - scrollX) / scale;
      return this._doSize(_x);
    };
    Context2.prototype._doY = function(y2) {
      var _a2 = this._transform, scale = _a2.scale, scrollY = _a2.scrollY;
      var _y = (y2 - scrollY) / scale;
      return this._doSize(_y);
    };
    return Context2;
  }();
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
    return typeof value === "string" && /^(http:\/\/|https:\/\/|\.\/|\/)/.test("".concat(value));
  }
  function imageBase64$1(value) {
    return typeof value === "string" && /^(data:image\/)/.test("".concat(value));
  }
  function imageSrc$1(value) {
    return imageBase64$1(value) || imageURL$1(value);
  }
  function svg$1(value) {
    return typeof value === "string" && /^(<svg[\s]{1,}|<svg>)/i.test("".concat(value).trim()) && /<\/[\s]{0,}svg>$/i.test("".concat(value).trim());
  }
  function html$1(value) {
    var result = false;
    if (typeof value === "string") {
      var div = document.createElement("div");
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
  var is$2 = {
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
  function parseAngleToRadian$1(angle2) {
    return angle2 / 180 * Math.PI;
  }
  function calcElementCenter$1(elem) {
    var p = {
      x: elem.x + elem.w / 2,
      y: elem.y + elem.h / 2
    };
    return p;
  }
  function rotateElement$1(ctx, elem, callback) {
    var center = calcElementCenter$1(elem);
    var radian = parseAngleToRadian$1(elem.angle || 0);
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
    var size = ctx.getSize();
    ctx.setFillStyle(color2);
    ctx.fillRect(0, 0, size.contextWidth, size.contextHeight);
  }
  function drawBox(ctx, elem, pattern) {
    clearContext$1(ctx);
    drawBoxBorder(ctx, elem);
    clearContext$1(ctx);
    rotateElement$1(ctx, elem, function() {
      var x2 = elem.x, y2 = elem.y, w2 = elem.w, h2 = elem.h;
      var r = elem.desc.borderRadius || 0;
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
    rotateElement$1(ctx, elem, function() {
      if (!(elem.desc.borderWidth && elem.desc.borderWidth > 0)) {
        return;
      }
      var bw = elem.desc.borderWidth;
      var borderColor = "#000000";
      if (isColorStr(elem.desc.borderColor) === true) {
        borderColor = elem.desc.borderColor;
      }
      var x2 = elem.x - bw / 2;
      var y2 = elem.y - bw / 2;
      var w2 = elem.w + bw;
      var h2 = elem.h + bw;
      var r = elem.desc.borderRadius || 0;
      r = Math.min(r, w2 / 2, h2 / 2);
      if (r < w2 / 2 && r < h2 / 2) {
        r = r + bw / 2;
      }
      var desc = elem.desc;
      if (desc.shadowColor !== void 0 && isColorStr(desc.shadowColor)) {
        ctx.setShadowColor(desc.shadowColor);
      }
      if (desc.shadowOffsetX !== void 0 && is$2.number(desc.shadowOffsetX)) {
        ctx.setShadowOffsetX(desc.shadowOffsetX);
      }
      if (desc.shadowOffsetY !== void 0 && is$2.number(desc.shadowOffsetY)) {
        ctx.setShadowOffsetY(desc.shadowOffsetY);
      }
      if (desc.shadowBlur !== void 0 && is$2.number(desc.shadowBlur)) {
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
    var content = loader.getContent(elem.uuid);
    rotateElement$1(ctx, elem, function() {
      if (content) {
        ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
      }
    });
  }
  function drawSVG(ctx, elem, loader) {
    var content = loader.getContent(elem.uuid);
    rotateElement$1(ctx, elem, function() {
      if (content) {
        ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
      }
    });
  }
  function drawHTML(ctx, elem, loader) {
    var content = loader.getContent(elem.uuid);
    rotateElement$1(ctx, elem, function() {
      if (content) {
        ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
      }
    });
  }
  function drawText(ctx, elem, loader) {
    clearContext$1(ctx);
    drawBox(ctx, elem, elem.desc.bgColor || "transparent");
    rotateElement$1(ctx, elem, function() {
      var desc = __assign$1({
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
      var descText = desc.text.replace(/\r\n/ig, "\n");
      var fontHeight = desc.lineHeight || desc.fontSize;
      var descTextList = descText.split("\n");
      var lines = [];
      var lineNum = 0;
      descTextList.forEach(function(tempText, idx) {
        var lineText = "";
        if (tempText.length > 0) {
          for (var i = 0; i < tempText.length; i++) {
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
      {
        var _y_1 = elem.y;
        if (lines.length * fontHeight < elem.h) {
          _y_1 += (elem.h - lines.length * fontHeight) / 2;
        }
        if (desc.textShadowColor !== void 0 && isColorStr(desc.textShadowColor)) {
          ctx.setShadowColor(desc.textShadowColor);
        }
        if (desc.textShadowOffsetX !== void 0 && is$2.number(desc.textShadowOffsetX)) {
          ctx.setShadowOffsetX(desc.textShadowOffsetX);
        }
        if (desc.textShadowOffsetY !== void 0 && is$2.number(desc.textShadowOffsetY)) {
          ctx.setShadowOffsetY(desc.textShadowOffsetY);
        }
        if (desc.textShadowBlur !== void 0 && is$2.number(desc.textShadowBlur)) {
          ctx.setShadowBlur(desc.textShadowBlur);
        }
        lines.forEach(function(line, i) {
          var _x = elem.x;
          if (desc.textAlign === "center") {
            _x = elem.x + (elem.w - line.width) / 2;
          } else if (desc.textAlign === "right") {
            _x = elem.x + (elem.w - line.width);
          }
          ctx.fillText(line.text, _x, _y_1 + fontHeight * i);
        });
        clearContext$1(ctx);
      }
      if (isColorStr(desc.strokeColor) && desc.strokeWidth !== void 0 && desc.strokeWidth > 0) {
        var _y_2 = elem.y;
        if (lines.length * fontHeight < elem.h) {
          _y_2 += (elem.h - lines.length * fontHeight) / 2;
        }
        lines.forEach(function(line, i) {
          var _x = elem.x;
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
          ctx.strokeText(line.text, _x, _y_2 + fontHeight * i);
        });
      }
    });
  }
  function drawCircle(ctx, elem) {
    clearContext$1(ctx);
    rotateElement$1(ctx, elem, function(ctx2) {
      var x2 = elem.x, y2 = elem.y, w2 = elem.w, h2 = elem.h, desc = elem.desc;
      var _a2 = desc.bgColor, bgColor = _a2 === void 0 ? "#000000" : _a2, _b2 = desc.borderColor, borderColor = _b2 === void 0 ? "#000000" : _b2, _c2 = desc.borderWidth, borderWidth2 = _c2 === void 0 ? 0 : _c2;
      var a = w2 / 2;
      var b = h2 / 2;
      var centerX = x2 + a;
      var centerY = y2 + b;
      if (borderWidth2 && borderWidth2 > 0) {
        var ba = borderWidth2 / 2 + a;
        var bb = borderWidth2 / 2 + b;
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
    var _a2;
    clearContext$1(ctx);
    var size = ctx.getSize();
    ctx.clearRect(0, 0, size.contextWidth, size.contextHeight);
    if (typeof data.bgColor === "string" && isColorStr(data.bgColor)) {
      drawBgColor(ctx, data.bgColor);
    }
    if (!(data.elements.length > 0)) {
      return;
    }
    for (var i = 0; i < data.elements.length; i++) {
      var elem = data.elements[i];
      if (((_a2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a2 === void 0 ? void 0 : _a2.invisible) === true) {
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
  var LoaderEvent = function() {
    function LoaderEvent2() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    LoaderEvent2.prototype.on = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
      } else {
        this._listeners.set(eventKey, [callback]);
      }
    };
    LoaderEvent2.prototype.off = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        if (Array.isArray(callbacks)) {
          for (var i = 0; i < (callbacks === null || callbacks === void 0 ? void 0 : callbacks.length); i++) {
            if (callbacks[i] === callback) {
              callbacks.splice(i, 1);
              break;
            }
          }
        }
        this._listeners.set(eventKey, callbacks || []);
      }
    };
    LoaderEvent2.prototype.trigger = function(eventKey, arg) {
      var callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach(function(cb) {
          cb(arg);
        });
        return true;
      } else {
        return false;
      }
    };
    LoaderEvent2.prototype.has = function(name) {
      if (this._listeners.has(name)) {
        var list = this._listeners.get(name);
        if (Array.isArray(list) && list.length > 0) {
          return true;
        }
      }
      return false;
    };
    return LoaderEvent2;
  }();
  function filterScript(html2) {
    return html2.replace(/<script[\s\S]*?<\/script>/ig, "");
  }
  var LoaderStatus;
  (function(LoaderStatus2) {
    LoaderStatus2["FREE"] = "free";
    LoaderStatus2["LOADING"] = "loading";
    LoaderStatus2["COMPLETE"] = "complete";
  })(LoaderStatus || (LoaderStatus = {}));
  var Loader = function() {
    function Loader2(opts) {
      this._currentLoadData = {};
      this._currentUUIDQueue = [];
      this._storageLoadData = {};
      this._status = LoaderStatus.FREE;
      this._waitingLoadQueue = [];
      this._opts = opts;
      this._event = new LoaderEvent();
      this._waitingLoadQueue = [];
    }
    Loader2.prototype.load = function(data, changeResourceUUIDs) {
      var _a2 = this._resetLoadData(data, changeResourceUUIDs), uuidQueue = _a2[0], loadData = _a2[1];
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
    };
    Loader2.prototype.on = function(name, callback) {
      this._event.on(name, callback);
    };
    Loader2.prototype.off = function(name, callback) {
      this._event.off(name, callback);
    };
    Loader2.prototype.isComplete = function() {
      return this._status === LoaderStatus.COMPLETE;
    };
    Loader2.prototype.getContent = function(uuid) {
      var _a2;
      if (((_a2 = this._storageLoadData[uuid]) === null || _a2 === void 0 ? void 0 : _a2.status) === "loaded") {
        return this._storageLoadData[uuid].content;
      }
      return null;
    };
    Loader2.prototype._resetLoadData = function(data, changeResourceUUIDs) {
      var loadData = {};
      var uuidQueue = [];
      var storageLoadData = this._storageLoadData;
      for (var i = data.elements.length - 1; i >= 0; i--) {
        var elem = data.elements[i];
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
    };
    Loader2.prototype._createEmptyLoadItem = function(elem) {
      var source = "";
      var type = elem.type;
      var elemW = elem.w;
      var elemH = elem.h;
      if (elem.type === "image") {
        var _elem = elem;
        source = _elem.desc.src || "";
      } else if (elem.type === "svg") {
        var _elem = elem;
        source = _elem.desc.svg || "";
      } else if (elem.type === "html") {
        var _elem = elem;
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
        element: deepClone$3(elem)
      };
    };
    Loader2.prototype._loadTask = function() {
      var _this = this;
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
          var waitingItem = this._waitingLoadQueue.shift();
          if (waitingItem) {
            var uuidQueue = waitingItem.uuidQueue, loadData = waitingItem.loadData;
            this._currentLoadData = loadData;
            this._currentUUIDQueue = uuidQueue;
          }
        }
      }
      var maxParallelNum = this._opts.maxParallelNum;
      var uuids = this._currentUUIDQueue.splice(0, maxParallelNum);
      uuids.forEach(function(url, i) {
      });
      var loadUUIDList = [];
      var _loadAction = function() {
        if (loadUUIDList.length >= maxParallelNum) {
          return false;
        }
        if (uuids.length === 0) {
          return true;
        }
        var _loop_1 = function(i2) {
          var uuid = uuids.shift();
          if (uuid === void 0) {
            return "break";
          }
          loadUUIDList.push(uuid);
          _this._loadElementSource(_this._currentLoadData[uuid]).then(function(image) {
            var _a2, _b2;
            loadUUIDList.splice(loadUUIDList.indexOf(uuid), 1);
            var status = _loadAction();
            _this._storageLoadData[uuid] = {
              uuid,
              type: _this._currentLoadData[uuid].type,
              status: "loaded",
              content: image,
              source: _this._currentLoadData[uuid].source,
              elemW: _this._currentLoadData[uuid].elemW,
              elemH: _this._currentLoadData[uuid].elemH,
              element: _this._currentLoadData[uuid].element
            };
            if (loadUUIDList.length === 0 && uuids.length === 0 && status === true) {
              _this._status = LoaderStatus.FREE;
              _this._loadTask();
            }
            _this._event.trigger("load", {
              uuid: (_a2 = _this._storageLoadData[uuid]) === null || _a2 === void 0 ? void 0 : _a2.uuid,
              type: _this._storageLoadData[uuid].type,
              status: _this._storageLoadData[uuid].status,
              content: _this._storageLoadData[uuid].content,
              source: _this._storageLoadData[uuid].source,
              elemW: _this._storageLoadData[uuid].elemW,
              elemH: _this._storageLoadData[uuid].elemH,
              element: (_b2 = _this._storageLoadData[uuid]) === null || _b2 === void 0 ? void 0 : _b2.element
            });
          }).catch(function(err) {
            var _a2, _b2, _c2, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            console.warn(err);
            loadUUIDList.splice(loadUUIDList.indexOf(uuid), 1);
            var status = _loadAction();
            if (_this._currentLoadData[uuid]) {
              _this._storageLoadData[uuid] = {
                uuid,
                type: (_a2 = _this._currentLoadData[uuid]) === null || _a2 === void 0 ? void 0 : _a2.type,
                status: "fail",
                content: null,
                error: err,
                source: (_b2 = _this._currentLoadData[uuid]) === null || _b2 === void 0 ? void 0 : _b2.source,
                elemW: (_c2 = _this._currentLoadData[uuid]) === null || _c2 === void 0 ? void 0 : _c2.elemW,
                elemH: (_d = _this._currentLoadData[uuid]) === null || _d === void 0 ? void 0 : _d.elemH,
                element: (_e = _this._currentLoadData[uuid]) === null || _e === void 0 ? void 0 : _e.element
              };
            }
            if (loadUUIDList.length === 0 && uuids.length === 0 && status === true) {
              _this._status = LoaderStatus.FREE;
              _this._loadTask();
            }
            if (_this._currentLoadData[uuid]) {
              _this._event.trigger("error", {
                uuid,
                type: (_f = _this._storageLoadData[uuid]) === null || _f === void 0 ? void 0 : _f.type,
                status: (_g = _this._storageLoadData[uuid]) === null || _g === void 0 ? void 0 : _g.status,
                content: (_h = _this._storageLoadData[uuid]) === null || _h === void 0 ? void 0 : _h.content,
                source: (_j = _this._storageLoadData[uuid]) === null || _j === void 0 ? void 0 : _j.source,
                elemW: (_k = _this._storageLoadData[uuid]) === null || _k === void 0 ? void 0 : _k.elemW,
                elemH: (_l = _this._storageLoadData[uuid]) === null || _l === void 0 ? void 0 : _l.elemH,
                element: (_m = _this._storageLoadData[uuid]) === null || _m === void 0 ? void 0 : _m.element
              });
            }
          });
        };
        for (var i = loadUUIDList.length; i < maxParallelNum; i++) {
          var state_1 = _loop_1();
          if (state_1 === "break")
            break;
        }
        return false;
      };
      _loadAction();
    };
    Loader2.prototype._loadElementSource = function(params) {
      return __awaiter$1(this, void 0, void 0, function() {
        var image, image, image;
        return __generator$1(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              if (!(params && params.type === "image"))
                return [3, 2];
              return [4, loadImage(params.source)];
            case 1:
              image = _a2.sent();
              return [2, image];
            case 2:
              if (!(params && params.type === "svg"))
                return [3, 4];
              return [4, loadSVG(params.source)];
            case 3:
              image = _a2.sent();
              return [2, image];
            case 4:
              if (!(params && params.type === "html"))
                return [3, 6];
              return [4, loadHTML(params.source, {
                width: params.elemW,
                height: params.elemH
              })];
            case 5:
              image = _a2.sent();
              return [2, image];
            case 6:
              throw Error("Element's source is not support!");
          }
        });
      });
    };
    return Loader2;
  }();
  var RendererEvent = function() {
    function RendererEvent2() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    RendererEvent2.prototype.on = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
      } else {
        this._listeners.set(eventKey, [callback]);
      }
    };
    RendererEvent2.prototype.off = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        if (Array.isArray(callbacks)) {
          for (var i = 0; i < (callbacks === null || callbacks === void 0 ? void 0 : callbacks.length); i++) {
            if (callbacks[i] === callback) {
              callbacks.splice(i, 1);
              break;
            }
          }
        }
        this._listeners.set(eventKey, callbacks || []);
      }
    };
    RendererEvent2.prototype.trigger = function(eventKey, arg) {
      var callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach(function(cb) {
          cb(arg);
        });
        return true;
      } else {
        return false;
      }
    };
    RendererEvent2.prototype.has = function(name) {
      if (this._listeners.has(name)) {
        var list = this._listeners.get(name);
        if (Array.isArray(list) && list.length > 0) {
          return true;
        }
      }
      return false;
    };
    return RendererEvent2;
  }();
  var _queue = Symbol("_queue");
  var _ctx = Symbol("_ctx");
  var _status = Symbol("_status");
  var _loader = Symbol("_loader");
  var _opts$2 = Symbol("_opts");
  var _freeze = Symbol("_freeze");
  var _drawFrame = Symbol("_drawFrame");
  var _retainQueueOneItem = Symbol("_retainQueueOneItem");
  var _a, _b, _c;
  var requestAnimationFrame = window.requestAnimationFrame;
  var DrawStatus;
  (function(DrawStatus2) {
    DrawStatus2["NULL"] = "null";
    DrawStatus2["FREE"] = "free";
    DrawStatus2["DRAWING"] = "drawing";
    DrawStatus2["FREEZE"] = "freeze";
  })(DrawStatus || (DrawStatus = {}));
  var Renderer = function(_super) {
    __extends(Renderer2, _super);
    function Renderer2(opts) {
      var _this = _super.call(this) || this;
      _this[_a] = [];
      _this[_b] = null;
      _this[_c] = DrawStatus.NULL;
      _this[_opts$2] = opts;
      _this[_loader] = new Loader({
        maxParallelNum: 6
      });
      _this[_loader].on("load", function(res) {
        _this[_drawFrame]();
        _this.trigger("load", { element: res.element });
      });
      _this[_loader].on("error", function(res) {
        _this.trigger("error", { element: res.element, error: res.error });
      });
      _this[_loader].on("complete", function() {
        _this.trigger("loadComplete", { t: Date.now() });
      });
      return _this;
    }
    Renderer2.prototype.render = function(target, originData, opts) {
      var _d = (opts || {}).changeResourceUUIDs, changeResourceUUIDs = _d === void 0 ? [] : _d;
      this[_status] = DrawStatus.FREE;
      var data = deepClone$3(originData);
      if (Array.isArray(data.elements)) {
        data.elements.forEach(function(elem) {
          if (!(typeof elem.uuid === "string" && elem.uuid)) {
            elem.uuid = createUUID();
          }
        });
      }
      if (!this[_ctx]) {
        if (this[_opts$2] && Object.prototype.toString.call(target) === "[object HTMLCanvasElement]") {
          var _e = this[_opts$2], width = _e.width, height = _e.height, contextWidth = _e.contextWidth, contextHeight = _e.contextHeight, devicePixelRatio_1 = _e.devicePixelRatio;
          var canvas = target;
          canvas.width = width * devicePixelRatio_1;
          canvas.height = height * devicePixelRatio_1;
          var ctx2d = canvas.getContext("2d");
          this[_ctx] = new Context(ctx2d, {
            width,
            height,
            contextWidth: contextWidth || width,
            contextHeight: contextHeight || height,
            devicePixelRatio: devicePixelRatio_1
          });
        } else if (target) {
          this[_ctx] = target;
        }
      }
      if ([DrawStatus.FREEZE].includes(this[_status])) {
        return;
      }
      var _data2 = deepClone$3({ data });
      this[_queue].push(_data2);
      this[_drawFrame]();
      this[_loader].load(data, changeResourceUUIDs || []);
    };
    Renderer2.prototype.getContext = function() {
      return this[_ctx];
    };
    Renderer2.prototype.thaw = function() {
      this[_status] = DrawStatus.FREE;
    };
    Renderer2.prototype[_a = _queue, _b = _ctx, _c = _status, _freeze] = function() {
      this[_status] = DrawStatus.FREEZE;
    };
    Renderer2.prototype[_drawFrame] = function() {
      var _this = this;
      if (this[_status] === DrawStatus.FREEZE) {
        return;
      }
      requestAnimationFrame(function() {
        if (_this[_status] === DrawStatus.FREEZE) {
          return;
        }
        var ctx = _this[_ctx];
        var item = _this[_queue][0];
        var isLastFrame = false;
        if (_this[_queue].length > 1) {
          item = _this[_queue].shift();
        } else {
          isLastFrame = true;
        }
        if (_this[_loader].isComplete() !== true) {
          _this[_drawFrame]();
          if (item && ctx) {
            drawContext(ctx, item.data, _this[_loader]);
          }
        } else if (item && ctx) {
          drawContext(ctx, item.data, _this[_loader]);
          _this[_retainQueueOneItem]();
          if (!isLastFrame) {
            _this[_drawFrame]();
          } else {
            _this[_status] = DrawStatus.FREE;
          }
        } else {
          _this[_status] = DrawStatus.FREE;
        }
        _this.trigger("drawFrame", { t: Date.now() });
        if (_this[_loader].isComplete() === true && _this[_queue].length === 1 && _this[_status] === DrawStatus.FREE) {
          if (ctx && _this[_queue][0] && _this[_queue][0].data) {
            drawContext(ctx, _this[_queue][0].data, _this[_loader]);
          }
          _this.trigger("drawFrameComplete", { t: Date.now() });
          _this[_freeze]();
        }
      });
    };
    Renderer2.prototype[_retainQueueOneItem] = function() {
      if (this[_queue].length <= 1) {
        return;
      }
      var lastOne = deepClone$3(this[_queue][this[_queue].length - 1]);
      this[_queue] = [lastOne];
    };
    return Renderer2;
  }(RendererEvent);
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
    return isColorStr$1(value);
  }
  function imageURL(value) {
    return typeof value === "string" && /^(http:\/\/|https:\/\/|\.\/|\/)/.test("".concat(value));
  }
  function imageBase64(value) {
    return typeof value === "string" && /^(data:image\/)/.test("".concat(value));
  }
  function imageSrc(value) {
    return imageBase64(value) || imageURL(value);
  }
  function svg(value) {
    return typeof value === "string" && /^(<svg[\s]{1,}|<svg>)/i.test("".concat(value).trim()) && /<\/[\s]{0,}svg>$/i.test("".concat(value).trim());
  }
  function html(value) {
    var result = false;
    if (typeof value === "string") {
      var div = document.createElement("div");
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
  var is = {
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
    var x2 = attrs2.x, y2 = attrs2.y, w2 = attrs2.w, h2 = attrs2.h, angle2 = attrs2.angle;
    if (!(is.x(x2) && is.y(y2) && is.w(w2) && is.h(h2) && is.angle(angle2))) {
      return false;
    }
    if (!(angle2 >= -360 && angle2 <= 360)) {
      return false;
    }
    return true;
  }
  function box(desc) {
    if (desc === void 0) {
      desc = {};
    }
    var borderColor = desc.borderColor, borderRadius2 = desc.borderRadius, borderWidth2 = desc.borderWidth;
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
    var bgColor = desc.bgColor;
    if (desc.hasOwnProperty("bgColor") && !is.color(bgColor)) {
      return false;
    }
    if (!box(desc)) {
      return false;
    }
    return true;
  }
  function circleDesc(desc) {
    var bgColor = desc.bgColor, borderColor = desc.borderColor, borderWidth2 = desc.borderWidth;
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
    var src = desc.src;
    if (!is.imageSrc(src)) {
      return false;
    }
    return true;
  }
  function svgDesc(desc) {
    var svg2 = desc.svg;
    if (!is.svg(svg2)) {
      return false;
    }
    return true;
  }
  function htmlDesc(desc) {
    var html2 = desc.html;
    if (!is.html(html2)) {
      return false;
    }
    return true;
  }
  function textDesc(desc) {
    var text2 = desc.text, color2 = desc.color, fontSize2 = desc.fontSize, lineHeight2 = desc.lineHeight, fontFamily2 = desc.fontFamily, textAlign2 = desc.textAlign, fontWeight2 = desc.fontWeight, bgColor = desc.bgColor, strokeWidth2 = desc.strokeWidth, strokeColor = desc.strokeColor;
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
  var check = {
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
    var p = {
      x: elem.x + elem.w / 2,
      y: elem.y + elem.h / 2
    };
    return p;
  }
  function calcRadian(center, start, end) {
    var startAngle = calcLineAngle(center, start);
    var endAngle = calcLineAngle(center, end);
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
    var x2 = p.x - center.x;
    var y2 = center.y - p.y;
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
  var defaultConfig = {
    elementWrapper: {
      color: "#2ab6f1",
      lockColor: "#aaaaaa",
      controllerSize: 6,
      lineWidth: 1,
      lineDash: [4, 3]
    }
  };
  function mergeConfig(config) {
    var result = deepClone$1(defaultConfig);
    if (config) {
      if (config.elementWrapper) {
        result.elementWrapper = __assign$4(__assign$4({}, result.elementWrapper), config.elementWrapper);
      }
    }
    return result;
  }
  var CoreEvent = function() {
    function CoreEvent2() {
      this._listeners = /* @__PURE__ */ new Map();
    }
    CoreEvent2.prototype.on = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
        this._listeners.set(eventKey, callbacks || []);
      } else {
        this._listeners.set(eventKey, [callback]);
      }
    };
    CoreEvent2.prototype.off = function(eventKey, callback) {
      if (this._listeners.has(eventKey)) {
        var callbacks = this._listeners.get(eventKey);
        if (Array.isArray(callbacks)) {
          for (var i = 0; i < (callbacks === null || callbacks === void 0 ? void 0 : callbacks.length); i++) {
            if (callbacks[i] === callback) {
              callbacks.splice(i, 1);
              break;
            }
          }
        }
        this._listeners.set(eventKey, callbacks || []);
      }
    };
    CoreEvent2.prototype.trigger = function(eventKey, arg) {
      var callbacks = this._listeners.get(eventKey);
      if (Array.isArray(callbacks)) {
        callbacks.forEach(function(cb) {
          cb(arg);
        });
        return true;
      } else {
        return false;
      }
    };
    CoreEvent2.prototype.has = function(name) {
      if (this._listeners.has(name)) {
        var list = this._listeners.get(name);
        if (Array.isArray(list) && list.length > 0) {
          return true;
        }
      }
      return false;
    };
    return CoreEvent2;
  }();
  function isChangeImageElementResource(before, after) {
    var _a2, _b2;
    return ((_a2 = before === null || before === void 0 ? void 0 : before.desc) === null || _a2 === void 0 ? void 0 : _a2.src) !== ((_b2 = after === null || after === void 0 ? void 0 : after.desc) === null || _b2 === void 0 ? void 0 : _b2.src);
  }
  function isChangeSVGElementResource(before, after) {
    var _a2, _b2;
    return ((_a2 = before === null || before === void 0 ? void 0 : before.desc) === null || _a2 === void 0 ? void 0 : _a2.svg) !== ((_b2 = after === null || after === void 0 ? void 0 : after.desc) === null || _b2 === void 0 ? void 0 : _b2.svg);
  }
  function isChangeHTMLElementResource(before, after) {
    var _a2, _b2, _c2, _d, _e, _f;
    return ((_a2 = before === null || before === void 0 ? void 0 : before.desc) === null || _a2 === void 0 ? void 0 : _a2.html) !== ((_b2 = after === null || after === void 0 ? void 0 : after.desc) === null || _b2 === void 0 ? void 0 : _b2.html) || ((_c2 = before === null || before === void 0 ? void 0 : before.desc) === null || _c2 === void 0 ? void 0 : _c2.width) !== ((_d = after === null || after === void 0 ? void 0 : after.desc) === null || _d === void 0 ? void 0 : _d.width) || ((_e = before === null || before === void 0 ? void 0 : before.desc) === null || _e === void 0 ? void 0 : _e.height) !== ((_f = after === null || after === void 0 ? void 0 : after.desc) === null || _f === void 0 ? void 0 : _f.height);
  }
  function diffElementResourceChange(before, after) {
    var result = null;
    var isChange = false;
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
    var _a2;
    var uuids = [];
    var beforeMap = parseDataElementMap(before);
    var afterMap = parseDataElementMap(after);
    for (var uuid in afterMap) {
      if (["image", "svg", "html"].includes((_a2 = afterMap[uuid]) === null || _a2 === void 0 ? void 0 : _a2.type) !== true) {
        continue;
      }
      if (beforeMap[uuid]) {
        var isChange = false;
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
    var elemMap = {};
    data.elements.forEach(function(elem) {
      elemMap[elem.uuid] = elem;
    });
    return elemMap;
  }
  function rotateElement(ctx, elem, callback) {
    var center = calcElementCenter(elem);
    var radian = parseAngleToRadian(elem.angle || 0);
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
    var numStr = num.toFixed(2);
    return parseFloat(numStr);
  }
  function limitAngle(angle2) {
    return limitNum(angle2 % 360);
  }
  var elementTypes = {
    "text": {},
    "rect": {},
    "image": {},
    "svg": {},
    "circle": {},
    "html": {}
  };
  var elementNames = Object.keys(elementTypes);
  var LIMIT_QBLIQUE_ANGLE = 15;
  var limitQbliqueAngle$1 = LIMIT_QBLIQUE_ANGLE;
  var Element = function() {
    function Element2(ctx) {
      this._ctx = ctx;
    }
    Element2.prototype.initData = function(data) {
      data.elements.forEach(function(elem) {
        if (!(elem.uuid && typeof elem.uuid === "string")) {
          elem.uuid = createUUID$1();
        }
      });
      return data;
    };
    Element2.prototype.isPointInElement = function(p, data) {
      var _a2, _b2;
      var ctx = this._ctx;
      var idx = -1;
      var uuid = null;
      var _loop_1 = function(i2) {
        var ele = data.elements[i2];
        if (((_a2 = ele.operation) === null || _a2 === void 0 ? void 0 : _a2.invisible) === true)
          return "continue";
        var bw = 0;
        if (((_b2 = ele.desc) === null || _b2 === void 0 ? void 0 : _b2.borderWidth) > 0) {
          bw = ele.desc.borderWidth;
        }
        rotateElement(ctx, ele, function() {
          ctx.beginPath();
          ctx.moveTo(ele.x - bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y - bw);
          ctx.closePath();
          if (ctx.isPointInPath(p.x, p.y)) {
            idx = i2;
            uuid = ele.uuid;
          }
        });
        if (idx >= 0) {
          return "break";
        }
      };
      for (var i = data.elements.length - 1; i >= 0; i--) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
          break;
      }
      return [idx, uuid];
    };
    Element2.prototype.dragElement = function(data, uuid, point, prevPoint, scale) {
      var index = this.getElementIndex(data, uuid);
      if (!data.elements[index]) {
        return;
      }
      var moveX = point.x - prevPoint.x;
      var moveY = point.y - prevPoint.y;
      data.elements[index].x += moveX / scale;
      data.elements[index].y += moveY / scale;
      this.limitElementAttrs(data.elements[index]);
    };
    Element2.prototype.transformElement = function(data, uuid, point, prevPoint, scale, direction) {
      var _a2, _b2;
      var index = this.getElementIndex(data, uuid);
      if (!data.elements[index]) {
        return null;
      }
      if (((_b2 = (_a2 = data.elements[index]) === null || _a2 === void 0 ? void 0 : _a2.operation) === null || _b2 === void 0 ? void 0 : _b2.lock) === true) {
        return null;
      }
      var moveX = (point.x - prevPoint.x) / scale;
      var moveY = (point.y - prevPoint.y) / scale;
      var elem = data.elements[index];
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
        var p = calcuScaleElemPosition(elem, moveX, moveY, direction);
        elem.x = p.x;
        elem.y = p.y;
        elem.w = p.w;
        elem.h = p.h;
      } else if (direction === "rotate") {
        var center = calcElementCenter(elem);
        var radian = calcRadian(center, prevPoint, point);
        elem.angle = (elem.angle || 0) + parseRadianToAngle(radian);
      }
      this.limitElementAttrs(elem);
      return {
        width: limitNum(elem.w),
        height: limitNum(elem.h),
        angle: limitAngle(elem.angle || 0)
      };
    };
    Element2.prototype.getElementIndex = function(data, uuid) {
      var idx = -1;
      for (var i = 0; i < data.elements.length; i++) {
        if (data.elements[i].uuid === uuid) {
          idx = i;
          break;
        }
      }
      return idx;
    };
    Element2.prototype.limitElementAttrs = function(elem) {
      elem.x = limitNum(elem.x);
      elem.y = limitNum(elem.y);
      elem.w = limitNum(elem.w);
      elem.h = limitNum(elem.h);
      elem.angle = limitAngle(elem.angle || 0);
    };
    return Element2;
  }();
  function calcuScaleElemPosition(elem, moveX, moveY, direction, scale) {
    var p = { x: elem.x, y: elem.y, w: elem.w, h: elem.h };
    elem.angle;
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
        if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
          if (p.h - moveY > 0) {
            p.y += moveY;
            p.h -= moveY;
          }
        } else if (elem.angle > 0 || elem.angle < 0) {
          var angle_1 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          var moveDist = calcMoveDist(moveX, moveY);
          var centerX = p.x + elem.w / 2;
          var centerY = p.y + elem.h / 2;
          if (angle_1 < 90) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_1);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          } else if (angle_1 < 180) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_1 - 90);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          } else if (angle_1 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_1 - 180);
            var centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          } else if (angle_1 < 360) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_1 - 270);
            var centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.cos(radian);
            centerY = centerY - centerMoveDist * Math.sin(radian);
          }
          if (p.h + moveDist > 0) {
            p.h = p.h + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (p.h - moveY > 0) {
            p.y += moveY;
            p.h -= moveY;
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
        if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
          if (elem.w + moveX > 0) {
            p.w += moveX;
          }
        } else if (elem.angle > 0 || elem.angle < 0) {
          var angle_2 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          var moveDist = calcMoveDist(moveX, moveY);
          var centerX = p.x + elem.w / 2;
          var centerY = p.y + elem.h / 2;
          if (angle_2 < 90) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_2);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          } else if (angle_2 < 180) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_2 - 90);
            var centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          } else if (angle_2 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_2 - 180);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
            moveDist = 0 - moveDist;
          } else if (angle_2 < 360) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_2 - 270);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          }
          if (p.w + moveDist > 0) {
            p.w = p.w + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (elem.w + moveX > 0) {
            p.w += moveX;
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
        if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
          if (elem.h + moveY > 0) {
            p.h += moveY;
          }
        } else if (elem.angle > 0 || elem.angle < 0) {
          var angle_3 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          var moveDist = calcMoveDist(moveX, moveY);
          var centerX = p.x + elem.w / 2;
          var centerY = p.y + elem.h / 2;
          if (angle_3 < 90) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_3);
            var centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          } else if (angle_3 < 180) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_3 - 90);
            var centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.cos(radian);
            centerY = centerY - centerMoveDist * Math.sin(radian);
          } else if (angle_3 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_3 - 180);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          } else if (angle_3 < 360) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_3 - 270);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          }
          if (p.h + moveDist > 0) {
            p.h = p.h + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (elem.h + moveY > 0) {
            p.h += moveY;
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
        if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
          if (elem.w - moveX > 0) {
            p.x += moveX;
            p.w -= moveX;
          }
        } else if (elem.angle > 0 || elem.angle < 0) {
          var angle_4 = elem.angle > 0 ? elem.angle : Math.max(0, elem.angle + 360);
          var moveDist = calcMoveDist(moveX, moveY);
          var centerX = p.x + elem.w / 2;
          var centerY = p.y + elem.h / 2;
          if (angle_4 < 90) {
            moveDist = 0 - changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_4);
            var centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.cos(radian);
            centerY = centerY - centerMoveDist * Math.sin(radian);
          } else if (angle_4 < 180) {
            moveDist = changeMoveDistDirect(moveDist, moveX);
            var radian = parseRadian(angle_4 - 90);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.sin(radian);
            centerY = centerY - centerMoveDist * Math.cos(radian);
          } else if (angle_4 < 270) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_4 - 180);
            var centerMoveDist = moveDist / 2;
            centerX = centerX + centerMoveDist * Math.cos(radian);
            centerY = centerY + centerMoveDist * Math.sin(radian);
          } else if (angle_4 < 360) {
            moveDist = changeMoveDistDirect(moveDist, moveY);
            var radian = parseRadian(angle_4 - 270);
            var centerMoveDist = moveDist / 2;
            centerX = centerX - centerMoveDist * Math.sin(radian);
            centerY = centerY + centerMoveDist * Math.cos(radian);
          }
          if (p.w + moveDist > 0) {
            p.w = p.w + moveDist;
            p.x = centerX - p.w / 2;
            p.y = centerY - p.h / 2;
          }
        } else {
          if (elem.w - moveX > 0) {
            p.x += moveX;
            p.w -= moveX;
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
  var limitQbliqueAngle = LIMIT_QBLIQUE_ANGLE;
  var Helper = function() {
    function Helper2(board, config) {
      this._areaStart = { x: 0, y: 0 };
      this._areaEnd = { x: 0, y: 0 };
      this._board = board;
      this._ctx = this._board.getContext();
      this._coreConfig = config;
      this._helperConfig = {
        elementIndexMap: {}
      };
    }
    Helper2.prototype.updateConfig = function(data, opts) {
      this._updateElementIndex(data);
      this._updateSelectedElementWrapper(data, opts);
      this._updateSelectedElementListWrapper(data, opts);
    };
    Helper2.prototype.getConfig = function() {
      return deepClone$1(this._helperConfig);
    };
    Helper2.prototype.getElementIndexByUUID = function(uuid) {
      var index = this._helperConfig.elementIndexMap[uuid];
      if (index >= 0) {
        return index;
      }
      return null;
    };
    Helper2.prototype.isPointInElementWrapperController = function(p, data) {
      var _a2, _b2;
      var ctx = this._ctx;
      var uuid = ((_b2 = (_a2 = this._helperConfig) === null || _a2 === void 0 ? void 0 : _a2.selectedElementWrapper) === null || _b2 === void 0 ? void 0 : _b2.uuid) || null;
      var directIndex = null;
      var selectedControllerDirection = null;
      var hoverControllerDirection = null;
      if (!this._helperConfig.selectedElementWrapper) {
        return { uuid, selectedControllerDirection, directIndex, hoverControllerDirection };
      }
      var wrapper = this._helperConfig.selectedElementWrapper;
      var controllers = [
        wrapper.controllers.right,
        wrapper.controllers.topRight,
        wrapper.controllers.top,
        wrapper.controllers.topLeft,
        wrapper.controllers.left,
        wrapper.controllers.bottomLeft,
        wrapper.controllers.bottom,
        wrapper.controllers.bottomRight
      ];
      var directionNames = [
        "right",
        "top-right",
        "top",
        "top-left",
        "left",
        "bottom-left",
        "bottom",
        "bottom-right"
      ];
      var hoverDirectionNames = deepClone$1(directionNames);
      var angleMoveNum = 0;
      if (data && uuid) {
        var elemIdx = this.getElementIndexByUUID(uuid);
        if (elemIdx !== null && elemIdx >= 0) {
          var elem = data.elements[elemIdx];
          var angle2 = elem.angle;
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
      rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function() {
        for (var i = 0; i < controllers.length; i++) {
          var controller = controllers[i];
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
        var controller_1 = wrapper.controllers.rotate;
        if (controller_1.invisible !== true) {
          rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function() {
            ctx.beginPath();
            ctx.arc(controller_1.x, controller_1.y, wrapper.controllerSize, 0, Math.PI * 2);
            ctx.closePath();
            if (ctx.isPointInPath(p.x, p.y)) {
              selectedControllerDirection = "rotate";
              hoverControllerDirection = "rotate";
            }
          });
        }
      }
      return { uuid, selectedControllerDirection, hoverControllerDirection, directIndex };
    };
    Helper2.prototype.isPointInElementList = function(p, data) {
      var _a2, _b2, _c2;
      var ctx = this._ctx;
      var idx = -1;
      var uuid = null;
      var wrapperList = ((_a2 = this._helperConfig) === null || _a2 === void 0 ? void 0 : _a2.selectedElementListWrappers) || [];
      var _loop_1 = function(i2) {
        var wrapper = wrapperList[i2];
        var elemIdx = this_1._helperConfig.elementIndexMap[wrapper.uuid];
        var ele = data.elements[elemIdx];
        if (!ele)
          return "continue";
        if (((_b2 = ele.operation) === null || _b2 === void 0 ? void 0 : _b2.invisible) === true)
          return "continue";
        var bw = 0;
        if (((_c2 = ele.desc) === null || _c2 === void 0 ? void 0 : _c2.borderWidth) > 0) {
          bw = ele.desc.borderWidth;
        }
        rotateElement(ctx, ele, function() {
          ctx.beginPath();
          ctx.moveTo(ele.x - bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y - bw);
          ctx.lineTo(ele.x + ele.w + bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y + ele.h + bw);
          ctx.lineTo(ele.x - bw, ele.y - bw);
          ctx.closePath();
          if (ctx.isPointInPath(p.x, p.y)) {
            idx = i2;
            uuid = ele.uuid;
          }
        });
        if (idx >= 0) {
          return "break";
        }
      };
      var this_1 = this;
      for (var i = 0; i < wrapperList.length; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
          break;
      }
      if (uuid && idx >= 0) {
        return true;
      } else {
        return false;
      }
    };
    Helper2.prototype.startSelectArea = function(p) {
      this._areaStart = p;
      this._areaEnd = p;
    };
    Helper2.prototype.changeSelectArea = function(p) {
      this._areaEnd = p;
      this._calcSelectedArea();
    };
    Helper2.prototype.clearSelectedArea = function() {
      this._areaStart = { x: 0, y: 0 };
      this._areaEnd = { x: 0, y: 0 };
      this._calcSelectedArea();
    };
    Helper2.prototype.calcSelectedElements = function(data) {
      var transform = this._ctx.getTransform();
      var _a2 = transform.scale, scale = _a2 === void 0 ? 1 : _a2, _b2 = transform.scrollX, scrollX = _b2 === void 0 ? 0 : _b2, _c2 = transform.scrollY, scrollY = _c2 === void 0 ? 0 : _c2;
      var start = this._areaStart;
      var end = this._areaEnd;
      var x2 = (Math.min(start.x, end.x) - scrollX) / scale;
      var y2 = (Math.min(start.y, end.y) - scrollY) / scale;
      var w2 = Math.abs(end.x - start.x) / scale;
      var h2 = Math.abs(end.y - start.y) / scale;
      var uuids = [];
      var ctx = this._ctx;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 + w2, y2);
      ctx.lineTo(x2 + w2, y2 + h2);
      ctx.lineTo(x2, y2 + h2);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      data.elements.forEach(function(elem) {
        var _a3;
        if (((_a3 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a3 === void 0 ? void 0 : _a3.invisible) !== true) {
          var centerX = elem.x + elem.w / 2;
          var centerY = elem.y + elem.h / 2;
          if (ctx.isPointInPathWithoutScroll(centerX, centerY)) {
            uuids.push(elem.uuid);
          }
        }
      });
      return uuids;
    };
    Helper2.prototype._calcSelectedArea = function() {
      var start = this._areaStart;
      var end = this._areaEnd;
      var transform = this._ctx.getTransform();
      var _a2 = transform.scale, scale = _a2 === void 0 ? 1 : _a2, _b2 = transform.scrollX, scrollX = _b2 === void 0 ? 0 : _b2, _c2 = transform.scrollY, scrollY = _c2 === void 0 ? 0 : _c2;
      var elemWrapper = this._coreConfig.elementWrapper;
      var lineWidth = elemWrapper.lineWidth / scale;
      var lineDash = elemWrapper.lineDash.map(function(n) {
        return n / scale;
      });
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
    };
    Helper2.prototype._updateElementIndex = function(data) {
      var _this = this;
      this._helperConfig.elementIndexMap = {};
      data.elements.forEach(function(elem, i) {
        _this._helperConfig.elementIndexMap[elem.uuid] = i;
      });
    };
    Helper2.prototype._updateSelectedElementWrapper = function(data, opts) {
      var _a2;
      var uuid = opts.selectedUUID;
      if (!(typeof uuid === "string" && this._helperConfig.elementIndexMap[uuid] >= 0)) {
        delete this._helperConfig.selectedElementWrapper;
        return;
      }
      var index = this._helperConfig.elementIndexMap[uuid];
      var elem = data.elements[index];
      if (((_a2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a2 === void 0 ? void 0 : _a2.invisible) === true) {
        return;
      }
      var wrapper = this._createSelectedElementWrapper(elem, opts);
      this._helperConfig.selectedElementWrapper = wrapper;
    };
    Helper2.prototype._updateSelectedElementListWrapper = function(data, opts) {
      var _this = this;
      var selectedUUIDList = opts.selectedUUIDList;
      var wrapperList = [];
      data.elements.forEach(function(elem, i) {
        if (selectedUUIDList === null || selectedUUIDList === void 0 ? void 0 : selectedUUIDList.includes(elem.uuid)) {
          var wrapper = _this._createSelectedElementWrapper(elem, opts);
          wrapperList.push(wrapper);
        }
      });
      this._helperConfig.selectedElementListWrappers = wrapperList;
    };
    Helper2.prototype._createSelectedElementWrapper = function(elem, opts) {
      var _a2, _b2, _c2, _d, _e, _f, _g, _h, _j, _k, _l, _m;
      var scale = opts.scale;
      var elemWrapper = this._coreConfig.elementWrapper;
      var controllerSize = elemWrapper.controllerSize / scale;
      var lineWidth = elemWrapper.lineWidth / scale;
      var lineDash = elemWrapper.lineDash.map(function(n) {
        return n / scale;
      });
      var rotateLimit = 12;
      var bw = ((_a2 = elem.desc) === null || _a2 === void 0 ? void 0 : _a2.borderWidth) || 0;
      var hideObliqueDirection = false;
      if (typeof elem.angle === "number" && Math.abs(elem.angle) > limitQbliqueAngle) {
        hideObliqueDirection = true;
      }
      var controllerOffset = lineWidth;
      var wrapper = {
        uuid: elem.uuid,
        controllerSize,
        controllerOffset,
        lock: ((_b2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b2 === void 0 ? void 0 : _b2.lock) === true,
        controllers: {
          topLeft: {
            x: elem.x - controllerOffset - bw,
            y: elem.y - controllerOffset - bw,
            invisible: hideObliqueDirection || ((_c2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _c2 === void 0 ? void 0 : _c2.disbaleScale) === true
          },
          top: {
            x: elem.x + elem.w / 2,
            y: elem.y - controllerOffset - bw,
            invisible: ((_d = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _d === void 0 ? void 0 : _d.disbaleScale) === true
          },
          topRight: {
            x: elem.x + elem.w + controllerOffset + bw,
            y: elem.y - controllerOffset - bw,
            invisible: hideObliqueDirection || ((_e = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _e === void 0 ? void 0 : _e.disbaleScale) === true
          },
          right: {
            x: elem.x + elem.w + controllerOffset + bw,
            y: elem.y + elem.h / 2,
            invisible: ((_f = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _f === void 0 ? void 0 : _f.disbaleScale) === true
          },
          bottomRight: {
            x: elem.x + elem.w + controllerOffset + bw,
            y: elem.y + elem.h + controllerOffset + bw,
            invisible: hideObliqueDirection || ((_g = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _g === void 0 ? void 0 : _g.disbaleScale) === true
          },
          bottom: {
            x: elem.x + elem.w / 2,
            y: elem.y + elem.h + controllerOffset + bw,
            invisible: ((_h = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _h === void 0 ? void 0 : _h.disbaleScale) === true
          },
          bottomLeft: {
            x: elem.x - controllerOffset - bw,
            y: elem.y + elem.h + controllerOffset + bw,
            invisible: hideObliqueDirection || ((_j = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _j === void 0 ? void 0 : _j.disbaleScale) === true
          },
          left: {
            x: elem.x - controllerOffset - bw,
            y: elem.y + elem.h / 2,
            invisible: ((_k = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _k === void 0 ? void 0 : _k.disbaleScale) === true
          },
          rotate: {
            x: elem.x + elem.w / 2,
            y: elem.y - controllerSize - (controllerSize * 2 + rotateLimit) - bw,
            invisible: ((_l = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _l === void 0 ? void 0 : _l.disbaleRotate) === true
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
    };
    return Helper2;
  }();
  var _board$1 = Symbol("_displayCtx");
  var _helper = Symbol("_helper");
  var _element$1 = Symbol("_element");
  var _opts$1 = Symbol("_opts");
  var Mapper = function() {
    function Mapper2(opts) {
      this[_opts$1] = opts;
      this[_board$1] = this[_opts$1].board;
      this[_element$1] = this[_opts$1].element;
      this[_helper] = this[_opts$1].helper;
    }
    Mapper2.prototype.isEffectivePoint = function(p) {
      var scrollLineWidth = this[_board$1].getScrollLineWidth();
      var screenInfo = this[_board$1].getScreenInfo();
      if (p.x <= screenInfo.width - scrollLineWidth && p.y <= screenInfo.height - scrollLineWidth) {
        return true;
      }
      return false;
    };
    Mapper2.prototype.judgePointCursor = function(p, data) {
      var cursor = "auto";
      var elementUUID = null;
      if (!this.isEffectivePoint(p)) {
        return { cursor, elementUUID };
      }
      var _a2 = this[_helper].isPointInElementWrapperController(p, data), uuid = _a2.uuid, hoverControllerDirection = _a2.hoverControllerDirection;
      var direction = hoverControllerDirection;
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
        var _b2 = this[_element$1].isPointInElement(p, data), index = _b2[0], uuid_1 = _b2[1];
        if (index >= 0) {
          cursor = "move";
        }
        if (uuid_1) {
          elementUUID = uuid_1;
        }
      }
      return {
        cursor,
        elementUUID
      };
    };
    return Mapper2;
  }();
  function parseData(data) {
    var result = {
      elements: []
    };
    if (Array.isArray(data === null || data === void 0 ? void 0 : data.elements)) {
      data === null || data === void 0 ? void 0 : data.elements.forEach(function(elem) {
        if (elem === void 0) {
          elem = {};
        }
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
  var TempData$1 = function() {
    function TempData2() {
      this._temp = createData$1();
    }
    TempData2.prototype.set = function(name, value) {
      this._temp[name] = value;
    };
    TempData2.prototype.get = function(name) {
      return this._temp[name];
    };
    TempData2.prototype.clear = function() {
      this._temp = createData$1();
    };
    return TempData2;
  }();
  var _board = Symbol("_board");
  var _data = Symbol("_data");
  var _opts = Symbol("_opts");
  var _config = Symbol("_config");
  var _renderer = Symbol("_renderer");
  var _element = Symbol("_element");
  var _tempData = Symbol("_tempData");
  var _draw = Symbol("_draw");
  var _coreEvent = Symbol("_coreEvent");
  var _emitChangeScreen = Symbol("_emitChangeScreen");
  var _emitChangeData = Symbol("_emitChangeData");
  var _engine = Symbol("_engine");
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
    var elems = [];
    var list = [];
    var uuid = core[_engine].temp.get("selectedUUID");
    if (typeof uuid === "string" && uuid) {
      list.push(uuid);
    } else {
      list = core[_engine].temp.get("selectedUUIDList");
    }
    list.forEach(function(uuid2) {
      var _a2;
      var index = core[_engine].helper.getElementIndexByUUID(uuid2);
      if (index !== null && index >= 0) {
        var elem = (_a2 = core[_data]) === null || _a2 === void 0 ? void 0 : _a2.elements[index];
        if (elem)
          elems.push(elem);
      }
    });
    return deepClone$1(elems);
  }
  function getElement(core, uuid) {
    var elem = null;
    var index = core[_engine].helper.getElementIndexByUUID(uuid);
    if (index !== null && core[_data].elements[index]) {
      elem = deepClone$1(core[_data].elements[index]);
    }
    return elem;
  }
  function getElementByIndex(core, index) {
    var elem = null;
    if (index >= 0 && core[_data].elements[index]) {
      elem = deepClone$1(core[_data].elements[index]);
    }
    return elem;
  }
  function updateElement(core, elem) {
    var _a2;
    var _elem = deepClone$1(elem);
    var data = core[_data];
    var resourceChangeUUIDs = [];
    for (var i = 0; i < data.elements.length; i++) {
      if (_elem.uuid === ((_a2 = data.elements[i]) === null || _a2 === void 0 ? void 0 : _a2.uuid)) {
        var result = diffElementResourceChange(data.elements[i], _elem);
        if (typeof result === "string") {
          resourceChangeUUIDs.push(result);
        }
        data.elements[i] = _elem;
        break;
      }
    }
    core[_emitChangeData]();
    core[_draw]({ resourceChangeUUIDs });
  }
  function selectElementByIndex(core, index, opts) {
    if (core[_data].elements[index]) {
      var uuid = core[_data].elements[index].uuid;
      if ((opts === null || opts === void 0 ? void 0 : opts.useMode) === true) {
        core[_engine].temp.set("mode", Mode.SELECT_ELEMENT);
      } else {
        core[_engine].temp.set("mode", Mode.NULL);
      }
      if (typeof uuid === "string") {
        core[_engine].temp.set("selectedUUID", uuid);
        core[_engine].temp.set("selectedUUIDList", []);
      }
      core[_draw]();
    }
  }
  function selectElement(core, uuid, opts) {
    var index = core[_engine].helper.getElementIndexByUUID(uuid);
    if (typeof index === "number" && index >= 0) {
      core.selectElementByIndex(index, opts);
    }
  }
  function moveUpElement(core, uuid) {
    var index = core[_engine].helper.getElementIndexByUUID(uuid);
    if (typeof index === "number" && index >= 0 && index < core[_data].elements.length - 1) {
      var temp = core[_data].elements[index];
      core[_data].elements[index] = core[_data].elements[index + 1];
      core[_data].elements[index + 1] = temp;
    }
    core[_emitChangeData]();
    core[_draw]();
  }
  function moveDownElement(core, uuid) {
    var index = core[_engine].helper.getElementIndexByUUID(uuid);
    if (typeof index === "number" && index > 0 && index < core[_data].elements.length) {
      var temp = core[_data].elements[index];
      core[_data].elements[index] = core[_data].elements[index - 1];
      core[_data].elements[index - 1] = temp;
    }
    core[_emitChangeData]();
    core[_draw]();
  }
  function addElement(core, elem) {
    var _elem = deepClone$1(elem);
    _elem.uuid = createUUID$1();
    core[_data].elements.push(_elem);
    core[_emitChangeData]();
    core[_draw]();
    return _elem.uuid;
  }
  function deleteElement(core, uuid) {
    var index = core[_element].getElementIndex(core[_data], uuid);
    if (index >= 0) {
      core[_data].elements.splice(index, 1);
      core[_emitChangeData]();
      core[_draw]();
    }
  }
  function insertElementBefore(core, elem, beforeUUID) {
    var index = core[_engine].helper.getElementIndexByUUID(beforeUUID);
    if (index !== null) {
      return core.insertElementBeforeIndex(elem, index);
    }
    return null;
  }
  function insertElementBeforeIndex(core, elem, index) {
    var _elem = deepClone$1(elem);
    _elem.uuid = createUUID$1();
    if (index >= 0) {
      core[_data].elements.splice(index, 0, _elem);
      core[_emitChangeData]();
      core[_draw]();
      return _elem.uuid;
    }
    return null;
  }
  function insertElementAfter(core, elem, beforeUUID) {
    var index = core[_engine].helper.getElementIndexByUUID(beforeUUID);
    if (index !== null) {
      return core.insertElementAfterIndex(elem, index);
    }
    return null;
  }
  function insertElementAfterIndex(core, elem, index) {
    var _elem = deepClone$1(elem);
    _elem.uuid = createUUID$1();
    if (index >= 0) {
      core[_data].elements.splice(index + 1, 0, _elem);
      core[_emitChangeData]();
      core[_draw]();
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
      prevPoint: null
    };
  }
  var TempData$3 = function() {
    function TempData2() {
      this._temp = createData();
    }
    TempData2.prototype.set = function(name, value) {
      this._temp[name] = value;
    };
    TempData2.prototype.get = function(name) {
      return this._temp[name];
    };
    TempData2.prototype.clear = function() {
      this._temp = createData();
    };
    return TempData2;
  }();
  var Engine = function() {
    function Engine2(opts) {
      this._plugins = [];
      var board = opts.board, config = opts.config, element = opts.element;
      var helper = new Helper(board, config);
      this._opts = opts;
      this.temp = new TempData$3();
      this.helper = helper;
      this._mapper = new Mapper({ board, helper, element });
    }
    Engine2.prototype.addPlugin = function(plugin) {
      this._plugins.push(plugin);
    };
    Engine2.prototype.getHelperConfig = function() {
      return this.helper.getConfig();
    };
    Engine2.prototype.updateHelperConfig = function(opts) {
      var _a2;
      var _b2 = this._opts, board = _b2.board, getDataFeekback = _b2.getDataFeekback, config = _b2.config;
      var data = getDataFeekback();
      var transform = board.getTransform();
      this.helper.updateConfig(data, {
        width: opts.width,
        height: opts.height,
        devicePixelRatio: opts.devicePixelRatio,
        canScroll: ((_a2 = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _a2 === void 0 ? void 0 : _a2.use) === true,
        selectedUUID: this.temp.get("selectedUUID"),
        selectedUUIDList: this.temp.get("selectedUUIDList"),
        scale: transform.scale,
        scrollX: transform.scrollX,
        scrollY: transform.scrollY
      });
    };
    Engine2.prototype.init = function() {
      this._initEvent();
    };
    Engine2.prototype._initEvent = function() {
      if (this.temp.get("hasInited") === true) {
        return;
      }
      var board = this._opts.board;
      board.on("hover", throttle$1(this._handleHover.bind(this), 32));
      board.on("leave", throttle$1(this._handleLeave.bind(this), 32));
      board.on("point", throttle$1(this._handleClick.bind(this), 16));
      board.on("doubleClick", this._handleDoubleClick.bind(this));
      board.on("point", this._handlePoint.bind(this));
      board.on("moveStart", this._handleMoveStart.bind(this));
      board.on("move", throttle$1(this._handleMove.bind(this), 16));
      board.on("moveEnd", this._handleMoveEnd.bind(this));
    };
    Engine2.prototype._handleDoubleClick = function(point) {
      var _a2, _b2, _c2;
      var _d = this._opts, element = _d.element, getDataFeekback = _d.getDataFeekback, drawFeekback = _d.drawFeekback, coreEvent = _d.coreEvent;
      var data = getDataFeekback();
      var _e = element.isPointInElement(point, data), index = _e[0], uuid = _e[1];
      if (index >= 0 && uuid) {
        var elem = deepClone$1((_a2 = data.elements) === null || _a2 === void 0 ? void 0 : _a2[index]);
        if (((_b2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b2 === void 0 ? void 0 : _b2.invisible) !== true) {
          coreEvent.trigger("screenDoubleClickElement", { index, uuid, element: deepClone$1((_c2 = data.elements) === null || _c2 === void 0 ? void 0 : _c2[index]) });
        }
      }
      drawFeekback();
    };
    Engine2.prototype._handlePoint = function(point) {
      var _a2, _b2, _c2;
      if (!this._mapper.isEffectivePoint(point)) {
        return;
      }
      var _d = this._opts, element = _d.element, getDataFeekback = _d.getDataFeekback, selectElementByIndex2 = _d.selectElementByIndex, coreEvent = _d.coreEvent, emitChangeScreen = _d.emitChangeScreen, drawFeekback = _d.drawFeekback;
      var helper = this.helper;
      var data = getDataFeekback();
      if (helper.isPointInElementList(point, data)) {
        this.temp.set("mode", Mode.SELECT_ELEMENT_LIST);
      } else {
        var _e = helper.isPointInElementWrapperController(point, data), uuid = _e.uuid, selectedControllerDirection = _e.selectedControllerDirection;
        if (uuid && selectedControllerDirection) {
          this.temp.set("mode", Mode.SELECT_ELEMENT_WRAPPER_CONTROLLER);
          this.temp.set("selectedControllerDirection", selectedControllerDirection);
          this.temp.set("selectedUUID", uuid);
        } else {
          var _f = element.isPointInElement(point, data), index = _f[0], uuid_1 = _f[1];
          if (index >= 0 && ((_b2 = (_a2 = data.elements[index]) === null || _a2 === void 0 ? void 0 : _a2.operation) === null || _b2 === void 0 ? void 0 : _b2.invisible) !== true) {
            selectElementByIndex2(index, { useMode: true });
            if (typeof uuid_1 === "string" && coreEvent.has("screenSelectElement")) {
              coreEvent.trigger("screenSelectElement", { index, uuid: uuid_1, element: deepClone$1((_c2 = data.elements) === null || _c2 === void 0 ? void 0 : _c2[index]) });
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
    };
    Engine2.prototype._handleClick = function(point) {
      var _a2;
      var _b2 = this._opts, element = _b2.element, getDataFeekback = _b2.getDataFeekback, coreEvent = _b2.coreEvent, drawFeekback = _b2.drawFeekback;
      var data = getDataFeekback();
      var _c2 = element.isPointInElement(point, data), index = _c2[0], uuid = _c2[1];
      if (index >= 0 && uuid) {
        coreEvent.trigger("screenClickElement", { index, uuid, element: deepClone$1((_a2 = data.elements) === null || _a2 === void 0 ? void 0 : _a2[index]) });
      }
      drawFeekback();
    };
    Engine2.prototype._handleMoveStart = function(point) {
      var _a2 = this._opts, element = _a2.element, getDataFeekback = _a2.getDataFeekback, coreEvent = _a2.coreEvent;
      var data = getDataFeekback();
      var helper = this.helper;
      this.temp.set("prevPoint", point);
      var uuid = this.temp.get("selectedUUID");
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
    };
    Engine2.prototype._handleMove = function(point) {
      var drawFeekback = this._opts.drawFeekback;
      var helper = this.helper;
      if (this.temp.get("mode") === Mode.SELECT_ELEMENT_LIST) {
        this._dragElements(this.temp.get("selectedUUIDList"), point, this.temp.get("prevPoint"));
        drawFeekback();
        this.temp.set("cursorStatus", CursorStatus.DRAGGING);
      } else if (typeof this.temp.get("selectedUUID") === "string") {
        if (this.temp.get("mode") === Mode.SELECT_ELEMENT) {
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
    };
    Engine2.prototype._dragElements = function(uuids, point, prevPoint) {
      if (!prevPoint) {
        return;
      }
      var _a2 = this._opts, board = _a2.board, element = _a2.element, getDataFeekback = _a2.getDataFeekback, drawFeekback = _a2.drawFeekback;
      var data = getDataFeekback();
      var helper = this.helper;
      uuids.forEach(function(uuid) {
        var _a3, _b2;
        var idx = helper.getElementIndexByUUID(uuid);
        if (idx === null)
          return;
        var elem = data.elements[idx];
        if (((_a3 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a3 === void 0 ? void 0 : _a3.lock) !== true && ((_b2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b2 === void 0 ? void 0 : _b2.invisible) !== true) {
          element.dragElement(data, uuid, point, prevPoint, board.getContext().getTransform().scale);
        }
      });
      drawFeekback();
    };
    Engine2.prototype._transfromElement = function(uuid, point, prevPoint, direction) {
      if (!prevPoint) {
        return null;
      }
      var _a2 = this._opts, board = _a2.board, element = _a2.element, getDataFeekback = _a2.getDataFeekback, drawFeekback = _a2.drawFeekback;
      var data = getDataFeekback();
      var result = element.transformElement(data, uuid, point, prevPoint, board.getContext().getTransform().scale, direction);
      drawFeekback();
      return result;
    };
    Engine2.prototype._handleMoveEnd = function(point) {
      var _a2 = this._opts, element = _a2.element, getDataFeekback = _a2.getDataFeekback, coreEvent = _a2.coreEvent, drawFeekback = _a2.drawFeekback, emitChangeData = _a2.emitChangeData;
      var data = getDataFeekback();
      var helper = this.helper;
      var uuid = this.temp.get("selectedUUID");
      if (typeof uuid === "string") {
        var index = element.getElementIndex(data, uuid);
        var elem = data.elements[index];
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
          emitChangeData();
        }
      } else if (this.temp.get("mode") === Mode.SELECT_AREA) {
        var uuids = helper.calcSelectedElements(data);
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
    };
    Engine2.prototype._handleHover = function(point) {
      var _a2, _b2;
      var isMouseOverElement = false;
      var _c2 = this._opts, board = _c2.board, getDataFeekback = _c2.getDataFeekback, coreEvent = _c2.coreEvent;
      var data = getDataFeekback();
      var helper = this.helper;
      var mapper = this._mapper;
      if (this.temp.get("mode") === Mode.SELECT_AREA) {
        board.resetCursor();
      } else if (this.temp.get("cursorStatus") === CursorStatus.NULL) {
        var _d = mapper.judgePointCursor(point, data), cursor = _d.cursor, elementUUID = _d.elementUUID;
        board.setCursor(cursor);
        if (elementUUID) {
          var index = helper.getElementIndexByUUID(elementUUID);
          if (index !== null && index >= 0) {
            var elem = data.elements[index];
            if (((_a2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a2 === void 0 ? void 0 : _a2.lock) === true || ((_b2 = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b2 === void 0 ? void 0 : _b2.invisible) === true) {
              board.resetCursor();
              return;
            }
            if (this.temp.get("hoverUUID") !== elem.uuid) {
              var preIndex = helper.getElementIndexByUUID(this.temp.get("hoverUUID") || "");
              if (preIndex !== null && data.elements[preIndex]) {
                coreEvent.trigger("mouseLeaveElement", {
                  uuid: this.temp.get("hoverUUID"),
                  index: preIndex,
                  element: data.elements[preIndex]
                });
              }
            }
            if (elem) {
              coreEvent.trigger("mouseOverElement", { uuid: elem.uuid, index, element: elem });
              this.temp.set("hoverUUID", elem.uuid);
              isMouseOverElement = true;
            }
          }
        }
      }
      if (isMouseOverElement !== true && this.temp.get("hoverUUID") !== null) {
        var uuid = this.temp.get("hoverUUID");
        var index = helper.getElementIndexByUUID(uuid || "");
        if (index !== null)
          coreEvent.trigger("mouseLeaveElement", { uuid, index, element: data.elements[index] });
        this.temp.set("hoverUUID", null);
      }
      if (coreEvent.has("mouseOverScreen"))
        coreEvent.trigger("mouseOverScreen", point);
    };
    Engine2.prototype._handleLeave = function() {
      var coreEvent = this._opts.coreEvent;
      if (coreEvent.has("mouseLeaveScreen")) {
        coreEvent.trigger("mouseLeaveScreen", void 0);
      }
    };
    return Engine2;
  }();
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
    var wrapper = config.selectedElementWrapper;
    clearContext(ctx);
    rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function() {
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
          ctx.setLineWidth(wrapper.controllerSize / 2);
          ctx.arc(wrapper.controllers.rotate.x, wrapper.controllers.rotate.y, wrapper.controllerSize * 0.8, Math.PI / 6, Math.PI * 2);
          ctx.stroke();
          ctx.closePath();
        }
        ctx.setFillStyle(wrapper.color);
        [
          wrapper.controllers.topLeft,
          wrapper.controllers.top,
          wrapper.controllers.topRight,
          wrapper.controllers.right,
          wrapper.controllers.bottomRight,
          wrapper.controllers.bottom,
          wrapper.controllers.bottomLeft,
          wrapper.controllers.left
        ].forEach(function(controller) {
          if (controller.invisible !== true) {
            ctx.beginPath();
            ctx.arc(controller.x, controller.y, wrapper.controllerSize, 0, Math.PI * 2);
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
        ].forEach(function(controller) {
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
    var wrapper = config.selectedAreaWrapper;
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
    var wrapperList = config.selectedElementListWrappers;
    wrapperList === null || wrapperList === void 0 ? void 0 : wrapperList.forEach(function(wrapper) {
      clearContext(ctx);
      rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function() {
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
          ].forEach(function(controller) {
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
  var Core = function() {
    function Core2(mount, opts, config) {
      var _this = this;
      var _c2, _d, _e;
      this[_a2] = new CoreEvent();
      this[_b2] = new TempData$1();
      this[_data] = { elements: [] };
      this[_opts] = opts;
      this[_config] = mergeConfig(config || {});
      this[_board] = new Board(mount, __assign$4(__assign$4({}, this[_opts]), { canScroll: (_c2 = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _c2 === void 0 ? void 0 : _c2.use, scrollConfig: {
        color: ((_d = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _d === void 0 ? void 0 : _d.color) || "#a0a0a0",
        lineWidth: ((_e = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _e === void 0 ? void 0 : _e.lineWidth) || 12
      } }));
      this[_renderer] = new Renderer();
      var drawFrame = function() {
        var helperCtx = _this[_board].getHelperContext();
        var helperConfig = _this[_engine].getHelperConfig();
        _this[_board].clear();
        var _c3 = _this[_opts], contextWidth = _c3.contextWidth, contextHeight = _c3.contextHeight, devicePixelRatio = _c3.devicePixelRatio;
        helperCtx.clearRect(0, 0, contextWidth * devicePixelRatio, contextHeight * devicePixelRatio);
        drawElementWrapper(helperCtx, helperConfig);
        drawAreaWrapper(helperCtx, helperConfig);
        drawElementListWrappers(helperCtx, helperConfig);
        _this[_board].draw();
      };
      this[_renderer].on("drawFrame", function(e) {
        drawFrame();
      });
      this[_renderer].on("drawFrameComplete", function(e) {
        drawFrame();
      });
      this[_element] = new Element(this[_board].getContext());
      this[_engine] = new Engine({
        coreEvent: this[_coreEvent],
        board: this[_board],
        element: this[_element],
        config: this[_config],
        drawFeekback: this[_draw].bind(this),
        getDataFeekback: function() {
          return _this[_data];
        },
        selectElementByIndex: this.selectElementByIndex.bind(this),
        emitChangeScreen: this[_emitChangeScreen].bind(this),
        emitChangeData: this[_emitChangeData].bind(this)
      });
      this[_engine].init();
      this[_renderer].on("drawFrame", function() {
        _this[_coreEvent].trigger("drawFrame", void 0);
      });
      this[_renderer].on("drawFrameComplete", function() {
        _this[_coreEvent].trigger("drawFrameComplete", void 0);
      });
      this[_tempData].set("hasInited", true);
    }
    Core2.prototype[_a2 = _coreEvent, _b2 = _tempData, _draw] = function(opts) {
      this[_engine].updateHelperConfig({
        width: this[_opts].width,
        height: this[_opts].height,
        devicePixelRatio: this[_opts].devicePixelRatio
      });
      this[_renderer].thaw();
      this[_renderer].render(this[_board].getContext(), this[_data], {
        changeResourceUUIDs: (opts === null || opts === void 0 ? void 0 : opts.resourceChangeUUIDs) || []
      });
    };
    Core2.prototype.getElement = function(uuid) {
      return getElement(this, uuid);
    };
    Core2.prototype.getElementByIndex = function(index) {
      return getElementByIndex(this, index);
    };
    Core2.prototype.selectElementByIndex = function(index, opts) {
      return selectElementByIndex(this, index, opts);
    };
    Core2.prototype.selectElement = function(uuid, opts) {
      return selectElement(this, uuid, opts);
    };
    Core2.prototype.moveUpElement = function(uuid) {
      return moveUpElement(this, uuid);
    };
    Core2.prototype.moveDownElement = function(uuid) {
      return moveDownElement(this, uuid);
    };
    Core2.prototype.updateElement = function(elem) {
      return updateElement(this, elem);
    };
    Core2.prototype.addElement = function(elem) {
      return addElement(this, elem);
    };
    Core2.prototype.deleteElement = function(uuid) {
      return deleteElement(this, uuid);
    };
    Core2.prototype.insertElementBefore = function(elem, beforeUUID) {
      return insertElementBefore(this, elem, beforeUUID);
    };
    Core2.prototype.insertElementBeforeIndex = function(elem, index) {
      return insertElementBeforeIndex(this, elem, index);
    };
    Core2.prototype.getSelectedElements = function() {
      return getSelectedElements(this);
    };
    Core2.prototype.insertElementAfter = function(elem, beforeUUID) {
      return insertElementAfter(this, elem, beforeUUID);
    };
    Core2.prototype.insertElementAfterIndex = function(elem, index) {
      return insertElementAfterIndex(this, elem, index);
    };
    Core2.prototype.resetSize = function(opts) {
      this[_opts] = __assign$4(__assign$4({}, this[_opts]), opts);
      this[_board].resetSize(opts);
      this[_draw]();
    };
    Core2.prototype.scale = function(ratio) {
      var screen = this[_board].scale(ratio);
      this[_draw]();
      this[_emitChangeScreen]();
      return screen;
    };
    Core2.prototype.scrollLeft = function(left) {
      var screen = this[_board].scrollX(0 - left);
      this[_draw]();
      this[_emitChangeScreen]();
      return screen;
    };
    Core2.prototype.scrollTop = function(top) {
      var screen = this[_board].scrollY(0 - top);
      this[_draw]();
      this[_emitChangeScreen]();
      return screen;
    };
    Core2.prototype.getScreenTransform = function() {
      var transform = this[_board].getTransform();
      return {
        scale: transform.scale,
        scrollTop: Math.max(0, 0 - transform.scrollY),
        scrollLeft: Math.max(0, 0 - transform.scrollX)
      };
    };
    Core2.prototype.getData = function() {
      return deepClone$1(this[_data]);
    };
    Core2.prototype.setData = function(data, opts) {
      var resourceChangeUUIDs = diffElementResourceChangeList(this[_data], data);
      this[_data] = this[_element].initData(deepClone$1(parseData(data)));
      if (opts && opts.triggerChangeEvent === true) {
        this[_emitChangeData]();
      }
      this[_draw]({ resourceChangeUUIDs });
    };
    Core2.prototype.clearOperation = function() {
      this[_tempData].clear();
      this[_draw]();
    };
    Core2.prototype.on = function(key, callback) {
      this[_coreEvent].on(key, callback);
    };
    Core2.prototype.off = function(key, callback) {
      this[_coreEvent].off(key, callback);
    };
    Core2.prototype.pointScreenToContext = function(p) {
      return this[_board].pointScreenToContext(p);
    };
    Core2.prototype.pointContextToScreen = function(p) {
      return this[_board].pointContextToScreen(p);
    };
    Core2.prototype.__getBoardContext = function() {
      return this[_board].getContext();
    };
    Core2.prototype.__getDisplayContext2D = function() {
      return this[_board].getDisplayContext2D();
    };
    Core2.prototype.__getOriginContext2D = function() {
      return this[_board].getOriginContext2D();
    };
    Core2.prototype[_emitChangeScreen] = function() {
      if (this[_coreEvent].has("changeScreen")) {
        this[_coreEvent].trigger("changeScreen", __assign$4({}, this.getScreenTransform()));
      }
    };
    Core2.prototype[_emitChangeData] = function() {
      if (this[_coreEvent].has("changeData")) {
        this[_coreEvent].trigger("changeData", deepClone$1(this[_data]));
      }
    };
    var _a2, _b2;
    Core2.is = is;
    Core2.check = check;
    return Core2;
  }();
  var default_1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    Core
  });
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
  function deepClone(target) {
    function _clone(t) {
      var type = is$1(t);
      if (["Null", "Number", "String", "Boolean", "Undefined"].indexOf(type) >= 0) {
        return t;
      } else if (type === "Array") {
        var arr_1 = [];
        t.forEach(function(item) {
          arr_1.push(_clone(item));
        });
        return arr_1;
      } else if (type === "Object") {
        var obj_1 = {};
        var keys = Object.keys(t);
        keys.forEach(function(key) {
          obj_1[key] = _clone(t[key]);
        });
        return obj_1;
      }
    }
    return _clone(target);
  }
  function is$1(data) {
    return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, "").split(" ")[1];
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  (function() {
    function Context2(ctx, opts) {
      this._opts = opts;
      this._ctx = ctx;
      this._transform = {
        scale: 1,
        scrollX: 0,
        scrollY: 0
      };
    }
    Context2.prototype.getContext = function() {
      return this._ctx;
    };
    Context2.prototype.resetSize = function(opts) {
      this._opts = __assign(__assign({}, this._opts), opts);
    };
    Context2.prototype.calcDeviceNum = function(num) {
      return num * this._opts.devicePixelRatio;
    };
    Context2.prototype.calcScreenNum = function(num) {
      return num / this._opts.devicePixelRatio;
    };
    Context2.prototype.getSize = function() {
      return {
        width: this._opts.width,
        height: this._opts.height,
        contextWidth: this._opts.contextWidth,
        contextHeight: this._opts.contextHeight,
        devicePixelRatio: this._opts.devicePixelRatio
      };
    };
    Context2.prototype.setTransform = function(config) {
      this._transform = __assign(__assign({}, this._transform), config);
    };
    Context2.prototype.getTransform = function() {
      return {
        scale: this._transform.scale,
        scrollX: this._transform.scrollX,
        scrollY: this._transform.scrollY
      };
    };
    Context2.prototype.setFillStyle = function(color2) {
      this._ctx.fillStyle = color2;
    };
    Context2.prototype.fill = function(fillRule) {
      return this._ctx.fill(fillRule || "nonzero");
    };
    Context2.prototype.arc = function(x2, y2, radius, startAngle, endAngle, anticlockwise) {
      return this._ctx.arc(this._doSize(x2), this._doSize(y2), this._doSize(radius), startAngle, endAngle, anticlockwise);
    };
    Context2.prototype.rect = function(x2, y2, w2, h2) {
      return this._ctx.rect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.fillRect = function(x2, y2, w2, h2) {
      return this._ctx.fillRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.clearRect = function(x2, y2, w2, h2) {
      return this._ctx.clearRect(this._doSize(x2), this._doSize(y2), this._doSize(w2), this._doSize(h2));
    };
    Context2.prototype.beginPath = function() {
      return this._ctx.beginPath();
    };
    Context2.prototype.closePath = function() {
      return this._ctx.closePath();
    };
    Context2.prototype.lineTo = function(x2, y2) {
      return this._ctx.lineTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.moveTo = function(x2, y2) {
      return this._ctx.moveTo(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.arcTo = function(x1, y1, x2, y2, radius) {
      return this._ctx.arcTo(this._doSize(x1), this._doSize(y1), this._doSize(x2), this._doSize(y2), this._doSize(radius));
    };
    Context2.prototype.setLineWidth = function(w2) {
      return this._ctx.lineWidth = this._doSize(w2);
    };
    Context2.prototype.setLineDash = function(nums) {
      var _this = this;
      return this._ctx.setLineDash(nums.map(function(n) {
        return _this._doSize(n);
      }));
    };
    Context2.prototype.isPointInPath = function(x2, y2) {
      return this._ctx.isPointInPath(this._doX(x2), this._doY(y2));
    };
    Context2.prototype.isPointInPathWithoutScroll = function(x2, y2) {
      return this._ctx.isPointInPath(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.setStrokeStyle = function(color2) {
      this._ctx.strokeStyle = color2;
    };
    Context2.prototype.stroke = function() {
      return this._ctx.stroke();
    };
    Context2.prototype.translate = function(x2, y2) {
      return this._ctx.translate(this._doSize(x2), this._doSize(y2));
    };
    Context2.prototype.rotate = function(angle2) {
      return this._ctx.rotate(angle2);
    };
    Context2.prototype.drawImage = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var image = args[0];
      var sx = args[1];
      var sy = args[2];
      var sw = args[3];
      var sh = args[4];
      var dx = args[args.length - 4];
      var dy = args[args.length - 3];
      var dw = args[args.length - 2];
      var dh = args[args.length - 1];
      if (args.length === 9) {
        return this._ctx.drawImage(image, this._doSize(sx), this._doSize(sy), this._doSize(sw), this._doSize(sh), this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      } else {
        return this._ctx.drawImage(image, this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
      }
    };
    Context2.prototype.createPattern = function(image, repetition) {
      return this._ctx.createPattern(image, repetition);
    };
    Context2.prototype.measureText = function(text2) {
      return this._ctx.measureText(text2);
    };
    Context2.prototype.setTextAlign = function(align) {
      this._ctx.textAlign = align;
    };
    Context2.prototype.fillText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.fillText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.strokeText = function(text2, x2, y2, maxWidth) {
      if (maxWidth !== void 0) {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2), this._doSize(maxWidth));
      } else {
        return this._ctx.strokeText(text2, this._doSize(x2), this._doSize(y2));
      }
    };
    Context2.prototype.setFont = function(opts) {
      var strList = [];
      if (opts.fontWeight === "bold") {
        strList.push("".concat(opts.fontWeight));
      }
      strList.push("".concat(this._doSize(opts.fontSize || 12), "px"));
      strList.push("".concat(opts.fontFamily || "sans-serif"));
      this._ctx.font = "".concat(strList.join(" "));
    };
    Context2.prototype.setTextBaseline = function(baseline) {
      this._ctx.textBaseline = baseline;
    };
    Context2.prototype.setGlobalAlpha = function(alpha) {
      this._ctx.globalAlpha = alpha;
    };
    Context2.prototype.save = function() {
      this._ctx.save();
    };
    Context2.prototype.restore = function() {
      this._ctx.restore();
    };
    Context2.prototype.scale = function(ratioX, ratioY) {
      this._ctx.scale(ratioX, ratioY);
    };
    Context2.prototype.setShadowColor = function(color2) {
      this._ctx.shadowColor = color2;
    };
    Context2.prototype.setShadowOffsetX = function(offsetX) {
      this._ctx.shadowOffsetX = this._doSize(offsetX);
    };
    Context2.prototype.setShadowOffsetY = function(offsetY) {
      this._ctx.shadowOffsetY = this._doSize(offsetY);
    };
    Context2.prototype.setShadowBlur = function(blur) {
      this._ctx.shadowBlur = this._doSize(blur);
    };
    Context2.prototype.ellipse = function(x2, y2, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
      this._ctx.ellipse(this._doSize(x2), this._doSize(y2), this._doSize(radiusX), this._doSize(radiusY), rotation, startAngle, endAngle, counterclockwise);
    };
    Context2.prototype._doSize = function(num) {
      return this._opts.devicePixelRatio * num;
    };
    Context2.prototype._doX = function(x2) {
      var _a2 = this._transform, scale = _a2.scale, scrollX = _a2.scrollX;
      var _x = (x2 - scrollX) / scale;
      return this._doSize(_x);
    };
    Context2.prototype._doY = function(y2) {
      var _a2 = this._transform, scale = _a2.scale, scrollY = _a2.scrollY;
      var _y = (y2 - scrollY) / scale;
      return this._doSize(_y);
    };
    return Context2;
  })();
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
  class iDraw2 extends default_1 {
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
