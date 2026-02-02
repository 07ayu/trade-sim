import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import "./index.css";
import HomePage from "./home/HomePage";
// import Home from "../Dashboard/Home";
// import Signup from "./signup/Signup";
import About from "./about/AboutPage";
import ProductPage from "./product/ProductPage";
import Pricing from "./pricing/PricingPage";
import Support from "./support/Support";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotFound from "./Notfound";
import Aigen from "./signup/Aigen";

import Dashboard from "../Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

// function App() {
//   return (
//     <BrowserRouter>
//       <div
//         style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//       >
//         {/* <Navbar /> */}

//         <main style={{ flex: "1 0 auto" }}>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/signup" element={<Aigen />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/product" element={<ProductPage />} />
//             <Route path="/pricing" element={<Pricing />} />
//             <Route path="/support" element={<Support />} />
//             <Route path="/dashboard/*" element={<Home/> } />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </main>

//         {/* <Footer /> */}
//       </div>
//     </BrowserRouter>
//   );
// }

function Landing_page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Navbar />

      <main
        style={{
          flex: "1 0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
        <ToastContainer />
      </main>

      <Footer />
    </div>
  );
}
export default Landing_page;

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
