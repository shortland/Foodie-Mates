import { authService } from "./api/api";

export const signIn = async (email, password) => {
  try {
    const response = await authService.signInWithEmailAndPassword(
      email,
      password
    );
    return response;
  } catch (error) {
    // Handle errors
    console.error("Error signing in:", error);
    throw error; // rethrow the error for the caller to handle
  }
};

export const signUp = async (email, password, userName) => {
  try {
    const response = await authService.signUpWithEmailAndPassword(
      email,
      password,
      userName
    );
    return response;
  } catch (error) {
    // Handle errors
    console.error("Error signing in:", error);
    throw error; // rethrow the error for the caller to handle
  }
};
