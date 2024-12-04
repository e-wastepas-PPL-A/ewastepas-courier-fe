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

export async function sendOtp(payload) {
  return await axios.post(`${BASE_URL}/auth/send-otp`, payload).catch((error) => {
    return error;
  });
}

export async function changePassword(payload, token) {
  try {
    const response = await axios.patch(`${BASE_URL}/auth/forgot-password`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error in changePassword:", error.response ? error.response.data : error.message);
    return error.response || error;
  }
}

export async function updateUser(payload, token) {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      formData.append(key, payload[key]);
    });
    const response = await axios.patch(`${BASE_URL}/users`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error("Error in updateUser:", error.response ? error.response.data : error.message);
    return error.response || error;
  }
}

export async function oauthHandler() {
  try {
    window.location = `${BASE_URL}/auth/google`
  } catch (error) {
    console.error("Error in changePassword:", error.response ? error.response.data : error.message);
    return error.response || error;
  }
}

export async function callbackHandler(code) {
  return await axios.get(`${BASE_URL}/auth/google/callback?code=${code}`).catch((error) => {
    return error;
  });
}

export async function getUsers() {
    // Retrieve the PHPSESSID cookie
    const token = Cookies.get('PHPSESSID');
  
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
  

export async function getWasteLists(pageNumber) {
  return await axios.get(`${BASE_URL}/waste?page=${pageNumber}`).catch((error) => {
    return error;
  });
}

export async function getWasteType() {
  return await axios.get(`${BASE_URL}/waste/types`).catch((error) => {
    return error;
  });
};

export async function searchWaste(search) {
  return await axios
    .get(`${BASE_URL}/waste/search?name=${search}`)
    .catch((error) => {
      return error;
    });
}