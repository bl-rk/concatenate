import React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { Profile } from '../types';
import { theme } from '../theme';
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
      <Text style={styles.title}>It&apos;s a Match!</Text>
      {profile && (
        <>
          <Image source={{ uri: profile.image }} style={styles.avatar} />
          <Text style={styles.sub}>You and {profile.name} liked each other.</Text>
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
  overlay: { flex: 1, backgroundColor: 'rgba(17,17,17,0.92)', alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl },
  title: { color: theme.colors.accent, fontSize: 40, fontWeight: '800', marginBottom: theme.spacing.lg },
  avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 3, borderColor: theme.colors.accent },
  sub: { color: theme.colors.white, fontSize: 16, marginTop: theme.spacing.md, textAlign: 'center' },
  actions: { alignSelf: 'stretch', marginTop: theme.spacing.xl },
});