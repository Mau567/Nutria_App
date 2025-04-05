import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ArrowLeft } from 'lucide-react-native';
import { useLocalSearchParams, router } from 'expo-router';

interface Message {
  id: number;
  text: string;
  isNutritionist: boolean;
  timestamp: string;
}

const SAMPLE_CONVERSATIONS = {
  '1': [ // Dr. Sarah Miller - Sports Nutrition
    {
      id: 1,
      text: "Hi! I'm Dr. Sarah Miller. I see you're interested in improving your athletic performance. How can I help you today?",
      isNutritionist: true,
      timestamp: '2 days ago'
    },
    {
      id: 2,
      text: "I've been training for a marathon but I'm not sure about my nutrition plan. What should I eat before and after long runs?",
      isNutritionist: false,
      timestamp: '2 days ago'
    },
    {
      id: 3,
      text: "Great question! For long runs, carb-loading is essential. The night before, aim for complex carbs like whole grain pasta or brown rice. 2-3 hours before the run, have a light meal with easily digestible carbs like a banana and toast. After the run, within 30 minutes, consume a 4:1 ratio of carbs to protein to replenish glycogen stores and aid recovery.",
      isNutritionist: true,
      timestamp: '2 days ago'
    },
    {
      id: 4,
      text: "What about hydration during the run?",
      isNutritionist: false,
      timestamp: '2 days ago'
    },
    {
      id: 5,
      text: "For runs longer than an hour, drink 4-6 oz of water every 15-20 minutes. Consider sports drinks for runs over 90 minutes to replenish electrolytes. Monitor your urine color - it should be light yellow. I can create a detailed hydration plan based on your specific needs and sweat rate.",
      isNutritionist: true,
      timestamp: '2 days ago'
    }
  ],
  '2': [ // Dr. James Wilson - Weight Management
    {
      id: 1,
      text: "Welcome! I'm Dr. James Wilson, and I specialize in sustainable weight management. Let's work together to achieve your goals.",
      isNutritionist: true,
      timestamp: '1 day ago'
    },
    {
      id: 2,
      text: "I've tried many diets but always end up gaining the weight back. How can I break this cycle?",
      isNutritionist: false,
      timestamp: '1 day ago'
    },
    {
      id: 3,
      text: "That's a common challenge. Instead of extreme diets, let's focus on sustainable lifestyle changes. First, let's analyze your current eating patterns and identify triggers for overeating. Have you noticed specific situations or emotions that lead to unhealthy eating choices?",
      isNutritionist: true,
      timestamp: '1 day ago'
    },
    {
      id: 4,
      text: "Yes, I tend to snack a lot when I'm stressed at work.",
      isNutritionist: false,
      timestamp: '1 day ago'
    },
    {
      id: 5,
      text: "Thank you for sharing. Let's develop some stress-management strategies and prepare healthy snack alternatives. I recommend keeping nutrient-dense options like nuts, fruit, or Greek yogurt at your desk. Also, try the 5-minute rule: when stressed, wait 5 minutes before snacking and drink water first.",
      isNutritionist: true,
      timestamp: '1 day ago'
    }
  ],
  '3': [ // Dr. Emily Chen - Dietary Restrictions
    {
      id: 1,
      text: "Hello! I'm Dr. Emily Chen, and I'm here to help you navigate your dietary restrictions while maintaining a balanced, enjoyable diet.",
      isNutritionist: true,
      timestamp: '3 hours ago'
    },
    {
      id: 2,
      text: "I recently found out I'm lactose intolerant and gluten sensitive. I'm feeling overwhelmed about what I can eat.",
      isNutritionist: false,
      timestamp: '3 hours ago'
    },
    {
      id: 3,
      text: "I understand it can feel overwhelming at first. The good news is there are many delicious alternatives available now. Let's start with breakfast - what's your typical morning meal?",
      isNutritionist: true,
      timestamp: '3 hours ago'
    },
    {
      id: 4,
      text: "Usually cereal with milk, but I can't have either now...",
      isNutritionist: false,
      timestamp: '3 hours ago'
    },
    {
      id: 5,
      text: "Here's a great alternative: overnight oats made with gluten-free oats and almond milk, topped with berries and chia seeds. This provides protein, fiber, and healthy fats. I'll send you a week's worth of breakfast ideas that accommodate both restrictions while ensuring you get all necessary nutrients.",
      isNutritionist: true,
      timestamp: '3 hours ago'
    }
  ]
};

const NUTRITIONISTS = {
  '1': {
    name: 'Dr. Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    specialty: 'Sports Nutrition',
    status: 'online'
  },
  '2': {
    name: 'Dr. James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    specialty: 'Weight Management',
    status: 'offline'
  },
  '3': {
    name: 'Dr. Emily Chen',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    specialty: 'Dietary Restrictions',
    status: 'online'
  }
};

export default function NutritionistChatScreen() {
  const { id } = useLocalSearchParams();
  const nutritionist = NUTRITIONISTS[id as keyof typeof NUTRITIONISTS];
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
      isNutritionist: false,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate nutritionist response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        text: "I'll get back to you shortly with a detailed response. In the meantime, is there anything specific you'd like me to address?",
        isNutritionist: true,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 2000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.isNutritionist ? styles.nutritionistMessage : styles.userMessage]}>
      {item.isNutritionist && (
        <Image source={{ uri: nutritionist.avatar }} style={styles.messageAvatar} />
      )}
      <View style={styles.messageContent}>
        <Text style={[styles.messageText, item.isNutritionist ? styles.nutritionistMessageText : styles.userMessageText]}>
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
        <View style={styles.nutritionistInfo}>
          <Image source={{ uri: nutritionist.avatar }} style={styles.avatar} />
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: nutritionist.status === 'online' ? '#10b981' : '#6b7280' }]} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{nutritionist.name}</Text>
            <Text style={styles.specialty}>{nutritionist.specialty}</Text>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  nutritionistInfo: {
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
  specialty: {
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
  nutritionistMessage: {
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
  nutritionistMessageText: {
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