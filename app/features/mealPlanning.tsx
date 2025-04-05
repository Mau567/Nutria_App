import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateMealPlan } from '../services/mealPlanning';
import { Ionicons } from '@expo/vector-icons';
import MealPlanDetails from '../components/MealPlanDetails';

type CookingStyle = 'mealPrep' | 'dailyCooking' | 'mixed';

export default function MealPlanningScreen() {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    budget: '',
    mealsPerDay: '3',
    dietaryPreferences: '',
    healthGoals: '',
    cookingStyle: 'mixed' as CookingStyle,
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    duration: '7',
  });

  const handleGeneratePlan = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Generating plan with form data:', formData);
      
      const response = await generateMealPlan({
        ...formData,
        budget: parseFloat(formData.budget),
        mealsPerDay: parseInt(formData.mealsPerDay),
        dietaryPreferences: formData.dietaryPreferences.split(',').map(p => p.trim()),
        healthGoals: formData.healthGoals.split(',').map(g => g.trim()),
        duration: parseInt(formData.duration),
      });
      
      console.log('Received meal plan:', response);
      setMealPlan(response);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError('Failed to generate meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Meal Planning</Text>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text style={styles.loadingText}>Generating your meal plan...</Text>
              <Text style={styles.loadingSubtext}>This may take a few moments</Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!loading && !mealPlan && (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Budget ($)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.budget}
                  onChangeText={(text) => setFormData({ ...formData, budget: text })}
                  keyboardType="numeric"
                  placeholder="Enter your budget"
                  placeholderTextColor="#6b7280"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Meals per Day</Text>
                <TextInput
                  style={styles.input}
                  value={formData.mealsPerDay}
                  onChangeText={(text) => setFormData({ ...formData, mealsPerDay: text })}
                  keyboardType="numeric"
                  placeholder="Number of meals"
                  placeholderTextColor="#6b7280"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dietary Preferences</Text>
                <TextInput
                  style={styles.input}
                  value={formData.dietaryPreferences}
                  onChangeText={(text) => setFormData({ ...formData, dietaryPreferences: text })}
                  placeholder="e.g., vegetarian, gluten-free"
                  placeholderTextColor="#6b7280"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Health Goals</Text>
                <TextInput
                  style={styles.input}
                  value={formData.healthGoals}
                  onChangeText={(text) => setFormData({ ...formData, healthGoals: text })}
                  placeholder="e.g., weight loss, muscle gain"
                  placeholderTextColor="#6b7280"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cooking Style</Text>
                <View style={styles.buttonGroup}>
                  {(['mealPrep', 'dailyCooking', 'mixed'] as CookingStyle[]).map((style) => (
                    <TouchableOpacity
                      key={style}
                      style={[
                        styles.styleButton,
                        formData.cookingStyle === style && styles.styleButtonActive,
                      ]}
                      onPress={() => setFormData({ ...formData, cookingStyle: style })}
                    >
                      <Text
                        style={[
                          styles.styleButtonText,
                          formData.cookingStyle === style && styles.styleButtonTextActive,
                        ]}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Duration (Days)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.duration}
                  onChangeText={(text) => {
                    const days = parseInt(text) || 0;
                    const startDate = new Date();
                    const endDate = new Date();
                    endDate.setDate(startDate.getDate() + days);
                    
                    setFormData({
                      ...formData,
                      duration: text,
                      startDate: startDate.toISOString().split('T')[0],
                      endDate: endDate.toISOString().split('T')[0],
                    });
                  }}
                  keyboardType="numeric"
                  placeholder="Enter number of days"
                  placeholderTextColor="#6b7280"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                  placeholder="Your city or zip code"
                  placeholderTextColor="#6b7280"
                />
              </View>

              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGeneratePlan}
                disabled={loading}
              >
                <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading && mealPlan && (
            <View style={styles.mealPlanContainer}>
              <View style={styles.mealPlanHeader}>
                <Text style={styles.mealPlanTitle}>Your Meal Plan</Text>
                <TouchableOpacity
                  style={styles.regenerateButton}
                  onPress={() => setMealPlan(null)}
                >
                  <Text style={styles.regenerateButtonText}>Regenerate</Text>
                </TouchableOpacity>
              </View>
              <MealPlanDetails mealPlan={mealPlan} />
            </View>
          )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  loadingSubtext: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 8,
  },
  errorContainer: {
    backgroundColor: '#991b1b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  styleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
  },
  styleButtonActive: {
    backgroundColor: '#3b82f6',
  },
  styleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  styleButtonTextActive: {
    color: '#fff',
  },
  generateButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  mealPlanContainer: {
    flex: 1,
  },
  mealPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  regenerateButton: {
    backgroundColor: '#1f1f1f',
    padding: 8,
    borderRadius: 8,
  },
  regenerateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 