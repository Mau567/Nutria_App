import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [settings, setSettings] = useState({
    mealReminders: true,
    waterReminders: true,
    progressUpdates: true,
    achievementAlerts: true,
    friendActivity: false,
    nutritionistMessages: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationGroups = [
    {
      title: 'Daily Reminders',
      items: [
        { key: 'mealReminders', label: 'Meal Logging Reminders', description: 'Remind me to log my meals' },
        { key: 'waterReminders', label: 'Water Intake Reminders', description: 'Remind me to track water intake' },
      ],
    },
    {
      title: 'Updates',
      items: [
        { key: 'progressUpdates', label: 'Progress Updates', description: 'Weekly progress towards my goals' },
        { key: 'achievementAlerts', label: 'Achievement Alerts', description: 'When I earn new achievements' },
      ],
    },
    {
      title: 'Social',
      items: [
        { key: 'friendActivity', label: 'Friend Activity', description: 'When friends share meals or achievements' },
        { key: 'nutritionistMessages', label: 'Nutritionist Messages', description: 'Messages from nutritionists' },
      ],
    },
    {
      title: 'Reports & Marketing',
      items: [
        { key: 'weeklyReports', label: 'Weekly Reports', description: 'Detailed nutrition analysis' },
        { key: 'marketingEmails', label: 'Marketing Emails', description: 'News and special offers' },
      ],
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
        <Text style={styles.title}>Notifications</Text>
      </View>

      <ScrollView style={styles.content}>
        {notificationGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            {group.items.map((item) => (
              <View key={item.key} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={settings[item.key as keyof typeof settings]}
                  onValueChange={() => toggleSetting(item.key as keyof typeof settings)}
                  trackColor={{ false: '#3f3f46', true: '#3b82f6' }}
                  thumbColor={settings[item.key as keyof typeof settings] ? '#fff' : '#71717a'}
                />
              </View>
            ))}
          </View>
        ))}
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    marginBottom: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
}); 