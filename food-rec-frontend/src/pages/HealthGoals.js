import React, { useState } from 'react';

const HealthGoals = ({ onNext, onBack }) => {
    const [goal, setGoal] = useState('');

    const handleRadioChange = (e) => {
        setGoal(e.target.value);
    };

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
                            name="goal"
                            value="weight_loss"
                            checked={goal === 'weight_loss'}
                            onChange={handleRadioChange}
                        /> Weight Loss
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            name="goal"
                            value="muscle_gain"
                            checked={goal === 'muscle_gain'}
                            onChange={handleRadioChange}
                        /> Muscle Gain
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            checked={goal === 'general_health'}
                            onChange={() => setGoal('general_health')}
                        /> General Health
                    </label><br />
                    <div style={{ marginTop: 20 }}>
                        <button type="button" onClick={onBack} style={{ marginRight: 10 }}>
                            Back
                        </button>
                        <button type="submit">
                            {goal === '' ? 'Skip' : 'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HealthGoals;
