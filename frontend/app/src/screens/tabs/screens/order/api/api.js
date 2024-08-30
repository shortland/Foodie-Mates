import AsyncStorage from "@react-native-async-storage/async-storage";
import { TESTING, mock } from "@/app/test/constants/mockData";
import { api } from "@/app/src/constants/api";

// Define the API URL for fetching user orders
const ORDER_API_URL = api.BASE + "/auctions/user/self";

export const orderService = {
  fetchUserOrders: async () => {
    if (TESTING.order) {
      // Return dummy data when testing
      return new Promise((resolve) => {
        resolve(mock.dummyOrderData);
      });
    } else {
      try {
        // Retrieve the SESSION_ID from AsyncStorage
        const userData = await AsyncStorage.getItem("user");
        const sessionId = userData
          ? JSON.parse(userData).data.SESSION_ID
          : null;

        if (!sessionId) {
          throw new Error("No session ID found");
        }

        // Make the API request to get the user's orders
        const response = await fetch(ORDER_API_URL, {
          method: "GET",
          headers: {
            Cookie: `SESSION_ID=${sessionId}`, // Include the SESSION_ID in the cookie header
          },
        });

        // Check if the response was successful
        if (!response.ok) {
          throw new Error("Failed to fetch user orders");
        }

        // Parse the JSON response
        const data = await response.json();

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
};
