import React, { useState, useRef } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { signUp } from "@/app/src/screens/auth/util/authLogic";
import FormField from "@/app/src/components/FormField";
import CustomButton from "@/app/src/components/CustomButton";
import FormSwitch from "@/app/src/components/FormSwitch";
import images from "@/app/src/constants/images";
import { AccountType } from "@/app/src/models/AccountType";

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

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = async () => {
    try {
      if (
        form.firstName === "" ||
        form.email === "" ||
        form.password === "" ||
        form.phoneNumber === "" ||
        form.lastName === ""
      ) {
        throw new Error("Please fill in all fields");
      }
      setSubmitting(true);
      const result = await signUp(
        form.email,
        form.password,
        form.firstName,
        form.lastName,
        form.phoneNumber,
        form.accountType ? AccountType.PERSON : AccountType.RESTAURANT
      );
      if (result.data.success) {
        Alert.alert("Sign-up successful. Please sign in.");
        router.replace("/sign-in");
      } else {
        throw new Error("Sign-up failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up For FoodieMate
          </Text>

          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-10"
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
          />

          <FormField
            title="Last Name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles="mt-10"
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => phoneNumberRef.current.focus()}
          />

          <FormField
            title="Phone Number"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-7"
            keyboardType="phone-pad"
            ref={phoneNumberRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            ref={passwordRef}
            returnKeyType="done"
            onSubmitEditing={submit} // Optionally trigger form submission here
          />

          <FormSwitch
            title="Account Type"
            value={form.accountType}
            options={["Customer", "Restaurant"]}
            onValueChange={() =>
              setForm({ ...form, accountType: !form.accountType })
            }
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
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
