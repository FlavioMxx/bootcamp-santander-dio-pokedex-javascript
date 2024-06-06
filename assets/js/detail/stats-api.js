const detailApi = {};



function convertDetailApiToStats(pokeStats) {

    const stats = new PokemonDetail();

    stats.baseStat = pokeStats.base_stat;
    stats.nameStat = pokeStats.stat.name;

    return stats;
}



detailApi.getStats = (nomeParam) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${nomeParam}`;

    return fetch(url)
            .then( (response) => response.json() )
            .then( (jsonBody) =>  jsonBody.stats)
            .then( (stats) =>stats.map(convertDetailApiToStats));
}
