import { Metadata } from "next";
import DefaultLayout from "../../../../../components/Layouts/DefaultLayout";
import Orders from "../../../../../components/Dashboard/Orders";
import Breadcrumb from "../../../../../components/Breadcrumbs/Breadcrumb";
import CryptoRate from "../../../../../components/Charts/CryptoRate";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <CryptoRate />
        <Breadcrumb pageName="Orders" />
        <Orders></Orders>
      </DefaultLayout>
    </>
  );
}
