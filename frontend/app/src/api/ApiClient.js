import { api } from "./constants";
import Session from "../screens/auth/util/Session";

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request({ endpoint, method = "GET", headers = {}, body = null, dummyData = null, useSession = true }) {
    if (dummyData) {
      return new Promise((resolve) => resolve(dummyData));
    }

    try {
      const sessionId = useSession ? await Session.getSessionId() : null;

      const defaultHeaders = {
      };

      if (sessionId) {
        defaultHeaders.Cookie = `SESSION_ID=${sessionId}`;
      }

      const config = {
        method,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        body: method !== "GET" && body ? body : null,
      };
      
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Request failed with status ${response.status}: ${
            errorData.error || "Unexpected error."
          }`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error in API request: ${error.message}`);
      throw error;
    }
  }
}

export default new ApiClient(api.BASE);
