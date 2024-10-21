
import { Metadata } from "next";
import DefaultLayout from "../../../../../components/Layouts/DefaultLayout";
import Settings from "../../../../../components/Dashboard/Settings";
import Breadcrumb from "../../../../../components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <Breadcrumb pageName="Settings" />
        <Settings></Settings>
      </DefaultLayout>
    </>
  );
}
