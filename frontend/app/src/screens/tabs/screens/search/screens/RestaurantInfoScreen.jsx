import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { searchService } from "../../search/api/api";
import RestaurantHeader from "./components/RestaurantHeader";
import MenuTabs from "./components/MenuTabs";
import MenuItems from "./components/MenuItems";
import ReservationButton from "./components/ReservationButton";
import ReviewModal from "./components/ReviewModal";
import MapModal from "./components/MapModal";
import styles from "./components/styles/styles";
import CustomOrderBottomSheet from "./components/CustomOrderBottomSheet";
import ReservationBottomSheet from "./components/ReservationBottomSheet";
import { mock } from "@/app/test/constants/mockData";

export default function RestaurantInfoScreen() {
  // const { id } = useLocalSearchParams();
  const id = "1"; // Hardcoded for now
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingNewMenu, setIsLoadingNewMenu] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openReservationBottomSheet, setOpenReservationBottomSheet] =
    useState(false);
  const [text, setText] = useState("");

  const handleOpenSheet = () => {
    setOpenBottomSheet(true);
  };

  const handleCloseSheet = () => {
    setOpenBottomSheet(false);
  };

  const handleSubmit = () => {
    // Close the bottom sheet first
    handleCloseSheet();

    // Start loading spinner after the bottom sheet is closed
    setTimeout(() => {
      // Start loading spinner
      setIsLoadingNewMenu(true);

      // Simulate loading delay (e.g., 2 seconds)
      setTimeout(() => {
        // Set the new custom menu
        setSelectedMenu(restaurant.custom[0]);

        // Stop the loading spinner
        setIsLoadingNewMenu(false);
      }, 500); // 2 seconds delay
    }, 0); // Small delay to ensure the bottom sheet closes first
  };

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
            setMenuItems(foundRestaurant.menus);
            setSelectedMenu(foundRestaurant.menus[0]);
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

  const handleConfirm = (formData) => {
  };

  // super hack here
  useEffect(() => {
    if (restaurant && selectedMenu.name !== "Custom") {
      setMenuItems(restaurant.regeneratedMenus);
      setSelectedMenu(restaurant.regeneratedMenus[0]);
    }
  }, [isLoadingNewMenu]);

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
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
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
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          handleOpenSheet={handleOpenSheet}
          setSelectedMenu={setSelectedMenu}
          setIsLoadingNewMenu={setIsLoadingNewMenu}
        />
        <CustomOrderBottomSheet
          openBottomSheet={openBottomSheet}
          text={text}
          setText={setText}
          onSubmit={handleSubmit}
          closeBottomSheet={handleCloseSheet}
        />
        <ReservationBottomSheet
          openBottomSheet={openReservationBottomSheet}
          selectedMenu={selectedMenu}
          numPeople={mock.formData.num_people}
          totalBudget={mock.formData.total_budget}
          preferences={mock.formData.preferences}
          onSubmit={handleConfirm}
          closeBottomSheet={handleCloseSheet}
        />

        {isLoadingNewMenu ? (
          <ActivityIndicator size="large" />
        ) : (
          selectedMenu && <MenuItems selectedMenu={selectedMenu} />
        )}
      </ScrollView>
      <ReservationButton
        setOpenReservationBottomSheet={setOpenReservationBottomSheet}
      />
      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
