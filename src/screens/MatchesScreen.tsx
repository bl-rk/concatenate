import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../theme';
import { useMatches } from '../context/MatchContext';
import { getCompatibility } from '../utils/match';

type Props = NativeStackScreenProps<RootStackParamList, 'Matches'>;

export const MatchesScreen = ({ navigation }: Props) => {
  const { matches } = useMatches();

  if (matches.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Ionicons name="albums-outline" size={40} color={theme.colors.grey} />
        <Text style={styles.emptyTitle}>No concatenations yet</Text>
        <Text style={styles.emptySub}>Swipe right on someone you click with.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: theme.spacing.md }}
        renderItem={({ item }) => {
          const { score } = getCompatibility(item);
          return (
            <Pressable style={styles.row} onPress={() => navigation.navigate('Match', { profile: item })}>
              <Image source={item.image} style={styles.avatar} />
              <View style={styles.rowBody}>
                <Text style={styles.name}>{item.name}, {item.age}</Text>
                <Text style={styles.meta}>{item.distanceKm} km away · {score}% match</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.grey} />
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  row: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.sm, borderRadius: theme.radius.md, marginBottom: theme.spacing.sm, backgroundColor: theme.colors.surface },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  rowBody: { flex: 1, marginLeft: theme.spacing.md },
  name: { fontSize: 17, fontWeight: '700', color: theme.colors.black },
  meta: { fontSize: 13, color: theme.colors.grey, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, padding: theme.spacing.xl },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: theme.colors.black, marginTop: theme.spacing.md },
  emptySub: { fontSize: 15, color: theme.colors.grey, marginTop: 6, textAlign: 'center' },
});