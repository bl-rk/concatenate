import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { theme } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  style?: ViewStyle;
};

export const PrimaryButton = ({ label, onPress, variant = 'primary', loading, style }: Props) => {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.outline,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? theme.colors.white : theme.colors.accent} />
      ) : (
        <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.outlineLabel]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: { height: 54, borderRadius: theme.radius.pill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.spacing.lg },
  primary: { backgroundColor: theme.colors.accent },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.colors.accent },
  pressed: { opacity: 0.85 },
  label: { fontSize: 16, fontWeight: '700' },
  primaryLabel: { color: theme.colors.white },
  outlineLabel: { color: theme.colors.accent },
});