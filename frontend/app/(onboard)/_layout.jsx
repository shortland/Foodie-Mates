import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Loader from "../src/components/Loader";
import Session from "../src/utils/Session/Session";
import { AccountType } from "../src/models/AccountType";
import { authService } from "../src/screens/auth/api/api";
import { session } from "../src/utils/Session/constants";
import OnBoardPersonLayout from "./(person)/_layout";
import OnBoardRestaurantLayout from "./(restaurant)/_layout";

const OnBoardLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    determineRouteAndNavigate();
  }, []);

  const determineRouteAndNavigate = async () => {
    try {
      const profileData = await authService.getProfileData();
      await Session.saveUserData(session.profileData, profileData);

      if (profileData) {
        const accountType = profileData.data.account_type;
        const requiresOnboard = profileData.data.requires_onboard;
        if (!requiresOnboard) {
          router.replace("/home");
        } else if (accountType === AccountType.PERSON) {
          router.replace("/onboard-person-step-1");
        } else if (accountType === AccountType.RESTAURANT) {
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
