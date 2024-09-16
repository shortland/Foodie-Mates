// ReservationScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { reservationService } from "./api/api"; // Replace with your API service
import { useRouter } from "expo-router"; // Import useRouter from expo-router

// Create the Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

export default function ReservationScreen() {
  const [currentReservations, setCurrentReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const router = useRouter(); // Get the router instance for navigation

  const fetchReservations = async () => {
    try {
      const data = await reservationService.fetchUserReservations();
      const current = data.data.filter((reservation) => reservation.is_live);
      const past = data.data.filter((reservation) => !reservation.is_live);
      setCurrentReservations(current);
      setPastReservations(past);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Handle reservation click and navigate to the /reservation-info page
  const handleReservationClick = (reservation) => {
    // Navigate to the /reservation-info page and pass id and is_live as params
    router.push({
      pathname: "/reservation-info",
      params: { id: reservation.id, isActive: reservation.is_live },
    });
  };

  // Current Reservations screen
  const CurrentReservations = () => (
    <View style={styles.content}>
      {currentReservations.length > 0 ? (
        currentReservations.map((reservation) => (
          <TouchableOpacity
            key={reservation.id}
            onPress={() => handleReservationClick(reservation)}
            activeOpacity={0.8} // Added for better feedback
            accessibilityLabel={`View details for reservation at ${reservation.name}`} // Accessibility enhancement
          >
            <View style={styles.reservationContainer}>
              <Image
                source={{ uri: reservation.imageUrl }}
                style={styles.reservationImage}
              />
              <View style={styles.reservationInfo}>
                <Text style={styles.reservationName}>{reservation.name}</Text>
                <Text style={styles.reservationDetails}>
                  Party of {reservation.party_size}
                </Text>
                <Text style={styles.reservationDetails}>
                  {reservation.reserved_date} at {reservation.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyMessage}>
          No current reservations available.
        </Text>
      )}
    </View>
  );

  // Past Reservations screen
  const PastReservations = () => (
    <View style={styles.content}>
      {pastReservations.length > 0 ? (
        pastReservations.map((reservation) => (
          <TouchableOpacity
            key={reservation.id}
            onPress={() => handleReservationClick(reservation)}
            activeOpacity={0.8} // Added for better feedback
            accessibilityLabel={`View details for past reservation at ${reservation.name}`} // Accessibility enhancement
          >
            <View style={styles.reservationContainer}>
              <Image
                source={{ uri: reservation.imageUrl }}
                style={styles.reservationImage}
              />
              <View style={styles.reservationInfo}>
                <Text style={styles.reservationName}>{reservation.name}</Text>
                <Text style={styles.reservationDetails}>
                  Party of {reservation.party_size}
                </Text>
                <Text style={styles.reservationDetails}>
                  {reservation.reserved_date} at {reservation.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyMessage}>No past reservations available.</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBar}>
        <Text style={styles.header}>Reservations</Text>
      </View>

      {/* Top Tabs Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#0a7ea4", // Updated to blue theme
          tabBarInactiveTintColor: "#555", // Maintained for contrast
          tabBarLabelStyle: { fontSize: 16, fontWeight: "600" },
          tabBarStyle: { backgroundColor: "#fff" }, // Kept white for a clean look
          tabBarIndicatorStyle: { backgroundColor: "#0a7ea4", height: 3 }, // Updated to blue theme
        }}
      >
        <Tab.Screen name="Current" component={CurrentReservations} />
        <Tab.Screen name="Past" component={PastReservations} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f4f4f8", // Slightly different background for content
  },
  reservationContainer: {
    flexDirection: "row",
    marginBottom: 6, // Increased margin for better spacing
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  reservationImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  reservationInfo: {
    flexDirection: "column",
    flex: 1,
  },
  reservationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark text color
    marginBottom: 6,
  },
  reservationDetails: {
    fontSize: 14,
    color: "#555", // Secondary text color
    marginBottom: 4,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#555", // Secondary text color
    textAlign: "center",
    marginTop: 20,
  },
});
