import { User } from 'lucide-react';

interface PersonInfoProps {
  personName: string;
  onUpdate: (name: string) => void;
}

const PersonInfo: React.FC<PersonInfoProps> = ({ personName, onUpdate }) => {
  return (
    <div className="card">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-zenaris-200 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-zenaris-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-zenaris-700 mb-1">
            {personName || 'Enter Person\'s Name'}
          </h2>
          <p className="text-zenaris-500">
            {personName 
              ? 'Here you can manage meal preferences and dietary requirements.'
              : 'Please enter the name of the person whose meal preferences you want to manage.'
            }
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="personName" className="block text-sm font-medium text-zenaris-600 mb-2">
            Person's Name
          </label>
          <input
            id="personName"
            type="text"
            value={personName}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder="Enter the person's full name"
            className="input-field"
          />
        </div>
        
        {personName && (
          <div className="bg-zenaris-50 rounded-xl p-4">
            <h3 className="font-medium text-zenaris-700 mb-2">Quick Overview</h3>
            <p className="text-sm text-zenaris-600">
              This interface helps caregivers manage comprehensive meal preferences, 
              including favorite foods, dislikes, allergies, and special dietary requirements 
              for {personName}. All information is saved locally and can be easily updated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonInfo; 