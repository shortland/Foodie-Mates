/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/api/api` | `/(auth)/authLogic` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(tabs)` | `/(tabs)/account` | `/(tabs)/home` | `/(tabs)/orders` | `/(tabs)/search` | `/_sitemap` | `/account` | `/api/api` | `/authLogic` | `/constants/Colors` | `/constants/icons` | `/constants/images` | `/home` | `/orders` | `/search` | `/sign-in` | `/sign-up` | `/src` | `/src/components/Collapsible` | `/src/components/CustomButton` | `/src/components/ExternalLink` | `/src/components/FormField` | `/src/components/HelloWave` | `/src/components/Loader` | `/src/components/ParallaxScrollView` | `/src/components/ThemedText` | `/src/components/ThemedView` | `/src/components/__tests__/ThemedText-test` | `/src/components/navigation/TabBarIcon` | `/src/hooks/useColorScheme` | `/src/hooks/useThemeColor` | `/src/tabs/account/account`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
