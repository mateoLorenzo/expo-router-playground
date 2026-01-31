import { useAuthStore } from "@/src/stores/auth-store";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * Sign In Screen - Demonstrates signIn action usage
 *
 * Key patterns shown:
 * - Accessing store action with selector: `useAuthStore((state) => state.signIn)`
 * - Calling async action and handling errors
 * - No manual navigation needed - Stack.Protected handles redirect on session change
 */

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signIn = useAuthStore((state) => state.signIn);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      // No navigation needed - Stack.Protected will redirect automatically
    } catch {
      setError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>/app/sign-in.tsx</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Text>
        </Pressable>

        <Link href="/sign-up" style={styles.link}>
          <Text style={styles.linkText}>
            Don&apos;t have an account? Sign up
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 30,
  },
  form: {
    width: "100%",
    maxWidth: 300,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  link: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 16,
  },
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 16,
  },
});
