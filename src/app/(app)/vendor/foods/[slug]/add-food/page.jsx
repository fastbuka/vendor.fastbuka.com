'use client';
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import FoodForm from '@/components/Dashboard/Add-Food';

export default function Home() {
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
        <FoodForm />
      </DefaultLayout>
    </>
  );
}
