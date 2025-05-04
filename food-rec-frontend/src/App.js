import React, { useState } from 'react';
import axios from 'axios';
import DietaryPreferences from './pages/DietaryPreferences';
import CuisinePreferences from './pages/CuisinePreferences';
import IngredientPreferences from './pages/IngredientPreferences';
import HealthGoals from './pages/HealthGoals';
import AllergiesAndRestrictions from './pages/AllergiesAndRestrictions';
import ResultsPage from './pages/ResultsPage';
import './App.css'

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [userPreferences, setUserPreferences] = useState({});
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleNext = (preferences) => {
        setUserPreferences(prev => ({ ...prev, ...preferences }));
        setCurrentPage(currentPage + 1);
    };

    const handleSubmit = async (preferences) => {
        const allPreferences = { ...userPreferences, ...preferences };
        setUserPreferences(allPreferences);

        try {
            const response = await axios.post('http://localhost:5000/api/recommend', allPreferences);
            setResults(response.data);
            setShowResults(true);
        } catch (error) {
            alert('Failed to get recommendations');
        }
    };

    return (
        <div>
            {!showResults ? (
                <>
                    {currentPage === 1 && <DietaryPreferences onNext={handleNext} />}
                    {currentPage === 2 && <CuisinePreferences onNext={handleNext} />}
                    {currentPage === 3 && <IngredientPreferences onNext={handleNext} />}
                    {currentPage === 4 && <HealthGoals onNext={handleNext} />}
                    {currentPage === 5 && <AllergiesAndRestrictions onNext={handleSubmit} />}
                </>
            ) : (
                <ResultsPage filters={userPreferences} results={results} />
            )}
        </div>
    );
}

export default App;

