const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit: number = 20, offset: number = 0) => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return response.json();
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  return response.json();
};
