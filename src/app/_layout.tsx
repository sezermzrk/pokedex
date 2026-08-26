import { Stack, useLocalSearchParams } from "expo-router";
import Index from ".";

export default function RootLayout() {
return (
  <Stack>
    <Stack.Screen name="index" options={{ title: "Home" }} />
    <Stack.Screen name="details" options={{ title: "Pokemon Details" }} />
  </Stack >
  )
}
