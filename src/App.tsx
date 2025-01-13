import React from "react";
import PokemonList from "./components/PokemonList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokedex</h1>
      <PokemonList />
    </div>
  );
};

export default App;
