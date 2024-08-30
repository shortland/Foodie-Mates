// api.js
import { api } from "@/app/src/constants/api";
import { TESTING, mock } from "@/app/test/constants/mockData";

const AUTH_API_URL = api.BASE + api.auth;

export const authService = {
  signInWithEmailAndPassword: async (email, password) => {
    if (TESTING.auth) {
      // Return dummy data when testing
      return new Promise((resolve) => {
        resolve(mock.dummySignInData);
      });
    } else {
      try {
        // Make a POST request to the authentication API
        const response = await fetch(AUTH_API_URL + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: new URLSearchParams({
            username: email,
            password: password,
          }).toString(),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        // Parse the JSON response
        const data = await response.json();

        // Return the authentication data
        return data;
      } catch (error) {
        console.error("Error in signInWithEmailAndPassword:", error);
        throw error; // Rethrow the error for the caller to handle
      }
    }
  },

  signUpWithEmailAndPassword: async (
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    accountType
  ) => {
    if (TESTING.auth) {
      // Return dummy data when testing
      return new Promise((resolve) => {
        resolve(mock.dummySignUpData);
      });
    } else {
      try {
        // Make a POST request to the sign-up API
        const response = await fetch(AUTH_API_URL + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email_address: email,
            phone_number: phoneNumber,
            first_name: firstName,
            last_name: lastName,
            password: password,
            account_type: accountType,
          }).toString(),
        });
      
        // Check if the response was successful
        if (!response.ok) {
          // If the response status is not OK, throw an error
          const errorData = await response.json();
          throw new Error("Sign-up failed. " + (errorData.error || "Unexpected error."));
        }
      
        // If the response is OK, parse the response body
        const data = await response.json();
      
        // Check if the sign-up was successful according to the response data
        if (!data.data || !data.data.success) {
          throw new Error("Sign-up failed. " + (data.error || "Unexpected error."));
        }
      
        // Return the sign-up data
        return data;
      } catch (error) {
        console.error("Error in signUpWithEmailAndPassword:", error);
        throw error; // Rethrow the error for higher-level handling
      }
      
    }
  },
};
