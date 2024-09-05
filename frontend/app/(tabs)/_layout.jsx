import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/app/src/hooks/useColorScheme";
import { TabBarIcon } from "@/app/src/components/navigation/TabBarIcon";
import { Colors } from "@/app/src/constants/Colors";
import { AccountType } from "../src/models/AccountType";
import { useAccountType } from "../src/hooks/useAccountType";

const TabLayout = () => {
  const accountType = useAccountType();
  const colorScheme = useColorScheme();

  // Define tabs based on the account type
  const tabs = [
    {
      name: "home",
      title: "Home",
      icon: "home",
      visibleFor: [AccountType.PERSON, AccountType.RESTAURANT],
    },
    {
      name: "search",
      title: "Add",
      icon: "add-circle",
      visibleFor: [AccountType.PERSON],
    },
    {
      name: "orders",
      title: "Reservations",
      icon: "menu",
      visibleFor: [AccountType.PERSON],
    },
    {
      name: "analytics",
      title: "Analytics",
      icon: "trending-up",
      visibleFor: [AccountType.RESTAURANT],
    },
    {
      name: "account",
      title: "Account",
      icon: "person",
      visibleFor: [AccountType.PERSON, AccountType.RESTAURANT],
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme]?.tint || Colors.light.tint,
        headerShown: false,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            href: tab.visibleFor.includes(accountType) ? undefined : null,
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? tab.icon : `${tab.icon}-outline`}
                color={color}
                style={tab.name === "add" ? styles.addButtonIcon : null}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  addButtonWrapper: {
    top: -15,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonIcon: {
    fontSize: 35,
    color: "#fff",
  },
});

export default TabLayout;
