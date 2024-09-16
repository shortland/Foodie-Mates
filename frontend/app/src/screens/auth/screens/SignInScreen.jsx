// SignInScreen.js
import React, { useState, useRef } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, Image } from "react-native";

import images from "@/app/src/constants/images";
import FormField from "@/app/src/components/FormField";
import CustomButton from "@/app/src/components/CustomButton";

import Session from "../../../utils/Session/Session";
import { authService } from "../api/api";
import Loader from "@/app/src/components/Loader";

const SignInScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Refs for form fields
  const passwordRef = useRef(null);

  const submit = async () => {
    try {
      if (form.email === "" || form.password === "") {
        throw new Error("Please fill in all fields");
      }

      setSubmitting(true);

      const result = await authService.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      if (result.status == 200) {
        await Session.setTokenWithSessionExpirationTime(result.data.SESSION_ID);
        router.replace("/onboard");
      } else {
        throw new Error("Sign-in failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Loader Component */}
      <Loader isLoading={isSubmitting} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar for a cleaner look
      >
        <View style={styles.container}>
          {/* Logo Image */}
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />

          {/* Title */}
          <Text style={styles.title}>Log in to FoodieMate</Text>

          {/* Email Form Field */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()} // Focus on password field when "Next" is pressed
          />

          {/* Password Form Field */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
            ref={passwordRef} // Reference for password field
            returnKeyType="done"
            onSubmitEditing={submit} // Trigger submit when "Done" is pressed
            secureTextEntry // Hide password input
          />

          {/* Sign In Button */}
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link
              href="/sign-up"
              style={styles.signupLink}
              accessibilityLabel="Navigate to Signup screen"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // White background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff", // White background for scroll content
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 168,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333", // Dark text color
    marginTop: 20,
    textAlign: "center",
  },
  formField: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    marginTop: 30,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#555", // Medium gray for secondary text
    fontWeight: "400",
  },
  signupLink: {
    fontSize: 16,
    color: "#0a7ea4", // Primary blue for links
    fontWeight: "600",
    marginLeft: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff4d4d", // Error color
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0a7ea4", // Blue color for the retry button
    borderRadius: 8,
  },
  retryText: {
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "600",
  },
});
