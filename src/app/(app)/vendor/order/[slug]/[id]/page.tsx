'use client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React from 'react';

const OrderDetails = ({
  order = {
    id: '67c75ef09c8ae5619be76092',
    uuid: '3c2a1610-68eb-486f-a894-c20e38810da8',
    user_uuid: '19a0f775-d866-4c2a-8b85-115744b0d5e4',
    vendor_uuid: 'b21e9624-769c-44s3-b491-1f10833ee5a3',
    rider_uuid: null,
    order_number: 'BLB232931',
    total_amount: 2,
    discount_amount: 0,
    paid_amount: 0,
    delivery_address: '45 Allen Avenue, Ikeja',
    payment_id: null,
    payment_method: null,
    payment_status: 'completed',
    order_status: 'ReadyForPickup',
    delivery_charges: 0,
    delivery_contact: '07026000076',
    confirmation_no: 'wv18uv20ku',
    delivery_email: 'block7el@gmail.com',
    delivery_name: 'Chijioke Ogbechie',
    location: null,
    longitude: null,
    latitude: null,
    createdAt: '2025-03-04T20:13:36.560Z',
    updatedAt: '2025-03-09T20:08:58.786Z',
    orderItems: [
      {
        id: '67c75ef09c8ae5619be76093',
        uuid: '06856bf0-1fb1-4860-a6c7-b0bab33eab5a',
        order_uuid: '3c2a1610-68eb-486f-a894-c20e38810da8',
        food_uuid: '21f40439-e13f-4e9b-8eb3-60dc41bc2e91',
        price: 2,
        quantity: 1,
        createdAt: '2025-03-04T20:13:36.825Z',
        updatedAt: '2025-03-04T20:13:36.825Z',
        food: {
          id: '67c2dbc8b677ef13dedbad09',
          uuid: '21f40439-e13f-4e9b-8eb3-60dc41bc2e91',
          vendor_uuid: 'b21e9624-769c-44s3-b491-1f10833ee5a3',
          category_uuid: 'b21e9654-769c-4453-be09-1f10833fe5ae',
          name: 'Drink',
          description: 'Drink for fastbuka',
          image: null,
          price: 2,
          discount: 0,
          processing_time: '3',
          ratings: 0,
          featured: 0,
          ready_made: true,
          on_menu: true,
          stock: 100,
          createdAt: '2025-03-01T10:04:56.881Z',
          updatedAt: '2025-03-01T10:04:56.881Z',
        },
      },
    ],
    user: {
      email: 'block7el@gmail.com',
      contact: '08053333863',
      username: 'block7el',
    },
  },
}) => {
  const router = useRouter();
  console.log('router', router);

  if (!order) return <p>Loading...</p>;

  return (
    <>
      <DefaultLayout>
        <CardContent>
          <div className="p-6 border rounded-lg shadow-lg bg-white space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Order Details
              </h2>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  order.order_status === 'ReadyForPickup'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {order.order_status}
              </span>
            </div>

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong className="text-gray-900">Order:</strong> #
                {order.order_number}
              </p>
              <p>
                <strong className="text-gray-900">Total Amount:</strong> ₦
                {order.total_amount}
              </p>
              <p>
                <strong className="text-gray-900">Customer Name:</strong>{' '}
                {order.delivery_name}
              </p>
              <p>
                <strong className="text-gray-900">Contact:</strong>{' '}
                {order.delivery_contact}
              </p>
              <p>
                <strong className="text-gray-900">Payment Status:</strong>{' '}
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    order.payment_status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {order.payment_status}
                </span>
              </p>
            </div>

            {/* Ordered Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Items Ordered
              </h3>
              <div className="space-y-3">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.food.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-700">₦{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </DefaultLayout>
    </>
  );
};

export default OrderDetails;
