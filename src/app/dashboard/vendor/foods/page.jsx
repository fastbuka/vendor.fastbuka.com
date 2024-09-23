import AllFood from "@/components/Dashboard/All-Food";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// export const metadata: Metadata = {
//   title: "FastBuka | Dashboard",
// };

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <AllFood/>
      </DefaultLayout>
    </>
  );
}
