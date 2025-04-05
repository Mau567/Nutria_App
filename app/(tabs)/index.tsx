import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircularProgressBase } from '@/components/CircularProgress';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const caloriesProgress = 1248 / 2020;
  const macros = [
    { label: 'PROTEIN', value: '108g', color: '#f97316' },
    { label: 'CARBS', value: '130g', color: '#3b82f6' },
    { label: 'FATS', value: '52g', color: '#8b5cf6' },
  ];

  const weeklyData = [
    { day: 'S', value: 1500 },
    { day: 'M', value: 1800 },
    { day: 'T', value: 2100 },
    { day: 'W', value: 1750 },
    { day: 'T', value: 1600 },
    { day: 'F', value: 2200 },
    { day: 'S', value: 1900 },
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Nutria</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.logMealButton}
              onPress={() => router.push('/features/log')}
            >
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.buttonText}>Log Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push('/features/profile')}
            >
              <Ionicons name="person-circle" size={28} color="#fff" />
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.caloriesCard}>
          <Text style={styles.cardTitle}>Calories</Text>
          <View style={styles.progressContainer}>
            <CircularProgressBase progress={caloriesProgress}>
              <View style={styles.progressContent}>
                <Text style={styles.caloriesValue}>1,248</Text>
                <Text style={styles.caloriesTotal}>of 2,020 kcal</Text>
              </View>
            </CircularProgressBase>
          </View>
        </View>

        <View style={styles.macrosCard}>
          <Text style={styles.cardTitle}>Nutrient Goals</Text>
          <View style={styles.macrosGrid}>
            {macros.map((macro, index) => (
              <View key={index} style={[styles.macroItem, { backgroundColor: `${macro.color}15` }]}>
                <Text style={[styles.macroLabel, { color: macro.color }]}>{macro.label}</Text>
                <Text style={[styles.macroValue, { color: macro.color }]}>{macro.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.weeklyCard}>
          <Text style={styles.cardTitle}>Weekly Calories</Text>
          <View style={styles.chartContainer}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: `${(day.value / maxValue) * 100}%`,
                      backgroundColor: '#86efac'
                    }
                  ]} 
                />
                <View style={styles.labelContainer}>
                  <Text style={styles.dayLabel}>{day.day}</Text>
                  <Text style={styles.calorieLabel}>{day.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  profileButton: {
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
  caloriesCard: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#ffffff',
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressContent: {
    alignItems: 'center',
  },
  caloriesValue: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#86efac',
  },
  caloriesTotal: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
  },
  macrosCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  macroItem: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  weeklyCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    borderRadius: 10,
    backgroundColor: '#86efac',
    minHeight: 20,
  },
  labelContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  dayLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  calorieLabel: {
    color: '#86efac',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
});