/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(tabs)` | `/(tabs)/account` | `/(tabs)/home` | `/(tabs)/map` | `/(tabs)/orders` | `/(tabs)/search` | `/_sitemap` | `/account` | `/home` | `/map` | `/orders` | `/search` | `/sign-in` | `/sign-up` | `/src` | `/src/components/Collapsible` | `/src/components/CustomButton` | `/src/components/ExternalLink` | `/src/components/FormField` | `/src/components/FormSwitch` | `/src/components/HelloWave` | `/src/components/Loader` | `/src/components/ParallaxScrollView` | `/src/components/ThemedText` | `/src/components/ThemedView` | `/src/components/__tests__/ThemedText-test` | `/src/components/navigation/TabBarIcon` | `/src/constants/Colors` | `/src/constants/api` | `/src/constants/icons` | `/src/constants/images` | `/src/hooks/useColorScheme` | `/src/hooks/useThemeColor` | `/src/screens/auth/api/api` | `/src/screens/auth/screens/SignInScreen` | `/src/screens/auth/screens/SignUpScreen` | `/src/screens/auth/util/authLogic` | `/src/screens/tabs/screens/account/AccountScreen` | `/src/screens/tabs/screens/home/HomeScreen` | `/src/screens/tabs/screens/map/MapScreen` | `/src/screens/tabs/screens/order/OrderScreen` | `/src/screens/tabs/screens/search/SearchScreen` | `/test/constants/mockData`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
