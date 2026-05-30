import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming,
} from 'react-native-reanimated';
import { Profile } from '../types';
import { theme } from '../theme';
import { ProfileCard } from './ProfileCard';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.28;
const OUT = width * 1.6;

export type Direction = 'left' | 'right';
export type SwipeDeckHandle = { swipe: (dir: Direction) => void };

type Props = {
  profiles: Profile[];
  onSwipe?: (profile: Profile, direction: Direction) => void;
  onEmpty?: () => void;
};

export const SwipeDeck = forwardRef<SwipeDeckHandle, Props>(
  ({ profiles, onSwipe, onEmpty }, ref) => {
    const [index, setIndex] = useState(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const advance = useCallback((direction: Direction) => {
      const profile = profiles[index];
      if (profile) onSwipe?.(profile, direction);
      translateX.value = 0;
      translateY.value = 0;
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= profiles.length) onEmpty?.();
        return next;
      });
    }, [index, profiles, onSwipe, onEmpty, translateX, translateY]);

    const forceSwipe = useCallback((direction: Direction) => {
      if (index >= profiles.length) return;
      const to = direction === 'right' ? OUT : -OUT;
      translateX.value = withTiming(to, { duration: 250 }, (finished) => {
        if (finished) runOnJS(advance)(direction);
      });
    }, [advance, index, profiles.length, translateX]);

    useImperativeHandle(ref, () => ({ swipe: forceSwipe }), [forceSwipe]);

    const pan = Gesture.Pan()
      .onUpdate((e) => {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      })
      .onEnd((e) => {
        if (e.translationX > SWIPE_THRESHOLD) {
          translateX.value = withTiming(OUT, { duration: 250 }, (f) => { if (f) runOnJS(advance)('right'); });
        } else if (e.translationX < -SWIPE_THRESHOLD) {
          translateX.value = withTiming(-OUT, { duration: 250 }, (f) => { if (f) runOnJS(advance)('left'); });
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      });

    const topStyle = useAnimatedStyle(() => {
      const rotate = interpolate(translateX.value, [-width / 2, 0, width / 2], [-9, 0, 9], Extrapolation.CLAMP);
      return { transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotateZ: `${rotate}deg` }] };
    });
    const likeStyle = useAnimatedStyle(() => ({ opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP) }));
    const nopeStyle = useAnimatedStyle(() => ({ opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP) }));
    const nextStyle = useAnimatedStyle(() => ({
      transform: [{ scale: interpolate(Math.abs(translateX.value), [0, SWIPE_THRESHOLD], [0.94, 1], Extrapolation.CLAMP) }],
    }));

    if (index >= profiles.length) {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>You&apos;re all caught up</Text>
          <Text style={styles.emptySub}>Check back later for new people.</Text>
        </View>
      );
    }

    const current = profiles[index];
    const next = profiles[index + 1];

    return (
      <View style={styles.deck}>
        {next && (
          <Animated.View style={[styles.cardWrap, nextStyle]} pointerEvents="none">
            <ProfileCard profile={next} />
          </Animated.View>
        )}
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.cardWrap, topStyle]}>
            <ProfileCard profile={current} />
            <Animated.View style={[styles.badge, styles.like, likeStyle]}>
              <Text style={[styles.badgeText, { color: theme.colors.accent }]}>LIKE</Text>
            </Animated.View>
            <Animated.View style={[styles.badge, styles.nope, nopeStyle]}>
              <Text style={[styles.badgeText, { color: theme.colors.black }]}>NOPE</Text>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  },
);
SwipeDeck.displayName = 'SwipeDeck';

const styles = StyleSheet.create({
  deck: { flex: 1 },
  cardWrap: { ...StyleSheet.absoluteFillObject },
  badge: { position: 'absolute', top: 32, paddingVertical: 6, paddingHorizontal: 14, borderWidth: 3, borderRadius: theme.radius.sm },
  like: { left: 24, transform: [{ rotate: '-12deg' }], borderColor: theme.colors.accent },
  nope: { right: 24, transform: [{ rotate: '12deg' }], borderColor: theme.colors.black },
  badgeText: { fontSize: 26, fontWeight: '800', letterSpacing: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: theme.colors.black },
  emptySub: { fontSize: 15, color: theme.colors.grey, marginTop: 6 },
});