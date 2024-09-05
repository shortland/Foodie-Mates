/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(onboard)` | `/(onboard)/(person)` | `/(onboard)/(person)/onboard-person-step-1` | `/(onboard)/(person)/onboard-person-step-2` | `/(onboard)/(person)/onboard-person-step-3` | `/(onboard)/(restaurant)` | `/(onboard)/(restaurant)/onboard-restaurant-step-1` | `/(onboard)/(restaurant)/onboard-restaurant-step-2` | `/(onboard)/(restaurant)/onboard-restaurant-step-3` | `/(onboard)/onboard` | `/(onboard)/onboard-person-step-1` | `/(onboard)/onboard-person-step-2` | `/(onboard)/onboard-person-step-3` | `/(onboard)/onboard-restaurant-step-1` | `/(onboard)/onboard-restaurant-step-2` | `/(onboard)/onboard-restaurant-step-3` | `/(person)` | `/(person)/onboard-person-step-1` | `/(person)/onboard-person-step-2` | `/(person)/onboard-person-step-3` | `/(restaurant)` | `/(restaurant)/onboard-restaurant-step-1` | `/(restaurant)/onboard-restaurant-step-2` | `/(restaurant)/onboard-restaurant-step-3` | `/(tabs)` | `/(tabs)/account` | `/(tabs)/analytics` | `/(tabs)/home` | `/(tabs)/orders` | `/(tabs)/search` | `/_sitemap` | `/account` | `/analytics` | `/home` | `/onboard` | `/onboard-person-step-1` | `/onboard-person-step-2` | `/onboard-person-step-3` | `/onboard-restaurant-step-1` | `/onboard-restaurant-step-2` | `/onboard-restaurant-step-3` | `/orders` | `/search` | `/sign-in` | `/sign-up` | `/src` | `/src/api/ApiClient` | `/src/api/constants` | `/src/components/Collapsible` | `/src/components/CustomButton` | `/src/components/ExternalLink` | `/src/components/FormField` | `/src/components/FormSwitch` | `/src/components/HelloWave` | `/src/components/Loader` | `/src/components/ParallaxScrollView` | `/src/components/ThemedText` | `/src/components/ThemedView` | `/src/components/__tests__/ThemedText-test` | `/src/components/navigation/TabBarIcon` | `/src/constants/Colors` | `/src/constants/icons` | `/src/constants/images` | `/src/hooks/useAccountType` | `/src/hooks/useColorScheme` | `/src/hooks/useThemeColor` | `/src/models/AccountType` | `/src/screens/auth/api/api` | `/src/screens/auth/screens/SignInScreen` | `/src/screens/auth/screens/SignUpScreen` | `/src/screens/onboard/person/OnboardPersonStep1Screen` | `/src/screens/onboard/person/OnboardPersonStep2Screen` | `/src/screens/onboard/person/OnboardPersonStep3Screen` | `/src/screens/onboard/restaurant/OnboardRestaurantStep1Screen` | `/src/screens/onboard/restaurant/OnboardRestaurantStep2Screen` | `/src/screens/onboard/restaurant/OnboardRestaurantStep3Screen` | `/src/screens/tabs/analytics/AnalyticsScreen` | `/src/screens/tabs/screens/account/AccountScreen` | `/src/screens/tabs/screens/home/person/PersonHomeScreen` | `/src/screens/tabs/screens/home/person/api/api` | `/src/screens/tabs/screens/home/restaurant/RestaurantHomeScreen` | `/src/screens/tabs/screens/order/OrderScreen` | `/src/screens/tabs/screens/order/api/api` | `/src/screens/tabs/screens/order/components/OrderItem` | `/src/screens/tabs/screens/search/SearchScreen` | `/src/screens/tabs/screens/search/api/api` | `/src/utils/Profile/Profile` | `/src/utils/Session/Session` | `/src/utils/constants` | `/src/utils/helpers` | `/test/constants/mockData`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
