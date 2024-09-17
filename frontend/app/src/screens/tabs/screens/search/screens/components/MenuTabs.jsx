import React from "react";
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function MenuTabs({ restaurant, selectedMenu, setSelectedMenu }) {
  return (
    <ScrollView horizontal={true} style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
      <View style={styles.menuContainer}>
        {restaurant.menus.map((menu, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuTab,
              selectedMenu && selectedMenu.name === menu.name && styles.selectedMenuTab,
            ]}
            onPress={() => setSelectedMenu(menu)}
          >
            <Text style={styles.menuTabText}>{menu.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
  },
  menuTab: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedMenuTab: {
    backgroundColor: '#d0e0ff',
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
