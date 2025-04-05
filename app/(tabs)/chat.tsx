import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { MISTRAL_API_KEY } from '@/config/env';
import { router } from 'expo-router';

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  timestamp: string;
}

interface AIAssistant {
  id: string;
  name: string;
  avatar: any;
  specialty: string;
  lastMessage?: {
    text: string;
    timestamp: string;
  };
}

interface Nutritionist {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  status: 'online' | 'offline';
  lastMessage?: {
    text: string;
    timestamp: string;
  };
}

const MOCK_AI_ASSISTANTS: AIAssistant[] = [
  {
    id: '1',
    name: 'Nutria Coach',
    avatar: require('@/assets/images/logo.png'),
    specialty: 'General Nutrition',
    lastMessage: {
      text: "Hello! I'm your nutrition AI assistant. How can I help you today?",
      timestamp: 'Just now',
    },
  },
  {
    id: '2',
    name: 'Meal Planner',
    avatar: require('@/assets/images/logo.png'),
    specialty: 'Meal Planning & Recipes',
    lastMessage: {
      text: 'Ready to plan your next meal?',
      timestamp: '1h ago',
    },
  },
  {
    id: '3',
    name: 'Fitness Nutrition',
    avatar: require('@/assets/images/logo.png'),
    specialty: 'Sports & Exercise Nutrition',
    lastMessage: {
      text: 'Let me help you optimize your workout nutrition!',
      timestamp: '3h ago',
    },
  },
];

const MOCK_NUTRITIONISTS: Nutritionist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    specialty: 'Sports Nutrition',
    status: 'online',
    lastMessage: {
      text: 'Remember to track your protein intake today!',
      timestamp: '2h ago',
    },
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    specialty: 'Weight Management',
    status: 'offline',
    lastMessage: {
      text: 'Your meal plan has been updated.',
      timestamp: '1d ago',
    },
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    specialty: 'Dietary Restrictions',
    status: 'online',
  },
];

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState<'ai' | 'nutritionist'>('ai');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: message.trim(),
      isAI: false,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'mistral-tiny',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful nutrition assistant. Provide concise, accurate advice about nutrition, diet, and healthy eating habits. Keep responses friendly and informative.',
            },
            ...messages.map(msg => ({
              role: msg.isAI ? 'assistant' : 'user',
              content: msg.text,
            })),
            { role: 'user', content: userMessage.text },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }

      const aiMessage = {
        id: messages.length + 2,
        text: data.choices[0].message.content,
        isAI: true,
        timestamp: 'Just now',
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        isAI: true,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.isAI ? styles.aiMessage : styles.userMessage]}>
      <Text style={[styles.messageText, item.isAI ? styles.aiMessageText : styles.userMessageText]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  const renderAIAssistant = ({ item }: { item: AIAssistant }) => (
    <TouchableOpacity 
      style={styles.nutritionistCard}
      onPress={() => router.push(`/chat/ai/${item.id}`)}
    >
      <View style={styles.nutritionistInfo}>
        <Image source={item.avatar} style={styles.nutritionistAvatar} />
        <View style={styles.nutritionistDetails}>
          <Text style={styles.nutritionistName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          {item.lastMessage && (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage.text}
            </Text>
          )}
        </View>
      </View>
      {item.lastMessage && (
        <Text style={styles.messageTime}>{item.lastMessage.timestamp}</Text>
      )}
    </TouchableOpacity>
  );

  const renderNutritionist = ({ item }: { item: Nutritionist }) => (
    <TouchableOpacity 
      style={styles.nutritionistCard}
      onPress={() => router.push(`/chat/nutritionist/${item.id}`)}
    >
      <View style={styles.nutritionistInfo}>
        <Image source={{ uri: item.avatar }} style={styles.nutritionistAvatar} />
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: item.status === 'online' ? '#10b981' : '#6b7280' }]} />
        </View>
        <View style={styles.nutritionistDetails}>
          <Text style={styles.nutritionistName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          {item.lastMessage && (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage.text}
            </Text>
          )}
        </View>
      </View>
      {item.lastMessage && (
        <Text style={styles.messageTime}>{item.lastMessage.timestamp}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Chat</Text>
          </View>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ai' && styles.activeTab]}
            onPress={() => setActiveTab('ai')}
          >
            <Ionicons 
              name="chatbubble-ellipses" 
              size={20} 
              color={activeTab === 'ai' ? '#3b82f6' : '#6b7280'} 
            />
            <Text style={[styles.tabText, activeTab === 'ai' && styles.activeTabText]}>
              AI Assistants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'nutritionist' && styles.activeTab]}
            onPress={() => setActiveTab('nutritionist')}
          >
            <Ionicons 
              name="people" 
              size={20} 
              color={activeTab === 'nutritionist' ? '#3b82f6' : '#6b7280'} 
            />
            <Text style={[styles.tabText, activeTab === 'nutritionist' && styles.activeTabText]}>
              Nutritionists
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.push('/chat/friends')}
          >
            <Ionicons 
              name="chatbubbles" 
              size={20} 
              color="#6b7280" 
            />
            <Text style={styles.tabText}>Friends</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'ai' ? (
        <FlatList
          data={MOCK_AI_ASSISTANTS}
          renderItem={renderAIAssistant}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.nutritionistList}
          ListHeaderComponent={() => (
            <View style={styles.nutritionistHeader}>
              <Text style={styles.nutritionistHeaderText}>
                Chat with specialized AI assistants for instant nutrition guidance
              </Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={MOCK_NUTRITIONISTS}
          renderItem={renderNutritionist}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.nutritionistList}
          ListHeaderComponent={() => (
            <View style={styles.nutritionistHeader}>
              <Text style={styles.nutritionistHeaderText}>
                Chat with certified nutritionists for personalized advice
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 28,
  },
  tabs: {
    flexDirection: 'row',
    gap: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1f1f1f',
  },
  activeTab: {
    backgroundColor: '#3b82f620',
  },
  tabText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#3b82f6',
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1f1f1f',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1f1f1f',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    marginRight: 8,
    color: '#fff',
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  nutritionistList: {
    padding: 16,
  },
  nutritionistHeader: {
    marginBottom: 16,
  },
  nutritionistHeaderText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  nutritionistCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  nutritionistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nutritionistAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 38,
    backgroundColor: '#000',
    padding: 2,
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nutritionistDetails: {
    marginLeft: 12,
    flex: 1,
  },
  nutritionistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
  },
  messageTime: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
}); 