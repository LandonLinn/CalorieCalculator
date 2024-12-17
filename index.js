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

// Create an Array from the Activity dropdown
const options = Array.from(activity.options);

function calculate() {

    // Variables
    const totalHeightInches = ((heightFeet.value * 12) + heightInches.value);
    let bmr;
    let calories;

    // Solve BMR
    if (male.checked) {
        // Metric to Imperial
        bmr = ((10 * (weight.value * 0.453592)) + (6.25 * (totalHeightInches * 2.54)) - (5 * age.value) + 5);
    }
    else{
        // Metric to Imperial
        bmr = ((10 * (weight.value * 0.453592)) + (6.25 * (totalHeightInches * 2.54)) - (5 * age.value) + 161);
    }

    // Solve calories based on activity
    switch(activity.value){
        case 'bmr':
            calories = bmr;
            break;
        case 'sedentary':
            calories = bmr * 1.2;
            break;
        case 'light':
            calories = bmr * 1.375;
            break;
        case 'moderate':
            calories = bmr * 1.55;
            break;
        case 'very':
            calories = bmr * 1.725;
            break;
        case 'extra':
            calories = bmr * 1.9;
            break;
    }

    alert(Math.floor(calories));
    clearAll();
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





