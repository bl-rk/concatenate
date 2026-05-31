// jest.setup.js
jest.mock('react-native-gesture-handler', () => ({
  GestureDetector: ({ children }) => children,
  Gesture: {
    Pan: () => ({
      onUpdate: jest.fn(),
      onEnd: jest.fn(),
    }),
  },
}));

jest.mock('react-native-reanimated', () => ({
  useAnimatedStyle: () => ({}),
  useSharedValue: () => ({ value: 0 }),
  withSpring: jest.fn(),
}));

// Suppress console errors in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
