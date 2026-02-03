import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authReducer";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../redux/slices/authReducer";
import { useSelector } from "react-redux";
// import axios from "axios";
import axios_api from "../network/axios_api";

export default function LogoutPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate;

  const user = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    // Add your logout logic here
    await axios_api.get("/logout");
    dispatch(logout());
    navigate("/", { replace: true });

    // Example: clear tokens, redirect, etc.
  };

  return (
    <div className="relative">
      <div
        className="profile cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className=" w-[30px] h-[30px] text-center relative text-[0.7rem] font-normal text-[rgb(221,139,221)] justify-center items-center rounded-full flex bg-[rgb(252,229,252)] mr-2">
          {user?.[0]}
        </div>
        <p className="username">USERID</p>
      </div>

      {/* Logout Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          {/* <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          /> */}

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Preferences
              </button>
            </div>

            <div className="p-2 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
