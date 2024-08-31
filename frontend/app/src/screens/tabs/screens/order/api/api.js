import { TESTING, mock } from "@/app/test/constants/mockData";
import ApiClient from "@/app/src/api/ApiClient";
import { api } from "@/app/src/api/constants";

export const orderService = {
  fetchUserOrders: async () => {
    return ApiClient.request({
      endpoint: `${api.ORDER_ENDPOINT}/self`,
      method: "GET",
      dummyData: TESTING.order ? mock.dummyOrderData : null,
    });
  },

  cancelOrder: async (requestId) => {
    return ApiClient.request({
      endpoint: `${api.ORDER_ENDPOINT}/cancel`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: requestId }),
      dummyData: TESTING.order ? mock.dummyCancelData : null,
    });
  },
};
