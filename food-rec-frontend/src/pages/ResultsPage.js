import React from 'react';
import Recommendations from '../components/Recommendations';
import RecipeCard from '../components/RecipeCard';
import '../App.css';

const ResultsPage = ({ filters, results, onSearch, onGetMealPlan }) => {
  return (
    <div className="results-bg">
      <div className="results-header-container">
        <div className="header results-header">CraveWise</div>
        <div className="results-floating-island">
          <div className="results-header-row">
            <span className="results-title">Results</span>
            <span>
              <button className="material-button" style={{ marginRight: 8, position: 'relative', left: '140px' }} onClick={() => onGetMealPlan(1)}>
                Get 1-Day Meal Plan
              </button>
              <button className="material-button" style= {{position: 'relative', left: '150px'}} onClick={() => onGetMealPlan(7)}>
                Get 7-Day Meal Plan
              </button>
            </span>
          </div>
          <div className="results-list">
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
    </div>
  );
};

export default ResultsPage;
