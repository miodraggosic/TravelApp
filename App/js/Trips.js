class Trips {
  #regex = {
    title: /^[A-Z][A-z]+[\s\D]{0,50}$/,
    imageUrl:
      /^(http(s)?)(\:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    price: /^\d{2,4}$/,
    description: /^[A-Z][\w\s\-_,\.;:()]{30,250}$/,
    country: null,
  };

  #countries = [];

  constructor(api) {
    this.Api = api;
  }

  getContries() {
    fetch(this.Api, {
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
      });
  }

  addTrip(obj) {
    fetch(this.Api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then(() => this.renderTrips())
      .catch((err) => console.log(err));
  }

  renderTrips() {
    fetch(this.Api, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}
