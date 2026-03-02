'use strict';

// Date
const year = new Date().getFullYear();
const copyright = document.getElementById("copyright");
copyright.textContent = `© ${year}, Landon Linn`;

// ---- Changing Systems ---- 
const currentSystem = document.getElementById("current-system"); // Title text
const imperial = document.getElementById("imperial"); // Radio button
const metric = document.getElementById("metric"); // Radio button

// Handle Change
function systemChange(){
    if(imperial.checked){
        currentSystem.textContent = "Imperial";
        // Add bcak in Inches
        heightInches.classList.remove("hidden");

        // Reset Placeholders
        height.setAttribute("placeholder", "feet")
        weight.setAttribute("placeholder", "pounds")
    } else{
        currentSystem.textContent = "Metric";
        // Change placeholder
        height.setAttribute("placeholder", "centimeters")
        // Hide Inches
        heightInches.classList.add("hidden");

        // Reset Placeholders
        weight.setAttribute("placeholder", "kilograms")
    }

    return currentSystem.textContent;
}
imperial.addEventListener("click", systemChange)
metric.addEventListener("click", systemChange)

// Creating Variables Using User Inputs
const age = document.getElementById("age");
const male = document.getElementById("male");
const female = document.getElementById("female");

// Getting Age
const height = document.getElementById("height");
const heightInches = document.getElementById("inches");

// Weight
const weight = document.getElementById("weight");

// Get Activity Selection
const activity = document.getElementById("activity");
const options = Array.from(activity.options);

// Getting Variables for Results
const bmrTitle = document.getElementById('bmr-title');
const mildLoss = document.getElementById('result-mild-loss');
const loss = document.getElementById('result-loss');
const extremeLoss = document.getElementById('result-extreme-loss');
const maintain = document.getElementById('result-maintain');
const mildGain = document.getElementById('result-mild-gain');
const gain = document.getElementById('result-gain');
const extremeGain = document.getElementById('result-extreme-gain');

// Calculate
const calculateButton = document.getElementById("calc");
function calculate() {
    // Don't reload page
    event.preventDefault();
    
    // Form Checking
    if(age.value === "" || height.value === "" || weight.value === ""){
        alert("Enter all values.")
        return;
    }

    let totalHeight = 0;
    let totalWeight = 0;

    // ---- Get Height & Weight ----
    if(currentSystem.textContent === "Imperial"){
        // Convert to Metric
        totalHeight = (((Number(height.value) * 12) + Number(heightInches.value))) * 2.54;
        totalWeight = Number(weight.value) / 2.2;
    } else{
        // ---- Metric Solving ----
        totalHeight = Number(height.value);
        totalWeight = Number(weight.value);
    }

    // Get Age
    let userAge = Number(age.value);
    
    // Solve BMR
    let bmr = 0;

    // Solve for Male
    if (male.checked) {
        // Formula: 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)
        bmr = 88.362 + (13.397 * totalWeight) + (4.799 * totalHeight) - (5.677 * userAge);
    }
    // Solve for Female
    else{
        // Formula: 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)
        bmr = 447.593 + (9.247 * totalWeight) + (3.098 * totalHeight) - (4.330 * userAge);
    }

    // Check the selected activity value
    const hideElement = document.getElementsByClassName("hide");
    if (activity.value === 'bmr') {
    bmrTitle.textContent = 'BMR';

    for (const element of hideElement) {
        element.classList.add("hidden");
    }

    } else {
        bmrTitle.textContent = 'Maintain Weight';

        for (const element of hideElement) {
            element.classList.remove("hidden");
        }
    }

    // Calculate calories and rates
    function calculateResult(calories, multiplier){
        return Math.floor(calories * multiplier);
    }


    function updateCalories(bmr, multiplier) {
        const calories = bmr * multiplier;

        mildLoss.textContent = calculateResult(calories, 0.8);
        loss.textContent = calculateResult(calories, 0.75);
        extremeLoss.textContent = calculateResult(calories, 0.6);
        maintain.textContent = calculateResult(calories, 1);
        mildGain.textContent = calculateResult(calories, 1.1);
        gain.textContent = calculateResult(calories, 1.2);
        extremeGain.textContent = calculateResult(calories, 1.3);
    }

    // Solve calories based on activity
    switch(activity.value){
        case 'bmr':
            maintain.textContent = Math.floor(bmr);
            break;

        case 'sedentary':
            updateCalories(bmr, 1.2);
            break;

        case 'light':
            updateCalories(bmr, 1.375);
            break;

        case 'moderate':
            updateCalories(bmr, 1.55);
            break;

        case 'very':
            updateCalories(bmr, 1.725);
            break;

        case 'extra':
            updateCalories(bmr, 1.9);
            break;
    }    

}
calculateButton.addEventListener("click",  () => {calculate(event)});



// Clear all options
const clearButton = document.getElementById("clear");
function clearAll() {
    imperial.checked = true; // reset system
    age.value = ""; // reset age
    male.checked = true; // reset radio buttons
    height.value = ""; // reset feet
    heightInches.value = ""; // reset inches
    weight.value = ""; // reset weight
    activity.value = activity.options[0].value; // reset to BMR
}
clearButton.addEventListener("click", clearAll);

// Reset Page
const resetButton = document.getElementById("reset");
function resetAll() {
    window.location.reload();
}
resetButton.addEventListener("click", resetAll);