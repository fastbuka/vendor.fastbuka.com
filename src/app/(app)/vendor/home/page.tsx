import Homes from "@/components/Dashboard/Home";
import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "FastBuka | Dashboard",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        {/* <Breadcrumb pageName="Dashboard" /> */}
        <Homes />
      {/* </DefaultLayout> */}
    </>
  );
}
