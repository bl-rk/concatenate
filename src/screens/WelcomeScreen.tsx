import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../theme';
import { PrimaryButton } from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.hero}>
      <Text style={styles.logo}>ember<Text style={{ color: theme.colors.accent }}>.</Text></Text>
      <Text style={styles.tagline}>Meet people who get you.</Text>
    </View>
    <View style={styles.footer}>
      <PrimaryButton label="Start matching" onPress={() => navigation.navigate('Swipe')} />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: theme.spacing.lg },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 52, fontWeight: '800', color: theme.colors.black },
  tagline: { fontSize: 17, color: theme.colors.grey, marginTop: theme.spacing.sm },
  footer: { paddingBottom: theme.spacing.xl },
});