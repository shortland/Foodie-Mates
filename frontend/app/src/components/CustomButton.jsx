// CustomButton.js
import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.buttonDisabled,
      ]}
      disabled={isLoading}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.content}>
        <Text style={[styles.buttonText, textStyles]}>{title}</Text>
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            style={styles.loader}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0a7ea4", // Primary button color
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12, // Rounded corners
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // Align text and loader horizontally
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6, // Dim the button when loading
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 18, // Larger font size for better readability
    fontWeight: "600", // Semi-bold text
    textAlign: "center",
  },
  loader: {
    marginLeft: 10, // Space between text and loader
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomButton;
