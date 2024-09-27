import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Deposit from "@/components/Dashboard/Deposit";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>        
      <Breadcrumb pageName="Deposit" />
        <Deposit></Deposit>
      </DefaultLayout>
    </>
  );
}
