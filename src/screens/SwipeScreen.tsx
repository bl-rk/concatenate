import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Profile, Compatibility } from '../types';
import { theme, brand } from '../theme';
import { profiles } from '../data/profiles';
import { getCompatibility } from '../utils/match';
import { useMatches } from '../context/MatchContext';
import { SwipeDeck, SwipeDeckHandle, Direction } from '../components/SwipeDeck';
import { MatchModal } from '../components/MatchModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Discover'>;

export const SwipeScreen = ({ navigation }: Props) => {
  const deckRef = useRef<SwipeDeckHandle>(null);
  const { matches, addMatch } = useMatches();
  const [matched, setMatched] = useState<{ profile: Profile; compat: Compatibility } | null>(null);

  const handleSwipe = (profile: Profile, direction: Direction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (direction !== 'right') return;
    const compat = getCompatibility(profile); // concatenate interests + score
    if (compat.isMatch) {
      addMatch(profile);
      setMatched({ profile, compat });
    }
    // no overlap → no concatenation → silently advances (e.g. Zainab)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>concat<Text style={{ color: theme.colors.accent }}>()</Text></Text>
        <Pressable accessibilityLabel="View matches" onPress={() => navigation.navigate('Matches')} hitSlop={8}>
          <Ionicons name="albums-outline" size={26} color={theme.colors.black} />
          {matches.length > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{matches.length}</Text></View>}
        </Pressable>
      </View>

      <View style={styles.deckArea}>
        <SwipeDeck ref={deckRef} profiles={profiles} onSwipe={handleSwipe} />
      </View>

      <View style={styles.actions}>
        <Pressable accessibilityLabel="Pass" style={[styles.action, styles.pass]} onPress={() => deckRef.current?.swipe('left')}>
          <Ionicons name="close" size={30} color={theme.colors.black} />
        </Pressable>
        <Pressable accessibilityLabel="Like" style={[styles.action, styles.like]} onPress={() => deckRef.current?.swipe('right')}>
          <Ionicons name="heart" size={28} color={theme.colors.white} />
        </Pressable>
      </View>

      <MatchModal
        visible={!!matched}
        profile={matched?.profile ?? null}
        compatibility={matched?.compat ?? null}
        onMessage={() => { const p = matched?.profile; setMatched(null); if (p) navigation.navigate('Match', { profile: p }); }}
        onKeepSwiping={() => setMatched(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.sm },
  title: { fontSize: 24, fontWeight: '800', color: theme.colors.black },
  badge: { position: 'absolute', top: -6, right: -10, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: theme.colors.white, fontSize: 11, fontWeight: '700' },
  deckArea: { flex: 1, margin: theme.spacing.lg },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 28, paddingBottom: theme.spacing.xl },
  action: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  pass: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
  like: { backgroundColor: theme.colors.accent },
});