import ECommerce from "@/components/Dashboard/All-Food";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllCategory from "@/components/Dashboard/All-Category";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <AllCategory></AllCategory>
      </DefaultLayout>
    </>
  );
}
