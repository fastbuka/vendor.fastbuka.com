import { Metadata } from "next";
import DefaultLayout from "../../../../../components/Layouts/DefaultLayout";
import Withdrawal from "../../../../../components/Dashboard/Withdrawal";
import Breadcrumb from "../../../../../components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>        
      <Breadcrumb pageName="Withdrawal" />
        <Withdrawal></Withdrawal>
      </DefaultLayout>
    </>
  );
}
