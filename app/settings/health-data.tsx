import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HealthDataScreen() {
  const [integrations, setIntegrations] = useState({
    appleHealth: true,
    googleFit: false,
    fitbit: false,
    garmin: false,
  });

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const healthMetrics = [
    {
      title: 'Activity',
      items: [
        { label: 'Steps', value: '8,432', goal: '10,000', unit: 'steps' },
        { label: 'Active Minutes', value: '45', goal: '60', unit: 'min' },
        { label: 'Distance', value: '3.2', goal: '5.0', unit: 'km' },
      ],
    },
    {
      title: 'Body',
      items: [
        { label: 'Weight', value: '68.5', goal: '65.0', unit: 'kg' },
        { label: 'BMI', value: '22.4', goal: '21.0', unit: '' },
        { label: 'Body Fat', value: '18', goal: '15', unit: '%' },
      ],
    },
    {
      title: 'Vitals',
      items: [
        { label: 'Heart Rate', value: '72', goal: '60-100', unit: 'bpm' },
        { label: 'Blood Pressure', value: '120/80', goal: '120/80', unit: 'mmHg' },
        { label: 'Sleep', value: '7.2', goal: '8.0', unit: 'hrs' },
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
        <Text style={styles.title}>Health Data</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Integrations</Text>
          {Object.entries(integrations).map(([key, value]) => (
            <View key={key} style={styles.integrationItem}>
              <View style={styles.integrationInfo}>
                <Ionicons 
                  name={key === 'appleHealth' ? 'heart' : 'fitness'} 
                  size={24} 
                  color="#ef4444" 
                />
                <Text style={styles.integrationLabel}>
                  {key === 'appleHealth' ? 'Apple Health' :
                   key === 'googleFit' ? 'Google Fit' :
                   key === 'fitbit' ? 'Fitbit' : 'Garmin'}
                </Text>
              </View>
              <Switch
                value={value}
                onValueChange={() => toggleIntegration(key as keyof typeof integrations)}
                trackColor={{ false: '#3f3f46', true: '#3b82f6' }}
                thumbColor={value ? '#fff' : '#71717a'}
              />
            </View>
          ))}
        </View>

        {healthMetrics.map((group, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            {group.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.metricItem}>
                <View style={styles.metricInfo}>
                  <Text style={styles.metricLabel}>{item.label}</Text>
                  <Text style={styles.metricValue}>
                    {item.value}
                    <Text style={styles.metricUnit}> {item.unit}</Text>
                  </Text>
                </View>
                <View style={styles.metricGoal}>
                  <Text style={styles.goalLabel}>Goal</Text>
                  <Text style={styles.goalValue}>{item.goal}</Text>
                </View>
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
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    marginBottom: 8,
  },
  integrationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  integrationLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    marginBottom: 8,
  },
  metricInfo: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  metricUnit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#6b7280',
  },
  metricGoal: {
    alignItems: 'flex-end',
  },
  goalLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  goalValue: {
    fontSize: 16,
    color: '#10b981',
  },
}); 