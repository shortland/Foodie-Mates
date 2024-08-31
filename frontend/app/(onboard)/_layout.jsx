import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AccountType } from "../src/models/AccountType";
import { authService } from "../src/screens/auth/api/api";
import { profile } from "../src/utils/Profile/constants";
import Profile from "../src/utils/Profile/Profile";

const OnBoardLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    determineRouteAndNavigate();
  }, []);

  const determineRouteAndNavigate = async () => {
    try {
      const profileData = await authService.getProfileData();
      await Profile.saveUserData(profile.profileData, profileData);

      if (profileData) {
        const {account_type, requires_onboard} = profileData.data;
        if (!requires_onboard) {
          router.replace("/home");
        } else if (account_type === AccountType.PERSON) {
          router.replace("/onboard-person-step-1");
        } else if (account_type === AccountType.RESTAURANT) {
          router.replace("/onboard-restaurant-step-1");
        } else {
          // Handle unexpected account type
          console.error("Unexpected account type");
        }
      } else {
        router.replace("/sign-in");
        console.error("No profile data available");
      }
    } catch (error) {
      console.error("Error during navigation:", error);
      // Handle the error appropriately (e.g., show an error screen or message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack>
        <Stack.Screen name="onboard" options={{ headerShown: false }} />
        <Stack.Screen name="(person)" options={{ headerShown: false }} />
        <Stack.Screen name="(restaurant)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default OnBoardLayout;
