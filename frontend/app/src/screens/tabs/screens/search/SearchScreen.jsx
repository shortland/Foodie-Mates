import React, { useState, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Alert, ScrollView } from "react-native";

import { searchService } from "./api/api";
import FormField from "@/app/src/components/FormField";
import { ThemedText } from "@/app/src/components/ThemedText";
import { ThemedView } from "@/app/src/components/ThemedView";
import CustomButton from "@/app/src/components/CustomButton";
import { validateRequiredFields } from "@/app/src/utils/helpers";
import ParallaxScrollView from "@/app/src/components/ParallaxScrollView";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const router = useRouter(); // Get the router object

  // TODO remove default values
  const [form, setForm] = useState({
    preferred_cuisine_type: "indian",
    num_people: "4",
    distance_miles: "1",
    total_budget: "100",
    num_appetizer: "1",
    num_main_course: "1",
    num_dessert: "1",
    num_drink: "1",
  });

  // Refs for navigation between fields
  const numPeopleRef = useRef(null);
  const distanceMilesRef = useRef(null);
  const totalBudgetRef = useRef(null);
  const numAppetizerRef = useRef(null);
  const numMainCourseRef = useRef(null);
  const numDessertRef = useRef(null);
  const numDrinkRef = useRef(null);

  const handleInputChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    
    const latitude = "37.7749";
    const longitude = "-122.4194";

    try {
      // Create formData object from form values
      const formData = {
        ...form, // Destructure form object to avoid repetition
        latitude,
        longitude,
      };

      // Validate required fields
      if (!validateRequiredFields(form, [])) {
        throw new Error("Please fill in all fields");
      }

      // Navigate to the results screen with formData using router.push()
      router.push({
        pathname: "/restaurant-results",
        params: { formData: JSON.stringify(formData) }, // Pass formData as string
      });
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ScrollView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Create a New Request</ThemedText>
        </ThemedView>

        <ThemedText>
          Fill in the details below to create a new request:
        </ThemedText>

        <FormField
          title="Preferred Cuisine Type"
          value={form.preferred_cuisine_type}
          handleChangeText={(value) =>
            handleInputChange("preferred_cuisine_type", value)
          }
          otherStyles="mt-7"
          returnKeyType="next"
          onSubmitEditing={() => numPeopleRef.current.focus()}
        />
        <FormField
          title="Number of People"
          value={form.num_people}
          handleChangeText={(value) => handleInputChange("num_people", value)}
          otherStyles="mt-7"
          keyboardType="numeric"
          ref={numPeopleRef}
          returnKeyType="next"
          onSubmitEditing={() => distanceMilesRef.current.focus()}
        />
        <FormField
          title="Distance in Miles"
          value={form.distance_miles}
          handleChangeText={(value) =>
            handleInputChange("distance_miles", value)
          }
          otherStyles="mt-7"
          keyboardType="numeric"
          ref={distanceMilesRef}
          returnKeyType="next"
          onSubmitEditing={() => longitudeRef.current.focus()}
        />

        <FormField
          title="Total Budget"
          value={form.total_budget}
          handleChangeText={(value) => handleInputChange("total_budget", value)}
          otherStyles="mt-7"
          keyboardType="numeric"
          ref={totalBudgetRef}
          returnKeyType="next"
          onSubmitEditing={() => numAppetizerRef.current.focus()}
        />
        <FormField
          title="Number of Appetizers"
          value={form.num_appetizer}
          handleChangeText={(value) =>
            handleInputChange("num_appetizer", value)
          }
          otherStyles="mt-7"
          keyboardType="numeric"
          ref={numAppetizerRef}
          returnKeyType="next"
          onSubmitEditing={() => numMainCourseRef.current.focus()}
        />
        <FormField
          title="Number of Main Courses"
          value={form.num_main_course}
          handleChangeText={(value) =>
            handleInputChange("num_main_course", value)
          }
          otherStyles="mt-7"
          keyboardType="numeric"
          ref={numMainCourseRef}
          returnKeyType="next"
          onSubmitEditing={() => numDessertRef.current.focus()}
        />
        <FormField
          title="Number of Desserts"
          value={form.num_dessert}
          handleChangeText={(value) => handleInputChange("num_dessert", value)}
          otherStyles="mt-7"
          keyboardType="numeric"
          ref={numDessertRef}
          returnKeyType="next"
          onSubmitEditing={() => numDrinkRef.current.focus()}
        />
        <FormField
          title="Number of Drinks"
          value={form.num_drink}
          handleChangeText={(value) => handleInputChange("num_drink", value)}
          otherStyles="mt-7"
          keyboardType="numeric"
          ref={numDrinkRef}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <CustomButton
          title="Create Request"
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={false}
        />
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
});
