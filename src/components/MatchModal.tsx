import React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { Profile } from '../types';
import { theme, brand } from '../theme';
import { currentUser } from '../data/currentUser';
import { concatMatch } from '../utils/match';
import { PrimaryButton } from './PrimaryButton';

type Props = {
  visible: boolean;
  profile: Profile | null;
  onMessage: () => void;
  onKeepSwiping: () => void;
};

export const MatchModal = ({ visible, profile, onMessage, onKeepSwiping }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <Text style={styles.title}>concatenated!</Text>
      <View style={styles.avatars}>
        <Image source={currentUser.image} style={styles.avatar} />
        <Text style={styles.operator}>{brand.operator}</Text>
        {profile && <Image source={profile.image} style={styles.avatar} />}
      </View>
      {profile && (
        <>
          <Text style={styles.expr}>{concatMatch(profile.name)}</Text>
          <Text style={styles.equals}> === it&apos;s a match</Text>
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
  expr: { color: theme.colors.white, fontSize: 18, marginTop: theme.spacing.lg, fontWeight: '600' },
  equals: { color: theme.colors.grey, fontSize: 14, marginTop: 4 },
  actions: { alignSelf: 'stretch', marginTop: theme.spacing.xl },
});