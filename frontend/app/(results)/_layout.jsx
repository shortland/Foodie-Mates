import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Loader from "@/app/src/components/Loader";

const ResultsLayout = () => {
  const loading = false;
  const isLogged = false;

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="restaurant-info" />
        <Stack.Screen name="reservation-info" />
        <Stack.Screen name="restaurant-results" />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default ResultsLayout;
