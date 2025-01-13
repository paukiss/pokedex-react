import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonDetails } from "../api/pokemonApi";

interface PokemonCardProps {
  name: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const loadDetails = async () => {
      const data = await fetchPokemonDetails(name);
      setImage(data.sprites.front_default);
    };
    loadDetails();
  }, [name]);

  return (
    <div className="p-4 bg-white shadow rounded flex flex-col items-center">
      <img src={image} alt={name} className="w-24 h-24" />
      <h2 className="text-lg font-bold capitalize">{name}</h2>
      <Link to={`/pokemon/${name}`} className="mt-2 bg-blue-500 text-white py-1 px-4 rounded text-center">
        Ver Detalles
      </Link>
    </div>
  );
};

export default PokemonCard;
