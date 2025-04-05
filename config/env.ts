export const MISTRAL_API_KEY = process.env.EXPO_PUBLIC_MISTRAL_API_KEY || '';

if (!MISTRAL_API_KEY) {
  console.warn('Mistral API key is not set. Please set EXPO_PUBLIC_MISTRAL_API_KEY in your environment.');
} 