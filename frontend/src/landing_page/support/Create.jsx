import React from "react";
import { PlusCircle } from "lucide-react";

function TopicBlock({ title, links }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <PlusCircle size={18} />
        {title}
      </h4>

      <ul className="space-y-3 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-blue-600 hover:underline">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Create() {
  const links = [
    "Online Account Opening",
    "Offline Account Opening",
    "KYC process",
    "Account status",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-12 text-center">
        To create a ticket, select a relevant topic
      </h1>

      <div className="grid md:grid-cols-3 gap-12">
        <TopicBlock title="Account Opening" links={links} />
        <TopicBlock title="Your Account" links={links} />
        <TopicBlock title="Trading & Markets" links={links} />
        <TopicBlock title="Funds & Transfers" links={links} />
        <TopicBlock title="Charges & Billing" links={links} />
        <TopicBlock title="Security & Privacy" links={links} />
      </div>
    </div>
  );
}

export default Create;
