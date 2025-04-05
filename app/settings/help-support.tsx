import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HelpSupportScreen() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I track my meals?',
      answer: 'To track your meals, go to the home screen and tap the "Log Meal" button. You can then enter your meal details or scan a barcode.',
    },
    {
      question: 'How do I connect my fitness device?',
      answer: 'Go to Settings > Health Data and select your device from the integrations list. Follow the on-screen instructions to complete the connection.',
    },
    {
      question: 'How do I set my nutrition goals?',
      answer: 'Navigate to Settings > Goals to view and adjust your nutrition and fitness goals. You can set targets for calories, macros, and more.',
    },
    {
      question: 'How do I chat with a nutritionist?',
      answer: 'Go to the Chat tab and select the "Nutritionists" section. You can browse available nutritionists and start a conversation.',
    },
  ];

  const supportOptions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: 'mail-outline',
      action: () => Linking.openURL('mailto:support@nutria.app'),
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'chatbubbles-outline',
      action: () => router.push('/chat/support'),
    },
    {
      title: 'Knowledge Base',
      description: 'Browse our help articles',
      icon: 'book-outline',
      action: () => Linking.openURL('https://help.nutria.app'),
    },
    {
      title: 'Video Tutorials',
      description: 'Watch how-to guides',
      icon: 'play-circle-outline',
      action: () => Linking.openURL('https://nutria.app/tutorials'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFaq === index ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color="#6b7280" 
                />
              </View>
              {expandedFaq === index && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Options</Text>
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.supportItem}
              onPress={option.action}
            >
              <View style={styles.supportIcon}>
                <Ionicons name={option.icon as any} size={24} color="#3b82f6" />
              </View>
              <View style={styles.supportInfo}>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => Linking.openURL('https://nutria.app/privacy')}
          >
            <Text style={styles.infoLabel}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.infoItem}
            onPress={() => Linking.openURL('https://nutria.app/terms')}
          >
            <Text style={styles.infoLabel}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  faqItem: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    marginRight: 16,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
    lineHeight: 20,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f615',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 2,
  },
  supportDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  infoLabel: {
    fontSize: 16,
    color: '#fff',
  },
  infoValue: {
    fontSize: 16,
    color: '#6b7280',
  },
}); 