import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  RefreshControl,
} from "react-native";

import ParallaxScrollView from "@/app/src/components/ParallaxScrollView";
import { ThemedText } from "@/app/src/components/ThemedText";
import { ThemedView } from "@/app/src/components/ThemedView";
import { orderService } from "./api/api"; // Import the order service
import OrderItem from "./components/OrderItem";

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const data = await orderService.fetchUserOrders(); // Use the API service to fetch orders
      setOrders(data.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (requestId) => {
    setOrders(orders.filter((order) => order.request_id !== requestId));
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  // Separate live order and past orders
  const liveOrder = orders.find((order) => order.is_live === "1");
  const pastOrders = orders.filter((order) => order.is_live !== "1");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Orders</ThemedText>
      </ThemedView>

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ThemedText>Loading orders...</ThemedText>
        ) : (
          <>
            {liveOrder && (
              <View>
                <ThemedText type="title" style={styles.currentHeader}>
                  Current
                </ThemedText>
                <OrderItem order={liveOrder} onCancel={handleCancelOrder} />
              </View>
            )}

            {pastOrders.length > 0 && (
              <View>
                <ThemedText type="title" style={styles.pastHeader}>
                  Past Orders
                </ThemedText>
                {pastOrders.map((order, index) => (
                  <OrderItem key={index} order={order} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  container: {
    padding: 16,
  },
  currentHeader: {
    marginBottom: 8,
    color: "#FF5733", // Customize the color for the "Current" label
  },
  pastHeader: {
    marginTop: 24,
    marginBottom: 8,
    color: "#3498db", // Customize the color for the "Past Orders" label
  },
});

