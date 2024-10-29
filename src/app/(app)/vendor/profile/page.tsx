"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Profile from "@/components/Dashboard/Profile";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
      <CryptoRate />
      <Breadcrumb pageName="Profile" />
        <Profile></Profile>
      </DefaultLayout>
    </>
  );
}
