import NavLinks from "./components/NavLinks.js";
import * as helper from "./helperFunc.js";
import Trips from "./components/Trips.js";
import Api from "./env.js";

const displayLinks = document.querySelector(".navLinks");
const displayTableTrips = document.querySelector(".tableTrips");
const createTripBtn = document.getElementById("createTrip");

const navLinks = new NavLinks();
navLinks.renderLinks(displayLinks);

const trips = new Trips(Api);
trips.getTrips(null, displayTableTrips, helper.tableTrips);

createTripBtn.addEventListener("click", () => {
  window.location.href = "./createTrip.html";
});
