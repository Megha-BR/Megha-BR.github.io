const BREEDS_LIST_URL = "https://dog.ceo/api/breeds/list/all";
const IMG = document.getElementById("dog-img");
const SELECT = document.querySelector(".breeds-list");
const LOADER = document.getElementById("loading-img");

IMG.addEventListener("load", function(event) {
    LOADER.classList.add("hidden");
    IMG.classList.remove("hidden");
});
fetch(BREEDS_LIST_URL)
    .then(function(response) {
        return response.json();
    })
        .then(function(data) {
            populateList(data.message);
        });

function populateList(list) {
    const breeds = Object.keys(list);
    for(let i=0; i<breeds.length; i++) {
        const option = document.createElement("option");
        option.value = breeds[i];
        option.innerText = breeds[i].charAt(0).toUpperCase() + breeds[i].slice(1);
        SELECT.appendChild(option);
    }
    SELECT.addEventListener("change", displayDog);
}

function displayDog(event) {
    LOADER.classList.remove("hidden");
    IMG.classList.add("hidden");
    const breed = event.target.value;
    const api = `https://dog.ceo/api/breed/${breed}/images/random`;
    fetch(api)
    .then(function(response) {
        return response.json();
    })
        .then(function(data) {
            IMG.src = data.message;
        });
}






