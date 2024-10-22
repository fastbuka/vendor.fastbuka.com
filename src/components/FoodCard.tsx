import React from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

interface FoodCardProps {
  food: {
    id: number;
    name: string;
    price: number;
    image: string; // Assuming the food item has an image URL
  };
  onEdit: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onView, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      {/* Food Image */}
      <img
        src={food.image}
        alt={food.name}
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />

      {/* Food Name */}
      <h3 className="text-xl font-semibold mb-2 text-center">{food.name}</h3>

      {/* Food Price */}
      <p className="text-lg font-semibold text-gray-700 mb-4">${food.price.toFixed(2)}</p>

      {/* Action Icons */}
      <div className="flex justify-between gap-4 w-full mt-auto">
        {/* View Icon */}
        <button
          onClick={() => onView(food.id)}
          className="flex items-center justify-center w-10 h-10 text-blue-500 hover:text-blue-700"
        >
          <FaEye size={20} />
        </button>

        {/* Edit Icon */}
        <button
          onClick={() => onEdit(food.id)}
          className="flex items-center justify-center w-10 h-10 text-green-500 hover:text-green-700"
        >
          <FaEdit size={20} />
        </button>

        {/* Delete Icon */}
        <button
          onClick={() => onDelete(food.id)}
          className="flex items-center justify-center w-10 h-10 text-red-500 hover:text-red-700"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
