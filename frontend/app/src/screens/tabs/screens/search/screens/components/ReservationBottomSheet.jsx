import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ReservationBottomSheet({
  openBottomSheet,
  selectedMenu,
  numPeople,
  totalBudget,
  preferences,
  onSubmit,
  closeBottomSheet,
}) {
  const taxRate = 0.08;
  const [tipRate, setTipRate] = useState(0.15); // Default tip rate of 15%
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTimePickerModal, setShowDateTimePickerModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const calculateSubtotalAndSavings = () => {
    let subtotal = 0;
    let savings = 0;
    selectedMenu.sections.forEach((section) => {
      section.items.forEach((item) => {
        let itemPrice = parseFloat(item.price);
        if (selectedMenu.name === "Discounted" && item.special_price) {
          let specialPrice =
            item.special_price === "0" ? 0 : parseFloat(item.special_price);
          subtotal += specialPrice;
          savings += itemPrice - specialPrice;
        } else {
          subtotal += itemPrice;
        }
      });
    });
    return {
      subtotal: subtotal.toFixed(2),
      savings: savings.toFixed(2),
    };
  };

  const { subtotal, savings } = calculateSubtotalAndSavings();
  const subtotalValue = parseFloat(subtotal);
  const tax = (subtotalValue * taxRate).toFixed(2);
  const tip = (subtotalValue * tipRate).toFixed(2);
  const finalTotal = (
    subtotalValue +
    parseFloat(tax) +
    parseFloat(tip)
  ).toFixed(2);

  const openDateTimePicker = () => {
    setShowDateTimePickerModal(true);
    fetchAvailableTimes();
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      fetchAvailableTimes();
    } else {
      console.log("Date picker canceled by the user.");
    }
  };

  const fetchAvailableTimes = () => {
    // Simulate fetching available times based on the selected date
    const times = [
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
      "9:00 PM",
    ];
    setAvailableTimes(times);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    // Do not close the modal here; wait for user to press "Select"
  };

  const handleDateTimeConfirm = () => {
    // Close the modal when user confirms selection
    setShowDateTimePickerModal(false);
  };

  const handleDateTimeCancel = () => {
    // Optionally reset selectedTime if needed
    setSelectedTime(null);
    setShowDateTimePickerModal(false);
  };

  const handleTipIncrease = () => {
    if (tipRate < 0.3) setTipRate((prev) => Math.min(prev + 0.01, 0.3));
  };

  const handleTipDecrease = () => {
    if (tipRate > 0) setTipRate((prev) => Math.max(prev - 0.01, 0));
  };

  return (
    <Modal
      visible={openBottomSheet}
      animationType="slide"
      transparent={true}
      onRequestClose={closeBottomSheet}
    >
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <Pressable style={styles.backdrop} onPress={closeBottomSheet} />

        {/* Bottom Sheet Content */}
        <View style={styles.bottomSheetContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Reservation Summary */}
            <Text style={styles.titleText}>Reservation Summary</Text>

            {/* Summary Information */}
            <View style={styles.summaryContainer}>
              <SummaryRow label="Number of People:" value={numPeople} />
              <SummaryRow label="Total Budget:" value={totalBudget} />
              <SummaryRow label="Preferences:" value={preferences} />

              {/* Date and Time Picker Row */}
              <View style={styles.datePickerRow}>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={openDateTimePicker}
                >
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <Text style={styles.dateButtonText}>
                    Select Reservation Time
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectedDateContainer}
                  onPress={openDateTimePicker}
                >
                  <Text style={styles.selectedDateText}>
                    {selectedDate && selectedTime
                      ? `${selectedDate.toDateString()} ${selectedTime}`
                      : "No Date and Time Selected"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Selected Menu */}
            <View style={styles.menuContainer}>
              <Text style={styles.menuTitle}>
                Selected Menu: {selectedMenu.name}
              </Text>
              {selectedMenu.sections.map((section, index) => (
                <View key={index} style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{section.name}</Text>
                  {section.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.menuItemContainer}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      {selectedMenu.name === "Discounted" &&
                      item.special_price ? (
                        <View style={styles.priceContainer}>
                          <Text style={styles.specialPrice}>
                            {item.special_price === "0"
                              ? "Free"
                              : `$${parseFloat(item.special_price).toFixed(2)}`}
                          </Text>
                          <Text style={styles.originalPrice}>
                            ${parseFloat(item.price).toFixed(2)}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.menuItemPrice}>
                          ${parseFloat(item.price).toFixed(2)}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Total Calculation */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>${subtotal}</Text>
            </View>

            {selectedMenu.name === "Discounted" && parseFloat(savings) > 0 && (
              <View style={styles.totalContainer}>
                <Text style={[styles.totalLabel, styles.savingsLabel]}>
                  Savings:
                </Text>
                <Text style={[styles.totalValue, styles.savingsValue]}>
                  -${savings}
                </Text>
              </View>
            )}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Tax (8%):</Text>
              <Text style={styles.totalValue}>${tax}</Text>
            </View>

            {/* Tip Adjustment */}
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
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="#555"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.totalValue}>${tip}</Text>
            </View>

            <View style={[styles.totalContainer, styles.totalContainerFinal]}>
              <Text style={[styles.totalLabel, styles.totalLabelBold]}>
                Total:
              </Text>
              <Text style={[styles.totalValue, styles.totalValueBold]}>
                ${finalTotal}
              </Text>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={onSubmit}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Date and Time Picker Modal */}
      {showDateTimePickerModal && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showDateTimePickerModal}
          onRequestClose={handleDateTimeCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dateTimePickerModalContent}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />

              {availableTimes.length > 0 && (
                <>
                  <Text style={styles.modalTitle}>Available Times</Text>
                  <ScrollView contentContainerStyle={styles.timeSlots}>
                    {availableTimes.map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.timeSlot,
                          selectedTime === time && styles.selectedTimeSlot,
                        ]}
                        onPress={() => handleTimeSelect(time)}
                      >
                        <Text
                          style={[
                            styles.timeSlotText,
                            selectedTime === time &&
                              styles.selectedTimeSlotText,
                          ]}
                        >
                          {time}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleDateTimeCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={handleDateTimeConfirm}
                >
                  <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
}

// Reusable SummaryRow component
const SummaryRow = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 16,
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
  },
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  selectedDateContainer: {
    flex: 1,
    marginLeft: 10,
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  menuItemName: {
    fontSize: 16,
    flex: 1,
  },
  menuItemPrice: {
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  specialPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e60000",
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textDecorationLine: "line-through",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
  },
  savingsLabel: {
    color: "#e60000",
    fontWeight: "bold",
  },
  savingsValue: {
    color: "#e60000",
    fontWeight: "bold",
  },
  totalContainerFinal: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  totalLabelBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  totalValueBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  // Tip adjustment styles
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
  },
  tipAdjustLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipAdjustContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  tipButton: {
    marginHorizontal: 5,
  },
  tipValue: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 10,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  dateTimePickerModalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "left", // Align text to the left
  },
  timeSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Align to the left
  },
  timeSlot: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: "#007bff",
  },
  timeSlotText: {
    fontSize: 16,
  },
  selectedTimeSlotText: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end",
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#007bff",
    fontWeight: "600",
  },
  selectButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  dateButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 5,
  },
});
