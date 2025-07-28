import { FileText } from 'lucide-react';

interface SpecialInstructionsProps {
  instructions: string;
  onUpdate: (instructions: string) => void;
}

const SpecialInstructions: React.FC<SpecialInstructionsProps> = ({ instructions, onUpdate }) => {
  const maxLength = 500;
  const remainingChars = maxLength - instructions.length;

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zenaris-700">Special Instructions</h2>
          <p className="text-sm text-zenaris-500">Additional dietary considerations and preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="specialInstructions" className="block text-sm font-medium text-zenaris-600 mb-2">
            Special Instructions
          </label>
          <textarea
            id="specialInstructions"
            value={instructions}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder="Enter any additional dietary considerations, such as:
• Texture preferences (soft foods, crunchy foods)
• Temperature preferences (warm, cold, room temperature)
• Cultural or religious restrictions
• Eating habits (small portions, frequent meals)
• Preparation methods (no spicy, no fried foods)
• Other important notes for caregivers"
            className="input-field resize-none"
            rows={8}
            maxLength={maxLength}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-zenaris-500">
              Examples: Texture preferences, temperature preferences, cultural restrictions, eating habits
            </p>
            <span className={`text-xs font-medium ${
              remainingChars < 50 ? 'text-red-500' : 
              remainingChars < 100 ? 'text-orange-500' : 
              'text-zenaris-400'
            }`}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>

        {instructions && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-medium text-blue-800 mb-2">Preview</h3>
            <div className="text-sm text-blue-700 whitespace-pre-wrap">
              {instructions}
            </div>
          </div>
        )}

        <div className="bg-zenaris-50 rounded-xl p-4">
          <h3 className="font-medium text-zenaris-700 mb-2">What to include:</h3>
          <ul className="text-sm text-zenaris-600 space-y-1">
            <li>• <strong>Texture preferences:</strong> Soft foods, crunchy foods, pureed meals</li>
            <li>• <strong>Temperature preferences:</strong> Warm, cold, or room temperature foods</li>
            <li>• <strong>Cultural/religious restrictions:</strong> Dietary laws, fasting periods</li>
            <li>• <strong>Eating habits:</strong> Small portions, frequent meals, slow eating</li>
            <li>• <strong>Preparation methods:</strong> No spicy foods, no fried foods, low sodium</li>
            <li>• <strong>Other considerations:</strong> Swallowing difficulties, dental issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpecialInstructions; 