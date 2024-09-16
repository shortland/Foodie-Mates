import { api } from "@/app/src/api/constants";
import ApiClient from "@/app/src/api/ApiClient";
import { TESTING, mock } from "@/app/test/constants/mockData";

export const resultsService = {
  getRestaurantResults: async () => {
    return ApiClient.request({
      endpoint: `${api.RESULTS_ENDPOINT}/results`,
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      useSession: true,
      dummyData: TESTING.results ? mock.restaurantResultsData : null,
    });
  },

};
