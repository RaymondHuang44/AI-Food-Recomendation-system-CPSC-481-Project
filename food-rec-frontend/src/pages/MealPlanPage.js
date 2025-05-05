import React from 'react';
import RecipeCard from '../components/RecipeCard';
import '../App.css';
import './MealPlanPage.css';

const mealNames = ['Breakfast', 'Lunch', 'Dinner'];

const MealPlanDay = ({ day, dayIdx }) => {
    console.log(`Rendering MealPlanDay for Day ${dayIdx + 1}:`, day);
    return (
        <div className="mealplan-day-section">
            <div className="mealplan-day-label">
                Day {dayIdx + 1}
            </div>
            <div className="mealplan-columns">
                {mealNames.map((mealName, idx) => {
                    const meal = day[idx];
                    console.log(`Slot: ${mealName} (idx ${idx})`, meal);
                    return (
                        <div key={mealName} className="mealplan-meal-col">
                            <div className="mealplan-meal-label">
                                {mealName}
                            </div>
                            <div className="mealplan-meal-slot">
                                {meal && meal.Name ? (
                                    <>
                                        {console.log(`Rendering RecipeCard for ${mealName}:`, meal)}
                                        <RecipeCard recipe={meal} />
                                    </>
                                ) : (
                                    <>
                                        {console.log(`No meal found for ${mealName} (idx ${idx})`)}
                                        <div className="mealplan-placeholder">No meal planned</div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const MealPlanPage = ({ mealPlan, mealPlanError, onBackToResults }) => {
    console.log('MealPlanPage loaded', mealPlan);
    console.log('mealPlan:', mealPlan);
    const numDays = mealPlan && mealPlan.num_days ? mealPlan.num_days : 1;
    const days = mealPlan && mealPlan.days ? mealPlan.days : [];
    console.log('days:', days, 'numDays:', numDays);

    // Loading check
    if (!mealPlan || !mealPlan.days) {
        console.log('Meal plan not ready:', mealPlan);
        return (
            <div className="mealplan-bg">
                <div className="mealplan-floating-island">
                    <div className="mealplan-title">Meal plan</div>
                    <button
                        className="material-button mealplan-back-btn"
                        onClick={onBackToResults}
                    >
                        back
                    </button>
                    <div>Loading or no meal plan data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mealplan-bg">
            <div className="mealplan-floating-island">
                <button
                    className="material-button mealplan-back-btn"
                    onClick={onBackToResults}
                >
                    back to results
                </button>
                <div className="mealplan-title">
                    Meal plan
                </div>
                {days.map((day, idx) => (
                    <MealPlanDay key={idx} day={day} dayIdx={idx} />
                ))}
            </div>
        </div>
    );
};

export default MealPlanPage; 