import { Stack } from 'expo-router';

export default function FeaturesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="scan"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="log"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 