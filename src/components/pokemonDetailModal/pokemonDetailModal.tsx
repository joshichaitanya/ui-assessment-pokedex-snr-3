import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Pokemon } from 'src/hooks/types';
import { useGetPokemon } from 'src/hooks/useGetPokemon';
import { createUseStyles } from 'react-jss';
import { Backdrop, Typography } from '@mui/material';

export function PokemonDetailModal({
  pokemonId,
  closeModal,
}: {
  pokemonId: string | null;
  closeModal: () => void;
}) {
  const { pokemon: pokemonDetails, loading } = useGetPokemon(pokemonId);
  const classes = useStyles();

  return loading ? (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    />
  ) : (
    <React.Fragment>
      <Dialog
        open={!!pokemonId}
        onClose={closeModal}
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant="h5">
            {pokemonDetails?.name} - #{pokemonDetails?.number}
          </Typography>
        </DialogTitle>
        {pokemonDetails && <DialogContent className={classes.dialogContent}>
          <div className={classes.container}>
            <div className={classes.imageContainer}>
                <img
                  src={pokemonDetails.image}
                  alt={pokemonDetails.name}
                  width="150px"
                />
            </div>

            <div className={classes.detailsContainer}>
              <div className={classes.heading}>
                Types:
                <span className={classes.inlineText}>
                  {pokemonDetails?.types?.join(', ')}
                </span>
              </div>

              <div className={classes.heading}>
                Classification:
                <span className={classes.inlineText}>
                  {pokemonDetails.classification}
                </span>
              </div>

              <div className={classes.heading}>
                Resistant:
                <span className={classes.inlineText}>
                  {pokemonDetails?.resistant?.join(', ')}
                </span>
              </div>

              <div className={classes.heading}>
                Weaknesses:
                <span className={classes.inlineText}>
                  {pokemonDetails?.weaknesses?.join(', ')}
                </span>
              </div>

              <div className={classes.heading}>
                Flee Rate:
                <span className={classes.inlineText}>
                  {pokemonDetails.fleeRate}
                </span>
              </div>

              <div className={classes.heading}>
                Max CP:
                <span className={classes.inlineText}>
                  {pokemonDetails.maxCP}
                </span>
              </div>

              <div className={classes.heading}>
                Max HP:
                <span className={classes.inlineText}>
                  {pokemonDetails.maxHP}
                </span>
              </div>

              <div className={classes.heading}>
                Weight:
                <span className={classes.inlineText}>
                  {pokemonDetails.weight.minimum} -{' '}
                  {pokemonDetails.weight.maximum} kg
                </span>
              </div>

              <div className={classes.heading}>
                Height:
                <span className={classes.inlineText}>
                  {pokemonDetails.height.minimum} -{' '}
                  {pokemonDetails.height.maximum} m
                </span>
              </div>
            </div>
          </div>
        </DialogContent>}
      </Dialog>
    </React.Fragment>
  );
}

const useStyles = createUseStyles({
  dialogContent: {
    '&>*': { color: 'black' },
  },
  dialogTitle: {
    '&>*': { color: 'black' },
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '20px',
  },
  imageContainer: {
    flex: '1 1 100%',
    textAlign: 'center',
    '@media (min-width: 600px)': {
      flex: '1 1 40%',
    },
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: {
    flex: '1 1 100%',
    '@media (min-width: 600px)': {
      flex: '1 1 55%',
    },
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  text: {
    marginBottom: '15px',
    color: '#333',
  },
  inlineText: {
    color: '#333',
    fontWeight: 'normal',
    marginLeft: 5,
  },
});
