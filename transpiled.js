import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/EnergyOrb.jsx");const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport1_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport1_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=63ee1a8a";
var _jsxFileName = "C:/Users/ﾃ］gel/.gemini/antigravity/scratch/aszend_app/src/components/EnergyOrb.jsx";
import __vite__cjsImport1_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=63ee1a8a";
const RANKS = [
	{
		id: 1,
		name: "PULSO",
		number: "01",
		core: "#93c5fd",
		mid: "#2563eb",
		outer: "#1e3a8a",
		req: 0,
		level: 1
	},
	{
		id: 2,
		name: "AURA",
		number: "02",
		core: "#c4b5fd",
		mid: "#7c3aed",
		outer: "#4c1d95",
		req: 7,
		level: 2
	},
	{
		id: 3,
		name: "Nﾃ?CLEO",
		number: "03",
		core: "#6ee7b7",
		mid: "#059669",
		outer: "#065f46",
		req: 30,
		level: 3
	},
	{
		id: 4,
		name: "ﾃ?TER",
		number: "04",
		core: "#fdba74",
		mid: "#ea580c",
		outer: "#9a3412",
		req: 90,
		level: 4
	},
	{
		id: 5,
		name: "ASCENSIﾃ?N",
		number: "05",
		core: "#fde68a",
		mid: "#d97706",
		outer: "#92400e",
		req: 365,
		level: 5
	}
];
export function EnergyOrb({ size = 280, rankIndex = 0, animated = true, className = "", locked = false }) {
	const baseRank = RANKS[rankIndex] ?? RANKS[0];
	const c = locked ? {
		core: "#6b7280",
		mid: "#374151",
		outer: "#111827",
		level: baseRank.level
	} : baseRank;
	const id = `o${rankIndex}x${size}`;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: `relative flex items-center justify-center select-none ${className}`,
		style: {
			width: size,
			height: size,
			position: "relative",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "absolute rounded-full pointer-events-none",
			style: {
				width: size * 1.7,
				height: size * 1.7,
				background: `radial-gradient(circle, ${c.mid}22 0%, transparent 68%)`,
				top: "50%",
				left: "50%",
				transform: "translate(-50%,-50%)",
				position: "absolute"
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 30,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("svg", {
			width: size,
			height: size,
			viewBox: "0 0 280 280",
			className: `relative z-10 ${animated && !locked ? "orb-float" : ""}`,
			style: {
				position: "relative",
				zIndex: 10,
				overflow: "visible"
			},
			children: [
				/* @__PURE__ */ _jsxDEV("defs", { children: [
					/* @__PURE__ */ _jsxDEV("radialGradient", {
						id: `${id}g`,
						cx: "38%",
						cy: "32%",
						r: "65%",
						children: [
							/* @__PURE__ */ _jsxDEV("stop", {
								offset: "0%",
								stopColor: c.core,
								stopOpacity: "1"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 51,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("stop", {
								offset: "55%",
								stopColor: c.mid,
								stopOpacity: "0.95"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("stop", {
								offset: "100%",
								stopColor: c.outer,
								stopOpacity: "0.75"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 53,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("filter", {
						id: `${id}f`,
						x: "-40%",
						y: "-40%",
						width: "180%",
						height: "180%",
						children: [/* @__PURE__ */ _jsxDEV("feGaussianBlur", {
							stdDeviation: "10",
							result: "b"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("feMerge", { children: [/* @__PURE__ */ _jsxDEV("feMergeNode", { in: "b" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 22
						}, this), /* @__PURE__ */ _jsxDEV("feMergeNode", { in: "SourceGraphic" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 44
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("filter", {
						id: `${id}h`,
						x: "-60%",
						y: "-60%",
						width: "220%",
						height: "220%",
						children: /* @__PURE__ */ _jsxDEV("feGaussianBlur", { stdDeviation: "18" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 9
				}, this),
				!locked && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
					c.level === 2 && /* @__PURE__ */ _jsxDEV("ellipse", {
						cx: "140",
						cy: "140",
						rx: "120",
						ry: "30",
						fill: "none",
						stroke: c.mid,
						strokeWidth: "2",
						strokeOpacity: "0.7",
						transform: "rotate(20 140 140)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 31
					}, this),
					c.level === 3 && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV("ellipse", {
						cx: "140",
						cy: "140",
						rx: "120",
						ry: "25",
						fill: "none",
						stroke: c.mid,
						strokeWidth: "2",
						strokeOpacity: "0.8",
						transform: "rotate(35 140 140)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 17
					}, this), /* @__PURE__ */ _jsxDEV("ellipse", {
						cx: "140",
						cy: "140",
						rx: "120",
						ry: "25",
						fill: "none",
						stroke: c.mid,
						strokeWidth: "2",
						strokeOpacity: "0.8",
						transform: "rotate(-35 140 140)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 15
					}, this),
					c.level === 4 && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
						/* @__PURE__ */ _jsxDEV("ellipse", {
							cx: "140",
							cy: "140",
							rx: "115",
							ry: "20",
							fill: "none",
							stroke: c.mid,
							strokeWidth: "2.5",
							strokeOpacity: "0.9",
							transform: "rotate(0 140 140)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("ellipse", {
							cx: "140",
							cy: "140",
							rx: "115",
							ry: "20",
							fill: "none",
							stroke: c.mid,
							strokeWidth: "2.5",
							strokeOpacity: "0.9",
							transform: "rotate(60 140 140)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("ellipse", {
							cx: "140",
							cy: "140",
							rx: "115",
							ry: "20",
							fill: "none",
							stroke: c.mid,
							strokeWidth: "2.5",
							strokeOpacity: "0.9",
							transform: "rotate(120 140 140)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("circle", {
							cx: "140",
							cy: "140",
							r: "130",
							fill: "none",
							stroke: c.core,
							strokeWidth: "1",
							strokeOpacity: "0.5",
							strokeDasharray: "5 15",
							className: animated ? "orb-spin" : "",
							style: { transformOrigin: "140px 140px" }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 15
					}, this),
					c.level === 5 && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
						/* @__PURE__ */ _jsxDEV("ellipse", {
							cx: "140",
							cy: "140",
							rx: "125",
							ry: "15",
							fill: "none",
							stroke: c.core,
							strokeWidth: "3",
							strokeOpacity: "1",
							transform: "rotate(0 140 140)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("ellipse", {
							cx: "140",
							cy: "140",
							rx: "125",
							ry: "15",
							fill: "none",
							stroke: c.core,
							strokeWidth: "3",
							strokeOpacity: "1",
							transform: "rotate(45 140 140)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("ellipse", {
							cx: "140",
							cy: "140",
							rx: "125",
							ry: "15",
							fill: "none",
							stroke: c.core,
							strokeWidth: "3",
							strokeOpacity: "1",
							transform: "rotate(90 140 140)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("ellipse", {
							cx: "140",
							cy: "140",
							rx: "125",
							ry: "15",
							fill: "none",
							stroke: c.core,
							strokeWidth: "3",
							strokeOpacity: "1",
							transform: "rotate(135 140 140)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("circle", {
							cx: "140",
							cy: "140",
							r: "135",
							fill: "none",
							stroke: c.mid,
							strokeWidth: "2",
							strokeOpacity: "0.6",
							strokeDasharray: "10 20",
							className: animated ? "orb-spin-reverse" : "",
							style: { transformOrigin: "140px 140px" }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ _jsxDEV("circle", {
							cx: "140",
							cy: "140",
							r: "105",
							fill: c.core,
							fillOpacity: "0.4",
							filter: `url(#${id}h)`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV("circle", {
					cx: "140",
					cy: "140",
					r: "80",
					fill: c.mid,
					fillOpacity: c.level >= 4 && !locked ? .35 : .15,
					filter: `url(#${id}h)`
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("circle", {
					cx: "140",
					cy: "140",
					r: "75",
					fill: `url(#${id}g)`,
					filter: `url(#${id}f)`,
					className: animated && !locked ? "orb-pulse" : "",
					style: { transformOrigin: "140px 140px" }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("ellipse", {
					cx: "113",
					cy: "111",
					rx: "22",
					ry: "14",
					fill: "white",
					fillOpacity: "0.18"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("ellipse", {
					cx: "104",
					cy: "104",
					rx: "8",
					ry: "5",
					fill: "white",
					fillOpacity: "0.28"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 111,
					columnNumber: 9
				}, this),
				locked && /* @__PURE__ */ _jsxDEV("g", {
					transform: "translate(128, 128) scale(1)",
					children: [/* @__PURE__ */ _jsxDEV("path", {
						d: "M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z",
						stroke: "rgba(255,255,255,0.8)",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 115,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("path", {
						d: "M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11",
						stroke: "rgba(255,255,255,0.8)",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 42,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 26,
		columnNumber: 5
	}, this);
}
_c = EnergyOrb;
var _c;
$RefreshReg$(_c, "EnergyOrb");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/EnergyOrb.jsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/ﾃ］gel/.gemini/antigravity/scratch/aszend_app/src/components/EnergyOrb.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/ﾃ］gel/.gemini/antigravity/scratch/aszend_app/src/components/EnergyOrb.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/ﾃ］gel/.gemini/antigravity/scratch/aszend_app/src/components/EnergyOrb.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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QUFNLEVBQUU7S0FBSyxhQUFhLEVBQUUsU0FBUyxLQUFLLENBQUMsU0FBUyxNQUFPO0tBQU0sUUFBUSxRQUFRLEdBQUc7SUFBTTs7Ozs7SUFFM0gsd0JBQUMsVUFBRDtLQUFRLElBQUc7S0FBTSxJQUFHO0tBQU0sR0FBRTtLQUMxQixNQUFNLFFBQVEsR0FBRztLQUNqQixRQUFRLFFBQVEsR0FBRztLQUNuQixXQUFXLFlBQVksQ0FBQyxTQUFTLGNBQWM7S0FDL0MsT0FBTyxFQUFFLGlCQUFpQixjQUFjO0lBQ3pDOzs7OztJQUVELHdCQUFDLFdBQUQ7S0FBUyxJQUFHO0tBQU0sSUFBRztLQUFNLElBQUc7S0FBSyxJQUFHO0tBQUssTUFBSztLQUFRLGFBQVk7SUFBUTs7Ozs7SUFDNUUsd0JBQUMsV0FBRDtLQUFTLElBQUc7S0FBTSxJQUFHO0tBQU0sSUFBRztLQUFLLElBQUc7S0FBSyxNQUFLO0tBQVEsYUFBWTtJQUFROzs7OztJQUUzRSxVQUNDLHdCQUFDLEtBQUQ7S0FBRyxXQUFVO2VBQWIsQ0FDRSx3QkFBQyxRQUFEO01BQU0sR0FBRTtNQUFpSSxRQUFPO01BQXdCLGFBQVk7TUFBSSxlQUFjO01BQVEsZ0JBQWU7S0FBUTs7OztlQUNyTyx3QkFBQyxRQUFEO01BQU0sR0FBRTtNQUFnSyxRQUFPO01BQXdCLGFBQVk7TUFBSSxlQUFjO01BQVEsZ0JBQWU7S0FBUTs7OzthQUNuUTs7Ozs7O0dBRUY7Ozs7O1VBQ0Y7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkVuZXJneU9yYi5qc3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IFJBTktTID0gW1xyXG4gIHsgaWQ6IDEsIG5hbWU6ICdQVUxTTycsIG51bWJlcjogJzAxJywgY29yZTogJyM5M2M1ZmQnLCBtaWQ6ICcjMjU2M2ViJywgb3V0ZXI6ICcjMWUzYThhJywgcmVxOiAwLCBsZXZlbDogMSB9LFxyXG4gIHsgaWQ6IDIsIG5hbWU6ICdBVVJBJywgbnVtYmVyOiAnMDInLCBjb3JlOiAnI2M0YjVmZCcsIG1pZDogJyM3YzNhZWQnLCBvdXRlcjogJyM0YzFkOTUnLCByZXE6IDcsIGxldmVsOiAyIH0sXHJcbiAgeyBpZDogMywgbmFtZTogJ07DmkNMRU8nLCBudW1iZXI6ICcwMycsIGNvcmU6ICcjNmVlN2I3JywgbWlkOiAnIzA1OTY2OScsIG91dGVyOiAnIzA2NWY0NicsIHJlcTogMzAsIGxldmVsOiAzIH0sXHJcbiAgeyBpZDogNCwgbmFtZTogJ8OJVEVSJywgbnVtYmVyOiAnMDQnLCBjb3JlOiAnI2ZkYmE3NCcsIG1pZDogJyNlYTU4MGMnLCBvdXRlcjogJyM5YTM0MTInLCByZXE6IDkwLCBsZXZlbDogNCB9LFxyXG4gIHsgaWQ6IDUsIG5hbWU6ICdBU0NFTlNJw5NOJywgbnVtYmVyOiAnMDUnLCBjb3JlOiAnI2ZkZTY4YScsIG1pZDogJyNkOTc3MDYnLCBvdXRlcjogJyM5MjQwMGUnLCByZXE6IDM2NSwgbGV2ZWw6IDUgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBFbmVyZ3lPcmIoe1xyXG4gIHNpemUgPSAyODAsXHJcbiAgcmFua0luZGV4ID0gMCxcclxuICBhbmltYXRlZCA9IHRydWUsXHJcbiAgY2xhc3NOYW1lID0gXCJcIixcclxuICBsb2NrZWQgPSBmYWxzZVxyXG59KSB7XHJcbiAgY29uc3QgYmFzZVJhbmsgPSBSQU5LU1tyYW5rSW5kZXhdID8/IFJBTktTWzBdO1xyXG4gIGNvbnN0IGMgPSBsb2NrZWQgXHJcbiAgICA/IHsgY29yZTogJyM2YjcyODAnLCBtaWQ6ICcjMzc0MTUxJywgb3V0ZXI6ICcjMTExODI3JywgbGV2ZWw6IGJhc2VSYW5rLmxldmVsIH1cclxuICAgIDogYmFzZVJhbms7XHJcbiAgXHJcbiAgY29uc3QgaWQgPSBgbyR7cmFua0luZGV4fXgke3NpemV9YDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2VsZWN0LW5vbmUgJHtjbGFzc05hbWV9YH1cclxuICAgICAgc3R5bGU9e3sgd2lkdGg6IHNpemUsIGhlaWdodDogc2l6ZSwgcG9zaXRpb246ICdyZWxhdGl2ZScsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fVxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcm91bmRlZC1mdWxsIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogc2l6ZSAqIDEuNyxcclxuICAgICAgICAgIGhlaWdodDogc2l6ZSAqIDEuNyxcclxuICAgICAgICAgIGJhY2tncm91bmQ6IGByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCAke2MubWlkfTIyIDAlLCB0cmFuc3BhcmVudCA2OCUpYCxcclxuICAgICAgICAgIHRvcDogXCI1MCVcIixcclxuICAgICAgICAgIGxlZnQ6IFwiNTAlXCIsXHJcbiAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlKC01MCUsLTUwJSlcIixcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuICAgICAgPHN2Z1xyXG4gICAgICAgIHdpZHRoPXtzaXplfVxyXG4gICAgICAgIGhlaWdodD17c2l6ZX1cclxuICAgICAgICB2aWV3Qm94PVwiMCAwIDI4MCAyODBcIlxyXG4gICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMTAgJHthbmltYXRlZCAmJiAhbG9ja2VkID8gXCJvcmItZmxvYXRcIiA6IFwiXCJ9YH1cclxuICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgekluZGV4OiAxMCwgb3ZlcmZsb3c6ICd2aXNpYmxlJyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICA8cmFkaWFsR3JhZGllbnQgaWQ9e2Ake2lkfWdgfSBjeD1cIjM4JVwiIGN5PVwiMzIlXCIgcj1cIjY1JVwiPlxyXG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwJVwiICAgc3RvcENvbG9yPXtjLmNvcmV9ICBzdG9wT3BhY2l0eT1cIjFcIiAvPlxyXG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI1NSVcIiAgc3RvcENvbG9yPXtjLm1pZH0gICBzdG9wT3BhY2l0eT1cIjAuOTVcIiAvPlxyXG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPXtjLm91dGVyfSAgc3RvcE9wYWNpdHk9XCIwLjc1XCIgLz5cclxuICAgICAgICAgIDwvcmFkaWFsR3JhZGllbnQ+XHJcbiAgICAgICAgICA8ZmlsdGVyIGlkPXtgJHtpZH1mYH0geD1cIi00MCVcIiB5PVwiLTQwJVwiIHdpZHRoPVwiMTgwJVwiIGhlaWdodD1cIjE4MCVcIj5cclxuICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjEwXCIgcmVzdWx0PVwiYlwiIC8+XHJcbiAgICAgICAgICAgIDxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj1cImJcIiAvPjxmZU1lcmdlTm9kZSBpbj1cIlNvdXJjZUdyYXBoaWNcIiAvPjwvZmVNZXJnZT5cclxuICAgICAgICAgIDwvZmlsdGVyPlxyXG4gICAgICAgICAgPGZpbHRlciBpZD17YCR7aWR9aGB9IHg9XCItNjAlXCIgeT1cIi02MCVcIiB3aWR0aD1cIjIyMCVcIiBoZWlnaHQ9XCIyMjAlXCI+XHJcbiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCIxOFwiIC8+XHJcbiAgICAgICAgICA8L2ZpbHRlcj5cclxuICAgICAgICA8L2RlZnM+XHJcblxyXG4gICAgICAgIHshbG9ja2VkICYmIChcclxuICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgIHsvKiBMRVZFTCAyICovfVxyXG4gICAgICAgICAgICB7Yy5sZXZlbCA9PT0gMiAmJiA8ZWxsaXBzZSBjeD1cIjE0MFwiIGN5PVwiMTQwXCIgcng9XCIxMjBcIiByeT1cIjMwXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2MubWlkfSBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VPcGFjaXR5PVwiMC43XCIgdHJhbnNmb3JtPVwicm90YXRlKDIwIDE0MCAxNDApXCIgLz59XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB7LyogTEVWRUwgMyAqL31cclxuICAgICAgICAgICAge2MubGV2ZWwgPT09IDMgJiYgKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjE0MFwiIGN5PVwiMTQwXCIgcng9XCIxMjBcIiByeT1cIjI1XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2MubWlkfSBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VPcGFjaXR5PVwiMC44XCIgdHJhbnNmb3JtPVwicm90YXRlKDM1IDE0MCAxNDApXCIgLz5cclxuICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTQwXCIgY3k9XCIxNDBcIiByeD1cIjEyMFwiIHJ5PVwiMjVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Yy5taWR9IHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZU9wYWNpdHk9XCIwLjhcIiB0cmFuc2Zvcm09XCJyb3RhdGUoLTM1IDE0MCAxNDApXCIgLz5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBMRVZFTCA0ICovfVxyXG4gICAgICAgICAgICB7Yy5sZXZlbCA9PT0gNCAmJiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTQwXCIgY3k9XCIxNDBcIiByeD1cIjExNVwiIHJ5PVwiMjBcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Yy5taWR9IHN0cm9rZVdpZHRoPVwiMi41XCIgc3Ryb2tlT3BhY2l0eT1cIjAuOVwiIHRyYW5zZm9ybT1cInJvdGF0ZSgwIDE0MCAxNDApXCIgLz5cclxuICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTQwXCIgY3k9XCIxNDBcIiByeD1cIjExNVwiIHJ5PVwiMjBcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Yy5taWR9IHN0cm9rZVdpZHRoPVwiMi41XCIgc3Ryb2tlT3BhY2l0eT1cIjAuOVwiIHRyYW5zZm9ybT1cInJvdGF0ZSg2MCAxNDAgMTQwKVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjE0MFwiIGN5PVwiMTQwXCIgcng9XCIxMTVcIiByeT1cIjIwXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2MubWlkfSBzdHJva2VXaWR0aD1cIjIuNVwiIHN0cm9rZU9wYWNpdHk9XCIwLjlcIiB0cmFuc2Zvcm09XCJyb3RhdGUoMTIwIDE0MCAxNDApXCIgLz5cclxuICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNDBcIiBjeT1cIjE0MFwiIHI9XCIxMzBcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Yy5jb3JlfSBzdHJva2VXaWR0aD1cIjFcIiBzdHJva2VPcGFjaXR5PVwiMC41XCIgc3Ryb2tlRGFzaGFycmF5PVwiNSAxNVwiIGNsYXNzTmFtZT17YW5pbWF0ZWQgPyBcIm9yYi1zcGluXCIgOiBcIlwifSBzdHlsZT17eyB0cmFuc2Zvcm1PcmlnaW46ICcxNDBweCAxNDBweCcgfX0gLz5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBMRVZFTCA1ICovfVxyXG4gICAgICAgICAgICB7Yy5sZXZlbCA9PT0gNSAmJiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTQwXCIgY3k9XCIxNDBcIiByeD1cIjEyNVwiIHJ5PVwiMTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Yy5jb3JlfSBzdHJva2VXaWR0aD1cIjNcIiBzdHJva2VPcGFjaXR5PVwiMVwiIHRyYW5zZm9ybT1cInJvdGF0ZSgwIDE0MCAxNDApXCIgLz5cclxuICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTQwXCIgY3k9XCIxNDBcIiByeD1cIjEyNVwiIHJ5PVwiMTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT17Yy5jb3JlfSBzdHJva2VXaWR0aD1cIjNcIiBzdHJva2VPcGFjaXR5PVwiMVwiIHRyYW5zZm9ybT1cInJvdGF0ZSg0NSAxNDAgMTQwKVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjE0MFwiIGN5PVwiMTQwXCIgcng9XCIxMjVcIiByeT1cIjE1XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2MuY29yZX0gc3Ryb2tlV2lkdGg9XCIzXCIgc3Ryb2tlT3BhY2l0eT1cIjFcIiB0cmFuc2Zvcm09XCJyb3RhdGUoOTAgMTQwIDE0MClcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxNDBcIiBjeT1cIjE0MFwiIHJ4PVwiMTI1XCIgcnk9XCIxNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPXtjLmNvcmV9IHN0cm9rZVdpZHRoPVwiM1wiIHN0cm9rZU9wYWNpdHk9XCIxXCIgdHJhbnNmb3JtPVwicm90YXRlKDEzNSAxNDAgMTQwKVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTQwXCIgY3k9XCIxNDBcIiByPVwiMTM1XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2MubWlkfSBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VPcGFjaXR5PVwiMC42XCIgc3Ryb2tlRGFzaGFycmF5PVwiMTAgMjBcIiBjbGFzc05hbWU9e2FuaW1hdGVkID8gXCJvcmItc3Bpbi1yZXZlcnNlXCIgOiBcIlwifSBzdHlsZT17eyB0cmFuc2Zvcm1PcmlnaW46ICcxNDBweCAxNDBweCcgfX0gLz5cclxuICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNDBcIiBjeT1cIjE0MFwiIHI9XCIxMDVcIiBmaWxsPXtjLmNvcmV9IGZpbGxPcGFjaXR5PVwiMC40XCIgZmlsdGVyPXtgdXJsKCMke2lkfWgpYH0gLz5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIDxjaXJjbGUgY3g9XCIxNDBcIiBjeT1cIjE0MFwiIHI9XCI4MFwiIGZpbGw9e2MubWlkfSBmaWxsT3BhY2l0eT17Yy5sZXZlbCA+PSA0ICYmICFsb2NrZWQgPyAwLjM1IDogMC4xNX0gZmlsdGVyPXtgdXJsKCMke2lkfWgpYH0gLz5cclxuXHJcbiAgICAgICAgPGNpcmNsZSBjeD1cIjE0MFwiIGN5PVwiMTQwXCIgcj1cIjc1XCJcclxuICAgICAgICAgIGZpbGw9e2B1cmwoIyR7aWR9ZylgfVxyXG4gICAgICAgICAgZmlsdGVyPXtgdXJsKCMke2lkfWYpYH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17YW5pbWF0ZWQgJiYgIWxvY2tlZCA/IFwib3JiLXB1bHNlXCIgOiBcIlwifVxyXG4gICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtT3JpZ2luOiBcIjE0MHB4IDE0MHB4XCIgfX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8ZWxsaXBzZSBjeD1cIjExM1wiIGN5PVwiMTExXCIgcng9XCIyMlwiIHJ5PVwiMTRcIiBmaWxsPVwid2hpdGVcIiBmaWxsT3BhY2l0eT1cIjAuMThcIiAvPlxyXG4gICAgICAgIDxlbGxpcHNlIGN4PVwiMTA0XCIgY3k9XCIxMDRcIiByeD1cIjhcIiAgcnk9XCI1XCIgIGZpbGw9XCJ3aGl0ZVwiIGZpbGxPcGFjaXR5PVwiMC4yOFwiIC8+XHJcbiAgICAgICAgXHJcbiAgICAgICAge2xvY2tlZCAmJiAoXHJcbiAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMTI4LCAxMjgpIHNjYWxlKDEpXCI+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTkgMTFINUMzLjg5NTQzIDExIDMgMTEuODk1NCAzIDEzVjIwQzMgMjEuMTA0NiAzLjg5NTQzIDIyIDUgMjJIMTlDMjAuMTA0NiAyMiAyMSAyMS4xMDQ2IDIxIDIwVjEzQzIxIDExLjg5NTQgMjAuMTA0NiAxMSAxOSAxMVpcIiBzdHJva2U9XCJyZ2JhKDI1NSwyNTUsMjU1LDAuOClcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTcgMTFWN0M3IDUuNjczOTIgNy41MjY3OCA0LjQwMjE1IDguNDY0NDcgMy40NjQ0N0M5LjQwMjE1IDIuNTI2NzggMTAuNjczOSAyIDEyIDJDMTMuMzI2MSAyIDE0LjU5NzkgMi41MjY3OCAxNS41MzU1IDMuNDY0NDdDMTYuNDczMiA0LjQwMjE1IDE3IDUuNjczOTIgMTcgN1YxMVwiIHN0cm9rZT1cInJnYmEoMjU1LDI1NSwyNTUsMC44KVwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIi8+XHJcbiAgICAgICAgICA8L2c+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdfQ==
