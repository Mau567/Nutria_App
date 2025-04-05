import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/auth';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This would open the profile editing screen');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.name}>Sarah Johnson</Text>
                <Text style={styles.email}>sarah.j@example.com</Text>
                <View style={styles.premiumBadge}>
                  <Ionicons name="star" size={14} color="#00ff00" />
                  <Text style={styles.premiumText}>Premium Member</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Days Tracked</Text>
              <Text style={styles.statChange}>+5</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>87%</Text>
              <Text style={styles.statLabel}>Goal Progress</Text>
              <Text style={styles.statChange}>↑ 12%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Achievements</Text>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>New</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsContainer}>
            <TouchableOpacity style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Ionicons name="calendar" size={24} color="#fff" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>7 Day Streak</Text>
                <Text style={styles.achievementProgress}>7/7</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Ionicons name="trophy" size={24} color="#fff" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Protein Champion</Text>
                <Text style={styles.achievementProgress}>5/5</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Ionicons name="sunny" size={24} color="#fff" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Early Bird</Text>
                <Text style={styles.achievementProgress}>3/5</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/settings')}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#4338ca20' }]}>
                <Ionicons name="settings" size={24} color="#818cf8" />
              </View>
              <Text style={styles.menuText}>Settings</Text>
              <View style={styles.menuRight}>
                <Text style={styles.newIndicator}>New</Text>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/settings/notifications')}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#be185d20' }]}>
                <Ionicons name="notifications" size={24} color="#ec4899" />
              </View>
              <Text style={styles.menuText}>Notifications</Text>
              <View style={styles.menuRight}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/settings/health-data')}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#dc262620' }]}>
                <Ionicons name="heart" size={24} color="#ef4444" />
              </View>
              <Text style={styles.menuText}>Health Data</Text>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/settings/goals')}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#065f4620' }]}>
                <Ionicons name="trophy" size={24} color="#10b981" />
              </View>
              <Text style={styles.menuText}>Goals</Text>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/settings/help-support')}
            >
              <View style={[styles.menuIcon, { backgroundColor: '#92400e20' }]}>
                <Ionicons name="help-circle" size={24} color="#f59e0b" />
              </View>
              <Text style={styles.menuText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00ff0020',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    color: '#00ff00',
    fontSize: 12,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: '#ffffff15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff10',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  statChange: {
    fontSize: 12,
    color: '#10b981',
  },
  newBadge: {
    backgroundColor: '#10b98120',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#10b981',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  achievementsContainer: {
    marginBottom: 24,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  achievementProgress: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newIndicator: {
    color: '#ef4444',
    fontSize: 12,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ef444420',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 