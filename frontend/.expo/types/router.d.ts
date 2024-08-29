/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/api/api` | `/(auth)/authLogic` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(tabs)` | `/(tabs)/account` | `/(tabs)/home` | `/(tabs)/orders` | `/(tabs)/search` | `/_sitemap` | `/account` | `/api/api` | `/authLogic` | `/home` | `/orders` | `/search` | `/sign-in` | `/sign-up` | `/src/tabs/account/account`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
