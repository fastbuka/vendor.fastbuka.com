import { backend } from '@/lib/axios';

export function useOrder() {
  /**
   * Orders
   * @param param0
   * @returns
   */
  const orders = async (
  ) => {
    const order_status = 'paid';
    try {
      const token = localStorage.getItem('fastbuka_auth_token');
    //   console.log("Get Token:", token);
      const vendor_uuid = localStorage.getItem('VendorUuid')?.replace(/"/g, '');
    //   console.log("Get Vendor:", vendor_uuid);
      let response;

      response = await backend.get(
        `/api/v1/order/vendor/${vendor_uuid}?order_status=${order_status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetch response", response);

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  /**
   * Order
   * @param param0
   * @returns
   */
  const order = async ({ order_uuid }: { order_uuid: string | null }) => {
    let response;
    // try {
    //   const token = localStorage.getItem('token');

    //   if (order_uuid) {
    //     response = await backend.get(`/api/v1/order/${order_uuid}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //   } else {
    //     response = {
    //       status: 404,
    //       success: false,
    //       message: 'Order not found',
    //     };
    //   }
    //   if (response.data.success) {
    //     return {
    //       success: true,
    //       message: response.data.message || 'Successful',
    //       data: response.data.data,
    //     };
    //   } else {
    //     return {
    //       success: false,
    //       message: response.data.message || 'Successful',
    //     };
    //   }
    // } catch (error: any) {
    //   return {
    //     success: false,
    //     message: `Error: ${error.message}`,
    //   };
    // }
  };

  return {
    orders,
    order,
  };
}
