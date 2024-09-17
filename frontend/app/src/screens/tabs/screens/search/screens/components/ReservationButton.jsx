import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ReservationButton() {
  return (
    <TouchableOpacity style={styles.reservationButton} onPress={() => alert('Reservation added!')}>
      
      <Text style={styles.reservationButtonText}> Reserve Now  {" "}<Icon name="calendar" size={20} color="#fff" /> </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reservationButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgb(234, 158, 53)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 80,
  },
  reservationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
