/* eslint-disable no-undef */
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export async function login(payload) {
  return await axios.post(`${BASE_URL}/auth/login`, payload).catch((error) => {
    return error;
  });
}

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

export async function changePassword(payload) {
  return await axios.post(`${BASE_URL}/auth/verify-otp`, payload).catch((error) => {
    return error;
  });
}