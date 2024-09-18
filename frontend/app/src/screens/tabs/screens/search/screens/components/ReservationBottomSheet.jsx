import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function ReservationBottomSheet({
  openBottomSheet,
  selectedMenu,
  numPeople,
  totalBudget,
  preferences,
  onSubmit,
  closeBottomSheet, // Function to close the bottom sheet
}) {
  const taxRate = 0.08; // Example tax rate (8%)

  // Calculate subtotal based on selected items
  const calculateSubtotal = () => {
    return selectedMenu.sections
      .reduce((total, section) => {
        section.items.forEach((item) => {
          total += parseFloat(item.price);
        });
        return total;
      }, 0)
      .toFixed(2);
  };

  const subtotal = parseFloat(calculateSubtotal());
  const tax = (subtotal * taxRate).toFixed(2);
  const finalTotal = subtotal + parseFloat(tax);

  return (
    <Modal
      visible={openBottomSheet}
      animationType="slide"
      transparent={true}
      onRequestClose={closeBottomSheet} // Close the modal when pressing back or tapping outside
    >
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.bottomSheetContainer}>
              <ScrollView>
                {/* Title and summary */}
                <Text style={styles.titleText}>Reservation Summary</Text>
                <Text style={styles.summaryText}>
                  Number of People: {numPeople}
                </Text>
                <Text style={styles.summaryText}>
                  Total Budget: {totalBudget}
                </Text>
                <Text style={styles.summaryText}>
                  Preferences: {preferences}
                </Text>

                {/* Selected Menu Title */}
                <Text style={styles.menuTitle}>
                  Selected Menu: {selectedMenu.name}
                </Text>

                {/* Display selected items */}
                {selectedMenu.sections.map((section, index) => (
                  <View key={index}>
                    <Text style={styles.sectionTitle}>{section.name}</Text>
                    {section.items.map((item, itemIndex) => (
                      <View key={itemIndex} style={styles.menuItemContainer}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemPrice}>${item.price}</Text>
                      </View>
                    ))}
                  </View>
                ))}

                {/* Tax, Tip, and Total */}
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Subtotal:</Text>
                  <Text style={styles.totalValue}>${subtotal}</Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Tax (8%):</Text>
                  <Text style={styles.totalValue}>${tax}</Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={[styles.totalLabel, styles.totalLabelBold]}>
                    Total:
                  </Text>
                  <Text style={[styles.totalValue, styles.totalValueBold]}>
                    ${finalTotal}
                  </Text>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={onSubmit}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background for dim effect
  },
  bottomSheetContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    height: "80%", // Higher bottom sheet
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  menuItemName: {
    fontSize: 14,
  },
  menuItemPrice: {
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
  },
  totalLabelBold: {
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
  },
  totalValueBold: {
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#32cd32",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
