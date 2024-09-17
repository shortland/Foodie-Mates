import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // To get query params and navigate
import { searchService } from "../../search/api/api";

export default function RestaurantResultsScreen() {
  const searchParams = useLocalSearchParams(); // Extract search parameters from the URL
  const router = useRouter(); // Use router to navigate to restaurant-info page
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To handle any errors

  // Fetch restaurant data from the API on mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Simulate a delay for 1.5 seconds to test loading state
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Include searchParams in the API request
        const response = await searchService.fetchRestaurantsFromQuery(
          searchParams
        );

        if (response && response.data) {
          // Sort the restaurants: sponsored ones first
          const sortedRestaurants = response.data.sort((a, b) => {
            if (a.sponsored && !b.sponsored) return -1;
            if (!a.sponsored && b.sponsored) return 1;
            return 0;
          });

          setRestaurants(sortedRestaurants);
        } else {
          setError("No restaurants found.");
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Error fetching restaurant data.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRestaurants();
  }, [searchParams]);

  // Navigate to the restaurant-info route
  const handlePress = (restaurantId) => {
    router.push({
      pathname: "/restaurant-info",
      params: { id: restaurantId },
    });
  };

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text>No restaurant data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Restaurant Results</Text>
      </View>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.item}>
              {/* Restaurant Image */}
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text>No Image</Text>
                </View>
              )}

              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Rating: {item.rating} ★</Text>
                <Text style={styles.details}>
                  Distance: {item.distance} miles
                </Text>

                {/* Sponsored Banner */}
                {item.sponsored && (
                  <View style={styles.sponsoredBanner}>
                    <Text style={styles.sponsoredText}>Sponsored</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Ensure white background
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF", // Neutral background color for the app bar
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Light grey border for separation
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Dark text for the header title
    textAlign: "left", // Align the title to the top left
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    position: "relative", // Allow for absolute positioning of sponsored banner
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  sponsoredBanner: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF6347", // Red or orange background for the sponsored banner
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  sponsoredText: {
    fontSize: 12,
    color: "#FFFFFF", // White text for the sponsored banner
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
