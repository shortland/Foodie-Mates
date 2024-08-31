export const TESTING = {
  auth: false,
  create: false,
  order: false,
};

import dummySignInData from "@/app/test/screens/auth/api/signin.json";
import dummySignUpData from "@/app/test/screens/auth/api/signup.json";
import dummyCreateData from "@/app/test/screens/tabs/screens/search/api/createRequest.json";
import dummyOrderData from "@/app/test/screens/tabs/screens/order/api/orders.json";
import dummyCancelData from "@/app/test/screens/tabs/screens/order/api/cancel.json";

export const mock = {
  dummySignInData,
  dummySignUpData,
  dummyCreateData,
  dummyOrderData,
  dummyCancelData,
};
