import React, { useEffect } from "react";
import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/app/src/components/HelloWave";
import ParallaxScrollView from "@/app/src/components/ParallaxScrollView";
import { ThemedText } from "@/app/src/components/ThemedText";
import { ThemedView } from "@/app/src/components/ThemedView";
import Profile from "@/app/src/utils/Profile/Profile";

export default function PersonHomeScreen() {
  const [user, setUser] = React.useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const { data } = await Profile.getProfileData();
      if (data) {
        setUser(data.first_name);
      }
    };

    loadUserData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/public/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome {user}</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Goals For This Customer Page</ThemedText>
        <ThemedText>
          On the home screen, there will be a list of recomended/potential
          restaurants in the area for the user to browse through.
        </ThemedText>
        <ThemedText>
          Upon clickng the restaurant, user can view the menu items and the
          reviews. Moving forward with the restaurant will yield a request.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
