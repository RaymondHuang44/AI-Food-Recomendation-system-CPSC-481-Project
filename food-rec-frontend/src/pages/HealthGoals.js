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
                CraveWise
            </div>
            <div className="floating-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 400 }}>
                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h2>What is your health goal?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="radio"
                                    name="goal"
                                    value="weight_loss"
                                    checked={goal === 'weight_loss'}
                                    onChange={handleRadioChange}
                                /> Weight Loss
                            </label>
                            <label style={{ marginBottom: 8 }}>
                                <input
                                    type="radio"
                                    name="goal"
                                    value="muscle_gain"
                                    checked={goal === 'muscle_gain'}
                                    onChange={handleRadioChange}
                                /> Muscle Gain
                            </label>
                            <label style={{ marginBottom: 0 }}>
                                <input
                                    type="radio"
                                    checked={goal === 'general_health'}
                                    onChange={() => setGoal('general_health')}
                                /> General Health
                            </label>
                        </div>
                    </div>
                    <div style={{ marginTop: 20, marginBottom: 20 }}>
                        <button className="material-button" type="button" onClick={onBack} style={{ marginRight: 10 }}>
                            Back
                        </button>
                        <button className="material-button" type="submit">
                            {goal === '' ? 'Skip' : 'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HealthGoals;
