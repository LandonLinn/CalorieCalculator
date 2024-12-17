'use strict';

// Creating Variables Using User Inputs
const age = document.getElementById("age");
const male = document.getElementById("male");
const female = document.getElementById("female");
const heightFeet = document.getElementById("feet");
const heightInches = document.getElementById("inches");
const weight = document.getElementById("weight");
const activity = document.getElementById("activity")
const calculateButton = document.getElementById("calc");
const clearButton = document.getElementById("clear");

// Getting Variables for Results
const mildLoss = document.getElementById('result-mild-loss');
const loss = document.getElementById('result-loss');
const extremeLoss = document.getElementById('result-extreme-loss');
const maintain = document.getElementById('result-maintain');
const mildGain = document.getElementById('result-mild-gain');
const gain = document.getElementById('result-gain');
const extremeGain = document.getElementById('result-extreme-gain');
const bmrTitle = document.getElementById('bmr-title');

// Create an Array from the Activity dropdown
const options = Array.from(activity.options);

function calculate() {

    // Variables
    const totalHeightInches = ((Number(heightFeet.value) * 12) + Number(heightInches.value));
    let bmr;

    // Solve BMR
    if (male.checked) {
        // Metric to Imperial
        bmr = ((10 * (Number(weight.value) * 0.453592)) + (6.25 * (Number(totalHeightInches) * 2.54)) - (5 * Number(age.value)) + 5);
    }
    else{
        // Metric to Imperial
        bmr = ((10 * (Number(weight.value) * 0.453592)) + (6.25 * (Number(totalHeightInches) * 2.54)) - (5 * Number(age.value)) + 161);
    }

    // Calculate calories and rates
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

    // Control Title
    const lossGainContainer = document.getElementById('loss-gain-container');
    const bmrTitle = document.getElementById('bmr-title');

    // Check the selected activity value
    if (activity.value === 'bmr') {
        bmrTitle.textContent = 'BMR';
        lossGainContainer.classList.add('hidden');
    } else {
        bmrTitle.textContent = 'Maintain Weight';
        lossGainContainer.classList.remove('hidden');
    }


    // Solve calories based on activity
    switch(activity.value){
        case 'bmr':
            maintain.textContent = Math.round(bmr);
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

// Calculate final result and return it rounded
function calculateResult(cals, perc) {
    return Math.round(cals * perc);
}

// Clear all options
function clearAll() {
    age.value = ""; // reset age
    male.checked = true; // reset radio buttons
    heightFeet.value = ""; // reset feet
    heightInches.value = ""; // reset inches
    weight.value = ""; // reset weight
    activity.value = activity.options[0].value;
}

calculateButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearAll);