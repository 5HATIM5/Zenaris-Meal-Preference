import { useState, useEffect } from 'react';
import { MealPreferences } from './types';
import Header from './components/Header';
import PersonInfo from './components/PersonInfo';
import FavoriteFoods from './components/FavoriteFoods';
import DislikedFoods from './components/DislikedFoods';
import FoodIntolerances from './components/FoodIntolerances';
import SpecialInstructions from './components/SpecialInstructions';
import { loadPreferences, savePreferences } from './utils/storage';

const defaultPreferences: MealPreferences = {
  personName: '',
  favoriteFoods: [],
  dislikedFoods: [],
  intolerances: [],
  specialInstructions: '',
  lastUpdated: new Date(),
};

function App() {
  const [preferences, setPreferences] = useState<MealPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPreferences = loadPreferences();
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      savePreferences(preferences);
    }
  }, [preferences, isLoading]);

  const updatePreferences = (updates: Partial<MealPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...updates,
      lastUpdated: new Date(),
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenaris-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-zenaris-600">Loading meal preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zenaris-50">
      <Header />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        <div className="space-y-4 sm:space-y-8">
          <PersonInfo 
            personName={preferences.personName}
            onUpdate={(personName) => updatePreferences({ personName })}
          />
          
          <FavoriteFoods 
            foods={preferences.favoriteFoods}
            onUpdate={(favoriteFoods) => updatePreferences({ favoriteFoods })}
          />
          
          <DislikedFoods 
            foods={preferences.dislikedFoods}
            onUpdate={(dislikedFoods) => updatePreferences({ dislikedFoods })}
          />
          
          <FoodIntolerances 
            intolerances={preferences.intolerances}
            onUpdate={(intolerances) => updatePreferences({ intolerances })}
          />
          
          <SpecialInstructions 
            instructions={preferences.specialInstructions}
            onUpdate={(specialInstructions) => updatePreferences({ specialInstructions })}
          />
        </div>
      </main>
    </div>
  );
}

export default App; 