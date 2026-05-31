# concat()

> you + them

A minimalist mobile **dating application prototype** built with **React Native (Expo)**. Matching is modeled on the programming concept of **concatenation** — a match is literally `"You" + "<Name>"`. The app features a Tinder-style swipe deck and a simple **voice-assisted swipe** feature.

---

## Overview

`concat()` is a 4-screen dating app prototype with a clean, modern interface built around a white/grey/black palette and a single red accent. You discover profiles on a gesture-driven swipe deck, and every right-swipe "concatenates" you with that profile into a match. Matches are collected into a dedicated screen, and each one opens a detailed profile with a message composer.

The app is intentionally minimal in scope but built with production-style structure: TypeScript throughout, reusable components, centralized design tokens, and lightweight Context-based state.

## Features

- **Welcome screen** — `concat()` branding, placeholder vector logo, and a single call-to-action.
- **Discover (swipe) screen** — Tinder-style swipe built with Reanimated + Gesture Handler:
  - Drag-to-swipe with live card rotation
  - LIKE / NOPE overlays that fade in with drag distance
  - Swipe threshold with spring-back when below it
  - Next-card scaling for depth
  - Pass / Like action buttons (trigger the same swipe programmatically)
  - Empty state when the deck is exhausted
- **Voice-assisted swipe** — a center mic button enables hands-free swiping: say **"match"** to like, **"pass"** (or "no") to skip.
- **Name-concatenation matching** — a right-swipe forms a match expressed as `"You" + "<Name>"`, shown in a celebratory match modal (your avatar `+` theirs).
- **Matches screen** — a list of everyone you've matched with, with a live count badge on the Discover header.
- **Match / Profile Details screen** — larger profile presentation, distance, interests, and a message composer.
- **Minimalist, consistent design** — shared theme tokens keep spacing, color, and radius consistent across all screens.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React Native (Expo SDK 55) |
| Language | TypeScript |
| Navigation | `@react-navigation/native` + native-stack |
| Animations & gestures | `react-native-reanimated`, `react-native-gesture-handler` |
| Voice | `expo-speech-recognition` |
| Vectors | `react-native-svg` (logo), `@expo/vector-icons` (UI icons) |
| Misc | `expo-haptics`, `expo-linear-gradient` |
| State | React Context (matches) |
| Testing | Jest 29 + ts-jest + jest-expo |

> **State choice:** Context was chosen over Redux deliberately. The only shared state is a small list of matches, so Redux would add boilerplate without benefit. Knowing when *not* to add complexity was a design goal.

## Project structure

```
src/
├── theme/index.ts          # color, spacing, radius tokens + brand
├── types/index.ts          # shared types + navigation param list
├── data/
│   ├── currentUser.ts      # "you" — the left side of every concat
│   └── profiles.ts         # mock profiles (local images, distance)
├── utils/
│   ├── match.ts            # name concatenation helper
│   └── __tests__/          # unit tests for match utilities
├── hooks/useVoiceSwipe.ts  # speech-recognition → swipe commands
├── context/MatchContext.tsx
├── components/             # PrimaryButton, InterestChip, ProfileCard,
│                           # SwipeDeck, MatchModal, Logo, ErrorBoundary
├── navigation/RootNavigator.tsx
├── screens/
│   ├── ...                 # Welcome, Swipe (Discover), Matches, Match
│   └── __tests__/          # integration tests for screen behaviour
└── __tests__/              # cross-cutting integration tests
```

## Testing & Error Handling

- **Unit Tests** — Match utility functions (`getSharedInterests`, `concatMatch`) covered with null-safety checks for undefined inputs.
- **Integration Tests** — Swipe gesture error scenarios including rapid swipes and profiles with missing data fields.
- **Error Boundary** — `ErrorBoundary` wraps `SwipeDeck` to catch render and gesture errors, displaying a fallback UI instead of a crash.
- **Null-Safe Matching** — Fixed a `TypeError` on right-swipe caused by passing `profile.name` (a string) instead of the full `profile` object to `concatMatch`, which left `interests` undefined.
- **Jest Configuration** — `ts-jest` preset with `jest-expo` transformer and a custom `transformIgnorePatterns` to handle React Native and Expo modules correctly.

### Running tests

Tests live on the `testing` branch, isolated from feature code:

```bash
git checkout test
npm test

# run for breaking pakage testing : 
npm install --save-dev --legacy-peer-deps \       
  jest@29 \
  jest-expo@latest \
  ts-jest@29 \
  @types/jest@29 \
  babel-jest@29

```

## Prerequisites

- Node.js **20.19.4+**
- npm
- A physical Android device or emulator
- Android Studio + Android SDK (required for the voice feature / local native builds)

## Setup & installation

```bash
# 1. Clone
git clone https://github.com/bl-rk/concatenate
cd concat

# 2. Install dependencies
npm install

```

## Running the app

**Quick run (Expo Go) — everything except voice:**
```bash
npx expo start
# press "a" for Android, or scan the QR with Expo Go
```

**Full native run (required for voice):**
```bash
npx expo run:android
# builds a dev client and installs it to your device/emulator.
# afterwards, iterate with: npx expo start --dev-client
```

## How matching works
Every right-swipe (via gesture, the ♥ button, or the voice command "yes") concatenates you with that profile: the match is expressed as `"You" + "<Name>"` and surfaced in the match modal. The matched profile is then added to the **Matches** screen for the session.

## Voice commands

Tap the center mic to enable listening, then speak:

| Command | Action |
| --- | --- |
| "match", "like", "love" | Swipe right (like) |
| "pass", "no", "nope", "skip" | Swipe left (pass) |

Tap the mic again to stop listening.

## Assumptions

- Profiles use **mock/local data**; images are bundled in the app.
- **Every right-swipe is treated as a mutual match** (name concatenation) — there is no server-side matchmaking.
- Voice commands are tuned for **en-US**.

## Known limitations

**Voice requires a native build.** `expo-speech-recognition` is a native module and does **not** run in Expo Go — use a development build (`npx expo run:android`) or the release APK. The mic button degrades gracefully with a message when the module is unavailable.
**Matches are in-memory only** — they reset when the app restarts (no backend or local persistence layer).
**Messaging is mocked** — sending a message shows a confirmation rather than delivering it.
Voice recognition accuracy varies with device, locale, and background noise.

---

## APK download
** Expo Build Link :** https://expo.dev/accounts/blxrk/projects/concatenate/builds/6f97f2fa-edb2-4c92-9e0e-ae1aadecef58
**Download (Google Drive):** (https://drive.google.com/file/d/1Z296cHd2G9La2IrVNY_8HntRGRFLpjQQ/view?usp=sharing)  *(sharing set to "Anyone with the link")*

**Install instructions:**
1. Open the link above on your Android device and download the `.apk`.
2. When prompted, allow installs from your browser / Files app (Settings → "Install unknown apps").
3. Open the downloaded `.apk` and tap **Install**, then **Open**.

**Building the APK yourself:**
```bash
# Cloud (EAS):
eas build -p android --profile preview      # buildType: apk

# Local (you have the Android toolchain):
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
# → android/app/build/outputs/apk/release/app-release.apk
```

## Repository

 **Repository:** https://github.com/bl-rk/concatenate (repo being public was intentional premise wise)
 Collaborator `gideonchukwuoma` has been added for review.
 Voice is best tested on a connected device with a development or release build, not Expo Go.