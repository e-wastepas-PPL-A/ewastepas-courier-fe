/* eslint-disable no-undef */
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from "../constant";

// const API_URL = "https://ewastepas-courier-be-221967358257.asia-southeast2.run.app/api";

export async function login(payload) {
  return await axios.post(`${API_URL}auth/login`, payload).then((response) => {
    Cookies.set("SSID", response.data.token, {
      expires: 0.25,
      secure: true,
    }); 
    window.location = "/";
  }).catch((error) => {
    return error.response ? error.response.data : error;
  });
}

export async function registration(payload) {
  return await axios
    .post(`${API_URL}auth/registration`, payload)
    .catch((error) => {
      return error;
    });
}

export async function verifyOtp(payload) {
  return await axios
    .post(`${API_URL}auth/verify-otp`, payload)
    .catch((error) => {
      return error;
    });
}

export async function sendOtp(payload) {
  return await axios
    .post(`${API_URL}auth/send-otp`, payload)
    .catch((error) => {
      return error;
    });
}

export async function changeForgot(payload, token) {
  try {
    const response = await axios.patch(
      `${API_URL}auth/forgot-password`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Error in changePassword:",
      error.response ? error.response.data : error.message
    );
    return error.response || error;
  }
}

export async function changePassword(payload, token) {
  try {
    const response = await axios.patch(`${API_URL}users/change-password`, payload, {
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
    const response = await axios.patch(`${API_URL}users`, formData, {
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
    window.location = `${API_URL}auth/google`;
  } catch (error) {
    console.error(
      "Error in changePassword:",
      error.response ? error.response.data : error.message
    );
    return error.response || error;
  }
}

export async function callbackHandler(code) {
  return await axios
    .get(`${API_URL}auth/google/callback?code=${code}`)
    .catch((error) => {
      return error;
    });
}

export async function getUsers() {
  // Retrieve the SSID cookie
  const token = Cookies.get("SSID");

  // Add the Authorization header with the token
  return await axios
    .get(`${API_URL}users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      return error;
    });
}

export async function getWasteLists(pageNumber) {
  return await axios
    .get(`${API_URL}waste?page=${pageNumber}`)
    .catch((error) => {
      return error;
    });
}

export async function getWasteType() {
  return await axios.get(`${API_URL}waste/types`).catch((error) => {
    return error;
  });
}

export async function searchWaste(search) {
  return await axios
    .get(`${API_URL}waste/search?name=${search}`)
    .catch((error) => {
      return error;
    });
}

export async function getDropbox() {
  return await axios.get(`${API_URL}dropbox`).catch((error) => {
    return error;
  });
}

export async function getAllPickup() {
  return await axios.get(`${API_URL}pickup?limit=10000`).catch((error) => {
    return error;
  });
}

export async function getTotalCourier(id) {
  return await axios
    .get(`${API_URL}pickup/courier/${id}/totals`)
    .catch((error) => {
      return error;
    });
}

export async function getHistoryCourier() {
  return await axios
    .get(`${API_URL}pickup/courier/history`)
    .catch((error) => {
      return error;
    });
}

export async function getWasteById(id) {
  return await axios.get(`${API_URL}waste/${id}`).catch((error) => {
    return error;
  });
}

export async function patchAcceptPickup(pickupId, courierId) {
  return await axios
    .patch(`${API_URL}pickup/${pickupId}/accept?courierId=${courierId}`)
    .catch((error) => {
      return error;
    });
};

export async function patchCancelPickup(pickupId, courierId, reason) {
  return await axios
    .patch(`${API_URL}pickup/${pickupId}/cancel?courierId=${courierId}`, {
      reason: reason,
    })
    .catch((error) => {
      return error;
    });
};

export async function patchCompletePickup(pickupId) {
  return await axios
    .patch(`${API_URL}pickup/${pickupId}/complete`)
    .catch((error) => {
      return error;
    });
}