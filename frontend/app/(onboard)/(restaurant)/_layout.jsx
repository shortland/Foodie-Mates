import Loader from "@/app/src/components/Loader";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const OnBoardRestaurantLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboard-restaurant-step-1" />
        <Stack.Screen name="onboard-restaurant-step-2" />
        <Stack.Screen name="onboard-restaurant-step-3" />
      </Stack>
    </>
  );
};

export default OnBoardRestaurantLayout;
