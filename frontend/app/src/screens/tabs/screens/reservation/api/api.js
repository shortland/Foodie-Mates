import { TESTING, mock } from "@/app/test/constants/mockData";
import ApiClient from "@/app/src/api/ApiClient";
import { api } from "@/app/src/api/constants";

export const reservationService = {
  fetchUserOrders: async () => {
    return ApiClient.request({
      endpoint: `${api.ORDER_ENDPOINT}/self`,
      method: "GET",
      dummyData: TESTING.reservation ? mock.orderData : null,
    });
  },

  fetchUserReservations: async () => {
    return ApiClient.request({
      endpoint: `${api.RESERVATIONS_ENDPOINT}/self`,
      method: "GET",
      dummyData: TESTING.reservation ? mock.reservationsData : null,
    });
  },

  cancelReservation: async (requestId) => {
    return ApiClient.request({
      endpoint: `${api.ORDER_ENDPOINT}/cancel`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: requestId }),
      dummyData: TESTING.reservation ? mock.cancelData : null,
    });
  },
};
