import { MISTRAL_API_KEY } from '@/config/env';

interface MealPlanRequest {
  budget: number;
  mealsPerDay: number;
  dietaryPreferences: string[];
  healthGoals: string[];
  cookingStyle: 'mealPrep' | 'dailyCooking' | 'mixed';
  location: string;
  startDate: string;
  endDate: string;
  duration: number;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface MealPlanResponse {
  meals: {
    date: string;
    mealType: MealType;
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
}

export async function generateMealPlan(request: MealPlanRequest): Promise<MealPlanResponse> {
  const weeksNeeded = Math.ceil(request.duration / 7);
  const isLongTerm = request.duration > 7;

  const prompt = `Create a ${request.cookingStyle} meal plan for ${request.mealsPerDay} meals per day for ${request.duration} days (${weeksNeeded} weeks) with a budget of $${request.budget}.
  ${isLongTerm ? 'Please create a weekly rotation of meals that can be meal prepped in advance.' : ''}
  Dietary preferences: ${request.dietaryPreferences.join(', ')}
  Health goals: ${request.healthGoals.join(', ')}
  Location: ${request.location}
  
  Please format the response as follows:
  
  ${isLongTerm ? 'Week 1 Rotation:' : ''}
  Breakfast: [Meal Name] (can be prepped for [X] servings)
  Ingredients:
  - [Ingredient] ($[cost] for [X] servings)
  - [Ingredient] ($[cost] for [X] servings)
  Instructions:
  1. [Step]
  2. [Step]
  
  Lunch: [Meal Name]
  [... repeat format for each meal]
  
  ${isLongTerm ? 'Weekly Grocery List:' : 'Grocery List:'}
  [Store Name]:
  - [Item] ($[cost] for [X] servings)
  - [Item] ($[cost] for [X] servings)
  [... repeat for each store]
  
  ${isLongTerm ? 'Monthly Cost Breakdown:' : ''}
  ${isLongTerm ? 'Weekly grocery cost: $[X]' : ''}
  ${isLongTerm ? 'Total monthly cost (${request.duration} days): $[X]' : ''}`;

  try {
    console.log('Generating meal plan with request:', request);
    
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-medium',
        messages: [
          {
            role: 'system',
            content: 'You are a professional nutritionist and meal planner. Create detailed, practical meal plans that consider budget, dietary preferences, and local availability. For longer durations (>7 days), focus on creating weekly meal rotations that can be prepped in advance, with clear cost breakdowns per week and for the entire duration.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      throw new Error('Failed to generate meal plan');
    }

    const data = await response.json();
    const mealPlanText = data.choices[0].message.content;
    return parseMealPlanResponse(mealPlanText, request.duration);
  } catch (error) {
    console.error('Error in generateMealPlan:', error);
    throw error;
  }
}

function parseMealPlanResponse(text: string, duration: number): MealPlanResponse {
  const meals: MealPlanResponse['meals'] = [];
  const groceryList: MealPlanResponse['groceryList'] = [];
  let totalCost = 0;
  const weeksNeeded = Math.ceil(duration / 7);

  // Parse the text into structured data
  const lines = text.split('\n');
  let currentMeal: MealPlanResponse['meals'][0] | null = null;
  let currentSection: 'meal' | 'ingredients' | 'instructions' | 'grocery' | 'costs' = 'meal';
  let currentStore: { store: string; items: any[]; totalCost: number } | null = null;
  let currentWeek = 1;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Handle week transitions for long-term plans
    if (trimmedLine.toLowerCase().includes('week') && trimmedLine.includes('rotation')) {
      currentWeek = parseInt(trimmedLine.match(/\d+/)?.[0] || '1');
      continue;
    }

    // Parse meal sections
    if (trimmedLine.match(/^(Breakfast|Lunch|Dinner|Snack)/i)) {
      if (currentMeal) {
        // For long-term plans, duplicate meals for each week
        if (duration > 7) {
          for (let w = 0; w < weeksNeeded; w++) {
            const mealDate = new Date();
            mealDate.setDate(mealDate.getDate() + (w * 7));
            meals.push({
              ...currentMeal,
              date: mealDate.toISOString().split('T')[0],
            });
          }
        } else {
          meals.push(currentMeal);
        }
      }

      const [mealType, ...nameParts] = trimmedLine.split(':');
      currentMeal = {
        date: new Date().toISOString().split('T')[0],
        mealType: mealType.toLowerCase() as MealType,
        name: nameParts.join(':').trim(),
        ingredients: [],
        instructions: [],
        estimatedCalories: Math.floor(Math.random() * 400) + 200,
        estimatedPrepTime: Math.floor(Math.random() * 20) + 10,
        estimatedCookTime: Math.floor(Math.random() * 30) + 15,
      };
      currentSection = 'ingredients';
      continue;
    }

    // Parse ingredients
    if (trimmedLine.toLowerCase().includes('ingredients:')) {
      currentSection = 'ingredients';
      continue;
    }

    // Parse instructions
    if (trimmedLine.toLowerCase().includes('instructions:')) {
      currentSection = 'instructions';
      continue;
    }

    // Parse grocery list
    if (trimmedLine.toLowerCase().includes('grocery list:')) {
      if (currentMeal) {
        meals.push(currentMeal);
        currentMeal = null;
      }
      currentSection = 'grocery';
      continue;
    }

    // Parse store sections in grocery list
    if (currentSection === 'grocery' && trimmedLine.includes(':')) {
      if (currentStore) {
        groceryList.push(currentStore);
      }
      currentStore = {
        store: trimmedLine.replace(':', '').trim(),
        items: [],
        totalCost: 0,
      };
      continue;
    }

    // Add content based on current section
    if (currentSection === 'ingredients' && currentMeal) {
      const match = trimmedLine.match(/^[-•]?\s*(.+?)(?:\s*\(?\$?([\d.]+)\)?)?$/);
      if (match) {
        const [, ingredient, cost] = match;
        currentMeal.ingredients.push({
          name: ingredient.trim(),
          quantity: '1', // Default quantity
          estimatedCost: parseFloat(cost || '0') || Math.random() * 5 + 1, // Random cost if not provided
          store: currentStore?.store || 'Local Store',
        });
      }
    } else if (currentSection === 'instructions' && currentMeal) {
      if (trimmedLine.match(/^\d+\.|[-•]/)) {
        currentMeal.instructions.push(trimmedLine.replace(/^\d+\.|[-•]/, '').trim());
      }
    } else if (currentSection === 'grocery' && currentStore) {
      const match = trimmedLine.match(/^[-•]?\s*(.+?)(?:\s*\(?\$?([\d.]+)\)?)?$/);
      if (match) {
        const [, item, cost] = match;
        const itemCost = parseFloat(cost || '0') || Math.random() * 5 + 1;
        currentStore.items.push({
          name: item.trim(),
          quantity: '1', // Default quantity
          estimatedCost: itemCost,
        });
        currentStore.totalCost += itemCost;
        totalCost += itemCost;
      }
    }

    // Parse cost breakdown for long-term plans
    if (trimmedLine.toLowerCase().includes('monthly cost breakdown')) {
      currentSection = 'costs';
      continue;
    }

    if (currentSection === 'costs') {
      const costMatch = trimmedLine.match(/\$(\d+(\.\d{2})?)/);
      if (costMatch && trimmedLine.toLowerCase().includes('total')) {
        totalCost = parseFloat(costMatch[1]);
      }
    }
  }

  // Add the last meal if exists
  if (currentMeal) {
    if (duration > 7) {
      for (let w = 0; w < weeksNeeded; w++) {
        const mealDate = new Date();
        mealDate.setDate(mealDate.getDate() + (w * 7));
        meals.push({
          ...currentMeal,
          date: mealDate.toISOString().split('T')[0],
        });
      }
    } else {
      meals.push(currentMeal);
    }
  }

  // Add the last store if exists
  if (currentStore) {
    groceryList.push(currentStore);
  }

  // For long-term plans, adjust the total cost based on duration
  if (duration > 7) {
    const weeklyCost = totalCost / weeksNeeded;
    totalCost = weeklyCost * Math.ceil(duration / 7);
  }

  return {
    meals,
    totalCost,
    groceryList,
  };
} 