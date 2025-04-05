import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import MealPlanningScreen from '../features/mealPlanning';

type Tab = 'tracking' | 'planning';

export default function NutritionScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('tracking');

  const nutrients = [
    { 
      name: 'Calories',
      value: '1,200',
      goal: '2,000',
      unit: 'kcal',
      details: 'Based on your activity level',
    },
    { 
      name: 'Protein',
      value: '75',
      goal: '150',
      unit: 'g',
      details: 'Essential for muscle growth',
    },
    { 
      name: 'Carbs',
      value: '45',
      goal: '250',
      unit: 'g',
      details: 'Primary energy source',
    },
    { 
      name: 'Fat',
      value: '35',
      goal: '65',
      unit: 'g',
      details: 'Important for hormone production',
    },
    { 
      name: 'Fiber',
      value: '12',
      goal: '25',
      unit: 'g',
      details: 'Aids digestion',
    },
    { 
      name: 'Sugar',
      value: '20',
      goal: '50',
      unit: 'g',
      details: 'Keep within daily limit',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Nutrition</Text>
          </View>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tracking' && styles.activeTab]}
            onPress={() => setActiveTab('tracking')}
          >
            <Text style={[styles.tabText, activeTab === 'tracking' && styles.activeTabText]}>
              Tracking
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'planning' && styles.activeTab]}
            onPress={() => setActiveTab('planning')}
          >
            <Text style={[styles.tabText, activeTab === 'planning' && styles.activeTabText]}>
              Meal Planning
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'tracking' ? (
        <ScrollView style={styles.content}>
          <View style={styles.nutrientSection}>
            <Text style={styles.sectionTitle}>Today's Nutrition</Text>
            {nutrients.map((nutrient, index) => (
              <View key={index} style={styles.nutrientCard}>
                <View style={styles.nutrientHeader}>
                  <Text style={styles.nutrientName}>{nutrient.name}</Text>
                  <Text style={styles.nutrientGoal}>Goal: {nutrient.goal}{nutrient.unit}</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${(parseInt(nutrient.value) / parseInt(nutrient.goal)) * 100}%`,
                        backgroundColor: '#10b981'
                      }
                    ]} 
                  />
                </View>
                <View style={styles.nutrientInfo}>
                  <Text style={styles.nutrientValue}>
                    {nutrient.value}
                    <Text style={styles.nutrientUnit}>{nutrient.unit}</Text>
                  </Text>
                  <Text style={styles.nutrientDetails}>{nutrient.details}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <MealPlanningScreen />
      )}
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 28,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  nutrientSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  nutrientCard: {
    backgroundColor: '#ffffff10',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  nutrientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nutrientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  nutrientGoal: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#ffffff15',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  nutrientInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  nutrientValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  nutrientUnit: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 2,
  },
  nutrientDetails: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'right',
    marginLeft: 16,
  },
});