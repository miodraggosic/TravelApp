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

  const country = createElem("h4");
  country.textContent = obj.country;

  const img = createElem("img");
  img.src = obj.imageUrl;

  const fromDate = createElem("span");
  fromDate.textContent = reverseDate(obj.fromDate); //revert m and year

  const toDate = createElem("span");
  toDate.textContent = reverseDate(obj.toDate);

  const description = createElem("h6");
  description.textContent = obj.description;

  const readMore = createElem("button");
  const price = createElem("h3");
  price.textContent = obj.price;

  div.append(
    title,
    country,
    img,
    fromDate,
    toDate,
    description,
    readMore,
    price
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
  fromDate.textContent = reverseDate(trip.fromDate); //revert m and year

  const toDate = createElem("span");
  toDate.textContent = reverseDate(trip.toDate);

  const description = createElem("h4");
  description.textContent = trip.description;

  const price = createElem("h3");
  price.textContent = trip.price;

  textWrapper.append(country, title, fromDate, toDate, description, price);

  divCard.append(imgWrapper, textWrapper);

  return divCard;
}

renderLinks(navLinks, links);

if (!id) {
  const displayTrips = document.querySelector(".displayTrips");
  console.log(displayTrips);

  trips.getTrips(id, displayTrips, tripCard);
} else {
  const fullTrip = document.querySelector(".fullTrip");
  trips.getTrips(id, fullTrip, fullTripCard);
}
