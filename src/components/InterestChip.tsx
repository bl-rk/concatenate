import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

type Props = { label: string; variant?: 'light' | 'dark' };

export const InterestChip = ({ label, variant = 'light' }: Props) => (
  <View style={[styles.chip, variant === 'light' ? styles.light : styles.dark]}>
    <Text style={[styles.text, variant === 'light' ? styles.lightText : styles.darkText]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: theme.radius.pill, marginRight: 8, marginTop: 8 },
  light: { backgroundColor: 'rgba(255,255,255,0.22)' },
  dark: { backgroundColor: theme.colors.accentSoft },
  text: { fontSize: 13, fontWeight: '600' },
  lightText: { color: theme.colors.white },
  darkText: { color: theme.colors.accent },
});