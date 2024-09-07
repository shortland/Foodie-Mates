export const TESTING = {
  auth: true,
  profile: true,
  search: true,
  reservation: true,
  results: true,
};

// auth
import signInData from "@/app/test/screens/auth/api/signin.json";
import signUpData from "@/app/test/screens/auth/api/signup.json";
import signOutData from "@/app/test/screens/auth/api/signout.json";

// profile
import profileData from "@/app/test/screens/auth/api/profileData.json";

// search
import searchData from "@/app/test/screens/tabs/screens/search/api/searchRequest.json";

// order
import orderData from "@/app/test/screens/tabs/screens/order/api/orders.json";
import cancelData from "@/app/test/screens/tabs/screens/order/api/cancel.json";
import reservationsData from "@/app/test/screens/tabs/screens/order/api/reservations.json";
import restaurantResults from "@/app/test/screens/tabs/screens/order/api/restaurantResults.json";
import allRestaurants from "@/app/test/screens/tabs/screens/order/api/allRestaurants.json";

// results
import restaurantResultsData from "@/app/test/screens/tabs/screens/home/person/api/restaurantResults.json";

export const mock = {
  signInData,
  signOutData,
  profileData,
  signUpData,
  searchData,
  orderData,
  cancelData,
  reservationsData,
  restaurantResults,
  allRestaurants,
  restaurantResultsData,
};
