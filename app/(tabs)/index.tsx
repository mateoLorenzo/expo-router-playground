import { useAuthStore } from "@/src/stores/auth-store";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Home Screen - Demonstrates accessing session and signOut action
 *
 * Key patterns shown:
 * - Accessing session data: `useAuthStore((state) => state.session)`
 * - Using signOut action to log user out
 * - No manual navigation needed - Stack.Protected handles redirect on session change
 */

export default function HomeScreen() {
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);

  const handleSignOut = async () => {
    await signOut();

    // Navigation is handled by Stack.Protected
    // router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>/app/(tabs)/index.tsx</Text>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Logged in as:</Text>
        <Text style={styles.email}>{session?.email}</Text>
      </View>

      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  userInfo: {
    marginTop: 30,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
