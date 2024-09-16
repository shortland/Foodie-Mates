// DropDown.js
import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList, 
  TouchableWithoutFeedback 
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DropDown = ({ title, value, options, handleChangeText, tooltipText }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleOptionPress = (itemValue) => {
    handleChangeText(itemValue);
    setIsDropdownOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => { setIsTooltipVisible(false); setIsDropdownOpen(false); }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={toggleTooltip}>
            <Ionicons name="information-circle-outline" size={20} color="#0a7ea4" />
          </TouchableOpacity>
        </View>

        {isTooltipVisible && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
                {tooltipText}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.selectedValue}>
            {value ? options.find(opt => opt.value === value)?.label : "Select a cuisine"}
          </Text>
          <Ionicons name={isDropdownOpen ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#333" />
        </TouchableOpacity>

        <Modal
          visible={isDropdownOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {options.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.option}
                    onPress={() => handleOptionPress(item.value)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginRight: 4,
  },
  tooltip: {
    position: "absolute",
    top: 24,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 8,
    zIndex: 2,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  dropdown: {
    width: '100%',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedValue: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    maxHeight: "80%",
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
});

export default DropDown;
