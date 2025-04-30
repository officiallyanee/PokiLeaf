const BASEURL = "https://pokeapi.co/api/v2/pokemon/";

export async function getPokemonMoves(pokemonId) {
    const url = BASEURL + pokemonId;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json()
        const pokemonMoves = json.moves;
        return pokemonMoves;
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function getPokemonName(pokemonId) {
    const url = BASEURL + pokemonId;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json()
        const pokemonName = json.species.name.toUpperCase();
        return pokemonName;
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function getPokemonObject(pokemonId) {
    const url = BASEURL + pokemonId;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const pokemonObject = await response.json()
        return pokemonObject;
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function getMoveStats(pokemonObject, moveId) {
    const url = pokemonObject.moves[moveId].move.url;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const moveStats = await response.json()
        return moveStats;
    }
    catch (error) {
        console.error(error.message);
    }
}