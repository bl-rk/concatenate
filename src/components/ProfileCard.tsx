import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Profile } from '../types';
import { theme } from '../theme';
import { InterestChip } from './InterestChip';

export const ProfileCard = ({ profile }: { profile: Profile }) => (
  <View style={styles.card}>
    <Image source={{ uri: profile.image }} style={styles.image} resizeMode="cover" />
    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.82)']} style={styles.gradient}>
      <Text style={styles.name}>
        {profile.name}, <Text style={styles.age}>{profile.age}</Text>
      </Text>
      {profile.location && <Text style={styles.location}>{profile.location}</Text>}
      <Text style={styles.bio} numberOfLines={2}>{profile.bio}</Text>
      <View style={styles.interests}>
        {profile.interests.slice(0, 3).map((i) => <InterestChip key={i} label={i} />)}
      </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: theme.radius.lg, overflow: 'hidden', backgroundColor: theme.colors.surface },
  image: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  gradient: { flex: 1, justifyContent: 'flex-end', padding: theme.spacing.lg },
  name: { color: theme.colors.white, fontSize: 28, fontWeight: '700' },
  age: { fontWeight: '400' },
  location: { color: theme.colors.white, opacity: 0.85, marginTop: 2, fontSize: 14 },
  bio: { color: theme.colors.white, opacity: 0.9, marginTop: 8, fontSize: 15, lineHeight: 21 },
  interests: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
});