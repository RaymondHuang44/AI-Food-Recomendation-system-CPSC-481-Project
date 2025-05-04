import React, { useState } from 'react';

const AllergiesAndRestrictions = ({ onNext }) => {
    const [restrictions, setRestrictions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ allergiesAndRestrictions: restrictions });
    };

    return (
        <div className="container">
            <div className="header">
                Food Recommendation system
            </div>
            <div className="floating-box">
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                    <h2>Do you have any allergies or dietary restrictions?</h2>
                    <label>
                        <input
                            type="checkbox"
                            checked={restrictions.includes('peanuts')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setRestrictions([...restrictions, 'peanuts']);
                                } else {
                                    setRestrictions(restrictions.filter(r => r !== 'peanuts'));
                                }
                            }}
                        /> Peanuts
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={restrictions.includes('dairy')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setRestrictions([...restrictions, 'dairy']);
                                } else {
                                    setRestrictions(restrictions.filter(r => r !== 'dairy'));
                                }
                            }}
                        /> Dairy
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            checked={restrictions.includes('gluten')}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setRestrictions([...restrictions, 'gluten']);
                                } else {
                                    setRestrictions(restrictions.filter(r => r !== 'gluten'));
                                }
                            }}
                        /> Gluten
                    </label><br />
                    <button type="submit" style={{ marginTop: 20 }}>Get Recommendations</button>
                </form>
            </div>
        </div>
    );
};

export default AllergiesAndRestrictions;
