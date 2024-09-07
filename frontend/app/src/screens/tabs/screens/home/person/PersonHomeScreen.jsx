import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { resultsService } from "./api/api";
import Profile from "@/app/src/utils/Profile/Profile";

export default function PersonHomeScreen() {
  const [user, setUser] = useState("");
  const [restaurantData, setRestaurantData] = useState({ data: [] });
  const router = useRouter(); 

  useEffect(() => {
    // Fetch user data
    const loadUserData = async () => {
      try {
        const { data } = await Profile.getProfileData();
        if (data) {
          setUser(data.first_name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch restaurant data
    const fetchData = async () => {
      try {
        const response = await resultsService.getRestaurantResults();
        setRestaurantData(response); // Store the fetched restaurant data
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    loadUserData();
    fetchData();
  }, []);

  // Component to display each restaurant
  const RestaurantItem = ({ restaurant }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant-info?id=${restaurant.id}`)} // Navigate to restaurant-info and pass restaurant id
    >
      <View style={styles.restaurantContainer}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.restaurantImage}
        />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantInfo}>Rating: {restaurant.rating} ★</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Component to display each category
  const CategorySection = ({ category }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category.categoryName}</Text>
      <FlatList
        data={category.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeText}>Welcome, {user}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {restaurantData.data.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  restaurantContainer: {
    flexDirection: "column",
    marginRight: 15,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  restaurantImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  restaurantDetails: {
    marginTop: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantInfo: {
    fontSize: 14,
    color: "#555",
  },
});
