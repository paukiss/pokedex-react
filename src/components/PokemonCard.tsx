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
    <div className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center w-full max-w-xs hover:scale-105 transform transition-all duration-300">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 mb-4 rounded-full border-4 border-blue-300 hover:border-blue-500 transition-colors duration-200"
      />
      <h2 className="text-xl font-semibold capitalize text-gray-800 mb-2">{name}</h2>
      <Link
        to={`/pokemon/${name}`}
        className="mt-2 bg-blue-500 text-white py-2 px-6 rounded-lg text-center font-medium hover:bg-blue-600 transition-colors duration-300"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default PokemonCard;
