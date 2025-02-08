export const APP_NAME = "Fast Buka";
export const API_ENDPOINTS = {
  LOGIN: "https://dev.fastbuka.com/api/v1/auth/login",
  REGISTER: "https://dev.fastbuka.com/api/v1/vendor",
  UPDATE_PROFILE: "https://dev.fastbuka.com/api/v1/vendor",
  VERIFY_TOKEN: "https://dev.fastbuka.com/api/v1/auth/verify-token",
  LOGOUT: "https://dev.fastbuka.com/api/v1/auth/logout",
  ALL_ACCOUNTS: "https://dev.fastbuka.com/api/v1/vendor",

  // Food and Category
  ADD_FOOD: "https://dev.fastbuka.com/api/v1/food",
  CATEGORY_IMAGE: "https://storage.fastbuka.com/api/v1/storage",
  ALL_CATEGORY: "https://dev.fastbuka.com/api/v1/category",
  ALL_FOOD: "https://dev.fastbuka.com/api/v1/food",
  DELETE_FOOD: "https://dev.fastbuka.com/api/v1/food",

  // Orders
  ALL_ORDERS: "https://dev.fastbuka.com/api/v1/order/vendor",
};

export const TOKEN_PRICING = {
  pricePerToken: 100, // in Naira
  currency: "NGN",
};

// nigeriaStates.js

export const NIGERIA_STATE_WITH_CITY = [
  {
    state: "Abia",
    city: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Isiala Ngwa"],
  },
  {
    state: "Adamawa",
    city: ["Yola", "Mubi", "Numan", "Jimeta", "Ganye"],
  },
  {
    state: "Akwa Ibom",
    city: ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"],
  },
  {
    state: "Anambra",
    city: ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Obosi"],
  },
  {
    state: "Bauchi",
    city: ["Bauchi", "Azare", "Misau", "Jama'are", "Ningi"],
  },
  {
    state: "Bayelsa",
    city: ["Yenagoa", "Ogbia", "Brass", "Sagbama", "Ekeremor"],
  },
  {
    state: "Benue",
    city: ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Vandeikya"],
  },
  {
    state: "Borno",
    city: ["Maiduguri", "Biu", "Damboa", "Gwoza", "Kukawa"],
  },
  {
    state: "Cross River",
    city: ["Calabar", "Ikom", "Obudu", "Ogoja", "Ugep"],
  },
  {
    state: "Delta",
    city: ["Asaba", "Warri", "Sapele", "Ughelli", "Oleh"],
  },
  {
    state: "Ebonyi",
    city: ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ishielu"],
  },
  {
    state: "Edo",
    city: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Irrua"],
  },
  {
    state: "Ekiti",
    city: [
      "Ado Ekiti",
      "Ikere Ekiti",
      "Ilawe Ekiti",
      "Oye Ekiti",
      "Ikole Ekiti",
    ],
  },
  {
    state: "Enugu",
    city: ["Enugu", "Nsukka", "Oji River", "Udi", "Awgu"],
  },
  {
    state: "Gombe",
    city: ["Gombe", "Kaltungo", "Billiri", "Bajoga", "Dukku"],
  },
  {
    state: "Imo",
    city: ["Owerri", "Orlu", "Okigwe", "Mbaise", "Oguta"],
  },
  {
    state: "Jigawa",
    city: ["Dutse", "Hadejia", "Gumel", "Ringim", "Kazaure"],
  },
  {
    state: "Kaduna",
    city: ["Kaduna", "Zaria", "Kafanchan", "Saminaka", "Birnin Gwari"],
  },
  {
    state: "Kano",
    city: ["Kano", "Wudil", "Rano", "Gwarzo", "Dawakin Kudu"],
  },
  {
    state: "Katsina",
    city: ["Katsina", "Daura", "Funtua", "Malumfashi", "Kankia"],
  },
  {
    state: "Kebbi",
    city: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Koko"],
  },
  {
    state: "Kogi",
    city: ["Lokoja", "Okene", "Idah", "Kabba", "Ankpa"],
  },
  {
    state: "Kwara",
    city: ["Ilorin", "Offa", "Lafiagi", "Jebba", "Omu-Aran"],
  },
  {
    state: "Lagos",
    city: ["Ikeja", "Surulere", "Victoria Island", "Epe", "Badagry"],
  },
  {
    state: "Nasarawa",
    city: ["Lafia", "Keffi", "Akwanga", "Doma", "Nasarawa"],
  },
  {
    state: "Niger",
    city: ["Minna", "Bida", "Kontagora", "Suleja", "Agaie"],
  },
  {
    state: "Ogun",
    city: ["Abeokuta", "Ijebu Ode", "Sagamu", "Ota", "Ilaro"],
  },
  {
    state: "Ondo",
    city: ["Akure", "Owo", "Ondo", "Ikare", "Okitipupa"],
  },
  {
    state: "Osun",
    city: ["Osogbo", "Ilesa", "Ife", "Ede", "Ikirun"],
  },
  {
    state: "Oyo",
    city: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin", "Saki"],
  },
  {
    state: "Plateau",
    city: ["Jos", "Bukuru", "Pankshin", "Shendam", "Bokkos"],
  },
  {
    state: "Rivers",
    city: ["Port Harcourt", "Obio-Akpor", "Bonny", "Okrika", "Degema"],
  },
  {
    state: "Sokoto",
    city: ["Sokoto", "Tambuwal", "Gwadabawa", "Bodinga", "Wurno"],
  },
  {
    state: "Taraba",
    city: ["Jalingo", "Wukari", "Bali", "Mutum Biyu", "Takum"],
  },
  {
    state: "Yobe",
    city: ["Damaturu", "Potiskum", "Gashua", "Geidam", "Nguru"],
  },
  {
    state: "Zamfara",
    city: ["Gusau", "Kaura Namoda", "Talata Mafara", "Maru", "Anka"],
  },
  {
    state: "Federal Capital Territory",
    city: ["Abuja"],
  },
];
