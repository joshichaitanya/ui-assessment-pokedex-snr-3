import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from 'src/hooks/types';

export const PokemonListItem = ({
  pokemon,
  onClick,
}: {
  pokemon: Pokemon;
  onClick: () => void;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.pokemonContainer} onClick={onClick}>
      <img className={classes.image} src={pokemon.image} alt={pokemon.name} />
      <div className={classes.name}>{pokemon.name}</div>
      <div className={classes.number}>#{pokemon.number}</div>
      <div className={classes.types}>
        {pokemon.types.map((type, index) => (
          <span key={index} className={classes.typeBadge}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  pokemonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    padding: 12,
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#ece9e9ff',
      cursor: 'pointer',
    },
  },
  image: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    flexShrink: 0,
  },
  name: {
    flexBasis: 200,
    '@media (min-width: 600px)': {
      flexBasis: 100,
    },
    flexShrink: 0,
    color: '#2c3e50',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  number: {
    flex: 1,
    flexBasis: 70,
    flexShrink: 0,
    color: '#7f8c8d',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  types: {
    flex: 1,
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: '30px',
    gap: 8,
    overflowX: 'auto',
  },
  typeBadge: {
    backgroundColor: '#ecf0f1',
    color: '#34495e',
    height: 20,
    padding: '3px 8px 0px 6px',
    borderRadius: 12,
    fontSize: 12,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
});
