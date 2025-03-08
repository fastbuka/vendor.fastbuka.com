"use client"
import { useMutation, useQuery, QueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants";
import { request } from "@/utils/request";
import { setToken, getToken, clearToken, setUser } from "@/utils/token";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { foodData } from "./category_and_food";

interface LoginData {
  email: string;
  password: string;
}

interface categoryImage {
  imageUrl: File;

}

interface UpdateProfileData {
  uuid: string;
  name: string;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  opening_time: string;
  closing_time: string;
}

export interface RegisterData {
  name: string;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  opening_time: string;
  closing_time: string;
}
// Modified to match the structure of the response form the API
interface AuthResponse {
  data: {
    token: string;
    user: any; //Interface check here
  };
}

export function useLogin() {
  const router = useRouter();

  return useMutation<AuthResponse, Error, LoginData>(
    (data) =>
      request(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    {
      onSuccess: async (res) => {
        try {
          // Wait for the token and user data to be resolved
          setToken(res.data.token);
          // Check if user data is valid before setting it
          if (res.data.user) {
            setUser(res.data.user);
            // Navigate to user dashboard after setting user data
            router.push("/vendor/home");
          } else {
            console.warn(
              "User data is null or undefined, not setting in localStorage"
            );
          }
        } catch (error) {
          console.error("Error during login process: ", error);
        }
      },
      onError: (error) => {
        console.error("Login failed", error);
        // Handle login error (e.g., show error message)
      },
    }
  );
}

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterData>(
    (data) => {
      // Fetch the "fastbuka_auth_token" from localStorage
      const token = getTokenFromLocalStorage();

      return request(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(data),
      });
    },
    {
      onError: (error: any) => {
        console.error("Registration failed", error);
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error("Error", error.message);
        }
      },
    }
  );
}

function getTokenFromLocalStorage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("fastbuka_auth_token");
  }
  return null;
}

export function useVerifyToken() {
  const { logout } = useAuth(); // Use your existing auth context

  return useQuery<{ isValid: boolean }, Error>(
    "verifyToken",
    () =>
      request(API_ENDPOINTS.VERIFY_TOKEN, {
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    {
      retry: false,
      onError: () => {
        logout(); // Use the logout function from your auth context
      },
    }
  );
}

export function useLogout(queryClient: QueryClient) {
  return useMutation(
    async () => {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(API_ENDPOINTS.LOGOUT, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        clearToken();
        queryClient.clear(); // Clear all React Query caches
        window.location.href = "/login"; // Redirect to login page
      },
      onError: (error) => {
        console.error("Logout failed", error);
        // You might want to show an error message to the user here
      },
    }
  );
}

// Fetch the "fastbuka_auth_token" from localStorage
const token = typeof window !== 'undefined' ? localStorage.getItem("fastbuka_auth_token") : null;

export async function allAccounts(token: string) {
  try {
    const response = await fetch(API_ENDPOINTS.ALL_ACCOUNTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        token: `${token || ""}`
      },
    });

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch vendors");
    //     }

    const data = await response.json();
    return data.data.vendors; // Access the vendors array from the response
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
}

export async function categoryImages() {
  const token = getTokenFromLocalStorage();
  try {
    const response = await fetch(`${API_ENDPOINTS.CATEGORY_IMAGE}/${token}?env=dev`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch category images");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
}

// export async function uploadCategoryImage() {
//   try {
//     const formData = new FormData();

//     const response = await fetch(`${API_ENDPOINTS.CATEGORY_IMAGE}/${token}?env=dev`, {
//       method: "POST",
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData
//     });

//     if (!response.ok) {
//       throw new Error("Failed to upload category image");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error;
//   }
// }

export function useUploadCategoryImage() {
  return useMutation<AuthResponse, Error, categoryImage>(
    async (data) => {
      const token = getTokenFromLocalStorage();

      const formData = new FormData();
      formData.append("file", data.imageUrl);

      const response = await fetch(`${API_ENDPOINTS.CATEGORY_IMAGE}/${token}?env=dev`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload category image");
      }

      return response.json();
    }
  )
}

const updateVendorProfile = async (data: UpdateProfileData) => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  const response = await axios.patch(
    `https://api.fastbuka.com/api/v1/vendor/${data.uuid}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log("Vendor", response.data);
  return response.data;
};

export const useUpdateProfile = () => {
  return useMutation(updateVendorProfile);
};