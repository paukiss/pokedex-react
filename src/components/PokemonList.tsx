import React, { useEffect, useState } from "react";
import { fetchPokemonList } from "../api/pokemonApi";
import PokemonCard from "./PokemonCard";

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      const data = await fetchPokemonList(20, 0);
      setPokemonList(data.results);
      setLoading(false);
    };
    loadPokemon();
  }, []);

  if (loading) return <div className="text-center">Cargando Pokémon...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
};

export default PokemonList;
