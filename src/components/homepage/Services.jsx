import React from "react";

export default function Hygienic() {
  return (
    <>
    <h1 className="text-3xl text-center">Why Choose FastBuka?</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div>
          <h1>Blockchain-Powered Payments</h1>
          <p>
            ur platform uses Stellar blockchain to provide fast, transparent,
            and secure payments for both vendors and customers.
          </p>
        </div>
        <div>
          <h1>Supporting Local Vendors</h1>
          <p>
            ka empowers small and local food vendors by giving them an easy
            platform to reach more customers.
          </p>
        </div>
        <div>
          <h1>Efficient Delivery</h1>
          <p>
            We partner with skilled delivery agents to ensure fast and reliable
            deliveries, keeping your food fresh and hot.
          </p>
        </div>
        <div>
          <h1>Low Fees</h1>
          <p>
            By using Stellar technology, we reduce payment processing fees for
            vendors, meaning lower prices for customers too.
          </p>
        </div>
      </div>
    </>
  );
}
