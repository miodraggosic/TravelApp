function createElem(el) {
  return document.createElement(el);
}

function reverseDate(date) {
  return date.split("-").reverse().join("-");
}

function tripCard(obj) {
  const divCard = createElem("div");
  divCard.classList.add("card");

  const title = createElem("a");
  title.textContent = obj.title;
  title.href = `./pages/tripOverview.html?id=${obj.id}`;

  const country = createElem("h4");
  country.textContent = obj.country;

  const img = createElem("img"); //insert as background image
  img.src = obj.imageUrl;

  const fromDate = createElem("span");
  fromDate.textContent = reverseDate(obj.fromDate);

  const toDate = createElem("span");
  toDate.textContent = reverseDate(obj.toDate);

  const description = createElem("h6");
  description.textContent = obj.description;

  const readMore = createElem("button");
  const price = createElem("h3");
  price.classList.add("price");
  price.textContent = obj.price;

  divCard.append(
    title,
    country,
    img,
    fromDate,
    toDate,
    description,
    readMore,
    price
  );
  return divCard;
}

function fullTripCard(obj) {
  const divCard = createElem("div");
  divCard.classList.add("fullCard");

  const imgWrapper = createElem("div");
  imgWrapper.classList.add("imgWrapper");
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
  price.textContent = obj.price;

  textWrapper.append(country, title, fromDate, toDate, description, price);

  divCard.append(imgWrapper, textWrapper);

  return divCard;
}

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

export {
  createElem,
  reverseDate,
  tripCard,
  fullTripCard,
  errorMessage,
  removeMessage,
};
