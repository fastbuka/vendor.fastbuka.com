import { backend } from "@/lib/axios";

export function useUpdateVendorProfile() {
  /**
   * Orders
   * @param param0
   * @returns
   */
  const update = async ({ vendor_uuid, profile }: { vendor_uuid: string, profile: string }) => {
    try {
      const url = `/v1/vendor/update_profile_picture/${vendor_uuid}`;
      console.log("Request URL:", url);
      const token = localStorage.getItem("fastbuka_auth_token");
      console.log("Token:", token);
      let response = await backend.post(url,
        { profilePicture: profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            vendorUuid: vendor_uuid
          }
        }
      );
      console.log("Fetch response", response);

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || "updated successfully",
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
    update,
  };
}
