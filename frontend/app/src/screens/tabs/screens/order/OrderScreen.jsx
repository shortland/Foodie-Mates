import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, View } from 'react-native';

import ParallaxScrollView from '@/app/src/components/ParallaxScrollView';
import { ThemedText } from '@/app/src/components/ThemedText';
import { ThemedView } from '@/app/src/components/ThemedView';
import { orderService } from './api/api';  // Import the order service
import OrderItem from './components/OrderItem';

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.fetchUserOrders();  // Use the API service to fetch orders
        console.log(data);
        setOrders(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user orders:", data.error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Separate live order and past orders
  const liveOrder = orders.find(order => order.is_live === "1");
  const pastOrders = orders.filter(order => order.is_live !== "1");

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

      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ThemedText>Loading orders...</ThemedText>
        ) : (
          <>
            {liveOrder && (
              <View>
                <ThemedText type="title" style={styles.currentHeader}>
                  Current
                </ThemedText>
                <OrderItem order={liveOrder} />
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
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  container: {
    padding: 16,
  },
  currentHeader: {
    marginBottom: 8,
    color: '#FF5733', // Customize the color for the "Current" label
  },
  pastHeader: {
    marginTop: 24,
    marginBottom: 8,
    color: '#3498db', // Customize the color for the "Past Orders" label
  },
  orderContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
