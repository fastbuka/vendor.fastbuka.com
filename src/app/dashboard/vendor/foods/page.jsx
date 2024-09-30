
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllFood from "@/components/Dashboard/All-Food";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <Breadcrumb pageName="Foods / Products" />
        <AllFood />
      </DefaultLayout>
    </>
  );
}
