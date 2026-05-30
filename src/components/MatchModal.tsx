import React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { Profile, Compatibility } from '../types';
import { theme, brand } from '../theme';
import { currentUser } from '../data/currentUser';
import { PrimaryButton } from './PrimaryButton';
import { InterestChip } from './InterestChip';

type Props = {
  visible: boolean;
  profile: Profile | null;
  compatibility: Compatibility | null;
  onMessage: () => void;
  onKeepSwiping: () => void;
};

export const MatchModal = ({ visible, profile, compatibility, onMessage, onKeepSwiping }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <Text style={styles.title}>concatenated!</Text>
      <View style={styles.avatars}>
        <Image source={currentUser.image} style={styles.avatar} />
        <Text style={styles.operator}>{brand.operator}</Text>
        {profile && <Image source={profile.image} style={styles.avatar} />}
      </View>
      {profile && compatibility && (
        <>
          <Text style={styles.sub}>you {brand.operator} {profile.name} · {compatibility.score}% match</Text>
          <View style={styles.shared}>
            {compatibility.shared.map((i) => <InterestChip key={i} label={i} variant="dark" />)}
          </View>
        </>
      )}
      <View style={styles.actions}>
        <PrimaryButton label="Send a message" onPress={onMessage} />
        <PrimaryButton label="Keep swiping" variant="outline" onPress={onKeepSwiping} style={{ marginTop: 12 }} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(17,17,17,0.94)', alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl },
  title: { color: theme.colors.accent, fontSize: 38, fontWeight: '800', marginBottom: theme.spacing.lg },
  avatars: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: theme.colors.accent },
  operator: { color: theme.colors.white, fontSize: 40, fontWeight: '300' },
  sub: { color: theme.colors.white, fontSize: 16, marginTop: theme.spacing.lg, fontWeight: '600' },
  shared: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: theme.spacing.sm },
  actions: { alignSelf: 'stretch', marginTop: theme.spacing.xl },
});