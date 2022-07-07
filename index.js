const stateForm = document.querySelector("#select-state-form");
const breweriesList = document.querySelector("#breweries-list");
const selectBreweryTypeButton = document.querySelector("#filter-by-type");

const apiURL = "https://api.openbrewerydb.org/breweries";

const state = {
  types: ["micro", "regional", "brewpub"],

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
        return res.json();
      })
      .then((data) => {
        setBreweriesData(data);
        renderBreweries(state.breweries);
      });
  });
}

function setBreweriesData(breweries) {
  const filterBreweries = breweries.filter((brewery) =>
    state.types.includes(brewery.brewery_type)
  );
  state.breweries = filterBreweries;
}

//selectBreweryTypeButton.addEventListener();

function filterByBreweryTypeListener() {
  //const selectBreweryTypeButton = document.querySelector("#filter-by-type");

  selectBreweryTypeButton.addEventListener("change", (event) => {
    const myType = event.target.value;

    //console.log("my event", event.target.value);
    if (state.breweries.length) {
      const newListFilter = state.breweries.filter((brewery) => {
        //console.log("filter", brewery.brewery_type, myType);
        return brewery.brewery_type === myType;
      });
      //console.log("result", newListFilter);
      renderBreweries(newListFilter);
    }
  });
}
//run through my list of breweries and check if the brewery is of myType
// save my result in a variable and render it
function initalise() {
  searchByStateListener();
  filterByBreweryTypeListener();
}

function renderBrewery(brewery) {
  console.log("render brewery", brewery);

  const liE1 = document.createElement("li");

  const h2E1 = document.createElement("h2");
  h2E1.innerText = `${brewery.name}`;
  liE1.append(h2E1);

  const divE1 = document.createElement("div");
  divE1.setAttribute("class", "type");
  divE1.innerText = `${brewery.brewery_type}`;
  liE1.append(divE1);

  const section1 = document.createElement("section");
  section1.setAttribute("class", "address");
  liE1.append(section1);

  const h3E2 = document.createElement("h3");
  //h3E1.setAttribute("class", "address")
  h3E2.innerText = "Address:";
  section1.append(h3E2);

  const p1E2 = document.createElement("p");
  //p1E1.setAttribute("class", "address")
  p1E2.innerText = `${brewery.street}`;
  section1.append(p1E2);

  const p2E2 = document.createElement("p");
  p2E2.innerText = `${brewery.postal_code}`;
  section1.append(p2E2);

  const p2E2Tag = document.createElement("strong");
  //p2E2Tag.tagName("strong") // do at the end
  p2E2.append(p2E2Tag);

  const section2 = document.createElement("section");
  section2.setAttribute("class", "phone");
  liE1.append(section2);

  const h3E3 = document.createElement("h3");
  h3E3.innerText = "Phone:";
  section2.append(h3E3);

  const p3E3 = document.createElement("p");
  p3E3.innerText = `${brewery.phone}`;
  section2.append(p3E3);

  const section3 = document.createElement("section");
  section3.setAttribute("class", "link");
  liE1.append(section3);

  //console.log("brewery", brewery)
  if (brewery.website_url) {
    const link = document.createElement("a");
    link.setAttribute("href", `${brewery.website_url}`);
    link.setAttribute("target", "_blank");
    link.innerText = "Visit Website";
    section3.append(link);
  }
  breweriesList.appendChild(liE1);
}
// parameter was clashing with ul element of html --> saved to breweryList constant.
function renderBreweries(breweries) {
  //console.log("render", breweriesList);
  breweriesList.innerHTML = "";
  breweries.forEach((brewery) => renderBrewery(brewery));
}

initalise();

// OLD CODE - NOTES

// filter --> take new array and filter by type and render
// fetch("https://api.openbrewerydb.org/breweries?by_state=new_york&per")
// .then(resp => resp.json())
// .then(data => console.log(data))

// const submitBtn = document.querySelector('')

//   const li = document.createElement("li");
//   li.innerHTML = `<h2>${brewery.name}</h2>
//   <div class="type">${brewery.brewery_type}</div>
//   <section class="address">
//     <h3>Address:</h3>
//     <p>${brewery.street}, ${brewery.postal_code}</p>
//     <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
//   </section>
//   <section class="phone">
//     <h3>Phone:</h3>
//     <p>${brewery.phone}</p>
//   </section>
//   <section class="link">
//     <a href="${brewery.website_url}" target="_blank">Visit Website</a>
//   </section>`;
