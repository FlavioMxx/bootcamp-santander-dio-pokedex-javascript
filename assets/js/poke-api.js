
const pokeApi = {

};

function convertpokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then( (response => response.json()))
    .then(convertpokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) //Fetch me "Promete" um response.
            .then( (response) => response.json() ) //Essa function pega meu response prometido e converte para json e me "promete" qualquer coisa - por ter só uma linha de retorno, não preciso abrir o corpo de function "{}"
            .then( (jsonBody) => jsonBody.results ) //Essa function pega o meu json e pega os results.
                .then( (pokemons) => pokemons.map(pokeApi.getPokemonDetail))
                .then( (detailRequests) => Promise.all(detailRequests) )
                .then( (pokemonsDetails) => pokemonsDetails)
            .catch( (error) => console.error(error) );
};