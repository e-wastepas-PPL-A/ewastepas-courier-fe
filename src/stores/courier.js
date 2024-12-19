import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../constant";
import Cookies from 'js-cookie';

export const useCourier = create((set) => ({
  // state
  user: {}, // Data pengguna
  userDummy: {
    courier_id: 1,
    name: "Agung",
    email: "znfifty@gmail.com",
    password: "$2b$10$V8MtEpj5mKqUy8QuZUy9m.gVnwFr8lFcOWA0LHG0vZnyFz6tpnu/q",
    phone: null,
    date_of_birth: null,
    address: null,
    account_number: null,
    nik: null,
    ktp_url: null,
    kk_url: null,
    photo: null,
    is_verified: true,
    status: "Pending",
    otp_code: null,
    otp_expiry: null,
    created_at: "2024-11-05T15:02:33.000Z",
    updated_at: "2024-11-05T15:02:33.000Z",
  },
  loading: false, // Status loading

  // actions
  setUsers: (user) => set(() => ({ user })), // Memperbarui state users

  getUsers: async () => {
    try {
      set(() => ({ loading: true })); // Aktifkan loading
      const token = Cookies.get("PHPSESSID");
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      });
      const user = response?.data?.courier; // Ambil data pengguna dari respon API
      set(() => ({ user, loading: false })); // Perbarui state dengan data pengguna
      return response; // Kembalikan data pengguna
    } catch (error) {
      console.error("[error] function:getUsers", error); // Log kesalahan
      set(() => ({ loading: false })); // Matikan loading jika terjadi kesalahan
      throw error; // Lempar kesalahan agar bisa ditangani di tempat pemanggilan
    }
  },
}));
