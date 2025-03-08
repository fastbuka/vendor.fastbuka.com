"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";
import Deposits from "@/components/Dashboard/Deposit";

export default function Deposit() {
  return (
    <>
      <DefaultLayout>
        {/* <CryptoRate /> */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 border border-green-500 hover:bg-green-700 hover:border-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
        <Breadcrumb pageName="Deposit" />
        <Deposits></Deposits>
      </DefaultLayout>
    </>
  );
}
