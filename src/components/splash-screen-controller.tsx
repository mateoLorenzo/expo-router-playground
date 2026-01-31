import { useAuthStore } from "@/src/stores/auth-store";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

/**
 * SplashScreenController - Coordinates splash screen visibility with auth state
 *
 * This component ensures the splash screen stays visible while the app
 * checks the user's authentication status. Once `isLoading` becomes false,
 * the splash screen is hidden and the appropriate routes are shown.
 *
 * Usage: Render this component in your root layout, before the navigation stack.
 *
 * Flow:
 * 1. App starts → splash screen is visible (preventAutoHideAsync)
 * 2. Auth store initializes → checks for persisted session
 * 3. isLoading becomes false → hideAsync() is called
 * 4. Stack.Protected renders the appropriate routes
 */

// Prevent splash screen from auto-hiding on app start
SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // This component doesn't render anything visible
  return null;
}
