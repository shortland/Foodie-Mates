import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { searchService } from "../../search/api/api";
import RestaurantHeader from "./components/RestaurantHeader";
import MenuTabs from "./components/MenuTabs";
import MenuItems from "./components/MenuItems";
import ReservationButton from "./components/ReservationButton";
import ReviewModal from "./components/ReviewModal";
import MapModal from "./components/MapModal";
import styles from "./components/styles/styles";

export default function RestaurantInfoScreen() {
  // const { id } = useLocalSearchParams();
  const id = "1"; // Hardcoded for now
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await searchService.fetchAllRestaurants();
        if (response && response.data) {
          const foundRestaurant = response.data.find(
            (restaurant) => restaurant.id.toString() === id
          );
          if (foundRestaurant) {
            setRestaurant(foundRestaurant);
            const discountMenu = foundRestaurant.menus.find((menu) =>
              menu.name.toLowerCase().includes("discount")
            );
            if (discountMenu) {
              setSelectedMenu(discountMenu);
            }
          } else {
            setError("Restaurant not found.");
          }
        } else {
          setError("No restaurants found.");
        }
      } catch (err) {
        setError("Error fetching restaurant data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading restaurant details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.centeredView}>
        <Text>No restaurant data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <RestaurantHeader
          restaurant={restaurant}
          setModalVisible={setModalVisible}
          setMapModalVisible={setMapModalVisible}
        />
        <MapModal
          visible={mapModalVisible}
          restaurant={restaurant}
          onClose={() => setMapModalVisible(false)}
        />
        <MenuTabs
          restaurant={restaurant}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        {selectedMenu && <MenuItems selectedMenu={selectedMenu} />}
      </ScrollView>
      <ReservationButton />
      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
