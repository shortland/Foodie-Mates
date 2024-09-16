import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/app/src/components/ThemedText";
import { reservationService } from "../api/api";

const ReservationItem = ({ order, onCancel }) => {
  const handleCancel = async () => {
    try {
      const response = await reservationService.cancelReservation(order.request_id);
      if (response.status == 200) {
        Alert.alert("Success", "The order has been canceled.");
        onCancel(order.request_id); // Notify the parent component of the cancellation
      } else {
        throw new Error("Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error canceling the order:", error);
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.orderContainer}>
      <ThemedText type="title">Request ID: {order.request_id}</ThemedText>
      <ThemedText>Preferred Cuisine: {order.preferred_cuisine_type}</ThemedText>
      <ThemedText>Number of People: {order.num_people}</ThemedText>
      <ThemedText>Total Budget: ${order.total_budget}</ThemedText>
      <ThemedText>Number of Appetizers: {order.num_appetizer}</ThemedText>
      <ThemedText>Number of Main Courses: {order.num_main_course}</ThemedText>
      <ThemedText>Number of Desserts: {order.num_dessert}</ThemedText>
      <ThemedText>Number of Drinks: {order.num_drink}</ThemedText>
      <ThemedText>Distance: {order.distance_miles} miles</ThemedText>
      <ThemedText>
        Location: ({order.latitude}, {order.longitude})
      </ThemedText>
      <ThemedText>Created At: {order.created_at}</ThemedText>
      <ThemedText>Live: {order.is_live === "1" ? "Yes" : "No"}</ThemedText>

      {order.is_live === "1" && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <ThemedText type="button">Cancel Order</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    padding: 16,
    backgroundColor: "#1c1c1e", // Matching the form field background color
    marginBottom: 16,
    borderRadius: 12, // Matching the border radius from FormField
    borderColor: "#2c2c2e",
    borderWidth: 2,
  },
  cancelButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#ff6347", // Tomato color for the cancel button
    borderRadius: 8,
    alignItems: "center",
  },
});

export default ReservationItem;
