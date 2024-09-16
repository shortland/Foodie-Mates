// FormField.js
import React, { useState, forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import icons from "@/app/src/constants/icons";

const FormField = forwardRef(
  (
    {
      title,
      value,
      placeholder,
      handleChangeText,
      otherStyles,
      isBox,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View style={[styles.container, otherStyles]}>
        {isBox ? (
          <TouchableOpacity
            style={styles.boxContainer}
            onPress={() => ref.current.focus()}
          >
            <Text style={styles.boxTitle}>{title}</Text>
            <TextInput
              style={styles.boxInput}
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#7B7B8B"
              onChangeText={handleChangeText}
              secureTextEntry={title === "Password" && !showPassword}
              ref={ref}
              {...props}
            />
            {title === "Password" && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.boxIcon}
              >
                <Image
                  source={!showPassword ? icons.eye : icons.eyeHide}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !showPassword}
                ref={ref}
                {...props}
              />

              {title === "Password" && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 16, // Increased font size for better readability
    color: "#333",
    fontWeight: "600",
    marginBottom: 6,
  },
  inputContainer: {
    width: "100%",
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9", // Slightly lighter background for better contrast
    borderRadius: 12, // Reduced border radius for a more modern look
    borderWidth: 1.5,
    borderColor: "#dcdcdc", // Softer border color
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000", // Added shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  textInput: {
    flex: 1,
    color: "#333",
    fontWeight: "700", // Bold text for emphasis
    fontSize: 20, // Increased font size
    textAlign: "right", // Right-aligned text
  },
  icon: {
    width: 28, // Slightly larger icon
    height: 28,
    tintColor: "#555", // Darker tint for better visibility
  },
  boxContainer: {
    width: "100%",
    height: 100,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#dcdcdc",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxTitle: {
    fontSize: 14, // Increased font size
    color: "#555", // Darker color for better contrast
    marginBottom: 8,
    textAlign: "left",
  },
  boxInput: {
    fontSize: 30, // Larger font size
    color: "#333",
    fontWeight: "700",
    textAlign: "right", // Right-aligned text
  },
  boxIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});

export default FormField;
