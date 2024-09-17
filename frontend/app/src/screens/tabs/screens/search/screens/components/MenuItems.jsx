import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MenuItems({ selectedMenu }) {
  return (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{selectedMenu.name}</Text>
      {selectedMenu.items.map((item, index) => (
        <View key={index} style={styles.menuItem}>
          <View style={styles.menuItemHeader}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
          </View>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuSection: {
    padding: 15,
  },
  menuSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  menuItemDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});
