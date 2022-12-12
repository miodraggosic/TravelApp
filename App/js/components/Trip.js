export default class Trip {
  constructor([title, url, price, description, fromDate, toDate, country]) {
    this.title = title;
    this.imageUrl = url;
    this.price = price;
    this.description = description;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.country = country;
  }
}
