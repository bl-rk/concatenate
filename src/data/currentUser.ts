import { ImageSourcePropType } from 'react-native';

export const currentUser: { name: string; interests: string[]; image: ImageSourcePropType } = {
  name: 'You',
  interests: ['Music', 'Travel', 'Food', 'Tech'],
  image: { uri: 'https://i.pravatar.cc/600?img=8' },
};