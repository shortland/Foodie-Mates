import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { searchService } from "../../search/api/api";

export default function RestaurantInfoScreen() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await searchService.fetchAllRestaurants();

        if (response && response.data) {
          const foundRestaurant = response.data.find(
            (restaurant) => restaurant.id.toString() === id
          );

          if (foundRestaurant) {
            setRestaurant(foundRestaurant);
          } else {
            setError("Restaurant not found.");
          }
        } else {
          setError("No restaurants found.");
        }
      } catch (err) {
        console.error("Error fetching restaurant:", err);
        setError("Error fetching restaurant data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading restaurant details...</Text>
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

  if (!restaurant) {
    return (
      <View style={styles.centeredView}>
        <Text>No restaurant data available</Text>
      </View>
    );
  }

  const handleMenuClick = (menu) => {
    alert(`Selected menu: ${menu.name}`);
  };

  const handleReservation = () => {
    alert(`Reserved a table at ${restaurant.name}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Restaurant Info</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>

        {restaurant.imageUrl && (
          <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.details}>Rating: {restaurant.rating} ★</Text>
          <Text style={styles.details}>
            Distance: {restaurant.distance} miles
          </Text>

          {restaurant.isSponsored && (
            <Text style={styles.sponsored}>Sponsored</Text>
          )}

          <Text style={styles.details}>
            Neighborhood: {restaurant.neighborhood}
          </Text>
          <Text style={styles.details}>Hours: {restaurant.hours}</Text>
          <Text style={styles.details}>Price: {restaurant.price}</Text>
          <Text style={styles.details}>Cuisines: {restaurant.cuisines}</Text>
          <Text style={styles.details}>
            Additional Info: {restaurant.additionalInfo}
          </Text>

          {/* Render Menu Buttons */}
          <View style={styles.menuContainer}>
            {restaurant.menus.map((menu, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuButton}
                onPress={() => handleMenuClick(menu)}
              >
                <Text style={styles.menuButtonText}>{menu.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.reserveButtonContainer}>
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={handleReservation}
            >
              <Text style={styles.reserveButtonText}>Reserve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  appBar: {
    height: 60,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Light grey for app bar bottom border
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  details: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  sponsored: {
    fontSize: 16,
    color: "#FF6347",
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    marginTop: 16,
  },
  menuButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  reserveButtonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  reserveButton: {
    backgroundColor: "#FF4500", // Bright orange-red for attention
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    width: "90%", // Button takes up 90% of the screen width
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#FFF", // White text for contrast
    fontSize: 18,
    fontWeight: "bold",
  },
});
