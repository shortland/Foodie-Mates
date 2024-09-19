import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MenuTabs({
  menuItems,
  selectedMenu,
  setSelectedMenu,
  handleOpenSheet,
}) {
  const handleMenuPress = (menu) => {
    if (menu.name === "Custom") {
      handleOpenSheet();
    } else {
      setSelectedMenu(menu);
    }
  };

  return (
    <View style={styles.menuTabsContainer}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.menuItemsContainer}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
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
      </ScrollView>
      <TouchableOpacity
        key="custom"
        style={[
          styles.menuTab,
          styles.customTab,
          selectedMenu &&
            selectedMenu.name === "Custom" &&
            styles.selectedMenuTab,
        ]}
        onPress={() => handleMenuPress({ name: "Custom" })}
      >
        <Ionicons name="add-outline" size={20} color="#007bff" />
        <Text style={[styles.menuTabText, styles.customTabText]}>Custom</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuTabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  menuItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 6,
  },
  menuTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedMenuTab: {
    backgroundColor: "#d0e0ff",
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 3,
    color: "#000",
  },
  customTab: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007bff", // Theme color
    height: 39
  },
  customTabText: {
    color: "#007bff", // Theme color
  },
});
