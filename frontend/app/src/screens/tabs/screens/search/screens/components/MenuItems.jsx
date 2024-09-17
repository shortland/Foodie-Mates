import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"; // For icons used in the buttons

export default function MenuItems({ selectedMenu }) {
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
    <View style={styles.menuSection}>
      {selectedMenu.sections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.name}</Text>

          {section.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.menuItem}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>${item.price}</Text>
              </View>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      ))}

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
                <Ionicons name="remove-circle-outline" size={24} color="#555" />
              </TouchableOpacity>
              <Text style={styles.tipValue}>{(tipRate * 100).toFixed(0)}%</Text>
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
          <Text style={[styles.totalLabel, styles.totalLabelBold]}>Estimated Total:</Text>
          <Text style={[styles.totalValue, styles.totalValueBold]}>
            ${total}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18, // Increased font size for section titles
    fontWeight: "bold",
    marginBottom: 5,
    color: "#444", // Darker color for section titles
    paddingLeft: 5, // Move section title to the left
  },
  menuItem: {
    backgroundColor: "#fff", // Add background color
    borderRadius: 8, // Rounded corners
    padding: 10, // Add padding inside each item
    marginBottom: 10, // Space between items
    shadowColor: "#000", // Adding shadow for slight depth effect
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Shadow for Android
  },
  menuItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2, // Space between name and price
  },
  menuItemName: {
    fontSize: 16, // Increased font size for a cleaner look
    fontWeight: "600", // Bold text for item name
    color: "#333", // Darker text color
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "600", // Bold text for price to stand out
    color: "#666", // Slightly lighter text color for price
  },
  menuItemDescription: {
    fontSize: 14, // Slightly smaller font for description
    color: "#777", // Lighter gray for descriptions
    marginTop: 5, // Space between the name/price and description
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0", // Thin border to separate totals
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, // Space between total rows
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
    flexDirection: "row", // Ensure elements are in a row
    alignItems: "center", // Align the elements vertically centered
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
    marginHorizontal: 10, // Space between tip value and buttons
  },
});