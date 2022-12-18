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
  const arrowBtn = document.querySelector(".arrow");

  trips.getTrips(id, displayTrips, helper.tripCard);

  arrowBtn.addEventListener("click", () => helper.scrollIntoView(searchField));

  searchField.addEventListener("focus", function (e) {
    displayTrips.classList.add("blur");
    e.target.attributes.placeholder.value = "Click outside the box to search";
  });

  searchField.addEventListener("blur", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (searchTerm !== "") {
      const tripsToRender = trips.filterTrips(searchTerm);
      displayTrips.classList.remove("blur");

      if (tripsToRender.length > 0) {
        displayTrips.innerHTML = "";
        tripsToRender.forEach((trip) =>
          trips.renderTrip(displayTrips, helper.tripCard, trip)
        );
        trips.addReadMore();
      } else {
        helper.errorMessage(
          section,
          displayTrips,
          "Desired destination is not available at the moment"
        );
        helper.removeMessage(displayTrips);
      }
    } else {
      displayTrips.classList.remove("blur");
      e.target.attributes.placeholder.value = "Search the destionation";
    }
  });
} else {
  const fullTrip = document.querySelector(".fullTrip");
  trips.getTrips(id, fullTrip, helper.fullTripCard);
}
