import { ImageSourcePropType } from 'react-native';

export type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  image: ImageSourcePropType; // supports require(...) for local uploads OR { uri }
  distanceKm: number;
  location?: string;
};

export type Compatibility = { shared: string[]; score: number; isMatch: boolean };

export type RootStackParamList = {
  Welcome: undefined;
  Discover: undefined;
  Matches: undefined;
  Match: { profile: Profile };
};