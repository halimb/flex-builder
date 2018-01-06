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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = _interopRequireDefault(__webpack_require__(1));

var _SizingContext = _interopRequireDefault(__webpack_require__(6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// //TODO: abstract out the whole thing as a container object
var container = document.getElementById("container");
var ctx = new _SizingContext.default(container); // var count = 0;
// var items = [];
// var handles = [];
// var addBtn = document.getElementById("add");
// var removeBtn = document.getElementById("remove");
// var container = document.getElementById("container");
// window.onmouseup = onMouseUp;
// window.onmouseleave = onMouseUp;
// function getFlexItem() {
// 	var item = document.createElement("div");
// 	item.className = "item"
// 	item.id = `item${count}`
// 	item.innerHTML = count;
// 	item.style.flexGrow = 1;
// 	return item;
// }
// function appendFlexItem() {
// 	count++;
// 	var item = getFlexItem();
// 	items.push(item);
// 	container.appendChild(item);
// }
// function appendSizingHandle() {
// 	var handle = document.createElement("div");
// 	handle.index = count;
// 	handle.className = "handle";
// 	handle.onmousedown = onHandleClick;
// 	handles.push(handle);
// 	container.appendChild(handle);
// }
// function removeFlexItem() {
// 	if (count > 1) {
// 		container.removeChild(handles.pop());
// 		container.removeChild(items.pop())
// 		count--;
// 	}
// }
// addBtn.onclick = () => {
// 	if (count > 0) { appendSizingHandle(); }
// 	appendFlexItem();
// }
// removeBtn.onclick = removeFlexItem;
// var clicked = false;
// var handleIndex, 
// 	totalGrow,
// 	areaStart,
// 	areaEnd,
// 	nextItem, 
// 	prevItem, 
// 	contextSize; 
// function getFlexGrow(item) {
// 	return parseFloat(item.style.flexGrow);
// }
// function getOffsetPos(item) {
// 	if (item.offsetParent && item.offsetParent != document.body) {
// 		return getOffsetPos(item.offsetParent)	+ item.offsetLeft;
// 	} else {
// 		return item.offsetLeft;
// 	}
// }
// function setSizingArea() {
// 	areaStart = getOffsetPos(prevItem);
// 	areaEnd = areaStart + getOffsetPos(nextItem) + nextItem.offsetWidth;
// }
//  Given a target sizing handle index, set: 
//  * contextSize: sum of the sizes of the two flex items surrounding the handle
//  * nextItem: reference to flex item element directly after the handle
//  * prevItem: reference to flex item element directly before the handle
//  * 
// function initSizingContext(index) {
// 	nextItem = items[index];
// 	prevItem = items[index - 1];
// 	var prevItemGrow = getFlexGrow(prevItem);
// 	var nextItemGrow = getFlexGrow(nextItem);
// 	totalGrow = prevItemGrow + nextItemGrow; 
// 	contextSize = prevItem.clientWidth + nextItem.clientWidth;
// }
// // Attach event handlers only to flex items within the sizing context
// function setEventHandlers() {
// 	items.forEach( item => {
// 		var target = (item == prevItem || item == nextItem);
// 		item.onmousemove = target ? onMouseMove : null;
// 	});
// }
// function onHandleClick(e) {
// 	e.preventDefault();
// 	clicked = true;
// 	handleIndex = e.target.index;
// 	initSizingContext(handleIndex);
// 	setSizingArea();
// 	setEventHandlers(handleIndex);
// }
// function onMouseUp(e) {
// 	e.preventDefault();
// 	if (clicked && count > 1) {
// 		clicked = false;
// 	}
// }
// function getMousePosition(e) {
// 	var pos = e.clientX - areaStart;
// 	if (pos < 0) { 
// 		pos = 0 
// 	} else if (pos > areaEnd) {
// 		pos = areaEnd;
// 	}
// 	return pos;
// }
// function updateSizes(handlePos) {
// 	var prevItemGrow = totalGrow * handlePos / contextSize;
// 	var nextItemGrow = totalGrow - prevItemGrow;
// 	nextItem.style.flexGrow = nextItemGrow;
// 	prevItem.style.flexGrow = prevItemGrow;
// }
// function onMouseMove(e) {
// 	e.preventDefault();
// 	if (clicked && count > 1) {
// 		var dividerPos = getMousePosition(e);
// 		updateSizes(dividerPos)
// 		//logItemsGrow();
// 	}
// }
// function logItemsGrow() {
// 	var c = 1;
// 	var log = "";
// 	items.forEach(i => log += `${c++} = ${getFlexGrow(i).toFixed(2)}, `);
// 	console.log(log);
// }
// function getContextGrow(index) {
// 	var total = 0;
// 	for(let i = 0; i < items.length; i++) {
// 		var item = items[i];
// 		if(item != nextItem && item != prevItem) {
// 			total += getFlexGrow(item);
// 		}
// 	}
// 	var res = items.length - total + handles.length * .05;
// 	return res > 0 ? res : 0;
// }
// // function insertDivision(clickEvent, orientation) {
// // 	var position = clickEvent.
// // }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "* {\n  border-radius: 4px;\n  transition: .1s ease; }\n\nbutton {\n  border-radius: 50%;\n  width: 50px !important;\n  height: 50px !important;\n  margin: auto;\n  border: none;\n  font-family: arial;\n  font-size: 180% !important;\n  color: #555;\n  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);\n  outline: none !important; }\n\nbutton:hover {\n  background: #bd5; }\n\nbody {\n  background: #2196F3; }\n\n.main {\n  height: 90vh;\n  width: 80vw;\n  position: absolute;\n  top: 5vh;\n  left: 10vw; }\n\n.container {\n  display: flex;\n  align-items: stretch;\n  align-content: center;\n  box-sizing: border-box;\n  justify-content: space-around;\n  width: 100%;\n  height: 100%; }\n\n.v {\n  flex-flow: row; }\n\n.h {\n  flex-flow: column; }\n\n.item {\n  background-color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex: 1 0 auto;\n  font-family: arial; }\n\n.handle {\n  content: \"\";\n  cursor: col-resize;\n  flex: 0 1 5px; }\n\n#item3 {\n  /*height: 220px;*/ }\n\n#item4 {\n  /*height: 40px;*/ }\n\n.btn-box {\n  position: fixed;\n  bottom: 20px; }\n\nbutton {\n  width: 70px;\n  height: 40px;\n  font-size: 130%;\n  margin: 10px 10px 0 0; }\n\n@media screen and (max-width: 400px) {\n  .container {\n    flex-direction: column; } }\n", ""]);

// exports


/***/ }),
/* 3 */
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
/* 4 */
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

var	fixUrls = __webpack_require__(5);

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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMHelpers = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SizingContainer =
/*#__PURE__*/
function () {
  function SizingContainer(HTMLnode) {
    var _this = this;

    var horizontal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var prepend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, SizingContainer);

    this.count = 0;
    this.items = [];
    this.handles = [];
    this.prepend = prepend;
    this.HTMLnode = HTMLnode;
    this.horizontal = horizontal;
    this.HTMLnode.addEventListener("click", function (e) {
      return _this.onClick(e);
    });
  }

  _createClass(SizingContainer, [{
    key: "getNewItem",
    value: function getNewItem() {
      console.log([_DOMHelpers.DOMHelpers]);
      this.count++;
      var id = "item".concat(this.count);

      var item = _DOMHelpers.DOMHelpers.createFlexItem({
        id: id,
        content: id
      });

      return item;
    } // Insert a flex item next to the clicked position

  }, {
    key: "insertFlexItem",
    value: function insertFlexItem(clickEvent) {
      var item = this.getNewItem();
      var target = clickEvent.target;

      _DOMHelpers.DOMHelpers.insertNextTo(item, target, this.prepend);

      this.items.push(item);
    } // Insert a sizing handle at the clicked position 

  }, {
    key: "insertSizingHandle",
    value: function insertSizingHandle(clickEvent) {
      var DOMElement = _DOMHelpers.DOMHelpers.createHandle();

      var target = clickEvent.target;

      _DOMHelpers.DOMHelpers.insertNextTo(DOMElement, target, this.prepend);

      var handle = new Handle({
        clickEvent: clickEvent,
        DOMElement: DOMElement,
        horizontal: this.horizontal
      });
      handles.push(handle);
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      console.log("in onclick");
      this.insertFlexItem(e);
      this.insertSizingHandle(e);
    }
  }]);

  return SizingContainer;
}();

exports.default = SizingContainer;

/***/ }),
/* 7 */
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
    } // Traverse the parents of an element and add up their offsets

  }, {
    key: "getOffsetPos",
    value: function getOffsetPos(item, horizontal) {
      var parent = item.offsetParent;
      var offset = horizontal ? "offsetTop" : "offsetLeft";

      if (parent && parent != document.body) {
        return this.getOffsetPos(parent, horizontal) + item[offset];
      } else {
        return item[offset];
      }
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
    } // Create and return an HTML node with the given params

  }, {
    key: "createNode",
    value: function createNode(_ref) {
      var _ref$id = _ref.id,
          id = _ref$id === void 0 ? ++DOMHelpers.ID : _ref$id,
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
          _ref2$cssClass = _ref2.cssClass,
          cssClass = _ref2$cssClass === void 0 ? "item" : _ref2$cssClass;
      var item = this.createNode(arguments[0]);
      item.style.flexGrow = 1;
      return item;
    }
  }, {
    key: "createHandle",
    value: function createHandle(_ref3) {
      var id = _ref3.id,
          _ref3$cssClass = _ref3.cssClass,
          cssClass = _ref3$cssClass === void 0 ? "handle" : _ref3$cssClass;
      return this.createNode(arguments[0]);
    } // Insert the given node next to a target node.
    // if prepend evaluates to true, insert before the target.

  }, {
    key: "insertNextTo",
    value: function insertNextTo(newNode, targetNode, prepend) {
      var parent = targetNode.parentNode;
      var nextElement = prepend ? targetNode : targetNode.nextSibling;
      parent.insertBefore(newNode, nextElement);
    } // Get the width or height of an html element

  }, {
    key: "getSize",
    value: function getSize(el, horizontal) {
      return horizontal ? el.clientHeight : el.clientWidth;
    }
  }]);

  return DOMHelpers;
}();

exports.default = DOMHelpers;
DOMHelpers.ID = 0;

/***/ })
/******/ ]);