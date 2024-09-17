import React from "react";
import { useAccountType } from "../src/hooks/useAccountType";
import { AccountType } from "../src/models/AccountType";
import PersonHomeScreen from "../src/screens/tabs/screens/home/person/PersonHomeScreen";
import RestaurantHomeScreen from "../src/screens/tabs/screens/home/restaurant/RestaurantHomeScreen";
import RestaurantInfoScreen from "../src/screens/tabs/screens/search/screens/RestaurantInfoScreen";

export default function HomeTab() {
  const accountType = useAccountType();

  return (
    <>
      {accountType === AccountType.PERSON ? (
        <RestaurantInfoScreen />
      ) : (
        <RestaurantHomeScreen />
      )}
    </>
  );
}
