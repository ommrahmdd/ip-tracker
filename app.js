let searchBtn = document.querySelector(".customBtn");
let searchInput = document.querySelector(".customInput");
let ip = document.querySelector("#ip");
let userLocation = document.querySelector("#location");
let timezone = document.querySelector("#timezone");
let isp = document.querySelector("#isp");
let counter = 0;
searchBtn.addEventListener("click", function () {
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_Qa91aW05B4rR9FzFGjllUKXHkvmx7&ipAddress=${searchInput.value}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      ip.textContent = data.ip;
      userLocation.textContent = `${data.location.country}-${data.location.region}`;
      timezone.textContent = data.location.timezone;
      isp.textContent = data.isp;
      searchInput.value = "";
      return fetch(`https://ipapi.co/${searchInput.value}/json/`);
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      counter++;
      defineMap(data.latitude, data.longitude);
    });
});
var map;
function defineMap(lat, long) {
  let option = {
    center: [lat, long],
    zoom: 17,
  };
  // if (map != undefined) {
  //   console.log("hey");
  //   map.remove();
  // }
  if (counter == 1) {
    console.log("Greater");
    map = L.map("map").setView([lat, long], 15);
  } else {
    console.log(map);
    map.setView([lat, long], 15);
  }
  let layer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  layer.addTo(map);
  L.marker([lat, long]).addTo(map);
}
