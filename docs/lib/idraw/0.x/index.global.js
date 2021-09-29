var iDraw = (function () {
    'use strict';

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics$1(d, b);
    };
    function __extends$1(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$2 = function() {
        __assign$2 = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    function __awaiter$1(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator$1(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$1 = function() {
        __assign$1 = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function compose$1(middleware) {
        return function (context, next) {
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
                }
                catch (err) {
                    return Promise.reject(err);
                }
            }
        };
    }
    function delay$1(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
    function throttle$1(fn, timeout) {
        var timer = -1;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timer > 0) {
                return;
            }
            timer = setTimeout(function () {
                fn.apply(void 0, args);
                timer = -1;
            }, timeout);
        };
    }
    function downloadImageFromCanvas$1(canvas, opts) {
        var filename = opts.filename, _a = opts.type, type = _a === void 0 ? 'image/jpeg' : _a;
        var stream = canvas.toDataURL(type);
        var downloadLink = document.createElement('a');
        downloadLink.href = stream;
        downloadLink.download = filename;
        var downloadClickEvent = document.createEvent('MouseEvents');
        downloadClickEvent.initEvent('click', true, false);
        downloadLink.dispatchEvent(downloadClickEvent);
    }
    function toColorHexNum$1(color) {
        return parseInt(color.replace(/^\#/, '0x'));
    }
    function toColorHexStr$1(color) {
        return '#' + color.toString(16);
    }
    function isColorStr$3(color) {
        return typeof color === 'string' && /^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color);
    }
    function createUUID$3() {
        function str4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return "" + str4() + str4() + "-" + str4() + "-" + str4() + "-" + str4() + "-" + str4() + str4() + str4();
    }
    function deepClone$6(target) {
        function _clone(t) {
            var type = is$2(t);
            if (['Null', 'Number', 'String', 'Boolean', 'Undefined'].indexOf(type) >= 0) {
                return t;
            }
            else if (type === 'Array') {
                var arr_1 = [];
                t.forEach(function (item) {
                    arr_1.push(_clone(item));
                });
                return arr_1;
            }
            else if (type === 'Object') {
                var obj_1 = {};
                var keys = Object.keys(t);
                keys.forEach(function (key) {
                    obj_1[key] = _clone(t[key]);
                });
                return obj_1;
            }
        }
        return _clone(target);
    }
    function is$2(data) {
        return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, '').split(' ')[1];
    }
    function parsePrototype$1(data) {
        var typeStr = Object.prototype.toString.call(data) || '';
        var result = typeStr.replace(/(\[object|\])/ig, '').trim();
        return result;
    }
    var istype$2 = {
        type: function (data, lowerCase) {
            var result = parsePrototype$1(data);
            return lowerCase === true ? result.toLocaleLowerCase() : result;
        },
        array: function (data) {
            return parsePrototype$1(data) === 'Array';
        },
        json: function (data) {
            return parsePrototype$1(data) === 'Object';
        },
        function: function (data) {
            return parsePrototype$1(data) === 'Function';
        },
        asyncFunction: function (data) {
            return parsePrototype$1(data) === 'AsyncFunction';
        },
        string: function (data) {
            return parsePrototype$1(data) === 'String';
        },
        number: function (data) {
            return parsePrototype$1(data) === 'Number';
        },
        undefined: function (data) {
            return parsePrototype$1(data) === 'Undefined';
        },
        null: function (data) {
            return parsePrototype$1(data) === 'Null';
        },
        promise: function (data) {
            return parsePrototype$1(data) === 'Promise';
        },
    };
    var Image$1 = window.Image, Blob$1 = window.Blob, FileReader$1 = window.FileReader;
    function loadImage$2(src) {
        return new Promise(function (resolve, reject) {
            var img = new Image$1;
            img.onload = function () {
                resolve(img);
            };
            img.onabort = reject;
            img.onerror = reject;
            img.src = src;
        });
    }
    function loadSVG$2(svg) {
        return new Promise(function (resolve, reject) {
            var _svg = svg;
            var image = new Image$1();
            var blob = new Blob$1([_svg], { type: 'image/svg+xml;charset=utf-8' });
            var reader = new FileReader$1();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                var _a;
                var base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
                image.onload = function () {
                    resolve(image);
                };
                image.src = base64;
            };
            reader.onerror = function (err) {
                reject(err);
            };
        });
    }
    function loadHTML$2(html, opts) {
        var width = opts.width, height = opts.height;
        return new Promise(function (resolve, reject) {
            var _svg = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + (width || '') + "\" height = \"" + (height || '') + "\">\n      <foreignObject width=\"100%\" height=\"100%\">\n        <div xmlns = \"http://www.w3.org/1999/xhtml\">\n          " + html + "\n        </div>\n      </foreignObject>\n    </svg>\n    ";
            var image = new Image$1();
            var blob = new Blob$1([_svg], { type: 'image/svg+xml;charset=utf-8' });
            var reader = new FileReader$1();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                var _a;
                var base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
                image.onload = function () {
                    resolve(image);
                };
                image.src = base64;
            };
            reader.onerror = function (err) {
                reject(err);
            };
        });
    }
    var index$1 = {
        time: {
            delay: delay$1,
            compose: compose$1,
            throttle: throttle$1,
        },
        loader: {
            loadImage: loadImage$2,
            loadSVG: loadSVG$2,
            loadHTML: loadHTML$2,
        },
        file: {
            downloadImageFromCanvas: downloadImageFromCanvas$1,
        },
        color: {
            toColorHexStr: toColorHexStr$1,
            toColorHexNum: toColorHexNum$1,
            isColorStr: isColorStr$3,
        },
        uuid: {
            createUUID: createUUID$3
        },
        istype: istype$2,
        data: {
            deepClone: deepClone$6,
        }
    };
    var BoardEvent = (function () {
        function BoardEvent() {
            this._listeners = new Map();
        }
        BoardEvent.prototype.on = function (eventKey, callback) {
            if (this._listeners.has(eventKey)) {
                var callbacks = this._listeners.get(eventKey);
                callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
                this._listeners.set(eventKey, callbacks || []);
            }
            else {
                this._listeners.set(eventKey, [callback]);
            }
        };
        BoardEvent.prototype.off = function (eventKey, callback) {
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
        BoardEvent.prototype.trigger = function (eventKey, arg) {
            var callbacks = this._listeners.get(eventKey);
            if (Array.isArray(callbacks)) {
                callbacks.forEach(function (cb) {
                    cb(arg);
                });
                return true;
            }
            else {
                return false;
            }
        };
        BoardEvent.prototype.has = function (name) {
            if (this._listeners.has(name)) {
                var list = this._listeners.get(name);
                if (Array.isArray(list) && list.length > 0) {
                    return true;
                }
            }
            return false;
        };
        return BoardEvent;
    }());
    var TempData$1 = (function () {
        function TempData() {
            this._temp = {
                prevClickPoint: null
            };
        }
        TempData.prototype.set = function (name, value) {
            this._temp[name] = value;
        };
        TempData.prototype.get = function (name) {
            return this._temp[name];
        };
        TempData.prototype.clear = function () {
            this._temp = {
                prevClickPoint: null,
            };
        };
        return TempData;
    }());
    var Watcher = (function () {
        function Watcher(canvas) {
            this._isMoving = false;
            this._temp = new TempData$1;
            this._canvas = canvas;
            this._isMoving = false;
            this._initEvent();
            this._event = new BoardEvent;
        }
        Watcher.prototype.on = function (name, callback) {
            this._event.on(name, callback);
        };
        Watcher.prototype.off = function (name, callback) {
            this._event.off(name, callback);
        };
        Watcher.prototype._initEvent = function () {
            var canvas = this._canvas;
            canvas.addEventListener('mousemove', this._listenHover.bind(this), true);
            canvas.addEventListener('mousedown', this._listenMoveStart.bind(this), true);
            canvas.addEventListener('mousemove', this._listenMove.bind(this), true);
            canvas.addEventListener('mouseup', this._listenMoveEnd.bind(this), true);
            canvas.addEventListener('mouseleave', this._listenMoveEnd.bind(this), true);
            canvas.addEventListener('mouseleave', this._listenLeave.bind(this), true);
            canvas.addEventListener('click', this._listenClick.bind(this), true);
            canvas.addEventListener('wheel', this._listenWheel.bind(this), true);
            canvas.addEventListener('touchstart', this._listenMoveStart.bind(this), true);
            canvas.addEventListener('touchmove', this._listenMove.bind(this), true);
            canvas.addEventListener('touchend', this._listenMoveEnd.bind(this), true);
        };
        Watcher.prototype._listenHover = function (e) {
            e.preventDefault();
            var p = this._getPosition(e);
            if (this._isVaildPoint(p)) {
                if (this._event.has('hover')) {
                    this._event.trigger('hover', p);
                }
            }
            this._isMoving = true;
        };
        Watcher.prototype._listenLeave = function (e) {
            e.preventDefault();
            if (this._event.has('leave')) {
                this._event.trigger('leave', undefined);
            }
        };
        Watcher.prototype._listenMoveStart = function (e) {
            e.preventDefault();
            var p = this._getPosition(e);
            if (this._isVaildPoint(p)) {
                if (this._event.has('point')) {
                    this._event.trigger('point', p);
                }
                if (this._event.has('moveStart')) {
                    this._event.trigger('moveStart', p);
                }
            }
            this._isMoving = true;
        };
        Watcher.prototype._listenMove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this._event.has('move') && this._isMoving === true) {
                var p = this._getPosition(e);
                if (this._isVaildPoint(p)) {
                    this._event.trigger('move', p);
                }
            }
        };
        Watcher.prototype._listenMoveEnd = function (e) {
            e.preventDefault();
            if (this._event.has('moveEnd')) {
                var p = this._getPosition(e);
                if (this._isVaildPoint(p)) {
                    this._event.trigger('moveEnd', p);
                }
            }
            this._isMoving = false;
        };
        Watcher.prototype._listenWheel = function (e) {
            e.preventDefault();
            if (this._event.has('wheelX') && (e.deltaX > 0 || e.deltaX < 0)) {
                this._event.trigger('wheelX', e.deltaX);
            }
            if (this._event.has('wheelY') && (e.deltaY > 0 || e.deltaY < 0)) {
                this._event.trigger('wheelY', e.deltaY);
            }
        };
        Watcher.prototype._listenClick = function (e) {
            e.preventDefault();
            var maxLimitTime = 500;
            var p = this._getPosition(e);
            var t = Date.now();
            if (this._isVaildPoint(p)) {
                var preClickPoint = this._temp.get('prevClickPoint');
                if (preClickPoint && (t - preClickPoint.t <= maxLimitTime)
                    && Math.abs(preClickPoint.x - p.x) <= 5
                    && Math.abs(preClickPoint.y - p.y) <= 5) {
                    if (this._event.has('doubleClick')) {
                        this._event.trigger('doubleClick', { x: p.x, y: p.y });
                    }
                }
                else {
                    this._temp.set('prevClickPoint', { x: p.x, y: p.y, t: t, });
                }
            }
        };
        Watcher.prototype._getPosition = function (e) {
            var canvas = this._canvas;
            var x = 0;
            var y = 0;
            if (e && e.touches && e.touches.length > 0) {
                var touch = e.touches[0];
                if (touch) {
                    x = touch.clientX;
                    y = touch.clientY;
                }
            }
            else {
                x = e.clientX;
                y = e.clientY;
            }
            var p = {
                x: x - canvas.getBoundingClientRect().left,
                y: y - canvas.getBoundingClientRect().top,
                t: Date.now(),
            };
            return p;
        };
        Watcher.prototype._isVaildPoint = function (p) {
            return (p.x > 0 && p.y > 0);
        };
        return Watcher;
    }());
    function setStyle(dom, style) {
        var originStyle = getStyle(dom);
        var _style = __assign(__assign({}, originStyle), style);
        var keys = Object.keys(_style);
        var styleStr = '';
        keys.forEach(function (key) {
            styleStr += key + ":" + (_style[key] || '') + ";";
        });
        dom.setAttribute('style', styleStr);
    }
    function getStyle(dom) {
        var styleObj = {};
        var style = dom.getAttribute('style') || '';
        var styleList = style.split(';');
        styleList.forEach(function (item) {
            var dataList = item.split(':');
            if (dataList[0] && typeof dataList[0] === 'string') {
                styleObj[dataList[0]] = dataList[1] || '';
            }
        });
        return styleObj;
    }
    var Context = (function () {
        function Context(ctx, opts) {
            this._opts = opts;
            this._ctx = ctx;
            this._transform = {
                scale: 1,
                scrollX: 0,
                scrollY: 0,
            };
        }
        Context.prototype.resetSize = function (opts) {
            this._opts = __assign(__assign({}, this._opts), opts);
        };
        Context.prototype.calcDeviceNum = function (num) {
            return num * this._opts.devicePixelRatio;
        };
        Context.prototype.calcScreenNum = function (num) {
            return num / this._opts.devicePixelRatio;
        };
        Context.prototype.getSize = function () {
            return {
                width: this._opts.width,
                height: this._opts.height,
                contextWidth: this._opts.contextWidth,
                contextHeight: this._opts.contextHeight,
                devicePixelRatio: this._opts.devicePixelRatio,
            };
        };
        Context.prototype.setTransform = function (config) {
            this._transform = __assign(__assign({}, this._transform), config);
        };
        Context.prototype.getTransform = function () {
            return {
                scale: this._transform.scale,
                scrollX: this._transform.scrollX,
                scrollY: this._transform.scrollY,
            };
        };
        Context.prototype.setFillStyle = function (color) {
            this._ctx.fillStyle = color;
        };
        Context.prototype.fill = function (fillRule) {
            return this._ctx.fill(fillRule || 'nonzero');
        };
        Context.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
            return this._ctx.arc(this._doSize(x), this._doSize(y), this._doSize(radius), startAngle, endAngle, anticlockwise);
        };
        Context.prototype.rect = function (x, y, w, h) {
            return this._ctx.rect(this._doSize(x), this._doSize(y), this._doSize(w), this._doSize(h));
        };
        Context.prototype.fillRect = function (x, y, w, h) {
            return this._ctx.fillRect(this._doSize(x), this._doSize(y), this._doSize(w), this._doSize(h));
        };
        Context.prototype.clearRect = function (x, y, w, h) {
            return this._ctx.clearRect(this._doSize(x), this._doSize(y), this._doSize(w), this._doSize(h));
        };
        Context.prototype.beginPath = function () {
            return this._ctx.beginPath();
        };
        Context.prototype.closePath = function () {
            return this._ctx.closePath();
        };
        Context.prototype.lineTo = function (x, y) {
            return this._ctx.lineTo(this._doSize(x), this._doSize(y));
        };
        Context.prototype.moveTo = function (x, y) {
            return this._ctx.moveTo(this._doSize(x), this._doSize(y));
        };
        Context.prototype.arcTo = function (x1, y1, x2, y2, radius) {
            return this._ctx.arcTo(this._doSize(x1), this._doSize(y1), this._doSize(x2), this._doSize(y2), this._doSize(radius));
        };
        Context.prototype.setLineWidth = function (w) {
            return this._ctx.lineWidth = this._doSize(w);
        };
        Context.prototype.setLineDash = function (nums) {
            var _this = this;
            return this._ctx.setLineDash(nums.map(function (n) { return _this._doSize(n); }));
        };
        Context.prototype.isPointInPath = function (x, y) {
            return this._ctx.isPointInPath(this._doX(x), this._doY(y));
        };
        Context.prototype.isPointInPathWithoutScroll = function (x, y) {
            return this._ctx.isPointInPath(this._doSize(x), this._doSize(y));
        };
        Context.prototype.setStrokeStyle = function (color) {
            this._ctx.strokeStyle = color;
        };
        Context.prototype.stroke = function () {
            return this._ctx.stroke();
        };
        Context.prototype.translate = function (x, y) {
            return this._ctx.translate(this._doSize(x), this._doSize(y));
        };
        Context.prototype.rotate = function (angle) {
            return this._ctx.rotate(angle);
        };
        Context.prototype.drawImage = function () {
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
            }
            else {
                return this._ctx.drawImage(image, this._doSize(dx), this._doSize(dy), this._doSize(dw), this._doSize(dh));
            }
        };
        Context.prototype.createPattern = function (image, repetition) {
            return this._ctx.createPattern(image, repetition);
        };
        Context.prototype.measureText = function (text) {
            return this._ctx.measureText(text);
        };
        Context.prototype.setTextAlign = function (align) {
            this._ctx.textAlign = align;
        };
        Context.prototype.fillText = function (text, x, y, maxWidth) {
            if (maxWidth !== undefined) {
                return this._ctx.fillText(text, this._doSize(x), this._doSize(y), this._doSize(maxWidth));
            }
            else {
                return this._ctx.fillText(text, this._doSize(x), this._doSize(y));
            }
        };
        Context.prototype.setFont = function (opts) {
            var strList = [];
            if (opts.fontWeight === 'bold') {
                strList.push("" + opts.fontWeight);
            }
            strList.push(this._doSize(opts.fontSize || 12) + "px");
            strList.push("" + (opts.fontFamily || 'sans-serif'));
            this._ctx.font = "" + strList.join(' ');
        };
        Context.prototype.setTextBaseline = function (baseline) {
            this._ctx.textBaseline = baseline;
        };
        Context.prototype.setGlobalAlpha = function (alpha) {
            this._ctx.globalAlpha = alpha;
        };
        Context.prototype.save = function () {
            this._ctx.save();
        };
        Context.prototype.restore = function () {
            this._ctx.restore();
        };
        Context.prototype.scale = function (ratioX, ratioY) {
            this._ctx.scale(ratioX, ratioY);
        };
        Context.prototype._doSize = function (num) {
            return this._opts.devicePixelRatio * num;
        };
        Context.prototype._doX = function (x) {
            var _a = this._transform, scale = _a.scale, scrollX = _a.scrollX;
            var _x = (x - scrollX) / scale;
            return this._doSize(_x);
        };
        Context.prototype._doY = function (y) {
            var _a = this._transform, scale = _a.scale, scrollY = _a.scrollY;
            var _y = (y - scrollY) / scale;
            return this._doSize(_y);
        };
        return Context;
    }());
    var defaultScrollConfig = {
        lineWidth: 12,
        color: '#a0a0a0'
    };
    var Scroller = (function () {
        function Scroller(ctx, opts) {
            this._displayCtx = ctx;
            this._opts = this._getOpts(opts);
        }
        Scroller.prototype.draw = function (position) {
            var _a = this._opts, width = _a.width, height = _a.height;
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
                    color: wrapper.color,
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
                    color: wrapper.color,
                });
            }
            ctx.globalAlpha = 1;
        };
        Scroller.prototype.resetSize = function (opts) {
            this._opts = __assign(__assign({}, this._opts), opts);
        };
        Scroller.prototype.isPointAtScrollY = function (p) {
            var _a = this._opts, width = _a.width, height = _a.height, scrollConfig = _a.scrollConfig;
            var ctx = this._displayCtx;
            ctx.beginPath();
            ctx.rect(this._doSize(width - scrollConfig.lineWidth), 0, this._doSize(scrollConfig.lineWidth), this._doSize(height));
            ctx.closePath();
            if (ctx.isPointInPath(this._doSize(p.x), this._doSize(p.y))) {
                return true;
            }
            return false;
        };
        Scroller.prototype.isPointAtScrollX = function (p) {
            var _a = this._opts, width = _a.width, height = _a.height, scrollConfig = _a.scrollConfig;
            var ctx = this._displayCtx;
            ctx.beginPath();
            ctx.rect(0, this._doSize(height - scrollConfig.lineWidth), this._doSize(width - scrollConfig.lineWidth), this._doSize(scrollConfig.lineWidth));
            ctx.closePath();
            if (ctx.isPointInPath(this._doSize(p.x), this._doSize(p.y))) {
                return true;
            }
            return false;
        };
        Scroller.prototype.getLineWidth = function () {
            var lineWidth = this._opts.scrollConfig.lineWidth;
            return lineWidth;
        };
        Scroller.prototype.calc = function (position) {
            var _a = this._opts, width = _a.width, height = _a.height, scrollConfig = _a.scrollConfig;
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
                lineSize: lineSize,
                xSize: xSize,
                ySize: ySize,
                translateY: translateY,
                translateX: translateX,
                color: this._opts.scrollConfig.color
            };
            return scrollWrapper;
        };
        Scroller.prototype._doSize = function (num) {
            return num * this._opts.devicePixelRatio;
        };
        Scroller.prototype._getOpts = function (opts) {
            var options = __assign({ scrollConfig: defaultScrollConfig }, opts);
            if (!options.scrollConfig) {
                options.scrollConfig = defaultScrollConfig;
            }
            if (!(options.scrollConfig.lineWidth > 0)) {
                options.scrollConfig.lineWidth = defaultScrollConfig.lineWidth;
            }
            options.scrollConfig.lineWidth = Math.max(options.scrollConfig.lineWidth, defaultScrollConfig.lineWidth);
            if (index$1.color.isColorStr(options.scrollConfig.color) !== true) {
                options.scrollConfig.color = options.scrollConfig.color;
            }
            return options;
        };
        return Scroller;
    }());
    function drawBox$1(ctx, opts) {
        var x = opts.x, y = opts.y, w = opts.w, h = opts.h, color = opts.color;
        var r = opts.r;
        r = Math.min(r, w / 2, h / 2);
        if (w < r * 2 || h < r * 2) {
            r = 0;
        }
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
    var _opts$1$1 = Symbol('_opts');
    var _ctx$1 = Symbol('_ctx');
    var Screen = (function () {
        function Screen(ctx, opts) {
            this[_opts$1$1] = opts;
            this[_ctx$1] = ctx;
        }
        Screen.prototype.resetSize = function (opts) {
            this[_opts$1$1] = __assign(__assign({}, this[_opts$1$1]), opts);
        };
        Screen.prototype.calcScreen = function () {
            var scaleRatio = this[_ctx$1].getTransform().scale;
            var _a = this[_opts$1$1], width = _a.width, height = _a.height, contextWidth = _a.contextWidth, contextHeight = _a.contextHeight, pxRatio = _a.devicePixelRatio;
            if (contextWidth * scaleRatio <= width) {
                this[_ctx$1].setTransform({
                    scrollX: (width - contextWidth * scaleRatio) / 2,
                });
            }
            if (contextHeight * scaleRatio <= height) {
                this[_ctx$1].setTransform({
                    scrollY: (height - contextHeight * scaleRatio) / 2,
                });
            }
            if (contextWidth * scaleRatio >= width && this[_ctx$1].getTransform().scrollX > 0) {
                this[_ctx$1].setTransform({
                    scrollX: 0,
                });
            }
            if (contextHeight * scaleRatio >= height && this[_ctx$1].getTransform().scrollY > 0) {
                this[_ctx$1].setTransform({
                    scrollY: 0,
                });
            }
            var _b = this[_ctx$1].getTransform(), _scrollX = _b.scrollX, _scrollY = _b.scrollY;
            if (_scrollX < 0 && Math.abs(_scrollX) > Math.abs(contextWidth * scaleRatio - width)) {
                this[_ctx$1].setTransform({
                    scrollX: 0 - Math.abs(contextWidth * scaleRatio - width)
                });
            }
            if (_scrollY < 0 && Math.abs(_scrollY) > Math.abs(contextHeight * scaleRatio - height)) {
                this[_ctx$1].setTransform({
                    scrollY: 0 - Math.abs(contextHeight * scaleRatio - height)
                });
            }
            var _c = this[_ctx$1].getTransform(), scrollX = _c.scrollX, scrollY = _c.scrollY;
            var size = {
                x: scrollX * scaleRatio,
                y: scrollY * scaleRatio,
                w: contextWidth * scaleRatio,
                h: contextHeight * scaleRatio,
            };
            var deviceSize = {
                x: scrollX * pxRatio,
                y: scrollY * pxRatio,
                w: contextWidth * pxRatio * scaleRatio,
                h: contextHeight * pxRatio * scaleRatio,
            };
            var position = {
                top: scrollY,
                bottom: height - (contextHeight * scaleRatio + scrollY),
                left: scrollX,
                right: width - (contextWidth * scaleRatio + scrollX),
            };
            return {
                size: size,
                position: position,
                deviceSize: deviceSize,
                width: this[_opts$1$1].width,
                height: this[_opts$1$1].height,
                devicePixelRatio: this[_opts$1$1].devicePixelRatio,
            };
        };
        Screen.prototype.calcScreenScroll = function (start, end, sliderSize, limitLen, moveDistance) {
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
        return Screen;
    }());
    var _canvas = Symbol('_canvas');
    var _displayCanvas = Symbol('_displayCanvas');
    var _mount = Symbol('_mount');
    var _opts$2 = Symbol('_opts');
    var _hasRendered = Symbol('_hasRendered');
    var _ctx = Symbol('_ctx');
    var _displayCtx = Symbol('_displayCtx');
    var _originCtx = Symbol('_originCtx');
    var _watcher = Symbol('_watcher');
    var _render = Symbol('_render');
    var _parsePrivateOptions = Symbol('_parsePrivateOptions');
    var _scroller = Symbol('_scroller');
    var _initEvent$1 = Symbol('_initEvent');
    var _doScrollX = Symbol('_doScrollX');
    var _doScrollY = Symbol('_doScrollY');
    var _doMoveScroll = Symbol('_doMoveScroll');
    var _resetContext = Symbol('_resetContext');
    var _screen = Symbol('_screen');
    var _a$1;
    var throttle$2 = index$1.time.throttle;
    var Board = (function () {
        function Board(mount, opts) {
            this[_a$1] = false;
            this[_mount] = mount;
            this[_canvas] = document.createElement('canvas');
            this[_displayCanvas] = document.createElement('canvas');
            this[_mount].appendChild(this[_displayCanvas]);
            this[_opts$2] = this[_parsePrivateOptions](opts);
            this[_originCtx] = this[_canvas].getContext('2d');
            this[_displayCtx] = this[_displayCanvas].getContext('2d');
            this[_ctx] = new Context(this[_originCtx], this[_opts$2]);
            this[_screen] = new Screen(this[_ctx], this[_opts$2]);
            this[_watcher] = new Watcher(this[_displayCanvas]);
            this[_scroller] = new Scroller(this[_displayCtx], {
                width: opts.width,
                height: opts.height,
                devicePixelRatio: opts.devicePixelRatio || 1,
                scrollConfig: opts.scrollConfig,
            });
            this[_render]();
        }
        Board.prototype.getDisplayContext = function () {
            return this[_displayCtx];
        };
        Board.prototype.getOriginContext = function () {
            return this[_originCtx];
        };
        Board.prototype.getContext = function () {
            return this[_ctx];
        };
        Board.prototype.scale = function (scaleRatio) {
            if (scaleRatio > 0) {
                this[_ctx].setTransform({ scale: scaleRatio });
            }
            var _b = this[_screen].calcScreen(), position = _b.position, size = _b.size;
            return { position: position, size: size };
        };
        Board.prototype.scrollX = function (x) {
            if (x >= 0 || x < 0) {
                this[_ctx].setTransform({ scrollX: x });
            }
            var _b = this[_screen].calcScreen(), position = _b.position, size = _b.size;
            return { position: position, size: size };
        };
        Board.prototype.scrollY = function (y) {
            if (y >= 0 || y < 0) {
                this[_ctx].setTransform({ scrollY: y });
            }
            var _b = this[_screen].calcScreen(), position = _b.position, size = _b.size;
            return { position: position, size: size };
        };
        Board.prototype.getTransform = function () {
            return this[_ctx].getTransform();
        };
        Board.prototype.draw = function () {
            this.clear();
            var _b = this[_screen].calcScreen(), position = _b.position, deviceSize = _b.deviceSize, size = _b.size;
            this[_displayCtx].drawImage(this[_canvas], deviceSize.x, deviceSize.y, deviceSize.w, deviceSize.h);
            if (this[_opts$2].canScroll === true) {
                this[_scroller].draw(position);
            }
            return { position: position, size: size };
        };
        Board.prototype.clear = function () {
            this[_displayCtx].clearRect(0, 0, this[_displayCanvas].width, this[_displayCanvas].height);
        };
        Board.prototype.on = function (name, callback) {
            this[_watcher].on(name, callback);
        };
        Board.prototype.off = function (name, callback) {
            this[_watcher].off(name, callback);
        };
        Board.prototype.getScreenInfo = function () {
            return this[_screen].calcScreen();
        };
        Board.prototype.setCursor = function (cursor) {
            this[_displayCanvas].style.cursor = cursor;
        };
        Board.prototype.resetCursor = function () {
            this[_displayCanvas].style.cursor = 'auto';
        };
        Board.prototype.resetSize = function (opts) {
            this[_opts$2] = __assign(__assign({}, this[_opts$2]), opts);
            this[_resetContext]();
            this[_ctx].resetSize(opts);
            this[_screen].resetSize(opts);
            this[_scroller].resetSize({
                width: this[_opts$2].width,
                height: this[_opts$2].height,
                devicePixelRatio: this[_opts$2].devicePixelRatio
            });
            this.draw();
        };
        Board.prototype.getScrollLineWidth = function () {
            var lineWidth = 0;
            if (this[_opts$2].canScroll === true) {
                lineWidth = this[_scroller].getLineWidth();
            }
            return lineWidth;
        };
        Board.prototype.pointScreenToContext = function (screenPoint) {
            var _b = this.getTransform(), scrollX = _b.scrollX, scrollY = _b.scrollY, scale = _b.scale;
            var ctxPoint = {
                x: (screenPoint.x - scrollX) / scale,
                y: (screenPoint.y - scrollY) / scale,
            };
            return ctxPoint;
        };
        Board.prototype.pointContextToScreen = function (ctxPoint) {
            var _b = this.getTransform(), scrollX = _b.scrollX, scrollY = _b.scrollY, scale = _b.scale;
            var screenPoint = {
                x: ctxPoint.x * scale + scrollX,
                y: ctxPoint.y * scale + scrollY,
            };
            return screenPoint;
        };
        Board.prototype[(_a$1 = _hasRendered, _render)] = function () {
            if (this[_hasRendered] === true) {
                return;
            }
            this[_resetContext]();
            this[_initEvent$1]();
            this[_hasRendered] = true;
        };
        Board.prototype[_resetContext] = function () {
            var _b = this[_opts$2], width = _b.width, height = _b.height, contextWidth = _b.contextWidth, contextHeight = _b.contextHeight, devicePixelRatio = _b.devicePixelRatio;
            this[_canvas].width = contextWidth * devicePixelRatio;
            this[_canvas].height = contextHeight * devicePixelRatio;
            this[_displayCanvas].width = width * devicePixelRatio;
            this[_displayCanvas].height = height * devicePixelRatio;
            setStyle(this[_displayCanvas], {
                width: width + "px",
                height: height + "px",
            });
        };
        Board.prototype[_parsePrivateOptions] = function (opts) {
            var defaultOpts = {
                devicePixelRatio: 1,
            };
            return __assign(__assign({}, defaultOpts), opts);
        };
        Board.prototype[_initEvent$1] = function () {
            var _this = this;
            if (this[_hasRendered] === true) {
                return;
            }
            if (this[_opts$2].canScroll === true) {
                this.on('wheelX', throttle$2(function (deltaX) {
                    _this[_doScrollX](deltaX);
                }, 16));
                this.on('wheelY', throttle$2(function (deltaY) {
                    _this[_doScrollY](deltaY);
                }, 16));
                var scrollType_1 = null;
                this.on('moveStart', throttle$2(function (p) {
                    if (_this[_scroller].isPointAtScrollX(p)) {
                        scrollType_1 = 'x';
                    }
                    else if (_this[_scroller].isPointAtScrollY(p)) {
                        scrollType_1 = 'y';
                    }
                }, 16));
                this.on('move', throttle$2(function (p) {
                    if (scrollType_1) {
                        _this[_doMoveScroll](scrollType_1, p);
                    }
                }, 16));
                this.on('moveEnd', throttle$2(function (p) {
                    if (scrollType_1) {
                        _this[_doMoveScroll](scrollType_1, p);
                    }
                    scrollType_1 = null;
                }, 16));
            }
        };
        Board.prototype[_doScrollX] = function (dx, prevScrollX) {
            var width = this[_opts$2].width;
            var scrollX = prevScrollX;
            if (!(typeof scrollX === 'number' && (scrollX > 0 || scrollX <= 0))) {
                scrollX = this[_ctx].getTransform().scrollX;
            }
            var position = this[_screen].calcScreen().position;
            var xSize = this[_scroller].calc(position).xSize;
            var moveX = this[_screen].calcScreenScroll(position.left, position.right, xSize, width, dx);
            this.scrollX(scrollX + moveX);
            this.draw();
        };
        Board.prototype[_doScrollY] = function (dy, prevScrollY) {
            var height = this[_opts$2].height;
            var scrollY = prevScrollY;
            if (!(typeof scrollY === 'number' && (scrollY > 0 || scrollY <= 0))) {
                scrollY = this[_ctx].getTransform().scrollY;
            }
            var position = this[_screen].calcScreen().position;
            var ySize = this[_scroller].calc(position).ySize;
            var moveY = this[_screen].calcScreenScroll(position.top, position.bottom, ySize, height, dy);
            this.scrollY(scrollY + moveY);
            this.draw();
        };
        Board.prototype[_doMoveScroll] = function (scrollType, point) {
            if (!scrollType) {
                return;
            }
            var position = this[_screen].calcScreen().position;
            var _b = this[_scroller].calc(position), xSize = _b.xSize, ySize = _b.ySize;
            if (scrollType === 'x') {
                this[_doScrollX](point.x - xSize / 2, 0);
            }
            else if (scrollType === 'y') {
                this[_doScrollY](point.y - ySize / 2, 0);
            }
        };
        return Board;
    }());
    function compose$2(middleware) {
        return function (context, next) {
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
                }
                catch (err) {
                    return Promise.reject(err);
                }
            }
        };
    }
    function delay$2(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
    function throttle$3(fn, timeout) {
        var timer = -1;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timer > 0) {
                return;
            }
            timer = setTimeout(function () {
                fn.apply(void 0, args);
                timer = -1;
            }, timeout);
        };
    }
    function downloadImageFromCanvas$2(canvas, opts) {
        var filename = opts.filename, _a = opts.type, type = _a === void 0 ? 'image/jpeg' : _a;
        var stream = canvas.toDataURL(type);
        var downloadLink = document.createElement('a');
        downloadLink.href = stream;
        downloadLink.download = filename;
        var downloadClickEvent = document.createEvent('MouseEvents');
        downloadClickEvent.initEvent('click', true, false);
        downloadLink.dispatchEvent(downloadClickEvent);
    }
    function toColorHexNum$2(color) {
        return parseInt(color.replace(/^\#/, '0x'));
    }
    function toColorHexStr$2(color) {
        return '#' + color.toString(16);
    }
    function isColorStr$2(color) {
        return typeof color === 'string' && /^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color);
    }
    function createUUID$2() {
        function str4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return "" + str4() + str4() + "-" + str4() + "-" + str4() + "-" + str4() + "-" + str4() + str4() + str4();
    }
    function deepClone$5(target) {
        function _clone(t) {
            var type = is$1(t);
            if (['Null', 'Number', 'String', 'Boolean', 'Undefined'].indexOf(type) >= 0) {
                return t;
            }
            else if (type === 'Array') {
                var arr_1 = [];
                t.forEach(function (item) {
                    arr_1.push(_clone(item));
                });
                return arr_1;
            }
            else if (type === 'Object') {
                var obj_1 = {};
                var keys = Object.keys(t);
                keys.forEach(function (key) {
                    obj_1[key] = _clone(t[key]);
                });
                return obj_1;
            }
        }
        return _clone(target);
    }
    function is$1(data) {
        return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, '').split(' ')[1];
    }
    function parsePrototype$2(data) {
        var typeStr = Object.prototype.toString.call(data) || '';
        var result = typeStr.replace(/(\[object|\])/ig, '').trim();
        return result;
    }
    var istype$1 = {
        type: function (data, lowerCase) {
            var result = parsePrototype$2(data);
            return lowerCase === true ? result.toLocaleLowerCase() : result;
        },
        array: function (data) {
            return parsePrototype$2(data) === 'Array';
        },
        json: function (data) {
            return parsePrototype$2(data) === 'Object';
        },
        function: function (data) {
            return parsePrototype$2(data) === 'Function';
        },
        asyncFunction: function (data) {
            return parsePrototype$2(data) === 'AsyncFunction';
        },
        string: function (data) {
            return parsePrototype$2(data) === 'String';
        },
        number: function (data) {
            return parsePrototype$2(data) === 'Number';
        },
        undefined: function (data) {
            return parsePrototype$2(data) === 'Undefined';
        },
        null: function (data) {
            return parsePrototype$2(data) === 'Null';
        },
        promise: function (data) {
            return parsePrototype$2(data) === 'Promise';
        },
    };
    var Image$2 = window.Image, Blob$2 = window.Blob, FileReader$2 = window.FileReader;
    function loadImage$1(src) {
        return new Promise(function (resolve, reject) {
            var img = new Image$2;
            img.onload = function () {
                resolve(img);
            };
            img.onabort = reject;
            img.onerror = reject;
            img.src = src;
        });
    }
    function loadSVG$1(svg) {
        return new Promise(function (resolve, reject) {
            var _svg = svg;
            var image = new Image$2();
            var blob = new Blob$2([_svg], { type: 'image/svg+xml;charset=utf-8' });
            var reader = new FileReader$2();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                var _a;
                var base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
                image.onload = function () {
                    resolve(image);
                };
                image.src = base64;
            };
            reader.onerror = function (err) {
                reject(err);
            };
        });
    }
    function loadHTML$1(html, opts) {
        var width = opts.width, height = opts.height;
        return new Promise(function (resolve, reject) {
            var _svg = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + (width || '') + "\" height = \"" + (height || '') + "\">\n      <foreignObject width=\"100%\" height=\"100%\">\n        <div xmlns = \"http://www.w3.org/1999/xhtml\">\n          " + html + "\n        </div>\n      </foreignObject>\n    </svg>\n    ";
            var image = new Image$2();
            var blob = new Blob$2([_svg], { type: 'image/svg+xml;charset=utf-8' });
            var reader = new FileReader$2();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                var _a;
                var base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
                image.onload = function () {
                    resolve(image);
                };
                image.src = base64;
            };
            reader.onerror = function (err) {
                reject(err);
            };
        });
    }
    var index$2 = {
        time: {
            delay: delay$2,
            compose: compose$2,
            throttle: throttle$3,
        },
        loader: {
            loadImage: loadImage$1,
            loadSVG: loadSVG$1,
            loadHTML: loadHTML$1,
        },
        file: {
            downloadImageFromCanvas: downloadImageFromCanvas$2,
        },
        color: {
            toColorHexStr: toColorHexStr$2,
            toColorHexNum: toColorHexNum$2,
            isColorStr: isColorStr$2,
        },
        uuid: {
            createUUID: createUUID$2
        },
        istype: istype$1,
        data: {
            deepClone: deepClone$5,
        }
    };
    var isColorStr$1 = index$2.color.isColorStr;
    function number(value) {
        return (typeof value === 'number' && (value > 0 || value <= 0));
    }
    function x(value) {
        return number(value);
    }
    function y(value) {
        return number(value);
    }
    function w(value) {
        return (typeof value === 'number' && value >= 0);
    }
    function h(value) {
        return (typeof value === 'number' && value >= 0);
    }
    function angle(value) {
        return (typeof value === 'number' && value >= -360 && value <= 360);
    }
    function borderWidth(value) {
        return w(value);
    }
    function borderRadius(value) {
        return number(value) && value >= 0;
    }
    function color$1(value) {
        return isColorStr$1(value);
    }
    function imageURL(value) {
        return (typeof value === 'string' && /^(http:\/\/|https:\/\/|\.\/|\/)/.test("" + value));
    }
    function imageBase64(value) {
        return (typeof value === 'string' && /^(data:image\/)/.test("" + value));
    }
    function imageSrc(value) {
        return (imageBase64(value) || imageURL(value));
    }
    function svg(value) {
        return (typeof value === 'string' && /^(<svg[\s]{1,}|<svg>)/i.test(("" + value).trim()) && /<\/[\s]{0,}svg>$/i.test(("" + value).trim()));
    }
    function html(value) {
        var result = false;
        if (typeof value === 'string') {
            var div = document.createElement('div');
            div.innerHTML = value;
            if (div.children.length > 0) {
                result = true;
            }
            div = null;
        }
        return result;
    }
    function text(value) {
        return typeof value === 'string';
    }
    function fontSize(value) {
        return number(value) && value > 0;
    }
    function lineHeight(value) {
        return number(value) && value > 0;
    }
    function textAlign(value) {
        return ['center', 'left', 'right'].includes(value);
    }
    function fontFamily(value) {
        return typeof value === 'string' && value.length > 0;
    }
    function fontWeight(value) {
        return ['bold'].includes(value);
    }
    var is$3 = {
        x: x,
        y: y,
        w: w,
        h: h,
        angle: angle,
        number: number,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        color: color$1,
        imageSrc: imageSrc,
        imageURL: imageURL,
        imageBase64: imageBase64,
        svg: svg,
        html: html,
        text: text,
        fontSize: fontSize,
        lineHeight: lineHeight,
        textAlign: textAlign,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
    };
    function attrs(attrs) {
        var x = attrs.x, y = attrs.y, w = attrs.w, h = attrs.h, angle = attrs.angle;
        if (!(is$3.x(x) && is$3.y(y) && is$3.w(w) && is$3.h(h) && is$3.angle(angle))) {
            return false;
        }
        if (!(angle >= -360 && angle <= 360)) {
            return false;
        }
        return true;
    }
    function box(desc) {
        if (desc === void 0) { desc = {}; }
        var borderColor = desc.borderColor, borderRadius = desc.borderRadius, borderWidth = desc.borderWidth;
        if (desc.hasOwnProperty('borderColor') && !is$3.color(borderColor)) {
            return false;
        }
        if (desc.hasOwnProperty('borderRadius') && !is$3.number(borderRadius)) {
            return false;
        }
        if (desc.hasOwnProperty('borderWidth') && !is$3.number(borderWidth)) {
            return false;
        }
        return true;
    }
    function rectDesc(desc) {
        var bgColor = desc.bgColor;
        if (desc.hasOwnProperty('bgColor') && !is$3.color(bgColor)) {
            return false;
        }
        if (!box(desc)) {
            return false;
        }
        return true;
    }
    function circleDesc(desc) {
        var bgColor = desc.bgColor, borderColor = desc.borderColor, borderWidth = desc.borderWidth;
        if (desc.hasOwnProperty('bgColor') && !is$3.color(bgColor)) {
            return false;
        }
        if (desc.hasOwnProperty('borderColor') && !is$3.color(borderColor)) {
            return false;
        }
        if (desc.hasOwnProperty('borderWidth') && !is$3.number(borderWidth)) {
            return false;
        }
        return true;
    }
    function imageDesc(desc) {
        var src = desc.src;
        if (!is$3.imageSrc(src)) {
            return false;
        }
        return true;
    }
    function svgDesc(desc) {
        var svg = desc.svg;
        if (!is$3.svg(svg)) {
            return false;
        }
        return true;
    }
    function htmlDesc(desc) {
        var html = desc.html;
        if (!is$3.html(html)) {
            return false;
        }
        return true;
    }
    function textDesc(desc) {
        var text = desc.text, color = desc.color, fontSize = desc.fontSize, lineHeight = desc.lineHeight, fontFamily = desc.fontFamily, textAlign = desc.textAlign, fontWeight = desc.fontWeight, bgColor = desc.bgColor;
        if (!is$3.text(text)) {
            return false;
        }
        if (!is$3.color(color)) {
            return false;
        }
        if (!is$3.fontSize(fontSize)) {
            return false;
        }
        if (desc.hasOwnProperty('bgColor') && !is$3.color(bgColor)) {
            return false;
        }
        if (desc.hasOwnProperty('fontWeight') && !is$3.fontWeight(fontWeight)) {
            return false;
        }
        if (desc.hasOwnProperty('lineHeight') && !is$3.lineHeight(lineHeight)) {
            return false;
        }
        if (desc.hasOwnProperty('fontFamily') && !is$3.fontFamily(fontFamily)) {
            return false;
        }
        if (desc.hasOwnProperty('textAlign') && !is$3.textAlign(textAlign)) {
            return false;
        }
        if (!box(desc)) {
            return false;
        }
        return true;
    }
    var check = {
        attrs: attrs,
        textDesc: textDesc,
        rectDesc: rectDesc,
        circleDesc: circleDesc,
        imageDesc: imageDesc,
        svgDesc: svgDesc,
        htmlDesc: htmlDesc,
    };
    function parseRadianToAngle(radian) {
        return radian / Math.PI * 180;
    }
    function parseAngleToRadian(angle) {
        return angle / 180 * Math.PI;
    }
    function calcElementCenter(elem) {
        var p = {
            x: elem.x + elem.w / 2,
            y: elem.y + elem.h / 2,
        };
        return p;
    }
    function calcRadian(center, start, end) {
        var startAngle = calcLineAngle(center, start);
        var endAngle = calcLineAngle(center, end);
        if (endAngle !== null && startAngle !== null) {
            if (startAngle > Math.PI * 3 / 2 && endAngle < Math.PI / 2) {
                return endAngle + (Math.PI * 2 - startAngle);
            }
            else if (endAngle > Math.PI * 3 / 2 && startAngle < Math.PI / 2) {
                return startAngle + (Math.PI * 2 - endAngle);
            }
            else {
                return endAngle - startAngle;
            }
        }
        else {
            return 0;
        }
    }
    function calcLineAngle(center, p) {
        var x = p.x - center.x;
        var y = center.y - p.y;
        if (x === 0) {
            if (y < 0) {
                return Math.PI / 2;
            }
            else if (y > 0) {
                return Math.PI * (3 / 2);
            }
        }
        else if (y === 0) {
            if (x < 0) {
                return Math.PI;
            }
            else if (x > 0) {
                return 0;
            }
        }
        if (x > 0 && y < 0) {
            return Math.atan(Math.abs(y) / Math.abs(x));
        }
        else if (x < 0 && y < 0) {
            return Math.PI - Math.atan(Math.abs(y) / Math.abs(x));
        }
        else if (x < 0 && y > 0) {
            return Math.PI + Math.atan(Math.abs(y) / Math.abs(x));
        }
        else if (x > 0 && y > 0) {
            return Math.PI * 2 - Math.atan(Math.abs(y) / Math.abs(x));
        }
        return null;
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
    var istype$3 = index$2.istype, color = index$2.color;
    function clearContext(ctx) {
        ctx.setFillStyle('#000000');
        ctx.setStrokeStyle('#000000');
        ctx.setLineDash([]);
        ctx.setGlobalAlpha(1);
    }
    function drawBgColor(ctx, color) {
        var size = ctx.getSize();
        ctx.setFillStyle(color);
        ctx.fillRect(0, 0, size.contextWidth, size.contextHeight);
    }
    function drawBox(ctx, elem, pattern) {
        clearContext(ctx);
        drawBoxBorder(ctx, elem);
        rotateElement(ctx, elem, function () {
            var x = elem.x, y = elem.y, w = elem.w, h = elem.h;
            var r = elem.desc.borderRadius || 0;
            r = Math.min(r, w / 2, h / 2);
            if (w < r * 2 || h < r * 2) {
                r = 0;
            }
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            if (typeof pattern === 'string') {
                ctx.setFillStyle(pattern);
            }
            else if (['CanvasPattern'].includes(istype$3.type(pattern))) {
                ctx.setFillStyle(pattern);
            }
            ctx.fill();
        });
    }
    function drawBoxBorder(ctx, elem) {
        clearContext(ctx);
        rotateElement(ctx, elem, function () {
            if (!(elem.desc.borderWidth && elem.desc.borderWidth > 0)) {
                return;
            }
            var bw = elem.desc.borderWidth;
            var borderColor = '#000000';
            if (color.isColorStr(elem.desc.borderColor) === true) {
                borderColor = elem.desc.borderColor;
            }
            var x = elem.x - bw / 2;
            var y = elem.y - bw / 2;
            var w = elem.w + bw;
            var h = elem.h + bw;
            var r = elem.desc.borderRadius || 0;
            r = Math.min(r, w / 2, h / 2);
            if (r < w / 2 && r < h / 2) {
                r = r + bw / 2;
            }
            ctx.beginPath();
            ctx.setLineWidth(bw);
            ctx.setStrokeStyle(borderColor);
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            ctx.stroke();
        });
    }
    function drawRect(ctx, elem) {
        drawBox(ctx, elem, elem.desc.bgColor);
    }
    function drawImage(ctx, elem, loader) {
        var content = loader.getContent(elem.uuid);
        rotateElement(ctx, elem, function () {
            if (content) {
                ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
            }
        });
    }
    function drawSVG(ctx, elem, loader) {
        var content = loader.getContent(elem.uuid);
        rotateElement(ctx, elem, function () {
            if (content) {
                ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
            }
        });
    }
    function drawHTML(ctx, elem, loader) {
        var content = loader.getContent(elem.uuid);
        rotateElement(ctx, elem, function () {
            if (content) {
                ctx.drawImage(content, elem.x, elem.y, elem.w, elem.h);
            }
        });
    }
    function drawText(ctx, elem, loader, helperConfig) {
        clearContext(ctx);
        drawBox(ctx, elem, elem.desc.bgColor || 'transparent');
        rotateElement(ctx, elem, function () {
            var desc = __assign$1({
                fontSize: 12,
                fontFamily: 'sans-serif',
                textAlign: 'center',
            }, elem.desc);
            ctx.setFillStyle(elem.desc.color);
            ctx.setTextBaseline('top');
            ctx.setFont({
                fontWeight: desc.fontWeight,
                fontSize: desc.fontSize,
                fontFamily: desc.fontFamily
            });
            var descText = desc.text.replace(/\r\n/ig, '\n');
            var fontHeight = desc.lineHeight || desc.fontSize;
            var descTextList = descText.split('\n');
            var lines = [];
            descTextList.forEach(function (tempText) {
                var lineText = '';
                var lineNum = 0;
                for (var i = 0; i < tempText.length; i++) {
                    if (ctx.measureText(lineText + (tempText[i] || '')).width < ctx.calcDeviceNum(elem.w)) {
                        lineText += (tempText[i] || '');
                    }
                    else {
                        lines.push({
                            text: lineText,
                            width: ctx.calcScreenNum(ctx.measureText(lineText).width),
                        });
                        lineText = (tempText[i] || '');
                        lineNum++;
                    }
                    if ((lineNum + 1) * fontHeight > elem.h) {
                        break;
                    }
                    if (lineText && tempText.length - 1 === i) {
                        if ((lineNum + 1) * fontHeight < elem.h) {
                            lines.push({
                                text: lineText,
                                width: ctx.calcScreenNum(ctx.measureText(lineText).width),
                            });
                            break;
                        }
                    }
                }
            });
            var _y = elem.y;
            if (lines.length * fontHeight < elem.h) {
                _y += ((elem.h - lines.length * fontHeight) / 2);
            }
            lines.forEach(function (line, i) {
                var _x = elem.x;
                if (desc.textAlign === 'center') {
                    _x = elem.x + (elem.w - line.width) / 2;
                }
                else if (desc.textAlign === 'right') {
                    _x = elem.x + (elem.w - line.width);
                }
                ctx.fillText(line.text, _x, _y + fontHeight * i);
            });
        });
    }
    function drawCircle(ctx, elem) {
        rotateElement(ctx, elem, function (ctx) {
            var x = elem.x, y = elem.y, w = elem.w, h = elem.h, desc = elem.desc;
            var _a = desc.bgColor, bgColor = _a === void 0 ? '#000000' : _a, _b = desc.borderColor, borderColor = _b === void 0 ? '#000000' : _b, borderWidth = desc.borderWidth;
            var a = w / 2;
            var b = h / 2;
            var centerX = x + a;
            var centerY = y + b;
            var unit = (a > b) ? 1 / a : 1 / b;
            if (borderWidth && borderWidth > 0) {
                var ba = borderWidth / 2 + a;
                var bb = borderWidth / 2 + b;
                ctx.beginPath();
                ctx.setStrokeStyle(borderColor);
                ctx.setLineWidth(borderWidth);
                ctx.moveTo(centerX + ba, centerY);
                for (var i = 0; i < 2 * Math.PI; i += unit) {
                    ctx.lineTo(centerX + ba * Math.cos(i), centerY + bb * Math.sin(i));
                }
                ctx.lineTo(centerX + ba, centerY);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.setFillStyle(bgColor);
            ctx.moveTo(centerX + a, centerY);
            for (var i = 0; i < 2 * Math.PI; i += unit) {
                ctx.lineTo(centerX + a * Math.cos(i), centerY + b * Math.sin(i));
            }
            ctx.closePath();
            ctx.fill();
        });
    }
    function drawElementWrapper(ctx, config) {
        if (!(config === null || config === void 0 ? void 0 : config.selectedElementWrapper)) {
            return;
        }
        var wrapper = config.selectedElementWrapper;
        clearContext(ctx);
        rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function () {
            ctx.beginPath();
            ctx.setLineDash(wrapper.lineDash);
            ctx.setLineWidth(wrapper.lineWidth);
            ctx.setStrokeStyle(wrapper.color);
            ctx.moveTo(wrapper.dots.topLeft.x, wrapper.dots.topLeft.y);
            ctx.lineTo(wrapper.dots.topRight.x, wrapper.dots.topRight.y);
            ctx.lineTo(wrapper.dots.bottomRight.x, wrapper.dots.bottomRight.y);
            ctx.lineTo(wrapper.dots.bottomLeft.x, wrapper.dots.bottomLeft.y);
            ctx.lineTo(wrapper.dots.topLeft.x, wrapper.dots.topLeft.y - wrapper.lineWidth / 2);
            ctx.stroke();
            ctx.closePath();
            if (wrapper.lock !== true) {
                ctx.beginPath();
                ctx.moveTo(wrapper.dots.top.x, wrapper.dots.top.y);
                ctx.lineTo(wrapper.dots.rotate.x, wrapper.dots.rotate.y + wrapper.dotSize);
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.setLineWidth(wrapper.dotSize / 2);
                ctx.arc(wrapper.dots.rotate.x, wrapper.dots.rotate.y, wrapper.dotSize * 0.8, Math.PI / 6, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
                ctx.setFillStyle(wrapper.color);
                [
                    wrapper.dots.topLeft,
                    wrapper.dots.top,
                    wrapper.dots.topRight,
                    wrapper.dots.right,
                    wrapper.dots.bottomRight,
                    wrapper.dots.bottom,
                    wrapper.dots.bottomLeft,
                    wrapper.dots.left,
                ].forEach(function (dot) {
                    if (dot.invisible !== true) {
                        ctx.beginPath();
                        ctx.arc(dot.x, dot.y, wrapper.dotSize, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                    }
                });
            }
            else {
                clearContext(ctx);
                ctx.setStrokeStyle(wrapper.color);
                [
                    wrapper.dots.topLeft, wrapper.dots.top, wrapper.dots.topRight, wrapper.dots.right,
                    wrapper.dots.bottomRight, wrapper.dots.bottom, wrapper.dots.bottomLeft, wrapper.dots.left,
                ].forEach(function (dot) {
                    ctx.beginPath();
                    ctx.moveTo(dot.x - wrapper.dotSize / 2, dot.y - wrapper.dotSize / 2);
                    ctx.lineTo(dot.x + wrapper.dotSize / 2, dot.y + wrapper.dotSize / 2);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.moveTo(dot.x + wrapper.dotSize / 2, dot.y - wrapper.dotSize / 2);
                    ctx.lineTo(dot.x - wrapper.dotSize / 2, dot.y + wrapper.dotSize / 2);
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
        wrapperList === null || wrapperList === void 0 ? void 0 : wrapperList.forEach(function (wrapper) {
            clearContext(ctx);
            rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function () {
                clearContext(ctx);
                ctx.setGlobalAlpha(0.05);
                ctx.setFillStyle(wrapper.color);
                ctx.fillRect(wrapper.dots.topLeft.x, wrapper.dots.topLeft.y, wrapper.dots.bottomRight.x - wrapper.dots.topLeft.x, wrapper.dots.bottomRight.y - wrapper.dots.topLeft.y);
                clearContext(ctx);
                ctx.beginPath();
                ctx.setLineDash(wrapper.lineDash);
                ctx.setLineWidth(wrapper.lineWidth);
                ctx.setStrokeStyle(wrapper.color);
                ctx.moveTo(wrapper.dots.topLeft.x, wrapper.dots.topLeft.y);
                ctx.lineTo(wrapper.dots.topRight.x, wrapper.dots.topRight.y);
                ctx.lineTo(wrapper.dots.bottomRight.x, wrapper.dots.bottomRight.y);
                ctx.lineTo(wrapper.dots.bottomLeft.x, wrapper.dots.bottomLeft.y);
                ctx.lineTo(wrapper.dots.topLeft.x, wrapper.dots.topLeft.y - wrapper.lineWidth / 2);
                ctx.stroke();
                ctx.closePath();
                if (wrapper.lock === true) {
                    clearContext(ctx);
                    ctx.setStrokeStyle(wrapper.color);
                    [
                        wrapper.dots.topLeft, wrapper.dots.top, wrapper.dots.topRight, wrapper.dots.right,
                        wrapper.dots.bottomRight, wrapper.dots.bottom, wrapper.dots.bottomLeft, wrapper.dots.left,
                    ].forEach(function (dot) {
                        ctx.beginPath();
                        ctx.moveTo(dot.x - wrapper.dotSize / 2, dot.y - wrapper.dotSize / 2);
                        ctx.lineTo(dot.x + wrapper.dotSize / 2, dot.y + wrapper.dotSize / 2);
                        ctx.stroke();
                        ctx.closePath();
                        ctx.beginPath();
                        ctx.moveTo(dot.x + wrapper.dotSize / 2, dot.y - wrapper.dotSize / 2);
                        ctx.lineTo(dot.x - wrapper.dotSize / 2, dot.y + wrapper.dotSize / 2);
                        ctx.stroke();
                        ctx.closePath();
                    });
                }
            });
        });
    }
    var isColorStr$4 = index$2.color.isColorStr;
    function drawContext(ctx, data, helperConfig, loader) {
        var _a;
        clearContext(ctx);
        var size = ctx.getSize();
        ctx.clearRect(0, 0, size.contextWidth, size.contextHeight);
        if (typeof data.bgColor === 'string' && isColorStr$4(data.bgColor)) {
            drawBgColor(ctx, data.bgColor);
        }
        if (!(data.elements.length > 0)) {
            return;
        }
        for (var i = 0; i < data.elements.length; i++) {
            var elem = data.elements[i];
            if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.invisible) === true) {
                continue;
            }
            switch (elem.type) {
                case 'rect': {
                    drawRect(ctx, elem);
                    break;
                }
                case 'text': {
                    drawText(ctx, elem);
                    break;
                }
                case 'image': {
                    drawImage(ctx, elem, loader);
                    break;
                }
                case 'svg': {
                    drawSVG(ctx, elem, loader);
                    break;
                }
                case 'html': {
                    drawHTML(ctx, elem, loader);
                    break;
                }
                case 'circle': {
                    drawCircle(ctx, elem);
                    break;
                }
            }
        }
        drawElementWrapper(ctx, helperConfig);
        drawAreaWrapper(ctx, helperConfig);
        drawElementListWrappers(ctx, helperConfig);
    }
    var defaultConfig = {
        elementWrapper: {
            color: '#2ab6f1',
            lockColor: '#aaaaaa',
            dotSize: 6,
            lineWidth: 1,
            lineDash: [4, 3],
        }
    };
    function mergeConfig(config) {
        var result = index$2.data.deepClone(defaultConfig);
        if (config) {
            if (config.elementWrapper) {
                result.elementWrapper = __assign$1(__assign$1({}, result.elementWrapper), config.elementWrapper);
            }
        }
        return result;
    }
    var CoreEvent = (function () {
        function CoreEvent() {
            this._listeners = new Map();
        }
        CoreEvent.prototype.on = function (eventKey, callback) {
            if (this._listeners.has(eventKey)) {
                var callbacks = this._listeners.get(eventKey);
                callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
                this._listeners.set(eventKey, callbacks || []);
            }
            else {
                this._listeners.set(eventKey, [callback]);
            }
        };
        CoreEvent.prototype.off = function (eventKey, callback) {
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
        CoreEvent.prototype.trigger = function (eventKey, arg) {
            var callbacks = this._listeners.get(eventKey);
            if (Array.isArray(callbacks)) {
                callbacks.forEach(function (cb) {
                    cb(arg);
                });
                return true;
            }
            else {
                return false;
            }
        };
        CoreEvent.prototype.has = function (name) {
            if (this._listeners.has(name)) {
                var list = this._listeners.get(name);
                if (Array.isArray(list) && list.length > 0) {
                    return true;
                }
            }
            return false;
        };
        return CoreEvent;
    }());
    function isChangeImageElementResource(before, after) {
        var _a, _b;
        return (((_a = before === null || before === void 0 ? void 0 : before.desc) === null || _a === void 0 ? void 0 : _a.src) !== ((_b = after === null || after === void 0 ? void 0 : after.desc) === null || _b === void 0 ? void 0 : _b.src));
    }
    function isChangeSVGElementResource(before, after) {
        var _a, _b;
        return (((_a = before === null || before === void 0 ? void 0 : before.desc) === null || _a === void 0 ? void 0 : _a.svg) !== ((_b = after === null || after === void 0 ? void 0 : after.desc) === null || _b === void 0 ? void 0 : _b.svg));
    }
    function isChangeHTMLElementResource(before, after) {
        var _a, _b, _c, _d, _e, _f;
        return (((_a = before === null || before === void 0 ? void 0 : before.desc) === null || _a === void 0 ? void 0 : _a.html) !== ((_b = after === null || after === void 0 ? void 0 : after.desc) === null || _b === void 0 ? void 0 : _b.html)
            || ((_c = before === null || before === void 0 ? void 0 : before.desc) === null || _c === void 0 ? void 0 : _c.width) !== ((_d = after === null || after === void 0 ? void 0 : after.desc) === null || _d === void 0 ? void 0 : _d.width)
            || ((_e = before === null || before === void 0 ? void 0 : before.desc) === null || _e === void 0 ? void 0 : _e.height) !== ((_f = after === null || after === void 0 ? void 0 : after.desc) === null || _f === void 0 ? void 0 : _f.height));
    }
    function diffElementResourceChange(before, after) {
        var result = null;
        var isChange = false;
        switch (after.type) {
            case 'image': {
                isChange = isChangeImageElementResource(before, after);
                break;
            }
            case 'svg': {
                isChange = isChangeSVGElementResource(before, after);
                break;
            }
            case 'html': {
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
        var uuids = [];
        var beforeMap = parseDataElementMap(before);
        var afterMap = parseDataElementMap(after);
        for (var uuid in afterMap) {
            if (['image', 'svg', 'html'].includes((_a = afterMap[uuid]) === null || _a === void 0 ? void 0 : _a.type) !== true) {
                continue;
            }
            if (beforeMap[uuid]) {
                var isChange = false;
                switch (beforeMap[uuid].type) {
                    case 'image': {
                        isChange = isChangeImageElementResource(beforeMap[uuid], afterMap[uuid]);
                        break;
                    }
                    case 'svg': {
                        isChange = isChangeSVGElementResource(beforeMap[uuid], afterMap[uuid]);
                        break;
                    }
                    case 'html': {
                        isChange = isChangeHTMLElementResource(beforeMap[uuid], afterMap[uuid]);
                        break;
                    }
                }
                if (isChange === true) {
                    uuids.push(uuid);
                }
            }
            else {
                uuids.push(uuid);
            }
        }
        return uuids;
    }
    function parseDataElementMap(data) {
        var elemMap = {};
        data.elements.forEach(function (elem) {
            elemMap[elem.uuid] = elem;
        });
        return elemMap;
    }
    function limitNum(num) {
        var numStr = num.toFixed(2);
        return parseFloat(numStr);
    }
    function limitAngle(angle) {
        return limitNum(angle % 360);
    }
    var elementTypes = {
        'text': {},
        'rect': {},
        'image': {},
        'svg': {},
        'circle': {},
        'html': {},
    };
    var elementNames = Object.keys(elementTypes);
    var LIMIT_QBLIQUE_ANGLE = 15;
    var createUUID$1 = index$2.uuid.createUUID;
    var limitQbliqueAngle$1 = LIMIT_QBLIQUE_ANGLE;
    var Element = (function () {
        function Element(ctx) {
            this._ctx = ctx;
        }
        Element.prototype.initData = function (data) {
            data.elements.forEach(function (elem) {
                if (!(elem.uuid && typeof elem.uuid === 'string')) {
                    elem.uuid = createUUID$1();
                }
            });
            return data;
        };
        Element.prototype.isPointInElement = function (p, data) {
            var _a;
            var ctx = this._ctx;
            var idx = -1;
            var uuid = null;
            var _loop_1 = function (i) {
                var ele = data.elements[i];
                var bw = 0;
                if (((_a = ele.desc) === null || _a === void 0 ? void 0 : _a.borderWidth) > 0) {
                    bw = ele.desc.borderWidth;
                }
                rotateElement(ctx, ele, function () {
                    ctx.beginPath();
                    ctx.moveTo(ele.x - bw, ele.y - bw);
                    ctx.lineTo(ele.x + ele.w + bw, ele.y - bw);
                    ctx.lineTo(ele.x + ele.w + bw, ele.y + ele.h + bw);
                    ctx.lineTo(ele.x - bw, ele.y + ele.h + bw);
                    ctx.lineTo(ele.x, ele.y);
                    ctx.rect(ele.x, ele.y, ele.w, ele.h);
                    ctx.closePath();
                    if (ctx.isPointInPath(p.x, p.y)) {
                        idx = i;
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
        Element.prototype.dragElement = function (data, uuid, point, prevPoint, scale) {
            var index = this.getElementIndex(data, uuid);
            if (!data.elements[index]) {
                return;
            }
            var moveX = point.x - prevPoint.x;
            var moveY = point.y - prevPoint.y;
            data.elements[index].x += (moveX / scale);
            data.elements[index].y += (moveY / scale);
            this.limitElementAttrs(data.elements[index]);
        };
        Element.prototype.transformElement = function (data, uuid, point, prevPoint, scale, direction) {
            var _a, _b;
            var index = this.getElementIndex(data, uuid);
            if (!data.elements[index]) {
                return null;
            }
            if (((_b = (_a = data.elements[index]) === null || _a === void 0 ? void 0 : _a.operation) === null || _b === void 0 ? void 0 : _b.lock) === true) {
                return null;
            }
            var moveX = (point.x - prevPoint.x) / scale;
            var moveY = (point.y - prevPoint.y) / scale;
            var elem = data.elements[index];
            if ([
                'top-left', 'top', 'top-right', 'right',
                'bottom-right', 'bottom', 'bottom-left', 'left'
            ].includes(direction)) {
                var p = calcuScaleElemPosition(elem, moveX, moveY, direction);
                elem.x = p.x;
                elem.y = p.y;
                elem.w = p.w;
                elem.h = p.h;
            }
            else if (direction === 'rotate') {
                var center = calcElementCenter(elem);
                var radian = calcRadian(center, prevPoint, point);
                elem.angle = (elem.angle || 0) + parseRadianToAngle(radian);
            }
            this.limitElementAttrs(elem);
            return {
                width: limitNum(elem.w),
                height: limitNum(elem.h),
                angle: limitAngle(elem.angle || 0),
            };
        };
        Element.prototype.getElementIndex = function (data, uuid) {
            var idx = -1;
            for (var i = 0; i < data.elements.length; i++) {
                if (data.elements[i].uuid === uuid) {
                    idx = i;
                    break;
                }
            }
            return idx;
        };
        Element.prototype.limitElementAttrs = function (elem) {
            elem.x = limitNum(elem.x);
            elem.y = limitNum(elem.y);
            elem.w = limitNum(elem.w);
            elem.h = limitNum(elem.h);
            elem.angle = limitAngle(elem.angle || 0);
        };
        return Element;
    }());
    function calcuScaleElemPosition(elem, moveX, moveY, direction, scale) {
        var p = { x: elem.x, y: elem.y, w: elem.w, h: elem.h };
        elem.angle;
        switch (direction) {
            case 'top-left': {
                if (elem.w - moveX > 0 && elem.h - moveY > 0) {
                    p.x += moveX;
                    p.y += moveY;
                    p.w -= moveX;
                    p.h -= moveY;
                }
                break;
            }
            case 'top': {
                if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
                    if (p.h - moveY > 0) {
                        p.y += moveY;
                        p.h -= moveY;
                    }
                }
                else if (elem.angle > 0 || elem.angle < 0) {
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
                    }
                    else if (angle_1 < 180) {
                        moveDist = changeMoveDistDirect(moveDist, moveX);
                        var radian = parseRadian(angle_1 - 90);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX + centerMoveDist * Math.cos(radian);
                        centerY = centerY + centerMoveDist * Math.sin(radian);
                    }
                    else if (angle_1 < 270) {
                        moveDist = changeMoveDistDirect(moveDist, moveY);
                        var radian = parseRadian(angle_1 - 180);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX - centerMoveDist * Math.sin(radian);
                        centerY = centerY + centerMoveDist * Math.cos(radian);
                    }
                    else if (angle_1 < 360) {
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
                }
                else {
                    if (p.h - moveY > 0) {
                        p.y += moveY;
                        p.h -= moveY;
                    }
                }
                break;
            }
            case 'top-right': {
                if (p.h - moveY > 0 && p.w + moveX > 0) {
                    p.y += moveY;
                    p.w += moveX;
                    p.h -= moveY;
                }
                break;
            }
            case 'right': {
                if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
                    if (elem.w + moveX > 0) {
                        p.w += moveX;
                    }
                }
                else if (elem.angle > 0 || elem.angle < 0) {
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
                    }
                    else if (angle_2 < 180) {
                        moveDist = changeMoveDistDirect(moveDist, moveY);
                        var radian = parseRadian(angle_2 - 90);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX - centerMoveDist * Math.sin(radian);
                        centerY = centerY + centerMoveDist * Math.cos(radian);
                    }
                    else if (angle_2 < 270) {
                        moveDist = changeMoveDistDirect(moveDist, moveY);
                        var radian = parseRadian(angle_2 - 180);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX + centerMoveDist * Math.cos(radian);
                        centerY = centerY + centerMoveDist * Math.sin(radian);
                        moveDist = 0 - moveDist;
                    }
                    else if (angle_2 < 360) {
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
                }
                else {
                    if (elem.w + moveX > 0) {
                        p.w += moveX;
                    }
                }
                break;
            }
            case 'bottom-right': {
                if (elem.w + moveX > 0 && elem.h + moveY > 0) {
                    p.w += moveX;
                    p.h += moveY;
                }
                break;
            }
            case 'bottom': {
                if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
                    if (elem.h + moveY > 0) {
                        p.h += moveY;
                    }
                }
                else if (elem.angle > 0 || elem.angle < 0) {
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
                    }
                    else if (angle_3 < 180) {
                        moveDist = 0 - changeMoveDistDirect(moveDist, moveX);
                        var radian = parseRadian(angle_3 - 90);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX - centerMoveDist * Math.cos(radian);
                        centerY = centerY - centerMoveDist * Math.sin(radian);
                    }
                    else if (angle_3 < 270) {
                        moveDist = changeMoveDistDirect(moveDist, moveX);
                        var radian = parseRadian(angle_3 - 180);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX + centerMoveDist * Math.sin(radian);
                        centerY = centerY - centerMoveDist * Math.cos(radian);
                    }
                    else if (angle_3 < 360) {
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
                }
                else {
                    if (elem.h + moveY > 0) {
                        p.h += moveY;
                    }
                }
                break;
            }
            case 'bottom-left': {
                if (elem.w - moveX > 0 && elem.h + moveY > 0) {
                    p.x += moveX;
                    p.w -= moveX;
                    p.h += moveY;
                }
                break;
            }
            case 'left': {
                if (elem.angle === 0 || Math.abs(elem.angle) < limitQbliqueAngle$1) {
                    if (elem.w - moveX > 0) {
                        p.x += moveX;
                        p.w -= moveX;
                    }
                }
                else if (elem.angle > 0 || elem.angle < 0) {
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
                    }
                    else if (angle_4 < 180) {
                        moveDist = changeMoveDistDirect(moveDist, moveX);
                        var radian = parseRadian(angle_4 - 90);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX + centerMoveDist * Math.sin(radian);
                        centerY = centerY - centerMoveDist * Math.cos(radian);
                    }
                    else if (angle_4 < 270) {
                        moveDist = changeMoveDistDirect(moveDist, moveY);
                        var radian = parseRadian(angle_4 - 180);
                        var centerMoveDist = moveDist / 2;
                        centerX = centerX + centerMoveDist * Math.cos(radian);
                        centerY = centerY + centerMoveDist * Math.sin(radian);
                    }
                    else if (angle_4 < 360) {
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
                }
                else {
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
    function parseRadian(angle) {
        return angle * Math.PI / 180;
    }
    function calcMoveDist(moveX, moveY) {
        return Math.sqrt(moveX * moveX + moveY * moveY);
    }
    function changeMoveDistDirect(moveDist, moveDirect) {
        return moveDirect > 0 ? Math.abs(moveDist) : 0 - Math.abs(moveDist);
    }
    var limitQbliqueAngle = LIMIT_QBLIQUE_ANGLE;
    var deepClone$4 = index$2.data.deepClone;
    var Helper = (function () {
        function Helper(board, config) {
            this._areaStart = { x: 0, y: 0 };
            this._areaEnd = { x: 0, y: 0 };
            this._board = board;
            this._ctx = this._board.getContext();
            this._coreConfig = config;
            this._helperConfig = {
                elementIndexMap: {}
            };
        }
        Helper.prototype.updateConfig = function (data, opts) {
            this._updateElementIndex(data);
            this._updateSelectedElementWrapper(data, opts);
            this._updateSelectedElementListWrapper(data, opts);
        };
        Helper.prototype.getConfig = function () {
            return deepClone$4(this._helperConfig);
        };
        Helper.prototype.getElementIndexByUUID = function (uuid) {
            var index = this._helperConfig.elementIndexMap[uuid];
            if (index >= 0) {
                return index;
            }
            return null;
        };
        Helper.prototype.isPointInElementWrapperDot = function (p, data) {
            var _a, _b;
            var ctx = this._ctx;
            var uuid = ((_b = (_a = this._helperConfig) === null || _a === void 0 ? void 0 : _a.selectedElementWrapper) === null || _b === void 0 ? void 0 : _b.uuid) || null;
            var directIndex = null;
            var selectedDotDirection = null;
            var hoverDotDirection = null;
            if (!this._helperConfig.selectedElementWrapper) {
                return { uuid: uuid, selectedDotDirection: selectedDotDirection, directIndex: directIndex, hoverDotDirection: hoverDotDirection };
            }
            var wrapper = this._helperConfig.selectedElementWrapper;
            var dots = [
                wrapper.dots.right,
                wrapper.dots.topRight,
                wrapper.dots.top,
                wrapper.dots.topLeft,
                wrapper.dots.left,
                wrapper.dots.bottomLeft,
                wrapper.dots.bottom,
                wrapper.dots.bottomRight,
            ];
            var directionNames = [
                'right',
                'top-right',
                'top',
                'top-left',
                'left',
                'bottom-left',
                'bottom',
                'bottom-right',
            ];
            var hoverDirectionNames = index$2.data.deepClone(directionNames);
            var angleMoveNum = 0;
            if (data && uuid) {
                var elemIdx = this.getElementIndexByUUID(uuid);
                if (elemIdx !== null && elemIdx >= 0) {
                    var elem = data.elements[elemIdx];
                    var angle = elem.angle;
                    if (angle < 0) {
                        angle += 360;
                    }
                    if (angle < 45) {
                        angleMoveNum = 0;
                    }
                    else if (angle < 90) {
                        angleMoveNum = 1;
                    }
                    else if (angle < 135) {
                        angleMoveNum = 2;
                    }
                    else if (angle < 180) {
                        angleMoveNum = 3;
                    }
                    else if (angle < 225) {
                        angleMoveNum = 4;
                    }
                    else if (angle < 270) {
                        angleMoveNum = 5;
                    }
                    else if (angle < 315) {
                        angleMoveNum = 6;
                    }
                }
            }
            if (angleMoveNum > 0) {
                hoverDirectionNames = hoverDirectionNames.slice(-angleMoveNum).concat(hoverDirectionNames.slice(0, -angleMoveNum));
            }
            rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function () {
                for (var i = 0; i < dots.length; i++) {
                    var dot = dots[i];
                    if (dot.invisible === true) {
                        continue;
                    }
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, wrapper.dotSize, 0, Math.PI * 2);
                    ctx.closePath();
                    if (ctx.isPointInPath(p.x, p.y)) {
                        selectedDotDirection = directionNames[i];
                        hoverDotDirection = hoverDirectionNames[i];
                    }
                    if (selectedDotDirection) {
                        directIndex = i;
                        break;
                    }
                }
            });
            if (selectedDotDirection === null) {
                rotateContext(ctx, wrapper.translate, wrapper.radian || 0, function () {
                    var dot = wrapper.dots.rotate;
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, wrapper.dotSize, 0, Math.PI * 2);
                    ctx.closePath();
                    if (ctx.isPointInPath(p.x, p.y)) {
                        selectedDotDirection = 'rotate';
                        hoverDotDirection = 'rotate';
                    }
                });
            }
            return { uuid: uuid, selectedDotDirection: selectedDotDirection, hoverDotDirection: hoverDotDirection, directIndex: directIndex };
        };
        Helper.prototype.isPointInElementList = function (p, data) {
            var _a, _b;
            var ctx = this._ctx;
            var idx = -1;
            var uuid = null;
            var wrapperList = ((_a = this._helperConfig) === null || _a === void 0 ? void 0 : _a.selectedElementListWrappers) || [];
            var _loop_1 = function (i) {
                var wrapper = wrapperList[i];
                var elemIdx = this_1._helperConfig.elementIndexMap[wrapper.uuid];
                var ele = data.elements[elemIdx];
                if (!ele)
                    return "continue";
                var bw = 0;
                if (((_b = ele.desc) === null || _b === void 0 ? void 0 : _b.borderWidth) > 0) {
                    bw = ele.desc.borderWidth;
                }
                rotateElement(ctx, ele, function () {
                    ctx.beginPath();
                    ctx.moveTo(ele.x - bw, ele.y - bw);
                    ctx.lineTo(ele.x + ele.w + bw, ele.y - bw);
                    ctx.lineTo(ele.x + ele.w + bw, ele.y + ele.h + bw);
                    ctx.lineTo(ele.x - bw, ele.y + ele.h + bw);
                    ctx.lineTo(ele.x, ele.y);
                    ctx.rect(ele.x, ele.y, ele.w, ele.h);
                    ctx.closePath();
                    if (ctx.isPointInPath(p.x, p.y)) {
                        idx = i;
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
            }
            else {
                return false;
            }
        };
        Helper.prototype.startSelectArea = function (p) {
            this._areaStart = p;
            this._areaEnd = p;
        };
        Helper.prototype.changeSelectArea = function (p) {
            this._areaEnd = p;
            this._calcSelectedArea();
        };
        Helper.prototype.clearSelectedArea = function () {
            this._areaStart = { x: 0, y: 0 };
            this._areaEnd = { x: 0, y: 0 };
            this._calcSelectedArea();
        };
        Helper.prototype.calcSelectedElements = function (data) {
            var transform = this._ctx.getTransform();
            var _a = transform.scale, scale = _a === void 0 ? 1 : _a, _b = transform.scrollX, scrollX = _b === void 0 ? 0 : _b, _c = transform.scrollY, scrollY = _c === void 0 ? 0 : _c;
            var start = this._areaStart;
            var end = this._areaEnd;
            var x = (Math.min(start.x, end.x) - scrollX) / scale;
            var y = (Math.min(start.y, end.y) - scrollY) / scale;
            var w = Math.abs(end.x - start.x) / scale;
            var h = Math.abs(end.y - start.y) / scale;
            var uuids = [];
            var ctx = this._ctx;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + w, y);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x, y);
            ctx.closePath();
            data.elements.forEach(function (elem) {
                var _a;
                if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.invisible) !== true) {
                    var centerX = elem.x + elem.w / 2;
                    var centerY = elem.y + elem.h / 2;
                    if (ctx.isPointInPathWithoutScroll(centerX, centerY)) {
                        uuids.push(elem.uuid);
                    }
                }
            });
            return uuids;
        };
        Helper.prototype._calcSelectedArea = function () {
            var start = this._areaStart;
            var end = this._areaEnd;
            var transform = this._ctx.getTransform();
            var _a = transform.scale, scale = _a === void 0 ? 1 : _a, _b = transform.scrollX, scrollX = _b === void 0 ? 0 : _b, _c = transform.scrollY, scrollY = _c === void 0 ? 0 : _c;
            var elemWrapper = this._coreConfig.elementWrapper;
            var lineWidth = elemWrapper.lineWidth / scale;
            var lineDash = elemWrapper.lineDash.map(function (n) { return (n / scale); });
            this._helperConfig.selectedAreaWrapper = {
                x: (Math.min(start.x, end.x) - scrollX) / scale,
                y: (Math.min(start.y, end.y) - scrollY) / scale,
                w: Math.abs(end.x - start.x) / scale,
                h: Math.abs(end.y - start.y) / scale,
                startPoint: { x: start.x, y: start.y },
                endPoint: { x: end.x, y: end.y },
                lineWidth: lineWidth,
                lineDash: lineDash,
                color: elemWrapper.color,
            };
        };
        Helper.prototype._updateElementIndex = function (data) {
            var _this = this;
            this._helperConfig.elementIndexMap = {};
            data.elements.forEach(function (elem, i) {
                _this._helperConfig.elementIndexMap[elem.uuid] = i;
            });
        };
        Helper.prototype._updateSelectedElementWrapper = function (data, opts) {
            var _a;
            var uuid = opts.selectedUUID;
            if (!(typeof uuid === 'string' && this._helperConfig.elementIndexMap[uuid] >= 0)) {
                delete this._helperConfig.selectedElementWrapper;
                return;
            }
            var index = this._helperConfig.elementIndexMap[uuid];
            var elem = data.elements[index];
            if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.invisible) === true) {
                return;
            }
            var wrapper = this._createSelectedElementWrapper(elem, opts);
            this._helperConfig.selectedElementWrapper = wrapper;
        };
        Helper.prototype._updateSelectedElementListWrapper = function (data, opts) {
            var _this = this;
            var selectedUUIDList = opts.selectedUUIDList;
            var wrapperList = [];
            data.elements.forEach(function (elem, i) {
                if (selectedUUIDList === null || selectedUUIDList === void 0 ? void 0 : selectedUUIDList.includes(elem.uuid)) {
                    var wrapper = _this._createSelectedElementWrapper(elem, opts);
                    wrapperList.push(wrapper);
                }
            });
            this._helperConfig.selectedElementListWrappers = wrapperList;
        };
        Helper.prototype._createSelectedElementWrapper = function (elem, opts) {
            var _a, _b, _c;
            var scale = opts.scale;
            var elemWrapper = this._coreConfig.elementWrapper;
            var dotSize = elemWrapper.dotSize / scale;
            var lineWidth = elemWrapper.lineWidth / scale;
            var lineDash = elemWrapper.lineDash.map(function (n) { return (n / scale); });
            var rotateLimit = 12;
            var bw = ((_a = elem.desc) === null || _a === void 0 ? void 0 : _a.borderWidth) || 0;
            var hideObliqueDirection = false;
            if (typeof elem.angle === 'number' && Math.abs(elem.angle) > limitQbliqueAngle) {
                hideObliqueDirection = true;
            }
            var wrapper = {
                uuid: elem.uuid,
                dotSize: dotSize,
                lock: ((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.lock) === true,
                dots: {
                    topLeft: {
                        x: elem.x - dotSize - bw,
                        y: elem.y - dotSize - bw,
                        invisible: hideObliqueDirection,
                    },
                    top: {
                        x: elem.x + elem.w / 2,
                        y: elem.y - dotSize - bw,
                    },
                    topRight: {
                        x: elem.x + elem.w + dotSize + bw,
                        y: elem.y - dotSize - bw,
                        invisible: hideObliqueDirection,
                    },
                    right: {
                        x: elem.x + elem.w + dotSize + bw,
                        y: elem.y + elem.h / 2,
                    },
                    bottomRight: {
                        x: elem.x + elem.w + dotSize + bw,
                        y: elem.y + elem.h + dotSize + bw,
                        invisible: hideObliqueDirection,
                    },
                    bottom: {
                        x: elem.x + elem.w / 2,
                        y: elem.y + elem.h + dotSize + bw,
                    },
                    bottomLeft: {
                        x: elem.x - dotSize - bw,
                        y: elem.y + elem.h + dotSize + bw,
                        invisible: hideObliqueDirection,
                    },
                    left: {
                        x: elem.x - dotSize - bw,
                        y: elem.y + elem.h / 2,
                    },
                    rotate: {
                        x: elem.x + elem.w / 2,
                        y: elem.y - dotSize - (dotSize * 2 + rotateLimit) - bw,
                    }
                },
                lineWidth: lineWidth,
                lineDash: lineDash,
                color: ((_c = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _c === void 0 ? void 0 : _c.lock) === true ? elemWrapper.lockColor : elemWrapper.color,
            };
            if (typeof elem.angle === 'number' && (elem.angle > 0 || elem.angle < 0)) {
                wrapper.radian = parseAngleToRadian(elem.angle);
                wrapper.translate = calcElementCenter(elem);
            }
            return wrapper;
        };
        return Helper;
    }());
    var LoaderEvent = (function () {
        function LoaderEvent() {
            this._listeners = new Map();
        }
        LoaderEvent.prototype.on = function (eventKey, callback) {
            if (this._listeners.has(eventKey)) {
                var callbacks = this._listeners.get(eventKey);
                callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
                this._listeners.set(eventKey, callbacks || []);
            }
            else {
                this._listeners.set(eventKey, [callback]);
            }
        };
        LoaderEvent.prototype.off = function (eventKey, callback) {
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
        LoaderEvent.prototype.trigger = function (eventKey, arg) {
            var callbacks = this._listeners.get(eventKey);
            if (Array.isArray(callbacks)) {
                callbacks.forEach(function (cb) {
                    cb(arg);
                });
                return true;
            }
            else {
                return false;
            }
        };
        LoaderEvent.prototype.has = function (name) {
            if (this._listeners.has(name)) {
                var list = this._listeners.get(name);
                if (Array.isArray(list) && list.length > 0) {
                    return true;
                }
            }
            return false;
        };
        return LoaderEvent;
    }());
    function filterScript(html) {
        return html.replace(/<script[\s\S]*?<\/script>/ig, '');
    }
    var _a$2 = index$2.loader, loadImage$3 = _a$2.loadImage, loadSVG$3 = _a$2.loadSVG, loadHTML$3 = _a$2.loadHTML;
    var LoaderStatus;
    (function (LoaderStatus) {
        LoaderStatus["FREE"] = "free";
        LoaderStatus["LOADING"] = "loading";
        LoaderStatus["COMPLETE"] = "complete";
    })(LoaderStatus || (LoaderStatus = {}));
    var Loader = (function () {
        function Loader(opts) {
            this._currentLoadData = {};
            this._currentUUIDQueue = [];
            this._storageLoadData = {};
            this._status = LoaderStatus.FREE;
            this._waitingLoadQueue = [];
            this._opts = opts;
            this._event = new LoaderEvent();
            this._waitingLoadQueue = [];
        }
        Loader.prototype.load = function (data, changeResourceUUIDs) {
            var _a = this._resetLoadData(data, changeResourceUUIDs), uuidQueue = _a[0], loadData = _a[1];
            if (this._status === LoaderStatus.FREE || this._status === LoaderStatus.COMPLETE) {
                this._currentUUIDQueue = uuidQueue;
                this._currentLoadData = loadData;
                this._loadTask();
            }
            else if (this._status === LoaderStatus.LOADING && uuidQueue.length > 0) {
                this._waitingLoadQueue.push({
                    uuidQueue: uuidQueue,
                    loadData: loadData,
                });
            }
        };
        Loader.prototype.on = function (name, callback) {
            this._event.on(name, callback);
        };
        Loader.prototype.off = function (name, callback) {
            this._event.off(name, callback);
        };
        Loader.prototype.isComplete = function () {
            return this._status === LoaderStatus.COMPLETE;
        };
        Loader.prototype.getContent = function (uuid) {
            var _a;
            if (((_a = this._storageLoadData[uuid]) === null || _a === void 0 ? void 0 : _a.status) === 'loaded') {
                return this._storageLoadData[uuid].content;
            }
            return null;
        };
        Loader.prototype._resetLoadData = function (data, changeResourceUUIDs) {
            var loadData = {};
            var uuidQueue = [];
            var storageLoadData = this._storageLoadData;
            for (var i = data.elements.length - 1; i >= 0; i--) {
                var elem = data.elements[i];
                if (['image', 'svg', 'html',].includes(elem.type)) {
                    if (!storageLoadData[elem.uuid]) {
                        loadData[elem.uuid] = this._createEmptyLoadItem(elem);
                        uuidQueue.push(elem.uuid);
                    }
                    else {
                        if (changeResourceUUIDs.includes(elem.uuid)) {
                            loadData[elem.uuid] = this._createEmptyLoadItem(elem);
                            uuidQueue.push(elem.uuid);
                        }
                    }
                }
            }
            return [uuidQueue, loadData];
        };
        Loader.prototype._createEmptyLoadItem = function (elem) {
            var source = '';
            var type = elem.type;
            var elemW = elem.w;
            var elemH = elem.h;
            if (elem.type === 'image') {
                var _elem = elem;
                source = _elem.desc.src || '';
            }
            else if (elem.type === 'svg') {
                var _elem = elem;
                source = _elem.desc.svg || '';
            }
            else if (elem.type === 'html') {
                var _elem = elem;
                source = filterScript(_elem.desc.html || '');
                elemW = _elem.desc.width || elem.w;
                elemH = _elem.desc.height || elem.h;
            }
            return {
                type: type,
                status: 'null',
                content: null,
                source: source,
                elemW: elemW,
                elemH: elemH,
            };
        };
        Loader.prototype._loadTask = function () {
            var _this = this;
            if (this._status === LoaderStatus.LOADING) {
                return;
            }
            this._status = LoaderStatus.LOADING;
            if (this._currentUUIDQueue.length === 0) {
                if (this._waitingLoadQueue.length === 0) {
                    this._status = LoaderStatus.COMPLETE;
                    this._event.trigger('complete', undefined);
                    return;
                }
                else {
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
            var uuidMap = {};
            uuids.forEach(function (url, i) {
                uuidMap[url] = i;
            });
            var loadUUIDList = [];
            var _loadAction = function () {
                if (loadUUIDList.length >= maxParallelNum) {
                    return false;
                }
                if (uuids.length === 0) {
                    return true;
                }
                var _loop_1 = function (i) {
                    var uuid = uuids.shift();
                    if (uuid === undefined) {
                        return "break";
                    }
                    loadUUIDList.push(uuid);
                    _this._loadElementSource(_this._currentLoadData[uuid]).then(function (image) {
                        loadUUIDList.splice(loadUUIDList.indexOf(uuid), 1);
                        var status = _loadAction();
                        _this._storageLoadData[uuid] = {
                            type: _this._currentLoadData[uuid].type,
                            status: 'loaded',
                            content: image,
                            source: _this._currentLoadData[uuid].source,
                            elemW: _this._currentLoadData[uuid].elemW,
                            elemH: _this._currentLoadData[uuid].elemH,
                        };
                        if (loadUUIDList.length === 0 && uuids.length === 0 && status === true) {
                            _this._status = LoaderStatus.FREE;
                            _this._loadTask();
                        }
                        _this._event.trigger('load', {
                            type: _this._storageLoadData[uuid].type,
                            status: _this._storageLoadData[uuid].status,
                            content: _this._storageLoadData[uuid].content,
                            source: _this._storageLoadData[uuid].source,
                            elemW: _this._storageLoadData[uuid].elemW,
                            elemH: _this._storageLoadData[uuid].elemH,
                        });
                    }).catch(function (err) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                        console.warn(err);
                        loadUUIDList.splice(loadUUIDList.indexOf(uuid), 1);
                        var status = _loadAction();
                        if (_this._currentLoadData[uuid]) {
                            _this._storageLoadData[uuid] = {
                                type: (_a = _this._currentLoadData[uuid]) === null || _a === void 0 ? void 0 : _a.type,
                                status: 'fail',
                                content: null,
                                error: err,
                                source: (_b = _this._currentLoadData[uuid]) === null || _b === void 0 ? void 0 : _b.source,
                                elemW: (_c = _this._currentLoadData[uuid]) === null || _c === void 0 ? void 0 : _c.elemW,
                                elemH: (_d = _this._currentLoadData[uuid]) === null || _d === void 0 ? void 0 : _d.elemH,
                            };
                        }
                        if (loadUUIDList.length === 0 && uuids.length === 0 && status === true) {
                            _this._status = LoaderStatus.FREE;
                            _this._loadTask();
                        }
                        if (_this._currentLoadData[uuid]) {
                            _this._event.trigger('error', {
                                type: (_e = _this._storageLoadData[uuid]) === null || _e === void 0 ? void 0 : _e.type,
                                status: (_f = _this._storageLoadData[uuid]) === null || _f === void 0 ? void 0 : _f.status,
                                content: (_g = _this._storageLoadData[uuid]) === null || _g === void 0 ? void 0 : _g.content,
                                source: (_h = _this._storageLoadData[uuid]) === null || _h === void 0 ? void 0 : _h.source,
                                elemW: (_j = _this._storageLoadData[uuid]) === null || _j === void 0 ? void 0 : _j.elemW,
                                elemH: (_k = _this._storageLoadData[uuid]) === null || _k === void 0 ? void 0 : _k.elemH,
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
        Loader.prototype._loadElementSource = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var image, image, image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(params && params.type === 'image')) return [3, 2];
                            return [4, loadImage$3(params.source)];
                        case 1:
                            image = _a.sent();
                            return [2, image];
                        case 2:
                            if (!(params && params.type === 'svg')) return [3, 4];
                            return [4, loadSVG$3(params.source)];
                        case 3:
                            image = _a.sent();
                            return [2, image];
                        case 4:
                            if (!(params && params.type === 'html')) return [3, 6];
                            return [4, loadHTML$3(params.source, {
                                    width: params.elemW, height: params.elemH
                                })];
                        case 5:
                            image = _a.sent();
                            return [2, image];
                        case 6: throw Error('Element\'s source is not support!');
                    }
                });
            });
        };
        return Loader;
    }());
    var _board$1 = Symbol('_displayCtx');
    var _helper$1 = Symbol('_helper');
    var _element$1 = Symbol('_element');
    var _opts$1 = Symbol('_opts');
    var Mapper = (function () {
        function Mapper(opts) {
            this[_opts$1] = opts;
            this[_board$1] = this[_opts$1].board;
            this[_element$1] = this[_opts$1].element;
            this[_helper$1] = this[_opts$1].helper;
        }
        Mapper.prototype.isEffectivePoint = function (p) {
            var scrollLineWidth = this[_board$1].getScrollLineWidth();
            var screenInfo = this[_board$1].getScreenInfo();
            if (p.x <= (screenInfo.width - scrollLineWidth) && p.y <= (screenInfo.height - scrollLineWidth)) {
                return true;
            }
            return false;
        };
        Mapper.prototype.judgePointCursor = function (p, data) {
            var cursor = 'auto';
            var elementUUID = null;
            if (!this.isEffectivePoint(p)) {
                return { cursor: cursor, elementUUID: elementUUID };
            }
            var _a = this[_helper$1].isPointInElementWrapperDot(p, data), uuid = _a.uuid, hoverDotDirection = _a.hoverDotDirection;
            var direction = hoverDotDirection;
            if (uuid && direction) {
                switch (direction) {
                    case 'top-right': {
                        cursor = 'ne-resize';
                        break;
                    }
                    case 'top-left': {
                        cursor = 'nw-resize';
                        break;
                    }
                    case 'top': {
                        cursor = 'n-resize';
                        break;
                    }
                    case 'right': {
                        cursor = 'e-resize';
                        break;
                    }
                    case 'bottom-right': {
                        cursor = 'se-resize';
                        break;
                    }
                    case 'bottom': {
                        cursor = 's-resize';
                        break;
                    }
                    case 'bottom-left': {
                        cursor = 'sw-resize';
                        break;
                    }
                    case 'left': {
                        cursor = 'w-resize';
                        break;
                    }
                    case 'rotate': {
                        cursor = 'grab';
                        break;
                    }
                }
                if (uuid) {
                    elementUUID = uuid;
                }
            }
            else {
                var _b = this[_element$1].isPointInElement(p, data), index = _b[0], uuid_1 = _b[1];
                if (index >= 0) {
                    cursor = 'move';
                }
                if (uuid_1) {
                    elementUUID = uuid_1;
                }
            }
            return {
                cursor: cursor,
                elementUUID: elementUUID,
            };
        };
        return Mapper;
    }());
    function parseData(data) {
        var result = {
            elements: [],
        };
        if (Array.isArray(data === null || data === void 0 ? void 0 : data.elements)) {
            data === null || data === void 0 ? void 0 : data.elements.forEach(function (elem) {
                if (elem === void 0) { elem = {}; }
                if (isElement(elem)) {
                    result.elements.push(elem);
                }
            });
        }
        if (typeof data.bgColor === 'string') {
            result.bgColor = data.bgColor;
        }
        return result;
    }
    function isElement(elem) {
        if (!(isNumber(elem.x) && isNumber(elem.y) && isNumber(elem.w) && isNumber(elem.h))) {
            return false;
        }
        if (!(typeof elem.type === 'string' && elementNames.includes(elem.type))) {
            return false;
        }
        return true;
    }
    function isNumber(num) {
        return (num >= 0 || num < 0);
    }
    var RendererEvent = (function () {
        function RendererEvent() {
            this._listeners = new Map();
        }
        RendererEvent.prototype.on = function (eventKey, callback) {
            if (this._listeners.has(eventKey)) {
                var callbacks = this._listeners.get(eventKey);
                callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
                this._listeners.set(eventKey, callbacks || []);
            }
            else {
                this._listeners.set(eventKey, [callback]);
            }
        };
        RendererEvent.prototype.off = function (eventKey, callback) {
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
        RendererEvent.prototype.trigger = function (eventKey, arg) {
            var callbacks = this._listeners.get(eventKey);
            if (Array.isArray(callbacks)) {
                callbacks.forEach(function (cb) {
                    cb(arg);
                });
                return true;
            }
            else {
                return false;
            }
        };
        RendererEvent.prototype.has = function (name) {
            if (this._listeners.has(name)) {
                var list = this._listeners.get(name);
                if (Array.isArray(list) && list.length > 0) {
                    return true;
                }
            }
            return false;
        };
        return RendererEvent;
    }());
    var requestAnimationFrame = window.requestAnimationFrame;
    var deepClone$3 = index$2.data.deepClone;
    var DrawStatus;
    (function (DrawStatus) {
        DrawStatus["NULL"] = "null";
        DrawStatus["FREE"] = "free";
        DrawStatus["DRAWING"] = "drawing";
        DrawStatus["FREEZE"] = "freeze";
    })(DrawStatus || (DrawStatus = {}));
    var Renderer = (function (_super) {
        __extends(Renderer, _super);
        function Renderer(board) {
            var _this = _super.call(this) || this;
            _this._queue = [];
            _this._status = DrawStatus.NULL;
            _this._board = board;
            _this._loader = new Loader({
                board: board,
                maxParallelNum: 6
            });
            _this._loader.on('load', function (res) {
                _this._drawFrame();
            });
            _this._loader.on('error', function (res) {
                console.log('Loader Error: ', res);
            });
            _this._loader.on('complete', function (res) {
            });
            return _this;
        }
        Renderer.prototype.freeze = function () {
            this._status = DrawStatus.FREEZE;
        };
        Renderer.prototype.thaw = function () {
            this._status = DrawStatus.FREE;
        };
        Renderer.prototype.render = function (data, helper, changeResourceUUIDs) {
            if ([DrawStatus.FREEZE].includes(this._status)) {
                return;
            }
            var _data = deepClone$3({ data: data, helper: helper });
            this._queue.push(_data);
            if (this._status !== DrawStatus.DRAWING) {
                this._status = DrawStatus.DRAWING;
                this._drawFrame();
            }
            this._loader.load(data, changeResourceUUIDs);
        };
        Renderer.prototype._drawFrame = function () {
            var _this = this;
            if (this._status === DrawStatus.FREEZE) {
                return;
            }
            requestAnimationFrame(function () {
                if (_this._status === DrawStatus.FREEZE) {
                    return;
                }
                var ctx = _this._board.getContext();
                var item = _this._queue[0];
                var isLastFrame = false;
                if (_this._queue.length > 1) {
                    item = _this._queue.shift();
                }
                else {
                    isLastFrame = true;
                }
                if (_this._loader.isComplete() !== true) {
                    _this._drawFrame();
                    if (item) {
                        drawContext(ctx, item.data, item.helper, _this._loader);
                        _this._board.draw();
                    }
                }
                else if (item) {
                    drawContext(ctx, item.data, item.helper, _this._loader);
                    _this._board.draw();
                    _this._retainQueueOneItem();
                    if (!isLastFrame) {
                        _this._drawFrame();
                    }
                    else {
                        _this._status = DrawStatus.FREE;
                    }
                }
                else {
                    _this._status = DrawStatus.FREE;
                }
                _this.trigger('drawFrame', undefined);
                if (_this._loader.isComplete() === true && _this._queue.length === 1 && _this._status === DrawStatus.FREE) {
                    _this.trigger('drawFrameComplete', undefined);
                    _this.freeze();
                }
            });
        };
        Renderer.prototype._retainQueueOneItem = function () {
            if (this._queue.length <= 1) {
                return;
            }
            var lastOne = deepClone$3(this._queue[this._queue.length - 1]);
            this._queue = [lastOne];
        };
        return Renderer;
    }(RendererEvent));
    var Mode;
    (function (Mode) {
        Mode["NULL"] = "null";
        Mode["SELECT_ELEMENT"] = "select-element";
        Mode["SELECT_ELEMENT_LIST"] = "select-element-list";
        Mode["SELECT_ELEMENT_WRAPPER_DOT"] = "select-element-wrapper-dot";
        Mode["SELECT_AREA"] = "select-area";
    })(Mode || (Mode = {}));
    var CursorStatus;
    (function (CursorStatus) {
        CursorStatus["DRAGGING"] = "dragging";
        CursorStatus["NULL"] = "null";
    })(CursorStatus || (CursorStatus = {}));
    function createData() {
        return {
            onlyRender: false,
            hasInited: false,
            mode: Mode.NULL,
            cursorStatus: CursorStatus.NULL,
            selectedUUID: null,
            selectedUUIDList: [],
            hoverUUID: null,
            selectedDotDirection: null,
            hoverDotDirection: null,
            prevPoint: null,
        };
    }
    var TempData$2 = (function () {
        function TempData() {
            this._temp = createData();
        }
        TempData.prototype.set = function (name, value) {
            this._temp[name] = value;
        };
        TempData.prototype.get = function (name) {
            return this._temp[name];
        };
        TempData.prototype.clear = function () {
            this._temp = createData();
        };
        return TempData;
    }());
    var _board = Symbol('_board');
    var _data = Symbol('_data');
    var _opts$3 = Symbol('_opts');
    var _config = Symbol('_config');
    var _renderer = Symbol('_renderer');
    var _element = Symbol('_element');
    var _helper = Symbol('_helper');
    var _tempData$1 = Symbol('_tempData');
    var _draw = Symbol('_draw');
    var _coreEvent = Symbol('_coreEvent');
    var _mapper = Symbol('_mapper');
    var _emitChangeScreen = Symbol('_emitChangeScreen');
    var _emitChangeData = Symbol('_emitChangeData');
    var _todo = Symbol('_todo');
    var deepClone$2 = index$2.data.deepClone;
    var createUUID$4 = index$2.uuid.createUUID;
    function getSelectedElements(core) {
        var elems = [];
        var list = [];
        var uuid = core[_tempData$1].get('selectedUUID');
        if (typeof uuid === 'string' && uuid) {
            list.push(uuid);
        }
        else {
            list = core[_tempData$1].get('selectedUUIDList');
        }
        list.forEach(function (uuid) {
            var _a;
            var index = core[_helper].getElementIndexByUUID(uuid);
            if (index !== null && index >= 0) {
                var elem = (_a = core[_data]) === null || _a === void 0 ? void 0 : _a.elements[index];
                if (elem)
                    elems.push(elem);
            }
        });
        return deepClone$2(elems);
    }
    function getElement(core, uuid) {
        var elem = null;
        var index = core[_helper].getElementIndexByUUID(uuid);
        if (index !== null && core[_data].elements[index]) {
            elem = deepClone$2(core[_data].elements[index]);
        }
        return elem;
    }
    function getElementByIndex(core, index) {
        var elem = null;
        if (index >= 0 && core[_data].elements[index]) {
            elem = deepClone$2(core[_data].elements[index]);
        }
        return elem;
    }
    function updateElement(core, elem) {
        var _a;
        var _elem = deepClone$2(elem);
        var data = core[_data];
        var resourceChangeUUIDs = [];
        for (var i = 0; i < data.elements.length; i++) {
            if (_elem.uuid === ((_a = data.elements[i]) === null || _a === void 0 ? void 0 : _a.uuid)) {
                var result = diffElementResourceChange(data.elements[i], _elem);
                if (typeof result === 'string') {
                    resourceChangeUUIDs.push(result);
                }
                data.elements[i] = _elem;
                break;
            }
        }
        core[_emitChangeData]();
        core[_draw]({ resourceChangeUUIDs: resourceChangeUUIDs });
    }
    function selectElementByIndex(core, index, opts) {
        if (core[_tempData$1].get('onlyRender') === true)
            return;
        if (core[_data].elements[index]) {
            var uuid = core[_data].elements[index].uuid;
            if ((opts === null || opts === void 0 ? void 0 : opts.useMode) === true) {
                core[_tempData$1].set('mode', Mode.SELECT_ELEMENT);
            }
            else {
                core[_tempData$1].set('mode', Mode.NULL);
            }
            if (typeof uuid === 'string') {
                core[_tempData$1].set('selectedUUID', uuid);
                core[_tempData$1].set('selectedUUIDList', []);
            }
            core[_draw]();
        }
    }
    function selectElement(core, uuid, opts) {
        if (core[_tempData$1].get('onlyRender') === true)
            return;
        var index = core[_helper].getElementIndexByUUID(uuid);
        if (typeof index === 'number' && index >= 0) {
            core.selectElementByIndex(index, opts);
        }
    }
    function moveUpElement(core, uuid) {
        var index = core[_helper].getElementIndexByUUID(uuid);
        if (typeof index === 'number' && index >= 0 && index < core[_data].elements.length - 1) {
            var temp = core[_data].elements[index];
            core[_data].elements[index] = core[_data].elements[index + 1];
            core[_data].elements[index + 1] = temp;
        }
        core[_emitChangeData]();
        core[_draw]();
    }
    function moveDownElement(core, uuid) {
        var index = core[_helper].getElementIndexByUUID(uuid);
        if (typeof index === 'number' && index > 0 && index < core[_data].elements.length) {
            var temp = core[_data].elements[index];
            core[_data].elements[index] = core[_data].elements[index - 1];
            core[_data].elements[index - 1] = temp;
        }
        core[_emitChangeData]();
        core[_draw]();
    }
    function addElement(core, elem) {
        var _elem = deepClone$2(elem);
        _elem.uuid = createUUID$4();
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
        var index = core[_helper].getElementIndexByUUID(beforeUUID);
        if (index !== null) {
            return core.insertElementBeforeIndex(elem, index);
        }
        return null;
    }
    function insertElementBeforeIndex(core, elem, index) {
        var _elem = deepClone$2(elem);
        _elem.uuid = createUUID$4();
        if (index >= 0) {
            core[_data].elements.splice(index, 0, _elem);
            core[_emitChangeData]();
            core[_draw]();
            return _elem.uuid;
        }
        return null;
    }
    function insertElementAfter(core, elem, beforeUUID) {
        var index = core[_helper].getElementIndexByUUID(beforeUUID);
        if (index !== null) {
            return core.insertElementAfterIndex(elem, index);
        }
        return null;
    }
    function insertElementAfterIndex(core, elem, index) {
        var _elem = deepClone$2(elem);
        _elem.uuid = createUUID$4();
        if (index >= 0) {
            core[_data].elements.splice(index + 1, 0, _elem);
            core[_emitChangeData]();
            core[_draw]();
            return _elem.uuid;
        }
        return null;
    }
    var time = index$2.time;
    var deepClone$1 = index$2.data.deepClone;
    function initEvent(core) {
        if (core[_tempData$1].get('hasInited') === true) {
            return;
        }
        core[_board].on('hover', time.throttle(handleHover(core), 32));
        core[_board].on('leave', time.throttle(handleLeave(core), 32));
        core[_board].on('point', time.throttle(handleClick(core), 16));
        core[_board].on('doubleClick', handleDoubleClick(core));
        if (core[_tempData$1].get('onlyRender') === true) {
            return;
        }
        core[_board].on('point', handlePoint(core));
        core[_board].on('moveStart', handleMoveStart(core));
        core[_board].on('move', time.throttle(handleMove(core), 16));
        core[_board].on('moveEnd', handleMoveEnd(core));
        core[_renderer].on('drawFrame', function () {
            core[_coreEvent].trigger('drawFrame', undefined);
        });
        core[_renderer].on('drawFrameComplete', function () {
            core[_coreEvent].trigger('drawFrameComplete', undefined);
        });
        core[_tempData$1].set('hasInited', true);
    }
    function handleDoubleClick(core) {
        return function (point) {
            var _a, _b, _c;
            var _d = core[_element].isPointInElement(point, core[_data]), index = _d[0], uuid = _d[1];
            if (index >= 0 && uuid) {
                var elem = deepClone$1((_a = core[_data].elements) === null || _a === void 0 ? void 0 : _a[index]);
                if (((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.invisible) !== true) {
                    core[_coreEvent].trigger('screenDoubleClickElement', { index: index, uuid: uuid, element: deepClone$1((_c = core[_data].elements) === null || _c === void 0 ? void 0 : _c[index]) });
                }
            }
            core[_draw]();
        };
    }
    function handlePoint(core) {
        return function (point) {
            var _a, _b, _c;
            if (!core[_mapper].isEffectivePoint(point)) {
                return;
            }
            if (core[_helper].isPointInElementList(point, core[_data])) {
                core[_tempData$1].set('mode', Mode.SELECT_ELEMENT_LIST);
            }
            else {
                var _d = core[_helper].isPointInElementWrapperDot(point, core[_data]), uuid = _d.uuid, selectedDotDirection = _d.selectedDotDirection;
                if (uuid && selectedDotDirection) {
                    core[_tempData$1].set('mode', Mode.SELECT_ELEMENT_WRAPPER_DOT);
                    core[_tempData$1].set('selectedDotDirection', selectedDotDirection);
                    core[_tempData$1].set('selectedUUID', uuid);
                }
                else {
                    var _e = core[_element].isPointInElement(point, core[_data]), index = _e[0], uuid_1 = _e[1];
                    if (index >= 0 && ((_b = (_a = core[_data].elements[index]) === null || _a === void 0 ? void 0 : _a.operation) === null || _b === void 0 ? void 0 : _b.invisible) !== true) {
                        core.selectElementByIndex(index, { useMode: true });
                        if (typeof uuid_1 === 'string' && core[_coreEvent].has('screenSelectElement')) {
                            core[_coreEvent].trigger('screenSelectElement', { index: index, uuid: uuid_1, element: deepClone$1((_c = core[_data].elements) === null || _c === void 0 ? void 0 : _c[index]) });
                            core[_emitChangeScreen]();
                        }
                        core[_tempData$1].set('mode', Mode.SELECT_ELEMENT);
                    }
                    else {
                        core[_tempData$1].set('selectedUUIDList', []);
                        core[_tempData$1].set('selectedUUID', null);
                        core[_tempData$1].set('mode', Mode.SELECT_AREA);
                    }
                }
            }
            core[_draw]();
        };
    }
    function handleClick(core) {
        return function (point) {
            var _a;
            var _b = core[_element].isPointInElement(point, core[_data]), index = _b[0], uuid = _b[1];
            if (index >= 0 && uuid) {
                core[_coreEvent].trigger('screenClickElement', { index: index, uuid: uuid, element: deepClone$1((_a = core[_data].elements) === null || _a === void 0 ? void 0 : _a[index]) });
            }
            core[_draw]();
        };
    }
    function handleMoveStart(core) {
        return function (point) {
            core[_tempData$1].set('prevPoint', point);
            var uuid = core[_tempData$1].get('selectedUUID');
            if (core[_tempData$1].get('mode') === Mode.SELECT_ELEMENT_LIST) ;
            else if (core[_tempData$1].get('mode') === Mode.SELECT_ELEMENT) {
                if (typeof uuid === 'string' && core[_coreEvent].has('screenMoveElementStart')) {
                    core[_coreEvent].trigger('screenMoveElementStart', {
                        index: core[_element].getElementIndex(core[_data], uuid),
                        uuid: uuid,
                        x: point.x,
                        y: point.y
                    });
                }
            }
            else if (core[_tempData$1].get('mode') === Mode.SELECT_AREA) {
                core[_helper].startSelectArea(point);
            }
        };
    }
    function handleMove(core) {
        return function (point) {
            if (core[_tempData$1].get('mode') === Mode.SELECT_ELEMENT_LIST) {
                dragElements(core, core[_tempData$1].get('selectedUUIDList'), point, core[_tempData$1].get('prevPoint'));
                core[_draw]();
                core[_tempData$1].set('cursorStatus', CursorStatus.DRAGGING);
            }
            else if (typeof core[_tempData$1].get('selectedUUID') === 'string') {
                if (core[_tempData$1].get('mode') === Mode.SELECT_ELEMENT) {
                    dragElements(core, [core[_tempData$1].get('selectedUUID')], point, core[_tempData$1].get('prevPoint'));
                    core[_draw]();
                    core[_tempData$1].set('cursorStatus', CursorStatus.DRAGGING);
                }
                else if (core[_tempData$1].get('mode') === Mode.SELECT_ELEMENT_WRAPPER_DOT && core[_tempData$1].get('selectedDotDirection')) {
                    transfromElement(core, core[_tempData$1].get('selectedUUID'), point, core[_tempData$1].get('prevPoint'), core[_tempData$1].get('selectedDotDirection'));
                    core[_tempData$1].set('cursorStatus', CursorStatus.DRAGGING);
                }
            }
            else if (core[_tempData$1].get('mode') === Mode.SELECT_AREA) {
                core[_helper].changeSelectArea(point);
                core[_draw]();
            }
            core[_tempData$1].set('prevPoint', point);
        };
    }
    function dragElements(core, uuids, point, prevPoint) {
        if (!prevPoint) {
            return;
        }
        uuids.forEach(function (uuid) {
            var _a, _b;
            var idx = core[_helper].getElementIndexByUUID(uuid);
            if (idx === null)
                return;
            var elem = core[_data].elements[idx];
            if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.lock) !== true && ((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.invisible) !== true) {
                core[_element].dragElement(core[_data], uuid, point, prevPoint, core[_board].getContext().getTransform().scale);
            }
        });
        core[_draw]();
    }
    function handleMoveEnd(core) {
        return function (point) {
            var uuid = core[_tempData$1].get('selectedUUID');
            if (typeof uuid === 'string') {
                var index = core[_element].getElementIndex(core[_data], uuid);
                var elem = core[_data].elements[index];
                if (elem) {
                    if (core[_coreEvent].has('screenMoveElementEnd')) {
                        core[_coreEvent].trigger('screenMoveElementEnd', {
                            index: index,
                            uuid: uuid,
                            x: point.x,
                            y: point.y
                        });
                    }
                    if (core[_coreEvent].has('screenChangeElement')) {
                        core[_coreEvent].trigger('screenChangeElement', {
                            index: index,
                            uuid: uuid,
                            width: elem.w,
                            height: elem.h,
                            angle: elem.angle || 0
                        });
                    }
                    core[_emitChangeData]();
                }
            }
            else if (core[_tempData$1].get('mode') === Mode.SELECT_AREA) {
                var uuids = core[_helper].calcSelectedElements(core[_data]);
                if (uuids.length > 0) {
                    core[_tempData$1].set('selectedUUIDList', uuids);
                    core[_tempData$1].set('selectedUUID', null);
                }
                else {
                    core[_tempData$1].set('mode', Mode.NULL);
                }
                core[_helper].clearSelectedArea();
                core[_draw]();
            }
            if (core[_tempData$1].get('mode') !== Mode.SELECT_ELEMENT) {
                core[_tempData$1].set('selectedUUID', null);
            }
            core[_tempData$1].set('cursorStatus', CursorStatus.NULL);
            core[_tempData$1].set('mode', Mode.NULL);
        };
    }
    function handleHover(core) {
        return function (point) {
            var _a, _b;
            var isMouseOverElement = false;
            if (core[_tempData$1].get('mode') === Mode.SELECT_AREA) {
                if (core[_tempData$1].get('onlyRender') !== true)
                    core[_board].resetCursor();
            }
            else if (core[_tempData$1].get('cursorStatus') === CursorStatus.NULL) {
                var _c = core[_mapper].judgePointCursor(point, core[_data]), cursor = _c.cursor, elementUUID = _c.elementUUID;
                if (core[_tempData$1].get('onlyRender') !== true)
                    core[_board].setCursor(cursor);
                if (elementUUID) {
                    var index = core[_helper].getElementIndexByUUID(elementUUID);
                    if (index !== null && index >= 0) {
                        var elem = core[_data].elements[index];
                        if (((_a = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _a === void 0 ? void 0 : _a.lock) === true || ((_b = elem === null || elem === void 0 ? void 0 : elem.operation) === null || _b === void 0 ? void 0 : _b.invisible) === true) {
                            core[_board].resetCursor();
                            return;
                        }
                        if (core[_tempData$1].get('hoverUUID') !== elem.uuid) {
                            var preIndex = core[_helper].getElementIndexByUUID(core[_tempData$1].get('hoverUUID') || '');
                            if (preIndex !== null && core[_data].elements[preIndex]) {
                                core[_coreEvent].trigger('mouseLeaveElement', {
                                    uuid: core[_tempData$1].get('hoverUUID'),
                                    index: preIndex,
                                    element: core[_data].elements[preIndex]
                                });
                            }
                        }
                        if (elem) {
                            core[_coreEvent].trigger('mouseOverElement', { uuid: elem.uuid, index: index, element: elem, });
                            core[_tempData$1].set('hoverUUID', elem.uuid);
                            isMouseOverElement = true;
                        }
                    }
                }
            }
            if (isMouseOverElement !== true && core[_tempData$1].get('hoverUUID') !== null) {
                var uuid = core[_tempData$1].get('hoverUUID');
                var index = core[_helper].getElementIndexByUUID(uuid || '');
                if (index !== null)
                    core[_coreEvent].trigger('mouseLeaveElement', { uuid: uuid, index: index, element: core[_data].elements[index] });
                core[_tempData$1].set('hoverUUID', null);
            }
            if (core[_coreEvent].has('mouseOverScreen'))
                core[_coreEvent].trigger('mouseOverScreen', point);
        };
    }
    function handleLeave(core) {
        return function () {
            if (core[_coreEvent].has('mouseLeaveScreen')) {
                core[_coreEvent].trigger('mouseLeaveScreen', undefined);
            }
        };
    }
    function transfromElement(core, uuid, point, prevPoint, direction) {
        if (!prevPoint) {
            return null;
        }
        var result = core[_element].transformElement(core[_data], uuid, point, prevPoint, core[_board].getContext().getTransform().scale, direction);
        core[_draw]();
        return result;
    }
    var deepClone$7 = index$2.data.deepClone;
    var Core = (function () {
        function Core(mount, opts, config) {
            var _c, _d, _e;
            this[_a] = new CoreEvent();
            this[_b] = new TempData$2();
            this[_data] = { elements: [] };
            this[_opts$3] = opts;
            this[_tempData$1].set('onlyRender', opts.onlyRender === true);
            this[_config] = mergeConfig(config || {});
            this[_board] = new Board(mount, __assign$1(__assign$1({}, this[_opts$3]), { canScroll: (_c = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _c === void 0 ? void 0 : _c.use, scrollConfig: {
                    color: ((_d = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _d === void 0 ? void 0 : _d.color) || '#a0a0a0',
                    lineWidth: ((_e = config === null || config === void 0 ? void 0 : config.scrollWrapper) === null || _e === void 0 ? void 0 : _e.lineWidth) || 12,
                } }));
            this[_renderer] = new Renderer(this[_board]);
            this[_element] = new Element(this[_board].getContext());
            this[_helper] = new Helper(this[_board], this[_config]);
            this[_mapper] = new Mapper({
                board: this[_board],
                helper: this[_helper],
                element: this[_element]
            });
            initEvent(this);
        }
        Core.prototype[(_a = _coreEvent, _b = _tempData$1, _draw)] = function (opts) {
            var _c, _d;
            var transfrom = this[_board].getTransform();
            this[_helper].updateConfig(this[_data], {
                width: this[_opts$3].width,
                height: this[_opts$3].height,
                canScroll: ((_d = (_c = this[_config]) === null || _c === void 0 ? void 0 : _c.scrollWrapper) === null || _d === void 0 ? void 0 : _d.use) === true,
                selectedUUID: this[_tempData$1].get('selectedUUID'),
                selectedUUIDList: this[_tempData$1].get('selectedUUIDList'),
                devicePixelRatio: this[_opts$3].devicePixelRatio,
                scale: transfrom.scale,
                scrollX: transfrom.scrollX,
                scrollY: transfrom.scrollY,
            });
            this[_renderer].thaw();
            this[_renderer].render(this[_data], this[_helper].getConfig(), (opts === null || opts === void 0 ? void 0 : opts.resourceChangeUUIDs) || []);
        };
        Core.prototype.getElement = function (uuid) {
            return getElement(this, uuid);
        };
        Core.prototype.getElementByIndex = function (index) {
            return getElementByIndex(this, index);
        };
        Core.prototype.selectElementByIndex = function (index, opts) {
            return selectElementByIndex(this, index, opts);
        };
        Core.prototype.selectElement = function (uuid, opts) {
            return selectElement(this, uuid, opts);
        };
        Core.prototype.moveUpElement = function (uuid) {
            return moveUpElement(this, uuid);
        };
        Core.prototype.moveDownElement = function (uuid) {
            return moveDownElement(this, uuid);
        };
        Core.prototype.updateElement = function (elem) {
            return updateElement(this, elem);
        };
        Core.prototype.addElement = function (elem) {
            return addElement(this, elem);
        };
        Core.prototype.deleteElement = function (uuid) {
            return deleteElement(this, uuid);
        };
        Core.prototype.insertElementBefore = function (elem, beforeUUID) {
            return insertElementBefore(this, elem, beforeUUID);
        };
        Core.prototype.insertElementBeforeIndex = function (elem, index) {
            return insertElementBeforeIndex(this, elem, index);
        };
        Core.prototype.getSelectedElements = function () {
            return getSelectedElements(this);
        };
        Core.prototype.insertElementAfter = function (elem, beforeUUID) {
            return insertElementAfter(this, elem, beforeUUID);
        };
        Core.prototype.insertElementAfterIndex = function (elem, index) {
            return insertElementAfterIndex(this, elem, index);
        };
        Core.prototype.resetSize = function (opts) {
            this[_opts$3] = __assign$1(__assign$1({}, this[_opts$3]), opts);
            this[_board].resetSize(opts);
            this[_draw]();
        };
        Core.prototype.scale = function (ratio) {
            var screen = this[_board].scale(ratio);
            this[_draw]();
            this[_emitChangeScreen]();
            return screen;
        };
        Core.prototype.scrollLeft = function (left) {
            var screen = this[_board].scrollX(0 - left);
            this[_draw]();
            this[_emitChangeScreen]();
            return screen;
        };
        Core.prototype.scrollTop = function (top) {
            var screen = this[_board].scrollY(0 - top);
            this[_draw]();
            this[_emitChangeScreen]();
            return screen;
        };
        Core.prototype.getScreenTransform = function () {
            var transform = this[_board].getTransform();
            return {
                scale: transform.scale,
                scrollTop: Math.max(0, 0 - transform.scrollY),
                scrollLeft: Math.max(0, 0 - transform.scrollX),
            };
        };
        Core.prototype.getData = function () {
            return deepClone$7(this[_data]);
        };
        Core.prototype.setData = function (data, opts) {
            var resourceChangeUUIDs = diffElementResourceChangeList(this[_data], data);
            this[_data] = this[_element].initData(deepClone$7(parseData(data)));
            if (opts && opts.triggerChangeEvent === true) {
                this[_emitChangeData]();
            }
            this[_draw]({ resourceChangeUUIDs: resourceChangeUUIDs });
        };
        Core.prototype.clearOperation = function () {
            this[_tempData$1].clear();
            this[_tempData$1].set('onlyRender', this[_opts$3].onlyRender === true);
            this[_draw]();
        };
        Core.prototype.on = function (key, callback) {
            this[_coreEvent].on(key, callback);
        };
        Core.prototype.off = function (key, callback) {
            this[_coreEvent].off(key, callback);
        };
        Core.prototype.pointScreenToContext = function (p) {
            return this[_board].pointScreenToContext(p);
        };
        Core.prototype.pointContextToScreen = function (p) {
            return this[_board].pointContextToScreen(p);
        };
        Core.prototype.setOnlyRender = function () {
            this[_tempData$1].set('onlyRender', true);
        };
        Core.prototype.cancelOnlyRender = function () {
            this[_tempData$1].set('onlyRender', false);
        };
        Core.prototype.__getBoardContext = function () {
            return this[_board].getContext();
        };
        Core.prototype.__getDisplayContext = function () {
            return this[_board].getDisplayContext();
        };
        Core.prototype.__getOriginContext = function () {
            return this[_board].getOriginContext();
        };
        Core.prototype[_emitChangeScreen] = function () {
            if (this[_coreEvent].has('changeScreen')) {
                this[_coreEvent].trigger('changeScreen', __assign$1({}, this.getScreenTransform()));
            }
        };
        Core.prototype[_emitChangeData] = function () {
            if (this[_coreEvent].has('changeData')) {
                this[_coreEvent].trigger('changeData', deepClone$7(this[_data]));
            }
        };
        Core.prototype[_todo] = function () {
            console.log(this[_mapper]);
        };
        var _a, _b;
        Core.is = is$3;
        Core.check = check;
        return Core;
    }());

    var defaultOptions = {
        width: 400,
        height: 300,
        contextWidth: 400,
        contextHeight: 300,
        devicePixelRatio: 1,
        onlyRender: false,
        maxRecords: 10,
        disableKeyboard: true,
    };

    function createDefaultData() {
        return {
            isFocus: false,
            doRecords: [],
            unDoRecords: [],
            clipboardElements: [],
            isDownloading: false,
        };
    }
    var TempData = (function () {
        function TempData() {
            this._temp = createDefaultData();
        }
        TempData.prototype.set = function (name, value) {
            this._temp[name] = value;
        };
        TempData.prototype.get = function (name) {
            return this._temp[name];
        };
        TempData.prototype.clear = function () {
            this._temp = createDefaultData();
        };
        return TempData;
    }());

    var KeyboardWatcher = (function () {
        function KeyboardWatcher() {
            this._listeners = new Map();
            this._initEvent();
        }
        KeyboardWatcher.prototype._initEvent = function () {
            var _this = this;
            document.addEventListener('keydown', function (e) {
                if ((e.metaKey === true || e.ctrlKey === true) && e.key === 'c') {
                    _this.trigger('keyboardCopy', undefined);
                }
                else if ((e.metaKey === true || e.ctrlKey === true) && e.key === 'v') {
                    _this.trigger('keyboardPaste', undefined);
                }
                else if ((e.metaKey === true || e.ctrlKey === true) && e.key === 'x') {
                    _this.trigger('keyboardCut', undefined);
                }
                else if ((e.metaKey === true || e.ctrlKey === true) && e.key === 'z') {
                    _this.trigger('keyboardUndo', undefined);
                }
                else if (e.key === 'Backspace') {
                    _this.trigger('keyboardDelete', undefined);
                }
                else if (e.key === 'ArrowUp') {
                    _this.trigger('keyboardArrowUp', undefined);
                }
                else if (e.key === 'ArrowDown') {
                    _this.trigger('keyboardArrowDown', undefined);
                }
                else if (e.key === 'ArrowLeft') {
                    _this.trigger('keyboardArrowLeft', undefined);
                }
                else if (e.key === 'ArrowRight') {
                    _this.trigger('keyboardArrowRight', undefined);
                }
            });
        };
        KeyboardWatcher.prototype.on = function (eventKey, callback) {
            if (this._listeners.has(eventKey)) {
                var callbacks = this._listeners.get(eventKey);
                callbacks === null || callbacks === void 0 ? void 0 : callbacks.push(callback);
                this._listeners.set(eventKey, callbacks || []);
            }
            else {
                this._listeners.set(eventKey, [callback]);
            }
            return this;
        };
        KeyboardWatcher.prototype.off = function (eventKey, callback) {
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
            return this;
        };
        KeyboardWatcher.prototype.trigger = function (eventKey, arg) {
            var callbacks = this._listeners.get(eventKey);
            if (Array.isArray(callbacks)) {
                callbacks.forEach(function (cb) {
                    cb(arg);
                });
                return true;
            }
            else {
                return false;
            }
        };
        KeyboardWatcher.prototype.has = function (name) {
            if (this._listeners.has(name)) {
                var list = this._listeners.get(name);
                if (Array.isArray(list) && list.length > 0) {
                    return true;
                }
            }
            return false;
        };
        return KeyboardWatcher;
    }());

    var _opts = Symbol('_opts');
    var _hasInited = Symbol('_hasInited');
    var _initEvent = Symbol('_initEvent');
    var _tempData = Symbol('_tempData');
    var _createOpts = Symbol('_createOpts');
    var _pushRecord = Symbol('_pushRecord');
    var _keyboardWatcher = Symbol('_keyboardWatcher');

    function undo(idraw) {
        var doRecords = idraw[_tempData].get('doRecords');
        var unDoRecords = idraw[_tempData].get('unDoRecords');
        if (!(doRecords.length > 1)) {
            return {
                doRecordCount: doRecords.length,
                data: null,
            };
        }
        var popRecord = doRecords.pop();
        if (popRecord) {
            unDoRecords.push(popRecord);
        }
        var record = doRecords[doRecords.length - 1];
        if (record === null || record === void 0 ? void 0 : record.data) {
            idraw.setData(record.data);
        }
        idraw[_tempData].set('doRecords', doRecords);
        idraw[_tempData].set('unDoRecords', unDoRecords);
        return {
            doRecordCount: doRecords.length,
            data: (record === null || record === void 0 ? void 0 : record.data) || null,
        };
    }
    function redo(idraw) {
        var unDoRecords = idraw[_tempData].get('unDoRecords');
        if (!(unDoRecords.length > 0)) {
            return {
                undoRecordCount: unDoRecords.length,
                data: null,
            };
        }
        var record = unDoRecords.pop();
        if (record === null || record === void 0 ? void 0 : record.data) {
            idraw.setData(record.data);
        }
        idraw[_tempData].set('unDoRecords', unDoRecords);
        return {
            undoRecordCount: unDoRecords.length,
            data: (record === null || record === void 0 ? void 0 : record.data) || null,
        };
    }

    function exportDataURL(idraw, type, quality) {
        return __awaiter$1(this, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                if (idraw[_tempData].get('isDownloading') === true) {
                    return [2, Promise.reject('Busy!')];
                }
                idraw[_tempData].set('isDownloading', true);
                return [2, new Promise(function (resolve, reject) {
                        var dataURL = '';
                        function listenRenderFrameComplete() {
                            idraw.off('drawFrameComplete', listenRenderFrameComplete);
                            idraw[_tempData].set('isDownloading', false);
                            var ctx = idraw.__getOriginContext();
                            var canvas = ctx.canvas;
                            dataURL = canvas.toDataURL(type, quality);
                            resolve(dataURL);
                        }
                        try {
                            idraw.on('drawFrameComplete', listenRenderFrameComplete);
                            idraw.clearOperation();
                        }
                        catch (err) {
                            reject(err);
                        }
                    })];
            });
        });
    }

    function compose(middleware) {
        return function (context, next) {
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
                }
                catch (err) {
                    return Promise.reject(err);
                }
            }
        };
    }
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
    function throttle(fn, timeout) {
        var timer = -1;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timer > 0) {
                return;
            }
            timer = setTimeout(function () {
                fn.apply(void 0, args);
                timer = -1;
            }, timeout);
        };
    }
    function downloadImageFromCanvas(canvas, opts) {
        var filename = opts.filename, _a = opts.type, type = _a === void 0 ? 'image/jpeg' : _a;
        var stream = canvas.toDataURL(type);
        var downloadLink = document.createElement('a');
        downloadLink.href = stream;
        downloadLink.download = filename;
        var downloadClickEvent = document.createEvent('MouseEvents');
        downloadClickEvent.initEvent('click', true, false);
        downloadLink.dispatchEvent(downloadClickEvent);
    }
    function toColorHexNum(color) {
        return parseInt(color.replace(/^\#/, '0x'));
    }
    function toColorHexStr(color) {
        return '#' + color.toString(16);
    }
    function isColorStr(color) {
        return typeof color === 'string' && /^\#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color);
    }
    function createUUID() {
        function str4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return "" + str4() + str4() + "-" + str4() + "-" + str4() + "-" + str4() + "-" + str4() + str4() + str4();
    }
    function deepClone(target) {
        function _clone(t) {
            var type = is(t);
            if (['Null', 'Number', 'String', 'Boolean', 'Undefined'].indexOf(type) >= 0) {
                return t;
            }
            else if (type === 'Array') {
                var arr_1 = [];
                t.forEach(function (item) {
                    arr_1.push(_clone(item));
                });
                return arr_1;
            }
            else if (type === 'Object') {
                var obj_1 = {};
                var keys = Object.keys(t);
                keys.forEach(function (key) {
                    obj_1[key] = _clone(t[key]);
                });
                return obj_1;
            }
        }
        return _clone(target);
    }
    function is(data) {
        return Object.prototype.toString.call(data).replace(/[\]|\[]{1,1}/ig, '').split(' ')[1];
    }
    function parsePrototype(data) {
        var typeStr = Object.prototype.toString.call(data) || '';
        var result = typeStr.replace(/(\[object|\])/ig, '').trim();
        return result;
    }
    var istype = {
        type: function (data, lowerCase) {
            var result = parsePrototype(data);
            return lowerCase === true ? result.toLocaleLowerCase() : result;
        },
        array: function (data) {
            return parsePrototype(data) === 'Array';
        },
        json: function (data) {
            return parsePrototype(data) === 'Object';
        },
        function: function (data) {
            return parsePrototype(data) === 'Function';
        },
        asyncFunction: function (data) {
            return parsePrototype(data) === 'AsyncFunction';
        },
        string: function (data) {
            return parsePrototype(data) === 'String';
        },
        number: function (data) {
            return parsePrototype(data) === 'Number';
        },
        undefined: function (data) {
            return parsePrototype(data) === 'Undefined';
        },
        null: function (data) {
            return parsePrototype(data) === 'Null';
        },
        promise: function (data) {
            return parsePrototype(data) === 'Promise';
        },
    };
    var Image = window.Image, Blob = window.Blob, FileReader = window.FileReader;
    function loadImage(src) {
        return new Promise(function (resolve, reject) {
            var img = new Image;
            img.onload = function () {
                resolve(img);
            };
            img.onabort = reject;
            img.onerror = reject;
            img.src = src;
        });
    }
    function loadSVG(svg) {
        return new Promise(function (resolve, reject) {
            var _svg = svg;
            var image = new Image();
            var blob = new Blob([_svg], { type: 'image/svg+xml;charset=utf-8' });
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                var _a;
                var base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
                image.onload = function () {
                    resolve(image);
                };
                image.src = base64;
            };
            reader.onerror = function (err) {
                reject(err);
            };
        });
    }
    function loadHTML(html, opts) {
        var width = opts.width, height = opts.height;
        return new Promise(function (resolve, reject) {
            var _svg = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + (width || '') + "\" height = \"" + (height || '') + "\">\n      <foreignObject width=\"100%\" height=\"100%\">\n        <div xmlns = \"http://www.w3.org/1999/xhtml\">\n          " + html + "\n        </div>\n      </foreignObject>\n    </svg>\n    ";
            var image = new Image();
            var blob = new Blob([_svg], { type: 'image/svg+xml;charset=utf-8' });
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function (event) {
                var _a;
                var base64 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
                image.onload = function () {
                    resolve(image);
                };
                image.src = base64;
            };
            reader.onerror = function (err) {
                reject(err);
            };
        });
    }
    var index = {
        time: {
            delay: delay,
            compose: compose,
            throttle: throttle,
        },
        loader: {
            loadImage: loadImage,
            loadSVG: loadSVG,
            loadHTML: loadHTML,
        },
        file: {
            downloadImageFromCanvas: downloadImageFromCanvas,
        },
        color: {
            toColorHexStr: toColorHexStr,
            toColorHexNum: toColorHexNum,
            isColorStr: isColorStr,
        },
        uuid: {
            createUUID: createUUID
        },
        istype: istype,
        data: {
            deepClone: deepClone,
        }
    };

    function copyElements(idraw) {
        if (idraw[_tempData].get('isFocus') !== true) {
            return;
        }
        var elems = index.data.deepClone(idraw.getSelectedElements());
        idraw[_tempData].set('clipboardElements', elems);
    }
    function pasteElements(idraw) {
        if (idraw[_tempData].get('isFocus') !== true) {
            return;
        }
        var elems = idraw[_tempData].get('clipboardElements');
        var moveRate = 0.1;
        elems.forEach(function (elem) {
            elem.x += elem.w * moveRate;
            elem.y += elem.w * moveRate;
            idraw.addElement(elem);
        });
        idraw[_tempData].set('clipboardElements', []);
    }
    function cutElements(idraw) {
        if (idraw[_tempData].get('isFocus') !== true) {
            return;
        }
        var elems = index.data.deepClone(idraw.getSelectedElements());
        elems.forEach(function (elem) {
            idraw.deleteElement(elem.uuid);
        });
        idraw[_tempData].set('clipboardElements', elems);
    }
    function deleteElements(idraw) {
        if (idraw[_tempData].get('isFocus') !== true) {
            return;
        }
        var elems = index.data.deepClone(idraw.getSelectedElements());
        elems.forEach(function (elem) {
            idraw.deleteElement(elem.uuid);
        });
    }
    var keyArrowMoveDistance = 4;
    function keyArrowUp(idraw) {
        var elems = index.data.deepClone(idraw.getSelectedElements());
        if (elems.length > 0) {
            elems.forEach(function (elem) {
                elem.y -= keyArrowMoveDistance;
                idraw.updateElement(elem);
            });
        }
        else {
            var scrollTop = idraw.getScreenTransform().scrollTop;
            idraw.scrollTop(scrollTop - keyArrowMoveDistance);
        }
    }
    function keyArrowDown(idraw) {
        var elems = index.data.deepClone(idraw.getSelectedElements());
        if (elems.length > 0) {
            elems.forEach(function (elem) {
                elem.y += keyArrowMoveDistance;
                idraw.updateElement(elem);
            });
        }
        else {
            var scrollTop = idraw.getScreenTransform().scrollTop;
            idraw.scrollTop(scrollTop + keyArrowMoveDistance);
        }
    }
    function keyArrowLeft(idraw) {
        var elems = index.data.deepClone(idraw.getSelectedElements());
        if (elems.length > 0) {
            elems.forEach(function (elem) {
                elem.x -= keyArrowMoveDistance;
                idraw.updateElement(elem);
            });
        }
        else {
            var scrollLeft = idraw.getScreenTransform().scrollLeft;
            idraw.scrollLeft(scrollLeft - keyArrowMoveDistance);
        }
    }
    function keyArrowRight(idraw) {
        var elems = index.data.deepClone(idraw.getSelectedElements());
        if (elems.length > 0) {
            elems.forEach(function (elem) {
                elem.x += keyArrowMoveDistance;
                idraw.updateElement(elem);
            });
        }
        else {
            var scrollLeft = idraw.getScreenTransform().scrollLeft;
            idraw.scrollLeft(scrollLeft + keyArrowMoveDistance);
        }
    }
    function keyUndo(idraw) {
        idraw.undo();
    }

    var _a, _b, _c;
    var iDraw = (function (_super) {
        __extends$1(iDraw, _super);
        function iDraw(mount, opts, config) {
            var _this = _super.call(this, mount, {
                width: opts.width || defaultOptions.width,
                height: opts.height || defaultOptions.height,
                contextWidth: opts.contextWidth || defaultOptions.contextWidth,
                contextHeight: opts.contextHeight || defaultOptions.contextHeight,
                devicePixelRatio: opts.devicePixelRatio || defaultOptions.devicePixelRatio,
                onlyRender: opts.onlyRender || defaultOptions.onlyRender,
            }, config || {}) || this;
            _this[_a] = false;
            _this[_b] = new TempData();
            _this[_c] = new KeyboardWatcher();
            _this[_opts] = _this[_createOpts](opts);
            _this[_initEvent]();
            return _this;
        }
        iDraw.prototype.undo = function () {
            return undo(this);
        };
        iDraw.prototype.redo = function () {
            return redo(this);
        };
        iDraw.prototype.exportDataURL = function (type, quality) {
            return __awaiter$1(this, void 0, void 0, function () {
                return __generator$1(this, function (_d) {
                    return [2, exportDataURL(this, type, quality)];
                });
            });
        };
        iDraw.prototype[(_a = _hasInited, _b = _tempData, _c = _keyboardWatcher, _initEvent)] = function () {
            var _this = this;
            if (this[_hasInited] === true) {
                return;
            }
            this.on('changeData', function (data) {
                _this[_pushRecord](data);
            });
            this.on('mouseLeaveScreen', function () {
                _this[_tempData].set('isFocus', false);
            });
            this.on('mouseOverScreen', function () {
                _this[_tempData].set('isFocus', true);
            });
            if (this[_opts].disableKeyboard === false) {
                this[_keyboardWatcher]
                    .on('keyboardCopy', function () { return copyElements(_this); })
                    .on('keyboardPaste', function () { return pasteElements(_this); })
                    .on('keyboardCut', function () { return cutElements(_this); })
                    .on('keyboardDelete', function () { return deleteElements(_this); })
                    .on('keyboardArrowUp', function () { return keyArrowUp(_this); })
                    .on('keyboardArrowDown', function () { return keyArrowDown(_this); })
                    .on('keyboardArrowLeft', function () { return keyArrowLeft(_this); })
                    .on('keyboardArrowRight', function () { return keyArrowRight(_this); })
                    .on('keyboardUndo', function () { return keyUndo(_this); });
            }
            this[_hasInited] = true;
        };
        iDraw.prototype[_pushRecord] = function (data) {
            var doRecords = this[_tempData].get('doRecords');
            if (doRecords.length >= this[_opts].maxRecords) {
                doRecords.shift();
            }
            doRecords.push({ data: data, time: Date.now() });
            this[_tempData].set('doRecords', doRecords);
            this[_tempData].set('unDoRecords', []);
        };
        iDraw.prototype[_createOpts] = function (opts) {
            return __assign$2(__assign$2({}, defaultOptions), opts);
        };
        return iDraw;
    }(Core));

    return iDraw;

}());
