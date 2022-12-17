import Api from "./env.js";
import * as helper from "./helperFunc.js";
import Trips from "./components/Trips.js";
import NavLinks from "./components/NavLinks.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const displayLinks = document.querySelector(".navLinks");

const trips = new Trips(Api);

const navLinks = new NavLinks();
navLinks.renderLinks(displayLinks);

if (!id) {
  const displayTrips = document.querySelector(".displayTrips");
  const section = document.querySelector("section");
  const searchField = document.querySelector("#searchTrips");

  trips.getTrips(id, displayTrips, helper.tripCard);

  searchField.addEventListener("focus", function (e) {
    displayTrips.classList.add("blur");
  });

  searchField.addEventListener("blur", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const tripsToRender = trips.filterTrips(searchTerm);
    displayTrips.classList.remove("blur");

    if (tripsToRender.length > 0) {
      displayTrips.innerHTML = "";
      tripsToRender.forEach((trip) =>
        trips.renderTrip(displayTrips, helper.tripCard, trip)
      );
      trips.addReadMore();
    } else {
      displayTrips.classList.toggle("displayNone");
      helper.errorMessage(
        section,
        "Desired destination is not available at the moment"
      );
      helper.removeMessage(displayTrips);
    }
  });
} else {
  const fullTrip = document.querySelector(".fullTrip");
  trips.getTrips(id, fullTrip, helper.fullTripCard);
}

// function errorMessage(elem, msg) {
//   displayTrips.style.display = "none";
//   const message = document.createElement("div");
//   message.classList.add("message");
//   message.textContent = msg;
//   elem.append(message);
// }
// function removeMessage() {
//   setTimeout(() => {
//     const message = document.querySelector(".message");
//     message.remove();
//     displayTrips.style.display = "grid";
//   }, 3000);
// }

// if (searchTerm !== "" && searchTerm !== null) {
//   displayTrips.classList.remove("blur");
//   displayTrips.innerHTML = "";
//   trips.allTrips.filter((trip) => {
//     trip.title.toLowerCase().includes(searchTerm)
//       ? trips.renderTrip(displayTrips, tripCard, trip)
//       : false;
//   });

//   trips.addReadMore();
// }
