import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonListItem } from '../PokemonListItem';
import { Backdrop } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonDetailModal } from '../pokemonDetailModal';

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
  };
  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pk) =>
        pk.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, pokemons]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setOpenedPokemonId(id);
      navigate(`/pokemon/${id}`);
    }
  }, [id]);

  const [openedPokemonId, setOpenedPokemonId] = useState<string | null>(null);

  return (
    <div className={classes.root}>
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={true}
        />
      )}
      <input
        onChange={(e) => debouncedSearch(e.target.value)}
        defaultValue={searchQuery}
        className={classes.search}
        placeholder="Search..."
      />
      {filteredPokemons.map((pkmn) => (
        <PokemonListItem
          key={pkmn.id}
          pokemon={pkmn}
          onClick={() => {
            setOpenedPokemonId(pkmn.id);
            navigate(`/pokemon/${pkmn.id}`);
          }}
        />
      ))}

      {openedPokemonId && (
        <PokemonDetailModal
          pokemonId={openedPokemonId}
          closeModal={() => {
            setOpenedPokemonId(null);
            navigate(`/pokemon`);
          }}
        />
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      minWidth: '700px',
    },
    search: {
      width: '98%',
      borderRadius: 10,
      textAlign: 'center',
      padding: 10,
      marginBottom: 5,
      color: 'black',
    },
  },
  { name: 'PokemonList' }
);
