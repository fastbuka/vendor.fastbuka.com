"use client"
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants";
import { request } from "@/utils/request";
import { setToken, getToken, clearToken, setUser } from "@/utils/token";
import { useAuth } from "@/context/AuthContext";

export interface foodData {
  category_uuid: string;
  name: string;
  description: string;
  image: string;
  imageUrl: string;
  price: number;
  discount: number;
  processing_time: string;
  ready_made: string;
}

interface AuthResponse {
  data: {
    token: string;
    user: any; //Interface check here
  };
}

function getTokenFromLocalStorage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("fastbuka_auth_token");
  }
  return null;
}

export async function getAllCategory() {
  try {
    const response = await fetch(API_ENDPOINTS.ALL_CATEGORY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export function addFood(vendor_slug: string) {
  return useMutation<AuthResponse, Error, foodData>(
    async (data) => {
      // Fetch the "fastbuka_auth_token" from localStorage
      const token = getTokenFromLocalStorage();

      // Separate image handling (assumes image is a file)
      const formData = new FormData();
      formData.append('category_uuid', data.category_uuid);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('discount', data.discount.toString());
      formData.append('processing_time', data.processing_time);
      formData.append('ready_made', data.ready_made);
      // Check if the image is a File object or URL string
      if (typeof data.image === 'object' && data.image !== null) {
        formData.append('image', data.image);
      } else {
        formData.append('imageUrl', data.imageUrl || "");
      }

      const response = await fetch(`${API_ENDPOINTS.ADD_FOOD}/${vendor_slug}`, {
        method: "POST",
        headers: {
          token: `${token || ""}`, // Add token header
          vendor_slug: vendor_slug, // Add vendor_slug header
        },
        body: formData, // Use formData for multipart requests
      });

      if (!response.ok) {
        throw new Error("Failed to add food");
      }

      return response.json();
    },
    {
      onError: (error: any) => {
        console.error("Failed to add food", error);
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
