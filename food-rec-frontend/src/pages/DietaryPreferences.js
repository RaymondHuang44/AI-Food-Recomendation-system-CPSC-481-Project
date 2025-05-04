import React, { useState } from 'react';

const DietaryPreferences = ({ onNext }) => {
    const [preferences, setPreferences] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ dietaryPreferences: preferences });
    };

    return (
        <div className="container">
            <div className="header">
                Food Recommendation system
            </div>
            <div className="floating-box">
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                    <h2>What are your dietary preferences?</h2>
                    <label>
                        <input
                            type="checkbox"
                            checked={preferences.includes('vegetarian')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setPreferences([...preferences, 'vegetarian']);
                                } else {
                                    setPreferences(preferences.filter(p => p !== 'vegetarian'));
                                }
                            }}
                        /> Vegetarian
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={preferences.includes('vegan')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setPreferences([...preferences, 'vegan']);
                                } else {
                                    setPreferences(preferences.filter(p => p !== 'vegan'));
                                }
                            }}
                        /> Vegan
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={preferences.includes('pescatarian')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setPreferences([...preferences, 'pescatarian']);
                                } else {
                                    setPreferences(preferences.filter(p => p !== 'pescatarian'));
                                }
                            }}
                        /> Pescatarian
                    </label><br />
                    <button type="submit" style={{ marginTop: 20 }}>Next</button>
                </form>
            </div>
        </div>
    );
};

export default DietaryPreferences;
