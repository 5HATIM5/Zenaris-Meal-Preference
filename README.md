# Zenaris Meal Preferences Interface

A comprehensive web application for managing meal preferences and dietary requirements for elderly individuals. Built with React, TypeScript, and TailwindCSS, this application helps caregivers easily track and manage dietary information.

## 🎯 Features

### Core Functionality
- **Person Information**: Enter and manage the elderly person's basic information
- **Favorite Foods**: Add, edit, and categorize foods the person enjoys
- **Disliked Foods**: Track foods to avoid with severity levels
- **Food Intolerances & Allergies**: Critical medical information with severity indicators
- **Special Instructions**: Free-form text for additional dietary considerations

### User Experience Features
- **Clean, Accessible Design**: Inspired by Zenaris brand identity
- **Local Storage**: Data persists automatically in the browser
- **Responsive Layout**: Works on desktop and mobile devices
- **Quick Add Options**: Common allergies can be added with one click
- **Visual Indicators**: Color-coded severity levels and categories
- **Character Limits**: 500-character limit for special instructions

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Hooks**: Modern React patterns for state management
- **TailwindCSS**: Utility-first styling with custom design system
- **Lucide Icons**: Beautiful, consistent iconography
- **Local Storage**: Automatic data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zenaris-meal-preferences
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📱 Usage

### Adding Person Information
1. Enter the elderly person's name in the top section
2. This unlocks all other features of the application

### Managing Favorite Foods
1. Click "Add Food" in the Favorite Foods section
2. Enter the food name (required)
3. Select a category (optional)
4. Add notes (optional)
5. Click "Add Food" to save

### Managing Disliked Foods
1. Click "Add Food" in the Disliked Foods section
2. Enter the food name (required)
3. Select a category and severity level
4. Add notes explaining the dislike
5. Click "Add Food" to save

### Managing Allergies & Intolerances
1. Click "Add Intolerance" in the Food Intolerances section
2. Use the "Quick Add Common Allergies" buttons for common items
3. Or manually enter the food/ingredient name
4. Select severity level and mark if it's a true allergy
5. Add medical notes if needed
6. Click "Add Intolerance" to save

### Special Instructions
1. Use the text area in the Special Instructions section
2. Include texture preferences, temperature preferences, cultural restrictions
3. Add eating habits, preparation methods, or other considerations
4. Character limit: 500 characters

## 🎨 Design System

### Colors
- **Primary**: Zenaris blue (#1E40AF)
- **Background**: Light beige (#F8F7F2)
- **Success**: Green (#059669) for favorite foods
- **Warning**: Orange (#EA580C) for moderate issues
- **Danger**: Red (#DC2626) for severe allergies
- **Mild**: Yellow (#D97706) for mild issues

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Primary (blue) and secondary (outline) styles
- **Tags**: Color-coded for categories and severity levels
- **Inputs**: Consistent styling with focus states

## 📊 Data Structure

```typescript
interface MealPreferences {
  personName: string;
  favoriteFoods: FoodItem[];
  dislikedFoods: DislikedFood[];
  intolerances: FoodIntolerance[];
  specialInstructions: string;
  lastUpdated: Date;
}
```

### Food Categories
- Breakfast 🌅
- Lunch 🌞
- Dinner 🌙
- Snacks 🍎
- Beverages ☕
- Desserts 🍰
- Other 🍽️

### Severity Levels
- **Mild**: Yellow tag
- **Moderate**: Orange tag
- **Severe**: Red tag

## 🔧 Technical Details

### Tech Stack
- **React 18**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Fast build tool
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── PersonInfo.tsx
│   ├── FavoriteFoods.tsx
│   ├── DislikedFoods.tsx
│   ├── FoodIntolerances.tsx
│   └── SpecialInstructions.tsx
├── types/              # TypeScript interfaces
│   └── index.ts
├── utils/              # Utility functions
│   └── storage.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Local Storage
Data is automatically saved to browser's local storage with the key `zenaris-meal-preferences`. The data includes:
- Person's name
- All food preferences
- Special instructions
- Last updated timestamp

## 🎯 Business Purpose

This application serves caregivers and family members who need to:
- **Reduce Cognitive Load**: Simple, intuitive interface for stressed caregivers
- **Ensure Safety**: Clear tracking of allergies and intolerances
- **Improve Care**: Comprehensive dietary information for better meal planning
- **Maintain Consistency**: Persistent data ensures information isn't lost
- **Support Multiple Caregivers**: Shared information across different caregivers

## 📝 License

This project is created for the Zenaris coding challenge.

## 🤝 Contributing

This is a coding challenge submission. For questions or feedback, please refer to the challenge requirements. 
