// components/VendorCard.tsx
import React from "react";

interface VendorCardProps {
  name: string;
  description: string;
  country: string;
  city: string;
}

const VendorCard: React.FC<VendorCardProps> = ({
  name,
  description,
  country,
  city,
}) => {
  return (
    <div style={cardStyle}>
      <h2>
        <strong>Name:</strong> {name}
      </h2>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Country:</strong> {country}
      </p>
      <p>
        <strong>City:</strong> {city}
      </p>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  margin: "10px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
};

export default VendorCard;
