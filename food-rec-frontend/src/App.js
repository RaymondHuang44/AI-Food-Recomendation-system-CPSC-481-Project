import React, { useState } from 'react';
import axios from 'axios';
import DietaryPreferences from './pages/DietaryPreferences';
import CuisinePreferences from './pages/CuisinePreferences';
import IngredientPreferences from './pages/IngredientPreferences';
import HealthGoals from './pages/HealthGoals';
import AllergiesAndRestrictions from './pages/AllergiesAndRestrictions';
import ResultsPage from './pages/ResultsPage';
import UserProfile from './pages/UserProfile';
import MealPlanPage from './pages/MealPlanPage';
import './App.css'

function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const [userPreferences, setUserPreferences] = useState({});
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nutrientNeeds, setNutrientNeeds] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [mealPlan, setMealPlan] = useState(null);
    const [mealPlanError, setMealPlanError] = useState(null);

    const handleNext = (preferences) => {
        setUserPreferences(prev => ({ ...prev, ...preferences }));
        setCurrentPage(currentPage + 1);
    };

    const handleBack = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSubmit = async (preferences) => {
        const allPreferences = { ...userPreferences, ...preferences };
        setUserPreferences(allPreferences);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/recommend', allPreferences);
            setResults(response.data);
            setShowResults(true);
        } catch (error) {
            alert('Failed to get recommendations');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileNext = async (profile) => {
        setUserProfile(profile);
        const response = await axios.post('http://localhost:3001/api/nutrient-needs', profile);
        setNutrientNeeds(response.data);
        setCurrentPage(1);
    };

    const handleGetMealPlan = async (days = 1) => {
        console.log('Starting handleGetMealPlan with days:', days);
        setMealPlanError(null);
        setLoading(true);
        try {
            const requestData = {
                nutrientNeeds,
                dietaryPreferences: userPreferences.dietaryPreferences || [],
                cuisinePreferences: userPreferences.cuisinePreferences || [],
                ingredientPreferences: userPreferences.ingredientPreferences || [],
                healthGoal: userPreferences.healthGoal || '',
                allergiesAndRestrictions: userPreferences.allergiesAndRestrictions || [],
                days,
            };
            console.log('Sending request with data:', requestData);
            
            const response = await axios.post('http://localhost:3001/api/meal-plan', requestData);
            console.log('Raw response:', response);
            console.log('Response data:', response.data);
            
            // Ensure we're working with a parsed object, not a string
            const mealPlanData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
            console.log('Parsed meal plan data:', mealPlanData);
            
            setMealPlan(mealPlanData);
            console.log('State after setMealPlan:', mealPlanData);
            setCurrentPage(2);
        } catch (error) {
            console.error('Meal plan error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            if (error.response && error.response.data && error.response.data.error) {
                setMealPlanError(error.response.data.error);
            } else {
                setMealPlanError('Failed to generate meal plan. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Print handler for meal plan
    const handlePrintMealPlan = () => {
        window.print();
    };

    // Add a handler to go to meal plan from results
    const handleShowMealPlan = async (days = 1) => {
        await handleGetMealPlan(days);
        setShowResults(false);
    };

    console.log('currentPage:', currentPage);
    console.log('mealPlan:', mealPlan);
    console.log('mealPlan.days:', mealPlan?.days);

    return (
        <div>
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                    <div style={{color: "#333", marginTop: 16}}>Loading recommendations...</div>
                </div>
            )}
            {!showResults ? (
                <>
                    {currentPage === 0 && <UserProfile onNext={handleProfileNext} />}
                    {currentPage === 1 && nutrientNeeds && (
                        <div className="container">
                            <div className="header">CraveWise</div>
                            <div className="floating-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:500, textAlign: 'center' }}>
                                <h2 style={{ marginBottom: 24 }}>Your Daily Nutrient Needs</h2>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 48 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: 18, marginBottom: 4 }}>Calories</span>
                                        <span style={{ fontSize: 28, fontWeight: 'bold' }}>{nutrientNeeds.calories}</span>
                                        <span style={{ fontSize: 16, color: '#ccc' }}>kcal</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: 18, marginBottom: 4 }}>Protein</span>
                                        <span style={{ fontSize: 28, fontWeight: 'bold' }}>{nutrientNeeds.protein}</span>
                                        <span style={{ fontSize: 16, color: '#ccc' }}>g</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: 18, marginBottom: 4 }}>Fat</span>
                                        <span style={{ fontSize: 28, fontWeight: 'bold' }}>{nutrientNeeds.fat}</span>
                                        <span style={{ fontSize: 16, color: '#ccc' }}>g</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: 18, marginBottom: 4 }}>Carbs</span>
                                        <span style={{ fontSize: 28, fontWeight: 'bold' }}>{nutrientNeeds.carbs}</span>
                                        <span style={{ fontSize: 16, color: '#ccc' }}>g</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: 24, marginBottom: 24 }}>
                                    <button className="material-button" onClick={() => setCurrentPage(3)}>
                                        Continue to Preferences
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentPage === 2 && (
                        <>
                            {console.log('Rendering page 2 with mealPlan:', mealPlan)}
                            {!mealPlan && <div>No meal plan data available</div>}
                            {mealPlan && !mealPlan.days && <div>Meal plan data is missing 'days' property. Data received: {JSON.stringify(mealPlan)}</div>}
                            {mealPlan && mealPlan.days && (
                                <MealPlanPage
                                    mealPlan={mealPlan}
                                    mealPlanError={mealPlanError}
                                    onGetMealPlan={handleGetMealPlan}
                                    onPrint={handlePrintMealPlan}
                                    onBackToResults={() => setShowResults(true)}
                                />
                            )}
                        </>
                    )}
                    {currentPage === 3 && <DietaryPreferences onNext={handleNext} onBack={handleBack} />}
                    {currentPage === 4 && <CuisinePreferences onNext={handleNext} onBack={handleBack} />}
                    {currentPage === 5 && <IngredientPreferences onNext={handleNext} onBack={handleBack} />}
                    {currentPage === 6 && <HealthGoals onNext={handleNext} onBack={handleBack} />}
                    {currentPage === 7 && <AllergiesAndRestrictions onNext={handleSubmit} onBack={handleBack} />}
                </>
            ) : (
                <ResultsPage
                    filters={userPreferences}
                    results={results}
                    onGetMealPlan={handleShowMealPlan}
                />
            )}
        </div>
    );
}

export default App;

