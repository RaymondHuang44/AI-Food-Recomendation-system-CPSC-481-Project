import React from 'react';
import Recommendations from '../components/Recommendations';
import RecipeCard from '../components/RecipeCard';
import '../App.css';

const ResultsPage = ({ filters, results, onSearch }) => {
  return (
    <div className="container">
      <div className="header">
        Food Recommendation system
      </div>
      <div className="results-container">
        <div className="filters-panel">
          <Recommendations
            onSearch={onSearch}
            initialMaxCalories={filters.maxCalories}
            initialAllergies={filters.allergies}
            initialProtein={filters.protein}
          />
        </div>
        <div className="results-panel" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '16px', width: '100%' }}>Results</div>
          {results.length === 0 ? (
            <div>No results found.</div>
          ) : (
            results.map((recipe, idx) => (
              <RecipeCard key={idx} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
