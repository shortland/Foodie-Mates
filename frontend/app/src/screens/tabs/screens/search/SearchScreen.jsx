// SearchScreen.js
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Alert,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import FormField from "@/app/src/components/FormField";
import DropDown from "@/app/src/components/DropDown";
import { ThemedText } from "@/app/src/components/ThemedText";
import CustomButton from "@/app/src/components/CustomButton";
import { validateRequiredFields } from "@/app/src/utils/helpers";
import { useRouter } from "expo-router";

export default function SearchScreen() {
  const router = useRouter();

  const scrollViewRef = useRef(null);

  const [form, setForm] = useState({
    preferred_cuisine_type: "indian",
    num_people: "2",
    distance_miles: "5",
    total_budget: "100",
    num_appetizer: "1",
    num_main_course: "1",
    num_dessert: "1",
    num_drink: "1",
  });

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
      const formData = {
        ...form,
        latitude,
        longitude,
      };

      if (!validateRequiredFields(form, [])) {
        throw new Error("Please fill in all required fields.");
      }

      router.push({
        pathname: "/restaurant-results",
        params: { formData: JSON.stringify(formData) },
      });
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
  };

  const cuisineOptions = [
    { label: "Indian", value: "indian" },
    { label: "Chinese", value: "chinese" },
    { label: "Italian", value: "italian" },
    { label: "Mexican", value: "mexican" },
    { label: "Japanese", value: "japanese" },
    { label: "Thai", value: "thai" },
    { label: "French", value: "french" },
    { label: "Mediterranean", value: "mediterranean" },
    { label: "American", value: "american" },
    { label: "Spanish", value: "spanish" },
    { label: "Greek", value: "greek" },
    { label: "Vietnamese", value: "vietnamese" },
    // Add more options as needed
  ];

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        /* Dismiss keyboard if needed */
      }}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Search</Text>
        <ScrollView
          style={styles.scrollView}
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Basic Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="hammer-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.sectionTitle}>Basic</ThemedText>
            </View>

            {/* Preferred Cuisine Type */}
            <DropDown
              title="Preferred Cuisine Type"
              value={form.preferred_cuisine_type}
              handleChangeText={(value) =>
                handleInputChange("preferred_cuisine_type", value)
              }
              options={cuisineOptions}
            />

            {/* Number of People and Distance in Miles */}
            <View style={styles.row}>
              <FormField
                title="Number of People"
                value={form.num_people}
                handleChangeText={(value) =>
                  handleInputChange("num_people", value)
                }
                otherStyles={styles.halfFormField}
                keyboardType="numeric"
                ref={numPeopleRef}
                returnKeyType="next"
                onSubmitEditing={() => distanceMilesRef.current.focus()}
                isBox
                placeholder="Enter number"
              />
              <FormField
                title="Distance in Miles"
                value={form.distance_miles}
                handleChangeText={(value) =>
                  handleInputChange("distance_miles", value)
                }
                otherStyles={styles.halfFormField}
                keyboardType="numeric"
                ref={distanceMilesRef}
                returnKeyType="next"
                onSubmitEditing={() => totalBudgetRef.current.focus()}
                isBox
                placeholder="Enter distance"
              />
            </View>

            {/* Total Budget */}
            <FormField
              title="Total Budget"
              value={form.total_budget}
              handleChangeText={(value) =>
                handleInputChange("total_budget", value)
              }
              otherStyles={styles.formField}
              keyboardType="numeric"
              ref={totalBudgetRef}
              returnKeyType="next"
              onSubmitEditing={() => numAppetizerRef.current.focus()}
              isBox
              placeholder="Enter budget"
              prefix="$" /* Added prefix here */
              suffix="" /* Added invisible suffix to maintain layout */
            />
          </View>

          {/* Advanced Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="settings-outline" size={24} color="#0a7ea4" />
              <ThemedText style={styles.sectionTitle}>Advanced</ThemedText>
            </View>

            {/* Number of Appetizers and Main Courses */}
            <View style={styles.row}>
              <FormField
                title="Number of Appetizers"
                value={form.num_appetizer}
                handleChangeText={(value) =>
                  handleInputChange("num_appetizer", value)
                }
                otherStyles={styles.halfFormField}
                keyboardType="numeric"
                ref={numAppetizerRef}
                returnKeyType="next"
                onSubmitEditing={() => numMainCourseRef.current.focus()}
                isBox
                placeholder="Enter number"
              />
              <FormField
                title="Number of Main Courses"
                value={form.num_main_course}
                handleChangeText={(value) =>
                  handleInputChange("num_main_course", value)
                }
                otherStyles={styles.halfFormField}
                keyboardType="numeric"
                ref={numMainCourseRef}
                returnKeyType="next"
                onSubmitEditing={() => numDessertRef.current.focus()}
                isBox
                placeholder="Enter number"
              />
            </View>

            {/* Number of Desserts and Drinks */}
            <View style={styles.row}>
              <FormField
                title="Number of Desserts"
                value={form.num_dessert}
                handleChangeText={(value) =>
                  handleInputChange("num_dessert", value)
                }
                otherStyles={styles.halfFormField}
                keyboardType="numeric"
                ref={numDessertRef}
                returnKeyType="next"
                onSubmitEditing={() => numDrinkRef.current.focus()}
                isBox
                placeholder="Enter number"
              />
              <FormField
                title="Number of Drinks"
                value={form.num_drink}
                handleChangeText={(value) =>
                  handleInputChange("num_drink", value)
                }
                otherStyles={styles.halfFormField}
                keyboardType="numeric"
                ref={numDrinkRef}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                isBox
                placeholder="Enter number"
              />
            </View>
          </View>

          {/* Submit Button */}
          <CustomButton
            title="Submit"
            handlePress={handleSubmit}
            containerStyles={styles.buttonContainer}
            isLoading={false}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appBar: {
    backgroundColor: "#f4f4f4", // Light gray for the app bar
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Dark text color
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "700",
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfFormField: {
    width: "48%",
  },
  formField: {
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
