import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container p-3">
        <Link className="navbar-brand" to={"/"}>
          <img
            src="images/trade_sim_logo.png"
            alt=""
            style={{ width: "25%", rotate: "-8deg" }}
          />
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <form className="d-flex my-2 my-lg-0">
            <ul className="navbar-nav mt-lg-0">
              <li className="nav-item hover-underline">
                <Link
                  className="nav-link active w-100"
                  to={"/signup"}
                  aria-current="page"
                >
                  Sign up
                </Link>
              </li>

              <li className="nav-item hover-underline">
                <Link className="nav-link active" to={"/about"}>
                  About
                </Link>
              </li>

              <li className="nav-item hover-underline">
                <Link className="nav-link active" to={"/product"}>
                  Product
                </Link>
              </li>
              <li className="nav-item hover-underline">
                <Link className="nav-link active" to={"/pricing"}>
                  Pricing
                </Link>
              </li>
              <li className="nav-item hover-underline">
                <Link className="nav-link active" to={"/support"}>
                  Support
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

// export default Navbar;

function NavbarTWO() {
  // function SendtoSignUp()=> {

  // }

  // const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={"/"}>
            {" "}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">trade sim</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link
              to={"/pricing"}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              to={"about"}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to={"product"}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Product
            </Link>
            <Link
              to={"/support"}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Support
            </Link>
            {/* <button 
              onClick={() => setIsLogin(!isLogin)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button> */}

            <Link
              to={"/signup"}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Sign UP
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarTWO;
// export default Navbar;
