// SignUpScreen.js
import React, { useState, useRef } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import FormField from "@/app/src/components/FormField";
import FormSwitch from "@/app/src/components/FormSwitch";
import CustomButton from "@/app/src/components/CustomButton";
import images from "@/app/src/constants/images";
import { AccountType } from "@/app/src/models/AccountType";
import { validateRequiredFields } from "@/app/src/utils/helpers";
import { authService } from "../api/api";
import Loader from "@/app/src/components/Loader";
import Session from "../../../utils/Session/Session";

const SignUpScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    accountType: false,
  });
  const [error, setError] = useState(null);

  // Refs for form fields
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = async () => {
    try {
      if (!validateRequiredFields(form, ["accountType"])) {
        throw new Error("Please fill in all fields");
      }
      setSubmitting(true);
      const result = await authService.signUpWithEmailAndPassword(
        form.email,
        form.password,
        form.firstName,
        form.lastName,
        form.phoneNumber,
        form.accountType ? AccountType.PERSON : AccountType.RESTAURANT
      );
      if (result.data.success) {
        Alert.alert("Success", "Sign-up successful. Please sign in.");
        router.replace("/sign-in");
      } else {
        throw new Error("Sign-up failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Optional: Handle retry after error
  const handleRetry = () => {
    setError(null);
    submit();
  };

  // Conditional rendering based on error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {/* Optional Retry Button */}
          <TouchableOpacity
            onPress={handleRetry}
            style={styles.retryButton}
            accessibilityRole="button"
            accessibilityLabel="Retry signing up"
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.title}>Sign Up For FoodieMate</Text>

          {/* First Name Form Field */}
          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles={styles.formField}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()} // Focus on last name field when "Next" is pressed
          />

          {/* Last Name Form Field */}
          <FormField
            title="Last Name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles={styles.formField}
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()} // Focus on email field when "Next" is pressed
          />

          {/* Email Form Field */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => phoneNumberRef.current.focus()} // Focus on phone number field when "Next" is pressed
          />

          {/* Phone Number Form Field */}
          <FormField
            title="Phone Number"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles={styles.formField}
            keyboardType="phone-pad"
            ref={phoneNumberRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()} // Focus on password field when "Next" is pressed
          />

          {/* Password Form Field */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
            ref={passwordRef}
            returnKeyType="done"
            onSubmitEditing={submit} // Trigger submit when "Done" is pressed
            secureTextEntry // Hide password input
          />

          {/* Account Type Switch */}
          <FormSwitch
            title="Account Type"
            value={form.accountType}
            options={["Customer", "Restaurant"]}
            onValueChange={() =>
              setForm({ ...form, accountType: !form.accountType })
            }
            otherStyles={styles.formSwitch}
          />

          {/* Sign Up Button */}
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Have an account already?</Text>
            <Link
              href="/sign-in"
              style={styles.loginLink}
              accessibilityLabel="Navigate to Login screen"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
  formSwitch: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    marginTop: 30,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#555", // Medium gray for secondary text
    fontWeight: "400",
  },
  loginLink: {
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
    backgroundColor: "#fff", // White background for error screen
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
