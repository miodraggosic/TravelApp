const localPort = "http://localhost:3000/";

const trips = `${localPort}trips`;
const countries = `${localPort}countries`;

const apiObject = [
  ["trips", trips],
  ["countries", countries],
];

const Api = Object.fromEntries(apiObject);

export default Api;
