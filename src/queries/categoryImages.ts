"use client"
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants";
import { request } from "@/utils/request";
import { setToken, getToken, clearToken, setUser } from "@/utils/token";
import { useAuth } from "@/context/AuthContext";

export interface foodData {
  vendor_uuid: string;
  category_uuid: string;
  name: string;
  description: string;
  image: string;
  imageUrl: string;
  price: string;
  discount: string;
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

export function addFood(token: string, vendor_uuid: string) {
  return useMutation<AuthResponse, Error, foodData>(
    (data) => {
      if (!token) {
        throw new Error("No token provided");
      }

      if (!vendor_uuid) {
        throw new Error("No vendor UUID provided");
      }

      return request(API_ENDPOINTS.ADD_FOOD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "vendor-uuid": vendor_uuid 
        },
        body: JSON.stringify(data),
      });
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
  )
}