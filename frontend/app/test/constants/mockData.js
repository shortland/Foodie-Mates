export const TESTING = {
  auth: true,
  profile: true,
  create: true,
  order: true,
  results: true,
};

// auth
import signInData from "@/app/test/screens/auth/api/signin.json";
import signUpData from "@/app/test/screens/auth/api/signup.json";
import signOutData from "@/app/test/screens/auth/api/signout.json";

// profile
import profileData from "@/app/test/screens/auth/api/profileData.json";

// create
import createData from "@/app/test/screens/tabs/screens/search/api/createRequest.json";

// order
import orderData from "@/app/test/screens/tabs/screens/order/api/orders.json";
import cancelData from "@/app/test/screens/tabs/screens/order/api/cancel.json";

// results
import restaurantResultsData from "@/app/test/screens/tabs/screens/home/person/api/restaurantResults.json";

export const mock = {
  signInData,
  signOutData,
  profileData,
  signUpData,
  createData,
  orderData,
  cancelData,
  restaurantResultsData,
};
