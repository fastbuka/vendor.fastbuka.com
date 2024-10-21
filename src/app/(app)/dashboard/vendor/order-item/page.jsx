
import { Metadata } from "next";
import DefaultLayout from "../../../../../components/Layouts/DefaultLayout";
import OrderItem from "../../../../../components/Dashboard/OrderItems";
import Breadcrumb from "../../../../../components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>        
      <Breadcrumb pageName="Ordered Item" />
        <OrderItem></OrderItem>
      </DefaultLayout>
    </>
  );
}
