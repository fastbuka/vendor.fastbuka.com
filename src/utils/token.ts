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

// /utils/api.ts

export const API_ENDPOINTS = {
  VENDOR_BY_SLUG: (slug: string) => `https://api.fastbuka.com/api/v1/vendor/${slug}`, // Adjust this based on your actual API structure
};

export async function getVendorBySlug(slug: string) {
  const response = await fetch(API_ENDPOINTS.VENDOR_BY_SLUG(slug), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vendor data");
  }

  return await response.json(); // Adjust based on your API response structure
}
