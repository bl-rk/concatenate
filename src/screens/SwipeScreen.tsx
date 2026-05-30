import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Profile } from '../types';
import { theme } from '../theme';
import { profiles } from '../data/profiles';
import { useMatches } from '../context/MatchContext';
import { SwipeDeck, SwipeDeckHandle, Direction } from '../components/SwipeDeck';
import { MatchModal } from '../components/MatchModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Swipe'>;

export const SwipeScreen = ({ navigation }: Props) => {
  const deckRef = useRef<SwipeDeckHandle>(null);
  const { addMatch } = useMatches();
  const [matched, setMatched] = useState<Profile | null>(null);

  const handleSwipe = (profile: Profile, direction: Direction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (direction === 'right') {
      addMatch(profile);
      // Demo: every right-swipe is a mutual match. In production this is server-driven.
      setMatched(profile);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      <View style={styles.deckArea}>
        <SwipeDeck ref={deckRef} profiles={profiles} onSwipe={handleSwipe} />
      </View>
      <View style={styles.actions}>
        <Pressable accessibilityLabel="Pass" style={[styles.action, styles.pass]} onPress={() => deckRef.current?.swipe('left')}>
          <Text style={[styles.icon, { color: theme.colors.black }]}>✕</Text>
        </Pressable>
        <Pressable accessibilityLabel="Like" style={[styles.action, styles.like]} onPress={() => deckRef.current?.swipe('right')}>
          <Text style={[styles.icon, { color: theme.colors.white }]}>♥</Text>
        </Pressable>
      </View>

      <MatchModal
        visible={!!matched}
        profile={matched}
        onMessage={() => { const p = matched; setMatched(null); if (p) navigation.navigate('Match', { profile: p }); }}
        onKeepSwiping={() => setMatched(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { fontSize: 26, fontWeight: '800', color: theme.colors.black, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.sm },
  deckArea: { flex: 1, margin: theme.spacing.lg },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 28, paddingBottom: theme.spacing.xl },
  action: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  pass: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
  like: { backgroundColor: theme.colors.accent },
  icon: { fontSize: 26, fontWeight: '700' },
});