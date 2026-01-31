import { SplashScreenController } from "@/src/components/splash-screen-controller";
import { useAuthStore } from "@/src/stores/auth-store";
import { Stack } from "expo-router";
import { useEffect } from "react";

/**
 * Root Layout - Entry point for navigation and auth flow
 *
 * This layout:
 * 1. Initializes the auth store on mount
 * 2. Shows splash screen while auth state is loading
 * 3. Uses Stack.Protected to control route access based on auth state
 *
 * Key pattern:
 * - `guard={!!session}` → routes only accessible when logged in
 * - `guard={!session}` → routes only accessible when logged out
 * - When session changes, Expo Router automatically redirects to the appropriate route
 */

export default function RootLayout() {
  const session = useAuthStore((state) => state.session);
  const isLoading = useAuthStore((state) => state.isLoading);
  const initialize = useAuthStore((state) => state.initialize);

  // Initialize auth state on app start
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Keep splash screen visible while loading
  if (isLoading) {
    return null;
  }

  return (
    <>
      <SplashScreenController />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Unauthenticated routes - base layer */}
        <Stack.Protected guard={!session}>
          <Stack.Screen
            name="(auth)"
            options={{ animation: "slide_from_left" }}
          />
        </Stack.Protected>

        {/* Authenticated routes - presented on top, dismisses on logout */}
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
