import { Box, Container, Grid, Typography } from '@mui/material';
import { TextReport } from '../../components/TextReport';
import { BarReport } from '../../components/BarReport';
import { PieReport } from '../../components/PieReport';
import React from 'react';

export const Report = (): JSX.Element => {
  return (
    <React.Fragment>
      <Grid
        container
        p={3}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ pt: '100px', flexGrow: 1 }}
      >
        <Grid
          item
          xs={12}
          sm={11}
          sx={{
            color: 'primary.white',
            backgroundColor: '#33353f',
            borderRadius: '4px',
            mb: '2rem',
            flexGrow: 1,
          }}
        >
          <TextReport />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            height: 'auto',
            color: 'primary.white',
            backgroundColor: '#33353f',
            borderRadius: '4px',
            mb: '2rem',
            p: '1rem',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <BarReport />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            height: 'auto',
            color: 'primary.white',
            backgroundColor: '#33353f',
            borderRadius: '4px',
            mb: '2rem',
            p: '1rem',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PieReport />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
