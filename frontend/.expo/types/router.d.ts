/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(tabs)` | `/(tabs)/account` | `/(tabs)/home` | `/(tabs)/orders` | `/(tabs)/search` | `/_sitemap` | `/account` | `/constants/Colors` | `/constants/icons` | `/constants/images` | `/home` | `/orders` | `/search` | `/sign-in` | `/sign-up` | `/src` | `/src/components/Collapsible` | `/src/components/CustomButton` | `/src/components/ExternalLink` | `/src/components/FormField` | `/src/components/HelloWave` | `/src/components/Loader` | `/src/components/ParallaxScrollView` | `/src/components/ThemedText` | `/src/components/ThemedView` | `/src/components/__tests__/ThemedText-test` | `/src/components/navigation/TabBarIcon` | `/src/hooks/useColorScheme` | `/src/hooks/useThemeColor` | `/src/screens/auth/api/api` | `/src/screens/auth/util/authLogic` | `/src/screens/tabs/account/account`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
