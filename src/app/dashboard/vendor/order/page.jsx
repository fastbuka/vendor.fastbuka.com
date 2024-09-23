import ECommerce from "@/components/Dashboard/All-Food";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Orders from "@/components/Dashboard/Orders";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Orders></Orders>
      </DefaultLayout>
    </>
  );
}
