import React, { useEffect, useState } from "react";
import { fetchPokemonList } from "../api/pokemonApi";
import PokemonCard from "./PokemonCard";

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const PAGE_SIZE = 20;

  const loadPokemon = async (page: number) => {
    setLoading(true);
    const offset = page * PAGE_SIZE;
    const data = await fetchPokemonList(PAGE_SIZE, offset);

    setPokemonList(data.results);
    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
    setLoading(false);
  };

  useEffect(() => {
    loadPokemon(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div className="text-center">Cargando Pokémon...</div>;

  return (
    <div>
      <div className="pagination-controls text-center mt-4">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 0} 
          className="btn-prev">
          Anterior
        </button>
        
        <span className="mx-4">Página {currentPage + 1} de {totalPages}</span>
        
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages - 1} 
          className="btn-next">
          Siguiente
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
