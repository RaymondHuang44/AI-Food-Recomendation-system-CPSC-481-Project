"""main backend file for the food recommendation system"""

from functools import lru_cache
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

# Explicitly allow only your frontend origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Load the dataset
print("Loading and preprocessing data...")
data = pd.read_csv('data/recipes.csv')
data['RecipeIngredientParts'] = data['RecipeIngredientParts'].str.lower()
print("Data loaded and preprocessed!")

#cuisine subcategories
asian_subcuisines = {'asian', 'cambodian', 'cantonese', 'chinese', 'filipino',
                     'indian', 'indonesian', 'iraqi', 'japanese', 'korean',
                     'malaysian', 'mongolian', 'nepalese', 'pakistani', 'palestinian',
                     'south asian', 'southwest asian', 'szechuan',
                     'thai', 'turkish', 'vietnamese'}

african_subcuisines = {'african', 'ethiopian', 'moroccan', 'nigerian',
                       'south african', 'sudanese', 'smali'}

north_american_subcuisines = {'canadian', 'cajun', 'costal rican', 'cuban', 'gutaemalan',
                              'haitian', 'mexican', 'native american', 'puerto rican',
                              'southwestern u.s.', 'tex mex'}

central_american_subcuisines = {'brazilian', 'chilean', 'ecuadorean',
                                'peruvian', 'south america', 'venezuelan'}

european_subcuisines = {'austrian', 'belgian', 'british', 'czech', 'danish',
                        'dutch', 'european', 'french', 'georgian', 'german',
                        'greek', 'hungarian', 'icelandic', 'italian', 'norwegian',
                        'polish', 'portuguese', 'russian', 'scandinavian', 'scottish',
                        'spanish', 'swedish', 'swiss', 'welsh'}

oceanic_subcuisines = {'australian', 'new zealand', 'polynesian'}

@lru_cache(maxsize=128)
def filter_by_allergies(allergens_tuple):
    """filter out recipes that contain the allergens"""    
    allergies = list(allergens_tuple)
    if not allergies:
        return data
    allergens_pattern = '|'.join(allergies)
    return data[~data['RecipeIngredientParts'].str.contains(
                                                        allergens_pattern, case=False, na=False)]

@app.route('/api/recommend', methods=['POST'])
def recommend():
    """get the request from the frontend"""
    req = request.get_json()
    dietary = req.get('dietaryPreferences', [])
    cuisines = req.get('cuisinePreferences', [])
    ingredients = req.get('ingredientPreferences', [])
    health_goal = req.get('healthGoal', '')
    allergies = req.get('allergiesAndRestrictions', [])

    filtered = filter_by_allergies(tuple(allergies))

    # Dietary filtering
    if dietary:
        dietary_pattern = '|'.join(map(str.lower, dietary))
        filtered = filtered[filtered['Keywords'].str.contains(dietary_pattern,
                                                              case=False, na=False)]

    # Cuisine filtering
    if cuisines:
        if any(cuisine in asian_subcuisines for cuisine in cuisines):
            filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                        'asian', case=False, na=False)]

        elif any(cuisine in african_subcuisines for cuisine in cuisines):
            filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                        'african', case=False, na=False)]

        elif any(cuisine in north_american_subcuisines for cuisine in cuisines):
            filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                        'north american', case=False, na=False)]

        elif any(cuisine in central_american_subcuisines for cuisine in cuisines):
            filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                        'central american', case=False, na=False)]

        elif any(cuisine in european_subcuisines for cuisine in cuisines):
            filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                        'european', case=False, na=False)]

        elif any(cuisine in oceanic_subcuisines for cuisine in cuisines):
            filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                        'oceanic', case=False, na=False)]

        else:
            cuisine_pattern = '|'.join(map(str.lower, cuisines))
            filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                    cuisine_pattern, case=False, na=False)]

    # Ingredient preferences
    if ingredients:
        ingredients_pattern = '|'.join(map(str.lower, ingredients))
        filtered = filtered[filtered['RecipeIngredientParts'].str.contains(
                                                ingredients_pattern, case=False, na=False)]

    # Health goal filtering
    if health_goal == 'weight_loss':
        filtered = filtered[filtered['Calories'] < 500]
    elif health_goal == 'muscle_gain':
        filtered = filtered[filtered['ProteinContent'] > 20]

    # Return top 20 results
    return jsonify(filtered[['Name', 'Calories', 'RecipeCategory', 'FatContent',
                           'SaturatedFatContent', 'CarbohydrateContent', 'SugarContent', 
                           'FiberContent', 'CholesterolContent', 'SodiumContent', 
                           'ProteinContent', 'RecipeIngredientParts']
                                            ].head(20).to_dict(orient='records'))

if __name__ == '__main__':
    app.run(host='localhost', port=3001, debug=True)
