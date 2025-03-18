'use client';
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import AddFood from '@/components/Dashboard/Add-Food';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import CryptoRate from '@/components/Charts/CryptoRate';
import { useParams } from 'next/navigation';
import FoodForm from '@/components/Dashboard/Add-Food';

export default function Home() {
  const params = useParams() as { id: string };
  const { id } = params;

  if (!id) {
    return (
      <>
        <DefaultLayout>
          <Breadcrumb pageName="Add New Item" />
          <FoodForm />
        </DefaultLayout>
      </>
    );
  }

  return (
    <>
      <DefaultLayout>
        {/* <CryptoRate /> */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 border border-green-500 hover:bg-green-700 hover:border-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
        <Breadcrumb pageName="Add New Item" />
        <FoodForm id={id} />
      </DefaultLayout>
    </>
  );
}
