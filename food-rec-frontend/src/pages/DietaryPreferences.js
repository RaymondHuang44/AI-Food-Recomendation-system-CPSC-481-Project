import React, { useState } from 'react';

const DietaryPreferences = ({ onNext }) => {
    const [dietary, setDietary] = useState([]);

    const handleCheckboxChange = (diet) => (e) => {
        if (e.target.checked) {
            setDietary(prev => [...prev, diet]);
        } else {
            setDietary(prev => prev.filter(d => d !== diet));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ dietaryPreferences: dietary });
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
                            checked={dietary.includes('vegetarian')}
                            onChange={handleCheckboxChange('vegetarian')}
                        /> Vegetarian
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={dietary.includes('vegan')}
                            onChange={handleCheckboxChange('vegan')}
                        /> Vegan
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={dietary.includes('pescatarian')}
                            onChange={handleCheckboxChange('pescatarian')}
                        /> Pescatarian
                    </label><br />
                    <div style={{ marginTop: 20 }}>
                        <button className="material-button" type="submit">
                            {dietary.length === 0 ? 'Skip' : 'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DietaryPreferences;
