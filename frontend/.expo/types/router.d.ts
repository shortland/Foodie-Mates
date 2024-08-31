/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(onboard)` | `/(onboard)/screen-1` | `/(tabs)` | `/(tabs)/account` | `/(tabs)/home` | `/(tabs)/map` | `/(tabs)/orders` | `/(tabs)/search` | `/_sitemap` | `/account` | `/home` | `/map` | `/orders` | `/screen-1` | `/search` | `/sign-in` | `/sign-up` | `/src` | `/src/api/ApiClient` | `/src/api/constants` | `/src/components/Collapsible` | `/src/components/CustomButton` | `/src/components/ExternalLink` | `/src/components/FormField` | `/src/components/FormSwitch` | `/src/components/HelloWave` | `/src/components/Loader` | `/src/components/ParallaxScrollView` | `/src/components/ThemedText` | `/src/components/ThemedView` | `/src/components/__tests__/ThemedText-test` | `/src/components/navigation/TabBarIcon` | `/src/constants/Colors` | `/src/constants/icons` | `/src/constants/images` | `/src/hooks/useColorScheme` | `/src/hooks/useThemeColor` | `/src/models/AccountType` | `/src/screens/auth/api/api` | `/src/screens/auth/screens/SignInScreen` | `/src/screens/auth/screens/SignUpScreen` | `/src/screens/auth/util/Session` | `/src/screens/tabs/screens/account/AccountScreen` | `/src/screens/tabs/screens/home/HomeScreen` | `/src/screens/tabs/screens/map/MapScreen` | `/src/screens/tabs/screens/order/OrderScreen` | `/src/screens/tabs/screens/order/api/api` | `/src/screens/tabs/screens/order/components/OrderItem` | `/src/screens/tabs/screens/search/SearchScreen` | `/src/screens/tabs/screens/search/api/api` | `/src/utils/helpers` | `/test/constants/mockData`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
