import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type IconName = keyof typeof Ionicons.glyphMap;

export default function SettingsScreen() {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline' as IconName, label: 'Personal Information', route: '/settings/personal-info' },
        { icon: 'shield-outline' as IconName, label: 'Privacy', route: '/settings/privacy' },
        { icon: 'notifications-outline' as IconName, label: 'Notifications', route: '/settings/notifications' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'color-palette-outline' as IconName, label: 'Appearance', route: '/settings/appearance' },
        { icon: 'language-outline' as IconName, label: 'Language', route: '/settings/language' },
        { icon: 'fitness-outline' as IconName, label: 'Units', route: '/settings/units' },
      ],
    },
    {
      title: 'Data',
      items: [
        { icon: 'cloud-download-outline' as IconName, label: 'Export Data', route: '/settings/export' },
        { icon: 'trash-outline' as IconName, label: 'Clear Cache', route: '/settings/clear-cache' },
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
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={() => router.push(item.route)}
              >
                <View style={styles.settingItemLeft}>
                  <Ionicons name={item.icon} size={24} color="#fff" />
                  <Text style={styles.settingItemText}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </TouchableOpacity>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    marginBottom: 8,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
}); 