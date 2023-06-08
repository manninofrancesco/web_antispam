const input = document.querySelector("input");

// Store the resulting model in the global scope of our app.
var model = undefined;

// The minimum prediction confidence.
const threshold = 0.9;
const resultTextarea = document.querySelector("#result");

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
toxicity.load(threshold).then(function (loadedModel) {
    model = loadedModel;
    // Show demo section now model is ready to use.
    console.log("Model loaded.")
    input.removeAttribute("disabled");
    input.addEventListener("change", (event) => checkStringToxicity(event));
});




function checkStringToxicity(event) {
    resultTextarea.innerHTML = "";
    let text = [event.target.value];

    model.classify(text).then(predictions => {
        let correctPrediction = predictions.filter(
            p => p.results[0].match == true)[0];
        resultTextarea.innerHTML = "Classified as: " + correctPrediction.label;
    });
}