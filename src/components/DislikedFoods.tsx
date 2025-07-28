import { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { DislikedFood, FoodCategory, FOOD_CATEGORIES, SEVERITY_LEVELS } from '../types';

interface DislikedFoodsProps {
  foods: DislikedFood[];
  onUpdate: (foods: DislikedFood[]) => void;
}

const DislikedFoods: React.FC<DislikedFoodsProps> = ({ foods, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newFood, setNewFood] = useState({
    name: '',
    category: 'other' as FoodCategory,
    severity: 'mild' as 'mild' | 'moderate' | 'severe',
    notes: ''
  });

  const handleAdd = () => {
    if (newFood.name.trim()) {
      const food: DislikedFood = {
        id: Date.now().toString(),
        name: newFood.name.trim(),
        category: newFood.category,
        severity: newFood.severity,
        notes: newFood.notes.trim() || undefined,
        addedAt: new Date()
      };
      onUpdate([...foods, food]);
      setNewFood({ name: '', category: 'other', severity: 'mild', notes: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (id: string) => {
    const food = foods.find(f => f.id === id);
    if (food) {
      setNewFood({
        name: food.name,
        category: food.category || 'other',
        severity: food.severity,
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
          ? { ...food, name: newFood.name.trim(), category: newFood.category, severity: newFood.severity, notes: newFood.notes.trim() || undefined }
          : food
      );
      onUpdate(updatedFoods);
      setNewFood({ name: '', category: 'other', severity: 'mild', notes: '' });
      setEditingId(null);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    onUpdate(foods.filter(food => food.id !== id));
  };

  const handleCancel = () => {
    setNewFood({ name: '', category: 'other', severity: 'mild', notes: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'tag-mild';
      case 'moderate': return 'tag-allergy';
      case 'severe': return 'tag-severe';
      default: return 'tag-mild';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👎</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zenaris-700">Disliked Foods</h2>
            <p className="text-sm text-zenaris-500">Foods the person avoids or dislikes</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-secondary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Food</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-zenaris-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-zenaris-700 mb-4">
            {editingId ? 'Edit Disliked Food' : 'Add Disliked Food'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zenaris-600 mb-2">
                Food Name *
              </label>
              <input
                type="text"
                value={newFood.name}
                onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Brussels sprouts, Mushrooms"
                className="input-field"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Dislike Level *
                </label>
                <select
                  value={newFood.severity}
                  onChange={(e) => setNewFood(prev => ({ ...prev, severity: e.target.value as 'mild' | 'moderate' | 'severe' }))}
                  className="input-field"
                >
                  {SEVERITY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zenaris-600 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={newFood.notes}
                onChange={(e) => setNewFood(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="e.g., Texture issue, too spicy, childhood dislike"
                className="input-field resize-none"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
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
          <p className="text-zenaris-500">No disliked foods added yet.</p>
          <p className="text-sm text-zenaris-400 mt-1">Click "Add Food" to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {foods.map(food => (
            <div key={food.id} className="bg-white border border-zenaris-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-zenaris-700">{food.name}</h3>
                    <span className={`tag ${getSeverityColor(food.severity)}`}>
                      {food.severity.charAt(0).toUpperCase() + food.severity.slice(1)}
                    </span>
                    {food.category && (
                      <span className="tag tag-disliked">
                        {FOOD_CATEGORIES.find(c => c.value === food.category)?.icon} 
                        {FOOD_CATEGORIES.find(c => c.value === food.category)?.label}
                      </span>
                    )}
                  </div>
                  {food.notes && (
                    <p className="text-sm text-zenaris-600">{food.notes}</p>
                  )}
                  <p className="text-xs text-zenaris-400 mt-2">
                    Added {food.addedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(food.id)}
                    className="p-2 text-zenaris-500 hover:text-zenaris-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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

export default DislikedFoods; 