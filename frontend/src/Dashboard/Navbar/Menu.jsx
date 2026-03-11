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

  return (
    <nav className="sticky top-0 z-50 w-full border-b  backdrop-blur ">
      <div className="flex h-14 items-center gap-4 px-4">
        {/* Left: Sidebar trigger + Logo */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-black hover:text-white hover:bg-emerald-300 rounded-md transition-colors" />
          <div className="flex items-center gap-2">
            <img
              src="/images/trade_sim_logo.png"
              className="h-7 w-auto"
              alt="TradeSim"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-zinc-800 mx-1" />

        {/* Center: Nav links */}
        <ul className="flex items-center gap-1 flex-1">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive =
              path === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(path);

            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`
                    group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                    transition-all duration-150 no-underline
                    ${
                      isActive
                        ? "bg-emerald-500/10 text-sky-400 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.2)]"
                        : "text-zinc-800 hover:text-zinc-800 hover:bg-emerald-300/70"
                    }
                  `}
                >
                  <Icon
                    size={14}
                    className={`transition-colors ${
                      isActive
                        ? "text-sky-400"
                        : "text-zinc-800 group-hover:text-black"
                    }`}
                  />
                  {label}
                  {label === "Orders" && (
                    <Badge className="ml-0.5 h-4 min-w-4 px-1 text-[10px] bg-sky-500 text-white border-0 rounded-full leading-none">
                      3
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Market pulse + User panel */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Market Open
          </div>
          <div className="h-6 w-px bg-zinc-800" />
          {/* <ThemeToggle /> */}
          <LogoutPanel />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
