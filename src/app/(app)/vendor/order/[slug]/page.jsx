'use client';

import { useState, useCallback, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select,  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useOrder } from '@/hooks/order';
import Link from 'next/link';
import { Loader2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


const orderStatuses = ['All', 'paid', 'PickedUp', 'Delivered'];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-blue-100 text-blue-800';
    case 'ReadyForPickup':
      return 'bg-yellow-100 text-yellow-800';
    case 'PickedUp':
      return 'bg-blue-100 text-green-800';
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatDate(dateString) {
  if (!dateString) return 'Invalid date';
  const date = new Date(dateString.trim());
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

const handleOrderClick = (uuid) => {
  // Implement your logic here, e.g., mark the order as ready or fetch order details
  console.log(`Order ready clicked: ${uuid}`);
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [orderFetch, setOrderFetch] = useState(false);
  const { orders } = useOrder();
  const [orderStatus, setOrderStatus] = useState('All');
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setOrderFetch(false);
    try {
      const response = await orders();
      console.log("Orders fetched", response);
      if (response.success) {
        setOrderDetails(response.data.orders);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
      setOrderFetch(true);
    }
  }, [orders]);


  useEffect(() => {
    if (!orderFetch) {
      fetchOrders();
    }
  }, [fetchOrders, orderFetch]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    );
  }

  return (
    <>
      <DefaultLayout>
        <CardContent>
        <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className='space-y-6 py-6'
      >
        <div className='flex justify-between items-center space-x-4'>
          <Select
            value={orderStatus}
            onValueChange={(value) => {
              setOrderStatus(value), setOrderFetch(false);
            }}
          
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent   className='bg-white'>
              {orderStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={fetchOrders}
            variant='outline'
            size='sm'
            className='bg-white hover:bg-gray-100 transition-colors'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>

        {orderDetails.length > 0 ? (
          <div className='flex flex-col space-y-4'>
            {orderDetails.map((order) => (
             
                <motion.div
                  key={order.uuid}
                  variants={cardVariants}
                  className='bg-white rounded-lg shadow-md p-6 flex justify-between items-center'
                >
                  <div className='space-y-2'>
                    <h3 className='text-lg font-semibold'>
                      {order?.user?.username || 'User deactivated'}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      Order #{order.order_number}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className='flex gap-3'>
                  <div className='text-right space-y-2'>
                    <p className='text-lg font-bold'>
                      ₦{order.total_amount.toFixed(2)}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.order_status
                      )}`}
                    >
                      Order: {order.order_status}
                    </span>
                   
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className='cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-white'>
                      <DropdownMenuItem>
                      <Button
                    onClick={() => handleOrderClick(order.uuid)} // Trigger function on click
                   
                    size='sm'
                    className='bg-gray-200 hover:bg-gray-300 transition-colors'
                  >
                    Order Ready
                  </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </div>
                </motion.div>
             
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No orders found.</p>
          </div>
        )}

      </motion.div>
        </CardContent>
      </DefaultLayout>
    </>
  );
}
