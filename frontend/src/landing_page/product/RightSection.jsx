import { ArrowRight } from "lucide-react";
import React from "react";

function RightSection({
  imageUrl,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/*className="col-6 p-5 mt-5"*/}

        <div>
          <h1 className="text-3xl font-bold mb-6">{productName} </h1>

          <p className="text-gray-600 text-lg mb-4">{productDescription}</p>

          <a
            href={learnMore}
            className="inline-flex items-center gap-2 text-blue-600 no-underline font-medium hover:gap-3 transition-all"
          >
            Learn More <ArrowRight size={18} />
          </a>
        </div>

        <div className="flex justify-center">
          <img src={imageUrl} className="w-full" alt={productName} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
