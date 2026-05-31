import { currentUser } from '../data/currentUser';
import { Profile } from '../types';

export const getSharedInterests = (a: string[], b: string[]): string[] =>
  a.filter((interest) => (b ?? []).includes(interest));

/** The concat metaphor: your name + theirs, plus your shared interests. */
export const concatMatch = (profile: Profile): string => {
  const shared = getSharedInterests(currentUser.interests ?? [], profile.interests ?? []);
  const base = `"${currentUser.name}" + "${profile.name}"`;
  return shared.length ? `${base} + [${shared.join(', ')}]` : base;
};