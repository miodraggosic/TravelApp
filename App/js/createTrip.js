import Trips from "./Trips.js";
import Trip from "./Trip.js";
import Api from "./env.js";

const form = document.querySelector(".addTrip");
const countries = document.getElementById("country");
const submit = document.querySelector("button");
const inputFields = document.querySelectorAll(".addTrip [id]");

console.log(countries);

const trips = new Trips(Api);

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let fieldValues = [];
  inputFields.forEach((field) => {
    trips.validField(field);
    fieldValues.push(field.value);
  });
  let arrFields = Array.from(inputFields);
  console.log(fieldValues);

  const formValid = arrFields.some((input) => input.classList.contains("red"))
    ? false
    : true;

  const newTrip = new Trip(fieldValues);
  formValid
    ? (trips.addTrip(newTrip),
      inputFields.forEach(
        (field) => ((field.value = ""), field.classList.remove("green"))
      ))
    : inputFields.forEach((field) => console.log(field.classList));
});

window.onload = function () {
  trips.getContries(countries);
};
