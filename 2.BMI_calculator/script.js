// function calculatebmi() {
//     let height = document.getElementById('height');
//     height=height.value;
//     console.log(height)
//     let weight = document.getElementById('weight');
//     weight=weight.value;
//     console.log(weight);
//     const bmi=weight/(height*height);
//     const result = document.getElementById('result')
//     result.style.display="";
//     result.innerHTML="BMI : " + bmi;
// }
const form = document.querySelector('form')

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const height = (document.querySelector('#height').value)
    const weight = (document.querySelector('#weight').value)
    const results = document.querySelector('#results')
    // const next = document.querySelector('#next')
    const bmi = (weight / ((height * height) / 10000)).toFixed(2)
    if (bmi < 18.6) {
        var guide = "Under weight";
    } else if (bmi >= 18.6 && bmi <= 24.9) {
        var guide = "Normal range";
    } else {
        var guide = "Overweight";
    }
    // for (var i = 0; i <= 5; i++){
        
    results.innerHTML = `<h2>BMI : ${bmi}</h2><h3>Summary : ${guide}</h3>`

    // }
})
