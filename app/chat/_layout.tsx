import React from "react";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#021b10",
          borderTopColor: "#00ff88",
          borderTopWidth: 1,
          height: 70,
        },
        tabBarActiveTintColor: "#00ff88",
        tabBarInactiveTintColor: "#1f8f5a",
        tabBarLabelStyle: {
          fontFamily: "VGA",
          fontSize: 10,
          letterSpacing: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "CONVERSAS",
        }}
      />

      <Tabs.Screen
        name="todos"
        options={{
          title: "TODOS",
        }}
      />
    </Tabs>
  );
}