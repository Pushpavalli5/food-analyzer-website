// Nutrition API Module
class NutritionAPI {
    // Simulated nutrition database
    static nutritionDatabase = {
        'pizza': {
            name: 'Pizza',
            calories: 285,
            protein: 12.2,
            carbs: 35.6,
            fat: 10.4,
            nutrients: ['Calcium', 'Iron', 'Vitamin B'],
            description: 'A popular Italian dish with various toppings on a bread base.'
        },
        'salad': {
            name: 'Green Salad',
            calories: 100,
            protein: 5,
            carbs: 15,
            fat: 3,
            nutrients: ['Vitamin A', 'Vitamin C', 'Folate'],
            description: 'A healthy mix of fresh green vegetables.'
        },
        'burger': {
            name: 'Hamburger',
            calories: 250,
            protein: 17,
            carbs: 30,
            fat: 10,
            nutrients: ['Protein', 'Iron', 'Vitamin B12'],
            description: 'A classic sandwich consisting of a meat patty in a bun.'
        },
        'chicken': {
            name: 'Grilled Chicken',
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 3.6,
            nutrients: ['Vitamin B6', 'Selenium', 'Phosphorus'],
            description: 'Lean protein source, low in calories and high in nutrients.'
        }
    };

    // Fetch nutrition information for a given food
    static async getNutrition(foodName) {
        // Normalize food name and find best match
        const normalizedName = foodName.toLowerCase();
        
        // Find exact or partial match
        const matchedFood = Object.entries(this.nutritionDatabase).find(([key, value]) => 
            normalizedName.includes(key)
        );

        return matchedFood ? matchedFood[1] : null;
    }

    // Optional: Extend with external API call if needed
    static async fetchNutritionFromAPI(foodName) {
        try {
            // Placeholder for external API call
            // Replace with actual nutrition API endpoint
            const response = await axios.get(`https://nutrition-api.example.com/food/${foodName}`);
            return response.data;
        } catch (error) {
            console.error('Nutrition API error:', error);
            return null;
        }
    }
}
