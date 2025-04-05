import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LogMealScreen() {
  const [mealType, setMealType] = useState('breakfast');
  const router = useRouter();

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snack' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Log Your Meal</Text>
          <TouchableOpacity style={styles.scanButton}>
            <Ionicons name="barcode-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.mealTypeContainer}>
          {mealTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.mealTypeButton,
                mealType === type.id && styles.mealTypeButtonActive,
              ]}
              onPress={() => setMealType(type.id)}>
              <Text
                style={[
                  styles.mealTypeText,
                  mealType === type.id && styles.mealTypeTextActive,
                ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Meal Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter meal name"
              placeholderTextColor="#6b7280"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Calories</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#6b7280"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1, styles.marginLeft]}>
              <Text style={styles.label}>Serving Size</Text>
              <TextInput
                style={styles.input}
                placeholder="1"
                keyboardType="numeric"
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Macronutrients</Text>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Protein (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#6b7280"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1, styles.marginLeft]}>
              <Text style={styles.label}>Carbs (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Fat (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#6b7280"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1, styles.marginLeft]}>
              <Text style={styles.label}>Fiber (g)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#6b7280"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.photoButton}>
            <Camera size={24} color="#22c55e" />
            <Text style={styles.photoButtonText}>Add Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAddButton}>
            <Plus size={20} color="#fff" />
            <Text style={styles.quickAddText}>Quick Add from Recent Meals</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Log Meal</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  backButton: {
    padding: 8,
  },
  scanButton: {
    padding: 8,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  mealTypeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  mealTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1f1f1f',
    marginRight: 8,
  },
  mealTypeButtonActive: {
    backgroundColor: '#3b82f6',
  },
  mealTypeText: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 14,
  },
  mealTypeTextActive: {
    color: '#ffffff',
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2f2f2f',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2f2f2f',
  },
  photoButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  quickAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2f2f2f',
    borderStyle: 'dashed',
  },
  quickAddText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 