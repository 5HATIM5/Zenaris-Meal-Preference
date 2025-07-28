export interface FoodItem {
  id: string;
  name: string;
  category?: string;
  notes?: string;
  addedAt: Date;
}

export interface DislikedFood extends FoodItem {
  severity: 'mild' | 'moderate' | 'severe';
}

export interface FoodIntolerance extends FoodItem {
  severity: 'mild' | 'moderate' | 'severe';
  isAllergy: boolean;
}

export interface MealPreferences {
  personName: string;
  favoriteFoods: FoodItem[];
  dislikedFoods: DislikedFood[];
  intolerances: FoodIntolerance[];
  specialInstructions: string;
  lastUpdated: Date;
}

export type FoodCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages' | 'desserts' | 'other' | string;

export const FOOD_CATEGORIES: { value: FoodCategory; label: string; icon: string }[] = [
  { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { value: 'lunch', label: 'Lunch', icon: '🌞' },
  { value: 'dinner', label: 'Dinner', icon: '🌙' },
  { value: 'snacks', label: 'Snacks', icon: '🍎' },
  { value: 'beverages', label: 'Beverages', icon: '☕' },
  { value: 'desserts', label: 'Desserts', icon: '🍰' },
  { value: 'other', label: 'Other', icon: '🍽️' },
];

export const COMMON_ALLERGIES = [
  'Nuts', 'Dairy', 'Gluten', 'Eggs', 'Soy', 'Fish', 'Shellfish', 'Wheat', 'Peanuts', 'Tree Nuts'
];

export const SEVERITY_LEVELS = [
  { value: 'mild', label: 'Mild', color: 'yellow' },
  { value: 'moderate', label: 'Moderate', color: 'orange' },
  { value: 'severe', label: 'Severe', color: 'red' },
]; 