export interface ImageData {
    uuid: string;
    slug: string;
    user_uuid: string;
    base_url: string;
    path: string;
    size: string;
    type: string;
    use: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export const fetchUserImages = async (userUuid: string): Promise<ImageData[]> => {
    const apiUrl = `https://storage.fastbuka.com/api/v1/storage/${userUuid}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, URL: ${apiUrl}`);
      }
  
      const data: ImageData[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };
  