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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appBar}>
        <Text style={styles.header}>Reservations</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#333",
          tabBarLabelStyle: { fontSize: 16, fontWeight: "600" },
          tabBarStyle: { backgroundColor: "#fff" }, // Changed to white
          tabBarIndicatorStyle: { backgroundColor: "#333", height: 3 }, // Changed to black
        }}
      >
        <Tab.Screen name="Current" component={CurrentReservations} />
        <Tab.Screen name="Past" component={PastReservations} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#f4f4f4", // Light color for the app bar
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f4f4f8",
  },
  reservationContainer: {
    flexDirection: "row",
    marginBottom: 12,
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
    color: "#333",
    marginBottom: 6,
  },
  reservationDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
