import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Pokemon } from './types';

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMONS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = (id: string | null) => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      id,
    },
    skip: !id,
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || {}, data);

  const pokemonOptions: PokemonOption = useMemo(
    () => ({ value: pokemon.id, label: pokemon.name }),
    [pokemon]
  );

  return {
    pokemon,
    pokemonOptions,
    ...queryRes,
  };
};
