import ECommerce from "@/components/Dashboard/All-Food";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllFood from "@/components/Dashboard/All-Food";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <AllFood />
      </DefaultLayout>
    </>
  );
}
