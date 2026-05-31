import { getSharedInterests, concatMatch } from '../match';
import { Profile } from '../../types';

describe('Match Utils', () => {
  describe('getSharedInterests', () => {
    it('should return shared interests between two users', () => {
      const result = getSharedInterests(['gaming', 'reading', 'music'], ['gaming', 'sports', 'music']);
      expect(result).toEqual(['gaming', 'music']);
    });

    it('should return empty array when no shared interests', () => {
      const result = getSharedInterests(['gaming', 'reading'], ['sports', 'cooking']);
      expect(result).toEqual([]);
    });

    it('should handle undefined arrays gracefully', () => {
      const result = getSharedInterests([], undefined as any);
      expect(result).toEqual([]);
    });
  });

  describe('concatMatch', () => {
    const mockProfile: Profile = {
      id: '1',
      name: 'Alice',
      interests: ['gaming', 'music'],
      image: { uri: 'test.jpg' },
      age: 25,
      bio: 'Test user',
      distanceKm: 5,
    };

    it('should concatenate names with shared interests', () => {
      const result = concatMatch(mockProfile);
      expect(result).toContain('Alice');
      expect(result).toContain('"You"');
    });

    it('should handle profiles with no interests', () => {
      const profileNoInterests = { ...mockProfile, interests: undefined as any };
      const result = concatMatch(profileNoInterests);
      expect(result).toBeTruthy();
    });
  });
});
