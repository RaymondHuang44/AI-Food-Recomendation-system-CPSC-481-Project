import React, { useState } from 'react';

const CuisinePreferences = ({ onNext }) => {
    const [cuisines, setCuisines] = useState([]);

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
                    <label>
                        <input
                            type="checkbox"
                            checked={cuisines.includes('italian')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCuisines([...cuisines, 'italian']);
                                } else {
                                    setCuisines(cuisines.filter(c => c !== 'italian'));
                                }
                            }}
                        /> Italian
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={cuisines.includes('mexican')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCuisines([...cuisines, 'mexican']);
                                } else {
                                    setCuisines(cuisines.filter(c => c !== 'mexican'));
                                }
                            }}
                        /> Mexican
                    </label><br />
                    <button type="submit" style={{ marginTop: 20 }}>Next</button>
                </form>
            </div>
        </div>
    );
};

export default CuisinePreferences;
