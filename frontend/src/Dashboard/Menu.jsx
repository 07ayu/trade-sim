import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutPanel from "../signup/userPanel";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  // // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // useEffect(() => {});

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };
  // const handleProfileClick = () => {
  //   setIsProfileDropdownOpen(!setIsProfileDropdownOpen);
  // };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img
        src="/images/trade_sim_logo.png"
        style={{ width: "100px" }}
        alt="logo"
      />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/dashboard"}
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/dashboard/orders"}
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/dashboard/holdings"}
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/dashboard/positions"}
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Position
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/dashboard/funds"}
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to={"/dashboard/apps"}
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />

        <LogoutPanel />
      </div>
    </div>
  );
};

export default Menu;
