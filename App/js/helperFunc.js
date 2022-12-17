function createElem(el) {
  return document.createElement(el);
}

function reverseDate(date) {
  return date.split("-").reverse().join("-");
}

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

  const dateWrapper = createElem("div");

  const fromDate = createElem("span");
  fromDate.textContent = reverseDate(obj.fromDate);

  const toDate = createElem("span");
  toDate.textContent = reverseDate(obj.toDate);

  dateWrapper.append(fromDate, toDate);

  const country = createElem("h4");
  country.textContent = obj.country;

  div.append(
    title,
    imgLink,
    descriptionWrapper,
    readMore,
    price,
    dateWrapper,
    country
  );
  return div;
}

function fullTripCard(obj) {
  const divCard = createElem("div");
  divCard.classList.add("fullCard");

  const imgWrapper = createElem("div");
  imgWrapper.classList.add("imgWrapper");
  console.log(imgWrapper);
  imgWrapper.style.backgroundImage = `url("${obj.imageUrl}")`;

  const textWrapper = createElem("div");
  textWrapper.classList.add("textWrapper");

  const country = createElem("h3");
  country.textContent = obj.country;

  const title = createElem("h1");
  title.textContent = obj.title;

  const fromDate = createElem("span");
  fromDate.textContent = reverseDate(obj.fromDate);

  const toDate = createElem("span");
  toDate.textContent = reverseDate(obj.toDate);

  const description = createElem("h4");
  description.textContent = obj.description;

  const price = createElem("h3");
  price.classList.add("price");
  price.textContent = obj.price;

  textWrapper.append(country, title, fromDate, toDate, description, price);

  divCard.append(imgWrapper, textWrapper);

  return divCard;
}

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

function errorMessage(elem, msg) {
  // displayTrips.style.display = "none";
  const message = document.createElement("div");
  message.classList.add("message");
  message.textContent = msg;
  elem.append(message);
}

function removeMessage(elem) {
  setTimeout(() => {
    const message = document.querySelector(".message");
    message.remove();
    elem.classList.toggle("displayNone");
  }, 3000);
}

export {
  createElem,
  reverseDate,
  tripCard,
  fullTripCard,
  tableTrips,
  errorMessage,
  removeMessage,
};
