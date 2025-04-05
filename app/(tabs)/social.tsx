import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useSocial } from '../context/social';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  meal: {
    name: string;
    image: string;
    calories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  caption: string;
  likes: number;
  comments: number;
  commentsList: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    timestamp: string;
  }[];
}

const TABS = ['For you', 'Following'];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    timestamp: '2h ago',
    meal: {
      name: 'Healthy Breakfast Bowl',
      image: 'https://images.unsplash.com/photo-1626711934535-9749ea30dba8',
      calories: 450,
      macros: {
        protein: 20,
        carbs: 55,
        fat: 15,
      },
    },
    caption: 'Starting my day right with this nutritious breakfast bowl! 🥣✨',
    likes: 128,
    comments: 2,
    commentsList: [
      {
        id: '1',
        user: {
          name: 'Mike Chen',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        text: 'Looks delicious! What kind of fruits did you use?',
        timestamp: '1h ago',
      },
      {
        id: '2',
        user: {
          name: 'Emma Thompson',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        text: 'Love the presentation! 😍',
        timestamp: '30m ago',
      },
    ],
  },
  {
    id: '2',
    user: {
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    meal: {
      name: 'Protein Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      calories: 380,
      macros: {
        protein: 30,
        carbs: 35,
        fat: 15,
      },
    },
    caption: 'Starting the day right with this protein-packed bowl 💪',
    likes: 18,
    comments: 1,
    timestamp: '4h ago',
    commentsList: [
      {
        id: '1',
        user: {
          name: 'Sarah Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        text: 'What protein powder do you use?',
        timestamp: '15m ago',
      },
    ],
  },
];

export default function SocialScreen() {
  const [activeTab, setActiveTab] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { posts, likePost, addComment, likedPosts } = useSocial();

  const handleComment = (postId: string) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const handleShare = (postId: string) => {
    // For demo purposes, show a console log
    console.log(`Sharing post ${postId}`);
  };

  const handleOptionsPress = (postId: string) => {
    // For demo purposes, show a console log
    console.log(`Options pressed for post ${postId}`);
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    addComment(postId, { text: newComment.trim() });
    setNewComment('');
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleOptionsPress(item.id)}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.meal.image }} style={styles.mealImage} />

      <View style={styles.postContent}>
        <View style={styles.mealInfo}>
          <Text style={styles.mealName}>{item.meal.name}</Text>
          <View style={styles.macrosContainer}>
            <Text style={styles.macros}>{item.meal.calories} cal</Text>
            <Text style={styles.macros}>•</Text>
            <Text style={styles.macros}>{item.meal.macros.protein}g protein</Text>
            <Text style={styles.macros}>•</Text>
            <Text style={styles.macros}>{item.meal.macros.carbs}g carbs</Text>
            <Text style={styles.macros}>•</Text>
            <Text style={styles.macros}>{item.meal.macros.fat}g fat</Text>
          </View>
        </View>

        <Text style={styles.caption}>{item.caption}</Text>

        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => likePost(item.id)}
          >
            <Ionicons 
              name={likedPosts.includes(item.id) ? "heart" : "heart-outline"} 
              size={24} 
              color={likedPosts.includes(item.id) ? "#ef4444" : "#fff"} 
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleComment(item.id)}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#fff" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleShare(item.id)}
          >
            <Ionicons name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {selectedPostId === item.id && (
          <View style={styles.commentsSection}>
            <FlatList
              data={item.commentsList}
              keyExtractor={(comment) => comment.id}
              renderItem={({ item: comment }) => (
                <View style={styles.commentItem}>
                  <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUserName}>{comment.user.name}</Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                  </View>
                </View>
              )}
              style={styles.commentsList}
            />
            <View style={styles.addCommentSection}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor="#6b7280"
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={() => handleAddComment(item.id)}
              >
                <Ionicons name="send" size={24} color="#3b82f6" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabsContainer}>
          {TABS.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === index && styles.activeTab]}
              onPress={() => setActiveTab(index)}
            >
              <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/social/friends')}
          >
            <Ionicons name="people-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addPostButton}
            onPress={() => router.push('/social/create-post')}
          >
            <Ionicons name="camera-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Share Meal</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feed}
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
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  feed: {
    padding: 16,
  },
  post: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  timestamp: {
    fontSize: 14,
    color: '#6b7280',
  },
  mealImage: {
    width: '100%',
    height: 300,
  },
  postContent: {
    padding: 12,
  },
  mealInfo: {
    marginBottom: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  macrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  macros: {
    fontSize: 14,
    color: '#6b7280',
  },
  caption: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#fff',
  },
  commentsSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2f2f2f',
    paddingTop: 12,
  },
  commentsList: {
    maxHeight: 200,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#fff',
    fontSize: 14,
  },
  sendButton: {
    padding: 8,
  },
}); 