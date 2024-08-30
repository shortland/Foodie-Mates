import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/app/src/hooks/useColorScheme";
import { TabBarIcon } from "@/app/src/components/navigation/TabBarIcon";
import { Colors } from "@/app/src/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabScreens = [
    { name: "home", title: "Home", icon: "home" },
    { name: "map", title: "Map", icon: "map" },
    { name: "search", title: "Request", icon: "search" },
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
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? screen.icon : `${screen.icon}-outline`}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
