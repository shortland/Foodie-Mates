import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/app/src/hooks/useColorScheme";
import { TabBarIcon } from "@/app/src/components/navigation/TabBarIcon";
import { Colors } from "@/app/src/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabScreens = [
    { name: "home", title: "Home", icon: "home" },
    { name: "search", title: "Add", icon: "add-circle" },
    { name: "orders", title: "Orders", icon: "menu" },
    { name: "account", title: "Account", icon: "person" },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      {tabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, focused }) =>
              screen.name === "add" ? (
                <View style={styles.addButtonContainer}>
                  <TabBarIcon
                    name={focused ? screen.icon : `${screen.icon}-outline`}
                    color={color}
                    style={styles.addButtonIcon}
                  />
                </View>
              ) : (
                <TabBarIcon
                  name={focused ? screen.icon : `${screen.icon}-outline`}
                  color={color}
                />
              ),
            tabBarButton: (props) =>
              screen.name === "add" ? (
                <TouchableOpacity {...props} style={styles.addButtonWrapper} />
              ) : (
                <TouchableOpacity {...props} />
              ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButtonWrapper: {
    top: -15, // Adjust this value to elevate the button
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary, // Adjust color as needed
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary, // Adjust color as needed
  },
  addButtonIcon: {
    fontSize: 35, // Adjust size as needed
    color: "#fff", // Adjust icon color as needed
  },
});
