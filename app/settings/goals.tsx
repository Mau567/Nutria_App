import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type BaseGoal = {
  current: number;
  target: number;
  progress: number;
  unit: string;
}

type WeeklyGoal = BaseGoal & {
  weekly: number;
}

type Goals = {
  weight: WeeklyGoal;
  calories: WeeklyGoal;
  protein: BaseGoal;
  steps: BaseGoal;
  water: BaseGoal;
}

export default function GoalsScreen() {
  const [activeGoal, setActiveGoal] = useState<keyof Goals>('weight');

  const goals: Goals = {
    weight: {
      current: 68.5,
      target: 65.0,
      weekly: -0.5,
      progress: 70,
      unit: 'kg',
    },
    calories: {
      current: 2200,
      target: 2000,
      weekly: -200,
      progress: 85,
      unit: 'kcal',
    },
    protein: {
      current: 120,
      target: 150,
      progress: 80,
      unit: 'g',
    },
    steps: {
      current: 8000,
      target: 10000,
      progress: 80,
      unit: 'steps',
    },
    water: {
      current: 2000,
      target: 2500,
      progress: 80,
      unit: 'ml',
    },
  };

  const goalTypes = [
    { id: 'weight', label: 'Weight', icon: 'scale-outline' },
    { id: 'calories', label: 'Calories', icon: 'flame-outline' },
    { id: 'protein', label: 'Protein', icon: 'nutrition-outline' },
    { id: 'steps', label: 'Steps', icon: 'footsteps-outline' },
    { id: 'water', label: 'Water', icon: 'water-outline' },
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
        <Text style={styles.title}>Goals</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.goalTypesContainer}>
          {goalTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[styles.goalTypeButton, activeGoal === type.id && styles.activeGoalType]}
              onPress={() => setActiveGoal(type.id as keyof Goals)}
            >
              <Ionicons 
                name={type.icon as any} 
                size={24} 
                color={activeGoal === type.id ? '#3b82f6' : '#6b7280'} 
              />
              <Text style={[styles.goalTypeText, activeGoal === type.id && styles.activeGoalTypeText]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>{goalTypes.find(t => t.id === activeGoal)?.label} Goal</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${goals[activeGoal as keyof Goals].progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {goals[activeGoal as keyof Goals].progress}% Complete
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Current</Text>
              <Text style={styles.statValue}>
                {goals[activeGoal as keyof Goals].current}
                <Text style={styles.statUnit}> {goals[activeGoal as keyof Goals].unit}</Text>
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Target</Text>
              <Text style={styles.statValue}>
                {goals[activeGoal as keyof Goals].target}
                <Text style={styles.statUnit}> {goals[activeGoal as keyof Goals].unit}</Text>
              </Text>
            </View>

            {'weekly' in goals[activeGoal as keyof Goals] && (
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Weekly Goal</Text>
                <Text style={styles.statValue}>
                  {('weekly' in goals[activeGoal as keyof Goals]) && (goals[activeGoal as keyof Goals] as WeeklyGoal).weekly}
                  <Text style={styles.statUnit}> {goals[activeGoal as keyof Goals].unit}/week</Text>
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tips to Reach Your Goal</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            <Text style={styles.tipText}>Log your meals consistently</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            <Text style={styles.tipText}>Stay within your daily calorie target</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            <Text style={styles.tipText}>Track your progress weekly</Text>
          </View>
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
  goalTypesContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  goalTypeButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: 12,
    borderRadius: 12,
  },
  activeGoalType: {
    backgroundColor: '#3b82f620',
  },
  goalTypeText: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  activeGoalTypeText: {
    color: '#3b82f6',
  },
  goalCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#3b82f620',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editButtonText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    color: '#6b7280',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statUnit: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: 'normal',
  },
  tipsCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
}); 