// FormSwitch.js
import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const FormSwitch = ({
  title,
  value,
  onValueChange,
  options = ["Customer", "Restaurant"], // Updated default options for clarity
  otherStyles,
  ...props
}) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.optionText}>
          {value ? options[1] : options[0]}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#767577", true: "#0a7ea4" }} // Gray for off, primary blue for on
          thumbColor={value ? "#ffffff" : "#f4f3f4"} // White thumb for both states
          ios_backgroundColor="#3e3e3e" // Default iOS background
          {...props}
        />
      </View>
    </View>
  );
};

export default FormSwitch;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    color: "#333", // Dark text color for better readability
    marginBottom: 8,
    fontWeight: "500",
  },
  switchContainer: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff", // White background for the switch container
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd", // Light gray border
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    color: "#333", // Dark text color
    fontWeight: "500",
  },
});
