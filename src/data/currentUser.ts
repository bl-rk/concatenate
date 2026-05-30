import { ImageSourcePropType } from 'react-native';

export const currentUser: { name: string; interests: string[]; image: ImageSourcePropType } = {
  name: 'You',
  interests: ['Music', 'Travel', 'Food', 'Tech'],
  image: require('../assets/profiles/you.jpg'),
};