import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../api/pokemonApi";
import type { PokemonDetails } from "../types/Pokemon";

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      if (name) {
        const data = await fetchPokemonDetails(name);
        setDetails(data);
      }
    };
    loadDetails();
  }, [name]);

  if (!details) return <div>Cargando detalles...</div>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold capitalize">{details.name}</h2>
      <img src={details.sprites.front_default} alt={details.name} className="w-48 h-48" />
      <p><strong>Altura:</strong> {details.height}</p>
      <p><strong>Peso:</strong> {details.weight}</p>
      <p><strong>Habilidades:</strong> {details.abilities.map((ability) => ability.ability.name).join(', ')}</p>
      <p><strong>Tipos:</strong> {details.types.map((type) => type.type.name).join(', ')}</p>
    </div>
  );
};

export default PokemonDetails;
