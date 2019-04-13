function loadPokemons(callback) {
    $.ajax({
        url: 'http://localhost:8080/pokemon/'
    }).done(function (pokemons) {
        callback(pokemons);
    })
}

//Create item in server
function createPokemon(pokemon, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/pokemon/',
        data: JSON.stringify(pokemon),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (pokemon) {
        callback(pokemon);
    })
}

//Update item in server
function updateItem(pokemon) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/pokemon/' + pokemon.id,
        data: JSON.stringify(pokemon),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (pokemon) {
    })
}

//Delete item from server
function deleteItem(pokemonId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/pokemon/' + pokemonId
    }).done(function (pokemon) {
    })
}