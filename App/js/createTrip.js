import Trips from "./components/Trips.js";
import Trip from "./components/Trip.js";
import Api from "./env.js";

const form = document.querySelector(".addTrip");
const countries = document.getElementById("country");
const submit = document.querySelector("button");
const inputFields = document.querySelectorAll(".addTrip [id]");

submitActive(false);

console.log(countries);

const trips = new Trips(Api);

inputFields.forEach((field) =>
  field.addEventListener("input", (e) => {
    trips.validField(e.target);
  })
);

form.addEventListener("input", (e) => {
  e.preventDefault();
  let arrFields = Array.from(inputFields);
  const isFormValid = formValid(arrFields);
  console.log(isFormValid);

  isFormValid ? submitActive(true) : submitActive(false);
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let fieldValues = [];
  inputFields.forEach((field) => {
    fieldValues.push(field.value);
    field.value = "";
    field.classList.remove("green");
  });

  const newTrip = new Trip(fieldValues);
  trips.addTrip(newTrip);
  submitActive(false);

  console.log("trip added");
});

function formValid(arr) {
  let res = arr.every((input) => input.classList.contains("green"))
    ? true
    : false;
  return res;
}

function submitActive(value) {
  !value ? (submit.disabled = true) : (submit.disabled = false);
}

// submit.addEventListener("click", (e) => {
//   e.preventDefault();
//   let fieldValues = [];
//   inputFields.forEach((field) => {
//     trips.validField(field);
//     fieldValues.push(field.value);
//   });
//   let arrFields = Array.from(inputFields);
//   console.log(fieldValues);

//   const formValid = arrFields.some((input) => input.classList.contains("red"))
//     ? false
//     : true;

//   const newTrip = new Trip(fieldValues);
//   formValid
//     ? (trips.addTrip(newTrip),
//       inputFields.forEach(
//         (field) => ((field.value = ""), field.classList.remove("green"))
//       ))
//     : inputFields.forEach((field) => console.log(field.classList));
// });

window.onload = function () {
  trips.getContries(countries);
};
