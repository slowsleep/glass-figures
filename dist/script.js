/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("const btnCreate = document.querySelector(\"#btn_create\");\n\nconst selectFigure = document.querySelector(\"#figure\");\nconst width = document.querySelector(\"#width\");\nconst height = document.querySelector(\"#height\");\nconst color = document.querySelector(\"#color\");\nconst opacity = document.querySelector(\"#opacity\");\nconst corner = document.querySelector(\"#corner\");\n\nconst divCorner = document.querySelector(\".corner-count\");\ndivCorner.value = \"\";\ndivCorner.style.display = \"none\";\n\nconst leftSide = document.querySelector(\".left\");\nconst rightSide = document.querySelector(\".right\");\n\nconst canvas = document.querySelector(\"#canvas\");\nconst canvasBackground = document.querySelector('#canvasBackground');\n\nbtnCreate.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n    if (selectFigure.value == \"\") {\n        alert(\"Фигура не выбрана\");\n    } else {\n        let svg = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n        svg.setAttribute(\"width\", width.value);\n        svg.setAttribute(\"height\", height.value);\n\n        if (selectFigure.value == \"rectangle\" || selectFigure.value == \"square\") {\n            let rect = document.createElementNS(\"http://www.w3.org/2000/svg\", \"rect\");\n            rect.setAttribute(\"x\", 0);\n            rect.setAttribute(\"y\", 0);\n            rect.setAttribute(\"width\", width.value);\n            rect.setAttribute(\"height\", height.value);\n            rect.setAttribute(\"fill\", color.value);\n            rect.setAttribute(\"fill-opacity\", opacity.value);\n            svg.appendChild(rect);\n        } else if (selectFigure.value == \"circle\" || selectFigure.value == \"oval\") {\n            let circle = document.createElementNS(\"http://www.w3.org/2000/svg\", \"circle\");\n            circle.setAttribute(\"cx\", width.value / 2);\n            circle.setAttribute(\"cy\", width.value / 2);\n            circle.setAttribute(\"r\", width.value / 2);\n            circle.setAttribute(\"fill\", color.value);\n            circle.setAttribute(\"fill-opacity\", opacity.value);\n            svg.appendChild(circle);\n        } else if (selectFigure.value == \"polygon\") {\n            let polygon = document.createElementNS(\"http://www.w3.org/2000/svg\", \"polygon\");\n            polygon.setAttribute(\"points\", `0,${height.value} ${width.value / 2},0 ${width.value},${height.value}`);\n            polygon.setAttribute(\"fill\", color.value);\n            polygon.setAttribute(\"fill-opacity\", opacity.value);\n            svg.appendChild(polygon);\n        }\n\n        const getCoords = (elem) => {\n            const box = elem.getBoundingClientRect();\n            return {\n                top: box.top + scrollY ,\n                left: box.left + scrollX ,\n            };\n        };\n\n        svg.ondragstart = () => false;\n\n        svg.addEventListener(\"mousedown\", function (e) {\n            const coords = getCoords(svg);\n            const shiftX = e.pageX - coords.left;\n            const shiftY = e.pageY - coords.top;\n\n            const moveAt = (e) => {\n                svg.style.left = e.pageX - shiftX + \"px\";\n                svg.style.top = e.pageY - shiftY + \"px\";\n            };\n\n            const theEnd = () => {\n                document.removeEventListener(\"mousemove\", moveAt);\n                document.removeEventListener(\"mouseup\", theEnd);\n            };\n\n            svg.style.position = \"absolute\";\n            moveAt(e);\n\n            document.addEventListener(\"mousemove\", moveAt);\n            document.addEventListener(\"mouseup\", theEnd);\n        });\n\n        canvas.appendChild(svg);\n\n        if (selectFigure.value == \"polygon\") {\n            console.log({\n                selectFigure: selectFigure.value,\n                width: width.value,\n                height: height.value,\n                color: color.value,\n                opacity: opacity.value,\n                corner: corner.value,\n            });\n        } else {\n            console.log({\n                selectFigure: selectFigure.value,\n                width: width.value,\n                height: height.value,\n                color: color.value,\n                opacity: opacity.value,\n            });\n        }\n    }\n});\n\nselectFigure.addEventListener(\"change\", function (e) {\n    if (e.target.value == \"polygon\") {\n        divCorner.style.display = \"flex\";\n    } else {\n        divCorner.style.display = \"none\";\n    }\n});\n\nwidth.addEventListener(\"focus\", function () {\n    if (selectFigure.value == \"square\" || selectFigure.value == \"circle\") {\n        height.value = width.value;\n    }\n});\n\nheight.addEventListener(\"focus\", function () {\n    if (selectFigure.value == \"square\" || selectFigure.value == \"circle\") {\n        width.value = height.value;\n    }\n});\n\nfunction getTextRGBA(color, opacity) {\n    const red = parseInt(color.substring(1, 3), 16);\n    const green = parseInt(color.substring(3, 5), 16);\n    const blue = parseInt(color.substring(5, 7), 16);\n    const rgba = [red, green, blue, opacity];\n    return `rgba(${rgba.join(\", \")})`;\n}\n\ncanvasBackground.addEventListener(\"change\", function(e) {\n    if (e.target.value) {\n        canvas.style.backgroundColor = e.target.value;\n    }\n})\n\n\n//# sourceURL=webpack://glass-figures/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;