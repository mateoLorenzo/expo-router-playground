import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";

/**
 * Auth Store - Zustand + MMKV for persistent authentication
 *
 * This store manages authentication state and persists the user session
 * using MMKV for fast, synchronous storage.
 *
 * Key concepts:
 * - `session`: The authenticated user data (null when logged out)
 * - `isLoading`: True while checking initial auth state (splash screen visible)
 * - `initialize()`: Reads persisted session from MMKV on app start
 * - `signIn()`: Authenticates and persists session to MMKV
 * - `signOut()`: Clears session from state and MMKV
 *
 * Why MMKV over AsyncStorage?
 * - Synchronous reads (no async/await needed for initialize)
 * - ~30x faster than AsyncStorage
 * - Used by WeChat for 1B+ users
 */

// =============================================================================
// Types
// =============================================================================

type User = {
  id: string;
  email: string;
};

type AuthState = {
  session: User | null;
  isLoading: boolean;
};

type AuthActions = {
  initialize: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthStore = AuthState & AuthActions;

// =============================================================================
// MMKV Storage
// =============================================================================

const storage = createMMKV({ id: "auth-storage" });

const STORAGE_KEYS = {
  USER: "user",
} as const;

/**
 * Saves user data to MMKV storage so it persists
 */
const persistUser = (user: User | null): void => {
  if (user) {
    storage.set(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    storage.remove(STORAGE_KEYS.USER);
  }
};

/**
 * Read persisted user from MMKV storage
 * Returns null if no user is stored or if parsing fails
 */
const getPersistedUser = (): User | null => {
  const userJson = storage.getString(STORAGE_KEYS.USER);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson) as User;
  } catch {
    // Corrupted data - clear it
    storage.remove(STORAGE_KEYS.USER);
    return null;
  }
};

// =============================================================================
// Mock API functions - Replace with real API calls in production
// =============================================================================

const mockSignIn = async (
  email: string,
  _password: string
): Promise<{ user: User; token: string }> => {
  // Simulates API login request
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    user: { id: "1", email },
    token: "mock-jwt-token",
  };
};

const mockSignOut = async (): Promise<void> => {
  // Simulates API logout request (best effort)
  await new Promise((resolve) => setTimeout(resolve, 500));
};

// =============================================================================
// Auth Store
// =============================================================================

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  session: null,
  isLoading: true,

  /**
   * Initialize auth state from persisted storage
   * Called once on app start - synchronous thanks to MMKV
   */
  initialize: () => {
    const persistedUser = getPersistedUser();
    set({
      session: persistedUser,
      isLoading: false,
    });
  },

  /**
   * Authenticate user with credentials
   * Persists session to MMKV on success
   */
  signIn: async (email, password) => {
    const { user } = await mockSignIn(email, password);
    persistUser(user);
    set({ session: user });
  },

  /**
   * Clear user session
   * Removes from both state and MMKV storage
   */
  signOut: async () => {
    // Best effort - sign out locally even if API call fails
    await mockSignOut().catch(() => {});
    persistUser(null);
    set({ session: null });
  },
}));
