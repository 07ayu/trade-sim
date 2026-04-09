import { ThemeToggle } from "./darkMode/darkmode";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container flex items-center justify-between px-6 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="indices-container flex gap-6">
        <div className="nifty flex flex-col">
          <p className="index text-[10px] text-slate-400 font-medium">NIFTY 50</p>
          <p className="index-points text-sm font-semibold text-slate-700 dark:text-slate-200">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex flex flex-col">
          <p className="index text-[10px] text-slate-400 font-medium">SENSEX</p>
          <p className="index-points text-sm font-semibold text-slate-700 dark:text-slate-200">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
