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
                CraveWise
            </div>
            <div className="floating-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 400, width: '70vw' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h2>Do you have any ingredient preferences?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={ingredients.includes('meat')}
                                    onChange={handleCheckboxChange('meat')}
                                /> Meat
                            </label>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={ingredients.includes('fish')}
                                    onChange={handleCheckboxChange('fish')}
                                /> Fish
                            </label>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={ingredients.includes('poultry')}
                                    onChange={handleCheckboxChange('poultry')}
                                /> Poultry
                            </label>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={ingredients.includes('wild game')}
                                    onChange={handleCheckboxChange('wild game')}
                                /> Wild Game
                            </label>
                            <label style={{ marginBottom: 0 }}>
                                <input
                                    type="checkbox"
                                    checked={ingredients.includes('shellfish')}
                                    onChange={handleCheckboxChange('shellfish')}
                                /> Shellfish
                            </label>
                        </div>
                    </div>
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
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
