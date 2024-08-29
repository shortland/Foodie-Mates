import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { IS_TESTING } from '@/app/_layout';


const SETTINGS_OPTIONS = [
  { key: 'option1', title: 'Option 1', icon: 'settings-outline', action: () => Alert.alert('Option 1 Pressed') },
  { key: 'option2', title: 'Option 2', icon: 'person-outline', action: () => Alert.alert('Option 2 Pressed') },
  { key: 'option3', title: 'Option 3', icon: 'information-circle-outline', action: () => Alert.alert('Option 3 Pressed') },
];

if (IS_TESTING) {
  SETTINGS_OPTIONS.push({
    key: 'clearStorage',
    title: 'Clear Storage',
    icon: 'trash-outline',
    action: async () => {
      await AsyncStorage.clear();
      Alert.alert('Storage Cleared');
    },
  });
}

export default function AccountScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={item.action} style={styles.optionContainer}>
      <Ionicons name={item.icon} size={24} color="#FFF" style={styles.icon} />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={SETTINGS_OPTIONS}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622', // Keep your original dark background color
  },
  listContainer: {
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2A2A2A', // Darker background for the list item
    borderRadius: 10,
    marginBottom: 12, // Add some space between the list items
  },
  icon: {
    marginRight: 15, // Add space between the icon and the text
  },
  optionText: {
    fontSize: 16,
    color: '#FFF', // White text color to match your theme
    fontWeight: '500', // Slightly bolder text for better readability
  },
});
