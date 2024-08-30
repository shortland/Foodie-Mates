import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/app/src/components/Collapsible';
import { ExternalLink } from '@/app/src/components/ExternalLink';
import ParallaxScrollView from '@/app/src/components/ParallaxScrollView';
import { ThemedText } from '@/app/src/components/ThemedText';
import { ThemedView } from '@/app/src/components/ThemedView';

export default function SearchScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search</ThemedText>
      </ThemedView>
      <ThemedText>This is the page where you will create a new order. Adding fields like budget, number of people, restaraunt preferences, etc. This hits the endpoint to create a new request and that order will show up on the other page after. </ThemedText>
      <ThemedText>Once an request is placed, this page will also show the current active request </ThemedText>
    
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
