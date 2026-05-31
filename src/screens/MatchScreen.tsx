import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../theme';
import { InterestChip } from '../components/InterestChip';
import { PrimaryButton } from '../components/PrimaryButton';
import { concatMatch } from '../utils/match';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Match'>;


export const MatchScreen = ({ route }: Props) => {
  const { profile } = route.params;
  const [message, setMessage] = useState('');

  const send = () => {
    if (!message.trim()) return;
    Alert.alert('Message sent', `To ${profile.name}: "${message.trim()}"`);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={profile.image} style={styles.image} />
        <View style={styles.banner}>
          <Ionicons name="heart" size={15} color={theme.colors.accent} />
          <Text style={styles.bannerText}>{concatMatch(profile)}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{profile.name}, <Text style={styles.age}>{profile.age}</Text></Text>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={theme.colors.grey} />
            <Text style={styles.location}>{profile.distanceKm} km away{profile.location ? ` · ${profile.location}` : ''}</Text>
          </View>

          <Text style={styles.section}>About</Text>
          <Text style={styles.bio}>{profile.bio}</Text>

          <Text style={styles.section}>Interests</Text>
          <View style={styles.interests}>
            {profile.interests.map((i) => <InterestChip key={i} label={i} variant="dark" />)}
          </View>
        </View>
      </ScrollView>

      <View style={styles.composer}>
        <TextInput style={styles.input} placeholder={`Message ${profile.name}…`} placeholderTextColor={theme.colors.grey} value={message} onChangeText={setMessage} />
        <PrimaryButton label="Send" onPress={send} style={styles.send} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { paddingBottom: theme.spacing.lg },
  image: { width: '100%', height: 380 },
  banner: { backgroundColor: theme.colors.accentSoft, paddingVertical: 10, alignItems: 'center' },
  bannerText: { color: theme.colors.accent, fontWeight: '700' },
  body: { padding: theme.spacing.lg },
  name: { fontSize: 28, fontWeight: '700', color: theme.colors.black },
  age: { fontWeight: '400', color: theme.colors.greyDark },
  location: { fontSize: 15, color: theme.colors.grey, marginTop: 2 },
  section: { fontSize: 13, fontWeight: '700', color: theme.colors.grey, textTransform: 'uppercase', marginTop: theme.spacing.lg },
  bio: { fontSize: 16, lineHeight: 23, color: theme.colors.greyDark, marginTop: 6 },
  interests: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 2 },
  composer: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md, gap: theme.spacing.sm, borderTopWidth: 1, borderTopColor: theme.colors.border },
  input: { flex: 1, height: 48, borderRadius: theme.radius.pill, backgroundColor: theme.colors.surface, paddingHorizontal: theme.spacing.md, color: theme.colors.black },
  send: { height: 48, paddingHorizontal: theme.spacing.lg },
});