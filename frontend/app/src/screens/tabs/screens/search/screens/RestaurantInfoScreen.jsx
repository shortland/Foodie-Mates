import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { searchService } from "../../search/api/api";

const randomUsernames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hannah",
  "Ivy",
  "Jack",
  "Kathy",
  "Leo",
  "Mona",
  "Nina",
  "Oscar",
];

const randomReviewCount = Math.floor(Math.random() * (2500 - 1 + 1)) + 1;

export default function RestaurantInfoScreen() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useLocalSearchParams();
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
            const discountMenu = foundRestaurant.menus.find(menu => menu.name.toLowerCase().includes('discount'));
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
        console.error("Error fetching restaurant:", err);
        setError("Error fetching restaurant data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleRatingClick = () => {
    setModalVisible(true);
  };

  const handleDistanceClick = () => {
    setMapModalVisible(true);
  };

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

  const defaultCoordinates = {
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
  };

  const restaurantCoordinates = {
    latitude: restaurant.latitude || defaultCoordinates.latitude,
    longitude: restaurant.longitude || defaultCoordinates.longitude,
  };

  const formatHours = (hours) => {
    return hours.split(',').map((hour, index) => (
      <Text key={index} style={styles.hoursText}>
        {hour.trim()}
      </Text>
    ));
  };

  const randomLetter = () => {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        {restaurant.imageUrl && (
          <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
        )}

        {/* Header Section with Background Color */}
        <View style={styles.header}>
          <Text style={styles.title}>{restaurant.name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.distanceButton} onPress={handleDistanceClick}>
            <Text style={styles.distanceButtonText}>
              View on Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRatingClick}>
            <Text style={styles.rating}>Rating: {restaurant.rating} ★ {randomReviewCount}</Text>
          </TouchableOpacity>

          {restaurant.isSponsored && (
            <Text style={styles.sponsored}>Sponsored</Text>
          )}

          {/* Restructured Details Section */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Hours: </Text>
              <Text style={styles.openText}>Currently Open</Text>
            </Text>
            {formatHours(restaurant.hours)}
            
            {/* add some empty height padding here */}
            <View style={{ height: 10 }} />

            <Text style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Price: </Text>{restaurant.price}
            </Text>
            <Text style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Cuisines: </Text>{restaurant.cuisines}
            </Text>
            <Text style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Additional Info: </Text>
            </Text>
            {restaurant.additionalInfo.split(',').map((info, index) => (
              <Text key={index} style={styles.additionalInfoRow}>
                {info.trim()}
              </Text>
            ))}
          </View>
        </View>

        {/* Menu Tabs */}
        <ScrollView horizontal={true} style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
          <View style={styles.menuContainer}>
            {restaurant.menus.map((menu, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuTab,
                  selectedMenu && selectedMenu.name === menu.name && styles.selectedMenuTab
                ]}
                onPress={() => handleMenuClick(menu)}
              >
                <Text style={styles.menuTabText}>{menu.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Selected Menu Section */}
        {selectedMenu && (
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{selectedMenu.name}</Text>
            {/* Render the selected menu items here */}
            {selectedMenu.items.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <View style={styles.menuItemHeader}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemPrice}>{item.price}</Text>
                </View>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Add padding at the bottom to avoid hiding content */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Add Reservation Button */}
        <View style={styles.reservationButtonContainer}>
          <TouchableOpacity style={styles.reservationButton} onPress={() => { 
            // Implement reservation logic here
            alert('TODO;Reservation added!');
          }}>
            <Icon name="calendar-plus-o" size={20} color="#fff" />
            <Text style={styles.reservationButtonText}> Add Reservation</Text>
          </TouchableOpacity>
        </View>

      {/* Modal for Reviews */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reviews</Text>
            <ScrollView contentContainerStyle={styles.modalScrollView}>
              {Array.from({ length: 15 }).map((_, index) => (
                <View key={index} style={styles.reviewContainer}>
                  <Text style={styles.reviewUsername}>{randomUsernames[index % randomUsernames.length]} {randomLetter()}</Text>
                  <Text style={styles.reviewDate}>2023-10-{index + 1}</Text>
                  <Text style={styles.reviewText}>
                    {index % 3 === 0
                      ? "Great food and service! Will definitely come back."
                      : index % 3 === 1
                      ? "Loved the ambiance. The staff were very friendly and the food was delicious."
                      : "The food was okay, but the service could be improved. The wait time was a bit long."}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for Map */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={mapModalVisible}
        onRequestClose={() => {
          setMapModalVisible(!mapModalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MapView
              style={styles.fullMap}
              initialRegion={{
                latitude: restaurantCoordinates.latitude,
                longitude: restaurantCoordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: restaurantCoordinates.latitude,
                  longitude: restaurantCoordinates.longitude,
                }}
                title={restaurant.name}
                description={restaurant.address}
              />
            </MapView>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setMapModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    // flex: 1,
    padding: 15,
    paddingBottom: 100, // Add padding to avoid hiding content behind the button
  },
  // Header section with background color
  header: {
    // backgroundColor: 'rgb(234, 158, 53)', // Change this color to your preference
    padding: 15,
    // borderRadius: 5,
    marginBottom: 10,
    marginLeft: -15,
    marginRight: -15,
    // marginTop: -15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    // color: 'white',
  },
  image: {
    width: '120%',
    height: 200,
    // marginBottom: 10,
    marginLeft: -15,
    marginRight: -15,
    marginTop: -15,
  },
  infoContainer: {
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    color: 'blue', // Make the rating value blue to indicate interactivity
    marginBottom: 5,
  },
  // Restructured details styles
  detailsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  detailsRow: {
    fontSize: 16,
    marginBottom: 5,
  },
  additionalInfoRow: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  detailsLabel: {
    fontWeight: 'bold',
  },
  hoursText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  distanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  distanceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    textAlign: 'center', // Center the text
    flex: 1, // Ensure the text takes up the full width of the parent
  },
  sponsored: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  scrollContainer: {
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
  },
  menuTab: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0', // Slightly darker background to indicate interactivity
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Add a border to make it more distinct
    shadowColor: '#000', // Add shadow for better visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  selectedMenuTab: {
    backgroundColor: '#d0e0ff',
    borderColor: '#0000ff',
    borderWidth: 2,
  },
  menuTabText: {
    fontSize: 16,
    fontWeight: 'bold', // Make text bold to stand out
  },
  menuSection: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  menuSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  menuItemDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservationButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  reservationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(234, 158, 53)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  reservationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomPadding: {
    // height: 100, // Add padding to avoid hiding content behind the button
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%', // Adjust height to prevent overflow
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalScrollView: {
    paddingBottom: 20,
  },
  reviewContainer: {
    marginBottom: 15,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  fullMap: {
    width: '100%',
    height: '100%', // Make the map take the full height of the modal
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }], // Correctly center the button
    backgroundColor: '#6200EE', // Add background color to the button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // Set a fixed width to help with centering
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  openText: {
    color: 'green',
    fontWeight: 'bold',
  },
});
