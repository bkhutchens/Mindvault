"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "(pages-dir-browser)/./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(pages-dir-browser)/./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(pages-dir-browser)/./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_EditNoteModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/EditNoteModal */ \"(pages-dir-browser)/./components/EditNoteModal.jsx\");\n\nvar _s = $RefreshSig$();\n\n\nfunction Home() {\n    _s();\n    const approvedTags = [\n        \"Project\",\n        \"Notes\",\n        \"Reminder\",\n        \"Idea\",\n        \"Task\",\n        \"Meeting\",\n        \"Question\",\n        \"Personal\",\n        \"Work\",\n        \"List\",\n        \"Event\"\n    ];\n    const [notes, setNotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [isRecording, setIsRecording] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [editingNote, setEditingNote] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const mediaRecorderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const audioChunksRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Home.useEffect\": ()=>{\n            fetchNotes();\n        }\n    }[\"Home.useEffect\"], []);\n    const fetchNotes = async ()=>{\n        const res = await fetch('/api/notes');\n        const data = await res.json();\n        const parsedNotes = data.notes.map((note)=>({\n                ...note,\n                tags: note.tags.split(\",\")\n            }));\n        setNotes(parsedNotes);\n    };\n    const startRecording = async ()=>{\n        audioChunksRef.current = [];\n        try {\n            const stream = await navigator.mediaDevices.getUserMedia({\n                audio: true\n            });\n            mediaRecorderRef.current = new MediaRecorder(stream);\n            mediaRecorderRef.current.ondataavailable = (e)=>audioChunksRef.current.push(e.data);\n            mediaRecorderRef.current.onstop = async ()=>{\n                const audioBlob = new Blob(audioChunksRef.current, {\n                    type: \"audio/webm\"\n                });\n                await transcribeAudio(audioBlob);\n                audioChunksRef.current = [];\n            };\n            mediaRecorderRef.current.start();\n            setIsRecording(true);\n        } catch (e) {\n            console.error(e);\n        }\n    };\n    const stopRecording = ()=>{\n        mediaRecorderRef.current.stop();\n        setIsRecording(false);\n    };\n    const transcribeAudio = async (audioBlob)=>{\n        const formData = new FormData();\n        formData.append(\"file\", audioBlob, \"audio.webm\");\n        const response = await fetch(\"/api/transcribe\", {\n            method: \"POST\",\n            body: formData\n        });\n        const data = await response.json();\n        if (data.note) {\n            if (typeof data.note.tags === 'string') {\n                data.note.tags = data.note.tags.split(\",\");\n            }\n            setNotes((prev)=>[\n                    data.note,\n                    ...prev\n                ]);\n        } else {\n            alert(\"Error in transcription: \".concat(data.error));\n        }\n    };\n    const deleteNote = async (id)=>{\n        await fetch(\"/api/deleteNote\", {\n            method: \"DELETE\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                id\n            })\n        });\n        setNotes(notes.filter((n)=>n.id !== id));\n    };\n    const handleSave = async (id, summary, tags)=>{\n        const res = await fetch(\"/api/editNote\", {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                id,\n                summary,\n                tags\n            })\n        });\n        const data = await res.json();\n        if (data.note) {\n            // Safely handle tags clearly\n            if (typeof data.note.tags === \"string\") {\n                data.note.tags = data.note.tags.split(\",\").map((tag)=>tag.trim());\n            }\n            setNotes(notes.map((n)=>n.id === id ? data.note : n));\n            setEditingNote(null);\n        } else {\n            alert(\"Error updating note!\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"p-4 text-center\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-2xl font-bold\",\n                children: \"MindVault.ai\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                lineNumber: 99,\n                columnNumber: 7\n            }, this),\n            !isRecording ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: startRecording,\n                children: \"Start Recording\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                lineNumber: 101,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: stopRecording,\n                children: \"Stop Recording\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                lineNumber: 103,\n                columnNumber: 9\n            }, this),\n            notes.map((note)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"p-3 my-2 bg-gray-200 rounded\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            children: note.summary\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                            lineNumber: 108,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"small\", {\n                            children: note.tags.join(\", \")\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                            lineNumber: 109,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"details\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"summary\", {\n                                    children: \"Full transcription\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                                    lineNumber: 111,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: note.transcription\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                                    lineNumber: 112,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                            lineNumber: 110,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>setEditingNote(note),\n                            className: \"mr-2\",\n                            children: \"Edit\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                            lineNumber: 114,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>deleteNote(note.id),\n                            children: \"Delete\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                            lineNumber: 115,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, note.id, true, {\n                    fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                    lineNumber: 107,\n                    columnNumber: 9\n                }, this)),\n            editingNote && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_EditNoteModal__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                note: editingNote,\n                approvedTags: approvedTags,\n                onSave: handleSave,\n                onClose: ()=>setEditingNote(null)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n                lineNumber: 120,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\bkhut\\\\Documents\\\\GitHub\\\\my-mindvault\\\\pages\\\\index.js\",\n        lineNumber: 98,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"x7ygFUfdvAg1EHFp/4tg9V55gTo=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0NBQ2pCLDhEQUFDUztzQ0FBT2pELEtBQUtDLElBQUksQ0FBQ2lELElBQUksQ0FBQzs7Ozs7O3NDQUN2Qiw4REFBQ0M7OzhDQUNDLDhEQUFDWDs4Q0FBUTs7Ozs7OzhDQUNULDhEQUFDWTs4Q0FBR3BELEtBQUtxRCxhQUFhOzs7Ozs7Ozs7Ozs7c0NBRXhCLDhEQUFDUDs0QkFBT0MsU0FBUyxJQUFNekQsZUFBZVU7NEJBQU80QyxXQUFVO3NDQUFPOzs7Ozs7c0NBQzlELDhEQUFDRTs0QkFBT0MsU0FBUyxJQUFNZixXQUFXaEMsS0FBS2lDLEVBQUU7c0NBQUc7Ozs7Ozs7bUJBUnBDakMsS0FBS2lDLEVBQUU7Ozs7O1lBWWxCNUMsNkJBQ0MsOERBQUNQLGlFQUFhQTtnQkFDWmtCLE1BQU1YO2dCQUNOTCxjQUFjQTtnQkFDZHNFLFFBQVFmO2dCQUNSZ0IsU0FBUyxJQUFNakUsZUFBZTs7Ozs7Ozs7Ozs7O0FBS3hDO0dBN0h3QlA7S0FBQUEiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYmtodXRcXERvY3VtZW50c1xcR2l0SHViXFxteS1taW5kdmF1bHRcXHBhZ2VzXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEVkaXROb3RlTW9kYWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvRWRpdE5vdGVNb2RhbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcclxuICBjb25zdCBhcHByb3ZlZFRhZ3MgPSBbXHJcbiAgICBcIlByb2plY3RcIiwgXCJOb3Rlc1wiLCBcIlJlbWluZGVyXCIsIFwiSWRlYVwiLCBcIlRhc2tcIixcclxuICAgIFwiTWVldGluZ1wiLCBcIlF1ZXN0aW9uXCIsIFwiUGVyc29uYWxcIiwgXCJXb3JrXCIsIFwiTGlzdFwiLCBcIkV2ZW50XCJcclxuICBdO1xyXG5cclxuICBjb25zdCBbbm90ZXMsIHNldE5vdGVzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbaXNSZWNvcmRpbmcsIHNldElzUmVjb3JkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZWRpdGluZ05vdGUsIHNldEVkaXRpbmdOb3RlXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IG1lZGlhUmVjb3JkZXJSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYXVkaW9DaHVua3NSZWYgPSB1c2VSZWYoW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4geyBmZXRjaE5vdGVzKCk7IH0sIFtdKTtcclxuXHJcbiAgY29uc3QgZmV0Y2hOb3RlcyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL25vdGVzJyk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgIGNvbnN0IHBhcnNlZE5vdGVzID0gZGF0YS5ub3Rlcy5tYXAobm90ZSA9PiAoe1xyXG4gICAgICAuLi5ub3RlLFxyXG4gICAgICB0YWdzOiBub3RlLnRhZ3Muc3BsaXQoXCIsXCIpXHJcbiAgICB9KSk7XHJcbiAgICBzZXROb3RlcyhwYXJzZWROb3Rlcyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhcnRSZWNvcmRpbmcgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBhdWRpb0NodW5rc1JlZi5jdXJyZW50ID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pO1xyXG4gICAgICBtZWRpYVJlY29yZGVyUmVmLmN1cnJlbnQgPSBuZXcgTWVkaWFSZWNvcmRlcihzdHJlYW0pO1xyXG4gICAgICBtZWRpYVJlY29yZGVyUmVmLmN1cnJlbnQub25kYXRhYXZhaWxhYmxlID0gKGUpID0+IGF1ZGlvQ2h1bmtzUmVmLmN1cnJlbnQucHVzaChlLmRhdGEpO1xyXG4gICAgICBtZWRpYVJlY29yZGVyUmVmLmN1cnJlbnQub25zdG9wID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGF1ZGlvQmxvYiA9IG5ldyBCbG9iKGF1ZGlvQ2h1bmtzUmVmLmN1cnJlbnQsIHsgdHlwZTogXCJhdWRpby93ZWJtXCIgfSk7XHJcbiAgICAgICAgYXdhaXQgdHJhbnNjcmliZUF1ZGlvKGF1ZGlvQmxvYik7XHJcbiAgICAgICAgYXVkaW9DaHVua3NSZWYuY3VycmVudCA9IFtdO1xyXG4gICAgICB9O1xyXG4gICAgICBtZWRpYVJlY29yZGVyUmVmLmN1cnJlbnQuc3RhcnQoKTtcclxuICAgICAgc2V0SXNSZWNvcmRpbmcodHJ1ZSk7XHJcbiAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuICB9O1xyXG5cclxuICBjb25zdCBzdG9wUmVjb3JkaW5nID0gKCkgPT4ge1xyXG4gICAgbWVkaWFSZWNvcmRlclJlZi5jdXJyZW50LnN0b3AoKTtcclxuICAgIHNldElzUmVjb3JkaW5nKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0cmFuc2NyaWJlQXVkaW8gPSBhc3luYyAoYXVkaW9CbG9iKSA9PiB7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBhdWRpb0Jsb2IsIFwiYXVkaW8ud2VibVwiKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL3RyYW5zY3JpYmVcIiwgeyBtZXRob2Q6IFwiUE9TVFwiLCBib2R5OiBmb3JtRGF0YSB9KTtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgXHJcbiAgICBpZiAoZGF0YS5ub3RlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgZGF0YS5ub3RlLnRhZ3MgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgZGF0YS5ub3RlLnRhZ3MgPSBkYXRhLm5vdGUudGFncy5zcGxpdChcIixcIik7XHJcbiAgICAgIH1cclxuICAgICAgc2V0Tm90ZXMoKHByZXYpID0+IFtkYXRhLm5vdGUsIC4uLnByZXZdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KGBFcnJvciBpbiB0cmFuc2NyaXB0aW9uOiAke2RhdGEuZXJyb3J9YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBcclxuXHJcbiAgY29uc3QgZGVsZXRlTm90ZSA9IGFzeW5jIChpZCkgPT4ge1xyXG4gICAgYXdhaXQgZmV0Y2goXCIvYXBpL2RlbGV0ZU5vdGVcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpZCB9KSxcclxuICAgIH0pO1xyXG4gICAgc2V0Tm90ZXMobm90ZXMuZmlsdGVyKG4gPT4gbi5pZCAhPT0gaWQpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlU2F2ZSA9IGFzeW5jIChpZCwgc3VtbWFyeSwgdGFncykgPT4ge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL2VkaXROb3RlXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGlkLCBzdW1tYXJ5LCB0YWdzIH0pLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgIFxyXG4gICAgaWYgKGRhdGEubm90ZSkge1xyXG4gICAgICAvLyBTYWZlbHkgaGFuZGxlIHRhZ3MgY2xlYXJseVxyXG4gICAgICBpZiAodHlwZW9mIGRhdGEubm90ZS50YWdzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgZGF0YS5ub3RlLnRhZ3MgPSBkYXRhLm5vdGUudGFncy5zcGxpdChcIixcIikubWFwKHRhZyA9PiB0YWcudHJpbSgpKTtcclxuICAgICAgfVxyXG4gICAgICBzZXROb3Rlcyhub3Rlcy5tYXAobiA9PiAobi5pZCA9PT0gaWQgPyBkYXRhLm5vdGUgOiBuKSkpO1xyXG4gICAgICBzZXRFZGl0aW5nTm90ZShudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwiRXJyb3IgdXBkYXRpbmcgbm90ZSFcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHRleHQtY2VudGVyXCI+XHJcbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGRcIj5NaW5kVmF1bHQuYWk8L2gxPlxyXG4gICAgICB7IWlzUmVjb3JkaW5nID8gKFxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17c3RhcnRSZWNvcmRpbmd9PlN0YXJ0IFJlY29yZGluZzwvYnV0dG9uPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17c3RvcFJlY29yZGluZ30+U3RvcCBSZWNvcmRpbmc8L2J1dHRvbj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHtub3Rlcy5tYXAobm90ZSA9PiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e25vdGUuaWR9IGNsYXNzTmFtZT1cInAtMyBteS0yIGJnLWdyYXktMjAwIHJvdW5kZWRcIj5cclxuICAgICAgICAgIDxoMz57bm90ZS5zdW1tYXJ5fTwvaDM+XHJcbiAgICAgICAgICA8c21hbGw+e25vdGUudGFncy5qb2luKFwiLCBcIil9PC9zbWFsbD5cclxuICAgICAgICAgIDxkZXRhaWxzPlxyXG4gICAgICAgICAgICA8c3VtbWFyeT5GdWxsIHRyYW5zY3JpcHRpb248L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIDxwPntub3RlLnRyYW5zY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgPC9kZXRhaWxzPlxyXG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0aW5nTm90ZShub3RlKX0gY2xhc3NOYW1lPVwibXItMlwiPkVkaXQ8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZGVsZXRlTm90ZShub3RlLmlkKX0+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkpfVxyXG5cclxuICAgICAge2VkaXRpbmdOb3RlICYmIChcclxuICAgICAgICA8RWRpdE5vdGVNb2RhbFxyXG4gICAgICAgICAgbm90ZT17ZWRpdGluZ05vdGV9XHJcbiAgICAgICAgICBhcHByb3ZlZFRhZ3M9e2FwcHJvdmVkVGFnc31cclxuICAgICAgICAgIG9uU2F2ZT17aGFuZGxlU2F2ZX1cclxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldEVkaXRpbmdOb3RlKG51bGwpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkVkaXROb3RlTW9kYWwiLCJIb21lIiwiYXBwcm92ZWRUYWdzIiwibm90ZXMiLCJzZXROb3RlcyIsImlzUmVjb3JkaW5nIiwic2V0SXNSZWNvcmRpbmciLCJlZGl0aW5nTm90ZSIsInNldEVkaXRpbmdOb3RlIiwibWVkaWFSZWNvcmRlclJlZiIsImF1ZGlvQ2h1bmtzUmVmIiwiZmV0Y2hOb3RlcyIsInJlcyIsImZldGNoIiwiZGF0YSIsImpzb24iLCJwYXJzZWROb3RlcyIsIm1hcCIsIm5vdGUiLCJ0YWdzIiwic3BsaXQiLCJzdGFydFJlY29yZGluZyIsImN1cnJlbnQiLCJzdHJlYW0iLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJhdWRpbyIsIk1lZGlhUmVjb3JkZXIiLCJvbmRhdGFhdmFpbGFibGUiLCJlIiwicHVzaCIsIm9uc3RvcCIsImF1ZGlvQmxvYiIsIkJsb2IiLCJ0eXBlIiwidHJhbnNjcmliZUF1ZGlvIiwic3RhcnQiLCJjb25zb2xlIiwiZXJyb3IiLCJzdG9wUmVjb3JkaW5nIiwic3RvcCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZSIsIm1ldGhvZCIsImJvZHkiLCJwcmV2IiwiYWxlcnQiLCJkZWxldGVOb3RlIiwiaWQiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsImZpbHRlciIsIm4iLCJoYW5kbGVTYXZlIiwic3VtbWFyeSIsInRhZyIsInRyaW0iLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJoMyIsInNtYWxsIiwiam9pbiIsImRldGFpbHMiLCJwIiwidHJhbnNjcmlwdGlvbiIsIm9uU2F2ZSIsIm9uQ2xvc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-browser)/./pages/index.js\n"));

/***/ })

});