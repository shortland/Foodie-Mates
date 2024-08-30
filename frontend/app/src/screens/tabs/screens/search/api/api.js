import { api } from "@/app/src/constants/api";
import { getSessionId } from "@/app/src/screens/auth/util/helpers";
import { TESTING, mock } from "@/app/test/constants/mockData";

const SEARCH_API_URL = api.BASE + "/auctions/user";

export const createService = {
  createRequest: async (formData) => {
    if (TESTING.create) {
      return new Promise((resolve) => {
        resolve(mock.dummyCreateData);
      });
    } else {
      try {
        const sessionId = await getSessionId();

        if (!sessionId) {
          throw new Error("No session ID found");
        }

        const response = await fetch(SEARCH_API_URL + "/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: `SESSION_ID=${sessionId}`,
          },
          body: new URLSearchParams(formData).toString(),
        });

        // Check if the response was successful
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            "Request creation failed. " +
              (errorData.error || "Unexpected error.")
          );
        }

        // Parse the JSON response
        const data = await response.json();

        // Check if the request creation was successful according to the response data
        if (!data.data || !data.data.success) {
          throw new Error(
            "Request creation failed. " + (data.error || "Unexpected error.")
          );
        }

        // Return the response data
        return data;
      } catch (error) {
        console.error("Error in createRequest:", error);
        throw error; // Rethrow the error for higher-level handling
      }
    }
  },
};
