"use client"
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
        <Breadcrumb pageName="Deposit" />
        <Deposits></Deposits>
      </DefaultLayout>
    </>
  );
}
