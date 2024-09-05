export const TESTING = {
  auth: true,
  profile: true,
  create: true,
  order: true,
};

import signInData from "@/app/test/screens/auth/api/signin.json";
import signOutData from "@/app/test/screens/auth/api/signout.json";
import profileData from "@/app/test/screens/auth/api/profileData.json"
import signUpData from "@/app/test/screens/auth/api/signup.json";
import createData from "@/app/test/screens/tabs/screens/search/api/createRequest.json";
import orderData from "@/app/test/screens/tabs/screens/order/api/orders.json";
import cancelData from "@/app/test/screens/tabs/screens/order/api/cancel.json";

export const mock = {
  signInData,
  signOutData,
  profileData,
  signUpData,
  createData,
  orderData,
  cancelData,
};
