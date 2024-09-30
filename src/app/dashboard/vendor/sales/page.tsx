
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Sales from "@/components/Dashboard/Sales-Analysis";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <Breadcrumb pageName="Sales Analysis" />
        <Sales></Sales>
      </DefaultLayout>
    </>
  );
}
