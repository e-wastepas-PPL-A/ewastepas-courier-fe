/* eslint-disable no-undef */
import axios from 'axios';
import Cookies from 'js-cookie';


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

export async function getUsers() {
    // Retrieve the PHPSESSID cookie
    const token = Cookies.get('PHPSESSID');
  
    console.log(token);
  
    // Add the Authorization header with the token
    return await axios
      .get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch((error) => {
        return error;
      });
  }
  