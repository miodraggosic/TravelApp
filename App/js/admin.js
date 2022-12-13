import NavLinks from "./components/NavLinks.js";
import * as helper from "./helperFunc.js";
import Trips from "./components/Trips.js";
import Api from "./env.js";

const displayLinks = document.querySelector(".navLinks");
const displayTableTrips = document.querySelector(".tableTrips");

const trips = new Trips(Api);
trips.getTrips(null, displayTableTrips, tableTrips);

const navLinks = new NavLinks();
navLinks.renderLinks(displayLinks);

function tableTrips(obj) {
  const createRow = (obj) => {
    const tr = helper.createElem("tr");

    const objValues = Object.values(obj);
    const objId = objValues.pop();
    objValues.unshift(objId);

    objValues.forEach((value) => {
      const td = helper.createElem("td");
      td.textContent = value;
      tr.appendChild(td);
    });
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
