import Trips from "./Trips.js";
import Api from "./env.js";

const navLinks = document.querySelector(".navLinks");
const displayTrips = document.querySelector(".displayTrips");
console.log(displayTrips);

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

const trips = new Trips(Api);

//helper func
const createElem = (el) => document.createElement(el);

function createLink(obj) {
  const aTag = createElem("a");
  aTag.textContent = obj.name;
  aTag.classList.add("navLink");
  aTag.href = obj.path;
  return aTag;
}

function tripCard(obj) {
  const div = createElem("div");
  div.classList.add("card");

  const title = createElem("h3");
  title.textContent = obj.title;

  const country = createElem("h4");
  country.textContent = obj.country;

  const img = createElem("img");
  img.src = obj.imageUrl;

  const dateFrom = createElem("span");
  dateFrom.textContent = obj.dateFrom; //revert m and year

  const dateTo = createElem("span");
  dateTo.textContent = obj.dateTo;

  const description = createElem("h6");
  description.textContent = obj.description;

  const readMore = createElem("button");
  const price = createElem("h3");
  price.textContent = obj.price;

  div.append(
    title,
    country,
    img,
    dateFrom,
    dateTo,
    description,
    readMore,
    price
  );
  return div;
}

renderLinks(navLinks, links);
trips.renderTrips(displayTrips, tripCard);
