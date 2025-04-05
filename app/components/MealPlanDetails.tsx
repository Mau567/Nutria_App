import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MealPlanDetailsProps {
  mealPlan: {
    meals: {
      date: string;
      mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
      name: string;
      ingredients: {
        name: string;
        quantity: string;
        estimatedCost: number;
        store: string;
      }[];
      instructions: string[];
      estimatedCalories: number;
      estimatedPrepTime: number;
      estimatedCookTime: number;
    }[];
    totalCost: number;
    groceryList: {
      store: string;
      items: {
        name: string;
        quantity: string;
        estimatedCost: number;
      }[];
      totalCost: number;
    }[];
  };
}

export default function MealPlanDetails({ mealPlan }: MealPlanDetailsProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meal Schedule</Text>
        {mealPlan.meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealType}>{meal.mealType}</Text>
              <Text style={styles.mealDate}>{new Date(meal.date).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.mealName}>{meal.name}</Text>
            <View style={styles.mealDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#6b7280" />
                <Text style={styles.detailText}>
                  {meal.estimatedPrepTime + meal.estimatedCookTime} min
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="flame-outline" size={16} color="#6b7280" />
                <Text style={styles.detailText}>{meal.estimatedCalories} cal</Text>
              </View>
            </View>
            <View style={styles.ingredients}>
              <Text style={styles.ingredientsTitle}>Ingredients:</Text>
              {meal.ingredients.map((ingredient, i) => (
                <View key={i} style={styles.ingredientItem}>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <Text style={styles.ingredientDetails}>
                    {ingredient.quantity} • ${ingredient.estimatedCost.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.instructions}>
              <Text style={styles.instructionsTitle}>Instructions:</Text>
              {meal.instructions.map((instruction, i) => (
                <Text key={i} style={styles.instructionText}>
                  {i + 1}. {instruction}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Grocery List</Text>
        {mealPlan.groceryList.map((store, index) => (
          <View key={index} style={styles.storeCard}>
            <Text style={styles.storeName}>{store.store}</Text>
            {store.items.map((item, i) => (
              <View key={i} style={styles.groceryItem}>
                <Text style={styles.groceryItemName}>{item.name}</Text>
                <Text style={styles.groceryItemDetails}>
                  {item.quantity} • ${item.estimatedCost.toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.storeTotal}>
              <Text style={styles.storeTotalText}>Store Total:</Text>
              <Text style={styles.storeTotalAmount}>${store.totalCost.toFixed(2)}</Text>
            </View>
          </View>
        ))}
        <View style={styles.totalCost}>
          <Text style={styles.totalCostText}>Total Cost:</Text>
          <Text style={styles.totalCostAmount}>${mealPlan.totalCost.toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mealType: {
    color: '#3b82f6',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  mealDate: {
    color: '#6b7280',
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  mealDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: '#6b7280',
  },
  ingredients: {
    marginBottom: 16,
  },
  ingredientsTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  ingredientName: {
    color: '#fff',
  },
  ingredientDetails: {
    color: '#6b7280',
  },
  instructions: {
    marginBottom: 8,
  },
  instructionsTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionText: {
    color: '#fff',
    marginBottom: 4,
  },
  storeCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  groceryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  groceryItemName: {
    color: '#fff',
  },
  groceryItemDetails: {
    color: '#6b7280',
  },
  storeTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2f2f2f',
  },
  storeTotalText: {
    color: '#fff',
    fontWeight: '600',
  },
  storeTotalAmount: {
    color: '#fff',
    fontWeight: '600',
  },
  totalCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  totalCostText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalCostAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 