import Loader from "@/app/src/components/Loader";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const OnBoardPersonLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboard-person-step-1" />
        <Stack.Screen name="onboard-person-step-2" />
        <Stack.Screen name="onboard-person-step-3" />
      </Stack>
    </>
  );
};

export default OnBoardPersonLayout;
