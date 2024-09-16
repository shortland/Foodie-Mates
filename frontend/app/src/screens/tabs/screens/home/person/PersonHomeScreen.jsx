// PersonHomeScreen.js
import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  FlatList, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { resultsService } from "./api/api";
import Profile from "@/app/src/utils/Profile/Profile";

export default function PersonHomeScreen() {
  const [user, setUser] = useState("");
  const [restaurantData, setRestaurantData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    // Fetch user data and restaurant data
    const loadData = async () => {
      try {
        const { data } = await Profile.getProfileData();
        if (data) {
          setUser(data.first_name);
        }

        const response = await resultsService.getRestaurantResults();
        setRestaurantData(response);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Component to display each restaurant
  const RestaurantItem = React.memo(({ restaurant }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant-info?id=${restaurant.id}`)} // Navigate to restaurant-info and pass restaurant id
      style={styles.restaurantTouchable}
      activeOpacity={0.8}
    >
      <View style={styles.restaurantContainer}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.restaurantImage}
          resizeMode="cover"
        />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantInfo}>Rating: {restaurant.rating} ★</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));

  // Component to display each category
  const CategorySection = React.memo(({ category }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category.categoryName}</Text>
      <FlatList
        data={category.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  ));

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => { /* Dismiss keyboard if needed */ }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Welcome Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.welcomeText}>Welcome, {user}</Text>
          </View>

          {/* Restaurant Categories */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false} // Hide vertical scrollbar
          >
            {restaurantData.data.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  titleContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  flatListContent: {
    paddingLeft: 8,
  },
  restaurantTouchable: {
    marginRight: 16,
  },
  restaurantContainer: {
    width: 160,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
  },
  restaurantImage: {
    width: "100%",
    height: 120,
  },
  restaurantDetails: {
    padding: 10,
    height: 60, // Fixed height to ensure consistency
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    height: 20, // Fixed height to align text
  },
  restaurantInfo: {
    fontSize: 14,
    color: "#555",
    height: 18, // Fixed height to align text
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff4d4d",
    textAlign: "center",
  },
});
