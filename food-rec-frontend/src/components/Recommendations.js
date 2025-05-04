import React, { useState } from 'react';
import axios from 'axios';

const Recommendations = ({ onSearch, initialMaxCalories = 500, initialAllergies = [], initialProtein = 0 }) => {
    const [maxCalories, setMaxCalories] = useState(initialMaxCalories);
    const [allergies, setAllergies] = useState(initialAllergies);
    const [protein, setProtein] = useState(initialProtein);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/recommend', {
                max_calories: maxCalories,
                allergies: allergies,
                min_protein: protein
            });
            if (onSearch) {
                onSearch({ maxCalories, allergies, protein }, response.data);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <form onSubmit={handleSubmit} style={{ fontSize: '1.2rem', width: '100%' }}>
                <label>
                    Max Calories:
                    <input
                        type="range"
                        value={maxCalories}
                        onChange={(e) => setMaxCalories(Number(e.target.value))}
                        min="0"
                        max="2000"
                        style={{ width: '100%' }}
                    />
                    <span style={{ marginLeft: 10 }}>{maxCalories}</span>
                </label>
                <br />
                <label>
                    Min Protein (g):
                    <input
                        type="range"
                        value={protein}
                        onChange={(e) => setProtein(Number(e.target.value))}
                        min="0"
                        max="100"
                        style={{ width: '100%' }}
                    />
                    <span style={{ marginLeft: 10 }}>{protein}</span>
                </label>
                <h3>Select Allergies:</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={allergies.includes('peanuts')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAllergies([...allergies, 'peanuts']);
                            } else {
                                setAllergies(allergies.filter(a => a !== 'peanuts'));
                            }
                        }}
                    /> Peanuts
                </label><br />
                <label>
                    <input
                        type="checkbox"
                        checked={allergies.includes('dairy')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAllergies([...allergies, 'dairy']);
                            } else {
                                setAllergies(allergies.filter(a => a !== 'dairy'));
                            }
                        }}
                    /> Dairy
                </label><br />
                <label>
                    <input
                        type="checkbox"
                        checked={allergies.includes('gluten')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAllergies([...allergies, 'gluten']);
                            } else {
                                setAllergies(allergies.filter(a => a !== 'gluten'));
                            }
                        }}
                    /> Gluten
                </label><br />
                <label>
                    <input
                        type="checkbox"
                        checked={allergies.includes('soy')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAllergies([...allergies, 'soy']);
                            } else {
                                setAllergies(allergies.filter(a => a !== 'soy'));
                            }
                        }}
                    /> Soy
                </label><br />
                <button type="submit" style={{ marginTop: 20 }}>Get Recommendations</button>
            </form>
        </div>
    );
};

export default Recommendations;
