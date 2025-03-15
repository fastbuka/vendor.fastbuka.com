'use client';
import { useMutation, useQuery } from 'react-query';
import { API_ENDPOINTS } from '@/constants';

export interface foodData {
  vendor_uuid: string;
  category_uuid: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discount: number;
  processing_time: string;
  ready_made: boolean;
}

interface AuthResponse {
  data: {
    token: string;
    user: any; //Interface check here
  };
}

function getTokenFromLocalStorage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('fastbuka_auth_token');
  }
  return null;
}

export async function getAllCategory() {
  try {
    const response = await fetch(API_ENDPOINTS.ALL_CATEGORY, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch category images');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
}

export function useAddFood(vendor_slug: string) {
  return useMutation<AuthResponse, Error, foodData>(async (data) => {
    const token = getTokenFromLocalStorage();

    // Construct JSON payload
    const payload = {
      vendor_uuid: data.vendor_uuid,
      category_uuid: data.category_uuid,
      name: data.name,
      description: data.description,
      price: data.price, // Keep as number
      discount: data.discount, // Keep as number
      processing_time: data.processing_time,
      ready_made: data.ready_made, // Keep as boolean
      image: data.image || null, // If needed, handle image as URL or blob
    };

    const response = await fetch(`${API_ENDPOINTS.ADD_FOOD}/${vendor_slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
        slug: vendor_slug,
      },
      body: JSON.stringify(payload), // Send JSON payload
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add food');
    }

    return response.json();
  });
}

export async function allFood(vendor_slug: string) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`${API_ENDPOINTS.ALL_FOOD}/${vendor_slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food items'); // Corrected error message
    }

    return await response.json(); // Directly return parsed JSON
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

export async function deleteFood(vendor_slug: string, food_uuid: string) {
  console.log('vendor', vendor_slug);
  try {
    const response = await fetch(
      `${API_ENDPOINTS.DELETE_FOOD}/${vendor_slug}/${food_uuid}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete food item');
    }

    return { success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

export async function getFoodById(vendor_slug: string, food_uuid: string) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `${API_ENDPOINTS.GET_FOOD}/${vendor_slug}/${food_uuid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch food item');
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

export async function updateFood(
  vendor_slug: string,
  food_uuid: string,
  foodData: any
) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `${API_ENDPOINTS.UPDATE_FOOD}/${vendor_slug}/${food_uuid}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
        body: JSON.stringify(foodData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update food item');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating food:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update food item'
    );
  }
}

export async function fetchOrders(vendor_slug: string) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await fetch(`${API_ENDPOINTS.ALL_ORDERS}/${vendor_slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food items'); // Corrected error message
    }

    return await response.json(); // Directly return parsed JSON
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}
