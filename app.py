# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)

# Explicitly allow only your frontend origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Load the dataset
data = pd.read_csv('data/recipes.csv')

@app.route('/api/recommend', methods=['POST'])
def recommend():
    req = request.get_json()
    # Extract preferences
    dietary = req.get('dietaryPreferences', [])
    cuisines = req.get('cuisinePreferences', [])
    ingredients = req.get('ingredientPreferences', [])
    health_goal = req.get('healthGoal', '')
    allergies = req.get('allergiesAndRestrictions', [])

    filtered = data.copy()

    # Dietary filtering (example: vegetarian, vegan, pescatarian)
    if dietary:
        for pref in dietary:
            filtered = filtered[filtered['Keywords'].str.contains(pref, case=False, na=False)]

    # Cuisine filtering
    if cuisines:
        for cuisine in cuisines:
            filtered = filtered[filtered['RecipeCategory'].str.contains(cuisine, case=False, na=False)]

    # Ingredient preferences
    if ingredients:
        for ing in ingredients:
            filtered = filtered[filtered['RecipeIngredientParts'].str.contains(ing, case=False, na=False)]

    # Allergies/restrictions
    if allergies:
        for allergy in allergies:
            allergy_lower = allergy.lower()
            filtered = filtered[~filtered['RecipeIngredientParts'].str.contains(allergy_lower, case=False, na=False)]

    # Health goal
    if health_goal == 'weight_loss':
        filtered = filtered[filtered['Calories'] < 500]
    elif health_goal == 'muscle_gain':
        filtered = filtered[filtered['ProteinContent'] > 20]

    # Return top 20 results
    return jsonify(filtered[['Name', 'Calories', 'ProteinContent']].head(20).to_dict(orient='records'))

if __name__ == '__main__':
    app.run(host='localhost', port=3001, debug=True)
