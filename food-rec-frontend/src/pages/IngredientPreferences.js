import React, { useState } from 'react';

const IngredientPreferences = ({ onNext }) => {
    const [ingredients, setIngredients] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ ingredientPreferences: ingredients });
    };

    return (
        <div className="container">
            <div className="header">
                Food Recommendation system
            </div>
            <div className="floating-box">
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                    <h2>What ingredients do you like?</h2>
                    <label>
                        <input
                            type="checkbox"
                            checked={ingredients.includes('chicken')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setIngredients([...ingredients, 'chicken']);
                                } else {
                                    setIngredients(ingredients.filter(i => i !== 'chicken'));
                                }
                            }}
                        /> Chicken
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={ingredients.includes('beef')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setIngredients([...ingredients, 'beef']);
                                } else {
                                    setIngredients(ingredients.filter(i => i !== 'beef'));
                                }
                            }}
                        /> Beef
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={ingredients.includes('tofu')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setIngredients([...ingredients, 'tofu']);
                                } else {
                                    setIngredients(ingredients.filter(i => i !== 'tofu'));
                                }
                            }}
                        /> Tofu
                    </label><br />
                    <button type="submit" style={{ marginTop: 20 }}>Next</button>
                </form>
            </div>
        </div>
    );
};

export default IngredientPreferences;
