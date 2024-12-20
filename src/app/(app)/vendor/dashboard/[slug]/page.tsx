"use client"
import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";



export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Dashboard" />
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
