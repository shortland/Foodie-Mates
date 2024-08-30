import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/app/src/components/Collapsible';
import { ExternalLink } from '@/app/src/components/ExternalLink';
import ParallaxScrollView from '@/app/src/components/ParallaxScrollView';
import { ThemedText } from '@/app/src/components/ThemedText';
import { ThemedView } from '@/app/src/components/ThemedView';

export default function OrderScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Order</ThemedText>
      </ThemedView>
      <ThemedText>Goals For This Page</ThemedText>
     
      <ThemedText>This page will show a list of orders. Current and past</ThemedText>
      <ThemedText>Clicking on an order will show details about it.</ThemedText>
      <ThemedText>Both orders will show TBD</ThemedText>

      <ThemedText>An active order will show ...</ThemedText>
      <ThemedText>A past order will show ... A post order can include a cancelled order and fulfilled</ThemedText>
     
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
