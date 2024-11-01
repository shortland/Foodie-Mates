import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ResultsLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="restaurant-info" />
        <Stack.Screen name="custom-order" />
        <Stack.Screen name="reservation-info" />
        <Stack.Screen name="restaurant-results" />
        <Stack.Screen name="refine-search" />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default ResultsLayout;
