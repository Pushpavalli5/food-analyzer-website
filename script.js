async function analyzeFood() {
    const fileInput = document.getElementById("foodImageInput");
    const resultDiv = document.getElementById("result");

    if (fileInput.files.length === 0) {
        resultDiv.innerHTML = "<p style='color:red;'>Please upload an image first.</p>";
        return;
    }

    // Load the MobileNet model (can be replaced with a Food-101 trained model)
    const model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/mobilenet_v2/classification/1/default/1/model.json');
    
    // Convert uploaded image to tensor
    const img = document.createElement("img");
    img.src = URL.createObjectURL(fileInput.files[0]);
    img.onload = async () => {
        let tensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([224, 224])
            .toFloat()
            .expandDims();
        
        // Predict the food item
        let predictions = await model.predict(tensor).data();
        
        // Simulated output (replace with actual model prediction)
        let detectedFood = "Pasta";  // Replace with predictions[0] mapping

        // Fetch nutrition data
        let nutritionData = {
            "Pizza": { calories: 285, protein: "12g", fat: "10g", carbs: "36g" },
            "Pasta": { calories: 220, protein: "8g", fat: "6g", carbs: "40g" }
        };

        let foodInfo = nutritionData[detectedFood] || { calories: "N/A", protein: "N/A", fat: "N/A", carbs: "N/A" };

        resultDiv.innerHTML = `
            <p><strong>Food Detected:</strong> ${detectedFood} 🍝</p>
            <p><strong>Calories:</strong> ${foodInfo.calories} kcal</p>
            <p><strong>Proteins:</strong> ${foodInfo.protein}</p>
            <p><strong>Fats:</strong> ${foodInfo.fat}</p>
            <p><strong>Carbs:</strong> ${foodInfo.carbs}</p>
        `;
    };
}
