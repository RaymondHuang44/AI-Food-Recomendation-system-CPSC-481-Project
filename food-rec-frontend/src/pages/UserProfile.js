import React, { useState } from 'react';

const UserProfile = ({ onNext }) => {
  const [profile, setProfile] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activity: '1.2', // default sedentary
    goal: 'maintain'
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(profile);
  };

  return (
    <div className="container">
      <div className="header">
        CraveWise
      </div>
      <div className="floating-box">
        <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
          <h2>Your Profile</h2>
          <div>
            <label>
              Age: <input type="number" name="age" value={profile.age} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Gender:
              <select name="gender" value={profile.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Weight (kg): <input type="number" name="weight" value={profile.weight} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Height (cm): <input type="number" name="height" value={profile.height} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Activity Level:
              <select name="activity" value={profile.activity} onChange={handleChange}>
                <option value="1.2">Sedentary</option>
                <option value="1.375">Lightly active</option>
                <option value="1.55">Moderately active</option>
                <option value="1.725">Very active</option>
                <option value="1.9">Extra active</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Goal:
              <select name="goal" value={profile.goal} onChange={handleChange}>
                <option value="maintain">Maintain weight</option>
                <option value="weight_loss">Weight loss</option>
                <option value="muscle_gain">Muscle gain</option>
              </select>
            </label>
          </div>
          <div style={{ marginTop: 20 }}>
            <button className="material-button" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
