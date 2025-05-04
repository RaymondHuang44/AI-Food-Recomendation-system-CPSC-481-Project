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
    asian_subcuisines = {'asian', 'cambodian', 'cantonese', 'chinese', 'filipino', 'indian', 'indonesian', 'iraqi', 'japanese', 'korean', 'malaysian', 'mongolian', 'nepalese', 'pakistani', 'palestinian', 'south asian', 'southwest asian', 'szechuan', 'thai', 'turkish', 'vietnamese'}
    african_subcuisines = {'african', 'ethiopian', 'moroccan', 'nigerian', 'south african', 'sudanese', 'smali'}
    north_american_subcuisines = {'canadian', 'cajun', 'costal rican', 'cuban', 'gutaemalan', 'haitian', 'mexican', 'native american', 'puerto rican', 'southwestern u.s.', 'tex mex'}
    central_american_subcuisines = {'brazilian', 'chilean', 'ecuadorean', 'peruvian', 'south america', 'venezuelan'}
    european_subcuisines = {'austrian', 'belgian', 'british', 'czech', 'danish', 'dutch', 'european', 'french', 'georgian', 'german', 'greek', 'hungarian', 'icelandic', 'italian', 'norwegian', 'polish', 'portuguese', 'russian', 'scandinavian', 'scottish', 'spanish', 'swedish', 'swiss', 'welsh'}
    oceanic_subcuisines = {'australian', 'new zealand', 'polynesian'}

    if any(cuisine in asian_subcuisines for cuisine in cuisines):
        filtered = filtered[filtered['RecipeCategory'].str.contains('asian', case=False, na=False)]
    elif any(cuisine in african_subcuisines for cuisine in cuisines):
        filtered = filtered[filtered['RecipeCategory'].str.contains('african', case=False, na=False)]
    elif any(cuisine in north_american_subcuisines for cuisine in cuisines):
        filtered = filtered[filtered['RecipeCategory'].str.contains('north american', case=False, na=False)]
    elif any(cuisine in central_american_subcuisines for cuisine in cuisines):
        filtered = filtered[filtered['RecipeCategory'].str.contains('central american', case=False, na=False)]
    elif any(cuisine in european_subcuisines for cuisine in cuisines):
        filtered = filtered[filtered['RecipeCategory'].str.contains('european', case=False, na=False)]
    elif any(cuisine in oceanic_subcuisines for cuisine in cuisines):
        filtered = filtered[filtered['RecipeCategory'].str.contains('oceanic', case=False, na=False)]
    else:
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
