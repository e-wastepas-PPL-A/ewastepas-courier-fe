import axios from "axios";

// eslint-disable-next-line no-undef
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registration(payload) {
  return await axios.post(`${BASE_URL}/auth/registration`, payload).catch((error) => {
    return error;
  });
}

export async function verifyOtp(payload) {
  return await axios.post(`${BASE_URL}/auth/verify-otp`, payload).catch((error) => {
    return error;
  });
}