import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../Profile/Profile';

class Session {
  static async getSessionId() {
    try {
      const userData = await Profile.getUserData();
      return userData?.data?.SESSION_ID || null;
    } catch (error) {
      console.error("Error fetching session ID:", error);
      throw error;
    }
  }

  static setTokenWithSessionExpirationTime = async (token) => {
    const currentTime = new Date();
    const expirationTime = new Date(currentTime);
    expirationTime.setDate(expirationTime.getDate() + 30); // Add 30 days
  
    const tokenData = {
      createdAt: currentTime.toISOString(),
      expiresAt: expirationTime.toISOString(),
      token: token,
    };
  
    // Convert tokenData to a JSON string and encode it in Base64
    const base64Token = Buffer.from(JSON.stringify(tokenData)).toString("base64");
    await AsyncStorage.setItem("userToken", base64Token);
  };
  
  static checkTokenValidity = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const decodedToken = JSON.parse(
          Buffer.from(token, "base64").toString("utf8")
        );
        const currentTime = new Date();
        const expirationTime = new Date(decodedToken.expiresAt);
  
        if (currentTime < expirationTime) {
          return true; // Token is valid and not expired
        } else {
          console.log("Token has expired");
        }
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
    }
    return false; // Token is invalid or expired
  };

}

export default Session;