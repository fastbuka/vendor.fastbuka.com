"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditProfile from "@/components/Dashboard/Edit-Profile";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
      {/* <CryptoRate /> */}
      <Breadcrumb pageName="EditProfile" />
        <EditProfile></EditProfile>
      </DefaultLayout>
    </>
  );
}
