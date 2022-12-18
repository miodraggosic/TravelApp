import Api from "./env.js";
import NavLinks from "./components/NavLinks.js";
import Trips from "./components/Trips.js";
import Trip from "./components/Trip.js";

const displayLinks = document.querySelector(".navLinks");
const form = document.querySelector(".addTrip");
const countries = document.getElementById("country");
const submit = document.querySelector("button");
const inputFields = document.querySelectorAll(".addTrip [id]");
const msgPlaceholder = document.querySelectorAll(".addTrip [placeholder]");

const navLinks = new NavLinks();
navLinks.renderLinks(displayLinks);

submitActive(false);

const trips = new Trips(Api);

msgPlaceholder.forEach((field) =>
  field.addEventListener("focus", (e) => trips.regexMessage(e.target))
);

inputFields.forEach((field) =>
  field.addEventListener("input", (e) => {
    trips.validField(e.target);
  })
);

form.addEventListener("input", (e) => {
  e.preventDefault();
  let arrFields = Array.from(inputFields);
  const isFormValid = formValid(arrFields);

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

window.onload = function () {
  trips.getContries(countries);
};
