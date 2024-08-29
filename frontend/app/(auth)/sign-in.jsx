import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";

import { signIn, setTokenWithSessionExpirationTime } from "../src/screens/auth/util/authLogic";
import FormField from "@/app/src/components/FormField";
import CustomButton from "@/app/src/components/CustomButton";

const SignIn = () => {

  const [user, setUser] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {

    try {
      if (form.email === "" || form.password === "") {
        throw new Error("Please fill in all fields");
      }
  
      setSubmitting(true);

      // Simulate getting the current user (replace with actual user retrieval logic)
      const result = await signIn(form.email, form.password);
      if (result){
        const token = setTokenWithSessionExpirationTime(result.token);
        console.log(token);
        await AsyncStorage.setItem('userToken', token);
        setUser(result);
        setIsLogged(true);
        // Navigate to the home screen
        router.replace("/home");
      } else {
        throw new Error("Sign-in failed. Please try again.");
      }
    } catch (error) {
      // Show error message
      Alert.alert("Error", error.message);
    } finally {
      // Reset the submitting state
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
          {/* <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          /> */}

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to FoodieMate
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
