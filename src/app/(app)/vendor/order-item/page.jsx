"use client"
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderItem from "@/components/Dashboard/OrderItems";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CryptoRate from "@/components/Charts/CryptoRate";



export default function Home() {
  return (
    <>
      <DefaultLayout>
        <CryptoRate />
        <Breadcrumb pageName="Ordered Item" />
        <OrderItem></OrderItem>
      </DefaultLayout>
    </>
  );
}
