import axios from "axios";
import jwtDecode from "jwt-decode";
import { removeTokens } from "../helper";

const prod = !true;

// Outside your interceptor code, define a flag to track token refresh state
let isRefreshing = false;

const API_URL = prod
  ? "https://lb-back-ny93z7xqs-abolajii.vercel.app/api"
  : "http://localhost:6600";

const LMNoAuth = axios.create({
  baseURL: API_URL,
});

const LMAuth = axios.create({
  baseURL: API_URL,
});

// Assuming you have a function to get the access token from storage
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const refreshThreshold = 60; // Time in seconds

LMAuth.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return;
    }
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      const remainingTime = decodedToken.exp - currentTime;

      if (remainingTime < refreshThreshold && !isRefreshing) {
        isRefreshing = true; // Set the flag to indicate token refresh in progress
        try {
          const refreshToken = getRefreshToken();
          const response = await LMAuth.post("/valid-token", {
            refreshToken,
          });

          if (response.data.valid) {
            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);

            // Reset the flag after successful token refresh
            isRefreshing = false;
          }
        } catch (error) {
          // Handle error if token refresh fails
          // Handle error
          isRefreshing = false; // Reset the flag on error
          removeTokens();
        }
      }

      // Attach the access token to the request headers
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { LMAuth, LMNoAuth };
