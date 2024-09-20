import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router"; // Import useLocalSearchParams
import { searchService } from "../../search/api/api"; // Adjust the path as needed
import Ionicons from "@expo/vector-icons/Ionicons"; // Ensure Ionicons is installed

// Components

/**
 * AppBar Component
 * Displays the top navigation bar with the screen title.
 */
const AppBar = ({ title }) => (
  <View style={styles.appBar}>
    <Text style={styles.appBarTitle}>{title}</Text>
  </View>
);

/**
 * ReservationImage Component
 * Displays the reservation's image.
 */
const ReservationImage = ({ imageUrl }) => (
  <Image source={{ uri: imageUrl }} style={styles.image} />
);

/**
 * SummaryRow Component
 * Reusable component for displaying label-value pairs.
 */
const SummaryRow = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

/**
 * ReservationDetails Component
 * Displays detailed information about the reservation.
 */
/**
 * ReservationDetails Component
 * Displays detailed information about the reservation with labels left-aligned and data right-aligned.
 */
/**
 * ReservationDetails Component
 * Displays detailed information about the reservation with labels left-aligned and data right-aligned.
 * Prevents text from wrapping by keeping each detail on a single line.
 */
const ReservationDetails = ({ reservation }) => (
  <View style={styles.infoContainer}>
    {/* Address */}
    <View style={styles.detailRow}>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
        {reservation.address}
      </Text>
    </View>

    {/* Reservation Time */}
    <View style={styles.detailRow}>
      <Text style={styles.label}>Reservation Time:</Text>
      <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
        {reservation.reservation_date}
      </Text>
    </View>

    {/* Party Size */}
    <View style={styles.detailRow}>
      <Text style={styles.label}>Party Size:</Text>
      <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
        {reservation.party_size}
      </Text>
    </View>
  </View>
);

/**
 * MenuList Component
 * Lists the selected menu sections and items.
 * Only displays sections named "Custom".
 */
const MenuList = ({ menus, selectedMenu }) => {
  // Filter sections to only include those named "Custom"
  const customSections = menus.filter(
    (section) => section.name.toLowerCase() === "custom"
  )[0];

  if (customSections.length === 0) {
    return (
      <View style={styles.menuContainer}>
        <Text style={styles.noCustomSectionsText}>
          No Custom Sections Available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Selected Menu: {selectedMenu[0]?.name}</Text>
      {customSections.sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.name}</Text>
          {section.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.menuItemContainer}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              {selectedMenu.name === "Discounted" && item.special_price ? (
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
  );
};

/**
 * CancelButton Component
 * Provides an option to cancel the reservation if it's active.
 */
const CancelButton = ({ onCancel }) => (
  <View style={styles.cancelButtonContainer}>
    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
      <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
    </TouchableOpacity>
  </View>
);

/**
 * LoadingView Component
 * Displays a loading indicator.
 */
const LoadingView = () => (
  <View style={styles.centeredView}>
    <ActivityIndicator size="large" color="#6200EE" />
    <Text style={styles.loadingText}>Loading reservation details...</Text>
  </View>
);

/**
 * ErrorView Component
 * Displays error messages.
 */
const ErrorView = ({ message }) => (
  <View style={styles.centeredView}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default function ReservationInfoScreen() {
  const [reservation, setReservation] = useState(null); // To hold the reservation data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const [tipRate, setTipRate] = useState(0.15); // Initial tip rate

  const { id, isActive } = useLocalSearchParams(); // Get the reservation ID and active status from the params

  useEffect(() => {
    const fetchReservationAndRestaurant = async () => {
      try {
        // Fetch all restaurants from the API
        const response = await searchService.fetchAllRestaurants(); // Or fetchAllReservations based on your API
        if (response && response.data) {
          // Find the restaurant that matches the ID
          const foundRestaurant = response.data.find(
            (restaurant) => restaurant.id.toString() === id
          );

          if (foundRestaurant) {
            setRestaurant(foundRestaurant);
            setMenuItems(foundRestaurant.custom); // Assuming 'custom' is the selected menu
            setSelectedMenu(foundRestaurant.custom); // Ensure 'custom' has 'sections' and 'items'
            setReservation(foundRestaurant); // Assuming reservation data is part of restaurant
          } else {
            setError("Restaurant not found.");
          }
        } else {
          setError("No data found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching reservation data.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchReservationAndRestaurant(); // Fetch data when component mounts
  }, [id]);

  /**
   * Handles the cancellation of the reservation.
   * You can integrate your API call here to cancel the reservation.
   */
  const handleCancelReservation = () => {
    // Add logic to cancel the reservation
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // Example API call to cancel reservation
              const cancelResponse = await searchService.cancelReservation(id);
              if (cancelResponse.success) {
                Alert.alert("Success", "Reservation canceled successfully.");
                // Optionally, navigate back or update state
                setReservation(null); // Remove reservation data
              } else {
                Alert.alert("Error", "Failed to cancel reservation.");
              }
            } catch (err) {
              console.error("Error canceling reservation:", err);
              Alert.alert("Error", "An unexpected error occurred.");
            }
          },
        },
      ]
    );
  };

  /**
   * Function to calculate Subtotal and Savings based on selectedMenu
   */
  const calculateSubtotalAndSavings = () => {
    let subtotal = 0;
    let savings = 0;
    if (selectedMenu && selectedMenu[0].sections) {
      selectedMenu[0].sections.forEach((section) => {
        section.items.forEach((item) => {
          let itemPrice = parseFloat(item.price);
          if (selectedMenu[0].name === "Discounted" && item.special_price) {
            let specialPrice =
              item.special_price === "0" ? 0 : parseFloat(item.special_price);
            subtotal += specialPrice;
            savings += itemPrice - specialPrice;
          } else {
            subtotal += itemPrice;
          }
        });
      });
    }
    return {
      subtotal: subtotal.toFixed(2),
      savings: savings.toFixed(2),
    };
  };

  // Destructure subtotal and savings from the calculation
  const { subtotal, savings } = calculateSubtotalAndSavings();
  const subtotalValue = parseFloat(subtotal);
  const tax = (subtotalValue * 0.08).toFixed(2); // 8% tax
  const tip = (subtotalValue * tipRate).toFixed(2);
  const finalTotal = (
    subtotalValue +
    parseFloat(tax) +
    parseFloat(tip)
  ).toFixed(2);

  // Render loading state
  if (loading) {
    return <LoadingView />;
  }

  // Render error state
  if (error) {
    return <ErrorView message={error} />;
  }

  // Render no reservation data
  if (!reservation) {
    return <ErrorView message="No reservation data available." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <AppBar title="Reservation Info" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Reservation Title */}
        <Text style={styles.title}>{reservation.name}</Text>

        {/* Reservation Image */}
        {reservation.imageUrl && (
          <ReservationImage imageUrl={reservation.imageUrl} />
        )}

        {/* Reservation Details */}
        <ReservationDetails reservation={reservation} />

        {/* Menu List */}
        {selectedMenu && (
          <MenuList menus={menuItems} selectedMenu={selectedMenu} />
        )}

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
                onPress={() => setTipRate((prev) => Math.max(prev - 0.01, 0))}
              >
                <Ionicons name="remove-circle-outline" size={24} color="#555" />
              </TouchableOpacity>
              <Text style={styles.tipValue}>{(tipRate * 100).toFixed(0)}%</Text>
              <TouchableOpacity
                style={styles.tipButton}
                onPress={() => setTipRate((prev) => Math.min(prev + 0.01, 0.3))}
              >
                <Ionicons name="add-circle-outline" size={24} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.totalValue}>${tip}</Text>
        </View>

        <View style={[styles.totalContainer, styles.totalContainerFinal]}>
          <Text style={[styles.totalLabel, styles.totalLabelBold]}>Total:</Text>
          <Text style={[styles.totalValue, styles.totalValueBold]}>
            ${finalTotal}
          </Text>
        </View>

        {/* Conditionally show the cancel button if the reservation is currently active */}
        {isActive && <CancelButton onCancel={handleCancelReservation} />}
      </ScrollView>
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
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 20,
    paddingHorizontal: 0, // Optional: Add horizontal padding for better alignment
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // Space between rows
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    flex: 2, // Occupies available space on the left
    marginRight: 10, // Space between label and value
  },
  value: {
    fontSize: 15,
    color: "#555",
    textAlign: "right",
    flex: 3, // Occupies more space on the right
  },
  sponsored: {
    fontSize: 16,
    color: "#FF6347",
    marginTop: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  summaryValue: {
    fontSize: 16,
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
    color: "#333",
  },
  datePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
  selectedDateText: {
    fontSize: 16,
    flex: 1,
    textAlign: "right",
    marginLeft: 15,
    color: "#333",
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  menuItemName: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  menuItemPrice: {
    fontSize: 16,
    color: "#333",
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
  noCustomSectionsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  totalLabel: {
    fontSize: 16,
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    color: "#333",
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
    color: "#333",
  },
  totalValueBold: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
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
  // Cancel button styles
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
  // Loading and Error styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "#FF6347",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
