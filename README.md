# Expo Router Auth Flow

Reference for handling initial navigation for logged-in/logged-out users with session persistence.

## Stack

- **Expo Router** - Navigation with `Stack.Protected` guards
- **Zustand** - Global authentication state
- **MMKV** - Fast and synchronous persistence

## Approach

This project uses **guards** instead of `<Redirect />` to control route access:

```tsx
// app/_layout.tsx
<Stack screenOptions={{ headerShown: false }}>
  <Stack.Protected guard={!session}>
    <Stack.Screen name="(auth)" />
  </Stack.Protected>

  <Stack.Protected guard={!!session}>
    <Stack.Screen name="(tabs)" />
  </Stack.Protected>
</Stack>
```

When `session` changes, Expo Router automatically shows/hides the corresponding routes.

## Structure

```
app/
  _layout.tsx          # Root layout with guards
  (auth)/
    _layout.tsx
    sign-in.tsx          # Sign in screen
    sign-up.tsx          # Sign up screen
  (tabs)/
    _layout.tsx
    index.tsx          # Home (protected)
src/
  stores/
    auth-store.ts      # Zustand + MMKV
```

## Why MMKV

- Synchronous reads (no async/await needed to initialize)
- ~30x faster than AsyncStorage
- Session is read instantly when the app opens
