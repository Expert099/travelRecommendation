function searchLocations(event) {
    console.log('Searching locations...');

    const apiUrl = './travel_recommendation_api.json';
    let search = document.getElementById('search').value;
    console.log(search);
    var results = [];
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            search = search.toLowerCase();
            if (search === 'beach' || search == 'beaches') {
                data = data['beaches'];
            }
            else if (search === 'country' || search === 'countries') {
                let myData = data['countries'];
                const randomIndex = Math.floor(Math.random() * myData.length);
                data = myData[randomIndex];
                data = data['cities'];
                console.log(data);
            }
            else if (search === 'temple' || search === 'temples') {
                data = data['temples'];
            } else {

                data.countries.forEach((country, index) => {
                    if (country.name.toLowerCase().includes(search)) {
                        results = data.countries[index]['cities']; 
                    } else {
                       
                        // Search in cities of the country
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(search) || city.description.toLowerCase().includes(search)) {
                                results.push(city); // Push matching city
                            }
                        });


                        // Search in temples
                        data.temples.forEach(temple => {
                            if (temple.name.toLowerCase().includes(search)) {
                                results.push(temple); // Push matching temple
                            }
                        });

                        // Search in beaches
                        data.beaches.forEach(beach => {
                            if (beach.name.toLowerCase().includes(search)) {
                                results.push(beach); // Push matching beach
                            }
                        });
                    }
                })


                data = results;
            }



            console.log(data);

            if (data.length > 0) {
                container.innerHTML = '';
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'bg-green-300', 'm-4'); // Added margin for spacing

                    card.innerHTML = `
                    <img class="w-full" src="${item.imageUrl}" alt="${item.name}">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">${item.name}</div>
                        <p class="text-gray-700 text-base">${item.description}</p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">Visit</button>
                    </div>
                `;

                    container.appendChild(card);
                });
            } else {
                const card = document.createElement('div');
                card.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'bg-green-300', 'm-4'); // Added margin for spacing
                card.innerHTML = `<p>No Record found</p>`;
                container.innerHTML = '';
                container.appendChild(card);
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
}

function clear() {
    container.innerHTML = '';
    document.getElementById('search').value = "";
}
document.getElementById('searchButton').addEventListener('click', searchLocations);
document.getElementById('clearButton').addEventListener('click', clear);
