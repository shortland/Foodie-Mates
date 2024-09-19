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
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [date, setDate] = useState(new Date());
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const calculateSubtotal = () =>
    selectedMenu.sections
      .reduce(
        (total, section) =>
          total +
          section.items.reduce(
            (sectionTotal, item) => sectionTotal + parseFloat(item.price),
            0
          ),
        0
      )
      .toFixed(2);

  const subtotal = parseFloat(calculateSubtotal()).toFixed(2);
  const tax = (subtotal * taxRate).toFixed(2);
  const finalTotal = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    fetchAvailableTimes(currentDate); // Fetch available times after date is selected
  };

  const openDatePicker = () => setShowDatePickerModal(true);

  // Simulate fetching available times from an API
  const fetchAvailableTimes = (selectedDate) => {
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
    setSelectedTime(null); // Reset selected time when a new date is chosen
  };

  const handleTimeSelect = (time) => setSelectedTime(time);

  return (
    <Modal
      visible={openBottomSheet}
      animationType="slide"
      transparent={true}
      onRequestClose={closeBottomSheet}
    >
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.bottomSheetContainer}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Reservation Summary */}
                <Text style={styles.titleText}>Reservation Summary</Text>

                {/* Summary Information */}
                <View style={styles.summaryContainer}>
                  <SummaryRow label="Number of People:" value={numPeople} />
                  <SummaryRow label="Total Budget:" value={totalBudget} />
                  <SummaryRow label="Preferences:" value={preferences} />

                  {/* Date Picker Button */}
                  <View style={styles.datePickerContainer}>
                    <TouchableOpacity
                      style={styles.dateButton}
                      onPress={openDatePicker}
                    >
                      <Text style={styles.dateButtonText}>
                        Pick a Reservation Date
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.selectedDateText}>
                      Selected Date: {date.toDateString()}
                    </Text>
                  </View>

                  {/* Selected Time */}
                  {selectedTime && (
                    <Text style={styles.selectedTimeText}>
                      Selected Time: {selectedTime}
                    </Text>
                  )}
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
                          <Text style={styles.menuItemPrice}>
                            ${parseFloat(item.price).toFixed(2)}
                          </Text>
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
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Tax (8%):</Text>
                  <Text style={styles.totalValue}>${tax}</Text>
                </View>
                <View
                  style={[styles.totalContainer, styles.totalContainerFinal]}
                >
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

      {/* Separate DateTimePicker Modal */}
      {showDatePickerModal && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showDatePickerModal}
          onRequestClose={() => setShowDatePickerModal(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setShowDatePickerModal(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.datePickerModalContent}>
                <Text style={styles.timeSlotTitle}>Select A Date</Text>
                  <View style={styles.datePickerContent}>
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChangeDate}
                      minimumDate={new Date()} // Prevent past dates
                    />
                  </View>

                  {/* Available Time Slots */}
                  {availableTimes.length > 0 && (
                    <View style={styles.timeSlotContainer}>
                      <Text style={styles.timeSlotTitle}>Available Times</Text>
                      <View style={styles.timeSlots}>
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
                      </View>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
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
  // Existing styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
  },
  datePickerContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  dateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  selectedTimeText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
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
  },
  menuItemPrice: {
    fontSize: 16,
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
  // Updated styles for the date picker modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerModalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%", // Adjust as needed
  },
  datePickerContent: {
    marginBottom: 20,
  },
  timeSlotContainer: {
    marginTop: 10,
  },
  timeSlotTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  timeSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "48%", // Adjust the width as needed
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
});

