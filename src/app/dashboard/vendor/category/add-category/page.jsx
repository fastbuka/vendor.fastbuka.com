import ECommerce from "@/components/Dashboard/All-Food";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddCategory from "@/components/Dashboard/Add-Category";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <AddCategory></AddCategory>
      </DefaultLayout>
    </>
  );
}
