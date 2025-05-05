import React, { useState } from 'react';

const nutAllergens = [
  'peanut', 'almond', 'brazil nut', 'cashew', 'chestnut', 'hazelnut',
  'macadamia nut', 'pecan', 'pine nut', 'pistachio', 'walnut'
];

const dairyAllergens = [
  'milk', 'cream', 'cheese', 'butter', 'yogurt', 'whey', 
  'casein', 'dairy', 'lactose', 'sour cream', 'buttermilk',
  'cottage cheese', 'cream cheese', 'mozzarella', 'parmesan',
  'ricotta', 'cheddar'
];

const glutenAllergens = [
  'wheat', 'rye', 'barley', 'malt', 'couscous', 'flour', 
  'pasta', 'bread', 'breadcrumbs', 'semolina', 'spelt',
  'graham', 'bulgur', 'farro', 'seitan', 'wheat germ'
];

const AllergiesAndRestrictions = ({ onNext, onBack }) => {
    const [allergies, setAllergies] = useState([]);

    const handleNutsChange = (e) => {
        if (e.target.checked) {
            setAllergies(prev => [...prev, ...nutAllergens.filter(nut => !prev.includes(nut))]);
        } else {
            setAllergies(prev => prev.filter(a => !nutAllergens.includes(a)));
        }
    };

    const handleDairyChange = (e) => {
        if (e.target.checked) {
            setAllergies(prev => [...prev, ...dairyAllergens.filter(dairy => !prev.includes(dairy))]);
        } else {
            setAllergies(prev => prev.filter(a => !dairyAllergens.includes(a)));
        }
    };

    const handleGlutenChange = (e) => {
        if (e.target.checked) {
            setAllergies(prev => [...prev, ...glutenAllergens.filter(gluten => !prev.includes(gluten))]);
        } else {
            setAllergies(prev => prev.filter(a => !glutenAllergens.includes(a)));
        }
    };

    // Check if all allergens are selected
    const nutsChecked = nutAllergens.every(nut => allergies.includes(nut));
    const dairyChecked = dairyAllergens.every(dairy => allergies.includes(dairy));
    const glutenChecked = glutenAllergens.every(gluten => allergies.includes(gluten));

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ allergiesAndRestrictions: allergies });
    };

    return (
        <div className="container">
            <div className="header">
                Food Recommendation system
            </div>
            <div className="floating-box">
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                    <h2>Do you have any allergies?</h2>
                    <label>
                        <input
                            type="checkbox"
                            checked={nutsChecked}
                            onChange={handleNutsChange}
                        /> Nuts
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            checked={dairyChecked}
                            onChange={handleDairyChange}
                        /> Dairy
                    </label>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            checked={glutenChecked}
                            onChange={handleGlutenChange}
                        /> Gluten
                    </label>
                    <div style={{ marginTop: 20 }}>
                        <button type="button" onClick={onBack} style={{ marginRight: 10 }}>
                            Back
                        </button>
                        <button type="submit" style={{ marginTop: 20 }}>Get Recommendations</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AllergiesAndRestrictions;
