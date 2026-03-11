// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import GeneralContext from "../GeneralContext";
// // import { uid } from "chart.js/dist/helpers/helpers.core";

// const WatchlistActions = ({ stock }) => {
//   const HandleBuyClick = () => {
//     GeneralContext.openBuyWindow(stock.symbol);
//   };
//   return (
//     <div className="flex gap-1">
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button size="sm" onclick={HandleBuyClick}>
//               Buy
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>Buy</TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button size="sm" variant="destructive">
//               Sell
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>Sell</TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </div>
//   );
// };

// export default WatchlistActions;
