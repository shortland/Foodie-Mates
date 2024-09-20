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
import restaurantResults from "@/app/test/screens/tabs/screens/search/api/restaurantResults.json";
import allRestaurants from "@/app/test/screens/tabs/screens/search/api/allRestaurants.json";
import formData from "@/app/test/screens/tabs/screens/search/api/searchFormBody.json";

// reservation
import orderData from "@/app/test/screens/tabs/screens/reservation/api/orders.json";
import cancelData from "@/app/test/screens/tabs/screens/reservation/api/cancel.json";
import reservationsData from "@/app/test/screens/tabs/screens/reservation/api/reservations.json";
import reservationInfo from "@/app/test/screens/tabs/screens/reservation/api/reservation-info.json";

// results
import restaurantResultsData from "@/app/test/screens/tabs/screens/home/person/api/restaurantResults.json";

export const mock = {
  signInData,
  signOutData,
  profileData,
  signUpData,
  searchData,
  formData,
  orderData,
  cancelData,
  reservationsData,
  reservationInfo,
  restaurantResults,
  allRestaurants,
  restaurantResultsData,
};
