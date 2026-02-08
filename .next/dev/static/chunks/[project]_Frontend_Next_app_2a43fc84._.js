(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Frontend_Next/app/CardPlantas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
const PlantCard = ({ nombre, precio, imagen, categoria, onAddToCart, showButton = true })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-64 w-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: imagen,
                    alt: nombre,
                    width: 400,
                    height: 500,
                    className: "w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                }, void 0, false, {
                    fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 flex flex-col flex-grow text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg text-gray-800 mb-1 line-clamp-2 min-h-[3.5rem] flex items-center justify-center",
                        children: nombre
                    }, void 0, false, {
                        fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    categoria && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2",
                        children: categoria
                    }, void 0, false, {
                        fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                        lineNumber: 41,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-black text-[#D4145A] mb-4",
                                children: [
                                    "S/ ",
                                    precio.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            showButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onAddToCart,
                                className: "w-full bg-[#FF6F91] hover:bg-[#D4145A] text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95",
                                children: "Añadir al carrito"
                            }, void 0, false, {
                                fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                                lineNumber: 52,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Frontend_Next/app/CardPlantas.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PlantCard;
const __TURBOPACK__default__export__ = PlantCard;
var _c;
__turbopack_context__.k.register(_c, "PlantCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_Next/app/ProductosPrincipales.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductosPrincipales
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$app$2f$CardPlantas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_Next/app/CardPlantas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$app$2f$API_Plantas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_Next/app/API_Plantas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_Next/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_Next/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-icons/fi'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ProductosPrincipales() {
    _s();
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductosPrincipales.useEffect": ()=>{
            const fetchPopular = {
                "ProductosPrincipales.useEffect.fetchPopular": async ()=>{
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("products").select("*").eq("popular", true).limit(4);
                    if (!error && data && data.length > 0) {
                        setProducts(data);
                    } else {
                        // Fallback a datos estáticos si la DB está vacía o hay error
                        setProducts(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$app$2f$API_Plantas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["plants"].filter({
                            "ProductosPrincipales.useEffect.fetchPopular": (p)=>p.popular
                        }["ProductosPrincipales.useEffect.fetchPopular"]).slice(0, 4));
                    }
                }
            }["ProductosPrincipales.useEffect.fetchPopular"];
            fetchPopular();
        }
    }["ProductosPrincipales.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[#D4145A] font-bold tracking-wider uppercase text-sm",
                        children: "Favoritos del mes"
                    }, void 0, false, {
                        fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl md:text-5xl font-black text-gray-900 mt-2 mb-4 tracking-tight",
                        children: "Productos Populares"
                    }, void 0, false, {
                        fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 w-24 bg-[#D4145A] mx-auto rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "max-w-2xl mx-auto mt-4 text-gray-500 text-lg",
                        children: "Descubre los arreglos que están enamorando a nuestros clientes."
                    }, void 0, false, {
                        fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
                children: products.map((plant)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$app$2f$CardPlantas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        ...plant,
                        onAddToCart: ()=>addToCart(plant)
                    }, plant.id, false, {
                        fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/catalogo",
                    className: "inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#D4145A] text-[#D4145A] font-bold rounded-full hover:bg-[#D4145A] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg uppercase tracking-wider text-sm",
                    children: [
                        "Ver Catálogo Completo ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiArrowRight, {}, void 0, false, {
                            fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                            lineNumber: 58,
                            columnNumber: 43
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Frontend_Next/app/ProductosPrincipales.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
_s(ProductosPrincipales, "m9QKNT2FOb+H9tKUHHkP40BvevQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_Next$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = ProductosPrincipales;
var _c;
__turbopack_context__.k.register(_c, "ProductosPrincipales");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_Next/app/Carrusel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Carousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const slides = [
    {
        img: '/img/img-carrusel/foto1.jpg',
        title: 'Armonía floral en tonos suaves y vibrantes',
        text: 'Un delicado arreglo de rosas, hortensias y claveles en colores pastel y amarillos intensos, que transmiten frescura, alegría y elegancia natural.'
    },
    {
        img: '/img/img-carrusel/foto2.jpg',
        title: 'Lirio Blanco',
        text: 'Flores blancas de lirio, elegantes y puras, ideales para eventos formales.'
    },
    {
        img: '/img/img-carrusel/foto3.jpg',
        title: 'Retama',
        text: 'Flores amarillas de retama, vivaces y alegres, perfectas para transmitir energía.'
    }
];
function Carousel() {
    _s();
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const prev = ()=>setCurrent((current - 1 + slides.length) % slides.length);
    const next = ()=>setCurrent((current + 1) % slides.length);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Carousel.useEffect": ()=>{
            const timer = setInterval({
                "Carousel.useEffect.timer": ()=>{
                    next();
                }
            }["Carousel.useEffect.timer"], 5000); // Cambia cada 5 segundos
            return ({
                "Carousel.useEffect": ()=>clearInterval(timer)
            })["Carousel.useEffect"];
        }
    }["Carousel.useEffect"], [
        current
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-[500px] overflow-hidden bg-gray-100",
        children: [
            slides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: slide.img,
                            alt: slide.title,
                            fill: true,
                            priority: index === 0,
                            className: "object-cover",
                            sizes: "100vw"
                        }, void 0, false, {
                            fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                            lineNumber: 49,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/30 z-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                    className: "text-xl md:text-4xl font-bold text-white drop-shadow-lg transform transition-all duration-700 delay-300 translate-y-0 opacity-100",
                                    children: slide.title
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                                    lineNumber: 59,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-3xl font-semibold text-white text-sm md:text-lg drop-shadow-lg transform transition-all duration-700 delay-500 translate-y-0 opacity-100 px-4",
                                    children: slide.text
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                            lineNumber: 58,
                            columnNumber: 21
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                    lineNumber: 44,
                    columnNumber: 17
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3",
                children: slides.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrent(index),
                        className: `
                            h-3 w-3 rounded-full transition-all duration-300
                            ${index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}
                        `,
                        "aria-label": `Ir a slide ${index + 1}`
                    }, index, false, {
                        fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: prev,
                className: "absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/20 p-4 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 active:scale-95",
                "aria-label": "Anterior",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-2xl",
                    children: "‹"
                }, void 0, false, {
                    fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: next,
                className: "absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/20 p-4 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110 active:scale-95",
                "aria-label": "Siguiente",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-2xl",
                    children: "›"
                }, void 0, false, {
                    fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                    lineNumber: 98,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Frontend_Next/app/Carrusel.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
_s(Carousel, "Ce5S7Zpl2S4YgGoPn+G4m52qKq8=");
_c = Carousel;
var _c;
__turbopack_context__.k.register(_c, "Carousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_Next/app/Beneficios.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Beneficios
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-icons/fi'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
const beneficios = [
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiTruck, {
            className: "text-3xl text-[#D4145A]"
        }, void 0, false, {
            fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
            lineNumber: 7,
            columnNumber: 15
        }, ("TURBOPACK compile-time value", void 0)),
        title: "Envío Gratis",
        description: "En pedidos mayores a S/ 150"
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiShield, {
            className: "text-3xl text-[#D4145A]"
        }, void 0, false, {
            fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
            lineNumber: 12,
            columnNumber: 15
        }, ("TURBOPACK compile-time value", void 0)),
        title: "Pago Seguro",
        description: "100% protegido con cifrado SSL"
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiSmile, {
            className: "text-3xl text-[#D4145A]"
        }, void 0, false, {
            fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
            lineNumber: 17,
            columnNumber: 15
        }, ("TURBOPACK compile-time value", void 0)),
        title: "Flores Frescas",
        description: "Directo del campo a tu hogar"
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiClock, {
            className: "text-3xl text-[#D4145A]"
        }, void 0, false, {
            fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
            lineNumber: 22,
            columnNumber: 15
        }, ("TURBOPACK compile-time value", void 0)),
        title: "Entrega Hoy",
        description: "Pide antes de las 2:00 PM"
    }
];
function Beneficios() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                children: beneficios.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-5 p-6 rounded-2xl border border-gray-50 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-pink-50 rounded-2xl group-hover:scale-110 transition-transform duration-300",
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
                                lineNumber: 38,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-gray-800 text-lg uppercase tracking-tight",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
                                        lineNumber: 42,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 font-medium",
                                        children: item.description
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
                                        lineNumber: 45,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
                                lineNumber: 41,
                                columnNumber: 29
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
                        lineNumber: 34,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
                lineNumber: 32,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
            lineNumber: 31,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Frontend_Next/app/Beneficios.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, this);
}
_c = Beneficios;
var _c;
__turbopack_context__.k.register(_c, "Beneficios");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_Next/app/CategoriasOcasiones.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoriasOcasiones
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
const ocasiones = [
    {
        id: 1,
        titulo: "Amor y Romance",
        slug: "amor",
        imagen: "/img/img-catalogo/C-Rosas.jpg",
        color: "bg-pink-100"
    },
    {
        id: 2,
        titulo: "Cumpleaños",
        slug: "cumpleanos",
        imagen: "/img/img-catalogo/C-Cumpleaños.jpg",
        color: "bg-yellow-100"
    },
    {
        id: 3,
        titulo: "Aniversario",
        slug: "aniversario",
        imagen: "/img/img-catalogo/C-Aniversario.jpg",
        color: "bg-red-100"
    },
    {
        id: 4,
        titulo: "Condolencias",
        slug: "condolencias",
        imagen: "/img/img-catalogo/C-Condolencias.jpg",
        color: "bg-blue-100"
    }
];
function CategoriasOcasiones() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 bg-gray-50/50 rounded-3xl mt-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl md:text-4xl font-black text-gray-800 mb-2 uppercase tracking-tight",
                    children: "Comprar por Ocasión"
                }, void 0, false, {
                    fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 mb-10 font-medium",
                    children: "Encuentra el detalle perfecto para cada momento"
                }, void 0, false, {
                    fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                    lineNumber: 44,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 lg:grid-cols-4 gap-6",
                    children: ocasiones.map((ocasion)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/catalogo?ocasion=${ocasion.slug}`,
                            className: "group relative flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-pink-200 group-hover:border-[#FF6F91] relative`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: ocasion.imagen,
                                            alt: ocasion.titulo,
                                            fill: true,
                                            className: "object-cover transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                                            lineNumber: 56,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity"
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                                            lineNumber: 62,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                                    lineNumber: 53,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-4 font-bold text-gray-800 text-lg md:text-xl transition-colors group-hover:text-[#D4145A]",
                                    children: ocasion.titulo
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                                    lineNumber: 64,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, ocasion.id, true, {
                            fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                            lineNumber: 48,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
                    lineNumber: 46,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
            lineNumber: 40,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Frontend_Next/app/CategoriasOcasiones.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, this);
}
_c = CategoriasOcasiones;
var _c;
__turbopack_context__.k.register(_c, "CategoriasOcasiones");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=%5Bproject%5D_Frontend_Next_app_2a43fc84._.js.map