import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);


  // ingredients
  let ingredients = [];
  if (Array.isArray(recipe.RecipeIngredientParts)) {
    ingredients = recipe.RecipeIngredientParts;
  } else if (typeof recipe.RecipeIngredientParts === 'string') {
    try {
      // Try JSON first
      ingredients = JSON.parse(recipe.RecipeIngredientParts);
    } catch {
      const rVecMatch = recipe.RecipeIngredientParts.match(/^c\((.*)\)$/);
      if (rVecMatch) {
        ingredients = rVecMatch[1]
          .split(',')
          .map(s => s.trim().replace(/^"(.*)"$/, '$1'));
      } else {
        ingredients = [];
      }
    }
  }

  const handleOpen = () => {
    setExpanded(true);
    setClosing(false);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setExpanded(false);
      setClosing(false);
    }, 200); // Match the duration of popupOut animation
  };

  return (
    <>
      <div className="recipe-card" onClick={handleOpen}>
        <h3>{recipe.Name}</h3>
        <div>{recipe.Calories} calories</div>
        <div>{recipe.ProteinContent}g protein</div>
        <div>
        </div>
      </div>
      {expanded && (
        <div className="modal-overlay" onClick={handleClose}>
          <div
            className={`modal-card${closing ? ' closing' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleClose}>×</button>
            <h2>{recipe.Name}</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-label">Calories</div>
                <div className="stat-value">{recipe.Calories}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Protein</div>
                <div className="stat-value">{recipe.ProteinContent}g</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Type</div>
                <div className="stat-value">{recipe.RecipeCategory}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Sugars</div>
                <div className="stat-value">{recipe.SugarContent}g</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Fat</div>
                <div className="stat-value">{recipe.FatContent}g</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Carbs</div>
                <div className="stat-value">{recipe.CarbohydrateContent}g</div>
              </div>
            </div>
            <ul className="other-stats-list">
              <li><strong>Saturated Fat:</strong> {recipe.SaturatedFatContent}g</li>
              <li><strong>Fiber:</strong> {recipe.FiberContent}g</li>
              <li><strong>Cholesterol:</strong> {recipe.CholesterolContent}mg</li>
              <li><strong>Sodium:</strong> {recipe.SodiumContent}mg</li>
            </ul>
            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <ul>
                {ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
