import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>/app/sign-up.tsx</Text>

      <Link href="/sign-in" style={styles.link}>
        <Text style={styles.linkText}>Back to sign in</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
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

export default SignUpScreen;
