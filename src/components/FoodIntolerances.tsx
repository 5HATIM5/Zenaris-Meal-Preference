import { useState } from 'react';
import { Plus, Edit3, Trash2, AlertTriangle } from 'lucide-react';
import { FoodIntolerance, FoodCategory, FOOD_CATEGORIES, SEVERITY_LEVELS, COMMON_ALLERGIES } from '../types';

interface FoodIntolerancesProps {
  intolerances: FoodIntolerance[];
  onUpdate: (intolerances: FoodIntolerance[]) => void;
}

const FoodIntolerances: React.FC<FoodIntolerancesProps> = ({ intolerances, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newIntolerance, setNewIntolerance] = useState({
    name: '',
    category: 'other' as FoodCategory,
    severity: 'mild' as 'mild' | 'moderate' | 'severe',
    isAllergy: false,
    notes: ''
  });

  const handleAdd = () => {
    if (newIntolerance.name.trim()) {
      const intolerance: FoodIntolerance = {
        id: Date.now().toString(),
        name: newIntolerance.name.trim(),
        category: newIntolerance.category,
        severity: newIntolerance.severity,
        isAllergy: newIntolerance.isAllergy,
        notes: newIntolerance.notes.trim() || undefined,
        addedAt: new Date()
      };
      onUpdate([...intolerances, intolerance]);
      setNewIntolerance({ name: '', category: 'other', severity: 'mild', isAllergy: false, notes: '' });
      setIsAdding(false);
    }
  };

  const handleEdit = (id: string) => {
    const intolerance = intolerances.find(i => i.id === id);
    if (intolerance) {
      setNewIntolerance({
        name: intolerance.name,
        category: intolerance.category || 'other',
        severity: intolerance.severity,
        isAllergy: intolerance.isAllergy,
        notes: intolerance.notes || ''
      });
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const handleUpdate = () => {
    if (newIntolerance.name.trim() && editingId) {
      const updatedIntolerances = intolerances.map(intolerance => 
        intolerance.id === editingId 
          ? { ...intolerance, name: newIntolerance.name.trim(), category: newIntolerance.category, severity: newIntolerance.severity, isAllergy: newIntolerance.isAllergy, notes: newIntolerance.notes.trim() || undefined }
          : intolerance
      );
      onUpdate(updatedIntolerances);
      setNewIntolerance({ name: '', category: 'other', severity: 'mild', isAllergy: false, notes: '' });
      setEditingId(null);
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    onUpdate(intolerances.filter(intolerance => intolerance.id !== id));
  };

  const handleCancel = () => {
    setNewIntolerance({ name: '', category: 'other', severity: 'mild', isAllergy: false, notes: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleQuickAdd = (allergy: string) => {
    const intolerance: FoodIntolerance = {
      id: Date.now().toString(),
      name: allergy,
      category: 'other',
      severity: 'severe',
      isAllergy: true,
      notes: '',
      addedAt: new Date()
    };
    onUpdate([...intolerances, intolerance]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'tag-mild';
      case 'moderate': return 'tag-allergy';
      case 'severe': return 'tag-severe';
      default: return 'tag-mild';
    }
  };

  const getUnusedAllergies = () => {
    const usedAllergies = intolerances.map(i => i.name.toLowerCase());
    return COMMON_ALLERGIES.filter(allergy => 
      !usedAllergies.includes(allergy.toLowerCase())
    );
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zenaris-700">Food Intolerances & Allergies</h2>
            <p className="text-sm text-zenaris-500">Critical medical dietary restrictions</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Intolerance</span>
        </button>
      </div>

      {/* Quick Add Common Allergies */}
      {getUnusedAllergies().length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-orange-800 mb-3">Quick Add Common Allergies</h3>
          <div className="flex flex-wrap gap-2">
            {getUnusedAllergies().slice(0, 6).map(allergy => (
              <button
                key={allergy}
                onClick={() => handleQuickAdd(allergy)}
                className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>
      )}

      {isAdding && (
        <div className="bg-zenaris-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-zenaris-700 mb-4">
            {editingId ? 'Edit Intolerance' : 'Add Food Intolerance'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zenaris-600 mb-2">
                Food/Ingredient Name *
              </label>
              <input
                type="text"
                value={newIntolerance.name}
                onChange={(e) => setNewIntolerance(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Peanuts, Gluten, Dairy"
                className="input-field"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zenaris-600 mb-2">
                  Category
                </label>
                <select
                  value={newIntolerance.category}
                  onChange={(e) => setNewIntolerance(prev => ({ ...prev, category: e.target.value as FoodCategory }))}
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
                  Severity Level *
                </label>
                <select
                  value={newIntolerance.severity}
                  onChange={(e) => setNewIntolerance(prev => ({ ...prev, severity: e.target.value as 'mild' | 'moderate' | 'severe' }))}
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
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isAllergy"
                checked={newIntolerance.isAllergy}
                onChange={(e) => setNewIntolerance(prev => ({ ...prev, isAllergy: e.target.checked }))}
                className="w-4 h-4 text-accent-blue border-zenaris-300 rounded focus:ring-accent-blue"
              />
              <label htmlFor="isAllergy" className="text-sm font-medium text-zenaris-600">
                This is a true allergy (not just intolerance)
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zenaris-600 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={newIntolerance.notes}
                onChange={(e) => setNewIntolerance(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="e.g., Anaphylactic reaction, digestive issues, skin reactions"
                className="input-field resize-none"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="btn-primary flex-1"
                disabled={!newIntolerance.name.trim()}
              >
                {editingId ? 'Update' : 'Add Intolerance'}
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

      {intolerances.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zenaris-500">No intolerances or allergies added yet.</p>
          <p className="text-sm text-zenaris-400 mt-1">Click "Add Intolerance" to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {intolerances.map(intolerance => (
            <div key={intolerance.id} className="bg-white border border-zenaris-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-zenaris-700">{intolerance.name}</h3>
                    <span className={`tag ${getSeverityColor(intolerance.severity)}`}>
                      {intolerance.severity.charAt(0).toUpperCase() + intolerance.severity.slice(1)}
                    </span>
                    {intolerance.isAllergy && (
                      <span className="tag tag-severe">Allergy</span>
                    )}
                    {intolerance.category && (
                      <span className="tag tag-allergy">
                        {FOOD_CATEGORIES.find(c => c.value === intolerance.category)?.icon} 
                        {FOOD_CATEGORIES.find(c => c.value === intolerance.category)?.label}
                      </span>
                    )}
                  </div>
                  {intolerance.notes && (
                    <p className="text-sm text-zenaris-600">{intolerance.notes}</p>
                  )}
                  <p className="text-xs text-zenaris-400 mt-2">
                    Added {intolerance.addedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(intolerance.id)}
                    className="p-2 text-zenaris-500 hover:text-zenaris-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(intolerance.id)}
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

export default FoodIntolerances; 