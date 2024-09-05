import AsyncStorage from "@react-native-async-storage/async-storage";
import { profile } from "../constants";

class Profile {
  static async saveUserData(key, userData) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }

  static async getProfileData() {
    try {
      const profileData = await AsyncStorage.getItem(profile.info);
      return profileData ? JSON.parse(profileData) : null;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      throw error;
    }
  }

  static async getAccountType() {
    try {
      const profileData = await AsyncStorage.getItem(profile.info);
      const { data } = JSON.parse(profileData);
      if (data && data.account_type) {
        return data.account_type;
      } else {
        throw new Error("No account type data found");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
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
