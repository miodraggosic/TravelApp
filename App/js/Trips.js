class Trips {
  #regex = {
    title: /gega/,
    imageUrl: /gega/,
    description: /gega/,
    fromDate: /gega/,
    toDate: /gega/,
    country: /gega/,
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
        data.forEach((country) => {
          this.#countries.push(country.name);
        });
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
