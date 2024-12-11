"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { uploadCategoryImage, categoryImages, useLogout } from "@/queries/auth";
import { addFood } from "@/queries/categoryImages";
import { QueryClient } from "react-query";
import { getUser, getToken } from "@/utils/token";
import { getVendorBySlug } from "@/utils/token";
import { getAllCategory } from "@/queries/categoryImages";
import { useMutation } from 'react-query';

interface UserProfile {
  profile: {
    first_name: string;
    user_uuid: string;
    email: string;
  };
}

interface Vendor {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  country: string;
  city: string;
  // Add other fields if needed
}

const FoodForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Placeholder image URL
  const placeholderImage =
    "https://via.placeholder.com/400x300?text=No+Image+Selected";

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // vendor slug
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  const logout = useLogout(queryClient);

  const { slug } = useParams(); // Get the slug directly from params
  const [vendor, setVendor] = useState<any | null>(null); // State to store vendor details
  const [categoryImageData, setCategoryImageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add new state for selected image UUIDs
  const [selectedImageUuids, setSelectedImageUuids] = useState<string[]>([]);

  // Add handler for image selection
  const handleImageClick = (uuid: string) => {
    setSelectedImageUuids(
      (prev) =>
        prev.includes(uuid)
          ? prev.filter((id) => id !== uuid) // Remove if already selected
          : [...prev, uuid] // Add if not selected
    );
  };

  // Fetch vendor data as a separate function
  const fetchVendor = async (slug: string) => {
    try {
      const response = await getVendorBySlug(slug); // Fetch vendor data using the slug

      // Assuming response.data contains your expected vendor data
      if (response?.data?.vendor) {
        setVendor(response.data.vendor);
      } else {
        throw new Error("Vendor not found");
      }
    } catch (err) {
      setError("Failed to fetch vendor details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    const userData = getUser();
    if (!token || !userData) {
      router.push("/login");
    } else {
      setUser(userData as UserProfile);
    }

    if (slug) {
      fetchVendor(slug as string); // Call the fetchVendor function
    }

    const fetchCategoryImages = async () => {
      try {
        const userProfile = getUser() as UserProfile;
        if (!userProfile?.profile?.user_uuid) {
          throw new Error("User UUID not found");
        }

        const data = await categoryImages(userProfile.profile.user_uuid);
        setCategoryImageData(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch category images"
        );
        setLoading(false);
      }
    };

    fetchCategoryImages();
  }, [slug, router]);

  // Add new state for upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Add new state for upload loading and error
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Add handler for file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Modify the form submission handler
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Please select a file");
      return;
    }

    try {
      setUploadLoading(true);
      setUploadError(null);

      const userProfile = getUser() as UserProfile;
      if (!userProfile?.profile?.user_uuid) {
        throw new Error("User UUID not found");
      }

      await uploadCategoryImage(uploadFile, userProfile.profile.user_uuid);

      // Refresh the category images
      const newData = await categoryImages(userProfile.profile.user_uuid);
      setCategoryImageData(newData);

      // Reset form and close modal
      setUploadFile(null);
      setIsUploadModalOpen(false);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  const [categories, setCategories] = useState<any[]>([]); // State to store categories
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        if (response?.data?.categories) {
          setCategories(response.data.categories);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (err) {
        setCategoriesError(err instanceof Error ? err.message : "Error fetching categories");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Add form state
  const [formData, setFormData] = useState({
    category_uuid: '',
    name: '',
    description: '',
    price: '',
    discount: '',
    preparation_time: '',
    ready_made: '',
  });

  // Add form handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // First, add the mutation hook at the top of your component
  const addFoodMutation = addFood(vendor?.slug || '');

  // Then modify the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!vendor?.uuid) {
        throw new Error('Vendor UUID not found');
      }

      // Create the food data object
      const foodData = {
        vendor_uuid: vendor.uuid,
        category_uuid: formData.category_uuid,
        name: formData.name,
        description: formData.description,
        image: '',
        imageUrl: selectedImageUuids
          .map((uuid) => {
            const selectedImage = categoryImageData?.data?.storage?.data?.find(
              (img: any) => img.uuid === uuid
            );
            return selectedImage ? `${selectedImage.base_url}/${selectedImage.path}` : '';
          })
          .filter(Boolean)
          .join(','),
        price: Number(formData.price),
        discount: Number(formData.discount || '0'),
        processing_time: formData.preparation_time,
        ready_made: formData.ready_made === 'yes'
      };

      console.log('Sending food data:', foodData);
      console.log('Vendor UUID:', vendor.uuid);

      // Call the mutation and wait for response
      const response = await addFoodMutation.mutateAsync(foodData);
      
      // Check if response exists and has status code 200/201
      if (response) {
        console.log('Food added successfully:', response);
        router.push(`/vendor/foods/${slug}`);
      } else {
        throw new Error('Failed to add food');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      // Show error message to user
      alert(error instanceof Error ? error.message : 'Failed to add food');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!vendor) return null;

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg md:order-1 order-2">
        {/* Category (Dropdown) */}
        <div className="mb-8">
          <label
            htmlFor="category"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Category
          </label>
          <select
            id="category_uuid"
            value={formData.category_uuid}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.uuid} value={category.uuid}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Food Name (Text) */}
        <div className="mb-8">
          <label
            htmlFor="foodName"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Food Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter the food name"
            required
          />
        </div>

        {/* Description (Textarea) */}
        <div className="mb-8">
          <label
            htmlFor="description"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Describe the food"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Price (Number) */}
        <div className="mb-8">
          <label
            htmlFor="price"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter price"
            min={0}
            step="0.01"
            required
          />
        </div>

        {/* Discount (Number) */}
        <div className="mb-8">
          <label
            htmlFor="discount"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter discount"
            min={0}
            max={100}
            step="1"
          />
        </div>

        {/* Preparation Time (Number) */}
        <div className="mb-8">
          <label
            htmlFor="prepTime"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            id="preparation_time"
            value={formData.preparation_time}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Enter preparation time"
            min={0}
            step="1"
            required
          />
        </div>
        
        {/* Ready Made Selection */}
        <div className="mb-8">
          <label
            htmlFor="readyMade"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Ready Made
          </label>
          <select
            id="ready_made"
            value={formData.ready_made}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            required
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Modified Category images section */}
        <div className="mb-8">
          <label
            htmlFor="selectedImages"
            className="block mb-3 text-lg font-semibold text-gray-900"
          >
            Select Image(s)
          </label>
          <input
            type="text"
            id="selectedImages"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            placeholder="Images"
            value={selectedImageUuids
              .map((uuid) => {
                const selectedImage = categoryImageData?.data?.storage?.data?.find(
                  (img: any) => img.uuid === uuid
                );
                return selectedImage ? `${selectedImage.base_url}/${selectedImage.path}` : '';
              })
              .filter(Boolean)
              .join(', ')}
            readOnly
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#3ab764] text-white font-semibold rounded-lg text-lg px-6 py-3 focus:ring-4 focus:outline-none focus:ring-blue-300"
            disabled={addFoodMutation.isLoading}
          >
            {addFoodMutation.isLoading ? "Adding..." : "Submit"}
          </button>
        </div>
      </form>

      <div className="w-full max-w-[70vw] mx-auto px-4 md:px-6 lg:px-8 mt-5">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Selected Image(s):
          </label>
          <div className="flex flex-wrap gap-6 mt-5">
            {selectedImageUuids.map((uuid) => {
              const selectedImage =
                categoryImageData?.data?.storage?.data?.find(
                  (img: any) => img.uuid === uuid
                );
              return selectedImage ? (
                <div key={uuid} className="relative ">
                  <Image
                    src={`${selectedImage.base_url}/${selectedImage.path}`}
                    alt={selectedImage.slug}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover hover:scale-105 transition-transform duration-300 w-[100px] h-[100px]"
                  />
                  <button
                    onClick={() => handleImageClick(uuid)}
                    className="absolute -top-5 -right-5 bg-red-500 text-lg text-red rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    x
                  </button>
                </div>
              ) : null;
            })}
          </div>
          {/* Hidden input field for form submission */}
          <input
            type="hidden"
            name="selectedImages"
            value={selectedImageUuids
              .map((uuid) => {
                const selectedImage = categoryImageData?.data?.storage?.data?.find(
                  (img: any) => img.uuid === uuid
                );
                return selectedImage ? `${selectedImage.base_url}/${selectedImage.path}` : "";
              })
              .join(",")}
          />
        </div>

        <div className="relative overflow-x-auto bg-white rounded-lg">
          <div className="flex space-x-6 p-4 min-w-full">
            {categoryImageData?.data?.storage?.data?.map((image: any) => (
              <div
                key={image.uuid}
                className="flex-shrink-0 w-[100px] cursor-pointer"
                onClick={() => handleImageClick(image.uuid)}
              >
                <div
                  className={`relative aspect-square ${
                    selectedImageUuids.includes(image.uuid)
                      ? "ring-2 ring-[#3ab764]"
                      : ""
                  }`}
                >
                  <Image
                    src={`${image.base_url}/${image.path}`}
                    alt={image.slug}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover hover:scale-105 transition-transform duration-300 w-[100px] h-[100px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#3ab764] text-white px-4 py-2 rounded-lg"
          >
            Add Image
          </button>
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>

              <form onSubmit={handleUploadSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>

                {uploadError && (
                  <p className="text-red-500 text-sm mb-4">{uploadError}</p>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUploadModalOpen(false);
                      setUploadError(null);
                      setUploadFile(null);
                    }}
                    className="bg-gray-500 text-red px-4 py-2 rounded-lg hover:bg-gray-600"
                    disabled={uploadLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#3ab764] text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                    disabled={uploadLoading}
                  >
                    {uploadLoading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-600 mt-2">
            Error loading category images: {error}
          </p>
        )}
      </div>

      
    </>
  );
};

export default FoodForm;
