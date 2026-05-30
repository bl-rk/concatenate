import { Profile } from '../types';

export const profiles: Profile[] = [
  { id: '1', name: 'Amara', age: 26, location: 'Lagos', distanceKm: 3,
    image: { uri: 'https://i.pravatar.cc/600?img=5' },
    bio: 'Designer who lives for sunsets and jollof debates.', interests: ['Music', 'Travel', 'Design'] },
  { id: '2', name: 'David', age: 29, location: 'Lagos', distanceKm: 8,
    image: { uri: 'https://i.pravatar.cc/600?img=12' },
    bio: 'Runner, coffee snob, weekend builder.', interests: ['Tech', 'Coffee', 'Fitness'] },
  { id: '3', name: 'Zainab', age: 24, location: 'Lagos', distanceKm: 24,
    image: { uri: 'https://i.pravatar.cc/600?img=20' },
    bio: 'Bookworm by night, gallery-hopper by day.', interests: ['Books', 'Art', 'Reading'] },
  { id: '4', name: 'Tunde', age: 31, location: 'Lagos', distanceKm: 5,
    image: { uri: 'https://i.pravatar.cc/600?img=33' },
    bio: 'Building things and chasing waves.', interests: ['Tech', 'Travel', 'Surfing'] },
  { id: '5', name: 'Chioma', age: 27, location: 'Lagos', distanceKm: 11,
    image: { uri: 'https://i.pravatar.cc/600?img=45' },
    bio: 'Dancer. Plant mum. Terrible at chess.', interests: ['Music', 'Movies', 'Food'] },
  { id: '6', name: 'Femi', age: 28, location: 'Lagos', distanceKm: 2,
    image: { uri: 'https://i.pravatar.cc/600?img=51' },
    bio: 'Music producer with too many synths.', interests: ['Music', 'Food', 'Gaming'] },
];