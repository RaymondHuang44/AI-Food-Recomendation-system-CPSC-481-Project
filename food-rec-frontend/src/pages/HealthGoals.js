import React, { useState } from 'react';

const HealthGoals = ({ onNext }) => {
    const [goal, setGoal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ healthGoal: goal });
    };

    return (
        <div className="container">
            <div className="header">
                Food Recommendation system
            </div>
            <div className="floating-box">
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                    <h2>What is your health goal?</h2>
                    <label>
                        <input
                            type="radio"
                            checked={goal === 'weight_loss'}
                            onChange={() => setGoal('weight_loss')}
                        /> Weight Loss
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            checked={goal === 'muscle_gain'}
                            onChange={() => setGoal('muscle_gain')}
                        /> Muscle Gain
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            checked={goal === 'general_health'}
                            onChange={() => setGoal('general_health')}
                        /> General Health
                    </label><br />
                    <button type="submit" style={{ marginTop: 20 }}>Next</button>
                </form>
            </div>
        </div>
    );
};

export default HealthGoals;
