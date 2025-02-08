import Axios from 'axios';

const backend = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  maxBodyLength: Infinity,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const storage = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_STORAGE_URL,
  maxBodyLength: Infinity,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { backend, storage };
