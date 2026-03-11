// import { useState } from "react";
// import {
//   ArrowUp,
//   ArrowDown,
//   TrendingUp,
//   TrendingDown,
//   Plus,
//   BarChart2,
//   Bell,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import GeneralContext from "../GeneralContext";

// const WatchlistItem = ({ stock }) => {
//   const [showActions, setShowActions] = useState(false);
//   const isUp = !stock.isDown;

//   const HandleBuyClick = () => {
//     GeneralContext.openBuyWindow(stock);
//   };

//   return (
//     <TooltipProvider delayDuration={300}>
//       <li
//         className={`
//           group relative flex items-center justify-between
//           px-3 py-2.5 rounded-xl cursor-pointer
//           transition-all duration-150 border border-transparent
//           ${
//             isUp
//               ? "hover:bg-emerald-50/60 hover:border-emerald-100"
//               : "hover:bg-rose-50/60 hover:border-rose-100"
//           }
//         `}
//         onMouseEnter={() => setShowActions(true)}
//         onMouseLeave={() => setShowActions(false)}
//       >
//         {/* Left: symbol + name */}
//         <div className="flex items-center gap-3 min-w-0">
//           {/* Color dot indicator */}
//           <div
//             className={`w-1.5 h-8 rounded-full flex-shrink-0 ${isUp ? "bg-emerald-400" : "bg-rose-400"}`}
//           />

//           <div className="flex flex-col min-w-0">
//             <span
//               className={`text-sm font-600 tracking-wide leading-none mb-1 ${isUp ? "text-emerald-600" : "text-rose-500"}`}
//             >
//               {stock.symbol}
//             </span>
//             <span className="text-[11px] text-slate-400 leading-none truncate">
//               {stock.name || "NSE · Equity"}
//             </span>
//           </div>
//         </div>

//         {/* Right: price + percent */}
//         <div
//           className={`flex flex-col items-end transition-opacity duration-150 ${showActions ? "opacity-0" : "opacity-100"}`}
//         >
//           <span className="text-sm font-500 text-slate-800 leading-none mb-1">
//             {stock.price}
//           </span>
//           <div
//             className={`flex items-center gap-0.5 ${isUp ? "text-emerald-500" : "text-rose-500"}`}
//           >
//             {isUp ? (
//               <ArrowUp className="w-3 h-3" />
//             ) : (
//               <ArrowDown className="w-3 h-3" />
//             )}
//             <span className="text-[11px] font-500">{stock.percent}</span>
//           </div>
//         </div>

//         {/* Hover Actions */}
//         <div
//           className={`
//             absolute right-3 flex items-center gap-1
//             transition-all duration-150
//             ${showActions ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}
//           `}
//         >
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-7 w-7 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm"
//                 onClick={
//                   HandleBuyClick(stock.uid)
//                   // (e) => {
//                   // e.stopPropagation();
//                   // }
//                 }
//               >
//                 <Plus className="w-3.5 h-3.5 text-slate-500 hover:text-blue-500" />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent side="top" className="text-xs">
//               Add order
//             </TooltipContent>
//           </Tooltip>

//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-7 w-7 rounded-lg bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 shadow-sm"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                 }}
//               >
//                 <BarChart2 className="w-3.5 h-3.5 text-slate-500 hover:text-violet-500" />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent side="top" className="text-xs">
//               View chart
//             </TooltipContent>
//           </Tooltip>

//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-7 w-7 rounded-lg bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 shadow-sm"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                 }}
//               >
//                 <Bell className="w-3.5 h-3.5 text-slate-500 hover:text-amber-500" />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent side="top" className="text-xs">
//               Set alert
//             </TooltipContent>
//           </Tooltip>
//         </div>
//       </li>
//     </TooltipProvider>
//   );
// };

// export default WatchlistItem;
