import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";


export default function MenuItems({ selectedMenu, isLoading }) {
  const [tipRate, setTipRate] = useState(0.15); // Default tip rate of 15%

  const calculateSubtotal = () => {
    let subtotal = 0;
    selectedMenu.sections.forEach((section) => {
      section.items.forEach((item) => {
        subtotal += parseFloat(item.price);
      });
    });
    return subtotal.toFixed(2);
  };

  const handleTipIncrease = () => {
    if (tipRate < 0.3) setTipRate((prev) => Math.min(prev + 0.01, 0.3));
  };

  const handleTipDecrease = () => {
    if (tipRate > 0) setTipRate((prev) => Math.max(prev - 0.01, 0));
  };

  const taxRate = 0.08; // Example tax rate of 8%
  const subtotal = parseFloat(calculateSubtotal());
  const tax = (subtotal * taxRate).toFixed(2);
  const tip = (subtotal * tipRate).toFixed(2);
  const total = (subtotal + parseFloat(tax) + parseFloat(tip)).toFixed(2);

  return (
    <View>
      <View style={styles.menuSection}>
        {isLoading ? (
          // Loader screen while regenerating
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loaderText}>Loading...</Text>
          </View>
        ) : (
          selectedMenu.sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.name}</Text>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.menuItem}>
                  <View style={styles.menuItemHeader}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemPrice}>${item.price}</Text>
                  </View>
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </View>
      <View>
        {/* Subtotal, Tax, Tip, and Total Breakdown */}
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
            <View style={styles.tipAdjustLeft}>
              <Text style={styles.totalLabel}>Tip:</Text>
              <View style={styles.tipAdjustContainer}>
                <TouchableOpacity
                  style={styles.tipButton}
                  onPress={handleTipDecrease}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="#555"
                  />
                </TouchableOpacity>
                <Text style={styles.tipValue}>
                  {(tipRate * 100).toFixed(0)}%
                </Text>
                <TouchableOpacity
                  style={styles.tipButton}
                  onPress={handleTipIncrease}
                >
                  <Ionicons name="add-circle-outline" size={24} color="#555" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.totalValue}>${tip}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.totalLabelBold]}>
              Estimated Total:
            </Text>
            <Text style={[styles.totalValue, styles.totalValueBold]}>
              ${total}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  regenerateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10, // Added margin bottom to give space between buttons and other elements
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10, // Added margin bottom
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#555",
  },
  menuSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align buttons to the right
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  regenerateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10, // Space between the regenerate and add button
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#555",
  },
  scrollContainer: {
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuTab: {
    padding: 10,
    margin: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#444",
    paddingLeft: 5,
  },
  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  menuItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    color: "#333",
  },
  totalLabelBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  totalValueBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  tipAdjustLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipAdjustContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipButton: {
    marginHorizontal: 5,
  },
  tipValue: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 10,
  },
});