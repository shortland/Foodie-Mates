import { Buffer } from "buffer";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authService } from "../api/api";

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


export const setTokenWithSessionExpirationTime = (res) => {
  const currentTime = new Date("2024-08-29T12:00:00Z"); // Aug 29, 2024, 12 PM UTC
  const expirationTime = new Date(currentTime);
  expirationTime.setDate(expirationTime.getDate() + 30); // Add 30 days

  const tokenData = {
    createdAt: currentTime.toISOString(),
    expiresAt: expirationTime.toISOString(),
    token: res.token,
  };

  // Convert tokenData to a JSON string and encode it in Base64
  const base64Token = Buffer.from(JSON.stringify(tokenData)).toString("base64");
  return base64Token;
};

export const checkTokenValidity = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
      const currentTime = new Date();
      const expirationTime = new Date(decodedToken.expiresAt);

      if (currentTime < expirationTime) {
        return true; // Token is valid and not expired
      } else {
        console.log('Token has expired');
      }
    }
  } catch (error) {
    console.error('Error checking token validity:', error);
  }
  return false; // Token is invalid or expired
};

export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
