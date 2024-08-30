import React, { useEffect } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/app/src/components/HelloWave';
import ParallaxScrollView from '@/app/src/components/ParallaxScrollView';
import { ThemedText } from '@/app/src/components/ThemedText';
import { ThemedView } from '@/app/src/components/ThemedView';

export default function HomeScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/public/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Maps Page</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Goals For This Page</ThemedText>
        <ThemedText>
          We can show a bunch of restaurants on the map near the user here
        </ThemedText>

      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
