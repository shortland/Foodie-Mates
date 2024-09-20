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
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import FormField from "@/app/src/components/FormField";
import DropDown from "@/app/src/components/DropDown";
import { ThemedText } from "@/app/src/components/ThemedText";
import CustomButton from "@/app/src/components/CustomButton";
import { validateRequiredFields } from "@/app/src/utils/helpers";
import { useRouter } from "expo-router";
import { mock } from "@/app/test/constants/mockData";

export default function SearchScreen() {
  const router = useRouter();

  const scrollViewRef = useRef(null);
  const [form, setForm] = useState(mock.formData);


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

  const [categories] = useState([
    { label: "Chinese", image: "https://cdn.pixabay.com/photo/2020/05/29/04/17/chinese-5233490_1280.jpg" },
    { label: "Japanese", image: "https://cdn.pixabay.com/photo/2015/04/10/00/41/food-715542_1280.jpg" },
    { label: "Mexican", image: "https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg" },
    { label: "Sushi", image: "https://cdn.pixabay.com/photo/2020/04/04/15/07/sushi-5002639_1280.jpg" },
    { label: "Pizza", image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" },
    { label: "Fast Food", image: "https://cdn.pixabay.com/photo/2022/05/25/21/33/burgers-7221445_1280.jpg" },
    { label: "Italian", image: "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg" },
    { label: "Caribbean", image: "https://cdn.pixabay.com/photo/2021/11/01/15/52/spring-roll-6760871_1280.jpg" },
    { label: "Indian", image: "https://cdn.pixabay.com/photo/2022/06/27/05/38/spices-7286739_1280.jpg" },
    { label: "Thai", image: "https://cdn.pixabay.com/photo/2017/06/30/04/58/green-curry-2457236_1280.jpg" },
    { label: "French", image: "https://cdn.pixabay.com/photo/2016/11/12/15/29/restaurant-1819027_1280.jpg" },
    { label: "Sandwich", image: "https://cdn.pixabay.com/photo/2023/05/29/17/01/hamburger-8026581_1280.jpg" },
    { label: "Korean", image: "https://cdn.pixabay.com/photo/2016/10/13/19/15/bibimbap-1738580_1280.jpg" },
    { label: "Coffee", image: "https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_1280.jpg" },
    { label: "American", image: "https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_1280.jpg" },
    { label: "Vietnamese", image: "https://cdn.pixabay.com/photo/2020/09/26/02/08/banh-xeo-5602963_1280.jpg" },
    { label: "Cuban", image: "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg" },
    { label: "Seafood", image: "https://cdn.pixabay.com/photo/2016/07/21/09/57/snow-crab-1532115_1280.jpg" },
    { label: "Vegetarian", image: "https://cdn.pixabay.com/photo/2018/08/29/19/01/fig-3640553_1280.jpg" },
    { label: "Ice Cream", image: "https://cdn.pixabay.com/photo/2024/04/20/19/34/chocolate-8709260_1280.jpg" },
    { label: "Bakery", image: "https://cdn.pixabay.com/photo/2013/04/07/21/30/bread-101636_1280.jpg" },
    { label: "Ramen", image: "https://cdn.pixabay.com/photo/2018/07/25/17/35/ramen-3561894_1280.jpg" },
    { label: "Bubble Tea", image: "https://cdn.pixabay.com/photo/2018/02/05/03/20/drink-3131322_1280.jpg" },
    { label: "BBQ", image: "https://cdn.pixabay.com/photo/2023/10/09/04/28/steak-8303237_1280.jpg" },
    { label: "Jamaican", image: "https://cdn.pixabay.com/photo/2018/08/15/00/07/fried-food-3606942_1280.jpg" },
    { label: "Halal", image: "https://cdn.pixabay.com/photo/2022/06/27/05/37/food-art-7286735_1280.jpg" },
    { label: "Soul Food", image: "https://cdn.pixabay.com/photo/2018/06/16/16/38/macaroni-3479021_1280.jpg" },
    { label: "Greek", image: "https://cdn.pixabay.com/photo/2017/06/22/14/20/salad-2430919_1280.jpg" },
  ]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={() => router.push(`/refine-search`)} // Adjust navigation as needed
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );  

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        /* Dismiss keyboard if needed */
      }}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Search</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.label}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />
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
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "700",
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfFormField: {
    width: "50%",
  },
  formField: {
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 180,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  categoryContainer: {
    flex: 1,
    margin: 7.5,
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 8,
  },
  categoryImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderStyle: 'solid',
  },
  grid: {
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
  }
});
