import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MenuTabs({ menuItems, selectedMenu, setSelectedMenu, setIsLoadingNewMenu }) {
  const navigation = useNavigation();

  const onRegenerate = () => {
    setIsLoadingNewMenu(true);
    setTimeout(() => {
      setIsLoadingNewMenu(false);
    }, 500);
  };

  const handleMenuPress = (menu) => {
    if (menu.name === "Regenerate") {
      onRegenerate();
    } else if (menu.name === "Custom") {
      navigation.navigate("CustomPage"); // Replace with your actual route
    } else {
      setSelectedMenu(menu);
    }
  };

  return (
    <ScrollView
      horizontal={true}
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.menuContainer}>
        {menuItems.map((menu, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuTab,
              selectedMenu &&
                selectedMenu.name === menu.name &&
                styles.selectedMenuTab,
            ]}
            onPress={() => handleMenuPress(menu)}
          >
            <Text style={styles.menuTabText}>{menu.name}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          key="regen"
          style={[styles.menuTab, styles.actionTab]}
          onPress={() => handleMenuPress({ name: "Regenerate" })}
        >
          <Ionicons name="refresh-outline" size={20} color="#555" />
          <Text style={styles.menuTabText}>Regenerate</Text>
        </TouchableOpacity>

        {/* Custom Tab */}
        <TouchableOpacity
          key="custom"
          style={[styles.menuTab, styles.actionTab]}
          onPress={() => handleMenuPress({ name: "Custom" })}
        >
          <Ionicons name="add-outline" size={20} color="#555" />
          <Text style={styles.menuTabText}>Custom</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: "row",
  },
  menuTab: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedMenuTab: {
    backgroundColor: "#d0e0ff",
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5, // Space between icon and text
  },
  actionTab: {
    // Additional styles for Regenerate and Custom tabs if needed
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  loaderText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
