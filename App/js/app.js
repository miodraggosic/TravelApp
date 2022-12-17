import Trips from "./components/Trips.js";
import Api from "./env.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const navLinks = document.querySelector(".navLinks");

const trips = new Trips(Api);

//helper func

const createElem = (el) => document.createElement(el);

//nav links

const links = [
  { name: "Home", path: "../index.html" },
  { name: "Admin", path: "../pages/admin.html" },
  { name: "Login", path: "#" },
  { name: "Logout", path: "#" },
];

function renderLinks(elem, arr) {
  for (const link of arr) {
    console.log(link);
    elem.appendChild(createLink(link));
  }
}

function createLink(obj) {
  const aTag = createElem("a");
  aTag.textContent = obj.name;
  aTag.classList.add("navLink");
  aTag.href = obj.path;
  return aTag;
}

function reverseDate(date) {
  const dateReversed = date.split("-").reverse().join("-");
  return dateReversed;
}

//all trips

function tripCard(obj) {
  const div = createElem("div");
  div.classList.add("card");

  const title = createElem("a");
  title.textContent = obj.title;
  title.href = `./pages/tripOverview.html?id=${obj.id}`;

  const imgLink = createElem("a");
  imgLink.classList.add("imgLink");
  imgLink.style.backgroundImage = `url("${obj.imageUrl}")`;
  imgLink.href = `./pages/tripOverview.html?id=${obj.id}`;

  const descriptionWrapper = createElem("div");
  const shortDescrp = createElem("p");
  shortDescrp.classList.add("shortDescrp", "active");
  shortDescrp.textContent = obj.description.substring(0, 30).concat(" ...");
  console.log(shortDescrp.textContent);
  const fullDescrp = createElem("p");
  fullDescrp.classList.add("fullDescrp");
  console.log(fullDescrp);
  fullDescrp.textContent = obj.description;

  descriptionWrapper.append(shortDescrp, fullDescrp);

  const readMore = createElem("button");
  readMore.classList.add("readMore");
  readMore.textContent = "Read more";

  const price = createElem("h3");
  price.classList.add("price");
  price.textContent = obj.price;

  const fromDate = createElem("span");
  fromDate.textContent = reverseDate(obj.fromDate);

  const toDate = createElem("span");
  toDate.textContent = reverseDate(obj.toDate);

  const country = createElem("h4");
  country.textContent = obj.country;

  div.append(
    title,
    imgLink,
    descriptionWrapper,
    readMore,
    price,
    fromDate,
    toDate,
    country
  );
  return div;
}

//single trip

function fullTripCard(trip) {
  const divCard = createElem("div");
  divCard.classList.add("fullCard");

  const imgWrapper = createElem("div");
  imgWrapper.classList.add("imgWrapper");
  console.log(imgWrapper);
  imgWrapper.style.backgroundImage = `url("${trip.imageUrl}")`;

  const textWrapper = createElem("div");
  textWrapper.classList.add("textWrapper");

  const country = createElem("h3");
  country.textContent = trip.country;

  const title = createElem("h1");
  title.textContent = trip.title;

  const fromDate = createElem("span");
  fromDate.textContent = reverseDate(trip.fromDate);

  const toDate = createElem("span");
  toDate.textContent = reverseDate(trip.toDate);

  const description = createElem("h4");
  description.textContent = trip.description;

  const price = createElem("h3");
  price.classList.add("price");
  price.textContent = trip.price;

  textWrapper.append(country, title, fromDate, toDate, description, price);

  divCard.append(imgWrapper, textWrapper);

  return divCard;
}

renderLinks(navLinks, links);

if (!id) {
  const displayTrips = document.querySelector(".displayTrips");
  const section = document.querySelector("section");
  const searchField = document.querySelector("#searchTrips");

  trips.getTrips(id, displayTrips, tripCard);

  function errorMessage(elem, msg) {
    displayTrips.style.display = "none";
    const message = document.createElement("div");
    message.classList.add("message");
    message.textContent = msg;
    elem.append(message);
  }
  function removeMessage() {
    setTimeout(() => {
      const message = document.querySelector(".message");
      message.remove();
      displayTrips.style.display = "grid";
    }, 3000);
  }

  searchField.addEventListener("focus", function (e) {
    displayTrips.classList.add("blur");
  });

  searchField.addEventListener("blur", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const tripsToRender = trips.filterTrips(searchTerm);
    displayTrips.classList.remove("blur");
    // trips.allTrips.filter(
    //   (trip) => trip.title.toLowerCase().includes(searchTerm)
    // ? trips.renderTrip(displayTrips, tripCard, trip)
    // : false;
    // );
    // search(searchTerm);
    console.log(tripsToRender);

    if (tripsToRender.length > 0) {
      displayTrips.innerHTML = "";
      tripsToRender.forEach((trip) =>
        trips.renderTrip(displayTrips, tripCard, trip)
      );
      trips.addReadMore();
    } else {
      errorMessage(
        section,
        "Desired destination is not available at the moment"
      );
      removeMessage();
    }
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
  });
} else {
  const fullTrip = document.querySelector(".fullTrip");
  trips.getTrips(id, fullTrip, fullTripCard);
}
