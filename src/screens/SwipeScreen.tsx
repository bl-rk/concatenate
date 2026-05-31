import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Profile } from '../types';
import { theme } from '../theme';
import { profiles } from '../data/profiles';
import { useMatches } from '../context/MatchContext';
import { useVoiceSwipe } from '../hooks/useVoiceSwipe';
import { SwipeDeck, SwipeDeckHandle, Direction } from '../components/SwipeDeck';
import { MatchModal } from '../components/MatchModal';
import { ErrorBoundary } from '../components/ErrorBoundary';

type Props = NativeStackScreenProps<RootStackParamList, 'Discover'>;

export const SwipeScreen = ({ navigation }: Props) => {
  const deckRef = useRef<SwipeDeckHandle>(null);
  const { matches, addMatch } = useMatches();
  const [matched, setMatched] = useState<Profile | null>(null);

  const { listening, error, toggle } = useVoiceSwipe((dir) => deckRef.current?.swipe(dir));

  // mic pulse while listening
  const pulse = useSharedValue(1);
  useEffect(() => {
    if (listening) pulse.value = withRepeat(withTiming(1.18, { duration: 600 }), -1, true);
    else { cancelAnimation(pulse); pulse.value = withTiming(1); }
  }, [listening, pulse]);
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  const handleSwipe = (profile: Profile, direction: Direction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (direction === 'right') { addMatch(profile); setMatched(profile); } // name + name = match
  };

const hint = error ?? (listening ? 'Listening… say "match" or "pass"' : null);

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
        <ErrorBoundary>
          <SwipeDeck ref={deckRef} profiles={profiles} onSwipe={handleSwipe} />
        </ErrorBoundary>
      </View>

      {hint && <Text style={[styles.hint, error && { color: theme.colors.accent }]}>{hint}</Text>}

      <View style={styles.actions}>
        <Pressable accessibilityLabel="Pass" style={[styles.action, styles.pass]} onPress={() => deckRef.current?.swipe('left')}>
          <Ionicons name="close" size={30} color={theme.colors.black} />
        </Pressable>

        <Animated.View style={pulseStyle}>
          <Pressable accessibilityLabel={listening ? 'Stop voice swipe' : 'Enable voice swipe'} onPress={toggle}
            style={[styles.action, styles.mic, listening && styles.micActive]}>
            <Ionicons name={listening ? 'mic' : 'mic-outline'} size={26} color={listening ? theme.colors.white : theme.colors.greyDark} />
          </Pressable>
        </Animated.View>

        <Pressable accessibilityLabel="Like" style={[styles.action, styles.like]} onPress={() => deckRef.current?.swipe('right')}>
          <Ionicons name="heart" size={28} color={theme.colors.white} />
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.sm },
  title: { fontSize: 24, fontWeight: '800', color: theme.colors.black },
  badge: { position: 'absolute', top: -6, right: -10, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: theme.colors.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: theme.colors.white, fontSize: 11, fontWeight: '700' },
  deckArea: { flex: 1, margin: theme.spacing.lg },
  hint: { textAlign: 'center', color: theme.colors.grey, fontSize: 14, marginBottom: theme.spacing.sm },
  actions: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 24, paddingBottom: theme.spacing.xl },
  action: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  pass: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
  mic: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
  micActive: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
  like: { backgroundColor: theme.colors.accent },
});