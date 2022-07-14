let searchBtn = document.querySelector(".customBtn");
let searchInput = document.querySelector(".customInput");
let ip = document.querySelector("#ip");
let userLocation = document.querySelector("#location");
let timezone = document.querySelector("#timezone");
let isp = document.querySelector("#isp");
let counter = 0;

searchBtn.addEventListener("click", function () {
  let url = searchInput.value.includes("www")
    ? `https://geo.ipify.org/api/v2/country,city?apiKey=at_Qa91aW05B4rR9FzFGjllUKXHkvmx7&domain=${searchInput.value}`
    : `https://geo.ipify.org/api/v2/country,city?apiKey=at_Qa91aW05B4rR9FzFGjllUKXHkvmx7&ipAddress=${searchInput.value}`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      ip.textContent = data.ip;
      userLocation.textContent = `${data.location.country}-${data.location.region}`;
      timezone.textContent = data.location.timezone;
      isp.textContent = data.isp;
      return fetch(`https://ipapi.co/${searchInput.value}/json/`);
    })
    .then((res) => res.json())
    .then((data) => {
      searchInput.value = "";
      if (!data.latitude || !data.longitude) alert("Can't find the position");
      counter++;
      defineMap(data.latitude, data.longitude);
    });
});
var map;
function defineMap(lat, long) {
  if (counter == 1) {
    map = L.map("map").setView([lat, long], 15);
  } else {
    map.setView([lat, long], 15);
  }
  let layer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  layer.addTo(map);
  L.marker([lat, long]).addTo(map);
}
