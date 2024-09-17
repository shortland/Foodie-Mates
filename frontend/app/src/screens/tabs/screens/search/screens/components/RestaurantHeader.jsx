import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"; // Use Ionicons from Expo

export default function RestaurantHeader({ restaurant, setMapModalVisible }) {
  // Format price based on the restaurant's price level
  const formatPrice = (price) => {
    const dollarSigns = Math.ceil(price / 30); // Divide the max price by 30 and round up
    return "$".repeat(dollarSigns); // Return the appropriate number of dollar signs
  };

  return (
    <View style={styles.container}>
      {/* Restaurant Image with close button */}
      <View style={styles.imageContainer}>
        {restaurant.imageUrl && (
          <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
        )}

        {/* Close button overlay */}
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Restaurant details */}
      <View style={styles.detailsContainer}>
        {/* Title */}
        <Text style={styles.restaurantName}>{restaurant.name}</Text>

        {/* Cuisine and Price Range */}
        <View style={styles.row}>
          <Text style={styles.cuisine}>
            {`${restaurant.cuisines} (${formatPrice(restaurant.price)})`}
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.rating}>
            <Ionicons name="star" size={16} color="#ffcc00" />
            {restaurant.rating}
          </Text>
          <Text style={styles.dot}>•</Text>
          {/* Distance with Map Icon */}
          <Text style={styles.distance}>
            {restaurant.distance} mi
            <TouchableOpacity onPress={() => setMapModalVisible(true)}>
              <Ionicons name="location-outline" size={18} color="#555" style={styles.mapIconInline} />
            </TouchableOpacity>
          </Text>
        </View>

        {/* Open Status and Closing Time */}
        <View style={styles.row}>
          <Text style={styles.openStatus}>Open:</Text>
          <Text style={styles.closingTime}>
            Closes 10:00 PM
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 15,
  },
  detailsContainer: {
    paddingHorizontal: 10, // Reduced the side padding for a tighter layout
    paddingVertical: 10,
  },
  restaurantName: {
    fontSize: 22, // Slightly reduced the font size to match tighter padding
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 5,
  },
  dot: {
    fontSize: 18,
    color: "#777",
    marginHorizontal: 5,
  },
  distance: {
    fontSize: 16,
    color: "#777",
    flexDirection: "row", // Ensure icon is inline with text
    alignItems: "center",
  },
  cuisine: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  openStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  closingTime: {
    fontSize: 16,
    color: "#777",
    marginLeft: 5,
  },
  mapIconInline: {
    marginLeft: 5, // Space between the distance and the map icon
  },
});
