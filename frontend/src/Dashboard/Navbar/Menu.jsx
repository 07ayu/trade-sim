import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutPanel from "../../signup/userPanel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  TrendingUp,
  Wallet,
  Grid3X3,
} from "lucide-react";
import { ThemeToggle } from "../darkMode/darkmode";
import { useSelector } from "react-redux";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", path: "/dashboard/orders", icon: ClipboardList },
  { label: "Holdings", path: "/dashboard/holdings", icon: Briefcase },
  { label: "Positions", path: "/dashboard/positions", icon: TrendingUp },
  { label: "Funds", path: "/dashboard/funds", icon: Wallet },
  // { label: "Apps", path: "/dashboard/apps", icon: Grid3X3 },
];

const Menu = () => {
  const location = useLocation();
  const orders = useSelector((state) => state.orders.orders) || [];
  const orderCount = orders.filter((order) => order.status !== "FILLED").length;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4">
        {/* Left: Sidebar trigger + Logo */}
        {/* <div className="flex items-center gap-3">
          <SidebarTrigger className="text-slate-600 dark:text-slate-400 hover:text-white dark:hover:text-white hover:bg-emerald-500 rounded-md transition-colors" />
          <div className="flex items-center gap-2">
            <img
              src="/images/trade_sim_logo.png"
              className="h-7 w-auto dark:invert"
              alt="TradeSim"
            />
          </div>
        </div> */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-slate-600 dark:text-slate-400 hover:text-white dark:hover:text-white hover:bg-emerald-500 rounded-md transition-colors" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* Center: Nav links */}
        <ul className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive =
              path === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(path);

            return (
              <li key={path} className="shrink-0">
                <Link
                  to={path}
                  className={`
                    group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                    transition-all duration-150 no-underline whitespace-nowrap
                    ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <Icon
                    size={14}
                    className={`transition-colors ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                    }`}
                  />
                  <span className="hidden sm:inline">{label}</span>
                  {label === "Orders" && (
                    <Badge className="ml-0.5 h-4 min-w-4 px-1 text-[10px] bg-emerald-500 text-white border-0 rounded-full leading-none">
                      {orderCount}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Market pulse + User panel */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Market Open
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          <ThemeToggle />
          <LogoutPanel />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
