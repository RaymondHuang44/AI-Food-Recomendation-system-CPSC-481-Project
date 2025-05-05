import React, { useState } from 'react';

const IngredientPreferences = ({ onNext, onBack }) => {
    const [ingredients, setIngredients] = useState([]);

    const handleCheckboxChange = (ingredient) => (e) => {
        if (e.target.checked) {
            setIngredients(prev => [...prev, ingredient]);
        } else {
            setIngredients(prev => prev.filter(i => i !== ingredient));
        }
    };

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
                    <h2>Do you have any ingredient preferences?</h2>
                    <label>
                        <input
                            type="checkbox"
                            checked={ingredients.includes('chicken')}
                            onChange={handleCheckboxChange('chicken')}
                        /> Chicken
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={ingredients.includes('beef')}
                            onChange={handleCheckboxChange('beef')}
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
                    <div style={{ marginTop: 20 }}>
                        <button className="material-button" type="button" onClick={onBack} style={{ marginRight: 10 }}>
                            Back
                        </button>
                        <button className="material-button" type="submit">
                            {ingredients.length === 0 ? 'Skip' : 'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IngredientPreferences;
