import React from "react";

function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo + Copyright */}
          <div>
            <img
              src="images/trade_sim_logo.png"
              alt="TradeSim Logo"
              className="w-1/2 -rotate-6 mb-4"
            />
            <p className="text-gray-600 text-sm">
              © 2010 - 2024, Not TradeSim Broking Ltd. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold mb-4">Company</p>
            <div className="space-y-2 text-gray-600 text-sm">
              <a href="#">About</a>
              <a href="#">Products</a>
              <a href="#">Pricing</a>
              <a href="#">Referral programme</a>
              <a href="#">Careers</a>
              <a href="#">TradeSim.tech</a>
              <a href="#">Press & media</a>
              <a href="#">TradeSim cares (CSR)</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="font-semibold mb-4">Support</p>
            <div className="space-y-2 text-gray-600 text-sm">
              <a href="#">Contact</a>
              <a href="#">Support portal</a>
              <a href="#">Z-Connect blog</a>
              <a href="#">List of charges</a>
              <a href="#">Downloads & resources</a>
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="font-semibold mb-4">Account</p>
            <div className="space-y-2 text-gray-600 text-sm">
              <a href="#">Open an account</a>
              <a href="#">Fund transfer</a>
              <a href="#">60 day challenge</a>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="mt-12 text-gray-500 text-xs space-y-6 leading-relaxed">
          <p>
            TradeSim Broking Ltd.: Member of NSE & BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through TradeSim Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through TradeSim Commodities Pvt. Ltd. MCX: 46025 – SEBI
            Registration no.: INZ000038238 Registered Address: TradeSim Broking
            Ltd., Bengaluru - 560078, Karnataka, India.
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details: Name, PAN, Address, Mobile Number, E-mail
            ID.
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all related documents carefully before investing.
          </p>

          <p>
            Prevent unauthorised transactions. Update your mobile/email with
            brokers. KYC is a one-time exercise. We do not give stock tips or
            authorize anyone to trade on behalf of others.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
