
import { Metadata } from "next";
import DefaultLayout from "../../../../../../components/Layouts/DefaultLayout";
import AddCategory from "../../../../../../components/Dashboard/Add-Category";
import Breadcrumb from "../../../../../../components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add Foods Categories" />
        <AddCategory></AddCategory>
      </DefaultLayout>
    </>
  );
}
