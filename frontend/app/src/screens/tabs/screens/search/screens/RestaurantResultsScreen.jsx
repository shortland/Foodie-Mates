import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router"; // To get query params and navigate
import { searchService } from "../../search/api/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker } from 'react-native-maps';

export default function RestaurantResultsScreen() {
  const searchParams = useLocalSearchParams(); // Extract search parameters from the URL
  const router = useRouter(); // Use router to navigate to restaurant-info page
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To handle any errors

  const goodFeatures = [
    "Most Main Course Options",
    "You have visited here before",
    "Most Vegeteranian Options",
    "Most Vegan Options",
    "Closest Walking Distance",
    "Newly Opened",
    "Takeout Available",
    "NYT Recommended",
    "Usually Fully Booked",
    "No Wait Time",
  ];
  goodFeatures.sort(() => Math.random() - 0.1);

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

  /**
   * Fixed price if it's first restaurant, otherwise generate a random price
   * That way demo works out to right numbers when we click on first restaurant for the video.
   */
  const generateKindaRandomPrice = (restaurantId) => {
    if (restaurantId == "1") {
      // first restaurant should be cheapest, so it's price should be below the min specified below so that
      // we can say it's the cheapest option when adding the unique features description
      return "$29.79";
    }

    // TODO; set this min to be above the cheapest restaurant/first restaurant price
    const min = 30.12;
    // TODO; set this max to be the max the persopn will type when submittinjg the form
    const max = 100.10;
    // Generate a random number between min and max
    const randomPrice = (Math.random() * (max - min) + min).toFixed(2);
    return `$${randomPrice}`;
  }

  const generatedRandomUniqueFeature = (restaurantId) => {
    if (restaurantId == "1") {
      return <>
        <Text style={styles.randomUniqueFeature}>🥇Cheapest Option</Text>
        {/* {"\n"} */}
        {/* <Text style={styles.randomUniqueFeature}>Highest Rated</Text> */}
      </>;
    }

    return <Text style={styles.randomUniqueFeature}>{goodFeatures[restaurantId]}</Text>;
  }

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
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Best Results</Text>
      </View>

      {/* // TODO: insert map here with pins for each restaurant location */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7247782,
          longitude: -73.9957863,
          latitudeDelta: 0.05522,
          longitudeDelta: 0.03721,
        }}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.location.latitude,
              longitude: restaurant.location.longitude,
            }}
            title={restaurant.name}
            description={restaurant.description}
          />
        ))}
      </MapView>

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
                
                <Text style={styles.details}>
                  <Text style={styles.details}>{item.rating} <Ionicons name="star" size={14} color="#ffcc00" /></Text>   {item.distance} miles away
                </Text>
                
                <Text style={styles.details}>Best Total: {generateKindaRandomPrice(item.id)}</Text>

                {/* Sponsored Banner */}
                {item.sponsored && (
                  <>
                    <Text style={styles.details}>
                      {generatedRandomUniqueFeature(item.id)}
                    </Text>

                    <View style={styles.sponsoredBanner}>
                      <Text style={styles.sponsoredText}>Sponsored</Text>
                    </View>

                    {item.id == "4" && (
                      <View style={styles.offerBanner}>
                        <Text style={styles.offerText}>🏆 Buy 1, Get 1 Free</Text>
                      </View>
                    )}

                    {item.id == "1" && (
                      <View style={styles.offerBanner}>
                        <Text style={styles.offerText}>Offers Available</Text>
                      </View>
                    )}

                    {item.id == "6" && (
                      <View style={styles.offerBanner}>
                        <Text style={styles.offerText}>Offers Available</Text>
                      </View>
                    )}
                  </>
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
    // backgroundColor: "red", // Ensure white background
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
    width: "80%",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  randomUniqueFeature: {
    fontSize: 14,
    color: "#6200EE",
    marginVertical: 5,
  },
  sponsoredBanner: {
    position: "absolute",
    bottom: 0,
    right: 10,
    // backgroundColor: "rgba(255, 99, 71, 0.9)", // Red or orange background for the sponsored banner
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  sponsoredText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "rgba(255, 99, 71, 0.45)", // White text for the sponsored banner
  },
  offerBanner: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(25, 199, 71, 0.9)", // Red or orange background for the sponsored banner
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  offerText: {
    fontSize: 12,
    color: "#FFFFFF", // White text for the sponsored banner
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: '100%',
    height: 200,
  },
});
