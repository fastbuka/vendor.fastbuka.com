"use client"
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";
import AddAccount from "@/components/Dashboard/Add-Account";

export default function Account() {
  return (
    <>
    <DefaultLayout>
        <CryptoRate />
        <Breadcrumb pageName="Add Account" />
        <AddAccount></AddAccount>
      </DefaultLayout>
    </>
  );
}
