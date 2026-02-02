import React from "react";

function Brokage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 border-t">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="md:col-span-2">
          <a href="#" className="no-underline">
            <h3 className="text-2xl font-semibold">Brokerage calculator</h3>
          </a>

          <ul className="mt-6 space-y-4 text-gray-600 text-sm leading-relaxed list-disc list-inside">
            <li>
              Call & Trade and RMS auto-squareoff: Additional charges of ₹50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20.
            </li>
          </ul>
        </div>

        {/* Right Content */}
        <div className="flex items-start justify-center md:justify-end">
          <a href="#" className="no-underline">
            <h3 className="text-2xl font-semibold">Lists of charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokage;
