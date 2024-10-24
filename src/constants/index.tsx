export const APP_NAME = "Fast Buka";
export const API_ENDPOINTS = {
  LOGIN: "https://api.fastbuka.com/api/v1/auth/login",
  REGISTER: "https://api.fastbuka.com/api/v1/auth/register",
  VERIFY_TOKEN: "https://api.fastbuka.com/api/v1/auth/verify-token",
  LOGOUT: "https://api.fastbuka.com/api/v1/auth/logout",
  // Add other endpoints as needed
};

export const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Partner", path: "/partner" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const TOKEN_PRICING = {
  pricePerToken: 100, // in Naira
  currency: "NGN",
};

export const RESTAURANTS = [
  {  id: 1, name: "Mama Put Delight", logo: "/images/restaurant.png" },
  { id: 2, name: "Iya Basira's Kitchen", logo: "/images/restaurant.png" },
  { id: 3, name: "Calabar Chop House", logo: "/images/restaurant.png" },
  { id: 4, name: "Buka Express", logo: "/images/restaurant.png" },
  { id: 5, name: "Naija Flavors", logo: "/images/restaurant.png" },
  { id: 6, name: "Oga's Place", logo: "/images/restaurant.png" },
  { id: 7, name: "Suya Spot", logo: "/images/restaurant.png" },
  { id: 8, name: "Amala Corner", logo: "/images/restaurant.png" },
  { id: 9, name: "Jollof Junction", logo: "/images/restaurant.png" },
  { id: 10, name: "Pepper Soup Palace", logo: "/images/restaurant.png" },
//   { id: 11, name: "Egusi Empire", logo: "/images/restaurant.png" },
//   { id: 12, name: "Pounded Yam Paradise", logo: "/images/restaurant.png" },
//   { id: 13, name: "Akara Avenue", logo: "/images/restaurant.png" },
//   { id: 14, name: "Moi Moi Mansion", logo: "/images/restaurant.png" },
//   { id: 15, name: "Ofada Oasis", logo: "/images/restaurant.png" },
//   { id: 16, name: "Boli Bistro", logo: "/images/restaurant.png" },
//   { id: 17, name: "Ewa Agoyin Express", logo: "/images/restaurant.png" },
//   { id: 18, name: "Kilishi Kingdom", logo: "/images/restaurant.png" },
//   { id: 19, name: "Nkwobi Nook", logo: "/images/restaurant.png" },
//   { id: 20, name: "Asun Arena", logo: "/images/restaurant.png" },
//   { id: 21, name: "Efo Riro Emporium", logo: "/images/restaurant.png" },
//   { id: 22, name: "Dodo Delight", logo: "/images/restaurant.png" },
//   { id: 23, name: "Ogbono Opera", logo: "/images/restaurant.png" },
//   { id: 24, name: "Chin Chin Chalet", logo: "/images/restaurant.png" },
//   { id: 25, name: "Puff Puff Paradise", logo: "/images/restaurant.png" },
//   { id: 26, name: "Shawarma Shack", logo: "/images/restaurant.png" },
//   { id: 27, name: "Tuwo Tavern", logo: "/images/restaurant.png" },
//   { id: 28, name: "Edikang Ikong Estate", logo: "/images/restaurant.png" },
];

export const TRENDING_MEALS = [
  {
    id: 1,
    name: "Jollof Rice with Chicken",
    description: "Spicy and flavorful rice dish served with tender grilled chicken",
    price: 2500,
    image: "/images/meal.png",
    time: 30
  },
  {
    id: 2,
    name: "Pounded Yam and Egusi Soup",
    description: "Smooth pounded yam served with rich, nutty egusi soup and assorted meats",
    price: 3000,
    image: "/images/meal.png",
    time: 40
  },
  {
    id: 3,
    name: "Suya Platter",
    description: "Spicy grilled beef skewers served with onions and tomatoes",
    price: 2000,
    image: "/images/meal.png",
    time: 25
  },
  {
    id: 4,
    name: "Akara and Pap",
    description: "Deep-fried bean cakes served with smooth, creamy corn porridge",
    price: 1500,
    image: "/images/meal.png",
    time: 20
  },
  {
    id: 5,
    name: "Pepper Soup",
    description: "Spicy and aromatic soup with tender meat or fish",
    price: 2200,
    image: "/images/meal.png",
    time: 35
  },
  {
    id: 6,
    name: "Fried Rice and Grilled Fish",
    description: "Savory fried rice served with perfectly grilled fish",
    price: 2800,
    image: "/images/meal.png",
    time: 35
  },
  {
    id: 7,
    name: "Moi Moi Special",
    description: "Steamed bean pudding with eggs, fish, and spices",
    price: 1800,
    image: "/images/meal.png",
    time: 45
  },
  {
    id: 8,
    name: "Ofada Rice with Sauce",
    description: "Local brown rice served with spicy ofada sauce and assorted meats",
    price: 2300,
    image: "/images/meal.png",
    time: 30
  },
  {
    id: 9,
    name: "Efo Riro with Assorted Meat",
    description: "Rich vegetable soup with variety of meats and fish",
    price: 3200,
    image: "/images/meal.png",
    time: 40
  },
  {
    id: 10,
    name: "Nkwobi",
    description: "Spicy cow foot delicacy served in a local sauce",
    price: 2700,
    image: "/images/meal.png",
    time: 50
  },
  {
    id: 11,
    name: "Shawarma Deluxe",
    description: "Grilled meat wrap with vegetables and garlic sauce",
    price: 1700,
    image: "/images/meal.png",
    time: 15
  },
  {
    id: 12,
    name: "Asun (Spicy Goat Meat)",
    description: "Peppered goat meat garnished with onions and peppers",
    price: 2600,
    image: "/images/meal.png",
    time: 35
  }
];

export const OUR_MENU = [
  {
    id: 1,
    vendorId: "1",
    name: "Amala and Ewedu Soup",
    description: "Smooth yam flour swallow served with slimy ewedu soup and stew",
    price: 2200,
    image: "/images/meal.png",
    time: 25,
    rating: 4.5
  },
  {
    id: 2,
    vendorId: "1",
    name: "Eba and Okra Soup",
    description: "Cassava flour swallow served with delicious okra soup and assorted meat",
    price: 2400,
    image: "/images/meal.png",
    time: 30,
    rating: 4.5
  },
  {
    id: 3,
    vendorId: "3",
    name: "Coconut Rice",
    description: "Fragrant rice cooked in coconut milk, served with grilled chicken",
    price: 2600,
    image: "/images/meal.png",
    time: 35,
    rating: 4.5
  },
  {
    id: 4,
    vendorId: "4",
    name: "Yam Porridge",
    description: "Diced yam cooked with palm oil, peppers, and assorted vegetables",
    price: 1800,
    image: "/images/meal.png",
    time: 40,
    rating: 4.5
  },
  {
    id: 5,
    vendorId: "5",
    name: "Beans and Plantain",
    description: "Stewed beans served with fried ripe plantain",
    price: 1600,
    image: "/images/meal.png",
    time: 25,
    rating: 4.5
  },
  {
    id: 6,
    vendorId: "6",
    name: "Oha Soup and Semovita",
    description: "Traditional Igbo soup served with smooth semolina swallow",
    price: 2800,
    image: "/images/meal.png",
    time: 35,
    rating: 4.5
  },
  {
    id: 7,
    vendorId: "7",
    name: "Banga Soup and Starch",
    description: "Palm nut soup served with starch, a traditional Delta swallow",
    price: 3000,
    image: "/images/meal.png",
    time: 40,
    rating: 4.5
  },
  {
    id: 8,
    vendorId: 8,
    name: "Tuwo Shinkafa",
    description: "Smooth rice swallow served with miyan taushe (pumpkin soup)",
    price: 2200,
    image: "/images/meal.png",
    time: 30,
    rating: 4.5
  },
  {
    id: 9,
    vendorId: 9,
    name: "Ekpang Nkukwo",
    description: "Grated cocoyam and water yam wrapped in cocoyam leaves",
    price: 2500,
    image: "/images/meal.png",
    time: 45,
    rating: 4.5
  },
  {
    id: 10,
    vendorId: 10,
    name: "Abacha and Ugba",
    description: "African salad made with cassava flakes and oil bean seed",
    price: 1800,
    image: "/images/meal.png",
    time: 20,
    rating: 4.5
  },
  {
    id: 11,
    vendorId: 11,
    name: "Ogbono Soup and Fufu",
    description: "Draw soup made with ogbono seeds, served with cassava fufu",
    price: 2700,
    image: "/images/meal.png",
    time: 35,
    rating: 4.5
  },
  {
    id: 12,
    vendorId: 12,
    name: "Edikang Ikong Soup",
    description: "Rich vegetable soup from Calabar, served with pounded yam",
    price: 3200,
    image: "/images/meal.png",
    time: 40,
    rating: 4.5
  },
  {
    id: 13,
    vendorId: 13,
    name: "Ewa Agoyin and Bread",
    description: "Mashed beans served with spicy pepper sauce and bread",
    price: 1500,
    image: "/images/meal.png",
    time: 15,
    rating: 4.5
  },
  {
    id: 14,
    vendorId: 14,
    name: "Kilishi",
    description: "Spicy dried meat, a popular Northern Nigerian snack",
    price: 1200,
    image: "/images/meal.png",
    time: 10,
    rating: 4.5
  },
  {
    id: 15,
    vendorId: 15,
    name: "Masa (Rice Cake)",
    description: "Fermented rice cakes, often served with spicy sauce",
    price: 1000,
    image: "/images/meal.png",
    time: 30,
    rating: 4.5
  },
  {
    id: 16,
    vendorId: 15,
    name: "Efo Elegusi",
    description: "Melon seed soup with leafy vegetables and assorted meat",
    price: 2800,
    image: "/images/meal.png",
    time: 35,
    rating: 4.5
  },
  {
    id: 17,
    vendorId: 17,
    name: "Isi Ewu",
    description: "Spicy goat head delicacy popular in Eastern Nigeria",
    price: 3500,
    image: "/images/meal.png",
    time: 45,
    rating: 4.5
  },
  {
    id: 18,
    name: "Ukodo",
    description: "Yam and unripe plantain pottage with goat meat",
    price: 2400,
    image: "/images/meal.png",
    time: 40,
    rating: 4.5
  },
  {
    id: 19,
    name: "Ofe Nsala (White Soup)",
    description: "Light soup made with catfish, popular in Eastern Nigeria",
    price: 3000,
    image: "/images/meal.png",
    time: 35,
    rating: 4.5
  },
  {
    id: 20,
    name: "Kuli Kuli",
    description: "Crunchy groundnut snack, popular in Northern Nigeria",
    price: 800,
    image: "/images/meal.png",
    time: 5,
    rating: 4.5
  },
  {
    id: 21,
    name: "Gbegiri and Ewedu",
    description: "Bean soup and ewedu served with amala",
    price: 2200,
    image: "/images/meal.png",
    time: 30,
    rating: 4.5
  },
  {
    id: 22,
    name: "Afang Soup",
    description: "Vegetable soup from Akwa Ibom, served with fufu",
    price: 3000,
    image: "/images/meal.png",
    time: 40,
    rating: 4.5
  },
  {
    id: 23,
    name: "Fisherman Soup",
    description: "Spicy seafood soup, popular in the coastal regions",
    price: 3500,
    image: "/images/meal.png",
    time: 45,
    rating: 4.5
  },
  {
    id: 24,
    name: "Gurasa",
    description: "Flat bread from Northern Nigeria, often served with soup",
    price: 1000,
    image: "/images/meal.png",
    time: 20,
    rating: 4.5
  },
  {
    id: 25,
    name: "Ikokore",
    description: "Water yam pottage, a delicacy from Ijebu",
    price: 2000,
    image: "/images/meal.png",
    time: 35,
    rating: 4.5
  },
  {
    id: 26,
    name: "Ofada Stew",
    description: "Spicy stew made with locust beans, served with ofada rice",
    price: 2800,
    image: "/images/meal.png",
    time: 40,
    rating: 4.5
  },
  {
    id: 27,
    name: "Kunun Aya",
    description: "Refreshing tiger nut drink",
    price: 700,
    image: "/images/meal.png",
    time: 10,
    rating: 4.5
  },
  {
    id: 28,
    name: "Zobo Drink",
    description: "Refreshing drink made from hibiscus leaves",
    price: 500,
    image: "/images/meal.png",
    time: 5,
    rating: 4.5
  },
  {
    id: 29,
    name: "Suya Spaghetti",
    description: "Spaghetti infused with suya spices and grilled beef",
    price: 2200,
    image: "/images/meal.png",
    time: 25,
    rating: 4.5
  },
  {
    id: 30,
    name: "Dundun (Fried Yam)",
    description: "Crispy fried yam cubes served with spicy sauce",
    price: 1200,
    image: "/images/meal.png",
    time: 15,
    rating: 4.5
  }
];
