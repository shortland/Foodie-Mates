import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Loader from "../../components/Loader";

const AuthLayout = () => {
  const loading = false;
  const isLogged = false;

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // Hide the header for all screens in this stack
        }}
      >
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
