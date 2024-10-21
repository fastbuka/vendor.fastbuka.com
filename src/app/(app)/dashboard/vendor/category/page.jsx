import { Metadata } from "next";
import DefaultLayout from "../../../../../../components/Layouts/DefaultLayout";
import AllCategory from "../../../../../../components/Dashboard/All-Category";
import Breadcrumb from "../../../../../../components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <Breadcrumb pageName="Foods / Products Categories" />
        <AllCategory></AllCategory>
      </DefaultLayout>
    </>
  );
}
