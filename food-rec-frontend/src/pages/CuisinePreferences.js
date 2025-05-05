import React, { useState } from 'react';

const CuisinePreferences = ({ onNext, onBack }) => {
    const [cuisines, setCuisines] = useState([]);

    const handleCheckboxChange = (cuisine) => (e) => {
        if (e.target.checked) {
            setCuisines(prev => [...prev, cuisine]);
        } else {
            setCuisines(prev => prev.filter(c => c !== cuisine));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ cuisinePreferences: cuisines });
    };

    return (
        <div className="container">
            <div className="header">
                Food Recommendation system
            </div>
            <div className="floating-box">
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                    <h2>What are your favorite cuisines?</h2>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={cuisines.includes('asian')}
                                onChange={handleCheckboxChange('asian')}
                            /> Asian
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={cuisines.includes('african')}
                                onChange={handleCheckboxChange('african')}
                            /> African
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={cuisines.includes('north_american')}
                                onChange={handleCheckboxChange('north_american')}
                            /> North American
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={cuisines.includes('central_american')}
                                onChange={handleCheckboxChange('central_american')}
                            /> Central American
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={cuisines.includes('european')}
                                onChange={handleCheckboxChange('european')}
                            /> European
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={cuisines.includes('oceanic')}
                                onChange={handleCheckboxChange('oceanic')}
                            /> Oceanic
                        </label>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <button type="button" onClick={onBack} style={{ marginRight: 10 }}>
                            Back
                        </button>
                        <button type="submit">
                            {cuisines.length === 0 ? 'Skip' : 'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CuisinePreferences;
