"use client";
import set from "@/utils/set";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Pokemon() {
  const [pokemonList, setPokemonList] = useState<
    Array<{
      name: string;
      url: string;
    }>
  >([]);
  const getPokemon = async () => {
    await axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${pagination.offset}&limit=${pagination.limit}`
      )
      .then((data) => {
        setPokemonList(data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    offset: 0,
    next: 0,
    previous: 0,
  });

  const handleNextPage = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      offset: pagination.offset + pagination.limit,
    });
  };

  const handlePrevPage = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
      offset: pagination.offset - pagination.limit,
    });
  };

  useEffect(() => {
    getPokemon();
  }, [pagination]);
  return (
    <>
      <div>
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">
          Pokemon List
        </h1>
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg border-separate border-spacing-0">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Pokemon Name</th>
              <th className="py-2 px-4">Pokemon URL</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((pokemon, index) => (
              <tr key={index} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{pagination.offset + index + 1}</td>
                <td className="py-2 px-4 capitalize">{pokemon.name}</td>
                <td className="py-2 px-4 text-blue-500 truncate">
                  {pokemon.url}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-5 gap-5">
          <button
            onClick={handlePrevPage}
            disabled={pagination.page === 1}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 transition-all duration-300"
          >
            Previous
          </button>
          <span className="text-lg font-medium text-gray-800">
            {pagination.page}
          </span>
          <button
            onClick={handleNextPage}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
