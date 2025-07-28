import { Heart, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-soft border-b border-zenaris-200">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-zenaris-700">Zenaris</h1>
              <p className="text-sm text-zenaris-500">Meal Preferences</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-zenaris-500 hover:text-zenaris-700 transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 