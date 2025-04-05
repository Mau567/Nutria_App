import { View } from 'react-native';
import { Redirect } from 'expo-router';

export default function SocialIndex() {
  // Redirect to the social feed or create post page
  return <Redirect href="/social/create-post" />;
} 