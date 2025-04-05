import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  stats: {
    streak: number;
    posts: number;
  };
  isFollowing: boolean;
}

const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    stats: {
      streak: 7,
      posts: 24,
    },
    isFollowing: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    stats: {
      streak: 5,
      posts: 18,
    },
    isFollowing: true,
  },
];

const MOCK_SUGGESTIONS: Friend[] = [
  {
    id: '3',
    name: 'Emma Thompson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    stats: {
      streak: 12,
      posts: 45,
    },
    isFollowing: false,
  },
  {
    id: '4',
    name: 'John Davis',
    avatar: 'https://i.pravatar.cc/150?img=3',
    stats: {
      streak: 3,
      posts: 15,
    },
    isFollowing: false,
  },
];

export default function FriendsScreen() {
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [suggestions, setSuggestions] = useState<Friend[]>(MOCK_SUGGESTIONS);

  const handleFollow = (friendId: string) => {
    setSuggestions(prev => prev.map(friend => 
      friend.id === friendId 
        ? { ...friend, isFollowing: true }
        : friend
    ));
    const newFriend = suggestions.find(f => f.id === friendId);
    if (newFriend) {
      setFriends(prev => [...prev, { ...newFriend, isFollowing: true }]);
      setSuggestions(prev => prev.filter(f => f.id !== friendId));
    }
  };

  const handleUnfollow = (friendId: string) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
    const oldFriend = [...MOCK_FRIENDS, ...MOCK_SUGGESTIONS].find(f => f.id === friendId);
    if (oldFriend) {
      setSuggestions(prev => [...prev, { ...oldFriend, isFollowing: false }]);
    }
  };

  const renderFriendItem = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <TouchableOpacity 
        style={styles.friendInfo}
        onPress={() => router.push(`/social/profile/${item.id}`)}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Ionicons name="flame" size={16} color="#ef4444" />
              <Text style={styles.statText}>{item.stats.streak} day streak</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="images" size={16} color="#3b82f6" />
              <Text style={styles.statText}>{item.stats.posts} posts</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.followButton, item.isFollowing && styles.unfollowButton]}
        onPress={() => item.isFollowing ? handleUnfollow(item.id) : handleFollow(item.id)}
      >
        <Text style={[styles.followButtonText, item.isFollowing && styles.unfollowButtonText]}>
          {item.isFollowing ? 'Unfollow' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Friends</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.sectionTitle}>Your Friends</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>You haven't followed anyone yet</Text>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.suggestionsContainer}>
        <Text style={styles.sectionTitle}>Suggested Friends</Text>
        <FlatList
          data={suggestions}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
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
    marginRight: 12,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
  },
  followButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unfollowButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6b7280',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  unfollowButtonText: {
    color: '#6b7280',
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 24,
  },
  suggestionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1f1f1f',
  },
}); 