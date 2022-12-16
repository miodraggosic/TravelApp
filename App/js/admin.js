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
trips.getTrips(null, displayTableTrips, tableTrips);

createTripBtn.addEventListener("click", () => {
  window.location.href = "./createTrip.html";
});

function tableTrips(obj) {
  const createRow = (obj) => {
    const tr = helper.createElem("tr");

    const tdIndex = helper.createElem("td");
    tdIndex.textContent = obj.id;

    const tdImage = helper.createElem("td");
    tdImage.classList.add("tdImage");
    tdImage.style.backgroundImage = `url("${obj.imageUrl}")`;

    const tdTitle = helper.createElem("td");
    tdTitle.textContent = obj.title;

    const tdCountry = helper.createElem("td");
    tdCountry.textContent = obj.country;

    const tdPrice = helper.createElem("td");
    tdPrice.textContent = obj.price;
    tdPrice.classList.add("price");

    const tdDateFrom = helper.createElem("td");
    tdDateFrom.textContent = helper.reverseDate(obj.fromDate);

    const tdDateTo = helper.createElem("td");
    tdDateTo.textContent = helper.reverseDate(obj.toDate);

    tr.append(
      tdIndex,
      tdImage,
      tdTitle,
      tdCountry,
      tdPrice,
      tdDateFrom,
      tdDateTo
    );
    return tr;
  };

  const createEditBtn = (id) => {
    const editTd = helper.createElem("td");
    const editBtn = helper.createElem("button");

    editBtn.setAttribute("data-id", id);
    editBtn.textContent = "Edit";

    editTd.appendChild(editBtn);
    return editTd;
  };

  const tr = createRow(obj);
  const editBtn = createEditBtn(obj.id);

  tr.appendChild(editBtn);
  return tr;
}
