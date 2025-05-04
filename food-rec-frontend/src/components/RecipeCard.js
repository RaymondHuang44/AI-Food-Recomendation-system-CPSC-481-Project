import React, { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);

  // images
  let imageUrl = '';
  try {
    const images = JSON.parse(recipe.Images);
    imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : '';
  } catch {
    imageUrl = '';
  }

  // instructions
  let instructions = [];
  try {
    instructions = JSON.parse(recipe.RecipeInstructions);
  } catch {
    instructions = [];
  }

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

  return (
    <>
      <div className="recipe-card" onClick={() => setExpanded(true)}>
        {imageUrl && <img src={imageUrl} alt={recipe.Name} className="recipe-image" />}
        <h3>{recipe.Name}</h3>
        <div>{recipe.Calories} calories</div>
        <div>{recipe.ProteinContent}g protein</div>
        <div>
          <strong>Instructions:</strong> {instructions[0] ? instructions[0] : 'No instructions'}
        </div>
      </div>
      {expanded && (
        <div className="modal-overlay" onClick={() => setExpanded(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setExpanded(false)}>×</button>
            {imageUrl && <img src={imageUrl} alt={recipe.Name} className="modal-image" />}
            <h2>{recipe.Name}</h2>
            <div><strong>Calories:</strong> {recipe.Calories}</div>
            <div><strong>Protein:</strong> {recipe.ProteinContent}g</div>
            <div><strong>Type:</strong> {recipe.RecipeCategory}</div>
            <div><strong>FatContent:</strong> {recipe.FatContent}g</div>
            <div><strong>SaturatedFatContent:</strong> {recipe.SaturatedFatContent}</div>
            <div><strong>Carbs:</strong> {recipe.CarbohydrateContent}g</div>
            <div><strong>Sugars:</strong> {recipe.SugarContent}g</div>
            <div><strong>Fiber:</strong> {recipe.FiberContent}g</div>
            <div><strong>Cholesterol:</strong> {recipe.CholesterolContent}mg</div>
            <div><strong>Sodium:</strong> {recipe.SodiumContent}mg</div>            

            <div><strong>Ingredients:</strong>
              <ul>
                {ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
              </ul>
            </div>
            <div><strong>Instructions:</strong>
              <ol>
                {instructions.map((step, idx) => <li key={idx}>{step}</li>)}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
