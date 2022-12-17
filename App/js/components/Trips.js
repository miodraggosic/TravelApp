class Trips {
  #regex = {
    title: /^[A-Z][A-z]+[\s\D]{0,50}$/,
    imageUrl:
      /^(http(s)?)(\:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    price: /^\d{2,4}$/,
    description: /^[A-Z][a-z]+[\s\w\W]+$/,
    fromDate: /^(?:2023)+/,
    toDate: /^(?:2023)+/,
    country: null,
  };

  allTrips = [];

  #countries = [];

  constructor(api) {
    this.Api = api;
  }

  getContries(elem) {
    fetch(this.Api.countries, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let regExCountries = [];
        data.forEach((elem) => {
          this.#countries.push(elem);
          regExCountries.push(elem.name);
        });
        this.#regex.country = RegExp(`^(${regExCountries.join("|")})+$`);
        this.insertCountries(elem);
      });
  }

  getTrips(id, elem, card) {
    !id
      ? fetch(this.Api.trips, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            data.forEach((trip) => {
              this.allTrips.push(trip);
              this.renderTrip(elem, card, trip);
            });
            this.addReadMore();
          })
      : fetch(`${this.Api.trips}/${id}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((trip) => this.renderTrip(elem, card, trip));
  }

  insertCountries(elem) {
    const createElem = (el) => document.createElement(el);
    this.#countries.forEach((country) => {
      const opt = createElem("option");
      opt.textContent = country.name;
      opt.id = country.id;
      elem.appendChild(opt);
    });
  }

  validField(field) {
    let result = this.#regex[field.id].test(field.value);
    if (!result) {
      field.classList.add("red");
      field.classList.remove("green");
    } else {
      field.classList.add("green");
      field.classList.remove("red");
    }
  }

  addTrip(obj) {
    fetch(this.Api.trips, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then(() => console.log("succes")) //this.renderTrips())
      .catch((err) => console.log(err));
  }

  renderTrip(elem, card, obj) {
    elem.appendChild(card(obj));
  }

  addReadMore() {
    const readMoreBts = document.querySelectorAll(".readMore");
    function toggleVisible(e) {
      e.target.previousElementSibling.childNodes.forEach((elem) =>
        elem.classList.toggle("active")
      );
    }
    readMoreBts.forEach((btn) => {
      btn.addEventListener("click", (e) => toggleVisible(e));
    });
  }

  filterTrips(term) {
    if (term) {
      const tripsToRender = this.allTrips.filter((trip) =>
        trip.title.toLowerCase().includes(term)
      );
      return tripsToRender;
    } else {
      return [];
    }
  }
}

export default Trips;
