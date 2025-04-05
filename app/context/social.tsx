import React, { createContext, useContext, useState } from 'react';

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

const FOR_YOU_POSTS: Post[] = [
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
    timestamp: '4h ago',
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

const FOLLOWING_POSTS: Post[] = [
  {
    id: '3',
    user: {
      name: 'Emma Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    timestamp: '1h ago',
    meal: {
      name: 'Grilled Chicken Salad',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      calories: 320,
      macros: {
        protein: 35,
        carbs: 15,
        fat: 12,
      },
    },
    caption: 'Light and nutritious lunch after my workout 🥗💪',
    likes: 45,
    comments: 3,
    commentsList: [
      {
        id: '1',
        user: {
          name: 'Sarah Wilson',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        text: 'That looks amazing! Love the colors!',
        timestamp: '45m ago',
      },
      {
        id: '2',
        user: {
          name: 'John Davis',
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        text: 'Perfect post-workout meal 💯',
        timestamp: '30m ago',
      },
      {
        id: '3',
        user: {
          name: 'Lisa Wang',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
        text: 'Recipe please! 🙏',
        timestamp: '15m ago',
      },
    ],
  },
  {
    id: '4',
    user: {
      name: 'John Davis',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    timestamp: '3h ago',
    meal: {
      name: 'Homemade Protein Pancakes',
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
      calories: 420,
      macros: {
        protein: 25,
        carbs: 45,
        fat: 18,
      },
    },
    caption: 'Sunday morning protein pancakes stack! 🥞 Made with oat flour and banana 🍌',
    likes: 89,
    comments: 2,
    commentsList: [
      {
        id: '1',
        user: {
          name: 'Emma Thompson',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        text: 'These look perfect! Is that maple syrup?',
        timestamp: '2h ago',
      },
      {
        id: '2',
        user: {
          name: 'Mike Chen',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        text: 'Great way to start the day!',
        timestamp: '1h ago',
      },
    ],
  },
];

interface SocialContextType {
  posts: Post[];
  forYouPosts: Post[];
  followingPosts: Post[];
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: { text: string }) => void;
  likedPosts: string[];
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [forYouPosts, setForYouPosts] = useState<Post[]>(FOR_YOU_POSTS);
  const [followingPosts, setFollowingPosts] = useState<Post[]>(FOLLOWING_POSTS);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const addPost = (post: Post) => {
    setForYouPosts([post, ...forYouPosts]);
    setFollowingPosts([post, ...followingPosts]);
  };

  const likePost = (postId: string) => {
    if (likedPosts.includes(postId)) {
      // Unlike
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setForYouPosts(forYouPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1 }
          : post
      ));
      setFollowingPosts(followingPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1 }
          : post
      ));
    } else {
      // Like
      setLikedPosts([...likedPosts, postId]);
      setForYouPosts(forYouPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
      setFollowingPosts(followingPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
    }
  };

  const addComment = (postId: string, comment: { text: string }) => {
    const newComment = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      text: comment.text,
      timestamp: 'Just now',
    };

    setForYouPosts(forYouPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...post.commentsList, newComment],
        };
      }
      return post;
    }));

    setFollowingPosts(followingPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...post.commentsList, newComment],
        };
      }
      return post;
    }));
  };

  return (
    <SocialContext.Provider value={{ 
      posts: forYouPosts, 
      forYouPosts, 
      followingPosts, 
      addPost, 
      likePost, 
      addComment, 
      likedPosts 
    }}>
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
} 