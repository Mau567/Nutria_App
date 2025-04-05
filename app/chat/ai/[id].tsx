import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ArrowLeft } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MISTRAL_API_KEY } from '@/config/env';

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  timestamp: string;
}

export default function AIChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your nutrition AI assistant. How can I help you today?", 
      isAI: true,
      timestamp: 'Just now',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);

  // Find the AI assistant based on the ID
  const assistant = {
    id: '1',
    name: 'Nutria Coach',
    avatar: require('@/assets/images/logo.png'),
    specialty: 'General Nutrition',
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image source={assistant.avatar} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{assistant.name}</Text>
            <Text style={styles.specialty}>{assistant.specialty}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Ask me anything about nutrition..."
          placeholderTextColor="#6b7280"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, (!message.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Send size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
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
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  specialty: {
    fontSize: 14,
    color: '#6b7280',
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
}); 