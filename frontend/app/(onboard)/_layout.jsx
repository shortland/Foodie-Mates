import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


const OnBoardLayout = () => {
  const loading = false;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // Hide the header for all screens in this stack
        }}
      >
        <Stack.Screen name="screen-1" />
        <Stack.Screen name="screen-2" />
        <Stack.Screen name="screen-3" />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default OnBoardLayout;
