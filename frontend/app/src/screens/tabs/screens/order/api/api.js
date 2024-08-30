import AsyncStorage from "@react-native-async-storage/async-storage";
import { TESTING, mock } from "@/app/test/constants/mockData";
import { api } from "@/app/src/constants/api";
import { getSessionId } from "@/app/src/screens/auth/util/helpers";

// Define the API URL for fetching user orders
const ORDER_API_URL = api.BASE + "/auctions/user";

export const orderService = {
  fetchUserOrders: async () => {
    if (TESTING.order) {
      // Return dummy data when testing
      return new Promise((resolve) => {
        resolve(mock.dummyOrderData);
      });
    } else {
      try {
        const sessionId = await getSessionId();

        if (!sessionId) {
          throw new Error("No session ID found");
        }

        // Make the API request to get the user's orders
        const response = await fetch(ORDER_API_URL + "/self", {
          method: "GET",
          headers: {
            Cookie: `SESSION_ID=${sessionId}`, // Include the SESSION_ID in the cookie header
          },
        });

        // Parse the JSON response
        const data = await response.json();

        // Check if the response was successful
        if (data.status !== 200) {
          throw new Error("Failed to fetch user orders");
        }

        // Check if the orders fetch was successful
        if (!data || !Array.isArray(data.data)) {
          throw new Error("Failed to fetch user orders. Unexpected response.");
        }

        // Return the fetched orders
        return data;
      } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error; // Rethrow the error for higher-level handling
      }
    }
  },
  cancelOrder: async (requestId) => {
    if (TESTING.order) {
      // Mock API doesn't handle deletion, so just resolve as a success
      return new Promise((resolve) => {
        resolve({ success: true });
      });
    } else {
      try {
        const sessionId = await getSessionId();

        if (!sessionId) {
          throw new Error("No session ID found");
        }

        const response = await fetch(ORDER_API_URL + "/cancel", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Cookie: `SESSION_ID=${sessionId}`,
          },
          body: JSON.stringify({ request_id: requestId }),
        });

        const data = await response.json();

        if (data.status !== 200) {
          throw new Error(
            "Failed to cancel the order. " + (data.error || "Unexpected error.")
          );
        }

        return data;
      } catch (error) {
        console.error("Error canceling the order:", error);
        throw error;
      }
    }
  },
};
