
// NOTE: This is mock logic, not real blockchain stuff

function donate() {
  const eth = document.getElementById("ethAmount").value;
  if (!eth) {
    alert("Oops, please enter ETH amount!");
    return;
  }
  alert("Thanks! You donated " + eth + " ETH (demo only)");
}

function submitProposal() {
  const place = document.getElementById("location").value;
  const details = document.getElementById("description").value;

  if (place && details) {
    alert("New proposal added for: " + place + "\nDetails: " + details);
  } else {
    alert("Please fill out all fields before submitting.");
  }
}

function vote(option) {
  if (option === 'yes') {
    alert("👍 You voted YES!");
  } else {
    alert("👎 You voted NO.");
  }
}

async function voteOnChain(propId, yes) {
  console.log("TODO: Call contract vote fn with proposal:", propId, "YES?", yes);
  alert("Voting simulated. Connect smart contract to go live.");
}

async function loadDisastersToMap(map) {
  const res = await fetch("https://api.reliefweb.int/v1/disasters?appname=DisasterTrackerApp&profile=full");
  const data = await res.json();

  const fallbackCoords = {
    "India": [22.5, 79],
    "Bangladesh": [23.7, 90.3],
    "Nepal": [28.4, 84],
    "Sri Lanka": [7.9, 80.7],
    "Philippines": [13, 122],
    "Pakistan": [30.3, 69],
    "Myanmar": [21.9, 95.9]
  };

  data.data.forEach(d => {
    const name = d.fields.name;
    d.fields.country.forEach(country => {
      const coords = fallbackCoords[country.name];
      if (coords) {
        L.marker(coords).addTo(map)
          .bindPopup(`<strong>${name}</strong><br>Location: ${country.name}`);
      }
    });
  });
}

function initMap() {
  const map = L.map('disasterMap').setView([22.5937, 78.9629], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  loadDisastersToMap(map);
}

window.onload = initMap;
