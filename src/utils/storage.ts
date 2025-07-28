import { MealPreferences } from '../types';

const STORAGE_KEY = 'zenaris-meal-preferences';

export const savePreferences = (preferences: MealPreferences): void => {
  try {
    const serialized = JSON.stringify(preferences, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

export const loadPreferences = (): MealPreferences | null => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    
    const parsed = JSON.parse(serialized, (key, value) => {
      if (key === 'lastUpdated' || key === 'addedAt') {
        return new Date(value);
      }
      return value;
    });
    
    return parsed;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return null;
  }
};

export const clearPreferences = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear preferences:', error);
  }
};