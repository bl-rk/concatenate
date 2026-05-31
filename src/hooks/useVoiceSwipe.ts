import { useCallback, useRef, useState } from 'react';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { Direction } from '../components/SwipeDeck';

export function useVoiceSwipe(onCommand: (dir: Direction) => void) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const keepAlive = useRef(false);
  const lastFire = useRef(0);

  const engineStart = useCallback(() => {
    try {
      ExpoSpeechRecognitionModule.start({ lang: 'en-US', interimResults: false, continuous: true });
    } catch {
      setError('Voice needs a dev/EAS build (not Expo Go).');
      keepAlive.current = false;
      setListening(false);
    }
  }, []);

  const start = useCallback(async () => {
    try {
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) { setError('Microphone permission denied.'); return; }
      setError(null);
      keepAlive.current = true;
      engineStart();
    } catch {
      setError('Voice needs a dev/EAS build (not Expo Go).');
    }
  }, [engineStart]);

  

  const stop = useCallback(() => {
    keepAlive.current = false;
    try { ExpoSpeechRecognitionModule.stop(); } catch {}
    setListening(false);
  }, []);

  const toggle = useCallback(() => { listening ? stop() : start(); }, [listening, start, stop]);

  const fire = useCallback((dir: Direction) => {
    const now = Date.now();
    if (now - lastFire.current < 700) return; // de-dupe rapid results
    lastFire.current = now;
    onCommand(dir);
  }, [onCommand]);

  useSpeechRecognitionEvent('start', () => setListening(true));
  useSpeechRecognitionEvent('end', () => { keepAlive.current ? engineStart() : setListening(false); });
  useSpeechRecognitionEvent('error', (e) => { if (e.error !== 'no-speech') setError(e.message || 'Voice error'); });
  useSpeechRecognitionEvent('result', (e) => {
    const t = (e.results?.[0]?.transcript ?? '').toLowerCase();
    if (!t) return;
    if (/\bmatch\b/.test(t)) fire('right');
    else if (/\bpass\b/.test(t)) fire('left');
    });

  return { listening, error, toggle };
}