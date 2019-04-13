function loadPokemons(callback) {
    $.ajax({
        url: 'http://localhost:8080/pokemon/'
    }).done(function (pokemons) {
        ////console.log('Items loaded: ' + JSON.stringify(items));
        callback(pokemons);
    })
}

//Create item in server
function createPokemon(pokemon, callback) {
    $.ajax({
        method: "POST",
        url: 'https://coba-ia.herokuapp.com/items',
        data: JSON.stringify(item),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        //console.log("Item created: " + JSON.stringify(item));
        callback(item);
    })
}

//Update item in server
function updateItem(item) {
    $.ajax({
        method: 'PUT',
        url: 'https://coba-ia.herokuapp.com/items/' + item.id,
        data: JSON.stringify(item),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        ////console.log("Updated item: " + JSON.stringify(item))
    })
}

//Delete item from server
function deleteItem(itemId) {
    $.ajax({
        method: 'DELETE',
        url: 'https://coba-ia.herokuapp.com/items/' + itemId
    }).done(function (item) {
        //console.log("Deleted item " + itemId)
    })
}

//Show item in page
function showItem(item) {

    var checked = '';
    var style = '';

    if (item.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<li onclick="llamarconsola()" id="item-"' + item.id + '" class="nav-item"><span>' + item.description + ' <i class="fa fa-send"></i></span></li>')
}