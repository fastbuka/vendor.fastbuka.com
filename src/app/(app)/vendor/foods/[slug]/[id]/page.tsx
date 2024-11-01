"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditFood from "@/components/Dashboard/Edit-Food";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";

interface Props {
  params: {
    id: string;
  };
}

export default function DashboardPage({ params }: Props) {
  // Access the dynamic route parameter
  const { id } = params;

  return (
    <>
      <DefaultLayout>
        <CryptoRate />
        <Breadcrumb pageName="Edit Food" />
        <EditFood />
      </DefaultLayout>
    </>
  );
}
