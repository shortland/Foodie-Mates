import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function CustomOrderBottomSheet({
  openBottomSheet,
  text,
  onSubmit,
  setText,
  closeBottomSheet, // Function to close the bottom sheet
}) {
  return (
    <Modal
      visible={openBottomSheet}
      animationType="slide"
      transparent={true}
      onRequestClose={closeBottomSheet} // Close the modal when pressing back or tapping outside
    >
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.bottomSheetContainer}>
              <ScrollView>
                <Text style={styles.titleText}>
                  How can we curate the menu better for you?
                </Text>
                {/* Text Input Box */}
                <TextInput
                  value={text}
                  onChangeText={setText}
                  placeholder="What do you want to see on the menu..."
                  style={styles.textInput}
                  multiline={true}
                  scrollEnabled={true} // Enable scrolling inside the TextInput
                  numberOfLines={18} // Set an initial number of lines for a larger box
                />
                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={onSubmit}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background for dim effect
  },
  bottomSheetContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    height: "70%", // Higher bottom sheet
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 180,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#6ebf6e", // Softer green for the button
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 150, // Increase the height for more multiline space
    textAlignVertical: "top",
    marginBottom: 20,
  },
});
