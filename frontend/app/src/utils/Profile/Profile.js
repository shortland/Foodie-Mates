import AsyncStorage from "@react-native-async-storage/async-storage";
import { profile } from "./constants";

class Profile {
  static async saveUserData(key, userData) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }

  static async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(profile.userData);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  static async clearUserData() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing user data:", error);
      throw error;
    }
  }
}

export default Profile;
