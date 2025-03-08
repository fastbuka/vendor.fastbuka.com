import { backend } from '@/lib/axios';

export function useAcceptOrder() {
  /**
   * Orders
   * @param param0
   * @returns
   */
  const acceptOrder = async ({order_uuid}: {order_uuid: string}
  ) => {
    try {

      let response;

      response = await backend.get(
        `/v1/order/vendor/${order_uuid}`
      );
      console.log("Fetch response", response);

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Order updated successfully',
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
  

  return {
    acceptOrder,
  };
}
