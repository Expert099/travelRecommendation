function searchLocations(event) {
    console.log('Searching locations...');

    const apiUrl = './travel_recommendation_api.json';
    let search = document.getElementById('search').value;
    console.log(search);
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        search =  search.toLowerCase();
        if(search === 'beach' || search == 'beaches'){
            data = data['beaches'];
        } 
        else if(search === 'country' || search === 'countries'){
            data = data['countries'];
        } 
        else if(search === 'temple' || search === 'temples'){
            data = data['temples'];
        } else{
            data = [];
        }

        console.log(data);

        if(data.length > 0 ){
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg');

                card.innerHTML = `
                    <img class="w-full" src="${item.imageUrl}" alt="${item.name}">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">${item.name}</div>
                        <p class="text-gray-700 text-base">${item.description}</p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Visit</button>
                    </div>
                `;

                container.appendChild(card);
            });
        }
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

document.getElementById('searchButton').addEventListener('click', searchLocations);