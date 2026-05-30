import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../theme';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { SwipeScreen } from '../screens/SwipeScreen';
import { MatchesScreen } from '../screens/MatchesScreen';
import { MatchScreen } from '../screens/MatchScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerTintColor: theme.colors.black, headerShadowVisible: false, contentStyle: { backgroundColor: theme.colors.background } }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Discover" component={SwipeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Matches" component={MatchesScreen} options={{ title: 'Matches' }} />
      <Stack.Screen name="Match" component={MatchScreen} options={{ title: 'Match', headerBackTitle: 'Back' }} />
    </Stack.Navigator>
  </NavigationContainer>
);