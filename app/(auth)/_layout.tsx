import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
