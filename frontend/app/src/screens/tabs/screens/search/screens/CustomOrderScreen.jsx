import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { searchService } from "../api/api";

export default function CustomOrderScreen({ route }) {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipRate, setTipRate] = useState(0.15); // Default tip rate of 15%

  // Fetch restaurant details based on ID
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
            setMenuItems(foundRestaurant.menus[0].sections.flatMap(section => section.items));
            setSelectedMenu(foundRestaurant.menus[0]);
          } else {
            setError("Restaurant not found.");
          }
        } else {
          setError("No restaurants found.");
        }
      } catch (err) {
        setError("Error fetching restaurant data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return menuItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);
  };

  // Function to calculate tax and total
  const taxRate = 0.08; // Example tax rate of 8%
  const subtotal = parseFloat(calculateSubtotal());
  const tax = (subtotal * taxRate).toFixed(2);
  const tip = (subtotal * tipRate).toFixed(2);
  const total = (subtotal + parseFloat(tax) + parseFloat(tip)).toFixed(2);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading restaurant details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView>
        {/* Restaurant Name */}
        {restaurant && (
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        )}

        {/* Display Menu Items */}
        <View style={styles.menuItemsContainer}>
          {menuItems.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </View>

        {/* Tax, Tip, and Total */}
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>${subtotal}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (8%):</Text>
            <Text style={styles.totalValue}>${tax}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tip (15%):</Text>
            <Text style={styles.totalValue}>${tip}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.totalLabelBold]}>Total:</Text>
            <Text style={[styles.totalValue, styles.totalValueBold]}>${total}</Text>
          </View>
        </View>

        {/* Complete Order Button */}
        <TouchableOpacity style={styles.completeOrderButton}>
          <Text style={styles.completeOrderButtonText}>Complete Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  menuItemsContainer: {
    marginVertical: 20,
  },
  menuItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
  },
  totalLabelBold: {
    fontWeight: "bold",
  },
  totalValueBold: {
    fontWeight: "bold",
  },
  completeOrderButton: {
    backgroundColor: "#32cd32",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  completeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
