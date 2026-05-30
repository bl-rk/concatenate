import { Profile, Compatibility } from '../types';
import { currentUser } from '../data/currentUser';

const MAX_DISTANCE_KM = 50;
const MATCH_THRESHOLD = 35;

export const getSharedInterests = (a: string[], b: string[]): string[] =>
  a.filter((interest) => b.includes(interest));

/** Concatenate your interests with theirs, score the overlap + proximity. */
export const getCompatibility = (profile: Profile): Compatibility => {
  const shared = getSharedInterests(currentUser.interests, profile.interests);
  const interestScore = shared.length / Math.max(currentUser.interests.length, 1); // 0..1
  const proximity = 1 - Math.min(profile.distanceKm / MAX_DISTANCE_KM, 1);          // 0..1
  const score = Math.round((interestScore * 0.7 + proximity * 0.3) * 100);
  return { shared, score, isMatch: shared.length > 0 && score >= MATCH_THRESHOLD };
};