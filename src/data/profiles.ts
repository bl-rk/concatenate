import { Profile } from '../types';

// Zainab has zero shared interests on purpose → demonstrates a non-match.
export const profiles: Profile[] = [
  { id: '1', name: 'Amara', age: 26, location: 'Lagos', distanceKm: 3,
    image: require('../assets/profiles/amara.jpg'),
    bio: 'Designer who lives for sunsets and jollof debates.', interests: ['Music', 'Travel', 'Design'] },
  { id: '2', name: 'David', age: 29, location: 'Lagos', distanceKm: 8,
    image: require('../assets/profiles/david.jpg'),
    bio: 'Runner, coffee snob, weekend builder.', interests: ['Tech', 'Coffee', 'Fitness'] },
  { id: '3', name: 'Zainab', age: 24, location: 'Lagos', distanceKm: 24,
    image: require('../assets/profiles/zainab.jpg'),
    bio: 'Bookworm by night, gallery-hopper by day.', interests: ['Books', 'Art', 'Reading'] },
  { id: '4', name: 'Tunde', age: 31, location: 'Lagos', distanceKm: 5,
    image: require('../assets/profiles/tunde.jpg'),
    bio: 'Building things and chasing waves.', interests: ['Tech', 'Travel', 'Surfing'] },
  { id: '5', name: 'Chioma', age: 27, location: 'Lagos', distanceKm: 11,
    image: require('../assets/profiles/chioma.jpg'),
    bio: 'Dancer. Plant mum. Terrible at chess.', interests: ['Music', 'Movies', 'Food'] },
  { id: '6', name: 'Femi', age: 28, location: 'Lagos', distanceKm: 2,
    image: require('../assets/profiles/femi.jpg'),
    bio: 'Music producer with too many synths.', interests: ['Music', 'Food', 'Gaming'] },
];