import { TESTING, mock } from "@/app/test/constants/mockData";
import ApiClient from "@/app/src/api/ApiClient";
import { api } from "@/app/src/api/constants";

export const createService = {
  createRequest: async (formData) => {
    return ApiClient.request({
      endpoint: `${api.ORDER_ENDPOINT}/create`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
      dummyData: TESTING.create ? mock.createData : null,
    });
  },
};
