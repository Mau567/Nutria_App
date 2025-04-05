import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ArrowLeft } from 'lucide-react-native';
import { useLocalSearchParams, router } from 'expo-router';

interface Message {
  id: number;
  text: string;
  isFriend: boolean;
  timestamp: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  streak: number;
  lastActive?: string;
}

const FRIENDS: Record<string, Friend> = {
  '1': {
    id: '1',
    name: 'Alex Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'online',
    streak: 15,
  },
  '2': {
    id: '2',
    name: 'Maria Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    status: 'offline',
    streak: 8,
    lastActive: '2 hours ago'
  },
  '3': {
    id: '3',
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    status: 'online',
    streak: 21,
  }
};

const SAMPLE_CONVERSATIONS = {
  '1': [ // Alex Thompson
    {
      id: 1,
      text: "Hey! Just finished my morning run. Hit a new personal best! 🏃‍♂️",
      isFriend: true,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      text: "That's awesome! What was your time?",
      isFriend: false,
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      text: "5K in 22 minutes! Been following that nutrition plan you shared.",
      isFriend: true,
      timestamp: '2 hours ago'
    },
    {
      id: 4,
      text: "Want to join me for a run this weekend? We can try that new trail!",
      isFriend: true,
      timestamp: '2 hours ago'
    }
  ],
  '2': [ // Maria Garcia
    {
      id: 1,
      text: "Check out these healthy meal prep containers I got! 🥗",
      isFriend: true,
      timestamp: '1 day ago'
    },
    {
      id: 2,
      text: "Those look great! What are you planning to prep?",
      isFriend: false,
      timestamp: '1 day ago'
    },
    {
      id: 3,
      text: "Quinoa bowls with grilled chicken and roasted veggies. Want the recipe?",
      isFriend: true,
      timestamp: '1 day ago'
    }
  ],
  '3': [ // David Kim
    {
      id: 1,
      text: "Just hit my protein goal for the first time this week! 💪",
      isFriend: true,
      timestamp: '30 minutes ago'
    },
    {
      id: 2,
      text: "Nice work! What helped you reach it?",
      isFriend: false,
      timestamp: '30 minutes ago'
    },
    {
      id: 3,
      text: "Found some great protein-rich snacks and started having a smoothie after workouts. Making progress! 🎯",
      isFriend: true,
      timestamp: '30 minutes ago'
    }
  ]
};

export default function FriendChatScreen() {
  const { id } = useLocalSearchParams();
  const friend = FRIENDS[id as keyof typeof FRIENDS];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(
    SAMPLE_CONVERSATIONS[id as keyof typeof SAMPLE_CONVERSATIONS] || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (!message.trim() || isLoading) return;

    const newMessage = {
      id: messages.length + 1,
      text: message.trim(),
      isFriend: false,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.isFriend ? styles.friendMessage : styles.userMessage]}>
      {item.isFriend && (
        <Image source={{ uri: friend.avatar }} style={styles.messageAvatar} />
      )}
      <View style={styles.messageContent}>
        <Text style={[styles.messageText, item.isFriend ? styles.friendMessageText : styles.userMessageText]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.friendInfo}>
          <Image source={{ uri: friend.avatar }} style={styles.avatar} />
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: friend.status === 'online' ? '#10b981' : '#6b7280' }]} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{friend.name}</Text>
            <Text style={styles.streakText}>🔥 {friend.streak} day streak</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#6b7280"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color="#fff" />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    backgroundColor: '#000',
    padding: 2,
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerText: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  streakText: {
    fontSize: 14,
    color: '#6b7280',
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    maxWidth: '80%',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  friendMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  messageText: {
    padding: 12,
    borderRadius: 16,
    fontSize: 16,
  },
  friendMessageText: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
  },
  userMessageText: {
    backgroundColor: '#3b82f6',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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