const stateForm = document.querySelector("#select-state-form");
const breweriesList = document.querySelector("#breweries-list");

const apiURL = "https://api.openbrewerydb.org/breweries";

const state = {
  types: ["Mirco", "Reional", "Brewpub"],

  usState: "",

  breweries: [],
};

function searchByStateListener() {
  stateForm.addEventListener("submit", (event) => {
    //console.log("my event", event, event.target);
    event.preventDefault();
    state.usState = event.target[0].value;
    fetch(`${apiURL}?by_state=${state.usState}&per_page=100`)
      .then((res) => {
        //console.log("my fetch", res);
        return res.json();
      })
      .then((breweries) => {
        //console.log("my data", data);
        state.breweries = breweries;
        render();
      });
  });
}

function filterByBreweryTypeListener() {
    const selectBreweryTypeButton = document.querySelector('#filter-by-type')

    selectBreweryTypeButton.addEventListener("submit", (event) => {
        state.types = event.target.value;

        if(brew_type.length > 0) {
            selectBreweryTypeButton = state.usState.filter(brewery => {
                return brewery.brew_type === state.types
            })
        }
    })
}

function initalise() {
  searchByStateListener();
}

function renderBrewery(brewery) {
  const li = document.createElement("li");
  li.innerHTML = `<h2>${brewery.name}</h2>
  <div class="type">${brewery.brewery_type}</div>
  <section class="address">
    <h3>Address:</h3>
    <p>${brewery.street}, ${brewery.postal_code}</p>
    <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
  </section>
  <section class="phone">
    <h3>Phone:</h3>
    <p>${brewery.phone}</p>
  </section>
  <section class="link">
    <a href="${brewery.website_url}" target="_blank">Visit Website</a>
  </section>`;

  breweriesList.appendChild(li);
}

function renderBreweries() {
  state.breweries.forEach((brewery) => renderBrewery(brewery));
}

render = () => {
  breweriesList.innerHTML = "";

  renderBreweries();
};

initalise();





// fetch("https://api.openbrewerydb.org/breweries?by_state=new_york&per")
// .then(resp => resp.json())
// .then(data => console.log(data))

// const submitBtn = document.querySelector('')
