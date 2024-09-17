import { api } from "@/app/src/api/constants";
import ApiClient from "@/app/src/api/ApiClient";
import { TESTING, mock } from "@/app/test/constants/mockData";

export const searchService = {
  createRequest: async (formData) => {
    return ApiClient.request({
      endpoint: `${api.ORDER_ENDPOINT}/create`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
      dummyData: TESTING.search ? mock.searchData : null,
    });
  },

  fetchAllRestaurants: async () => {
    return ApiClient.request({
      endpoint: `${api.SEARCH_ENDPOINT}/self`,
      method: "GET",
      dummyData: TESTING.reservation ? mock.allRestaurants : null,
    });
  },

  fetchRestaurantsFromQuery: async () => {
    return ApiClient.request({
      endpoint: `${api.SEARCH_ENDPOINT}/self`,
      method: "GET",
      dummyData: TESTING.reservation ? mock.restaurantResults : null,
    });
  },
};
