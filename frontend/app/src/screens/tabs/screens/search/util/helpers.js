import { createService } from "../api/api";

export const createRequest = async (formData) => {
    try {
      // Call the API to create the request using the passed form data
      const response = await createService.createRequest(formData);
      return response;
    } catch (error) {
      // Handle errors
      console.error("Error creating request:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };