import React from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/app/src/components/CustomButton";

export default function OnboardPersonStep1Screen() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              OnBoard User Screen 1
            </Text>
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => router.push("/onboard-person-step-2")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
