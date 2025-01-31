document.addEventListener('DOMContentLoaded', function() {
    const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';
    const bodyObj = document.querySelector('body');

    async function pokeDisplay() {
        // Fetch a la PokeAPI
        const response = await fetch(POKE_URL);
        console.log(response);
        const data = await response.json();

        //Crear el div principal con clase main
        const mainDiv = document.createElement('div');
        mainDiv.className = 'main';
        bodyObj.appendChild(mainDiv);

        // Crear la tabla
        const table = document.createElement('table');
        table.className = 'pokeTable';
        // Bucle para filas y celdas
        for(let i = 0; i < 2; i++){
            const row = document.createElement('tr');
            console.log("Creating row");
            for(let j = 0; j < 5; j++){
                console.log("Creating cell");
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
                single.appendChild(but);
            }
            table.appendChild(row);
        }
        mainDiv.appendChild(table);
    }
    pokeDisplay();
});