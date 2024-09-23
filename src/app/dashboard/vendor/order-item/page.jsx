import ECommerce from "@/components/Dashboard/All-Food";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderItem from "@/components/Dashboard/OrderItems";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <OrderItem></OrderItem>
      </DefaultLayout>
    </>
  );
}
