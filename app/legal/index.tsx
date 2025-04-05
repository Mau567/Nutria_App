import { View } from 'react-native';
import { Redirect } from 'expo-router';

export default function LegalIndex() {
  // Redirect to the privacy policy by default
  return <Redirect href="/legal/privacy" />;
} 