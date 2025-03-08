import { backend } from "@/lib/axios";
// The key used to store the token in localStorage
const TOKEN_KEY = 'fastbuka_auth_token';
const USER_KEY = 'fastbuka_user_data';

/**
 * Retrieves the authentication token from localStorage
 * @returns {string | null} The stored token or null if not found
 */
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Stores the authentication token in localStorage
 * @param {string} token - The token to be stored
 */
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Removes the authentication token from localStorage
 */
export const clearToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Checks if a token exists in localStorage
 * @returns {boolean} True if a token exists, false otherwise
 */
export const hasToken = (): boolean => {
  return !!getToken();
};

/**
 * Stores the user data in localStorage
 * @param {any} user - The user object to be stored
 */
export const setUser = (user: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/**
 * Retrieves the user data from localStorage
 * @returns {any | null} The stored user object or null if not found
 */
export const getUser = (): any | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

/**
 * Removes the user data from localStorage
 */
export const clearUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};



export async function getVendorBySlug(slug: string) {
  try {
    const response = await backend.get(`/v1/vendor/${slug}`)
    console.log("Vendor response", response);
    if (response.data.success) {
      // console.log("Vendor uuid", response?.data?.data?.vendor?.uuid);
      localStorage.setItem("VendorUuid", response?.data?.data?.vendor?.uuid);
      return {
          success: true,
          message: response.data.message || 'Vendor fetched successfully',
          data: response.data.data,
      };
    } else {
      return {
          success: false,
          message: response.data.message || 'failed to fetch vendor',
      };
    }
  } catch(error: any) {
    console.log("error fetching vendor:", error);
    return {
        success: false,
        message: error?.message || 'Failed to fetch vendor',
    };
  }
 
 
}
