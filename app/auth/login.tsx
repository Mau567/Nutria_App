import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Link } from 'expo-router';
import { useAuth } from '../context/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // For demo purposes, simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // For demo purposes, just show an alert
    Alert.alert('Google Login', 'This would initiate Google OAuth login');
  };

  const handleAppleLogin = () => {
    // For demo purposes, just show an alert
    Alert.alert('Apple Login', 'This would initiate Apple OAuth login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Nutria</Text>
        
        <Text style={styles.subtitle}>Welcome Back</Text>
        <Text style={styles.description}>Login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#6b7280"
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#6b7280"
          editable={!isLoading}
        />

        <TouchableOpacity 
          style={[
            styles.button, 
            (!email || !password || isLoading) && styles.buttonDisabled
          ]}
          onPress={handleLogin}
          disabled={!email || !password || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={handleGoogleLogin}
        >
          <Image 
            source={{ uri: 'https://www.google.com/favicon.ico' }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={handleAppleLogin}
        >
          <Image 
            source={{ uri: 'https://www.apple.com/favicon.ico' }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By clicking continue, you agree to our{' '}
          <Link href="/legal/terms" style={styles.link}>Terms of Service</Link> and{' '}
          <Link href="/legal/privacy" style={styles.link}>Privacy Policy</Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2f2f2f',
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1f1f1f',
  },
  dividerText: {
    color: '#6b7280',
    marginHorizontal: 16,
  },
  socialButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2f2f2f',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 24,
  },
  link: {
    color: '#86efac',
    textDecorationLine: 'underline',
  },
});