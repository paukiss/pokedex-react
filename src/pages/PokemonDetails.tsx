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

  if (!details) return <div className="text-center text-lg">Cargando detalles...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold capitalize text-center mb-4">{details.name}</h2>
      
      <div className="flex justify-center mb-6">
        <img src={details.sprites.front_default} alt={details.name} className="w-48 h-48 rounded-full border-4 border-blue-500" />
      </div>

      <div className="space-y-4 text-lg text-gray-800">
        <p className="flex items-center">
          <strong className="w-32 font-semibold text-blue-600">Altura:</strong>
          {details.height / 10} m
        </p>

        <p className="flex items-center">
          <strong className="w-32 font-semibold text-blue-600">Peso:</strong>
          {details.weight / 10} kg
        </p>

        <p className="flex items-center">
          <strong className="w-32 font-semibold text-blue-600">Habilidades:</strong>
          {details.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>

        <p className="flex items-center">
          <strong className="w-32 font-semibold text-blue-600">Tipos:</strong>
          {details.types.map((type) => type.type.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetails;
