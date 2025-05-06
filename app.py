"""main backend file for the food recommendation system"""

from functools import lru_cache
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Explicitly allow only your frontend origin with proper CORS settings
CORS(app, resources={
    r"/api/*": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

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

#food types
fish_types = {'Bass', 'Catfish', 'Fish Salmon', 'Fish Tuna', 'Halibut',
              'Mahi Mahi', 'Perch', 'Tilapia', 'Trout', 'Whitefish'}

poultry_types = {'Chicken', 'Chicken Breast', 'Chicken Crock Pot', 'Chicken Livers',
                 'Chicken Thigh & Leg', 'Duck', 'Duck Breasts', 'Goose', 'Pheasant',
                 'Quail', 'Turkey Breasts', 'Whole Chicken', 'Whole Duck', 'Whole Turkey'}

meat_types = {'Beef Liver', 'Beef Organ Meats', 'Deer', 'Elk', 'Ham',
              'Lamb/Sheep','Meat', 'Meatballs', 'Meatloaf', 'Moose',
              'Roast Beef', 'Roast Beef Crock Pot', 'Steak', 'Veal'}

wild_game_types = {'elk', 'deer', 'moose', 'wild game'}

shellfish_types = {'crab', 'crawfish', 'lobster', 'oyster', 'mussel'}

print("Creating recipe feature vectors...")
# Fill NaN values with empty strings
data['RecipeIngredientParts'] = data['RecipeIngredientParts'].fillna('')
data['RecipeCategory'] = data['RecipeCategory'].fillna('')
data['Keywords'] = data['Keywords'].fillna('')

# Combine relevant features for content-based filtering
print("Combining features...")
data['combined_features'] = data['RecipeIngredientParts'] + ' ' + data['RecipeCategory'] + ' ' + data['Keywords']

# Create TF-IDF vectors with limited features
print("Creating TF-IDF vectors...")
tfidf = TfidfVectorizer(
    stop_words='english',
    max_features=1000,  # Limit the number of features
    min_df=2,  # Ignore terms that appear in only 1 document
    max_df=0.95  # Ignore terms that appear in more than 95% of documents
)
tfidf_matrix = tfidf.fit_transform(data['combined_features'])
print("Feature vectors created successfully!")

def get_recommendations(preferences, n_recommendations=20):
    """Get recipe recommendations based on user preferences"""
    # Create a query string from preferences
    query = ' '.join([
        ' '.join(preferences.get('dietaryPreferences', [])),
        ' '.join(preferences.get('cuisinePreferences', [])),
        ' '.join(preferences.get('ingredientPreferences', [])),
        preferences.get('healthGoal', '')
    ])

    # Transform query to TF-IDF
    query_vector = tfidf.transform([query])

    # Calculate similarity with all recipes
    similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()

    # Get indices of top N similar recipes
    top_indices = similarities.argsort()[-n_recommendations:][::-1]

    # Return recommended recipes
    return data.iloc[top_indices]

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

    # Get recommendations using content-based filtering
    recommendations = get_recommendations(req)

    # Apply additional filters
    filtered = recommendations.copy()

    # Dietary filtering
    if req.get('dietaryPreferences'):
        dietary_pattern = '|'.join(map(str.lower, req['dietaryPreferences']))
        filtered = filtered[filtered['Keywords'].str.contains(
                                                dietary_pattern, case=False, na=False)]

    # Cuisine filtering
    if req.get('cuisinePreferences'):
        cuisine_pattern = '|'.join(map(str.lower, req['cuisinePreferences']))
        filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                cuisine_pattern, case=False, na=False)]

    # Ingredient preferences
    if req.get('ingredientPreferences'):
        ingredients_pattern = '|'.join(map(str.lower, req['ingredientPreferences']))
        filtered = filtered[filtered['RecipeIngredientParts'].str.contains(
                                                ingredients_pattern, case=False, na=False)]

    # Health goal filtering - adjusted for more reasonable calorie ranges
    if req.get('healthGoal') == 'weight_loss':
        # For weight loss, show meals between 300-700 calories
        filtered = filtered[(filtered['Calories'] >= 300) & (filtered['Calories'] <= 700)]
    elif req.get('healthGoal') == 'muscle_gain':
        filtered = filtered[filtered['ProteinContent'] > 15]  # Slightly reduced protein requirement

    # If we have too few results, get more recommendations
    if len(filtered) < 10:
        more_recommendations = get_recommendations(req, n_recommendations=50)
        filtered = pd.concat(
                        [filtered, more_recommendations]).drop_duplicates()

    # Return top results
    return jsonify(filtered[['Name', 'Calories', 'RecipeCategory', 'FatContent',
                           'SaturatedFatContent', 'CarbohydrateContent', 'SugarContent', 
                           'FiberContent', 'CholesterolContent', 'SodiumContent', 
                           'ProteinContent', 'RecipeIngredientParts']
                                            ].head(38).to_dict(orient='records'))

@app.route('/api/nutrient-needs', methods=['POST'])
def nutrient_needs():
    """get the request from the frontend for nutrient needs"""
    data_in = request.get_json()
    weight = float(data_in['weight'])
    height = float(data_in['height'])
    age = int(data_in['age'])
    gender = data_in['gender']
    activity = float(data_in['activity'])
    goal = data_in['goal']

    # Mifflin-St Jeor Equation
    if gender == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    tdee = bmr * activity

    # Adjust calories for goal
    if goal == 'weight_loss':
        calories = tdee - 500
    elif goal == 'muscle_gain':
        calories = tdee + 300
    else:
        calories = tdee

    # Macro splits (example: 30% protein, 30% fat, 40% carbs)
    protein = (0.3 * calories) / 4
    fat = (0.3 * calories) / 9
    carbs = (0.4 * calories) / 4

    return jsonify({
        'calories': round(calories),
        'protein': round(protein),
        'fat': round(fat),
        'carbs': round(carbs)
    })

def get_meal_plan(user_needs, recipes_df, num_meals=3):
    """get the meal plan for the user"""
    best_plan = None
    best_score = float('inf')
    if len(recipes_df) == 0:
        return None
    for _ in range(1000):  # Try 1000 random combinations
        sample = recipes_df.sample(num_meals, replace=True)  # Allow repeats
        total_cals = sample['Calories'].sum()
        total_protein = sample['ProteinContent'].sum()
        total_fat = sample['FatContent'].sum()
        total_carbs = sample['CarbohydrateContent'].sum()
        # Score: sum of squared differences from needs
        score = (
            (total_cals - user_needs['calories']) ** 2 +
            (total_protein - user_needs['protein']) ** 2 +
            (total_fat - user_needs['fat']) ** 2 +
            (total_carbs - user_needs['carbs']) ** 2
        )
        if score < best_score:
            best_score = score
            best_plan = sample
    return best_plan

@app.route('/api/meal-plan', methods=['POST'])
def meal_plan():
    """get the request from the frontend for meal plan"""
    req = request.get_json()
    user_needs = req['nutrientNeeds']
    dietary = req.get('dietaryPreferences', [])
    cuisines = req.get('cuisinePreferences', [])
    ingredients = req.get('ingredientPreferences', [])
    health_goal = req.get('healthGoal', '')
    allergies = req.get('allergiesAndRestrictions', [])
    days = int(req.get('days', 1))  # Default to 1 day if not provided

    filtered = data.copy()

    # Dietary filtering
    if dietary:
        for pref in dietary:
            filtered = filtered[filtered['Keywords'].str.contains(pref, case=False, na=False)]

    # Cuisine filtering
    if cuisines:
        cuisine_pattern = '|'.join(map(str.lower, cuisines))
        filtered = filtered[filtered['RecipeCategory'].str.contains(
                                                    cuisine_pattern, case=False, na=False)]

    # Ingredient preferences
    if ingredients:
        for ing in ingredients:
            filtered = filtered[filtered['RecipeIngredientParts'].str.contains(
                                                            ing, case=False, na=False)]

    # Allergies/restrictions
    if allergies:
        for allergy in allergies:
            allergy_lower = allergy.lower()
            filtered = filtered[~filtered['RecipeIngredientParts'].str.contains(
                                                            allergy_lower, case=False, na=False)]

    # Health goal
    if health_goal == 'weight_loss':
        filtered = filtered[filtered['Calories'] < 500]
    elif health_goal == 'muscle_gain':
        filtered = filtered[filtered['ProteinContent'] > 20]

    if len(filtered) == 0:
        return jsonify({'error': 'No recipes available for your selected preferences. Please adjust your filters.'}), 400

    # Generate meal plan for each day
    all_days = []
    all_totals = []
    for day in range(days):
        plan = get_meal_plan(user_needs, filtered, num_meals=3)
        if plan is None:
            return jsonify({'error': 'No recipes available for your selected preferences. Please adjust your filters.'}), 400

        # Replace NaN values with None before converting to dict
        plan = plan.replace({np.nan: None})

        # Convert the plan to a list of recipes and ensure it's exactly 3 meals
        meals = plan.to_dict(orient='records')
        while len(meals) < 3:  # Pad with None if we have fewer than 3 meals
            meals.append(None)
        meals = meals[:3]  # Ensure we only have 3 meals

        totals = {
            'calories': float(plan['Calories'].sum()),
            'protein': float(plan['ProteinContent'].sum()),
            'fat': float(plan['FatContent'].sum()),
            'carbs': float(plan['CarbohydrateContent'].sum())
        }

        all_days.append(meals)
        all_totals.append(totals)

    # For single day, wrap the meals array in another array to maintain consistent structure
    response_data = {
        'days': [all_days[0]] if days == 1 else all_days,  # Always return array of arrays
        'totals': all_totals,
        'needs': user_needs,
        'num_days': days
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='localhost', port=3001, debug=True)
