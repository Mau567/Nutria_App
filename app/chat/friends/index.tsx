import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  streak: number;
  lastActive?: string;
  lastMessage?: {
    text: string;
    timestamp: string;
  };
}

const FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'online',
    streak: 15,
    lastMessage: {
      text: "Want to join me for a run this weekend? We can try that new trail!",
      timestamp: '2h ago'
    }
  },
  {
    id: '2',
    name: 'Maria Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    status: 'offline',
    streak: 8,
    lastActive: '2 hours ago',
    lastMessage: {
      text: "Quinoa bowls with grilled chicken and roasted veggies. Want the recipe?",
      timestamp: '1d ago'
    }
  },
  {
    id: '3',
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    status: 'online',
    streak: 21,
    lastMessage: {
      text: "Found some great protein-rich snacks and started having a smoothie after workouts. Making progress! 🎯",
      timestamp: '30m ago'
    }
  }
];

export default function FriendsListScreen() {
  const renderFriend = ({ item }: { item: Friend }) => (
    <TouchableOpacity 
      style={styles.friendCard}
      onPress={() => router.push(`/chat/friends/${item.id}`)}
    >
      <View style={styles.friendInfo}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: item.status === 'online' ? '#10b981' : '#6b7280' }]} />
        </View>
        <View style={styles.friendDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.streak}>🔥 {item.streak}</Text>
          </View>
          {item.lastMessage && (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage.text}
            </Text>
          )}
        </View>
      </View>
      {item.lastMessage && (
        <Text style={styles.timestamp}>{item.lastMessage.timestamp}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Friends</Text>
      </View>

      <FlatList
        data={FRIENDS}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.friendsList}
        ListHeaderComponent={() => (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{FRIENDS.length}</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {FRIENDS.filter(f => f.status === 'online').length}
              </Text>
              <Text style={styles.statLabel}>Online</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {Math.max(...FRIENDS.map(f => f.streak))}
              </Text>
              <Text style={styles.statLabel}>Top Streak</Text>
            </View>
          </View>
        )}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  friendsList: {
    padding: 16,
  },
  friendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
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
  friendDetails: {
    marginLeft: 12,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  streak: {
    fontSize: 14,
    color: '#6b7280',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
}); 