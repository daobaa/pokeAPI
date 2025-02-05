document.addEventListener('DOMContentLoaded', function() {
    const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';
    const bodyObj = document.querySelector('body');
    let selectedNum = 10;
    let offset = 0;
    const LIMIT = 10;
    let currentPage = 1;

    async function pokeDisplay() {
        //Crear el div principal con clase main
        const mainDiv = document.createElement('div');
        mainDiv.className = 'main';
        bodyObj.appendChild(mainDiv);

        // Crear el titulo
        const title = document.createElement('h1');
        title.className = 'pokeTitle';
        title.textContent = 'Pokémon API';
        mainDiv.appendChild(title);
        
        const dropSelect = document.createElement('div');
        dropSelect.className = 'dropSelect';
        mainDiv.appendChild(dropSelect);
        
        // Crear la tabla
        const table = document.createElement('table');
        table.className = 'pokeTable';
        mainDiv.appendChild(table);

        selectDropdown(dropSelect, table);

        await createTable(selectedNum, table);

        dropSelect.querySelector('#numSelect').addEventListener('change', async function(e){
            selectedNum = e.target.value;
            table.innerHTML = '';
            await createTable(selectedNum, table);
        });

        // Crear botón Previous
        const prevBut = document.createElement('button');
        prevBut.textContent = 'Prev';
        prevBut.className = 'prevBut';
        prevBut.disabled = true;
        mainDiv.appendChild(prevBut);

        prevBut.addEventListener('click', async () =>{
            offset -= LIMIT;
            currentPage--;
            table.innerHTML = '';
            await createTable(selectedNum, table);
            updateButtonState();
        });

        // Crear botón Next
        const nextBut = document.createElement('button');
        nextBut.textContent = 'Next';
        nextBut.className = 'nextBut';
        mainDiv.appendChild(nextBut);
        
        nextBut.addEventListener('click', async () =>{
            offset += LIMIT;
            currentPage++;
            table.innerHTML = '';
            await createTable(selectedNum, table);
            updateButtonState();
        });
        function updateButtonState(){
            prevBut.disabled = currentPage === 1;
            nextBut.disabled = false;
        }
        await createTable(offset, LIMIT, table);
        updateButtonState();
    }

    async function selectDropdown(dropSelect) {
        // Crear label para el select de numero de tarjetas
        const txtNum = document.createElement('label');
        txtNum.className = 'txtNum';
        txtNum.setAttribute('for', 'numSelect');
        txtNum.textContent = 'Numero de resultats:';
        dropSelect.appendChild(txtNum);

        // Crear select de numero de tarjetas
        const numSelect = document.createElement('select');
        numSelect.name = 'numSelect';
        numSelect.id = 'numSelect';
        for (let i = 1; i <= 10; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            if(i == 10){
                option.selected = true;
            }

            numSelect.appendChild(option);
        }
        dropSelect.appendChild(numSelect);
    }

    async function createTable(numCells, table){
        const numRows = Math.ceil(numCells / 5);

        // Bucle para filas y celdas
        for(let i = 0; i < numRows; i++){
            const row = document.createElement('tr');
            for(let j = 0; j < 5 && (i * 5 + j) < numCells; j++){
                const single = document.createElement('td');
                row.appendChild(single);

                // Fetch a la API de cada pokemon
                const result = await fetch(`${POKE_URL}?offset=${offset + i * 5 + j}&limit=${LIMIT}`);
                const dataPoke = await result.json()
                console.log('Fetched dataPoke:', dataPoke);

                if(dataPoke.results && dataPoke.results[j]){
                    const pokemonUrl = dataPoke.results[j].url;
                    console.log('Fetched details from URL:', pokemonUrl);

                    const pokeDetails = await fetch(pokemonUrl);
                    const pokeData = await pokeDetails.json();

                    console.log('Fetched pokeData:', pokeData);

                    // Crear imagen de cada pokemon
                    const img = document.createElement('img');
                    img.className = 'pokeImg';
                    img.src = pokeData.sprites.front_default;
                    single.appendChild(img);

                    // Crear nombre de cada pokemon
                    const name = document.createElement('h3');
                    name.textContent = pokeData.name;
                    single.appendChild(name);

                    // Crear botón
                    const but = document.createElement('button');
                    but.className = 'pokeBut';
                    but.textContent = 'Detall';
                    but.setAttribute('data-pokemon', pokeData.id);
                    single.appendChild(but);

                    but.addEventListener('click', function(){
                        window.location.href = `pokemon.html?id=${pokeData.id}`;
                    });
                } else{
                    console.error('No Pokemon data found for:', dataPoke.results[j]);
                }
            }
            table.appendChild(row);
        }
    }

    pokeDisplay();
});