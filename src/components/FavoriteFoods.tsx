import { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { FoodItem, FoodCategory, FOOD_CATEGORIES } from '../types';

interface FavoriteFoodsProps {
  foods: FoodItem[];
  onUpdate: (foods: FoodItem[]) => void;
}

const FavoriteFoods: React.FC<FavoriteFoodsProps> = ({ foods, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newFood, setNewFood] = useState({
    name: '',
    category: 'other' as FoodCategory,
    notes: ''
  });

  const handleAdd = () => {
    if (newFood.name.trim()) {
      const food: FoodItem = {
        id: Date.now().toString(),
        name: newFood.name.trim(),
        category: newFood.category,
        notes: newFood.notes.trim() || undefined,
        addedAt: new Date()
      };
      onUpdate([...foods, food]);
      setNewFood({ name: '', category: 'other', notes: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (id: string) => {
    const food = foods.find(f => f.id === id);
    if (food) {
      setNewFood({
        name: food.name,
        category: food.category || 'other',
        notes: food.notes || ''
      });
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const handleUpdate = () => {
    if (newFood.name.trim() && editingId) {
      const updatedFoods = foods.map(food => 
        food.id === editingId 
          ? { ...food, name: newFood.name.trim(), category: newFood.category, notes: newFood.notes.trim() || undefined }
          : food
      );
      onUpdate(updatedFoods);
      setNewFood({ name: '', category: 'other', notes: '' });
      setEditingId(null);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    onUpdate(foods.filter(food => food.id !== id));
  };

  const handleCancel = () => {
    setNewFood({ name: '', category: 'other', notes: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-lg sm:text-2xl">❤️</span>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-zenaris-700">Favorite Foods</h2>
            <p className="text-xs sm:text-sm text-zenaris-500">Foods the person enjoys eating</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Food</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-zenaris-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <h3 className="font-medium text-zenaris-700 mb-3 sm:mb-4">
            {editingId ? 'Edit Food' : 'Add New Food'}
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-sm font-medium text-zenaris-600 mb-2">
                Food Name *
              </label>
              <input
                type="text"
                value={newFood.name}
                onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Grilled chicken, Apple pie"
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zenaris-600 mb-2">
                Category
              </label>
              <select
                value={newFood.category}
                onChange={(e) => setNewFood(prev => ({ ...prev, category: e.target.value as FoodCategory }))}
                className="input-field"
              >
                {FOOD_CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zenaris-600 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={newFood.notes}
                onChange={(e) => setNewFood(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="e.g., Prefers grilled over fried, likes extra seasoning"
                className="input-field resize-none"
                rows={3}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="btn-primary flex-1"
                disabled={!newFood.name.trim()}
              >
                {editingId ? 'Update' : 'Add Food'}
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {foods.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zenaris-500">No favorite foods added yet.</p>
          <p className="text-sm text-zenaris-400 mt-1">Click "Add Food" to get started.</p>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {foods.map(food => (
            <div key={food.id} className="bg-white border border-zenaris-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-medium text-zenaris-700 text-sm sm:text-base">{food.name}</h3>
                    {food.category && (
                      <span className="tag tag-favorite text-xs">
                        {FOOD_CATEGORIES.find(c => c.value === food.category)?.icon} 
                        <span className="hidden sm:inline">{FOOD_CATEGORIES.find(c => c.value === food.category)?.label}</span>
                      </span>
                    )}
                  </div>
                  {food.notes && (
                    <p className="text-xs sm:text-sm text-zenaris-600">{food.notes}</p>
                  )}
                  <p className="text-xs text-zenaris-400 mt-2">
                    Added {food.addedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-1 sm:space-x-2 ml-2">
                  <button
                    onClick={() => handleEdit(food.id)}
                    className="p-1.5 sm:p-2 text-zenaris-500 hover:text-zenaris-700 transition-colors"
                  >
                    <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className="p-1.5 sm:p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteFoods; 