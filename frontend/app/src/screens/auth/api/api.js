import { api } from "@/app/src/api/constants";
import ApiClient from "@/app/src/api/ApiClient";
import { TESTING, mock } from "@/app/test/constants/mockData";

export const authService = {
  signInWithEmailAndPassword: async (email, password) => {
    return ApiClient.request({
      endpoint: `${api.AUTH_ENDPOINT}/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }).toString(),
      useSession: false,
      dummyData: TESTING.auth ? mock.dummySignInData : null,
    });
  },

  signUpWithEmailAndPassword: async (
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    accountType
  ) => {
    return ApiClient.request({
      endpoint: `${api.AUTH_ENDPOINT}/register`,
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
      useSession: false,
      dummyData: TESTING.auth ? mock.dummySignUpData : null,
    });
  },
};
