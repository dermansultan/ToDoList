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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/displayRender.js":
/*!******************************!*\
  !*** ./src/displayRender.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst displayRender = (() => {\r\n// dom events occurences\r\nconst projectContainer = document.getElementById('projectContainer');\r\n\r\nfunction renderCompletedTaskItems(obj){\r\n\r\nprojectContainer.innerHTML = '';\r\n\r\nlet currentTasksArray = obj.currentTasks;\r\n\r\ncurrentTasksArray.forEach(element => {\r\n    console.log(`${element.title}`);\r\n});\r\n\r\n}\r\n\r\nreturn { renderCompletedTaskItems }\r\n\r\n})();\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (displayRender);\n\n//# sourceURL=webpack:///./src/displayRender.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _toDoTaskItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDoTaskItem */ \"./src/toDoTaskItem.js\");\n/* harmony import */ var _projectItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectItem */ \"./src/projectItem.js\");\n/* harmony import */ var _displayRender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayRender */ \"./src/displayRender.js\");\n// import { format, compareAsc } from 'date-fns';\r\n\r\n\r\n\r\n\r\nconst item1 = Object(_toDoTaskItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, 'Make the Eat', `I will die if I don't!`, 'sometime', 'priority high', false);\r\nconst item2 = Object(_toDoTaskItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(2, 'Take out Garbage', 'take it out boy', 'tba', 'high', false);\r\n\r\nconst project1 = Object(_projectItem__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(1, 'Default Project', [item1, item2], []);\r\nconst projectArray = [project1];\r\n\r\n// item1.completeTaskItemToggle(item1);\r\n_displayRender__WEBPACK_IMPORTED_MODULE_2__[\"default\"].renderCompletedTaskItems(project1);\r\n\r\nconsole.log(project1)\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/projectItem.js":
/*!****************************!*\
  !*** ./src/projectItem.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst projectItem = ( projId, projTitle, currentTasks, completedTasks) => {\r\n    \r\n    return {projId, projTitle, currentTasks, completedTasks}\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (projectItem);\n\n//# sourceURL=webpack:///./src/projectItem.js?");

/***/ }),

/***/ "./src/toDoTaskItem.js":
/*!*****************************!*\
  !*** ./src/toDoTaskItem.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n const taskItem = (id, title, desc, dueDate, priority, completed) => {\r\n    \r\n    // toggles the boolean value of the items.completed property\r\n     function completeTaskItemToggle(obj){\r\n        obj.completed = !completed;\r\n     }\r\n  return { id, title, desc, dueDate, priority, completed, completeTaskItemToggle}\r\n };\r\n\r\n  /* harmony default export */ __webpack_exports__[\"default\"] = (taskItem);\r\n\r\n\n\n//# sourceURL=webpack:///./src/toDoTaskItem.js?");

/***/ })

/******/ });