import { storage } from '@/lib/axios';
const env = 'dev';

export const useStorage = () => {
  /**
   * All
   * @param param0
   * @returns
   */
  const all = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await storage.get(
        `/api/v1/storage/${token}/?env=${env}`
      );
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to load user',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load user',
      };
    }
  };

  /**
   * store
   * @returns
   */
  const store = async ({ file }: { file: File }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      const response = await storage.post(
        `/api/v1/storage/${token}/?env=${env}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to upload file',
        };
      }
    } catch (error: any) {
      console.error('Upload Error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Upload failed',
      };
    }
  };

  /**
   * destroy
   * @param param0
   * @returns
   */
  const destroy = async ({ uuid }: { uuid: string }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await storage.delete(`/api/v1/storage/${token}/${uuid}`);
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Success',
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Failed to load user',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load user',
      };
    }
  };

  return {
    all,
    store,
    destroy,
  };
};
