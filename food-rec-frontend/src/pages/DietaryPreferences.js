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
                CraveWise
            </div>
            <div className="floating-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 400, width: '70vw' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h2>What are your dietary preferences?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={dietary.includes('vegetarian')}
                                    onChange={handleCheckboxChange('vegetarian')}
                                /> Vegetarian
                            </label>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={dietary.includes('vegan')}
                                    onChange={handleCheckboxChange('vegan')}
                                /> Vegan
                            </label>
                            <label style={{ marginBottom: 0 }}>
                                <input
                                    type="checkbox"
                                    checked={dietary.includes('pescatarian')}
                                    onChange={handleCheckboxChange('pescatarian')}
                                /> Pescatarian
                            </label>
                        </div>
                    </div>
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
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
