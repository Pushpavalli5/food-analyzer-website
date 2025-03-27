function analyzeFood() {
    const fileInput = document.getElementById("foodImageInput");
    const resultDiv = document.getElementById("result");

    if (fileInput.files.length === 0) {
        resultDiv.innerHTML = "<p style='color:red;'>Please upload an image first.</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Analyzing food image...</p>";

    setTimeout(() => {
        resultDiv.innerHTML = `
            <p><strong>Food Detected:</strong> Pizza 🍕</p>
            <p><strong>Calories:</strong> 285 kcal</p>
            <p><strong>Proteins:</strong> 12g</p>
            <p><strong>Fats:</strong> 10g</p>
            <p><strong>Carbs:</strong> 36g</p>
        `;
    }, 2000);
}
