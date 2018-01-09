/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _History = _interopRequireDefault(__webpack_require__(2));

var _HoverBar = _interopRequireDefault(__webpack_require__(3));

var _DOMHelpers = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, null, [{
    key: "init",
    value: function init(container) {
      document.addEventListener("keyup", function (e) {
        return App.onKeyUp(e);
      });
      document.addEventListener("keydown", function (e) {
        return App.onKeyDown(e);
      });
      document.addEventListener("mousedown", function (e) {
        return App.onMouseDown(e);
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(state, onStateChange) {
      console.log(state);

      if (App[state] === undefined) {
        App[state] = {
          value: null,
          callbacks: []
        };
      }

      App[state].callbacks.push(onStateChange);
    }
  }, {
    key: "setValue",
    value: function setValue(state, value) {
      App[state].value = value;
      App.dispatch(state);
    }
  }, {
    key: "getValue",
    value: function getValue(state) {
      return App[state].value;
    }
  }, {
    key: "dispatch",
    value: function dispatch(changedState) {
      var stateValue = App[changedState].value;
      var callbacks = App[changedState].callbacks;
      callbacks.forEach(function (fn) {
        return fn(stateValue);
      });
    }
  }, {
    key: "registerEventListener",
    value: function registerEventListener(element, eventType, handler) {
      element.addEventListener(eventType, handler);
      App.listeners.push({
        element: element,
        eventType: eventType,
        handler: handler
      });
    }
  }, {
    key: "saveState",
    value: function saveState() {
      var clone = App.container.cloneNode(true);
      var count = {
        handle: App.count.handle,
        context: App.count.context
      };
      var snapshot = {
        DOM: clone,
        count: count,
        listeners: App.listeners
      };
      App.history.addCheckpoint(snapshot);
      App.setValue("backHistory", true);
    }
  }, {
    key: "createId",
    value: function createId(type) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      switch (type) {
        case "context":
          {
            var charCode = App.count.context++;
            return String.fromCharCode(charCode);
          }

        case "handle":
          {
            return "handle-".concat(++App.count.handle);
          }

        case "item":
          {}
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      App.clickPosStart = {
        x: e.pageX,
        y: e.pageY
      };
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var key = e.key;
      var ctrl = e.ctrlKey;

      switch (key) {
        case "z":
        case "Z":
          {
            if (ctrl) {
              App.undo();
            }

            break;
          }

        case "Control":
          {
            App.setValue("horizontal", e.key === "Control");
            break;
          }
      }
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(e) {
      App.setValue("horizontal", false);
    }
  }, {
    key: "validateClick",
    value: function validateClick(e) {
      var appIsFree = !App.busy.value;
      var newPos = {
        x: e.pageX,
        y: e.pageY
      };
      var oldPos = App.clickPosStart;

      var distance = _DOMHelpers.default.getDistance(oldPos, newPos);

      return distance < 10 && appIsFree;
    }
  }, {
    key: "undo",
    value: function undo() {
      var prevState = App.history.getAnteriorState();

      if (prevState) {
        var _DOM = prevState.DOM,
            count = prevState.count,
            listeners = prevState.listeners;
        App.applyDOMSnapshot(_DOM);
        App.applyCount(count);
        App.attachListeners(listeners);
        App.forwardHistory = true;
      } else {
        App.setValue("backHistory", false);
      }
    }
  }, {
    key: "applyDOMSnapshot",
    value: function applyDOMSnapshot(DOMSnapshot) {
      var parent = App.container.parentElement;
      parent.replaceChild(DOMSnapshot, App.container);
      App.container = DOMSnapshot;
    }
  }, {
    key: "applyCount",
    value: function applyCount(count) {
      console.log(count);
      App.count = count;
    }
  }, {
    key: "attachListeners",
    value: function attachListeners(listeners) {
      listeners.forEach(function (l) {
        var element = l.element,
            eventType = l.eventType,
            handler = l.handler;
        var id = element.id;
        element = document.getElementById(id);
        element && element.addEventListener(eventType, handler);
      });
      App.listeners = listeners;
    }
  }]);

  return App;
}();

exports.default = App;
App.listeners = [];
App.container = container;
App.history = new _History.default();
App.clickPosStart = {
  x: 0,
  y: 0
};
App.count = {
  handle: 0,
  context: 65
};
App.hoverBar = new _HoverBar.default({
  container: container.parentElement,
  thickness: 5
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DOMHelpers =
/*#__PURE__*/
function () {
  function DOMHelpers() {
    _classCallCheck(this, DOMHelpers);
  }

  _createClass(DOMHelpers, null, [{
    key: "getFlexGrow",
    value: function getFlexGrow(item) {
      return parseFloat(item.style.flexGrow);
    } // Get the width or height of an html element

  }, {
    key: "getSize",
    value: function getSize(el, horizontal) {
      return horizontal ? el.offsetHeight : el.offsetWidth;
    } // Traverse the parents of an element and add up their offsets

  }, {
    key: "getOffsetPos",
    value: function getOffsetPos(item, top) {
      var parent = item.offsetParent;
      var offset = top ? "offsetTop" : "offsetLeft";

      if (parent && parent !== document.body) {
        return this.getOffsetPos(parent, top) + item[offset];
      } else {
        return item[offset];
      }
    }
  }, {
    key: "getOffsetTop",
    value: function getOffsetTop(item) {
      return DOMHelpers.getOffsetPos(item, true);
    }
  }, {
    key: "getOffsetLeft",
    value: function getOffsetLeft(item) {
      return DOMHelpers.getOffsetPos(item, false);
    }
  }, {
    key: "logItemsGrow",
    value: function logItemsGrow(items) {
      var _this = this;

      var c = 1;
      var log = "";
      items.forEach(function (i) {
        return log += "".concat(c++, " = ").concat(_this.getFlexGrow(i).toFixed(2), ", ");
      });
      console.log(log);
    }
  }, {
    key: "getDistance",
    value: function getDistance(a, b) {
      var dx = b.x - a.x,
          dy = b.y - a.y;
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    } // Create and return an HTML node with the given params

  }, {
    key: "createNode",
    value: function createNode(_ref) {
      var id = _ref.id,
          _ref$content = _ref.content,
          content = _ref$content === void 0 ? "" : _ref$content,
          _ref$cssClass = _ref.cssClass,
          cssClass = _ref$cssClass === void 0 ? "" : _ref$cssClass,
          _ref$tag = _ref.tag,
          tag = _ref$tag === void 0 ? "div" : _ref$tag;
      var node = document.createElement(tag);
      node.id = id;
      node.innerHTML = content;
      node.className = cssClass;
      return node;
    }
  }, {
    key: "createFlexItem",
    value: function createFlexItem(_ref2) {
      var id = _ref2.id,
          _ref2$content = _ref2.content,
          content = _ref2$content === void 0 ? "" : _ref2$content,
          _ref2$grow = _ref2.grow,
          grow = _ref2$grow === void 0 ? 0 : _ref2$grow,
          _ref2$cssClass = _ref2.cssClass,
          cssClass = _ref2$cssClass === void 0 ? "item" : _ref2$cssClass;
      var item = this.createNode({
        id: id,
        content: content,
        cssClass: cssClass
      });
      item.style.flexGrow = grow;
      return item;
    } // Insert the given node next to a target node.
    // if prepend evaluates to true, insert before the target.

  }, {
    key: "insertNextTo",
    value: function insertNextTo(newNode, targetNode, prepend) {
      var parent = targetNode.parentNode;
      var nextElement = prepend ? targetNode : targetNode.nextElementSibling;
      parent.insertBefore(newNode, nextElement);
    }
  }, {
    key: "style",
    value: function style(element, styles) {
      for (var property in styles) {
        element.style[property] = styles[property];
      }
    } // Return the styles of the element corresponding to those found in the given styles object 

  }, {
    key: "getCurrentStyle",
    value: function getCurrentStyle(element, styles) {
      var current = {};

      for (var prop in styles) {
        var value = styles[prop];
        current[prop] = element.style[prop];
      }

      return current;
    }
  }]);

  return DOMHelpers;
}();

exports.default = DOMHelpers;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var History =
/*#__PURE__*/
function () {
  function History() {
    _classCallCheck(this, History);

    this.index = -1;
    this.checkpoints = [];
  }

  _createClass(History, [{
    key: "addCheckpoint",
    value: function addCheckpoint(snapshot) {
      this.checkpoints.push(snapshot);
      this.index++;
    }
  }, {
    key: "getAnteriorState",
    value: function getAnteriorState() {
      if (this.index == 0) {
        console.log("App history reached the initial state.");
        return false;
      }

      ;
      var snapshot = this.checkpoints[this.index--];
      return snapshot;
    }
  }]);

  return History;
}();

exports.default = History;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMHelpers = _interopRequireDefault(__webpack_require__(1));

var _App = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HoverBar =
/*#__PURE__*/
function () {
  function HoverBar(_ref) {
    var container = _ref.container,
        thickness = _ref.thickness;

    _classCallCheck(this, HoverBar);

    this.thickness = thickness;
    this.container = container;
    this.visible = true;
    this.clicked = false;
    this.bar = _DOMHelpers.default.createNode({
      id: "hoverbar",
      cssClass: "hoverbar"
    });
    this.attachBar(container);
  }

  _createClass(HoverBar, [{
    key: "attachBar",
    value: function attachBar(container) {
      var _this = this;

      container.appendChild(this.bar);
      container.addEventListener("mousemove", function (e) {
        return _this.onMouseMove(e);
      });
      container.addEventListener("mouseleave", function (e) {
        return _this.disable();
      });
      container.addEventListener("mouseenter", function (e) {
        return _this.enable();
      }); // container.addEventListener("mousedown", e => this.disable(true));
      // container.addEventListener("mouseup", e => this.enable(true));

      _App.default.subscribe("busy", function (b) {
        return _this.onAppBusy(b);
      });

      _App.default.subscribe("horizontal", function (value) {
        return _this.updateOrientation(value);
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      this.updateTarget(e);
      this.updatePosition(e);
      this.renderBar();
    }
  }, {
    key: "updateTarget",
    value: function updateTarget(e) {
      var target = e.target;

      if (target.id == this.ID) {
        target = e.path[1];
      }

      this.target = target;
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(e) {
      this.x = e.pageX - this.thickness / 2;
      this.y = e.pageY;
    }
  }, {
    key: "renderBar",
    value: function renderBar() {
      if (this.visible) {
        var containerTop = _DOMHelpers.default.getOffsetTop(this.container);

        var containerLeft = _DOMHelpers.default.getOffsetLeft(this.container);

        var targetLeft = _DOMHelpers.default.getOffsetLeft(this.target) - containerLeft;
        var targetTop = _DOMHelpers.default.getOffsetTop(this.target) - containerTop;
        var hoverX = this.x - containerLeft;
        var hoverY = this.y - containerTop;

        var _ref2 = this.horizontal ? [this.target.offsetWidth, this.thickness] : [this.thickness, this.target.offsetHeight],
            _ref3 = _slicedToArray(_ref2, 2),
            width = _ref3[0],
            height = _ref3[1];

        var _ref4 = this.horizontal ? [targetLeft, hoverY] : [hoverX, targetTop],
            _ref5 = _slicedToArray(_ref4, 2),
            left = _ref5[0],
            top = _ref5[1];

        var styles = {
          top: top,
          left: left,
          width: width,
          height: height
        };

        _DOMHelpers.default.style(this.bar, styles);
      }
    }
  }, {
    key: "updateOrientation",
    value: function updateOrientation(value) {
      this.horizontal = value;
      this.renderBar();
    }
  }, {
    key: "enable",
    value: function enable() {
      this.visible = true;

      _DOMHelpers.default.style(this.bar, {
        opacity: "1"
      });
    }
  }, {
    key: "disable",
    value: function disable() {
      this.visible = false;

      _DOMHelpers.default.style(this.bar, {
        opacity: "0"
      });
    }
  }, {
    key: "onAppBusy",
    value: function onAppBusy(appBusy) {
      if (appBusy) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }]);

  return HoverBar;
}();

exports.default = HoverBar;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// import History from "./History";
// import { default as DOM } from "./DOMHelpers";
// export default class Action {
// 	// Create and return an HTML node with the given params
// 	static createNode(params) {
// 		let node = DOM.createNode(params);
// 		// History.register("add", node);
// 		return node;
// 	}
// 	static createFlexItem(params) {
// 		let item = DOM.createFlexItem(params);
// 		// History.register("add", item);
// 		return item;
// 	}
// 	// Insert the given node next to a target node.
// 	// if prepend evaluates to true, insert before the target.
// 	static insertNextTo(newNode, targetNode, prepend) {
// 		DOM.insertNextTo(newNode, targetNode, prepend);
// 		// History.register("insert", newNode );
// 	}
// 	static style(element, styles) {
// 		let currentStyle = DOM.getCurrentStyle(element, styles);
// 		// History.register("restyle", {element, currentStyle});
// 		DOM.style(element, styles);
// 	}
// 	static saveElementPosition(element) {
// 		element.oldParent = element.parentElement;
// 		element.oldSiblings = {
// 			next: element.nextElementSibling,
// 			previous: element.previousElementSibling
// 		}
// 	}
// }
// DOM.undo = {
// 	add: element => { console.log("removing element: "); console.log(element); element.remove() },
// 	restyle: ({element, oldStyles}) => {console.log("undoing styles, applying style"); console.log(oldStyles); DOM.style(element, oldStyles) },
// 	insert: element => { DOM.saveElementPosition(element) }
// }
// DOM.redo = {
// 	insert: element => { 
// 		let targetNode = element.oldSiblings.next;
// 		DOM.insertNextTo(element, targetNode); 
// 	}
// }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = _interopRequireDefault(__webpack_require__(6));

var _App = _interopRequireDefault(__webpack_require__(0));

var _SizingContext = _interopRequireDefault(__webpack_require__(16));

var _History = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.getElementById("container");
var undoButton = document.getElementById("undo");
var redoButton = document.getElementById("redo");

var onBackHistoryChange = function onBackHistoryChange(backHistory) {
  undoButton.className = backHistory ? "btn-active" : "btn-inactive";
};

var onForwardHistoryChange = function onForwardHistoryChange(forwardHistory) {
  redoButton.className = forwardHistory ? "btn-active" : "btn-inactive";
};

_App.default.subscribe("backHistory", onBackHistoryChange);

_App.default.subscribe("forwardHistory", onForwardHistoryChange);

undoButton.addEventListener("click", function (e) {
  return _App.default.undo();
});

var init = function init(c) {
  new _SizingContext.default({
    container: c
  });

  _App.default.init(c);

  _App.default.saveState();
};

init(container);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(14)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, "@font-face {\n  src: url(" + __webpack_require__(9) + ");\n  font-family: \"Nunito-Light\"; }\n\n@font-face {\n  src: url(" + __webpack_require__(10) + ");\n  font-family: \"Nunito-Regular\"; }\n\n@font-face {\n  src: url(" + __webpack_require__(11) + ");\n  font-family: \"Nunito-SemiBold\"; }\n\n@font-face {\n  src: url(" + __webpack_require__(12) + ");\n  font-family: \"Nunito-Bold\"; }\n\n@font-face {\n  src: url(" + __webpack_require__(13) + ");\n  font-family: \"Nunito-ExtraBold\"; }\n\n* {\n  user-select: none; }\n\nbutton {\n  border-radius: 50%;\n  width: 50px !important;\n  height: 50px !important;\n  margin: auto;\n  border: none;\n  background: white;\n  font-size: 180% !important;\n  color: #444;\n  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);\n  outline: none !important; }\n\nbutton:hover {\n  background: #bd5; }\n\nbody {\n  background: #2196F3; }\n\n.main {\n  height: 90vh;\n  width: 70vw;\n  position: absolute;\n  top: 0;\n  right: 0;\n  box-shadow: 0 0 20px 3px rgba(0, 0, 30, 0.6);\n  left: 0;\n  bottom: 0;\n  margin: auto; }\n\n.container {\n  display: flex;\n  align-items: stretch;\n  align-content: center;\n  box-sizing: border-box;\n  justify-content: space-around;\n  width: 100%;\n  height: 100%; }\n\n.item--row {\n  display: flex;\n  flex-flow: row; }\n\n.item--column {\n  display: flex;\n  flex-flow: column; }\n\n.item {\n  background-color: #fff;\n  display: flex;\n  cursor: crosshair;\n  align-items: center;\n  justify-content: space-around;\n  flex: 1 0 1%;\n  font-family: Nunito-SemiBold; }\n\n.handle--h {\n  background: #2196F3;\n  background: #9bF;\n  flex: 0 1 5px;\n  cursor: row-resize; }\n\n.handle--v {\n  background: #2196F3;\n  background: #9bF;\n  flex: 0 1 5px;\n  cursor: col-resize; }\n\n.hoverbar {\n  position: absolute;\n  background: rgba(0, 255, 0, 0.2);\n  pointer-events: none; }\n\n.handle:hover ~ .hoverbar {\n  visibility: hidden; }\n\n.controls {\n  display: flex;\n  position: fixed;\n  left: 20px; }\n\nbutton {\n  width: 70px;\n  height: 40px;\n  font-size: 130%;\n  margin: 10px 10px 0 0; }\n\n@media screen and (max-width: 500px) {\n  * {\n    flex-direction: column; } }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c41c2502180f63ce383b6e3cc042617a.ttf";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "65bb0a158ee1967292ee4d11079d45ae.ttf";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "713ac08dfb7141494d4a69f344ff69fd.ttf";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6f47bcfc065790f02ed3cb8b51bef56f.ttf";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8f56148bb7b75bdf3358914c28cb798f.ttf";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(15);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMHelpers = _interopRequireDefault(__webpack_require__(1));

var _Action = _interopRequireDefault(__webpack_require__(4));

var _App = _interopRequireDefault(__webpack_require__(0));

var _Handle = _interopRequireDefault(__webpack_require__(17));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SizingContext =
/*#__PURE__*/
function () {
  function SizingContext(_ref) {
    var container = _ref.container,
        _ref$horizontal = _ref.horizontal,
        horizontal = _ref$horizontal === void 0 ? false : _ref$horizontal,
        _ref$initialSetup = _ref.initialSetup,
        initialSetup = _ref$initialSetup === void 0 ? null : _ref$initialSetup;

    _classCallCheck(this, SizingContext);

    this.items = [];
    this.handles = [];
    this.itemCount = 0;
    this.container = container;
    this.horizontal = horizontal;
    this.id = _App.default.createId("context");
    this.initialSetup = initialSetup;
    this.initContainer();
  }

  _createClass(SizingContext, [{
    key: "initContainer",
    value: function initContainer() {
      var item = this.getNewItem(1);
      this.container.innerHTML = "";
      this.container.id = this.id;
      this.container.appendChild(item);
      this.listen(item);
      this.styleContainer();

      if (this.initialSetup) {
        this.setup();
      }
    }
  }, {
    key: "styleContainer",
    value: function styleContainer() {
      this.container.className += this.horizontal ? "--column" : "--row";
    }
  }, {
    key: "getNewItem",
    value: function getNewItem(grow) {
      this.itemCount++;
      var id = this.id + this.itemCount;

      var item = _DOMHelpers.default.createFlexItem({
        id: id,
        grow: grow,
        content: id
      });

      this.items.push(item);
      return item;
    } // Insert a flex item next to the clicked position

  }, {
    key: "insertFlexItem",
    value: function insertFlexItem(target) {
      var item = this.getNewItem();
      this.listen(item);

      _DOMHelpers.default.insertNextTo(item, target, this.prepend);
    } // Insert a sizing handle at the clicked position 

  }, {
    key: "attachHandle",
    value: function attachHandle(target, initialPos) {
      var handle = new _Handle.default({
        target: target,
        initialPos: initialPos,
        prepend: this.prepend,
        horizontal: this.horizontal
      });
      this.handles.push(handle);
    }
  }, {
    key: "listen",
    value: function listen(item) {
      var _this = this;

      var handler = function handler(e) {
        if (_App.default.validateClick(e)) {
          console.log("blabla");

          _this.onClick(e);
        }
      };

      _App.default.registerEventListener(item, "click", handler);
    }
  }, {
    key: "setup",
    value: function setup() {
      var config = this.initialSetup;
      var target = this.items[0];

      var targetSize = _DOMHelpers.default.getSize(target, this.horizontal);

      this.prepend = config.offset > targetSize / 2;
      this.insertFlexItem(target);
      this.attachHandle(target, config.raw);
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      e.stopPropagation();
      var rawPos = {
        x: e.pageX,
        y: e.pageY
      };
      var offsetPos = appHorizontal ? e.offsetY : e.offsetX;
      var target = e.target;

      var targetSize = _DOMHelpers.default.getSize(target, appHorizontal);

      var appHorizontal = _App.default.getValue("horizontal");

      var newOrientation = this.horizontal !== appHorizontal;

      if (newOrientation) {
        _App.default.saveState();

        return new SizingContext({
          container: target,
          horizontal: appHorizontal,
          initialSetup: {
            raw: rawPos,
            offset: offsetPos
          }
        });
      }

      _App.default.saveState();

      this.prepend = offsetPos < targetSize / 2;
      this.insertFlexItem(target);
      this.attachHandle(target, rawPos);
    } // removeListeners(item) {
    // 	item.removeEventListener(this.onClick);
    // }

  }]);

  return SizingContext;
}();

exports.default = SizingContext;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMHelpers = _interopRequireDefault(__webpack_require__(1));

var _Action = _interopRequireDefault(__webpack_require__(4));

var _App = _interopRequireDefault(__webpack_require__(0));

var _HoverBar = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Handle =
/*#__PURE__*/
function () {
  function Handle(_ref) {
    var target = _ref.target,
        _ref$initialPos = _ref.initialPos,
        initialPos = _ref$initialPos === void 0 ? {
      x: NaN,
      y: NaN
    } : _ref$initialPos,
        prepend = _ref.prepend,
        horizontal = _ref.horizontal;

    _classCallCheck(this, Handle);

    this.horizontal = horizontal;
    this.node = Handle.createNode(horizontal);
    this.initHandle(target, prepend);
    var position = this.processPosition({
      x: initialPos.x,
      y: initialPos.y
    });
    this.resizeTo(position);
    this.clicked = false;
  }

  _createClass(Handle, [{
    key: "initHandle",
    value: function initHandle(target, prepend) {
      _DOMHelpers.default.insertNextTo(this.node, target, prepend);

      this.updateSiblings();
      this.updateSizingArea();
      this.listen(this.node);
    }
  }, {
    key: "updateSiblings",
    value: function updateSiblings(e) {
      this.nextItem = this.node.nextSibling;
      this.prevItem = this.node.previousSibling;
    }
  }, {
    key: "resizeTo",
    value: function resizeTo(position) {
      this.updateGrows(position);
    }
  }, {
    key: "processPosition",
    value: function processPosition(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      var pagePos = this.horizontal ? y : x;
      var start = this.contextStart;
      var end = this.contextEnd;
      var pos = pagePos - start;

      if (pos > end) {
        pos = end;
      } else if (pos < 0) {
        pos = 0;
      }

      return pos;
    }
  }, {
    key: "updateSizingArea",
    value: function updateSizingArea() {
      var nextSize = _DOMHelpers.default.getSize(this.nextItem, this.horizontal);

      var prevOffset = _DOMHelpers.default.getOffsetPos(this.prevItem, this.horizontal);

      var nextOffset = _DOMHelpers.default.getOffsetPos(this.nextItem, this.horizontal);

      this.contextStart = prevOffset;
      this.contextEnd = nextOffset + nextSize - prevOffset;
    }
  }, {
    key: "updateGrows",
    value: function updateGrows(pos) {
      var totalGrow = this.getTotalGrow();
      var totalSize = this.getTotalSize();
      var prevItemGrow = parseFloat(totalGrow * pos / totalSize).toFixed(3);
      var nextItemGrow = totalGrow - prevItemGrow;

      _DOMHelpers.default.style(this.nextItem, {
        flex: nextItemGrow
      });

      _DOMHelpers.default.style(this.prevItem, {
        flex: prevItemGrow
      });
    }
  }, {
    key: "getTotalSize",
    value: function getTotalSize() {
      var d1 = _DOMHelpers.default.getSize(this.nextItem, this.horizontal);

      var d2 = _DOMHelpers.default.getSize(this.prevItem, this.horizontal);

      return d1 + d2;
    }
  }, {
    key: "getTotalGrow",
    value: function getTotalGrow() {
      var g1 = _DOMHelpers.default.getFlexGrow(this.nextItem);

      var g2 = _DOMHelpers.default.getFlexGrow(this.prevItem);

      return g1 + g2;
    }
  }, {
    key: "listen",
    value: function listen(handle) {
      var _this = this;

      _App.default.registerEventListener(handle, "mousedown", function (e) {
        return _this.onMouseDown(e);
      });

      _App.default.registerEventListener(document, "mousemove", function (e) {
        return _this.onMouseMove(e);
      });

      _App.default.registerEventListener(document, "mouseup", function (e) {
        return _this.onMouseUp(e);
      });
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      e.stopPropagation();
      console.log("hey! :)");

      _App.default.setValue("busy", true);

      this.updateSiblings();
      this.updateSizingArea();
      this.clicked = true;

      _App.default.saveState();
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      if (this.clicked) {
        _App.default.setValue("busy", false);

        this.clicked = false;
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      if (this.clicked) {
        e.stopPropagation();
        var position = this.processPosition({
          x: e.pageX,
          y: e.pageY
        });
        this.resizeTo(position);
      }
    }
  }], [{
    key: "createNode",
    value: function createNode(horizontal) {
      var id = _App.default.createId('handle');

      var cssClass = horizontal ? "handle--h" : "handle--v";

      var node = _DOMHelpers.default.createNode({
        id: id,
        cssClass: cssClass
      });

      return node;
    }
  }]);

  return Handle;
}();

exports.default = Handle;

/***/ })
/******/ ]);