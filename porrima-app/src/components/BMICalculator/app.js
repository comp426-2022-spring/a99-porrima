const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
const port =3000;

app.listen(port,() => {
console.log('server running at port 3000');

})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

app.post("/", function (req, res) {
    height = parseFloat(req.body.Height);
    weight = parseFloat(req.body.Weight);
    bmi = (weight / (height * height))*703;
	if (bmi < 18.5) {
        res.send(" your BMI is around: " + bmi +
                 "<centre><h1>You are Underweight!");
    } else if (18.5 <= bmi && bmi < 24.9) {
        res.send(" your BMI is around: " + bmi +
                 "<centre><h1>You are Normalweight!");
    } else if (25 <= bmi && bmi < 30) {
        res.send(" your BMI is around: " + bmi +
                 "<centre><h1>You are Overweight!");
    } else {
        res.send(" your BMI is around: " + bmi +
                 "<centre><h1>You are Obese!");
    }});
