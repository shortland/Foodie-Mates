// WelcomeScreen.js
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/app/src/components/CustomButton";
import Loader from "@/app/src/components/Loader";
import images from "./src/constants/images";
import Session from "./src/utils/Session/Session";

export default function WelcomeScreen() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const sessionExists = await Session.checkTokenValidity();
      if (sessionExists) {
        setIsLogged(true);
      }
      setLoading(false); // Mark loading as complete
    };

    checkSession();
  }, []);

  if (!loading && isLogged) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Loader Component */}
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar for a cleaner look
      >
        <View style={styles.contentContainer}>
          {/* Top Section: Logo and Description */}
          <View style={styles.topSection}>
            {/* Logo Image */}
            <Image source={images.logo} style={styles.logo} resizeMode="contain" />

            {/* Main Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Discover Endless{"\n"}
                Possibilities with{" "}
                <Text style={styles.titleAccent}>FoodieMate</Text>
              </Text>

              {/* Decorative Path Image */}
              <Image
                source={images.path}
                style={styles.decorativePath}
                resizeMode="contain"
              />
            </View>

            {/* Subtitle */}
            <Text style={styles.subtitleText}>
              Satisfy Your Stomach & Wallet
            </Text>
          </View>

          {/* Button Section: Continue Button */}
          <View style={styles.buttonSection}>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles={styles.button}
            />
          </View>
        </View>
      </ScrollView>

      {/* Status Bar Configuration */}
      <StatusBar backgroundColor="#ffffff" style="dark" />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // White background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Center content vertically
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff", // White background for scroll content
  },
  contentContainer: {
    alignItems: "center",
  },
  topSection: {
    alignItems: "center",
    marginBottom: 30, // Space between top section and button
  },
  logo: {
    width: width * 0.6, // Responsive width (60% of screen width)
    height: width * 0.6, // Maintain square aspect ratio
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  titleText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333", // Dark text color
    textAlign: "center",
    lineHeight: 32,
  },
  titleAccent: {
    color: "#0a7ea4", // Primary blue for accent
  },
  decorativePath: {
    width: 136,
    height: 15,
    marginTop: 5,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555", // Medium gray for secondary text
    textAlign: "center",
    marginTop: 8,
  },
  buttonSection: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
});
