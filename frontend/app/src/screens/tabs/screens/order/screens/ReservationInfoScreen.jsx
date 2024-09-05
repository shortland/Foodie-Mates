import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router"; // Import useLocalSearchParams
import { reservationService } from "../api/api"; // Ensure correct path to API service

export default function ReservationInfoScreen() {
  const [reservation, setReservation] = useState(null); // To hold the reservation data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const { id, isActive } = useLocalSearchParams(); // Get the reservation ID and active status from the params

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        // Fetch all reservations or restaurants from the API
        const response = await reservationService.fetchAllRestaurants(); // Or fetchAllReservations based on your API

        if (response && response.data) {
          // Find the reservation or restaurant that matches the ID
          const foundReservation = response.data.find(
            (reservation) => reservation.id.toString() === id
          );

          if (foundReservation) {
            setReservation(foundReservation);
          } else {
            setError("Reservation not found.");
          }
        } else {
          setError("No reservation found.");
        }
      } catch (err) {
        console.error("Error fetching reservation:", err);
        setError("Error fetching reservation data.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchReservation(); // Call the function to fetch data when component mounts
  }, [id]);

  const handleCancelReservation = () => {
    // Add logic to cancel the reservation
    console.log(`Canceling reservation with ID: ${id}`);
    // Make an API call to cancel the reservation if needed
  };

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading reservation details...</Text>
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

  if (!reservation) {
    return (
      <View style={styles.centeredView}>
        <Text>No reservation data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Reservation Info</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{reservation.name}</Text>

        {reservation.imageUrl && (
          <Image source={{ uri: reservation.imageUrl }} style={styles.image} />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.details}>Rating: {reservation.rating} ★</Text>
          <Text style={styles.details}>Distance: {reservation.distance} miles</Text>

          {reservation.sponsored && (
            <Text style={styles.sponsored}>Sponsored</Text>
          )}

          {/* Additional reservation details */}
          <Text style={styles.details}>Reservation Time: {reservation.time}</Text>
          <Text style={styles.details}>Party Size: {reservation.partySize}</Text>

          {/* Conditionally show the cancel button if the reservation is currently active */}
          {isActive === "true" && (
            <View style={styles.cancelButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelReservation}
              >
                <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
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
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
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
    flex: 1,
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
  cancelButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF6347", // Red or orange color for cancel button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
