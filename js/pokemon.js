document.addEventListener('DOMContentLoaded', function() {
    const URL_PARAMS = new URLSearchParams(window.location.search);
    const POKEMON_ID = URL_PARAMS.get('id');
    const POKE_URL = `https://pokeapi.co/api/v2/pokemon/${POKEMON_ID}`;
    const bodyObj = document.querySelector('body');

    async function pokemonShow() {
        //Crear el div principal con clase main
        const mainDiv = document.createElement('div');
        mainDiv.className = 'main';
        bodyObj.appendChild(mainDiv);
    
        // Crear el titulo
        const title = document.createElement('h1');
        title.className = 'pokeTitle';
        title.textContent = 'Detall del Pokémon';
        mainDiv.appendChild(title);

        // Fetch a la API del Pokemon actual
        const pokemon = await fetch(POKE_URL);
        const dataPoke = await pokemon.json()
        console.log(dataPoke);

        // Crear nombre de cada pokemon
        const name = document.createElement('h3');
        name.textContent = dataPoke.name;
        mainDiv.appendChild(name);

        // Crear imagen de cada pokemon
        const img = document.createElement('img');
        img.className = 'pokeImg';
        img.src = dataPoke.sprites.front_default;
        mainDiv.appendChild(img);

        // Crear p de información
        const info = document.createElement('p');
        info.textContent = `Pes: ${dataPoke.weight} | Alçada: ${dataPoke.height}`;
        mainDiv.appendChild(info);

        // Crear tabla de habilidades
        const abTable = document.createElement('table');
        abTable.className = 'abTable';
        // Encabezado de la tabla
        const headerRow = document.createElement('tr');
        const IDHeader = document.createElement('th');
        IDHeader.textContent = 'ID';
        headerRow.appendChild(IDHeader);
        const abHeader = document.createElement('th');
        abHeader.textContent = 'Habilitat';
        headerRow.appendChild(abHeader);
        abTable.appendChild(headerRow);
        // Bucle para filas y celdas
        for (let i = 0; i < dataPoke.abilities.length; i++) {
            const row = document.createElement('tr');
        
            // Crear una celda para el ID
            const idCell = document.createElement('td');
            idCell.textContent = i + 1;  // Los IDs empiezan en 1
            row.appendChild(idCell);
        
            // Crear una celda para la habilidad
            const abilityCell = document.createElement('td');
            abilityCell.textContent = dataPoke.abilities[i].ability.name;
            row.appendChild(abilityCell);
            abTable.appendChild(row);
        }
        mainDiv.appendChild(abTable);
        
        // Crear botón de volver atrás con respecto al historial
        const goback = document.createElement('button');
        goback.className = 'pokeBut';
        goback.textContent = '⬅ Tornar enrere';
        mainDiv.appendChild(goback);
        goback.addEventListener('click', function(){
            window.history.back();
        })
    }
    if(POKEMON_ID){
        pokemonShow();
    } else {
        console.log("Error en la ID del Pokemon")
    }
});