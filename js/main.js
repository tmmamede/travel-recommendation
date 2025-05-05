const searchButton = document.getElementById("search-button");

document.getElementById("search-button").onclick = function () {
    event.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        const encoded = encodeURIComponent(query);
        window.location.href = `search.html?q=${encoded}`;
    }
};

document.getElementById("reset-button").onclick = function () {
    event.preventDefault();
    document.getElementById("search-input").value = "";
};

window.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    if (query) {
        const searchSection = document.querySelector(".search-section");

        const heading = document.createElement("h1");
        heading.textContent = `Search results for: ${query}`;
        searchSection.appendChild(heading);

        const resultsSection = document.createElement("section");
        resultsSection.classList.add("results-section");
        searchSection.appendChild(resultsSection);

        fetch("data/data.json")
            .then(response => {
                return response.json();
            })
            .then(data => {

                let queryFormatted = query.toLowerCase();
                queryFormatted = queryFormatted == "beach" ? "beaches" : queryFormatted;
                queryFormatted = queryFormatted == "temple" ? "temples" : queryFormatted;
                keywords = ["beaches", "temples", "australia", "japan", "brazil"];

                if(keywords.includes(queryFormatted)) {
                    if(queryFormatted == "beaches" || queryFormatted == "temples") {
                        const category = data[queryFormatted];
                        category.forEach(item => {
                            const itemDiv = document.createElement("div");
                            itemDiv.classList.add(queryFormatted);
                            itemDiv.innerHTML = `
                            <img src="${item.imageUrl}" alt="${item.name}">
                            <h2>${item.name}</h2>
                            <p>${item.description}</p>
                            `;
                            resultsSection.appendChild(itemDiv);
                        });
                    }
                    else {
                        const countries = data["countries"];
                        countries.forEach(country => {
                            if(country.name.toLowerCase() == queryFormatted) {
                                const cities = country["cities"];
                                cities.forEach(city => {
                                    const cityDiv = document.createElement("div");
                                    cityDiv.classList.add("city");
                                    cityDiv.innerHTML = `
                                    <img src="${city.imageUrl}" alt="${city.name}">
                                    <h2>${city.name}</h2>
                                    <p>${city.description}</p>
                                    `;
                                    resultsSection.appendChild(cityDiv);
                                });
                            }
                        });
                    }
                } else {
                    const noResults = document.createElement("p");
                    noResults.textContent = "No results found.";
                    resultsSection.appendChild(noResults);
                }   

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}