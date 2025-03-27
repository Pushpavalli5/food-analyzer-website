// Main Food Analyzer Application
class FoodAnalyzer {
    constructor() {
        this.mlModel = new FoodRecognitionModel();
        this.initializeUI();
    }

    // Initialize application
    async init() {
        try {
            // Load machine learning model
            const modelLoaded = await this.mlModel.load();
            
            if (!modelLoaded) {
                this.showError('Failed to load machine learning model');
                return;
            }

            // Enable image upload
            document.getElementById('image-upload').disabled = false;
        } catch (error) {
            this.showError('Initialization failed: ' + error.message);
        }
    }

    // Set up UI event listeners
    initializeUI() {
        const uploadInput = document.getElementById('image-upload');
        uploadInput.addEventListener('change', this.handleImageUpload.bind(this));
    }

    // Handle image upload process
    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Reset previous results
        this.clearResults();

        try {
            // Create and display uploaded image
            const img = await this.createImageElement(file);
            
            // Classify image
            const predictions = await this.mlModel.classify(img);
            
            // Get top prediction
            const topPrediction = predictions[0];
            
            // Fetch nutrition info
            const nutrition = await NutritionAPI.getNutrition(topPrediction.className);
            
            // Display results
            this.displayResults(topPrediction, nutrition);
        } catch (error) {
            this.showError('Analysis failed: ' + error.message);
        }
    }

    // Create image element from file
    createImageElement(file) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.id = 'uploaded-image';
            
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
                document.getElementById('image-container').appendChild(img);
                
                img.onload = () => resolve(img);
                img.onerror = reject;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Display analysis results
    displayResults(prediction, nutrition) {
        const resultContainer = document.getElementById('nutrition-result');
        
        if (!nutrition) {
            resultContainer.innerHTML = `
                <h2>Food Detected: ${prediction.className}</h2>
                <p>Detailed nutrition information not available.</p>
            `;
            return;
        }

        resultContainer.innerHTML = `
            <h2>Detected Food: ${nutrition.name}</h2>
            <p>Confidence: ${(prediction.probability * 100).toFixed(2)}%</p>
            
            <h3>Nutritional Information</h3>
            <div>
                <p><strong>Calories:</strong> ${nutrition.calories} kcal</p>
                
                <h4>Macronutrients</h4>
                <p>Protein: ${nutrition.protein}g</p>
                <p>Carbohydrates: ${nutrition.carbs}g</p>
                <p>Fat: ${nutrition.fat}g</p>
                
                <h4>Key Nutrients</h4>
                <p>${nutrition.nutrients.join(', ')}</p>
                
                <h4>Description</h4>
                <p>${nutrition.description}</p>
            </div>
        `;
    }

    // Clear previous results
    clearResults() {
        document.getElementById('image-container').innerHTML = '';
        document.getElementById('nutrition-result').innerHTML = '';
    }

    // Display error messages
    showError(message) {
        const resultContainer = document.getElementById('nutrition-result');
        resultContainer.innerHTML = `
            <div style="color: red; text-align: center;">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize the application when page loads
document.addEventListener('DOMContentLoaded', () => {
    const foodAnalyzer = new FoodAnalyzer();
    foodAnalyzer.init();
});
