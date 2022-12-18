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
  descriptionWrapper.classList.add("descriptionWrapper");
  const shortDescrp = createElem("p");
  shortDescrp.classList.add("shortDescrp", "active");
  shortDescrp.textContent = obj.description.substring(0, 30).concat(" ...");
  const fullDescrp = createElem("p");
  fullDescrp.classList.add("fullDescrp");
  fullDescrp.textContent = obj.description;

  descriptionWrapper.append(shortDescrp, fullDescrp);

  const readMore = createElem("button");
  readMore.classList.add("readMore");
  readMore.textContent = "Read more";

  const price = createElem("h3");
  price.classList.add("priceCard");
  price.textContent = obj.price;

  const dateWrapper = createElem("div");

  const fromDate = createElem("span");
  fromDate.textContent = reverseDate(obj.fromDate);

  const toDate = createElem("span");
  toDate.textContent = reverseDate(obj.toDate);

  dateWrapper.append(fromDate, toDate);

  const country = createElem("h4");
  country.classList.add("country");
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
  const dateWrapper = createElem("div");
  dateWrapper.classList.add("dateWrapper");
  const fromDate = createElem("span");
  fromDate.textContent = `From  ${reverseDate(obj.fromDate)}`;

  const toDate = createElem("span");
  toDate.textContent = `To  ${reverseDate(obj.toDate)}`;

  dateWrapper.append(fromDate, toDate);

  const description = createElem("h4");
  description.textContent = obj.description;

  const price = createElem("h3");
  price.classList.add("priceCard");
  price.textContent = obj.price;

  textWrapper.append(country, title, dateWrapper, description, price);

  divCard.append(imgWrapper, textWrapper);

  return divCard;
}

function tableTrips(obj) {
  const createRow = (obj) => {
    const tr = createElem("tr");

    const tdIndex = createElem("td");
    tdIndex.textContent = obj.id;

    const tdImage = createElem("td");
    tdImage.classList.add("tdImage");
    tdImage.style.backgroundImage = `url("${obj.imageUrl}")`;

    const tdTitle = createElem("td");
    tdTitle.textContent = obj.title;

    const tdCountry = createElem("td");
    tdCountry.textContent = obj.country;

    const tdPrice = createElem("td");
    tdPrice.textContent = obj.price;
    tdPrice.classList.add("price");

    const tdDateFrom = createElem("td");
    tdDateFrom.textContent = reverseDate(obj.fromDate);

    const tdDateTo = createElem("td");
    tdDateTo.textContent = reverseDate(obj.toDate);

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
    const editTd = createElem("td");
    const editBtn = createElem("button");

    editBtn.setAttribute("data-id", id);
    editBtn.classList.add("editBtn");

    editTd.appendChild(editBtn);
    return editTd;
  };

  const tr = createRow(obj);
  const editBtn = createEditBtn(obj.id);

  tr.appendChild(editBtn);
  return tr;
}

function errorMessage(elem, hideElem, msg) {
  hideElem.classList.toggle("displayNone");
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
