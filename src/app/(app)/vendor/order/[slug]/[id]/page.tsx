'use client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAcceptOrder } from '@/hooks/acceptOrder';
import { useToast } from '@/hooks/use-toast';
import { getOrderById } from '@/queries/category_and_food';
import { MoreVertical } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

interface OrderItem {
  id: string;
  food: {
    name: string;
  };
  price: number;
  quantity: number;
}

interface Order {
  order_number: string;
  total_amount: number;
  delivery_name: string;
  delivery_contact: string;
  payment_status: string;
  order_status: string;
  orderItems: OrderItem[];
}

const OrderDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderUuid, setSelectedOrderUuid] = useState('');
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { acceptOrder } = useAcceptOrder();

  const params = useParams();
  const id = params?.id as string;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchOrder = async () => {
    try {
      if (id) {
        const ord = await getOrderById(id);

        setOrder({
          ...ord.data.order,
          orderItems: ord.data.order.orderItems || [],
        });
      }
    } catch (err) {
      setError('Failed to fetch order details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleOrderClick = async (uuid: string) => {
    console.log('Order uuid', uuid);
    setLoading(true);
    try {
      const response = await acceptOrder({ order_uuid: uuid });
      console.log('Order update', response);
      if (response.success === true) {
        toast({
          // variant: response.variant,
          title: response.message,
          description: response.data,
        });
        fetchOrder();
      } else if (response.success === false) {
        toast({
          // variant: response.variant,
          title: response.message,
          description: response.data,
        });
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating order:', error);
      setIsModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (uuid: string) => {
    setSelectedOrderUuid(uuid);
    setIsModalOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order found</p>;

  return (
    <>
      <DefaultLayout>
        <CardContent>
          <div className="p-6 border rounded-lg shadow-lg bg-white space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button onClick={() => window.history.back()}>
                  <IoArrowBackOutline size={25} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">
                  Order Details
                </h2>
              </div>
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    order.order_status === 'ReadyForPickup'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {order.order_status}
                </span>
                {order.order_status !== 'ReadyForPickup' &&
                  order.order_status !== 'PickedUp' &&
                  order.order_status !== 'Delivered' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem>
                          <Button
                            onClick={() => openModal(id)}
                            size="sm"
                            className="bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                            Order Ready
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
              </div>
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
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-semibold">Update Order</h2>
                <p>Order ready for pick up?</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <Button onClick={closeModal} variant="outline">
                    No
                  </Button>
                  <Button
                    onClick={() => handleOrderClick(selectedOrderUuid)}
                    variant="outline"
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </DefaultLayout>
    </>
  );
};

export default OrderDetails;
