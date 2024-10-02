import React from "react";

export default function Newsletter() {
  return (
    <>
      <h1 className="text-2xl text-center font-bold">
        Partner With Us or Invest in the Future of Food Delivery
      </h1>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          FastBuka is building a revolutionary food delivery platform powered by
          blockchain technology. We’re looking for partners and investors who
          share our vision of making food delivery fast, affordable, and
          accessible while supporting local businesses.
        </div>

        <div>
          <p className="md:me-32 text-md md:text-lg tracking-wider md:mt-0 mt-5">
            If you’re interested in partnering with us or investing in our
            future, get in touch!
          </p>
        </div>
      </div>
    </>
  );
}
