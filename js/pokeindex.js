document.addEventListener('DOMContentLoaded', function() {
    const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';
    const bodyObj = document.querySelector('body');
    let selectedNum = 10;

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
    }

    async function selectDropdown(dropSelect) {
        // Crear label para el select de numero de tarjetas
        const txtNum = document.createElement('label');
        txtNum.className = 'txtNum';
        txtNum.setAttribute('for', 'num');
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
        console.log(`Creating table with ${numCells} cells, which will be split into ${numRows} rows`);

        // Bucle para filas y celdas
        for(let i = 0; i < numRows; i++){
            const row = document.createElement('tr');
            for(let j = 0; j < 5 && (i * 5 + j) < numCells; j++){
                const single = document.createElement('td');
                row.appendChild(single);

                // Fetch a la API de cada pokemon
                const result = await fetch(POKE_URL + '/' + (i*5 + j + 1));
                const dataPoke = await result.json()
                console.log(dataPoke);

                // Crear imagen de cada pokemon
                const img = document.createElement('img');
                img.className = 'pokeImg';
                img.src = dataPoke.sprites.front_default;
                single.appendChild(img);

                // Crear nombre de cada pokemon
                const name = document.createElement('h3');
                name.textContent = dataPoke.name;
                single.appendChild(name);

                // Crear botón
                const but = document.createElement('button');
                but.className = 'pokeBut';
                but.textContent = 'Detall';
                but.setAttribute('data-pokemon', dataPoke.id);
                single.appendChild(but);

                but.addEventListener('click', function(){
                    window.location.href = `pokemon.html?id=${dataPoke.id}`;
                });
            }
            table.appendChild(row);
        }
    }

    pokeDisplay();
});