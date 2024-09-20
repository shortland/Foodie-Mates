import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router"; // To get query params and navigate
import { searchService } from "../../search/api/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker } from 'react-native-maps';
import CustomButton from "@/app/src/components/CustomButton";

export default function RefineResultsScreen() {
  const searchParams = useLocalSearchParams(); // Extract search parameters from the URL
  const router = useRouter(); // Use router to navigate to restaurant-info page
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To handle any errors
  const [peopleCount, setPeopleCount] = useState(2); // Add the People section with Ionicons person icon
  const [distanceValue, setDistanceValue] = useState("0.4");
  const [budgetValue, setBudgetValue] = useState("$45");

  const [appetizerCount, setAppetizerCount] = useState(1);
  const [entreeCount, setEntreeCount] = useState(2);
  const [drinkCount, setDrinkCount] = useState(1);
  const [dessertCount, setDessertCount] = useState(1);

  const increaseAppetizerCount = () => {
    setAppetizerCount(appetizerCount + 1);
  };

  const decreaseAppetizerCount = () => {
    if (appetizerCount > 0) {
      setAppetizerCount(appetizerCount - 1);
    }
  };

  const increaseEntreeCount = () => {
    setEntreeCount(entreeCount + 1);
  };

  const decreaseEntreeCount = () => {
    if (entreeCount > 0) {
      setEntreeCount(entreeCount - 1);
    }
  };

  const increaseDrinkCount = () => {
    setDrinkCount(drinkCount + 1);
  };

  const decreaseDrinkCount = () => {
    if (drinkCount > 0) {
      setDrinkCount(drinkCount - 1);
    }
  };

  const increaseDessertCount = () => {
    setDessertCount(dessertCount + 1);
  };

  const decreaseDessertCount = () => {
    if (dessertCount > 0) {
      setDessertCount(dessertCount - 1);
    }
  };

  const increasePeopleCount = () => {
    setPeopleCount(peopleCount + 1);
  };

  const decreasePeopleCount = () => {
    if (peopleCount > 1) {
      setPeopleCount(peopleCount - 1);
    }
  };

  const increaseDistance = () => {
    setDistanceValue((parseFloat(distanceValue) + 0.1).toFixed(1));
  };

  const decreaseDistance = () => {
    if (parseFloat(distanceValue) > 0.1) {
      setDistanceValue((parseFloat(distanceValue) - 0.1).toFixed(1));
    }
  };

  const handleDistanceChange = (value) => {
    setDistanceValue(value);
  };

  const doneDistanceChange = () => {
    setDistanceValue(parseFloat(distanceValue).toFixed(1));
  };

  const increaseBudget = () => {
    // setBudgetValue((parseFloat(budgetValue) + 1).toFixed(2));
    let num = parseFloat(getBudgetNumericalValue(budgetValue));
    num += 1.0;
    setBudgetValue("$" + num);
  };

  const decreaseBudget = () => {
    let num = parseFloat(getBudgetNumericalValue(budgetValue));

    if (num > 1) {
      // setBudgetValue((parseFloat(budgetValue) - 1).toFixed(2));
      num -= 1.0;
      setBudgetValue("$" + num);
    }
  };

  const handleBudgetChange = (value) => {
    setBudgetValue(value);
  };

  const doneEditingBudget = () => {
    let budgetNumerical = getBudgetNumericalValue(budgetValue);

    setBudgetValue("$" + budgetNumerical);
  };

  const getBudgetNumericalValue = (stringBudget) => {
    return parseFloat(stringBudget.toString().replace("$", "")).toFixed(2);
  }

  const goodFeatures = [
    "Most Main Course Options",
    "You have visited here before",
    "Most Vegeteranian Options",
    "Most Vegan Options",
    "Closest Walking Distance",
    "Newly Opened",
    "Takeout Available",
    "NYT Recommended",
    "Usually Fully Booked",
    "No Wait Time",
  ];
  goodFeatures.sort(() => Math.random() - 0.1);

  // Fetch restaurant data from the API on mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Simulate a delay for 1.5 seconds to test loading state
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Include searchParams in the API request
        const response = await searchService.fetchRestaurantsFromQuery(
          searchParams
        );

        if (response && response.data) {
          // Sort the restaurants: sponsored ones first
          const sortedRestaurants = response.data.sort((a, b) => {
            if (a.sponsored && !b.sponsored) return -1;
            if (!a.sponsored && b.sponsored) return 1;
            return 0;
          });

          setRestaurants(sortedRestaurants);
        } else {
          setError("No restaurants found.");
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Error fetching restaurant data.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRestaurants();
  }, [searchParams]);

  // Navigate to the restaurant-info route
  const handlePress = (restaurantId) => {
    router.push({
      pathname: "/restaurant-info",
      params: { id: restaurantId },
    });
  };

  /**
   * Fixed price if it's first restaurant, otherwise generate a random price
   * That way demo works out to right numbers when we click on first restaurant for the video.
   */
  const generateKindaRandomPrice = (restaurantId) => {
    if (restaurantId == "1") {
      // first restaurant should be cheapest, so it's price should be below the min specified below so that
      // we can say it's the cheapest option when adding the unique features description
      return "$42.99";
    }

    // TODO; set this min to be above the cheapest restaurant/first restaurant price
    const min = 43.00;
    // TODO; set this max to be the max the persopn will type when submittinjg the form
    const max = 100.10;
    // Generate a random number between min and max
    const randomPrice = (Math.random() * (max - min) + min).toFixed(2);
    return `$${randomPrice}`;
  }

  const generatedRandomUniqueFeature = (restaurantId) => {
    if (restaurantId == "1") {
      return <>
        <Text style={styles.randomUniqueFeature}>🥇Cheapest Option</Text>
        {/* {"\n"} */}
        {/* <Text style={styles.randomUniqueFeature}>Highest Rated</Text> */}
      </>;
    }

    return <Text style={styles.randomUniqueFeature}>{goodFeatures[restaurantId]}</Text>;
  }

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" />
        <Text>Loading restaurants...</Text>
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

  if (!restaurants || restaurants.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text>No restaurant data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.contents}>
          {/* Top App Bar */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Results - Indian Food</Text>
          </View>

          {/* // TODO: insert map here with pins for each restaurant location */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 40.7247782,
              longitude: -73.9957863,
              latitudeDelta: 0.05522,
              longitudeDelta: 0.03721,
            }}
          >
            {restaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                coordinate={{
                  latitude: restaurant.location.latitude,
                  longitude: restaurant.location.longitude,
                }}
                title={restaurant.name}
                description={restaurant.description}
              />
            ))}
            <Marker
              key='your-location'
              coordinate={{
                latitude: 40.7228456,
                longitude: -73.9889983,
              }}
              title='Your Location'
              description='Current Location'
            >
              <View style={styles.myLocation}>
                <Ionicons name="location" size={24} color="blue" />
              </View>
            </Marker>
            {peopleCount <= 3 && (
              <>
                <Marker
                  coordinate={{
                    latitude: 40.722247782,
                    longitude: -73.976863,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: 40.73267782,
                    longitude: -74.0047863,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: 40.73467782,
                    longitude: -73.9947863,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: 40.735867782,
                    longitude: -73.9805744,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: 40.7204824,
                    longitude: -74.0040364,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: 40.7185905,
                    longitude: -74.0059932,
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: 40.7429199,
                    longitude: -74.0044697,
                  }}
                />
              </>)}

              {peopleCount <= 2 && (
                <>
                  <Marker
                    coordinate={{
                      latitude: 40.722300,
                      longitude: -73.9746900,
                    }}
                  />
                  <Marker
                    coordinate={{
                      latitude: 40.732700,
                      longitude: -74.0004800,
                    }}
                  />
                  <Marker
                    coordinate={{
                      latitude: 40.734700,
                      longitude: -73.984800,
                    }}
                  />
                  <Marker
                    coordinate={{
                      latitude: 40.735900,
                      longitude: -73.990600,
                    }}
                  />
                  <Marker
                    coordinate={{
                      latitude: 40.7200500,
                      longitude: -74.0004000,
                    }}
                  />
                  <Marker
                    coordinate={{
                      latitude: 40.718550,
                      longitude: -74.0006000,
                    }}
                  />
                  <Marker
                    coordinate={{
                      latitude: 40.742950,
                      longitude: -74.000500,
                    }}
                  />
                </>
              )}
          {peopleCount == 1 && (
            <>
              <Marker
                coordinate={{
                  latitude: 40.7322310,
                  longitude: -73.974700,
                }}
              />
              <Marker
                coordinate={{
                  latitude: 40.7302710,
                  longitude: -74.000490,
                }}
              />
              <Marker
                coordinate={{
                  latitude: 40.734710,
                  longitude: -73.9984810,
                }}
              />
              <Marker
                coordinate={{
                  latitude: 40.7385910,
                  longitude: -73.9890610,
                }}
              />
              <Marker
                coordinate={{
                  latitude: 40.720060,
                  longitude: -73.988410,
                }}
              />
              <Marker
                coordinate={{
                  latitude: 40.7158560,
                  longitude: -74.000610,
                }}
              />
              <Marker
                coordinate={{
                  latitude: 40.74960,
                  longitude: -74.0000510,
                }}
              />
            </>
          )}
          </MapView>

          {/* TODO: Text that says 'People' and has plus and minus button to increase or decrease value. defaults to 1 */}

          <View style={{ backgroundColor: 'white', height: '100%'}}>
            <View style={styles.dividerSection}></View>
            <Text style={styles.dividerTitle}>Options</Text>

            <View style={styles.lineContainer}>
              <Ionicons name="accessibility-outline" size={24} color="black" />
              <Text style={styles.peopleLabel}>People</Text>
              <View style={styles.peopleControls}>
                <TouchableOpacity onPress={decreasePeopleCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.peopleCount}>{peopleCount}</Text>
                <TouchableOpacity onPress={increasePeopleCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <Ionicons name="navigate-outline" size={24} color="black" />
              <Text style={styles.peopleLabel}>Distance (miles)</Text>
              <View style={styles.peopleControls}>
                <TouchableOpacity onPress={decreaseDistance} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>-</Text>
                </TouchableOpacity>
                {/* <Text style={styles.peopleCount}>{distanceValue.toFixed(2)}m.</Text> */}
                <TextInput
                  style={styles.peopleCount}
                  value={distanceValue}
                  onChangeText={handleDistanceChange}
                  keyboardType="numeric"
                  onEndEditing={doneDistanceChange}
                />
                <TouchableOpacity onPress={increaseDistance} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <Ionicons name="cash-outline" size={24} color="black" />
              <Text style={styles.peopleLabel}>Budget</Text>
              <View style={styles.peopleControls}>
                <TouchableOpacity onPress={decreaseBudget} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>-</Text>
                </TouchableOpacity>
                {/* <Text style={styles.peopleCount}>{distanceValue.toFixed(2)}m.</Text> */}
                <TextInput
                  style={styles.peopleCount}
                  value={budgetValue}
                  onChangeText={handleBudgetChange}
                  keyboardType="numeric"
                  onEndEditing={doneEditingBudget}
                />
                <TouchableOpacity onPress={increaseBudget} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dividerSection}></View>
            <Text style={styles.dividerTitle}>Menu Options</Text>

            <View style={styles.lineContainer}>
              <Ionicons name="fast-food-outline" size={24} color="black" />
              <Text style={styles.peopleLabel}>Appetizers</Text>
              <View style={styles.peopleControls}>
                <TouchableOpacity onPress={decreaseAppetizerCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.peopleCount}>{appetizerCount}</Text>
                <TouchableOpacity onPress={increaseAppetizerCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <Ionicons name="restaurant-outline" size={24} color="black" />
              <Text style={styles.peopleLabel}>Main Courses</Text>
              <View style={styles.peopleControls}>
                <TouchableOpacity onPress={decreaseEntreeCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.peopleCount}>{entreeCount}</Text>
                <TouchableOpacity onPress={increaseEntreeCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <Ionicons name="beer-outline" size={24} color="black" />
              <Text style={styles.peopleLabel}>Beverages</Text>
              <View style={styles.peopleControls}>
                <TouchableOpacity onPress={decreaseDrinkCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.peopleCount}>{drinkCount}</Text>
                <TouchableOpacity onPress={increaseDrinkCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <Ionicons name="ice-cream-outline" size={24} color="black" />
              <Text style={styles.peopleLabel}>Desserts</Text>
              <View style={styles.peopleControls}>
                <TouchableOpacity onPress={decreaseDessertCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.peopleCount}>{dessertCount}</Text>
                <TouchableOpacity onPress={increaseDessertCount} style={styles.peopleButton}>
                  <Text style={styles.peopleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.dividerSection}></View> */}

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Submit"
                handlePress={() => {
                  router.push({
                    pathname: "/restaurant-results",
                    params: {
                      people: peopleCount,
                      distance: distanceValue,
                      budget: budgetValue,
                      appetizers: appetizerCount,
                      entrees: entreeCount,
                      drinks: drinkCount,
                      desserts: dessertCount,
                    },
                  });
                }}
                containerStyles={styles.submitButton}
                isLoading={false}
              />
            </View>
            

          </View> 
          {/* end of white bg */}
          
        </View>
        {/* end of contents */}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black", // Ensure white background
  },
  contents: {
    backgroundColor: "lightgrey",
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF", // Neutral background color for the app bar
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Light grey border for separation
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Dark text for the header title
    textAlign: "left", // Align the title to the top left
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    position: "relative", // Allow for absolute positioning of sponsored banner
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    width: "80%",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  randomUniqueFeature: {
    fontSize: 14,
    color: "#6200EE",
    marginVertical: 5,
  },
  sponsoredBanner: {
    position: "absolute",
    bottom: 0,
    right: 10,
    // backgroundColor: "rgba(255, 99, 71, 0.9)", // Red or orange background for the sponsored banner
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  sponsoredText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "rgba(255, 99, 71, 0.45)", // White text for the sponsored banner
  },
  offerBanner: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(25, 199, 71, 0.9)", // Red or orange background for the sponsored banner
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  offerText: {
    fontSize: 12,
    color: "#FFFFFF", // White text for the sponsored banner
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    position: 'relative',
    left: '-15%',
    width: '120%',
    height: 200,
  },
  twoRowContainer: {
    flexDirection: 'row',
    // display: 'flex',
    width: '100%',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  peopleContainer: {
    flex: 1,
    marginLeft: 10,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  peopleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distanceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  peopleControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  peopleButton: {
    padding: 1,
    // backgroundColor: '#ddd',
    borderRadius: 100,
    marginHorizontal: 5,
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  peopleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
  },
  peopleCount: {
    fontSize: 16,
    marginHorizontal: 10,
    width: 60,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dividerSection: {
    margin: 10,
  },
  dividerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#6200EE',
  },
  submitButton: {
    marginTop: 20,
    width: '40%',
  },
});
