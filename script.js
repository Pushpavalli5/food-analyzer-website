const foodDatabase = {
    "pizza": { calories: 285, proteins: "12g", fats: "10g", carbs: "36g" },
    "burger": { calories: 295, proteins: "17g", fats: "14g", carbs: "30g" },
    "pasta": { calories: 220, proteins: "8g", fats: "6g", carbs: "40g" },
    "salad": { calories: 150, proteins: "3g", fats: "5g", carbs: "20g" }
};

function analyzeFood() {
    const foodInput = document.getElementById("foodName").value.toLowerCase();
    const resultDiv = document.getElementById("result");

    if (foodInput in foodDatabase) {
        const food = foodDatabase[foodInput];
        resultDiv.innerHTML = `
            <p><strong>Food Detected:</strong> ${foodInput.toUpperCase()}</p>
            <p><strong>Calories:</strong> ${food.calories} kcal</p>
            <p><strong>Proteins:</strong> ${food.proteins}</p>
            <p><strong>Fats:</strong> ${food.fats}</p>
            <p><strong>Carbs:</strong> ${food.carbs}</p>
        `;
    } else {
        resultDiv.innerHTML = "<p style='color:red;'>Food not found in database.</p>";
    }
}
