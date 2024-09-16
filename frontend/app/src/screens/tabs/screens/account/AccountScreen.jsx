import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { authService } from "../../../auth/api/api";
import Profile from "@/app/src/utils/Profile/Profile";

/**
 * Generates a random avatar URL from Random User Generator.
 * Picks a random number between 1 and 99 and inserts it into the URL.
 *
 * @returns {string} The complete URL for a random avatar image.
 */
const getRandomAvatarUrl = () => {
  const randomNumber = Math.floor(Math.random() * 99) + 1; // Generates a number between 1 and 99
  return `https://randomuser.me/portraits/men/${randomNumber}.jpg`;
};

export default function AccountScreen() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // State to hold the avatar URL

  useEffect(() => {
    // Fetch user data and set avatar URL
    const loadUserData = async () => {
      try {
        const { data } = await Profile.getProfileData();
        if (data) {
          setUser(`${data.first_name} ${data.last_name}`);
          setAvatarUrl(getRandomAvatarUrl()); // Set a random avatar URL
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    loadUserData();
  }, []);

  /**
   * Handles user sign out.
   * Clears user data and navigates to the home or login screen.
   */
  async function handleSignOut() {
    try {
      await Profile.clearUserData();
      await authService.signOut();
      router.replace("/"); // Navigate to Home or Login screen after sign out
    } catch (error) {
      Alert.alert(
        "Sign out failed",
        "There was an error signing out. Please try again."
      );
    }
  }

  // Cleaned and Enhanced SETTINGS_OPTIONS
  const SETTINGS_OPTIONS = [
    {
      key: "profile",
      title: "Profile",
      icon: "person-outline",
      action: () => router.push("/profile"), // Navigate to Profile screen
    },
    {
      key: "preferences",
      title: "Preferences",
      icon: "settings-outline",
      action: () => router.push("/preferences"), // Navigate to Preferences screen
    },
    {
      key: "notifications",
      title: "Notifications",
      icon: "notifications-outline",
      action: () => router.push("/notifications"), // Navigate to Notifications screen
    },
    {
      key: "privacy",
      title: "Privacy",
      icon: "lock-closed-outline",
      action: () => router.push("/privacy"), // Navigate to Privacy screen
    },
    {
      key: "contact",
      title: "Contact",
      icon: "call-outline",
      action: () => router.push("/contact"), // Navigate to Contact screen
    },
    {
      key: "signout",
      title: "Log Out",
      icon: "log-out-outline",
      action: () => handleSignOut(), // Trigger sign out
    },
  ];

  /**
   * Renders each setting option as a touchable list item.
   *
   * @param {object} item - The setting option item.
   * @returns {JSX.Element} The rendered list item component.
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={item.action}
      style={styles.optionContainer}
      activeOpacity={0.7} // Provides visual feedback on press
      accessibilityLabel={`${item.title} button`} // Accessibility label
    >
      <Ionicons name={item.icon} size={24} color="#333" style={styles.icon} />
      <Text style={styles.optionText}>{item.title}</Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color="#ccc"
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );

  /**
   * Renders a separator between list items.
   *
   * @returns {JSX.Element} The separator component.
   */
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>{user}</Text>
            <Text style={styles.subHeaderText}>Account Settings</Text>
          </View>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={styles.avatar}
              accessibilityLabel={`${user}'s avatar`}
            />
          ) : (
            <Ionicons name="person-circle" size={64} color="#a6a6a6" />
          )}
        </View>

        {/* Settings Options List */}
        <FlatList
          data={SETTINGS_OPTIONS}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Light background to match the theme
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Light background
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between name and avatar
    marginBottom: 30, // Space below the header
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Dark text for visibility
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32, // Makes the image circular
    backgroundColor: "#e0e0e0", // Fallback background color
  },
  listContainer: {
    paddingVertical: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8", // Light grey background for options
    borderRadius: 10,
  },
  icon: {
    marginRight: 15,
    color: "#333", // Darker icon color for better visibility
  },
  chevronIcon: {
    marginLeft: "auto", // Pushes the chevron to the far right
  },
  optionText: {
    fontSize: 18,
    color: "#333", // Dark text to match the light theme
    fontWeight: "500",
  },
  separator: {
    height: 10, // Space between items
  },
});