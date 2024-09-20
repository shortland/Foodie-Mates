import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// MenuSection Component
const MenuSection = ({ section, selectedMenuName, handleRegenMenuSection }) => {
  const [isLoading, setIsLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Spin animation function
  const startSpin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000, // Spin for 2 seconds
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (isLoading) {
        startSpin(); // Continue spinning if still loading
      }
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Handle regenerate button press
  const handleRegeneratePress = () => {
    setIsLoading(true);
    startSpin();

    // Simulate regeneration process
    setTimeout(() => {
      handleRegenMenuSection(selectedMenuName, section.name);
      setIsLoading(false);
    }, 2000); // 2-second delay to match spinner duration
  };

  return (
    <View style={styles.section}>
      <View style={styles.rowContainer}>
        <Text style={styles.sectionTitle}>{section.name}</Text>
        {selectedMenuName !== "Discounted" && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleRegeneratePress}
          >
            <Animated.View
              style={{ transform: [{ rotate: isLoading ? spin : "0deg" }] }}
            >
              <Ionicons name="refresh-outline" size={20} color="#555" />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#000" />
          <Text style={styles.loaderText}> Regenerating...</Text>
        </View>
      ) : (
        section.items.map((item, itemIndex) => (
          <View key={itemIndex} style={styles.menuItem}>
            <View style={styles.menuItemHeader}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              {selectedMenuName === "Discounted" && item.special_price ? (
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
            <Text style={styles.menuItemDescription}>{item.description}</Text>
          </View>
        ))
      )}
    </View>
  );
};

// Main MenuItems Component
export default function MenuItems({
  selectedMenu,
  isLoadingCustomMenu,
  handleRegenMenuSection,
}) {
  const [tipRate, setTipRate] = useState(0.15); // Default tip rate of 15%

  // Calculate Subtotal and Savings using useMemo for optimization
  const { subtotal, savings } = useMemo(() => {
    let subtotal = 0;
    let savings = 0;
    selectedMenu.sections.forEach((section) => {
      section.items.forEach((item) => {
        const itemPrice = parseFloat(item.price);
        if (selectedMenu.name === "Discounted" && item.special_price) {
          const specialPrice =
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
  }, [selectedMenu]);

  const handleTipIncrease = () => {
    if (tipRate < 0.3) setTipRate((prev) => Math.min(prev + 0.01, 0.3));
  };

  const handleTipDecrease = () => {
    if (tipRate > 0) setTipRate((prev) => Math.max(prev - 0.01, 0));
  };

  const taxRate = 0.08; // Example tax rate of 8%
  const subtotalValue = parseFloat(subtotal);
  const tax = (subtotalValue * taxRate).toFixed(2);
  const tip = (subtotalValue * tipRate).toFixed(2);
  
  // Corrected total calculation: subtotal + tax + tip
  const total = (subtotalValue + parseFloat(tax) + parseFloat(tip)).toFixed(2);

  return (
    <View>
      <View style={styles.menuSection}>
        {isLoadingCustomMenu ? (
          // Loader screen while regenerating
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#000" />
            <Text style={styles.loaderText}> Regenerating Custom Menu...</Text>
          </View>
        ) : (
          selectedMenu.sections.map((section, sectionIndex) => (
            <MenuSection
              key={sectionIndex}
              selectedMenu={selectedMenu}
              section={section}
              selectedMenuName={selectedMenu.name}
              handleRegenMenuSection={handleRegenMenuSection}
            />
          ))
        )}
      </View>

      {/* Subtotal, Savings, Tax, Tip, and Total Breakdown */}
      {!isLoadingCustomMenu && (
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>${subtotal}</Text>
          </View>

          {selectedMenu.name === "Discounted" && parseFloat(savings) > 0 && (
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, styles.savingsLabel]}>
                Savings:
              </Text>
              <Text style={[styles.totalValue, styles.savingsValue]}>
                -${savings}
              </Text>
            </View>
          )}

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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5, // Reduced from 10 to 5
    paddingHorizontal: 10, // Adjusted for consistency
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 0, // Ensure no extra margin at the bottom
    padding: 0, // Remove any padding
  },
  iconButton: {
    padding: 4, // Reduced from 8 to 4
    backgroundColor: "#f0f0f0",
    borderRadius: 16, // Adjusted to match the smaller padding
    margin: 0, // Remove any margin
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 10, // Reduced from 15 to 10
    marginBottom: 5, // Reduced from 10 to 5
  },
  loaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loaderText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  menuSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  section: {
    marginBottom: 15,
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
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  specialPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e60000", // Red color for discounted price
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textDecorationLine: "line-through",
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
  savingsLabel: {
    color: "#e60000",
    fontWeight: "bold",
  },
  savingsValue: {
    color: "#e60000",
    fontWeight: "bold",
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
