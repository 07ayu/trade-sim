// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/slices/authReducer";
// import { useNavigate } from "react-router-dom";
// import { selectCurrentUser } from "../redux/slices/authReducer";
// import { useSelector } from "react-redux";
// // import axios from "axios";
// import { axios_api } from "../network/axios_api";

// export default function LogoutPanel() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const user = useSelector(selectCurrentUser);

//   const handleLogout = async () => {
//     // Add your logout logic here
//     await axios_api.post("/auth/logout");
//     dispatch(logout());
//     navigate("/", { replace: true });

//     // Example: clear tokens, redirect, etc.
//   };

//   return (
//     <div className="relative">
//       <div
//         className="profile cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className=" w-[30px] h-[30px] text-center relative text-[0.7rem] font-normal text-[rgb(221,139,221)] justify-center items-center rounded-full flex bg-[rgb(252,229,252)] mr-2">
//           {user?.[0]}
//         </div>
//         <p className="username">USERID</p>
//       </div>

//       {/* Logout Panel */}
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           {/* <div
//             className="fixed inset-0 z-10"
//             onClick={() => setIsOpen(false)}
//           /> */}

//           {/* Panel */}
//           <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
//             <div className="p-4 border-b border-gray-200">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
//                   JD
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900">
//                     John Doe
//                   </p>
//                   <p className="text-xs text-gray-500">john@example.com</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-2">
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
//                 Profile Settings
//               </button>
//               <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
//                 Preferences
//               </button>
//             </div>

//             <div className="p-2 border-t border-gray-200">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium flex items-center gap-2"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                   />
//                 </svg>
//                 Log Out
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../redux/slices/authReducer";
import { axios_api } from "../network/axios_api";
import {
  LogOut,
  Settings,
  SlidersHorizontal,
  Shield,
  ChevronDown,
  TrendingUp,
  Wallet,
  Bell,
} from "lucide-react";

export default function LogoutPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const initials = user ? user.slice(0, 2).toUpperCase() : "U";

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleLogout = async () => {
    await axios_api.post("/auth/logout");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const menuItems = [
    { icon: Settings, label: "Profile Settings", sub: "Edit your account" },
    {
      icon: SlidersHorizontal,
      label: "Preferences",
      sub: "Theme & notifications",
    },
    { icon: Shield, label: "Security", sub: "2FA, sessions" },
  ];

  const stats = [
    { icon: TrendingUp, label: "P&L", value: "+₹1.55k" },
    { icon: Wallet, label: "Margin", value: "₹3.74k" },
    { icon: Bell, label: "Alerts", value: "3 active" },
  ];

  return (
    <div
      className="relative"
      ref={panelRef}
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        @keyframes popIn {
          from { opacity:0; transform:translateY(6px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)   scale(1);    }
        }
        .panel-pop { animation: popIn 0.18s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      {/* ── Trigger button ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-150 ${
          isOpen
            ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
      >
        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-[11px] font-700 flex-shrink-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {initials}
        </div>
        <span className="text-xs font-500 text-slate-700 dark:text-slate-300 hidden sm:block max-w-20 truncate">
          {user ?? "User"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Dropdown panel ── */}
      {isOpen && (
        <div className="panel-pop absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/60 dark:shadow-black/50 z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            {/* decorative */}
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full border border-slate-700/40" />
            <div className="absolute -right-2 -top-2 w-14 h-14 rounded-full border border-slate-600/30" />

            <div className="relative flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-base font-700 shadow-lg flex-shrink-0"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <p
                  className="text-sm font-700 text-white leading-none truncate"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {user ?? "John Doe"}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {user?.toLowerCase() ?? "user"}@tradesim.io
                </p>
              </div>
              <div className="ml-auto flex-shrink-0">
                <span
                  className="text-[9px] font-600 bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  PRO
                </span>
              </div>
            </div>

            {/* Mini stats */}
            <div className="relative grid grid-cols-3 gap-2 mt-4">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-slate-800/60 rounded-xl px-2.5 py-2 border border-slate-700/50"
                >
                  <Icon className="w-3 h-3 text-slate-500 mb-1" />
                  <p className="text-[10px] text-slate-500 leading-none">
                    {label}
                  </p>
                  <p
                    className="text-[11px] font-600 text-slate-200 mt-0.5 leading-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Menu items */}
          <div className="p-2">
            {menuItems.map(({ icon: Icon, label, sub }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 border border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-600 flex items-center justify-center transition-all flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-500 text-slate-700 dark:text-slate-200 leading-none">
                    {label}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-rose-50 group-hover:bg-rose-100 border border-rose-100 flex items-center justify-center transition-all flex-shrink-0">
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div>
                <p
                  className="text-xs font-600 text-rose-600 leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Log Out
                </p>
                <p className="text-[10px] text-rose-400 mt-0.5">
                  End your session
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
